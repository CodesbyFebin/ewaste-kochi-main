# GSC-P4 Sitemap Submission Log

Phase: GSC-P4 — manual Search Console submission
Generated: 2026-07-18

## Production Baseline

- Live: `https://www.ewastekochi.com`
- Current production sitemap: `https://www.ewastekochi.com/sitemap.xml`
- Safe readiness script: `45800217`
- Readiness command: `npm run gsc:indexing-readiness`
- Production sitemap URLs: 355
- Priority queue URLs: 29

## Submission Status

Sitemap submission was **not completed from this environment**.

Blocked access paths rechecked:

- Search Console API using active gcloud user `kochiewaste@gmail.com`: `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` for both `SitesService.List` and `SitemapsService.Submit`.
- Search Console API using application-default credentials: `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` for both `SitesService.List` and `SitemapsService.Submit`.
- In-app browser: unavailable; `agent.browsers.list()` returned `[]`, so the Search Console UI could not be opened from this session.

No sitemap was submitted. No URL Inspection indexing request was performed. No Validate Fix action was clicked.

## Intended Submission

- Intended GSC property: not confirmed through UI/API from this session
- Recommended property: verified domain property for `ewastekochi.com`, or URL-prefix property `https://www.ewastekochi.com/`
- Sitemap to submit manually: `https://www.ewastekochi.com/sitemap.xml`
- Submission date/time: not submitted
- Initial sitemap status: not available
- Discovered URL count shown in GSC: not available
- Immediate warnings/errors in GSC: not available
- Local API warning/error observed: `ACCESS_TOKEN_SCOPE_INSUFFICIENT`

## Readiness Command Result

`npm run gsc:indexing-readiness` passed.

| Check | Result |
| --- | --- |
| Discovery files | 6/6 returned 200 |
| Sitemap URLs | 355/355 passed |
| Priority queue | 29/29 passed |
| Staging/localhost URLs | 0 |
| Sitemap failures | 0 |
| `/ewaste/` in sitemap | 0 |
| Buyback URLs in sitemap | 0 |

## Final Live Discovery Check

| URL | HTTP status | Result |
| --- | ---: | --- |
| `https://www.ewastekochi.com/robots.txt` | 200 | Pass |
| `https://www.ewastekochi.com/sitemap.xml` | 200 | Pass |
| `https://www.ewastekochi.com/content-index.json` | 200 | Pass |
| `https://www.ewastekochi.com/ai-sitemap.xml` | 200 | Pass |
| `https://www.ewastekochi.com/llms.txt` | 200 | Pass |
| `https://www.ewastekochi.com/feed.xml` | 200 | Pass |

Discovery safety checks:

- `robots.txt` references `https://www.ewastekochi.com/sitemap.xml`.
- `sitemap.xml` is a sitemap index with 6 production `www` sub-sitemaps.
- Sub-sitemap counts: core 14, services 21, blog 124, legal 4, locations 184, ml 8.
- Unique sitemap URLs: 355.
- Sitemap URLs returning 200: 355/355.
- Sitemap URLs with non-production hosts: 0.
- Staging, Vercel preview, localhost, and `127.0.0.1` URLs: 0.
- `/ewaste/` in sitemap: 0.
- Buyback URLs in sitemap: 0.
- Sitemap failures: 0.

## Manual Action Required

Open Google Search Console and submit `https://www.ewastekochi.com/sitemap.xml` in the verified production property. Record the property, initial status, discovered URL count, and any warnings/errors after submission.
