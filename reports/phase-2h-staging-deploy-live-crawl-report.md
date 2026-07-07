# Phase 2H — Staging Deploy + Live Crawl

Date: 2026-07-07
Status: **Complete.** Deployed to an isolated Vercel staging project only. No production domain touched, no DNS changed, no sitemap submitted to Google, no new pages/redirects added beyond what Phase 2G already produced.

## Pre-deploy cleanup

- `docs/deployment/staging-deployment-checklist.md` and `docs/deployment/post-deploy-crawl-checklist.md`: corrected the stale "13 redirect rules" reference to **297** in both files (Phase 2G added 284 on top of the original 13).
- `PROJECT_TRACKER.md`: marked Phase 2H in progress before starting.

## Local preflight

```
npm run build     → 43 pages built
npm run validate  → 464 checks passed, 0 failures
```
`vercel.json` confirmed valid JSON. No environment variables required (confirmed in Phase 2F, still true).

## Staging deployment

**A new, separate Vercel project was created for this** — `ewastekochi-v2-staging` — deliberately **not** connected to the existing `ewaste-kochi-main` project that already owns the real `www.ewastekochi.com` domain in this same Vercel account. This guarantees zero risk of accidentally promoting to the real production domain or touching its DNS/aliases.

| Field | Value |
|---|---|
| Staging URL (stable alias) | `https://ewastekochi-v2-staging.vercel.app` |
| Staging URL (deployment-specific) | `https://ewastekochi-v2-staging-9ez2719lm-febinfrancis555s-projects.vercel.app` |
| Deployment timestamp | 2026-07-07T00:51 UTC |
| Build command | `npm run build` → `astro build` (Vercel auto-detected the Astro static output correctly; an initial generic "no framework detected" message appeared only during project linking, before any files were inspected — the actual build ran cleanly) |
| Output directory | `dist/` (Astro default, `output: "static"`) |
| Build warnings | 2 harmless npm deprecation notices from transitive dependencies (`whatwg-encoding`, `tsconfck`) — unrelated to this codebase, no action needed |
| Failed build logs | None |
| Deployment protection | **None** — publicly reachable, no password/SSO wall (see Finding below) |

## Live staging crawl

Crawled via a Python script (stdlib `urllib`, no external dependencies) hitting the real deployed URL — not just re-reading local `dist/` files, so this catches anything that only breaks in Vercel's actual runtime.

### 1. Core status checks — ✅ all clean

- All 43 routes: **200**, each with a non-empty `<title>`, non-empty meta description, exactly 1 `<h1>`, viewport meta present.
- All 6 sub-sitemaps + sitemap index: **200**, sub-sitemap URL counts sum to **43** (7 core + 16 services + 4 locations + 2 legal + 7 ml + 7 blog), exactly matching the route registry.
- `robots.txt`, `llms.txt`, `content-index.json`, `content-index.xml`, `ai-sitemap.xml`: all **200**, correct content types (`text/plain` for robots/llms, `application/json` for content-index.json, `application/xml` for the rest).
- `/blogs/` → **404** (not silently resolved by any catch-all routing).
- `/hi/` → **404** (untouched, as expected — still not built).

### 2. Redirect verification — ✅ all clean, full coverage (not just sampling)

All **296 testable redirect rules** (297 total minus the host-canonicalization wildcard rule, which only fires on the real `ewastekochi.com` domain and can't be tested from a `.vercel.app` host) were checked programmatically — not just the requested sample:

- **296/296 return `308`** (permanent redirect — Vercel's standard implementation of `"permanent": true"`; functionally equivalent to 301 for search engines and browsers, and per HTTP semantics 308 is the *more* correct permanent redirect since it explicitly preserves the request method).
- **0** redirect chains, **0** missing `Location` headers.
- **296/296 destinations return 200.**

Representative samples across every scope group (full list of all 296 checked in the crawl script output):

| Group | Example | Result |
|---|---|---|
| Original 7 GSC winner/loser redirects | `/e-waste-recycling` → `/recycling/` | 308 → 200 |
| | `/free-e-waste-pickup-kochi` → `/blog/free-e-waste-pickup-kochi/` | 308 → 200 |
| | `/locations/kalamassery-hitech-park` → `/locations/kalamassery/` | 308 → 200 |
| City-based legacy matrix (Phase 2G) | `/locations/ernakulam-south/battery-recycling-kochi/` → `/locations/ernakulam-south/` | 308 → 200 |
| | `/locations/ernakulam-south/dpdp-act-compliance-kochi/` → `/locations/ernakulam-south/` (city rule overrides the "no confident target" service rule) | 308 → 200 |
| Service-based legacy matrix, unbuilt cities (Phase 2G) | `/locations/aluva/free-ewaste-pickup-kochi/` → `/pickup/` | 308 → 200 |
| | `/locations/angamaly/battery-recycling-kochi/` → `/battery-recycling/` | 308 → 200 |
| | `/locations/kollam/free-ewaste-pickup-kochi/` → `/pickup/` | 308 → 200 |

### 3. Canonical checks — ✅ clean, and behaved exactly as documented

All 43 pages' canonical, `og:url`, and hreflang URLs point to `https://www.ewastekochi.com/...` — **not** the staging host. This was flagged in advance in `docs/deployment/staging-deployment-checklist.md` section 3 as expected behavior (canonicals are hardcoded to `SITE_URL`), and it's exactly what happened — confirms the codebase will emit correct production canonicals once actually cut over, and confirms this staging copy won't compete with production in search results if canonical signals are respected.

### 4. Hreflang checks — ✅ clean

All 7 English/Malayalam pairs (14 pages) checked directly on staging: each emits all 3 alternates (en-IN, ml-IN, x-default), all pointing to the correct production URLs, matching on both sides of every pair. `/ml/` confirmed not blocked in `robots.txt`.

### 5. Blog checks — ✅ clean

`/blog/` posts all return 200, all carry `BlogPosting` schema (checked directly in the served HTML), `/blog/` itself is not redirected, `/blogs/` is not built (404, confirmed above).

### 6. Trust/safety checks — ✅ clean

Full-text sweep across all 43 live pages: **0** `AggregateRating`, **0** `Review` schema, **0** `GeoCoordinates`, **0** fabricated certificate/registration/authorization number patterns.

### 7. Performance/accessibility smoke checks — ✅ clean, with one honest gap

- Exactly 1 `<h1>` per page across all 43 (confirmed after fixing a regex bug in the crawl script itself — first pass showed 0 for every page because `<h1[\b>]` was accidentally a backspace-character class, not a word-boundary; re-run with the corrected pattern confirmed 1 everywhere).
- Viewport meta present on all 43 pages.
- WhatsApp CTA link (`wa.me/917500555454`) confirmed present and correctly formatted on `/pickup/`.
- **Not done**: actual mobile-viewport visual rendering / console-error check. This environment has no browser automation tool available, so this was verified structurally (viewport meta, no layout-breaking patterns in source) but not visually. Flagging honestly rather than claiming a visual check that didn't happen — recommend a quick manual phone/browser spot-check before production cutover if that matters to you.

## Finding: staging deployment has no crawl/index protection

`docs/deployment/post-deploy-crawl-checklist.md` section 7 anticipated this exact risk, and it's real: this staging deployment is **fully public, unauthenticated, and fully crawlable** —

- No Vercel Deployment Protection (password/SSO) was applied — confirmed by a plain `curl` returning 200 with no auth challenge.
- No `X-Robots-Tag` header from Vercel.
- No `<meta name="robots">` noindex on any page (correct for eventual production, but means staging is not self-protected either).
- `robots.txt` on the staging host itself says `Allow: /` (it's the same static file that will serve production — there's no staging-specific override).

**Mitigating factor**: canonical tags on every staging page already point to the *production* URL, not the staging URL, so if Google did discover and crawl this staging host, it would very likely fold it into the production URL's canonical rather than index it as separate duplicate content. This is not a guarantee, though — it depends on Google actually crawling and respecting canonical, which isn't instant.

**Recommendation (not actioned — your call)**: since this project is a disposable, isolated staging copy created solely for this crawl test, either (a) enable Vercel's Deployment Protection on `ewastekochi-v2-staging` now that testing is done, or (b) delete the staging deployment/project once you're satisfied with this report, rather than leaving it running indefinitely and publicly reachable.

## Summary

| Metric | Value |
|---|---|
| Routes checked | 43/43 → 200 |
| Sitemap URLs | 43/43 → 200, sum matches route registry |
| Content-index URLs | 43/43 (json + xml both load) |
| Redirects checked | 296/296 (full set, not a sample) → 308 + destination 200 |
| Redirect chains found | 0 |
| Canonical errors | 0 |
| Hreflang errors | 0 (7/7 pairs, both sides) |
| Schema safety violations | 0 |
| `/blogs/` and `/hi/` | Both correctly 404 |
| H1 count violations | 0 |
| Deployment protection | **Missing — flagged as a finding, not a blocker** |

## Production cutover readiness verdict

**A. Ready for production cutover** (from the code/content/SEO-infrastructure side).

Every check the staging crawl was designed to catch — routes, redirects (all 296, not just a sample), canonicals, hreflang, sitemaps, robots, schema safety, blog setup — came back clean, with the build behaving identically on Vercel's real runtime as it does locally. This exceeds the "ready after minor fixes" expectation set going into this phase.

**Two non-blocking recommendations before or shortly after cutover:**
1. Address the deployment-protection gap on the staging project itself (see Finding above) — not a defect in the codebase being shipped, just an operational loose end on the disposable staging copy.
2. A real mobile-browser visual spot-check (this environment couldn't do one) is still worth 5 minutes before or right after cutover, since it's the one checklist item that genuinely can't be verified by crawling HTML.

No code, content, redirect, or SEO-infrastructure fix is required before cutover based on this crawl.

## Not done in this phase (explicitly out of scope)

- No production domain deploy, no DNS change, no connection of `www.ewastekochi.com` to this build.
- No sitemap submission to Google Search Console.
- No new pages, blog posts, or redirects added (296 pre-existing rules were tested, not expanded).
- No changes to `/hi/`, `blog.ewastekochi.com`, or `/blogs/`.

## Next

Per the user's stated sequence: **Phase 2I — Production Cutover Plan** (a checklist, not the cutover itself) — backup current production, confirm Vercel project/domain settings, production deploy, verify 43 pages/297 redirects/robots/sitemaps/canonicals, submit sitemap in GSC, monitor coverage.
