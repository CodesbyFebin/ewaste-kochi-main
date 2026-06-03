/**
 * graph.ts — Semantic link graph for hub-and-spoke internal linking.
 *
 * All configuration is static (zero runtime cost). Each blog post page
 * imports from here to render cross-pillar service links, device-type
 * taxonomy, FAQ clusters, audience-specific CTAs, and compliance resources.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PillarMeta {
  label: string;
  description: string;
  /** Canonical ewk-site commercial page for this service */
  href: string;
}

export interface DeviceTypeEntry {
  device: string;
  icon: string;
  /** Pillar slugs this device is relevant to */
  pillars: string[];
  /** ewk-site commercial page href */
  href: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ComplianceLink {
  label: string;
  href: string;
  description: string;
}

export interface NextStep {
  label: string;
  href: string;
  /** 'primary' renders as a filled button, 'secondary' as an outline */
  variant: 'primary' | 'secondary';
}

// ---------------------------------------------------------------------------
// Cross-service relationship graph
// pillar → ordered list of related pillar slugs
// ---------------------------------------------------------------------------

export const PILLAR_GRAPH: Record<string, string[]> = {
  'itad':             ['data-destruction', 'recycling', 'collection'],
  'recycling':        ['collection', 'itad', 'data-destruction'],
  'data-destruction': ['itad', 'recycling', 'collection'],
  'collection':       ['recycling', 'itad', 'data-destruction'],
};

// ---------------------------------------------------------------------------
// Pillar metadata (labels, descriptions, ewk-site hrefs)
// ---------------------------------------------------------------------------

export const PILLAR_META: Record<string, PillarMeta> = {
  'itad': {
    label: 'IT Asset Disposal (ITAD)',
    description: 'Secure, compliant decommissioning of corporate IT equipment with full audit trail and EPR certificates.',
    href: 'https://www.ewastekochi.com/itad/',
  },
  'recycling': {
    label: 'E-Waste Recycling',
    description: 'CPCB-authorized zero-landfill recycling for all electronic and electrical equipment across Kerala.',
    href: 'https://www.ewastekochi.com/recycling/',
  },
  'data-destruction': {
    label: 'Data Destruction',
    description: 'DoD 5220.22-M and NIST 800-88 certified hard drive shredding, wiping, and Certificate of Destruction.',
    href: 'https://www.ewastekochi.com/data-destruction/',
  },
  'collection': {
    label: 'E-Waste Collection',
    description: 'Free doorstep pickup for homes and businesses. No minimum quantity. Instant payment where applicable.',
    href: 'https://www.ewastekochi.com/pickup/',
  },
};

// ---------------------------------------------------------------------------
// Device type → pillar mapping
// Used to render a device taxonomy section on each blog post.
// ---------------------------------------------------------------------------

export const DEVICE_SERVICE_MAP: DeviceTypeEntry[] = [
  {
    device: 'Laptops & Desktops',
    icon: '💻',
    pillars: ['itad', 'recycling', 'collection'],
    href: 'https://www.ewastekochi.com/sell-electronics/',
  },
  {
    device: 'Servers & Rack Equipment',
    icon: '🗄️',
    pillars: ['itad', 'data-destruction'],
    href: 'https://www.ewastekochi.com/server-recycling-kochi/',
  },
  {
    device: 'Hard Drives & SSDs',
    icon: '💾',
    pillars: ['data-destruction'],
    href: 'https://www.ewastekochi.com/hard-drive-shredding/',
  },
  {
    device: 'Mobile Phones & Tablets',
    icon: '📱',
    pillars: ['recycling', 'collection'],
    href: 'https://www.ewastekochi.com/sell-electronics/',
  },
  {
    device: 'Monitors & Displays',
    icon: '🖥️',
    pillars: ['recycling', 'collection'],
    href: 'https://www.ewastekochi.com/recycling/',
  },
  {
    device: 'Batteries & UPS',
    icon: '🔋',
    pillars: ['recycling', 'collection'],
    href: 'https://www.ewastekochi.com/battery-recycling/',
  },
  {
    device: 'Printers & Scanners',
    icon: '🖨️',
    pillars: ['recycling', 'itad'],
    href: 'https://www.ewastekochi.com/recycling/',
  },
  {
    device: 'Networking Equipment',
    icon: '🌐',
    pillars: ['itad', 'data-destruction'],
    href: 'https://www.ewastekochi.com/itad/',
  },
  {
    device: 'Air Conditioners',
    icon: '❄️',
    pillars: ['recycling', 'collection'],
    href: 'https://www.ewastekochi.com/recycling/',
  },
  {
    device: 'Old TVs & Audio',
    icon: '📺',
    pillars: ['recycling', 'collection'],
    href: 'https://www.ewastekochi.com/tv-recycling-kochi/',
  },
];

/**
 * Returns device entries relevant to a given pillar slug.
 * Caps at `limit` to avoid overwhelming the page.
 */
export function getDevicesForPillar(pillar: string, limit = 6): DeviceTypeEntry[] {
  return DEVICE_SERVICE_MAP.filter(d => d.pillars.includes(pillar)).slice(0, limit);
}

// ---------------------------------------------------------------------------
// FAQ clusters — 5 Q&A pairs per pillar (schema-ready for FAQPage)
// ---------------------------------------------------------------------------

export const PILLAR_FAQS: Record<string, FAQItem[]> = {
  'itad': [
    {
      q: 'What is IT Asset Disposal (ITAD)?',
      a: 'ITAD is the secure, compliant process of decommissioning retired corporate IT equipment — including data destruction, partial refurbishment, and eco-friendly recycling — with a full audit trail and legal compliance certificates.',
    },
    {
      q: 'Is free pickup available for bulk ITAD in Kochi?',
      a: 'Yes. Ewaste Kochi provides free doorstep pickup for any volume of corporate IT assets across Kochi, Ernakulam, Kakkanad, Aluva, and all Kerala locations. There are no transport fees and no minimum quantity requirements.',
    },
    {
      q: 'What compliance documents are issued after ITAD?',
      a: 'We issue a Certificate of Data Destruction (per device with serial number), EPR compliance certificates, itemised weight certificates, and a GST invoice. Documentation satisfies DPDP Act 2023, E-Waste Rules 2022, and CPCB audit requirements.',
    },
    {
      q: 'How long does an ITAD pickup and processing take?',
      a: 'We confirm your pickup slot within 30 minutes of booking. Same-day and next-day pickups are available across most Kochi areas. Certificates of Destruction and EPR documents are issued within 24 hours of processing.',
    },
    {
      q: 'Do you handle ITAD across multiple Kerala locations?',
      a: 'Yes. We coordinate multi-site pickup for large enterprises with offices across Kerala — including Trivandrum, Thrissur, Calicut, Palakkad, and Ernakulam — providing a single consolidated compliance report.',
    },
  ],

  'recycling': [
    {
      q: 'What electronics does Ewaste Kochi accept for recycling?',
      a: 'We recycle all categories of electronic and electrical equipment: laptops, desktops, servers, mobile phones, tablets, TVs, monitors, printers, batteries, UPS, air conditioners, networking gear, and all other EEE items — working or non-working.',
    },
    {
      q: 'Is e-waste recycling pickup free in Kochi?',
      a: 'Yes. Free doorstep collection is available across Kochi, Kakkanad, Aluva, Edappally, Vyttila, Kalamassery, Tripunithura, Ernakulam, and all Kerala cities. No minimum quantity and no hidden transport fee.',
    },
    {
      q: 'Is Ewaste Kochi CPCB authorized?',
      a: 'Yes. We are CPCB-authorized and hold KSPCB authorization (KL/EW/628), ISO 14001:2015 Environmental Management System certification, and ISO 9001:2015 Quality Management System certification.',
    },
    {
      q: 'Will I receive a certificate after e-waste recycling?',
      a: 'Yes. Every pickup includes EPR compliance certificates, weight certificates, and a disposal receipt. Enterprises also receive a full chain-of-custody report with itemised serial numbers.',
    },
    {
      q: 'What happens to my electronics after they are collected?',
      a: 'Items are transported to our CPCB-authorized facility for sorting and inspection. Storage devices are data-wiped or shredded. Recoverable components are refurbished; remaining materials are processed for zero-landfill material recovery.',
    },
  ],

  'data-destruction': [
    {
      q: 'What data destruction standards does Ewaste Kochi follow?',
      a: 'We follow DoD 5220.22-M (7-pass overwrite), NIST 800-88 (Clear, Purge, and Destroy levels), and physical shredding to IEC 21964 standards. All processes are documented, witnessed, and certified.',
    },
    {
      q: 'Do you issue a Certificate of Destruction?',
      a: 'Yes. Every storage device receives an individual Certificate of Data Destruction listing the serial number, destruction method, date, technician ID, and facility details. This satisfies DPDP Act 2023, IT Act 2000, and ISO 27001 audit requirements.',
    },
    {
      q: 'Can you perform on-site data destruction in Kochi?',
      a: 'Yes. We offer on-site hard drive shredding and certified software wiping at your premises across Kochi and Kerala. On-site service eliminates chain-of-custody risk for high-security environments like banks, hospitals, and data centres.',
    },
    {
      q: 'What types of devices do you destroy data on?',
      a: 'HDDs, SSDs, NVMe drives, USB drives, smartphones, tablets, server arrays, RAID systems, NAS and SAN storage, magnetic tapes, optical media, and all other data-bearing media — including non-functional and physically damaged devices.',
    },
    {
      q: 'Is software wiping or physical shredding more secure?',
      a: 'Physical shredding is absolute — no data recovery is possible. It is the preferred method for classified data, healthcare records, and financial information. Software wiping (NIST 800-88 Purge) is suitable when device reuse or remarketing is intended, as it preserves hardware value.',
    },
  ],

  'collection': [
    {
      q: 'How do I schedule a free e-waste pickup in Kochi?',
      a: 'Call or WhatsApp 75 0055 5454, or use the booking form at ewastekochi.com/contact/. We confirm your pickup slot within 30 minutes and offer same-day collection across most Kochi areas.',
    },
    {
      q: 'Is there a minimum quantity required for e-waste collection?',
      a: 'No. We collect single items — one old laptop, one TV — as readily as large bulk enterprise clearances of hundreds of assets. All pickups are free with no transport charge.',
    },
    {
      q: 'Which areas do you cover for e-waste pickup in Kerala?',
      a: 'We cover Kochi, Kakkanad, Aluva, Edappally, Vyttila, Kalamassery, Tripunithura, Ernakulam, Palarivattom, Kaloor, Maradu, Thevara, Thrissur, Trivandrum, Calicut, and all surrounding Kerala localities.',
    },
    {
      q: 'Will I get paid for my old electronics?',
      a: 'Yes, for devices with resale or scrap value — including working and non-working laptops, phones, and copper-bearing equipment. Instant payment via cash or UPI at the time of collection. Non-functional low-value items are collected for free.',
    },
    {
      q: 'Can I drop off e-waste instead of scheduling a pickup?',
      a: 'Yes. Drop-off is available at our Thrippunithura facility (710A Hill Palace Road, Kochi – 682301). Call ahead to confirm operating hours and available capacity.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Compliance & certification resource links
// ---------------------------------------------------------------------------

export const COMPLIANCE_LINKS: ComplianceLink[] = [
  {
    label: 'DPDP Act 2023',
    href: 'https://www.ewastekochi.com/data-destruction/',
    description: "India's Digital Personal Data Protection Act — mandates secure disposal of personal data stored on IT assets.",
  },
  {
    label: 'E-Waste Rules 2022',
    href: 'https://www.ewastekochi.com/recycling/',
    description: 'CPCB Extended Producer Responsibility framework governing collection, recycling, and disposal of electronic waste.',
  },
  {
    label: 'NIST 800-88 Standard',
    href: 'https://www.ewastekochi.com/data-destruction/',
    description: 'US NIST media sanitization guidelines — widely adopted for enterprise data destruction in India.',
  },
  {
    label: 'ISO 14001:2015 Certificate',
    href: '/docs/iso-14001.pdf',
    description: 'Environmental Management System certification held by Ewaste Kochi. Download the verified PDF.',
  },
  {
    label: 'KSPCB Authorization',
    href: '/docs/kspcb-authorization.pdf',
    description: 'Kerala State Pollution Control Board authorization (KL/EW/628). Download the verified PDF.',
  },
];

// ---------------------------------------------------------------------------
// Audience-specific next-step CTAs per category
// ---------------------------------------------------------------------------

export const CATEGORY_NEXT_STEPS: Record<string, NextStep[]> = {
  'enterprise': [
    { label: 'Get an Enterprise ITAD Quote', href: 'https://www.ewastekochi.com/contact/', variant: 'primary' },
    { label: 'Download Sample Certificate of Destruction', href: '/docs/sample-cod.pdf', variant: 'secondary' },
    { label: 'View KSPCB Authorization', href: '/docs/kspcb-authorization.pdf', variant: 'secondary' },
  ],
  'sme': [
    { label: 'Schedule SME Pickup via WhatsApp', href: 'https://wa.me/917500555454?text=Hi+I+need+e-waste+pickup+for+my+business', variant: 'primary' },
    { label: 'View Scrap Pricing', href: 'https://www.ewastekochi.com/scrap-price/', variant: 'secondary' },
    { label: 'Contact Us', href: 'https://www.ewastekochi.com/contact/', variant: 'secondary' },
  ],
  'residential': [
    { label: 'Book Free Home Pickup', href: 'https://wa.me/917500555454?text=Hi+I+need+e-waste+pickup', variant: 'primary' },
    { label: 'Check Scrap Prices', href: 'https://www.ewastekochi.com/scrap-price/', variant: 'secondary' },
    { label: 'Sell Old Electronics', href: 'https://www.ewastekochi.com/sell-electronics/', variant: 'secondary' },
  ],
  'hospitals': [
    { label: 'Healthcare Data Destruction Enquiry', href: 'https://www.ewastekochi.com/contact/', variant: 'primary' },
    { label: 'View Data Destruction Services', href: 'https://www.ewastekochi.com/data-destruction/', variant: 'secondary' },
    { label: 'Download Sample Certificate of Destruction', href: '/docs/sample-cod.pdf', variant: 'secondary' },
  ],
  'schools': [
    { label: 'Schedule Computer Lab Clearance', href: 'https://wa.me/917500555454?text=Hi+I+need+computer+lab+clearance', variant: 'primary' },
    { label: 'EPR Compliance for Educational Institutions', href: 'https://www.ewastekochi.com/recycling/', variant: 'secondary' },
    { label: 'Contact Us', href: 'https://www.ewastekochi.com/contact/', variant: 'secondary' },
  ],
};
