# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Two independent websites, each with its own Vercel project and deploy pipeline:

| Directory | Vercel Project | Domain | Purpose |
|-----------|---------------|--------|---------|
| `ewk-site/` | `ewaste-kochi-main` | `www.ewastekochi.com` | Main marketing site (static HTML) |
| `astro-site/` | `astro-site` | `www.ewastekochi.com/blog/` | Programmatic SEO blog (11K pages, Astro + SQLite) |

---

## ewk-site — Main Marketing Site

### Deployment
```bash
cd ewk-site
vercel --prod --yes
```
No build step. Static HTML files are deployed directly. Changes are live in ~45 seconds.

### Architecture

All pages share three global JavaScript files loaded at the bottom of every `<body>`:

```html
<script src="/shared.js"></script>
<script src="/ewaste-chatbot.js"></script>
<script src="/wa-funnel.js"></script>
```

**`shared.js`** — Single source of truth for header, footer, nav, business data (`SITE`, `NAV_LINKS`), and BreadcrumbList JSON-LD. Every page calls `renderHeader(activeLabel)` and `renderFooter()` to inject chrome into `#header-slot`/`#footer-slot` (root pages) or `#hdr`/`#ftr` (subdirectory pages — different slot IDs).

**`ewaste-chatbot.js`** — EcoBot v3. Full psychological lead funnel (yes-ladder → item picker → price reveal → contact capture → WhatsApp deep-link). Auto-opens at 5 s, desktop exit-intent on mouseleave. Uses `sessionStorage` key `ewk_v3` to prevent repeated auto-opens. All styling is self-contained via injected `<style>`. Page-context detection via `window.location.pathname`.

**`wa-funnel.js`** — Secondary layer: exit-intent modal popup (desktop: mouseleave, mobile: 30 s timeout) and mobile sticky call/WhatsApp bar at `bottom:0`. The chatbot FAB is positioned at `bottom:64px` on mobile specifically to clear this bar.

**`ewaste-seo.js`** — Comprehensive schema injection engine (LocalBusiness, FAQPage, Service, AggregateRating, WebSite SearchAction). Exists in the repo but is **not currently loaded** on any page — schema is pre-baked statically into each HTML file's `<head>` instead.

**`location-page.js`** — Dynamic renderer used only for location pages that are not pre-built (contains `LOCATION_PAGES` config and `renderLocationPage(key)`). Pre-built location HTML files do not load this script.

### Page Structure

```
ewk-site/
├── index.html, about.html, contact.html …   # Root service pages
├── blog/                                     # 36 static blog posts
├── locations/                                # 32 pre-built location pages
├── services/                                 # 4 service sub-pages
├── b/index.html                              # A/B test variant (noindex)
├── shared.js                                 # Header/footer/nav (edit here for global nav changes)
├── ewaste-chatbot.js                         # EcoBot v3 lead funnel
├── wa-funnel.js                              # Exit-intent popup + mobile CTA bar
├── style.css                                 # Global styles
└── vercel.json                               # Redirects, headers, cache rules
```

### Critical Invariants

- **Every HTML file must load all three scripts** (`shared.js`, `ewaste-chatbot.js`, `wa-funnel.js`) before `</body>`. Missing any one breaks the chatbot funnel or mobile CTA bar.
- **Slot IDs differ by depth**: root pages use `id="header-slot"` / `id="footer-slot"`; subdirectory pages (`/blog/`, `/locations/`, `/services/`) use `id="hdr"` / `id="ftr"`.
- **robots.txt is manually maintained** — `scripts/06-build-sitemaps.py` was explicitly patched to NOT regenerate it. Edit `ewk-site/robots.txt` directly.
- **`ewk-site/.env.local` contains live Vercel tokens** — never commit changes to this file.
- **Both `sitemap_index.xml` and `sitemap-index.xml`** must stay byte-identical in `astro-site/public/`. The build script writes both.

### Adding a New Page

1. Copy the nearest equivalent HTML file.
2. Update `<title>`, `<meta name="description">`, `<link rel="canonical">`, OG tags.
3. Confirm the three script tags are present before `</body>`.
4. Add the URL to `ewk-site/sitemap.xml`.
5. Add a redirect in `ewk-site/vercel.json` if replacing an old URL.

---

## astro-site — pSEO Blog (11K pages)

### Deployment
```bash
# Full pipeline (run from repo root)
python3 scripts/05-generate-blogs.py   # regenerates SQLite DB from CSVs
python3 scripts/06-build-sitemaps.py   # writes sitemap-1.xml … sitemap-11.xml + both index variants
cd astro-site && npm run build         # astro check + astro build
vercel --prod --yes                    # deploy
```

Or via the convenience script (requires `VERCEL_TOKEN` env var):
```bash
bash scripts/deploy.sh
```

### Architecture

- **Routes**: `src/pages/blog/[pillar]/[category]/[slug].astro` — SSR on demand (`prerender = false`), Node.js runtime, `better-sqlite3` for DB lookups. Routes are cached at CDN for 1 year with `stale-while-revalidate`.
- **Database**: `src/data/content.db` (SQLite, ~11K rows). Schema: `blogs(pillar, category, slug, title, excerpt, keywords, content)`. The DB is bundled into the Vercel function via `includeFiles` in `astro.config.mjs`.
- **Missing pages**: Return `new Response(null, { status: 404 })` — never `Astro.redirect('/404')` which produces a 302.
- **Node version**: `astro-site/vercel.json` pins `"nodeVersion": "20"`. Do not remove — Vercel deprecated Node 18 and the Astro adapter defaults to it.

### Content Generation

Pillar MDX pages live in `content/pillars/`. Ten corporate pillar pages are auto-generated by `generate-pillars.js`. Five residential pillar pages (`sell-old-electronics-kochi.mdx`, `e-waste-price-list-kochi.mdx`, `old-tv-disposal-kochi.mdx`, `ewaste-pickup-kochi.mdx`, `electronics-recycling-center-kochi.mdx`) are hand-crafted — marked `customContent: true` in `generate-pillars.js` so the script skips them.

---

## Business Context

- **Phone / WA**: `917500555454` (with country code, no `+`)
- **Canonical domain**: always `https://www.ewastekochi.com` (www). Bare domain `ewastekochi.com` 301-redirects via `vercel.json` in both projects.
- **`ewaste-kochi-pseo.vercel.app`** is a stale staging URL — all sitemap and canonical references must use the production domain.
