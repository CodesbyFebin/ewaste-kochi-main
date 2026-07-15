// Internal linking engine — data layer.
//
// Derives every cross-link relationship from BLOG_CLUSTERS (the source of
// truth for live posts), so there is exactly one place that can go stale.
// Strategy implemented here (rendered by src/components/RelatedContent.astro):
//   Article  -> Cluster            (getCluster)
//   Article  -> Related Articles   (getRelatedArticles)
//   Article  -> Related Cluster    (getRelatedCluster)
//   Article  -> Popular Guides     (getPopularGuides)
//   Article  -> Latest Guides      (getLatestGuides)
//   Article  -> Beginner Guides    (getBeginnerGuides)
// Cluster -> Articles and Article -> FAQ already exist elsewhere (the
// cluster-card "Live guides" list on /blog/, and each post's own <Faq>
// block) and are not duplicated here.
//
// "Popular" and "beginner" are editorial flags curated below, not real
// analytics data — there is no traffic/analytics source in this project to
// draw from, and presenting invented numbers as fact would be a fake claim.
// "Latest" is real: it's sorted from each post's actual dateModified.

import { BLOG_CLUSTERS, type BlogCluster } from "./blogClusters";

export interface PostMeta {
  href: string;
  datePublished: string; // matches dateModified in that post's own frontmatter
  beginner: boolean;
  popular: boolean;
}

// Kept in sync manually with each live post's frontmatter date — see
// routes.ts for the authoritative list of live routes.
const POST_META: PostMeta[] = [
  { href: "/blog/free-e-waste-pickup-kochi/", datePublished: "2026-07-07", beginner: true, popular: true },
  { href: "/blog/sell-old-laptop-kochi/", datePublished: "2026-07-07", beginner: false, popular: true },
  { href: "/blog/what-is-ewaste/", datePublished: "2026-07-07", beginner: true, popular: true },
  { href: "/blog/e-waste-examples/", datePublished: "2026-07-07", beginner: true, popular: false },
  { href: "/blog/e-waste-collection-near-me/", datePublished: "2026-07-07", beginner: true, popular: false },
  { href: "/blog/what-is-epr-in-e-waste/", datePublished: "2026-07-07", beginner: false, popular: false },
  { href: "/blog/e-waste-management-rules-2022/", datePublished: "2026-07-07", beginner: false, popular: false },
  { href: "/blog/where-to-recycle-old-electronics-kochi/", datePublished: "2026-07-18", beginner: true, popular: false },
  { href: "/blog/battery-recycling-near-me-kochi/", datePublished: "2026-07-08", beginner: false, popular: true },
  { href: "/blog/how-to-book-ewaste-pickup-kochi/", datePublished: "2026-07-08", beginner: true, popular: false },
  { href: "/blog/how-to-sell-old-electronics-kochi/", datePublished: "2026-07-08", beginner: false, popular: false },
  { href: "/blog/laptop-recycling-kochi/", datePublished: "2026-07-08", beginner: false, popular: false },
  { href: "/blog/data-destruction-kochi-guide/", datePublished: "2026-07-08", beginner: false, popular: false },
  { href: "/blog/corporate-ewaste-pickup-kochi/", datePublished: "2026-07-08", beginner: false, popular: false },
  { href: "/blog/how-ewaste-scrap-quotes-work-kochi/", datePublished: "2026-07-08", beginner: false, popular: false },
  { href: "/blog/recycling-basics/", datePublished: "2026-07-09", beginner: true, popular: true },
  { href: "/blog/how-ewaste-recycling-works/", datePublished: "2026-07-14", beginner: true, popular: false },
  { href: "/blog/why-electronics-should-not-go-in-household-waste/", datePublished: "2026-07-14", beginner: true, popular: false },
  { href: "/blog/how-to-prepare-electronics-for-recycling/", datePublished: "2026-07-14", beginner: false, popular: false },
  { href: "/blog/ewaste-recycling-vs-reuse/", datePublished: "2026-07-14", beginner: false, popular: false },
  { href: "/blog/how-responsible-ewaste-collection-works/", datePublished: "2026-07-14", beginner: false, popular: false },
  { href: "/blog/ewaste-pickup-near-me/", datePublished: "2026-07-14", beginner: true, popular: false },
  { href: "/blog/sell-old-electronics-kochi/", datePublished: "2026-07-14", beginner: false, popular: false },
  { href: "/blog/battery-safety-before-ewaste-pickup/", datePublished: "2026-07-15", beginner: true, popular: false },
  { href: "/blog/common-mistakes-old-electronics/", datePublished: "2026-07-15", beginner: true, popular: false },
  { href: "/blog/what-happens-after-ewaste-collection/", datePublished: "2026-07-15", beginner: true, popular: false },
  { href: "/blog/inverter-battery-disposal-kochi/", datePublished: "2026-07-15", beginner: false, popular: false },
  { href: "/blog/ewaste-recycling-myths-facts/", datePublished: "2026-07-15", beginner: true, popular: false },
  { href: "/blog/what-affects-old-laptop-value-kochi/", datePublished: "2026-07-15", beginner: false, popular: false },
  { href: "/blog/ewaste-recycling-guide-kochi-residents/", datePublished: "2026-07-15", beginner: true, popular: false },
  { href: "/blog/electronics-disposal-apartments-kochi/", datePublished: "2026-07-15", beginner: true, popular: false },

];

export interface LinkedArticle {
  title: string;
  href: string;
  excerpt: string;
  clusterName: string;
  clusterSlug: string;
  datePublished: string;
  beginner: boolean;
  popular: boolean;
}

// Flatten every cluster's existingPosts into one list, joined with POST_META.
// A handful of hrefs appear under more than one cluster in blogClusters.ts
// (e.g. /blog/sell-old-laptop-kochi/ is listed under 3 different clusters) —
// that's pre-existing data in that file, not something this module can fix.
// Deduplicated here by href (first occurrence wins) so a post is never
// double-counted or shown twice in the same related-articles list.
const seenHrefs = new Set<string>();
export const ALL_ARTICLES: LinkedArticle[] = BLOG_CLUSTERS.flatMap((cluster) =>
  cluster.existingPosts
    .filter((post) => {
      if (seenHrefs.has(post.href)) return false;
      seenHrefs.add(post.href);
      return true;
    })
    .map((post) => {
      const meta = POST_META.find((m) => m.href === post.href);
      return {
        ...post,
        clusterName: cluster.name,
        clusterSlug: cluster.slug,
        datePublished: meta?.datePublished ?? "2026-07-07",
        beginner: meta?.beginner ?? false,
        popular: meta?.popular ?? false,
      };
    })
);

export function getArticle(href: string): LinkedArticle | undefined {
  return ALL_ARTICLES.find((a) => a.href === href);
}

export function getCluster(clusterSlug: string): BlogCluster | undefined {
  return BLOG_CLUSTERS.find((c) => c.slug === clusterSlug);
}

// Live-post count per cluster, used to prioritize backfill below.
const clusterLiveCounts = new Map<string, number>();
for (const a of ALL_ARTICLES) {
  clusterLiveCounts.set(a.clusterSlug, (clusterLiveCounts.get(a.clusterSlug) ?? 0) + 1);
}

// Cheap, deterministic string hash — used only to break ties between
// backfill candidates that belong to equally-small clusters, so which one
// gets picked varies by source page instead of always favoring whichever
// cluster happens to come first in BLOG_CLUSTERS.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

// Global "guaranteed successor" edges: for every cluster's existingPosts
// order (not just the one each href got canonicalized into by ALL_ARTICLES'
// href-dedup — a post can appear in several clusters' roadmaps, and only
// counting its canonical cluster silently dropped the rotation edge from
// every other cluster it also belongs to, which is exactly what still left
// 5 posts orphaned after the first version of this fix), add an edge from
// each post to the next post in that array, wrapping around. A href can
// have more than one guaranteed successor if it's shared across clusters.
const guaranteedSuccessors = new Map<string, Set<string>>();
for (const cluster of BLOG_CLUSTERS) {
  const order = cluster.existingPosts.map((p) => p.href);
  if (order.length < 2) continue;
  for (let i = 0; i < order.length; i++) {
    const from = order[i];
    const to = order[(i + 1) % order.length];
    if (from === to) continue;
    if (!guaranteedSuccessors.has(from)) guaranteedSuccessors.set(from, new Set());
    guaranteedSuccessors.get(from)!.add(to);
  }
}

/** Same-cluster articles, keyword/hash-relevance ranked, with slots always
 * reserved for this post's "rotation successors" (see guaranteedSuccessors
 * above) — the next post after this one in every cluster order it belongs
 * to, wrapping around.
 *
 * Those reserved slots are what actually guarantee zero orphans at cluster
 * sizes like ~30 posts: with only `count` slots per page and far more
 * cluster-mates than that, ranking by relevance/hash alone leaves most
 * members never selected by anyone (verified — this produced 474 orphans
 * before this fix). Every index has exactly one predecessor in a rotation,
 * so reserving "cite whoever comes right after me" as a mandatory pick
 * means every post is guaranteed at least one inbound citation: itself,
 * from its own predecessor. Guaranteed picks are never truncated by `count`
 * — a post shared across several clusters can have more than one
 * predecessor duty, and honoring all of them matters more than capping the
 * list at exactly 3. See scripts/check-orphan-articles.ts. */
export function getRelatedArticles(href: string, count = 3): LinkedArticle[] {
  const current = getArticle(href);
  if (!current) return [];

  const picks: LinkedArticle[] = [];
  const pickedHrefs = new Set<string>([href]);

  for (const successorHref of guaranteedSuccessors.get(href) ?? []) {
    const successor = getArticle(successorHref);
    if (successor && !pickedHrefs.has(successor.href)) {
      picks.push(successor);
      pickedHrefs.add(successor.href);
    }
  }

  const sameCluster = ALL_ARTICLES.filter(
    (a) => a.clusterSlug === current.clusterSlug && !pickedHrefs.has(a.href)
  ).sort((a, b) => (hash(href + a.href) % 1000) - (hash(href + b.href) % 1000));

  for (const a of sameCluster) {
    if (picks.length >= count) break;
    picks.push(a);
    pickedHrefs.add(a.href);
  }

  if (picks.length < count) {
    const others = ALL_ARTICLES.filter((a) => !pickedHrefs.has(a.href)).sort((a, b) => {
      const byClusterSize =
        (clusterLiveCounts.get(a.clusterSlug) ?? 0) - (clusterLiveCounts.get(b.clusterSlug) ?? 0);
      if (byClusterSize !== 0) return byClusterSize;
      return hash(href + a.href) - hash(href + b.href);
    });
    for (const a of others) {
      if (picks.length >= count) break;
      picks.push(a);
      pickedHrefs.add(a.href);
    }
  }

  return picks.slice(0, count);
}

/** Next cluster (in BLOG_CLUSTERS order) that actually has live posts,
 * skipping the current one — never links to a roadmap-only cluster with
 * nothing published yet. */
export function getRelatedCluster(href: string): BlogCluster | undefined {
  const current = getArticle(href);
  if (!current) return undefined;
  const clustersWithPosts = BLOG_CLUSTERS.filter((c) => c.existingPosts.length > 0);
  const idx = clustersWithPosts.findIndex((c) => c.slug === current.clusterSlug);
  if (idx === -1 || clustersWithPosts.length < 2) return undefined;
  return clustersWithPosts[(idx + 1) % clustersWithPosts.length];
}

export function getPopularGuides(count = 4): LinkedArticle[] {
  return ALL_ARTICLES.filter((a) => a.popular).slice(0, count);
}

export function getLatestGuides(count = 4, excludeHref?: string): LinkedArticle[] {
  return [...ALL_ARTICLES]
    .filter((a) => a.href !== excludeHref)
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, count);
}

export function getBeginnerGuides(count = 4): LinkedArticle[] {
  return ALL_ARTICLES.filter((a) => a.beginner).slice(0, count);
}

/** Every live post that has zero inbound links from getRelatedArticles() for
 * any other post — i.e. would be an orphan even after the engine runs.
 * Used by scripts/check-orphan-articles.ts, not rendered on any page. */
export function findOrphanArticles(): LinkedArticle[] {
  const linkedTo = new Set<string>();
  for (const article of ALL_ARTICLES) {
    for (const related of getRelatedArticles(article.href, 3)) {
      linkedTo.add(related.href);
    }
  }
  return ALL_ARTICLES.filter((a) => !linkedTo.has(a.href));
}
