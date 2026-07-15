import { readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://www.ewastekochi.com";

const protection = JSON.parse(readFileSync("data/gsc-url-protection-map.json", "utf8")).rows;
const routesSource = readFileSync("src/data/routes.ts", "utf8");
const vercelConfig = JSON.parse(readFileSync("vercel.json", "utf8"));

const routePaths = new Set([...routesSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => normalizePath(m[1])));
const redirectBySource = new Map(
  vercelConfig.redirects
    .filter((r) => !String(r.destination).includes(":path*"))
    .map((r) => [normalizePath(r.source), { source: r.source, destination: r.destination }])
);

const indexedRows = protection.filter((row) => {
  const notes = String(row.notes || "");
  return notes.includes("confirmed_indexed_2026-07-10") || notes.includes("indexed-pages-crosscheck-2026-07-10");
});

const newlyBuiltSafePaths = new Set([
  "/locations/kottayam/",
  "/locations/kozhikode/",
  "/locations/palakkad/",
  "/locations/kollam/",
  "/locations/thiruvananthapuram/",
  "/locations/kannur/",
  "/locations/thrissur/",
  "/locations/malappuram/",
  "/locations/angamaly/",
  "/locations/palarivattom/",
  "/locations/fort-kochi/",
  "/locations/thrikkakara/",
  "/locations/thrippunithura/",
  "/locations/kaloor/",
  "/locations/smart-city-kochi/",
  "/locations/kothamangalam/",
  "/locations/muvattupuzha/",
  "/locations/vyttila/",
  "/locations/north-paravur/",
  "/locations/perumbavoor/",
  "/locations/maradu/",
  "/locations/willingdon-island/",
  "/locations/kalady/",
]);

function normalizePath(path) {
  if (!path) return "/";
  if (!path.startsWith("/")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

function canonicalFor(path) {
  return `${SITE_URL}${normalizePath(path)}`;
}

function currentV2Status(row) {
  const originalHost = (() => {
    try {
      return new URL(row.url).host;
    } catch {
      return row.host;
    }
  })();
  if (row.host === "blog.ewastekochi.com") return "external_subdomain_indexed";
  const path = normalizePath(row.path || row.normalized_url);
  if ((row.url === "https://ewastekochi.com/" || originalHost === "ewastekochi.com") && routePaths.has(path)) {
    return "host_canonicalization_redirect";
  }
  if (routePaths.has(path)) return "built_200";
  if (redirectBySource.has(path)) return "redirect_configured";
  return "missing_not_built";
}

function trafficTier(row) {
  const clicks = Number(row.clicks || 0);
  const impressions = Number(row.impressions || 0);
  if (clicks >= 10) return "P0";
  if (clicks >= 1 || impressions >= 100) return "P1";
  if (row.page_type === "location-page" || row.page_type === "service-page") return "P2";
  if (row.page_type === "location-service-matrix") return "P3";
  return "P4";
}

function contentRisk(row) {
  if (["blogs-taxonomy-legacy", "blog", "other-legacy-service"].includes(row.page_type)) return "high";
  if (row.page_type === "location-service-matrix") return "high";
  if (row.page_type === "subdomain-blog") return "medium";
  if (row.page_type === "location-page" && Number(row.clicks || 0) === 0) return "medium";
  return "low";
}

function claimRisk(row) {
  const text = `${row.url} ${row.service_intent || ""} ${row.reason || ""}`.toLowerCase();
  if (/iso|cpcb|kspcb|government-approved|government-authorized|best-price|instant-cash|same-day|certificate-of-destruction/.test(text)) {
    return "high";
  }
  if (row.page_type === "location-service-matrix" || row.page_type === "subdomain-blog") return "medium";
  return "low";
}

function actionFor(row, status) {
  const path = normalizePath(row.path || row.normalized_url);
  if (status === "built_200") {
    return newlyBuiltSafePaths.has(path) || row.action === "rebuild_safe_200" ? "build_safe_200" : "upgrade_existing_200";
  }
  if (status === "host_canonicalization_redirect") return "redirect_301";
  if (row.action === "redirect_301" || status === "redirect_configured") return "redirect_301";
  if (row.host === "blog.ewastekochi.com") return "manual_review";
  if (Number(row.clicks || 0) > 0 || Number(row.impressions || 0) >= 100) return "manual_review";
  if (String(row.path || "").includes("/buyback/")) return "leave_404";
  if (row.page_type === "blogs-taxonomy-legacy" || row.page_type === "blog") return "leave_404";
  return row.action === "manual_review" ? "manual_review" : "leave_404";
}

function targetFor(row, action, status) {
  const path = normalizePath(row.path || row.normalized_url);
  if (action === "redirect_301") {
    if (status === "host_canonicalization_redirect") return canonicalFor(path);
    const configured = redirectBySource.get(path);
    if (configured) return configured.destination.startsWith("http") ? configured.destination : canonicalFor(configured.destination);
    if (row.target_url) return row.target_url.startsWith("http") ? row.target_url : canonicalFor(row.target_url);
  }
  if (action === "upgrade_existing_200" || action === "build_safe_200") return canonicalFor(path);
  if (String(row.path || "").includes("/buyback/")) return `${SITE_URL}/sell-electronics/`;
  return "";
}

function reasonFor(row, action, status) {
  if (action === "upgrade_existing_200") return "Indexed URL maps to an existing V2 200 page; page retained and reviewed for safe SEO/content/schema.";
  if (action === "build_safe_200") return "Indexed location URL is business-relevant; protected with a safe feasibility-focused 200 page.";
  if (action === "redirect_301") return "Indexed legacy URL has a relevant one-hop 301 target in vercel.json; do not rebuild as a thin page.";
  if (action === "manual_review" && row.host === "blog.ewastekochi.com") return "Indexed blog subdomain URL has no current traffic; track separately and decide subdomain strategy later.";
  if (action === "manual_review") return "Indexed URL has clicks or 100+ impressions but is not a current V2 page; requires human decision before cutover.";
  if (String(row.path || "").includes("/buyback/")) return "Legacy per-SKU buyback URL has no traffic signal; do not rebuild model-specific quote spam.";
  if (action === "leave_404") return "Indexed legacy/generated URL has no meaningful traffic signal; do not recreate old pSEO risk.";
  return row.reason || status;
}

function priorityFor(tier, action) {
  if (tier === "P0") return "critical";
  if (tier === "P1") return "high";
  if (action === "manual_review") return "medium";
  if (tier === "P2") return "medium";
  return "low";
}

const upgradeRows = indexedRows.map((row) => {
  const path = normalizePath(row.path || row.normalized_url);
  const status = currentV2Status(row);
  const tier = trafficTier(row);
  const action = actionFor(row, status);
  const target = targetFor(row, action, status);
  const canonical = action === "upgrade_existing_200" || action === "build_safe_200" ? canonicalFor(path) : target || "";
  const redirectRequired = action === "redirect_301";
  const buildRequired = action === "build_safe_200";
  const noindexRequired = action === "noindex";

  return {
    url: row.url,
    normalized_url: row.normalized_url,
    host: row.host,
    path: row.path,
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    last_crawled: row.last_crawled_if_available || "",
    indexed_status: row.indexed_status || "",
    current_v2_status: status,
    page_type: row.page_type || "",
    location: row.location || "",
    service_intent: row.service_intent || "",
    content_quality_risk: contentRisk(row),
    claim_risk: claimRisk(row),
    traffic_tier: tier,
    upgrade_action: action,
    target_url: target,
    canonical_url: canonical,
    noindex_required: noindexRequired,
    build_required: buildRequired,
    redirect_required: redirectRequired,
    reason: reasonFor(row, action, status),
    priority: priorityFor(tier, action),
    notes: row.notes || "",
  };
});

const clickedLeft404 = upgradeRows.filter((row) => row.clicks > 0 && ["leave_404", "return_410"].includes(row.upgrade_action));
const highImpressionUnreviewed = upgradeRows.filter(
  (row) => row.impressions >= 100 && ["leave_404", "return_410"].includes(row.upgrade_action)
);
if (clickedLeft404.length || highImpressionUnreviewed.length) {
  console.error({ clickedLeft404, highImpressionUnreviewed });
  process.exit(1);
}

const redirectRows = upgradeRows
  .filter((row) => row.upgrade_action === "redirect_301")
  .map((row) => ({
    source_url: row.url,
    source_path: redirectBySource.get(normalizePath(row.path || row.normalized_url))?.source || row.path,
    indexed_path: row.path,
    host: row.host,
    clicks: row.clicks,
    impressions: row.impressions,
    page_type: row.page_type,
    location: row.location,
    service_intent: row.service_intent,
    target_url: row.target_url,
    redirect_required: true,
    redirect_configured: row.current_v2_status === "redirect_configured" || row.current_v2_status === "host_canonicalization_redirect",
    reason: row.reason,
    priority: row.priority,
  }));

writeOutputs("data/gsc-indexed-url-upgrade-map", upgradeRows);
writeOutputs("data/gsc-indexed-redirect-map", redirectRows);

console.log(
  JSON.stringify(
    {
      indexed: upgradeRows.length,
      redirects: redirectRows.length,
      byAction: countBy(upgradeRows, "upgrade_action"),
      byTier: countBy(upgradeRows, "traffic_tier"),
      clickedProtected: upgradeRows.filter((row) => row.clicks > 0 && !["leave_404", "return_410"].includes(row.upgrade_action)).length,
      highImpressionProtected: upgradeRows.filter((row) => row.impressions >= 100 && !["leave_404", "return_410"].includes(row.upgrade_action)).length,
    },
    null,
    2
  )
);

function writeOutputs(basePath, rows) {
  writeFileSync(`${basePath}.json`, JSON.stringify({ generatedAt: new Date().toISOString(), count: rows.length, rows }, null, 2));
  writeFileSync(`${basePath}.csv`, toCsv(rows));
}

function toCsv(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function countBy(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key]] = (acc[row[key]] || 0) + 1;
    return acc;
  }, {});
}
