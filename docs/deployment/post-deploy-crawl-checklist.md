# Post-Deploy Crawl Checklist

Status: **executed twice** against staging (Phase 2H, then again in Phase 2K after the chatbot and hero rebuild — see `reports/phase-2k-git-safety-fresh-staging-report.md` for the latest results). Still never run against real production. Run this immediately after any deploy.

## 0. Chatbot check (new as of Phase 2I-A / verified in Phase 2K)

- [ ] `ew-lead-chat-root` present in every page's HTML (mounted via `Layout.astro`, should be on all 43).
- [ ] Launcher opens the panel; a full flow (e.g. Book a Pickup) can be completed end to end.
- [ ] The generated WhatsApp link uses the correct number (`917500555454`) and a correctly encoded message.
- [ ] Close button and Escape key both close the panel.
- [ ] Zero browser console/page errors during the interaction.

## 1. Basic reachability (all 43 pages)

Crawl every URL in `src/data/routes.ts` against the deployed URL and confirm:
- [ ] Returns HTTP 200 (not 404, not 500, not an unexpected redirect).
- [ ] `<title>` is present and non-empty.
- [ ] `<meta name="description">` is present and non-empty.
- [ ] Exactly one `<h1>` per page.

This mirrors what `scripts/validate-seo-v2.ts` already checks locally — the point of re-running it against the deployed URL is to catch anything that only breaks in the real hosting environment (a misconfigured redirect, a missing static asset, a build that behaves differently under Vercel's actual runtime vs. local `astro preview`).

## 2. Canonical + hreflang spot check

- [ ] Pick 5 pages across different types (a core page, a service page, a location page, a blog post, an `/ml/` page) and confirm the rendered canonical tag matches the expected production URL exactly.
- [ ] For the 7 English/Malayalam paired pages, confirm both sides of each pair emit the same 3-link hreflang set (en-IN, ml-IN, x-default) with matching URLs — this was correct in the last local build; confirm it survives deployment.

## 3. Redirect verification (live HTTP checks, not just code review)

`vercel.json` has **297 rules** as of Phase 2G (13 original + 284 legacy-matrix redirects). Script-check all 297 where possible; where time is limited, manually sample: the original 13, plus at least 10 legacy location-matrix redirects and 10 legacy service-matrix redirects across different source groups (see `reports/phase-2g-legacy-matrix-redirect-report.md` for the full source list). For each sampled rule, run an actual `curl -I` (or equivalent) against the deployed URL and confirm:
- [ ] Single redirect hop (check the `Location` header points directly to the final destination, not to another redirect).
- [ ] Status code is 301 or 308 (permanent), not 302/307.
- [ ] The destination URL itself returns 200.

## 4. Sitemap + robots live check

- [ ] `curl https://<deployed-host>/sitemap.xml` — confirm it's a valid `<sitemapindex>` and all 6 sub-sitemap URLs resolve.
- [ ] `curl https://<deployed-host>/robots.txt` — confirm the `Sitemap:` lines point at the live, working sitemap (not a stale or broken URL).
- [ ] Fetch each sub-sitemap directly and confirm URL counts still sum to 43 (or whatever the current page count is if this checklist is run after later phases add pages).

## 5. No accidental exposure of contested/legacy content

- [ ] Confirm none of the 7 resolved-loser URLs (`/e-waste-recycling/`, `/data-destruction-services-kochi/`, `/scrap-price/`, `/free-e-waste-pickup-kochi/`, `/blog/sell-old-laptop-kochi-best-price/`, `/locations/ernakulam/`, `/locations/kalamassery-hitech-park/`) serve real content directly — each should only exist as a redirect source.
- [ ] Confirm `/blogs/` returns 404 (not accidentally resolved by some catch-all routing behavior in the hosting environment).
- [ ] Confirm `/hi/` behaves exactly as it did pre-deploy (untouched, per the standing manual-review decision) — this is a regression check, not an expectation of new behavior.
- [ ] Confirm the homepage has no fabricated rating/review claims, no named client logos, and no unverified "government authorized" style certification claims — this became relevant after a user-supplied hero graphic containing exactly this content was reviewed and rejected; the rebuilt hero (`.hero-features`) should be the only thing present.

## 6. Mobile/rendering spot check

- [ ] Load 3-4 pages on an actual mobile viewport (or browser dev tools mobile emulation) and confirm no layout breakage, no horizontal scroll, CTA buttons are tappable.
- [ ] Confirm the WhatsApp CTA links (`wa.me/...`) actually open correctly on a real device if possible — this can't be fully verified by automated crawling.

## 7. Search engine / crawler access check

- [ ] Confirm `robots.txt` is served with the correct `Content-Type` (should be `text/plain`).
- [ ] Confirm no unexpected `X-Robots-Tag` header is being added by the hosting platform that would override the page-level meta robots tags.
- [ ] If this is a staging deploy (not production), confirm the staging URL itself is either password-protected, disallowed in its own `robots.txt`, or otherwise not something you'd want indexed — a staging preview accidentally getting crawled and indexed under its own URL would create exactly the kind of duplicate-content problem this whole project has worked to eliminate.

## 8. Only for the eventual real production cutover (not a staging preview)

- [ ] Re-run this entire checklist against `https://www.ewastekochi.com` itself after cutover.
- [ ] Watch Search Console's Coverage and Performance reports daily for the first 1-2 weeks for anything unexpected (a spike in 404s, a drop in impressions on a page that wasn't supposed to change, a redirect not being respected).
- [ ] Re-export a fresh GSC Performance report roughly 4-6 weeks after cutover and compare against the baseline data already analyzed in `reports/v2-gsc-data-analysis.md` and `docs/roadmap/google-trends-keyword-validation.md` — this is the real test of whether the GSC-backed redirect decisions (Findings D1–D5, ernakulam, kalamassery) actually preserved the traffic they were designed to protect.
