import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url);
const distPath = DIST.pathname;
const baselinePath = new URL("../data/index-surface-baseline.json", import.meta.url);
const vercelPath = new URL("../vercel.json", import.meta.url);
const recoveryMapPath = new URL("../data/gsc-404-recovery-map.json", import.meta.url);
const SITE_ORIGIN = "https://www.ewastekochi.com";

function fail(message) {
  console.error(`DIST VERIFY FAIL: ${message}`);
  if (process.env.GITHUB_ACTIONS === "true") {
    const escaped = String(message).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    console.error(`::error title=Index surface regression::${escaped}`);
  }
  process.exitCode = 1;
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function countLocs(xml) {
  return (xml.match(/<loc>/g) || []).length;
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function normalizePath(pathname) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function distHtmlPathFor(pathname) {
  if (pathname === "/") return join(distPath, "index.html");
  if (pathname.endsWith(".html")) return join(distPath, pathname.replace(/^\//, ""));
  return join(distPath, pathname.replace(/^\//, ""), "index.html");
}

function extractCanonical(html) {
  const match = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return match?.[1] || null;
}

function isNoindex(html) {
  return /<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\s+[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html);
}

function loadVercelConfig() {
  if (!existsSync(vercelPath)) return { redirects: [] };
  return JSON.parse(readFileSync(vercelPath, "utf8"));
}

function staticRedirectSources() {
  const sources = new Set();
  for (const rule of loadVercelConfig().redirects || []) {
    const source = String(rule.source || "");
    if (!source.startsWith("/") || /[:*()]/.test(source) || rule.has || rule.missing) continue;
    sources.add(normalizePath(source));
  }
  return sources;
}

function verifyHighValueLegacyRedirects() {
  if (!existsSync(recoveryMapPath)) {
    fail("data/gsc-404-recovery-map.json is missing");
    return;
  }

  const recoveryRows = JSON.parse(readFileSync(recoveryMapPath, "utf8"));
  const sources = staticRedirectSources();
  const missing = recoveryRows
    .map((row) => normalizePath(String(row.source || "/")))
    .filter((source) => !sources.has(source));

  if (missing.length) {
    fail(`high-value GSC 404 redirect sources missing from vercel.json (${missing.length}/${recoveryRows.length}): ${missing.join(", ")}`);
    return;
  }

  console.log(`LEGACY REDIRECT HYGIENE: ${recoveryRows.length}/${recoveryRows.length} evidence-backed high-value 404 sources are protected by static redirects.`);
}

function verifySitemapUrls(allLocs) {
  const seen = new Set();
  const redirectSources = staticRedirectSources();

  for (const loc of allLocs) {
    let url;
    try {
      url = new URL(loc);
    } catch {
      fail(`invalid sitemap URL: ${loc}`);
      continue;
    }

    if (url.origin !== SITE_ORIGIN) {
      fail(`non-production host in sitemap: ${loc}`);
      continue;
    }

    if (url.search || url.hash) {
      fail(`sitemap URL contains query/hash: ${loc}`);
    }

    const normalized = `${SITE_ORIGIN}${normalizePath(url.pathname)}`;
    if (seen.has(normalized)) {
      fail(`duplicate sitemap URL: ${normalized}`);
      continue;
    }
    seen.add(normalized);

    const pathKey = normalizePath(url.pathname);
    if (redirectSources.has(pathKey)) {
      fail(`sitemap URL is also a static redirect source: ${loc}`);
    }

    const htmlPath = distHtmlPathFor(url.pathname);
    if (!existsSync(htmlPath)) {
      fail(`sitemap URL has no generated HTML file: ${loc} -> ${htmlPath}`);
      continue;
    }

    const html = readFileSync(htmlPath, "utf8");
    const canonical = extractCanonical(html);
    if (!canonical) {
      fail(`sitemap page missing canonical: ${loc}`);
    } else {
      let canonicalUrl;
      try {
        canonicalUrl = new URL(canonical);
      } catch {
        fail(`invalid canonical on sitemap page ${loc}: ${canonical}`);
      }
      if (canonicalUrl) {
        const expected = `${SITE_ORIGIN}${normalizePath(url.pathname)}`;
        const observed = `${canonicalUrl.origin}${normalizePath(canonicalUrl.pathname)}`;
        if (canonicalUrl.search || canonicalUrl.hash || observed !== expected) {
          fail(`non-self-canonical sitemap page: ${loc} -> ${canonical}`);
        }
      }
    }

    if (isNoindex(html)) {
      fail(`noindex page present in sitemap: ${loc}`);
    }
  }

  console.log(`SITEMAP HYGIENE: ${seen.size} unique URLs are generated, self-canonical, indexable, and not static redirect sources.`);
}

function verifyIndexSurface() {
  if (!existsSync(baselinePath)) {
    fail("data/index-surface-baseline.json is missing");
    return;
  }

  const baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  const sitemapDir = join(distPath, "sitemaps");
  if (!existsSync(sitemapDir)) {
    fail("dist/sitemaps is missing");
    return;
  }

  const groupCounts = {};
  const allLocs = [];
  let total = 0;
  for (const file of readdirSync(sitemapDir).filter((name) => name.endsWith(".xml"))) {
    const group = file.replace(/\.xml$/, "");
    const xml = readFileSync(join(sitemapDir, file), "utf8");
    const count = countLocs(xml);
    groupCounts[group] = count;
    total += count;
    allLocs.push(...extractLocs(xml));
  }

  console.log(`INDEX SURFACE OBSERVED: ${total} sitemap URLs; groups=${JSON.stringify(groupCounts)}`);

  const totalBaseline = Number(baseline.counts?.total || 0);
  const totalDropLimit = Number(baseline.thresholds?.totalDropPercent ?? 5);
  if (totalBaseline > 0) {
    const minTotal = Math.floor(totalBaseline * (1 - totalDropLimit / 100));
    if (total < minTotal) {
      fail(`index surface dropped from approved ${totalBaseline} URLs to ${total}; limit is ${totalDropLimit}% (minimum ${minTotal}); observed groups=${JSON.stringify(groupCounts)}`);
    }
  }

  const groupDropLimit = Number(baseline.thresholds?.groupDropPercent ?? 20);
  for (const [group, approvedCountRaw] of Object.entries(baseline.counts || {})) {
    if (group === "total") continue;
    const approvedCount = Number(approvedCountRaw);
    if (!approvedCount) continue;
    const current = Number(groupCounts[group] || 0);
    const minimum = Math.floor(approvedCount * (1 - groupDropLimit / 100));
    if (current < minimum) {
      fail(`sitemap group ${group} dropped from approved ${approvedCount} URLs to ${current}; limit is ${groupDropLimit}% (minimum ${minimum}); observed total=${total}; observed groups=${JSON.stringify(groupCounts)}`);
    }
  }

  verifySitemapUrls(allLocs);
  verifyHighValueLegacyRedirects();
  console.log(`INDEX SURFACE: ${total} sitemap URLs; groups=${JSON.stringify(groupCounts)}`);
}

if (!existsSync(distPath)) {
  fail("dist/ does not exist; run the production build first");
} else {
  const files = walk(distPath);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const indexPath = join(distPath, "index.html");

  if (htmlFiles.length < 800) {
    fail(`expected at least 800 generated HTML pages, found ${htmlFiles.length}`);
  }

  if (!existsSync(indexPath)) {
    fail("dist/index.html is missing");
  } else {
    const html = readFileSync(indexPath, "utf8");
    const required = [
      'rel="canonical"',
      "https://www.ewastekochi.com/",
      "adsbygoogle.js?client=ca-pub-3573741815038097",
      'type="application/ld+json"',
    ];

    for (const marker of required) {
      if (!html.includes(marker)) fail(`homepage is missing required marker: ${marker}`);
    }

    if (/\{\{[^}]+\}\}/.test(html)) {
      fail("homepage contains an unresolved template placeholder");
    }
  }

  verifyIndexSurface();

  if (!process.exitCode) {
    console.log(`DIST VERIFY PASS: ${htmlFiles.length} HTML pages; homepage markers, sitemap hygiene, legacy redirect coverage, and approved index surface verified.`);
  }
}
