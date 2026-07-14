// The final wiring step: takes every blog post file NOT yet registered in
// routes.ts (the 90 previously-drafted posts + the 465 newly-generated ones
// = 555 total) and:
//   1. Appends a RouteEntry for each to src/data/routes.ts (drives the
//      sitemap automatically — nothing else to update there).
//   2. Regenerates src/data/blogClusters.ts in full from BLOG_ROADMAP_20 +
//      the content bank + the topic->href map, including the 5 clusters
//      that didn't exist there before (server/network, cable/wire/charger,
//      solar/inverter/power, CCTV/security/smart device,
//      school/apartment/community drives).
//   3. Appends POST_META entries to src/data/blogLinking.ts for every newly
//      wired post (date "2026-07-14", beginner/popular both false — bulk
//      generated, not hand-curated, so no popularity claim is made).
//   4. Updates the E-Waste Recycling Basics cluster page's topic list so all
//      30 topics link to real posts instead of 27 showing as plain text.
//
// Run with: npx tsx scripts/wire-live.ts

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { BLOG_ROADMAP_20, type BlogRoadmapCluster } from "../src/data/blogRoadmap20";
import { CONTENT_BANK } from "../src/data/blogContentBank";

interface TopicHrefRow {
  clusterSlug: string;
  topicTitle: string;
  href: string;
}
const topicHrefMap: TopicHrefRow[] = JSON.parse(readFileSync("scripts/data/topic-href-map.json", "utf8"));

function hrefFor(clusterSlug: string, topicTitle: string): string | undefined {
  return topicHrefMap.find((r) => r.clusterSlug === clusterSlug && r.topicTitle === topicTitle)?.href;
}

// ── Step 0: figure out which post files already have a routes.ts entry ─────
const routesContent = readFileSync("src/data/routes.ts", "utf8");
const registeredPaths = new Set(
  [...routesContent.matchAll(/path:\s*"(\/blog\/[^"]*)"/g)].map((m) => m[1])
);

const allBlogDirs = readdirSync("src/pages/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

interface PostInfo {
  slug: string;
  href: string;
  title: string;
  description: string;
}

const unregistered: PostInfo[] = [];
for (const slug of allBlogDirs) {
  const href = `/blog/${slug}/`;
  if (registeredPaths.has(href)) continue;
  const file = `src/pages/blog/${slug}/index.astro`;
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf8");
  const titleMatch = content.match(/const title = "([^"]*)"/);
  const descMatch = content.match(/const description =\s*\n?\s*"([^"]*)"/);
  unregistered.push({
    slug,
    href,
    title: titleMatch ? titleMatch[1] : slug,
    description: descMatch ? descMatch[1] : "",
  });
}
console.log(`Unregistered posts found: ${unregistered.length}`);

// ── Step 1: append RouteEntry blocks to routes.ts ───────────────────────────
function tsString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const newRouteEntries = unregistered
  .map(
    (p) => `  {
    path: "${p.href}",
    changefreq: "monthly",
    priority: 0.6,
    title: "${tsString(p.title)}",
    description:
      "${tsString(p.description)}",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
  },`
  )
  .join("\n");

// Insert right after the last existing "/blog/" RouteEntry, before "/services/".
const anchor = `  {\n    path: "/blog/recycling-basics/",`;
const anchorIdx = routesContent.indexOf(anchor);
if (anchorIdx === -1) throw new Error("Could not find recycling-basics anchor in routes.ts");
const afterAnchorBlockEnd = routesContent.indexOf("\n  },\n", anchorIdx) + "\n  },\n".length;
const updatedRoutesContent =
  routesContent.slice(0, afterAnchorBlockEnd) +
  newRouteEntries +
  "\n" +
  routesContent.slice(afterAnchorBlockEnd);

writeFileSync("src/data/routes.ts", updatedRoutesContent);
console.log(`Wrote ${unregistered.length} new RouteEntry blocks to routes.ts`);

// ── Step 2: regenerate blogClusters.ts in full ──────────────────────────────
function slugToLabel(href: string): string {
  return href
    .split("/")
    .filter(Boolean)
    .pop()!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function clusterDescription(cluster: BlogRoadmapCluster): string {
  return `Guides covering ${cluster.intent} — practical, safe-wording content for Kochi households and businesses.`;
}

function clusterPrimaryKeywords(cluster: BlogRoadmapCluster): string[] {
  return cluster.intent.split(",").map((s) => s.trim()).filter(Boolean);
}

function clusterStatus(cluster: BlogRoadmapCluster): string {
  if (cluster.priority.toLowerCase().includes("b2b") || cluster.priority.toLowerCase().includes("business") || cluster.priority.toLowerCase().includes("commercial")) {
    return "Business Priority";
  }
  return "Live Guides Available";
}

// Post title/excerpt lookup — read once per unique href.
const postInfoByHref = new Map<string, { title: string; excerpt: string }>();
function getPostInfo(href: string): { title: string; excerpt: string } {
  if (postInfoByHref.has(href)) return postInfoByHref.get(href)!;
  const slug = href.replace(/^\/blog\//, "").replace(/\/$/, "");
  const file = `src/pages/blog/${slug}/index.astro`;
  let title = slugToLabel(href);
  let excerpt = "";
  if (existsSync(file)) {
    const content = readFileSync(file, "utf8");
    const titleMatch = content.match(/const title = "([^"]*)"/);
    const descMatch = content.match(/const description =\s*\n?\s*"([^"]*)"/);
    if (titleMatch) title = titleMatch[1];
    if (descMatch) excerpt = descMatch[1].split(/(?<=[.!])\s+/)[0];
  }
  const info = { title, excerpt: excerpt || title };
  postInfoByHref.set(href, info);
  return info;
}

const clusterBlocks: string[] = [];
for (const cluster of BLOG_ROADMAP_20) {
  const bank = CONTENT_BANK.find((c) => c.clusterSlug === cluster.slug);
  const existingPosts: { title: string; href: string; excerpt: string }[] = [];
  const plannedPosts: string[] = [];
  const seenHrefs = new Set<string>();

  for (const topic of cluster.blogTopics) {
    const href = hrefFor(cluster.slug, topic);
    if (!href) {
      plannedPosts.push(topic);
      continue;
    }
    if (seenHrefs.has(href)) continue; // avoid literal in-cluster dupes
    seenHrefs.add(href);
    const info = getPostInfo(href);
    existingPosts.push({ title: info.title, href, excerpt: info.excerpt });
  }

  const relatedServiceLinks = cluster.bestServiceLinks.map((href) => ({
    label: slugToLabel(href),
    href,
  }));

  const faqs = bank
    ? cluster.faqQuestions.map((q) => ({ question: q, answer: bank.faqAnswers[q] ?? "" }))
    : [];

  const existingPostsCode = existingPosts
    .map(
      (p) =>
        `      { title: "${tsString(p.title)}", href: "${p.href}", excerpt: "${tsString(p.excerpt)}" },`
    )
    .join("\n");
  const plannedPostsCode = plannedPosts.map((t) => `      "${tsString(t)}",`).join("\n");
  const relatedServiceLinksCode = relatedServiceLinks
    .map((l) => `      { label: "${tsString(l.label)}", href: "${l.href}" },`)
    .join("\n");
  const faqsCode = faqs
    .map((f) => `      { question: "${tsString(f.question)}", answer: "${tsString(f.answer)}" },`)
    .join("\n");

  clusterBlocks.push(`  {
    name: "${tsString(cluster.name)}",
    slug: "${cluster.slug}",
    description:
      "${tsString(clusterDescription(cluster))}",
    primaryKeywords: [${clusterPrimaryKeywords(cluster)
      .map((k) => `"${tsString(k)}"`)
      .join(", ")}],
    relatedServiceLinks: [
${relatedServiceLinksCode}
    ],
    existingPosts: [
${existingPostsCode}
    ],
    plannedPosts: [
${plannedPostsCode}
    ],
    faqs: [
${faqsCode}
    ],
    status: "${clusterStatus(cluster)}",
  },`);
}

const blogClustersFile = `// Blog cluster roadmap data for EwasteKochi V2.
// These clusters define the content strategy for the /blog/ reference hub.
// Regenerated by scripts/wire-live.ts from src/data/blogRoadmap20.ts (the
// 600-topic planning data) and src/data/blogContentBank.ts (real per-cluster
// prose and FAQ answers), combined with scripts/data/topic-href-map.json
// (which real post covers which roadmap topic). existingPosts link to live,
// built pages only; plannedPosts are topics with no live post yet.

export type BlogCluster = {
  name: string;
  slug: string;
  description: string;
  primaryKeywords: string[];
  relatedServiceLinks: {
    label: string;
    href: string;
  }[];
  existingPosts: {
    title: string;
    href: string;
    excerpt: string;
  }[];
  plannedPosts: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  status:
    | "Live Guides Available"
    | "Roadmap"
    | "Safety Priority"
    | "Business Priority"
    | "Commercial Priority";
};

export const BLOG_CLUSTERS: BlogCluster[] = [
${clusterBlocks.join("\n")}
];
`;

writeFileSync("src/data/blogClusters.ts", blogClustersFile);
console.log(`Regenerated blogClusters.ts with ${BLOG_ROADMAP_20.length} clusters.`);

// ── Step 3: append POST_META entries to blogLinking.ts ──────────────────────
const linkingContent = readFileSync("src/data/blogLinking.ts", "utf8");
const existingMetaHrefs = new Set([...linkingContent.matchAll(/href:\s*"(\/blog\/[^"]*)"/g)].map((m) => m[1]));
const newMetaHrefs = unregistered.filter((p) => !existingMetaHrefs.has(p.href));
const newMetaCode = newMetaHrefs
  .map(
    (p) =>
      `  { href: "${p.href}", datePublished: "2026-07-14", beginner: false, popular: false },`
  )
  .join("\n");

const metaAnchor = `  { href: "/blog/recycling-basics/", datePublished: "2026-07-09", beginner: true, popular: true },\n];`;
if (!linkingContent.includes(metaAnchor)) {
  console.warn("WARN: could not find POST_META closing anchor in blogLinking.ts — skipping that step.");
} else {
  const updatedLinkingContent = linkingContent.replace(
    metaAnchor,
    `  { href: "/blog/recycling-basics/", datePublished: "2026-07-09", beginner: true, popular: true },\n${newMetaCode}\n];`
  );
  writeFileSync("src/data/blogLinking.ts", updatedLinkingContent);
  console.log(`Appended ${newMetaHrefs.length} POST_META entries to blogLinking.ts`);
}

console.log("\nDone with routes.ts, blogClusters.ts, blogLinking.ts.");
