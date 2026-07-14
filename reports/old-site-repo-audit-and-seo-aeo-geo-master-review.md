# Old Production Repo Audit (`CodesbyFebin/ewaste-kochi-main`) + SEO/AEO/GEO Master Review

Date: 2026-07-15
Scope: Full clone and read of the repo currently live at `www.ewastekochi.com` (the site the pending V2 cutover would replace), plus forward-looking SEO/AEO/GEO recommendations for the V2 build.

## What's actually in this repo

It's **two independent live websites sharing one domain**, per its own `CLAUDE.md`:

| Directory | Vercel project | Serves | What it is |
| --- | --- | --- | --- |
| `ewk-site/` | `ewaste-kochi-main` | `www.ewastekochi.com` | Static HTML, no build step |
| `astro-site/` | `astro-site` (→ `astro-site-dusky.vercel.app`) | `www.ewastekochi.com/blog/{itad,recycling,data-destruction,collection}/*` via rewrite proxy | SSR Astro + SQLite, 10,980 programmatic pages |

The split is invisible at the DNS/domain level — `ewaste-kochi-main` owns the whole domain outright. The routing is done entirely by 25 `rewrites` in `ewk-site/vercel.json` that proxy 4 specific path prefixes to the separate `astro-site` deployment. **This confirms something important for the pending cutover: since that rewrite config lives inside the exact repo I'm about to replace, deploying the V2 build's own `vercel.json` (no such rewrites) will correctly retire this proxy setup on its own** — no separate action needed against the `astro-site` project itself.

This also explains the earlier 404 outage precisely: `ewk-site` genuinely has "no build step" (per its own `CLAUDE.md`) — static HTML files sit directly in the repo root and get deployed as-is. `Output Directory: .` was *correct* for this codebase. It's simply wrong for Astro, which is exactly the mismatch the `vercel.json` fix addresses.

## Severe findings on the currently-live site

**The live homepage right now serves a fabricated `AggregateRating` schema**: `ratingValue: "4.9"`, `reviewCount: "500"`, baked directly into `index.html`'s JSON-LD (not loaded via the separate `ewaste-seo.js`, which is confirmed unused — 0 pages load it). This is a real, live, structured-data fabrication actively being served to Google and every crawler right now. It's the exact pattern this V2 project rejected in its very first working session (a "4.9/5 | 1000+ Happy Customers" claim was the first thing ever flagged and refused).

Also present in the same live schema block: `GeoCoordinates`, `SearchAction`, and `EducationalOccupationalCredential` entries — all either fabricated or unverifiable, all patterns this V2 rebuild has deliberately avoided throughout.

**The 10,980-row pSEO database bakes an unqualified compliance claim into every single page.** Sampled two rows directly:

> "Ewaste Kochi is a CPCB-authorized e-waste recycling company serving enterprise-grade IT environments across Kaloor and all of Kerala."
> "Ewaste Kochi is a CPCB-authorized e-waste recycling company serving enterprise-grade IT environments across Aluva and all of Kerala."

Same template, city swapped (Kaloor → Aluva), same flat "IS CPCB-authorized" claim stated as fact with zero hedging — worse than anything found in the V2 codebase's own pre-launch claim patch (which only ever *implied* alignment/authorization and was still deemed unsafe enough to fix on 5 pages). This exact claim is now baked into all 10,980 rows (2,745 × 4 pillars: itad, recycling, data-destruction, collection).

**All 21 of `ewk-site`'s root marketing pages** (`index.html`, `about.html`, `contact.html`, `services.html`, `pricing.html`, etc.) matched the same forbidden-claims sweep used throughout this V2 project (instant cash/payment, "Kerala's most trusted", fake ratings, government-authorization claims) — this isn't a page or two, it's essentially the whole site.

**Redundant, possibly-dead duplicate content**: `ewk-site/blog/{itad,recycling,data-destruction,collection}/` contains ~11,017 static HTML files that structurally mirror the same 4 pillars as the SQLite pSEO system — but those exact paths are intercepted by the rewrite proxy before ever reaching them, so these files may be entirely unreachable dead weight (or a stale earlier export from before the SSR+SQLite approach existed). Either way, it's a second, redundant copy of the same doorway-page content sitting in the repo.

## What this means for the pending cutover

This strengthens the case for completing it, not just technically but urgently: the live site is currently carrying real risk — Google actively suppresses/penalizes fabricated review schema, and 10,980 pages making an unqualified regulatory-authorization claim is a real liability, not just a content-quality issue. Every day this stays live is exposure, independent of anything about the V2 rebuild's own readiness.

One practical heads-up for **after** a successful cutover: `astro-site` currently generates and presumably has submitted its own sitemaps (`sitemap-1.xml` … `sitemap-11.xml`, both `sitemap-index.xml` and `sitemap_index.xml` variants) covering ~11K URLs. Once cutover succeeds, Search Console will likely show a wave of those URLs disappearing/erroring over the following weeks. That's expected and correct — not a regression to chase — but worth recognizing in GSC data rather than reading it as a problem.

## SEO / AEO / GEO master review — for the V2 build going forward

Framed honestly: the old site is being retired specifically because it violates nearly every principle below. The V2 build already does most of this correctly; this is what's already right, and what's still worth adding.

### Already correct in V2 (verified this session, not assumed)
- **No fabricated trust signals** — no `AggregateRating`, no `Review`, no `SearchAction`, no fake `GeoCoordinates` anywhere (confirmed via repeated schema sweeps this session).
- **Compliance claims hedged, not asserted** — the exact opposite of the old site's flat "IS CPCB-authorized" claims; V2 uses "documentation support may be available depending on the service type," verified/softened across all 5 pages that had this risk.
- **Content depth over template-swapping** — the V2 audit this session caught and quarantined 465 mass-generated posts specifically because they weren't unique enough, even though they were nowhere near as thin as the old site's city-swapped pSEO template. That bar is much higher than what's currently live.
- **AEO fundamentals already in place**: "Quick answer"/"Direct answer" boxes near the top of pillar pages, `FAQPage` schema verified to match visible FAQs exactly (not just assumed), `HowTo` schema only where genuine step-by-step processes exist and schema-to-visible-content matches exactly.
- **GEO fundamentals already in place**: `llms.txt` (a genuinely forward-looking practice most sites don't have at all), `content-index.json/.xml`, `ai-sitemap.xml` — all real, all accurate, all kept in sync with actual site state (caught and fixed drift in `llms.txt` earlier this session rather than letting it go stale).

### Worth adding once real data exists (not now — don't fabricate to fill these)
- **Real reviews, once genuinely collected** — with honestly-sourced `Review`/`AggregateRating` schema. The gap here isn't "add schema," it's "the business doesn't have verified review data yet" — filling the schema before the data exists is exactly the old site's mistake.
- **Real certificate numbers** once provided (already tracked in `PROJECT_TRACKER.md`'s Key Decisions as a standing pending item).
- **Real photos/video** — this site has zero real image assets by design (documented policy this session, given no verified rights to any existing images). Genuine photos of the actual operation would help both traditional SEO (image search, richer snippets) and GEO (multimodal AI citation increasingly favors sites with real, attributable media).

### Genuinely additive recommendations, not yet done
- **Topical authority at real scale, paced correctly** — the roadmap for this already exists (`blogRoadmap20.ts`, 600 topics across 20 clusters, 22 currently live/indexable, 555 more in a reviewed-before-promotion backlog with an enforced duplicate-content gate). This is the *correct* way to eventually approach the old site's page count without its quality problems — worth continuing deliberately rather than as a one-time push.
- **NAP (Name/Address/Phone) consistency audit** across every external surface (Google Business Profile, any directories, social profiles) — the old site's `sameAs` links point to Facebook/Instagram/Twitter profiles that should be checked for whether they're real and consistent before V2 references them the same way, if at all.
- **Core Web Vitals advantage** — V2's static Astro output (0 server-side DB lookups per request) is structurally faster than the old `astro-site`'s SSR + SQLite-lookup-per-request architecture. Worth confirming with real field data (CrUX/PageSpeed Insights) once live, since this is a genuine, measurable ranking factor the rebuild already wins on by construction.
- **Structured entity consistency for GEO** — LLM-based answer engines increasingly weight consistent, unambiguous entity naming (exact business name, exact service names) across a site over marketing variation. Worth a light pass once live to confirm service names are used identically in prose, schema, and navigation everywhere (a few near-duplicates like "E-Waste Recycling" vs "Electronics Recycling" vs "Recycling" already exist in the V2 nav/content — not wrong, just worth deciding if that's intentional variety or should converge).
- **Content freshness signals** — `dateModified` is already used correctly on posts; worth extending the same discipline to the core service pages (`/recycling/`, `/pickup/`, etc.) which currently show `lastUpdated` inconsistently across pages, some from Phase 2L work, some older.

## Bottom line

This audit doesn't change the plan — it confirms it, with sharper detail than before. The old site's problems are worse and more concrete than "could be better": a fabricated star rating live right now, an unqualified authorization claim baked into ~11,000 pages, and 21 marketing pages carrying the same pattern. The V2 build's discipline this session (audit before shipping, hedge instead of assert, verify schema against visible content, quarantine anything that doesn't clear a real bar) is the correct antidote to exactly what this repo represents.
