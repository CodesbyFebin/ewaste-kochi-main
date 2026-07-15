# Phase 2L-RETRY Production Cutover Report

Date/time: 2026-07-18 08:30 IST production deployment, validated immediately after.

## Deployment Summary

- Approved pre-cutover candidate commit: `6e72598fdbc3e85b665f57e09440a076ed2320fe`
- Production project: `ewaste-kochi-main`
- Production project ID: `prj_Lrt5wSinYlavz837nxkvM8T9qkzW`
- Production deployment ID: `dpl_HBJxC8ujQcEpNB922Ug5Yv6Sfbbk`
- Production deployment URL: `https://ewaste-kochi-main-6zv8gdrqk-projects555.vercel.app`
- Live domains attached to the deployment:
  - `https://www.ewastekochi.com`
  - `https://ewastekochi.com`
  - `https://ewaste-kochi-main.vercel.app`
- Deployment status: `Ready`
- Rollback status: not needed after final validation.

## Output Directory Status

The old production project setting was fixed before deployment:

- Framework preset: `Astro`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: `dist`

Remote deployment logs confirmed Astro built 87 pages into `/vercel/path0/dist/` and completed successfully.

## Cutover Issue Found and Fixed

The first production deployment in this retry (`dpl_9fDRGspwYds5MmK5v2xLLQSVaFqn`) built successfully, but production redirect validation found that many indexed redirect sources without trailing slashes returned 404. Root cause: `vercel.json` had the safe trailing-slash redirect rules, while the GSC indexed redirect CSV contained exact no-slash URLs.

Fix applied before final deploy:

- Added 84 exact no-trailing-slash redirect aliases to `vercel.json`.
- Kept the existing trailing-slash rules.
- Did not add pages or change the indexed URL upgrade map.
- Re-ran `npm run validate`: 87 routes, 709 checks, 0 failures.

Final production deployment `dpl_HBJxC8ujQcEpNB922Ug5Yv6Sfbbk` includes this config fix.

## Local Validation

- `npm run check`: passed, 0 errors, 0 warnings, 0 hints
- `npm run build`: passed, 87 pages built
- `npm run validate` before redirect fix: 87 routes, 625 checks, 0 failures
- `npm run validate` after redirect fix: 87 routes, 709 checks, 0 failures
- `npx tsx scripts/check-duplicate-content.ts`: passed, all 23 indexable posts clear duplicate-content gate
- `npx tsx scripts/check-orphan-articles.ts`: passed, 0 orphan indexable articles
- Rendered unsafe-claim sweep over local `dist`: 0 hits

## Production Smoke Test Results

- Core/protected URLs checked: 34
- Core/protected failures: 0
- Homepage: 200 at `https://www.ewastekochi.com/`
- `/recycling/`: 200
- `/marketplace/`: 200
- `/battery-recycling/`: 200
- `/services/electronics-recycling-near-me/`: 200
- `/sell-electronics/`: 200
- `/pickup/`: 200
- `/contact/`: 200
- `/about/`: 200
- `/faq/`: 200
- High-value location pages: all checked pages returned 200

## Discovery File Results

- `/sitemap.xml`: 200
- `/content-index.json`: 200
- `/llms.txt`: 200
- `/robots.txt`: 200
- Sub-sitemaps checked: 6
- Sub-sitemap URL counts:
  - core: 7
  - services: 16
  - blog: 24
  - locations: 31
  - ml: 7
  - legal: 2
- Unique sitemap page URLs crawled: 87
- `content-index.json` pages: 87
- Staging/Vercel URLs in discovery: 0

## Redirect Crawl Results

- Indexed redirect sources checked from `data/gsc-indexed-redirect-map.csv`: 90
- Redirect sources returning 301/308: 90
- Redirect targets returning 200: 90
- Redirect loops: 0
- Homepage dumping: 0
- Redirect sources in sitemap/content-index: 0
- Host normalization:
  - `https://ewastekochi.com/` -> 308 to `https://www.ewastekochi.com/`
  - `http://www.ewastekochi.com/` -> 308 to `https://www.ewastekochi.com/`

## Unsafe Claim Sweep Results

Production rendered crawl checked all 87 sitemap page URLs for the Phase 2L forbidden patterns:

- `AggregateRating`: 0
- `Review` schema: 0
- `ratingValue`: 0
- `reviewCount`: 0
- `4.9`: 0
- `500+ reviews`: 0
- CPCB/KSPCB/ISO/government-authorized claims: 0
- price/payment guarantees: 0
- same-day/all-Kerala/free-pickup guarantees: 0
- `100% Data Security`: 0
- `zero landfill`: 0
- staging URLs: 0

## GSC Submission Decision

Production validation passed. GSC-P4 is approved as the next phase, but no GSC submission was performed in Phase 2L-RETRY.

Recommended next step: submit the production sitemap and request indexing for the priority URLs listed in the user brief, then monitor for 72 hours.

## Remaining Issues and Risks

- Vercel CLI `inspect` still prints `Builds: . [0ms]` for static deployments, but project settings and remote build logs confirm Astro output directory `dist` is in effect.
- Vercel raw deployment preview URLs may be behind Vercel SSO protection; production validation was performed against the real public `www.ewastekochi.com` domain.
- `npm install` on Vercel reports 3 npm audit findings in dependencies. This did not block build or SEO validation, but it remains a dependency-maintenance item outside this cutover.
- Do not submit any V2 sitemap or request indexing until this report has been reviewed and the next GSC-P4 phase is intentionally started.
