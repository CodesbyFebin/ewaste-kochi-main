import type { RouteEntry } from "./routes";

export interface ToolOption {
  label: string;
  value: string;
}

export interface ToolQuestion {
  id: string;
  label: string;
  type: "select" | "number" | "text";
  options?: ToolOption[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface ToolPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  quickAnswer: string;
  toolType: "scrap" | "data" | "pickup" | "decision" | "battery";
  ctaMessage: string;
  questions: ToolQuestion[];
  relatedLinks: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
}

export const TOOL_PAGES: ToolPage[] = [
  {
    slug: "scrap-value-calculator",
    title: "E-Waste Scrap Value Calculator Kochi | Quote Planning Tool",
    description:
      "Use this e-waste scrap value calculator to estimate quote potential for laptops, phones, desktops, batteries, printers and mixed electronics before messaging Ewaste Kochi.",
    h1: "E-Waste Scrap Value Calculator",
    eyebrow: "Quote planning tool",
    quickAnswer:
      "This calculator gives a planning band, not a final quote. Real value depends on item type, working condition, age, accessories, quantity and inspection.",
    toolType: "scrap",
    ctaMessage: "Hi, I used the scrap value calculator and want a condition-based quote.",
    questions: [
      {
        id: "device",
        label: "Item type",
        type: "select",
        options: [
          { label: "Laptop", value: "high" },
          { label: "Mobile phone", value: "high" },
          { label: "Desktop or CPU", value: "medium" },
          { label: "Monitor or TV", value: "low" },
          { label: "Printer or peripheral", value: "low" },
          { label: "UPS or inverter battery", value: "medium" },
          { label: "Mixed electronics", value: "medium" },
        ],
      },
      {
        id: "condition",
        label: "Condition",
        type: "select",
        options: [
          { label: "Working with accessories", value: "high" },
          { label: "Working without accessories", value: "medium" },
          { label: "Not working", value: "low" },
          { label: "Damaged or incomplete", value: "very-low" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        min: 1,
        max: 500,
        placeholder: "1",
      },
      {
        id: "data",
        label: "Contains personal or business data?",
        type: "select",
        options: [
          { label: "Yes", value: "data" },
          { label: "No", value: "no-data" },
          { label: "Not sure", value: "data" },
        ],
      },
    ],
    relatedLinks: [
      { label: "Sell electronics", href: "/sell-electronics/" },
      { label: "Marketplace", href: "/marketplace/" },
      { label: "Scrap price guide", href: "/e-waste-scrap-prices-kochi/" },
      { label: "Computer scrap buyers", href: "/computer-scrap-buyers-kochi/" },
    ],
    faqs: [
      {
        q: "Is the calculator result a final price?",
        a: "No. It is a planning band only. Final value is confirmed after item inspection, condition review and current market factors.",
      },
      {
        q: "What improves quote potential?",
        a: "Working condition, complete accessories, clear photos, model details and larger organised lots can improve the quality of the estimate.",
      },
      {
        q: "What should I send after using the calculator?",
        a: "Send photos, item count, condition, location and whether any device contains personal or business data.",
      },
    ],
  },
  {
    slug: "data-destruction-cost-estimator",
    title: "Data Destruction Cost Estimator Kochi | Wipe, Degauss or Shred",
    description:
      "Plan data destruction scope for hard drives, SSDs, laptops and servers in Kochi. Compare wiping, degaussing and physical destruction effort before requesting a quote.",
    h1: "Data Destruction Cost Estimator",
    eyebrow: "Data handling planner",
    quickAnswer:
      "The estimator identifies likely effort level, not a fixed fee. Method, media type, count, chain-of-custody needs and documentation requirements affect final scope.",
    toolType: "data",
    ctaMessage: "Hi, I used the data destruction estimator and need help planning a secure disposal.",
    questions: [
      {
        id: "media",
        label: "Media type",
        type: "select",
        options: [
          { label: "Hard drives", value: "medium" },
          { label: "SSDs", value: "high" },
          { label: "Laptops or desktops", value: "medium" },
          { label: "Servers or NAS", value: "high" },
          { label: "Mixed storage media", value: "high" },
        ],
      },
      {
        id: "method",
        label: "Preferred method",
        type: "select",
        options: [
          { label: "Software wiping", value: "medium" },
          { label: "Degaussing for HDDs", value: "medium" },
          { label: "Physical destruction", value: "high" },
          { label: "Not sure", value: "needs-check" },
        ],
      },
      {
        id: "count",
        label: "Number of devices or drives",
        type: "number",
        min: 1,
        max: 1000,
        placeholder: "10",
      },
      {
        id: "records",
        label: "Need disposal records?",
        type: "select",
        options: [
          { label: "Yes", value: "records" },
          { label: "No", value: "simple" },
          { label: "Not sure", value: "records" },
        ],
      },
    ],
    relatedLinks: [
      { label: "Data destruction", href: "/data-destruction/" },
      { label: "Hard drive shredding", href: "/hard-drive-shredding/" },
      { label: "Hard drive degaussing", href: "/services/hard-drive-degaussing-kochi/" },
      { label: "ITAD", href: "/itad/" },
    ],
    faqs: [
      {
        q: "Does this estimator provide a fixed cost?",
        a: "No. It helps define the likely effort band. Final scope depends on method, media type, quantity, access and documentation requirements.",
      },
      {
        q: "Which method should I choose?",
        a: "Choose after identifying the media type and your risk tolerance. Ask Ewaste Kochi before pickup if you are unsure.",
      },
      {
        q: "Can data destruction be combined with recycling pickup?",
        a: "Yes. Data handling should be discussed before collection so devices are routed correctly.",
      },
    ],
  },
  {
    slug: "pickup-eligibility-checker",
    title: "E-Waste Pickup Eligibility Checker Kochi | Area & Item Planner",
    description:
      "Check whether your e-waste pickup request is likely simple, needs review, or should be prepared as a bulk enquiry based on area, item type and quantity.",
    h1: "E-Waste Pickup Eligibility Checker",
    eyebrow: "Pickup planning tool",
    quickAnswer:
      "Pickup feasibility depends on area, item category, quantity, access and safety concerns. This checker helps you send the right details for confirmation.",
    toolType: "pickup",
    ctaMessage: "Hi, I used the pickup eligibility checker and want to confirm feasibility.",
    questions: [
      {
        id: "area",
        label: "Area",
        type: "select",
        options: [
          { label: "Kochi metro area", value: "core" },
          { label: "Ernakulam district", value: "near" },
          { label: "Other Kerala district", value: "needs-check" },
          { label: "Not sure", value: "needs-check" },
        ],
      },
      {
        id: "items",
        label: "Item group",
        type: "select",
        options: [
          { label: "Laptops, phones or small electronics", value: "simple" },
          { label: "TVs, monitors or printers", value: "needs-check" },
          { label: "UPS, inverter or lithium batteries", value: "battery" },
          { label: "Office IT assets", value: "bulk" },
          { label: "Mixed household e-waste", value: "needs-check" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        min: 1,
        max: 1000,
        placeholder: "3",
      },
      {
        id: "access",
        label: "Pickup access",
        type: "select",
        options: [
          { label: "Ground floor or lift available", value: "simple" },
          { label: "Stairs or heavy items", value: "needs-check" },
          { label: "Office security or loading bay", value: "bulk" },
        ],
      },
    ],
    relatedLinks: [
      { label: "Pickup service", href: "/pickup/" },
      { label: "Locations", href: "/locations/" },
      { label: "Electronics recycling near me", href: "/services/electronics-recycling-near-me/" },
      { label: "Preparation guide", href: "/blog/preparation-safety-guides/" },
    ],
    faqs: [
      {
        q: "Does this checker guarantee pickup?",
        a: "No. It helps classify the enquiry. Pickup is confirmed only after item, quantity, area and access details are reviewed.",
      },
      {
        q: "What makes a pickup need extra review?",
        a: "Heavy items, damaged batteries, larger office lots, non-core locations and unclear access details usually need review before scheduling.",
      },
      {
        q: "What should I send after using the checker?",
        a: "Send photos, item count, area, floor or loading details, and any battery or data concern.",
      },
    ],
  },
  {
    slug: "sell-or-recycle-decision-tool",
    title: "Sell or Recycle Electronics? Kochi Decision Tool",
    description:
      "Use this decision tool to decide whether old laptops, phones, desktops, monitors or office IT assets should be sold, reused, recycled or routed for data destruction.",
    h1: "Sell or Recycle Electronics?",
    eyebrow: "Decision tool",
    quickAnswer:
      "Working or repairable electronics may deserve resale review. Obsolete, damaged, incomplete or data-sensitive devices may need recycling or data destruction first.",
    toolType: "decision",
    ctaMessage: "Hi, I used the sell-or-recycle decision tool and need help choosing the right route.",
    questions: [
      {
        id: "working",
        label: "Does the device work?",
        type: "select",
        options: [
          { label: "Yes", value: "sell" },
          { label: "Partly", value: "needs-check" },
          { label: "No", value: "recycle" },
        ],
      },
      {
        id: "age",
        label: "Approximate age",
        type: "select",
        options: [
          { label: "Under 3 years", value: "sell" },
          { label: "3 to 6 years", value: "needs-check" },
          { label: "Over 6 years", value: "recycle" },
          { label: "Not sure", value: "needs-check" },
        ],
      },
      {
        id: "data",
        label: "Contains data?",
        type: "select",
        options: [
          { label: "Yes", value: "data" },
          { label: "No", value: "no-data" },
          { label: "Not sure", value: "data" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        min: 1,
        max: 1000,
        placeholder: "1",
      },
    ],
    relatedLinks: [
      { label: "Sell electronics", href: "/sell-electronics/" },
      { label: "Marketplace", href: "/marketplace/" },
      { label: "Recycling", href: "/recycling/" },
      { label: "Data destruction", href: "/data-destruction/" },
    ],
    faqs: [
      {
        q: "When should I sell instead of recycle?",
        a: "Consider resale review when the device works, has accessories, is not too old and can be safely prepared for handover.",
      },
      {
        q: "When is recycling better?",
        a: "Recycling is often better for damaged, obsolete, incomplete or unsafe items that are unlikely to be reused.",
      },
      {
        q: "What if the device contains data?",
        a: "Plan data removal or destruction before resale or recycling, especially for business devices.",
      },
    ],
  },
  {
    slug: "battery-safety-checker",
    title: "Battery Safety Checker Kochi | Swollen, Leaking or Damaged Battery Guide",
    description:
      "Use this battery safety checker for UPS, inverter, laptop, phone and lithium batteries before recycling or pickup in Kochi.",
    h1: "Battery Safety Checker",
    eyebrow: "Battery handling tool",
    quickAnswer:
      "Damaged, swollen, leaking or hot batteries need extra caution. Separate them, avoid pressure or puncture, keep them away from heat and share photos before pickup.",
    toolType: "battery",
    ctaMessage: "Hi, I used the battery safety checker and need safe battery recycling guidance.",
    questions: [
      {
        id: "type",
        label: "Battery type",
        type: "select",
        options: [
          { label: "UPS or inverter battery", value: "lead" },
          { label: "Laptop or mobile battery", value: "lithium" },
          { label: "Power bank or loose lithium cell", value: "lithium" },
          { label: "Not sure", value: "unknown" },
        ],
      },
      {
        id: "condition",
        label: "Condition",
        type: "select",
        options: [
          { label: "Normal", value: "normal" },
          { label: "Swollen", value: "high" },
          { label: "Leaking", value: "high" },
          { label: "Hot, burnt or damaged", value: "high" },
          { label: "Not sure", value: "needs-check" },
        ],
      },
      {
        id: "storage",
        label: "Current storage",
        type: "select",
        options: [
          { label: "Separated and dry", value: "good" },
          { label: "Mixed with electronics", value: "needs-check" },
          { label: "Near heat or flammable items", value: "high" },
        ],
      },
      {
        id: "quantity",
        label: "Quantity",
        type: "number",
        min: 1,
        max: 500,
        placeholder: "1",
      },
    ],
    relatedLinks: [
      { label: "Battery recycling", href: "/battery-recycling/" },
      { label: "Battery pillar guide", href: "/blog/battery-recycling/" },
      { label: "Pickup", href: "/pickup/" },
      { label: "Preparation guide", href: "/blog/preparation-safety-guides/" },
    ],
    faqs: [
      {
        q: "What should I do with a swollen battery?",
        a: "Do not press, puncture, charge or pack it tightly. Keep it separate, away from heat, and share photos before pickup.",
      },
      {
        q: "Can batteries be mixed with general e-waste?",
        a: "They can sometimes be collected in the same visit, but they should be separated and mentioned in advance.",
      },
      {
        q: "Can this checker replace professional advice?",
        a: "No. It is a basic preparation guide. If a battery is hot, smoking or actively leaking, treat it as urgent and follow local safety guidance.",
      },
    ],
  },
];

export const TOOL_ROUTES: RouteEntry[] = TOOL_PAGES.map((page) => ({
  path: `/tools/${page.slug}/`,
  changefreq: "monthly",
  priority: 0.65,
  title: page.title,
  description: page.description,
  type: "core",
  sitemapGroup: "core",
  lang: "en-IN",
}));
