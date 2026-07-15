import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { BLOG_ROADMAP_20 } from "../src/data/blogRoadmap20";
import { ROUTES } from "../src/data/routes";
import { isIndexable } from "../src/lib/indexable";

type ManifestRow = {
  slug: string;
  contentSource: "generated" | "legacy";
  status: "draft" | "review";
};

type TopicHrefRow = {
  clusterSlug: string;
  topicTitle: string;
  href: string;
};

type QueueRow = {
  batch: string;
  cluster: string;
  clusterSlug: string;
  priority: string;
  topicTitle: string;
  targetPath: string;
  slug: string;
  source: "live" | "quarantine-review" | "quarantine-draft" | "missing-draft";
  currentWordCount: number;
  currentFaqCount: number;
  recommendedAction: string;
};

const GENERATED_AT = process.env.REPORT_GENERATED_AT ?? new Date().toISOString();
const MIN_WORDS_TO_PROMOTE = 1200;
const TARGET_QUEUE_SIZE = 20;

const liveBlogPaths = new Set(
  ROUTES.filter((route) => route.type === "blog" && route.path !== "/blog/" && isIndexable(route)).map((route) => route.path)
);

const manifest: ManifestRow[] = existsSync(".content-quarantine/blog-drafts/MANIFEST.json")
  ? JSON.parse(readFileSync(".content-quarantine/blog-drafts/MANIFEST.json", "utf8"))
  : [];
const manifestBySlug = new Map(manifest.map((row) => [row.slug, row]));

const topicHrefRows: TopicHrefRow[] = existsSync("scripts/data/topic-href-map.json")
  ? JSON.parse(readFileSync("scripts/data/topic-href-map.json", "utf8"))
  : [];

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath: string, rows: Record<string, unknown>[], columns: string[]) {
  const lines = [columns.join(",")];
  for (const row of rows) lines.push(columns.map((column) => csvCell(row[column])).join(","));
  writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function slugFromPath(path: string): string {
  return path.replace(/^\/blog\//, "").replace(/\/$/, "");
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function targetHref(clusterSlug: string, topicTitle: string): string {
  const mapped = topicHrefRows.find((row) => row.clusterSlug === clusterSlug && row.topicTitle === topicTitle);
  return mapped?.href ?? `/blog/${slugify(topicTitle)}/`;
}

function draftPathForSlug(slug: string): string {
  return `.content-quarantine/blog-drafts/${slug}/index.astro`;
}

function strippedText(content: string): string {
  return content
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function metricsForDraft(slug: string): { wordCount: number; faqCount: number } {
  const filePath = draftPathForSlug(slug);
  if (!existsSync(filePath)) return { wordCount: 0, faqCount: 0 };
  const content = readFileSync(filePath, "utf8");
  const words = strippedText(content).split(/\s+/).filter(Boolean);
  const faqCount = [...content.matchAll(/\{\s*q:\s*"/g)].length;
  return { wordCount: words.length, faqCount };
}

function sourceForSlug(slug: string): QueueRow["source"] {
  const row = manifestBySlug.get(slug);
  if (!row) return "missing-draft";
  return row.status === "review" ? "quarantine-review" : "quarantine-draft";
}

function actionFor(source: QueueRow["source"], wordCount: number): string {
  if (source === "missing-draft") return "Create a new original article brief and draft before any route work.";
  if (source === "quarantine-review") {
    return wordCount >= MIN_WORDS_TO_PROMOTE
      ? "Manual fact-check, uniqueness check, real image/author review, then promote in a small batch."
      : `Expand to ${MIN_WORDS_TO_PROMOTE}+ original words, fact-check, then promote only after validation.`;
  }
  return `Rewrite substantially to ${MIN_WORDS_TO_PROMOTE}+ original words; do not publish the generated draft as-is.`;
}

function priorityWeight(priority: string): number {
  if (/very high/i.test(priority)) return 0;
  if (/high/i.test(priority)) return 1;
  if (/medium/i.test(priority)) return 2;
  return 3;
}

const queueRows: QueueRow[] = [];
const queuedTargetPaths = new Set<string>();
let duplicateRoadmapMappings = 0;
const clusterSummaries = BLOG_ROADMAP_20.map((cluster) => {
  let live = 0;
  let quarantined = 0;
  let missing = 0;

  for (const topicTitle of cluster.blogTopics) {
    const path = targetHref(cluster.slug, topicTitle);
    const slug = slugFromPath(path);
    if (liveBlogPaths.has(path)) {
      live += 1;
      continue;
    }

    if (manifestBySlug.has(slug)) quarantined += 1;
    else missing += 1;

    if (queuedTargetPaths.has(path)) {
      duplicateRoadmapMappings += 1;
      continue;
    }
    queuedTargetPaths.add(path);

    const source = sourceForSlug(slug);
    const metrics = metricsForDraft(slug);
    queueRows.push({
      batch: "",
      cluster: cluster.name,
      clusterSlug: cluster.slug,
      priority: cluster.priority,
      topicTitle,
      targetPath: path,
      slug,
      source,
      currentWordCount: metrics.wordCount,
      currentFaqCount: metrics.faqCount,
      recommendedAction: actionFor(source, metrics.wordCount),
    });
  }

  return {
    cluster: cluster.name,
    clusterSlug: cluster.slug,
    priority: cluster.priority,
    topics: cluster.blogTopics.length,
    live,
    quarantined,
    missing,
  };
});

queueRows.sort((a, b) => {
  const sourceWeight = { "quarantine-review": 0, "quarantine-draft": 1, "missing-draft": 2, live: 3 } as Record<string, number>;
  return (
    priorityWeight(a.priority) - priorityWeight(b.priority) ||
    sourceWeight[a.source] - sourceWeight[b.source] ||
    b.currentWordCount - a.currentWordCount ||
    a.topicTitle.localeCompare(b.topicTitle)
  );
});

queueRows.forEach((row, index) => {
  if (index < TARGET_QUEUE_SIZE) row.batch = "Batch 1 - AdSense quality expansion";
  else if (index < TARGET_QUEUE_SIZE * 2) row.batch = "Batch 2 - next quality expansion";
  else row.batch = "Backlog";
});

const batchOne = queueRows.slice(0, TARGET_QUEUE_SIZE);
const liveCount = liveBlogPaths.size;
const reviewCount = manifest.filter((row) => row.status === "review").length;
const draftCount = manifest.filter((row) => row.status === "draft").length;

mkdirSync("data", { recursive: true });
mkdirSync("reports", { recursive: true });

writeCsv(
  "data/blog-silo-editorial-queue.csv",
  queueRows,
  [
    "batch",
    "cluster",
    "clusterSlug",
    "priority",
    "topicTitle",
    "targetPath",
    "slug",
    "source",
    "currentWordCount",
    "currentFaqCount",
    "recommendedAction",
  ]
);

writeFileSync(
  "data/blog-silo-editorial-queue.json",
  `${JSON.stringify(
    {
      generatedAt: GENERATED_AT,
      mode: "editorial_queue_only_no_routes_created",
      minWordsToPromote: MIN_WORDS_TO_PROMOTE,
      targetQueueSize: TARGET_QUEUE_SIZE,
      liveIndexableBlogPosts: liveCount,
      quarantinedDrafts: manifest.length,
      quarantinedReviewPosts: reviewCount,
      quarantinedGeneratedDrafts: draftCount,
      duplicateRoadmapMappings,
      clusterSummaries,
      queueRows,
    },
    null,
    2
  )}\n`
);

const batchRows = batchOne
  .map(
    (row, index) =>
      `| ${index + 1} | ${row.topicTitle} | ${row.cluster} | ${row.source} | ${row.currentWordCount} | ${row.recommendedAction} |`
  )
  .join("\n");

const clusterRows = clusterSummaries
  .map((row) => `| ${row.cluster} | ${row.priority} | ${row.live} | ${row.quarantined} | ${row.missing} |`)
  .join("\n");

writeFileSync(
  "reports/blog-silo-adsense-publishing-plan.md",
  `# Blog Silo AdSense Publishing Plan

Generated: ${GENERATED_AT}

## Safety Position

Do not use a bulk blog generator to create public, indexable placeholder posts. The quarantined drafts are an editorial backlog, not a sitemap feed. Promotion should be small-batch: rewrite, fact-check, add real media where available, run duplicate-content checks, then add the page to routes/discovery.

## Current State

- Live indexable blog posts, excluding /blog/: ${liveCount}
- Quarantined blog drafts: ${manifest.length}
- Quarantined legacy/review posts: ${reviewCount}
- Quarantined generated drafts: ${draftCount}
- Roadmap clusters: ${BLOG_ROADMAP_20.length}
- Roadmap topics: ${BLOG_ROADMAP_20.reduce((total, cluster) => total + cluster.blogTopics.length, 0)}
- Duplicate roadmap mappings collapsed from queue: ${duplicateRoadmapMappings}
- This script created routes: no
- This script changed sitemap/discovery: no

## Cluster Coverage

| Cluster | Priority | Live | Quarantined | Missing Draft |
| --- | --- | ---: | ---: | ---: |
${clusterRows}

## Batch 1 Editorial Queue

| # | Topic | Cluster | Source | Current Words | Action |
| ---: | --- | --- | --- | ---: | --- |
${batchRows}

## Promotion Rules

- Target ${MIN_WORDS_TO_PROMOTE}+ original words before promotion.
- Keep FAQs visible and matched to any FAQPage schema.
- Add BlogPosting/WebPage only; do not add Review or AggregateRating schema.
- Add real original images when available; otherwise use no fake facility/team imagery.
- Promote at most 5-10 posts per batch, then run \`npm run check\`, \`npm run build\`, \`npm run validate\`, and \`npx tsx scripts/check-duplicate-content.ts\`.
- Only after validation should a promoted post be added to \`src/data/routes.ts\`, \`src/data/blogClusters.ts\`, and discovery surfaces.

## Files Written

- \`data/blog-silo-editorial-queue.csv\`
- \`data/blog-silo-editorial-queue.json\`
- \`reports/blog-silo-adsense-publishing-plan.md\`
`
);

console.info(`[blog-silos] live indexable blog posts: ${liveCount}`);
console.info(`[blog-silos] quarantined drafts: ${manifest.length}`);
console.info(`[blog-silos] batch 1 queue: ${batchOne.length}`);
console.info("[blog-silos] wrote data/blog-silo-editorial-queue.csv");
console.info("[blog-silos] wrote reports/blog-silo-adsense-publishing-plan.md");
