# GSC-P4 Post-Cutover Submission Report

Phase: GSC-P4 — sitemap submission + priority indexing + monitoring baseline

## Status

GSC-P4 is **partially complete**:

- Production discovery verification: complete, passed.
- Priority URL live baseline: complete, passed.
- Redirect sample inspection: complete, passed.
- Google Search Console sitemap submission: blocked, not submitted from this session.
- Google Search Console URL Inspection / Request Indexing: blocked, not requested from this session.
- Deployment: not performed.
- Pages/redirects/content changes: not performed.

## Access Blocker

Search Console actions require authenticated UI/API access.

Attempted access paths:

- In-app browser: unavailable; browser target list returned empty.
- Search Console API with local application-default credential: blocked by `ACCESS_TOKEN_SCOPE_INSUFFICIENT`.
- Search Console API with active gcloud user `kochiewaste@gmail.com`: blocked by `ACCESS_TOKEN_SCOPE_INSUFFICIENT`.
- Attempt to mint a Search Console-scoped gcloud token using `https://www.googleapis.com/auth/webmasters`: rejected by this gcloud login's available scope set.

Result: no sitemap or URL Inspection request was submitted. This report records the production-ready baseline and the exact manual GSC actions still required.

## Sitemap Submission Details

- Submitted sitemap URL: not submitted
- Intended sitemap URL: `https://www.ewastekochi.com/sitemap.xml`
- Intended GSC property: verified `https://www.ewastekochi.com/` URL-prefix property or `ewastekochi.com` domain property
- Initial GSC status: not available
- GSC discovered URL count: not available
- Immediate GSC warnings/errors: not available

Production discovery baseline:

- `/robots.txt`: 200
- `/sitemap.xml`: 200
- `/content-index.json`: 200
- `/llms.txt`: 200
- Sitemap index sub-sitemaps: 6
- Unique sitemap page URLs: 87
- Sitemap URLs returning 200: 87
- Sitemap URLs with `noindex`: 0
- Sitemap URLs with staging/localhost/Vercel preview hosts: 0
- Redirect sources in sitemap/content-index: 0

## Priority URL Live Baseline

These are ready for URL Inspection and Request Indexing in Search Console. All were checked live on production and returned 200 with self-canonical `https://www.ewastekochi.com` URLs and no `noindex`.

| Priority URL | Live status | Canonical/noindex result | Indexing request |
| --- | ---: | --- | --- |
| `https://www.ewastekochi.com/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/recycling/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/services/electronics-recycling-near-me/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/marketplace/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/battery-recycling/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/sell-electronics/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/kottayam/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/palakkad/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/thrissur/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/kozhikode/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/thiruvananthapuram/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/kollam/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/kannur/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/locations/malappuram/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/pickup/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/contact/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |
| `https://www.ewastekochi.com/blog/free-e-waste-pickup-kochi/` | 200 | Self-canonical, indexable | Not requested; GSC access blocked |

## Redirect Sample Inspection

Sample size: 28 URLs.

- 24 indexed redirect-source URLs from `data/gsc-indexed-redirect-map.csv`.
- 4 non-www variants of old redirect-source URLs.
- First-hop redirects: 28/28.
- Final targets returning 200: 28/28.
- Final targets canonicalized to `https://www.ewastekochi.com`: 28/28.
- Redirect loops: 0.
- Robots/noindex on final targets: 0.
- Soft-404 signals on final targets: 0.

Representative samples:

| Old URL | Redirect target | Result |
| --- | --- | --- |
| `/locations/edappally/certificate-of-destruction-kochi` | `/data-destruction-certificate-sample/` | 308 -> 200, self-canonical |
| `/locations/thrikkakara/data-destruction-kochi` | `/data-destruction/` | 308 -> 200, self-canonical |
| `/locations/kozhikode/e-waste-recycling-kochi` | `/recycling/` | 308 -> 200, self-canonical |
| `/locations/thrissur/it-asset-inventory-audit` | `/services/it-asset-inventory-audit/` | 308 -> 200, self-canonical |
| `/locations/kalamassery-hitech-park` | `/locations/kalamassery/` | 308 -> 200, self-canonical |
| `/locations/kakkanad/dpdp-act-compliance-kochi` | `/locations/kakkanad/` | 308 -> 200, self-canonical |
| `/ml/services/tv-monitor-recycling-kochi` | `/tv-recycling-kochi/` | 308 -> 200, self-canonical |
| `/locations/palakkad/hard-drive-degaussing-kochi` | `/services/hard-drive-degaussing-kochi/` | 308 -> 200, self-canonical |
| `/locations/kozhikode/laptop-recycling-near-me` | `/services/electronics-recycling-near-me/` | 308 -> 200, self-canonical |
| `/locations/muvattupuzha/battery-recycling-kochi` | `/battery-recycling/` | 308 -> 200, self-canonical |
| `/locations/palakkad/free-ewaste-pickup-kochi` | `/pickup/` | 308 -> 200, self-canonical |
| `/locations/kottayam/laptop-buyback-kochi` | `/sell-electronics/` | 308 -> 200, self-canonical |
| `/e-waste-recycling` | `/recycling/` | 308 -> 200, self-canonical |
| `/data-destruction-services-kochi` | `/data-destruction/` | 308 -> 200, self-canonical |
| non-www `/locations/edappally/certificate-of-destruction-kochi` | `www` then `/data-destruction-certificate-sample/` | 308 -> 308 -> 200, expected host normalization |
| non-www `/locations/thrikkakara/data-destruction-kochi` | `www` then `/data-destruction/` | 308 -> 308 -> 200, expected host normalization |
| non-www `/locations/kozhikode/e-waste-recycling-kochi` | `www` then `/recycling/` | 308 -> 308 -> 200, expected host normalization |
| non-www `/locations/thrissur/it-asset-inventory-audit` | `www` then `/services/it-asset-inventory-audit/` | 308 -> 308 -> 200, expected host normalization |

## Issues Found

No production discovery, priority URL, or redirect-sample issues were found.

The only blocker is operational access to Search Console:

- Sitemap not submitted.
- URL Inspection live tests not run inside GSC.
- Request Indexing not performed.

## Manual GSC Work Still Required

Use Search Console manually with a verified property:

1. Submit `https://www.ewastekochi.com/sitemap.xml`.
2. For the 17 priority URLs above, run URL Inspection.
3. Click Test Live URL.
4. If live test passes, click Request Indexing.
5. Record any warnings, request quota blocks, or indexing request failures.
6. Do not request indexing for all 87 pages.
7. Do not request indexing for retired 404 URLs or redirect sources.

## 24-Hour Monitoring Checklist

- Check GSC sitemap status for `https://www.ewastekochi.com/sitemap.xml`.
- Confirm discovered URL count is moving toward 87.
- Check Page Indexing for spikes in Not Found (404), Soft 404, Redirect error, Alternate page with proper canonical tag, Crawled currently not indexed, and Duplicate without user-selected canonical.
- Inspect the 17 priority URLs for indexing state changes.
- Check server/live site for homepage, `/recycling/`, `/marketplace/`, `/battery-recycling/`, `/services/electronics-recycling-near-me/`, `/pickup/`, `/contact/`.
- Re-run a 20+ redirect-source sample if GSC reports redirect errors.

## 72-Hour Monitoring Checklist

- Compare GSC Coverage/Page Indexing counts to the pre-cutover baseline.
- Check whether priority URLs have been crawled after the cutover date.
- Monitor clicks/impressions for homepage, `/recycling/`, `/marketplace/`, `/battery-recycling/`, `/services/electronics-recycling-near-me/`, `/sell-electronics/`, `/pickup/`, `/contact/`, and clicked location pages.
- Watch for accidental indexing of retired redirect-source URLs.
- Watch for new 404s on high-impression URLs.
- Do not start Wave 2 page creation unless monitoring shows clear, validated demand and no migration blockers.

## Next Recommended Phase

Next phase: GSC-P5 — 24h/72h monitoring and issue triage.

Start GSC-P5 only after the sitemap and priority indexing requests are manually completed in Search Console or an authenticated Search Console browser/API path is provided.
