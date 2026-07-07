# Legacy URL Priority List — the 183 URLs Phase 2G left unresolved

**Status: analysis only. No redirects added, no pages built, no `vercel.json` changes.** This is the ranked "what to look at next" list the user asked for, built from real GSC signal — not a bulk-implementation pass, consistent with this project's standing rule (`docs/roadmap/legacy-matrix-redirect-strategy.md`): fold each redirect into the page-build task that naturally covers it, never process legacy URLs in bulk.

## Where this picks up

Phase 2G classified all 467 GSC-discovered legacy URLs and implemented the 284 high-confidence redirects directly into `vercel.json`. It deliberately left two buckets unimplemented:

- **72 medium-confidence candidates** (`data/legacyRedirectCandidates.json`, `confidence: "medium"`) — plausible but genuinely ambiguous between 2+ targets.
- **111 manual-review items** (`data/legacyRedirectManualReview.json`) — mostly the `/blogs/{category}/{slug}/` taxonomy, which has no clean 1:1 target.

That's **183 URLs total**, all still real, already-indexed, previously-live URLs with real historical GSC clicks/impressions attached — none were newly discovered, none are hypothetical. This report ranks all 183 by real traffic signal (`data/legacyUrlPriorityRanked.json` has the full machine-readable ranking) and groups them by structural pattern, because ranking by raw impressions alone would be misleading here — most of this footprint is a city-swap or device-swap template, the same pattern this project has rejected building more of on three separate occasions (Phase 2D, the "100 blog posts" rejection, `data/gscLegacyMatrixFindings.json`'s own classification).

## Headline numbers

| | Count | Total clicks | Total impressions |
|---|---|---|---|
| 72 medium-confidence (`/locations/{city}/{service}/`) | 72 | 7 | 220 |
| 111 manual-review (mostly `/blogs/{category}/{slug}/`) | 111 | 13 | 1,000 |
| **Combined** | **183** | **20** | **1,220** |
| — of which have at least 1 real click | 19 | 20 | 258 |
| — of which are outside the realistic Kochi-metro service area | 70 | 8 | 473 |

For scale: even the single best-performing URL in this entire 183-URL set (`/blogs/disposal/`, a category index page) gets 2 clicks / 49 impressions over 3 months. Nothing here is high-value in isolation — the value, if any, is in redirecting real (if small) equity to the right page rather than losing it, and in not repeating the same mistake with new pages.

## Finding 1 — 70 of 183 target cities outside any realistic service area

Grouping every remaining URL by city name surfaces something Phase 2G's per-URL classification didn't call out explicitly: **38%** of what's left targets Thiruvananthapuram, Kozhikode, Kottayam, Kollam, Palakkad, Kannur, Thrissur, or Malappuram — Kerala cities 60–280 km from Kochi, none of which this business has ever claimed to serve (the only built location pages are Kakkanad, Kalamassery, and Ernakulam South — all genuine Kochi-metro suburbs).

**Recommendation: do not build location pages for these 70 URLs, ever.** Redirecting `/locations/thiruvananthapuram/mobile-recycling-kochi/` to a real page would either (a) point local Trivandrum searchers at a Kochi-only service with no way to actually get picked up, or (b) require inventing a service-area claim this business hasn't confirmed — both conflict with the project's anti-fabrication rule the same way the rejected "100 blog posts" city-matrix did. The one already-planned exception: `docs/roadmap/blog-content-gap-roadmap.md` Tier 4 already flags real Thiruvananthapuram demand signal (`e waste collection trivandrum`, 17 impr) as a reason to *consider* eventually building a real Thiruvananthapuram location page — that's a business-expansion decision for the user, not something to infer from redirect cleanup. Until that's decided, these 70 stay unredirected (safe — they already return the live production site's own 404/fallback, not this project's).

## Finding 2 — the 72 medium-confidence candidates are really just 7 service topics, not 72 pages

Grouping by the service-slug segment of `/locations/{city}/{service}/` collapses 72 URLs into 7 real topics:

| Service topic | City variants | Clicks | Impr | No page exists yet — closest real fold target |
|---|---|---|---|---|
| `corporate-ewaste-kochi` | 19 (11 far-city) | 3 | 74 | `/itad/` |
| `mobile-recycling-kochi` | 22 (15 far-city) | 1 | 54 | `/sell-electronics/` |
| `old-computer-disposal` | 5 (4 far-city) | 1 | 29 | `/recycling/` |
| `network-equipment-disposal-kochi` | 10 (6 far-city) | 0 | 22 | `/itad/` or `/server-recycling-kochi/` |
| `printer-recycling-kochi` | 11 (5 far-city) | 2 | 20 | `/recycling/` (no dedicated printer page) |
| `secure-computer-recycling` | 2 (2 far-city) | 0 | 17 | `/data-destruction/` |
| `secure-laptop-disposal` | 3 (2 far-city) | 0 | 4 | `/data-destruction/` |

**Recommendation: do not build 72 pages.** For each topic, the real decision is whether it warrants **one** real page (own content, own schema, own URL) — at which point every Kochi-metro city variant of that topic redirects to it, exactly like Phase 2G already did for `/locations/kalamassery/electronic-waste-disposal/` → `/locations/kalamassery/`. The far-city variants of each topic stay unredirected per Finding 1. `corporate-ewaste-kochi` (74 impr, the highest-signal cluster) is the strongest candidate to evaluate first — check whether `/itad/`'s existing content actually answers a "corporate e-waste in [Kochi suburb]" search intent, or whether it's thin enough there to warrant expansion first.

## Finding 3 — the manual-review /blogs/ bucket has the same pattern: ~21 real topics, not 111 pages

Same clustering applied to the 111 `/blogs/{category}/{slug}/` items: stripping the city suffix from each slug collapses 51 of them into 21 repeated topics (2–4 city variants each); the other 58 are genuine one-off long-tail topics; 2 are category index pages (`/blogs/disposal/`, `/blogs/laptop-disposal/`) with their own real signal.

Top clustered topics by impressions:

| Category | Topic (city-stripped) | City variants | Impr |
|---|---|---|---|
| recycling | how-electronics-recycling-works | 2 | 79 |
| itad-process | nist-800-88-vs-dod-5220-22-m-which-standard-to-choose | 2 | 44 |
| itad-process | the-ultimate-server-decommissioning-checklist-for-data-centres | 2 | 41 |
| disposal | where-to-dispose-old-laptops-free-pickup-guide | 3 | 39 |
| battery-recycling | how-to-store-batteries-before-pickup | 2 | 37 |
| recycling | computer-recycling-for-homes-and-offices | 2 | 37 |
| disposal | how-to-dispose-office-computers-safely | 2 | 35 |
| recycling | laptop-recycling-reuse-buyback-or-scrap | 3 | 33 |
| laptop-disposal | laptop-resale-value-what-changes-the-price-fast | 4 | 25 |

Two of these overlap directly with `docs/roadmap/blog-content-gap-roadmap.md` Tier 2 (`itad-process/nist-800-88-vs-dod-5220-22-m` is the exact "DoD 5220.22-M vs. NIST 800-88" content gap already identified independently from live-site query data, item #9). That's a real, corroborating signal — two separate data sources (live-site GSC queries, and this legacy-URL matrix) both point at the same content gap. The rest are candidates for the *next* round of the existing, already-controlled blog roadmap process — not a reason to open a new bulk-content phase.

**Recommendation:** when `docs/roadmap/blog-content-gap-roadmap.md` is next revisited, add "NIST 800-88 vs. DoD 5220.22-M comparison" as a corroborated-twice item, and consider the other 8 clustered topics above as additional candidates for that same one-at-a-time process — never as a city-swapped batch.

## The actual priority list — 19 URLs with real clicks (the genuine "next set")

Everything below has at least 1 real click in the GSC window, sorted by clicks then impressions. This is the list to work through first, one at a time, per the existing methodology — not to bulk-redirect.

| Clicks | Impr | Source | Bucket | Suggested target | Note |
|---|---|---|---|---|---|
| 2 | 49 | `/blogs/disposal/` | manual-review | — | Category index page, not an article — needs a real `/blog/` equivalent or stays manual-review |
| 1 | 48 | `/blogs/scrap-electronics/pcb-and-motherboard-scrap-buyers-in-kakkanad-kochi/` | manual-review | — | Highest-signal single article; genuine content gap, no existing owner |
| 1 | 26 | `/blogs/` | manual-review | — | Old blog system's own root index |
| 1 | 17 | `/blogs/disposal/how-to-dispose-mixed-household-e-waste-in-kollam/` | manual-review | — | ⚠️ far-city (Kollam) — do not build a Kollam-specific page, see Finding 1 |
| 1 | 13 | `/blogs/battery-recycling/office-battery-pickup-in-thiruvananthapuram-how-to-stage-mixed-loads/` | manual-review | — | ⚠️ far-city (Thiruvananthapuram) |
| 1 | 11 | `/locations/kadavanthra/corporate-ewaste-kochi/` | medium-confidence | `/itad/` | Kochi-metro; part of the `corporate-ewaste-kochi` cluster, Finding 2 |
| 1 | 11 | `/blogs/disposal/where-to-dispose-old-laptops-in-infopark-kochi-free-pickup-guide/` | manual-review | — | Kochi-metro (Infopark); part of a 3-city cluster |
| 1 | 11 | `/blogs/battery-recycling/phone-battery-recycling-in-thrippunithura-kochi-what-to-do-with-loose-cells/` | manual-review | — | Kochi-metro (Thrippunithura) |
| 1 | 11 | `/blogs/recycling/laptop-recycling-in-kollam-reuse-buyback-or-scrap/` | manual-review | — | ⚠️ far-city (Kollam) |
| 1 | 10 | `/blogs/environmental-impact/precious-metal-recovery-from-e-waste-in-kakkanad-kochi/` | manual-review | — | Kochi-metro (Kakkanad) |
| 1 | 10 | `/blogs/corporate-itad/bank-and-hospital-itad-in-kottayam-documentation-that-actually-matters/` | manual-review | — | ⚠️ far-city (Kottayam) |
| 1 | 9 | `/locations/thrippunithura/corporate-ewaste-kochi/` | medium-confidence | `/itad/` | Kochi-metro; same cluster as above |
| 1 | 8 | `/locations/kannur/old-computer-disposal/` | medium-confidence | `/recycling/` | ⚠️ far-city (Kannur) |
| 1 | 5 | `/blogs/laptop-disposal/laptop-resale-value-in-kottayam-what-changes-the-price-fast/` | manual-review | — | ⚠️ far-city (Kottayam) |
| 1 | 4 | `/locations/palakkad/mobile-recycling-kochi/` | medium-confidence | `/recycling/` | ⚠️ far-city (Palakkad) |
| 1 | 4 | `/locations/infopark-kochi/corporate-ewaste-kochi/` | medium-confidence | `/itad/` | Kochi-metro |
| 1 | 2 | `/locations/vyttila/printer-recycling-kochi/` | medium-confidence | `/recycling/` | Kochi-metro |
| 1 | 2 | `/locations/kollam/printer-recycling-kochi/` | medium-confidence | `/recycling/` | ⚠️ far-city (Kollam) |
| 1 | 1 | `/locations/angamaly/air-conditioner-recycling-kochi/` | manual-review | — | Kochi-metro (Angamaly); AC recycling has no existing page at all |

Of these 19: **11 are Kochi-metro and safe to actually redirect now** (the ones without a ⚠️ marker) since each already has a defensible target from Findings 1–2; **8 are far-city and should stay unredirected**, same reasoning as Finding 1.

## Recommended next action

Not a bulk redirect batch. In order:

1. **Implement the 11 Kochi-metro, non-⚠️ redirects from the table above** into `vercel.json` — each has a defensible existing target, real (if small) click history, and zero service-area risk. This is a small, bounded, low-risk batch, unlike the rejected 100-post plan.
2. **Evaluate the `corporate-ewaste-kochi` cluster** (Finding 2's highest-signal topic, 74 impr across 19 cities) — read `/itad/`'s current content and decide if it already answers this intent or needs expansion.
3. **Fold "NIST 800-88 vs. DoD 5220.22-M"** into `docs/roadmap/blog-content-gap-roadmap.md` as a corroborated item (Finding 3) the next time that roadmap is revisited.
4. **Leave the other 160 URLs alone** — they stay exactly as documented in `data/legacyRedirectCandidates.json` / `data/legacyRedirectManualReview.json` / `data/legacyUrlPriorityRanked.json` (this report's full ranked export) until a future page-build phase naturally covers one of them, per the standing strategy doc.

Full machine-readable ranking of all 183 URLs (clicks, impressions, bucket, suggested target where one exists): `data/legacyUrlPriorityRanked.json`.
