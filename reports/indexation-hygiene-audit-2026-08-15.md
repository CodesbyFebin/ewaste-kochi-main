# Indexation Hygiene Audit — 2026-08-15

## Scope

This audit separates current repository fixes from historical Google Search Console exclusion labels. It does not treat `Crawled - currently not indexed` or `Discovered - currently not indexed` as automatic code defects.

## Current branch baseline

- Recovery branch: `agent/social-schema-gtm`
- Restored location sitemap surface: 184 URLs
- Protected generated sitemap baseline: 885 canonical URLs
- Bare-domain host normalization: present (`ewastekochi.com` -> `www.ewastekochi.com`)
- Legacy redirect inventory: present in `vercel.json`
- Redirect-target validation: covered by the repository validation/build gates

## Already resolved in code

### 1. Bare domain canonical normalization

`vercel.json` contains a permanent host-scoped redirect from every `ewastekochi.com/:path*` request to `https://www.ewastekochi.com/:path*`.

This addresses a large class of historical GSC rows where the bare-host URL was labeled `Page with redirect`, `Alternate page with proper canonical tag`, or `Duplicate, Google chose different canonical than user`.

### 2. High-value legacy path redirects

Exact permanent redirects are already present for legacy paths including, among others:

- `/scrap-price/` -> `/e-waste-scrap-prices-kochi/`
- `/services/itad-kochi/` -> `/itad/`
- `/services/battery-recycling-kochi/` -> `/battery-recycling/`
- `/services/data-destruction-kochi/` -> `/data-destruction/`
- `/e-waste-recycling/` -> `/recycling/`
- `/laptop-recycling-near-me/` -> `/services/electronics-recycling-near-me/`
- selected historical `/blogs/*` and `.html` paths -> current canonical equivalents

Redirect sources should not be requested for indexing. Only the final canonical target should be submitted or internally linked.

### 3. Sitemap safety

The current recovery branch restores the 184-location discovery surface and protects it with a regression guard. Canonical sitemap URLs are generated from the approved route registry rather than legacy redirect sources.

### 4. Priority canonical pages

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

## Evidence still required for the 227 / 223 buckets

The aggregate counts alone are insufficient to make URL-level fixes. Before merging additional indexation changes, obtain the current GSC exports containing the exact URL rows for:

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
2. use URL Inspection only on final canonical URLs
3. prioritize restored/high-impression locations and core services
4. do not request indexing for redirect sources, retired URLs, noindex URLs or stale subdomain URLs
5. monitor Page Indexing for 7–14 days before another large content expansion

## Merge recommendation

The two declining blog refreshes and current recovery work are safe to merge once the latest Quality Gate is green. Do not add speculative redirect/canonical changes solely from the 227/223 aggregate counts; apply the next hygiene patch only after the exact current GSC URL exports are available.
