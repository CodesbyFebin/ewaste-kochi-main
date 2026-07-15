# Old-Site GSC Alert Cleanup Report

Phase: OLD-SITE-GSC-CLEANUP — legacy website alert fix

## Summary

The current checkout is V2, not the old 11k pSEO source. The old GSC alerts are mostly pre-cutover noise, but this phase found and fixed a small live crawl-hygiene issue in V2 redirect config:

- Added 26 trailing-slash equivalents for already-approved permanent legacy redirects.
- Added `/index.html` -> `/` to consolidate duplicate homepage access.
- Did not add pages.
- Did not rebuild old pSEO.
- Did not redirect unrelated URLs to the homepage.
- Did not add Review/AggregateRating/itemReviewed schema.

Production deployment:

- Deployment ID: `dpl_EigSHp7EvFbip3ZYPmMmdyTcxvaC`
- Deployment URL: `https://ewaste-kochi-main-81q7mycfa-projects555.vercel.app`
- Aliased to `https://www.ewastekochi.com`

## Review Snippet Issue Status

- Active V2 source/rendered output: no Review/AggregateRating schema found.
- Validator/deny-list files contain blocked schema names by design.
- Ignored artifact `ewastekochi-amp.html` contains old unsafe Review/AggregateRating/rating content and should remain excluded from deployment.
- Recommended GSC action: Validate Fix if the affected URLs now render V2 pages or redirects without Review schema.

## Noindex Issue Status

Available old Coverage export contained 5 noindex rows:

- `https://www.ewastekochi.com/`
- `https://www.ewastekochi.com/index.html`
- `https://ewastekochi.com/`
- `https://ewastekochi.com/index.html`
- `https://www.ewastekochi.com/?q=%7Bsearch_term_string%7D`

Current remediation:

- Homepage is now live 200 and indexable.
- Non-www host redirects to `www`.
- `/index.html` now redirects to `/`.
- Query URL remains canonicalized by the homepage canonical and is not in sitemap.

Data file:

- `data/old-site-gsc-noindex-affected-urls.csv`

## 5xx Issue Status

The old Coverage summary reported 2 server-error rows, but the repository does not contain the affected URL drilldown export. Current live host checks did not find a priority 5xx issue.

Data file:

- `data/old-site-gsc-5xx-affected-urls.csv` (header only; affected URL export unavailable)

## Soft 404 Issue Status

The old Coverage summary reported 1 soft-404 row, but the repository does not contain the affected URL drilldown export. Current sampled old URLs either remain intentional 404s or redirect to relevant V2 targets.

Data file:

- `data/old-site-gsc-soft404-affected-urls.csv` (header only; affected URL export unavailable)

## Indexed Though Blocked By Robots Status

The old Coverage summary reported 1 indexed-blocked row, but the repository does not contain the affected URL drilldown export. Current production `robots.txt` allows priority pages and references the production sitemap.

Data file:

- `data/old-site-gsc-indexed-blocked-by-robots-urls.csv` (header only; affected URL export unavailable)

## Affected URLs Fixed By V2 Cutover

Created:

- `data/old-site-gsc-alert-url-action-map.csv`
- `data/old-site-gsc-alert-url-action-map.json`

Rows:

- 65 total action-map rows
- 5 old noindex rows
- 60 sampled old 404 rows from the available Coverage drilldown

Actions used:

- `fixed_by_v2_cutover`
- `redirect_301`
- `leave_404`
- `manual_review` only where current data is unavailable

## Code Patch Needed

Yes, a small V2 redirect patch was needed:

- 27 redirect rules added to `vercel.json`.
- All are specific known legacy paths or `/index.html`.
- All final targets return 200.
- No redirect source appears in sitemap or content-index.

## Deployment

Deployment was performed because the issue affected current production crawl hygiene for known old paths after cutover.

Validation:

- `npm run check`: pass, 0 errors/warnings/hints.
- `npm run validate`: pass, 87 routes, 736 checks, 0 failures.
- Live redirect-delta check: 27/27 redirect to 200 targets.
- Homepage and sitemap: 200 after deploy.

## GSC Validate Fix

Safe to click Validate Fix for old Review-snippet/noindex issues only after confirming the affected URL list in GSC points to current V2 pages or the now-fixed redirects.

Do not submit GSC sitemap from this phase. Sitemap submission remains the separate GSC-P4 manual action because authenticated GSC access was blocked in the previous phase.
