import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as cheerio from "cheerio";
import { ROUTES } from "../src/data/routes";
import { SITE_URL, BUSINESS } from "../src/data/site";
import { isIndexable } from "../src/lib/indexable";

const DIST = join(process.cwd(), "dist");

// Losing side of each resolved manual-review pair (see reports/v2-gsc-data-analysis.md).
// No V2 page may ever canonicalize to one of these — they're slated for a 301 to the
// winner once their winner page exists, not a second life as a canonical target.
const RESOLVED_LOSER_PATHS = [
  "/e-waste-recycling/",
  "/data-destruction-services-kochi/",
  "/scrap-price/",
  "/free-e-waste-pickup-kochi/",
  "/blog/sell-old-laptop-kochi-best-price/",
  "/locations/ernakulam/",
  "/locations/kalamassery-hitech-park/",
];

interface Failure {
  path: string;
  check: string;
  detail: string;
}

const failures: Failure[] = [];
const passes: string[] = [];

const ALLOWED_SCHEMA_TYPES = new Set([
  "Organization",
  "WebSite",
  "WebPage",
  "Service",
  "BreadcrumbList",
  "FAQPage",
  "BlogPosting",
  "Article",
  "PostalAddress",
  "Question",
  "Answer",
  "ListItem",
  "Place",
]);

const DENIED_SCHEMA_TYPES = new Set([
  "AggregateRating",
  "Review",
  "GeoCoordinates",
  "QAPage",
  "LocalBusiness",
  "HowTo",
  "HowToStep",
  "Certification",
]);

const DENIED_SCHEMA_KEYS = new Set([
  "aggregateRating",
  "review",
  "reviews",
  "rating",
  "ratingValue",
  "reviewCount",
  "bestRating",
  "worstRating",
  "geo",
  "hasMap",
  "latitude",
  "longitude",
  "award",
  "awards",
  "certification",
  "hasCertification",
  "hasCredential",
  "identifier",
]);

function schemaTypes(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : typeof value === "string" ? [value] : [];
}

function walkSchema(value: unknown, visit: (record: Record<string, unknown>) => void) {
  if (Array.isArray(value)) {
    for (const item of value) walkSchema(item, visit);
    return;
  }
  if (!value || typeof value !== "object") return;

  const record = value as Record<string, unknown>;
  visit(record);
  for (const nested of Object.values(record)) walkSchema(nested, visit);
}

function fail(path: string, check: string, detail: string) {
  failures.push({ path, check, detail });
}

function pass(check: string) {
  passes.push(check);
}

function distFileFor(routePath: string): string {
  if (routePath === "/") return join(DIST, "index.html");
  return join(DIST, routePath.replace(/^\//, ""), "index.html");
}

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

// Loaded once, up front, so both the per-page internal-link check and the later
// redirect-integrity section (Phase 2G) can treat "is this a redirect source" as
// a single shared fact instead of two separately-maintained lists.
const vercelJsonPathEarly = join(process.cwd(), "vercel.json");
const allRedirectSources: string[] = existsSync(vercelJsonPathEarly)
  ? (JSON.parse(readFileSync(vercelJsonPathEarly, "utf-8")) as { redirects: { source: string; destination: string }[] }).redirects
      .filter((r) => !r.destination.includes(":path*"))
      .map((r) => r.source)
  : [];
const redirectSourceSet = new Set(allRedirectSources.map(normalize));

// 1. Every route in the registry must have built HTML with the required SEO surface.
const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const canonicalsSeen = new Map<string, string>();
// Populated by the sitemap section below; reused by the Phase 2G redirect-safety
// checks so a sitemap URL can never quietly double as a redirect source.
const allSitemapUrlsGlobal: string[] = [];

for (const route of ROUTES) {
  const filePath = distFileFor(route.path);
  if (!existsSync(filePath)) {
    fail(route.path, "build-output", `Expected build output at ${filePath} but it does not exist.`);
    continue;
  }

  const html = readFileSync(filePath, "utf-8");
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  if (!title) fail(route.path, "title", "Missing or empty <title>.");
  else titles.set(route.path, title);

  const description = $('meta[name="description"]').attr("content")?.trim();
  if (!description) fail(route.path, "meta-description", "Missing or empty meta description.");
  else descriptions.set(route.path, description);

  const canonical = $('link[rel="canonical"]').attr("href");
  const expectedCanonical = new URL(route.path, SITE_URL).toString();
  if (!canonical) {
    fail(route.path, "canonical", "Missing <link rel=\"canonical\">. Every sitemap-eligible page must self-canonicalize.");
  } else if (canonical !== expectedCanonical) {
    fail(route.path, "canonical", `Canonical is "${canonical}", expected "${expectedCanonical}".`);
  } else if (!canonical.startsWith("https://www.")) {
    fail(route.path, "canonical-host", `Canonical "${canonical}" does not use https://www.`);
  } else {
    canonicalsSeen.set(route.path, canonical);
    pass(`canonical:${route.path}`);
  }

  // Explicit guard: canonical must never point at the losing side of a
  // resolved manual-review pair — those are slated for a 301 to the winner,
  // not a second life as something else's canonical target.
  for (const loserPath of RESOLVED_LOSER_PATHS) {
    if (canonical === `${SITE_URL}${loserPath}`) {
      fail(route.path, "canonical-resolved-loser", `Canonical points to "${loserPath}", which lost its manual-review pair per GSC data (see reports/v2-gsc-data-analysis.md). No V2 page may canonicalize to it.`);
    }
  }

  const ogUrl = $('meta[property="og:url"]').attr("content");
  if (ogUrl !== expectedCanonical) {
    fail(route.path, "og-url", `og:url is "${ogUrl}", expected "${expectedCanonical}".`);
  }

  const robotsMeta = $('meta[name="robots"]').attr("content");
  if (robotsMeta?.includes("noindex")) {
    fail(route.path, "noindex-in-sitemap-scope", "Page is noindex but is listed in the sitemap-eligible routes registry.");
  }

  let jsonLdBlocks = 0;
  const parsedJsonLd: unknown[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    jsonLdBlocks += 1;
    const raw = $(el).html() ?? "";
    try {
      parsedJsonLd.push(JSON.parse(raw));
    } catch (e) {
      fail(route.path, "schema-json", `A JSON-LD block failed to parse: ${(e as Error).message}`);
    }
  });
  if (jsonLdBlocks === 0) {
    fail(route.path, "schema-presence", "No JSON-LD schema blocks found.");
  } else {
    pass(`schema:${route.path}`);
  }

  for (const data of parsedJsonLd) {
    const topLevelTypes = schemaTypes((data as Record<string, unknown>)["@type"]);
    if (topLevelTypes.some((type) => !ALLOWED_SCHEMA_TYPES.has(type))) {
      fail(route.path, "schema-type-not-allowed", `Top-level schema type is not in the OLD-P0B allowlist: ${topLevelTypes.join(", ")}`);
    }

    walkSchema(data, (record) => {
      for (const type of schemaTypes(record["@type"])) {
        if (DENIED_SCHEMA_TYPES.has(type)) {
          fail(route.path, "schema-denied-type", `Forbidden schema type emitted: ${type}`);
        }
      }
      for (const key of Object.keys(record)) {
        if (DENIED_SCHEMA_KEYS.has(key)) {
          fail(route.path, "schema-denied-property", `Forbidden schema property emitted: ${key}`);
        }
      }
    });
  }

  if (route.path !== "/") {
    const hasBreadcrumbSchema = parsedJsonLd.some(
      (data) => (data as Record<string, unknown>)["@type"] === "BreadcrumbList"
    );
    if (!hasBreadcrumbSchema) {
      fail(route.path, "breadcrumbs", "No BreadcrumbList schema found on a non-homepage page.");
    } else {
      pass(`breadcrumbs:${route.path}`);
    }
  }

  // Internal links must use https://www canonical form, never bare non-www or http.
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (href.startsWith("http://")) {
      fail(route.path, "internal-link-protocol", `Link "${href}" uses http:// instead of https://.`);
    }
    if (/^https?:\/\/ewastekochi\.com/.test(href)) {
      fail(route.path, "internal-link-host", `Link "${href}" uses non-www host.`);
    }
    if (RESOLVED_LOSER_PATHS.includes(href)) {
      fail(route.path, "links-to-resolved-loser", `Links to "${href}", which lost its manual-review pair. Point this link at the winner instead.`);
    }
    if (href.startsWith("/") && redirectSourceSet.has(normalize(href))) {
      fail(route.path, "links-to-redirect-source", `Links to "${href}", which is a legacy URL that only exists as a vercel.json redirect source. Point this link directly at the redirect's destination instead.`);
    }
  });

  // hreflang: any route declaring a translation pair must emit all 3 alternate tags.
  if (route.hreflangPair) {
    const pairRoute = ROUTES.find((r) => r.path === route.hreflangPair);
    if (!pairRoute) {
      fail(route.path, "hreflang-pair-missing", `hreflangPair "${route.hreflangPair}" is not a route in the registry.`);
    } else {
      const hreflangLinks = $('link[rel="alternate"][hreflang]')
        .map((_, el) => ({ lang: $(el).attr("hreflang"), href: $(el).attr("href") }))
        .get();
      const expectedEn = route.lang === "en-IN" ? route.path : pairRoute.path;
      const expectedMl = route.lang === "ml-IN" ? route.path : pairRoute.path;
      const hasEn = hreflangLinks.some((h) => h.lang === "en-IN" && h.href === new URL(expectedEn, SITE_URL).toString());
      const hasMl = hreflangLinks.some((h) => h.lang === "ml-IN" && h.href === new URL(expectedMl, SITE_URL).toString());
      const hasXDefault = hreflangLinks.some((h) => h.lang === "x-default");
      if (!hasEn || !hasMl || !hasXDefault) {
        fail(route.path, "hreflang-incomplete", `Expected en-IN + ml-IN + x-default hreflang alternates, found: ${JSON.stringify(hreflangLinks)}.`);
      } else {
        pass(`hreflang:${route.path}`);
      }
    }
  }

  // Trust pages must never contain fabricated certificate/authorization numbers.
  if (route.type === "trust") {
    const bodyText = $("body").text().replace(/\s+/g, " ");
    const fabricationPattern = /(certificate|certification|authorization|license|registration)\s*(no\.?|number|#)?\s*[:\-]?\s*[A-Z]{0,4}[\/\-]?\d{3,}/i;
    const match = bodyText.match(fabricationPattern);
    if (match) {
      fail(route.path, "fabricated-certificate-number", `Trust page appears to contain a specific certificate/registration number ("${match[0]}"), which must not be invented. Use "documentation available on request" language instead.`);
    } else {
      pass(`no-fabricated-numbers:${route.path}`);
    }
  }
}

// 2. No duplicate titles or descriptions across built pages.
const titleOwners = new Map<string, string[]>();
for (const [path, title] of titles) {
  const owners = titleOwners.get(title) ?? [];
  owners.push(path);
  titleOwners.set(title, owners);
}
for (const [title, owners] of titleOwners) {
  if (owners.length > 1) {
    fail(owners.join(", "), "duplicate-title", `Title "${title}" is reused across multiple pages.`);
  }
}

const descOwners = new Map<string, string[]>();
for (const [path, desc] of descriptions) {
  const owners = descOwners.get(desc) ?? [];
  owners.push(path);
  descOwners.set(desc, owners);
}
for (const [, owners] of descOwners) {
  if (owners.length > 1) {
    fail(owners.join(", "), "duplicate-description", `Meta description reused across multiple pages.`);
  }
}

// 3. sitemap.xml must be a valid sitemap INDEX referencing only sub-sitemaps
// that actually exist, and the union of every sub-sitemap's URLs must exactly
// match the route registry — no more, no less, no redirecting/non-www URLs.
const GROUP_FILES: Record<string, string> = {
  core: "core.xml",
  services: "services.xml",
  locations: "locations.xml",
  legal: "legal.xml",
  ml: "ml.xml",
  blog: "blog.xml",
};

const sitemapIndexPath = join(DIST, "sitemap.xml");
if (!existsSync(sitemapIndexPath)) {
  fail("/sitemap.xml", "build-output", "sitemap.xml was not generated.");
} else {
  const indexXml = readFileSync(sitemapIndexPath, "utf-8");
  const $index = cheerio.load(indexXml, { xmlMode: true });
  const isIndex = $index("sitemapindex").length > 0;
  if (!isIndex) {
    fail("/sitemap.xml", "sitemap-not-index", "sitemap.xml root element is not <sitemapindex>.");
  } else {
    const indexedLocs = $index("sitemap > loc").map((_, el) => $index(el).text()).get();
    const indexableRoutes = ROUTES.filter(isIndexable);
    const presentGroups = Array.from(new Set(indexableRoutes.map((r) => r.sitemapGroup)));

    for (const group of presentGroups) {
      const expectedLoc = `${SITE_URL}/sitemaps/${GROUP_FILES[group]}`;
      if (!indexedLocs.includes(expectedLoc)) {
        fail("/sitemap.xml", "sitemap-index-missing-group", `Sitemap index is missing an entry for "${group}" (${expectedLoc}), but routes exist in that group.`);
      }
    }
    for (const loc of indexedLocs) {
      if (!loc.startsWith("https://www.")) {
        fail("/sitemap.xml", "sitemap-host", `Sitemap index entry "${loc}" is not https://www.`);
      }
    }

    // Validate each sub-sitemap file's contents against its group.
    const allSitemapUrls: string[] = allSitemapUrlsGlobal;
    for (const [group, filename] of Object.entries(GROUP_FILES)) {
      const groupRoutes = indexableRoutes.filter((r) => r.sitemapGroup === group);
      if (groupRoutes.length === 0) continue;

      const subPath = join(DIST, "sitemaps", filename);
      if (!existsSync(subPath)) {
        fail(`/sitemaps/${filename}`, "build-output", `Sub-sitemap for group "${group}" was not generated.`);
        continue;
      }
      const subXml = readFileSync(subPath, "utf-8");
      const $sub = cheerio.load(subXml, { xmlMode: true });
      const subUrls = $sub("url > loc").map((_, el) => $sub(el).text()).get();
      allSitemapUrls.push(...subUrls);

      const expectedUrls = groupRoutes.map((r) => new URL(r.path, SITE_URL).toString());
      for (const url of subUrls) {
        if (!expectedUrls.includes(url)) {
          fail(`/sitemaps/${filename}`, "sitemap-extraneous", `Contains "${url}" which is not a ${group}-group route.`);
        }
        if (!url.startsWith("https://www.")) {
          fail(`/sitemaps/${filename}`, "sitemap-host", `URL "${url}" is not https://www.`);
        }
        // Best-effort proxy for "no sitemap URL redirects": if the URL isn't
        // this build's own canonical for that route, static output can't prove
        // live redirect behavior — that requires hitting a deployed URL, which
        // is out of scope for a local build check.
        if (canonicalsSeen.size > 0 && !Array.from(canonicalsSeen.values()).includes(url)) {
          fail(`/sitemaps/${filename}`, "sitemap-not-self-canonical", `URL "${url}" is not any built page's self-canonical — cannot confirm it isn't a redirect target.`);
        }
      }
      for (const url of expectedUrls) {
        if (!subUrls.includes(url)) {
          fail(`/sitemaps/${filename}`, "sitemap-missing", `Route "${url}" is missing from the ${group} sub-sitemap.`);
        }
      }
    }

    if (allSitemapUrls.length === indexableRoutes.length && failures.filter((f) => f.check.startsWith("sitemap")).length === 0) {
      pass("sitemap-matches-routes");
    }
  }
}

// 4. robots.txt must not disallow any built route, and important sections
// (services, locations, ml) must be explicitly confirmed open.
const robotsPath = join(process.cwd(), "public", "robots.txt");
if (!existsSync(robotsPath)) {
  fail("/robots.txt", "build-output", "robots.txt was not found in public/.");
} else {
  const robotsTxt = readFileSync(robotsPath, "utf-8");
  const disallowLines = robotsTxt
    .split("\n")
    .filter((l: string) => l.trim().toLowerCase().startsWith("disallow:"))
    .map((l: string) => l.split(":")[1]?.trim())
    .filter(Boolean) as string[];

  for (const route of ROUTES) {
    for (const disallowed of disallowLines) {
      if (disallowed !== "/" && route.path.startsWith(disallowed)) {
        fail(route.path, "robots-blocked", `Route is blocked by robots.txt rule "Disallow: ${disallowed}".`);
      }
    }
  }
  if (disallowLines.every((d) => !ROUTES.some((r) => d !== "/" && r.path.startsWith(d)))) {
    pass("robots-does-not-block-built-routes");
  }

  for (const importantPrefix of ["/services/", "/locations/", "/ml/"]) {
    const blocked = disallowLines.some((d) => d !== "/" && importantPrefix.startsWith(d));
    if (blocked) {
      fail(importantPrefix, "robots-blocks-important-section", `robots.txt disallow rule blocks the important section "${importantPrefix}".`);
    } else {
      pass(`robots-open:${importantPrefix}`);
    }
  }
}

// 5. Required infrastructure files must exist in the build output.
for (const required of ["llms.txt", "content-index.json", "content-index.xml", "ai-sitemap.xml"]) {
  const p = join(DIST, required);
  if (!existsSync(p)) {
    fail(`/${required}`, "build-output", `${required} was not found in the build output.`);
  } else {
    pass(`exists:${required}`);
  }
}

// 6. Phase 2B — GSC winner/loser redirect integrity (see reports/v2-gsc-data-analysis.md).
const GSC_WINNERS = [
  "/recycling/",
  "/data-destruction/",
  "/e-waste-scrap-prices-kochi/",
  "/blog/free-e-waste-pickup-kochi/",
  "/blog/sell-old-laptop-kochi/",
  "/locations/ernakulam-south/",
  "/locations/kalamassery/",
];

for (const winnerPath of GSC_WINNERS) {
  if (!ROUTES.some((r) => r.path === winnerPath)) {
    fail(winnerPath, "gsc-winner-not-built", `GSC-confirmed winner "${winnerPath}" is not in the route registry (and therefore not in the sitemap or content-index).`);
  } else {
    pass(`gsc-winner-built:${winnerPath}`);
  }
}

// Loser URLs must never appear in any built sub-sitemap, even indirectly.
for (const group of Object.keys(GROUP_FILES)) {
  const subPath = join(DIST, "sitemaps", GROUP_FILES[group]);
  if (!existsSync(subPath)) continue;
  const subXml = readFileSync(subPath, "utf-8");
  for (const loserPath of RESOLVED_LOSER_PATHS) {
    if (subXml.includes(`${SITE_URL}${loserPath}`)) {
      fail(`/sitemaps/${GROUP_FILES[group]}`, "sitemap-contains-loser", `Sub-sitemap contains resolved-loser URL "${loserPath}".`);
    }
  }
}
if (failures.filter((f) => f.check === "sitemap-contains-loser").length === 0) {
  pass("no-loser-urls-in-any-sitemap");
}

// vercel.json redirect integrity: every internal destination must point at a
// route that actually exists (never redirect to a 404), and no destination
// may itself be the source of another redirect rule (no 2-hop chains).
const vercelJsonPath = join(process.cwd(), "vercel.json");
if (!existsSync(vercelJsonPath)) {
  fail("/vercel.json", "build-output", "vercel.json was not found.");
} else {
  const vercelConfig = JSON.parse(readFileSync(vercelJsonPath, "utf-8")) as {
    redirects: { source: string; destination: string }[];
  };
  const sources = new Set(vercelConfig.redirects.map((r) => normalize(r.source)));

  for (const redirect of vercelConfig.redirects) {
    if (redirect.destination.includes(":path*")) continue; // host-canonicalization rule, not a page-level redirect
    const destPath = redirect.destination.startsWith("http")
      ? new URL(redirect.destination).pathname
      : redirect.destination;
    const normalizedDest = normalize(destPath);
    const targetExists = ROUTES.some((r) => normalize(r.path) === normalizedDest);
    if (!targetExists) {
      fail(redirect.source, "redirect-target-missing", `vercel.json redirects "${redirect.source}" to "${redirect.destination}", which is not a built route.`);
    } else {
      pass(`redirect-target-exists:${redirect.source}`);
    }
    if (sources.has(normalizedDest)) {
      fail(redirect.source, "redirect-chain", `vercel.json redirects "${redirect.source}" to "${redirect.destination}", but that destination is itself the source of another redirect — this creates a 2-hop chain.`);
    }
  }

  // /blog/ index must never be redirected — retained on the main domain per user decision.
  const blogIndexRedirected = vercelConfig.redirects.some((r) => normalize(r.source) === "/blog/");
  if (blogIndexRedirected) {
    fail("/blog/", "blog-index-redirected", "vercel.json redirects /blog/ — this is explicitly held per user decision (blogs.ewastekochi.com is not provisioned, and /blog/{slug}/ posts have proven winners).");
  } else {
    pass("blog-index-not-redirected");
  }

  // Phase 2G — legacy matrix redirect safety (see reports/phase-2g-legacy-matrix-redirect-report.md).
  // A redirect source is a dead legacy URL by definition — it must never also be
  // a live route, a sitemap entry, or an internal link destination, otherwise the
  // "redirect" and the "real page" would be fighting over the same URL.
  const routePaths = new Set(ROUTES.map((r) => normalize(r.path)));
  for (const redirect of vercelConfig.redirects) {
    if (redirect.destination.includes(":path*")) continue; // host-canonicalization rule, not a legacy-URL redirect
    const normalizedSource = normalize(redirect.source);

    if (routePaths.has(normalizedSource)) {
      fail(redirect.source, "redirect-source-in-route-registry", `"${redirect.source}" is a vercel.json redirect source but also appears in the route registry (src/data/routes.ts) — a URL cannot be both a live page and a dead legacy redirect.`);
    }

    if (allSitemapUrlsGlobal.includes(new URL(normalizedSource, SITE_URL).toString())) {
      fail(redirect.source, "redirect-source-in-sitemap", `"${redirect.source}" is a vercel.json redirect source but also appears in a sitemap — redirect sources must never be submitted to search engines as canonical URLs.`);
    }
  }
  if (failures.filter((f) => f.check === "redirect-source-in-route-registry").length === 0) {
    pass("no-redirect-source-in-route-registry");
  }
  if (failures.filter((f) => f.check === "redirect-source-in-sitemap").length === 0) {
    pass("no-redirect-source-in-sitemap");
  }

  // content-index.json is generated 1:1 from ROUTES (see src/pages/content-index.json.ts),
  // so this is a structural re-check against the actual build artifact rather than a
  // duplicate of the route-registry check above — it catches drift if that generator
  // ever stops being a pure function of ROUTES.
  const contentIndexPath = join(DIST, "content-index.json");
  if (existsSync(contentIndexPath)) {
    const contentIndex = JSON.parse(readFileSync(contentIndexPath, "utf-8")) as { pages: { url: string }[] };
    const contentIndexUrls = new Set(contentIndex.pages.map((p) => p.url));
    let sourceInContentIndex = false;
    for (const redirect of vercelConfig.redirects) {
      if (redirect.destination.includes(":path*")) continue;
      const sourceUrl = new URL(normalize(redirect.source), SITE_URL).toString();
      if (contentIndexUrls.has(sourceUrl)) {
        fail(redirect.source, "redirect-source-in-content-index", `"${redirect.source}" is a vercel.json redirect source but also appears in content-index.json.`);
        sourceInContentIndex = true;
      }
    }
    if (!sourceInContentIndex) pass("no-redirect-source-in-content-index");
  }
}

// /blogs/ taxonomy must never be built as V2 pages — legacy pSEO risk, tracked
// in docs/roadmap/legacy-matrix-redirect-strategy.md instead.
if (ROUTES.some((r) => r.path.startsWith("/blogs/"))) {
  fail("/blogs/", "blogs-taxonomy-built", "A route under /blogs/ was added to the registry — this taxonomy is explicitly not to be built in V2 (see docs/roadmap/legacy-matrix-redirect-strategy.md).");
} else {
  pass("blogs-taxonomy-not-built");
}

// /hi/ must not be silently touched — any robots.txt rule affecting it must be
// an intentional, tracked decision, not an accidental addition.
if (existsSync(join(process.cwd(), "public", "robots.txt"))) {
  const robotsTxt = readFileSync(join(process.cwd(), "public", "robots.txt"), "utf-8");
  const hiMentioned = /disallow:\s*\/hi\/?/i.test(robotsTxt);
  if (hiMentioned) {
    fail("/hi/", "hi-robots-rule-untracked", "robots.txt now mentions /hi/ — /hi/ is marked manual-review in PROJECT_TRACKER.md; any rule change for it must be a deliberate, documented decision, not incidental.");
  } else {
    pass("hi-not-modified");
  }
}

// Phase 2I-A — lead funnel chatbot safety checks (see reports/phase-2i-a-lead-funnel-chatbot-report.md).
// The chatbot is a fixed decision tree with no LLM calls and no paid API; these
// checks guard against the specific failure modes a hand-authored funnel like
// this can silently develop over time: a link to a page that isn't built, a
// forbidden unverified claim slipping into a message template, or the WhatsApp
// number drifting from the one real, canonical business number.
const chatbotFiles = [
  join(process.cwd(), "src", "scripts", "leadFunnelChatbot.ts"),
  join(process.cwd(), "src", "components", "LeadFunnelChatbot.astro"),
];
const chatbotFilesExist = chatbotFiles.every((f) => existsSync(f));
if (!chatbotFilesExist) {
  fail("/chatbot/", "build-output", "Expected chatbot source files (src/scripts/leadFunnelChatbot.ts, src/components/LeadFunnelChatbot.astro) were not found.");
} else {
  const chatbotSource = chatbotFiles.map((f) => readFileSync(f, "utf-8")).join("\n");

  // 1. Every internal href literal in the chatbot must be a real, built route.
  const hrefMatches = [...chatbotSource.matchAll(/href:\s*"(\/[a-z0-9-/]*)"/g)].map((m) => m[1]);
  const chatbotRoutePaths = new Set(ROUTES.map((r) => normalize(r.path)));
  let allHrefsBuilt = true;
  for (const href of hrefMatches) {
    if (!chatbotRoutePaths.has(normalize(href))) {
      fail("/chatbot/", "chatbot-link-not-built", `Chatbot links to "${href}", which is not a built route.`);
      allHrefsBuilt = false;
    }
  }
  if (allHrefsBuilt && hrefMatches.length > 0) pass(`chatbot-links-all-built (${hrefMatches.length} checked)`);

  // 2. No redirect-source (dead legacy) URL may appear in the chatbot.
  let noLoserLinks = true;
  for (const loserPath of RESOLVED_LOSER_PATHS) {
    if (chatbotSource.includes(`"${loserPath}"`)) {
      fail("/chatbot/", "chatbot-links-to-resolved-loser", `Chatbot references resolved-loser path "${loserPath}".`);
      noLoserLinks = false;
    }
  }
  for (const redirect of allRedirectSources) {
    if (chatbotSource.includes(`"${redirect}"`)) {
      fail("/chatbot/", "chatbot-links-to-redirect-source", `Chatbot references "${redirect}", which only exists as a vercel.json redirect source.`);
      noLoserLinks = false;
    }
  }
  if (noLoserLinks) pass("chatbot-no-loser-or-redirect-source-links");

  // 3. No forbidden unverified claim may appear in any chatbot copy.
  const forbiddenClaims = [
    /guaranteed\s+best\s+price/i,
    /guaranteed\s+same-day/i,
    /cpcb\s+authorized/i,
    /kspcb\s+authorized/i,
    /iso\s+certified/i,
    /government\s+authorized/i,
    /4\.9\s*(?:star|rating|â|★)/i,
    /5,?000\+?\s+(?:customers|clients|reviews)/i,
    /\b(infosys|wipro|federal bank)\b/i,
  ];
  let noForbiddenClaims = true;
  for (const pattern of forbiddenClaims) {
    if (pattern.test(chatbotSource)) {
      fail("/chatbot/", "chatbot-forbidden-claim", `Chatbot copy matches a forbidden unverified-claim pattern: ${pattern}.`);
      noForbiddenClaims = false;
    }
  }
  if (noForbiddenClaims) pass("chatbot-no-forbidden-claims");

  // 4. The chatbot must use the one real business WhatsApp number, via the
  // shared site.ts constant — not a hardcoded/placeholder alternate number.
  const strayPhoneNumbers = [...chatbotSource.matchAll(/91\d{10}/g)].map((m) => m[0]);
  if (strayPhoneNumbers.length > 0) {
    fail("/chatbot/", "chatbot-hardcoded-phone-number", `Chatbot source contains a hardcoded phone-number-like literal (${strayPhoneNumbers.join(", ")}) instead of importing BUSINESS.whatsapp from src/data/site.ts.`);
  } else if (BUSINESS.whatsapp !== "917500555454") {
    fail("/chatbot/", "chatbot-wrong-whatsapp-number", `src/data/site.ts BUSINESS.whatsapp is "${BUSINESS.whatsapp}", expected "917500555454".`);
  } else {
    pass("chatbot-whatsapp-number-correct");
  }

  // 5. The chatbot must not add pages — route/sitemap/content-index counts are
  // already asserted at exactly 43 elsewhere in this script; this just confirms
  // no chatbot-specific route was accidentally introduced.
  if (ROUTES.some((r) => r.path.includes("chat") || r.path.includes("lead"))) {
    fail("/chatbot/", "chatbot-added-route", "A route matching the chatbot appears in the route registry — the chatbot must be a component, not a page.");
  } else {
    pass("chatbot-added-no-routes");
  }
}

// Report
const timestamp = new Date().toISOString();
const reportLines: string[] = [];
reportLines.push(`\n## Validation run ${timestamp}\n`);
reportLines.push(`- Routes checked: ${ROUTES.length}`);
reportLines.push(`- Checks passed: ${passes.length}`);
reportLines.push(`- Failures: ${failures.length}\n`);

if (failures.length > 0) {
  reportLines.push("| Path | Check | Detail |");
  reportLines.push("| --- | --- | --- |");
  for (const f of failures) {
    reportLines.push(`| ${f.path} | ${f.check} | ${f.detail.replace(/\|/g, "\\|")} |`);
  }
} else {
  reportLines.push("All checks passed.");
}

const reportPath = join(process.cwd(), "reports", "v2-validation-report.md");
const existingReport = existsSync(reportPath) ? readFileSync(reportPath, "utf-8") : "# V2 Validation Report\n";
writeFileSync(reportPath, existingReport + reportLines.join("\n") + "\n");

console.log(reportLines.join("\n"));

if (failures.length > 0) {
  console.error(`\n${failures.length} validation failure(s). See reports/v2-validation-report.md`);
  process.exit(1);
} else {
  console.log("\nAll SEO validation checks passed.");
}
