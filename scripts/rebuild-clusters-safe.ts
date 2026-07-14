// BLOG SCALE SAFETY GATE — regenerates src/data/blogClusters.ts so
// existingPosts only ever references the 16 reviewed, indexable posts.
// Every other roadmap topic (the 555 quarantined ones) reverts to
// plannedPosts (a topic title string, no href, no link) — the same
// semantics blogClusters.ts had before this session's mass-generation pass.
// Keeps the 20-cluster structure (src/data/blogRoadmap20.ts) as planning
// data; only which topics get a live href changes.
//
// Run with: npx tsx scripts/rebuild-clusters-safe.ts

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { BLOG_ROADMAP_20, type BlogRoadmapCluster } from "../src/data/blogRoadmap20";
import { CONTENT_BANK } from "../src/data/blogContentBank";

const SAFE_SLUGS = [
  "free-e-waste-pickup-kochi", "sell-old-laptop-kochi", "what-is-ewaste", "e-waste-examples",
  "e-waste-collection-near-me", "what-is-epr-in-e-waste", "e-waste-management-rules-2022",
  "where-to-recycle-old-electronics-kochi", "battery-recycling-near-me-kochi",
  "how-to-book-ewaste-pickup-kochi", "how-to-sell-old-electronics-kochi", "laptop-recycling-kochi",
  "data-destruction-kochi-guide", "corporate-ewaste-pickup-kochi", "how-ewaste-scrap-quotes-work-kochi",
];
const SAFE_HREFS = new Set(SAFE_SLUGS.map((s) => `/blog/${s}/`));

// 5 of the 16 safe posts predate scripts/reconcile-remaining-topics.ts and were
// never matched to a roadmap topic by it (0 rows in topic-href-map.json for
// these hrefs — confirmed directly). Assign them to their correct cluster by
// hand, same as scripts/wire-legacy-orphans.ts did for the quarantined legacy
// posts that had the identical gap.
const MANUAL_CLUSTER_ASSIGNMENTS: { href: string; clusterSlug: string }[] = [
  { href: "/blog/free-e-waste-pickup-kochi/", clusterSlug: "e-waste-pickup-near-me" },
  { href: "/blog/what-is-ewaste/", clusterSlug: "e-waste-recycling-basics" },
  { href: "/blog/e-waste-examples/", clusterSlug: "e-waste-recycling-basics" },
  { href: "/blog/what-is-epr-in-e-waste/", clusterSlug: "kerala-ewaste-rules-compliance" },
  { href: "/blog/e-waste-management-rules-2022/", clusterSlug: "kerala-ewaste-rules-compliance" },
];

interface TopicHrefRow { clusterSlug: string; topicTitle: string; href: string; }
const topicHrefMap: TopicHrefRow[] = JSON.parse(readFileSync("scripts/data/topic-href-map.json", "utf8"));

function safeHrefFor(clusterSlug: string, topicTitle: string): string | undefined {
  const row = topicHrefMap.find((r) => r.clusterSlug === clusterSlug && r.topicTitle === topicTitle);
  if (!row) return undefined;
  return SAFE_HREFS.has(row.href) ? row.href : undefined;
}

function tsString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function slugToLabel(href: string): string {
  return href.split("/").filter(Boolean).pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function clusterDescription(cluster: BlogRoadmapCluster): string {
  return `Guides covering ${cluster.intent} — practical, safe-wording content for Kochi households and businesses.`;
}
function clusterPrimaryKeywords(cluster: BlogRoadmapCluster): string[] {
  return cluster.intent.split(",").map((s) => s.trim()).filter(Boolean);
}
function clusterStatus(cluster: BlogRoadmapCluster, hasLivePosts: boolean): string {
  if (!hasLivePosts) return "Roadmap";
  if (/b2b|business|commercial/i.test(cluster.priority)) return "Business Priority";
  return "Live Guides Available";
}

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
let totalExisting = 0;
let totalPlanned = 0;

for (const cluster of BLOG_ROADMAP_20) {
  const bank = CONTENT_BANK.find((c) => c.clusterSlug === cluster.slug);
  const existingPosts: { title: string; href: string; excerpt: string }[] = [];
  const plannedPosts: string[] = [];
  const seenHrefs = new Set<string>();

  for (const topic of cluster.blogTopics) {
    const href = safeHrefFor(cluster.slug, topic);
    if (!href || seenHrefs.has(href)) {
      plannedPosts.push(topic);
      continue;
    }
    seenHrefs.add(href);
    const info = getPostInfo(href);
    existingPosts.push({ title: info.title, href, excerpt: info.excerpt });
  }

  for (const { href, clusterSlug } of MANUAL_CLUSTER_ASSIGNMENTS) {
    if (clusterSlug !== cluster.slug || seenHrefs.has(href)) continue;
    seenHrefs.add(href);
    const info = getPostInfo(href);
    existingPosts.push({ title: info.title, href, excerpt: info.excerpt });
  }

  totalExisting += existingPosts.length;
  totalPlanned += plannedPosts.length;

  const relatedServiceLinks = cluster.bestServiceLinks
    .filter((href) => !href.startsWith("/blog/") || SAFE_HREFS.has(href))
    .map((href) => ({ label: slugToLabel(href), href }));

  const faqs = bank ? cluster.faqQuestions.map((q) => ({ question: q, answer: bank.faqAnswers[q] ?? "" })) : [];

  const existingPostsCode = existingPosts
    .map((p) => `      { title: "${tsString(p.title)}", href: "${p.href}", excerpt: "${tsString(p.excerpt)}" },`)
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
    primaryKeywords: [${clusterPrimaryKeywords(cluster).map((k) => `"${tsString(k)}"`).join(", ")}],
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
    status: "${clusterStatus(cluster, existingPosts.length > 0)}",
  },`);
}

const blogClustersFile = `// Blog cluster roadmap data for EwasteKochi V2.
// These clusters define the content strategy for the /blog/ reference hub.
// Regenerated by scripts/rebuild-clusters-safe.ts (BLOG SCALE SAFETY GATE)
// from src/data/blogRoadmap20.ts (the 600-topic, 20-cluster planning data)
// and src/data/blogContentBank.ts (per-cluster FAQ answers). existingPosts
// link ONLY to the 16 manually reviewed, indexable posts — every other
// roadmap topic is plannedPosts (a title string, no href, not linked
// anywhere) until it's individually rewritten and promoted. See
// reports/blog-scale-safety-gate-report.md and
// .content-quarantine/blog-drafts/MANIFEST.json for the 555 posts held back.

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
console.log(`Regenerated blogClusters.ts: ${BLOG_ROADMAP_20.length} clusters, ${totalExisting} existingPosts (expect 16), ${totalPlanned} plannedPosts (expect 584).`);
