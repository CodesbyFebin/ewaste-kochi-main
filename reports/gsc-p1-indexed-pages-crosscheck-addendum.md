# GSC-P1 Addendum — Cross-check against the live "Indexed pages" list

Date: 2026-07-15 (data as of GSC's "Last update: 7/10/26")

## What this is

After the main GSC-P1 phase (`reports/gsc-p1-url-protection-map-report.md`), the user pasted the actual live GSC **Indexed pages** report — a real, current export (414 URLs with last-crawled dates, no click/impression columns), confirming the "414" figure quoted at the start of this whole GSC-P1 effort was genuine, not fabricated or from a stale file. This is the first fully-fresh data (Jul 10, 2026) used in this session; everything before it came from the 2026-07-06 export already in the repo.

## What was done

Parsed all 414 URLs and cross-referenced each one against the 1,835-row protection map already built:

| | Count |
| --- | --- |
| Already present and classified in the protection map | **307** |
| New — not seen in the 2026-07-06 Performance/Coverage-Drilldown exports | **107** |

The 307 already-classified matches confirm the earlier work held up: their action breakdown (30 `keep_200`, 90 `redirect_301`, 8 `rebuild_safe_200`, 27 `manual_review`, 152 `leave_404`) is unchanged — being newly re-confirmed as "indexed" today doesn't change any of those calls, since the classification was always based on real click/impression data, not on indexed status alone.

## The 107 new URLs

All 107 have **zero rows in the Performance report** — meaning zero clicks and zero impressions across the entire 3-month window, despite being currently indexed. This is the clearest possible confirmation of this whole phase's core thesis: **being indexed and being valuable are different things.** Breakdown:

| Type | Count | Action |
| --- | --- | --- |
| `blog.ewastekochi.com` subdomain pages | 52 | `manual_review` (elevated — see below) |
| `/locations/{city}/{service}/` legacy matrix combos not seen before | 42 | `leave_404` |
| Legacy `/blog/{slug}/` pSEO posts (old-site system) | 7 | `leave_404` |
| `/buyback/laptops/*.html` and `/ml/buyback/laptops/*.html` per-SKU pages | 6 | `leave_404` |

**One real finding worth flagging up, not just filing away:** the `blog.ewastekochi.com` subdomain is larger and more structured than the earlier sample suggested. The prior export only surfaced 7 URLs there (0 clicks each, looked like scattered content). This fresh list shows **52 indexed URLs**, including a `/pillars/` directory (e-waste-recycling, data-destruction, battery-recycling, it-asset-disposal, e-waste-regulations, etc. — a real topic-cluster structure) and several tool-like pages (`e-waste-recycling-cost-calculator`, `ewaste-business-startup-cost-calculator`). This reads like a genuinely built content site, not incidental pSEO chaff — the kind of thing worth a real decision (fold into V2's `/blog/`? keep as a separate subdomain? retire?) rather than leaving open indefinitely as it has been since Phase 2B. Still 0 clicks/impressions in the 3-month window, so **not** a launch blocker — but it's the one item from this cross-check that changes in character, not just in count.

## Net effect on the phase's recommendation

**No change.** None of the 107 new URLs are Tier 1 or Tier 2 (all traffic_tier 4, zero real-world demand signal). The core recommendation from the main phase — build the 8 far-city pages, add the 14 small redirects — stands unchanged. `data/gsc-url-protection-map.csv`/`.json` updated in place (1,835 → 1,942 rows); `data/v2-protected-launch-routes.json` and `data/gsc-redirect-map.*` unchanged (nothing in the 107 new rows qualified for either).

## Updated totals

| Action | Before this addendum | After |
| --- | --- | --- |
| `keep_200` | 35 | 35 |
| `rebuild_safe_200` | 8 | 8 |
| `redirect_301` | 315 | 315 |
| `manual_review` | 59 | 111 (+52, all `blog.ewastekochi.com`) |
| `leave_404` | 1,418 | 1,473 (+55) |
