import type { RouteEntry } from "../data/routes";
import { SITE_URL } from "../data/site";
import { isIndexable } from "./indexable";

export function sitemapRoutes(routes: RouteEntry[], group?: RouteEntry["sitemapGroup"]): RouteEntry[] {
  const seen = new Set<string>();
  const filtered = routes
    .filter((route) => route.path.startsWith("/"))
    .filter((route) => !group || route.sitemapGroup === group)
    .filter(isIndexable)
    .filter((route) => {
      if (seen.has(route.path)) return false;
      seen.add(route.path);
      return true;
    })
    .sort((a, b) => a.path.localeCompare(b.path));

  console.info(
    `[sitemap] ${group ?? "all"}: ${filtered.length} canonical indexable URL${filtered.length === 1 ? "" : "s"}`
  );
  return filtered;
}

export function buildUrlsetXml(routes: RouteEntry[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
