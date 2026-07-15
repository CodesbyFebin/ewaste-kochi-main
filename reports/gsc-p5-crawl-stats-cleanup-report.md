# GSC-P5 Crawl Stats Cleanup Report

Phase: GSC-P5 — crawl stats cleanup after V2 cutover

## Crawl Stats Baseline

User-provided Crawl Stats baseline:

- Last updated: 2026-07-16
- `www.ewastekochi.com`: 8,627 crawl requests, no host problems
- `ewastekochi.com`: 2,573 crawl requests, no host problems
- `blog.ewastekochi.com`: 379 crawl requests, problems in the past
- `wiki.ewastekochi.com`: 19 crawl requests, no problems
- `recycling.ewastekochi.com`: 6 crawl requests, no problems
- `blogs.ewastekochi.com`: 2 crawl requests, no problems
- Response mix: 200 = 43%, 404 = 24%, 301 = 21%, 302 = 11%, 5xx < 1%
- Purpose: Refresh 77%, Discovery 23%
- Googlebot smartphone: 68%

Interpretation: not a server-health problem; this is crawl hygiene after migration.

## Data Availability

GSC Crawl Stats example URL exports were not present in the repository. Available local GSC data:

- Coverage summary from 2026-07-06
- Coverage 404 drilldown
- Coverage noindex drilldown
- Performance Pages export
- Existing GSC protection/redirect maps

Created Crawl Stats files:

- `data/gsc-crawl-stats-404-examples.csv` — 60 sampled rows from Coverage 404 drilldown used as proxy examples.
- `data/gsc-crawl-stats-302-examples.csv` — header only; Crawl Stats 302 export unavailable.
- `data/gsc-crawl-stats-5xx-examples.csv` — header only; Crawl Stats 5xx export unavailable.
- `data/gsc-crawl-stats-host-examples.csv` — live host checks for named hosts.
- `data/gsc-crawl-stats-302-fix-map.csv` / `.json` — empty, because no 302 example export was available.
- `data/gsc-crawl-stats-redirect-delta.csv` / `.json` — 27 specific redirect fixes added.

## 404 Examples Reviewed

Reviewed 60 old 404 examples from the available Coverage drilldown.

Decision pattern:

- Old generated `/blog/` and `/blogs/` URLs with no meaningful traffic: leave 404.
- Known old service/location/short URLs with a close approved V2 target: redirect.
- No broad homepage redirects.
- No thin page creation.

## 302 Examples Reviewed

No Crawl Stats 302 example export was available, so no URL-level 302 map was fabricated.

Current redirect patch uses Vercel permanent redirects, which resolve as 308 in production.

## 5xx Examples Reviewed

No 5xx drilldown URL export was available. Live priority host checks did not find active priority 5xx issues.

## Host Status

Live host checks:

- `https://www.ewastekochi.com/`: 200, canonical production host.
- `https://ewastekochi.com/`: 308 to `https://www.ewastekochi.com/`.
- `https://blog.ewastekochi.com/`: 200, active separate host; no migration performed.
- `https://wiki.ewastekochi.com/`: 200, active separate host; document for later cleanup decision.
- `https://recycling.ewastekochi.com/`: 200 from Google/GSE with empty body; document for later cleanup decision.
- `https://blogs.ewastekochi.com/`: 404 `DEPLOYMENT_NOT_FOUND`; low crawl count but should be reviewed later.

## Redirect Delta Added

Added 27 specific redirects:

- `/index.html` -> `/`
- 26 trailing-slash twins for already-approved permanent legacy redirects.

Examples:

- `/free-e-waste-pickup-kochi/` -> `/blog/free-e-waste-pickup-kochi/`
- `/locations/ernakulam/` -> `/locations/ernakulam-south/`
- `/blog/sell-old-laptop-kochi-best-price/` -> `/blog/sell-old-laptop-kochi/`
- `/scrap-price/` -> `/e-waste-scrap-prices-kochi/`
- `/e-waste-recycling/` -> `/recycling/`
- `/data-destruction-services-kochi/` -> `/data-destruction/`
- `/services/battery-recycling-kochi/` -> `/battery-recycling/`

Live validation after deploy:

- Redirect delta checked: 27
- 308 redirects: 27
- 200 final targets: 27
- Failures: 0

## URLs Intentionally Left 404/410

Most old generated blog/pSEO examples remain 404 intentionally, including sampled `/blog/...` and `/blogs/...` generated URLs with no meaningful traffic signal. These were not redirected to homepage and were not rebuilt.

## URLs Needing Manual Review

- `blog.ewastekochi.com`: active separate host; do not migrate yet, but monitor for host/server errors.
- `wiki.ewastekochi.com`: active separate host; later decision needed on whether it should remain indexed.
- `recycling.ewastekochi.com`: active Google-hosted/empty-body response; later cleanup decision needed.
- `blogs.ewastekochi.com`: Vercel deployment 404; low crawl count, but should be cleaned up if it continues appearing.
- GSC 302 example URLs: export needed for exact cleanup.
- GSC 5xx/soft404/robots affected URLs: drilldown export needed for exact cleanup.

## Deployment

Deployment was needed and completed because a small set of known old permanent URLs still returned 404 in production when crawled with trailing slashes.

- Deployment ID: `dpl_EigSHp7EvFbip3ZYPmMmdyTcxvaC`
- Deployment URL: `https://ewaste-kochi-main-81q7mycfa-projects555.vercel.app`
- Production alias: `https://www.ewastekochi.com`

## Validation

- `npm run check`: passed.
- `npm run validate`: passed, 87 routes, 736 checks, 0 failures.
- Redirect target check: passed for 27/27 redirect-delta URLs.
- Sitemap/discovery check: no redirect sources in sitemap/content-index.
- Unsafe claim/schema sweep: no emitted rendered V2 hits; validator deny-list matches only.
- Canonical host remains `https://www.ewastekochi.com`.

## Next GSC Monitoring Date

Recommended next check: 24 hours after Google recrawls the new redirect rules, then again at 72 hours.

Next phase: GSC-P5 monitoring follow-up after fresh Crawl Stats examples are exported from GSC.
