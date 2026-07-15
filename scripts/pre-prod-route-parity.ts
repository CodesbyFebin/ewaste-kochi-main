import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "../src/data/routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://www.ewastekochi.com";

function urlToPath(url: string): string {
  return url.replace(SITE_URL, "").replace(/^$/, "/");
}

// 1. routes.ts metadata paths
const metadataPaths = new Set(ROUTES.map((r) => r.path));

// 2. dist built pages (walk dist/ for index.html, excluding sitemap/system files)
function walkDist(dir: string, base = ""): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDist(full, `${base}/${entry.name}`));
    } else if (entry.name === "index.html") {
      out.push(base === "" ? "/" : `${base}/`);
    }
  }
  return out;
}
const distRoot = path.join(__dirname, "..", "dist");
const builtPaths = new Set(walkDist(distRoot).filter((p) => !p.startsWith("/sitemaps/")));

// 3. sitemap.xml (+ sub-sitemaps) URLs
function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const mainSitemap = fs.readFileSync(path.join(distRoot, "sitemap.xml"), "utf8");
let sitemapUrls = new Set(extractLocs(mainSitemap).map(urlToPath));
const sitemapsDir = path.join(distRoot, "sitemaps");
if (fs.existsSync(sitemapsDir)) {
  for (const f of fs.readdirSync(sitemapsDir)) {
    const xml = fs.readFileSync(path.join(sitemapsDir, f), "utf8");
    for (const loc of extractLocs(xml)) sitemapUrls.add(urlToPath(loc));
  }
}

// 4. content-index.json URLs
const contentIndex = JSON.parse(fs.readFileSync(path.join(distRoot, "content-index.json"), "utf8"));
const contentIndexUrls = new Set((contentIndex.pages as { url: string }[]).map((p) => urlToPath(p.url)));

// 5. ai-sitemap.xml URLs
const aiSitemapXml = fs.readFileSync(path.join(distRoot, "ai-sitemap.xml"), "utf8");
const aiSitemapUrls = new Set(extractLocs(aiSitemapXml).map(urlToPath));

// 6. llms.txt URLs
const llmsTxt = fs.readFileSync(path.join(distRoot, "llms.txt"), "utf8");
const llmsUrls = new Set(
  [...llmsTxt.matchAll(/https:\/\/www\.ewastekochi\.com(\/[^\s)]*)/g)].map((m) => m[1])
);

// 7. vercel.json redirect sources + destinations
const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "vercel.json"), "utf8"));
const redirectSources = new Set<string>((vercelJson.redirects ?? []).map((r: { source: string }) => r.source));

// --- Cross-checks ---
const missingMetadataRoutes = [...builtPaths].filter((p) => !metadataPaths.has(p)).sort();
const metadataRoutesWithoutPages = [...metadataPaths].filter((p) => !builtPaths.has(p)).sort();
const sitemapOnlyRoutes = [...sitemapUrls].filter((p) => !builtPaths.has(p)).sort();
const builtOnlyRoutes = [...builtPaths].filter((p) => !sitemapUrls.has(p)).sort();
const redirectSourcesInSitemap = [...redirectSources].filter((s) => sitemapUrls.has(s)).sort();
const redirectSourcesInContentIndex = [...redirectSources].filter((s) => contentIndexUrls.has(s)).sort();
const redirectSourcesBuilt = [...redirectSources].filter((s) => builtPaths.has(s)).sort();
const contentIndexOnlyRoutes = [...contentIndexUrls].filter((p) => !builtPaths.has(p)).sort();
const aiSitemapOnlyRoutes = [...aiSitemapUrls].filter((p) => !builtPaths.has(p)).sort();

// Duplicate-canonical detection: metadata entries with the same title (case-insensitive) at different paths
const titleMap = new Map<string, string[]>();
for (const r of ROUTES) {
  const key = r.title.toLowerCase().trim();
  if (!titleMap.has(key)) titleMap.set(key, []);
  titleMap.get(key)!.push(r.path);
}
const duplicateTitles = [...titleMap.entries()].filter(([, paths]) => paths.length > 1);

// Duplicate slug detection (exact duplicate path strings in ROUTES)
const pathCounts = new Map<string, number>();
for (const r of ROUTES) pathCounts.set(r.path, (pathCounts.get(r.path) ?? 0) + 1);
const duplicateSlugs = [...pathCounts.entries()].filter(([, n]) => n > 1).map(([p]) => p);

const summary = {
  generatedAt: new Date().toISOString(),
  sourcePageCount: builtPaths.size,
  metadataRouteCount: metadataPaths.size,
  builtPageCount: builtPaths.size,
  sitemapUrlCount: sitemapUrls.size,
  contentIndexUrlCount: contentIndexUrls.size,
  aiSitemapUrlCount: aiSitemapUrls.size,
  llmsUrlCount: llmsUrls.size,
  redirectRuleCount: redirectSources.size,
  missingMetadataRoutes,
  metadataRoutesWithoutPages,
  sitemapOnlyRoutes,
  builtOnlyRoutes,
  contentIndexOnlyRoutes,
  aiSitemapOnlyRoutes,
  duplicateSlugs,
  duplicateTitles: duplicateTitles.map(([title, paths]) => ({ title, paths })),
  redirectSourceLeaks: {
    inSitemap: redirectSourcesInSitemap,
    inContentIndex: redirectSourcesInContentIndex,
    stillBuilt: redirectSourcesBuilt,
  },
};

fs.writeFileSync(
  path.join(__dirname, "..", "data", "pre-prod-route-parity.json"),
  JSON.stringify(summary, null, 2)
);

// CSV: one row per built path, with presence flags across each surface
const allPaths = new Set<string>([
  ...builtPaths,
  ...metadataPaths,
  ...sitemapUrls,
  ...contentIndexUrls,
  ...aiSitemapUrls,
]);
const csvRows = ["path,in_metadata,in_built,in_sitemap,in_content_index,in_ai_sitemap,in_llms,is_redirect_source"];
for (const p of [...allPaths].sort()) {
  csvRows.push(
    [
      p,
      metadataPaths.has(p),
      builtPaths.has(p),
      sitemapUrls.has(p),
      contentIndexUrls.has(p),
      aiSitemapUrls.has(p),
      llmsUrls.has(p),
      redirectSources.has(p),
    ].join(",")
  );
}
fs.writeFileSync(path.join(__dirname, "..", "data", "pre-prod-route-parity.csv"), csvRows.join("\n") + "\n");

console.log(JSON.stringify(summary, null, 2));
