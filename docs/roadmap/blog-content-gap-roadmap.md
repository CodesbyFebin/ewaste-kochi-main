# Blog Content Gap Roadmap

Status: living roadmap doc — priority list and linking plan only. **No blog posts have been written from this document.** Source data and methodology: `docs/roadmap/google-trends-keyword-validation.md`.

## Rule for every item below

Before writing anything new, check whether an existing kept page or blog post (see `data/urlInventory.json`) already targets the same query. If one does, the action is **optimize that page's title/meta/intro**, not create a new one — this project has already spent two phases resolving cannibalization from exactly this pattern (`reports/v2-gsc-data-analysis.md`). Only create net-new content where the audit below found no existing owner.

## Tier 1 — Highest opportunity (large impressions, ~0% CTR despite decent ranking)

| # | Topic | Query signal | Likely existing owner to audit first | If no owner exists / audit insufficient |
|---|---|---|---|---|
| 1 | Where to recycle old electronics | 2,353 impr, pos 3.87, 0 clicks | `/recycling/`, possibly `/blog/best-e-waste-recycling-kochi/` | New guide: "Where to Recycle Old Electronics in Kochi" — direct-answer format matching the query's phrasing exactly |
| 2 | Where to donate electronics | 2,303 impr, pos 3.86, 0 clicks | None identified | **Blocked on business confirmation**: does a donation/NGO pathway exist? If yes, new guide describing it honestly. If no, reframe as "recycling vs. donating" content that explains why recycling is the safer/more practical option for e-waste specifically — do not imply an unverified donation program |
| 3 | Where to recycle batteries | 1,655 impr, pos 3.73, 0 clicks | `/battery-recycling/` | Audit first; if the service page itself isn't the ranking page, a supporting blog guide may be warranted |
| 4 | Where to sell electronics locally / used electronics | 987 + 652 impr, pos 6-7, 0 clicks | `/blog/where-sell-ewaste-near-me/`, `/sell-electronics/` | Audit first — strong candidate for title/meta refresh rather than new content |
| 5 | How to recycle electronics (process/how-to intent) | 855 impr, pos 3.92, 0 clicks | `/recycling/` (process section) | Likely servable by strengthening the existing process section's heading/intro to match "how to recycle electronics" phrasing directly |
| 6 | Local recycling centers | 698 impr, pos 8.37, 0 clicks | `/locations/` | Likely a locations-hub optimization rather than new content — the query implies a directory/list format |

**Action before any writing**: pull the actual current `<title>` and meta description of `/recycling/`, `/battery-recycling/`, `/locations/`, `/blog/where-sell-ewaste-near-me/`, and `/blog/best-e-waste-recycling-kochi/` from the live site and compare against the exact query phrasing above. This is a 30-minute audit that could resolve items 1, 3, 4, 5, and 6 without writing a single new page.

## Tier 2 — ITAD / data destruction (moderate impressions, poor positions — real content gap, not just a CTR problem)

| # | Topic | Query signal | Likely existing owner | Gap type |
|---|---|---|---|---|
| 7 | Hard drive destruction service | 91 impr, pos 22.43, 0 clicks | `/hard-drive-shredding/`, `/services/hard-drive-degaussing-kochi/` | Ranking gap — page exists but ranks poorly; may need more direct "service" framing rather than method-comparison framing |
| 8 | ITAD vendor selection (how to choose an ITAD vendor/provider, vendor checklist) | ~49 impr combined, poor positions | `/blog/how-to-choose-itad-provider/` (already exists) | **Optimize existing post** — do not create a duplicate |
| 9 | DoD 5220.22-M vs. NIST 800-88 | 13 impr, pos 20.77, 0 clicks | `/blog/nist-800-88-data-wiping/`, `/blog/hdd-vs-ssd-destruction/` (adjacent, not identical) | **Real content gap** — no existing post does a direct standard-vs-standard comparison |
| 10 | Data center decommissioning checklist | 16 impr, poor position | `/server-recycling-kochi/`, `/services/it-asset-inventory-audit/` (both built Phase 2A/2B) | **Real content gap** — checklist-format content bridging these two existing service pages doesn't exist yet |

## Tier 3 — Battery deposit/exchange (small volume, but a distinct factual question)

| # | Topic | Query signal | Gap type |
|---|---|---|---|
| 11 | Battery deposit/exchange schemes | 46 impr, pos 40.85, 0 clicks | **Blocked on business confirmation** — "deposit" implies a specific exchange scheme; confirm it exists before content addresses it as if it does |

## Tier 4 — Location expansion signal

| # | Topic | Query signal | Action |
|---|---|---|---|
| 12 | Thiruvananthapuram-area demand | `e waste collection trivandrum` (17 impr) + `waste disposal trivandrum` (2 impr) | Not a content-gap item — a prioritization signal. Move `/locations/thiruvananthapuram/` up the location-page build queue (already planned in `PROJECT_TRACKER.md` Next Tasks) |
| 13 | Kakkanad scrap/waste queries | `waste disposal kakkanad` (62), `waste collection kakkanad` (37), `scrap shop kakkanad` (30) | Kakkanad is already built — audit `/locations/kakkanad/` title/meta against this exact phrasing rather than creating new content |

## Internal linking plan (for whichever Tier 1/2 items eventually become real content)

To avoid the same orphan-page mistakes this project has caught twice already (Phase 1.5's `/services/`, Phase 2B's blog posts and location pages), any post eventually written from this roadmap should be linked from at least one existing page **before** it's considered complete, matching this pattern:

| New content (if built) | Should link to | Should be linked from |
|---|---|---|
| #1 "Where to Recycle Old Electronics" | `/recycling/`, `/locations/`, `/pickup/` | `/recycling/` (process section), `/services/` hub |
| #2 "Recycling vs. Donating" (if pursued) | `/recycling/`, `/trust/` (for compliance framing) | `/recycling/`, `/faq/` |
| #3 battery guide (if pursued beyond `/battery-recycling/` audit) | `/battery-recycling/`, `/pickup/` | `/battery-recycling/`, homepage service grid |
| #9 DoD vs. NIST comparison | `/data-destruction/`, `/blog/nist-800-88-data-wiping/`, `/hard-drive-shredding/` | `/data-destruction/` (methods section), `/blog/nist-800-88-data-wiping/` |
| #10 Data center decommissioning checklist | `/server-recycling-kochi/`, `/services/it-asset-inventory-audit/`, `/itad/` | `/server-recycling-kochi/`, `/services/it-asset-inventory-audit/`, `/itad/` |

## What happens next (not part of this phase)

1. The title/meta audit described under Tier 1 (human or future-phase task — requires reading live rendered titles, which is a quick, bounded task).
2. A business-fact confirmation round for items #2 (donation pathway) and #11 (battery deposit scheme) — these cannot proceed without real answers, per the project's standing anti-fabrication rule.
3. Only after 1 and 2: actual content creation, as its own phase, one post at a time, each immediately linked from an existing page per the table above.

No sitemap entries, route registry entries, or `vercel.json` changes result from this document — it is planning only.

## Tier 5 — Filtered additions from the "100 blog posts" list (2026-07-07)

A separate 100-title list (10 categories × 10 titles, with an "immediate 7-week mass launch" plan) was received alongside the Phase 2D instructions. That launch plan was **not executed** — see `PROJECT_TRACKER.md` "Known Risks" for the full reasoning (template-swapped titles matching the thin-pSEO pattern this project has repeatedly cleaned up, a slug collision with an already-built page, and a publishing cadence explicitly framed as evading platform quality detection). Per the user's decision, the list was filtered against `data/urlInventory.json` (existing kept posts), the 38 already-built V2 pages, and the project's anti-template-swap rule. What follows is what survived — **still planning only, no posts written.**

### What was excluded, and why (by category)

| Category from the 100-list | Verdict | Reason |
|---|---|---|
| 8. Local Kochi & Kerala Geo Blogs | **Excluded entirely** | Pure city-template swap ("E-Waste Collection in Kakkanad / Pickup in Edappally / Recycling in Aluva / ...") — the exact location-matrix pattern in `data/gscLegacyMatrixFindings.json`, where even the best-performing real instance of this pattern gets only 4 clicks |
| 9. Product-Specific Recycling Guides | **Excluded except item 10 (cable/accessory recycling)** | Device-template swap ("How Laptops/Mobiles/Computers/Printers/Monitors/TVs Are Recycled") — same anti-pattern as above; item 7's slug (`/blog/server-recycling-kochi/`) also directly collides with the already-built `/server-recycling-kochi/` page; item 6 duplicates the already-built `/tv-recycling-kochi/` |
| Various individual titles across other categories | **Excluded as duplicates** | Directly overlap an already-built V2 page or already-kept blog post — e.g. "E-Waste Scrap Price in Kochi" (duplicates `/e-waste-scrap-prices-kochi/`), "How to Book Free E-Waste Pickup" (duplicates `/blog/free-e-waste-pickup-kochi/`, built Phase 2B), "ITAD Services in Kochi" (duplicates `/itad/`), "Certificate of Data Destruction" (duplicates `/data-destruction-certificate-sample/`), "Where to Recycle Batteries in Kochi" (this is now `/battery-recycling/`'s literal title after Phase 2D), "Laptop/Mobile/Server Scrap Price in Kochi" (duplicate existing kept posts), "NIST 800-88 Data Wiping" (duplicate existing kept post), "E-Waste Recycling Process in India" (duplicate existing kept post) |
| A handful of near-duplicate pairs within the same category | **Consolidated to one entry** | e.g. "UPS Battery Recycling" + "Inverter Battery Recycling" + "Mobile Battery Recycling" were three device-swapped variants of one topic already covered by `/battery-recycling/` — not re-added as three separate posts |

Roughly 70 of the 100 titles were excluded on one of the grounds above. The ~27 that survived are genuinely distinct from anything already built, and don't swap a device or city name into a repeated template.

### Surviving topics, added to the phased queue

**Definitional/basics** (audit `/blog/what-is-ewaste/` first — it may already cover #1 in substance):
1. What Is E-Waste? Complete Beginner Guide
2. E-Waste Examples: Common Electronic Items You Should Recycle
3. Types of E-Waste: A Categorization Guide
4. Why Is E-Waste Dangerous for Health and the Environment?
5. E-Waste vs. Regular Waste: What's the Difference?
6. Which of My Devices Count as E-Waste? (consolidates the "is a broken laptop/mobile e-waste" niche questions into one post rather than device-swapped separates)

**Collection & near-me** (distinct angles from the already-built `/pickup/` and `/services/electronics-recycling-near-me/`):
7. E-Waste Collection Near Me: How to Choose a Safe Recycler (vendor-vetting angle — distinct from the existing near-me page's coverage-checking angle)
8. E-Waste Pickup for Apartments and Housing Societies in Kochi (new audience, not covered elsewhere)
9. E-Waste Collection Centre vs. Doorstep Pickup: Which Should You Choose? (directly answers the Tier 1 "local recycling centers" query gap)

**Scrap value** (component/material granularity not covered by existing pricing pages):
10. Motherboard and Component Scrap Value: Why Rates Change
11. Hard Disk Scrap Value vs. Data Safety: What to Consider Before Selling
12. UPS Battery Scrap Value: What Affects the Price

**Process** (must use real, accurate operational detail — no invented facility claims):
13. What Happens Inside an E-Waste Recycling Facility?
14. Gold and Precious Metal Recovery from E-Waste: The Real Value (honest framing only — no inflated recovery-rate claims)

**Regulatory** (strong cluster — matches the real GSC ITAD-vendor-selection query gap from Tier 2):
15. E-Waste Management Rules 2022: A Simple Guide for Businesses
16. What Is EPR in E-Waste Management?
17. Understanding the CPCB EPR Portal (registration and login, consolidated from 2 near-duplicate list entries into one)
18. CPCB Authorized Recycler vs. Local Scrap Dealer: What's the Difference?
19. E-Waste Form 6 Explained
20. E-Waste Form 2 Explained
21. E-Waste Compliance Checklist for Kerala Businesses
22. Penalties for Illegal E-Waste Disposal in India (must cite real, sourced penalty structure — no estimated figures)
23. Battery Waste Management Rules in India

**Data destruction / ITAD** (only the genuinely novel angle):
24. DPDP Act 2023 and IT Asset Disposal: What Businesses Should Know (novel — matches the "e-waste security" GSC query signal, not covered by any existing page)

**Battery** (narrow, non-duplicate angles only):
25. Lithium Battery Disposal: A Safety Guide for Kerala
26. Laptop Battery Disposal: Common Mistakes to Avoid
27. Swollen or Damaged Battery: What to Do Immediately (expands the existing `/battery-recycling/` FAQ line into a dedicated safety guide)

**Other**:
28. Cable, Charger, and Accessory Recycling: What Happens to Them (the one non-template item from the excluded product-guide category)
29. E-Waste and ESG Reporting for Companies
30. Carbon Savings from E-Waste Recycling: How It's Actually Estimated (methodology transparency required — no fabricated percentages, unlike some industry sites' unsourced "70% resources saved" style claims)
31. E-Waste Statistics in India: What the Real Data Shows (must cite real published sources, e.g. CPCB annual reports — not estimate)
32. Critical Minerals and E-Waste Recycling: Why It Matters Now

### Note on the 5 titles flagged as a likely "Phase 2E starting point"

A follow-up message named 5 specific slugs as candidates for whichever future phase actually starts writing posts: `/blog/what-is-e-waste/`, `/blog/e-waste-examples/`, `/blog/e-waste-collection-near-me/`, `/blog/what-is-epr-in-e-waste/`, `/blog/e-waste-management-rules-2022/`. These map directly to items #1, #2, #7, #16, and #15 above — a reasonable, genuinely non-duplicate starting set if a content phase is opened. **Not built in this phase** — this remains planning only, per the user's explicit "fold into roadmap" decision, not "start publishing."
