import type { DiscoveryGuide } from "./discoveryGuideTypes";
import { SITE_URL } from "./site";

export const DEFINITION_GUIDES_2: DiscoveryGuide[] = [
  {
    slug: "what-is-ewaste-rules-2022",
    category: "definitions",
    title: "What Are the E-Waste (Management) Rules, 2022?",
    description: "A plain-language overview of India's E-Waste (Management) Rules, 2022 — who they apply to, what businesses should know and how they connect to e-waste collection.",
    answer: "The E-Waste (Management) Rules, 2022 are India's regulatory framework for managing electronic waste. They define who is responsible for e-waste, what must be collected and how it must be handled. For households and businesses in Kochi, the rules mean that old electronics should not go into general waste and should be routed through a registered recycler.",
    sections: [
      {
        heading: "Understand what the rules cover",
        paragraphs: [
          "The E-Waste (Management) Rules, 2022 cover the entire lifecycle of electronic equipment in India — from manufacture to disposal. They apply to manufacturers, importers, producers, collection agents, recyclers and consumers. For most households and businesses in Kochi, the relevant part is the consumer responsibility: electronics should not be thrown into general waste and should be routed through a registered collection or recycling channel.",
          "The rules replaced earlier e-waste regulations and expanded the scope of covered equipment. They introduced stronger producer responsibility requirements and more detailed record-keeping obligations. The rules are administered by the Central Pollution Control Board and implemented through state pollution control boards including the Kerala State Pollution Control Board.",
        ],
      },
      {
        heading: "Know who is responsible",
        paragraphs: [
          "Under the rules, the producer bears the primary responsibility for managing e-waste from their products. This includes manufacturers, importers and brand owners. For consumers, the responsibility is to dispose of electronics through proper channels rather than mixing them with general waste.",
          "Businesses that generate e-waste as part of their operations may have additional obligations depending on their scale and activities. A company disposing of its own domestically purchased equipment is not automatically an EPR producer, and the commercial size of a pickup does not alone determine statutory bulk-consumer status. Assess your business role independently or ask the collection team for guidance.",
        ],
      },
      {
        heading: "Understand the collection requirements",
        paragraphs: [
          "The rules require that e-waste is collected through registered collection channels and processed at registered recycling facilities. For households, this means using a registered e-waste collection service rather than leaving electronics on the curb or in general waste bins.",
          "For businesses, the rules require documented collection, proper data handling and downstream tracking. A collection that moves equipment without addressing data exposure or documentation creates risk beyond the environmental disposal question.",
        ],
      },
      {
        heading: "Check current obligations",
        paragraphs: [
          "Regulatory requirements change over time through amendments and updated guidance. The rules referenced here provide a general understanding of India's e-waste framework. For specific obligations, check the current CPCB and KSPCB guidance before making disposal decisions. A recycler who cannot produce current compliance information is not the best option, even if they are the cheapest.",
        ],
      },
    ],
    tools: [
      "Current CPCB and KSPCB guidance documents",
      "Registered recycler verification through official portals",
      "Item list with condition and data flags",
    ],
    timeline: "Regulatory requirements should be checked before each major disposal event. Annual amendments may change obligations.",
    faq: [
      { q: "Do the rules apply to households?", a: "Yes. Households are expected to dispose of electronics through proper channels rather than general waste." },
      { q: "Who is an EPR producer?", a: "Manufacturers, importers and brand owners are typically EPR producers. A consumer disposing of personal electronics is not automatically an EPR producer." },
      { q: "Can I throw electronics in the regular bin?", a: "No. Electronics should be routed through a registered collection or recycling channel." },
      { q: "What happens if a business does not follow the rules?", a: "Non-compliance can lead to penalties and enforcement action. Businesses should verify their obligations with current regulatory guidance." },
      { q: "How do I check if a recycler is registered?", a: "Verify through the CPCB or KSPCB portals before committing to a collection." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "I just want to throw away an old phone. Is that allowed?", a: "No. Old phones should be routed through a registered e-waste collection service." },
      { role: "Small business owner", q: "Are the rules different for small businesses?", a: "The rules apply to all generators of e-waste, but obligations vary by scale and activity. Assess your role independently." },
      { role: "Compliance officer", q: "Where can I find the latest amendments?", a: "Check the CPCB website for current amendments and guidance." },
      { role: "Consumer", q: "Can I sell my old electronics instead of recycling?", a: "Yes, resale is a valid option. Ensure data is wiped before selling." },
    ],
    related: [
      { label: "E-Waste Management Rules 2022 guide", path: "/blog/e-waste-management-rules-2022/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "CPCB e-waste portal", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-battery-waste-rules",
    category: "definitions",
    title: "What Are the Battery Waste Management Rules?",
    description: "Understand India's battery waste rules: who is responsible, how batteries are collected and why they follow separate handling from general e-waste.",
    answer: "India's Battery Waste Management Rules set separate responsibilities for battery producers, collectors and recyclers. For households and businesses in Kochi, the key point is that batteries should never be thrown into general waste and should be collected through separate battery waste channels. All batteries — from phone batteries to UPS inverter batteries — follow these separate rules.",
    sections: [
      {
        heading: "Understand why batteries have separate rules",
        paragraphs: [
          "Batteries contain hazardous materials including lead, lithium, cadmium and electrolytes. These materials can cause fires, water contamination and soil pollution if disposed of in general waste. Because of these risks, batteries in India are regulated separately from general e-waste under the Battery Waste Management Rules.",
          "The rules apply to all battery types: alkaline batteries, lithium-ion batteries in phones and laptops, lead-acid batteries in UPS and inverters, and industrial batteries. Each type has different collection and recycling requirements. A collection that mixes batteries with ordinary e-waste without separating them may be rejected at the receiving facility.",
        ],
      },
      {
        heading: "Know who is responsible",
        paragraphs: [
          "Battery producers bear the primary responsibility for collecting and recycling the batteries they place on the market. This is called Extended Producer Responsibility (EPR) for batteries. For consumers and businesses, the responsibility is to separate batteries from general e-waste and place them in separate collection streams.",
          "A business that uses batteries is not automatically a battery waste producer in the regulatory sense. The obligation depends on the scale of battery use and the business role. Assess your role independently or ask the collection team for guidance.",
        ],
      },
      {
        heading: "Understand the collection requirements",
        paragraphs: [
          "The rules require that batteries are collected through registered collection channels and processed at registered recycling facilities. For households, this means using a registered battery collection service rather than throwing batteries into general waste bins.",
          "For businesses, the rules require documented battery collection, proper handling of damaged or swollen batteries and downstream tracking. UPS batteries, inverter batteries and industrial batteries may have additional documentation requirements.",
        ],
      },
      {
        heading: "Handle damaged and swollen batteries safely",
        paragraphs: [
          "Damaged, swollen or leaking batteries need special handling. Do not charge a swollen battery or attempt to open it. Store damaged batteries in a dry, ventilated area away from flammable materials. Report the damage honestly to the collection team and follow their handling instructions.",
        ],
      },
    ],
    tools: [
      "Battery inventory by type, size and condition",
      "Current CPCB battery waste guidance",
      "Separate collection containers for different battery types",
    ],
    timeline: "Battery waste rules should be checked before each major disposal event. Damaged batteries need immediate safe storage.",
    faq: [
      { q: "Can I throw batteries in the regular bin?", a: "No. Batteries should be separated from general e-waste and collected through separate battery waste channels." },
      { q: "Who is responsible for battery waste?", a: "Battery producers bear primary responsibility under EPR. Consumers and businesses must separate batteries from general waste." },
      { q: "Are all battery types covered?", a: "Yes, including alkaline, lithium-ion, lead-acid and industrial batteries." },
      { q: "What about swollen batteries?", a: "Do not charge or open swollen batteries. Store them safely and report the damage to the collection team." },
      { q: "Can UPS batteries be recycled?", a: "Yes. List UPS batteries separately because they follow separate battery waste rules." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "I have old phone batteries. Can I put them in the e-waste bin?", a: "No. List batteries separately. They follow separate battery waste rules." },
      { role: "Office manager", q: "We have 50 UPS batteries to dispose of. What do we do?", a: "List UPS batteries separately. Confirm the handling route before scheduling." },
      { role: "Shop owner", q: "Can I throw damaged batteries in the regular bin?", a: "No. Damaged batteries need special handling. Store them safely and report the damage." },
      { role: "IT administrator", q: "Our UPS room has old batteries. How are they handled?", a: "List inverter and UPS batteries separately. Confirm the handling route before collection." },
    ],
    related: [
      { label: "Battery recycling guide", path: "/blog/battery-recycling-guide-kochi/" },
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
    ],
    sources: [
      { title: "EPR portal for Battery Waste Management", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-epr-e-waste",
    category: "definitions",
    title: "What Is EPR in E-Waste Management?",
    description: "Understand Extended Producer Responsibility (EPR) for e-waste: what it means, who it applies to and how it connects producers, recyclers and e-waste collection.",
    answer: "Extended Producer Responsibility (EPR) in e-waste means that producers, importers and brand owners are responsible for managing the e-waste created by their products. For households and businesses in Kochi, EPR means that the company that made or sold your electronics is responsible for ensuring those products are properly recycled at the end of their life.",
    sections: [
      {
        heading: "Understand what EPR means",
        paragraphs: [
          "EPR means that the entity that places a product on the market bears responsibility for managing that product at the end of its life. For e-waste, this means manufacturers, importers and brand owners must ensure their electronics are collected, recycled or disposed of responsibly.",
          "EPR creates a financial and operational incentive for producers to design products that are easier to recycle and for the entire system to work efficiently. For consumers, EPR means that responsible recycling should be available for the products they buy.",
        ],
      },
      {
        heading: "Know who EPR applies to",
        paragraphs: [
          "EPR applies to producers, importers and brand owners who place electronics on the Indian market. A company importing electronics or selling its own brand products may have EPR obligations. A consumer disposing of personal electronics is not automatically an EPR producer.",
          "A company disposing of its own domestically purchased equipment is not automatically an EPR producer, and the commercial size of a pickup does not alone determine statutory bulk-consumer status. Importing covered equipment, selling own-brand products or carrying out other regulated activities can create different obligations requiring review against current rules and guidance.",
        ],
      },
      {
        heading: "Understand how EPR connects to collection",
        paragraphs: [
          "EPR obligations are fulfilled through registered collection channels and recycling facilities. Producers must meet collection targets set by the CPCB and document their downstream recycling. For consumers and businesses, EPR means that a responsible recycler should be able to demonstrate their CPCB authorization and downstream route.",
          "Where a shared office or group company coordinates pickup for several owners, retain entity-specific approvals and references. Assess battery waste through its separate framework even if it travels within the broader clearance project.",
        ],
      },
      {
        heading: "Check current EPR requirements",
        paragraphs: [
          "EPR requirements change over time through amendments and updated targets. Check the current CPCB guidance for the latest targets and documentation requirements. A recycler who cannot produce current EPR compliance information is not the best option, even if they are the cheapest.",
        ],
      },
    ],
    tools: [
      "Current CPCB EPR targets and guidelines",
      "Registered recycler verification through official portals",
      "Item list with condition and data flags",
    ],
    timeline: "EPR requirements should be checked before each major disposal event. Annual amendments may change targets and obligations.",
    faq: [
      { q: "What does EPR mean for consumers?", a: "EPR means responsible recycling should be available for the products you buy." },
      { q: "Who has EPR obligations?", a: "Producers, importers and brand owners. Consumers are not automatically EPR producers." },
      { q: "Does EPR apply to all electronics?", a: "EPR covers the electronics categories listed in the E-Waste Rules. Check the current CPCB list for covered categories." },
      { q: "How do I check a recycler's EPR status?", a: "Verify their CPCB authorization number through the official CPCB portal." },
      { q: "Can a business be an EPR producer?", a: "If the business manufactures, imports or sells branded electronics, it may have EPR obligations. Assess your role independently." },
    ],
    readerQuestions: [
      { role: "Consumer", q: "Does EPR affect me?", a: "EPR ensures that responsible recycling is available for the products you buy." },
      { role: "Small business owner", q: "Am I an EPR producer?", a: "Probably not, unless you manufacture, import or sell branded electronics. Assess your role independently." },
      { role: "Compliance officer", q: "Where can I find the latest EPR targets?", a: "Check the CPCB website for current targets and guidance." },
      { role: "Business owner", q: "Can I use EPR to justify not recycling?", a: "No. EPR creates responsibility for producers, not permission for consumers to skip proper disposal." },
    ],
    related: [
      { label: "E-Waste Management Rules 2022 guide", path: "/blog/e-waste-management-rules-2022/" },
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "CPCB EPR portal", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-data-destruction",
    category: "definitions",
    title: "What Is Data Destruction for Electronics?",
    description: "Understand data destruction for hard drives, laptops and servers: wiping, degaussing, shredding and how to verify that data is gone.",
    answer: "Data destruction is the process of making data on electronic storage media unrecoverable. For households and businesses in Kochi, the key point is that simply deleting files or formatting a drive is not enough for sensitive data. Proper data destruction uses wiping, degaussing or physical shredding to ensure data cannot be recovered.",
    sections: [
      {
        heading: "Understand why data destruction matters",
        paragraphs: [
          "Electronic devices store data in many places: hard drives, SSDs, USB drives, memory cards and cloud-synced accounts. Simply deleting files or formatting a drive does not remove the data — specialized software can recover deleted files even after formatting.",
          "Data destruction matters because personal, financial, business and government data on old devices can be recovered by anyone who gets hold of the device. This includes identity information, financial records, business secrets and government records. Proper data destruction ensures that data is unrecoverable before a device is recycled or resold.",
        ],
      },
      {
        heading: "Know the methods of data destruction",
        paragraphs: [
          "There are three main methods of data destruction for electronics. Software wiping overwrites all data on the drive with random patterns, making recovery impossible. Degaussing uses a strong magnetic field to erase data on magnetic media like HDDs. Physical shredding destroys the drive itself, making data recovery physically impossible.",
          "Each method has different strengths. Software wiping works for HDDs and some SSDs but requires the drive to be functional. Degaussing works only for magnetic media, not SSDs. Shredding works for all media types but destroys the drive permanently. Choose the method based on your data sensitivity and whether you need to keep the drive.",
        ],
      },
      {
        heading: "Understand verification",
        paragraphs: [
          "Verification confirms that data destruction was successful. For software wiping, run a verification scan to confirm the data cannot be recovered. For degaussing, keep the degaussing certificate. For shredding, keep the shredding certificate with serial numbers. A data destruction without verification is not complete.",
          "For sensitive data, witnessed destruction provides additional assurance. On-site witnessed shredding can be arranged for bulk decommissions, and you receive serialized destruction certificates linked to each asset.",
        ],
      },
      {
        heading: "Check current standards",
        paragraphs: [
          "Data destruction standards evolve over time. NIST SP 800-88 Rev. 2 is a widely referenced standard for media sanitization. Check the current version of relevant standards before choosing a data destruction method. A provider who cannot reference current standards is not the best option.",
        ],
      },
    ],
    tools: [
      "Approved data wiping software",
      "Degaussing service or equipment",
      "Certified shredding service with certificates",
    ],
    timeline: "Allow time for backup, data destruction and verification before confirming a collection date.",
    faq: [
      { q: "Is deleting a file enough?", a: "No. Deleted files can be recovered. Use a full wipe, degaussing or shredding for sensitive data." },
      { q: "What is the difference between wiping and shredding?", a: "Wiping overwrites data electronically; shredding physically destroys the drive. Both make data unrecoverable." },
      { q: "Can SSDs be degaussed?", a: "No. SSDs require either cryptographic erasure or physical destruction of the NAND packages." },
      { q: "Do I need a certificate?", a: "Yes, if you need evidence for compliance, audit or EPR purposes." },
      { q: "Can I watch the shredding?", a: "On-site witnessed shredding can be arranged for bulk decommissions." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "I want to sell my laptop. How do I erase my data?", a: "Back up your data, sign out of accounts and perform a factory reset. For sensitive data, use a full wipe or keep the drive." },
      { role: "Business owner", q: "We have 50 hard drives to destroy. What is the process?", a: "Submit an inventory with drive types and your data sensitivity level. On-site witnessed shredding can be arranged." },
      { role: "IT administrator", q: "Can we erase drives ourselves?", a: "Follow your organization's approved process. Keep deletion confirmations with the equipment receipts." },
      { role: "Compliance officer", q: "What records do we need for audit?", a: "Keep destruction certificates, recycling certificates and material recovery reports linked to your asset register." },
    ],
    related: [
      { label: "Data destruction in Kochi", path: "/data-destruction/" },
      { label: "Hard drive shredding", path: "/blog/hard-drive-shredding-kochi/" },
      { label: "NIST 800-88 guide", path: "/blog/nist-800-88-data-wiping/" },
    ],
    sources: [
      { title: "NIST SP 800-88 Rev. 2: Guidelines for Media Sanitization", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Consult the official publication for current recommendations." },
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-itad",
    category: "definitions",
    title: "What Is ITAD (IT Asset Disposition)?",
    description: "Understand ITAD: what it means, how it works and why it matters for businesses retiring IT equipment in Kochi.",
    answer: "ITAD (IT Asset Disposition) is the process of securely and responsibly managing the retirement of IT assets. For businesses in Kochi, ITAD covers the entire lifecycle of IT equipment from decommissioning to final disposition — including data destruction, asset tracking, resale, recycling and documentation. ITAD ensures that retired IT equipment is handled safely, legally and cost-effectively.",
    sections: [
      {
        heading: "Understand what ITAD covers",
        paragraphs: [
          "ITAD covers the entire retirement process for IT equipment: decommissioning, data destruction, asset tracking, resale, refurbishment, recycling and final disposal. It applies to servers, workstations, laptops, networking equipment, storage devices and peripherals.",
          "ITAD is not just recycling. It includes the full chain from identifying which assets are being retired, securely wiping or destroying data, tracking each asset through the process, and documenting the final outcome. A business that skips parts of this chain may face data exposure, compliance gaps or financial losses.",
        ],
      },
      {
        heading: "Know the key ITAD services",
        paragraphs: [
          "The key ITAD services include asset inventory and tagging, data destruction with verification, secure transport, device triage (resale, refurbishment, recycling or shredding), material recovery reporting and compliance documentation. Each service plays a specific role in the chain.",
          "Asset inventory is the foundation: every device must be logged before it leaves the rack. Data destruction is the most critical: storage media must be wiped, degaussed or shredded with verifiable evidence. Material recovery reporting closes the loop: you receive documentation showing what happened to each device.",
        ],
      },
      {
        heading: "Understand the ITAD workflow",
        paragraphs: [
          "A properly managed ITAD decommissioning runs in stages. Stage one is asset inventory and tagging: every device is logged by serial number before it leaves the rack. Stage two is secure transport: hardware moves in sealed, tracked vehicles with chain-of-custody documentation. Stage three is data destruction: storage media are shredded under witness or processed in a monitored destruction room.",
          "Stage four is material separation and recovery: shredded fractions go through magnetic separation, eddy-current sorting and manual disassembly. Stage five is compliance reporting: you receive a destruction certificate, a recycling certificate and a material recovery report.",
        ],
      },
      {
        heading: "Check ITAD provider qualifications",
        paragraphs: [
          "When evaluating an ITAD provider, look for CPCB authorization, KSPCB compliance, documented data destruction standards, a full audit trail, a zero-landfill commitment and downstream vendor transparency. A provider who cannot produce all six is not the best option; they may be the cheapest, which is a different category with different risks.",
        ],
      },
    ],
    tools: [
      "Server inventory with serial numbers and asset tags",
      "Data destruction policy approved by the information security team",
      "Written collection scope with chain-of-custody and reporting commitment",
    ],
    timeline: "Allow time for inventory, data preparation and a feasibility review before confirming a collection date.",
    faq: [
      { q: "Is ITAD just recycling?", a: "No. ITAD covers the full retirement process including inventory, data destruction, tracking, resale and documentation." },
      { q: "Do I need ITAD for a small office?", a: "Yes, if you are retiring IT equipment. Even a small office needs data destruction and proper disposal." },
      { q: "What is the cost of ITAD?", a: "Cost depends on the volume, condition and services required. Some hardware has resale value that offsets costs." },
      { q: "Can I watch the data destruction?", a: "On-site witnessed shredding can be arranged for bulk decommissions." },
      { q: "What documentation do I receive?", a: "Destruction certificates, recycling certificates and material recovery reports." },
    ],
    readerQuestions: [
      { role: "Business owner", q: "We are decommissioning 20 servers. What is the process?", a: "Phase the decommissioning by rack priority. Submit the full inventory for a feasibility review." },
      { role: "IT security lead", q: "Can we witness the shredding?", a: "Yes, on-site witnessed shredding can be arranged. You receive serialized destruction certificates." },
      { role: "Compliance officer", q: "What records do we need for EPR audit?", a: "Keep the CPCB authorization of the recycler, destruction certificates and material recovery reports." },
      { role: "Finance manager", q: "Can we offset costs against resale proceeds?", a: "Yes, for hardware with resale value. Resale is assessed separately from material recovery." },
    ],
    related: [
      { label: "ITAD service", path: "/itad/" },
      { label: "Data destruction guide", path: "/data-destruction/" },
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
    ],
    sources: [
      { title: "NIST SP 800-88 Rev. 2: Guidelines for Media Sanitization", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Consult the official publication for current recommendations." },
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-circular-economy",
    category: "definitions",
    title: "What Is a Circular Economy for Electronics?",
    description: "Understand the circular economy concept as it applies to electronics: reuse, repair, refurbishment and recycling in Kochi.",
    answer: "A circular economy for electronics means keeping devices and their materials in use for as long as possible instead of discarding them after a single use. For households and businesses in Kochi, this means considering repair, resale, refurbishment and responsible recycling before sending electronics to landfill.",
    sections: [
      {
        heading: "Understand the circular economy concept",
        paragraphs: [
          "A circular economy is an economic model that keeps products, components and materials in use for as long as possible. Instead of the traditional linear model of take, make and dispose, a circular economy emphasizes reuse, repair, refurbishment, remanufacturing and recycling.",
          "For electronics, a circular economy means a working laptop should be resold or refurbished before it is recycled. A monitor with a cracked screen should have its screen replaced if economically viable, or its reusable components recovered before shredding. The goal is to extract maximum value from each device before it becomes waste.",
        ],
      },
      {
        heading: "Know the hierarchy of electronics value",
        paragraphs: [
          "The hierarchy for electronics value is: continue using, repair, resell, refurbish, recycle and finally dispose. Each step extracts value before moving to the next. A device that can be repaired should not be recycled. A working device that can be resold should not be refurbished at cost.",
          "For businesses, this hierarchy has financial implications. A server that can be refurbished and resold generates value that shredding destroys. A data center that follows the hierarchy can offset disposal costs with resale proceeds.",
        ],
      },
      {
        heading: "Understand the environmental benefits",
        paragraphs: [
          "A circular economy for electronics reduces the volume of e-waste, conserves natural resources and reduces the environmental impact of manufacturing new devices. Recovering copper, gold, palladium and aluminium from old electronics uses less energy and causes less environmental damage than mining new materials.",
          "For Kochi, where e-waste collection distances can be significant, a circular approach also reduces the number of devices that need to be transported, lowering the overall environmental impact of the disposal process.",
        ],
      },
      {
        heading: "Apply the circular economy in practice",
        paragraphs: [
          "For households, the circular economy means: back up your data, sell or donate working devices, repair what you can, and recycle what you cannot. For businesses, it means: track asset lifecycle, plan for resale or refurbishment, and choose a recycler who can demonstrate material recovery and downstream transparency.",
          "Any Kochi recycler quoting a single flat per-kilogram rate for data center hardware is not pricing the job properly. Ask for a composition-based quote that separates collection, data handling, dismantling and material recovery.",
        ],
      },
    ],
    tools: [
      "Asset lifecycle tracking",
      "Resale and refurbishment evaluation",
      "Material recovery reporting",
    ],
    timeline: "Circular economy practices should be considered at each stage of the asset lifecycle, not just at disposal time.",
    faq: [
      { q: "Is recycling the best option for old electronics?", a: "No. Repair, resale and refurbishment extract more value before recycling is the last resort." },
      { q: "Can I sell my old laptop instead of recycling?", a: "Yes, if it still works. A resale evaluation may show value that recycling would lose." },
      { q: "What is material recovery?", a: "Recovering valuable metals and components from old electronics for reuse in new products." },
      { q: "Does a circular economy cost more?", a: "It can save money through resale proceeds and reduced disposal costs. The cheapest disposal option is not always the best value." },
      { q: "How does this apply to businesses?", a: "Businesses can track asset lifecycle, plan for resale and choose recyclers who demonstrate material recovery." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "My old TV still works. Should I recycle it?", a: "Consider resale or donation first. Recycling is the last resort for a working device." },
      { role: "Business owner", q: "Can we get money back for old servers?", a: "Possibly. Hardware under five years old often has resale value. Assess resale separately from material recovery." },
      { role: "IT administrator", q: "How do we track the lifecycle of our assets?", a: "Maintain an asset register with serial numbers, purchase dates and condition assessments." },
      { role: "Environmentally conscious user", q: "How do I find a circular economy recycler?", a: "Ask the recycler about their resale, refurbishment and material recovery processes." },
    ],
    related: [
      { label: "E-Waste recycling vs reuse", path: "/blog/ewaste-recycling-vs-reuse/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
      { title: "EPA Electronics Basic Information", href: "https://www.epa.gov/electronics-batteries-management/electronics-basic-information-research-and-initiatives", publisher: "United States Environmental Protection Agency", note: "Environmental background; US regulatory provisions are not Indian requirements." },
    ],
  },
  {
    slug: "what-is-ewaste-audit",
    category: "definitions",
    title: "What Is an E-Waste Audit?",
    description: "Understand e-waste audits: what they cover, how they work and what documentation businesses need for compliance in Kochi.",
    answer: "An e-waste audit is a review of how a business or institution manages its electronic waste. For businesses in Kochi, an e-waste audit covers the full chain from inventory and data handling to collection, recycling and documentation. Audits may be required for regulatory compliance, EPR reporting or internal review.",
    sections: [
      {
        heading: "Understand what an e-waste audit covers",
        paragraphs: [
          "An e-waste audit reviews how a business manages its electronic waste from generation to final disposal. It covers inventory accuracy, data handling procedures, collection channel registration, downstream tracking and documentation completeness. The scope depends on the audit purpose: regulatory compliance, EPR reporting or internal review.",
          "For regulatory audits, the focus is on compliance with the E-Waste (Management) Rules, 2022. For EPR audits, the focus is on meeting collection and recycling targets. For internal reviews, the focus is on operational efficiency and risk management.",
        ],
      },
      {
        heading: "Know what documentation is needed",
        paragraphs: [
          "E-waste audit documentation typically includes asset registers, collection records, data destruction certificates, recycling certificates, material recovery reports and downstream tracking records. The specific documents required depend on the audit purpose and the regulatory authority conducting it.",
          "For EPR audits, producers must demonstrate that their e-waste was collected and processed through registered channels. For business audits, the documentation must show that data-bearing equipment was handled according to the organization's data protection policy.",
        ],
      },
      {
        heading: "Understand the audit process",
        paragraphs: [
          "An e-waste audit typically follows a process: review of inventory and records, verification of collection channels, inspection of data handling procedures, assessment of downstream tracking and evaluation of documentation completeness. The auditor may request to trace specific assets from acquisition through final disposition.",
          "For a business preparing for an audit, the key preparation steps are: ensure the asset register is complete and accurate, verify that collection channels are registered, confirm that data destruction certificates are on file and check that downstream tracking records are complete.",
        ],
      },
      {
        heading: "Prepare for an e-waste audit",
        paragraphs: [
          "To prepare for an e-waste audit, organize your documentation by asset, trace each asset from acquisition through final disposition, and verify that all required certificates and records are on file. Assign an owner to each audit preparation task and set a completion date before the audit date.",
          "For audit review, trace a selected asset or category from its approval through final outcome and confirm that every item reported complete has a corresponding authorised release and an accepted evidence basis.",
        ],
      },
    ],
    tools: [
      "Asset register with serial numbers and disposal records",
      "Collection channel registration verification",
      "Data destruction and recycling certificates",
    ],
    timeline: "Allow time for documentation preparation before an audit date. Audit preparation should start well in advance.",
    faq: [
      { q: "Who needs an e-waste audit?", a: "Businesses that generate significant e-waste, producers with EPR obligations, or institutions requiring compliance review." },
      { q: "What documents are typically required?", a: "Asset registers, collection records, data destruction certificates, recycling certificates and material recovery reports." },
      { q: "How often should an e-waste audit be conducted?", a: "At least annually, or more frequently for producers with EPR obligations or after major disposal events." },
      { q: "Can I prepare for an audit myself?", a: "Yes, but a professional audit service can provide independent verification and identify gaps." },
      { q: "What happens if an audit finds non-compliance?", a: "Non-compliance may lead to corrective action plans, penalties or enforcement action depending on the severity." },
    ],
    readerQuestions: [
      { role: "Business owner", q: "We have never had an e-waste audit. Where do we start?", a: "Start with a complete asset register and verify your collection channels are registered." },
      { role: "Compliance officer", q: "What should we have ready for an EPR audit?", a: "CPCB authorization of the recycler, collection records, destruction certificates and material recovery reports." },
      { role: "IT administrator", q: "How do we trace assets for an audit?", a: "Maintain an asset register and trace each asset from acquisition through final disposition." },
      { role: "Auditor", q: "Can we trace specific assets?", a: "Yes, provide the asset identifiers and the auditor will trace them through the disposal chain." },
    ],
    related: [
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
      { label: "E-Waste Management Rules 2022 guide", path: "/blog/e-waste-management-rules-2022/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022 FAQ", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Check current amendments." },
      { title: "CPCB EPR portal", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "what-is-ewaste-export-compliance",
    category: "definitions",
    title: "What Is E-Waste Export Compliance?",
    description: "Understand the rules for exporting e-waste from India: documentation, authorization and responsible handling for cross-border electronics disposal.",
    answer: "E-waste export compliance covers the regulatory requirements for shipping electronic waste from India to another country for recycling or disposal. For businesses in Kochi, the key point is that e-waste exports require specific authorizations, documentation and responsible handling to ensure the waste is managed safely in the receiving country.",
    sections: [
      {
        heading: "Understand the Basel Convention and e-waste exports",
        paragraphs: [
          "The Basel Convention controls the transboundary movement of hazardous wastes, including e-waste. India is a party to the Basel Convention, which means that the export of e-waste from India requires prior informed consent from the receiving country. The convention aims to prevent hazardous waste from being shipped from developed to developing countries without proper controls.",
          "E-waste is classified as hazardous waste under the Basel Convention when it contains hazardous materials like lead, mercury, cadmium or lithium. Most electronic equipment contains at least some hazardous materials, so most e-waste exports fall under the convention's controls.",
        ],
      },
      {
        heading: "Know the authorization requirements",
        paragraphs: [
          "Exporting e-waste from India requires authorization from the Central Pollution Control Board and the receiving country's competent authority. The exporter must provide detailed documentation including the type and quantity of waste, the receiving facility's registration and the planned recycling or disposal method.",
          "For businesses, e-waste export authorization is not automatic. The application must demonstrate that the receiving facility is registered and capable of managing the waste safely. A recycler who cannot produce export authorization documentation is not suitable for e-waste export.",
        ],
      },
      {
        heading: "Understand the documentation requirements",
        paragraphs: [
          "E-waste export documentation typically includes the export application, prior informed consent from the receiving country, a description of the waste, the receiving facility's registration and environmental management plan, and a chain-of-custody record. The specific documents required depend on the receiving country's regulations.",
          "For businesses, the documentation must show that the e-waste will be managed in accordance with the Basel Convention and the receiving country's environmental regulations. Keep all export documentation on file for audit and compliance review.",
        ],
      },
      {
        heading: "Handle e-waste exports responsibly",
        paragraphs: [
          "Responsible e-waste export means ensuring that the waste is managed safely and legally in the receiving country. This includes verifying the receiving facility's capabilities, monitoring the shipment and confirming the final disposal outcome. E-waste should not be exported to facilities that cannot manage it safely.",
          "For businesses in Kochi, the safest approach is to work with a recycler who has documented export authorization and can demonstrate responsible downstream management. Ask for the export authorization documents and verify them independently before committing to an export collection.",
        ],
      },
    ],
    tools: [
      "Export authorization documents from CPCB",
      "Receiving facility registration and capabilities verification",
      "Chain-of-custody documentation",
    ],
    timeline: "Export authorization should be obtained before scheduling any e-waste export collection. Processing times vary.",
    faq: [
      { q: "Can e-waste be exported from India?", a: "Yes, but only with proper authorization from CPCB and the receiving country's competent authority." },
      { q: "What is the Basel Convention?", a: "An international treaty that controls the transboundary movement of hazardous wastes, including e-waste." },
      { q: "Who can export e-waste?", a: "Only entities with proper CPCB authorization and prior informed consent from the receiving country." },
      { q: "What documentation is needed?", a: "Export application, prior informed consent, waste description, receiving facility registration and chain-of-custody records." },
      { q: "Can a recycler handle export documentation?", a: "Yes, but verify their authorization independently before committing. Ask for their export authorization documents." },
    ],
    readerQuestions: [
      { role: "Business owner", q: "We want to export old electronics for recycling. What do we need?", a: "Obtain CPCB authorization and prior informed consent from the receiving country. Work with a registered recycler." },
      { role: "Compliance officer", q: "How do we verify the receiving facility?", a: "Verify their registration and capabilities independently. Request their export authorization documents." },
      { role: "Export manager", q: "How long does export authorization take?", a: "Processing times vary. Start the application well in advance of the planned collection date." },
      { role: "IT administrator", q: "Can we export old servers?", a: "Servers may contain sensitive data. Confirm data destruction before export and ensure the receiving facility is properly authorized." },
    ],
    related: [
      { label: "E-Waste Management Rules 2022 guide", path: "/blog/e-waste-management-rules-2022/" },
      { label: "E-Waste definitions", path: "/e-waste-guides-definitions/" },
      { label: "ITAD service", path: "/itad/" },
    ],
    sources: [
      { title: "Basel Convention on the Control of Transboundary Movements of Hazardous Wastes", href: "https://www.basel.int/TheConvention/Overview/tabid/1272/Default.aspx", publisher: "Basel Convention Secretariat", note: "Check current amendments and requirements." },
      { title: "CPCB e-waste portal", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
];
