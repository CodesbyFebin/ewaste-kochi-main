# GSC-P1 — URL Protection Map: Summary Report

Date: 2026-07-15
Phase: GSC-P1 — Index Coverage Triage + URL Protection Map
Status: **Analysis complete. No pages built, no redirects added, no deploy. Per the brief's own instruction: stop here for review.**

## Source data — read this first

No new GSC export was uploaded with this request. The message referenced "your uploaded GSC export" and quoted summary numbers (414/1,934/704/332/31/8/2/1/226/35) that are close to, but not identical to, the real `Critical issues.csv` already sitting in this project's root (`ewastekochi.com-Coverage-2026-07-06.zip`, 441/1,881/690/355/29/5/2/1/180/9) — first processed on 2026-07-07 (`reports/v2-gsc-data-analysis.md`) but never before broken down to full per-URL detail. This phase re-processes those same real files at full granularity rather than fabricate numbers to match the quoted summary. See `reports/gsc-indexing-issue-action-plan.md` for the full reconciliation. **Every number below comes from the real per-URL export files on disk**, cross-checked directly against the live old site where it mattered (e.g. confirming the far-city location pages' "redirect" flag was just harmless www-normalization noise, not a real problem, by curling them live).

The core premise — that some far-city location pages the site "doesn't officially serve" are already earning real organic clicks and would 404 on a naive cutover — checked out and is the main finding of this phase.

## Numbers

| Metric | Count |
| --- | --- |
| URLs analyzed (deduplicated across Performance + all 7 Coverage-Drilldown exports) | **1,835** |
| Tier 1 URLs (10+ clicks OR 100+ impressions) | **40** — 35 already protected (live or redirected/rebuilt), 5 in manual review |
| Tier 2 URLs (1–9 clicks OR 20–99 impressions) | **138** — 70 protected, rest correctly thin/0-click |
| Redirects proposed total (already-implemented + new) | **315** (301 already live in `vercel.json` from earlier phases, **14 new**, none yet added) |
| Recommended `keep_200` | **35** (already-live V2 pages with GSC history — 29 more of V2's 64 routes are brand-new with no historical GSC row yet, also implicitly protected) |
| Recommended `rebuild_safe_200` | **8** (the far-city location pages) |
| Recommended `redirect_301` | **315** total, **14 net-new** |
| Recommended `noindex` | **0** — nothing in this dataset warranted a fresh noindex; the old site's own noindex usage (5 URLs) was checked and is already correct |
| Recommended `leave_404` / `return_410` | **1,418** `leave_404`, **0** `return_410` — no URL in this dataset needed a hard 410 signal beyond a normal 404 |
| Manual review (genuinely ambiguous, human call needed) | **59** |
| **% of all historically-clicked traffic protected** | **92.1%** (649 of 949 total clicks land on a live page as-is, 91 via redirect, 134 via the 8 rebuild pages; **0%** of clicked URLs left 404) |

## Launch blockers

1. **8 far-city location pages need building** before cutover if the goal is genuinely protecting 92%+ of clicked traffic rather than ~78% (without them, the "already protected" share of total clicks drops to ~78%). Not yet built — this was explicitly a planning/triage phase, not a build phase.
2. **14 new redirect rules need adding to `vercel.json`** — small, low-risk, all single-hop to real existing pages. Not yet added.
3. **32 URLs (robots-blocked, 5xx, soft-404) have no locally-available URL list** — the GSC export didn't include those 3 drilldowns. Re-pull them from the live GSC UI before final sign-off; can't be resolved from data currently in this repo.
4. **59 manual-review URLs** are genuinely ambiguous (mostly: 15 additional Kochi-metro-adjacent location pages with modest real traffic, 18 legacy `/blog/` posts with 1-2 clicks and no clean V2 match, the long-standing open `/hi/` and `blog.ewastekochi.com` scope questions). None block cutover on their own — none carry enough traffic to be a Tier-1 emergency — but they're a real backlog, not resolved here.

## Recommendation on the 60(64)-page cutover

**The V2 route count itself was never the risk — the 8 missing far-city pages were.** Once those are built (and the 14 small redirects added), V2 protects 92%+ of all real historical click volume while remaining a clean, non-pSEO, individually-crafted site — it does not need to grow to "120–180 pages" or attempt to preserve the old site's full ~11,000-URL or even 441-URL indexed footprint. The other ~1,780 legacy URLs in this dataset earned **zero clicks** in the 3-month window and are correctly left 404, exactly as the brief itself argued ("protect 95%+ of clicks, not 95% of old URLs").

**Concrete sequencing recommendation:**
1. Build the 8 far-city pages (hedged wording, no guaranteed-service claims) — this is the one piece of net-new work this phase's findings actually require before cutover.
2. Add the 14 new redirect rules to `vercel.json`.
3. Re-pull the 3 missing drilldowns (robots/5xx/soft-404) and confirm those 32 URLs aren't a live problem.
4. Then proceed with the already-planned staging validation → production cutover sequence (the `vercel.json` output-directory fix from the earlier Phase 2L incident is still a separate, unresolved prerequisite — see `PROJECT_TRACKER.md`).
5. Wave-2 Tier 2 location pages (15 candidates) and the `/hi/`/`blog.ewastekochi.com` scope questions can follow cutover — none are launch-blocking.

**This phase does not implement steps 1–2.** Per the brief's own explicit instruction ("Do not deploy. ... Stop."), this is analysis and a committed data/report artifact set only.

## Deliverables

- `data/gsc-url-protection-map.csv` / `.json` — full 1,835-row per-URL classification.
- `data/v2-protected-launch-routes.json` — the 64 current V2 routes + Tier 1 keep list + 8 rebuild targets + 14 new redirects needed.
- `data/gsc-redirect-map.csv` / `.json` — all 315 redirects (301 already-live, 14 proposed), one-hop, no homepage dumping, no target 404s (verified against `vercel.json`).
- `reports/gsc-indexing-issue-action-plan.md` — issue-by-issue breakdown of all 10 GSC coverage categories.
- `reports/v2-gsc-gap-report.md` — V2-vs-GSC delta, top clicked URLs, missing Tier 1/2 pages, wave-2 candidates.
- This report.
- `PROJECT_TRACKER.md` updated.
