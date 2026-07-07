# Legacy Matrix Redirect Strategy

Status: living roadmap doc, not a one-time report. Update this file as legacy matrix/blogs redirects actually get implemented — don't let it go stale like a snapshot report would.

## What this covers

GSC's Performance export (see `reports/v2-gsc-data-analysis.md`) revealed 467 unique legacy URLs not present in the current live sitemap or the V2 build:
- 371 `/locations/{city}/{service}/` matrix pages
- 96 `/blogs/{category}/{slug}/` taxonomy pages

Full per-URL data (clicks, impressions, suggested action) lives in `data/gscLegacyMatrixFindings.json`. This doc is the *strategy* for what to do with that data — not a duplicate of it.

## The rule

**Never mass-process the 467.** No bulk rebuild, no bulk redirect, no bulk 410. Each one gets resolved only when the natural, already-planned work touches it:

1. **Location-matrix URLs** (`/locations/{city}/{service}/`) get redirected to `/locations/{city}/` **in the same commit that builds `/locations/{city}/`**. Before writing that location page, check `data/gscLegacyMatrixFindings.json` filtered to that city:
   - If a matrix URL for that city has `action: "keep-review"` (i.e., had at least 1 click), read its content angle and consider folding it into the new location page's content rather than just redirecting it away — its Kalamassery precedent: `/locations/kalamassery/electronic-waste-disposal/` had 3 clicks, so mentions of "electronic waste disposal" terminology were considered when writing `/locations/kalamassery/`.
   - Everything else for that city gets a straight 301 to `/locations/{city}/` in `vercel.json`, added alongside the page build.
2. **Blogs-taxonomy URLs** (`/blogs/{category}/{slug}/`) get evaluated when the `/blog/` template expands. For each new `/blog/{slug}/` post built, check whether any `/blogs/` path covers near-identical ground — if so, redirect that `/blogs/` path to the new post. Paths with no clear `/blog/` counterpart and 0 clicks are deferred, not force-mapped to something unrelated just to close them out.
3. **Nothing in this set gets sitemapped, built as a standalone V2 page, or bulk-410'd.** If a matrix/blogs URL still has no mapping once its natural phase has passed and the surrounding rollout is otherwise complete, the fallback is 410 (not a bare 404, since intentional removal should read as removal, not confusion) — but only after every reasonable mapping opportunity has passed, and only in a batch reviewed against `data/gscLegacyMatrixFindings.json` one more time first.

## Progress tracker

| City / group | Matrix URLs (from GSC) | Location page built? | Redirects added? |
|---|---|---|---|
| Kakkanad | present in dataset | Yes (Phase 1) | **Not yet** — built before this strategy existed; needs a retroactive pass |
| Ernakulam South | present in dataset | Yes (Phase 2B) | **Not yet** — same retroactive gap |
| Kalamassery | present in dataset | Yes (Phase 2B) | **Not yet** — same retroactive gap |
| All other cities | present in dataset | No | N/A — pending location page build |
| `/blogs/` taxonomy | 96 paths | 2 `/blog/` posts built (Phase 2B) | Not yet evaluated against these 2 posts |

**Known gap, logged honestly:** Kakkanad, Ernakulam South, and Kalamassery location pages were already built (Phases 1 and 2B) before this roadmap doc existed, so their corresponding matrix-page redirects were not added in the same commit as the rule above requires. This is flagged as **retroactive cleanup work**, not silently skipped — see Next Tasks in `PROJECT_TRACKER.md`.

## Why this approach over mass-processing

- 411 of 467 URLs have literally zero clicks in the 3-month GSC window — there's no urgency, and processing them in bulk without checking whether a natural home exists risks either creating redirect chains to nowhere-in-particular or discarding the small amount of real signal in the 56 keep-review candidates.
- Folding this into already-planned page-build work means every redirect target is guaranteed to exist by construction — the project's standing rule ("never add a redirect to `vercel.json` for a target that doesn't exist in the V2 build yet") gets satisfied automatically instead of needing a separate verification pass.
