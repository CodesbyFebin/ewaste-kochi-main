import type { APIRoute } from "astro";
import { ROUTES } from "../data/routes";
import { SITE_URL } from "../data/site";

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);

  const body = {
    site: "Ewaste Kochi",
    canonicalDomain: SITE_URL,
    lastUpdated: today,
    language: ["en-IN", "ml-IN"],
    pages: ROUTES.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      title: r.title,
      description: r.description,
      type: r.type,
      canonical: `${SITE_URL}${r.path}`,
      language: r.lang,
      lastModified: today,
      indexable: true,
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
