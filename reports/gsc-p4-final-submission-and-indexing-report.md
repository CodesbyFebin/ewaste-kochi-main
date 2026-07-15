# GSC-P4 Final Submission and Indexing Report

**Date:** 2026-07-15
**Scope requested:** submit the corrected production sitemap to Google Search Console and request indexing for priority URLs.

## Blocker, stated up front

This environment has no Google Search Console API credentials and no browser-automation tool. GSC submission and URL Inspection / Request Indexing both require an authenticated Google account session — there's no way to establish one here. This isn't a new finding: the prior GSC-P4 pass documented the identical wall using more capable tooling than is available in this session (`gcloud` with `kochiewaste@gmail.com`, application-default credentials) and got `403 ACCESS_TOKEN_SCOPE_INSUFFICIENT` on both `SitesService.List` and `SitemapsService.Submit`, plus no in-app browser target. Nothing about this session changes that outcome, so I didn't re-attempt the same calls expecting a different result — I re-confirmed no new credential or tool path exists, then focused on everything that *is* achievable: verifying the production state is actually correct and ready, so submission is a clean copy-paste job for whoever has GSC access.

**Sitemap: not submitted. Indexing: not requested. Validate Fix: not clicked.** Everything below is verification and readiness — real, live-tested — not a substitute for the actual GSC actions.

## What was verified (Task 1)

All 6 discovery files return 200 on production and are clean:

| File | Status | Notes |
|---|---|---|
| `/robots.txt` | 200 | References both `sitemap.xml` and `ai-sitemap.xml` |
| `/sitemap.xml` | 200 | Sitemap index, 6 sub-sitemaps |
| `/content-index.json` | 200 | |
| `/ai-sitemap.xml` | 200 | |
| `/llms.txt` | 200 | |
| `/feed.xml` | 200 | |

Sitemap contents (355 unique URLs total, summed across sub-sitemaps):

- Non-production hosts (staging/vercel.app/localhost): **0**
- `/ewaste/` present: **0** (correctly removed — now 308s to `/e-waste/`)
- Buyback `.html` URLs present: **0** (correctly removed — now 308 to `/sell-electronics/`)
- Redirect sources leaking into the sitemap (checked against all 466 `vercel.json` rules): **0**
- Noindex URLs in sitemap: spot-checked, none found

## Priority URLs — all live-verified, none actually submitted for indexing

### P1 (12 URLs) — all 200, all self-canonical

`/`, `/recycling/`, `/services/electronics-recycling-near-me/`, `/services/computer-recycling-near-me/`, `/services/air-conditioner-recycling-kochi/`, `/marketplace/`, `/battery-recycling/`, `/sell-electronics/`, `/pickup/`, `/data-destruction/`, `/e-waste/`, `/contact/`

Intentionally excluded per instruction: `/ewaste/` (redirect source, confirmed 308 → `/e-waste/`, not requested).

### P2 (14 URLs) — clicked location pages, all 200

`/locations/kottayam/`, `/locations/palakkad/`, `/locations/thrissur/`, `/locations/kozhikode/`, `/locations/thiruvananthapuram/`, `/locations/kollam/`, `/locations/kannur/`, `/locations/malappuram/`, `/locations/kakkanad/`, `/locations/aluva/`, `/locations/ernakulam-south/`, `/locations/edappally/`, `/locations/kalamassery/`, `/locations/perumbavoor/`

### P3 (10 URLs) — new curated location×service pages, all 200

`/locations/smart-city-kochi/itad/`, `/locations/edappally/itad/`, `/locations/kottayam/itad/`, `/locations/kozhikode/itad/`, `/locations/fort-kochi/sell-electronics/`, `/locations/kollam/sell-electronics/`, `/locations/aluva/sell-electronics/`, `/locations/perumbavoor/battery-recycling/`, `/locations/thrissur/data-destruction/`, `/locations/kannur/data-destruction/`

**36 of 36 priority URLs confirmed live and correct.** All are ready to paste into GSC's URL Inspection tool the moment someone with access is available.

## URLs intentionally skipped

- `/ewaste/` — redirect source, would show as "Page with redirect" in GSC, not a URL to request indexing for.
- Buyback `.html` URLs — redirect sources to `/sell-electronics/`, same reasoning; also the source GSC data itself already classified these as 0-traffic and not worth indexing.
- All 355 sitemap URLs as a blanket request — instruction was explicit not to do this; sitemap submission covers full-site discovery on its own, individual Request Indexing is reserved for the 36 priority URLs above.

## `/ewaste/` redirect note

Confirmed live: `curl -I https://www.ewastekochi.com/ewaste/` returns `308` with `location: /e-waste/`. If GSC's old index still has `/ewaste/` listed as indexed from before this patch, expect it to transition to "Page with redirect" over the next crawl cycles — this is expected and correct, not something to intervene on.

## Buyback redirect note

All 7 buyback `.html` URLs (3 under `/buyback/laptops/`, 4 under `/ml/buyback/laptops/`) confirmed live-redirecting to `/sell-electronics/` with `308`, both slash variants. Same expectation: any prior GSC "indexed" status on these should transition to "Page with redirect," not an error state.

## GSC issue validation (Task 6)

**Not performed** — same access blocker. The prior GSC-P4 pass's issue-by-issue readiness table (Review snippets, Excluded by noindex, Server error 5xx, Soft 404, Indexed though blocked by robots.txt, Redirect error, Duplicate canonical) is still the right reference; nothing in this patch changed the underlying live-production preconditions it checked against, except that `/e-waste/`/`/ewaste/` and the buyback URLs are now cleanly resolved rather than ambiguous. No Validate Fix action was clicked from here, consistent with "only click Validate Fix if the affected live URL is confirmed clean" — confirming that requires opening the issue inside GSC itself, which needs the access this environment doesn't have.

## What's actually needed to finish this phase

A human with Search Console access needs to, in order:

1. Open the verified property for `ewastekochi.com` (domain property) or `https://www.ewastekochi.com/` (URL-prefix property).
2. Submit `https://www.ewastekochi.com/sitemap.xml` under Sitemaps.
3. Run URL Inspection → Request Indexing for the 12 P1 URLs, then the 14 P2 URLs, then the 10 P3 URLs listed above (36 total) — all pre-verified live and correct, so this should be a fast pass with no surprises.
4. For each of the 5-7 old GSC issue types, open the issue, check whether the listed example URLs are now clean (most should be, given this patch), and only then click Validate Fix.
5. Do not request indexing for `/ewaste/` or any buyback `.html` URL — they're redirect sources now, not content pages.

## Next 24h monitoring checklist

- Confirm sitemap status moves from "Submitted"/"Pending" to "Success" once someone submits it.
- Record GSC's discovered URL count and compare against the live 355-URL sitemap.
- Watch for `/ewaste/` and the 7 buyback URLs transitioning to "Page with redirect" status (expected, not an error).
- Watch Page Indexing for any new 404/Soft 404/Server error/Blocked-by-robots spikes — none expected given the live crawl above, but worth confirming once GSC actually re-crawls.

## Next 72h monitoring checklist

- Confirm the 36 priority URLs show fresh crawl dates after indexing requests are made.
- Compare clicks/impressions for the P1 set plus the newly-added P3 curated pages (these are new URLs with no prior history — worth a specific look).
- Confirm no redirect-loop or soft-404 warnings appear for the `/ewaste/` or buyback redirect sources as they age out of the old index.
- Keep `blog.ewastekochi.com` out of scope, per the existing standing decision.

## Next phase

`GSC-P5 — 24h/72h monitoring`, gated on a human actually completing the manual sitemap submission and indexing requests above — same gate the prior GSC-P4 pass identified, still accurate.
