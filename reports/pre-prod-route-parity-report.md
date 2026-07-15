# Pre-Prod Release Integrity Gate — Route Parity Report

**Generated:** 2026-07-15 (script run 2026-07-15T12:25:39Z)
**Commit:** `9b0a376` (`feat: expand indexed ewaste clusters` — includes the routes.ts fix from this gate's Task 2)
**Script:** `scripts/pre-prod-route-parity.ts` (new, this gate)
**Data:** `data/pre-prod-route-parity.json`, `data/pre-prod-route-parity.csv`

## Counts

| Surface | Count |
|---|---|
| Built pages (dist/) | 363 |
| `routes.ts` metadata entries | 363 |
| `sitemap.xml` (+ sub-sitemaps) URLs | 369 (363 page URLs + 6 sub-sitemap index entries themselves) |
| `content-index.json` URLs | 363 |
| `ai-sitemap.xml` URLs | 363 |
| `llms.txt` URLs | 106 (curated subset by design, not meant to be exhaustive) |
| `vercel.json` redirect rules | 450 |

Metadata route count (363) matches built page count (363) exactly at the raw-count level. The real defect is in **which** 7 of those 363 don't actually line up — see below.

## Finding 1 (release blocker) — 7 buyback pages 404 at their own advertised URL

`routes.ts`, `sitemap.xml`, `content-index.json`, and `ai-sitemap.xml` all list these 7 URLs with **no trailing slash** (they contain a literal `.html` in the slug, inherited from the legacy indexed-URL data):

```
/buyback/laptops/sell-hp-elitebook-904-kochi.html
/buyback/laptops/sell-hp-elitebook-932-kochi.html
/buyback/laptops/sell-hp-elitebook-939-kochi.html
/ml/buyback/laptops/sell-asus-rog-zephyrus-g110-kochi.html
/ml/buyback/laptops/sell-hp-elitebook-879-kochi.html
/ml/buyback/laptops/sell-hp-elitebook-882-kochi.html
/ml/buyback/laptops/sell-thinkpad-t438s-kochi.html
```

`astro.config.mjs` has `trailingSlash: "always"`. Because the route segment itself contains `.html`, Astro builds these as a directory literally named `...kochi.html/` containing `index.html` — so the **actual** servable path is `...kochi.html/` (trailing slash after `.html`), not the no-slash version every discovery surface advertises.

**Verified directly** against `astro preview`:

```
GET /buyback/laptops/sell-hp-elitebook-904-kochi.html   -> 404
GET /buyback/laptops/sell-hp-elitebook-904-kochi.html/  -> 200
```

Every crawler that follows the sitemap, content-index, or ai-sitemap URL for these 7 pages hits a 404. This is the same defect class as the 84 no-trailing-slash 404s fixed in Phase 2L-RETRY, resurfaced because these 7 pages were generated after that fix and weren't covered by it.

**Not yet fixed** — this needs either (a) stripping `.html` from the slug so these pages get a normal trailing slash like every other route, or (b) a `vercel.json` rewrite/redirect from the no-slash form to the slash form for these 7 specific paths. Both are content/routing-generation decisions in `gscIndexedGeneratedPages.ts` (the buyback page builder) or `vercel.json`, not something to patch silently inside a route-metadata integrity pass — flagging for an explicit decision rather than guessing.

**Production impact if unfixed:** 7 URLs Google would index as 404s, and `sitemap.xml`/`content-index.json`/`ai-sitemap.xml` would all be lying about page availability for those 7 entries. Low blast radius (7 of 363 pages) but real.

## Finding 2 (flagged, not fixed) — `/e-waste/` vs `/ewaste/` duplicate intent

Both are live, both indexable, both core-priority pages targeting "what is e-waste":

- `/ewaste/` — committed `c635f08`, smaller (8.9 KB source), priority 0.8
- `/e-waste/` — committed `9b0a376` (this gate's dependency-chain commit), larger (27 KB source), priority 0.85

Evidence this is an in-progress migration, not two intentionally-separate pages: `vercel.json` already has 2 new redirects (`/E-waste`, `/E-waste/` → `/e-waste/`) pointing at the *new* page, but `llms.txt`'s "Core pages" list still references `/ewaste/`, not `/e-waste/`. Neither page redirects to the other yet, so both are simultaneously indexable — a genuine duplicate-content risk.

Per this gate's explicit instruction not to change content strategy, this is reported, not resolved. Needs an explicit decision: which one is canonical, and a redirect/removal of the other before production.

## Finding 3 (reviewed, not a defect) — "Lowest Price Guarantee" language on `/marketplace/` and `/price-match-policy/`

Pattern-matches the project's forbidden-claims list ("guaranteed pricing"), but on inspection it's a qualified, terms-bound retail price-match policy (same brand/model/condition/accessories, proof required, reviewed case by case) — a different risk category from the previously-banned *unconditional* claims (guaranteed pickup, guaranteed scrap price, guaranteed deletion). Not changed; noted for visibility since "guarantee" language is otherwise a hard stop-and-check trigger in this project.

## Finding 4 (informational) — `validate-seo-v2.ts` schema policy change

`HowTo`/`HowToStep` moved from the denied list to the allowed list. This is a deliberate, intentional policy update (matches the concurrent session's own safety report, which had noted HowTo was blocked "until the schema policy is intentionally updated") — not a weakening of the forbidden-claims checks. No action needed.

## Cross-surface checks that passed cleanly

- **Duplicate slugs** in `routes.ts`: 0
- **Duplicate titles** (case-insensitive) across different paths: 0
- **Redirect sources appearing in sitemap**: 0
- **Redirect sources appearing in content-index**: 0
- **Redirect sources still built as live pages**: 0
- **`missingMetadataRoutes`/`metadataRoutesWithoutPages`/`builtOnlyRoutes`/`contentIndexOnlyRoutes`/`aiSitemapOnlyRoutes`**: all limited to exactly the 7 buyback-page trailing-slash mismatches in Finding 1 — no other discrepancies of any kind across 363 pages.

## Verdict

Route metadata itself is clean (0 duplicate slugs, 0 duplicate canonicals in the strict sense, 0 redirect-source leaks). One confirmed functional defect (Finding 1, 7 pages) and one confirmed content-duplication risk (Finding 2, 2 pages) remain — both narrow in scope (9 of 363 pages total) but real. See the overall gate report for the production-readiness call.
