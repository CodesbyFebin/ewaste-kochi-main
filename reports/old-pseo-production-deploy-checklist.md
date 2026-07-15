# OLD-P0B Production Deploy Checklist

## Deploy Target

- Production domain: `https://www.ewastekochi.com`
- Vercel project using this root-level Astro app.

## Commands

Local validation:

```bash
npm install
npm run build
npx tsx scripts/validate-seo-v2.ts
```

Deployment:

```bash
# Use the normal Vercel/Git deployment flow.
# Do not run vercel --prod from this patch session.
```

## Post-Deploy Crawl URLs

Crawl the full protected list, especially:

- `/`
- `/recycling/`
- `/marketplace/`
- `/battery-recycling/`
- `/services/electronics-recycling-near-me/`
- `/pickup/`
- `/blog/free-e-waste-pickup-kochi/`
- `/contact/`
- `/about/`
- `/faq/`
- `/tv-recycling-kochi/`
- `/locations/angamaly/`
- `/locations/palarivattom/`
- `/locations/fort-kochi/`
- `/locations/thrikkakara/`
- `/locations/thrippunithura/`
- `/locations/kaloor/`
- `/locations/infopark-kochi/`
- `/locations/smart-city-kochi/`

Also crawl:

- `/sitemap.xml`
- `/sitemaps/core.xml`
- `/sitemaps/services.xml`
- `/sitemaps/locations.xml`
- `/sitemaps/blog.xml`
- `/content-index.json`
- `/ai-sitemap.xml`

## Rollback Triggers

Rollback if any of these occur:

- Any protected URL returns 404/5xx.
- A protected URL redirects more than one hop.
- Canonical host is not `https://www.ewastekochi.com`.
- Sitemap includes redirect sources or missing URLs.
- Rendered HTML contains `AggregateRating`, `Review`, `ratingValue`, `reviewCount`, `GeoCoordinates`, `QAPage`, `LocalBusiness`, `HowTo`, `HowToStep`, fake ratings, fake awards or fake certification/authorization claims.
- Lead/CTA flow breaks on core service pages.

## GSC Validation Timing

- Submit/inspect only the current production sitemap after deploy.
- Wait for the deployed crawl to confirm protected URLs are 200 before requesting GSC validation.
- Recheck coverage and canonical reports after Google recrawls.

## V2 Sitemap Warning

Do not submit any separate V2 sitemap yet. Keep discovery on the current canonical production sitemap set until this old pSEO safety patch is stable in production.
