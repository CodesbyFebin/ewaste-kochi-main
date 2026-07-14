// Fails if any live, indexable blog post has zero inbound "related articles"
// links from the internal linking engine (src/data/blogLinking.ts).
//
// Two modes:
//   npx tsx scripts/check-orphan-articles.ts         Indexable-only (default).
//     Checks ALL_ARTICLES, which is derived entirely from blogClusters.ts
//     existingPosts — after the BLOG_SCALE_SAFETY_GATE (2026-07-14) that's
//     exactly the 16 reviewed, indexable posts. This is the mode that gates
//     `npm run validate` / production.
//
//   npx tsx scripts/check-orphan-articles.ts --all   All-content diagnostic.
//     Additionally scans every .astro file under src/pages/blog/ AND
//     .content-quarantine/blog-drafts/ on disk and reports which ones aren't
//     referenced anywhere in the live linking graph. This is informational
//     only (never fails the build) — quarantined drafts are *expected* to
//     show up here, since by design they're outside the indexable graph
//     until individually reviewed and promoted.

import { readdirSync } from "node:fs";
import { ALL_ARTICLES, findOrphanArticles } from "../src/data/blogLinking";

const allMode = process.argv.includes("--all");

const orphans = findOrphanArticles();
console.log(`[indexable-only] Checked ${ALL_ARTICLES.length} indexable articles for inbound related-article links.`);

if (orphans.length > 0) {
  console.error(`\nFAIL: ${orphans.length} orphan article(s) with zero inbound related links:`);
  for (const o of orphans) console.error(`  - ${o.href} (cluster: ${o.clusterSlug})`);
  process.exit(1);
}
console.log("PASS: no orphans among indexable articles.");

if (allMode) {
  const indexableHrefs = new Set(ALL_ARTICLES.map((a) => a.href));

  function listDirSlugs(dir: string): string[] {
    try {
      return readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
    } catch {
      return [];
    }
  }

  const liveSlugs = listDirSlugs("src/pages/blog");
  const quarantinedSlugs = listDirSlugs(".content-quarantine/blog-drafts");

  // Cluster hub/landing pages (recycling-basics) link to articles but aren't
  // themselves an article in ALL_ARTICLES — excluded here, not a real gap.
  const HUB_PAGES = new Set(["recycling-basics"]);

  const notInGraph = [
    ...liveSlugs.map((s) => ({ slug: s, href: `/blog/${s}/`, location: "src/pages/blog" })),
    ...quarantinedSlugs.map((s) => ({ slug: s, href: `/blog/${s}/`, location: ".content-quarantine/blog-drafts" })),
  ].filter((e) => !indexableHrefs.has(e.href) && !HUB_PAGES.has(e.slug));

  console.log(`\n[all-content diagnostic] ${liveSlugs.length} live dirs + ${quarantinedSlugs.length} quarantined dirs on disk.`);
  console.log(`${notInGraph.length} of those are outside the indexable linking graph (expected for quarantined drafts).`);
  const unexpected = notInGraph.filter((e) => e.location === "src/pages/blog");
  if (unexpected.length > 0) {
    console.warn(`\nWARN: ${unexpected.length} post(s) are LIVE (buildable, under src/pages/blog) but outside the indexable graph — these should be either promoted (added to blogClusters.ts) or quarantined, not left in this in-between state:`);
    unexpected.forEach((e) => console.warn(`  - ${e.href}`));
  } else {
    console.log("No live (buildable) posts are stranded outside the indexable graph.");
  }
}
