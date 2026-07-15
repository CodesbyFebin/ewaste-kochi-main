import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { ROUTES } from "../src/data/routes";
import { SITE_URL } from "../src/data/site";
import { isIndexable } from "../src/lib/indexable";

type Candidate = {
  path: string;
  url: string;
  tier: string;
  reason: string;
  sourceFiles: string[];
};

type LiveCheck = Candidate & {
  status: number;
  finalUrl: string;
  canonical: string;
  noindex: boolean;
  ok: boolean;
  issue: string;
  recommendation: string;
};

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const [key, ...value] = arg.slice(2).split("=");
      return [key, value.join("=") || "true"];
    })
);

const GENERATED_AT = args.get("generated-at") ?? process.env.REPORT_GENERATED_AT ?? new Date().toISOString();
const since = args.get("since") ?? "HEAD~1";
const includeWorkingTree = args.get("include-working-tree") === "true";

const routeByPath = new Map(ROUTES.map((route) => [route.path, route]));
const priorityByPath = new Map(readPriorityQueue().map((entry) => [entry.path, entry.tier]));

function csvCell(value: unknown): string {
  const text = value == null ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath: string, rows: Record<string, unknown>[], columns: string[]) {
  const lines = [columns.join(",")];
  for (const row of rows) {
    lines.push(columns.map((column) => csvCell(row[column])).join(","));
  }
  writeFileSync(filePath, `${lines.join("\n")}\n`);
}

function git(argsForGit: string[]): string {
  return execFileSync("git", argsForGit, { encoding: "utf8" }).trim();
}

function changedFilesFromGit(): string[] {
  const files = new Set<string>();

  try {
    git(["diff", "--name-only", `${since}..HEAD`])
      .split("\n")
      .filter(Boolean)
      .forEach((file) => files.add(file));
  } catch (error) {
    console.warn(`[freshness] Could not read committed diff for ${since}..HEAD: ${String(error)}`);
  }

  if (includeWorkingTree) {
    try {
      git(["diff", "--name-only"])
        .split("\n")
        .filter(Boolean)
        .forEach((file) => files.add(file));
    } catch (error) {
      console.warn(`[freshness] Could not read working tree diff: ${String(error)}`);
    }
  }

  return [...files].sort();
}

function pagePathFromSource(file: string): string | null {
  if (!file.startsWith("src/pages/")) return null;
  if (!/\.(astro|tsx?)$/.test(file)) return null;
  if (file.includes("[") || file.includes("]")) return null;

  const relative = file.replace(/^src\/pages\//, "").replace(/\.(astro|tsx?)$/, "");
  if (relative === "index") return "/";
  if (relative.endsWith("/index")) return `/${relative.replace(/\/index$/, "")}/`;
  return `/${relative}/`;
}

function readPriorityQueue(): Array<{ tier: string; path: string }> {
  const filePath = "data/gsc-p4-indexing-priority-queue.csv";
  if (!existsSync(filePath)) return [];

  return readFileSync(filePath, "utf8")
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [tier, url] = line.split(",");
      const path = url?.replace(SITE_URL, "") ?? "";
      return { tier: tier ?? "P3", path };
    })
    .filter((entry) => entry.path.startsWith("/"));
}

function candidateFromPath(path: string, reason: string, sourceFile: string): Candidate | null {
  const route = routeByPath.get(path);
  if (!route) return null;
  if (!isIndexable(route)) return null;

  return {
    path,
    url: `${SITE_URL}${path}`,
    tier: priorityByPath.get(path) ?? "freshness",
    reason,
    sourceFiles: [sourceFile],
  };
}

function collectCandidates(changedFiles: string[]): Candidate[] {
  const candidates = new Map<string, Candidate>();
  const add = (candidate: Candidate | null) => {
    if (!candidate) return;
    const existing = candidates.get(candidate.path);
    if (existing) {
      existing.sourceFiles = [...new Set([...existing.sourceFiles, ...candidate.sourceFiles])].sort();
      existing.reason = [...new Set([...existing.reason.split("; "), candidate.reason])].join("; ");
      return;
    }
    candidates.set(candidate.path, candidate);
  };

  for (const file of changedFiles) {
    const directPath = pagePathFromSource(file);
    if (directPath) {
      add(candidateFromPath(directPath, "page source changed", file));
      continue;
    }

    if (file === "src/data/routes.ts") {
      for (const entry of readPriorityQueue()) {
        add(candidateFromPath(entry.path, "route registry changed; priority URL queued", file));
      }
      continue;
    }

    if (
      [
        "src/data/pillarBlogPages.ts",
        "src/data/legacyIndexedBlogPages.ts",
        "src/data/toolPages.ts",
        "src/data/gscIndexedGeneratedPages.ts",
      ].includes(file)
    ) {
      const routeSource = file.replace(/^src\/data\//, "").replace(/\.ts$/, "");
      for (const route of ROUTES.filter((entry) => entry.contentSource === "manual" || entry.type === "blog")) {
        if (route.type === "blog" || route.sitemapGroup === "blog") {
          add(candidateFromPath(route.path, `${routeSource} changed; blog URL candidate`, file));
        }
      }
      continue;
    }

    if (
      [
        "src/data/site.ts",
        "src/lib/sitemapXml.ts",
        "src/pages/sitemap.xml.ts",
        "src/pages/content-index.json.ts",
        "src/pages/ai-sitemap.xml.ts",
      ].includes(file)
    ) {
      for (const entry of readPriorityQueue()) {
        add(candidateFromPath(entry.path, "discovery or site metadata changed; priority URL queued", file));
      }
    }
  }

  return [...candidates.values()].sort((a, b) => {
    const priorityOrder = { P1: 0, P2: 1, P3: 2, freshness: 3 } as Record<string, number>;
    return (priorityOrder[a.tier] ?? 9) - (priorityOrder[b.tier] ?? 9) || a.path.localeCompare(b.path);
  });
}

async function fetchText(url: string): Promise<{ status: number; finalUrl: string; text: string; contentType: string }> {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "EwasteKochi-Content-Freshness-Queue/1.0" },
  });

  return {
    status: response.status,
    finalUrl: response.url,
    text: await response.text(),
    contentType: response.headers.get("content-type") ?? "",
  };
}

function canonicalFromHtml(html: string): string {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
  return match?.[1] ?? "";
}

function hasNoindex(html: string): boolean {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

async function checkCandidate(candidate: Candidate): Promise<LiveCheck> {
  try {
    const result = await fetchText(candidate.url);
    const isHtml = result.contentType.includes("text/html") || result.text.includes("<html");
    const canonical = isHtml ? canonicalFromHtml(result.text) : "";
    const noindex = isHtml ? hasNoindex(result.text) : false;
    const issues: string[] = [];

    if (result.status !== 200) issues.push(`status=${result.status}`);
    if (result.finalUrl.replace(/\/$/, "") !== candidate.url.replace(/\/$/, "")) issues.push(`final=${result.finalUrl}`);
    if (noindex) issues.push("noindex");
    if (canonical && canonical.replace(/\/$/, "") !== candidate.url.replace(/\/$/, "")) {
      issues.push(`canonical=${canonical}`);
    }
    if (/vercel\.app|localhost|127\.0\.0\.1/i.test(result.text)) issues.push("non-production-url-in-body");

    return {
      ...candidate,
      status: result.status,
      finalUrl: result.finalUrl,
      canonical,
      noindex,
      ok: issues.length === 0,
      issue: issues.join("; "),
      recommendation:
        issues.length === 0
          ? "After production deployment, inspect live URL in GSC and request indexing if the content update is important."
          : "Do not request indexing until the live issue is fixed.",
    };
  } catch (error) {
    return {
      ...candidate,
      status: 0,
      finalUrl: "",
      canonical: "",
      noindex: false,
      ok: false,
      issue: error instanceof Error ? error.message : String(error),
      recommendation: "Do not request indexing until the URL can be fetched successfully.",
    };
  }
}

async function mapConcurrent<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const current = next;
      next += 1;
      results[current] = await mapper(items[current] as T);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function renderReport(changedFiles: string[], checks: LiveCheck[]): string {
  const passed = checks.filter((check) => check.ok);
  const failed = checks.filter((check) => !check.ok);

  const rows =
    checks.length === 0
      ? "| URL | Tier | Live status | Recommendation |\n| --- | --- | --- | --- |\n| None | - | - | No changed canonical URLs were detected for the selected range. |\n"
      : [
          "| URL | Tier | Live status | Recommendation |",
          "| --- | --- | --- | --- |",
          ...checks.map(
            (check) =>
              `| ${check.url} | ${check.tier} | ${check.ok ? "Pass" : `Hold: ${check.issue}`} | ${check.recommendation} |`
          ),
        ].join("\n");

  return `# Content Freshness Indexing Queue

Generated: ${GENERATED_AT}

## Safety Position

This is a readiness queue only. It does not ping Google, does not call the Google Indexing API, does not submit sitemaps, and does not request indexing automatically.

Google's sitemap ping endpoint is deprecated. Google's Indexing API is not intended for normal EwasteKochi service, location, tool, or blog pages because it is limited to JobPosting and livestream BroadcastEvent URLs. Fresh content should be discovered through sitemap/robots.txt and manually inspected/requested in Google Search Console when the update is important.

References:

- Google Search Central: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
- Google Indexing API Quickstart: https://developers.google.com/search/apis/indexing-api/v3/quickstart

## Input

- Git range: \`${since}..HEAD\`
- Working tree included: ${includeWorkingTree ? "yes" : "no"}
- Changed files inspected: ${changedFiles.length}
- Canonical candidate URLs found: ${checks.length}
- Live checks passed: ${passed.length}
- Live checks held: ${failed.length}

## Changed Files

${changedFiles.length === 0 ? "- None detected" : changedFiles.map((file) => `- \`${file}\``).join("\n")}

## Manual GSC Queue

${rows}

## Skip Rules

- Do not request indexing for redirected URLs.
- Do not request indexing for retired 404 or intentional noindex URLs.
- Do not request indexing for staging, localhost, or Vercel preview URLs.
- Do not request indexing for all sitemap URLs after routine edits.
- Use GSC URL Inspection only for changed, valuable, canonical URLs that pass the live test.

## Next Step

After the relevant production deployment is live, use the passed rows above as the manual URL Inspection queue in Google Search Console. Keep \`https://www.ewastekochi.com/sitemap.xml\` submitted in GSC and referenced from \`robots.txt\`.
`;
}

async function main() {
  mkdirSync("data", { recursive: true });
  mkdirSync("reports", { recursive: true });

  const changedFiles = changedFilesFromGit();
  const candidates = collectCandidates(changedFiles);
  const checks = await mapConcurrent(candidates, 8, checkCandidate);

  const data = {
    generatedAt: GENERATED_AT,
    mode: "readiness_only_no_google_submission",
    siteUrl: SITE_URL,
    gitRange: `${since}..HEAD`,
    includeWorkingTree,
    changedFiles,
    candidates,
    checks,
    googlePingPerformed: false,
    indexingApiPerformed: false,
    sitemapSubmitted: false,
  };

  writeFileSync("data/content-freshness-indexing-queue.json", `${JSON.stringify(data, null, 2)}\n`);
  writeCsv(
    "data/content-freshness-indexing-queue.csv",
    checks.map((check) => ({
      tier: check.tier,
      url: check.url,
      status: check.status,
      finalUrl: check.finalUrl,
      canonical: check.canonical,
      noindex: check.noindex,
      ok: check.ok,
      reason: check.reason,
      sourceFiles: check.sourceFiles.join("; "),
      issue: check.issue,
      recommendation: check.recommendation,
    })),
    ["tier", "url", "status", "finalUrl", "canonical", "noindex", "ok", "reason", "sourceFiles", "issue", "recommendation"]
  );
  writeFileSync("reports/content-freshness-indexing-report.md", renderReport(changedFiles, checks));

  console.info(`[freshness] changed files: ${changedFiles.length}`);
  console.info(`[freshness] candidate URLs: ${checks.length}`);
  console.info(`[freshness] passed: ${checks.filter((check) => check.ok).length}`);
  console.info(`[freshness] held: ${checks.filter((check) => !check.ok).length}`);
  console.info("[freshness] wrote data/content-freshness-indexing-queue.csv");
  console.info("[freshness] wrote reports/content-freshness-indexing-report.md");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
