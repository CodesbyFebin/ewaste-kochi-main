import type { RouteEntry } from "./routes";

export interface LegacyIndexedBlogPage {
  path: string;
  title: string;
  description: string;
  h1: string;
  topic: string;
  category: string;
  audience: string;
  relatedLinks: { label: string; href: string }[];
}

const paths = [
  "/blog/ac-scrap-price-kerala/",
  "/blog/affordable-it-asset-disposition-in-kalamassery-complete-pricing-kalamassery/",
  "/blog/battery-disposal-india/",
  "/blog/battery-disposal-safety-checklist-kochi/",
  "/blog/battery-recycling-during-monsoon-kochi/",
  // Removed 2026-08-14: also declared as vercel.json redirect source
  // (→ /battery-recycling/). Cannot be both a live route and a legacy
  // redirect — redirect wins.
  // "/blog/battery-recycling-options-in-kochi-which-to-choose-kochi/",
  "/blog/best-e-waste-recycling-kochi/",
  "/blog/best-scrap-dealers-kochi-electronics/",
  // Removed 2026-08-14: also declared as vercel.json redirect source. Its
  // target /locations/ernakulam/ was a broken 2-hop chain; the redirect
  // has been repointed to /locations/ in the same commit.
  // "/blog/best-way-to-e-waste-collection-in-ernakulam-2026-ernakulam/",
  "/blog/bulk-e-waste-disposal-kochi/",
  "/blog/computer-scrap-dealers-kochi/",
  "/blog/corporate-data-destruction-services/",
  "/blog/corporate-ewaste-compliance-90-day-checklist/",
  "/blog/corporate-e-waste-collection-solutions-in-vyttila-vyttila/",
  "/blog/cost-of-data-destruction-in-edappally-2/",
  "/blog/data-security-disposal-checklist-kochi/",
  "/blog/dpdp-act-2023-it-disposal-compliance/",
  "/blog/e-waste-collection-near-me-kochi/",
  "/blog/e-waste-collection-problems-kalamassery/",
  "/blog/e-waste-recycling-kakkanad-kochi/",
  "/blog/e-waste-recycling-kalamassery-kochi/",
  "/blog/e-waste-recycling-process/",
  "/blog/e-waste-rules-2022-compliance-checklist-kochi/",
  "/blog/e-waste-laws-in-kalamassery-complete-guide-kalamassery-3-3/",
  "/blog/e-waste-laws-in-kochi-complete-guide-kochi-1/",
  "/blog/e-waste-laws-in-north-paravur-complete-guide-north-paravur/",
  "/blog/e-waste-management-it-companies/",
  "/blog/economic-benefits-of-data-destruction-in-ernakulam-ernakulam/",
  "/blog/economic-benefits-of-e-waste-collection-in-kalamassery-kalamassery/",
  "/blog/electronic-waste-collection-near-me-kochi/",
  "/blog/electronic-waste-disposal-kerala/",
  "/blog/enterprise-monitor-recycling-in-angamaly-angamaly/",
  "/blog/epr-compliance-checklist-india-kochi/",
  "/blog/esg-ewaste-reporting-template-kochi/",
  "/blog/ewaste-business-startup-cost-calculator/",
  "/blog/environmental-impact-ewaste/",
  "/blog/free-laptop-recycling-kochi/",
  "/blog/hard-drive-destruction-certificate-template/",
  "/blog/hard-drive-shredding-kochi/",
  "/blog/hdd-vs-ssd-destruction/",
  "/blog/how-destroy-hard-disk-data/",
  "/blog/how-to-choose-itad-provider/",
  "/blog/how-to-e-waste-collection-in-kochi/",
  "/blog/it-asset-disposal-kochi/",
  "/blog/itad/enterprise/affordable-itad-enterprise-tripunithura-115/",
  "/blog/itad/enterprise/best-itad-enterprise-panampilly-nagar-188/",
  "/blog/itad/enterprise/government-approved-itad-enterprise-cheranallur-24/",
  "/blog/itad/enterprise/government-approved-itad-enterprise-trivandrum-94/",
  "/blog/itad/enterprise/iso-certified-itad-enterprise-calicut-113/",
  "/blog/itad/enterprise/professional-itad-enterprise-thevara-3/",
  "/blog/itad/enterprise/safe-itad-enterprise-calicut-88/",
  "/blog/itad/enterprise/top-itad-enterprise-mg-road-11/",
  "/blog/itad/enterprise/verified-itad-enterprise-infopark-151/",
  "/blog/itad/enterprise/verified-itad-enterprise-trivandrum-165/",
  "/blog/kspcb-regulations-for-e-waste-collection-in-kalamassery-kalamassery/",
  "/blog/laptop-data-wipe-checklist/",
  // Removed 2026-08-14: also declared as vercel.json redirect source
  // (→ /e-waste-scrap-prices-kochi/). The undated sibling slug
  // "/blog/laptop-scrap-price-kochi/" remains a live legacy page.
  // "/blog/laptop-scrap-price-kochi-2026/",
  "/blog/laptop-scrap-price-kochi/",
  "/blog/legal-requirements-for-it-asset-disposition-in-ernakulam-ernakulam/",
  "/blog/mobile-scrap-price-kochi/",
  "/blog/mobile-phone-recycling-kochi/",
  "/blog/nist-800-88-data-wiping/",
  "/blog/office-computer-recycling-kerala/",
  "/blog/old-electronic-buyers-near-me-kochi/",
  "/blog/old-tv-disposal-kochi/",
  "/blog/pillars/bulk-e-waste/",
  "/blog/printer-recycling-kochi/",
  "/blog/printer-recycling-price-guide-for-north-paravur-north-paravur/",
  "/blog/printer-recycling-problems-in-north-paravur-solutions-north-paravur/",
  "/blog/recycling-electronics-helps-kerala/",
  "/blog/recycling/enterprise/best-recycling-enterprise-kakkanad-9/",
  "/blog/recycling/enterprise/fast-recycling-enterprise-mg-road-6/",
  "/blog/recycling/enterprise/trusted-recycling-enterprise-kaloor-8/",
  "/blog/school-ewaste-drive-checklist/",
  "/blog/secure-data-destruction-kochi/",
  "/blog/server-scrap-price-kochi/",
  "/blog/server-scrap-value-india/",
  "/blog/service-phone-buyback/",
  "/blog/topic-business/",
  "/blog/troubleshooting-server-recycling-in-kalamassery-kalamassery/",
  "/blog/tv-recycling-kochi/",
  "/blog/ups-battery-recycling-kochi/",
  "/blog/where-to-recycle-batteries-kochi/",
  "/blog/where-sell-ewaste-near-me/",
  "/blog/why-companies-destroy-data/",
  "/blog/why-data-destruction-important-businesses/",
  "/blog/zero-landfill-ewaste-checklist-kochi/",
];

const unsafeClaimWords = new Set([
  "approved",
  "authorized",
  "certified",
  "government",
  "iso",
  "verified",
  "best",
  "top",
  "free",
  "zero",
  "landfill",
]);

// Explicit allowlist of acronyms that should be uppercased in slug-derived
// titles. Previously the code uppercased ANY word ≤3 characters, which turned
// natural words like "how", "to", "of" into "HOW", "TO", "OF" — producing
// broken titles like "HOW TO Choose ITAD Provider" that killed CTR. Now every
// word is Title Cased first, then explicit acronyms are uppercased below.
function titleCase(value: string): string {
  return value
    .split("-")
    .filter((part) => part && !/^\d+$/.test(part) && !unsafeClaimWords.has(part))
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
    // Multi-letter acronyms — order matters (longer first to avoid partial matches)
    .replace(/\bKspcb\b/g, "KSPCB")
    .replace(/\bCpcb\b/g, "CPCB")
    .replace(/\bDpdp\b/g, "DPDP")
    .replace(/\bGdpr\b/g, "GDPR")
    .replace(/\bWeee\b/g, "WEEE")
    .replace(/\bOled\b/g, "OLED")
    .replace(/\bNist\b/g, "NIST")
    .replace(/\bItad\b/g, "ITAD")
    .replace(/\bRohs\b/g, "RoHS")
    .replace(/\bIot\b/g, "IoT")
    .replace(/\bDod\b/g, "DoD")
    .replace(/\bLcd\b/g, "LCD")
    .replace(/\bLed\b/g, "LED")
    .replace(/\bCrt\b/g, "CRT")
    .replace(/\bUps\b/g, "UPS")
    .replace(/\bPcb\b/g, "PCB")
    .replace(/\bPvc\b/g, "PVC")
    .replace(/\bEpr\b/g, "EPR")
    .replace(/\bAsm\b/g, "ASM")
    .replace(/\bMrf\b/g, "MRF")
    .replace(/\bBfr\b/g, "BFR")
    .replace(/\bHdd\b/g, "HDD")
    .replace(/\bSsd\b/g, "SSD")
    // 2-letter acronyms — allowlist only; naturally-occurring 2-letter words
    // like "to", "of", "on", "at", "in" stay Title Case (To, Of, On…)
    .replace(/\bAc\b/g, "AC")
    .replace(/\bPc\b/g, "PC")
    .replace(/\bTv\b/g, "TV")
    .replace(/\bIt\b/g, "IT")
    .replace(/\bMl\b/g, "ML")
    .replace(/\bAi\b/g, "AI");
}

function categoryFor(path: string): string {
  if (path.includes("/itad/enterprise/") || path.includes("itad") || path.includes("asset-disposition")) return "ITAD and business disposal";
  if (path.includes("data") || path.includes("hard-disk") || path.includes("hdd") || path.includes("nist")) return "data destruction";
  if (path.includes("battery")) return "battery recycling";
  if (path.includes("scrap") || path.includes("price") || path.includes("sell") || path.includes("buyback")) return "quote and resale guidance";
  if (path.includes("printer")) return "printer and peripheral recycling";
  if (path.includes("laptop") || path.includes("computer")) return "computer recycling";
  if (path.includes("corporate") || path.includes("enterprise") || path.includes("companies") || path.includes("office")) return "corporate e-waste";
  if (path.includes("laws") || path.includes("regulations")) return "compliance education";
  return "e-waste recycling";
}

function relatedLinksFor(category: string): { label: string; href: string }[] {
  if (category.includes("ITAD") || category.includes("corporate")) {
    return [
      { label: "ITAD", href: "/itad/" },
      { label: "Data destruction", href: "/data-destruction/" },
      { label: "Server recycling", href: "/server-recycling-kochi/" },
      { label: "Corporate e-waste pillar", href: "/blog/corporate-ewaste/" },
    ];
  }
  if (category.includes("data")) {
    return [
      { label: "Data destruction", href: "/data-destruction/" },
      { label: "Hard drive shredding", href: "/hard-drive-shredding/" },
      { label: "ITAD", href: "/itad/" },
      { label: "Data destruction pillar", href: "/blog/data-destruction/" },
    ];
  }
  if (category.includes("battery")) {
    return [
      { label: "Battery recycling", href: "/battery-recycling/" },
      { label: "Battery pillar", href: "/blog/battery-recycling/" },
      { label: "Pickup", href: "/pickup/" },
      { label: "Preparation guide", href: "/blog/preparation-safety-guides/" },
    ];
  }
  if (category.includes("quote") || category.includes("resale")) {
    return [
      { label: "Sell electronics", href: "/sell-electronics/" },
      { label: "Marketplace", href: "/marketplace/" },
      { label: "Scrap price guide", href: "/blog/scrap-price-guide/" },
      { label: "Computer scrap buyers", href: "/computer-scrap-buyers-kochi/" },
    ];
  }
  return [
    { label: "Recycling", href: "/recycling/" },
    { label: "Pickup", href: "/pickup/" },
    { label: "Blog hub", href: "/blog/" },
    { label: "Recycling basics", href: "/blog/recycling-basics/" },
  ];
}

export const LEGACY_INDEXED_BLOG_PAGES: LegacyIndexedBlogPage[] = paths.map((path) => {
  const lastSegment = path.split("/").filter(Boolean).at(-1) ?? "e-waste-guide";
  const numericParts = lastSegment.split("-").filter((part) => /^\d+$/.test(part));
  const yearSuffix = numericParts.find((part) => /^20\d{2}$/.test(part));
  const refSuffix = numericParts.find((part) => !/^20\d{2}$/.test(part));
  const suffix = [yearSuffix, refSuffix ? `Legacy Ref ${refSuffix}` : undefined].filter(Boolean).join(" ");
  const topic = `${titleCase(lastSegment) || "E-Waste Guide"}${suffix ? ` ${suffix}` : ""}`;
  const category = categoryFor(path);
  // Suffixes changed 2026-08-13 — old "| Ewaste Kochi Indexed Guide" and
  // "| Safe Kochi Guide" read as internal tooling leakage in the SERP and
  // are a documented CTR killer. Replaced with clean brand suffix on title,
  // no suffix on H1.
  const h1 = topic;
  return {
    path,
    title: `${topic} | Ewaste Kochi`,
    description: `${topic} in Kochi — free doorstep pickup, data-safe handling and current recycling guidance. Ewaste Kochi service across the metro. WhatsApp us.`,
    h1,
    topic,
    category,
    audience:
      category.includes("corporate") || category.includes("ITAD")
        ? "Kochi businesses, IT teams, facility managers and office administrators"
        : "Kochi households, apartment residents, shops and small offices",
    relatedLinks: relatedLinksFor(category),
  };
});

export const LEGACY_INDEXED_BLOG_ROUTES: RouteEntry[] = LEGACY_INDEXED_BLOG_PAGES.map((page) => ({
  path: page.path,
  changefreq: "monthly",
  priority: page.path.includes("/enterprise/") ? 0.45 : 0.55,
  title: page.title,
  description: page.description,
  type: "blog",
  sitemapGroup: "blog",
  lang: "en-IN",
  status: "published",
  contentSource: "legacy",
  indexable: true,
}));
