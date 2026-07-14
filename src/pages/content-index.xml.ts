import type { APIRoute } from "astro";
import { ROUTES } from "../data/routes";
import { SITE_URL } from "../data/site";
import { isIndexable } from "../lib/indexable";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// XML mirror of content-index.json — same fields, same route registry as the
// single source of truth, for consumers that prefer XML over JSON.
export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const entries = ROUTES.filter(isIndexable).map(
    (r) => `  <page>
    <url>${SITE_URL}${r.path}</url>
    <title>${escapeXml(r.title)}</title>
    <description>${escapeXml(r.description)}</description>
    <type>${r.type}</type>
    <canonical>${SITE_URL}${r.path}</canonical>
    <language>${r.lang}</language>
    <lastModified>${today}</lastModified>
    <indexable>true</indexable>
  </page>`
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<content-index site="Ewaste Kochi" canonicalDomain="${SITE_URL}" lastUpdated="${today}">
${entries}
</content-index>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
};
