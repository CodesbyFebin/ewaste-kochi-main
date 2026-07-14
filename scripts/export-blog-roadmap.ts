// Exports BLOG_ROADMAP_20 (20 clusters x 30 topics = 600 planned blog titles)
// to a flat JSON file so the Python image-generation script has a stable,
// language-agnostic input. Source of truth stays src/data/blogRoadmap20.ts —
// this is a read-only export, it does not touch that file or create routes.
//
// Run with: npx tsx scripts/export-blog-roadmap.ts

import { writeFileSync } from "node:fs";
import { BLOG_ROADMAP_20 } from "../src/data/blogRoadmap20";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const seenSlugs = new Map<string, number>();

function uniqueSlug(title: string): string {
  const base = slugify(title);
  const count = seenSlugs.get(base) ?? 0;
  seenSlugs.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

const rows = BLOG_ROADMAP_20.flatMap((cluster) =>
  cluster.blogTopics.map((title) => ({
    title,
    slug: uniqueSlug(title),
    clusterName: cluster.name,
    clusterSlug: cluster.slug,
    intent: cluster.intent,
  }))
);

writeFileSync("scripts/data/blog-roadmap-600.json", JSON.stringify(rows, null, 2));

console.log(`Exported ${rows.length} topics across ${BLOG_ROADMAP_20.length} clusters to scripts/data/blog-roadmap-600.json`);
