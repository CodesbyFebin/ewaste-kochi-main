# V2 vs. GSC Gap Report

Date: 2026-07-15. Source: same 2026-07-06 export processed in `reports/gsc-indexing-issue-action-plan.md`.

## Headline

**92.1% of all historically-clicked traffic is protected** by V2's current 64 routes plus the redirect/rebuild plan in this phase's data files (649 of 949 total clicks already land on a live V2 page as-is, 91 more via a redirect, 134 more via the 8 far-city rebuild pages). **0% of clicked URLs are left as a 404** — every URL with at least 1 recorded click got `keep_200`, `redirect_301`, or `rebuild_safe_200`, never `leave_404`, matching the brief's own hard rule. The remaining 7.9% of click volume (75 clicks) sits in `manual_review` — genuinely ambiguous cases that need a human call, not silently dropped and not silently guessed.

## V2 current state vs. the indexed universe

| | Count |
| --- | --- |
| V2 routes currently built | 64 |
| URLs in the GSC universe (Performance + Coverage-Drilldown, deduplicated) | 1,835 |
| Of those, already live as real V2 pages | 35 (the ones with historical GSC rows — several V2 pages like the 4 brand-new location pages built this week have no GSC history yet since they didn't exist on the old site) |
| Of those, already redirected in `vercel.json` | 301 |
| Indexed on the old live site (per Coverage export) | ~441 |

The gap between "441 indexed" and "64 V2 routes" is not itself alarming — most of that 441 is the legacy pSEO matrix/blog footprint that never earned real traffic (see the action-plan report). The real question is whether the **clicked** subset is covered, and it is, at 92.1%.

## Top clicked URLs — status

| URL | Clicks | Impressions | V2 status |
| --- | --- | --- | --- |
| `/` | 265 | 4,393 | ✅ live |
| `/recycling/` | 72 | 3,571 | ✅ live |
| `/marketplace/` | 66 | 2,247 | ✅ live |
| `/services/electronics-recycling-near-me/` | 42 | 3,258 | ✅ live |
| `/locations/kakkanad/` | 34 | 793 | ✅ live |
| `/battery-recycling/` | 31 | 1,524 | ✅ live |
| `/locations/kottayam/` | 30 | 394 | ⚠️ not built — **rebuild recommended** |
| `/locations/kozhikode/` | 22 | 1,022 | ⚠️ not built — **rebuild recommended** |
| `/locations/palakkad/` | 19 | 225 | ⚠️ not built — **rebuild recommended** |
| `/locations/kollam/` | 19 | 313 | ⚠️ not built — **rebuild recommended** |
| `/locations/aluva/` | 17 | 293 | ✅ live (built this week) |
| `/sell-electronics/` | 17 | 792 | ✅ live |
| `/locations/thiruvananthapuram/` | 15 | 768 | ⚠️ not built — **rebuild recommended** |
| `/locations/kannur/` | 14 | 249 | ⚠️ not built — **rebuild recommended** |
| `/pickup/` | 14 | 183 | ✅ live |
| `/faq/` | 11 | 324 | ✅ live |
| `/contact/` | 10 | 310 | ✅ live |
| `/locations/kadavanthra/` | 10 | 426 | ✅ live (built this week) |
| `/tv-recycling-kochi/` | 10 | 134 | ✅ live |
| `/locations/thrissur/` | 8 | 271 | ⚠️ not built — **rebuild recommended** |
| `/locations/malappuram/` | 7 | 313 | ⚠️ not built — **rebuild recommended** |

Every URL missing from V2 in this top-20 list is one of the 8 named far-city pages — nothing else in the real top-of-funnel traffic is currently unprotected.

## Missing Tier 1/2 pages — full list

**Tier 1 (must protect):** the 8 far-city location pages above (`kottayam`, `kozhikode`, `palakkad`, `kollam`, `thiruvananthapuram`, `kannur`, `thrissur`, `malappuram`) — combined 134 clicks / 3,555 impressions currently earned by pages V2 doesn't have. This is the phase's core recommendation: **rebuild all 8**, using the exact hedged wording specified in the brief (`"Ewaste Kochi primarily supports Kochi, Ernakulam, Kakkanad, Kalamassery, Ernakulam South, Aluva and nearby Kochi-metro enquiry areas. For other Kerala districts, contact us to check pickup feasibility."`), not a guaranteed-service claim.

**Tier 2 candidates worth a second wave (not auto-built this phase, flagged in `manual_review`):** these are genuinely Kochi-metro/Ernakulam-district areas — not far-city pSEO chaff — with real if modest traffic and no V2 page yet:

| Area | Clicks | Impressions |
| --- | --- | --- |
| `/locations/angamaly/` | 6 | 134 |
| `/locations/kaloor/` | 5 | 55 |
| `/locations/thrippunithura/` | 4 | 150 |
| `/locations/palarivattom/` | 3 | 107 |
| `/locations/north-paravur/` | 3 | 46 |
| `/locations/fort-kochi/` | 3 | 38 |
| `/locations/perumbavoor/` | 3 | 36 |
| `/locations/smart-city-kochi/` | 2 | 36 |
| `/locations/kothamangalam/` | 2 | 47 |
| `/locations/muvattupuzha/` | 1 | 60 |
| `/locations/thrikkakara/` | 1 | 54 |
| `/locations/maradu/` | 1 | 23 |
| `/locations/vyttila/` | 0 | 77 |
| `/locations/willingdon-island/` | 0 | 25 |
| `/locations/kalady/` | 0 | 32 |

These are a strong wave-2 candidate list (several — Angamaly, Thrippunithura, Palarivattom — were independently named in the brief's own "location pages to keep or rebuild safely" list). Not built in this pass since it's outside the 12-page/8-far-city scope actually specified as required; recommend a dedicated follow-up phase.

## Redirects that must be added before cutover

**14 new redirect rules** (full list in `data/gsc-redirect-map.csv`, `status: "proposed_new"`), none yet in `vercel.json`. Highlights:

| Source | Target | Clicks |
| --- | --- | --- |
| `/ml/services/tv-monitor-recycling-kochi/` | `/tv-recycling-kochi/` | 9 |
| `/sell-electronics-kochi/` | `/sell-electronics/` | 6 |
| `/services/tv-monitor-recycling-kochi/` | `/tv-recycling-kochi/` | 1 |
| `/services/free-ewaste-pickup-kochi/` | `/pickup/` | 1 |
| `/services/corporate-ewaste-kochi/` | `/itad/` | 1 |
| (9 more, mostly 0-1 click legacy matrix/service URLs) | — | ≤1 each |

**Flag on the Malayalam one:** `/ml/services/tv-monitor-recycling-kochi/` is redirected to the English `/tv-recycling-kochi/` page because V2 has no Malayalam TV-recycling page to redirect to instead. Not ideal for a Malayalam-language visitor, but better than a 404 — worth considering a dedicated `/ml/tv-recycling-kochi/` in a future phase given it's earning real clicks.

**301 redirects already implemented** in `vercel.json` from earlier phases (Phase 2B/2G/2M) — reconfirmed still correct against this fresh per-URL pass, 0 chains, 0 dead targets.

## Routes safe to leave 404 / not rebuild

The remaining ~1,780 legacy URLs (matrix pages, `/blogs/` taxonomy, old `/blog/` pSEO content, `.html`/buyback/SKU artifacts) — all correctly left `leave_404`, all confirmed **0 clicks** in the export. This is the "don't recreate the other 99%" half of the brief's own instruction, and it's the majority of the raw 404/coverage counts that made this look scarier than it is.

## Not resolved this phase (needs a follow-up decision)

- Wave-2 Tier 2 location pages (15 candidates above).
- `/hi/` Hindi-language scope question (still open since Phase 2B).
- `blog.ewastekochi.com` subdomain scope question (still open since Phase 2B).
- 32 URLs (robots-blocked/5xx/soft-404) with no locally-available URL list — needs a fresh GSC drilldown pull.
