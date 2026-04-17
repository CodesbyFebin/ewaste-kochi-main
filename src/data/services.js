// ═══════════════════════════════════════════════════════════════════
// SERVICES DATA — Single Source of Truth
// 80+ services for programmatic SEO generation
// Each service generates: /services/[slug] page
// ═══════════════════════════════════════════════════════════════════

export const services = [
  // ── PILLAR SERVICES (Primary money pages) ──────────────────────
  {
    slug: 'e-waste-recycling-kochi',
    name: 'E-Waste Recycling Kochi',
    shortName: 'E-Waste Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '♻️',
    tagline: 'Kerala\'s Most Trusted Certified E-Waste Recycler',
    description: 'Certified e-waste collection, processing and recycling in Kochi. Free bulk pickup for corporates. Eco-friendly disposal compliant with E-Waste Rules 2022 and EPR guidelines.',
    longDescription: `EWaste Kochi provides comprehensive e-waste recycling services across Kochi, Ernakulam and Kerala. As an authorized KSPCB recycler operating under EPR authorization, we handle all categories of electronic waste from consumer electronics to large industrial equipment.

Our facility in Thrippunithura uses state-of-the-art processing equipment to safely dismantle, sort, and recover valuable materials from discarded electronics — including gold, silver, copper, and rare earth metals — while ensuring zero hazardous material reaches landfills.

Free bulk pickup is available for corporate clients disposing of 10+ devices across all of Kochi including Infopark, Smart City, Kakkanad, Edapally, and beyond.`,
    keywords: ['e-waste recycling kochi', 'ewaste kochi', 'e-waste disposal kochi', 'electronics recycling kerala', 'certified e-waste recycler kochi', 'e-waste collection kochi'],
    metaTitle: 'E-Waste Recycling Kochi | Certified KSPCB Authorized | Free Pickup | EWaste Kochi',
    metaDescription: 'Kerala\'s #1 certified e-waste recycling in Kochi. Free bulk pickup across Ernakulam, KSPCB authorized, EPR compliant. Call 24/7 for same-day collection.',
    price: 'Free bulk pickup (10+ devices)',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'EPR Compliant', 'Free Pickup'],
    relatedServices: ['itad-kochi', 'data-destruction-kochi', 'battery-recycling-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'itad-kochi',
    name: 'ITAD Services Kochi',
    shortName: 'ITAD',
    category: 'itad',
    isPillar: true,
    icon: '🏢',
    tagline: 'NIST/DoD Certified IT Asset Disposition',
    description: 'Complete IT Asset Disposition for businesses in Kochi. Asset tagging, NIST/DoD certified data destruction, remarketing, and full audit trail documentation.',
    longDescription: `IT Asset Disposition (ITAD) is the certified, auditable process of safely retiring your organization's IT equipment. EWaste Kochi offers end-to-end ITAD services for corporate clients across Kochi, Infopark, Smart City, and all of Kerala.

Our ITAD process includes: complete asset inventory and tagging, chain-of-custody documentation, NIST 800-88/DoD 5220.22-M certified data destruction, remarketing of residual value equipment, EPR-compliant recycling, and Certificate of Destruction for every device.

We are DPDP Act 2023 compliant, making us the right choice for banks, IT companies, hospitals, and government organizations with strict data governance requirements.`,
    keywords: ['ITAD kochi', 'IT asset disposal kochi', 'IT asset disposition kerala', 'corporate ITAD kochi', 'IT equipment disposal kochi', 'ITAD infopark'],
    metaTitle: 'ITAD Services Kochi Kerala | Certified IT Asset Disposition | EWaste Kochi',
    metaDescription: 'Certified ITAD in Kochi — complete IT asset disposition with NIST/DoD data destruction, Certificate of Destruction, DPDP Act 2023 compliant. Serving Infopark, Kakkanad & all Kerala.',
    price: 'Quote-based',
    badges: ['NIST 800-88', 'DoD 5220.22-M', 'DPDP Compliant', 'Certificate of Destruction'],
    relatedServices: ['data-destruction-kochi', 'hard-drive-shredding-kochi', 'e-waste-recycling-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'data-destruction-kochi',
    name: 'Data Destruction Kochi',
    shortName: 'Data Destruction',
    category: 'data',
    isPillar: true,
    icon: '🔐',
    tagline: 'NIST 800-88 & DoD Certified Data Sanitization',
    description: 'NIST 800-88 and DoD 5220.22-M certified data destruction in Kochi. Software wiping and physical shredding. Certificate of Destruction issued for every device.',
    longDescription: `Data destruction is not just formatting — it's verifiable, certified elimination of all data from storage media. EWaste Kochi provides two levels of certified data destruction:

**Software-Based Wiping (NIST 800-88 Purge):** Multi-pass overwriting using industry-standard algorithms that renders data permanently unrecoverable while preserving the physical drive for reuse or resale.

**Physical Shredding:** Industrial-grade shredding that reduces hard drives, SSDs, and storage media to metal fragments. The highest security option for classified or highly sensitive data.

Every job — regardless of size — receives a Certificate of Destruction listing each device's serial number, destruction method, date, and our authorization details. Essential for DPDP Act 2023, RBI, SEBI, and ISO 27001 compliance.`,
    keywords: ['data destruction kochi', 'data wiping kochi', 'certified data destruction kerala', 'NIST data destruction kochi', 'DoD data wiping kochi', 'secure data erasure kochi'],
    metaTitle: 'Data Destruction Kochi | NIST 800-88 & DoD Certified | Certificate of Destruction | EWaste Kochi',
    metaDescription: 'Certified data destruction in Kochi — NIST 800-88 wiping + physical shredding. Certificate of Destruction every job. DPDP Act 2023 & RBI audit compliant.',
    price: '₹200 – ₹1,500 per device',
    priceSchema: '200',
    priceCurrency: 'INR',
    badges: ['NIST 800-88', 'DoD 5220.22-M', 'Certificate of Destruction', 'DPDP Compliant'],
    relatedServices: ['hard-drive-shredding-kochi', 'itad-kochi', 'server-recycling-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'hard-drive-shredding-kochi',
    name: 'Hard Drive Shredding Kochi',
    shortName: 'Hard Drive Shredding',
    category: 'data',
    isPillar: true,
    icon: '⚙️',
    tagline: 'Physical Destruction of Hard Drives & SSDs',
    description: 'Industrial hard drive shredding in Kochi. Reduces HDDs, SSDs, tapes, and all storage media to fragments. On-site witnessed destruction available. CoD included.',
    longDescription: `Physical hard drive shredding is the gold standard for irreversible data destruction. EWaste Kochi's industrial shredders reduce hard drives, SSDs, magnetic tapes, USB drives, and all storage media to small metal fragments — making data recovery physically impossible.

**What we shred:** HDDs (all sizes), SSDs, NVMe drives, M.2 drives, magnetic tapes, LTO tapes, USB flash drives, memory cards, optical media, mobile phones, and tablets.

**On-Site Witnessed Destruction:** For maximum security and compliance, we offer on-site shredding at your Kochi premises with a secure destruction unit. Watch the shredding happen, receive photos/video evidence, and get your Certificate of Destruction same-day.

Pricing starts at ₹500 per drive for standard shredding with Certificate of Destruction included.`,
    keywords: ['hard drive shredding kochi', 'HDD shredding kochi', 'SSD destruction kochi', 'hard drive destruction kerala', 'on-site shredding kochi', 'physical data destruction kochi'],
    metaTitle: 'Hard Drive Shredding Kochi | On-Site & Facility | Certificate of Destruction | EWaste Kochi',
    metaDescription: 'Industrial hard drive shredding in Kochi. HDDs, SSDs, tapes, all media. On-site witnessed destruction available. Certificate of Destruction included from ₹500/drive.',
    price: 'From ₹500 per drive',
    priceSchema: '500',
    priceCurrency: 'INR',
    badges: ['Physical Shredding', 'On-Site Available', 'Certificate Included', 'All Media Types'],
    relatedServices: ['data-destruction-kochi', 'itad-kochi', 'e-waste-recycling-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'laptop-buyback-kochi',
    name: 'Laptop Buyback Kochi',
    shortName: 'Laptop Buyback',
    category: 'buyback',
    isPillar: true,
    icon: '💻',
    tagline: 'Best Laptop Buyback Prices in Kochi',
    description: 'Sell your old laptop in Kochi at the best prices. All brands accepted — Dell, HP, Lenovo, Apple, Asus, Acer. Same-day payment via UPI/bank transfer.',
    longDescription: `Get the best value for your old laptops in Kochi. EWaste Kochi buys used laptops, MacBooks, gaming laptops, notebooks, and Chromebooks from all major brands in any condition — working, damaged, or non-functional.

**Brands we buy:** Dell, HP, Lenovo, Apple MacBook, Asus, Acer, MSI, Razer, Samsung, Toshiba, Sony, and all other brands.

**How it works:** Use our online calculator for an instant estimate → book a free pickup or walk in → device inspection (15 min) → data securely wiped → same-day payment via Cash, UPI, NEFT, or bank transfer.

**Best prices for:** Business laptops (ThinkPad, EliteBook, Latitude), MacBook Pro, MacBook Air, gaming laptops, and bulk office laptop disposal (10+ units get special rates).`,
    keywords: ['laptop buyback kochi', 'sell old laptop kochi', 'sell laptop kochi', 'sell macbook kochi', 'laptop resale kochi', 'used laptop buyer kochi'],
    metaTitle: 'Laptop Buyback Kochi | Best Prices | All Brands | Same-Day Payment | EWaste Kochi',
    metaDescription: 'Sell your old laptop in Kochi at the best prices. All brands, any condition. Dell, HP, Lenovo, Apple MacBook. Free pickup, same-day UPI payment. Instant online estimate.',
    price: '₹2,000 – ₹80,000+ depending on model',
    badges: ['All Brands', 'Same-Day Payment', 'Free Pickup', 'Data Wiped'],
    relatedServices: ['mobile-recycling-kochi', 'e-waste-recycling-kochi', 'itad-kochi'],
    schemaType: 'BuyAction',
  },
  {
    slug: 'free-ewaste-pickup-kochi',
    name: 'Free E-Waste Pickup Kochi',
    shortName: 'Free Pickup',
    category: 'pickup',
    isPillar: true,
    icon: '🚚',
    tagline: 'Same-Day & Next-Day E-Waste Collection',
    description: 'Free e-waste pickup across Kochi and Ernakulam. Corporate clients with 10+ devices get free doorstep collection. Same-day pickup available for Infopark and Smart City.',
    longDescription: `EWaste Kochi offers free doorstep e-waste pickup across all of Kochi and Ernakulam for corporate clients disposing of 10 or more devices. For urgent requirements at Infopark, Smart City, or Kakkanad, we can often arrange pickup within 2–4 hours.

**Coverage area:** Infopark, Smart City, Kakkanad, Edapally, Vyttila, Palarivattom, Aluva, Angamaly, Thrissur road, Perumbavoor, Muvattupuzha, Thrippunithura, Maradu, Kalamassery, Eloor, Kalady, Piravom, and all of Ernakulam district.

**What happens during pickup:** Our uniformed team arrives with a secure vehicle → signs your inventory manifest → issues a pickup receipt → transports to our certified facility → you receive your Certificate of Destruction within 24 hours.

Individual/residential walk-in drop-off is always free at our Thrippunithura facility.`,
    keywords: ['free e-waste pickup kochi', 'ewaste collection kochi', 'free ewaste collection ernakulam', 'same day pickup ewaste kochi', 'e-waste doorstep pickup kochi'],
    metaTitle: 'Free E-Waste Pickup Kochi | Same-Day Collection | Infopark, Kakkanad, Edapally | EWaste Kochi',
    metaDescription: 'Free e-waste pickup across Kochi & Ernakulam. 10+ devices = free corporate collection. Same-day pickup at Infopark & Smart City. Call 24/7.',
    price: 'Free for 10+ devices',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['Free Pickup', 'Same-Day', '24/7 Service', 'All Areas'],
    relatedServices: ['e-waste-recycling-kochi', 'itad-kochi', 'data-destruction-kochi'],
    schemaType: 'Service',
  },
  {
    slug: 'battery-recycling-kochi',
    name: 'Battery Recycling Kochi',
    shortName: 'Battery Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '🔋',
    tagline: 'Safe Li-Ion, Lead-Acid & Laptop Battery Disposal',
    description: 'Safe and legal battery recycling in Kochi. Li-ion, lead-acid, laptop batteries, UPS batteries, EV batteries. KSPCB authorized. Free bulk collection.',
    longDescription: `Batteries are among the most hazardous e-waste. Lithium-ion, lead-acid, and NiMH batteries contain toxic heavy metals that can cause fires, explosions, and severe environmental contamination if improperly disposed.

EWaste Kochi has KSPCB authorization to safely collect, transport, and recycle all battery types including laptop/phone Li-ion packs, lead-acid UPS and automotive batteries, large EV/industrial battery packs, alkaline and NiMH consumer batteries, and data center battery backup systems.

**Why certified battery recycling matters:** Under the Battery Waste Management Rules 2022, producers, importers, and large consumers of batteries must use authorized recyclers. Penalties for non-compliance can reach ₹1 lakh per ton.`,
    keywords: ['battery recycling kochi', 'battery disposal kochi', 'laptop battery disposal kochi', 'lithium battery recycling kerala', 'UPS battery disposal kochi', 'EV battery recycling kochi'],
    metaTitle: 'Battery Recycling Kochi | Li-Ion, Lead-Acid, UPS, EV Batteries | KSPCB Authorized | EWaste Kochi',
    metaDescription: 'Safe battery recycling in Kochi. Li-ion, lead-acid, laptop, UPS, EV batteries. KSPCB authorized. Free bulk collection. Battery Waste Rules 2022 compliant.',
    price: 'Free bulk collection',
    badges: ['KSPCB Authorized', 'All Battery Types', 'Battery Rules 2022', 'Free Bulk Pickup'],
    relatedServices: ['e-waste-recycling-kochi', 'server-recycling-kochi', 'mobile-recycling-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'server-recycling-kochi',
    name: 'Server & Data Centre Recycling Kochi',
    shortName: 'Server Recycling',
    category: 'itad',
    isPillar: false,
    icon: '🖥️',
    tagline: 'Secure Decommissioning of Servers & Data Centres',
    description: 'Complete server and data centre decommissioning in Kochi. Rack servers, blade systems, network equipment. ITAD compliance, data destruction, and eco-friendly recycling.',
    longDescription: `Decommissioning servers and data centre infrastructure requires careful planning, certified data destruction, and compliant recycling. EWaste Kochi provides end-to-end data centre decommissioning services for IT companies, banks, hospitals, and government organizations across Kerala.

**What we handle:** Rack servers (Dell PowerEdge, HP ProLiant, IBM), blade systems, UPS systems, network switches and routers, storage arrays (SAN/NAS), patch panels, PDUs, server racks and cabinets, cabling, and KVM equipment.

**Our process:** Inventory → chain-of-custody documentation → NIST/DoD data destruction on all drives → physical shredding for HDDs/SSDs → responsible recycling of hardware → full ITAD audit report and Certificate of Destruction.`,
    keywords: ['server recycling kochi', 'data centre decommissioning kochi', 'server disposal kochi', 'rack server recycling kerala', 'IT equipment disposal kochi'],
    metaTitle: 'Server & Data Centre Recycling Kochi | ITAD Decommissioning | EWaste Kochi',
    metaDescription: 'Server and data centre decommissioning in Kochi. Rack servers, blade systems, network equipment. Certified ITAD, data destruction, Certificate of Destruction.',
    price: 'Quote-based',
    badges: ['Data Centre Spec', 'Chain of Custody', 'Certificate Included', 'All Brands'],
    relatedServices: ['itad-kochi', 'data-destruction-kochi', 'hard-drive-shredding-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'mobile-recycling-kochi',
    name: 'Mobile Phone Recycling Kochi',
    shortName: 'Mobile Recycling',
    category: 'buyback',
    isPillar: false,
    icon: '📱',
    tagline: 'Buy Old Phones & Tablets in Kochi',
    description: 'Sell or recycle your old smartphone in Kochi. All brands — iPhone, Samsung, OnePlus, Xiaomi, Vivo, Oppo. Data wiped, safe recycling or best buyback price.',
    longDescription: `Old smartphones and tablets are treasure troves of valuable materials — gold, silver, platinum, rare earth elements — and repositories of sensitive personal data. EWaste Kochi handles both aspects responsibly.

**Buyback:** We offer competitive prices for used iPhones, Samsung Galaxy, OnePlus, Xiaomi, Oppo, Vivo, Realme, and all Android/iOS devices. Data is professionally wiped before any resale.

**Recycling:** Non-working, broken, or very old devices are recycled through our KSPCB-authorized facility, ensuring hazardous materials like lithium, lead, and arsenic don't contaminate Kochi's environment.

**Bulk mobile recycling:** IT companies, telecom operators, and retailers with bulk handsets get free pickup and priority processing.`,
    keywords: ['mobile recycling kochi', 'sell old phone kochi', 'sell iphone kochi', 'smartphone recycling kerala', 'tablet recycling kochi', 'phone buyback kochi'],
    metaTitle: 'Mobile Phone Recycling & Buyback Kochi | iPhone, Samsung, All Brands | EWaste Kochi',
    metaDescription: 'Sell or recycle your old phone in Kochi. iPhone, Samsung, OnePlus, all brands. Data wiped, best buyback prices or responsible recycling. Free bulk pickup.',
    price: '₹500 – ₹50,000+ depending on model',
    badges: ['All Brands', 'Data Wiped', 'Same-Day Payment', 'Free Pickup'],
    relatedServices: ['laptop-buyback-kochi', 'e-waste-recycling-kochi', 'battery-recycling-kochi'],
    schemaType: 'BuyAction',
  },
  {
    slug: 'corporate-ewaste-kochi',
    name: 'Corporate E-Waste Management Kochi',
    shortName: 'Corporate E-Waste',
    category: 'corporate',
    isPillar: false,
    icon: '🏛️',
    tagline: 'Your Compliance Partner for E-Waste Rules 2022',
    description: 'End-to-end corporate e-waste management in Kochi. EPR compliance, annual disposal programs, CSR documentation, and dedicated account manager for enterprises.',
    keywords: ['corporate e-waste kochi', 'corporate ITAD kochi', 'enterprise e-waste management kerala', 'EPR compliance kochi', 'corporate electronics disposal kochi'],
    metaTitle: 'Corporate E-Waste Management Kochi | EPR Compliance | Annual Programs | EWaste Kochi',
    metaDescription: 'Corporate e-waste management in Kochi. EPR compliance, annual disposal programs, CSR documentation. DPDP Act 2023 + E-Waste Rules 2022 compliant. Dedicated account manager.',
    price: 'Annual contract available',
    badges: ['EPR Compliant', 'Annual Programs', 'CSR Documentation', 'Dedicated Manager'],
    relatedServices: ['itad-kochi', 'e-waste-recycling-kochi', 'data-destruction-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'printer-recycling-kochi',
    name: 'Printer & MFD Recycling Kochi',
    shortName: 'Printer Recycling',
    category: 'recycling',
    isPillar: false,
    icon: '🖨️',
    tagline: 'Safe Disposal of Printers, Copiers & MFDs',
    description: 'Eco-friendly printer and multifunction device recycling in Kochi. Toner cartridges, inkjet, laser printers, photocopiers. Free corporate pickup.',
    keywords: ['printer recycling kochi', 'copier disposal kochi', 'MFD recycling kerala', 'toner cartridge recycling kochi', 'photocopier disposal kochi'],
    metaTitle: 'Printer & Copier Recycling Kochi | Toner, MFD, Laser Printers | EWaste Kochi',
    metaDescription: 'Printer, copier, and MFD recycling in Kochi. Toner cartridges, inkjet, laser printers, photocopiers. KSPCB authorized. Free corporate pickup.',
    price: 'Free bulk pickup',
    badges: ['All Printer Types', 'Toner Accepted', 'KSPCB Certified', 'Free Pickup'],
    relatedServices: ['e-waste-recycling-kochi', 'corporate-ewaste-kochi', 'itad-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'tv-monitor-recycling-kochi',
    name: 'TV & Monitor Recycling Kochi',
    shortName: 'TV & Monitor Recycling',
    category: 'recycling',
    isPillar: false,
    icon: '📺',
    tagline: 'CRT, LCD, LED, OLED Monitor & TV Disposal',
    description: 'Safe TV and computer monitor recycling in Kochi. CRT, LCD, LED, OLED, plasma screens. Contains hazardous lead and mercury — requires certified recycler.',
    keywords: ['TV recycling kochi', 'monitor recycling kochi', 'CRT disposal kochi', 'LCD recycling kerala', 'TV disposal kochi', 'screen recycling kochi'],
    metaTitle: 'TV & Monitor Recycling Kochi | CRT, LCD, LED, OLED | EWaste Kochi',
    metaDescription: 'Safe TV and monitor recycling in Kochi. CRT, LCD, LED, OLED, plasma. Contains lead/mercury — KSPCB authorized disposal. Free corporate pickup.',
    price: 'Free bulk pickup',
    badges: ['CRT Specialists', 'All Screen Types', 'Hazardous Waste Certified', 'Free Pickup'],
    relatedServices: ['e-waste-recycling-kochi', 'corporate-ewaste-kochi', 'printer-recycling-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'network-equipment-disposal-kochi',
    name: 'Network Equipment Disposal Kochi',
    shortName: 'Network Equipment',
    category: 'itad',
    isPillar: false,
    icon: '🔌',
    tagline: 'Routers, Switches, Firewalls & Network Gear',
    description: 'Secure disposal of networking equipment in Kochi. Cisco, Juniper, HP, Dell, Aruba switches, routers, firewalls. Configuration wiped, Certificate of Disposal issued.',
    keywords: ['network equipment disposal kochi', 'router disposal kochi', 'switch recycling kochi', 'Cisco disposal kochi', 'firewall disposal kerala'],
    metaTitle: 'Network Equipment Disposal Kochi | Routers, Switches, Firewalls | ITAD | EWaste Kochi',
    metaDescription: 'Secure network equipment disposal in Kochi. Cisco, Juniper, HP switches, routers, firewalls. Configuration wiped, Certificate of Disposal. Free bulk pickup.',
    price: 'Free bulk disposal',
    badges: ['Config Wiped', 'All Brands', 'Certificate Issued', 'ITAD Compliant'],
    relatedServices: ['server-recycling-kochi', 'itad-kochi', 'data-destruction-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'ups-inverter-recycling-kochi',
    name: 'UPS & Inverter Recycling Kochi',
    shortName: 'UPS & Inverter',
    category: 'recycling',
    isPillar: false,
    icon: '⚡',
    tagline: 'Safe UPS, Inverter & Lead-Acid Battery Disposal',
    description: 'Certified UPS and inverter recycling in Kochi. Lead-acid batteries, APC, Eaton, Luminous UPS systems. Hazardous battery disposal done right.',
    keywords: ['UPS recycling kochi', 'inverter disposal kochi', 'UPS battery recycling kerala', 'APC UPS disposal kochi', 'lead acid battery recycling kochi'],
    metaTitle: 'UPS & Inverter Recycling Kochi | Lead-Acid Battery Disposal | KSPCB Authorized | EWaste Kochi',
    metaDescription: 'UPS and inverter recycling in Kochi. Lead-acid batteries, APC, Eaton, Luminous. KSPCB authorized, Battery Rules 2022 compliant. Free bulk collection.',
    price: 'Free bulk collection',
    badges: ['Battery Rules 2022', 'Lead-Acid Certified', 'KSPCB Authorized', 'All Brands'],
    relatedServices: ['battery-recycling-kochi', 'server-recycling-kochi', 'e-waste-recycling-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'air-conditioner-recycling-kochi',
    name: 'Air Conditioner Recycling Kochi',
    shortName: 'AC Recycling',
    category: 'recycling',
    isPillar: false,
    icon: '❄️',
    tagline: 'Eco-Friendly AC & Refrigerator Disposal',
    description: 'Certified air conditioner and large appliance recycling in Kochi. Safe refrigerant recovery, compressor recycling. KSPCB authorized.',
    keywords: ['AC recycling kochi', 'air conditioner disposal kochi', 'refrigerator recycling kochi', 'large appliance disposal kerala', 'old AC disposal kochi'],
    metaTitle: 'Air Conditioner Recycling Kochi | AC Disposal, Refrigerant Recovery | KSPCB | EWaste Kochi',
    metaDescription: 'Certified AC and large appliance recycling in Kochi. Safe refrigerant recovery, compressor recycling. KSPCB authorized. Free corporate pickup.',
    price: 'Free bulk pickup',
    badges: ['Refrigerant Recovery', 'KSPCB Certified', 'All Brands', 'Free Pickup'],
    relatedServices: ['e-waste-recycling-kochi', 'corporate-ewaste-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'dpdp-act-compliance-kochi',
    name: 'DPDP Act 2023 Compliance Kochi',
    shortName: 'DPDP Compliance',
    category: 'compliance',
    isPillar: false,
    icon: '⚖️',
    tagline: 'Data Destruction for DPDP Act 2023 Compliance',
    description: 'DPDP Act 2023 compliant data destruction services in Kochi. Certificate of Destruction, audit trail, and compliance documentation for Indian data protection law.',
    keywords: ['DPDP Act 2023 compliance kochi', 'DPDP ewaste kochi', 'data protection compliance kochi', 'DPDP data destruction kerala'],
    metaTitle: 'DPDP Act 2023 Compliance Kochi | Certified Data Destruction | EWaste Kochi',
    metaDescription: 'DPDP Act 2023 compliant data destruction in Kochi. Certificate of Destruction + full audit trail. India\'s data protection law compliance made simple.',
    price: '₹200 – ₹1,500 per device',
    badges: ['DPDP Compliant', 'Audit Trail', 'Certificate of Destruction', 'Legal Documentation'],
    relatedServices: ['data-destruction-kochi', 'itad-kochi', 'hard-drive-shredding-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'certificate-of-destruction-kochi',
    name: 'Certificate of Destruction Kochi',
    shortName: 'Certificate of Destruction',
    category: 'compliance',
    isPillar: false,
    icon: '📜',
    tagline: 'Legal CoD for Every Data Destruction Job',
    description: 'Legally valid Certificate of Destruction issued for every job. RBI, SEBI, ISO 27001, DPDP Act compliant. Lists device serial numbers, destruction method and date.',
    keywords: ['certificate of destruction kochi', 'CoD ewaste kochi', 'data destruction certificate kerala', 'CoD for RBI audit kochi'],
    metaTitle: 'Certificate of Destruction Kochi | RBI, SEBI, ISO 27001 | EWaste Kochi',
    metaDescription: 'Legally valid Certificate of Destruction for every data destruction job in Kochi. RBI, SEBI, ISO 27001, DPDP Act compliant. Issued within 24 hours.',
    price: 'Included in all jobs',
    badges: ['RBI Compliant', 'SEBI Compliant', 'ISO 27001', 'DPDP Act'],
    relatedServices: ['data-destruction-kochi', 'hard-drive-shredding-kochi', 'itad-kochi'],
    schemaType: 'ProfessionalService',
  },

  // ── GSC QUICK-WIN SERVICES (Added April 2026 based on Search Console data) ──
  {
    slug: 'sell-electronics-kochi',
    name: 'Sell Electronics Kochi',
    shortName: 'Sell Electronics',
    category: 'buyback',
    isPillar: true,
    icon: '💰',
    tagline: 'Best Prices for Old Laptops, Phones & Electronics in Kochi',
    description: 'Sell your old laptops, MacBooks, iPhones and electronics in Kochi for the best local prices. Instant payment. Free pickup for 10+ items. NIST data destruction included — free.',
    longDescription: 'EWaste Kochi is the best place to sell old electronics locally in Kochi. We pay significantly more than Cashify, OLX or local dealers for corporate laptops and Apple devices because we sell directly to verified business buyers. Current rates (April 2026): MacBook Pro M3: up to ₹65,000 | iPhone 15 Pro Max: up to ₹75,000 | Dell/HP i7 laptop (2020+): up to ₹18,000. Free pickup for 10+ devices. Instant bank transfer payment. NIST 800-88 data destruction included at no extra charge.',
    keywords: ['where to sell electronics locally kochi', 'sell old laptop kochi', 'sell old phone kochi', 'best laptop buyback kochi', 'macbook buyback kochi', 'sell electronics near me kochi', 'electronics buyback kochi'],
    metaTitle: 'Sell Old Laptop & Phone Kochi 2026 — Best Prices | ₹75K iPhone · ₹65K MacBook | EWaste Kochi',
    metaDescription: 'Best prices for old laptops and phones in Kochi. MacBook up to ₹65K, iPhone up to ₹75K, Dell/HP up to ₹18K. Free pickup, instant payment, NIST data wipe included. Better than Cashify.',
    price: 'We pay you — MacBook up to ₹65,000',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['Best Rates Kerala', 'Instant Payment', 'Free Data Wipe', 'Free Pickup 10+'],
    relatedServices: ['laptop-buyback-kochi', 'itad-kochi', 'data-destruction-kochi'],
    schemaType: 'Service',
  },
  {
    slug: 'hard-drive-destruction-kochi',
    name: 'Hard Drive Destruction Kochi',
    shortName: 'Hard Drive Destruction',
    category: 'data',
    isPillar: true,
    icon: '⚙️',
    tagline: 'Industrial Hard Drive Destruction Service — NIST 800-88 Certified',
    description: 'Industrial hard drive destruction service in Kochi. Physical shredding to <5mm. HDD, SSD, NVMe, tape. Certificate of Destruction. On-site mobile destruction available. DPDP Act compliant.',
    longDescription: `EWaste Kochi provides Kochi's most comprehensive hard drive destruction service. Our industrial shredder reduces hard drives and SSDs to particles smaller than 5mm - the NIST 800-88 Destroy level. This is the only method that provides absolute certainty of data irrecoverability.

We process all storage media types: 2.5/3.5 SATA HDDs, enterprise SAS drives, NVMe M.2 SSDs, 2.5/3.5 enterprise SSDs, backup tapes (LTO 1-9, DLT, DAT), USB drives, SD cards, and optical media.

For clients who require that data never leaves their premises, our mobile hard drive shredding unit comes to your Kochi office for on-site witnessed destruction. Ideal for banks, hospitals, government offices and defence contractors.

Every hard drive destruction job receives a Certificate of Destruction listing each drive's serial number, destruction method, particle size achieved, date and our KSPCB authorization number.`,
    keywords: ['hard drive destruction service kochi', 'hard drive shredding kochi', 'hard drive shredding company kochi', 'secure hard drive disposal kochi', 'SSD destruction kochi', 'data destruction service kochi', 'hard drive disposal kochi'],
    metaTitle: 'Hard Drive Destruction Service Kochi | Industrial Shredding | NIST 800-88 | EWaste Kochi',
    metaDescription: 'Industrial hard drive destruction service in Kochi. Physical shredding <5mm, NIST 800-88 Destroy level. HDD, SSD, NVMe, tape. On-site available. Certificate of Destruction every drive.',
    price: '₹149–₹349 per drive',
    priceSchema: '149',
    priceCurrency: 'INR',
    badges: ['NIST 800-88 Destroy', 'On-Site Available', 'Certificate of Destruction', '<5mm Particles'],
    relatedServices: ['data-destruction-kochi', 'itad-kochi', 'certificate-of-destruction-kochi'],
    schemaType: 'Service',
  },
  {
    slug: 'it-asset-inventory-audit',
    name: 'IT Asset Inventory Audit',
    shortName: 'IT Asset Audit',
    category: 'itad',
    isPillar: false,
    icon: '📋',
    tagline: 'Complete IT Asset Tagging and Inventory for Corporate Kochi',
    description: 'Pre-disposal IT asset inventory and audit service in Kochi. Complete tagging, serial number capture, condition assessment, and valuation for corporate IT refresh projects.',
    longDescription: `Before any device is retired, it should be properly inventoried. EWaste Kochi's IT asset inventory audit service provides a complete, documented picture of your retiring IT estate: make, model, serial number, asset tag, condition grade, estimated buyback value, and data classification. This inventory forms the foundation of your chain-of-custody documentation and satisfies DPDP Act 2023 and E-Waste Rules manifest requirements.

For large enterprise clients at Infopark, Smart City and across Kochi, we deploy a dedicated inventory team with barcode scanners and our ITAD management system. Real-time digital inventory accessible to your IT team during the audit.`,
    keywords: ['IT asset inventory kochi', 'IT asset audit kochi', 'IT asset tagging kochi', 'IT asset management kochi', 'hardware inventory kochi'],
    metaTitle: 'IT Asset Inventory Audit Kochi | Asset Tagging & Valuation | EWaste Kochi',
    metaDescription: 'Professional IT asset inventory and audit for corporate clients in Kochi. Complete device tagging, serial capture, condition grading and valuation. Mandatory before ITAD.',
    price: 'Included with ITAD service',
    badges: ['Barcode Scanning', 'Real-time Digital', 'DPDP Act Ready'],
    relatedServices: ['itad-kochi', 'data-destruction-kochi', 'certificate-of-destruction-kochi'],
    schemaType: 'ProfessionalService',
  },

  // ── NEW HIGH-TRAFFIC SERVICE PAGES (Added April 2026 based on Search Console data) ──────────────────────
  {
    slug: 'battery-recycling-near-me',
    name: 'Battery Recycling Near Me',
    shortName: 'Battery Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '🔋',
    tagline: 'Safe Battery Disposal & Recycling Near You in Kochi',
    description: 'Find safe battery recycling near you in Kochi. We recycle lithium-ion, lead-acid, laptop, phone, UPS, and EV batteries. Free pickup for bulk. KSPCB authorized.',
    longDescription: `Searching for "battery recycling near me" in Kochi? EWaste Kochi provides safe, certified battery recycling services across Ernakulam and all of Kerala. We handle all battery types including lithium-ion (laptops, phones, power banks), lead-acid (UPS, inverters, automotive), NiMH, and EV batteries.

**Why battery recycling matters:** Batteries contain toxic heavy metals and chemicals that can cause fires, explosions, and severe environmental contamination. Under India's Battery Waste Management Rules 2022, improper disposal can result in penalties up to ₹1 lakh per ton.

**Our battery recycling services:** Free pickup for bulk quantities (20+ batteries), safe handling of swollen/damaged batteries, certified recycling with full documentation, and compliance with Battery Waste Rules 2022. We serve residential, commercial, and industrial clients across Kochi including Infopark, Smart City, Kakkanad, Edapally, and all Ernakulam areas.`,
    keywords: ['battery recycling near me', 'battery disposal near me', 'lithium battery recycling kochi', 'lead acid battery disposal', 'laptop battery recycling', 'phone battery recycling', 'UPS battery disposal', 'EV battery recycling kochi', 'swollen battery disposal'],
    metaTitle: 'Battery Recycling Near Me Kochi | Li-Ion, Lead-Acid, UPS, EV | Free Pickup | EWaste Kochi',
    metaDescription: 'Safe battery recycling near you in Kochi. Li-ion, lead-acid, laptop, UPS, EV batteries. KSPCB authorized. Free bulk pickup. Battery Waste Rules 2022 compliant. Call 24/7.',
    price: 'Free for 20+ batteries',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'All Battery Types', 'Free Bulk Pickup', 'Battery Rules 2022'],
    relatedServices: ['e-waste-recycling-kochi', 'ups-inverter-recycling-kochi', 'mobile-recycling-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'electronics-recycling-near-me',
    name: 'Electronics Recycling Near Me',
    shortName: 'Electronics Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '♻️',
    tagline: 'Electronics Recycling Near You in Kochi & Ernakulam',
    description: 'Find electronics recycling near you in Kochi. We recycle computers, laptops, phones, TVs, printers, and all e-waste. Free pickup for bulk. KSPCB authorized recycler.',
    longDescription: `Looking for "electronics recycling near me" in Kochi? EWaste Kochi is your local KSPCB-authorized electronics recycler serving all of Ernakulam district. We accept all types of electronic waste: computers, laptops, desktops, servers, mobile phones, tablets, TVs, monitors, printers, scanners, networking equipment, and small household electronics.

**Why choose certified electronics recycling:** Uncertified recyclers often strip valuable components and dump hazardous materials in landfills. As a KSPCB-authorized facility, we ensure 100% compliant processing with zero landfill commitment.

**Our electronics recycling process:** Collection → Secure data destruction (if needed) → Dismantling → Material segregation → Precious metal recovery → Hazardous material safe disposal. We provide Certificate of Recycling for all corporate pickups.`,
    keywords: ['electronics recycling near me', 'electronic recycling near me', 'computer recycling near me', 'e waste recycling near me', 'recycle electronics kochi', 'electronic waste recycling', 'where to recycle electronics'],
    metaTitle: 'Electronics Recycling Near Me Kochi | Computers, Phones, TVs | Free Pickup | EWaste Kochi',
    metaDescription: 'Electronics recycling near you in Kochi. Computers, laptops, phones, TVs, printers. KSPCB authorized. Free bulk pickup. Certificate of Recycling provided. Call 24/7.',
    price: 'Free for 10+ items',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'All Electronics', 'Free Bulk Pickup', 'Zero Landfill'],
    relatedServices: ['e-waste-recycling-kochi', 'computer-recycling', 'laptop-buyback-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'computer-recycling',
    name: 'Computer Recycling',
    shortName: 'Computer Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '🖥️',
    tagline: 'Desktop & Laptop Computer Recycling in Kochi',
    description: 'Recycle old computers in Kochi. Desktops, laptops, all-in-ones, workstations. Free pickup for businesses. Data destruction included. KSPCB authorized.',
    longDescription: `Computer recycling in Kochi made simple. EWaste Kochi recycles all types of computers: desktop PCs, laptops, all-in-one computers, workstations, servers, and computer peripherals. Whether you have a single old computer or hundreds from an office refresh, we provide compliant, environmentally responsible recycling.

**What we recycle:** Desktop computers (towers, SFF, USFF), laptops and notebooks, all-in-one PCs, workstations, computer monitors, keyboards, mice, cables, and computer accessories.

**Data security guaranteed:** All computers with storage drives undergo NIST 800-88 certified data wiping or physical destruction. Certificate of Destruction provided for every device. This is essential for businesses handling sensitive data and required for DPDP Act 2023 compliance.

**Business computer recycling:** Free pickup for 10+ computers anywhere in Kochi. Same-day service available for Infopark, Smart City, and Kakkanad. Full audit documentation provided.`,
    keywords: ['computer recycling', 'recycle computers', 'computer recycling kochi', 'desktop recycling', 'old computer disposal', 'computer recycling near me', 'where to recycle old computers'],
    metaTitle: 'Computer Recycling Kochi | Desktops, Laptops, Workstations | Free Pickup | EWaste Kochi',
    metaDescription: 'Recycle computers in Kochi. Desktops, laptops, workstations. Free business pickup. NIST data destruction included. KSPCB authorized. Certificate provided. Call 24/7.',
    price: 'Free for 10+ computers',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'Data Destruction Included', 'Free Business Pickup', 'All Brands'],
    relatedServices: ['e-waste-recycling-kochi', 'laptop-buyback-kochi', 'data-destruction-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'secure-computer-recycling',
    name: 'Secure Computer Recycling',
    shortName: 'Secure Computer Recycling',
    category: 'data',
    isPillar: true,
    icon: '🔒',
    tagline: 'NIST-Certified Secure Computer Recycling in Kochi',
    description: 'Secure computer recycling with certified data destruction in Kochi. NIST 800-88 & DoD compliant. Certificate of Destruction for every device. DPDP Act ready.',
    longDescription: `Secure computer recycling is not just about environmental responsibility — it's about protecting your data. EWaste Kochi provides NIST 800-88 and DoD 5220.22-M certified secure computer recycling for businesses, government agencies, hospitals, and educational institutions across Kochi.

**What makes our computer recycling secure:** NIST 800-88 certified data wiping with verification, physical hard drive shredding available, chain-of-custody documentation, tamper-evident transport, GPS-tracked vehicles, secure facility with 24/7 monitoring, and Certificate of Destruction for every device.

**Compliance ready:** Our secure recycling process meets DPDP Act 2023, RBI, SEBI, ISO 27001, and IT Act requirements. Perfect for banks, financial services, healthcare, IT companies, and government organizations.

**On-site destruction available:** For maximum security, we can destroy hard drives at your premises with our mobile shredding unit. Witness the destruction and receive your Certificate of Destruction immediately.`,
    keywords: ['secure computer recycling', 'secure computer disposal', 'certified computer recycling', 'secure IT recycling', 'data secure computer disposal', 'NIST computer recycling'],
    metaTitle: 'Secure Computer Recycling Kochi | NIST Certified | Certificate of Destruction | EWaste Kochi',
    metaDescription: 'Secure computer recycling in Kochi. NIST 800-88 certified data destruction. Certificate of Destruction every device. DPDP Act compliant. On-site shredding available.',
    price: '₹299–₹599 per computer',
    priceSchema: '299',
    priceCurrency: 'INR',
    badges: ['NIST 800-88', 'DoD 5220.22-M', 'Certificate of Destruction', 'DPDP Compliant'],
    relatedServices: ['data-destruction-kochi', 'hard-drive-shredding-kochi', 'itad-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'laptop-recycling-near-me',
    name: 'Laptop Recycling Near Me',
    shortName: 'Laptop Recycling',
    category: 'recycling',
    isPillar: true,
    icon: '💻',
    tagline: 'Laptop Recycling & Buyback Near You in Kochi',
    description: 'Recycle or sell your old laptop near you in Kochi. All brands accepted. Best buyback prices. Free pickup. Data securely wiped. Same-day payment.',
    longDescription: `Searching for "laptop recycling near me" in Kochi? EWaste Kochi offers both recycling and buyback options for old laptops. We accept all brands: Dell, HP, Lenovo, Apple MacBook, Asus, Acer, MSI, and more. Whether your laptop is working, damaged, or completely dead, we have a solution.

**Laptop buyback (working laptops):** Get the best prices for working laptops in Kochi. MacBook Pro up to ₹65,000, MacBook Air up to ₹45,000, Dell/HP business laptops up to ₹18,000. Same-day payment via UPI or bank transfer.

**Laptop recycling (non-working):** Non-working laptops are dismantled and recycled responsibly. We recover valuable materials (gold, silver, copper) and ensure hazardous components (batteries, mercury) are safely disposed.

**Data security:** Every laptop undergoes NIST 800-88 certified data wiping. Certificate of Destruction provided. Free pickup for 5+ laptops anywhere in Kochi.`,
    keywords: ['laptop recycling near me', 'recycle laptop near me', 'laptop disposal near me', 'sell laptop near me', 'old laptop recycling kochi', 'laptop buyback near me'],
    metaTitle: 'Laptop Recycling Near Me Kochi | Buyback & Recycling | Free Pickup | EWaste Kochi',
    metaDescription: 'Laptop recycling near you in Kochi. All brands accepted. Best buyback prices. Free pickup. Data securely wiped. Same-day payment. MacBook up to ₹65K. Call now.',
    price: '₹2,000 – ₹80,000+ buyback',
    priceSchema: '2000',
    priceCurrency: 'INR',
    badges: ['Best Prices Kerala', 'All Brands', 'Free Pickup', 'Same-Day Payment'],
    relatedServices: ['laptop-buyback-kochi', 'computer-recycling', 'data-destruction-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'electronic-waste-disposal',
    name: 'Electronic Waste Disposal',
    shortName: 'E-Waste Disposal',
    category: 'recycling',
    isPillar: true,
    icon: '🗑️',
    tagline: 'Safe Electronic Waste Disposal in Kochi & Kerala',
    description: 'Safe electronic waste disposal in Kochi. We dispose of all e-waste: computers, phones, TVs, batteries. KSPCB authorized. Free pickup. Certificate provided.',
    longDescription: `Electronic waste disposal in Kochi requires a certified approach. EWaste Kochi is a KSPCB-authorized e-waste disposal facility serving all of Ernakulam district and Kerala. We dispose of all types of electronic waste in compliance with E-Waste (Management) Rules 2022.

**What is electronic waste:** Computers, laptops, tablets, mobile phones, TVs, monitors, printers, scanners, keyboards, mice, cables, chargers, batteries, electronic toys, small appliances, and more.

**Why proper disposal matters:** E-waste contains hazardous materials like lead, mercury, cadmium, and arsenic. Improper disposal in landfills leads to soil and water contamination. Under E-Waste Rules 2022, businesses must dispose of e-waste only through authorized recyclers.

**Our disposal process:** Collection → Inventory → Data destruction (if needed) → Dismantling → Material recovery → Hazardous material safe disposal → Certificate of Disposal. Zero landfill commitment.`,
    keywords: ['electronic waste disposal', 'e waste disposal', 'ewaste disposal', 'electronic waste disposal near me', 'e waste disposal kochi', 'where to dispose electronic waste'],
    metaTitle: 'Electronic Waste Disposal Kochi | Safe E-Waste Disposal | Free Pickup | EWaste Kochi',
    metaDescription: 'Safe electronic waste disposal in Kochi. All e-waste accepted. KSPCB authorized. Free pickup. Certificate of Disposal. E-Waste Rules 2022 compliant. Call 24/7.',
    price: 'Free for 10+ items',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'All E-Waste', 'Free Pickup', 'Certificate Provided'],
    relatedServices: ['e-waste-recycling-kochi', 'battery-recycling-near-me', 'electronics-recycling-near-me'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'old-computer-disposal',
    name: 'Old Computer Disposal',
    shortName: 'Old Computer Disposal',
    category: 'recycling',
    isPillar: true,
    icon: '💻',
    tagline: 'Safe Old Computer Disposal in Kochi & Ernakulam',
    description: 'Dispose of old computers safely in Kochi. Desktops, laptops, all brands. Free pickup for businesses. Data destruction included. KSPCB authorized.',
    longDescription: `Old computer disposal in Kochi requires careful handling — both for data security and environmental compliance. EWaste Kochi provides safe, certified old computer disposal services across Ernakulam district.

**We dispose of all old computers:** Desktop PCs (towers, SFF, all-in-one), laptops and notebooks, old CRT monitors, LCD/LED monitors, computer peripherals, cables and accessories, and computer components.

**Data security first:** Old computers often contain sensitive personal or business data. Simply deleting files or formatting is not enough. We provide NIST 800-88 certified data wiping or physical hard drive destruction with Certificate of Destruction.

**Environmental compliance:** As a KSPCB-authorized recycler, we ensure your old computers are disposed of in compliance with E-Waste Rules 2022. No landfill dumping — 100% responsible recycling.`,
    keywords: ['old computer disposal', 'dispose old computers', 'old computer disposal near me', 'where to dispose old computers', 'old computer recycling', 'old laptop disposal'],
    metaTitle: 'Old Computer Disposal Kochi | Safe Disposal | Free Pickup | Data Wiped | EWaste Kochi',
    metaDescription: 'Dispose of old computers safely in Kochi. Desktops, laptops, all brands. Free business pickup. NIST data destruction. KSPCB authorized. Certificate provided. Call 24/7.',
    price: 'Free for 10+ computers',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'Data Destruction', 'Free Pickup', 'All Brands'],
    relatedServices: ['computer-recycling', 'data-destruction-kochi', 'laptop-buyback-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'sell-old-electronics',
    name: 'Sell Old Electronics',
    shortName: 'Sell Old Electronics',
    category: 'buyback',
    isPillar: true,
    icon: '💰',
    tagline: 'Best Prices for Old Electronics in Kochi',
    description: 'Sell your old electronics in Kochi for the best prices. Laptops, phones, tablets, desktops. Instant payment. Free pickup. All brands accepted.',
    longDescription: `Want to sell old electronics in Kochi? EWaste Kochi offers the best buyback prices for used electronics in Kerala. We buy laptops, mobile phones, tablets, desktop computers, and other electronic devices — working or not.

**Electronics we buy:** Laptops (Dell, HP, Lenovo, Apple, Asus, Acer), mobile phones (iPhone, Samsung, OnePlus, Xiaomi, all brands), tablets and iPads, desktop computers, gaming consoles, smartwatches, and other gadgets.

**Why sell to us:** Better prices than Cashify, OLX, or local dealers (we sell directly to business buyers), instant payment via UPI/bank transfer, free pickup for 5+ items, NIST-certified data wiping included, and transparent pricing with no hidden deductions.

**Current buyback prices (April 2026):** MacBook Pro M3: up to ₹65,000 | iPhone 15 Pro Max: up to ₹75,000 | Dell Latitude i7 (2020+): up to ₹18,000 | iPad Pro: up to ₹45,000`,
    keywords: ['sell old electronics', 'sell old electronics near me', 'sell used electronics', 'sell electronics kochi', 'sell old laptop', 'sell old phone', 'electronics buyback'],
    metaTitle: 'Sell Old Electronics Kochi | Best Prices | Laptops, Phones | Instant Payment | EWaste Kochi',
    metaDescription: 'Sell old electronics in Kochi for best prices. Laptops, phones, tablets. Better than Cashify. Instant UPI payment. Free pickup. MacBook up to ₹65K. Call now.',
    price: 'We pay you — up to ₹75,000',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['Best Prices Kerala', 'Instant Payment', 'Free Pickup', 'All Brands'],
    relatedServices: ['laptop-buyback-kochi', 'mobile-recycling-kochi', 'sell-electronics-kochi'],
    schemaType: 'BuyAction',
  },
  {
    slug: 'secure-laptop-disposal',
    name: 'Secure Laptop Disposal',
    shortName: 'Secure Laptop Disposal',
    category: 'data',
    isPillar: true,
    icon: '🔐',
    tagline: 'Certified Secure Laptop Disposal in Kochi',
    description: 'Secure laptop disposal with certified data destruction in Kochi. NIST 800-88 compliant. Certificate of Destruction. DPDP Act ready. On-site available.',
    longDescription: `Secure laptop disposal is critical for businesses handling sensitive data. EWaste Kochi provides NIST 800-88 certified secure laptop disposal services for corporate clients, government agencies, and organizations across Kochi.

**Our secure disposal process:** Chain-of-custody documentation from pickup to destruction, tamper-evident sealed transport, NIST 800-88 certified data wiping with verification, physical hard drive shredding option, Certificate of Destruction for every laptop, and audit-ready documentation.

**Compliance coverage:** DPDP Act 2023, RBI guidelines, SEBI regulations, ISO 27001, IT Act 2000. Perfect for banks, financial services, healthcare providers, IT companies, law firms, and government departments.

**On-site disposal:** For maximum security, we offer on-site laptop hard drive destruction at your premises. Watch the destruction process and receive your Certificate of Destruction immediately.`,
    keywords: ['secure laptop disposal', 'secure laptop recycling', 'certified laptop disposal', 'laptop data destruction', 'secure disposal of laptops', 'business laptop disposal'],
    metaTitle: 'Secure Laptop Disposal Kochi | NIST Certified | Certificate of Destruction | EWaste Kochi',
    metaDescription: 'Secure laptop disposal in Kochi. NIST 800-88 certified data destruction. Certificate of Destruction. DPDP Act compliant. On-site shredding available. Call 24/7.',
    price: '₹299–₹599 per laptop',
    priceSchema: '299',
    priceCurrency: 'INR',
    badges: ['NIST 800-88', 'Certificate of Destruction', 'DPDP Compliant', 'On-Site Available'],
    relatedServices: ['data-destruction-kochi', 'hard-drive-shredding-kochi', 'itad-kochi'],
    schemaType: 'ProfessionalService',
  },
   {
    slug: 'business-it-decommissioning',
    name: 'Business IT Decommissioning',
    shortName: 'IT Decommissioning',
    category: 'corporate',
    isPillar: true,
    icon: '🏢',
    tagline: 'Complete IT Decommissioning Services for Businesses',
    description: 'Full-service IT decommissioning for businesses in Kochi. Office closures, data centre shutdowns, IT refreshes. Asset recovery, data destruction, recycling.',
    longDescription: `Business IT decommissioning requires careful planning and execution. EWaste Kochi provides end-to-end IT decommissioning services for office closures, data centre shutdowns, IT refreshes, and business relocations across Kochi and Kerala.

Our decommissioning services: IT asset inventory and valuation, secure data destruction (NIST/DoD certified), asset remarketing and buyback, responsible recycling of non-recoverable equipment, chain-of-custody documentation, Certificate of Destruction for all storage devices, and EPR compliance documentation.

Types of decommissioning: Office closure IT clearance, data centre decommissioning, server room shutdown, IT refresh projects, business relocation IT moves, and startup wind-down services.

Industries served: IT companies, banks and financial services, hospitals and healthcare, educational institutions, government agencies, manufacturing, and retail chains.`,
    keywords: ['business it decommissioning', 'IT decommissioning services', 'office IT clearance', 'data centre decommissioning', 'IT asset decommissioning', 'corporate IT disposal'],
    metaTitle: 'Business IT Decommissioning Kochi | Office Clearance | Data Centre | EWaste Kochi',
    metaDescription: 'Business IT decommissioning in Kochi. Office closures, data centre shutdowns, IT refreshes. Asset recovery, certified data destruction, recycling. Full documentation.',
    price: 'Quote-based',
    badges: ['Full-Service', 'Asset Recovery', 'Data Destruction', 'EPR Compliant'],
    relatedServices: ['itad-kochi', 'server-recycling-kochi', 'data-destruction-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'hard-drive-degaussing-kochi',
    name: 'Hard Drive Degaussing Kochi',
    shortName: 'Hard Drive Degaussing',
    category: 'data',
    isPillar: false,
    icon: '🧲',
    tagline: 'Magnetic Data Destruction for HDDs, Tapes & Legacy Media',
    description: 'Professional hard drive degaussing in Kochi. Uses powerful magnetic fields to permanently erase data from HDDs, tapes, floppies. NIST 800-88 compliant. Certificate provided.',
    longDescription: `Hard drive degaussing is a magnetic data destruction method that uses a powerful electromagnetic field to permanently erase data from magnetic storage media. EWaste Kochi provides professional degaussing services in Kochi for hard drives, backup tapes, floppy disks, and other magnetic media.

**What degaussing destroys:** Traditional hard disk drives (HDDs), magnetic tapes (LTO, DLT, DAT), floppy disks, VHS tapes, and any media that stores data magnetically. **Does NOT work** on SSDs, flash drives, or optical media — those require physical shredding.

**Why choose degaussing:** For legacy enterprise environments with thousands of backup tapes or older HDDs, degaussing is faster and more cost-effective than individual shredding. It's NIST 800-88 compliant and produces a verifiable destruction certificate. Ideal for banks, government offices, and data centers retiring tape libraries.

**Our degaussing process:** Media intake → logging with serial numbers → degaussing chamber (field strength >30,000 Oersted) → verification → Certificate of Destruction with device list. All jobs completed within 48 hours.`,
    keywords: ['hard drive degaussing kochi', 'degaussing service kochi', 'magnetic data destruction kochi', 'tape degaussing kochi', 'HDD degaussing kerala'],
    metaTitle: 'Hard Drive Degaussing Kochi | Magnetic Data Destruction | HDD, Tape, Floppy | EWaste Kochi',
    metaDescription: 'Professional hard drive degaussing in Kochi. NIST 800-88 compliant magnetic data destruction for HDDs, backup tapes, floppy disks. Certificate of Destruction provided.',
    price: '₹80–₹200 per drive/tape',
    priceSchema: '80',
    priceCurrency: 'INR',
    badges: ['NIST 800-88', 'Magnetic Erasure', 'Tape Specialist', 'Fast Turnaround'],
    relatedServices: ['hard-drive-shredding-kochi', 'data-destruction-kochi', 'server-recycling-kochi'],
    schemaType: 'ProfessionalService',
  },
  {
    slug: 'computer-recycling-near-me',
    name: 'Computer Recycling Near Me',
    shortName: 'Computer Recycling Near Me',
    category: 'recycling',
    isPillar: true,
    icon: '🖥️',
    tagline: 'Find Computer Recycling Near You in Kochi & Ernakulam',
    description: 'Computer recycling near you in Kochi. We recycle desktops, laptops, all-in-ones, and workstations. Free pickup for businesses. NIST data destruction included. KSPCB authorized.',
    longDescription: `Looking for "computer recycling near me" in Kochi? EWaste Kochi is your local KSPCB-authorized computer recycling facility serving all of Ernakulam district. We recycle all types of computers: desktop PCs, laptops, all-in-ones, workstations, servers, and computer peripherals.

Why computer recycling matters: E-waste contains hazardous materials like lead, mercury, cadmium, and flame retardants. Under India's E-Waste Rules 2022, businesses must use authorized recyclers. EWaste Kochi ensures 100% compliant processing with zero landfill commitment.

What we recycle: Desktop computers (towers, SFF, USFF), laptops and notebooks, all-in-one PCs, computer monitors, keyboards, mice, cables, printers, scanners, and other computer accessories.

Our computer recycling process: Collection → Secure data destruction (NIST 800-88) → Dismantling → Material segregation → Precious metal recovery → Hazardous material safe disposal → Certificate of Recycling.`,
    keywords: ['computer recycling near me', 'recycle computers near me', 'computer disposal near me', 'old computer recycling', 'desktop recycling near me'],
    metaTitle: 'Computer Recycling Near Me Kochi | Desktops, Laptops | Free Pickup | EWaste Kochi',
    metaDescription: 'Computer recycling near you in Kochi. Desktops, laptops, workstations. Free business pickup. NIST data destruction included. KSPCB authorized.',
    price: 'Free for 10+ computers',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'Data Destruction Included', 'Free Business Pickup', 'All Brands'],
    relatedServices: ['e-waste-recycling-kochi', 'laptop-buyback-kochi', 'data-destruction-kochi'],
    schemaType: 'RecyclingService',
  },
  {
    slug: 'electronics-recycling-near-me',
    name: 'Electronics Recycling Near Me',
    shortName: 'Electronics Recycling Near Me',
    category: 'recycling',
    isPillar: true,
    icon: '♻️',
    tagline: 'Electronics Recycling Near You in Kochi & Kerala',
    description: 'Find electronics recycling near you in Kochi. All e-waste accepted: computers, phones, TVs, batteries, printers. Free bulk pickup. KSPCB authorized.',
    longDescription: `Searching for "electronics recycling near me" in Kochi? EWaste Kochi is your local KSPCB-authorized electronics recycler serving all of Ernakulam district and Kerala. We accept all types of electronic waste from consumer electronics to large industrial equipment.

Why certified electronics recycling: Uncertified recyclers often strip valuable components and dump hazardous materials illegally. As a KSPCB-authorized facility, we ensure 100% compliant processing with zero landfill commitment and full documentation for your records.

What we recycle: Computers, laptops, servers, mobile phones, tablets, TVs, monitors, printers, networking equipment, air conditioners, refrigerators, washing machines, batteries, UPS systems, and all categories under E-Waste Rules 2022.

Our electronics recycling process: Collection → Data destruction (if needed) → Dismantling into component streams → Material segregation → Precious metal recovery → Hazardous material safe disposal → Certificate of Recycling provided. Free pickup for 10+ items.`,
    keywords: ['electronics recycling near me', 'electronic recycling near me', 'e waste recycling near me', 'recycle electronics near me', 'where to recycle electronics'],
    metaTitle: 'Electronics Recycling Near Me Kochi | Computers, Phones, TVs | Free Pickup | EWaste Kochi',
    metaDescription: 'Electronics recycling near you in Kochi. All e-waste accepted. KSPCB authorized. Free bulk pickup. Certificate provided. Serving all Ernakulam.',
    price: 'Free for 10+ items',
    priceSchema: '0',
    priceCurrency: 'INR',
    badges: ['KSPCB Authorized', 'All Electronics', 'Free Pickup', 'Zero Landfill'],
    relatedServices: ['e-waste-recycling-kochi', 'computer-recycling-near-me', 'battery-recycling-near-me'],
    schemaType: 'RecyclingService',
  },
];

// Derived collections for convenience
export const pillarServices = services.filter(s => s.isPillar);
export const supportingServices = services.filter(s => !s.isPillar);
export const servicesByCategory = services.reduce((acc, s) => {
  if (!acc[s.category]) acc[s.category] = [];
  acc[s.category].push(s);
  return acc;
}, {});

export const getServiceBySlug = (slug) => services.find(s => s.slug === slug);

export const categories = [
  { id: 'recycling', name: 'E-Waste Recycling', icon: '♻️' },
  { id: 'itad', name: 'ITAD & Data Security', icon: '🔐' },
  { id: 'data', name: 'Data Destruction', icon: '💾' },
  { id: 'buyback', name: 'Buyback & Resale', icon: '💰' },
  { id: 'pickup', name: 'Pickup & Logistics', icon: '🚚' },
  { id: 'corporate', name: 'Corporate Programs', icon: '🏢' },
  { id: 'compliance', name: 'Compliance & Legal', icon: '⚖️' },
];
