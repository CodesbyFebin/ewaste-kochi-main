import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { load } from "cheerio";
import { ROUTES } from "./src/data/routes";
import { SITE_URL } from "./src/data/site";
import { isIndexable } from "./src/lib/indexable";

const DIST = join(process.cwd(), "dist");
const PUBLIC = join(process.cwd(), "public");

// Get all built HTML pages from sitemap files
function getAllBuiltPages(): string[] {
  const urls: string[] = [];
  const sitemapFiles = ["sitemap.xml", ...readdirSync(join(DIST, "sitemaps")).map((f) => join("sitemaps", f))];
  for (const file of sitemapFiles) {
    const xml = load(readFileSync(join(DIST, file), "utf8"), { xml: true });
    xml("url > loc").each((_, node) => {
      urls.push(load(node).text().trim());
    });
  }
  return urls;
}

// Extract visible text from a built page
function extractPageText(url: string): { title: string; description: string; headings: string[]; paragraphs: string[] } {
  const path = url.replace(SITE_URL, "").replace(/\/$/, "");
  const htmlPath = join(DIST, path, "index.html");
  if (!existsSync(htmlPath)) return { title: "", description: "", headings: [], paragraphs: [] };
  const $ = load(readFileSync(htmlPath, "utf8"));
  $("script, style, nav, header, footer, .site-footer, .site-header, .breadcrumbs, .trust-bar, .main-nav, .mobile-nav").remove();
  const title = $("h1").first().text().trim() || $("title").text().trim();
  const description = $('meta[name="description"]').attr("content") || "";
  const headings: string[] = [];
  $("h1, h2, h3").each((_, el) => {
    const t = load(el).text().trim();
    if (t && t.length > 3) headings.push(t);
  });
  const paragraphs: string[] = [];
  $("article p, section p, main p, .wiki-encyclopedia p, .discovery-guide p").each((_, el) => {
    const t = load(el).text().trim();
    if (t && t.length > 30) paragraphs.push(t);
  });
  return { title, description, headings: headings.slice(0, 10), paragraphs: paragraphs.slice(0, 15) };
}

// Build group label from route metadata
function getGroup(path: string): string {
  const route = ROUTES.find((r) => r.path === path);
  if (!route) return "core";
  const g = route.sitemapGroup;
  if (g === "blog") return "blog & encyclopedia";
  return g;
}

// MAIN
function main() {
  const builtUrls = getAllBuiltPages();
  console.log(`Built pages to index: ${builtUrls.length}`);

  // llms.txt — compact overview
  const llmsLines: string[] = [
    "# Ewaste Kochi",
    "",
    `Canonical site: ${SITE_URL}`,
    "",
    "Ewaste Kochi provides e-waste recycling, electronics pickup, battery recycling, IT asset disposition (ITAD), data destruction, hard drive shredding, computer scrap buying, server recycling, and sell-old-electronics services for Kochi, Ernakulam, and Kerala, India. Content is available in English and, for a starter set of pages, Malayalam (ml-IN) under /ml/.",
    "",
  ];

  const byGroup = new Map<string, string[]>();
  for (const url of builtUrls) {
    const path = url.replace(SITE_URL, "");
    const group = getGroup(path);
    if (!byGroup.has(group)) byGroup.set(group, []);
    const route = ROUTES.find((r) => r.path === path);
    const title = route?.title || path;
    byGroup.get(group)!.push(`- ${url} — ${title}`);
  }

  for (const [group, items] of byGroup) {
    llmsLines.push(`## ${group.charAt(0).toUpperCase() + group.slice(1)} pages`);
    llmsLines.push("");
    items.forEach((line) => llmsLines.push(line));
    llmsLines.push("");
  }

  writeFileSync(join(PUBLIC, "llms.txt"), llmsLines.join("\n") + "\n");

  // llms-full.txt — full text dump
  const fullLines: string[] = [
    "# Ewaste Kochi — Full Content Dump",
    "",
    `Canonical site: ${SITE_URL}`,
    `Generated: ${new Date().toISOString()}`,
    `Pages: ${builtUrls.length}`,
    "",
    "---",
    "",
  ];

  for (const url of builtUrls) {
    const path = url.replace(SITE_URL, "");
    const text = extractPageText(url);
    if (!text.title && !text.paragraphs.length) continue;
    fullLines.push(`## ${text.title || path}`);
    fullLines.push(`URL: ${url}`);
    if (text.description) fullLines.push(`Description: ${text.description}`);
    if (text.headings.length) fullLines.push(`Headings: ${text.headings.join(" | ")}`);
    fullLines.push("");
    text.paragraphs.forEach((p) => fullLines.push(p));
    fullLines.push("");
    fullLines.push("---");
    fullLines.push("");
  }

  writeFileSync(join(PUBLIC, "llms-full.txt"), fullLines.join("\n") + "\n");

  // Verify
  const llmsWords = readFileSync(join(PUBLIC, "llms.txt"), "utf8").split(/\s+/).filter(Boolean).length;
  const fullWords = readFileSync(join(PUBLIC, "llms-full.txt"), "utf8").split(/\s+/).filter(Boolean).length;
  const fullBytes = readFileSync(join(PUBLIC, "llms-full.txt")).length;
  console.log(`llms.txt: ${llmsWords} words`);
  console.log(`llms-full.txt: ${fullWords} words, ${Math.round(fullBytes / 1024)} KB`);
}

main();