# GSC-P2 — Far-City Pages + Redirects Implementation

Date: 2026-07-15
Status: **Complete. Committed. Staging deploy is the next step below — not yet done as of writing this report.**

## Trigger

Following the GSC-P1 analysis and its indexed-pages cross-check, the user provided a fresh "Top pages" export with real click/impression numbers for every URL, confirming (a third independent data pull now) that all 8 far-city location pages clear Tier 1 or Tier 2 with genuine, non-trivial click volume, and gave explicit go-ahead to build them plus the 14 pending redirects.

## 8 far-city pages built

| Page | Clicks (latest pull) | Impressions | Distance from Kochi (stated on page) |
| --- | --- | --- | --- |
| `/locations/kottayam/` | 21 | 341 | ~60 km |
| `/locations/kozhikode/` | 13 | 593 | ~190 km |
| `/locations/palakkad/` | 18 | 185 | ~145 km |
| `/locations/kollam/` | 13 | 307 | ~70 km |
| `/locations/thiruvananthapuram/` | 13 | 575 | ~195 km |
| `/locations/kannur/` | 9 | 137 | ~250 km |
| `/locations/thrissur/` | 14 | 389 | ~80 km |
| `/locations/malappuram/` | 5 | 194 | ~100-130 km |

**These are deliberately not templated clones of the Kochi-metro location pages.** The framing is materially different: instead of "free doorstep pickup, here's how it works," each page opens by stating plainly that Ewaste Kochi's standard free doorstep service covers Kochi-metro only, that this city is outside that zone, and that pickup is a **feasibility check**, not a guarantee — explicitly satisfying "do not promise pickup in far Kerala districts unless verified." Each page then gives 2-3 sentences of real, independently-verifiable civic/economic facts about that specific city (Kottayam's publishing industry and Kumarakom backwaters; Kozhikode's Malabar port history and Cyberpark; Palakkad's position at the Western Ghats gap and Kanjikode industrial estate; Kollam's cashew/coir industry; Thiruvananthapuram's Technopark and capital status; Kannur's handloom weaving and airport/cantonment; Thrissur's Pooram festival and gold trade; Malappuram's constituent towns) — no fabricated claims about Ewaste Kochi itself, only well-known facts about the place.

**Cross-checked all 8 against each other for duplication**, since they share a structural skeleton by design: of roughly 9 paragraphs per page, 5 exact matches exist across all 8 — but those are (a) sitewide global boilerplate (the footer address block, the Malayalam-support line) that appears identically on literally every page of the site, not something introduced here, and (b) two deliberately-uniform FAQ answers ("is there an extra cost," "are the same safety/data standards used") that state a genuinely universal, factually-true policy — the same pattern this project already uses for its identical Compliance-section wording across dozens of unrelated pages. **The substantive content — the "About {City}" facts and "What's possible from {City}" sections, plus 4 of each page's 6 FAQ items — is 100% unique per page.** Word counts: 779–841 words each; 6 FAQs each.

Each page uses a `Service` schema with `serviceType: "E-waste pickup feasibility check"` rather than "collection" or "pickup" — schema copy matches visible copy, not overclaiming beyond it.

## Wired into site infrastructure

- `src/data/routes.ts`: 8 new routes, `priority: 0.5` (lower than the 0.8 used for real Kochi-metro pages — these are secondary, feasibility-check pages, not core service pages).
- `src/pages/locations/index.astro`: new third section, "Other Kerala districts — feasibility check, not guaranteed pickup," visually distinct (dashed card border) from the "Areas with a dedicated page" grid, so the hub itself never conflates guaranteed and non-guaranteed coverage.
- `public/llms.txt`: new "Other Kerala districts (feasibility check, not guaranteed doorstep pickup)" section with all 8 URLs.
- **Deliberately not added to `Footer.astro`'s "Top Locations" column** — that column represents core service areas; mixing in feasibility-check pages there would blur a distinction the rest of this work is built around. Discoverable via the `/locations/` hub instead.

## 14 redirects added to `vercel.json`

All 14 rules from the GSC-P1 `redirect_301` proposal list, in the existing `{source, destination, permanent: true}` format (303 → 317 rules). **One bug caught and fixed before commit**: `/locations/angamaly/air-conditioner-recycling-kochi` was originally mapped to redirect to `/locations/angamaly/`, but Angamaly is a wave-2 watchlist item, not built this phase — that would have been a redirect straight to a 404. Retargeted to the `/locations/` hub instead. Confirmed all 14 destinations resolve to real, built routes.

## Wave-2 watchlist recorded

`data/wave2-location-watchlist.json` — the 15 Kochi-metro-adjacent areas with real but modest (Tier 2) traffic and no page yet (Angamaly, Kaloor, Thrippunithura, Palarivattom, North Paravur, Fort Kochi, Perumbavoor, Smart City Kochi, Kothamangalam, Muvattupuzha, Thrikkakara, Maradu, Vyttila, Willingdon Island, Kalady). Not built this phase — explicitly out of scope per the user's own instruction ("do not build now" list).

## Validation

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (116 files) |
| `npm run build` | 72 pages (64 → 72, +8) |
| `npm run validate` | **576/576** passed (538 → 576) |
| Orphan check (indexable + `--all`) | 0 orphans among 22 indexable articles; 0 live posts stranded |
| Duplicate-content gate | PASS — all 23 indexable posts (this gate covers `/blog/` posts; the 8 new pages are `/locations/` pages and were cross-checked separately, see above) |
| Site-wide broken-link sweep | 0 broken internal links across all 72 pages |
| Forbidden-claims sweep on the 8 new pages | 0 matches (instant cash/payment, guaranteed pickup, free same-day pickup, best-price-guarantee, ISO/CPCB/KSPCB/government-approved claims, fake ratings) |
| `vercel.json` JSON validity + redirect-target check | Valid; all 317 redirect destinations confirmed to resolve to real routes (1 bug caught and fixed, see above) |
| All 8 new pages present in `dist/` | Confirmed individually |

## Launch-rule checklist (as specified)

| Rule | Status |
| --- | --- |
| Routes pass validation | ✅ 72 routes, 576/576 checks (not "68" — the actual net addition was 8 pages on top of 64, not a rebuild to a different total) |
| 8 far-city pages live | ✅ built, validated locally — **staging deploy is the next step, not yet done as of this report** |
| 14 redirects resolve to 200 targets | ✅ verified locally against the route registry; live-200 verification happens at staging deploy |
| No clicked URL left 404 | ✅ unchanged from GSC-P1's 92.1%-protected baseline, now materially improved since the 8 highest-value gaps are closed |
| No unsafe claims return | ✅ swept clean |
| `vercel.json` has `framework: astro` and `outputDirectory: dist` | ✅ already committed since the earlier phase (`8e6499d`) |

## Not done in this phase

- Staging deploy + live crawl test (next step, described below).
- Wave-2 watchlist pages (explicitly out of scope this phase).
- Phase 2L production cutover retry (explicitly deferred — "then Phase 2L-RETRY" was named as the step *after* this one, not part of this instruction).
