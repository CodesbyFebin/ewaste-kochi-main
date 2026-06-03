const fs = require('fs');
const path = require('path');

// The 10x10x100 Framework Data
// Starting with highest-intent 'Data Destruction' and 'Corporate ITAD'
const pillars = [
  {
    id: "it-asset-disposal-kochi",
    title: "IT Asset Disposal in Kochi | Enterprise ITAD Services",
    description: "Certified IT Asset Disposition (ITAD) in Kochi. Secure, compliant, and eco-friendly disposal of corporate IT equipment.",
    keywords: ["IT asset disposal kochi", "ITAD services kochi", "corporate e waste disposal"],
    category: "Corporate ITAD",
    h1: "Enterprise IT Asset Disposal in Kochi",
    content: "Securely dispose of your retired IT assets with our certified ITAD services. We ensure full compliance with CPCB and DPDP Act regulations."
  },
  {
    id: "data-destruction-kochi",
    title: "Certified Data Destruction Services in Kochi",
    description: "Secure data destruction services in Kochi. DoD & NIST compliant hard drive shredding and data wiping for enterprises.",
    keywords: ["data destruction services kochi", "secure data wipe kochi", "certified data destruction kochi"],
    category: "Data Destruction",
    h1: "Certified Data Destruction Services in Kochi",
    content: "Protect your sensitive corporate information with our NIST 800-88 compliant data destruction and hard drive shredding services."
  },
  {
    id: "hard-drive-shredding-kochi",
    title: "Hard Drive Shredding Kochi | On-Site Physical Destruction",
    description: "Physical hard drive shredding in Kochi. Receive a Certificate of Destruction. 100% data breach protection.",
    keywords: ["hard drive destruction kochi", "hard drive shredding kochi", "physical data destruction"],
    category: "Data Destruction",
    h1: "Secure Hard Drive Shredding in Kochi",
    content: "Physical destruction is the only 100% foolproof method to prevent data recovery. We offer both on-site and off-site hard drive shredding."
  },
  {
    id: "server-recycling-kochi",
    title: "Server Recycling & Disposal in Kochi | Best Scrap Prices",
    description: "Corporate server recycling and disposal in Kochi. Get the best scrap value for your old enterprise servers and racks.",
    keywords: ["server recycling kochi", "server scrap price kochi", "enterprise IT disposal"],
    category: "Corporate ITAD",
    h1: "Corporate Server Recycling in Kochi",
    content: "Upgrade your data center securely. We provide professional server decommissioning, data wiping, and high-value scrap recovery."
  },
  {
    id: "business-computer-recycling-kochi",
    title: "Business Computer Recycling Kochi | Bulk Office E-Waste",
    description: "Bulk computer recycling for businesses and offices in Kochi. Free pickup and secure data wiping included.",
    keywords: ["computer recycling for business", "bulk e waste pickup kochi", "office computer recycling"],
    category: "Corporate ITAD",
    h1: "Bulk Business Computer Recycling in Kochi",
    content: "Clear out your old office workstations. We handle bulk IT equipment with secure logistics and complete data sanitization."
  },
  {
    id: "secure-data-wipe-kochi",
    title: "Secure Data Wiping Software Solutions in Kochi",
    description: "Enterprise-grade data wiping services. We use certified software to permanently erase data from servers, laptops, and drives.",
    keywords: ["secure data wipe kochi", "software data erasure", "NIST compliant wipe"],
    category: "Data Destruction",
    h1: "Certified Data Wiping Services in Kochi",
    content: "Our certified software data wiping completely overwrites data across all sectors, allowing safe reuse or remarketing of the IT asset."
  },
  {
    id: "data-destruction-certificate-kochi",
    title: "Data Destruction Certificate Kochi | DPDP Act Compliance",
    description: "Receive a verified Certificate of Destruction for your IT assets. Stay compliant with India's DPDP Act and global standards.",
    keywords: ["data destruction certificate", "DPDP act compliance", "IT audit documentation"],
    category: "Data Destruction",
    h1: "Verified Certificate of Destruction for Complete Compliance",
    content: "For every batch of hard drives or IT assets we process, we provide a verifiable Certificate of Destruction complete with serial numbers."
  },
  {
    id: "corporate-e-waste-disposal-kochi",
    title: "Corporate E-Waste Disposal Kochi | Zero Landfill Policy",
    description: "Comprehensive e-waste management for corporates in Kochi. Green IT disposal with zero landfill guarantee.",
    keywords: ["corporate e waste disposal", "green IT disposal", "ESG compliance e-waste"],
    category: "Corporate ITAD",
    h1: "Corporate E-Waste Disposal & ESG Compliance",
    content: "Meet your company's ESG goals with our sustainable corporate e-waste disposal services. We ensure 100% eco-friendly recycling."
  },
  {
    id: "it-asset-disposition-kerala",
    title: "IT Asset Disposition Kerala | Statewide Enterprise ITAD",
    description: "Statewide ITAD services across Kerala. From Kochi to Trivandrum, we handle enterprise IT asset disposition.",
    keywords: ["IT asset disposition kerala", "statewide ITAD services", "Kerala enterprise IT disposal"],
    category: "Corporate ITAD",
    h1: "Statewide IT Asset Disposition (ITAD) in Kerala",
    content: "We serve large enterprises with multiple branches across Kerala, providing uniform, secure, and compliant ITAD solutions."
  },
  {
    id: "certified-data-destruction-kochi",
    title: "Certified Data Destruction | DoD & NIST Standards Kochi",
    description: "We adhere strictly to DoD 5220.22-M and NIST 800-88 standards for all data destruction services in Kochi.",
    keywords: ["certified data destruction kochi", "DoD compliant wiping", "NIST 800-88 destruction"],
    category: "Data Destruction",
    h1: "DoD & NIST Certified Data Destruction in Kochi",
    content: "Trust the experts. Our processes are strictly aligned with international DoD and NIST standards, ensuring military-grade data erasure."
  },
  {
    id: "sell-old-electronics-kochi",
    title: "Sell Old Electronics in Kochi | Best Price for E-Scrap",
    description: "Get the best price when you sell old electronics in Kochi. We buy laptops, phones, TVs, refrigerators, and all e-scrap. Free pickup included.",
    keywords: ["sell old electronics kochi", "e scrap buyers near me", "where to sell used electronics", "old electronics buyer kochi", "sell broken laptop kochi"],
    category: "Residential Collection",
    customContent: true
  },
  {
    id: "e-waste-price-list-kochi",
    title: "E-Waste Price List Kochi 2026 | Scrap Electronics Rates",
    description: "Current e-waste and scrap electronics price list in Kochi. Check rates for old laptops, phones, TVs, copper wire, circuit boards, and more.",
    keywords: ["e waste price list", "e waste price list kochi", "scrap electronics price kochi", "old laptop scrap price", "copper wire scrap price kochi"],
    category: "Residential Collection",
    customContent: true
  },
  {
    id: "old-tv-disposal-kochi",
    title: "Old TV Disposal in Kochi | CRT & LED TV Recycling",
    description: "Dispose of your old CRT or LED TV in Kochi safely and responsibly. Free pickup for old televisions. Get scrap value for working TVs.",
    keywords: ["old tv disposal near me", "old tv disposal kochi", "crt tv disposal kochi", "how to dispose old tv kochi", "tv recycling kochi"],
    category: "Residential Collection",
    customContent: true
  },
  {
    id: "ewaste-pickup-kochi",
    title: "E-Waste Pickup in Kochi | Free Doorstep Collection",
    description: "Free e-waste pickup from your home or office in Kochi. Schedule a same-day or next-day doorstep collection for old electronics and appliances.",
    keywords: ["ewaste pickup", "e waste pickup kochi", "free e waste pickup kochi", "doorstep ewaste collection", "schedule ewaste pickup kochi"],
    category: "Residential Collection",
    customContent: true
  },
  {
    id: "electronics-recycling-center-kochi",
    title: "Electronics Recycling Center Kochi | Where to Recycle Old Electronics",
    description: "Looking for an electronics recycling center in Kochi? We offer free doorstep pickup — no need to find a drop-off point. Responsible recycling for all e-waste.",
    keywords: ["electronics recycling center kochi", "where to recycle old electronics", "local recycling centers kochi", "e waste recycling kochi", "how to recycle electronics kochi"],
    category: "Residential Collection",
    customContent: true
  }
];

const outputDir = path.join(__dirname, 'content', 'pillars');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Starting generation of ${pillars.length} Astro-compatible Pillar pages...`);

pillars.forEach(pillar => {
  const filePath = path.join(outputDir, `${pillar.id}.mdx`);

  // Skip pillars with custom hand-crafted content so the script doesn't overwrite them
  if (pillar.customContent) {
    if (fs.existsSync(filePath)) {
      console.log(`Skipped (custom content): ${filePath}`);
    } else {
      console.warn(`WARNING: Custom content file missing: ${filePath}`);
    }
    return;
  }

  // Astro MDX format with frontmatter
  const mdxContent = `---
title: "${pillar.title}"
description: "${pillar.description}"
keywords: ${JSON.stringify(pillar.keywords)}
category: "${pillar.category}"
type: "Pillar"
dateUpdated: "${new Date().toISOString()}"
---

# ${pillar.h1}

${pillar.content}

## Why Choose Our ${pillar.category} Services?

- **Compliant:** Fully aligned with CPCB and DPDP Act guidelines.
- **Secure:** NIST 800-88 and DoD 5220.22-M compliant processes.
- **Transparent:** Full Chain of Custody tracking and Certificate of Destruction provided.
- **Eco-Friendly:** Strict Zero Landfill policy for all e-waste.

## Our Process

1. **Secure Logistics:** GPS-tracked vehicles for safe transport.
2. **Inventory Logging:** Every serial number is scanned and recorded.
3. **Processing:** Either software wiping or physical shredding.
4. **Certification:** Detailed Certificate of Destruction issued.

## Target Audience
- Corporate IT Departments
- Data Centers & Server Farms
- Hospitals & Healthcare (HIPAA compliant)
- Financial Institutions

*Contact E-Waste Kochi today to schedule your secure ${pillar.category.toLowerCase()} service.*
`;

  fs.writeFileSync(filePath, mdxContent);
  console.log(`Created: ${filePath}`);
});

console.log('pSEO Engine: Pillar page generation complete.');
