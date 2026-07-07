# Phase 2F — Staging Readiness Audit

Date: 2026-07-07
Status: **Complete.** Audit only — no new pages, posts, or redirects added. Build unchanged at 43 pages, 177/177 validation checks, no deploy performed.

Overall verdict: **the build is in good shape for staging.** Every structural/safety area (routes, canonicals, redirects, sitemap, robots, schema safety, blog/Malayalam setup, accessibility basics) came back clean. Two categories of soft findings were flagged (metadata length, page thinness on utility/Malayalam pages) — neither is broken, both are noted for a future polish pass rather than fixed in this audit-only phase, per the instructions.

## 1. Route inventory audit — ✅ clean

- 43 routes in `src/data/routes.ts`, 43 pages built, exact match.
- Full href-sweep: 42 unique internal link targets + homepage = all 43 pages accounted for as link destinations. **0 orphans, 0 dangling links.**
- 0 internal links to any of the 7 resolved-loser URLs.
- 0 internal links to `/blogs/`.
- 0 mentions of `/hi/` anywhere in `src/`, `public/`, or `vercel.json`.

## 2. Canonical audit — ✅ clean

- 43 canonical tags, one per page, all `https://www.ewastekochi.com/...`.
- 0 canonicals pointing to non-www or http.
- 0 canonicals pointing to any of the 7 resolved-loser URLs (explicit check per URL, including `/e-waste-recycling/`, `/scrap-price/`, `/free-e-waste-pickup-kochi/`, `/blog/sell-old-laptop-kochi-best-price/`, `/locations/ernakulam/`, `/locations/kalamassery-hitech-park/`, `/data-destruction-services-kochi/`).
- 0 canonicals pointing to `/blogs/`.
- (Canonicals can't point to "unbuilt routes" by construction — a page's canonical is always its own resolved path, generated from the same route entry that produced the page.)

## 3. Redirect audit — ✅ clean

13 rules in `vercel.json`, all traced individually:

| Source | Destination | Chain? |
|---|---|---|
| `/:path*` (host rule) | `https://www.ewastekochi.com/:path*` | N/A — host-canonicalization, not page-level |
| `/services/battery-recycling-kochi` | `/battery-recycling/` | No |
| `/services/data-destruction-kochi` | `/data-destruction/` | No |
| `/services/itad-kochi` | `/itad/` | No |
| `/locations/v2/kakkanad` | `/locations/kakkanad/` | No |
| `/e-waste-recycling` | `/recycling/` | No |
| `/services/e-waste-recycling-kochi` | `/recycling/` | No |
| `/data-destruction-services-kochi` | `/data-destruction/` | No |
| `/scrap-price` | `/e-waste-scrap-prices-kochi/` | No |
| `/free-e-waste-pickup-kochi` | `/blog/free-e-waste-pickup-kochi/` | No |
| `/blog/sell-old-laptop-kochi-best-price` | `/blog/sell-old-laptop-kochi/` | No |
| `/locations/ernakulam` | `/locations/ernakulam-south/` | No |
| `/locations/kalamassery-hitech-park` | `/locations/kalamassery/` | No |

0 chains, 0 loops. Every internal destination resolves to a route in `routes.ts` (also verified by `validate-seo-v2.ts`'s automated redirect-target-exists check, part of the 177 passing checks). No redirect source URL appears in any sub-sitemap (one apparent match during scripted checking turned out to be a substring false-positive — `/locations/ernakulam` matching inside `/locations/ernakulam-south/` — confirmed by exact-URL inspection that only the winner URL is present).

**No critical broken redirect was found requiring a new rule this phase.**

## 4. Sitemap audit — ✅ clean

- `/sitemap.xml` is a valid `<sitemapindex>` referencing exactly 6 sub-sitemaps (core, services, locations, legal, ml, blog) — all present, all `https://www.`.
- Sub-sitemap URL counts: core 7, services 16, locations 4, legal 2, ml 7, blog 7 = **43 total, exactly matching the route registry.**
- 0 redirected/loser URLs in any sitemap.
- 0 unbuilt URLs (can't occur by construction — sitemaps are generated from the same `ROUTES` array as the pages themselves).
- 0 `/blogs/` entries.
- `/hi/` correctly absent (not built).
- robots.txt does not reference the broken live-site `sitemap-index.xml` — confirmed absent.

## 5. Robots audit — ✅ clean

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /search/
Disallow: /preview/
Disallow: /thank-you/
Disallow: /internal/
Sitemap: https://www.ewastekochi.com/sitemap.xml
Sitemap: https://www.ewastekochi.com/ai-sitemap.xml
```

Only utility paths disallowed (none of which exist as real pages yet — they're precautionary). `/ml/` is not blocked. No stale sitemap-index.xml reference. Both referenced sitemaps are real, working endpoints (confirmed live in earlier phases and again this phase).

## 6. Schema safety audit — ✅ clean

Explicit greps across all built HTML and source, all zero matches:
- 0 `AggregateRating` blocks.
- 0 `Review` schema blocks.
- 0 `GeoCoordinates` (none invented, matching the original mission rule against fabricated coordinates).
- 0 fabricated certificate/registration/authorization number patterns (the same regex guard already enforced by `validate-seo-v2.ts` on the 3 trust pages, re-run here across the entire site for extra coverage).

## 7. Metadata audit — soft findings, not fixed this phase

- **0 real duplicate titles, 0 real duplicate descriptions** across all 43 pages (re-confirmed independently of the validation script, which also already checks this).
- **17 of 43 titles exceed 60 characters** (range: 61–76 chars). Most are only modestly over (61–68 chars); two are Malayalam titles where a strict Latin-character cutoff is less meaningful anyway (Malayalam script renders at different pixel widths per character than Latin). Not fixed this phase — flagged for a future title-tightening pass, prioritizing the worst offenders (`/blog/what-is-ewaste/` at 74 chars, `/data-destruction/` at 68 chars).
- **6 of 43 descriptions exceed 160 characters** (range: 161–173 chars) — `/computer-scrap-buyers-kochi/`, `/`, `/server-recycling-kochi/`, `/e-waste-scrap-prices-kochi/`, `/blog/e-waste-collection-near-me/`, `/blog/sell-old-laptop-kochi/`. All are only slightly over; Google typically truncates rather than penalizes, so this is cosmetic, not broken.
- OG URLs confirmed to match canonical on every page (enforced by `validate-seo-v2.ts`).
- 0 blog post titles collide with any service page title.

## 8. Content quality audit — flagged, not rewritten (per instruction)

- **0 cross-page duplicate FAQ answers** across all 179 FAQ items site-wide (checked by comparing every FAQPage JSON-LD answer text against every other page's — not just the same-page duplicate check already in `validate-seo-v2.ts`).
- **Thinnest pages by word count**: `/ml/contact/` (68 words), `/contact/` (126 words), then a cluster of `/ml/*` pages (144–213 words), `/about/` (210 words), `/privacy/` (221 words). Utility pages (contact, privacy) being short is normal and not a problem — they're navigational/NAP pages, not content pages. The `/ml/*` cluster being thin is already tracked as a known item (Phase 1.5 report: Malayalam content needs native-speaker review before being considered production-ready) — this audit doesn't change that assessment, just re-confirms it with real word counts.
- **0 unsupported superlative/guarantee claims found.** A broad regex sweep for "guaranteed," "100% safe/secure," "best price in," "#1," "award-winning," "industry leader" returned only false positives (CSS hex color codes matching `#1`, and one instance of "is **not** guaranteed" on `/terms/` — an appropriate disclaimer, not an overclaim).
- No donation-pathway or battery-deposit-scheme claims beyond the exact safe wording specified in Phase 2D — re-verified present and unchanged.

## 9. Malayalam audit — ✅ clean

All 7 `/ml/*` pages checked individually:
- `<html lang="ml">` present on all 7.
- Self-canonical to the `/ml/...` path on all 7.
- Exactly 3 hreflang alternates (en-IN, ml-IN, x-default) present on all 7, each resolving to the correct paired URL.
- None blocked in robots.txt.
- **Repeating the standing flag**: this Malayalam copy is AI-written and has not had a native-speaker review pass — noted in every phase since 1.5, still true, still the right thing to resolve before treating these pages as production-final.

## 10. Blog audit — ✅ clean

- No `/blog/` index page exists — correct, none was required by any phase's instructions yet.
- `/blog/` is not redirected to any subdomain (explicit `vercel.json` check + validation-script guard, both confirm).
- `/blogs/` does not exist anywhere in the route registry.
- All 7 blog slugs checked against all top-level and nested slugs — 0 collisions.
- Every blog post links to at least one relevant service page (built into each post from Phase 2B/2E).

## 11. Performance/accessibility smoke audit

- **H1 count**: exactly 1 per page across all 43 pages — 0 exceptions.
- **Images**: 0 `<img>` tags exist anywhere on the site currently (no photography/graphics have been added yet). This means there's currently nothing to have missing alt text — but it's worth noting as a forward-looking item: whenever real images are added (a future design phase), alt text needs to be part of that work from the start, not retrofitted.
- **Viewport meta**: present on all 43 pages (set once in the shared `Layout.astro`, inherited everywhere).
- **Build size**: 980 KB total output for all 43 pages — very lean, consistent with the "minimal JavaScript, mostly static HTML" approach from Phase 1.
- Button/link accessible labels: all CTAs and nav links use real text content (no icon-only buttons without labels exist in the current component set).

## Summary table

| Area | Result |
|---|---|
| 1. Routes | ✅ Clean |
| 2. Canonicals | ✅ Clean |
| 3. Redirects | ✅ Clean |
| 4. Sitemap | ✅ Clean |
| 5. Robots | ✅ Clean |
| 6. Schema safety | ✅ Clean |
| 7. Metadata | ⚠️ Soft findings (17 long titles, 6 long descriptions) — flagged, not fixed |
| 8. Content quality | ⚠️ Soft findings (Malayalam/utility page thinness, already tracked) — flagged, not fixed |
| 9. Malayalam | ✅ Clean (native-speaker review still pending, as before) |
| 10. Blog | ✅ Clean |
| 11. Accessibility/performance | ✅ Clean (no images yet, so nothing to check there specifically) |

## Validation

```
npx astro build   → 43 pages (unchanged)
npm run validate  → 177 checks passed, 0 failures (unchanged)
```

No route count change, no sitemap count change, no content-index count change, as required. See `docs/deployment/staging-deployment-checklist.md` and `docs/deployment/post-deploy-crawl-checklist.md` for what comes next.
