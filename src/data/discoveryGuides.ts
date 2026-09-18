import type { RouteEntry } from "./routes";
import { LOCATION_GUIDES } from "./discoveryLocations";
import { LOCATION_GUIDES_2 } from "./discoveryLocations2";
import { DEFINITION_GUIDES } from "./discoveryDefinitions";
import { DEFINITION_GUIDES_2 } from "./discoveryCompliance2";
import { HOW_TO_GUIDES } from "./discoveryHowTo";
import { HOW_TO_GUIDES_2 } from "./discoveryHowTo2";
import { BUSINESS_GUIDES } from "./discoveryBusiness";
import { BUSINESS_GUIDES_2 } from "./discoveryBusiness2";
import { DEVICE_GUIDES } from "./discoveryDevices";
import { INDUSTRY_GUIDES_2 } from "./discoveryIndustries2";
import type { DiscoveryGuide, GuideCategory } from "./discoveryGuideTypes";

export const GUIDE_CATEGORIES: { id: GuideCategory; title: string; description: string; path: string }[] = [
  { id: "definitions", title: "E-Waste Definitions and FAQs", description: "Understand e-waste, EPR, CPCB registration, ITAD and data sanitization before choosing a disposal route.", path: "/e-waste-guides-definitions/" },
  { id: "how-to", title: "Electronics Recycling How-To Guides", description: "Prepare devices, compare resale options, arrange collection and request the right disposal records.", path: "/e-waste-guides-how-to/" },
  { id: "locations", title: "Kerala Recycling and Collection Guides", description: "Plan collection in Kochi and Kerala, check service availability and confirm a drop-off before travelling.", path: "/e-waste-guides-locations/" },
  { id: "business", title: "Business E-Waste and Compliance Guides", description: "Plan corporate asset retirement, vendor checks, EPR responsibilities and documented business collections.", path: "/e-waste-guides-business/" },
  { id: "devices", title: "Device-Specific Disposal Guides", description: "Find safe handling and recycling guidance for batteries, displays, appliances, solar equipment and campus electronics.", path: "/e-waste-guides-devices/" },
];

export const DISCOVERY_GUIDES: DiscoveryGuide[] = [...DEFINITION_GUIDES, ...DEFINITION_GUIDES_2, ...HOW_TO_GUIDES, ...HOW_TO_GUIDES_2, ...LOCATION_GUIDES, ...LOCATION_GUIDES_2, ...BUSINESS_GUIDES, ...BUSINESS_GUIDES_2, ...DEVICE_GUIDES, ...INDUSTRY_GUIDES_2];

export const DISCOVERY_ROUTES: RouteEntry[] = [
  ...GUIDE_CATEGORIES.map((category): RouteEntry => ({
    path: category.path,
    title: category.title,
    description: category.description,
    changefreq: "monthly",
    priority: 0.7,
    type: "core",
    sitemapGroup: "core",
    lang: "en-IN",
  })),
  ...DISCOVERY_GUIDES.map((guide): RouteEntry => ({
    path: `/${guide.slug}/`,
    title: guide.title,
    description: guide.description,
    changefreq: "monthly",
    priority: 0.6,
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  })),
];
