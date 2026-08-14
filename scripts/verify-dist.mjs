import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url);
const distPath = DIST.pathname;

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

  if (!process.exitCode) {
    console.log(`DIST VERIFY PASS: ${htmlFiles.length} HTML pages; homepage canonical, AdSense and JSON-LD present.`);
  }
}
