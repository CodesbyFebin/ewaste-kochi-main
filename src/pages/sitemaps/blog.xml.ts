import type { APIRoute } from "astro";
import { ROUTES } from "../../data/routes";
import { buildUrlsetXml, sitemapRoutes } from "../../lib/sitemapXml";

export const GET: APIRoute = () => {
  const routes = sitemapRoutes(ROUTES, "blog");
  return new Response(buildUrlsetXml(routes), {
    headers: { "Content-Type": "application/xml" },
  });
};
