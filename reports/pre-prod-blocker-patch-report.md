# Pre-Prod Blocker Patch Report

**Date:** 2026-07-15
**Scope:** Fix the 2 release blockers found by the Release Integrity Gate. URL hygiene only — no new content, no strategy changes.

## Finding 1 — 7 buyback `.html` URLs

### Root cause (not just a routing quirk)

Before deciding how to fix these, checked the source data (`data/gsc-indexed-url-upgrade-map.json`) the pages were generated from. All 7 rows already carry an explicit decision:

```
upgrade_action: "leave_404"
build_required: false
redirect_required: false
reason: "Legacy per-SKU buyback URL has no traffic signal; do not rebuild model-specific quote spam."
target_url: "https://www.ewastekochi.com/sell-electronics/"
```

`src/data/gscIndexedGeneratedPages.ts`'s `buildPage()` filter excludes rows with `upgrade_action === "redirect_301"` but never checked for `"leave_404"` — so these 7 rows fell through and got built anyway via the buyback page generator, directly contradicting the source data's own classification. That's the actual bug: not a trailing-slash config issue, a filter gap that overrode an explicit "do not build" decision.

### Fix applied

**Scoped, not global.** 207 rows across the whole dataset carry `upgrade_action: "leave_404"` — the vast majority are `location-service-matrix` and `blog` rows that are *intentionally* still built (that's how ~140 of the currently-live location×service pages exist). Adding a blanket `leave_404` exclusion to the shared filter would have silently deleted ~200 unrelated, already-live, already-validated pages — directly violating "do not touch unrelated routes." Caught this before running the build and reverted the first (broad) version of the fix.

The actual fix only touches the two buyback-specific branches:

```ts
if (row.path.startsWith("/buyback/laptops/")) {
  return row.upgrade_action === "leave_404" ? undefined : buybackPage(row);
}
if (row.path.startsWith("/ml/buyback/laptops/")) {
  return row.upgrade_action === "leave_404" ? undefined : buybackPage(row, true);
}
```

Verified impact was exactly 7 pages removed, nothing else: build went from 363 → 356 pages (before the second fix below), and a full page-count/route diff confirmed no other route was affected.

### Redirects (Option A + Option B, per your decision)

All 7 URLs removed from `sitemap.xml`, `content-index.json`, `ai-sitemap.xml` (Option A — confirmed via rebuild, 0 occurrences of any of the 7 paths in any discovery file). Since GSC's last crawl shows `indexed_status: "indexed"` (6 of 7) or `"redirect"` (1 of 7) — i.e. Google already knows these URLs — added 301 redirects for both slash variants of all 7 to `/sell-electronics/` (Option B), matching the source data's own `target_url`. 14 new rules in `vercel.json`.

Full per-URL detail: `data/pre-prod-buyback-html-url-fix.csv` / `.json`.

| URL | GSC clicks/impressions | Decision |
|---|---|---|
| `/buyback/laptops/sell-hp-elitebook-904-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |
| `/buyback/laptops/sell-hp-elitebook-932-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |
| `/buyback/laptops/sell-hp-elitebook-939-kochi.html` | 0 / 12 | Remove from discovery + redirect → `/sell-electronics/` |
| `/ml/buyback/laptops/sell-asus-rog-zephyrus-g110-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |
| `/ml/buyback/laptops/sell-hp-elitebook-879-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |
| `/ml/buyback/laptops/sell-hp-elitebook-882-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |
| `/ml/buyback/laptops/sell-thinkpad-t438s-kochi.html` | 0 / 0 | Remove from discovery + redirect → `/sell-electronics/` |

## Finding 2 — `/e-waste/` vs `/ewaste/`

Canonical winner confirmed as `/e-waste/`, per your decision.

- Removed the `/ewaste/` entry from `routes.ts` — this alone drops it from the sitemap, content-index, and ai-sitemap on the next build (all three are generated from `routes.ts`, not hand-edited).
- Deleted `src/pages/ewaste/index.astro`.
- Updated `Footer.astro`'s nav link from `/ewaste/` to `/e-waste/` (the only internal link to `/ewaste/` in the codebase).
- Updated `public/llms.txt`'s core-pages list (static file, not auto-generated) from `/ewaste/` to `/e-waste/`.
- Added `/ewaste` and `/ewaste/` → `/e-waste/` (301) to `vercel.json`.
- `/e-waste/` already self-canonicalizes to `https://www.ewastekochi.com/e-waste/` — no change needed there.

Verified: `/e-waste/` present in every discovery surface, `/ewaste/` absent from all of them and from `dist/` entirely. The other "ewaste"-containing URLs (`/blog/what-is-ewaste/`, `/blog/corporate-ewaste/`, `/blog/environmental-impact-ewaste/`, etc.) are unrelated blog posts and were correctly left untouched.

## Discovery file audit (Task 3)

Re-ran the parity script from the previous gate. Both `missingMetadataRoutes` and `metadataRoutesWithoutPages` — which previously listed exactly the 7 buyback mismatches — are now **empty**. Full result:

| Surface | Count |
|---|---|
| Built pages | 355 (was 363; −7 buyback, −1 `/ewaste/`) |
| `routes.ts` metadata | 355 |
| Sitemap URLs | 361 |
| `missingMetadataRoutes` | 0 (was 7) |
| `metadataRoutesWithoutPages` | 0 (was 7) |
| Duplicate slugs | 0 |
| Duplicate titles | 0 (the `/e-waste/`+`/ewaste/` pair is gone) |
| Redirect-source leaks (sitemap/content-index/still-built) | 0 / 0 / 0 |
| Staging/localhost URL leakage in any discovery file | 0 |

## Redirect validation (Task 4)

Structural checks on the full 466-rule `vercel.json`: 0 self-loops, 0 chained redirects (no destination is itself another rule's source). All 16 new rules point to real, built, 200-able pages (`/sell-electronics/`, `/e-waste/`).

Live-URL verification on the actual staging deployment wasn't directly possible — Vercel's SSO deployment protection intercepts the request before the redirect rule fires (confirmed: both `/ewaste/` and a buyback URL returned a 302 to `vercel.com/sso-api`, same protection wall encountered throughout this project on every staging deploy). As a substitute, tested the *exact same redirect shape* already live on unprotected production — `/buyback/laptops/sell-thinkpad-t458p-kochi` (an existing rule, same source pattern, same `/sell-electronics/` destination) returns `308 → /sell-electronics/ → 200`. This confirms the redirect mechanism itself works correctly on this Vercel project for this exact rule shape; the 16 new rules use an identical format.

## Rebuild + validation (Task 5)

- `npm run check`: 0 errors, 0 warnings, 0 hints (174 files)
- `npm run build`: 355 pages, clean
- `validate-seo-v2.ts`: 355 routes, **1,578 checks passed, 0 failures**
- Orphan check: PASS, 0 orphans among 22 indexable articles
- Duplicate-content check: PASS, 24 indexable posts
- Rendered forbidden-claims sweep (all 355 pages): 2 hits, both previously-confirmed safe disclaimer text ("not guaranteed pickup"), 0 real violations
- Rendered broken-link sweep (all 355 pages): 0 broken links

## Staging result (Task 6)

Redeployed `ewastekochi-v2-staging` from the patched state: `dpl_AcmLiUQ4whLWDX7XnaKTvixvhmFu`, `readyState: READY` (used `--archive=tgz` again for the same free-tier upload-limit reason as before).

| Check | Result |
|---|---|
| `/e-waste/` built and correct | ✅ |
| `/ewaste/` absent from build | ✅ |
| Chatbot trigger present | ✅ (6 instances on homepage) |
| Canonical clean, no staging-URL leakage | ✅ |
| `sitemap.xml`, `content-index.json`, `ai-sitemap.xml`, `llms.txt` all present and clean | ✅ |
| Buyback URLs no longer create sitemap 404s | ✅ (removed from all 3 discovery surfaces) |

## PROD-PATCH-361: **approved**

Both release blockers from the integrity gate are fixed, verified structurally and via rebuild, and redeployed to staging. No new content was added, no unrelated routes were touched (verified: exactly 8 pages removed — 7 buyback + `/ewaste/` — nothing else changed in the route count or content). Ready for `PROD-PATCH-361` — deploy this clean 355-page build to production.
