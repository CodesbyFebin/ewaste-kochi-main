import type { DiscoveryGuide } from "./discoveryGuideTypes";

export const BUSINESS_GUIDES: DiscoveryGuide[] = [
  {
    slug: "epr-registration-for-businesses",
    category: "business",
    title: "EPR Registration for Businesses in India",
    description: "Understand when producer registration applies, how ordinary equipment users differ, and why batteries require a separate compliance assessment.",
    answer: "EPR registration depends on what a business does, not simply whether it discards electronics. Under India's E-Waste (Management) Rules, 2022, producer obligations differ from those of manufacturers, recyclers, refurbishers and bulk consumers. Assess each activity before choosing a registration route.",
    sections: [
      {
        heading: "Map the business role before applying",
        paragraphs: [
          "List products sold under your brand, imports, manufacturing activities and refurbishment operations. Compare covered equipment and the producer definition with CPCB guidance, including applicable exclusions and amendments. An office buying equipment domestically for staff use is not automatically a producer. Importing equipment or selling own-brand products can change that assessment, even where the company primarily provides services.",
          "CPCB's FAQ says bulk consumers do not require registration merely in that capacity, but must hand covered e-waste to registered producers, refurbishers or recyclers. Being a large office does not by itself settle the statutory bulk-consumer definition. Document the reasoning and obtain specialist advice for mixed activities.",
        ],
      },
      {
        heading: "Keep registration and disposal evidence distinct",
        paragraphs: [
          "Where registration applies, reconcile entity details, product categories and supporting business records against the current portal checklist. Assign responsibility for ongoing reporting and target reconciliation; registration is not a one-time substitute for compliance. Waste batteries fall under the separate Battery Waste Management Rules, including relevant battery-containing equipment imports.",
          "A collection receipt documents a handover, not fulfilment of producer EPR targets. Confirm the receiving entity and relevant registration scope. Budget separately for any applicable portal fees, advisory work, collection and processing, using current written quotations rather than assumed package prices.",
        ],
      },
    ],
    faq: [
      { q: "Does replacing office laptops require producer registration?", a: "Not merely because laptops are discarded. Check whether the business also imports, manufactures or markets covered equipment under a role that creates separate obligations." },
      { q: "Can one registration cover electronics and batteries?", a: "Do not assume so. CPCB operates separate e-waste and battery frameworks; assess the entity's activities and obligations under each relevant set of rules." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Indian e-waste rules", path: "/e-waste-rules-2022-india/" },
      { label: "ITAD services for companies", path: "/services/itad-for-it-companies/" },
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Role definitions, registration and bulk-consumer responsibilities; check subsequent amendments." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board", note: "Separate battery registration and EPR framework." },
    ],
  },
  {
    slug: "corporate-e-waste-management",
    category: "business",
    title: "Corporate E-Waste Management: A Practical Control Plan",
    description: "Build an office disposal programme around ownership checks, secure storage, registered destinations, data controls and reconciled handover records.",
    answer: "Corporate e-waste management is a controlled process for retiring company electronics, from identifying surplus assets to confirming their destination. Facilities, IT, finance and procurement should agree responsibilities before collection so that reusable equipment, confidential media and batteries do not disappear into one scrap lot.",
    sections: [
      {
        heading: "Create a release process across departments",
        paragraphs: [
          "Maintain an asset register covering laptops, monitors, printers, network appliances and meeting-room equipment. Record ownership, location, condition and whether storage media may be present. Resolve leases, staff allocations and warranty returns before approving disposal. A working device may suit internal redeployment or legitimate refurbishment, but it still needs an approved data-handling decision before transfer.",
          "Use a controlled holding area with access restricted to responsible staff. Keep damaged equipment identifiable and arrange a separate battery handling assessment. Do not ask office staff to open swollen devices or disconnect fixed electrical systems. Assign one coordinator to reconcile the physical consignment against the approved list.",
        ],
      },
      {
        heading: "Verify the destination and close the records",
        paragraphs: [
          "Check the receiving legal entity, relevant registration and the destination for each waste stream. Where a collector acts for another organisation, establish that relationship and the onward route. Bulk-consumer responsibilities and producer EPR obligations are different; office disposal alone does not establish producer status. Battery waste follows its own rules.",
          "Agree asset-level data evidence where needed, handover quantities, exceptions and who supplies final processing records. Review discrepancies before closing the asset register. Compare quotations for transport, packing, sanitization and processing separately from possible reuse value; a positive value for some laptops does not make the whole programme free.",
        ],
      },
    ],
    faq: [
      { q: "Who should approve disposal?", a: "Use your organisation's authority policy: finance confirms ownership and write-off, IT approves data treatment, and facilities coordinates safe movement. One named coordinator should retain the final reconciled record." },
      { q: "Is a pickup receipt sufficient?", a: "It proves collection only to the extent recorded. Agree any downstream recycling evidence and media-specific sanitization records separately, according to legal applicability, contracts and internal policy." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "IT asset inventory service", path: "/services/it-asset-inventory-audit/" },
      { label: "Data security encyclopedia", path: "/wiki/technical/data-security-recycling/" },
      { label: "Business EPR roles", path: "/epr-registration-for-businesses/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Technical programme guidance, not an Indian statutory registration or service endorsement." },
    ],
  },
  {
    slug: "warehouse-e-waste-disposal",
    category: "business",
    title: "Warehouse E-Waste Disposal and Stock Reconciliation",
    description: "Plan disposal of obsolete warehouse electronics, customer returns and damaged stock without mixing ownership, battery hazards or inventory records.",
    answer: "Warehouse e-waste disposal starts with deciding which goods are genuinely approved for retirement. Customer returns, quarantined stock, leased scanners and company equipment may have different owners and release conditions. Separate those decisions from the physical collection plan before offering a mixed pallet for recycling.",
    sections: [
      {
        heading: "Reconcile stock before moving pallets",
        paragraphs: [
          "Create separate lists for unsold inventory, repair rejects and operational assets such as barcode readers, label printers and CCTV recorders. Match quantities to stock codes, return authorisations and asset identifiers where available. Resolve insurance claims and supplier return rights before declaring goods waste. Record uncertainty explicitly rather than treating unidentified cartons as ordinary scrap.",
          "Inspect external packaging without opening devices. Flag crushed cartons, water exposure and signs of battery damage for specialist assessment. Keep the holding area protected from rain, vehicle impacts and unauthorised access, without blocking aisles or fire exits. Never compact electronic returns or stack loads beyond safe packaging limits.",
        ],
      },
      {
        heading: "Plan loading and the downstream route",
        paragraphs: [
          "Share pallet dimensions, estimated weights, loading-bay restrictions and photographs that exclude customer information. Agree responsibility for lifting equipment, packing and rejected items. Battery-containing stock needs a declared handling plan; damaged batteries must not enter an ordinary mixed-electronics shipment without the receiving party's assessment.",
          "Confirm the registered receiving entity and obtain a consignment record reconciled by stock category. Own-brand sales or imports may create producer obligations independently of warehouse clearance, while batteries require separate rules assessment. Prices depend on sorting effort, access, contamination, transport and recoverable value. Request itemised terms before stock leaves the site.",
        ],
      },
    ],
    faq: [
      { q: "Can sealed returned devices be sold as working stock?", a: "Only after ownership, condition and any recall restrictions are resolved through the appropriate business process. Sealed packaging is not proof that equipment is safe, functional or eligible for resale." },
      { q: "What if pickup quantities differ from the inventory?", a: "Pause reconciliation, record the variance and obtain an authorised correction. Keep rejected or uncollected items on the register rather than closing the entire stock line automatically." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Pickup service", path: "/pickup/" },
      { label: "Bulk recycling planning", path: "/bulk-e-waste-recycling/" },
      { label: "Lithium battery disposal", path: "/lithium-ion-battery-disposal/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Lithium-Ion Battery Recycling Frequently Asked Questions", href: "https://www.epa.gov/hw/lithium-ion-battery-recycling-frequently-asked-questions", publisher: "United States Environmental Protection Agency", note: "Battery hazard background only; US regulatory provisions do not determine Indian obligations." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "bulk-e-waste-recycling",
    category: "business",
    title: "Bulk E-Waste Recycling: Prepare a Traceable Consignment",
    description: "Organise large electronics clearances by equipment category, ownership, battery risk and data requirements before comparing collection quotations.",
    answer: "Bulk e-waste recycling works best when a large consignment is divided into clearly described streams rather than quoted as an unidentified pile. Counts, approximate weights, condition and collection access help a receiving facility assess acceptance, logistics and likely charges without assuming that every item has resale value.",
    sections: [
      {
        heading: "Build a usable consignment inventory",
        paragraphs: [
          "Group computers, displays, small peripherals, appliances and power equipment separately. Identify which categories contain data storage and which include batteries, without dismantling equipment. Note heavy items, broken glass and water damage. For shared premises, obtain each owner's approval and use separate references so that one tenant's assets are not accidentally included in another's clearance.",
          "Choose a sheltered staging space with controlled access. Keep approved reuse candidates apart from items designated for recycling. Request packing instructions for fragile or hazardous units before moving them. Count equipment at staging and again at handover; record weights as measured or estimated so the distinction remains visible.",
        ],
      },
      {
        heading: "Compare like-for-like offers",
        paragraphs: [
          "Ask bidders to identify the registered receiving entity, accepted categories, subcontracted transport and any exclusions. Compare loading labour, vehicle access, packaging, data services and downstream treatment on the same basis. Recovery value may offset some costs, but difficult materials or remote collection can create a net charge. Confirm how inspection changes the estimate.",
          "Agree what records will follow collection and how missing or rejected equipment is handled. A commercially large load is not automatically the legal definition of a bulk consumer. Assess the organisation's role under the e-waste rules; producer EPR and battery-waste obligations need separate consideration where applicable.",
        ],
      },
    ],
    faq: [
      { q: "Is there a universal minimum quantity for pickup?", a: "No universal commercial threshold is established here. Acceptance depends on provider capacity, location, equipment mix and handling needs; obtain confirmation for the actual consignment before arranging staff or transport." },
      { q: "Can one receipt cover several departments?", a: "A consolidated receipt can be useful if department references and quantities remain traceable. Keep asset-specific media records and any separate battery documentation linked to the same collection reference." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Collection service", path: "/pickup/" },
      { label: "Warehouse disposal", path: "/warehouse-e-waste-disposal/" },
      { label: "B2B pickup planning", path: "/b2b-e-waste-pickup/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "hard-drive-shredding-service",
    category: "business",
    title: "Hard Drive Shredding Service: Scope and Evidence",
    description: "Specify physical media destruction through ownership approval, media identification, custody controls and evidence matched to the agreed service.",
    answer: "A hard drive shredding service physically destroys storage media using specialist equipment. It should be selected through an approved information-security policy, not simply because a device is old. Define the media types, authorisation, custody arrangements and required evidence before transferring any drive to a service provider.",
    sections: [
      {
        heading: "Decide what must be destroyed",
        paragraphs: [
          "Have the data owner confirm retention requirements, legal holds and approved backups before authorising irreversible destruction. Inventory individual media and distinguish magnetic hard drives from solid-state storage and other formats. Equipment suitable for one medium is not automatically suitable for another. Ask a qualified provider to explain how its proposed process meets the organisation's documented risk and acceptance criteria.",
          "NIST SP 800-88 Rev. 2 supports a sanitization programme based on information sensitivity and intended disposition. It is guidance, not evidence that a particular supplier is certified or that shredding is always required. Consider approved reuse-compatible sanitization where policy permits, while keeping failed or unverified media under control.",
        ],
      },
      {
        heading: "Specify custody, exceptions and costs",
        paragraphs: [
          "Agree who releases the media, identifies each item, transports it and reconciles the result. Establish how substitutions, unreadable identifiers or missing units will be handled. Any witnessing arrangement should be agreed in advance, including site access and the records delivered. Keep destruction evidence separate from the receipt for the remaining electronic chassis.",
          "Request a quote based on media count, type, location, handling and evidence requirements. On-site processing, if available and suitable, may involve different logistics from controlled off-site work. Confirm the destination for residual electronic material through the appropriate registered route; physical destruction alone does not complete environmental management.",
        ],
      },
    ],
    faq: [
      { q: "Does a photograph prove every drive was destroyed?", a: "Not by itself. Evidence should be tied to the approved inventory and agreed acceptance criteria, with discrepancies resolved by the responsible security owner before the job is closed." },
      { q: "Must all retired drives be shredded?", a: "No. The decision depends on media capability, sensitivity, condition and policy. Qualified personnel should select and validate an appropriate approach; ordinary file deletion is not sufficient evidence of sanitization." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Hard drive destruction encyclopedia", path: "/wiki/technical/hard-drive-destruction/" },
      { label: "ITAD service", path: "/services/itad-for-it-companies/" },
      { label: "Data destruction planning", path: "/data-destruction-services/" },
    ],
    sources: [
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology" },
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "server-decommissioning",
    category: "business",
    title: "Server Decommissioning: Retirement Without Uncontrolled Handover",
    description: "Coordinate service ownership, approved data disposition, facilities safety and asset reconciliation when retiring servers and associated infrastructure.",
    answer: "Server decommissioning is a managed retirement project, not just removing hardware from a rack. Application owners, IT security and facilities must approve the release of equipment and data before a logistics team moves anything. Separate service migration, media treatment and physical recycling into accountable workstreams.",
    sections: [
      {
        heading: "Confirm the system is ready for retirement",
        paragraphs: [
          "Identify the business owner, linked storage, backup dependencies, leases and support contracts. Obtain formal approval that required information is retained and replacement services have been accepted. Keep systems subject to legal holds outside the disposal scope. Include storage arrays, management appliances and network devices in the review rather than assuming only servers contain sensitive information.",
          "Record chassis and media identifiers where available, rack locations and the intended destination of each asset. Security personnel should approve a media-specific sanitization plan with verification and exception handling. This planning does not require publishing operational credentials, network diagrams or confidential configuration details to collection contractors.",
        ],
      },
      {
        heading: "Coordinate safe removal and reconciliation",
        paragraphs: [
          "Use qualified facilities personnel for electrical isolation and infrastructure work. Establish lifting arrangements, rack stability, floor loading and access permissions before movement. UPS batteries need a separate assessment under battery-waste rules; do not have general office staff disconnect battery strings or fixed wiring. Agree responsibilities between the technical team and the transport provider.",
          "Release only approved assets against a documented inventory, then reconcile sanitization evidence, collection records and onward processing information. Confirm the registered electronics destination. Costs vary with rack density, handling equipment, security supervision, media requirements and recoverable asset condition; migration and electrical work may be outside a recycler's collection quotation.",
        ],
      },
    ],
    faq: [
      { q: "Can functioning servers be refurbished?", a: "Potentially, after ownership restrictions and data requirements are satisfied. Condition, supportability and an accepting refurbishment route determine suitability; working status alone does not authorise a sale or donation." },
      { q: "Should UPS equipment be included in the server list?", a: "List it for project coordination, but distinguish electronics from battery systems. Ask qualified personnel and the receiving facilities to define the separate handling, transport and documentation requirements." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Data-centre decommissioning encyclopedia", path: "/wiki/technical/data-center-decommissioning/" },
      { label: "ITAD service", path: "/services/itad-for-it-companies/" },
      { label: "Server-room UPS disposal", path: "/server-room-ups-disposal/" },
    ],
    sources: [
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology" },
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "it-asset-disposition-india",
    category: "business",
    title: "IT Asset Disposition in India: Reuse, Data and Recycling",
    description: "Evaluate ITAD programmes through asset ownership, reuse suitability, media sanitization, registered recycling destinations and transparent financial reconciliation.",
    answer: "IT asset disposition, or ITAD, is the coordinated retirement of technology through redeployment, resale, refurbishment or recycling. In India, an ITAD contract should address both information security and the applicable environmental route. The label ITAD does not itself demonstrate registration, secure handling or a guaranteed return.",
    sections: [
      {
        heading: "Assign a disposition route to each asset",
        paragraphs: [
          "Start with ownership and business approval, including lease returns and restrictions on licensed software. Record make, model, condition and storage-media presence. Separate reusable assets from nonfunctional units, and ask for a documented assessment rather than a single scrap rate across the whole estate. Retain control of confidential media until an approved sanitization outcome is accepted.",
          "Set commercial rules for valuation changes, failed testing and unsold equipment. A device initially proposed for reuse may need recycling after inspection. The contract should specify who approves that change and how the asset register, financial settlement and evidence are updated without losing the original identifier.",
        ],
      },
      {
        heading: "Check environmental and security responsibilities",
        paragraphs: [
          "Identify the receiving legal entities, their relevant registrations and any subcontractors. A business disposing of its own equipment is not automatically an EPR producer; importing or own-brand activities require a separate role assessment. Battery waste must follow its own framework even when collected during the same IT refresh.",
          "Use NIST's sanitization programme guidance to discuss policy, verification and evidence with qualified security personnel. Keep those requirements distinct from environmental processing records. Quotes should show collection, testing, sanitization and recycling charges alongside any proposed resale proceeds, including how deductions and rejected items are handled. Do not assume national coverage from a local service enquiry.",
        ],
      },
    ],
    faq: [
      { q: "Does ITAD always mean recycling?", a: "No. Reuse and refurbishment can be legitimate outcomes when ownership, functionality and data controls allow them. End-of-life material still needs a suitable registered recycling route rather than an unverified resale chain." },
      { q: "What should a final asset report contain?", a: "Agree identifiers, final disposition, valuation adjustments, media-treatment references and exceptions. These are practical contract requirements; applicable statutory records depend on the organisation's role and waste streams." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "ITAD service for companies", path: "/services/itad-for-it-companies/" },
      { label: "Data security encyclopedia", path: "/wiki/technical/data-security-recycling/" },
      { label: "Business EPR registration guide", path: "/epr-registration-for-businesses/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology" },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "data-destruction-services",
    category: "business",
    title: "Data Destruction Services: Define a Verifiable Outcome",
    description: "Plan corporate media sanitization around retention approval, information sensitivity, device types, custody and evidence instead of unsupported destruction claims.",
    answer: "Data destruction services should deliver an approved, verifiable disposition of information-bearing media. Select the outcome through organisational policy and qualified security review, taking account of sensitivity, media type and intended reuse. Neither a generic certificate nor ordinary file deletion establishes that every device has been properly sanitized.",
    sections: [
      {
        heading: "Set the scope before requesting a quote",
        paragraphs: [
          "Identify laptops, external storage, servers, printer storage and recording systems that may hold business information. Obtain data-owner approval covering retention schedules, litigation holds and necessary backups. Separate local media from cloud accounts and hosted services, which require their own contractual and administrative closure processes. Avoid sharing actual customer files or credentials as part of a service enquiry.",
          "NIST SP 800-88 Rev. 2 describes a risk-based media sanitization programme. Ask qualified personnel to define acceptable outcomes, verification and validation responsibilities, and what happens when treatment cannot be confirmed. A reuse-compatible method may suit some equipment; other media may require approved physical destruction. No single technique should be assumed suitable for every technology.",
        ],
      },
      {
        heading: "Control custody and acceptance",
        paragraphs: [
          "Document who authorises release, who receives each item and how identifiers follow it through processing. Agree evidence fields and escalation for missing, damaged or unidentifiable media. Keep unresolved items under restricted control until the security owner accepts the outcome. A collection acknowledgement should not be mistaken for proof of completed sanitization.",
          "Discuss costs for assessment, media treatment, supervision, logistics and reporting separately from electronics recovery value. Confirm whether the provider can meet the requested scope before scheduling. Residual devices and destroyed media also require an appropriate environmental route; information security does not replace the registered receiving arrangements applicable to e-waste.",
        ],
      },
    ],
    faq: [
      { q: "Is a factory reset enough for a corporate device?", a: "Do not assume that it satisfies policy. The security team should evaluate the device's capabilities, information sensitivity and validation evidence before approving any reset-based disposition." },
      { q: "Can sanitization preserve equipment for reuse?", a: "Sometimes. Suitability depends on the medium, working condition and approved method. The reuse decision follows a verified outcome, not a promise that all data can always be removed." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Data security encyclopedia", path: "/wiki/technical/data-security-recycling/" },
      { label: "ITAD service", path: "/services/itad-for-it-companies/" },
      { label: "Hard drive shredding planning", path: "/hard-drive-shredding-service/" },
    ],
    sources: [
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Technical guidance for programme design; no supplier certification is implied." },
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "industrial-e-waste-disposal",
    category: "business",
    title: "Industrial E-Waste Disposal: Classify Before Clearance",
    description: "Separate factory electronics from batteries, contaminated equipment and other industrial waste before arranging qualified isolation and registered processing.",
    answer: "Industrial e-waste disposal begins with identifying electronic equipment and any additional hazards attached to it. Control panels, instrumentation and automation hardware should not be combined indiscriminately with metal scrap, chemicals or production residues. Environmental and engineering staff must confirm classification, safe release and a suitable destination before removal.",
    sections: [
      {
        heading: "Survey equipment and associated hazards",
        paragraphs: [
          "Build a list of controllers, operator terminals, sensors, drives and obsolete test equipment, noting models and the process areas where they were used. Check coverage against the equipment categories in the e-waste rules rather than assuming every factory machine is covered in the same way. Flag oil contamination, chemical residues, embedded batteries and specialised sources for separate assessment.",
          "Use competent site personnel for de-energisation, isolation and any required decontamination. Collection workers should not be expected to diagnose process hazards or disconnect fixed plant. Keep equipment that has not been released by the responsible engineering and safety teams outside the recycling consignment, with its status clearly recorded.",
        ],
      },
      {
        heading: "Specify acceptance and project boundaries",
        paragraphs: [
          "Send the proposed receiver an accurate description of condition and contamination before requesting acceptance. Verify relevant registrations, permissions and the onward route for each stream. Batteries follow the Battery Waste Management Rules, while other hazardous residues may need a different regulatory pathway. A producer role must be assessed separately from merely using industrial electronics.",
          "Agree lifting responsibilities, access restrictions, packaging and documents needed for the actual consignment. Protect confidential production information through an approved media plan where controllers or terminals contain storage. Costs can include specialist handling, testing, decontamination, transport and processing; recoverable metal value is only one component of the quotation.",
        ],
      },
    ],
    faq: [
      { q: "Can contaminated electronics go with clean office computers?", a: "Not without an appropriate assessment and explicit acceptance. Declare the contamination so competent personnel can determine handling and the correct waste route; do not conceal it inside a mixed load." },
      { q: "Does the recycler normally disconnect production machinery?", a: "Do not assume that service is included. Electrical and process isolation require qualified personnel and site authorisation, with responsibility agreed separately from transport and material processing." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Inverter battery recycling", path: "/inverter-battery-recycling/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board", note: "Base rules and equipment schedule; consult applicable amendments and site-specific requirements." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "b2b-e-waste-pickup",
    category: "business",
    title: "B2B E-Waste Pickup: From Enquiry to Reconciled Handover",
    description: "Prepare a business collection request with approved assets, site access details, battery declarations, data requirements and clear commercial terms.",
    answer: "B2B e-waste pickup is a coordinated business handover, with acceptance and scheduling confirmed for the actual equipment and location. A useful enquiry includes an approved item list, site constraints, data-bearing assets and battery condition. Collection should proceed only after responsibilities and the receiving route are understood.",
    sections: [
      {
        heading: "Provide the information needed for acceptance",
        paragraphs: [
          "List equipment categories, quantities, approximate size and working condition. Include floor level, lift availability, loading restrictions and a site coordinator. Share external photographs without employee records, screen content or confidential labels. Identify leased items or goods awaiting disposal approval so they are excluded from the collection scope until ownership is resolved.",
          "Declare batteries, broken displays, heavy cabinets and damaged devices separately. Ask for safe preparation instructions and clarify which tasks require qualified personnel. Do not disconnect fixed UPS installations, open devices or move hazardous items merely to make a pickup easier. Confirm whether packing and loading labour are included in the proposal.",
        ],
      },
      {
        heading: "Agree terms before releasing equipment",
        paragraphs: [
          "Obtain the receiving legal entity's details and relevant registration information, including any collector acting on its behalf. State the requested media controls and evidence in writing. An office collection is not automatically producer EPR compliance; assess business roles independently and use the separate framework for battery waste.",
          "Compare transport and handling charges with any proposed recovery value, asking how inspection differences affect settlement. There is no assumed free pickup, universal service area or fixed completion time. At handover, reconcile counts, record exclusions and retain the agreed receipt. Keep downstream records and unresolved discrepancies assigned to a named owner after the vehicle leaves.",
        ],
      },
    ],
    faq: [
      { q: "Can a business choose a collection time immediately?", a: "A requested slot is provisional until item acceptance, route capacity and site access are confirmed. Arrange staff availability only after receiving confirmation of the agreed collection plan." },
      { q: "What paperwork should procurement request?", a: "Ask for the quotation, receiving-entity details, relevant registration evidence, agreed handover record and any contracted processing or data records. Applicable statutory documents depend on the business role and waste classification." },
    ],
    related: [
      { label: "Kochi e-waste recycling guide", path: "/e-waste-recycling-kochi/" },
      { label: "Pickup service", path: "/pickup/" },
      { label: "Corporate management plan", path: "/corporate-e-waste-management/" },
      { label: "Bulk recycling guide", path: "/bulk-e-waste-recycling/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
];
