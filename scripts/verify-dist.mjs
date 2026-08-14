import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url);
const distPath = DIST.pathname;
const baselinePath = new URL("../data/index-surface-baseline.json", import.meta.url);

function fail(message) {
  console.error(`DIST VERIFY FAIL: ${message}`);
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
  let total = 0;
  for (const file of readdirSync(sitemapDir).filter((name) => name.endsWith(".xml"))) {
    const group = file.replace(/\.xml$/, "");
    const count = countLocs(readFileSync(join(sitemapDir, file), "utf8"));
    groupCounts[group] = count;
    total += count;
  }

  const totalBaseline = Number(baseline.counts?.total || 0);
  const totalDropLimit = Number(baseline.thresholds?.totalDropPercent ?? 5);
  if (totalBaseline > 0) {
    const minTotal = Math.floor(totalBaseline * (1 - totalDropLimit / 100));
    if (total < minTotal) {
      fail(`index surface dropped from approved ${totalBaseline} URLs to ${total}; limit is ${totalDropLimit}% (minimum ${minTotal})`);
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
      fail(`sitemap group ${group} dropped from approved ${approvedCount} URLs to ${current}; limit is ${groupDropLimit}% (minimum ${minimum})`);
    }
  }

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
    console.log(`DIST VERIFY PASS: ${htmlFiles.length} HTML pages; homepage markers and approved index surface verified.`);
  }
}
