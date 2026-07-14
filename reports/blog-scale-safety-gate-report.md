# Blog Scale Safety Gate — Quarantine Generated Content

Date: 2026-07-14
Status: **Pass. Public surface restored to the reviewed baseline.** Structural infrastructure from the mass-generation work (linking engine fix, roadmap data, tooling) retained; content itself quarantined pending rewrite.

## Why this phase exists

An internal audit of a same-day mass-generation pass (465 posts assembled from a 5–7-module-per-cluster content bank, covering all 20 roadmap clusters) found the structural work sound but the content itself not production-quality: **82% of the generated posts had zero body paragraphs unique to that post**, with 112 paragraphs copy-pasted verbatim across 2–21 posts and one FAQ answer reused on 30 pages. That's a scaled-duplicate-content risk, not a style nitpick. Decision: do not ship those 465 posts (or the 90 unreviewed legacy drafts alongside them) as indexable production content. This phase executes that decision.

## What changed

| Area | Before this gate | After this gate |
| --- | --- | --- |
| Live, buildable blog posts (`src/pages/blog/`) | 571 | 16 |
| Quarantined posts (`.content-quarantine/blog-drafts/`) | 0 | 555 (465 generated + 90 legacy-unreviewed) |
| Total build routes | 608 | 53 |
| Blog routes | 572 | 17 (16 posts + `/blog/` hub) |
| Sitemap blog URLs | 572 | 17 |
| `content-index.json` total / blog pages | 608 / 572 | 53 / 17 |
| `ai-sitemap.xml` pages | 608 | 53 |
| Indexable articles in the linking engine (`ALL_ARTICLES`) | 570 | 15 |
| Generated images referenced anywhere in `src/` | 0 of 600 (already broken before this phase) | 0 of 600 (now explicitly quarantined + gitignored, not just unreferenced) |

Route/page counts now match the last known-good state recorded in `reports/phase-2n-fresh-staging-redeploy-crawl-report.md` (53 pages, 505/505 validation checks) exactly — this phase is a restoration to a previously-verified baseline, not a new, unverified state.

## 1. Publication-status model (new, permanent infrastructure)

`src/data/routes.ts`'s `RouteEntry` interface gained three fields, optional and defaulted (published / manual / indexable) for non-blog routes, explicit on every blog entry:

```ts
status?: "published" | "review" | "draft";
contentSource?: "manual" | "legacy" | "generated";
indexable?: boolean;
```

`src/lib/indexable.ts` exports `isIndexable(route)`, now the single gate used by `sitemap.xml.ts`, `sitemaps/blog.xml.ts`, `content-index.xml.ts`, `content-index.json.ts`, and `ai-sitemap.xml.ts` — a route with `indexable: false` cannot appear in any discovery surface, enforced in code, not by convention. All 16 surviving posts + the hub are `status: "published"`, `contentSource: "manual"`, `indexable: true`.

## 2. Public blog set (restored)

The 17 indexable blog routes:

`/blog/`, `/blog/recycling-basics/`, `/blog/free-e-waste-pickup-kochi/`, `/blog/sell-old-laptop-kochi/`, `/blog/what-is-ewaste/`, `/blog/e-waste-examples/`, `/blog/e-waste-collection-near-me/`, `/blog/what-is-epr-in-e-waste/`, `/blog/e-waste-management-rules-2022/`, `/blog/where-to-recycle-old-electronics-kochi/`, `/blog/battery-recycling-near-me-kochi/`, `/blog/how-to-book-ewaste-pickup-kochi/`, `/blog/how-to-sell-old-electronics-kochi/`, `/blog/laptop-recycling-kochi/`, `/blog/data-destruction-kochi-guide/`, `/blog/corporate-ewaste-pickup-kochi/`, `/blog/how-ewaste-scrap-quotes-work-kochi/`.

No other blog posts are reachable through normal navigation, sitemap, content-index, ai-sitemap, or llms.txt.

## 3. Generated + legacy posts — quarantined

`scripts/quarantine-generated-blog.ts` (idempotent, re-runnable):

- Removed all 555 non-safe `RouteEntry` blocks from `routes.ts`.
- Physically moved all 555 post directories from `src/pages/blog/` to `.content-quarantine/blog-drafts/` — Astro's file-based router cannot build anything outside `src/pages/`, so this holds regardless of what any data file claims. `.content-quarantine/blog-drafts/MANIFEST.json` records each post's `contentSource` (`generated` or `legacy`) and `status` (`draft` or `review`).
- Kept tracked in git (per the "internal editorial backlog" framing) — nothing was deleted, all 555 posts remain readable and recoverable.

Breakdown: 465 `contentSource: "generated"` (content-bank-assembled, `status: "draft"`), 90 `contentSource: "legacy"` (previously-drafted, unreviewed, `status: "review"`).

## 4. Cluster pages

`scripts/rebuild-clusters-safe.ts` regenerated `src/data/blogClusters.ts` from `blogRoadmap20.ts` (kept — 20-cluster / 600-topic planning data) + `blogContentBank.ts` FAQ answers, with `existingPosts` restricted to only the 16 safe hrefs. Every other roadmap topic reverts to `plannedPosts` (a title string, no href, not rendered as a link) — the same semantics `blogClusters.ts` had before the mass-generation pass. Result: 20 clusters, 15 unique `existingPosts` hrefs (2 topics legitimately span two clusters each — pre-existing roadmap data, not a bug), 588 `plannedPosts`.

`/blog/recycling-basics/` — kept indexable (manually reviewed both originally and again this session). Its `publishedTopics` map was reverted from all 30 topics (27 of which pointed at now-quarantined posts) back to the original 3 that point at safe posts; the "Learning Path" copy was reverted to say so explicitly.

## 5. Related-article linking engine

The `getRelatedArticles()` global predecessor/successor fix (from the earlier orphan-bug fix this session) is **kept as-is, no code changes** — it doesn't need special-casing for indexability because `ALL_ARTICLES` in `blogLinking.ts` is derived entirely from `blogClusters.ts`'s `existingPosts`. Since that now only contains the 16 safe posts, published pages structurally cannot link to a quarantined draft: there is no code path by which a non-indexable post enters the linking graph. `POST_META` was pruned from 571 entries back to the original 16.

`scripts/check-orphan-articles.ts` now supports two modes:
- **Default (indexable-only)** — checks `ALL_ARTICLES`, gates `npm run validate`.
- **`--all` (diagnostic)** — additionally scans disk (`src/pages/blog/` + `.content-quarantine/blog-drafts/`) and reports anything outside the linking graph. Quarantined drafts are expected to show up here; the check only fails/warns if something is *live and buildable* yet stranded outside the graph.

## 6. Generated images — quarantined

Moved `images/blog/` (600 PNGs, 19MB — already unreferenced anywhere in `src/`, and already unservable since it sat outside `public/`) to `.content-quarantine/images-blog-generated/`, added to `.gitignore`. `scripts/generate_blog_images.py` (the generator) is untouched and can regenerate them correctly later, once there's a real per-post `image` field wired to `SeoHead.astro`'s `og:image` to receive them.

## 7. Duplicate-content gate (new script)

`scripts/check-duplicate-content.ts` — checks indexable blog pages only (via `routes.ts` + `isIndexable`), never applied to roadmap-only text. Thresholds: ≥60% unique body paragraphs per post, no FAQ answer reused on >3 indexable pages, no 25+-word paragraph reused on >5 indexable pages.

Result against the current 16-post indexable set:

```
Checked 16 indexable posts.
14 of 16 posts: 100% unique body paragraphs.
where-to-recycle-old-electronics-kochi: 88% unique (7/8)
how-to-book-ewaste-pickup-kochi: 89% unique (8/9)
recycling-basics: 75% unique (3/4)
0 FAQ answers exceed the 3-page reuse limit.
0 long paragraphs exceed the 5-page reuse limit.
PASS: all 16 indexable posts clear the duplicate-content gate.
```

The 2 lower (but still passing) posts share a single sentence each with one other page — nowhere near the 465-post pattern. This gate would have caught the original problem immediately had it existed before that batch was wired live; it now runs as part of the validation suite going forward.

## 8. Validation results

| Check | Result |
| --- | --- |
| `npm run check` | 0 errors, 0 warnings, 0 hints (97 files, down from 648) |
| `npm run build` | 53 pages built (down from 608) |
| `npm run validate` | 505/505 checks passed, 0 failures |
| Orphan check (indexable-only) | PASS — 0 orphans among 15 indexable articles |
| Orphan check (`--all` diagnostic) | 555 quarantined posts correctly outside the graph (expected); 0 live posts stranded outside it |
| Duplicate-content gate | PASS — all 16 indexable posts |
| Site-wide broken internal link sweep | 0 broken links across all 53 built pages (assets + page routes) |
| Forbidden-claims sweep (`blogClusters.ts` + all 16 safe posts) | Clean — remaining "certified"/"guarantee" hits are hedging language ("not guaranteed", "not the same as certified destruction"), no fabricated stats, ratings, or certifications |
| Links from indexable pages to quarantined/draft posts | 0 (structurally impossible — see §5) |

## 9. Production recommendation

**Do not deploy this state as a step forward from the last verified staging deploy** — it's a restoration, not new work, so there's nothing new to cut over. **Do not submit the 555 quarantined URLs to GSC; they were never submitted.** The 17-route public surface matches the previously-verified Phase 2N baseline and is safe to redeploy to staging if a fresh crawl is wanted, using the same process as that phase.

The mass-generation work is not wasted — it's now a 555-post internal editorial backlog (`.content-quarantine/blog-drafts/`), each already tagged with its `contentSource`. The intended path forward for any of them:

```
roadmap topic → draft (already done) → uniqueness expansion (rewrite, not reuse) →
manual fact-check → internal link check → promote to routes.ts + blogClusters.ts → indexable
```

Not: `roadmap topic → generated page → sitemap → GSC` — the flow this gate exists to prevent.

## Next phase

Phase 2N (fresh staging crawl) once the user wants a fresh deploy — the public surface is now back to a safe, previously-verified reviewed set, matching the exact conditions Phase 2N already validated (53 pages / 505 checks).
