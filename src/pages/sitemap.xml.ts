import type { APIRoute } from "astro";
import { ROUTES } from "../data/routes";
import { SITE_URL } from "../data/site";
import { isIndexable } from "../lib/indexable";

// Sitemap index — one <sitemap> entry per sub-sitemap group that actually has
// at least one built page. A group with zero routes is omitted rather than
// linking to an empty (but still 200) sub-sitemap, keeping the index honest.
const GROUP_FILES: Record<string, string> = {
  core: "core.xml",
  services: "services.xml",
  locations: "locations.xml",
  legal: "legal.xml",
  ml: "ml.xml",
  blog: "blog.xml",
};

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const presentGroups = Array.from(new Set(ROUTES.filter(isIndexable).map((r) => r.sitemapGroup))).filter(
    (g) => GROUP_FILES[g]
  );

  const sitemaps = presentGroups
    .map(
      (group) => `  <sitemap>
    <loc>${SITE_URL}/sitemaps/${GROUP_FILES[group]}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
