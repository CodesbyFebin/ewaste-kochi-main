// Generates a real .astro blog post for every topic in
// scripts/data/remaining-topics.json, using the content bank
// (src/data/blogContentBank.ts) and the same Layout/Breadcrumbs/CtaBar/Faq
// structure as every other post in src/pages/blog/.
//
// Each post is assembled, not hand-written individually — but assembled from
// genuine, cluster-specific prose (see blogContentBank.ts), with per-topic
// selection driven by keyword relevance to that topic's own title plus a
// deterministic hash-based rotation so two topics in the same cluster don't
// end up with identical takeaways/modules/FAQs even when no keyword strongly
// matches either one.
//
// Usage:
//   npx tsx scripts/generate-remaining-posts.ts            # all remaining
//   npx tsx scripts/generate-remaining-posts.ts --limit 5   # smoke test
//   npx tsx scripts/generate-remaining-posts.ts --slug some-slug

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { BLOG_ROADMAP_20 } from "../src/data/blogRoadmap20";
import { CONTENT_BANK } from "../src/data/blogContentBank";

interface RemainingTopic {
  title: string;
  slug: string;
  clusterName: string;
  clusterSlug: string;
}

const args = process.argv.slice(2);
const limitArg = args.indexOf("--limit");
const limit = limitArg !== -1 ? parseInt(args[limitArg + 1], 10) : undefined;
const slugArg = args.indexOf("--slug");
const onlySlug = slugArg !== -1 ? args[slugArg + 1] : undefined;

const topics: RemainingTopic[] = JSON.parse(
  readFileSync("scripts/data/remaining-topics.json", "utf8")
);

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// ── Archetype detection: classify a topic title into a framing style ───────
type Archetype = "definition" | "howto" | "comparison" | "checklist" | "faq" | "mistakes" | "audience" | "location" | "generic";

const AUDIENCE_WORDS = /\b(apartments?|flats?|offices?|families?|students?|businesses?|beginners?|first.time users?|small offices?|small businesses?|shops?|homes?|households?)\b/i;
const LOCATION_WORDS = /\b(kochi|kakkanad|kalamassery|ernakulam|aluva|edappally|vyttila|kadavanthra|infopark|near me)\b/i;

function detectArchetype(title: string): Archetype {
  if (/^what (is|are)\b/i.test(title)) return "definition";
  if (/\bvs\b|\bor\b.*\?$/i.test(title) && /\bvs\b/i.test(title)) return "comparison";
  if (/checklist/i.test(title)) return "checklist";
  if (/faq|questions/i.test(title)) return "faq";
  if (/mistakes|myths/i.test(title)) return "mistakes";
  if (/^how to\b|^how do\b|^how should\b|^how (does|can)\b/i.test(title)) return "howto";
  if (AUDIENCE_WORDS.test(title)) return "audience";
  if (LOCATION_WORDS.test(title)) return "location";
  return "generic";
}

function archetypeOpener(archetype: Archetype): string {
  switch (archetype) {
    case "definition":
      return `A plain-language answer, without the jargon.`;
    case "comparison":
      return `The short version of how these compare, so you can decide which applies to your situation.`;
    case "checklist":
      return `A practical checklist you can run through before booking — not everything on it applies to every pickup.`;
    case "faq":
      return `Direct answers to the questions people ask most on this topic.`;
    case "mistakes":
      return `The most common, and most avoidable, issues — and the simple fix for each.`;
    case "howto":
      return `A step-by-step answer, covering what actually matters and what you can skip.`;
    case "audience":
      return `What this looks like specifically for your situation, not just general advice.`;
    case "location":
      return `Here's what's actually available and how to check feasibility for your specific area.`;
    default:
      return `Here's what you need to know, in plain terms.`;
  }
}

// Combines the archetype-specific framing with a real sentence from the
// best-matched content module, so the lede is a substantive paragraph tied
// to this specific topic rather than a single generic line.
function buildLede(archetype: Archetype, firstModuleBody: string): string {
  const firstSentence = firstModuleBody.split(/(?<=[.!])\s+/)[0];
  return `${archetypeOpener(archetype)} ${firstSentence}`;
}

// Title text with any trailing "?" stripped, for reuse inside a sentence
// that already supplies its own punctuation (avoids "...Recycling??").
function titleAsPhrase(title: string): string {
  return title.replace(/[?]+$/, "");
}

// ── Selection helpers: keyword-relevance first, then deterministic rotation ─
function selectModules(topic: RemainingTopic, modules: typeof CONTENT_BANK[number]["modules"], count: number) {
  const scored = modules.map((m) => ({ m, score: m.keywords.test(topic.title) ? 1 : 0 }));
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return (hash(topic.slug + a.m.heading) % 1000) - (hash(topic.slug + b.m.heading) % 1000);
  });
  return scored.slice(0, count).map((s) => s.m);
}

function selectFaqs(topic: RemainingTopic, faqAnswers: Record<string, string>, count: number) {
  const entries = Object.entries(faqAnswers);
  const scored = entries.map(([q, a]) => {
    const qWords = q.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter((w) => w.length > 3);
    const titleLower = topic.title.toLowerCase();
    const score = qWords.filter((w) => titleLower.includes(w)).length;
    return { q, a, score };
  });
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return (hash(topic.slug + a.q) % 1000) - (hash(topic.slug + b.q) % 1000);
  });
  return scored.slice(0, count).map((s) => ({ q: s.q, a: s.a }));
}

function selectTakeaways(topic: RemainingTopic, pool: string[], count: number) {
  const indices = pool.map((_, i) => i);
  indices.sort((a, b) => (hash(topic.slug + a) % 1000) - (hash(topic.slug + b) % 1000));
  return indices.slice(0, count).map((i) => pool[i]);
}

// ── Related links: cluster's bestServiceLinks + extraRelatedLinks, deduped ──
function buildRelatedLinks(clusterSlug: string) {
  const roadmapCluster = BLOG_ROADMAP_20.find((c) => c.slug === clusterSlug)!;
  const bank = CONTENT_BANK.find((c) => c.clusterSlug === clusterSlug)!;
  const seen = new Set<string>();
  const links: { label: string; href: string }[] = [];
  for (const link of bank.extraRelatedLinks) {
    if (!seen.has(link.href)) {
      links.push(link);
      seen.add(link.href);
    }
  }
  for (const href of roadmapCluster.bestServiceLinks) {
    if (!seen.has(href) && !href.startsWith("/blog/")) {
      const label = href
        .split("/")
        .filter(Boolean)
        .pop()!
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      links.push({ label, href });
      seen.add(href);
    }
  }
  return links.slice(0, 3);
}

function escapeForJsx(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildDescription(title: string, clusterIntent: string): string {
  const base = `${title} — practical guidance for Kochi households and businesses, covering ${clusterIntent}.`;
  return base.length <= 165 ? base : base.slice(0, 162) + "...";
}

function generatePost(topic: RemainingTopic): string {
  const roadmapCluster = BLOG_ROADMAP_20.find((c) => c.slug === topic.clusterSlug)!;
  const bank = CONTENT_BANK.find((c) => c.clusterSlug === topic.clusterSlug)!;
  const archetype = detectArchetype(topic.title);
  const selectedModules = selectModules(topic, bank.modules, 3);
  const opener = buildLede(archetype, selectedModules[0].body);
  const selectedFaqs = selectFaqs(topic, bank.faqAnswers, 4);
  const selectedTakeaways = selectTakeaways(topic, bank.keyTakeaways, 3);
  const relatedLinks = buildRelatedLinks(topic.clusterSlug);
  const description = buildDescription(topic.title, roadmapCluster.intent);
  const date = "2026-07-14";
  const path = `/blog/${topic.slug}/`;
  const whatsappMessage = `Hi, I have a question about ${topic.title.toLowerCase().replace(/[?]/g, "")}.`;

  const faqItemsCode = selectedFaqs
    .map((f) => `  { q: "${escapeForJsx(f.q)}", a: "${escapeForJsx(f.a)}" },`)
    .join("\n");

  const sectionsCode = selectedModules
    .map(
      (m) =>
        `  <section>\n    <h2>${escapeForJsx(m.heading)}</h2>\n    <p>${escapeForJsx(m.body)}</p>\n  </section>`
    )
    .join("\n\n");

  const takeawaysCode = selectedTakeaways.map((t) => `    <li>${escapeForJsx(t)}</li>`).join("\n");

  const relatedLinksCode = relatedLinks
    .map((l) => `      <a href="${l.href}">${escapeForJsx(l.label)}</a>`)
    .join("\n");

  return `---
import Layout from "../../../layouts/Layout.astro";
import Breadcrumbs from "../../../components/Breadcrumbs.astro";
import CtaBar from "../../../components/CtaBar.astro";
import Faq from "../../../components/Faq.astro";
import RelatedContent from "../../../components/RelatedContent.astro";
import { BUSINESS, SITE_URL, telLink } from "../../../data/site";

const title = "${escapeForJsx(topic.title)}";
const description = "${escapeForJsx(description)}";
const datePublished = "${date}";
const dateModified = "${date}";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
  { name: "${escapeForJsx(topic.title)}", path: "${path}" },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: BUSINESS.legalName },
    publisher: { "@id": \`\${SITE_URL}/#organization\` },
    mainEntityOfPage: \`\${SITE_URL}${path}\`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": \`\${SITE_URL}${path}\`,
    name: title,
    description,
    dateModified,
  },
];

const faqItems = [
${faqItemsCode}
];
---

<Layout title={title} description={description} path="${path}" jsonLd={jsonLd}>
  <Breadcrumbs items={breadcrumbItems} />
  <h1>${escapeForJsx(topic.title)}</h1>
  <p class="lede">${escapeForJsx(opener)}</p>

  <CtaBar whatsappMessage="${escapeForJsx(whatsappMessage)}" />

  <ul class="key-takeaways">
${takeawaysCode}
  </ul>

${sectionsCode}

  <section>
    <h2>Related services</h2>
    <div class="link-row">
${relatedLinksCode}
    </div>
  </section>

  <p class="mal-support">
    മലയാളത്തിൽ സഹായം വേണോ? ഞങ്ങളെ <a href={telLink()}>{BUSINESS.phoneDisplay}</a> എന്ന നമ്പറിൽ വിളിക്കുകയോ വാട്സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യാം.
  </p>

  <Faq items={faqItems} />

  <RelatedContent href="${path}" />

  <section class="final-cta">
    <h2>Have Questions About ${escapeForJsx(titleAsPhrase(topic.title))}?</h2>
    <p>Share your item details and location on WhatsApp to get started.</p>
    <CtaBar whatsappMessage="${escapeForJsx(whatsappMessage)}" compact />
  </section>

  <p class="updated">Last updated: {dateModified}</p>
</Layout>

<style>
  .lede { font-size: 1.1rem; color: var(--color-muted); max-width: 46rem; }
  .key-takeaways { display: grid; gap: 0.5rem; margin: 1.5rem 0; padding-left: 1.25rem; }
  section p { line-height: 1.7; margin-bottom: 1rem; }
  .link-row { display: flex; flex-wrap: wrap; gap: 0.6rem 1.25rem; margin-top: 0.75rem; }
  .link-row a { color: var(--color-primary); font-weight: 800; text-decoration: none; }
  .mal-support { font-size: 0.9rem; color: var(--color-muted); padding: 0.9rem 1.1rem; background: var(--color-surface); border-radius: 0.5rem; margin: 2rem 0; }
  .updated { font-size: 0.8rem; color: var(--color-muted); }
  .final-cta { padding: 1.5rem 1.25rem; border-radius: 0.75rem; background: var(--color-surface); border: 1px solid var(--color-border); text-align: center; margin: 2.5rem 0; }
  .final-cta p { color: var(--color-muted); margin: 0.4rem 0 0; }
</style>
`;
}

function main() {
  let list = topics;
  if (onlySlug) list = list.filter((t) => t.slug === onlySlug);
  else if (limit) list = list.slice(0, limit);

  let written = 0;
  for (const topic of list) {
    const dir = `src/pages/blog/${topic.slug}`;
    const file = `${dir}/index.astro`;
    if (existsSync(file)) {
      console.log(`SKIP (already exists): ${topic.slug}`);
      continue;
    }
    if (!CONTENT_BANK.find((c) => c.clusterSlug === topic.clusterSlug)) {
      console.log(`SKIP (no content bank for cluster ${topic.clusterSlug}): ${topic.slug}`);
      continue;
    }
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, generatePost(topic));
    written++;
    console.log(`[${written}] ${topic.slug}`);
  }
  console.log(`\nDone. ${written} post(s) written.`);
}

main();
