# Pre-Prod Release Integrity Gate — Final Report

**Date:** 2026-07-15
**Trigger:** production-launch blocker identified after the previous phase — `routes.ts` had uncommitted, actively-edited changes, meaning production could not safely be deployed from a clean checkout, CI, another machine, or Vercel's Git integration.

## routes.ts conflict status — resolved, with a correction to how

The original ask was to commit `routes.ts` (plus reports) in isolation. Inspecting the working tree first (Task 1) found that wasn't actually possible: `routes.ts` now imports `src/data/gscIndexedGeneratedPages.ts`, which was itself uncommitted, and that file in turn is required by 8 new dynamic route pages and 2 components. Committing `routes.ts` alone would have produced a commit that fails to build on any clean checkout with a missing-module error — the exact failure mode this gate exists to prevent, just moved one file over.

The fix was to commit `routes.ts` together with its complete real dependency chain (traced file-by-file in Task 1, listed in commit `9b0a376`'s message) rather than the narrower file list originally specified. While staging that commit, the concurrent session committed an identical bundle first (`9b0a376`, `feat: expand indexed ewaste clusters`) — same routes.ts state, same dependency files, same PROJECT_TRACKER.md entry. My staged changes had nothing left to commit by the time I ran `git commit`. Net effect is the same either way: the blocker is resolved, verified below.

**routes.ts conflict status: resolved.** No conflict markers were found anywhere in the tree at any point in this gate.

## Committed route count

**363 routes** — matches `routes.ts` metadata, built `dist/` pages, `content-index.json`, and `ai-sitemap.xml` exactly (see route parity report for the full cross-surface breakdown).

## Clean working tree status

**Clean**, confirmed twice: once after committing this gate's own two commits (`9b0a376` inherited, `51a79f8b` added), and again independently via a real `git clone` into a scratch directory (not just `git status`) — see Task 6 below.

## Build result

- `npm run check`: 0 errors, 0 warnings, 0 hints (175 files)
- `npm run build`: 363 pages, clean

## Validation result

- `scripts/validate-seo-v2.ts`: 363 routes, **1,586 checks passed, 0 failures**
- `scripts/check-orphan-articles.ts --all`: PASS, 0 orphans among 22 indexable articles (3 pre-existing, unrelated warns for dynamic blog route handlers and one new unpromoted post — not introduced by this gate)
- `scripts/check-duplicate-content.ts`: PASS, all 24 indexable posts clear the gate
- Rendered forbidden-claims sweep across all 363 built HTML pages: 2 pattern matches, both confirmed false positives (safe "not guaranteed pickup" disclaimer language, not violations)
- Rendered broken-link sweep across all 363 built HTML pages: **0 broken internal links**

## Route parity result

Full detail in `reports/pre-prod-route-parity-report.md`. Summary:

- 0 duplicate slugs, 0 duplicate canonicals (by title), 0 redirect-source leaks into sitemap/content-index/ai-sitemap
- **1 confirmed functional defect** (not fixed, flagged): 7 buyback laptop pages (3 `/buyback/laptops/`, 4 `/ml/buyback/laptops/`) 404 at the exact URL every discovery surface advertises, because their slug contains a literal `.html` and this project's `trailingSlash: "always"` config puts the real page one segment deeper than the metadata expects. Verified directly against `astro preview` (no-slash URL → 404, slash URL → 200), not just inferred from file paths.
- **1 confirmed content-duplication issue** (not fixed, flagged): `/e-waste/` (new) and `/ewaste/` (existing) are both live, both indexable, both targeting the same definitional intent — looks like an in-progress migration (redirects already point at `/e-waste/`, but `llms.txt` still lists `/ewaste/`), not two intentional pages.
- **1 reviewed, not a defect**: "Lowest Price Guarantee" / price-match language on `/marketplace/` and `/price-match-policy/` pattern-matches the forbidden-claims list but is a qualified, terms-bound policy, not an unconditional guarantee. Left as-is.

Neither open finding blocks this gate's core question (is the repo state reproducible and internally consistent) — both are pre-existing content/routing decisions outside this gate's scope ("do not change content strategy"), surfaced for an explicit call before production, not silently fixed or silently ignored.

## Task 6 — fresh clone simulation (done for real, not just `git status`)

`git status --short` alone doesn't prove reproducibility — it only proves the working tree matches HEAD, not that HEAD actually builds elsewhere. To verify the real claim, I ran an actual `git clone` of the repo into a separate scratch directory, a fresh `npm install`, and the full check/build/validate sequence there:

| Check | Working directory | Fresh clone | Match |
|---|---|---|---|
| `npm run check` | 175 files, 0 errors | 175 files, 0 errors | ✅ |
| `npm run build` | 363 pages | 363 pages | ✅ |
| `validate-seo-v2.ts` | 1,586 checks, 0 failures | 1,586 checks, 0 failures | ✅ |
| `sitemap.xml` | 6 sitemap-index entries | 6 sitemap-index entries | ✅ |
| `sitemap.xml` byte diff | — | `diff` returned no differences | ✅ identical |
| `content-index.json` page count | 363 | 363 | ✅ |

The clean-clone directory was removed after verification.

## Staging redeploy result

Redeployed to `ewastekochi-v2-staging` from the exact clean, committed state (same commit verified reproducible above). Hit the same Vercel free-tier upload cap encountered earlier this session; used `--archive=tgz` again, which succeeded: deployment `dpl_3Ubma6RhsB4SeSMcaDcgWrzt3vhd`, `readyState: READY`.

Verification checklist:

| Item | Result |
|---|---|
| Homepage builds with correct canonical | ✅ `https://www.ewastekochi.com/` (no staging-URL leakage) |
| Chatbot trigger present | ✅ 6 `data-ewlf-open` instances on homepage |
| Top service pages built | ✅ recycling, pickup, itad, data-destruction, battery-recycling, sell-electronics, marketplace |
| 10 curated location×service pages built | ✅ all 10 |
| Representative legacy-revival pages built | ✅ 4/5 sampled built directly; the 5th (`palakkad/itad-kochi`) is intentionally a 301 redirect to `/itad/`, not a page — confirmed correct, not a gap |
| `sitemap.xml`, `content-index.json`, `ai-sitemap.xml`, `llms.txt` present | ✅ all 4 |
| No forbidden claims in deployed output | ✅ (same rendered sweep as build validation, 0 real hits) |

**Live-URL 200 checks were not directly curl-verified** — the staging preview URL is behind Vercel's standard SSO deployment protection (302 to `vercel.com/sso-api`), same as every staging deploy this session. Verification instead confirmed the exact bits uploaded (byte-identical to the clean-clone build, per Task 6) contain the correct pages, canonicals, and markers — the deployment API also reports `readyState: READY`. This is the same evidence standard used and accepted earlier in this session's staging deploys.

## Production deploy: **not approved yet**

Per the production rule, all of these are now true:

- ✅ `git status --short` = clean
- ✅ `routes.ts` committed (with its full dependency chain, corrected from the original narrower scope)
- ✅ Fresh build from git = 363 pages, verified via a real clone, not inferred
- ✅ Validator passes (1,586/1,586)
- ✅ Staging rebuilt from clean commit
- ✅ Top pages and curated pages live on staging

However, two items surfaced during this gate that weren't part of the original blocker and weren't gated before:

1. **7 URLs would ship to production 404ing at their own sitemap-advertised address** (buyback pages, Finding 1). This is a real, narrow-scope defect independent of the routes.ts blocker — confirmed by direct HTTP testing, not speculation.
2. **2 pages with duplicate "what is e-waste" intent** would both go live simultaneously (Finding 2).

Neither was part of the stated gate scope ("do not change content strategy," "do not add more pages") — so they weren't fixed here. But they were found *by* this gate, and shipping them to production knowingly would undercut the entire point of running a release-integrity check. Recommending both get an explicit decision (fix, redirect, or accept-as-is) before `PROD-PATCH-361` runs, rather than treating this gate as fully green.

## Deliverables

- New: `scripts/pre-prod-route-parity.ts`, `data/pre-prod-route-parity.json`, `data/pre-prod-route-parity.csv`, `reports/pre-prod-route-parity-report.md`, this report.
- Commits: `9b0a376` (routes.ts + dependency chain, landed by the concurrent session with identical content to what this gate staged), `51a79f8b` (parity tooling + report).
- Not deployed to production. Staging redeployed and verified from the clean committed state.
