// BLOG SCALE SAFETY GATE — quarantines the 555 non-reviewed blog posts
// (465 content-bank-generated + 90 legacy-drafted-but-unreviewed) so the
// live/indexable site returns to the 16-post reviewed baseline (+20-cluster
// roadmap data, which stays as planning data only).
//
// What this does:
//   1. Removes the 555 quarantined RouteEntry blocks from src/data/routes.ts,
//      keeping only the 17 safe blog routes (16 posts + /blog/ hub) and every
//      non-blog route untouched. Tags the surviving blog entries with
//      status/contentSource/indexable metadata.
//   2. Physically moves the 555 quarantined post directories out of
//      src/pages/blog/ into .content-quarantine/blog-drafts/ so Astro's
//      file-based routing can never build them, regardless of routes.ts.
//   3. Regenerates src/data/blogClusters.ts so existingPosts contains only
//      the 16 safe posts; every other roadmap topic reverts to plannedPosts
//      (text-only, no href) — the same semantics blogClusters.ts had before
//      this session's mass-generation work.
//   4. Prunes src/data/blogLinking.ts's POST_META back to the 16 original
//      entries (ALL_ARTICLES re-derives automatically from blogClusters.ts,
//      so it will only ever contain the 16 safe posts after step 3).
//
// Run with: npx tsx scripts/quarantine-generated-blog.ts

import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SAFE_SLUGS = [
  "free-e-waste-pickup-kochi", "sell-old-laptop-kochi", "what-is-ewaste", "e-waste-examples",
  "e-waste-collection-near-me", "what-is-epr-in-e-waste", "e-waste-management-rules-2022",
  "where-to-recycle-old-electronics-kochi", "battery-recycling-near-me-kochi",
  "how-to-book-ewaste-pickup-kochi", "how-to-sell-old-electronics-kochi", "laptop-recycling-kochi",
  "data-destruction-kochi-guide", "corporate-ewaste-pickup-kochi", "how-ewaste-scrap-quotes-work-kochi",
  "recycling-basics",
];
const SAFE_HREFS = new Set(SAFE_SLUGS.map((s) => `/blog/${s}/`));

const remainingTopics: { slug: string }[] = JSON.parse(readFileSync("scripts/data/remaining-topics.json", "utf8"));
const GENERATED_SLUGS = new Set(remainingTopics.map((r) => r.slug));

const allBlogDirs = readdirSync("src/pages/blog", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const quarantineSlugs = allBlogDirs.filter((d) => !SAFE_SLUGS.includes(d));
console.log(`Blog dirs on disk: ${allBlogDirs.length}`);
console.log(`Safe (kept): ${allBlogDirs.length - quarantineSlugs.length}`);
console.log(`Quarantined: ${quarantineSlugs.length}`);

function sourceOf(slug: string): "manual" | "legacy" | "generated" {
  if (SAFE_SLUGS.includes(slug)) return "manual";
  if (GENERATED_SLUGS.has(slug)) return "generated";
  return "legacy";
}

// ── Step 1: routes.ts surgery ───────────────────────────────────────────────
let routesContent = readFileSync("src/data/routes.ts", "utf8");

// Add the new optional fields to the RouteEntry interface, once.
if (!routesContent.includes("contentSource?:")) {
  routesContent = routesContent.replace(
    `  // Path of this page's translation counterpart, if one exists and is built.
  hreflangPair?: string;
}`,
    `  // Path of this page's translation counterpart, if one exists and is built.
  hreflangPair?: string;
  // Publication governance for blog content (BLOG SCALE SAFETY GATE). Optional
  // and defaulted (published / manual / indexable) for every non-blog route;
  // every route of type "blog" carries an explicit value. A post is only
  // discoverable (sitemap, content-index, ai-sitemap, linked as a live guide)
  // when indexable is true — see src/lib/indexable.ts.
  status?: "published" | "review" | "draft";
  contentSource?: "manual" | "legacy" | "generated";
  indexable?: boolean;
}`
  );
}

// Split into individual top-level RouteEntry blocks (each "  {\n ... \n  },").
const blockRe = /  \{\n(?:.*\n)*?  \},\n/g;
const blocks = routesContent.match(blockRe) ?? [];
console.log(`Parsed ${blocks.length} route blocks.`);

const keptBlocks: string[] = [];
let removedCount = 0;
for (const block of blocks) {
  const pathMatch = block.match(/path:\s*"(\/blog\/[^"]*)"/);
  if (!pathMatch) {
    keptBlocks.push(block); // non-blog route, untouched
    continue;
  }
  const path = pathMatch[1];
  if (path === "/blog/" || SAFE_HREFS.has(path)) {
    // Safe blog route — tag with governance fields, keep.
    const tagged = block.replace(
      /\n  \},\n$/,
      `\n    status: "published",\n    contentSource: "manual",\n    indexable: true,\n  },\n`
    );
    keptBlocks.push(tagged);
  } else {
    removedCount++; // quarantined — drop the route entirely
  }
}
console.log(`Kept blog routes (incl. hub): ${keptBlocks.length - (blocks.length - [...routesContent.matchAll(/path:\s*"\/blog\//g)].length)}`);
console.log(`Removed quarantined route entries: ${removedCount}`);

const header = routesContent.slice(0, routesContent.indexOf("export const ROUTES"));
const arrayOpen = routesContent.slice(
  routesContent.indexOf("export const ROUTES"),
  routesContent.indexOf("export const ROUTES") + routesContent.slice(routesContent.indexOf("export const ROUTES")).indexOf("[\n") + 2
);
const newRoutesContent = header + arrayOpen + keptBlocks.join("") + "];\n";
writeFileSync("src/data/routes.ts", newRoutesContent);
console.log("Wrote pruned routes.ts.");

// ── Step 2: physically quarantine the post directories ─────────────────────
const quarantineDir = ".content-quarantine/blog-drafts";
mkdirSync(quarantineDir, { recursive: true });
let moved = 0;
for (const slug of quarantineSlugs) {
  const from = join("src/pages/blog", slug);
  const to = join(quarantineDir, slug);
  if (existsSync(to)) continue;
  renameSync(from, to);
  moved++;
}
console.log(`Moved ${moved} post directories to ${quarantineDir}/`);

// Write a manifest so it's clear what's in quarantine and why, without having
// to re-derive it from remaining-topics.json / directory diffing again.
const manifest = quarantineSlugs.map((slug) => ({ slug, contentSource: sourceOf(slug), status: sourceOf(slug) === "generated" ? "draft" : "review" }));
writeFileSync(join(quarantineDir, "MANIFEST.json"), JSON.stringify(manifest, null, 2));
console.log(`Wrote manifest for ${manifest.length} quarantined posts.`);

console.log("\nDone with routes.ts + file quarantine. Next: regenerate blogClusters.ts + blogLinking.ts.");
