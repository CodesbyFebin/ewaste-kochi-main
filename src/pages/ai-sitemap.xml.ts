import type { APIRoute } from "astro";
import { ROUTES } from "../data/routes";
import { SITE_URL } from "../data/site";

// Non-standard, AI-crawler-facing companion to sitemap.xml: same canonical URL
// set, but with title/description inline so an LLM doesn't need a second fetch
// per page to know what each URL is about.
export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = ROUTES.map(
    (r) => `  <page>
    <loc>${SITE_URL}${r.path}</loc>
    <title>${escapeXml(r.title)}</title>
    <description>${escapeXml(r.description)}</description>
    <type>${r.type}</type>
    <language>${r.lang}</language>
    <lastmod>${today}</lastmod>
  </page>`
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<aisitemap xmlns="https://www.ewastekochi.com/ai-sitemap-schema">
${entries}
</aisitemap>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
