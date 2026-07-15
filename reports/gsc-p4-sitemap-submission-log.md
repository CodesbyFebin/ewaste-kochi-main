# GSC-P4 Sitemap Submission Log

Phase: GSC-P4 — post-cutover sitemap submission + priority indexing

Production baseline:

- Live site: `https://www.ewastekochi.com`
- Production deployment: `dpl_HBJxC8ujQcEpNB922Ug5Yv6Sfbbk`
- Cutover commit: `c5fb23b`
- Routes validated at cutover: 87
- Indexed redirects validated at cutover: 90

## Submission Status

Sitemap submission was **not completed from this session**.

Reason:

- The in-app browser target required for Google Search Console UI work was unavailable (`agent.browsers.list()` returned `[]`).
- Local Google credentials exist for `kochiewaste@gmail.com`, but both application-default and user gcloud tokens returned Search Console API `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT`.
- `gcloud auth print-access-token --scopes=https://www.googleapis.com/auth/webmasters` is not permitted by this gcloud login's available scope set.

No staging URL was submitted. No URL Inspection indexing requests were performed.

## Intended Submission

- Intended GSC property: not confirmed in UI/API from this session
- Recommended property to use: `https://www.ewastekochi.com/` if URL-prefix property exists, otherwise the verified domain property for `ewastekochi.com`
- Sitemap URL to submit: `https://www.ewastekochi.com/sitemap.xml`
- Submission time: not submitted
- Initial sitemap status: not available
- Discovered URL count shown in GSC: not available
- Immediate warnings/errors in GSC: not available

## Production Discovery Pre-Submission Check

Automated live checks completed against production:

| URL | HTTP status | Result |
| --- | ---: | --- |
| `https://www.ewastekochi.com/robots.txt` | 200 | Pass |
| `https://www.ewastekochi.com/sitemap.xml` | 200 | Pass |
| `https://www.ewastekochi.com/content-index.json` | 200 | Pass |
| `https://www.ewastekochi.com/llms.txt` | 200 | Pass |

Discovery safety:

- `robots.txt` references `https://www.ewastekochi.com/sitemap.xml`.
- `sitemap.xml` is a sitemap index with 6 production `www` sub-sitemaps.
- Sub-sitemaps checked: core, services, blog, locations, ml, legal.
- Unique sitemap page URLs: 87.
- All 87 sitemap page URLs returned 200.
- All 87 sitemap page URLs self-canonicalized to `https://www.ewastekochi.com`.
- Redirect sources in sitemap: 0.
- Noindex URLs in sitemap: 0.
- 404 URLs in sitemap: 0.
- Staging, Vercel preview, and localhost URLs in sitemap/content-index: 0.
- `content-index.json` canonical domain: `https://www.ewastekochi.com`.
- `content-index.json` pages: 87.

Sub-sitemap counts:

| Sub-sitemap | URLs | Status |
| --- | ---: | --- |
| `https://www.ewastekochi.com/sitemaps/core.xml` | 7 | 200 |
| `https://www.ewastekochi.com/sitemaps/services.xml` | 16 | 200 |
| `https://www.ewastekochi.com/sitemaps/blog.xml` | 24 | 200 |
| `https://www.ewastekochi.com/sitemaps/locations.xml` | 31 | 200 |
| `https://www.ewastekochi.com/sitemaps/ml.xml` | 7 | 200 |
| `https://www.ewastekochi.com/sitemaps/legal.xml` | 2 | 200 |

## Manual Action Required

In Google Search Console:

1. Open the verified property for `https://www.ewastekochi.com/` or the domain property for `ewastekochi.com`.
2. Go to Sitemaps.
3. Submit `https://www.ewastekochi.com/sitemap.xml`.
4. Record the initial status, discovered URL count, and any warnings/errors.
5. Continue with priority URL Inspection requests from `reports/gsc-p4-post-cutover-submission-report.md`.
