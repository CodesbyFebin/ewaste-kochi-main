import type { DiscoveryGuide } from "./discoveryGuideTypes";

export const DEVICE_GUIDES: DiscoveryGuide[] = [
  {
    slug: "lithium-ion-battery-disposal",
    category: "devices",
    title: "Lithium-Ion Battery Disposal: Safe Collection Planning",
    description: "Arrange a suitable route for spent lithium-ion batteries, declaring damage and keeping battery waste separate from ordinary rubbish and mixed recycling.",
    answer: "Lithium-ion batteries need a dedicated battery-waste route, not a household bin or an undeclared mixed-electronics load. Tell the receiving service whether the battery is loose, built into a device, swollen, leaking or damaged. India's Battery Waste Management Rules apply separately from the e-waste framework.",
    sections: [
      {
        heading: "Identify condition without opening the device",
        paragraphs: [
          "Record the product type and any readable external battery label. Stop using or charging a device showing swelling, unusual heat or damage. Do not puncture, bend, crush, discharge experimentally or pry out an embedded battery. Leave removal to qualified personnel. Keep children and pets away and avoid handling damaged units while waiting for specialist instructions.",
          "For an intact, cool, already-loose consumer battery, ask the receiving programme about terminal protection and approved packaging. EPA guidance discusses preventing terminal contact, but damaged packs require different assessment and must not be treated as routine mail or courier parcels. If a battery is smoking, hissing or rapidly heating, withdraw and contact emergency services rather than attempting transport.",
        ],
      },
      {
        heading: "Confirm acceptance, transport and charges",
        paragraphs: [
          "Share chemistry if known, quantity, approximate size and condition before booking. Ask who will receive and process the battery, whether the relevant registration covers that activity, and what collection instructions apply. Record the handover, especially for workplace batteries, and keep battery quantities distinguishable from the accompanying electronic equipment.",
          "Costs depend on pack size, damage, packaging, transport and processing needs. Recoverable material does not guarantee a payment or free collection. Businesses that only use batteries have a different role from producers or importers; imports of battery-containing equipment warrant a separate compliance review rather than assuming ordinary office-user status.",
        ],
      },
    ],
    faq: [
      { q: "Should I remove a glued-in phone battery?", a: "No. Describe the device and battery condition to the receiver and arrange qualified handling. Opening a swollen or damaged device can increase risk and is not a preparation requirement." },
      { q: "Can power banks go in normal recycling?", a: "No. A power bank contains a battery and needs an accepting battery or electronics programme with a suitable battery route. Confirm acceptance before taking it to a collection point." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Swollen battery encyclopedia", path: "/wiki/technical/swollen-batteries/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Server-room UPS disposal", path: "/server-room-ups-disposal/" },
    ],
    sources: [
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Lithium-Ion Battery Recycling Frequently Asked Questions", href: "https://www.epa.gov/hw/lithium-ion-battery-recycling-frequently-asked-questions", publisher: "United States Environmental Protection Agency", note: "Safety background; US waste classifications are not Indian legal requirements." },
    ],
  },
  {
    slug: "crt-monitor-recycling",
    category: "devices",
    title: "CRT Monitor Recycling: Keep the Tube Intact",
    description: "Identify bulky cathode-ray-tube monitors and arrange specialist acceptance without breaking glass, opening the casing or attempting internal electrical work.",
    answer: "CRT monitors need a receiver that specifically accepts cathode-ray-tube displays and manages their glass responsibly. The bulky glass tube contains lead-bearing material and must not be broken to recover metal or reduce transport volume. Keep the monitor intact and disclose cracks or other damage before collection.",
    sections: [
      {
        heading: "Assess the whole monitor, not its scrap metal",
        paragraphs: [
          "Use the external model label and cabinet shape to describe the display. A deep, heavy monitor may be a CRT, but let the receiver confirm uncertain models from photographs. Do not remove the back cover, touch internal components or attempt to discharge anything. Unplugged equipment is not automatically safe for internal handling, and the glass tube presents breakage hazards.",
          "Keep an intact unit stable in a dry area away from children and accidental impacts. Do not stack heavy equipment on the screen. For cracked glass, restrict access and ask for professional packing or collection advice rather than sweeping fragments into ordinary rubbish. Arrange assistance and suitable lifting equipment for heavy displays.",
        ],
      },
      {
        heading: "Ask about the glass destination and cost",
        paragraphs: [
          "Confirm CRT acceptance explicitly: a general electronics collector may not have a suitable downstream route. Ask for the receiving entity, relevant registration and how the tube glass is managed. The US EPA describes lead in CRT funnel glass; that material background does not substitute for Indian e-waste requirements or establish a local provider's capabilities.",
          "Share monitor count, approximate size, condition and access restrictions for a quotation. Specialist glass treatment, safe packing and bulky transport can outweigh material value, so a charge is possible. Businesses should reconcile asset references and handover counts, then apply role-based compliance checks rather than assuming an office monitor clearance creates producer EPR obligations.",
        ],
      },
    ],
    faq: [
      { q: "Can I remove the copper coil before recycling?", a: "No. Leave the casing and tube intact for trained handlers. Recovering parts at home creates unnecessary electrical and glass hazards and can make the remaining unit harder to accept." },
      { q: "Is a working CRT suitable for donation?", a: "Only if a recipient genuinely needs it and a competent assessment supports safe use. Do not transfer a damaged or unwanted display merely to avoid arranging a proper waste route." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Old television recycling", path: "/old-tv-recycling/" },
    ],
    sources: [
      { title: "Cathode Ray Tubes (CRTs)", href: "https://www.epa.gov/hw/cathode-ray-tubes-crts", publisher: "United States Environmental Protection Agency", note: "CRT composition and recycling challenges; US regulatory provisions are not applied here." },
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "inverter-battery-recycling",
    category: "devices",
    title: "Inverter Battery Recycling: Separate the Battery Route",
    description: "Plan replacement or disposal of inverter batteries with qualified disconnection, chemistry-specific acceptance and clear collection and valuation terms.",
    answer: "An inverter battery should enter an accepting battery collection and recycling route, while the inverter's electronic unit is assessed separately. Many installations use lead-acid batteries, but some use lithium systems. Read accessible labels without opening equipment, and arrange qualified personnel for disconnection and removal.",
    sections: [
      {
        heading: "Keep the battery intact during preparation",
        paragraphs: [
          "Tell the service provider the battery count, labelled capacity, chemistry if known and whether the system remains connected. Do not loosen terminals, drain acid, open cells or attempt repairs as disposal preparation. Large batteries are heavy and can retain dangerous energy; removal needs a suitable lifting and electrical-safety plan rather than improvised household handling.",
          "Report leakage, swelling, cracked cases or flood exposure before any movement. Keep people away from leaks and do not try to neutralise or transfer the contents yourself. Ask the competent handler for interim safety guidance. A damaged unit may require different packaging and transport arrangements from a routine battery replacement.",
        ],
      },
      {
        heading: "Confirm the destination and exchange terms",
        paragraphs: [
          "Check whether a replacement supplier offers an applicable take-back route and identify the downstream battery recycler or refurbisher. CPCB's battery portal explains the separate framework and registration roles. A general e-waste receipt does not by itself establish that battery handling has been covered; keep battery identification and quantity visible in the agreed record.",
          "Any exchange credit depends on chemistry, weight, condition and the supplier's terms. Ask whether removal, stairs, transport and damaged-battery handling are charged separately. An offer tied to buying a new battery may differ from standalone disposal. Businesses should distinguish consumer responsibilities from producer or importer obligations and review imported battery equipment separately.",
        ],
      },
    ],
    faq: [
      { q: "Should I empty the battery to reduce its weight?", a: "No. Never drain electrolyte or open the case for transport. Inform the handler of the weight and access conditions so appropriate personnel and equipment can be arranged." },
      { q: "Can the inverter and battery travel in one pickup?", a: "Possibly, if the provider accepts both and defines suitable handling and separate downstream routes. Confirm this in advance rather than treating the battery as an ordinary electronic accessory." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Battery disposal encyclopedia", path: "/wiki/disposal/where-to-recycle-batteries/" },
      { label: "Business EPR roles", path: "/epr-registration-for-businesses/" },
      { label: "Solar panel e-waste", path: "/solar-panel-e-waste/" },
    ],
    sources: [
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "Frequently Asked Questions under Battery Waste Management Rules, 2022", href: "https://eprbattery.cpcb.gov.in/upload/adminDoc/Frequently%20Asked%20Questions%20(General).pdf", publisher: "Central Pollution Control Board", note: "Consumer, manufacturer and importer role distinctions." },
    ],
  },
  {
    slug: "server-room-ups-disposal",
    category: "devices",
    title: "Server-Room UPS Disposal: Coordinate Power and Waste Streams",
    description: "Retire rack and facility UPS equipment through engineering approval, specialist battery handling, separate receiving routes and reconciled project records.",
    answer: "Server-room UPS disposal requires a facilities-led retirement plan before any collection is booked. UPS electronics and their batteries are distinct waste streams, and fixed installations may involve substantial stored energy. Qualified electrical personnel must control isolation and removal; recycling logistics should start only after the equipment is safely released.",
    sections: [
      {
        heading: "Separate service continuity from physical removal",
        paragraphs: [
          "Identify the systems supported by the UPS and obtain approval that replacement power arrangements meet operational needs. Record the UPS model, external cabinet dimensions, labelled battery chemistry and number of cabinets where known. Include maintenance contracts, leased batteries and ownership restrictions in the release review. Do not expose wiring or open battery compartments to complete an inventory.",
          "Have competent engineering personnel assess isolation, lifting, floor loading and the movement route. General collection staff should not be asked to disconnect battery strings or fixed electrical supplies. Declare leaks, swelling, corrosion and water damage in advance, and keep suspect equipment outside routine handling until a specialist defines an appropriate plan.",
        ],
      },
      {
        heading: "Contract for distinct outcomes",
        paragraphs: [
          "Ask which entity receives the electronics and which handles the batteries, checking relevant registrations for each activity. Battery waste is governed separately from e-waste in India. If a management appliance stores configuration or operational records, include it in the organisation's approved data-disposition review without sharing confidential settings with transport contractors.",
          "Request separate line items for engineering work, lifting, packaging, transport, battery processing and electronics recovery. Possible battery value does not guarantee that a complex removal is cost-neutral. At handover, reconcile cabinet and battery quantities against the approved scope and retain any agreed downstream evidence. Assess business EPR roles independently of this retirement project.",
        ],
      },
    ],
    faq: [
      { q: "Is switching the UPS off enough for collection?", a: "No. Stored energy and installation-specific connections require qualified assessment. The responsible engineering team must confirm safe release; an external power switch is not a substitute for that process." },
      { q: "Can a failed UPS still have valuable batteries?", a: "Possibly, but value and reuse suitability require specialist evaluation. Do not test, charge or dismantle failed equipment to improve a quotation; disclose its known history and condition." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Data-centre encyclopedia", path: "/wiki/technical/data-center-decommissioning/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Server decommissioning", path: "/server-decommissioning/" },
    ],
    sources: [
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board", note: "Equipment schedule and separate treatment of waste batteries; check amendments." },
    ],
  },
  {
    slug: "led-tv-recycling",
    category: "devices",
    title: "LED TV Recycling: Protect the Screen and Personal Information",
    description: "Prepare an LED television for assessment and collection without opening the panel, overlooking smart-TV accounts or assuming broken screens have resale value.",
    answer: "An LED television should be assessed for genuine reuse or sent through an accepting electronics recycling route. Keep the complete set intact, identify its model and screen condition, and address personal accounts if it is safe to operate. A cracked screen must be declared before anyone arranges packing or transport.",
    sections: [
      {
        heading: "Prepare the television without dismantling it",
        paragraphs: [
          "Describe the screen size, stand or wall mounting, visible damage and whether the set powers on normally. Do not energise a wet, burnt or electrically damaged television just to demonstrate its condition. Have a competent installer remove wall-mounted equipment when needed, and arrange suitable assistance for large sets rather than carrying them by the panel edge.",
          "For a safely functioning smart TV, use the manufacturer's account-removal and reset guidance and check linked streaming services separately. If the display does not work, tell the receiver that account or local-data handling remains unresolved. Do not remove circuit boards, break the screen or attempt internal electrical work to reach storage components.",
        ],
      },
      {
        heading: "Confirm the receiving route and price basis",
        paragraphs: [
          "Ask whether the receiver accepts the exact display type and condition, and identify the registered downstream electronics route. Arrange protective transport appropriate to the set. Remote-control batteries require the separate battery-waste route; do not hide loose cells among cables or screen packaging. Businesses should link any handover to their asset and data records.",
          "The quotation may depend on panel condition, repairability, age, accessories, collection access and processing costs. A damaged panel can eliminate reuse value, and collection may carry a charge. Obtain a conditional estimate and clarify inspection adjustments rather than assuming a fixed screen-size rate or guaranteed free pickup.",
        ],
      },
    ],
    faq: [
      { q: "Is an LED TV the same as a CRT?", a: "No. Many LED televisions are flat-panel LCD displays using LED backlighting, whereas CRTs contain bulky glass tubes. Provide the model so the receiver can select the appropriate handling route." },
      { q: "Can I recycle a television with a broken screen?", a: "Acceptance depends on the provider and downstream facility. Disclose the damage, keep people away from sharp edges and obtain handling instructions before moving or packaging the set." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Old television recycling", path: "/old-tv-recycling/" },
    ],
    sources: [
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board", note: "Schedule includes televisions using LCD and LED technology; consult amendments." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "microwave-oven-e-waste",
    category: "devices",
    title: "Microwave Oven E-Waste: Recycle the Complete Appliance",
    description: "Arrange microwave disposal without opening the casing or attempting repairs, and clarify collection access, appliance condition and potential processing charges.",
    answer: "A discarded microwave oven belongs in an accepting electrical-appliance recycling route, not an ordinary metal-scrap stream that encourages unsafe dismantling. Keep the casing intact and disclose damage. Internal components can present an electrocution hazard even after unplugging, so disposal preparation must not involve opening the appliance.",
    sections: [
      {
        heading: "Limit preparation to safe external tasks",
        paragraphs: [
          "If the appliance and plug are safe to approach, disconnect it from the normal socket without opening any covers. Do not touch damaged wiring or attempt to disconnect a built-in installation yourself; use qualified assistance. Never remove the magnetron, discharge capacitors or bypass door interlocks. The US Consumer Product Safety Commission specifically warns against do-it-yourself microwave repairs.",
          "When safely accessible, remove food and loose personal items from the cooking cavity without reaching into damaged areas. Ask whether the receiver wants the glass turntable included and protect loose pieces as instructed. Report fire damage, broken doors or sharp edges. Do not run a faulty oven to prove it works or attempt repairs to increase scrap value.",
        ],
      },
      {
        heading: "Arrange acceptance and responsible processing",
        paragraphs: [
          "Provide the model, approximate size, external condition and collection access. Confirm that the receiver accepts microwave ovens and identify the registered electronics destination. Built-in removal, stairs and heavy lifting may need separate arrangements. Office kitchens should use the organisation's asset-release process and retain a handover record rather than treating the unit as untracked kitchen rubbish.",
          "A quote may reflect transport, removal labour, appliance condition and downstream processing as well as recoverable materials. A working unit might qualify for assessment for reuse, but that outcome is not guaranteed. Business producer responsibilities depend on activities such as importing or own-brand sales, not simply owning a staff-room microwave.",
        ],
      },
    ],
    faq: [
      { q: "Does leaving it unplugged make dismantling safe?", a: "No. Do not use elapsed time as permission to open a microwave. Leave internal electrical work and processing to qualified personnel with the appropriate equipment and procedures." },
      { q: "Can I donate an oven with a damaged door?", a: "Do not pass it on as a usable appliance. Disclose the defect and seek qualified assessment or an accepting recycling route; a recipient should not inherit an undisclosed safety problem." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Bulk e-waste recycling", path: "/bulk-e-waste-recycling/" },
    ],
    sources: [
      { title: "Electrocution Hazard with Do-It-Yourself Repairs of Microwave Ovens", href: "https://www.cpsc.gov/safety-education/safety-guides/electronics-and-electrical-home/electrocution-hazard-do-it-yourself", publisher: "United States Consumer Product Safety Commission", note: "Appliance safety guidance, not Indian waste-law advice." },
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board" },
    ],
  },
  {
    slug: "printer-cartridge-e-waste",
    category: "devices",
    title: "Printer Cartridge E-Waste: Check the Consumables Route",
    description: "Sort used ink and toner cartridges by model and condition, confirm manufacturer or specialist acceptance, and avoid releasing residual powder or liquid.",
    answer: "Used printer cartridges need a confirmed consumables return or processing route rather than an assumption that every electronics collector accepts them. Ink, toner, drums and waste-toner containers can have different acceptance conditions. Keep cartridges intact and identify the brand and model before arranging a return or collection.",
    sections: [
      {
        heading: "Contain residues without opening cartridges",
        paragraphs: [
          "Keep used cartridges in protective packaging when available and follow the receiving programme's instructions. Do not cut housings, empty toner, pour ink down drains or dismantle parts to recover plastic. If a cartridge leaks, avoid disturbing the residue and consult the manufacturer's safety information or trained workplace personnel rather than improvising cleanup.",
          "Separate cartridge types and record quantities for an office collection. Include whether units are original, refilled, remanufactured or damaged, since programmes may exclude some categories. Retiring the printer itself is a separate decision: multifunction machines can contain business information and should enter the organisation's approved asset and data-disposition process.",
        ],
      },
      {
        heading: "Verify eligibility and commercial conditions",
        paragraphs: [
          "Ask the manufacturer about current local programme availability and eligible supplies. HP's published programme illustrates that brand, cartridge type and country availability matter; a US programme page does not establish a Kochi return service or local free shipping. For an independent receiver, confirm the applicable classification, processing destination and permissions for the actual consumables and residues.",
          "Some eligible returns may be supported by a manufacturer, while mixed brands, damaged containers or small collections may involve packing, transport or treatment charges. Obtain written acceptance and cost terms before dispatch. Business compliance should consider the entity's actual producer or consumer role and relevant waste categories, not treat a cartridge receipt as blanket EPR fulfilment.",
        ],
      },
    ],
    faq: [
      { q: "Are empty cartridges suitable for household plastic recycling?", a: "Do not assume so. Composite construction and residual ink or toner can require specialist processing. Confirm an appropriate cartridge programme rather than placing them in ordinary mixed recycling." },
      { q: "Can all brands go into one manufacturer return box?", a: "Only if that programme explicitly permits them. Check the current eligibility list and packaging requirements; unsupported mixing can result in rejection and additional transport costs." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
    ],
    sources: [
      { title: "HP Ink and Toner Cartridge Recycling", href: "https://www.hp.com/us-en/hp-information/recycling/ink-toner.html", publisher: "HP", note: "Manufacturer example of eligibility and processing; US page does not establish local availability or pricing." },
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board", note: "Scope includes relevant operational consumables; assess specific waste classification and amendments." },
    ],
  },
  {
    slug: "old-tv-recycling",
    category: "devices",
    title: "Old TV Recycling: Identify the Technology Before Collection",
    description: "Choose a suitable route for older CRT, LCD and other televisions by confirming technology, condition, handling needs and any remaining personal information.",
    answer: "Old television recycling begins with identifying the set rather than judging it only by age or screen size. CRT, LCD, plasma and newer flat-panel equipment can require different handling and downstream processing. Describe the external model label, cabinet shape and damage so a receiver can confirm acceptance.",
    sections: [
      {
        heading: "Choose between genuine reuse and end-of-life handling",
        paragraphs: [
          "Consider reuse only when the television is safe, functional and wanted by a recipient. Do not call an untested or damaged set a donation to avoid disposal costs. A competent assessment may help determine repairability, but owners should not open the casing, recover boards or attempt internal high-voltage work. Keep a heavy tube set intact and stable.",
          "For older flat panels, let the receiving facility identify the display and backlight technology rather than assuming all screens contain the same materials. Declare cracked glass, missing casing, water damage or exposed components. Smart functions and attached streaming devices may hold account information; address them through manufacturer guidance when safe, or disclose unresolved data handling.",
        ],
      },
      {
        heading: "Arrange handling suitable for the actual set",
        paragraphs: [
          "Provide dimensions, weight if known, floor level and whether wall removal is needed. Ask the receiver to specify packing and lifting arrangements, especially for CRTs or broken screens. Confirm the registered electronics destination and its acceptance of that technology. Remote batteries should use a separate battery-waste route rather than being left loose in packaging.",
          "Prices depend on functioning condition, repair demand, fragile handling, distance and processing requirements. Older televisions may have no positive resale value, and difficult glass treatment can create charges. Institutions and hospitality businesses should reconcile room or asset references and apply role-based compliance checks, keeping collection evidence distinct from any producer EPR obligations.",
        ],
      },
    ],
    faq: [
      { q: "Will any scrap buyer accept every television?", a: "Do not assume acceptance means a suitable processing route. Ask specifically about the display technology, receiving entity and treatment of glass or other difficult components before handing it over." },
      { q: "Should I smash the screen to make transport easier?", a: "No. Breaking screens creates sharp fragments and can expose problematic materials. Keep the unit intact where possible and obtain professional handling advice for an already-damaged television." },
    ],
    related: [
      { label: "Pickup service", path: "/pickup/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "CRT monitor recycling", path: "/crt-monitor-recycling/" },
      { label: "LED TV recycling", path: "/led-tv-recycling/" },
    ],
    sources: [
      { title: "Cathode Ray Tubes (CRTs)", href: "https://www.epa.gov/hw/cathode-ray-tubes-crts", publisher: "United States Environmental Protection Agency", note: "CRT material and processing context, not Indian regulatory classification." },
      { title: "E-Waste (Management) Rules, 2022", href: "https://www.mppcb.mp.gov.in/proc/E-Waste-Management-Rules-2022-English.pdf", publisher: "Ministry of Environment, Forest and Climate Change; hosted by Madhya Pradesh Pollution Control Board" },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "solar-panel-e-waste",
    category: "devices",
    title: "Solar Panel E-Waste: Specialist Removal and Role-Based Rules",
    description: "Plan end-of-life photovoltaic panel handling with qualified installers, distinct component inventories and careful review of India's solar-specific e-waste provisions.",
    answer: "Discarded solar photovoltaic panels are covered by India's e-waste framework, but solar-specific provisions differ from ordinary electronics recycling targets. Owners should arrange qualified assessment and removal, then confirm an appropriate receiving route. Panels, inverters, mounting structures and storage batteries must not be treated as one undifferentiated waste category.",
    sections: [
      {
        heading: "Have qualified personnel assess the installation",
        paragraphs: [
          "Record accessible project documents, module models, approximate quantities, ownership and warranty status. Storm damage or poor output does not by itself settle whether modules are repairable, reusable or waste. Ask the installer or another competent professional to assess the system. Do not climb onto the roof, disconnect wiring, break modules or attempt high-voltage work for disposal preparation.",
          "Photovoltaic equipment can remain electrically hazardous in daylight, and damaged wiring can create unexpected paths for current. Keep untrained people away from damaged installations until qualified personnel confirm safety. Removal planning should address roof access, lifting, sharp glass and packaging; transport contractors should not be expected to make an unsafe array ready for collection.",
        ],
      },
      {
        heading: "Check solar-specific responsibilities and costs",
        paragraphs: [
          "CPCB's FAQ describes distinct manufacturer and producer responsibilities for solar photovoltaic waste, including inventory and storage provisions. Do not turn those role-specific provisions into an instruction for every owner to store panels indefinitely. Check current rules, amendments and CPCB guidance with a compliance professional before deciding the project route. Storage batteries follow separate battery-waste rules.",
          "Ask the proposed receiver to confirm panel technology, condition, relevant registration and the downstream process. Obtain separate estimates for professional removal, packing, transport and treatment, with any recoverable material value stated conditionally. Roof complexity, broken modules and distance can dominate costs. Keep module counts and acceptance records separate from the inverter and battery inventory.",
        ],
      },
    ],
    faq: [
      { q: "Do ordinary e-waste recycling targets apply identically to panels?", a: "No. The rules contain solar-specific provisions. Assess the responsible entity's role and current requirements rather than copying targets or paperwork from a general electronics disposal project." },
      { q: "Can I remove the aluminium frame myself?", a: "No. Leave modules intact and use qualified handlers. Frame removal can expose sharp glass and electrical hazards and may undermine the receiving facility's approved handling plan." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Business EPR roles", path: "/epr-registration-for-businesses/" },
      { label: "Industrial e-waste planning", path: "/industrial-e-waste-disposal/" },
      { label: "Inverter battery recycling", path: "/inverter-battery-recycling/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board", note: "Solar-specific responsibilities; verify subsequent guidance and amendments." },
      { title: "PV System Owner's Guide to Weather Vulnerabilities, Risks, and Impacts", href: "https://www.energy.gov/sites/default/files/2021-09/pv-system-owners-guide-to-weather-vulnerabilities.pdf", publisher: "United States Department of Energy", note: "Professional safety background, especially for storm-damaged systems; not an Indian legal source." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
  {
    slug: "e-waste-for-schools-and-colleges",
    category: "devices",
    title: "E-Waste for Schools and Colleges: A Supervised Collection Plan",
    description: "Organise campus electronics retirement and collection drives with institutional approval, student privacy, safe storage and a confirmed registered receiving route.",
    answer: "Schools and colleges should manage e-waste through an approved institutional process, not an unsupervised pile of donated electronics. Separate campus-owned assets from community contributions, protect student and staff information, and confirm the receiving route before announcing a drive. Safety and traceability matter more than collecting the largest volume.",
    sections: [
      {
        heading: "Approve assets and protect the campus",
        paragraphs: [
          "Inventory computer labs, projectors, printers, network equipment and classroom displays. Check grant conditions, government asset procedures, leases and donor restrictions before authorising disposal. Working equipment may be redeployed after competent assessment and approved data handling. IT staff should plan sanitization for student records, examination material and administrative information without involving volunteers in confidential systems.",
          "Use supervised, access-controlled storage away from classrooms, escape routes and weather exposure. Publish clear acceptance criteria before a community drive, excluding items the receiving partner cannot safely manage. Students should not dismantle devices, carry heavy CRTs, handle leaking batteries or attempt electrical repairs. Batteries and damaged equipment need a specialist plan rather than an open collection bin.",
        ],
      },
      {
        heading: "Confirm collection, costs and accountability",
        paragraphs: [
          "Identify the registered receiving entity and agree accepted categories, quantity limits, packing and pickup arrangements. Keep institutional asset references separate from contributor receipts. Battery waste follows its own framework. A campus is not automatically an EPR producer or a statutory bulk consumer solely because it teaches many students; assess equipment use and any other relevant activities.",
          "Budget for transport, supervision, packing, data services and difficult items. Any recovery value or manufacturer-supported return is conditional, not a guaranteed fundraiser or free event. Reconcile the final collection list, record rejected items and obtain agreed downstream evidence. Publish only aggregate educational results, avoiding student names, device contents or sensitive asset details.",
        ],
      },
    ],
    faq: [
      { q: "Can students learn recycling by taking devices apart?", a: "Use supervised, non-dismantling activities such as sorting illustrations, inventory exercises and discussions of material recovery. Actual waste equipment can contain stored energy, sharp components and confidential information." },
      { q: "Can families bring any electrical item to a campus drive?", a: "Only items on the confirmed acceptance list. Explain exclusions, battery handling and collection arrangements in advance so the institution does not become responsible for an unmanaged stockpile." },
    ],
    related: [
      { label: "Collection service", path: "/pickup/" },
      { label: "Data security encyclopedia", path: "/wiki/technical/data-security-recycling/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Bulk recycling planning", path: "/bulk-e-waste-recycling/" },
    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Institutional sanitization planning, not mandatory Indian certification." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
];
