# GSC-P4 Sitemap Submission Log

Phase: GSC-P4 — sitemap submission + priority indexing
Generated: 2026-07-15 (updated after the URL canonical blocker patch)

## Production Baseline

- Live: `https://www.ewastekochi.com`
- Deployment: `dpl_GYpvyPQeDr8gU7cJESrcLda4a4gA`
- Commits: `3408ceeb` (URL canonical blocker patch) + `5c02fdd0` (doc correction)
- Production pages: 355 (was 363 before this patch — buyback `.html` spam pages and `/ewaste/` removed)
- Validation baseline: 1,578 checks, 0 failures

## Submission Status

Sitemap submission was **not completed from this environment** — same blocker the prior GSC-P4 pass hit, re-confirmed rather than assumed still true:

- No Google Search Console API credentials are configured in this environment (checked for service-account JSON, OAuth token files, `GOOGLE_APPLICATION_CREDENTIALS` — none found).
- No browser-automation tool is available to this session to open the Search Console UI and submit interactively.
- The prior attempt (this same phase, an earlier pass) documented `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` against both `SitesService.List` and `SitemapsService.Submit` using `kochiewaste@gmail.com` and application-default credentials, and found no in-app browser target (`agent.browsers.list()` returned `[]`). Nothing in this environment changes that outcome — there's no different credential or tool to try.

No sitemap was submitted. No URL Inspection indexing request was performed. No Validate Fix action was clicked.

## Intended Submission

- Intended GSC property: not confirmed through UI/API from this session
- Recommended property: verified domain property for `ewastekochi.com`, or URL-prefix property `https://www.ewastekochi.com/`
- Sitemap to submit manually: `https://www.ewastekochi.com/sitemap.xml`
- Submission time: not submitted
- Initial sitemap status: not available
- Discovered URL count shown in GSC: not available
- Immediate warnings/errors in GSC: not available

## Final Live Discovery Check (re-verified against the current, post-patch deployment)

| URL | HTTP status | Result |
| --- | ---: | --- |
| `https://www.ewastekochi.com/robots.txt` | 200 | Pass |
| `https://www.ewastekochi.com/sitemap.xml` | 200 | Pass |
| `https://www.ewastekochi.com/content-index.json` | 200 | Pass |
| `https://www.ewastekochi.com/ai-sitemap.xml` | 200 | Pass |
| `https://www.ewastekochi.com/llms.txt` | 200 | Pass |
| `https://www.ewastekochi.com/feed.xml` | 200 | Pass |

Discovery safety checks:

- `robots.txt` references both `https://www.ewastekochi.com/sitemap.xml` and `https://www.ewastekochi.com/ai-sitemap.xml`.
- `sitemap.xml` is a sitemap index with 6 production `www` sub-sitemaps.
- Unique sitemap URLs (summed across sub-sitemaps): **355**.
- Sitemap URLs with non-production hosts (staging/vercel.app/localhost): **0**.
- `/ewaste/` in any sitemap: **0** (confirmed removed; it now 308s to `/e-waste/`).
- Buyback `.html` URLs in any sitemap: **0** (confirmed removed; they now 308 to `/sell-electronics/`).
- Redirect sources leaking into the sitemap (checked against all 466 `vercel.json` rules): **0**.
- Spot-checked for noindex meta tag on `/e-waste/`: none found.

## Manual Action Required

Open Google Search Console and submit `https://www.ewastekochi.com/sitemap.xml` in the verified production property. Record the property, initial status, discovered URL count, and any warnings/errors after submission.
