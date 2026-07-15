import { mkdirSync, writeFileSync } from "node:fs";

const SITE_URL = "https://www.ewastekochi.com";
const GENERATED_AT = new Date().toISOString();

type DiscoveryCheck = {
  url: string;
  status: number;
  ok: boolean;
  notes: string;
};

type UrlCheck = {
  tier: string;
  url: string;
  status: number;
  finalUrl: string;
  canonical: string;
  noindex: boolean;
  ok: boolean;
  issue: string;
};

const priorityUrls: Array<{ tier: string; url: string }> = [
  ...[
    "/",
    "/recycling/",
    "/services/electronics-recycling-near-me/",
    "/services/computer-recycling-near-me/",
    "/services/air-conditioner-recycling-kochi/",
    "/marketplace/",
    "/battery-recycling/",
    "/sell-electronics/",
    "/pickup/",
    "/e-waste/",
    "/contact/",
  ].map((path) => ({ tier: "P1", url: `${SITE_URL}${path}` })),
  ...[
    "/locations/kottayam/",
    "/locations/palakkad/",
    "/locations/thrissur/",
    "/locations/kozhikode/",
    "/locations/thiruvananthapuram/",
    "/locations/kollam/",
    "/locations/kannur/",
    "/locations/malappuram/",
    "/locations/kakkanad/",
    "/locations/aluva/",
    "/locations/ernakulam-south/",
    "/locations/edappally/",
    "/locations/kalamassery/",
  ].map((path) => ({ tier: "P2", url: `${SITE_URL}${path}` })),
  ...[
    "/blog/free-e-waste-pickup-kochi/",
    "/blog/laptop-scrap-price-kochi/",
    "/blog/electronic-waste-disposal-kerala/",
    "/blog/how-to-choose-itad-provider/",
    "/tools/scrap-value-calculator/",
  ].map((path) => ({ tier: "P3", url: `${SITE_URL}${path}` })),
];

const discoveryUrls = [
  `${SITE_URL}/robots.txt`,
  `${SITE_URL}/sitemap.xml`,
  `${SITE_URL}/content-index.json`,
  `${SITE_URL}/ai-sitemap.xml`,
  `${SITE_URL}/llms.txt`,
  `${SITE_URL}/feed.xml`,
];

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

async function fetchText(url: string): Promise<{ status: number; finalUrl: string; text: string; contentType: string }> {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "EwasteKochi-GSC-P4-Readiness/1.0" },
  });
  return {
    status: response.status,
    finalUrl: response.url,
    text: await response.text(),
    contentType: response.headers.get("content-type") ?? "",
  };
}

function locsFromXml(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1] ?? "");
}

function canonicalFromHtml(html: string): string {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
  return match?.[1] ?? "";
}

function hasNoindex(html: string): boolean {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

async function checkUrl(tier: string, url: string): Promise<UrlCheck> {
  try {
    const result = await fetchText(url);
    const isHtml = result.contentType.includes("text/html") || result.text.includes("<html");
    const canonical = isHtml ? canonicalFromHtml(result.text) : "";
    const noindex = isHtml ? hasNoindex(result.text) : false;
    const issues: string[] = [];

    if (result.status !== 200) issues.push(`status=${result.status}`);
    if (result.finalUrl.replace(/\/$/, "") !== url.replace(/\/$/, "")) issues.push(`final=${result.finalUrl}`);
    if (noindex) issues.push("noindex");
    if (canonical && canonical.replace(/\/$/, "") !== url.replace(/\/$/, "")) issues.push(`canonical=${canonical}`);
    if (/vercel\.app|localhost|127\.0\.0\.1/i.test(result.text)) issues.push("non-production-url-in-body");

    return {
      tier,
      url,
      status: result.status,
      finalUrl: result.finalUrl,
      canonical,
      noindex,
      ok: issues.length === 0,
      issue: issues.join("; "),
    };
  } catch (error) {
    return {
      tier,
      url,
      status: 0,
      finalUrl: "",
      canonical: "",
      noindex: false,
      ok: false,
      issue: error instanceof Error ? error.message : String(error),
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

async function main() {
  mkdirSync("data", { recursive: true });
  mkdirSync("reports", { recursive: true });

  const discoveryChecks: DiscoveryCheck[] = [];
  let robotsText = "";
  let sitemapText = "";

  for (const url of discoveryUrls) {
    const result = await fetchText(url);
    if (url.endsWith("/robots.txt")) robotsText = result.text;
    if (url.endsWith("/sitemap.xml")) sitemapText = result.text;
    discoveryChecks.push({
      url,
      status: result.status,
      ok: result.status === 200,
      notes: result.status === 200 ? "Pass" : `Unexpected status ${result.status}`,
    });
  }

  const subSitemaps = locsFromXml(sitemapText);
  const sitemapUrls: string[] = [];
  const subSitemapCounts: Array<{ sitemap: string; urls: number }> = [];

  for (const sitemapUrl of subSitemaps) {
    const result = await fetchText(sitemapUrl);
    const urls = locsFromXml(result.text);
    subSitemapCounts.push({ sitemap: sitemapUrl, urls: urls.length });
    sitemapUrls.push(...urls);
  }

  const uniqueSitemapUrls = [...new Set(sitemapUrls)].sort();
  const sitemapUrlChecks = await mapConcurrent(uniqueSitemapUrls, 24, (url) => checkUrl("sitemap", url));
  const priorityChecks = await mapConcurrent(priorityUrls, 12, (entry) => checkUrl(entry.tier, entry.url));

  const badHostUrls = uniqueSitemapUrls.filter((url) => !url.startsWith(SITE_URL));
  const stagingUrls = uniqueSitemapUrls.filter((url) => /vercel\.app|localhost|127\.0\.0\.1/i.test(url));
  const sitemapFailures = sitemapUrlChecks.filter((check) => !check.ok);
  const priorityFailures = priorityChecks.filter((check) => !check.ok);
  const robotsReferencesSitemap = robotsText.includes(`Sitemap: ${SITE_URL}/sitemap.xml`);

  const summary = {
    generatedAt: GENERATED_AT,
    siteUrl: SITE_URL,
    mode: "readiness_only_no_submission",
    discoveryFiles: discoveryChecks,
    robotsReferencesSitemap,
    subSitemaps,
    subSitemapCounts,
    uniqueSitemapUrlCount: uniqueSitemapUrls.length,
    badHostUrlCount: badHostUrls.length,
    stagingUrlCount: stagingUrls.length,
    sitemapFailureCount: sitemapFailures.length,
    priorityUrlCount: priorityChecks.length,
    priorityFailureCount: priorityFailures.length,
    googleSubmissionPerformed: false,
    indexingApiPerformed: false,
    blockedUnsafeAutomation: [
      "Do not regenerate sitemap from hardcoded URL matrices.",
      "Do not submit staging URLs.",
      "Do not use deprecated Google sitemap ping endpoint.",
      "Do not use Google Indexing API for normal e-waste service/blog pages.",
      "Do not request indexing for all sitemap URLs.",
    ],
  };

  writeFileSync("data/gsc-p4-indexing-readiness.json", JSON.stringify({ summary, sitemapFailures, priorityChecks }, null, 2) + "\n");
  writeCsv("data/gsc-p4-indexing-priority-queue.csv", priorityChecks, [
    "tier",
    "url",
    "status",
    "finalUrl",
    "canonical",
    "noindex",
    "ok",
    "issue",
  ]);

  const priorityRows = priorityChecks
    .map((check) => `| ${check.tier} | \`${check.url}\` | ${check.status} | ${check.ok ? "Ready for manual GSC request" : check.issue} |`)
    .join("\n");
  const discoveryRows = discoveryChecks
    .map((check) => `| \`${check.url}\` | ${check.status} | ${check.ok ? "Pass" : check.notes} |`)
    .join("\n");
  const subSitemapRows = subSitemapCounts
    .map((entry) => `| \`${entry.sitemap}\` | ${entry.urls} |`)
    .join("\n");

  const report = `# GSC-P4 Indexing Readiness Report

Generated: ${GENERATED_AT}

## Verdict

Ready for manual Google Search Console submission and priority URL Inspection requests.

This script deliberately does **not** submit URLs, ping search engines, rewrite sitemaps, or call the Google Indexing API. It validates the live production sitemap and writes the manual indexing queue.

## Discovery Files

| URL | Status | Result |
| --- | ---: | --- |
${discoveryRows}

## Sitemap Safety

- Sitemap index sub-sitemaps: ${subSitemaps.length}
- Unique sitemap URLs: ${uniqueSitemapUrls.length}
- Full sitemap URL checks passing: ${sitemapUrlChecks.length - sitemapFailures.length}/${sitemapUrlChecks.length}
- Non-production hosts in sitemap: ${badHostUrls.length}
- Staging/localhost URLs in sitemap: ${stagingUrls.length}
- Sitemap URL failures: ${sitemapFailures.length}
- robots.txt references production sitemap: ${robotsReferencesSitemap ? "yes" : "no"}

| Sub-sitemap | URLs |
| --- | ---: |
${subSitemapRows}

## Priority Indexing Queue

| Tier | URL | Live Status | Queue Decision |
| --- | --- | ---: | --- |
${priorityRows}

## Unsafe Automation Blocked

- The attached proposal hardcoded URL discovery and included generated location-service matrix paths; this tool reads the live production sitemap instead.
- The attached proposal included a staging URL constant; this tool rejects staging/localhost sitemap URLs.
- The attached proposal used Google's deprecated sitemap ping endpoint. Google says sitemap ping support has been deprecated and Search Console/robots.txt should be used instead.
- The attached proposal suggested Google Indexing API submission for normal pages. Google says the Indexing API is limited to pages with JobPosting or BroadcastEvent in VideoObject markup.
- The attached proposal would request broad indexing. This tool creates only the P1/P2/P3 priority queue.

## Official References

- Google sitemap ping deprecation: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
- Google Indexing API limits: https://developers.google.com/search/apis/indexing-api/v3/quickstart
`;

  writeFileSync("reports/gsc-p4-indexing-readiness-report.md", report);

  console.log(JSON.stringify(summary, null, 2));

  if (!robotsReferencesSitemap || badHostUrls.length > 0 || stagingUrls.length > 0 || sitemapFailures.length > 0 || priorityFailures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
