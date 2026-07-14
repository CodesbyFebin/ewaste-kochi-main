// Registry of routes that actually exist as built pages in this Astro project.
// sitemap.xml (and its sub-sitemaps), content-index.json/.xml, and ai-sitemap.xml
// are all generated from this list only, so none of them can ever claim a URL
// that isn't really live in the current build. Extend this array in the same
// commit as each new page template.

import { SITE_URL } from "./site";

export interface RouteEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  title: string;
  description: string;
  type: "core" | "service" | "location" | "blog" | "trust" | "legal";
  sitemapGroup: "core" | "services" | "locations" | "legal" | "ml" | "blog";
  lang: "en-IN" | "ml-IN";
  // Path of this page's translation counterpart, if one exists and is built.
  hreflangPair?: string;
  // Publication governance for blog content (BLOG SCALE SAFETY GATE). Optional
  // and defaulted (published / manual / indexable) for every non-blog route;
  // every route of type "blog" carries an explicit value. A post is only
  // discoverable (sitemap, content-index, ai-sitemap, linked as a live guide)
  // when indexable is true — see src/lib/indexable.ts.
  status?: "published" | "review" | "draft";
  contentSource?: "manual" | "legacy" | "generated";
  indexable?: boolean;
}

export const ROUTES: RouteEntry[] = [
  {
    path: "/",
    changefreq: "weekly",
    priority: 1.0,
    title: "E-Waste Recycling Kochi | Free Pickup for Electronics, Batteries & IT Scrap",
    description:
      "Book e-waste pickup in Kochi for old electronics, laptops, batteries, IT assets and data destruction. WhatsApp Ewaste Kochi for safe recycling and pickup support.",
    type: "core",
    sitemapGroup: "core",
    lang: "en-IN",
    hreflangPair: "/ml/",
  },
  {
    path: "/recycling/",
    changefreq: "monthly",
    priority: 0.9,
    title: "Where to Recycle Old Electronics in Kochi | Free Pickup",
    description:
      "Recycle old electronics in Kochi with free doorstep pickup — laptops, desktops, monitors, printers and more. Data wiped first, no drop-off needed.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
    hreflangPair: "/ml/recycling/",
  },
  {
    path: "/locations/kakkanad/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste Collection in Kakkanad | Free Pickup for IT & Homes",
    description:
      "Doorstep e-waste pickup in Kakkanad, Kochi — laptops, servers, batteries, and IT hardware. Free pickup for offices and homes near Infopark and SmartCity.",
    type: "location",
    sitemapGroup: "locations",
    lang: "en-IN",
  },
  {
    path: "/locations/ernakulam-south/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste Pickup in Ernakulam South | Free Doorstep Collection",
    description:
      "Doorstep e-waste pickup in Ernakulam South, Kochi — homes and offices. Free collection, battery recycling, and data destruction available.",
    type: "location",
    sitemapGroup: "locations",
    lang: "en-IN",
  },
  {
    path: "/locations/kalamassery/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste Collection in Kalamassery | Industrial & Home Pickup",
    description:
      "Doorstep e-waste pickup in Kalamassery, Kochi — industrial units, educational institutions, and homes. Free collection, battery recycling, and data destruction.",
    type: "location",
    sitemapGroup: "locations",
    lang: "en-IN",
  },
  {
    path: "/blog/",
    changefreq: "weekly",
    priority: 0.8,
    title: "E-Waste Recycling Blog Kochi | Pickup, Scrap Price, Battery & ITAD Guides",
    description:
      "Read Ewaste Kochi guides on e-waste recycling, pickup near me, battery disposal, laptop recycling, scrap value, data destruction, ITAD and safe electronics disposal in Kochi.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/free-e-waste-pickup-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Free E-Waste Pickup in Kochi | Areas, Items & What to Prepare",
    description:
      "How free e-waste pickup works in Kochi — covered areas, accepted items, home vs office pickup, bulk pickup, and what to have ready before the team arrives.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/sell-old-laptop-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Sell Old Laptop in Kochi | Condition Checklist & Quote Guide",
    description:
      "A practical guide to selling your old laptop in Kochi — condition checklist, data wiping, what drives your quote, and options for damaged or bulk office laptops.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/what-is-ewaste/",
    changefreq: "monthly",
    priority: 0.6,
    title: "What Is E-Waste? A Beginner's Guide for Kochi Households & Offices",
    description:
      "What e-waste actually means, common examples, why it matters, and what to do with old electronics in Kochi instead of throwing them in the regular bin.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/e-waste-examples/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Examples: Common Electronic Items You Should Recycle",
    description:
      "A practical list of common e-waste items — computers, phones, batteries, office electronics, cables, and more — and which ones need extra care before recycling.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/e-waste-collection-near-me/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Collection Near Me: How to Choose a Safe Recycler",
    description:
      "How to find safe, legitimate e-waste collection near you — what to ask before handing over devices, pickup vs. drop-off, and why informal disposal carries real risk.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/what-is-epr-in-e-waste/",
    changefreq: "monthly",
    priority: 0.6,
    title: "What Is EPR in E-Waste Management? A Plain-Language Explainer",
    description:
      "Extended Producer Responsibility (EPR) explained simply — what it means, who it applies to, and how it connects producers, recyclers, and e-waste collection.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/e-waste-management-rules-2022/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Management Rules 2022: A Simple Guide for Businesses",
    description:
      "A plain-language overview of India's E-Waste (Management) Rules, 2022 — why they matter, who they apply to, and what businesses should know about disposal.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/where-to-recycle-old-electronics-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Where to Recycle Old Electronics in Kochi | Pickup, Reuse & Scrap Quote Guide",
    description:
      "Where to recycle old electronics in Kochi — doorstep pickup, drop-off options, resale, and scrap quotes compared, with what to prepare before collection.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/battery-recycling-near-me-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Battery Recycling Near Me in Kochi | Safe UPS, Inverter & Lithium Battery Guide",
    description:
      "Battery recycling near me in Kochi — safe handling for UPS, inverter, laptop and lithium batteries, including what to do with swollen or damaged cells.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-to-book-ewaste-pickup-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How to Book an E-Waste Pickup in Kochi | Step-by-Step Guide",
    description:
      "How to book an e-waste pickup in Kochi, step by step — what to send on WhatsApp, how feasibility and quotes are confirmed, and what to expect on pickup day.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-to-sell-old-electronics-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How to Sell Old Electronics in Kochi | Quote, Pickup & Safety Guide",
    description:
      "How to sell old electronics in Kochi safely — how condition-based quotes work, what to prepare, wiping your data first, and doorstep pickup for payment.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/laptop-recycling-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Laptop Recycling in Kochi | Pickup, Resale or Safe Disposal?",
    description:
      "Laptop recycling in Kochi — how to decide between resale and recycling, wiping your data first, and what happens to laptops after pickup.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/data-destruction-kochi-guide/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Data Destruction in Kochi | Hard Drive, Laptop & Business ITAD Guide",
    description:
      "Data destruction in Kochi for hard drives, laptops and servers — wiping, degaussing and shredding options, documentation, and what businesses should ask for.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/corporate-ewaste-pickup-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Corporate E-Waste Pickup in Kochi | Office IT Scrap & ITAD Checklist",
    description:
      "Corporate e-waste pickup in Kochi — how bulk office IT scrap, asset inventory and data destruction fit together, and what to prepare before a business pickup.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-ewaste-scrap-quotes-work-kochi/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How E-Waste Scrap Quotes Work in Kochi | Condition-Based Value Guide",
    description:
      "How e-waste scrap quotes work in Kochi — what drives condition-based pricing, why final value depends on inspection, and how to get an accurate estimate.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/recycling-basics/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Recycling Basics | What Is E-Waste & How to Recycle in Kochi",
    description:
      "What e-waste recycling is, why it matters, what items are accepted, and how pickup works in Kochi — a complete beginner's guide with 20 FAQs.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-ewaste-recycling-works/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How E-Waste Recycling Works Step by Step | Kochi Guide",
    description:
      "What actually happens when you hand over old electronics for recycling in Kochi — from booking a pickup to collection, sorting, data handling and material recovery.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/why-electronics-should-not-go-in-household-waste/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Why Electronics Should Not Go into Household Waste | Kochi",
    description:
      "Why old electronics must be kept out of regular bins and general waste — hazardous materials, battery fire risk, data exposure, and what to do instead in Kochi.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-to-prepare-electronics-for-recycling/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How to Prepare Electronics Before Recycling | Kochi Checklist",
    description:
      "What to do before handing over electronics for recycling in Kochi — backing up data, wiping devices, separating batteries, and flagging damaged items for safe pickup.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/ewaste-recycling-vs-reuse/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Recycling vs Reuse | Which Is Better for Old Electronics?",
    description:
      "Should you recycle or reuse old electronics? How to decide between recycling, reselling, donating or keeping a device, with practical guidance for Kochi households and offices.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/how-responsible-ewaste-collection-works/",
    changefreq: "monthly",
    priority: 0.6,
    title: "How Responsible E-Waste Collection Works | Kochi Guide",
    description:
      "What makes e-waste collection responsible — authorized handling, data destruction, battery safety, and why the difference between compliant and informal recyclers matters.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/blog/ewaste-pickup-near-me/",
    changefreq: "monthly",
    priority: 0.6,
    title: "E-Waste Pickup Near Me in Kochi | Doorstep Collection Guide",
    description:
      "How e-waste pickup near you works in Kochi — what items are collected, how feasibility and quotes are confirmed, and doorstep collection for homes, offices and apartments.",
    type: "blog",
    sitemapGroup: "blog",
    lang: "en-IN",
    status: "published",
    contentSource: "manual",
    indexable: true,
  },
  {
    path: "/services/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste & IT Asset Services in Kochi | Ewaste Kochi",
    description:
      "Recycling, battery recycling, sell-your-device marketplace, pickup, data destruction, hard drive shredding, and ITAD services across Kochi and Kerala.",
    type: "core",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/locations/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste Pickup Locations in Kochi & Kerala | Ewaste Kochi",
    description:
      "Doorstep e-waste pickup areas across Kochi, Ernakulam district, and wider Kerala. Find your neighborhood and book a free pickup.",
    type: "core",
    sitemapGroup: "locations",
    lang: "en-IN",
  },
  {
    path: "/battery-recycling/",
    changefreq: "monthly",
    priority: 0.9,
    title: "Where to Recycle Batteries in Kochi | Free Doorstep Pickup",
    description:
      "Recycle UPS, inverter, laptop, and phone batteries in Kochi with free doorstep pickup. Safe, compliant disposal — batteries should never go in household trash.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
    hreflangPair: "/ml/battery-recycling/",
  },
  {
    path: "/marketplace/",
    changefreq: "weekly",
    priority: 0.9,
    title: "Sell Old Electronics in Kochi | Best Quote + Free Pickup",
    description:
      "List your used laptop, phone, or IT equipment for an instant quote, or browse inspected refurbished devices. Doorstep pickup and payment across Kochi.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/sell-electronics/",
    changefreq: "weekly",
    priority: 0.9,
    title: "Sell Old Electronics in Kochi | Instant Quote, Doorstep Payment",
    description:
      "Sell your old laptop, phone, or computer in Kochi for an instant quote. Free doorstep pickup, on-the-spot payment, condition-based pricing guidance.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
    hreflangPair: "/ml/sell-electronics/",
  },
  {
    path: "/pickup/",
    changefreq: "monthly",
    priority: 0.9,
    title: "E-Waste Pickup in Kochi | Doorstep Collection for Electronics",
    description:
      "Schedule free doorstep e-waste pickup in Kochi for laptops, batteries, and IT hardware. Same-day and next-day slots available across Ernakulam district.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
    hreflangPair: "/ml/pickup/",
  },
  {
    path: "/data-destruction/",
    changefreq: "monthly",
    priority: 0.9,
    title: "Data Destruction Services in Kochi | Secure Wiping & Certificate",
    description:
      "Certified data destruction in Kochi — wiping, degaussing, and hard drive shredding for laptops, servers, and drives. Certificates available on request.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
    hreflangPair: "/ml/data-destruction/",
  },
  {
    path: "/hard-drive-shredding/",
    changefreq: "monthly",
    priority: 0.8,
    title: "Hard Drive Shredding in Kochi | Physical Data Destruction",
    description:
      "Physical hard drive shredding in Kochi for failed, damaged, or end-of-life drives. Certificate of destruction available. Pickup across Ernakulam district.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/itad/",
    changefreq: "monthly",
    priority: 0.9,
    title: "ITAD Services in Kochi | Corporate IT Asset Disposal",
    description:
      "IT Asset Disposition (ITAD) for offices in Kochi — inventory, secure data destruction, resale, and compliance reporting for corporate IT decommissioning.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/about/",
    changefreq: "yearly",
    priority: 0.5,
    title: "About Ewaste Kochi | E-Waste Recycling & ITAD in Kerala",
    description:
      "Ewaste Kochi collects, recycles, and securely destroys data on old electronics across Kochi and Kerala, serving households, offices, and IT parks.",
    type: "core",
    sitemapGroup: "core",
    lang: "en-IN",
  },
  {
    path: "/faq/",
    changefreq: "monthly",
    priority: 0.6,
    title: "FAQ | Ewaste Kochi",
    description:
      "Answers to common questions about e-waste pickup, pricing, data destruction, business services, and coverage areas for Ewaste Kochi.",
    type: "core",
    sitemapGroup: "core",
    lang: "en-IN",
  },
  {
    path: "/contact/",
    changefreq: "yearly",
    priority: 0.7,
    title: "Contact Ewaste Kochi | Book a Pickup or Ask a Question",
    description:
      "Reach Ewaste Kochi by phone, WhatsApp, or email. Address, business hours, and quick links to book a pickup or request a quote.",
    type: "core",
    sitemapGroup: "core",
    lang: "en-IN",
    hreflangPair: "/ml/contact/",
  },
  {
    path: "/privacy/",
    changefreq: "yearly",
    priority: 0.3,
    title: "Privacy Policy | Ewaste Kochi",
    description:
      "How Ewaste Kochi collects, uses, and protects information shared for pickups, quotes, and enquiries.",
    type: "legal",
    sitemapGroup: "legal",
    lang: "en-IN",
  },
  {
    path: "/terms/",
    changefreq: "yearly",
    priority: 0.3,
    title: "Terms of Service | Ewaste Kochi",
    description:
      "Terms governing pickup, recycling, resale, and data destruction services provided by Ewaste Kochi.",
    type: "legal",
    sitemapGroup: "legal",
    lang: "en-IN",
  },
  {
    path: "/e-waste-scrap-prices-kochi/",
    changefreq: "monthly",
    priority: 0.8,
    title: "E-Waste Scrap Prices in Kochi | Quote Guidance & Price Factors",
    description:
      "What affects your e-waste scrap quote in Kochi — item type, condition, quantity, and market rate. Get an instant preliminary quote over WhatsApp, confirmed at pickup.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/computer-scrap-buyers-kochi/",
    changefreq: "monthly",
    priority: 0.8,
    title: "Computer Scrap Buyers in Kochi | Desktops, Laptops & Office IT",
    description:
      "Sell computer and IT scrap in Kochi — desktops, laptops, motherboards, RAM, CPUs, servers, and mixed office lots. Instant quote, doorstep pickup, bulk buying for businesses.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/server-recycling-kochi/",
    changefreq: "monthly",
    priority: 0.8,
    title: "Server Recycling in Kochi | Racks, Drives & Network Equipment",
    description:
      "B2B server and data center hardware recycling in Kochi — racks, drives, networking equipment, secure data destruction, and asset inventory for decommissioning projects.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/tv-recycling-kochi/",
    changefreq: "monthly",
    priority: 0.7,
    title: "TV Recycling in Kochi | LED, LCD & Old CRT Disposal",
    description:
      "Recycle old TVs and monitors in Kochi — LED, LCD, and CRT displays. Free doorstep pickup for households, apartments, and offices across Ernakulam district.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/services/electronics-recycling-near-me/",
    changefreq: "monthly",
    priority: 0.7,
    title: "Electronics Recycling Near Me in Kochi | Find Local Pickup",
    description:
      "Looking for electronics recycling near you in Kochi? We collect from your exact location — no need to find or travel to a drop-off point.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/services/hard-drive-degaussing-kochi/",
    changefreq: "monthly",
    priority: 0.7,
    title: "Hard Drive Degaussing in Kochi | Magnetic Data Erasure",
    description:
      "Hard drive degaussing in Kochi — magnetic erasure for hard disk drives, distinct from wiping or physical shredding. Certificate available on request.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/services/it-asset-inventory-audit/",
    changefreq: "monthly",
    priority: 0.7,
    title: "IT Asset Inventory Audit in Kochi | Pre-Disposal Asset Tracking",
    description:
      "IT asset inventory audits in Kochi ahead of disposal — serial number capture, asset tagging, chain-of-custody records, and reporting for ITAD projects.",
    type: "service",
    sitemapGroup: "services",
    lang: "en-IN",
  },
  {
    path: "/trust/",
    changefreq: "monthly",
    priority: 0.6,
    title: "Trust & Compliance | Ewaste Kochi",
    description:
      "How Ewaste Kochi handles compliance, certifications, and data destruction proof — and how to request documentation for your records.",
    type: "trust",
    sitemapGroup: "core",
    lang: "en-IN",
  },
  {
    path: "/certifications/",
    changefreq: "monthly",
    priority: 0.5,
    title: "Certifications | Ewaste Kochi",
    description:
      "Environmental and regulatory compliance status for Ewaste Kochi's recycling and data destruction operations.",
    type: "trust",
    sitemapGroup: "core",
    lang: "en-IN",
  },
  {
    path: "/data-destruction-certificate-sample/",
    changefreq: "monthly",
    priority: 0.5,
    title: "Data Destruction Certificate Sample | Ewaste Kochi",
    description:
      "What's included in an Ewaste Kochi certificate of data destruction, and how to request one for your devices.",
    type: "trust",
    sitemapGroup: "core",
    lang: "en-IN",
  },
  {
    path: "/ml/",
    changefreq: "weekly",
    priority: 0.9,
    title: "ഇ-വേസ്റ്റ് റീസൈക്ലിംഗ് കൊച്ചി | ഇലക്ട്രോണിക്സ്, ബാറ്ററി, ഐടി സ്ക്രാപ്പിന് സൗജന്യ പിക്കപ്പ്",
    description:
      "കൊച്ചിയിൽ പഴയ ഇലക്ട്രോണിക്സ്, ലാപ്ടോപ്പ്, ബാറ്ററി, ഐടി ആസ്തികൾ, ഡാറ്റ നശിപ്പിക്കൽ എന്നിവയ്ക്ക് ഇ-വേസ്റ്റ് പിക്കപ്പ് ബുക്ക് ചെയ്യൂ. സുരക്ഷിത റീസൈക്ലിംഗിനും പിക്കപ്പ് സഹായത്തിനും Ewaste Kochi-യെ വാട്സ്ആപ്പിൽ ബന്ധപ്പെടുക.",
    type: "core",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/",
  },
  {
    path: "/ml/recycling/",
    changefreq: "monthly",
    priority: 0.8,
    title: "കൊച്ചിയിൽ ഇ-മാലിന്യ റീസൈക്ലിംഗ് | സുരക്ഷിത ഇലക്ട്രോണിക്സ് നിർമാർജനം",
    description:
      "കൊച്ചിയിൽ ലാപ്ടോപ്പ്, ഡെസ്ക്ടോപ്പ്, മോണിറ്റർ, പ്രിന്റർ എന്നിവ സൗജന്യ പിക്കപ്പോടെ റീസൈക്കിൾ ചെയ്യുക. ഡാറ്റ ആദ്യം സുരക്ഷിതമായി നീക്കം ചെയ്യുന്നു.",
    type: "service",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/recycling/",
  },
  {
    path: "/ml/battery-recycling/",
    changefreq: "monthly",
    priority: 0.8,
    title: "കൊച്ചിയിൽ ബാറ്ററി റീസൈക്ലിംഗ് | യുപിഎസ്, ഇൻവെർട്ടർ, ലാപ്ടോപ്പ്, ഫോൺ",
    description:
      "കൊച്ചിയിൽ യുപിഎസ്, ഇൻവെർട്ടർ, ലാപ്ടോപ്പ്, ഫോൺ ബാറ്ററികൾക്കുള്ള സുരക്ഷിത റീസൈക്ലിംഗ്. സൗജന്യ ശേഖരണം, നിയമാനുസൃത നിർമാർജനം.",
    type: "service",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/battery-recycling/",
  },
  {
    path: "/ml/pickup/",
    changefreq: "monthly",
    priority: 0.8,
    title: "കൊച്ചിയിൽ ഇ-വേസ്റ്റ് പിക്കപ്പ് | വീട്ടിലെത്തി ശേഖരണം",
    description:
      "കൊച്ചിയിൽ ലാപ്ടോപ്പ്, ബാറ്ററി, ഐടി ഉപകരണങ്ങൾ എന്നിവയ്ക്കുള്ള സൗജന്യ പിക്കപ്പ് ബുക്ക് ചെയ്യുക. അതേ ദിവസം അല്ലെങ്കിൽ അടുത്ത ദിവസം സ്ലോട്ട് ലഭ്യം.",
    type: "service",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/pickup/",
  },
  {
    path: "/ml/sell-electronics/",
    changefreq: "weekly",
    priority: 0.8,
    title: "കൊച്ചിയിൽ പഴയ ഇലക്ട്രോണിക്സ് വിൽക്കുക | തൽക്ഷണ ക്വോട്ട്",
    description:
      "കൊച്ചിയിൽ പഴയ ലാപ്ടോപ്പ്, ഫോൺ, കമ്പ്യൂട്ടർ എന്നിവ വിറ്റ് തൽക്ഷണ ക്വോട്ടും വീട്ടിലെത്തി പണവും നേടുക.",
    type: "service",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/sell-electronics/",
  },
  {
    path: "/ml/data-destruction/",
    changefreq: "monthly",
    priority: 0.8,
    title: "കൊച്ചിയിൽ ഡാറ്റ നശിപ്പിക്കൽ സേവനം | സുരക്ഷിത വൈപ്പിംഗ് & സർട്ടിഫിക്കറ്റ്",
    description:
      "കൊച്ചിയിൽ ലാപ്ടോപ്പ്, സെർവർ, ഡ്രൈവുകൾക്കുള്ള സാക്ഷ്യപ്പെടുത്തിയ ഡാറ്റ നശിപ്പിക്കൽ. ആവശ്യാനുസരണം സർട്ടിഫിക്കറ്റ് ലഭ്യം.",
    type: "service",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/data-destruction/",
  },
  {
    path: "/ml/contact/",
    changefreq: "yearly",
    priority: 0.6,
    title: "ബന്ധപ്പെടുക | ഇ-വേസ്റ്റ് കൊച്ചി",
    description:
      "ഫോൺ, വാട്സ്ആപ്പ്, ഇമെയിൽ വഴി ഇ-വേസ്റ്റ് കൊച്ചിയുമായി ബന്ധപ്പെടുക. വിലാസം, പ്രവർത്തന സമയം, പിക്കപ്പ് ബുക്ക് ചെയ്യാനുള്ള വഴികൾ.",
    type: "core",
    sitemapGroup: "ml",
    lang: "ml-IN",
    hreflangPair: "/contact/",
  },
];

export function getHreflang(path: string): { lang: string; href: string }[] | undefined {
  const route = ROUTES.find((r) => r.path === path);
  if (!route?.hreflangPair) return undefined;
  const pair = ROUTES.find((r) => r.path === route.hreflangPair);
  if (!pair) return undefined;

  const enRoute = route.lang === "en-IN" ? route : pair;
  const mlRoute = route.lang === "ml-IN" ? route : pair;

  return [
    { lang: "en-IN", href: new URL(enRoute.path, SITE_URL).toString() },
    { lang: "ml-IN", href: new URL(mlRoute.path, SITE_URL).toString() },
    { lang: "x-default", href: new URL(enRoute.path, SITE_URL).toString() },
  ];
}
