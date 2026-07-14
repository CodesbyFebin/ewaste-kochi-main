// 16 real, pre-existing posts were left out of the full blogClusters.ts
// regeneration in wire-live.ts because scripts/reconcile-remaining-topics.ts
// never matched them to a roadmap topic (so they never got a row in
// scripts/data/topic-href-map.json, and the regenerated existingPosts arrays
// — built purely from that map — never reference them). They're still live,
// routed pages (confirmed via routes.ts + dist build), just absent from the
// linking engine and every cluster card. This appends each to the
// existingPosts array of its best-fit cluster so they participate in
// ALL_ARTICLES / getRelatedArticles like every other post.
//
// Run with: npx tsx scripts/wire-legacy-orphans.ts

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const ASSIGNMENTS: { slug: string; clusterSlug: string }[] = [
  { slug: "broken-electronics-value-recycling-kochi", clusterSlug: "scrap-price-guides-market-updates" },
  { slug: "copier-photocopier-recycling-kochi", clusterSlug: "printer-scanner-office-peripheral-recycling" },
  { slug: "e-waste-examples", clusterSlug: "e-waste-recycling-basics" },
  { slug: "e-waste-management-rules-2022", clusterSlug: "kerala-ewaste-rules-compliance" },
  { slug: "ewaste-collection-near-me-kochi", clusterSlug: "e-waste-pickup-near-me" },
  { slug: "ewaste-donation-reuse-guide-kochi", clusterSlug: "environmental-impact-sustainability" },
  { slug: "ewaste-office-relocation-readiness-kochi", clusterSlug: "business-corporate-ewaste" },
  { slug: "ewaste-recycling-students-kochi", clusterSlug: "school-apartment-community-ewaste-drives" },
  { slug: "free-e-waste-pickup-kochi", clusterSlug: "e-waste-pickup-near-me" },
  { slug: "how-to-reduce-e-waste-at-home-kochi", clusterSlug: "environmental-impact-sustainability" },
  { slug: "printer-cartridge-toner-recycling-kochi", clusterSlug: "printer-scanner-office-peripheral-recycling" },
  { slug: "router-modem-recycling-kochi", clusterSlug: "server-network-equipment-recycling" },
  { slug: "smart-home-hub-recycling-kochi", clusterSlug: "cctv-security-smart-device-recycling" },
  { slug: "solar-panel-recycling-kochi", clusterSlug: "solar-inverter-power-electronics-recycling" },
  { slug: "what-is-epr-in-e-waste", clusterSlug: "kerala-ewaste-rules-compliance" },
  { slug: "what-is-ewaste", clusterSlug: "e-waste-recycling-basics" },
];

function tsString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function getPostInfo(slug: string): { title: string; excerpt: string } {
  const file = `src/pages/blog/${slug}/index.astro`;
  const content = readFileSync(file, "utf8");
  const titleMatch = content.match(/const title = "([^"]*)"/);
  const descMatch = content.match(/const description =\s*\n?\s*"([^"]*)"/);
  const title = titleMatch ? titleMatch[1] : slug;
  const excerpt = descMatch ? descMatch[1].split(/(?<=[.!])\s+/)[0] : title;
  return { title, excerpt };
}

let clustersContent = readFileSync("src/data/blogClusters.ts", "utf8");

for (const { slug, clusterSlug } of ASSIGNMENTS) {
  const href = `/blog/${slug}/`;
  const file = `src/pages/blog/${slug}/index.astro`;
  if (!existsSync(file)) {
    console.warn(`SKIP (file missing): ${slug}`);
    continue;
  }
  if (clustersContent.includes(`href: "${href}"`)) {
    console.warn(`SKIP (already referenced): ${href}`);
    continue;
  }
  const { title, excerpt } = getPostInfo(slug);
  const newEntry = `      { title: "${tsString(title)}", href: "${href}", excerpt: "${tsString(excerpt)}" },\n`;

  const clusterAnchor = `    slug: "${clusterSlug}",`;
  const clusterIdx = clustersContent.indexOf(clusterAnchor);
  if (clusterIdx === -1) {
    console.warn(`SKIP (cluster not found): ${clusterSlug} for ${slug}`);
    continue;
  }
  const existingPostsAnchor = "existingPosts: [\n";
  const epIdx = clustersContent.indexOf(existingPostsAnchor, clusterIdx);
  if (epIdx === -1) {
    console.warn(`SKIP (existingPosts not found): ${clusterSlug} for ${slug}`);
    continue;
  }
  const insertAt = epIdx + existingPostsAnchor.length;
  clustersContent = clustersContent.slice(0, insertAt) + newEntry + clustersContent.slice(insertAt);
  console.log(`Added ${href} -> ${clusterSlug}`);
}

writeFileSync("src/data/blogClusters.ts", clustersContent);
console.log("\nDone.");
