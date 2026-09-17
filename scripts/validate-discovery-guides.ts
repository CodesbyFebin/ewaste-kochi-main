import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";
import { DISCOVERY_GUIDES, DISCOVERY_ROUTES, GUIDE_CATEGORIES } from "../src/data/discoveryGuides";
import { ROUTES } from "../src/data/routes";
import { BUSINESS, SITE_URL } from "../src/data/site";
import { sanitizeJsonLdBlocks } from "../src/lib/schemaSafety";

const expectedCount = Number(process.argv[2] ?? 50);
assert.equal(DISCOVERY_GUIDES.length, expectedCount, "Guide count");
assert.equal(new Set(DISCOVERY_ROUTES.map((route) => route.path)).size, DISCOVERY_ROUTES.length, "Unique routes");
assert.equal(new Set(DISCOVERY_GUIDES.map((guide) => guide.title)).size, expectedCount, "Unique titles");
assert.equal(new Set(DISCOVERY_GUIDES.map((guide) => guide.description)).size, expectedCount, "Unique descriptions");
const sitemapFiles = ["sitemap.xml", ...readdirSync(join("dist", "sitemaps")).map((file) => join("sitemaps", file))];
const sitemapUrls = sitemapFiles.flatMap((file) => {
  const xml = load(readFileSync(join("dist", file), "utf8"), { xml: true });
  return xml("url > loc").map((_, node) => xml(node).text()).get();
});
const deployment = JSON.parse(readFileSync("vercel.json", "utf8"));
const redirects = new Set((deployment.redirects ?? []).filter((rule: { has?: unknown }) => !rule.has).map((rule: { source: string }) => rule.source.replace(/\/$/, "")));
const homepage = load(readFileSync("dist/index.html", "utf8"));

for (const route of DISCOVERY_ROUTES) {
  const htmlPath = join("dist", route.path, "index.html");
  assert.ok(existsSync(htmlPath), `Built page: ${route.path}`);
  assert.equal(ROUTES.filter((item) => item.path === route.path).length, 1, `Registered once: ${route.path}`);
  assert.ok(!redirects.has(route.path.replace(/\/$/, "")), `No redirect collision: ${route.path}`);
  const $ = load(readFileSync(htmlPath, "utf8"));
  const url = new URL(route.path, SITE_URL).toString();
  assert.equal($("link[rel=canonical]").length, 1, `One canonical: ${route.path}`);
  assert.equal($("link[rel=canonical]").attr("href"), url, `Self canonical: ${route.path}`);
  assert.equal(sitemapUrls.filter((item) => item === url).length, 1, `Sitemap URL: ${route.path}`);
  assert.equal($("h1").length, 1, `One heading: ${route.path}`);
  assert.equal($("h1").text(), route.title, `Heading: ${route.path}`);
  assert.equal($("meta[name=description]").attr("content"), route.description, `Description: ${route.path}`);
  assert.ok(!$("meta[name=robots]").attr("content")?.includes("noindex"), `Indexable: ${route.path}`);
  assert.equal($("link[hreflang='ml-IN']").length, 0, `No fictional translation: ${route.path}`);
  const blocks = $("script[type='application/ld+json']").map((_, node) => JSON.parse($(node).text())).get();
  assert.equal(blocks.filter((block) => block["@type"] === "BreadcrumbList").length, 1, `Breadcrumb schema: ${route.path}`);
  assert.ok(!blocks.some((block) => block["@type"] === "ClaimReview"), `No unsupported fact-check schema: ${route.path}`);
  for (const link of $("article.discovery-guide a[href^='/']").toArray()) {
    const target = $(link).attr("href")!.split("#")[0];
    assert.ok(existsSync(join("dist", target, "index.html")), `Link ${route.path} -> ${target}`);
  }
  const guide = DISCOVERY_GUIDES.find((item) => `/${item.slug}/` === route.path);
  if (!guide) continue;
  assert.ok(guide.sections.length >= 2 && guide.faq.length >= 2 && guide.sources.length > 0, `Substantive content: ${route.path}`);
  assert.ok(guide.readerQuestions.length >= 3, `Reader questions present: ${route.path}`);
  const articleText = $("article.discovery-guide").text();
  const words = [guide.title, guide.description, guide.answer, ...(guide.tools ?? []), ...(guide.timeline ? [guide.timeline] : []),
    ...guide.faq.flatMap((f) => [f.q, f.a]),
    ...guide.readerQuestions.flatMap((entry) => [entry.role, entry.q, entry.a]),
    ...guide.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])]),
    ...(guide.steps ?? []).flatMap((step) => [step.name, step.text]),
  ].join(" ").split(/\s+/).filter(Boolean).length;
  assert.ok(words >= 1500, `Long-form 1500+ words (has ${words}): ${route.path}`);
  for (const entry of guide.readerQuestions) {
    assert.ok(articleText.includes(entry.q) && articleText.includes(entry.a), `Visible reader question: ${route.path}`);
  }
  const faqs = blocks.filter((block) => block["@type"] === "FAQPage");
  assert.equal(faqs.length, 1, `One FAQ block: ${route.path}`);
  assert.equal(faqs[0].mainEntity.length, guide.faq.length, `FAQ count: ${route.path}`);
  for (const [index, faq] of guide.faq.entries()) {
    assert.equal(faqs[0].mainEntity[index].name, faq.q);
    assert.equal(faqs[0].mainEntity[index].acceptedAnswer.text, faq.a);
    assert.ok($("article.discovery-guide").text().includes(faq.a), `Visible FAQ: ${route.path}`);
  }
  const howTo = blocks.find((block) => block["@type"] === "HowTo");
  if (guide.steps?.length) {
    assert.ok(howTo, `HowTo schema: ${route.path}`);
    assert.equal(howTo.step.length, guide.steps.length);
    guide.steps.forEach((step, index) => {
      assert.equal(howTo.step[index].text, step.text);
      assert.ok($(`#step-${index + 1}`).text().includes(step.text));
    });
  } else {
    assert.equal(howTo, undefined);
  }
  if (guide.category === "locations") {
    assert.ok($("address").text().includes(BUSINESS.address.streetAddress));
    assert.equal($("a").filter((_, node) => $(node).attr("href") === BUSINESS.mapUrl).length > 0, true);
  }
}
for (const category of GUIDE_CATEGORIES) {
  assert.equal(homepage(`a[href='${category.path}']`).length > 0, true, `Homepage category: ${category.id}`);
  const $ = load(readFileSync(join("dist", category.path, "index.html"), "utf8"));
  const guides = DISCOVERY_GUIDES.filter((guide) => guide.category === category.id);
  if (expectedCount === 50) assert.equal(guides.length, 10, `Category size: ${category.id}`);
  for (const guide of guides) assert.equal($(`article a[href='/${guide.slug}/']`).length, 1, `Hub link: ${guide.slug}`);
}
const safe = sanitizeJsonLdBlocks([
  { "@type": "HowTo", name: "Visible procedure", step: [{ "@type": "HowToStep", text: "Visible step" }], hasCertification: "unverified" },
  { "@type": "ClaimReview", claimReviewed: "unverified" },
  { "@type": "Review", reviewBody: "unverified" },
]);
assert.equal(safe.length, 1);
assert.equal(safe[0].hasCertification, undefined);
assert.deepEqual(safe[0].step, [{ "@type": "HowToStep", text: "Visible step" }]);
console.log(`Validated ${expectedCount} guides and ${GUIDE_CATEGORIES.length} hubs: built routes, canonicals, sitemap, visible schemas and links.`);
