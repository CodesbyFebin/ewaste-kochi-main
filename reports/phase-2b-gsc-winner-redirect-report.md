# Phase 2B — Build GSC Winners + Redirect Losers

Date: 2026-07-07
Status: **Complete.** Build green, validation green (162/162 checks), no deploy performed.

## Winner pages — status

| Winner | Status | Notes |
|---|---|---|
| `/recycling/` | Already built (Phase 1) | No change needed |
| `/data-destruction/` | Already built (Phase 1) | No change needed |
| `/e-waste-scrap-prices-kochi/` | Already built (Phase 2A) | **Audited, not rebuilt** — already satisfied every Phase 2B requirement (quote factors, condition factors, disclaimer, exact links requested) |
| `/blog/free-e-waste-pickup-kochi/` | **Built this phase** | New — first `/blog/` post in the V2 build |
| `/blog/sell-old-laptop-kochi/` | **Built this phase** | New — second `/blog/` post |
| `/locations/ernakulam-south/` | **Built this phase** | New |
| `/locations/kalamassery/` | **Built this phase** | New, includes HMT industrial area and educational institutions as real geographic context (not a fabricated claim — Kalamassery's industrial belt and CUSAT-area institutions are well-known facts about the neighborhood, not something the business is claiming about itself) |

## New blog architecture note

This is the first time `/blog/` posts exist in the V2 build. There is still no `/blog/` index page (out of scope for this phase — the phase brief didn't ask for one, and the `/blog/` index redirect question is separately held per your standing decision). Both posts use `BlogPosting` schema with `author: Organization` (no individual named author, since no real byline was provided — avoids inventing a person). Added a new `sitemapGroup: "blog"` to the route registry and a new `sitemaps/blog.xml` sub-sitemap, registered in the sitemap index.

**Orphan check caught both new posts on the first pass** — same class of mistake as the Phase 1.5 `/services/` defect. Fixed by linking `/blog/free-e-waste-pickup-kochi/` from `/pickup/` and `/blog/sell-old-laptop-kochi/` from `/sell-electronics/`. Also caught both new location pages unlinked from the Locations hub — fixed by adding both to the hub's linked grid (and removing "Kalamassery" from the hub's plain-text unlinked list, since it now has a real page).

## Redirects — all 7 now live

| Source | Destination | Status |
|---|---|---|
| `/e-waste-recycling/` | `/recycling/` | Live since Phase 1.5/2A |
| `/services/e-waste-recycling-kochi/` | `/recycling/` | Live since Phase 1.5/2A |
| `/data-destruction-services-kochi/` | `/data-destruction/` | Live since Phase 1.5/2A |
| `/scrap-price/` | `/e-waste-scrap-prices-kochi/` | Live since Phase 2A |
| `/free-e-waste-pickup-kochi/` | `/blog/free-e-waste-pickup-kochi/` | **New this phase** |
| `/blog/sell-old-laptop-kochi-best-price/` | `/blog/sell-old-laptop-kochi/` | **New this phase** |
| `/locations/ernakulam/` | `/locations/ernakulam-south/` | **New this phase** |
| `/locations/kalamassery-hitech-park/` | `/locations/kalamassery/` | **New this phase** |

All added only after confirming the destination page exists in the V2 build — none of them redirect to a 404. Verified with a source grep: zero internal links anywhere in the codebase point to any of the 7 loser paths.

## Legacy matrix — strategy documented, not processed

Created `docs/roadmap/legacy-matrix-redirect-strategy.md` per the phase brief. Key points:
- The 467-URL legacy footprint (`data/gscLegacyMatrixFindings.json`) is **not** touched this phase.
- The rule going forward: matrix-page redirects get folded into the commit that builds each location page, blogs-taxonomy mappings get evaluated as each new `/blog/` post ships — never a bulk pass.
- **Honest gap logged**: the Kakkanad, Ernakulam South, and Kalamassery location pages were built before this roadmap doc existed, so their corresponding matrix-page redirects (e.g. `/locations/kakkanad/e-waste-recycling-kochi/` → `/locations/kakkanad/`) were not added in the same commit as the rule now requires. Flagged as retroactive cleanup work in `PROJECT_TRACKER.md`, not silently skipped.

## Three open questions — logged, not actioned

Exactly as decided: `/hi/` Hindi pages, `blog.ewastekochi.com` subdomain, and the `/blogs/` taxonomy are all recorded as `manual-review` in `PROJECT_TRACKER.md`. Nothing built, redirected, noindexed, or blocked for any of them this phase.

## Validation script extensions

New checks added to `scripts/validate-seo-v2.ts`:
- **Loser-link guard**: every page's outbound links are checked against the 7 resolved-loser paths; fails if any internal link still points to a loser.
- **GSC winner presence**: all 7 winner paths must exist in the route registry.
- **No loser URLs in any sub-sitemap**: cross-checked against the raw sitemap XML content, not just route-registry construction (a second, independent layer of protection).
- **`vercel.json` redirect integrity**: every redirect destination must resolve to an actual built route (no redirecting to a 404); no redirect destination may itself be the source of another redirect (no 2-hop chains).
- **`/blog/` index not redirected**: explicit check that no `vercel.json` rule redirects `/blog/` itself.
- **`/blogs/` taxonomy not built**: fails if any route path ever starts with `/blogs/`.
- **`/hi/` not silently modified**: fails if `robots.txt` ever gains a rule mentioning `/hi/` without a corresponding tracked decision.

## Validation results

```
npx astro check   → 0 errors, 0 warnings, 0 hints (63 files)
npx astro build   → 38 pages built
npm run validate  → 162 checks passed, 0 failures
```

Manual checks: full href-sweep against dist output (37 unique link targets + homepage = all 38 pages accounted for, zero dangling links, zero orphans after the two fixes above); live `astro preview` crawl of all 4 new pages plus `/sitemaps/blog.xml` and the sitemap index → all 200; sitemap index confirmed to include the new `blog` group.

## Not done in this phase (explicitly out of scope)

- No `/blog/` index page.
- No processing of the 467-URL legacy matrix/blogs footprint beyond the strategy doc.
- No action on `/hi/`, `blog.ewastekochi.com`, or `/blogs/`.
- No deployment.
