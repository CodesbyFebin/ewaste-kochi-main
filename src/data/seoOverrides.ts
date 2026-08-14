export interface SeoOverride {
  title: string;
  description: string;
  intentional: true;
  source: string;
  reason: string;
}

/**
 * Intentional, evidence-backed SERP overrides only.
 *
 * Page components remain the default source of title/description. An entry here
 * is allowed to win only when it is explicitly marked intentional and records
 * why/source provenance. This prevents silent component-level metadata drift.
 */
export const SEO_OVERRIDES: Record<string, SeoOverride> = {
  "/": {
    title: "E-Waste Recycling in Kochi | Free Doorstep Pickup",
    description: "Recycle old electronics in Kochi with doorstep pickup. Laptops, computers, TVs, batteries and IT equipment. Share your location to check pickup feasibility.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "High-impression homepage query set needs direct Kochi recycling intent.",
  },
  "/services/electronics-recycling-near-me/": {
    title: "Electronics Recycling Near Me in Kochi | Free Doorstep Pickup",
    description: "Looking for electronics recycling near you in Kochi? Check doorstep pickup for laptops, computers, TVs, batteries and IT equipment by sharing your location and item list.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Preserve near-me local intent tested in Search Console.",
  },
  "/recycling/": {
    title: "E-Waste Recycling in Kochi | Electronics Pickup Service",
    description: "Recycle laptops, computers, phones, TVs, batteries and IT equipment in Kochi. See accepted items, data-safety options and how to check doorstep pickup feasibility.",
    intentional: true,
    source: "GSC zero-click intent separation 2026-08-15",
    reason: "Keep the service page on transactional recycling intent and leave the where-to answer intent to the dedicated guide URL.",
  },
  "/blog/where-to-recycle-old-electronics-in-kochi/": {
    title: "Where to Recycle Old Electronics in Kochi | 2026 Guide",
    description: "Find where to recycle old electronics in Kochi, what items can be collected, how doorstep pickup works, and what to do with batteries or data-bearing devices.",
    intentional: true,
    source: "GSC zero-click opportunity analysis 2026-08-15",
    reason: "Assign the high-impression 'where to recycle old electronics' informational intent to one dedicated canonical guide instead of competing with /recycling/.",
  },
  "/marketplace/": {
    title: "Used Electronics Marketplace in Kochi | Buy & Sell Old Devices",
    description: "Buy or sell used electronics in Kochi. Browse available devices and learn how condition, testing, data safety and pickup affect used-electronics transactions.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Remove unsupported guarantee language while preserving marketplace intent.",
  },
  "/battery-recycling/": {
    title: "Battery Recycling in Kochi | UPS, Inverter & Lithium Pickup",
    description: "Recycle UPS, inverter, laptop, phone and lithium batteries in Kochi. See safe handling guidance and check local pickup feasibility before handover.",
    intentional: true,
    source: "GSC zero-click intent separation 2026-08-15",
    reason: "Keep the service page transactional and leave the where-to answer intent to the dedicated battery guide.",
  },
  "/blog/where-to-recycle-batteries-in-kochi/": {
    title: "Where to Recycle Batteries in Kochi | Safe Pickup Guide",
    description: "Find where to recycle UPS, inverter, laptop, phone and lithium batteries in Kochi, including safe steps for swollen or damaged batteries and pickup checks.",
    intentional: true,
    source: "GSC zero-click opportunity analysis 2026-08-15",
    reason: "Assign the high-impression 'where to recycle batteries' informational intent to one dedicated canonical guide.",
  },
  "/sell-electronics/": {
    title: "Sell Old Electronics in Kochi + Free Pan-India Ship-In",
    description: "Sell laptops, phones, tablets for cash. Kochi doorstep pickup — free. Pan-India ship-in — free, we cover Shiprocket. Photo-based quote, final price on inspection.",
    intentional: true,
    source: "GSC rewrite 2026-08-14; Shiprocket operation confirmed 2026-08-05",
    reason: "Expose the verified category-bounded pan-India ship-in differentiator.",
  },
  "/locations/kozhikode/": {
    title: "E-Waste Recycling in Kozhikode, Kerala | Pickup Feasibility",
    description: "E-waste recycling guidance for Kozhikode, Kerala. Check pickup feasibility for old electronics, batteries and IT equipment before arranging collection.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page with proven search demand.",
  },
  "/locations/thiruvananthapuram/": {
    title: "E-Waste Recycling in Thiruvananthapuram | Pickup Feasibility",
    description: "E-waste recycling guidance for Thiruvananthapuram, Kerala. Check whether pickup is feasible for electronics, batteries and IT equipment in your area.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page with proven search demand.",
  },
  "/blog/ewaste-donation-reuse-guide-kochi/": {
    title: "Where to Donate Old Electronics in Kochi | Pickup + Ship-In",
    description: "Find where to donate working laptops, phones and tablets. Kochi doorstep pickup plus free pan-India ship-in for eligible small-device categories. WhatsApp item details first.",
    intentional: true,
    source: "GSC zero-click opportunity analysis 2026-08-15; Shiprocket operation confirmed 2026-08-05",
    reason: "Align the existing high-impression donation guide directly to the 'where to donate electronics' query without creating a competing new URL.",
  },
  "/locations/kakkanad/": {
    title: "E-Waste Collection in Kakkanad | Free Pickup for Homes & Offices",
    description: "Check e-waste collection in Kakkanad for homes, offices and IT equipment. Learn what can be collected and how to confirm pickup for your address.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected high-value Kochi location page.",
  },
  "/locations/thrissur/": {
    title: "E-Waste Recycling in Thrissur, Kerala | Pickup Feasibility",
    description: "E-waste recycling guidance for Thrissur, Kerala. Check pickup feasibility for old electronics, batteries and office IT equipment before booking.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page with proven search demand.",
  },
  "/locations/kollam/": {
    title: "E-Waste Recycling in Kollam, Kerala | Pickup Feasibility",
    description: "E-waste recycling guidance for Kollam, Kerala. Check collection feasibility for old electronics, batteries and IT equipment in your area.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page with proven search demand.",
  },
  "/locations/kadavanthra/": {
    title: "E-Waste Collection in Kadavanthra, Kochi | Free Pickup",
    description: "Check e-waste collection in Kadavanthra, Kochi for homes and offices. See accepted electronics and how to confirm doorstep pickup.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected local-intent page with existing search value.",
  },
  "/contact/": {
    title: "Contact Ewaste Kochi | E-Waste Pickup & Recycling",
    description: "Contact Ewaste Kochi to ask about e-waste pickup, electronics recycling, battery handling, data destruction and service availability in Kerala.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Preserve direct branded/contact intent.",
  },
  "/blog/free-e-waste-pickup-kochi/": {
    title: "Free E-Waste Pickup in Kochi | How Doorstep Collection Works",
    description: "Learn how free e-waste pickup works in Kochi, what items are collected, what details to send, and how pickup feasibility is confirmed.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Existing indexed article with search demand; keep snippet aligned to visible content.",
  },
  "/locations/ernakulam-south/": {
    title: "E-Waste Collection in Ernakulam South | Kochi Pickup",
    description: "Check e-waste collection in Ernakulam South, Kochi for homes and offices. Share your location and item list to confirm pickup feasibility.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected local-intent page.",
  },
  "/locations/aluva/": {
    title: "E-Waste Collection in Aluva | Free Pickup Near Kochi",
    description: "Check e-waste collection in Aluva for old electronics, batteries and IT equipment. Learn what can be collected and how to confirm pickup.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page with proven search demand.",
  },
  "/locations/malappuram/": {
    title: "E-Waste Recycling in Malappuram, Kerala | Pickup Feasibility",
    description: "E-waste recycling guidance for Malappuram, Kerala. Check collection feasibility for old electronics, batteries and IT equipment before arranging pickup.",
    intentional: true,
    source: "GSC P99 CTR pass 2026-08-10",
    reason: "Protected location page; keep feasibility wording rather than unsupported service guarantee.",
  },
};

export function resolveSeoMetadata(path: string, pageTitle: string, pageDescription: string) {
  const override = SEO_OVERRIDES[path];
  if (!override) {
    return { title: pageTitle, description: pageDescription, source: "page" as const };
  }

  if (override.intentional !== true || !override.reason.trim() || !override.source.trim()) {
    throw new Error(`SEO override for ${path} is missing explicit intent/provenance metadata.`);
  }

  return {
    title: override.title,
    description: override.description,
    source: "override" as const,
    override,
  };
}
