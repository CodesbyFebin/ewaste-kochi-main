# V2 Initial Repo Audit — Phase 0

Date: 2026-07-07

## Repo state at mission start

This directory (`/Users/cyberteck/Desktop/EwasteKochi`) contained **no code, no git history, and no build config** — only an empty `.kilocode/` folder. There is no existing codebase to back up, refactor, or migrate from. This is a mismatch with the mission's assumption of an existing repo to audit.

**Decision (user-confirmed):** Build V2 fresh in this directory. Treat the live production site at `https://www.ewastekochi.com` as a read-only reference, discovered via crawling (robots.txt, sitemap.xml, direct HTTP checks), not via source access. Tech stack: **Astro**.

No backup step was needed (nothing existed to back up). Backup/rollback safety net for this project is: nothing goes live until the user reviews and deploys it themselves.

## Live site findings (crawled 2026-07-07)

### Hosting / stack signals
- `server: Vercel` — site is deployed on Vercel. No generator meta tag found; framework can't be confirmed from the outside (could be Next.js, Astro, or custom). Doesn't matter for V2 — we're rebuilding fresh.
- CSP header is already fairly strict (`default-src 'self'`, `frame-src 'none'`, `object-src 'none'`, `form-action 'self' https://wa.me`) — good baseline to match or exceed in V2.
- HSTS present (`max-age=63072000; includeSubDomains; preload`) — carry this forward.

### Canonical host / protocol behavior
| Check | Result |
|---|---|
| `http://ewastekochi.com/` | 308 → `https://ewastekochi.com/` (upgrades scheme, **stays non-www** — this is a 2-hop chain, see below) |
| `https://ewastekochi.com/` | 308 → `https://www.ewastekochi.com/` |
| `http://www.ewastekochi.com/` | 308 → `https://www.ewastekochi.com/` |
| `/recycling` (no slash) | 308 → `/recycling/` |

**Finding R1 (minor):** `http://ewastekochi.com/` takes **2 redirect hops** to reach the canonical host (`http` non-www → `https` non-www → `https` www) instead of 1. Not harmful, but V2 should collapse this to a single 301/308 hop directly to `https://www.ewastekochi.com/`.

### Existing duplicate/canonical issues confirmed live (not hypothetical)

**Finding D1 — `/recycling/` vs `/e-waste-recycling/` conflict.** The mission brief assumed `/recycling/` was the sole canonical and that `/services/e-waste-recycling-kochi/` redirects to it. In reality, `/services/e-waste-recycling-kochi/` (308) redirects to **`/e-waste-recycling/`**, a separate live, self-canonical, sitemap-indexed page — while `/recycling/` also exists as its own live, self-canonical, sitemap-indexed page. That's two competing canonical hubs for the same intent already indexed. **Needs GSC data to decide which has real clicks/impressions before consolidating** — flagged as manual-review, not auto-resolved.

**Finding D2 — `/data-destruction/` vs `/data-destruction-services-kochi/`.** `/services/data-destruction-kochi/` correctly 308s to `/data-destruction/` (matches mission plan), but `/data-destruction-services-kochi/` is a *separate* live, self-canonical, sitemap-indexed page not accounted for by that redirect. Same pattern as D1 — likely cannibalization, flagged manual-review.

**Finding D3 — `/scrap-price/` vs `/e-waste-scrap-prices-kochi/`.** Both live (200), both in sitemap, both self-canonical (title check pending). Same intent ("scrap prices Kochi"). Flagged manual-review.

**Finding D4 — Blog/top-level cannibalization pair: "free e-waste pickup".** Both live and self-canonical:
- `/free-e-waste-pickup-kochi/` — title: "Free E-Waste Pickup in Kochi \| Same-Day Doorstep Collection"
- `/blog/free-e-waste-pickup-kochi/` — title: "Free E-Waste Pickup in Kochi 2026 – Home & Office Collection"

Same slug, same core intent, different content type (service page vs. blog guide). Real keyword cannibalization. Flagged manual-review — needs GSC to see which one (if either) currently earns clicks before deciding merge direction.

**Finding D5 — Blog/blog cannibalization pair: "sell old laptop kochi".** Both live, self-canonical:
- `/blog/sell-old-laptop-kochi/` — "Sell Old Laptop in Kochi 2026 – Complete Guide"
- `/blog/sell-old-laptop-kochi-best-price/` — "How to Sell Old Laptop in Kochi – Best Scrap Prices 2025"

Same pattern as D4. Flagged manual-review.

**Finding D6 — service-duplicate redirects already implemented correctly** for battery recycling and ITAD:
- `/services/battery-recycling-kochi/` → `/battery-recycling/` ✅ matches mission plan
- `/services/itad-kochi/` → `/itad/` ✅ matches mission plan

These need no further action in the redirect layer, just confirm V2 preserves them.

### Broken/legacy paths (already dead or half-migrated)

| Path | Status | Notes |
|---|---|---|
| `/buyback/laptops/` | 404 | Dead. Disallowed in robots.txt as a leftover; harmless, no redirect needed since nothing is there to preserve equity from (verify no backlinks before finalizing 410 vs leave-404). |
| `/comparisons/` | 404 | Dead, same as above. |
| `/locations/ewaste-kochi/` | 404 | Dead legacy pattern referenced in robots.txt disallow rule; nothing live to migrate. |
| `/privacy-policy/` | 404 | Good — old duplicate already gone, current is `/privacy/`. No action needed. |
| `/blogs/` | 404 | The `/blogs/` duplicate path the mission worried about doesn't exist on production. No action needed. |
| `/locations/v2/kakkanad/` | 308 → `/locations/v2/` | **Finding R2:** this redirects to a *parent* path that is itself disallowed in robots.txt (dead-end legacy tree), instead of forward to `/locations/kakkanad/`. Sloppy but low priority — it's already blocked from crawling. Clean up opportunistically, not urgent. |
| `/ml/` | 404 (root) | Malayalam tree does not currently resolve at root. robots.txt disallows `/ml/` as a blanket rule (legacy), but the mission wants a *new*, indexable `/ml/` tree in V2 for bilingual support. **Action: V2's robots.txt must not carry forward a blanket `/ml/` disallow**, since that would block the very Malayalam pages this mission requires to be indexable. |

### Broken infrastructure

**Finding B1 (real bug) — `sitemap-index.xml` infinite redirect loop.** robots.txt references three sitemaps: `sitemap.xml`, `sitemap-index.xml`, `sitemap-images.xml`. `sitemap.xml` and `sitemap-images.xml` both return 200 with valid content. **`sitemap-index.xml` returns a Vercel edge "INFINITE_LOOP_DETECTED" error** — a broken redirect loop, currently referenced from robots.txt and presumably submitted to Search Console. This actively wastes crawl budget and may cause Search Console sitemap errors right now. V2 must ship a single, non-looping sitemap index and the old broken URL should not be relied upon.

**Finding B2 — `llms.txt` already exists (200)** and `sitemap-images.xml` exists (200) on the live site. `ai-sitemap.xml` does not exist yet (404) — net new in V2.

### Sitemap contents (as crawled, `sitemap.xml`)

~103 URLs total: homepage, ~14 core/service pages, ~35 blog posts, 30 location pages (matches mission's list closely, plus a few extra: `ernakulam` (non-suffixed), `kalady`, and missing a few the mission listed like `kollam`/`kottayam`/etc. which are actually present — full list saved to `data/urlInventory.json`). Notably **absent from mission's assumed list but present live**: `/why-choose-us/`, `/pricing/`, `/e-waste-collection-kochi/`, `/blog/e-waste-recycling-process-india/`, `/blog/e-waste-rules-india-2024/`, `/blog/benefits-ewaste-recycling/`. These are real, currently-indexable pages the mission brief didn't anticipate — added to inventory as manual-review/keep candidates.

Robots.txt also disallows legacy `/comparisons/`, `/buyback/laptops/`, `/locations/ewaste-*`, `/locations/v2/*` — consistent with the dead paths found above.

## What this means for phasing

Per the mission's own rule ("do not remove any URL with clicks/impressions without mapping," "any URL with impressions but unclear intent → manual review"), **findings D1–D5 cannot be safely auto-resolved without GSC data**, which the user has committed to exporting but has not yet provided. Until then:

- These 5 pairs are marked `manual-review` in the URL inventory, not auto-redirected.
- All other classification (money pages, location pages, retained blog posts) proceeds by content-quality/business-value judgment as agreed.
- Trust/certification pages will use placeholder "documentation available on request" language until the user provides real ISO/CPCB/KSPCB numbers (also committed, not yet provided).

## Acceptance criteria check (Phase 0)

- [x] Repository structure understood (confirmed empty; live site crawled as substitute source of truth)
- [x] Backup — N/A, nothing existed to back up
- [x] Reports folder exists
- [x] Tracker created (see `/PROJECT_TRACKER.md`)
- [x] No production route deleted (nothing exists locally to delete; live site untouched — this is a local build only)
