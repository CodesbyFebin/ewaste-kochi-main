# Marketplace Listings Feature Roadmap

**Status: Phase 1 real backend built and verified (2026-07-07) — see `~/Desktop/ewaste-marketplace`. The Astro site itself is still untouched: no new pages, no API routes here, `/marketplace/` still shows only the existing static content.**

## Phase 1 — real listings API — COMPLETE (2026-07-07)

A new, separate sibling project, `~/Desktop/ewaste-marketplace` (FastAPI + SQLite, same proven pattern as `ewaste-swarm`), now has a real, verified listings backend:

- `POST /listings` — creates a real listing, persisted to SQLite, always starts `pending`.
- `GET /listings?status=approved` — the public feed; pending/rejected listings never appear here.
- `POST /listings/{id}/approve` / `/reject` — manual moderation actions (no auth yet, no UI yet — see the project's own README for the full "not built yet" list).
- **Real verification performed, not assumed**: created a listing, confirmed it was excluded from the approved feed pre-moderation, approved it, confirmed it then appeared, confirmed a 404 on approving a nonexistent ID, killed and restarted the server and confirmed the approved listing survived — real SQLite persistence, not in-memory state. Seed script posted 4 realistic test listings (real Kochi-area locations/categories/pricing, no marketing-style fabricated content) and approved 2, with the resulting `approved`/`pending` split confirmed via `GET`.
- Deliberately **not yet done**, per the "what a real version needs" list below: no connection from the real `/marketplace/` Astro page to this API, no moderation auth, no image upload, no WhatsApp handoff, no deployment. Each is its own next real step, not bundled into this one.

Full details: `~/Desktop/ewaste-marketplace/README.md`.

## Why this is worth scoping at all

`/marketplace/` is not a hypothetical page — it's real and already performing. Per the July 2026 Google Search Console export analyzed earlier this session: 48 clicks (#2 top-performing page on the whole site, after the homepage), +39 clicks month-over-month (#2 top-growing page). The current live page (`src/pages/marketplace/index.astro`) is static content — a service description and FAQ ("What's the difference between Marketplace and Sell Electronics?", valuation/payment/condition questions) — there are no real listings, no post-a-device flow, no browsing.

A reference file (`marketplace.html`, found alongside two other drafts — see below) sketched a much bigger version of this idea: a real two-sided buy/sell listings board with search, filters, a post-listing form, and WhatsApp handoff per listing. That's a legitimate feature gap worth scoping — the existing page's real traffic suggests real demand for exactly this kind of content — but the reference file itself can't be built as-is. Two separate problems, both worth naming precisely.

## Problem 1: the reference file's data is fabricated (same pattern as `recy.html`, flagged earlier)

`4.9★ Seller Rating`, `5,200+ Devices Sold`, `KSPCB Authorized Marketplace`, `Get 15–20% More Than Cashify` — none of these are real, sourced figures. The 12 seed listings (`Arun K.`, `Meena R.`, `Vijay S.`...) are entirely invented transactions presented as if real. None of this can carry over into anything built for real, per this project's standing anti-fabrication rule.

## Problem 2: the reference file's "backend" is not functionally real, even as a prototype

This is a code-level finding, not just a content one — worth flagging because it explains *why* a real version needs actual infrastructure, not a bigger version of the same trick. The file's persistence layer:

```js
async function saveListings(listings) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(listings), true);
  } catch(e) {
    localStorage.setItem(STORAGE_KEY + '-local', JSON.stringify(listings));
  }
}
```

`window.storage` is not a real browser API — there is no such global (browsers expose `localStorage`, `sessionStorage`, `indexedDB`; `window.storage` doesn't exist). So `window.storage.set(...)` always throws, and the code always falls through to the `localStorage` catch branch. `localStorage` is per-browser, per-device, never shared or sent anywhere. The practical result: every visitor would only ever see listings *they themselves* posted, in their own browser. Nobody else — not other visitors, not EwasteKochi staff — would ever see a listing anyone else posted. The "5,200+ devices sold" framing isn't just unverified marketing copy; the code as written could never have produced shared, cross-visitor data in the first place. This is the concrete reason a real version needs an actual backend, not a reason to distrust the *idea* of the feature.

## What's worth keeping — UI/UX structure only

The interaction design is genuinely solid and reusable, independent of the fabricated content or broken persistence:
- Type selector (Selling / Buying) with distinct form fields per type
- Filter bar: search + category pills (phone/laptop/tablet/server) + sort (newest/price/featured) + grid/list view toggle
- Listing card: category, title, spec tags, price, location, age ("2h ago"), WhatsApp CTA
- Post-listing modal: category/brand/condition selectors, price input, description, photo upload area
- The "free data wipe on every sold device" framing ties naturally into the real, already-existing `/data-destruction/` positioning elsewhere on the site — this is a genuinely good cross-sell idea, not fabrication, since data-wipe-before-resale is a real service EwasteKochi can actually offer.

## What a real version needs before any of this ships

1. **Real storage.** Astro on this project is a static site (deployed to Vercel) with no database today — this is different from `ewaste-swarm` (a separate FastAPI+SQLite project on a different domain, built for lead intake, not listings). A real marketplace needs its own real persistence: either Vercel serverless functions backed by a real Postgres instance (Supabase/Neon/Vercel Postgres), or a small dedicated service in the same spirit as `ewaste-swarm` — built incrementally, Phase-1-style (one real endpoint, real tests, real verification), not scaffolded all at once.
2. **Moderation before publish.** This is real money and real strangers meeting in person — a materially higher trust/scam risk than a lead-capture form. Listings should default to a pending/reviewed state before appearing publicly, not go live immediately on submission like the reference file does.
3. **Zero seed/fake listings.** The real page launches empty, or with real listings EwasteKochi has actually verified — never fabricated example data, even as a "starter" trick to make the page feel alive.
4. **No fabricated trust badges.** Any "verified seller," "KSPCB authorized," or rating claim must be removed unless it's genuinely true and checkable — consistent with the placeholder "documentation available on request" language already used elsewhere on the site pending real certificate numbers.
5. **Reuse the existing WhatsApp pattern**, not a new one — the site already has a working lead-funnel chatbot (`src/scripts/leadFunnelChatbot.ts`) with an established `wa.me` handoff pattern; a listing's "Contact seller" action should follow that same convention rather than inventing a parallel one.

## Explicitly not scoped here

- No pricing model for the site to take a cut/fee — not something to assume without the user confirming a real business model for this.
- No payment processing — the reference file's "Instant UPI Payment" claims imply EwasteKochi handles money, which is a much bigger regulatory/liability surface than a listings board. Contact happens via WhatsApp; payment happens between the two people, off-platform, exactly like OLX/Facebook Marketplace — unless the user explicitly wants to build a payments feature, which is a separate decision.
- No comparison-to-competitor claims ("15–20% more than Cashify") — unverifiable and not this project's style.

## Two other reference files reviewed alongside this one, deliberately not folded into any roadmap

`services.html` and `blog.html` were shared at the same time. Both use the real business phone (`+91 75005 55454`) and address (`710A Hill Palace Road, Thrippunithura`) — correct, unlike `recy.html` — but every URL they link to (`/itad-kochi`, `/data-destruction-kochi`, `/laptop-buyback-kochi`, a dozen `/blog/{slug}` articles, etc.) was checked against `data/urlInventory.json` and matches nothing that was ever actually live on the real site. Combined with fabricated stats (`5,000+ businesses served since 2020`, `2M+ KG recycled`, three named-but-invented customer testimonials, fixed per-device pricing that conflicts with this project's existing no-fixed-pricing stance), these read as drafts from the same source as the earlier-flagged `SWARM/` folder, chatbot zip, and AMP file — real contact details wrapped around fabricated everything else. Per this session's decision, these two are flagged only, not mined for structure — no roadmap entry, no content extraction.
