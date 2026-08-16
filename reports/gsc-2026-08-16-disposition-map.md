# GSC 2026-08-16 URL Disposition Map — Coverage Drilldown Synthesis
**Status:** INVESTIGATION-ONLY. No URL, redirect, sitemap or code change proposed.
This report is an artifact under `.vercelignore` — never published.

## Missing evidence (still blocks P0 remediation)
- Server error (5xx) drilldown — 3 URLs — NOT UPLOADED
- Soft 404 drilldown — 1 URL — NOT UPLOADED
- Duplicate, Google chose different canonical drilldown — 1 URL — NOT UPLOADED

## 227 Crawled - currently not indexed — disposition tally

| Disposition | Count | Meaning |
|---|---:|---|
| **301** | 179 | Bare-host duplicate — resolves automatically when bare-domain 307 (already live) is re-crawled by Google |
| **INVESTIGATE** | 48 | Needs per-URL manual review — cannot classify deterministically from Coverage export alone |

### 179 bare-host observations — the dominant class
These are the single largest reason for the 227 count. All are already covered by the live bare→www 307 redirect that landed via a Vercel dashboard fix. Google needs to re-crawl each one to observe the redirect and consolidate it against the www canonical. No per-URL action needed.

Expected trajectory: 179 bare-host URLs → 0 over the next 2-6 weeks as Google re-crawls.

### 48 INVESTIGATE URLs — grouped by family

| Family | Count |
|---|---:|
| `blog/*` | 36 |
| `locations/thrissur/corporate-ewaste-kochi` | 2 |
| `locations/palakkad/secure-laptop-disposal` | 1 |
| `locations/thrikkakara/dpdp-act-compliance-kochi` | 1 |
| `locations/palarivattom/hard-drive-shredding-kochi` | 1 |
| ... | (see appendix for full list) |

## 295 Alternate page with proper canonical — disposition tally

| Disposition | Count | Meaning |
|---|---:|---|
| **HEALTHY-ALTERNATE** | 254 | Google correctly recognises the URL as an alternate of a canonical page — expected structural behaviour, no action |
| **INVESTIGATE** | 25 | Needs per-URL manual review |
| **MIGRATION-BLOCKED** | 12 | blog.ewastekochi.com URL — handled by Phase 2 subdomain consolidation, not this pass |
| **SCHEMA-BUG** | 2 | SearchAction JSON-LD placeholder leaking — real code fix needed (see below) |
| **HOST-NORMALISATION** | 2 | Bare-host alt — handled by bare→www 307 (live) |
| **SLASH-VARIANT** | 1 | Trailing-slash variant — verify canonical policy consistency |

### SCHEMA-BUG detail — SearchAction JSON-LD placeholder leaking as crawlable URLs

Three URLs discovered by Google as crawlable, but they are literal JSON-LD placeholder syntax:

- `https://www.ewastekochi.com/faq/?q=%7Bsearch_term_string%7D`
- `https://www.ewastekochi.com/?q=%7Bsearch_term_string%7D`
- `https://blog.ewastekochi.com/?q=%7Bsearch_term_string%7D`

**RESOLVED via source-tree grep 2026-08-16.** Zero occurrences of
`search_term_string` / `SearchAction` / `potentialAction` in current
`src/` or in live HTML on either www or blog subdomains. The 3 URLs
are stale historical artifacts from the pre-V2 cutover — the old site
emitted a literal `?q={search_term_string}` placeholder in its
SearchAction JSON-LD, Google discovered the URLs during that period,
and now keeps trying to recrawl them. Confirmed via `data/old-site-
gsc-alert-url-action-map.csv` (marked `fixed_by_v2_cutover`).

**No source change needed.** These URLs will drop from GSC over time
as Google gives up on them. Optional acceleration: submit each for
URL Removal in GSC.

Original hypothesis (kept for record): a `SearchAction` `potentialAction` node somewhere on the site emits `urlTemplate: '.../?q={search_term_string}'` literally instead of a real search endpoint URL, and Google is trying to fetch the placeholder. Confirmed appearance across www + blog subdomain, suggesting the schema block is shared / duplicated. Requires:

1. Grep for `search_term_string` in source — find the emitting schema block
2. Confirm whether the site has any real search endpoint
3. Either fix the URL template (if search exists) or remove the SearchAction (if it doesn't)

Held per code freeze — flagged for Phase 4 remediation.

## 31 Blocked by robots.txt — verified

Expected — sitemap paths, feed, api/admin/internal routes blocked in robots.txt. Not a problem. Full list preserved in the drilldown export for reference.

## Slash-variant duplicate base-paths in the 227 (4 base paths, 8 URLs)

- `https://ewastekochi.com/locations/thrissur/corporate-ewaste-kochi` — appears with AND without trailing slash
- `https://ewastekochi.com/services/data-destruction-kochi` — appears with AND without trailing slash
- `https://ewastekochi.com/services/hard-drive-shredding-kochi` — appears with AND without trailing slash
- `https://www.ewastekochi.com/locations/thrissur/corporate-ewaste-kochi` — appears with AND without trailing slash

Host + slash normalisation would eliminate these observations at source. Held per code freeze — Astro's `trailingSlash: 'always'` config already tries to enforce; investigate why the bare-host variants still emit both forms.

## Recommended next evidence request

To close Phase 4 P0, upload the 3 remaining GSC Coverage drilldowns:

| GSC bucket | URL count expected | Priority |
|---|---:|---|
| Server error (5xx) | 3 | 🔴 Highest — investigate root cause immediately |
| Soft 404 | 1 | 🔴 Fix or 410 the specific URL |
| Duplicate, Google chose different canonical | 1 | 🔴 The specific URL where our canonical is being ignored |

All three are click-through-and-export from the GSC Coverage report — same flow used for the 4 uploaded here.
