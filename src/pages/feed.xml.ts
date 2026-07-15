import type { APIRoute } from "astro";
import { ROUTES } from "../data/routes";
import { SITE_URL } from "../data/site";
import { isIndexable } from "../lib/indexable";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const GET: APIRoute = () => {
  const items = ROUTES.filter((route) => route.type === "blog" && isIndexable(route))
    .map((route) => {
      const url = new URL(route.path, SITE_URL).toString();
      return `<item>
  <title>${escapeXml(route.title)}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <description>${escapeXml(route.description)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Ewaste Kochi Blog</title>
  <link>${SITE_URL}/blog/</link>
  <description>Guides on e-waste recycling, pickup, battery recycling, selling electronics, data destruction and ITAD in Kochi.</description>
  <language>en-IN</language>
  ${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
