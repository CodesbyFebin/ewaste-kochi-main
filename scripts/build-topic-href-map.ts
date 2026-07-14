// Builds a complete map of all 600 blogRoadmap20 topics -> the real live post
// href that now covers them, combining:
//   - scripts/data/covered-topics.json  (134 topics matched to a pre-existing
//     post — the 16 originally-live posts + the 90 previously-drafted ones)
//   - scripts/data/remaining-topics.json (466 topics, 465 unique slugs, each
//     now a real generated post from scripts/generate-remaining-posts.ts)
//
// Output: scripts/data/topic-href-map.json — array of
//   { clusterSlug, topicTitle, href }
// covering all 600 roadmap topic entries (600, not 599, because one topic
// title is a literal duplicate across two clusters in blogRoadmap20.ts
// itself — both entries correctly point to the same href).
//
// Run with: npx tsx scripts/build-topic-href-map.ts

import { readFileSync, writeFileSync } from "node:fs";
import { BLOG_ROADMAP_20 } from "../src/data/blogRoadmap20";

interface Covered {
  roadmapTitle: string;
  matchedSlug: string;
  matchedTitle: string;
  score: number;
}
interface Remaining {
  title: string;
  slug: string;
  clusterName: string;
  clusterSlug: string;
}

const covered: Covered[] = JSON.parse(readFileSync("scripts/data/covered-topics.json", "utf8"));
const remaining: Remaining[] = JSON.parse(readFileSync("scripts/data/remaining-topics.json", "utf8"));

// covered-topics.json doesn't carry clusterSlug, so re-derive it by finding
// which cluster's blogTopics contains each roadmapTitle.
function findClusterForTitle(title: string): string | undefined {
  for (const cluster of BLOG_ROADMAP_20) {
    if (cluster.blogTopics.includes(title)) return cluster.slug;
  }
  return undefined;
}

const rows: { clusterSlug: string; topicTitle: string; href: string }[] = [];

for (const c of covered) {
  const clusterSlug = findClusterForTitle(c.roadmapTitle);
  if (!clusterSlug) {
    console.warn(`WARN: no cluster found for covered topic "${c.roadmapTitle}"`);
    continue;
  }
  rows.push({ clusterSlug, topicTitle: c.roadmapTitle, href: `/blog/${c.matchedSlug}/` });
}

for (const r of remaining) {
  rows.push({ clusterSlug: r.clusterSlug, topicTitle: r.title, href: `/blog/${r.slug}/` });
}

console.log(`Total topic->href rows: ${rows.length} (expected 600)`);

// Sanity: every roadmap topic (600 entries, counting the 1 literal dup twice)
// should now have exactly one row.
let totalRoadmapTopics = 0;
for (const c of BLOG_ROADMAP_20) totalRoadmapTopics += c.blogTopics.length;
console.log(`Total roadmap topic entries: ${totalRoadmapTopics}`);

const missing: string[] = [];
for (const c of BLOG_ROADMAP_20) {
  for (const topic of c.blogTopics) {
    const found = rows.find((r) => r.clusterSlug === c.slug && r.topicTitle === topic);
    if (!found) missing.push(`${c.slug} :: ${topic}`);
  }
}
console.log(`Missing mappings before fallback: ${missing.length}`);
missing.forEach((m) => console.log("  MISSING:", m));

// A handful of topic titles appear verbatim in more than one cluster in
// blogRoadmap20.ts itself (e.g. "E-Waste Pickup for Shops and Small
// Businesses" is listed under both "E-Waste Pickup Near Me" and "Business /
// Corporate E-Waste"). The covered/remaining data doesn't track which
// cluster a match came from, so the first pass above only produced one row
// per unique title. Fill in the rest by cloning the href from whichever
// cluster did get a row for that exact title — same real-world topic, same
// correct href, just also linked from the second cluster it belongs to.
let filled = 0;
for (const c of BLOG_ROADMAP_20) {
  for (const topic of c.blogTopics) {
    const exists = rows.find((r) => r.clusterSlug === c.slug && r.topicTitle === topic);
    if (exists) continue;
    const sibling = rows.find((r) => r.topicTitle === topic);
    if (sibling) {
      rows.push({ clusterSlug: c.slug, topicTitle: topic, href: sibling.href });
      filled++;
    } else {
      console.warn(`STILL MISSING after fallback: ${c.slug} :: ${topic}`);
    }
  }
}
console.log(`Filled via sibling-cluster fallback: ${filled}`);
console.log(`Final total rows: ${rows.length}`);

writeFileSync("scripts/data/topic-href-map.json", JSON.stringify(rows, null, 2));
console.log("\nWrote scripts/data/topic-href-map.json");
