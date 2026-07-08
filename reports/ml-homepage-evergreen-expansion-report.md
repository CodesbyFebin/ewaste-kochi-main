# Malayalam Homepage Evergreen Expansion Report

Date: 2026-07-08
Status: **Complete.** Build clean, validation clean, no production deploy.

## Why this phase

Follow-on to the English homepage evergreen expansion (`reports/homepage-evergreen-expansion-report.md`). The user shared a screenshot of the current live production Malayalam-style homepage — a visually rich, icon/stock-photo-heavy design (illustrated hero graphic, 18-icon item grid, family/businessman stock photos, colored badge cards) — and asked to build the `/ml/` page.

Asked the user to choose a direction before writing content, since the screenshot's visual language is a real departure from every other V2 page (plain text/card system, one hero photo, no icons or stock photography): **match V2's existing design system** (chosen) vs. replicate the screenshot's icon/photo-heavy layout. The user also confirmed the screenshot is the current live production homepage. Given the chosen direction, this phase translates the newly-expanded English homepage's content and structure into Malayalam using the exact same components and CSS already built — no new images, icons, or stock photos.

## What changed

`src/pages/ml/index.astro` — previously a short 3-section page (hero-less, plain `CtaBar`, 5-card service grid, one coverage paragraph, 4-question FAQ) — rebuilt to mirror the English homepage's 14-section structure exactly, translated:

1. Hero (photo hero, 3 CTAs, 4-item trust strip — same safe wording as English: "Kochi-metro pickup," "WhatsApp-first," "Home & business," "Data destruction documentation available," not the old page's stronger claims).
2. Quick-answer block ("കൊച്ചിയിൽ പഴയ ഇലക്ട്രോണിക്സ് എവിടെ റീസൈക്കിൾ ചെയ്യാം?").
3. 3 persona intent cards + 7-card services grid (10 links total, matching English).
4. 6-step "how it works" process.
5. 18-item "what we collect" grid.
6. Home/business/data-bearing-devices 3-card section.
7. Kochi-locations section — cards link only to the 3 real location pages (Kakkanad, Kalamassery, Ernakulam South); Aluva/Edappally/Vyttila/Kadavanthra/Infopark mentioned as plain text only.
8. Why responsible recycling matters.
9. Data destruction & business ITAD.
10. Battery recycling safety.
11. Buy/sell/marketplace (same "price estimate after inspection" safe wording as English — no guaranteed pricing).
12. 5-row comparison table.
13. FAQ expanded from 4 to 16 questions.
14. Final CTA band.

**Old page's overclaiming language removed**: the previous `/ml/` copy said "30+ പ്രദേശങ്ങൾ" (30+ areas) and "കേരളത്തിലുടനീളം വിശാലമായ കവറേജ്" (wide coverage across Kerala) — replaced with the same safe, Kochi-metro-scoped wording used on the English homepage.

`src/data/routes.ts` — `/ml/` entry's `title`/`description` synced to the new page.

## Cross-language linking (deliberate, matches existing precedent)

Only 6 Malayalam sub-pages exist (`pickup`, `recycling`, `data-destruction`, `battery-recycling`, `sell-electronics`, `contact`). Content links to those use their `/ml/` URLs. Everything else the homepage needed to link (marketplace, ITAD, hard-drive-shredding, scrap-price guide, electronics-recycling-near-me, locations index + the 3 location pages, certificate sample) has no Malayalam translation yet, so those links point to the English URL directly — the same pattern already established in the pre-existing `ml/recycling` page (which links to `/locations/` in English). No links to unbuilt pages were created.

## Schema

`WebPage` + `Service` (both already the established pattern for this page) + `BreadcrumbList` (auto-emitted by `Breadcrumbs.astro`, required by the validator for every non-homepage route) + `FAQPage` (auto-emitted by `Faq.astro`). 4 blocks total, matching the pattern already used on other inner pages. No Organization/LocalBusiness/WebSite redefinition — those stay defined once on the canonical English `/` page, consistent with how this page worked before.

## Validation

| Check | Result |
| --- | --- |
| `npm run check` (astro check) | 1 error — in `src/data/blogClusters.ts`, an **untracked, orphaned file** (`git status` shows `??`) that nothing in the codebase imports. Unrelated to this change; matches the Phase 2K-documented pattern of another tool writing files directly into the project root. Not fixed (out of scope, not this session's file). |
| `npm run validate` (build + `scripts/validate-seo-v2.ts`) | **469/469 checks passed**, 0 failures |
| Banned-phrase sweep | 0 matches |
| Named-institution sweep | 0 matches |
| H1 count | 1 |
| JSON-LD blocks | 4: Service, WebPage, BreadcrumbList, FAQPage — all parse |
| hreflang parity | `/` and `/ml/` both emit correct en-IN / ml-IN / x-default triples pointing at each other |
| Internal link sweep (main content only, header/footer excluded) | All `/ml/`-prefixed links point to the 6 real Malayalam pages; all other links correctly fall back to real English pages; 0 dangling links |
| Live Chromium (Playwright, headless Chrome for Testing 149) — desktop 1440px + mobile 390px | Correct `<title>`, `lang="ml"`, 1 H1, 0 console errors, no horizontal overflow on mobile |

## Not done in this phase

- Malayalam translation not native-speaker reviewed — same caveat already on record in `PROJECT_TRACKER.md` for all existing Malayalam content.
- The 6 already-built `/ml/` sub-pages (pickup, recycling, etc.) were not touched or re-audited for the same safe-wording pass (e.g. `ml/recycling` still has old "20+ areas" / ISO-compliance wording) — flagged as a follow-up, not actioned.
- Not deployed.
