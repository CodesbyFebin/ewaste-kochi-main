# Ewaste Kochi

Authorized e-waste recycling, IT asset disposition (ITAD), and data destruction services for Kochi and Kerala, India.

Production: [www.ewastekochi.com](https://www.ewastekochi.com)

## Stack

- [Astro](https://astro.build) `^5.18.2`, static output, deployed to Vercel
- TypeScript
- SEO validation via `scripts/validate-seo-v2.ts` (`npm run validate`) and `astro check` (`npm run check`)
- Machine-readable AI indexing: `llms.txt`, `llms-full.txt` — see the "AI indexing" note below before adding more of these

## Content

- `/blog/` — articles, driven by `src/data/routes.ts` plus several generated-route data files (`generatedPillarRoutes.ts`, `pillarBlogPages.ts`, `legacyIndexedBlogPages.ts`, `gscIndexedGeneratedPages.ts`)
- `/wiki/` — a smaller reference/encyclopedia section (`wikiRoutes.ts`), separate from `/blog/` to avoid duplicating query intent between a broad reference article and a Kochi-specific actionable guide on the same topic
- `/locations/` — per-area service pages
- `/ml/` — Malayalam translations for a handful of core pages (paired via `hreflangPair` in `routes.ts`)

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Build + regenerate `public/llms-full.txt` |
| `npm run check` | `astro check` — TypeScript/template type errors. CI's Quality Gate runs this and blocks deploy on failure |
| `npm run validate` | Build + run SEO validation (`scripts/validate-seo-v2.ts`) — canonical/sitemap/redirect/schema/unsafe-claim checks |
| `npm run gsc:indexing-readiness` | GSC indexing readiness report |
| `python3 scripts/indexnow-ping.py --from-sitemap` | Submit sitemap URLs to IndexNow |

Run both `npm run check` and `npm run validate` before pushing — they check different things and CI enforces both.

## SEO Architecture

- Route registry: `src/data/routes.ts` — the single source of truth. `sitemap.xml`, its sub-sitemaps, `content-index.json`, and `ai-sitemap.xml` are all generated from this list only, so none of them can claim a URL that isn't actually a live built page. A page that exists in `src/pages/` but isn't added here won't appear in any of those — this has happened before (the `/wiki/` section shipped without being wired in for a while); if you add a new route family, register it in `routes.ts` in the same commit.
- Sitemap groups: `src/pages/sitemaps/*.xml.ts`
- Content freshness: `scripts/gen-llms-full.ts` runs before every build (`prebuild`)
- AI discovery: `public/llms.txt`, `public/llms-full.txt`
- Trust signals: `public/.well-known/security.txt`, `public/humans.txt`

**AI indexing**: only `llms.txt`/`llms-full.txt` (a real, if unconfirmed, proposed convention) and `robots.txt` bot rules are worth maintaining here. Files like `ai.txt`, `entities.json`, `knowledge-graph.json`, `evidence.json` are not honored by any search engine or AI crawler — don't add more of them on the strength of a generic SEO playbook; verify against an actual spec first.

## Validation gate (CI)

`.github/workflows/deploy.yml`'s Quality Gate runs `astro check` and `npm run validate`; both must pass before `Deploy to Production` runs. Deploys go through Vercel, which has a daily deployment cap on the free tier — avoid redeploying repeatedly to debug something that can be checked locally first (`npm run build && npm run validate` catches most of what CI checks).

## License

MIT — see [LICENSE](LICENSE).
