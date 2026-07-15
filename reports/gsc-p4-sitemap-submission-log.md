# GSC-P4 Sitemap Submission Log

Phase: GSC-P4 — sitemap submission + priority indexing
Generated: 2026-07-18

## Production Baseline

- Live: `https://www.ewastekochi.com`
- Deployment: `dpl_6sP1qDXFwoS5CYbXJTFbPYBSYWbd`
- Branch: `expanded-indexed-clusters-20260718`
- Commit: `9b0a376`
- Production pages: 363
- Validation baseline: 1,586 checks, 0 failures

## Submission Status

Sitemap submission was **not completed from this environment**.

Blocked access paths:

- Search Console API using active gcloud user `kochiewaste@gmail.com`: `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` for both `SitesService.List` and `SitemapsService.Submit`.
- Search Console API using application-default credentials: `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` for both `SitesService.List` and `SitemapsService.Submit`.
- In-app browser: unavailable; `agent.browsers.list()` returned `[]`, so the Search Console UI could not be opened from this session.

No staging URL was submitted. No sitemap was submitted. No URL Inspection indexing request was performed.

## Intended Submission

- Intended GSC property: not confirmed through UI/API from this session
- Recommended property: verified domain property for `ewastekochi.com`, or URL-prefix property `https://www.ewastekochi.com/`
- Sitemap submitted: not submitted
- Sitemap to submit manually: `https://www.ewastekochi.com/sitemap.xml`
- Submission time: not submitted
- Initial sitemap status: not available
- Discovered URL count shown in GSC: not available
- Immediate warnings/errors in GSC: not available
- API warning/error observed locally: `ACCESS_TOKEN_SCOPE_INSUFFICIENT`

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
- Sub-sitemap counts: core 15, services 24, blog 124, legal 4, locations 184, ml 12.
- Unique sitemap URLs: 363.
- Sitemap URLs returning 200: 363/363.
- Sitemap URLs with redirect final URL mismatch: 0.
- Sitemap URLs with noindex: 0.
- Sitemap URLs with non-production hosts: 0.
- Staging, Vercel preview, localhost, and `127.0.0.1` URLs: 0.
- 404 URLs in sitemap: 0.
- Redirect sources in sitemap: 0.
- `content-index.json` is live and production-hosted.
- `ai-sitemap.xml` is live and production-hosted.
- `feed.xml` is live and production-hosted.

## Manual Action Required

Open Google Search Console and submit `https://www.ewastekochi.com/sitemap.xml` in the verified production property. Record the property, initial status, discovered URL count, and any warnings/errors after submission.
