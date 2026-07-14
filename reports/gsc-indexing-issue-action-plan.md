# GSC-P1 — Index Coverage Triage + URL Protection Map: Issue-by-Issue Action Plan

Date: 2026-07-15
Source data: `ewastekochi.com-Performance-on-Search-2026-07-06.zip`, `ewastekochi.com-Coverage-2026-07-06.zip`, and all 7 `ewastekochi.com-Coverage-Drilldown-2026-07-06*.zip` files — all already present in the project root from an earlier phase (first partially analyzed 2026-07-07, see `reports/v2-gsc-data-analysis.md`). No new export was uploaded for this request; this phase re-processes the same source files at full per-URL granularity instead of the earlier top-line summary.

## A note on the numbers before anything else

The instruction driving this phase quoted a coverage summary (414 indexed / 1,934 404 / 704 redirect / 332 alternate-canonical / 31 robots-blocked / 8 noindex / 2 5xx / 1 soft-404 / 226 crawled-not-indexed / 35 discovered-not-indexed). The actual `Critical issues.csv` in the 2026-07-06 export on disk reads:

| Reason | Quoted | Actual (2026-07-06 export) |
| --- | --- | --- |
| Indexed | 414 | **441** |
| Not found (404) | 1,934 | **1,881** |
| Page with redirect | 704 | **690** |
| Alternate page with proper canonical tag | 332 | **355** |
| Blocked by robots.txt | 31 | **29** |
| Excluded by noindex | 8 | **5** |
| Server error (5xx) | 2 | **2** ✓ |
| Soft 404 | 1 | **1** ✓ |
| Crawled – currently not indexed | 226 | **180** |
| Discovered – currently not indexed | 35 | **9** |
| Duplicate, Google chose different canonical | — | **4** |

Every category is close (within a few percent) but not identical — consistent with normal week-to-week GSC coverage drift, which the export's own trend chart shows swinging by hundreds of pages within a single month. Rather than treat either set of numbers as ground truth, **every action in this report and the accompanying data files is derived directly from the real per-URL drilldown files on disk**, not from either summary total. If a fresher export exists, re-running the same pipeline against it is a five-minute job (script kept in this session's scratchpad); the underlying URL-level classification logic doesn't change.

**One gap to flag honestly:** the export only includes drilldown (per-URL) detail for 7 of the 10 issue types. **Blocked by robots.txt (29), Server error 5xx (2), and Soft 404 (1) have no exported URL list** — GSC's UI didn't produce those drilldown files this round. Their exact URLs are not knowable from the data in this repo. Given the counts are small, re-pulling just those 3 drilldowns from the live GSC UI is worth doing before the next phase — flagged as a launch blocker below, not silently skipped.

## 1. Not found (404) — 1,881 real / 1,000 in the exported sample (GSC caps drilldown exports at 1,000 rows)

Classified by pattern across the exported sample:
- **Legacy `/blog/{slug}/` pSEO content** (a separate, older mass-generated system under `/blog/` on the *old* production site — not V2's real posts): the largest single bucket, patterned like `trusted-recycling-enterprise-kaloor-8`, `cable-recycling-options-in-kakkanad-which-to-choose-kakkanad`.
- **`/blogs/{category}/{slug}/` taxonomy** — the second legacy blog system, already documented in `data/gscLegacyMatrixFindings.json`.
- **`/locations/{city}/{service}/` matrix pages** — the pSEO matrix already characterized in the same file.
- **Old service/buyback/SKU URLs** with no current equivalent.

Action taken: **0 of the 1,881 are redirected to the homepage or recreated wholesale**, per the brief's own instruction. Each URL in the exported sample was individually classified (see `data/gsc-url-protection-map.csv`) — `leave_404` unless it had real clicks, in which case it got `redirect_301` or `manual_review` instead. Net result: only 6 URLs from the entire 404 bucket earned a real action (5 `redirect_301`, 1 already covered elsewhere) — the rest genuinely have 0 clicks and are correctly left alone.

## 2. Page with redirect — 690

**Important finding, not previously documented:** 389 of these 690 rows are not a real issue at all — they're the expected, correct non-www→www and no-trailing-slash→trailing-slash normalization on live, working canonical pages (e.g. `ewastekochi.com/locations/kottayam/` redirecting to `www.ewastekochi.com/locations/kottayam/`). Treating those as findings would have polluted the whole classification pass, so they were filtered out before classification (identified by checking whether the *canonical* `https://www.ewastekochi.com/...` trailing-slash form is the one actually redirecting, vs. only a host/slash variant).

The remaining **301 canonical-URL redirects** are real: legacy `/locations/{city}/{service}/` and `/services/{slug}` pages that already redirect somewhere on the current live site. These map 1:1 onto the same 467-URL legacy-matrix footprint already classified in `data/gscLegacyMatrixFindings.json`, cross-checked here against real per-URL click data. No chains found (single-hop only, verified against `vercel.json`'s existing 303 rules — 0 two-hop cases).

## 3. Alternate page with proper canonical tag — 355

Sampled and classified: mostly `www` vs non-`www` duplicate pairs and `blog.ewastekochi.com` article duplicates of the main site's own canonical URLs (both expected/healthy — Google correctly picked the `www` canonical in nearly all cases). One flagged in the tiny "Google chose a different canonical than the user specified" bucket (4 rows, see below) is worth a manual look since that means Google is actively overriding what the site declared. **No mass "Validate Fix" recommended** — the canonicals observed are correct.

## 4. Duplicate, Google chose different canonical — 4 (separate from #3 above)

Full list (only 4, so listed in full rather than sampled):
- `https://www.ewastekochi.com/blog/` — Google picked a different canonical than declared. Worth checking once V2's `/blog/` hub is live and stable; likely resolves itself once the old `/blog/` pSEO footprint stops competing for the same canonical slot.
- `https://ewastekochi.com/locations/thiruvananthapuram/` — non-www variant, expected to resolve once cutover's host redirect is the only path in.
- `https://ewastekochi.com/services/server-recycling-kochi/` — non-www variant of a page with a real V2 target (`/server-recycling-kochi/`).
- `https://ewastekochi.com/locations/north-paravur/e-waste-recycling-kochi/` — legacy matrix page, already in the classified footprint.

None require urgent action; all should self-resolve once V2 is the single source of truth with one consistent canonical per page.

## 5. Blocked by robots.txt — 29 (no URL list available, see gap note above)

Cannot verify which specific URLs without a fresh drilldown pull. **Recommendation: re-check the live V2 `robots.txt` directly** (already verified clean earlier this session — no rule blocking `/ml/` or any indexable service page) rather than guessing from stale old-site data. Not a launch blocker for V2 specifically, since V2's own `robots.txt` was already audited in Phase 2N/2N and found to only exclude non-indexable/quarantine paths.

## 6. Excluded by noindex — 5

Full list: `https://www.ewastekochi.com/`, `/index.html`, `https://ewastekochi.com/`, `/index.html` (non-www), and `https://www.ewastekochi.com/?q=%7Bsearch_term_string%7D`.

**Verified live just now**: the current old-site homepage serves `<meta name="robots" content="index, follow, ...">` — genuinely indexable, not noindexed. The homepage/`.html` entries in this list are a stale historical crawl artifact (the report covers a rolling 3-month window and Google doesn't always drop old states immediately), not a live problem. The `?q={search_term_string}` variant is a `SearchAction` template-URL artifact and is *correctly* excluded — that's the right outcome, not a bug. **No action needed.**

## 7. Server error (5xx) — 2 (no URL list available)

Cannot identify without a fresh drilldown. This is nominally "urgent" per the brief's own framing, but with only 2 pages and no way to know which ones from local data, the only responsible move is to flag it for a fresh GSC pull rather than guess. **Listed as a launch blocker below.**

## 8. Soft 404 — 1 (no URL list available)

Same gap as above — flagged, not guessed at.

## 9. Crawled – currently not indexed — 180

Sampled: dominated by the same legacy `/blog/` and `/blogs/` pSEO footprint and deep matrix pages. Per the brief's own rule, **no indexing requested** for any of these. Only 2 of the 180 had any click history at all (`/blog/mobile-scrap-price-kochi` type entries, already captured and classified in the main protection map).

## 10. Discovered – currently not indexed — 9

Full list: `/blog/e-waste-recycling-process-india/`, `/blog/e-waste-rules-india-2024/`, `/blog/sell-old-laptop-kochi-best-price/` (this is a known, already-resolved *loser* path from the D5 pair in `reports/v2-gsc-data-analysis.md` — redirects to `/blog/sell-old-laptop-kochi/`, correctly so), `/e-waste-collection-kochi/`, `/free-e-waste-pickup-kochi/` (also an already-resolved loser, D4), `/locations/ernakulam/` (already-resolved loser, redirects to `/locations/ernakulam-south/`), `/pricing/`, `/services/it-asset-inventory-audit/` (this one **already exists as a real V2 page** — good, no action needed), `/why-choose-us/`. All 0 clicks / 0 impressions (`1969-12-31` "last crawled" is GSC's placeholder for "discovered, never actually crawled"). Genuinely low priority, exactly as the brief anticipated.

## Launch blockers from this issue-by-issue pass

1. **Re-pull the 3 missing drilldowns** (robots-blocked, 5xx, soft-404) from live GSC before final sign-off — 32 URLs total, currently unidentifiable from data in this repo.
2. Everything else in this report is either already handled by V2's existing build, already correctly excluded, or captured in the main protection map / redirect map for the next implementation phase.
