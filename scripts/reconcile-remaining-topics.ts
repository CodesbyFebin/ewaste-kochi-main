// Determines which of the 600 blogRoadmap20 topics are NOT yet covered by an
// existing post (16 live + 90 previously-drafted-but-unwired), using
// token-overlap similarity on title text (titles differ slightly between the
// roadmap and the actual post files, e.g. SEO suffixes, "e-waste" vs "ewaste"
// spelling), not exact string match.
//
// Run with: npx tsx scripts/reconcile-remaining-topics.ts

import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import { BLOG_ROADMAP_20 } from "../src/data/blogRoadmap20";

const STOPWORDS = new Set([
  "a", "an", "the", "in", "on", "of", "for", "to", "and", "or", "is", "are",
  "what", "how", "why", "should", "do", "does", "your", "you", "before",
  "after", "with", "kochi", "e-waste", "ewaste", "electronics", "electronic",
  "guide", "guides", "recycling", "recycle", "recycled",
]);

function tokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      // Strip "e-waste"/"ewaste"/"e waste" as a unit FIRST — otherwise the
      // hyphen-to-space step below fragments it into a stray "waste" token
      // that appears in nearly every topic and title, acting as a spurious
      // universal match (e.g. wrongly matched "What Is E-Waste Recycling?"
      // to "E-Waste Examples" over the actual near-duplicate "what-is-ewaste"
      // purely because both contained the word "waste").
      .replace(/e-?waste/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = new Set([...a, ...b]).size;
  return inter / union;
}

// Collect every existing post's title (from its own frontmatter, the real
// on-page title) and its directory slug.
const blogDir = "src/pages/blog";
const existingSlugs = readdirSync(blogDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

interface ExistingPost {
  slug: string;
  title: string;
  titleTokens: Set<string>;
}

const existingPosts: ExistingPost[] = [];
for (const slug of existingSlugs) {
  const file = `${blogDir}/${slug}/index.astro`;
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf8");
  const match = content.match(/const title = "([^"]*)"/);
  const title = match ? match[1] : slug;
  existingPosts.push({ slug, title, titleTokens: tokens(title) });
}

console.log(`Existing post files found: ${existingPosts.length}`);

// 0.45-0.50 produced real false positives on manual review (e.g. "Lithium
// Battery Disposal" matched to an inverter/lead-acid post — different
// chemistry, a distinction this project's content deliberately maintains
// elsewhere). Raised to reduce wrongly-excluded topics: under-covering (a
// real gap marked "already covered") is worse here than a small amount of
// topical overlap between two genuinely-scoped posts.
const SIMILARITY_THRESHOLD = 0.65;

const remaining: { title: string; slug: string; clusterName: string; clusterSlug: string }[] = [];
const covered: { roadmapTitle: string; matchedSlug: string; matchedTitle: string; score: number }[] = [];

for (const cluster of BLOG_ROADMAP_20) {
  for (const topic of cluster.blogTopics) {
    const topicTokens = tokens(topic);
    // Also compare against the roadmap-topic's own slugified form vs each
    // existing post's directory slug (catches cases where title wording
    // diverges more than the slug does).
    const topicSlug = topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let best = { score: 0, slug: "", title: "" };
    for (const post of existingPosts) {
      const titleScore = jaccard(topicTokens, post.titleTokens);
      // Pass raw hyphenated slugs straight to tokens() — it strips "e-waste"
      // itself before generically turning remaining hyphens into spaces, so
      // pre-replacing hyphens here would (and did) break that match.
      const slugScore = jaccard(tokens(topicSlug), tokens(post.slug));
      const score = Math.max(titleScore, slugScore);
      if (score > best.score) best = { score, slug: post.slug, title: post.title };
    }

    if (best.score >= SIMILARITY_THRESHOLD) {
      covered.push({ roadmapTitle: topic, matchedSlug: best.slug, matchedTitle: best.title, score: best.score });
    } else {
      remaining.push({
        title: topic,
        slug: topicSlug,
        clusterName: cluster.name,
        clusterSlug: cluster.slug,
      });
    }
  }
}

console.log(`Roadmap topics: 600`);
console.log(`Matched to an existing post: ${covered.length}`);
console.log(`Remaining (no existing post found): ${remaining.length}`);

writeFileSync("scripts/data/remaining-topics.json", JSON.stringify(remaining, null, 2));
writeFileSync("scripts/data/covered-topics.json", JSON.stringify(covered, null, 2));

console.log("\nWrote scripts/data/remaining-topics.json and scripts/data/covered-topics.json");

// Print a sample of covered matches for a manual sanity check.
console.log("\n--- Sample matches (first 15) ---");
for (const c of covered.slice(0, 15)) {
  console.log(`  "${c.roadmapTitle}" -> ${c.matchedSlug} ("${c.matchedTitle}") [${c.score.toFixed(2)}]`);
}

console.log("\n--- Remaining per cluster ---");
const byCluster = new Map<string, number>();
for (const r of remaining) byCluster.set(r.clusterName, (byCluster.get(r.clusterName) ?? 0) + 1);
for (const [name, count] of byCluster) console.log(`  ${name}: ${count}`);
