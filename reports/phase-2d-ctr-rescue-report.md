# Phase 2D — CTR Rescue on Existing Ranking Pages

Date: 2026-07-07
Status: **Complete.** Build green, validation green (162/162 checks), 38 pages (no change), no deploy performed.

## Scope discipline confirmed

No new pages, no new routes, no sitemap count change, no content-index count change. Every change in this phase is an edit to an already-built page.

## Target queries (from Phase 2C's `google-trends-keyword-validation.md`)

| Query | Impressions | Position | Clicks |
|---|---|---|---|
| where to recycle old electronics | 2,353 | 3.87 | 0 |
| where to donate electronics | 2,303 | 3.86 | 0 |
| where to recycle batteries | 1,655 | 3.73 | 0 |

## Task 1 — Likely ranking pages (inferred, per instruction fallback)

No query-to-page dimension was available in the GSC export (Queries.csv and Pages.csv are separate reports without a linking key), so pages were inferred cautiously from the route registry and content, exactly as the phase instructions anticipated as the fallback:

- "where to recycle old electronics" → `/recycling/`
- "where to donate electronics" → `/recycling/` (handled as a section within the recycling page — see Task 4, not a separate donation page)
- "where to recycle batteries" → `/battery-recycling/`

## Task 2 — Title/meta changes

| Page | Before | After |
|---|---|---|
| `/recycling/` title | "E-Waste Recycling in Kochi \| Safe Electronics Disposal" | "Where to Recycle Old Electronics in Kochi \| Free Pickup" |
| `/recycling/` meta | "Recycle laptops, desktops, monitors, printers, and IT hardware in Kochi with free doorstep pickup. Compliant disposal, data wiped first." | "Recycle old electronics in Kochi with free doorstep pickup — laptops, desktops, monitors, printers and more. Data wiped first, no drop-off needed." |
| `/battery-recycling/` title | "Battery Recycling in Kochi \| UPS, Inverter, Laptop & Phone" | "Where to Recycle Batteries in Kochi \| Free Doorstep Pickup" |
| `/battery-recycling/` meta | "Safe battery recycling in Kochi for UPS, inverter, laptop, and phone batteries. Free doorstep collection, compliant disposal, no landfill dumping." | "Recycle UPS, inverter, laptop, and phone batteries in Kochi with free doorstep pickup. Safe, compliant disposal — batteries should never go in household trash." |

Both new titles mirror the exact "where to X" query phrasing while keeping the primary keyword, Kochi/Kerala relevance, and a clear benefit (free pickup). `src/data/routes.ts` was updated to match, so `content-index.json`, `content-index.xml`, and `ai-sitemap.xml` all reflect the new titles too — not just the rendered page.

## Task 3 — Answer-first blocks

Both pages' H1 and lede paragraph were rewritten to open with a direct answer matching the query phrasing:

- `/recycling/`: "You can recycle old electronics in Kochi through Ewaste Kochi's free doorstep pickup — no need to find a drop-off point. We collect laptops, desktops, monitors, printers, and general IT hardware directly from your home or office, wipe any stored data first, and recycle everything through compliant channels." (48 words)
- `/battery-recycling/`: "You can recycle batteries in Kochi through Ewaste Kochi's free doorstep pickup — UPS, inverter, laptop, and phone batteries all qualify. Battery handling depends on chemistry, condition, and quantity, so we collect directly from your home or office and route everything through compliant recycling, never household trash." (47 words)

Both include one CTA (the existing `CtaBar` component directly below) and both link to `/pickup/`-adjacent action implicitly through that CTA.

## Task 4 — Donation query handling

Added a new "Donating vs. recycling" section to `/recycling/`, using the exact safe wording specified in the phase instructions, verbatim: *"Some working electronics may be reusable or resellable after inspection. If you want to donate electronics, confirm whether the recipient can actually use them safely and remove personal data first. We can help with resale, recycling, or responsible disposal when donation isn't a good fit for a particular device."* No donation/NGO pathway is claimed or implied. No separate donation service page was created, per instruction.

## Task 5 — Battery query handling

The requested safe wording — *"Battery handling depends on chemistry, condition and quantity. Damaged, swollen or leaking batteries should not be stored with regular household waste."* — was split across two spots for natural flow: the "depends on chemistry, condition, and quantity" phrase opens the new answer-first lede (Task 3), and "damaged, swollen, or leaking batteries should not be stored with regular household waste" now opens the existing "Why batteries can't just go in the trash" section. No deposit/exchange scheme is claimed.

## Task 6 — FAQ additions

Per the instruction's own "avoid duplicate FAQ text across pages" rule, each of the 5 suggested FAQ questions was checked against existing FAQ content first:

| Suggested question | Status |
|---|---|
| Where can I recycle old electronics in Kochi? | **Already exists** on `/recycling/` — no action, would have been a literal duplicate |
| Can I donate old electronics instead of recycling them? | **Added** to `/recycling/` (new) |
| Where can I recycle batteries safely? | **Already exists in substance** on `/battery-recycling/` as "Where can I recycle batteries in Kochi?" plus a dedicated damaged/swollen-battery safety FAQ — no action |
| Do you collect batteries during e-waste pickup? | **Already exists in substance** on both `/recycling/` ("Can batteries be mixed with electronics for pickup?") and `/battery-recycling/` ("Can I combine battery pickup with general e-waste pickup?") — no action |
| What should I do before giving old electronics for recycling? | **Added** to `/recycling/` (new) |

Net result: 2 new FAQ entries added (not 5), because 3 of the 5 were already answered — adding them again would have created same-page duplicate FAQ content, which the instructions themselves warned against.

## Task 7 — Internal linking

| Link | Anchor text | Status |
|---|---|---|
| Homepage → `/recycling/` | "where to recycle old electronics" | Added |
| `/recycling/` → `/battery-recycling/` | "where to recycle batteries" | Updated (previous anchor was generic "battery recycling") |
| `/sell-electronics/` → `/recycling/` | "donate, sell or recycle old electronics" | Added |
| `/pickup/` → `/battery-recycling/` | "batteries" | Added — this was a genuine gap; `/pickup/` didn't link to `/battery-recycling/` at all before this phase |
| `/faq/` → `/recycling/` and `/battery-recycling/` | "where to recycle old electronics" / "where to recycle batteries" | Added |

**Note on FAQ component**: `/faq/`'s FAQ answers render as plain text (Astro auto-escapes `{item.a}`, confirmed by reading `Faq.astro` — no `set:html`), so existing "See our X page" mentions site-wide are not clickable links. Rather than modify the shared component (out of scope, wider blast radius than this phase), the two requested links were added as real anchors in `/faq/`'s intro paragraph instead.

## Anti-fabrication compliance

No fake claims, no guaranteed prices, no unsupported donation program, no unsupported battery deposit scheme, no new/changed certification claims. The existing ISO 14001:2015 / Pollution Control Board language on `/recycling/` was left untouched (already-established carried-forward claims from the live site, not something introduced this phase).

## Validation

```
npx astro check   → 0 errors, 0 warnings, 0 hints (63 files)
npx astro build   → 38 pages built (unchanged)
npm run validate  → 162 checks passed, 0 failures (unchanged count — no new routes)
```

Manual checks: full href-sweep (0 dangling links, all 38 pages still linked), duplicate-title check (both new titles confirmed unique across the site), live `astro preview` crawl of all 6 touched pages → all 200.

## Not done in this phase (explicitly out of scope)

- No new pages or blog posts.
- No changes to route count, sitemap count, or content-index count.
- No action on the "100 blog posts" plan received alongside this phase's instructions — see `PROJECT_TRACKER.md` "Known Risks" for why, and the chat response for the direct explanation given to the user.
- No deployment.
