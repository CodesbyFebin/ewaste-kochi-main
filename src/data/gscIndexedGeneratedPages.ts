import type { RouteEntry } from "./routes";
import gscIndexedMap from "../../data/gsc-indexed-url-upgrade-map.json";

interface GscIndexedRow {
  path: string;
  clicks: number | string;
  impressions: number | string;
  page_type: string;
  location: string;
  service_intent: string;
  traffic_tier: string;
  upgrade_action: string;
  current_v2_status: string;
}

export interface IndexedGeneratedPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  quickAnswer: string;
  category: "location-service" | "legacy-blog" | "buyback" | "service" | "ml-service" | "legacy-location" | "legal";
  locationSlug?: string;
  serviceSlug?: string;
  categorySlug?: string;
  slug?: string;
  modelParam?: string;
  locationName?: string;
  serviceName: string;
  audience: string;
  localIntent: string;
  items: string[];
  serviceHref: string;
  relatedLinks: { label: string; href: string }[];
  themes: string[];
  faqs: { q: string; a: string }[];
  priority: number;
  sitemapGroup: RouteEntry["sitemapGroup"];
  type: RouteEntry["type"];
  lang: RouteEntry["lang"];
}

const rows = (gscIndexedMap as { rows: GscIndexedRow[] }).rows;

const generatedCandidateTypes = new Set([
  "location-service-matrix",
  "location-page",
  "other-legacy-service",
  "service-page",
]);

const serviceNames: Record<string, string> = {
  "air-conditioner-recycling-kochi": "AC and Appliance Recycling",
  "battery-recycling-kochi": "Battery Recycling",
  "certificate-of-destruction-kochi": "Data Destruction Documentation",
  "computer-recycling-near-me": "Computer Recycling",
  "corporate-ewaste-kochi": "Corporate E-Waste Pickup",
  "data-destruction-kochi": "Data Destruction",
  "dpdp-act-compliance-kochi": "DPDP Device Disposal Planning",
  "e-waste-recycling-kochi": "E-Waste Recycling",
  "electronic-waste-disposal": "Electronics Disposal",
  "electronics-recycling-near-me": "Electronics Recycling",
  "free-ewaste-pickup-kochi": "E-Waste Pickup",
  "hard-drive-degaussing-kochi": "Hard Drive Degaussing",
  "hard-drive-destruction-kochi": "Hard Drive Destruction",
  "hard-drive-shredding-kochi": "Hard Drive Shredding",
  "it-asset-inventory-audit": "IT Asset Inventory Audit",
  "itad-kochi": "ITAD",
  "laptop-buyback-kochi": "Laptop Buyback",
  "laptop-recycling-near-me": "Laptop Recycling",
  "mobile-recycling-kochi": "Mobile Phone Recycling",
  "network-equipment-disposal-kochi": "Network Equipment Disposal",
  "old-computer-disposal": "Old Computer Disposal",
  "printer-recycling-kochi": "Printer Recycling",
  "secure-computer-recycling": "Computer Recycling",
  "secure-laptop-disposal": "Laptop Data Safety and Disposal",
  "sell-old-electronics": "Sell Old Electronics",
  "sell-electronics-kochi": "Sell Electronics",
  "server-recycling-kochi": "Server Recycling",
  "tv-monitor-recycling-kochi": "TV and Monitor Recycling",
  "ups-inverter-recycling-kochi": "UPS and Inverter Battery Recycling",
};

const serviceHrefs: Record<string, string> = {
  "air-conditioner-recycling-kochi": "/recycling/",
  "battery-recycling-kochi": "/battery-recycling/",
  "certificate-of-destruction-kochi": "/data-destruction-certificate-sample/",
  "computer-recycling-near-me": "/computer-scrap-buyers-kochi/",
  "corporate-ewaste-kochi": "/blog/corporate-ewaste/",
  "data-destruction-kochi": "/data-destruction/",
  "dpdp-act-compliance-kochi": "/data-destruction/",
  "e-waste-recycling-kochi": "/recycling/",
  "electronic-waste-disposal": "/recycling/",
  "electronics-recycling-near-me": "/services/electronics-recycling-near-me/",
  "free-ewaste-pickup-kochi": "/pickup/",
  "hard-drive-degaussing-kochi": "/services/hard-drive-degaussing-kochi/",
  "hard-drive-destruction-kochi": "/data-destruction/",
  "hard-drive-shredding-kochi": "/hard-drive-shredding/",
  "it-asset-inventory-audit": "/services/it-asset-inventory-audit/",
  "itad-kochi": "/itad/",
  "laptop-buyback-kochi": "/sell-electronics/",
  "laptop-recycling-near-me": "/blog/laptop-computer-recycling/",
  "mobile-recycling-kochi": "/blog/mobile-phone-recycling/",
  "network-equipment-disposal-kochi": "/server-recycling-kochi/",
  "old-computer-disposal": "/computer-scrap-buyers-kochi/",
  "printer-recycling-kochi": "/blog/printer-peripheral-recycling/",
  "secure-computer-recycling": "/computer-scrap-buyers-kochi/",
  "secure-laptop-disposal": "/data-destruction/",
  "sell-old-electronics": "/sell-electronics/",
  "sell-electronics-kochi": "/sell-electronics/",
  "server-recycling-kochi": "/server-recycling-kochi/",
  "tv-monitor-recycling-kochi": "/tv-recycling-kochi/",
  "ups-inverter-recycling-kochi": "/battery-recycling/",
};

const unsafeTitleWords = new Set([
  "approved",
  "authorized",
  "certified",
  "government",
  "iso",
  "verified",
  "best",
  "top",
  "zero",
  "landfill",
]);

function numberValue(value: number | string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function canonicalPath(path: string): string {
  if (path.endsWith(".html")) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

function titleCase(value: string): string {
  return value
    .split("-")
    .filter((part) => part && !/^\d+$/.test(part) && !unsafeTitleWords.has(part))
    .map((part) => (part.length <= 3 ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
    .join(" ")
    .replace(/\bItad\b/g, "ITAD")
    .replace(/\bDpdp\b/g, "DPDP")
    .replace(/\bUps\b/g, "UPS")
    .replace(/\bTv\b/g, "TV")
    .replace(/\bAc\b/g, "AC")
    .replace(/\bKspcb\b/g, "KSPCB")
    .replace(/\bNist\b/g, "NIST");
}

function serviceName(slug: string): string {
  return serviceNames[slug] ?? titleCase(slug.replace(/-kochi$/, ""));
}

function serviceHref(slug: string): string {
  return serviceHrefs[slug] ?? "/recycling/";
}

function priorityFor(row: GscIndexedRow): number {
  const clicks = numberValue(row.clicks);
  const impressions = numberValue(row.impressions);
  if (clicks >= 5 || impressions >= 100) return 0.55;
  if (clicks > 0 || impressions >= 20) return 0.45;
  return 0.35;
}

function modelName(modelParam: string): string {
  return modelParam
    .replace(/\.html$/, "")
    .replace(/^sell-/, "")
    .split("-")
    .filter(Boolean)
    .map((part) => (part.length <= 3 ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1)))
    .join(" ")
    .replace(/\bHp\b/g, "HP")
    .replace(/\bAsus\b/g, "ASUS");
}

function commonFaqs(topic: string, service: string): { q: string; a: string }[] {
  return [
    {
      q: `Is this ${topic.toLowerCase()} page a current Ewaste Kochi service page?`,
      a: `This page preserves an already indexed legacy URL and routes users to current ${service.toLowerCase()} guidance. Pickup, quote and documentation details are confirmed only after reviewing item type, quantity, condition and location.`,
    },
    {
      q: "Does this page guarantee pickup?",
      a: "No. Pickup feasibility depends on the items, access details, location and route availability. Share photos and location first so the team can confirm what is practical.",
    },
    {
      q: "Can I get a quote from this page?",
      a: "Yes. Send item photos, working condition, quantity and location. Any estimate is preliminary until physical inspection confirms condition and current market factors.",
    },
    {
      q: "What should I prepare before handover?",
      a: "Separate batteries, back up and remove data from devices where possible, keep accessories together, and mention damaged or swollen items before pickup.",
    },
  ];
}

function locationServicePage(row: GscIndexedRow): IndexedGeneratedPage {
  const path = canonicalPath(row.path);
  const [, , locationSlug = "", serviceSlug = ""] = path.split("/");
  const locationName = titleCase(locationSlug);
  const service = serviceName(serviceSlug);
  const topic = `${service} in ${locationName}`;
  return {
    path,
    title: `${topic} | Indexed Service Guide`,
    description: `Safe indexed guide for ${service.toLowerCase()} in ${locationName}. Confirm pickup feasibility, item condition, data or battery needs, and the correct Ewaste Kochi service route.`,
    h1: topic,
    eyebrow: "Indexed location-service guide",
    quickAnswer: `${topic} is handled as a feasibility-first enquiry. Send item photos, quantity, condition and exact area so Ewaste Kochi can confirm whether pickup, recycling, resale review, data destruction or another service route fits.`,
    category: "location-service",
    locationSlug,
    serviceSlug,
    locationName,
    serviceName: service,
    audience: `${locationName} households, apartments, shops, offices and facility teams with real electronics, batteries or IT assets to review`,
    localIntent: `${locationName} search intent is preserved here without claiming a fixed branch, promised route or unsupported local authorization.`,
    items: ["laptops", "desktops", "monitors", "batteries", "printers", "servers", "phones", "network equipment", "hard drives", "mixed IT scrap"],
    serviceHref: serviceHref(serviceSlug),
    relatedLinks: [
      { label: "Main service", href: serviceHref(serviceSlug) },
      { label: "Book pickup", href: "/pickup/" },
      { label: "Locations", href: "/locations/" },
      { label: "Contact", href: "/contact/" },
    ],
    themes: [
      `How ${service.toLowerCase()} enquiries work in ${locationName}`,
      "What details to send before pickup confirmation",
      "When recycling, resale, ITAD or data handling is the better route",
      "Battery, data and damaged-device safety checks",
      "How to avoid old generated claim confusion",
      "What to do after the service route is confirmed",
    ],
    faqs: commonFaqs(topic, service),
    priority: priorityFor(row),
    sitemapGroup: "locations",
    type: "location",
    lang: "en-IN",
  };
}

function legacyBlogsPage(row: GscIndexedRow): IndexedGeneratedPage {
  const path = canonicalPath(row.path);
  const parts = path.split("/").filter(Boolean);
  const categorySlug = parts[1] ?? "legacy";
  const slug = parts.at(-1) ?? "legacy-guide";
  const topic = titleCase(slug);
  const service = serviceName(row.service_intent || slug);
  return {
    path,
    title: `${topic} | Safe Indexed Archive`,
    description: `Safe current archive page for ${topic.toLowerCase()}, replacing old generated blog patterns with practical Ewaste Kochi recycling, pickup and data safety guidance.`,
    h1: topic,
    eyebrow: "Indexed archive guide",
    quickAnswer: `This archive URL is kept live because it was already discovered. Use it as a safe current guide: list the items, share photos, mention batteries or data, and confirm the right Ewaste Kochi route before handover.`,
    category: "legacy-blog",
    categorySlug,
    slug,
    serviceName: service,
    audience: "Kochi search users, households, office admins and facility teams who found an older indexed blog URL",
    localIntent: "Kochi and Ernakulam users need current service guidance, not old auto-generated location claims.",
    items: ["laptops", "phones", "batteries", "printers", "servers", "hard drives", "monitors", "cables"],
    serviceHref: "/blog/",
    relatedLinks: [
      { label: "Blog hub", href: "/blog/" },
      { label: "Recycling", href: "/recycling/" },
      { label: "Pickup", href: "/pickup/" },
      { label: "Data destruction", href: "/data-destruction/" },
    ],
    themes: [
      `What ${topic.toLowerCase()} means now`,
      "How to prepare a useful enquiry",
      "How to handle batteries and data-bearing devices",
      "How this archive URL connects to current services",
      "What old generated pages should no longer imply",
      "Next steps for Kochi users",
    ],
    faqs: commonFaqs(topic, service),
    priority: priorityFor(row),
    sitemapGroup: "blog",
    type: "blog",
    lang: "en-IN",
  };
}

function buybackPage(row: GscIndexedRow, ml = false): IndexedGeneratedPage {
  const path = canonicalPath(row.path);
  const modelParam = path.split("/").filter(Boolean).at(-1) ?? "sell-used-laptop-kochi.html";
  const model = modelName(modelParam);
  const topic = `${model} Buyback`;
  return {
    path,
    title: `${model} Buyback in Kochi | Condition-Based Quote`,
    description: `Safe indexed laptop buyback page for ${model}. Share photos, working condition, accessories and location for a condition-based quote check in Kochi.`,
    h1: `${model} Buyback in Kochi`,
    eyebrow: ml ? "Malayalam indexed buyback guide" : "Indexed laptop buyback guide",
    quickAnswer: `For ${model} buyback, Ewaste Kochi needs photos, model details, condition, accessories and location. The final value is not fixed on this page; it is confirmed only after inspection.`,
    category: "buyback",
    modelParam,
    serviceName: "Laptop Buyback",
    audience: "Kochi laptop sellers comparing resale, part recovery and recycling options",
    localIntent: "This preserves an indexed model URL without publishing fixed model prices or artificial best-price claims.",
    items: ["laptop", "charger", "battery", "SSD or hard drive", "RAM", "screen", "keyboard", "accessories"],
    serviceHref: "/sell-electronics/",
    relatedLinks: [
      { label: "Sell electronics", href: "/sell-electronics/" },
      { label: "Marketplace", href: "/marketplace/" },
      { label: "Scrap price guide", href: "/e-waste-scrap-prices-kochi/" },
      { label: "Data destruction", href: "/data-destruction/" },
    ],
    themes: [
      "What affects laptop resale value",
      "Photos that help quote accuracy",
      "How working and non-working devices differ",
      "Data removal before selling a laptop",
      "When recycling is better than resale",
      "How inspection confirms the final quote",
    ],
    faqs: commonFaqs(topic, "Laptop Buyback"),
    priority: priorityFor(row),
    sitemapGroup: ml ? "ml" : "services",
    type: "service",
    lang: ml ? "ml-IN" : "en-IN",
  };
}

function serviceAliasPage(row: GscIndexedRow, ml = false): IndexedGeneratedPage {
  const path = canonicalPath(row.path);
  const serviceSlug = path.split("/").filter(Boolean).at(-1) ?? row.service_intent;
  const service = serviceName(serviceSlug);
  const topic = ml ? `${service} Malayalam Guide` : service;
  return {
    path,
    title: `${topic} | Ewaste Kochi Indexed Service`,
    description: `Safe indexed guide for ${service.toLowerCase()} with current Ewaste Kochi pickup, recycling, safety and quote-confirmation guidance.`,
    h1: topic,
    eyebrow: ml ? "Malayalam indexed service guide" : "Indexed service guide",
    quickAnswer: `${service} requests should start with item photos, quantity, condition and location. Ewaste Kochi confirms the service route before pickup or quote finalization.`,
    category: ml ? "ml-service" : "service",
    serviceSlug,
    serviceName: service,
    audience: ml ? "Malayalam-speaking Kochi users who need practical service guidance" : "Kochi households, shops, offices and facility teams",
    localIntent: ml ? "Malayalam support is available through phone or WhatsApp, while service feasibility still depends on item and location details." : "Kochi users need a current service path that does not rely on old generated pages.",
    items: ["laptops", "desktops", "batteries", "UPS units", "phones", "printers", "servers", "monitors"],
    serviceHref: serviceHref(serviceSlug),
    relatedLinks: [
      { label: "Current service", href: serviceHref(serviceSlug) },
      { label: "Pickup", href: "/pickup/" },
      { label: "Contact", href: "/contact/" },
      { label: "Services", href: "/services/" },
    ],
    themes: [
      `How ${service.toLowerCase()} works`,
      "What details help confirmation",
      "How pickup feasibility is checked",
      "Safety steps before handover",
      "Quote and documentation expectations",
      "Related current service pages",
    ],
    faqs: commonFaqs(topic, service),
    priority: priorityFor(row),
    sitemapGroup: ml ? "ml" : "services",
    type: "service",
    lang: ml ? "ml-IN" : "en-IN",
  };
}

function legalAliasPage(row: GscIndexedRow): IndexedGeneratedPage {
  return {
    path: canonicalPath(row.path),
    title: "Privacy Policy | Ewaste Kochi Legacy URL",
    description: "Privacy policy legacy URL for Ewaste Kochi, with current links to the active privacy page, contact page and service enquiry flow.",
    h1: "Privacy Policy",
    eyebrow: "Legacy legal URL",
    quickAnswer: "This legacy privacy-policy URL is kept live for indexed users. The current privacy details are available on the active privacy page, and service enquiries can continue through WhatsApp or contact forms.",
    category: "legal",
    serviceName: "Privacy Policy",
    audience: "users looking for Ewaste Kochi privacy information from an older indexed URL",
    localIntent: "Legal URLs should stay stable and clear instead of returning an avoidable missing page.",
    items: ["contact details", "service enquiry data", "WhatsApp messages", "pickup details"],
    serviceHref: "/privacy/",
    relatedLinks: [
      { label: "Current privacy page", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Contact", href: "/contact/" },
      { label: "Home", href: "/" },
    ],
    themes: [
      "Why this legacy URL exists",
      "Where to find current privacy details",
      "What service enquiry data can include",
      "How to contact Ewaste Kochi",
    ],
    faqs: commonFaqs("Privacy Policy", "Privacy Policy"),
    priority: priorityFor(row),
    sitemapGroup: "legal",
    type: "legal",
    lang: "en-IN",
  };
}

function legacyLocationPage(row: GscIndexedRow): IndexedGeneratedPage {
  const path = canonicalPath(row.path);
  const locationSlug = path.split("/").filter(Boolean).at(-1) ?? "legacy-location";
  const locationName = titleCase(locationSlug);
  return {
    path,
    title: `${locationName} E-Waste Enquiry | Indexed Location Guide`,
    description: `Safe indexed location guide for ${locationName}. Use current Ewaste Kochi location and pickup pages to confirm feasibility before sending items.`,
    h1: `${locationName} E-Waste Enquiry`,
    eyebrow: "Indexed location alias",
    quickAnswer: `${locationName} is an older indexed location-style URL. Use this page to move from that URL into current pickup, recycling and location feasibility guidance.`,
    category: "legacy-location",
    locationSlug,
    locationName,
    serviceName: "E-Waste Pickup",
    audience: "users who reached an older Ewaste Kochi location URL",
    localIntent: "The page keeps the indexed URL useful without inventing a branch, map coordinate or permanent service claim.",
    items: ["laptops", "desktops", "batteries", "phones", "printers", "monitors", "mixed e-waste"],
    serviceHref: "/locations/",
    relatedLinks: [
      { label: "Locations", href: "/locations/" },
      { label: "Pickup", href: "/pickup/" },
      { label: "Recycling", href: "/recycling/" },
      { label: "Contact", href: "/contact/" },
    ],
    themes: [
      "How this indexed location URL should be used",
      "How to check pickup feasibility",
      "What item details matter most",
      "How to use the current locations directory",
    ],
    faqs: commonFaqs(locationName, "E-Waste Pickup"),
    priority: priorityFor(row),
    sitemapGroup: "locations",
    type: "location",
    lang: "en-IN",
  };
}

function buildPage(row: GscIndexedRow): IndexedGeneratedPage | undefined {
  if (
    !row.path.startsWith("/") ||
    row.current_v2_status !== "missing_not_built" ||
    row.upgrade_action === "redirect_301" ||
    row.path.startsWith("/locations/kalamassery-hitech-park/") ||
    !generatedCandidateTypes.has(row.page_type)
  ) {
    return undefined;
  }
  if (row.page_type === "location-service-matrix") return locationServicePage(row);
  if (row.page_type === "blogs-taxonomy-legacy") return legacyBlogsPage(row);
  if (row.page_type === "service-page") return serviceAliasPage(row);
  if (row.page_type === "location-page") return legacyLocationPage(row);
  if (row.path.startsWith("/buyback/laptops/")) return buybackPage(row);
  if (row.path.startsWith("/ml/buyback/laptops/")) return buybackPage(row, true);
  if (row.path === "/ml/services") return serviceAliasPage(row, true);
  if (row.path.startsWith("/ml/services/")) return serviceAliasPage(row, true);
  if (row.path === "/privacy-policy") return legalAliasPage(row);
  return undefined;
}

const staticHighIntentServiceRows: GscIndexedRow[] = [
  {
    path: "/services/computer-recycling-near-me/",
    clicks: 0,
    impressions: 0,
    page_type: "service-page",
    location: "",
    service_intent: "computer-recycling-near-me",
    traffic_tier: "manual-high-intent",
    upgrade_action: "build_safe_service_alias",
    current_v2_status: "missing_not_built",
  },
  {
    path: "/services/air-conditioner-recycling-kochi/",
    clicks: 0,
    impressions: 0,
    page_type: "service-page",
    location: "",
    service_intent: "air-conditioner-recycling-kochi",
    traffic_tier: "manual-high-intent",
    upgrade_action: "build_safe_service_alias",
    current_v2_status: "missing_not_built",
  },
];

export const INDEXED_GENERATED_PAGES: IndexedGeneratedPage[] = [...rows, ...staticHighIntentServiceRows]
  .map(buildPage)
  .filter((page): page is IndexedGeneratedPage => Boolean(page));

export const INDEXED_LOCATION_SERVICE_PAGES = INDEXED_GENERATED_PAGES.filter(
  (page) => page.category === "location-service"
);
export const INDEXED_LEGACY_BLOGS_PAGES = INDEXED_GENERATED_PAGES.filter((page) => page.category === "legacy-blog");
export const INDEXED_BUYBACK_PAGES = INDEXED_GENERATED_PAGES.filter(
  (page) => page.category === "buyback" && !page.path.startsWith("/ml/")
);
export const INDEXED_ML_BUYBACK_PAGES = INDEXED_GENERATED_PAGES.filter(
  (page) => page.category === "buyback" && page.path.startsWith("/ml/")
);
export const INDEXED_LEGACY_LOCATION_PAGES = INDEXED_GENERATED_PAGES.filter(
  (page) => page.category === "legacy-location"
);
export const INDEXED_SERVICE_ALIAS_PAGES = INDEXED_GENERATED_PAGES.filter((page) => page.category === "service");
export const INDEXED_ML_SERVICE_ALIAS_PAGES = INDEXED_GENERATED_PAGES.filter(
  (page) => page.category === "ml-service" && page.path !== "/ml/services/"
);
export const INDEXED_ML_SERVICES_INDEX_PAGE = INDEXED_GENERATED_PAGES.find((page) => page.path === "/ml/services/");
export const INDEXED_STANDALONE_ALIAS_PAGES = INDEXED_GENERATED_PAGES.filter((page) => page.category === "legal");

export const INDEXED_GENERATED_ROUTES: RouteEntry[] = INDEXED_GENERATED_PAGES.map((page) => ({
  path: page.path,
  changefreq: "monthly",
  priority: page.priority,
  title: page.title,
  description: page.description,
  type: page.type,
  sitemapGroup: page.sitemapGroup,
  lang: page.lang,
  status: page.type === "blog" ? "published" : undefined,
  contentSource: page.type === "blog" ? "legacy" : undefined,
  indexable: true,
}));
