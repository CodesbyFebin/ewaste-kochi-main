import type { DiscoveryGuide } from "./discoveryGuideTypes";
import { BUSINESS } from "./site";

const ewasteSource = {
  title: "E-Waste (Management) Rules, 2022: frequently asked questions",
  href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf",
  publisher: "Central Pollution Control Board",
  note: "Check current amendments and portal notices for role-specific requirements.",
};
const batterySource = {
  title: "EPR portal for Battery Waste Management",
  href: "https://eprbattery.cpcb.gov.in/",
  publisher: "Central Pollution Control Board",
};
const nistSource = {
  title: "SP 800-88 Rev. 2: Guidelines for Media Sanitization",
  href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final",
  publisher: "National Institute of Standards and Technology",
  note: "Consult the official publication and supplementary guidance for the current recommendations.",
};
const batterySafetySource = {
  title: "Frequent questions on lithium-ion batteries",
  href: "https://www.epa.gov/recycle/frequent-questions-lithium-ion-batteries",
  publisher: "US Environmental Protection Agency",
  note: "Technical safety guidance, not a statement of Indian legal requirements.",
};

export const HOW_TO_GUIDES: DiscoveryGuide[] = [
  {
    slug: "how-to-recycle-laptop-in-india",
    category: "how-to",
    title: "How to Recycle a Laptop in India",
    description: "Prepare a laptop for responsible recycling with ownership checks, verified backups, storage sanitization and battery-safe collection.",
    answer: "Assess whether the laptop can be reused, protect its data, and arrange handover through a verified electronics collection route. Confirm the receiving recycler and battery handling before release. A non-working laptop may still contain readable data and a battery with stored energy.",
    sections: [
      {
        heading: "Separate the reuse decision from data treatment",
        paragraphs: ["Record the model, condition and ownership before deciding on recycling. A repairable laptop may suit refurbishment, while leased or employer-owned equipment needs the owner's approval. Check for all internal storage, not just the visible system drive. Verify important backups before any irreversible sanitization, and involve IT if business retention requirements apply."],
      },
      {
        heading: "Prepare an intact device for a verified route",
        paragraphs: ["Do not open the laptop to extract an embedded battery. Report swelling, liquid damage or unusual heat before booking, and stop using or charging an affected device. Indian battery waste rules are separate from e-waste rules, so confirm professional downstream handling for both streams. Request collection records and any agreed media-level sanitization evidence separately."],
      },
    ],
    steps: [
      { name: "Inventory and decide", text: "List the laptop, charger and accessories; note faults and obtain disposal approval where needed. Ask whether reuse assessment is appropriate. Record the model and asset identifier privately, distinguishing your observations from anything a technician has confirmed. Check purchase records, lease terms and employer asset registers before assuming an unused machine is yours to discard. Include external drives and docking stations as separate entries because their ownership, acceptance and data risks can differ. Use existing maintenance records to describe intermittent failures rather than repeatedly powering an unreliable device. Ask a qualified assessor whether a repair would support useful continued service, not merely whether the machine can turn on. Avoid promising a working battery or a complete specification when those details are unknown. Photograph accessible exterior condition without displaying documents or account information. Keep the ownership approval, inventory version and assessment together so a later change from reuse to recycling has a clear reason and does not silently change the agreed data treatment." },
      { name: "Protect information", text: "Check your backup, sign out of accounts and arrange a storage-appropriate sanitization method. Do not treat a failed reset as successful erasure. Open representative files from the backup on another trusted device and check that local folders, email archives and application exports have been included. Confirm that recovery credentials remain available without relying on the laptop being retired. For business equipment, ask IT to resolve retention requirements, legal holds and management enrolment before any irreversible action. Identify whether the device has more than one storage medium using records or qualified support, rather than assuming the advertised system capacity is the complete inventory. Follow current manufacturer and sanitization guidance appropriate to the media and sensitivity of the information. If the process stops, the drive is inaccessible or the outcome cannot be validated, keep the device in controlled custody and agree professional treatment. Retain a result record linked to the asset, but do not place passwords, recovery keys or copies of personal files in a collection email." },
      { name: "Confirm and hand over", text: "Verify the recipient, accepted condition, fees and documentation. Match the laptop identifier to the handover receipt and track unresolved data treatment. Ask whether the collection business is also the processor, and identify the receiving organisation if equipment passes through an intermediary. Confirm the route for the embedded battery and any separate accessories, particularly when the original enquiry described only a working laptop. Obtain written terms for transport, assessment, sanitization and rejected equipment rather than relying on an assumed all-inclusive collection service. Keep the laptop secure until the agreed collector arrives, and check unexpected changes of collector through the original booking contact. Reconcile the device and accessory count before signing; mark any item retained at home rather than allowing it to appear as collected. Save the booking, receipt and agreed reporting milestone in one private folder. If processing or data evidence is due later, assign a follow-up date and record the device as transferred with treatment pending, not as fully completed merely because it has left the premises." },
    ],
    tools: ["Asset list", "Verified backup destination", "Manufacturer support instructions", "Camera for exterior condition photos"],
    timeline: "Allow separate time for backup, sanitization and collection confirmation; device faults and provider availability can extend the process.",
    faq: [
      { q: "Can I recycle a laptop that will not boot?", a: "Usually a suitable recipient can assess it, but confirm acceptance first. Treat its storage as data-bearing until sanitization or destruction is documented." },
      { q: "Must I include the charger?", a: "Ask the recipient. List it separately so its presence, condition and intended reuse or recycling are clear." },
    ],
    related: [
      { label: "Laptop and computer disposal", path: "/wiki/disposal/laptop-and-computer-disposal/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "What is data destruction?", path: "/what-is-data-destruction/" },
    ],
    sources: [ewasteSource, batterySource, nistSource],
  },
  {
    slug: "how-to-recycle-mobile-phone",
    category: "how-to",
    title: "How to Recycle a Mobile Phone",
    description: "Move accounts and authentication safely, prepare phone storage, and choose a suitable collection route without opening the battery enclosure.",
    answer: "Back up the phone, transfer essential account access, follow the manufacturer's disposal preparation instructions and confirm a verified recycling destination. Remove accessible personal cards without opening the enclosure. If damage prevents erasure, arrange professional data handling instead of assuming the phone is unreadable.",
    sections: [
      {
        heading: "Keep access to your digital accounts",
        paragraphs: ["Photos are only part of a phone backup. Check contacts, messages, authenticator access and any locally stored documents. Transfer essential authentication before resetting the old device, and verify that the replacement works. Follow model-specific instructions for account sign-out, activation locks and eSIM removal; a physical SIM and an eSIM are not the same thing."],
      },
      {
        heading: "Handle damage without creating another hazard",
        paragraphs: ["A cracked display does not mean the storage is empty. A swollen case may indicate battery damage: stop using or charging it, do not press it flat, and seek specialist handling advice. Leave sealed batteries in place. Confirm that the recipient can manage the whole phone and route its battery under India's separate battery waste framework."],
      },
    ],
    steps: [
      { name: "Transfer and verify", text: "Test your backup and essential sign-ins on another device. Obtain employer approval before disposing of a managed phone." },
      { name: "Prepare personal data", text: "Remove accessible SIM and memory cards using manufacturer instructions. Complete the appropriate reset or approved sanitization and check the result." },
      { name: "Arrange documented handover", text: "Disclose faults, confirm the receiving organisation and agree data handling for an inaccessible phone. Retain an identifier-linked receipt without publishing the identifier online." },
    ],
    tools: ["Backup destination", "Manufacturer preparation instructions", "SIM tool if required by the device", "Private device inventory"],
    timeline: "Account migration, backup verification and collection are separate stages; allow for account-recovery delays and specialist assessment of damaged phones.",
    faq: [
      { q: "Does a remote erase request prove erasure?", a: "No. An offline phone may not receive the request. Confirm completion or treat the device as still containing information." },
      { q: "Can I include a power bank?", a: "Only after separate acceptance confirmation. A power bank is battery equipment and may need different handling, especially if damaged." },
    ],
    related: [
      { label: "Phone and tablet recycling", path: "/wiki/disposal/mobile-phone-and-tablet-recycling/" },
      { label: "Recycling service", path: "/recycling/" },
      { label: "Lithium battery recycling explained", path: "/what-is-lithium-battery-recycling/" },
    ],
    sources: [ewasteSource, batterySource, batterySafetySource, nistSource],
  },
  {
    slug: "how-to-recycle-batteries-safely",
    category: "how-to",
    title: "How to Recycle Batteries Safely",
    description: "Identify batteries without opening packs, prevent terminal contact on intact cells, and arrange specialist advice for damaged or installed batteries.",
    answer: "Keep waste batteries out of mixed rubbish and household recycling, identify their type from external labels, and confirm an appropriate battery collection route. Intact loose batteries and damaged packs need different handling. Never open, puncture, crush, burn or deliberately discharge batteries to prepare them for recycling.",
    sections: [
      {
        heading: "Inspect visually, without dismantling",
        paragraphs: ["Use visible labels to distinguish small consumer cells, lithium packs and lead-acid equipment. Do not remove covers to discover the chemistry. Stop using or charging swollen, leaking or damaged batteries and seek professional instructions before moving them. If a battery is hot, smoking or hissing, move people away and contact emergency services; routine pickup arrangements are not an emergency response."],
      },
      {
        heading: "Match preparation to the condition",
        paragraphs: ["For intact loose consumer batteries only, insulate exposed terminals with non-conductive tape where safe and keep cells separated as the recipient directs. Store away from heat, moisture, metal objects and children. Do not apply ordinary packing advice to damaged cells. Installed UPS, vehicle or storage batteries need trained personnel; do not disconnect wiring or drain electrolyte yourself."],
      },
    ],
    steps: [
      { name: "Describe the batteries", text: "Record label information, approximate quantity and visible condition from a safe position. Identify whether batteries remain inside equipment." },
      { name: "Confirm specialist acceptance", text: "Check the recipient's battery registration and accepted chemistries. India regulates battery waste separately from e-waste; ask about damaged-pack arrangements explicitly." },
      { name: "Follow the transport plan", text: "Use the packaging and collection instructions approved for the actual batteries. Do not send damaged packs by ordinary courier or take them to an unconfirmed drop-off point." },
    ],
    tools: ["Visible label details", "Non-conductive tape for intact loose cells only", "Recipient-approved packaging", "Collection record"],
    timeline: "Condition assessment must precede transport scheduling. Damaged, large or installed batteries may need specialist planning; no collection interval is guaranteed.",
    faq: [
      { q: "Should I empty a lead-acid battery?", a: "No. Leave electrolyte and casing intact and arrange professional handling. Report leakage without touching the liquid." },
      { q: "Is a completely flat battery harmless?", a: "No. Residual energy and chemical hazards can remain even when it cannot power equipment." },
    ],
    related: [
      { label: "Swollen battery guidance", path: "/wiki/technical/swollen-batteries/" },
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "What is lithium battery recycling?", path: "/what-is-lithium-battery-recycling/" },
    ],
    sources: [batterySource, batterySafetySource],
  },
  {
    slug: "how-to-sell-used-laptops",
    category: "how-to",
    title: "How to Sell Used Laptops",
    description: "Build an accurate laptop listing, compare conditional offers, protect personal data and document the final ownership transfer.",
    answer: "Describe the laptop honestly, compare offers on matching terms, sanitize its storage and complete a documented transfer after confirming payment. Resale value depends on specification, condition and demand. A quote is not final until the agreed inspection and deductions have been resolved.",
    sections: [
      {
        heading: "Make the condition report useful",
        paragraphs: ["Record the model, processor, memory, storage capacity and charger availability using existing records or system information. Note screen defects, keyboard faults, battery behaviour and repair history. Photograph exterior condition without exposing personal files or publicly posting serial numbers. Do not charge or run tests on a swollen or otherwise unsafe battery just to demonstrate the laptop."],
      },
      {
        heading: "Separate the sale from information removal",
        paragraphs: ["Check ownership, lease restrictions and company disposal approvals first. Compare whether offers include collection, accessories and any data service, and ask how inspection changes are agreed. Keep backups and use a storage-appropriate sanitization process before release. Remove organisation management or account locks through authorised administrators; never hand over passwords as a substitute for proper preparation."],
      },
    ],
    steps: [
      { name: "Prepare a consistent specification", text: "Send the same condition summary to potential buyers. Identify untested features as untested rather than describing the entire laptop as fully working." },
      { name: "Agree the transaction", text: "Record the proposed amount, inspection conditions, included items, payment method and any collection costs. Confirm who buys the equipment." },
      { name: "Sanitize and close", text: "Verify backups and approved erasure, check payment independently, and obtain a receipt linking the laptop to the transfer. Retain your own records securely." },
    ],
    tools: ["Specification and condition sheet", "Exterior photographs", "Verified backup", "Sale receipt"],
    timeline: "Allow for enquiries, inspection and data preparation before handover. Buyer demand and device condition can change the sale timeline.",
    faq: [
      { q: "Can a broken laptop still be sold?", a: "Possibly for repair or parts, but disclose faults and data status. Confirm responsible recycling for anything the buyer cannot reuse." },
      { q: "Should I trust a payment screenshot?", a: "No. Verify receipt through your own payment account or bank before releasing the laptop, and never share an OTP or payment PIN." },
    ],
    related: [
      { label: "Selling electronics locally", path: "/wiki/sales/where-to-sell-electronics-locally/" },
      { label: "Sell electronics", path: "/sell-electronics/" },
      { label: "Recycle a laptop in India", path: "/how-to-recycle-laptop-in-india/" },
    ],
    sources: [nistSource, batterySafetySource, ewasteSource],
  },
  {
    slug: "how-to-sell-computers-for-cash",
    category: "how-to",
    title: "How to Sell Computers for Cash",
    description: "Value desktop computers and office lots transparently, account for all storage devices and record payment and collection terms before release.",
    answer: "Inventory the computers and included peripherals, disclose their condition, compare itemised offers and agree payment before handover. Protect every storage device and retain a sale record. 'For cash' does not imply a guaranteed payout, a fixed scrap rate or the absence of business accounting requirements.",
    sections: [
      {
        heading: "Define exactly what the buyer is pricing",
        paragraphs: ["A desktop tower, monitor, keyboard and UPS are distinct items. List quantities and specifications separately so a complete-system quote is not confused with a tower-only offer. Distinguish tested working systems from untested units. For office batches, identify company ownership, disposal approvals and any leased equipment that must be returned rather than sold."],
      },
      {
        heading: "Control data and collection deductions",
        paragraphs: ["A desktop can contain multiple hard drives or SSDs, including secondary storage not shown in a simple capacity summary. Have IT reconcile media to each asset and document sanitization. Do not open monitors, power supplies or UPS enclosures. Ask whether inspection, lifting, transport, missing components or data handling change the net offer, and require approval before any revised price is accepted."],
      },
    ],
    steps: [
      { name: "Create an itemised lot", text: "Record towers, displays and accessories with condition and ownership. Flag UPS batteries separately for the appropriate battery handling route." },
      { name: "Compare net offers", text: "Use the same inventory for each buyer. Confirm the payment method, deductions, collection responsibilities and handling of rejected items in writing." },
      { name: "Reconcile the handover", text: "Release only approved, sanitized assets. Count items with the buyer, verify payment and retain the receipt and any business invoice or accounting record required." },
    ],
    tools: ["Itemised asset spreadsheet", "Disposal approval", "Media sanitization records", "Payment verification and receipt"],
    timeline: "Bulk inspections and storage verification can take longer than a single-device sale. Agree collection only after the inventory and financial terms are settled.",
    faq: [
      { q: "Is cash always the best payment method?", a: "No. Choose a method that is safe, verifiable and consistent with applicable accounting and tax requirements; consult your finance team for business sales." },
      { q: "Should I accept one price for the whole office lot?", a: "Only after checking what it includes. An itemised assessment makes excluded equipment and deductions easier to understand." },
    ],
    related: [
      { label: "Office equipment buyback", path: "/wiki/sales/office-equipment-buyback/" },
      { label: "Sell electronics", path: "/sell-electronics/" },
      { label: "What is ITAD?", path: "/what-is-itad/" },
    ],
    sources: [nistSource, ewasteSource, batterySource],
  },
  {
    slug: "how-to-sell-old-fridge",
    category: "how-to",
    title: "How to Sell an Old Fridge",
    description: "Assess an old refrigerator for resale, disclose cooling faults and organise safe professional moving or recycling without disturbing the refrigerant circuit.",
    answer: "Describe the fridge's model, capacity, condition and access requirements, then compare offers that clearly allocate inspection and moving costs. Choose reuse only when suitable; otherwise arrange specialist appliance recycling. Keep the refrigeration circuit intact and never cut pipes, remove the compressor or release refrigerant yourself.",
    sections: [
      {
        heading: "Describe more than the exterior appearance",
        paragraphs: ["A clean cabinet does not establish safe or efficient operation. Report cooling problems, damaged seals, unusual noise, rust and known repairs. Use existing observations rather than powering up equipment with damaged wiring or suspected leakage. Discuss whether repair and continued use are sensible given safety, condition and energy consumption; a working light alone does not prove the fridge cools properly."],
      },
      {
        heading: "Plan handling before accepting an offer",
        paragraphs: ["Share dimensions, floor level, lift size, stairs and parking constraints so the buyer can arrange suitable movers. If recycling is needed, confirm professional management of refrigerants, oils and insulation rather than a metal-only scrap route. Keep the appliance inaccessible to children while awaiting collection. Do not leave it unattended at the roadside or dismantle doors yourself."],
      },
    ],
    steps: [
      { name: "Request a condition-based assessment", text: "Send exterior and label photos where safely accessible. Ask whether the offer is for reuse or recycling and what deductions may apply." },
      { name: "Prepare according to the manual", text: "After confirming collection, remove food and follow manufacturer guidance for safe unplugging, defrosting and drying. Use a technician if disconnection is unsafe or unclear." },
      { name: "Let professionals move it", text: "Clear the access route and agree responsibility for lifting and transport. Confirm payment or charges, retain a receipt and leave restart instructions to the manufacturer and receiving technician." },
    ],
    tools: ["Model details", "Tape measure for accessible dimensions", "Manufacturer manual", "Written collection and payment terms"],
    timeline: "Inspection, defrosting and specialist moving require coordination. Follow model-specific preparation guidance rather than assuming a universal pickup or restart interval.",
    faq: [
      { q: "Can a non-cooling fridge have value?", a: "Possibly, but repairability, materials and transport affect the offer. Confirm a responsible destination even when no purchase offer is available." },
      { q: "Should I remove the gas first?", a: "No. Refrigerant handling requires appropriate professional equipment and expertise; disclose the appliance condition and keep the system intact." },
    ],
    related: [
      { label: "Reuse versus recycling", path: "/wiki/technical/reuse-vs-recycle/" },
      { label: "Sell electronics enquiries", path: "/sell-electronics/" },
      { label: "Why recycle electronics?", path: "/why-recycle-electronics/" },
    ],
    sources: [ewasteSource, { title: "Appliance disposal", href: "https://www.epa.gov/section608/appliance-disposal", publisher: "US Environmental Protection Agency", note: "Refrigerant and appliance environmental background; US legal provisions are not Indian requirements." }],
  },
  {
    slug: "how-to-schedule-e-waste-pickup",
    category: "how-to",
    title: "How to Schedule an E-Waste Pickup",
    description: "Prepare a useful pickup enquiry, confirm accepted items and access, and retain clear records without assuming availability or free collection.",
    answer: "Send an item list, condition details and location, then obtain explicit confirmation of acceptance, access, charges and a collection window. Complete data preparation before release and identify batteries or heavy appliances separately. An enquiry is not a confirmed booking, and collection is not necessarily free.",
    sections: [
      {
        heading: "Give the team enough information to assess the job",
        paragraphs: ["List device types and counts rather than describing everything as miscellaneous scrap. Mention embedded batteries, swelling, broken glass, heavy appliances and equipment holding sensitive data. Provide the locality, floor, lift availability and vehicle access privately. Exterior photographs help assessment, but avoid including personal screens, account details or unrelated documents."],
      },
      {
        heading: "Confirm the route and scope before collection",
        paragraphs: [`Use the site's contact options for ${BUSINESS.name}, or send your inventory to ${BUSINESS.email}. Ask who receives the waste, which downstream registrations apply and what records can be supplied. Battery waste needs its separate route. Confirm whether packing, lifting, data services or appliance handling require additional arrangements; do not assume these are included.`],
      },
    ],
    steps: [
      { name: "Send a complete enquiry", text: "Provide quantities, condition, location and access constraints. Flag damaged batteries before anyone attempts to pack or move them." },
      { name: "Agree the booking", text: "Obtain written confirmation of accepted items, charges or valuation terms, collection window and documentation. Resolve responsibility for excluded equipment." },
      { name: "Prepare and reconcile", text: "Keep accepted items secure and intact, finish approved data preparation and arrange building access. Check the collector's identity and match counts to the handover receipt." },
    ],
    tools: ["Item inventory", "Safe exterior photos", "Private location details", "Booking confirmation and handover record"],
    timeline: "Scheduling depends on route feasibility, load, access and specialist handling. Treat any proposed window as provisional until the provider confirms it.",
    faq: [
      { q: "Can I add extra items when the vehicle arrives?", a: "Ask beforehand. Extra volume, batteries or appliances may change acceptance, packing needs, vehicle capacity or charges." },
      { q: "Should I put everything outside overnight?", a: "No. Keep items protected from weather, theft and public access until agreed handover. Ask for guidance if safe indoor storage is unavailable." },
    ],
    related: [
      { label: "Collection planning", path: "/wiki/disposal/e-waste-pickup-services/" },
      { label: "Pickup enquiries", path: "/pickup/" },
      { label: "Recycling evidence checklist", path: "/how-to-get-certificate-of-recycling/" },
    ],
    sources: [ewasteSource, batterySource, batterySafetySource],
  },
  {
    slug: "how-to-get-certificate-of-recycling",
    category: "how-to",
    title: "How to Get a Certificate of Recycling",
    description: "Agree recycling documentation before pickup, connect records to your consignment and distinguish processing evidence from EPR and data sanitization certificates.",
    answer: "Ask the provider before collection what recycling evidence it can issue, who issues it and what event the document confirms. Supply an accurate inventory and reconcile the final record with the handover. A pickup receipt, recycling certificate, data sanitization record and portal EPR certificate serve different purposes.",
    sections: [
      {
        heading: "Specify the evidence you actually need",
        paragraphs: ["An internal asset audit may need serial numbers and disposition outcomes, while a material consignment may be tracked by category and measured weight. Agree the reporting unit, issuer's legal name, receiving facility, processing scope and link to the collection reference. A proposed sample can reveal missing fields before equipment leaves your control."],
      },
      {
        heading: "Check what the document does not establish",
        paragraphs: ["A collection acknowledgement proves receipt, not completed recycling. A recycler's batch statement is not automatically a CPCB portal EPR certificate for producer compliance, and neither proves hard-drive sanitization without separate evidence. Ask how reused equipment, batteries, residues and downstream transfers are distinguished. Avoid accepting a blanket statement that everything was recycled when some assets were resold or remain unprocessed."],
      },
    ],
    steps: [
      { name: "Agree reporting before release", text: "State your audit purpose and request the issuer, fields, supporting records and expected reporting stage. Verify relevant registration rather than relying on a certificate design." },
      { name: "Record the collection", text: "Match item counts or measured quantities, identifiers and the consignment reference. Note discrepancies and retain the signed handover acknowledgement." },
      { name: "Reconcile the final evidence", text: "Check dates, facility details, quantities and stated treatment against the inventory. Request correction of missing information and retain unresolved items for follow-up." },
    ],
    tools: ["Asset or material inventory", "Agreed reporting specification", "Handover receipt", "Document reconciliation checklist"],
    timeline: "Final evidence depends on receipt, actual processing and downstream reporting. Agree milestones, but do not assume the collection date is the certificate date.",
    faq: [
      { q: "Is there one universal certificate format?", a: "Do not assume so. Required evidence depends on the applicable rules, regulated role, contract and audit purpose." },
      { q: "Can Form 6 replace the certificate?", a: "No. Form 6 is a legacy 2016 e-waste movement document, not proof of completed recycling or a universal current requirement." },
    ],
    related: [
      { label: "Choosing a recycler", path: "/wiki/technical/choose-recycler/" },
      { label: "ITAD documentation enquiries", path: "/itad/" },
      { label: "What is Form 6?", path: "/what-is-form-6/" },
    ],
    sources: [ewasteSource, nistSource, { title: "E-waste EPR management system", href: "https://eprewaste.cpcb.gov.in/", publisher: "Central Pollution Control Board" }, { title: "Legacy Form 6 e-waste manifest", href: "https://kspcb.karnataka.gov.in/sites/default/files/inline-files/FORM-6-E-waste-Rules-2016_0.pdf", publisher: "Karnataka State Pollution Control Board", note: "Historical 2016 transport form." }],
  },
  {
    slug: "how-to-comply-with-e-waste-rules",
    category: "how-to",
    title: "How to Comply with E-Waste Rules in India",
    description: "Build a role-based compliance workflow using current official rules, verified recipients and records that keep battery waste and producer EPR duties distinct.",
    answer: "Identify your organisation's regulated roles and covered equipment, check current official requirements, verify receiving entities and maintain evidence of each applicable obligation. EPR duties are role-based, not imposed identically on all consumers. Battery waste requires a separate assessment under the Battery Waste Management Rules.",
    sections: [
      {
        heading: "Map activities before selecting registrations",
        paragraphs: ["Distinguish manufacturing, own-brand selling, importing, refurbishing, recycling and using equipment. One organisation can hold several roles, and product coverage or exclusions can affect applicability. Covered bulk consumers must channelise e-waste appropriately, but ownership alone does not create producer recycling targets. Use CPCB guidance and qualified advice for ambiguous activities rather than copying another company's checklist."],
      },
      {
        heading: "Use current evidence, not inherited form names",
        paragraphs: ["Review the 2022 e-waste rules with amendments, official portal notices and applicable state directions. Form 6 was the legacy 2016 e-waste manifest, not a universal current requirement. Form 10 belongs to the hazardous-and-other-wastes framework, not every electronics pickup. Establish the actual waste classification and movement requirements before deciding which documents are necessary."],
      },
    ],
    steps: [
      { name: "Create a responsibility register", text: "List legal entities, activities, equipment categories and applicable obligations. Assign an accountable owner and record the official basis for each requirement." },
      { name: "Verify partners and routes", text: "Check role-specific registrations, facility scope and applicable permissions. Record separate battery handling and identify downstream processors, not only the collection contact." },
      { name: "Reconcile and review", text: "Maintain inventories, transfers and processing evidence. Where producer duties apply, reconcile portal certificates and returns against current obligations; review notices and changes before each filing." },
    ],
    tools: ["Role and product matrix", "Official rules and portal notices", "Registration verification records", "Evidence register and compliance calendar"],
    timeline: "Review applicability before starting regulated activities or changing product lines. Filing dates and regulatory processing depend on current notices; this workflow guarantees no approval time.",
    faq: [
      { q: "Is a recycling receipt complete legal compliance?", a: "No. It supports a particular transfer; registrations, producer obligations, reporting or other duties may also apply to your role." },
      { q: "Can I combine battery and e-waste records?", a: "A shared inventory can help administration, but distinguish the streams and retain the evidence required by each separate framework." },
    ],
    related: [
      { label: "Indian e-waste laws", path: "/wiki/technical/indian-laws/" },
      { label: "ITAD service", path: "/itad/" },
      { label: "CPCB registration explained", path: "/what-is-cpcb-registration/" },
      { label: "EPR explained", path: "/what-is-epr/" },
    ],
    sources: [ewasteSource, batterySource, { title: "Legacy Form 6 e-waste manifest", href: "https://kspcb.karnataka.gov.in/sites/default/files/inline-files/FORM-6-E-waste-Rules-2016_0.pdf", publisher: "Karnataka State Pollution Control Board", note: "Historical 2016 form." }, { title: "Form 10: Manifest for Hazardous and Other Waste", href: "https://ddnocmms.nic.in/SPCB_DOCUMENTS/Foms%2010-%20HW.pdf", publisher: "Pollution Control Committee, Daman and Diu", note: "Separate waste framework; verify applicability." }],
  },
  {
    slug: "how-to-destroy-hard-drive-data",
    category: "how-to",
    title: "How to Destroy Hard-Drive Data Safely",
    description: "Plan authorised media sanitization with retention checks, drive identification, appropriate professional treatment and verified results before recycling.",
    answer: "For drives you own or are authorised to retire, verify backups and retention requirements, identify the storage medium and select an appropriate sanitization method with qualified support. Record and validate the result before release. Do not rely on deleting files or attempt DIY drilling, burning or shredding.",
    sections: [
      {
        heading: "Confirm authority and the exact media",
        paragraphs: ["Obtain the information owner's approval and check legal holds, retention policies and lease conditions before irreversible action. Identify every drive, including secondary disks, RAID members and removable storage. A failed computer does not imply a failed or unreadable drive. Keep unsanitized media secure and track custody until an approved outcome is documented."],
      },
      {
        heading: "Choose a method that fits the risk",
        paragraphs: ["Consult the official NIST SP 800-88 publication and current device guidance. Magnetic hard disks and SSDs require different technical considerations; do not assume overwriting, degaussing or encryption-based erasure suits every medium. Reuse may be possible after suitable verified sanitization. Failed media or restrictive policies may instead require professional physical destruction followed by responsible recycling."],
      },
    ],
    steps: [
      { name: "Approve and inventory", text: "Verify recoverable backups, resolve retention restrictions and record media identifiers. Separate approved drives from equipment still in use." },
      { name: "Agree the treatment and custody", text: "Ask a qualified provider to justify the method for each media type and sensitivity. Specify secure transport, result evidence and handling of failures before handover." },
      { name: "Validate and close the record", text: "Reconcile each identifier with execution results, verification and approval. Escalate failures rather than releasing the drive; retain sanitization and recycling evidence as distinct records." },
    ],
    tools: ["Approved media inventory", "Verified backup", "Current sanitization policy", "Provider method specification and result records"],
    timeline: "Duration depends on capacity, media health, selected treatment and validation. Do not schedule resale or disposal on an assumed universal wipe time.",
    faq: [
      { q: "Is quick formatting sufficient?", a: "Do not assume so. It generally changes filesystem structures rather than demonstrating sanitization of all target data to the required assurance level." },
      { q: "Does destroying this drive erase cloud backups?", a: "No. Separate copies and cloud storage require their own authorised retention and disposal decisions. Include them in the information inventory where relevant." },
    ],
    related: [
      { label: "Hard-drive destruction overview", path: "/wiki/technical/hard-drive-destruction/" },
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "What is NIST SP 800-88?", path: "/what-is-nist-800-88/" },
    ],
    sources: [nistSource, ewasteSource],
  },
];
