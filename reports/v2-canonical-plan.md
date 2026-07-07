# V2 Canonical Plan — Phase 2 (draft)

## Rule implementation

Every route in the Astro build emits, via a shared `<BaseHead>` component (see Phase 3/4 scaffold):

```html
<link rel="canonical" href="https://www.ewastekochi.com{Astro.url.pathname}" />
<meta property="og:url" content="https://www.ewastekochi.com{Astro.url.pathname}" />
```

Self-canonical is the default for every page. Pages never canonical to a parent hub (no page canonicals to `/services/` or `/locations/`), matching mission rules #13–15.

## Confirmed 1:1 canonical mappings (safe to hardcode now)

| Canonical | Notes |
|---|---|
| `/battery-recycling/` | `/services/battery-recycling-kochi/` 301s here — confirmed correct live |
| `/data-destruction/` | `/services/data-destruction-kochi/` 301s here — confirmed correct live |
| `/itad/` | `/services/itad-kochi/` 301s here — confirmed correct live |
| `/hard-drive-shredding/` | Physical shredding — differentiated from degaussing and data-destruction |
| `/services/hard-drive-degaussing-kochi/` | Distinct method, self-canonical, not merged into hard-drive-shredding |
| `/recycling/` | **RESOLVED 2026-07-07** — GSC-confirmed winner of Finding D1 (72 vs 2 clicks). `/services/e-waste-recycling-kochi/` now redirects straight here. |
| `/data-destruction/` | Also confirmed the winner of Finding D2 over `/data-destruction-services-kochi/` (5 vs 0 clicks) |
| `/e-waste-scrap-prices-kochi/` | Confirmed winner of Finding D3 over `/scrap-price/` (3 vs 0 clicks) — matches the original brief's money-page list |

## Canonical decisions — RESOLVED 2026-07-07 with real GSC data

All 7 originally-contested pairs (D1–D5 plus the ernakulam and kalamassery location pairs) are now resolved with real clicks/impressions data. Full numbers and methodology in `reports/v2-gsc-data-analysis.md`; per-page detail in `data/urlInventory.json`. Winners: `/recycling/`, `/data-destruction/`, `/e-waste-scrap-prices-kochi/`, `/blog/free-e-waste-pickup-kochi/`, `/blog/sell-old-laptop-kochi/`, `/locations/ernakulam-south/`, `/locations/kalamassery/`. Losing pages get a 301 to the winner — implemented in `vercel.json` wherever the winner's page already exists in V2 (2 of 7 so far: recycling, data-destruction), held for the rest until their target page is built (see redirect plan section 7).

Two items remain genuinely undecided: `/pricing/` and `/e-waste-collection-kochi/` had zero clicks *and* zero impressions in the GSC export — not evidence of a winner either way, just no data yet. Left as `manual-review`, low priority.

**Interim-build policy note (still in effect for future contested pairs):** when a new pair is found manual-review, don't build both sides speculatively — wait for data, because writing content for a side that later loses just recreates duplicate content inside the new codebase.

## hreflang plan (English/Malayalam)

```html
<link rel="alternate" hreflang="en-IN" href="https://www.ewastekochi.com/recycling/" />
<link rel="alternate" hreflang="ml-IN" href="https://www.ewastekochi.com/ml/recycling/" />
<link rel="alternate" hreflang="x-default" href="https://www.ewastekochi.com/recycling/" />
```

Emitted only on pages that have a real, complete Malayalam counterpart under `/ml/`. Until Malayalam content exists (Phase 6), English pages emit no hreflang block at all rather than a broken/half pair — per mission rule against incomplete bilingual canonical setups.

## Non-www / robots.txt discipline

`/ml/` will **not** carry forward the blanket robots.txt disallow found on the live site — that rule currently blocks a path that returns 404 today, but V2 needs `/ml/` pages to be crawlable once real (non-machine-translated) Malayalam content ships. See `v2-initial-repo-audit.md` for the live-site finding this reverses.
