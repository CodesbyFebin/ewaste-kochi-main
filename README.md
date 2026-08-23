# Ewaste Kochi

Authorized e-waste recycling, IT asset disposition (ITAD), and data destruction services for Kochi and Kerala, India.

## Stack

- [Astro](https://astro.build) SSG
- TypeScript
- SEO validation via `scripts/validate-seo-v2.ts`
- Machine-readable AI indexing: `llms.txt`, `llms-full.txt`, `ai.txt`, `entities.json`, `knowledge-graph.json`, `evidence.json`, `models.json`, `language.json`

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Build + regenerate `public/llms-full.txt` |
| `npm run validate` | Build + run SEO validation |
| `npm run gsc:indexing-readiness` | GSC indexing readiness report |
| `python3 scripts/indexnow-ping.py --from-sitemap` | Submit sitemap URLs to IndexNow |

## SEO Architecture

- Route registry: `src/data/routes.ts`
- Sitemap groups: `src/pages/sitemaps/*.xml.ts`
- Content freshness: `scripts/gen-llms-full.ts` runs before every build
- AI discovery: `public/llms.txt`, `public/llms-full.txt`, `public/ai.txt`
- Trust signals: `public/.well-known/security.txt`, `public/humans.txt`

## Validation Gate

CI should run `npm run validate` and fail on any validation error.

## License

Proprietary — Ewaste Kochi. All rights reserved.
