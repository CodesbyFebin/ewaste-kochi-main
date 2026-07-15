// BLOG SCALE SAFETY GATE — duplicate-content gate for indexable blog pages.
// Only checks pages that are actually live and indexable (routes.ts,
// indexable !== false, type "blog") — never applied to roadmap-only text in
// blogRoadmap20.ts/blogContentBank.ts, which isn't rendered as a page.
//
// Fail thresholds (temporary, per the safety-gate spec):
//   - every indexable article must have >= 60% unique body paragraphs
//   - no FAQ answer may appear verbatim on more than 3 indexable pages
//   - no body paragraph longer than 25 words may appear on more than 5
//     indexable pages
//
// Run with: npx tsx scripts/check-duplicate-content.ts

import { readFileSync, existsSync } from "node:fs";
import { ROUTES } from "../src/data/routes";
import { isIndexable } from "../src/lib/indexable";

const FAIL_MIN_UNIQUE_RATIO = 0.6;
const FAIL_MAX_FAQ_REUSE = 3;
const FAIL_MAX_LONG_PARAGRAPH_REUSE = 5;
const LONG_PARAGRAPH_WORD_COUNT = 25;

// De-duplicate by slug: a route can legitimately appear twice in ROUTES (e.g.
// a generated GSC-indexed entry colliding with a hand-written page at the
// same path) -- without this, the same file gets parsed twice and every one
// of its own paragraphs looks "shared with itself".
const indexableBlogSlugs = [
  ...new Set(
    ROUTES.filter((r) => r.type === "blog" && isIndexable(r) && r.path !== "/blog/").map((r) =>
      r.path.replace(/^\/blog\//, "").replace(/\/$/, "")
    )
  ),
];

interface PostData {
  slug: string;
  paragraphs: string[];
  faqs: string[];
}

const posts: PostData[] = [];
for (const slug of indexableBlogSlugs) {
  const file = `src/pages/blog/${slug}/index.astro`;
  if (!existsSync(file)) {
    console.warn(`WARN: indexable route /blog/${slug}/ has no file at ${file}`);
    continue;
  }
  const content = readFileSync(file, "utf8");
  const sectionRe = /<section([^>]*)>\s*<h2[^>]*>([^<]*)<\/h2>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
  const paragraphs: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = sectionRe.exec(content))) {
    const sectionAttrs = m[1];
    const heading = m[2].trim();
    // Final-CTA sections are boilerplate UI chrome, not body content -- their
    // heading text varies ("Have Questions About X?", "Have an Old TV to
    // Dispose Of?", etc.) so match on the class, not the heading string.
    if (sectionAttrs.includes("final-cta") || heading === "Related services") continue;
    const text = m[3].replace(/\s+/g, " ").trim();
    if (text.length > 20) paragraphs.push(text);
  }
  const faqBlock = content.match(/const faqItems = \[([\s\S]*?)\n\];/);
  const faqs: string[] = [];
  if (faqBlock) {
    for (const fm of faqBlock[1].matchAll(/\{\s*q:\s*"([^"]*)",\s*a:\s*"([^"]*)"\s*\}/g)) {
      faqs.push(fm[2]);
    }
  }
  posts.push({ slug, paragraphs, faqs });
}

// Build reverse indices: paragraph text -> which posts use it, faq answer -> which posts use it.
const paragraphUsers = new Map<string, string[]>();
const faqUsers = new Map<string, string[]>();
for (const post of posts) {
  for (const p of post.paragraphs) {
    if (!paragraphUsers.has(p)) paragraphUsers.set(p, []);
    paragraphUsers.get(p)!.push(post.slug);
  }
  for (const f of post.faqs) {
    if (!faqUsers.has(f)) faqUsers.set(f, []);
    faqUsers.get(f)!.push(post.slug);
  }
}

const failures: string[] = [];

// Check 1: per-post unique-paragraph ratio.
console.log(`Checked ${posts.length} indexable posts.\n`);
console.log("Per-post unique-paragraph ratio:");
for (const post of posts) {
  if (post.paragraphs.length === 0) {
    console.log(`  ${post.slug}: no scoped paragraphs found (skipped)`);
    continue;
  }
  const uniqueCount = post.paragraphs.filter((p) => (paragraphUsers.get(p)?.length ?? 0) === 1).length;
  const ratio = uniqueCount / post.paragraphs.length;
  console.log(`  ${post.slug}: ${uniqueCount}/${post.paragraphs.length} unique (${(ratio * 100).toFixed(0)}%)`);
  if (ratio < FAIL_MIN_UNIQUE_RATIO) {
    failures.push(`${post.slug}: only ${(ratio * 100).toFixed(0)}% unique body paragraphs (need >= ${FAIL_MIN_UNIQUE_RATIO * 100}%)`);
  }
}

// Check 2: FAQ answer reuse.
console.log("\nFAQ answer reuse:");
let faqOverLimit = 0;
for (const [answer, users] of faqUsers) {
  if (users.length > FAIL_MAX_FAQ_REUSE) {
    faqOverLimit++;
    failures.push(`FAQ answer reused on ${users.length} pages (max ${FAIL_MAX_FAQ_REUSE}): "${answer.slice(0, 70)}..." -> ${users.join(", ")}`);
  }
}
console.log(`  ${faqOverLimit} FAQ answer(s) exceed the ${FAIL_MAX_FAQ_REUSE}-page reuse limit.`);

// Check 3: long-paragraph reuse.
console.log("\nLong paragraph (25+ words) reuse:");
let paraOverLimit = 0;
for (const [text, users] of paragraphUsers) {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < LONG_PARAGRAPH_WORD_COUNT) continue;
  if (users.length > FAIL_MAX_LONG_PARAGRAPH_REUSE) {
    paraOverLimit++;
    failures.push(`Long paragraph (${wordCount}w) reused on ${users.length} pages (max ${FAIL_MAX_LONG_PARAGRAPH_REUSE}): "${text.slice(0, 70)}..." -> ${users.join(", ")}`);
  }
}
console.log(`  ${paraOverLimit} long paragraph(s) exceed the ${FAIL_MAX_LONG_PARAGRAPH_REUSE}-page reuse limit.`);

console.log("\n--- Summary ---");
if (failures.length > 0) {
  console.error(`FAIL: ${failures.length} duplicate-content violation(s) among indexable pages:`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}
console.log(`PASS: all ${posts.length} indexable posts clear the duplicate-content gate.`);
