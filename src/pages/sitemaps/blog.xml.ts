import type { APIRoute } from "astro";
import { ROUTES } from "../../data/routes";
import { buildUrlsetXml } from "../../lib/sitemapXml";
import { isIndexable } from "../../lib/indexable";

export const GET: APIRoute = () => {
  const routes = ROUTES.filter((r) => r.sitemapGroup === "blog" && isIndexable(r));
  return new Response(buildUrlsetXml(routes), {
    headers: { "Content-Type": "application/xml" },
  });
};
