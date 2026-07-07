# V2 Redirect Plan — Phase 2 (draft)

Status: **draft, safe subset only**. Anything touching a `manual-review` URL from the inventory is deliberately excluded until GSC data arrives.

**Implemented as real config:** see [`/vercel.json`](../vercel.json) — host canonicalization (non-www → www via a `host` match rule) plus the 3 confirmed-correct duplicate-service redirects and the `/locations/v2/kakkanad/` fix from section 4 below. This is deploy-time config, not yet pushed to production — it takes effect only once this codebase is deployed to Vercel.

## 1. Host/protocol canonicalization (safe, ship now)

Single-hop 301s to `https://www.ewastekochi.com`:

```
http://ewastekochi.com/*      -> https://www.ewastekochi.com/*   (301, 1 hop)
https://ewastekochi.com/*     -> https://www.ewastekochi.com/*   (301, 1 hop)
http://www.ewastekochi.com/*  -> https://www.ewastekochi.com/*   (301, 1 hop)
```

Fixes **Finding R1** (the current 2-hop chain for bare non-www http). Path and query string must be preserved across the rewrite (`/foo?bar=1` → `https://www.ewastekochi.com/foo?bar=1`), not collapsed to homepage.

## 2. Trailing slash normalization (safe, ship now)

All directory-style routes redirect no-slash → slash, 301, e.g. `/contact` → `/contact/`. Already correct behavior on live site; V2 must preserve it by making trailing-slash the canonical route shape throughout (Astro `trailingSlash: "always"`).

## 3. Already-correct duplicate-service redirects (carry forward as-is)

| Source | Target | Type |
|---|---|---|
| `/services/battery-recycling-kochi/` | `/battery-recycling/` | 301 |
| `/services/data-destruction-kochi/` | `/data-destruction/` | 301 |
| `/services/itad-kochi/` | `/itad/` | 301 |

`/services/e-waste-recycling-kochi/` **RESOLVED 2026-07-07** — GSC data settled Finding D1 (`/recycling/` wins, 72 vs 2 clicks). Now redirects straight to `/recycling/` (not through `/e-waste-recycling/`), avoiding a 2-hop chain. Added to `vercel.json`.

## 4. Dead legacy paths (safe, ship now)

`/buyback/laptops/`, `/comparisons/`, `/locations/ewaste-kochi/` are already 404 with (per available signal) no known clicks/impressions. Recommend **410 Gone** instead of a bare 404 once GSC confirms no residual backlink/impression value — 410 signals intentional removal more clearly than a generic 404. Not urgent; do not block launch on this.

`/locations/v2/kakkanad/` (Finding R2): fix the redirect target from the dead-end `/locations/v2/` to `/locations/kakkanad/` — this is a pure bug fix, no equity decision involved, safe to ship.

## 5. Blog index (`/blog/`) — HOLD, do not implement yet

Mission wants `/blog/` → `blogs.ewastekochi.com`. **`blogs.ewastekochi.com` currently returns 404 — the subdomain isn't provisioned.** Implementing this redirect today would send all `/blog/` index traffic into a dead end. This redirect stays **not implemented** until:
1. The subdomain exists and serves real content, and
2. The user confirms the blog-index-only migration (not the individual posts) is still what they want.

## 6. Old `.html` / SKU-style legacy URLs

None were found live on the current site (no `.html` extensions, no `/buyback/*.html` SKU pages resolved — the `/buyback/laptops/` folder itself 404s). This portion of the mission brief describes a migration scenario that doesn't apply to the current production site. No redirects needed here; flagged as not-applicable rather than silently skipped.

## 7. Manual-review queue — RESOLVED 2026-07-07 with real GSC data

Full methodology and numbers in `reports/v2-gsc-data-analysis.md`. Summary of what's now decided:

| Source | Target | Status |
|---|---|---|
| `/e-waste-recycling/` | `/recycling/` | **Live in `vercel.json`** (target page exists) |
| `/data-destruction-services-kochi/` | `/data-destruction/` | **Live in `vercel.json`** (target page exists) |
| `/scrap-price/` | `/e-waste-scrap-prices-kochi/` | Decided, **not yet in `vercel.json`** — target page not built in V2 yet; add when it is |
| `/free-e-waste-pickup-kochi/` | `/blog/free-e-waste-pickup-kochi/` | Decided, **held** — blog template not built yet |
| `/blog/sell-old-laptop-kochi-best-price/` | `/blog/sell-old-laptop-kochi/` | Decided, **held** — blog template not built yet |
| `/locations/ernakulam/` | `/locations/ernakulam-south/` | Decided, **held** — target location page not built yet |
| `/locations/kalamassery-hitech-park/` | `/locations/kalamassery/` | Decided, **held** — target location page not built yet |

Rule going forward: a redirect only gets added to `vercel.json` once its destination page actually exists in the V2 build — redirecting to a page that 404s is worse than leaving the old page in place. Each "held" row above gets added to `vercel.json` in the same commit as the page it depends on.

`/pricing/` and `/e-waste-collection-kochi/` remain genuinely undecided — zero data either way (not in the GSC Pages report at all), not a risk either way, low priority.

## 8. New discovery: ~467-URL legacy pSEO footprint (not yet actioned)

The GSC exports revealed a much larger historical footprint than the current live sitemap: 386 `/locations/{city}/{service}/` matrix pages + 124 `/blogs/{category}/{slug}/` taxonomy pages (467 unique after deduping host variants), almost all with 0-4 clicks each. Full classification in `data/gscLegacyMatrixFindings.json` and `reports/v2-gsc-data-analysis.md`. None of these warrant standalone V2 pages; the plan is to fold their redirects into each location/service hub page's build task as those get built in later phases, rather than processing all 467 in one disconnected pass.
