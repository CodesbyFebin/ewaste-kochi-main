# Indexation Hygiene Audit — 2026-08-15

## Scope

This audit separates current repository fixes from historical Google Search Console exclusion labels. It does not treat `Crawled - currently not indexed` or `Discovered - currently not indexed` as automatic code defects.

## Current branch baseline

- Recovery branch: `agent/social-schema-gtm`
- Restored location sitemap surface: 184 URLs
- Protected generated sitemap baseline: 885 canonical URLs
- Bare-domain host normalization: present (`ewastekochi.com` -> `www.ewastekochi.com`)
- Legacy redirect inventory: present in `vercel.json`
- Evidence-backed high-value legacy recovery map: 39 URLs in `data/gsc-404-recovery-map.json`
- Redirect-target validation: covered by the repository validation/build gates
- Canonical/noindex/sitemap collision validation: covered by `scripts/verify-dist.mjs`

## Already resolved in code

### 1. Bare domain canonical normalization

`vercel.json` contains a permanent host-scoped redirect from every `ewastekochi.com/:path*` request to `https://www.ewastekochi.com/:path*`.

This addresses a large class of historical GSC rows where the bare-host URL was labeled `Page with redirect`, `Alternate page with proper canonical tag`, or `Duplicate, Google chose different canonical than user`.

### 2. Canonical rendering is centralized

`src/components/SeoHead.astro` builds canonical URLs from the fixed production `SITE_URL` plus the explicit page path. It already supports a manual `noindex` flag, so no automatic word-count-based noindex logic was added.

A hidden post-build SEO normalizer in `astro.config.mjs` previously rewrote titles, descriptions, H1s and H2s after Astro had rendered the page. That could make deployed HTML disagree with page metadata and `SeoHead.astro`. The mutator has been removed.

The final metadata path is now:

`page metadata -> src/data/seoOverrides.ts (intentional only) -> SeoHead.astro -> built HTML`

No post-build title/H1 mutation remains.

### 3. High-value legacy path redirects

Exact permanent redirects are already present for legacy paths including, among others:

- `/sell-electronics-kochi/` -> `/sell-electronics/`
- `/scrap-price/` -> `/e-waste-scrap-prices-kochi/`
- `/services/itad-kochi/` -> `/itad/`
- `/services/battery-recycling-kochi/` -> `/battery-recycling/`
- `/services/data-destruction-kochi/` -> `/data-destruction/`
- `/e-waste-recycling/` -> `/recycling/`
- `/laptop-recycling-near-me/` -> `/services/electronics-recycling-near-me/`
- selected historical `/blogs/*` and `.html` paths -> current canonical equivalents

`data/gsc-404-recovery-map.json` contains the 39 sampled high-value historical 404s with their traffic evidence. `scripts/verify-dist.mjs` now fails if any of those 39 source paths disappears from the static Vercel redirect inventory.

Redirect sources should not be requested for indexing. Only the final canonical target should be submitted or internally linked.

### 4. Sitemap safety

The current recovery branch restores the 184-location discovery surface and protects it with a regression guard. Canonical sitemap URLs are generated from the approved route registry rather than legacy redirect sources.

The project has an explicit canonical sitemap index at `src/pages/sitemap.xml.ts` plus grouped sitemap endpoints under `src/pages/sitemaps/`. The parallel `@astrojs/sitemap` integration was removed so the build no longer creates a second sitemap index with a different URL surface.

The intended sitemap entry point is:

`https://www.ewastekochi.com/sitemap.xml`

### 5. Sitemap/canonical/noindex regression checks

`scripts/verify-dist.mjs` now validates every URL in the generated grouped sitemaps and fails on:

- non-`www.ewastekochi.com` sitemap hosts
- query strings or fragments in sitemap URLs
- duplicate sitemap URLs
- sitemap URLs that are also static redirect sources
- sitemap URLs with no generated HTML page
- missing canonical tags
- canonicals that do not self-reference the sitemap URL
- canonical query strings/fragments
- `noindex` pages included in the sitemap
- disappearance of any of the 39 evidence-backed high-value legacy redirect sources
- total/group sitemap contractions beyond the approved regression thresholds

### 6. Malayalam language signal

`Layout.astro` now emits `lang="ml-IN"` for Malayalam pages instead of reducing the document language to `ml`. English remains `en-IN`.

### 7. Priority canonical pages

The repository's prior GSC readiness checks verified representative priority URLs as HTTP 200, self-canonical and indexable. Those checks include core service pages and major location pages.

## Historical GSC patterns that should not be mistaken for live defects

The historical performance/coverage workbook contains many examples where an old bare-host or legacy-path URL carries multiple labels such as:

- `Page with redirect`
- `Alternate page with proper canonical tag`
- `Crawled - currently not indexed`
- `Duplicate, Google chose different canonical than user`

Examples include old forms of `/recycling/`, `/contact/`, `/services/itad-kochi/`, `/services/server-recycling-kochi/`, and legacy `/blogs/*` paths.

These rows must first be normalized to the final current canonical URL before deciding that a page has an indexability problem.

## Current high-priority hygiene rules

1. **Canonical 200 page**
   - Keep in sitemap only if indexable and intentionally canonical.
   - Internal links should point directly to this URL.

2. **Redirect source**
   - Keep out of sitemap.
   - Keep out of canonical/internal-link inventories.
   - Do not request indexing.
   - Ensure one-hop permanent redirect to the closest semantic canonical.

3. **Historical 404 with meaningful demand**
   - Redirect only when a strong semantic equivalent exists.
   - Rebuild only when the intent remains distinct and valuable.
   - Never redirect unrelated URLs to the homepage.

4. **Historical 404 with no demand and no equivalent**
   - Leave retired (404/410 review).
   - Do not restore merely to reduce GSC exclusion counts.

5. **Crawled/discovered but not indexed canonical page**
   - Do not rewrite automatically.
   - Verify HTTP status, canonical, robots/noindex, sitemap membership, internal links and content uniqueness first.
   - If all pass, treat as an indexing/quality-selection issue rather than a technical error.

6. **Noindex policy**
   - Use explicit/manual `noindex` only for pages that are intentionally non-search surfaces.
   - Do not auto-noindex pages solely because a word-count threshold is low.
   - A short but useful service/location/tool page can still deserve indexing.

## Evidence still required for the 227 / 223 buckets

The aggregate counts alone are insufficient to make URL-level fixes. Before merging additional URL-specific indexation changes, obtain the current GSC exports containing the exact URL rows for:

- `Crawled - currently not indexed` (reported: 227)
- `Discovered - currently not indexed` (reported: 223)
- `Server error (5xx)` examples
- `Soft 404` examples
- `Duplicate, Google chose different canonical than user` examples
- any current `Redirect error` examples

For each exported URL, normalize:

1. scheme (`https`)
2. host (`www.ewastekochi.com`)
3. trailing slash
4. redirect destination
5. final canonical

Then classify into:

- `FIX_TECHNICAL`
- `KEEP_CANONICAL_REQUEST_RECRAWL`
- `REDIRECT_TO_EXISTING`
- `REBUILD_DISTINCT_INTENT`
- `RETIRE`
- `MANUAL_REVIEW`

## Post-deployment GSC queue

After PR #12 is merged and production is verified:

1. submit/refresh `https://www.ewastekochi.com/sitemap.xml`
2. remove or ignore any obsolete sitemap-index entries left in GSC
3. use URL Inspection only on final canonical URLs
4. prioritize restored/high-impression locations and core services
5. do not request indexing for redirect sources, retired URLs, noindex URLs or stale subdomain URLs
6. monitor Page Indexing for 7–14 days before another large content expansion

## Merge recommendation

The declining blog refreshes, restored location surface, canonical cleanup, sitemap cleanup and current recovery work are safe to merge once the latest Quality Gate is green. Do not add speculative redirect/canonical changes solely from the 227/223 aggregate counts; apply the next URL-level hygiene patch only after the exact current GSC URL exports are available.
