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
      {
        heading: "Understand the pack and establish a suitable holding arrangement",
        paragraphs: [
          "Lithium-ion describes a family of chemistries, not a single interchangeable waste material. A phone pouch cell, a power-tool pack and a mobility battery can differ in casing, protection electronics, energy capacity and electrode materials. Packs may contain aluminium, copper, steel, plastics and electrolyte alongside their active cell materials; some chemistries contain cobalt or nickel and others do not. These differences help explain why a recycler asks for model information instead of quoting solely by the number of batteries. Use purchase records or readable exterior labels to supply that information, leave unknown chemistry marked unknown, and never open a pack to establish what metals it contains.",
          "A depleted battery is not automatically electrically harmless, and a casing that looks normal cannot reveal every internal defect. Keep intact waste batteries away from impacts, loose metal objects, direct heat and water while following the manufacturer's and receiver's holding instructions. Do not combine a collection with keys, screws or general workshop scrap. Storage needs depend on quantity, pack size and condition, so a household drawer and a workplace stockroom should not be treated as equivalent situations. Ask the receiving specialist what separation and packaging are suitable before moving items into a container; an ordinary lidded box is not a universal solution for damaged batteries.",
          "For an institution, the holding arrangement should have a responsible person, controlled access and a route to prompt specialist advice. Agree how staff report newly discovered swelling, odour, heat or physical damage without moving the item through occupied rooms. Keep batteries out of escape routes and locations exposed to careless stacking or waste compaction. Do not ask housekeeping staff or student volunteers to inspect cells, separate glued assemblies or sort a suspect pile by hand. If the collection is delayed, reassess the arrangement with the safety lead rather than allowing quantities to grow indefinitely. Active smoke, hissing or rapid heating takes priority over inventories and requires withdrawal and emergency assistance.",
        ],
      },
      {
        heading: "Prepare transport around declared condition rather than convenience",
        paragraphs: [
          "Give the collector an itemised description distinguishing already-loose consumer cells, intact battery-containing devices, large packs and anything damaged or recalled. Include quantity, external dimensions where safely known and whether the item is still connected to equipment. A photograph can support assessment but is not proof that a pack is safe for a standard transport service. Ask who decides the packaging, which carrier accepts the declared condition and who supplies any specialist materials. Do not use an ordinary courier label simply because it was offered for a different product. Advice for intact small batteries cannot be carried across to a swollen pack without the receiver's explicit review.",
          "Keep a device with an embedded battery complete unless qualified personnel are responsible for removal. Do not switch it on to measure remaining charge, deliberately run it flat, freeze it or place it in liquid as disposal preparation. For intact, cool, already-loose batteries, follow the programme's specific instructions on preventing terminal contact and keeping individual units separated. If those instructions conflict with the observed condition, stop and obtain clarification rather than improvising. Large mobility or equipment packs may require specialist collection at their current location, and staff should not lift them into a personal vehicle merely to bring them to a general collection point.",
          "Before handover, confirm the accepted list and identify the person authorised to change the plan. If the collector arrives expecting ordinary laptops but finds damaged batteries, do not let schedule pressure turn that mismatch into undeclared transport. Record rejected or retained items and obtain revised arrangements through the original service contact. A useful receipt distinguishes devices from loose batteries and notes known exceptions without claiming that recycling has already occurred. Businesses should retain the collection record alongside the downstream evidence they agreed to receive. Keep employee names, device contents and confidential project information out of public waste photographs while preserving enough private identification to reconcile the transfer.",
        ],
      },
      {
        heading: "Evaluate reuse and the full financial outcome",
        paragraphs: [
          "Reuse is a separate technical decision from recovering materials. A specialist may assess an intact pack with a known service history for continued use in an appropriate application, but owners should not sell an unknown battery as tested merely because it briefly powered a device. Swelling, leakage, recall status, incompatible charging equipment and uncertain provenance are reasons to seek professional direction, not to perform home experiments. Do not combine salvaged cells into replacement packs or offer them for student projects. If a battery is subject to a manufacturer's recall, consult that programme about the particular model and condition before assuming a general recycling collection is the intended route.",
          "Compare estimates using the same chemistry, quantity, condition and access details. A collection credit, if offered, may reflect recoverable material or manufacturer support, while specialist packaging, transport and damaged-pack assessment may create separate costs. A higher headline payment is not necessarily the better outcome if the offer leaves battery acceptance or downstream processing unclear. Ask whether the amount is provisional, what inspection can change it and what happens if an item is rejected. Keep any device resale valuation separate from the battery handling charge. No standard price, guaranteed collection subsidy or assured metal recovery can be inferred merely from the lithium-ion label on a product.",
          "For campuses and businesses, coordinate procurement, facilities and IT so battery replacement does not leave an unowned waste backlog. Maintenance records may explain repeated failures or identify leased packs that must be returned to their owner. Set a review point for stored items and close each record only when the agreed route and evidence are resolved. If the organisation imports or places battery equipment on the market, obtain a role-specific compliance assessment rather than treating an ordinary disposal receipt as producer compliance. Educational reporting can describe accepted quantities and safe collection principles without claiming recovery percentages, avoided emissions or certification outcomes that the receiving facility has not actually documented.",
        ],
      },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "My old power bank is bulging inside a drawer. Should I take it to a shop?", a: "Stop using it and keep people away while seeking specialist advice about the swelling. Do not squeeze it into packaging or assume a shop accepts damaged packs. If it is smoking, hissing or rapidly heating, withdraw and contact emergency services instead of transporting it." },
      { role: "Lab technician", q: "We have prototype packs with incomplete labels. How should I describe them?", a: "Use project records to identify chemistry, construction and known damage without opening the packs. Mark unknown details explicitly and send the information to a specialist before collection. Keep them out of the routine consumer battery stream until acceptance is confirmed." },
      { role: "School admin", q: "A family arrived with a swollen tablet during our collection drive. Can we put it with laptops?", a: "Do not add it to the ordinary collection pile or ask pupils to handle it. Contact the designated safety lead and specialist receiver for condition-specific instructions. Pause that intake while the safe response is established." },
      { role: "Office manager", q: "Our quote covers laptops but says nothing about their batteries. Is that enough?", a: "Ask the provider to confirm embedded-battery acceptance and identify the downstream battery route in writing. Declare faulty packs separately because the original quote may cover only intact equipment. Keep the amended scope with the device inventory and collection receipt." },
    ],
    tools: ["Private inventory of product models, externally visible battery labels and known faults", "Manufacturer safety instructions and confirmed receiving programme contact", "Exterior photographs taken only when safe, without moving suspect equipment"],
    timeline: "Arrange acceptance and condition-specific handling before scheduling collection. Damaged batteries require prompt specialist advice rather than waiting to accumulate a larger lot; active warning signs require an emergency response, not a recycling appointment.",
    faq: [
      { q: "Can a battery that looks empty still start a fire?", a: "Yes. A product that no longer powers on can still contain stored energy, and its appearance does not establish internal condition. Do not test remaining energy by shorting contacts, charging an unknown pack or connecting improvised loads. Tell the receiver how the battery was used and whether it was dropped, flooded or recalled so acceptance is based on its actual history." },
      { q: "Are all lithium-ion packs equally valuable to recyclers?", a: "No. Cell chemistry, pack construction, quantity and processing access affect the possible recovery outcome. Different lithium-ion products do not necessarily contain the same valuable metals or the same proportions. Ask for an estimate that separates any conditional recovery credit from packaging, specialist assessment and collection charges, and avoid accepting a payment promise that depends on you opening the pack." },
      { q: "Can our workplace keep a general battery donation box?", a: "Only after a competent receiving partner and the site's safety team have defined accepted types, supervision and storage arrangements. An unattended box can conceal damaged batteries and allow loose terminals to contact other objects. Publish exclusions, nominate a responsible adult and arrange a separate specialist response for damaged items rather than allowing contributors to leave them anonymously." },
      { q: "Should I remove a glued-in phone battery?", a: "No. Describe the device and battery condition to the receiver and arrange qualified handling. Opening a swollen or damaged device can increase risk and is not a preparation requirement." },
      { q: "Can power banks go in normal recycling?", a: "No. A power bank contains a battery and needs an accepting battery or electronics programme with a suitable battery route. Confirm acceptance before taking it to a collection point." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Swollen battery encyclopedia", path: "/wiki/technical/swollen-batteries/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Server-room UPS disposal", path: "/server-room-ups-disposal/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },    ],
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
      {
        heading: "Recognise why CRT construction changes storage decisions",
        paragraphs: [
          "A cathode-ray-tube monitor combines a heavy evacuated glass tube with circuit boards, wiring, a metal chassis and a plastic enclosure. Its glass is not equivalent to bottles or window panes: lead-bearing portions and other specialised materials require an appropriate processing route. The visible screen is only one part of that assembly, so measuring screen size does not establish the complete weight or composition. Do not remove covers to identify the tube or assume that extracting copper leaves an ordinary recyclable shell. Exterior model information and manufacturer documents are enough for an initial enquiry, with uncertain identification left to competent personnel rather than a home inspection of internal components.",
          "Keep an intact monitor in a stable, dry location where it cannot be knocked over or mistaken for working equipment. Avoid precarious shelves, narrow walkways and stacks with computers balanced on top. The weight is unevenly distributed, and a cabinet that appears easy to grip may have brittle plastic or a damaged base. Do not lift it by the signal cable, carry it by a loose stand or drag it across a floor to see how heavy it feels. Tell the collection team about deteriorated handles or casing before they plan removal. Temporary storage should preserve the complete unit rather than prioritising how tightly a storeroom can be packed.",
          "A broken tube needs a different response from an intact monitor awaiting collection. Restrict access to the area and contact a receiver equipped to assess damaged CRTs; do not gather fragments into a household recycling bag or use students to tidy the space. Avoid disturbing residues, and use professional advice for containment and cleanup rather than an improvised sweep or vacuum. Photographs should be taken only from a safe position without moving the unit. In an institutional store, record the damage and tell the site safety lead so cleaners, movers and contractors do not encounter it without warning. Unplugging or years in storage does not make internal electrical work appropriate for owners.",
        ],
      },
      {
        heading: "Plan a complete-display movement and acceptance check",
        paragraphs: [
          "Build the collection description around the actual route out of the building. Include floor level, stairs, lift restrictions, narrow turns, loading access and whether the monitor is still on a desk or in a high cupboard. Use recorded weight if available instead of lifting it onto household scales. A qualified moving team should choose handling equipment, staffing and packaging suitable for the monitor and route. Ask whether these services are included in the booking or supplied separately. Do not place the monitor outside early to make collection easier, because rain, public access and accidental impacts can turn an intact item into a more difficult damaged load.",
          "Confirm that the receiving business accepts CRT monitors specifically, including the count and condition being offered. Acceptance of laptops, flat panels or general electronics does not answer the glass question. Ask which downstream facility handles the tube and what information the provider can supply about its relevant registration and processing scope. A collector may legitimately coordinate another facility's work, but the relationship should be understandable rather than hidden behind a generic recycling claim. Keep the existing source material in context: descriptions of CRT composition explain the concern, while local requirements and the actual receiving chain determine whether this particular collection is appropriately arranged.",
          "For a school computer-lab clearance, separate monitors from system units, keyboards and unrelated television sets in the inventory without asking anyone to dismantle assemblies. Tag the complete units with private asset references where safe and reconcile each category at handover. A standard standalone CRT monitor normally does not hold the documents stored on its attached computer, but an integrated computer or specialist terminal may have data-bearing components and needs IT review. Do not discard the associated computer simply because the display is obsolete. Record any monitor the collector declines, retain responsibility for its follow-up and avoid marking the entire room as cleared when difficult glass remains behind.",
        ],
      },
      {
        heading: "Assess a realistic second life and whole-load economics",
        paragraphs: [
          "A working CRT can have a genuine specialist use, such as supporting compatible legacy equipment, but demand should be confirmed before transport. The recipient needs to understand its size, weight, connectors, operating limitations and known faults. A competent assessment is more useful than a seller's claim that a power light appeared once. Do not repeatedly energise a monitor with damaged insulation, unusual noises or an uncertain history simply to make a sale. A recipient's willingness to repair equipment should be explicit and should not substitute for a safe transfer plan. A damaged display should never be represented as classroom-ready or donated on the assumption that volunteers will make it safe.",
          "Compare continued use with the intended task rather than treating age alone as the deciding factor. A modern replacement may offer practical benefits in desk space, connection compatibility and energy use, but those benefits depend on the application and should not be presented as a guaranteed saving. A specialist user may value a supported legacy display, while a school may have no suitable curriculum or maintenance capacity for it. Ask who will support the unit and arrange its eventual end-of-life route. If no recipient actually wants the monitor or competent assessment does not support safe use, a documented recycling route is more honest than repeatedly advertising an unwanted donation.",
          "CRT recycling can carry a net charge because safe lifting, breakage prevention and glass processing may cost more than recoverable metals are worth. Ask whether the quote covers stairs, protective transport, damaged units and downstream treatment, and whether a price changes after inspection. For a bulk institutional lot, request the basis for counts or weights and ensure that easier items are not valued separately while CRTs are silently excluded. Keep any reuse offer conditional on assessment and acceptance by the buyer. A receipt confirms transfer, not automatically final glass treatment; agree the evidence and follow-up timing before release so the financial and environmental outcomes can be checked against the contract.",
        ],
      },
    ],
    tools: ["Exterior model photographs and a private monitor count", "Building access notes and existing manufacturer dimensions or weight records", "Written CRT acceptance, handling scope and downstream receiving details"],
    timeline: "Allow time for a CRT-specific receiver to confirm glass acceptance and organise suitable lifting. Broken tubes, difficult stairs or a proposed reuse assessment can change the collection schedule; do not move units into public areas while waiting.",
    faq: [
      { q: "Can CRT glass go to a bottle bank?", a: "No. Tube glass has specialised composition and is not an ordinary packaging-glass stream. Keep the complete monitor intact and ask a CRT-accepting receiver about the downstream glass route. An already-broken tube should be declared for specialist handling rather than divided among general rubbish and glass bins." },
      { q: "Do I need to erase a standalone CRT monitor?", a: "An ordinary standalone CRT display is not normally where the connected computer stores files. Check that the item is actually only a monitor, because integrated computers and specialist terminals need a different assessment. Inventory and protect the associated computer separately, and ask IT to resolve uncertain equipment rather than opening the display." },
      { q: "What if the collector refuses the CRT on arrival?", a: "Keep it in the agreed controlled location and record that it was not collected. Contact the booking provider to resolve the mismatch between the written acceptance and actual collection scope. Do not accept a suggestion to break the screen or remove metal so the remainder becomes easier to transport." },
      { q: "Can I remove the copper coil before recycling?", a: "No. Leave the casing and tube intact for trained handlers. Recovering parts at home creates unnecessary electrical and glass hazards and can make the remaining unit harder to accept." },
      { q: "Is a working CRT suitable for donation?", a: "Only if a recipient genuinely needs it and a competent assessment supports safe use. Do not transfer a damaged or unwanted display merely to avoid arranging a proper waste route." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "The monitor is in an upstairs cupboard. Should I carry it down before pickup?", a: "Describe the cupboard, stairs and access restrictions when booking. Let the provider arrange suitable people and equipment rather than attempting a heavy solo lift. Keep the route clear without moving the monitor yourself." },
      { role: "School admin", q: "Can our eco-club collect the old computer-lab CRTs?", a: "Students can help with a supervised inventory using existing records, but should not lift or dismantle the displays. Facilities staff should coordinate a CRT-specific receiver and controlled storage. Keep system units in the separate IT asset and data review." },
      { role: "Lab technician", q: "A research instrument still uses this display. Is recycling premature?", a: "Check compatibility and service requirements with the instrument owner and a competent technician. If the monitor is safely usable and genuinely needed, continued use may be reasonable. Record the decision without opening the display or bypassing electrical faults." },
      { role: "Facilities manager", q: "We discovered cracked CRT glass after clearing a storeroom. What now?", a: "Restrict access and alert the site's safety lead and specialist receiver. Do not direct cleaners to sweep fragments into general rubbish. Have the damaged condition assessed before packing or further movement." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Old television recycling", path: "/old-tv-recycling/" },
    
      { label: "Monitor recycling", path: "/monitor-recycling/" },
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },    ],
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
      {
        heading: "Match chemistry and installation history to the safety plan",
        paragraphs: [
          "Lead-acid inverter batteries contain lead-bearing components and electrolyte inside a substantial case, while lithium systems use different cell materials and protection arrangements. Labels such as sealed, maintenance-free or tubular describe aspects of design but are not permission to open the product or treat its contents as harmless. The inverter's power electronics, external battery cabinet and mounting accessories may also have separate ownership and receiving requirements. Gather model and chemistry information from invoices, maintenance records or labels that can be read without approaching exposed connections. Do not assume every large rectangular battery is lead-acid, and let the handler resolve uncertain models before choosing packaging or a valuation basis.",
          "Retirement does not remove stored energy or eliminate risks from a connected installation. Leave disconnection, electrical assessment and any battery-bank separation to qualified personnel who understand the system. Tell them about previous overheating, poor backup duration, leakage, corrosion, impact or flood exposure even if the unit currently looks quiet. Do not open caps, add water, top up electrolyte or perform a final charging cycle as preparation for recycling. Such work is not needed to establish the owner's disposal request. If the battery is in an occupied room, notify people responsible for that area so it is not accidentally returned to service while a removal decision is pending.",
          "Ask the competent handler and site safety lead about appropriate interim storage or controls for the existing installation. Keep untrained people away from damaged cases and leaks, and do not attempt to wipe, neutralise or transfer spilled contents yourself. Avoid placing tools, metal scrap or spare cables across battery tops or exposed connections. A serviceable installation may have specific ventilation and access requirements that should not be defeated by surrounding it with waste cartons. Do not relocate a leaking battery into a cupboard merely to hide it from view. Smoke, rapid heating or other active danger requires withdrawal and emergency assistance rather than continuing a routine exchange appointment.",
        ],
      },
      {
        heading: "Prepare the removal route without handling the electrolyte",
        paragraphs: [
          "Explain whether the battery stands at floor level, sits on a rack or forms part of a larger bank, using existing installation records where possible. Provide the handler with access details including stairs, narrow doors, lift availability and the loading location. Heavy batteries can create lifting and tipping hazards even when they have convenient-looking handles. Ask who supplies the lifting equipment and who confirms the installation has been safely released before transport staff arrive. Do not move the battery onto a weighing scale, tilt it to inspect the base or remove it from a stand yourself to make a quotation more precise. An estimated description is preferable to unsafe measurement.",
          "Packaging and transport should reflect the chemistry, condition and receiver's requirements. A cracked lead-acid case needs specialist assessment rather than an ordinary bag or an attempt to reduce weight by draining liquid. A lithium inverter pack may require a different collection service from the supplier's routine lead-acid exchange. Confirm whether the provider accepts the complete battery as found and whether professional removal, suitable containment and carrier arrangements are included. Keep routes clear of unrelated obstacles, but leave technical preparation to the responsible team. If new damage appears before pickup, update the provider before collection instead of assuming the original booking still covers the altered condition.",
          "For an apartment association, shop or campus, appoint one person to reconcile the old and replacement equipment without directing the electrical work. Record which bank or room the batteries came from, how many were removed and which units remain in service. Do not let a receipt for one replacement obscure the disposal of several older batteries that were already stored on site. Where batteries belong to a service provider, obtain its release or return instructions before offering them to another recycler. The handover should distinguish the battery stream from the inverter unit and should identify any rejected items. Keep unresolved quantities assigned to an owner until their destination is agreed.",
        ],
      },
      {
        heading: "Compare continued service, replacement and conditional exchange value",
        paragraphs: [
          "Poor backup performance does not establish whether the battery alone is at fault. A competent service provider may need to consider age, operating history, charging equipment and the actual load before recommending continued use or replacement. That assessment belongs within qualified maintenance, not a disposal guide's home testing exercise. A battery that is unsuitable for the original installation should not automatically be offered to another household as reliable backup. Ask a qualified refurbisher whether a lawful, technically suitable reuse route exists for the actual chemistry and condition. Damaged cases, uncertain history and unsupported equipment can make recycling the more appropriate outcome even when some energy remains.",
          "Separate the purchase of a replacement from the disposal economics of the old battery. A supplier may offer a conditional exchange credit tied to a particular product or service package, while a standalone recycler may quote collection and processing on another basis. Ask what weight or identification supports the offer, what inspection can change it, and whether removal labour, stairs, transport or damage attract additional charges. Compare the final payable amount rather than a large advertised credit in isolation. Do not drain contents or remove components to chase a metal-only price. The receiving route and safe handling remain essential even if an informal buyer offers more money.",
          "Institutions should connect battery retirement to continuity planning and procurement records. A school office, laboratory or emergency communications system may need approved replacement backup before the existing system is released. Coordinate that decision with facilities and the service provider rather than allowing the collection date to determine when critical support disappears. Retain the battery identification, disposal approval, handover record and any agreed downstream evidence alongside the replacement invoice. Review producer or importer responsibilities separately if the organisation brings battery equipment into the market. A purchase invoice with an exchange deduction can support the commercial record, but it is not by itself proof of every required downstream activity or all applicable compliance obligations.",
        ],
      },
    ],
    tools: ["Accessible installation and battery model records", "Private battery-bank inventory with ownership and service history", "Building access notes and written removal, acceptance and exchange terms"],
    timeline: "Coordinate qualified removal with replacement-power approval where backup remains necessary. Allow additional assessment for leaks, uncertain chemistry or difficult access, and keep commercial collection dates subordinate to the engineering and safety release.",
    faq: [
      { q: "Does maintenance-free mean the old battery is safe to open?", a: "No. That description does not remove electrical hazards or make the internal materials suitable for owner handling. Leave the case closed and provide the model information to the handler. Neither inspection for scrap value nor preparation for transport requires you to open caps, expose cells or transfer contents." },
      { q: "Can I use a weak inverter battery in another room?", a: "Do not assume a less demanding location makes an unassessed battery suitable. Have a qualified service provider consider its condition, chemistry and compatibility with the proposed equipment. If no supported reuse route is established, arrange the appropriate battery-waste route instead of passing uncertain performance or safety problems to another user." },
      { q: "What should an exchange receipt include?", a: "Ask for identification or a clear description of the accepted old batteries, quantity, receiving business and the agreed credit or charge basis. Keep removal and transport terms visible where they are separate. An exchange receipt records the transaction; request any additional downstream evidence promised by the supplier rather than assuming the discount proves completed recycling." },
      { q: "Should I empty the battery to reduce its weight?", a: "No. Never drain electrolyte or open the case for transport. Inform the handler of the weight and access conditions so appropriate personnel and equipment can be arranged." },
      { q: "Can the inverter and battery travel in one pickup?", a: "Possibly, if the provider accepts both and defines suitable handling and separate downstream routes. Confirm this in advance rather than treating the battery as an ordinary electronic accessory." },
    ],
    readerQuestions: [
      { role: "Homeowner", q: "The shop said to bring the old battery to the counter. Is it safe to carry it there?", a: "Ask the supplier for weight, access and condition-specific carrying instructions before moving it. Use assistance or appropriate equipment for a heavy intact unit and disclose cracks or leaks first. Do not transport a leaking or damaged case in an enclosed passenger area; seek specialist handling instead." },
      { role: "Facilities manager", q: "Our building has eight batteries in one bank. Can we recycle them one by one?", a: "Have qualified personnel assess the bank before deciding whether staged replacement or complete retirement is appropriate. Partial removal can affect the remaining installation's performance and safety. Record each removal and keep the count reconciled with the eventual disposal approval." },
      { role: "Lab technician", q: "Our backup unit shows corrosion on the terminals. Can we clean it for the quote?", a: "Do not clean or disturb corroded connections as disposal preparation. Report the corrosion and any leakage history to the competent handler. Keep the unit powered down according to site procedure and leave electrical work to qualified personnel." },
      { role: "School admin", q: "The UPS batteries in our server cupboard were replaced years ago. Who owns them?", a: "Check purchase records, service contracts and any supplier agreement before arranging disposal. Leased or provider-owned batteries may need to be returned under that arrangement. Keep the release decision documented before booking any collection." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Battery disposal encyclopedia", path: "/wiki/disposal/where-to-recycle-batteries/" },
      { label: "Business EPR roles", path: "/epr-registration-for-businesses/" },
      { label: "Solar panel e-waste", path: "/solar-panel-e-waste/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "E-waste drop-off points in Kochi", path: "/e-waste-drop-off-kochi/" },    ],
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
      {
        heading: "Map the equipment boundary and stored-energy hazards",
        paragraphs: [
          "A server-room UPS retirement may involve a rack unit, external battery cabinets, a maintenance bypass, network management hardware and a fixed distribution installation. These are not interchangeable pieces of scrap, and the ownership boundary may not match the physical cabinet boundary. Use approved drawings, asset records and maintenance documents to identify what is in scope without exposing conductors or opening battery compartments. Record uncertainties for the engineering survey rather than filling gaps with assumptions. The collection contractor needs dimensions and handling facts, while the authorised engineering team needs installation details; neither group should be expected to infer its responsibilities from a photograph of the front panel alone.",
          "UPS systems can include lead-acid or lithium batteries, power conversion electronics, capacitors, substantial metal enclosures and copper-bearing assemblies. The recoverable materials do not remove electrical hazards or make internal parts suitable for untrained sorting. Battery strings and other stored-energy components require installation-specific assessment even after a display reports that the system is off. Keep staff from opening cabinets for serial-number photographs or testing batteries for a valuation. Describe warning indicators and historical faults through existing service records instead. Distinguishing the battery chemistry matters both for safety planning and for the separate battery receiving route, and unknown chemistry should remain an explicit survey item.",
          "Until qualified personnel release the equipment, manage it as an installation under the site's electrical and facilities procedures, not as loose waste awaiting a van. Preserve controlled access, required clearances and the ability of responsible staff to respond to alarms. Do not stack cardboard around cabinets, block escape paths or relocate suspect batteries into an ordinary IT storeroom. Report leakage, unusual heat, odour or structural damage promptly to the safety lead and service provider. If active danger develops, use the site's emergency arrangements rather than continuing the collection plan. Retired status on a spreadsheet is an administrative decision and does not demonstrate that the physical equipment has been made safe.",
        ],
      },
      {
        heading: "Sequence service release, specialist movement and chain of custody",
        paragraphs: [
          "Before scheduling removal, identify the services that depend on the UPS, including network switches, storage, building controls and less visible monitoring systems. The appropriate owners should approve the continuity plan and the point at which the old system can be released. Do not let a discounted collection slot substitute for that approval. Maintenance windows, replacement commissioning and access permissions may need coordination across facilities, IT and the equipment supplier. This is planning information, not an instruction to operate bypasses or disconnect circuits: the engineering team must select and execute the actual electrical procedures. Keep any change to the approved scope visible to everyone responsible for continuity.",
          "Have the movement route assessed for cabinet weight, floor loading, raised floors, lift capacity, thresholds and loading access. A cabinet on castors is not automatically suitable for rolling through a server room, and visible lifting points should not be assumed usable without competent assessment. Ask who provides protective handling, packaging and any specialist equipment, and who confirms that technical release precedes transport. Do not remove battery drawers, panels or internal weights simply to make a cabinet lighter. If the provider proposes separate engineering and logistics teams, agree the handover between them and a stop point if the equipment or route differs from the survey.",
          "At collection, reconcile the released cabinets and separately identified batteries against the authorised inventory. Record equipment retained for continued service, supplier returns, leased items and any rejected material rather than allowing one broad tonnage figure to close every asset. Management cards or appliances may contain network settings and operational records, so IT should define data treatment without exposing credentials to movers. Keep custody controlled when sanitization remains pending and obtain the agreed identifier-linked result later. A transport receipt establishes a transfer event; it does not prove that batteries were recycled or that configuration data was treated. Assign follow-up ownership for each outstanding downstream record before the project team disperses.",
        ],
      },
      {
        heading: "Evaluate specialist reuse and the complete retirement budget",
        paragraphs: [
          "A UPS removed during a capacity upgrade may differ materially from one retired after a fire, flood or repeated failures. Qualified assessment can consider service history, manufacturer support, replacement parts and suitability for a genuine recipient. Do not assume a functioning display establishes usable capacity or that all batteries in a bank share the same condition. Reuse should include clear ownership, compatible installation requirements and a recipient able to maintain the equipment responsibly. A school or small office should not inherit an unsupported facility-scale system merely because the donor wants to avoid removal charges. If safe, supported reuse cannot be established, specify recycling rather than leaving the outcome ambiguous.",
          "Request a quote that separates survey and engineering services, lifting, packaging, transport, battery treatment, electronics processing and any approved data work. Potential metal or battery value may offset part of the cost, but difficult access and specialist labour can dominate the total. Ask which figures remain conditional on inspection or measured quantities, who authorises changes and what happens if the downstream facility rejects part of the load. Compare offers using the same released-equipment scope and building conditions. A low collection price can be misleading if it excludes disconnection or assumes the owner will move cabinets outside. No payment, processing yield or cost-neutral outcome should be treated as guaranteed.",
          "For a university data centre or research campus, coordinate the project with grant restrictions, leased infrastructure and retention requirements for operational records. Retirement may affect experiments, access systems or examination services beyond the server room itself. Preserve the approved dependency review, engineering release, asset reconciliation and final disposition evidence in the appropriate internal records. Procurement should separately assess the organisation's role under applicable battery and e-waste rules, particularly where importing equipment is involved. Do not describe a generic recycling certificate as proof of every legal obligation or every material outcome. Close the project with documented exceptions if records remain pending, rather than declaring completion solely because the floor space is empty.",
        ],
      },
    ],
    tools: ["Approved asset register, installation drawings and service records", "Dependency and ownership review coordinated by facilities and IT", "Surveyed access requirements and written engineering, transport and downstream scopes"],
    timeline: "Schedule collection after continuity approval and qualified release, allowing for survey findings, replacement commissioning and specialist logistics. Keep processing and data-evidence milestones separate from the physical removal date; installation complexity prevents a universal completion promise.",
    faq: [
      { q: "Can our IT team pull out battery drawers to reduce lifting weight?", a: "Not as routine disposal preparation. Removal of battery assemblies belongs to qualified personnel working under the installation's electrical and handling plan. Give the survey team the cabinet model and access constraints instead of modifying the equipment before assessment. General movers should receive only equipment that has been appropriately released for their scope." },
      { q: "Does a UPS network card need a data review?", a: "Potentially. Management hardware can retain configuration, contact details or operational records even when it is not a server drive. Ask authorised IT personnel to determine the model-specific data treatment and evidence required. Do not publish configuration screenshots or provide administrative credentials in a recycling enquiry to make the inventory more complete." },
      { q: "Can one provider coordinate batteries and electronics?", a: "Yes, if it clearly identifies the appropriate receiving route for each stream and the scope of its own work. Confirm battery chemistry acceptance, relevant registrations, engineering responsibilities and the records promised for both outcomes. One invoice can cover several services, but it should not obscure who actually receives and processes each material category." },
      { q: "Is switching the UPS off enough for collection?", a: "No. Stored energy and installation-specific connections require qualified assessment. The responsible engineering team must confirm safe release; an external power switch is not a substitute for that process." },
      { q: "Can a failed UPS still have valuable batteries?", a: "Possibly, but value and reuse suitability require specialist evaluation. Do not test, charge or dismantle failed equipment to improve a quotation; disclose its known history and condition." },
    ],
    readerQuestions: [
      { role: "IT manager", q: "The replacement UPS is installed. Can the collector come tomorrow?", a: "Confirm that the service owners have approved continuity and that qualified personnel can release the old installation before collection. Installation of a replacement alone does not close those steps. Book logistics against the documented release plan, not an assumed switch-off." },
      { role: "Facilities manager", q: "The cabinet has wheels. Can our porters move it to the loading bay?", a: "Have a competent team assess cabinet weight, floor loading and the full route first. Castors do not establish that raised floors, ramps or lifts are suitable. Leave movement to the personnel and equipment specified by that assessment." },
      { role: "Lab technician", q: "A retired UPS still supports one monitoring workstation. Should we list it as waste?", a: "Mark the dependency as unresolved and tell facilities and the workstation owner. Do not release the UPS until the required service has an approved alternative. Update the inventory when the authorised retirement decision is actually complete." },
      { role: "University procurement officer", q: "Our contractor offered a battery credit but no electronics destination. What should we request?", a: "Ask for separate receiving details and acceptance terms for batteries and UPS electronics. Confirm whether engineering work, lifting and transport are included in the net quote. Keep any credit provisional until its assessment basis and the complete scope are clear." },
    ],
    related: [
      { label: "Battery recycling service", path: "/battery-recycling/" },
      { label: "Data-centre encyclopedia", path: "/wiki/technical/data-center-decommissioning/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Server decommissioning", path: "/server-decommissioning/" },
    
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Server recycling Kochi", path: "/server-recycling-kochi/" },    ],
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
      {
        heading: "Understand the layered display and protect it during storage",
        paragraphs: [
          "Many televisions marketed as LED sets use an LCD panel illuminated by LED backlights. The complete appliance also includes circuit boards, power electronics, a metal chassis, plastic enclosure and several fragile optical layers. These materials are not equivalent to ordinary packaging glass or a single sheet of recyclable plastic. Screen size alone does not establish their proportions, and a marketing label does not identify every component in a particular model. Provide the exterior model number and let the receiving facility confirm technology and processing needs. Do not peel screen layers, remove the backlight assembly or expose boards to help a collector estimate material value.",
          "Keep a retired set stable and protected from impact, weather and pressure on the display. A thin screen can be damaged by twisting, gripping its edge or leaning unrelated items against it. Use the manufacturer's and receiver's handling guidance for the exact size and stand arrangement rather than assuming every flat panel can be stored in the same orientation. Do not balance the set against a wall in a busy corridor or stack smaller electronics on it. A damaged stand or missing feet should be declared before anyone plans temporary placement. Keep children, pets and public access away from an unstable display while awaiting competent handling.",
          "Broken panels and damaged electrical parts change the collection requirements. Report cracks, exposed edges, water exposure, burn marks and missing enclosure pieces before packing. Do not press adhesive material onto a damaged screen or sweep loose fragments into general recycling without specialist instructions appropriate to the condition. An unplugged television is still unsuitable for owner disassembly, and a dark screen is not evidence that internal electrical components are harmless. If new damage occurs while the set is waiting, update the receiver and site safety lead rather than reusing the original intact-equipment booking. Keep the device identifiable without moving it solely to photograph inaccessible labels.",
        ],
      },
      {
        heading: "Coordinate wall removal, accessories and account preparation",
        paragraphs: [
          "A wall-mounted television may require a competent installer, suitable lifting assistance and review of the mounting arrangement before a transport team can collect it. Tell the provider about high placement, concealed cabling, restricted access, stairs and any bracket that belongs to a landlord or building owner. Do not assume a general pickup includes removal from the wall. Obtain the owner's approval for fixed accessories and keep retained brackets distinct from items being discarded. Share dimensions from the product manual where available instead of undertaking an unsafe measurement. The movement plan should protect both the large flexible panel and the people carrying it through doors and around corners.",
          "For a safely functioning smart TV, review manufacturer instructions for account sign-out and reset, then use official account settings to check linked devices and sessions where appropriate. A television may retain application sessions, network details or user preferences even when it is no longer the household's main screen. Removing a streaming subscription from billing is not the same as clearing local device data, and resetting the screen does not necessarily treat an attached streaming stick. Inventory external media, USB drives, camera accessories and set-top boxes separately. Keep passwords and recovery information out of collection correspondence, and do not ask the collector to use your personal account to verify a reset.",
          "If the screen will not operate safely, record the data preparation as unresolved and ask whether the receiver can arrange suitable professional treatment. Do not power a wet or electrically damaged television simply to reach a settings menu. A completed collection receipt cannot substitute for the agreed data outcome. For hotel rooms, meeting rooms and campus displays, IT or the authorised asset owner should review shared sign-ins, management enrolment and room-specific configurations before release. Reconcile remotes, detachable accessories and any remote-control batteries with their accepted routes. Do not leave loose batteries hidden in a cable bag or assume an accessory belongs to the institution just because it was found beside the screen.",
        ],
      },
      {
        heading: "Decide whether repair or reuse serves a real recipient",
        paragraphs: [
          "A television can be obsolete for one owner's needs without being waste, but reuse should depend on safe condition and an actual use case. A recipient may need particular inputs, accessibility features, mounting compatibility or reliable streaming support. Ask a competent repairer to assess faults rather than treating a power indicator as proof of a working picture and safe operation. Damaged insulation, signs of overheating and cracked panels should be disclosed even if audio still works. Do not attempt internal repairs or pressure someone to accept a faulty set as a donation. The recipient should understand what has been assessed, what remains uncertain and who would be responsible for further work.",
          "Panel replacement can be a significant part of a repair proposal, while other faults may have different economics depending on parts and labour availability. Obtain a conditional assessment and compare the likely useful life of a repaired set with the recipient's needs. Do not claim that any particular fault is cheap to fix without a model-specific diagnosis. A recycler's material estimate is also distinct from a buyer's reuse offer: large screen dimensions do not guarantee valuable recoverable parts. Ask whether collection, wall removal, protective transport, assessment and processing are included, and which findings can change the quote. A net charge is possible when handling and treatment exceed recovery value.",
          "For an institutional refresh, group televisions by technology and known condition rather than announcing that every screen is suitable for a community donation. Keep ownership approvals, grant or lease restrictions and data decisions associated with individual assets. A school receiving a working display should have the space, compatible equipment and staff capacity to use it, not merely storage for somebody else's surplus. At handover, record accepted sets, retained accessories and any items redirected from reuse to recycling. Request approval for a material change in the agreed disposition. Report confirmed outcomes without inventing recycling percentages, resale values or a guarantee that every collected television has already reached its final processor.",
        ],
      },
    ],
    tools: ["Exterior model and condition record with screen size from existing documentation", "Manufacturer reset and handling guidance for the exact television", "Private accessory inventory, wall-removal scope and written receiver acceptance"],
    timeline: "Allow separate time for ownership approval, safe account preparation, installer availability and protective collection. Broken screens or unresolved data handling can require a revised appointment; do not promise a same-day outcome before the receiver has assessed the actual condition.",
    readerQuestions: [
      { role: "Homeowner", q: "The screen is black but my streaming account may still be signed in. What should I do?", a: "Use official account settings on another trusted device to review linked sessions where available. Tell the receiver that local data preparation remains unresolved. Do not open the television or repeatedly power faulty equipment to attempt a reset." },
      { role: "School admin", q: "A parent offered a very large TV for our classroom. Should we accept it?", a: "Confirm safe condition, compatibility, space and competent installation before accepting. Ask what faults and account preparation remain unresolved. Decline an unsuitable donation rather than creating a heavy storage problem for the school." },
      { role: "Hotel manager", q: "Can our contractor collect all room TVs under one total count?", a: "Keep an internal room-to-asset list and reconcile that list with the final count. Have authorised staff address shared accounts and management settings first. Record broken panels and missing accessories separately so the agreed acceptance scope stays accurate." },
      { role: "Tenant", q: "The TV bracket is attached to the landlord's wall. Can it go with the set?", a: "Obtain the owner's decision about the bracket and any fixed cabling before removal. Arrange competent assistance for the wall-mounted set. List retained fixtures separately on the collection scope to avoid accidental disposal." },
    ],
    faq: [
      { q: "Can the plastic back cover go in household recycling?", a: "Do not remove it as preparation. The complete television contains mixed materials and electrical components that should be handled through the accepting electronics route. A recycler can assess material separation under its own procedures; the appearance of a plastic enclosure does not make owner dismantling safe or establish local household-bin acceptance." },
      { q: "Should I include the remote and stand?", a: "Ask the receiver whether they are useful for assessment or reuse and list them with the television. An intact original stand can matter to a recipient, but a damaged or missing stand must be disclosed. Remote batteries need their own confirmed battery handling rather than being left loose with other accessories." },
      { q: "Does a factory reset cancel streaming payments?", a: "No. Subscription billing and device data are different issues. Review subscriptions and linked sessions through each service's official settings, and follow the television manufacturer's preparation guidance when the set is safe to operate. Treat a failed or inaccessible reset as unresolved rather than assuming the absence of a visible picture proves erasure." },
      { q: "Is an LED TV the same as a CRT?", a: "No. Many LED televisions are flat-panel LCD displays using LED backlighting, whereas CRTs contain bulky glass tubes. Provide the model so the receiver can select the appropriate handling route." },
      { q: "Can I recycle a television with a broken screen?", a: "Acceptance depends on the provider and downstream facility. Disclose the damage, keep people away from sharp edges and obtain handling instructions before moving or packaging the set." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Old television recycling", path: "/old-tv-recycling/" },
    
      { label: "TV recycling Kochi", path: "/tv-recycling-kochi/" },
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },    ],
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
      {
        heading: "Keep the electrical assembly complete and control interim storage",
        paragraphs: [
          "A microwave combines a metal cooking cavity and enclosure with wiring, control electronics, a door assembly and components that generate and control microwave energy. Depending on the design, the appliance may contain heavy transformer equipment or other power conversion assemblies alongside capacitors and the magnetron. These details explain why a metal-looking appliance is not simply a steel box for owner dismantling. Recoverable metals are only part of the processing task, and model differences affect both weight and handling. Supply an external model reference or purchase record rather than removing a cover to identify components. No internal inspection or part harvesting is necessary to request a responsible collection.",
          "Unplugging stops the ordinary mains connection but does not make internal work safe. Do not use a waiting period, an unlit display or years in a cupboard as evidence that you may discharge components or remove wiring. Keep the appliance closed and make its retired status clear to other occupants so it is not casually returned to kitchen service. Store an intact unit in a stable, dry location away from children, food preparation and routes where it may be knocked over. Do not balance it on another discarded appliance or use the door as a carrying handle. Heavy equipment and damaged plastic feet can make apparently convenient storage unstable.",
          "For a burnt, wet or mechanically damaged oven, describe the event before collection and restrict access to sharp or exposed areas. Do not energise it to determine whether the damage is cosmetic. Residues after a fire or an unusual previous use may need assessment by the site's safety personnel rather than ordinary kitchen cleaning. If an appliance was used in a laboratory, the responsible team should establish contamination status before it enters a general electronics route. Keep those circumstances visible in the acceptance request without attempting your own chemical treatment. A provider's willingness to take normal household microwaves does not automatically extend to contaminated or severely damaged equipment.",
        ],
      },
      {
        heading: "Prepare the cavity, installation and movement route safely",
        paragraphs: [
          "Limit preparation to normal, safe user-accessible tasks on an intact appliance. Remove forgotten food and personal containers only when the cavity is safely accessible, and follow ordinary manufacturer cleaning guidance if appropriate. Do not reach around broken door parts, soak electrical areas or remove interior covers to improve appearance. Ask how the receiver wants the turntable, roller ring and other loose cooking accessories presented, since loose glass can break during movement. Do not assume those pieces belong in a household glass bin or place them unprotected among metal parts. Note missing accessories honestly if reuse is being considered; buying replacements solely to improve an uncertain scrap offer may not be worthwhile.",
          "Built-in and over-range microwaves need an installation-specific removal plan. They may be supported by cabinetry or brackets and may have electrical or ventilation connections that a general collection crew is not equipped to address. Tell the provider about height, surrounding cupboards, stairs, parking and access restrictions before booking. A competent installer should decide how to release the appliance without damaging the building or exposing electrical hazards. Do not pull on a cord, loosen mounting parts or ask a single person to hold a heavy unit while others improvise removal. Clarify whether the recycling appointment begins only after professional removal or includes a separately arranged installation service.",
          "Once the appliance is appropriately released, the collection team should determine suitable lifting and transport protection. Use dimensions and recorded weight from the manual if available rather than carrying the oven to a scale. Keep walkways clear and unrelated household items out of the agreed collection area, but do not move heavy equipment outside just to reduce the team's work. Rain and public access can introduce new problems while waiting. For a staff kitchen, record the appliance identifier and ownership approval before handover. Include any accessories accepted with it, identify items retained on site and obtain an accurate receipt rather than treating an entire kitchen-clearance invoice as a device-level record.",
        ],
      },
      {
        heading: "Distinguish safe reuse from a metal-value assumption",
        paragraphs: [
          "A microwave that has been replaced for capacity or layout reasons may be considered for genuine reuse if a competent assessment supports safe operation. Door damage, unreliable interlocks, burn marks or damaged wiring require professional evaluation and should never be hidden from a recipient. A timer counting down or a turntable rotating is not a complete safety assessment. Do not test a faulty appliance with improvised loads or bypass a control to demonstrate that it can still heat. Ask a qualified service provider whether repair is appropriate and supported for the model. The recipient must actually want the appliance and understand any limitations rather than becoming responsible for an undisclosed waste problem.",
          "Repair economics depend on the diagnosis, parts availability, labour and the usefulness of the resulting appliance. A minor-looking defect is not necessarily inexpensive, and an older model is not automatically beyond repair. Compare a written conditional assessment with a confirmed reuse need before paying for work. Recycling economics are separate: recoverable steel, copper-bearing assemblies or other materials do not guarantee a payment after removal, handling and processing are considered. Ask which charges apply to built-in removal, stairs, collection and damaged condition, and what inspection may change. Do not accept an offer that requires you to remove the magnetron, transformer or other internal parts to qualify for a metal-only rate.",
          "Campuses and institutions should distinguish ordinary catering equipment from appliances used in research or specialist teaching. A laboratory history may affect acceptance even when the unit resembles a domestic microwave. The relevant safety officer should confirm the release status and communicate limitations to the receiver; student volunteers should not investigate residues or undertake cleaning experiments. For an ordinary staff-room unit, check whether it belongs to the institution, a catering contractor or an employee before disposal. Keep reuse approvals, collection evidence and any promised downstream records together. Public reporting should describe the documented disposition without claiming that a generic receipt certifies safe future operation, complete material recovery or compliance with every institutional obligation.",
        ],
      },
    ],
    tools: ["Exterior model reference, installation notes and known-fault history", "Manufacturer instructions for normal user-accessible preparation", "Ownership approval and written microwave acceptance, removal and transport scope"],
    timeline: "Allow for qualified assessment where reuse is proposed and competent removal for built-in equipment. Laboratory release reviews and damaged-appliance handling may extend planning; collection should wait for the appropriate safety and ownership decisions, not an arbitrary unplugged waiting period.",
    readerQuestions: [
      { role: "Homeowner", q: "My microwave has been unplugged for months. Can I take off the cover now?", a: "No. Keep the enclosure intact regardless of elapsed time. Use exterior model information for the collection request and leave internal work to qualified personnel." },
      { role: "Tenant", q: "The oven is mounted above the cooker. Does pickup include taking it down?", a: "Confirm removal explicitly with the provider and establish who owns the appliance and brackets. Arrange a competent installer if the collection service does not include that work. Do not loosen supports while waiting for a general transport team." },
      { role: "Lab technician", q: "Can an old laboratory microwave join the staff-kitchen recycling lot?", a: "Have the laboratory safety lead assess its use history and release status first. Tell the receiving service about any contamination concerns before combining collections. Do not present it as an ordinary domestic appliance while that assessment is unresolved." },
      { role: "School admin", q: "A donor offered a microwave with a bent door for our canteen. Should we repair it ourselves?", a: "Do not attempt repairs or put the appliance into service. Obtain qualified assessment with the defect disclosed, or decline the donation and direct the owner to an accepting route. Pupils and kitchen volunteers should not work on the door mechanism or internal components." },
    ],
    faq: [
      { q: "Should I cut the power cord before recycling?", a: "Do not cut wiring or otherwise modify the appliance as disposal preparation. Keep the unit intact and clearly out of service, and tell the receiver about any existing cable damage. Normal safe unplugging is different from internal electrical work; built-in connections and unsafe plugs should be left to qualified personnel." },
      { q: "Can I recycle just the metal case and keep the other parts?", a: "No owner dismantling is needed or appropriate. The complete oven contains electrical and specialised components that require qualified handling, even if the outer case looks like ordinary scrap metal. Ask a receiver to accept the whole appliance and identify its downstream electronics route rather than creating leftover parts with uncertain destinations." },
      { q: "Does a laboratory microwave need special disclosure?", a: "Yes. Prior use and possible contamination can change acceptance independently of the electrical condition. Have the institution's responsible safety personnel establish the release status and tell the receiver what was assessed. Do not improvise decontamination, remove internal parts or include uncertain laboratory equipment in a household-appliance collection without explicit acceptance." },
      { q: "Does leaving it unplugged make dismantling safe?", a: "No. Do not use elapsed time as permission to open a microwave. Leave internal electrical work and processing to qualified personnel with the appropriate equipment and procedures." },
      { q: "Can I donate an oven with a damaged door?", a: "Do not pass it on as a usable appliance. Disclose the defect and seek qualified assessment or an accepting recycling route; a recipient should not inherit an undisclosed safety problem." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "Bulk e-waste recycling", path: "/bulk-e-waste-recycling/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },
      { label: "E-waste drop-off points in Kochi", path: "/e-waste-drop-off-kochi/" },    ],
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
      {
        heading: "Identify consumable construction without releasing residues",
        paragraphs: [
          "Printer consumables are not one uniform waste item. An ink cartridge may combine a liquid reservoir, foam or other internal media, a printhead and electronic contacts, while a toner cartridge can include powder reservoirs, rollers, metal parts and a chip. Some printers use separate imaging drums and waste-toner containers, and others integrate several functions into one replaceable unit. Model references matter because a programme may accept one assembly but exclude another. Record the supply code from the exterior or purchasing system rather than opening the housing to determine construction. Keep uncertain items listed separately so an attractive plastic shell does not lead to an incorrect household-recycling assumption.",
          "Empty usually means the printer has stopped using the consumable, not that every trace of ink or toner has disappeared. Residues can escape if housings are cut, shaken, crushed or packed under heavy objects. Follow manufacturer and receiver guidance for keeping used units intact and protected; original protective packaging can be useful where the programme accepts it. Do not pour remaining ink into another cartridge, drain it into plumbing or shake toner out to reduce shipment weight. A printer's replacement instructions may cover ordinary removal of a user-replaceable cartridge, but that does not authorise dismantling the cartridge itself. Jammed, broken or inaccessible assemblies should be left to qualified service personnel.",
          "Store accepted intact consumables in a dry, controlled location protected from heat, impact and accidental use. Keep spent units distinguishable from new stock so staff do not reinstall an uncertain cartridge during an urgent printing job. If powder or liquid has escaped, avoid disturbing the residue and consult the product safety information and trained workplace personnel. Do not use compressed air, dry brushing or an ordinary household vacuum as an improvised toner cleanup method. Prevent students, visitors and cleaners from encountering an unlabelled spill. The correct response depends on the product and extent of the release, so a generic packaging instruction should not be treated as a universal spill procedure.",
        ],
      },
      {
        heading: "Build an eligible return batch and a controlled dispatch record",
        paragraphs: [
          "Start with the exact programme's current local eligibility rather than a broad brand recycling slogan. Check whether ink, toner, drums, waste containers, original supplies, remanufactured units and third-party products are accepted. A manufacturer's overseas web page may explain how a programme works without offering the same service in India or your location. Ask for the approved return method, quantity limits and packaging requirements before assembling a parcel. Do not assume a label from an earlier purchase or another country remains valid. For a mixed-brand office collection, maintain separate eligibility decisions even if the provider ultimately permits several categories to travel together.",
          "Describe leaks, cracked housings, missing closures and uncertain contents before dispatch. A receiver may need different arrangements for damaged supplies or may decline them entirely. Do not hide a leaking unit inside an otherwise eligible batch in the hope that the common brand name will cover it. Ask whether protective pieces from the replacement cartridge can be used and follow the product-specific instructions rather than forcing mismatched caps or seals. Keep the return container within the programme's stated limits and avoid adding unrelated electronics, loose batteries or general packaging waste. Packaging should prevent avoidable damage without disguising what is being sent or implying acceptance that has not been confirmed.",
          "For institutional batches, reconcile supply codes and quantities against the dispatch list and keep the receiving confirmation. Procurement or the managed-print contractor may own the return arrangement, particularly where consumables are supplied under a service contract. Obtain approval before diverting those supplies to an independent collector. Record rejected items and any shipment discrepancy rather than removing them from the inventory to make the totals match. If the entire printer is also being retired, create a separate asset and data-handling record because multifunction devices can retain documents or settings. A cartridge return acknowledgement cannot establish sanitization or disposal of the printer merely because both came from the same office.",
        ],
      },
      {
        heading: "Compare remanufacturing potential, costs and institutional purchasing choices",
        paragraphs: [
          "A suitable cartridge may be assessed by a competent programme for remanufacturing or material recovery, but neither outcome is guaranteed for every returned unit. Condition, model demand, design, previous refilling and programme capability can affect eligibility. Do not promise that every cartridge will be refilled or that a return creates a particular number of new products. Reuse of a consumable housing is different from owners opening reservoirs and handling residual powder or liquid themselves. If a specialist offers remanufacturing, ask what it accepts and how rejected components and residues are managed. A confirmed downstream route is more useful than a general claim that plastic is always recyclable.",
          "Unused surplus supplies deserve a separate review from spent cartridges. Check compatibility, ownership, storage history and manufacturer guidance before transferring unopened stock to another department or a genuine recipient. A sealed box alone does not establish that a cartridge is suitable for a particular printer or that a long-stored product will perform reliably. Do not break seals to inspect contents or relabel incompatible stock as universal. A campus can reduce avoidable surplus by coordinating printer models and purchasing against actual needs, while still preserving required functionality. If no appropriate recipient exists, ask the programme whether unused or expired stock has different return conditions from spent consumables.",
          "Compare the complete commercial arrangement rather than assuming every return earns a reward. Manufacturer support, if available locally for the eligible item, may cover some logistics; mixed brands, small quantities, damaged units or specialised residue treatment may create charges. Ask who pays for protective packaging, transport and rejected returns, and whether any credit depends on inspection or a new purchase. For a school collection campaign, do not advertise cartridge returns as a guaranteed fundraiser before written terms are established. Track actual accepted quantities and costs, and publish only substantiated aggregate outcomes. A programme receipt is useful evidence of a return but should not be described as blanket EPR fulfilment or an invented environmental certification.",
        ],
      },
    ],
    tools: ["Consumable supply codes, brand list and condition inventory", "Current local programme eligibility and manufacturer safety information", "Approved packaging instructions and private dispatch reconciliation record"],
    timeline: "Confirm eligibility before accumulating a batch or booking transport. Programme schedules, mixed-brand sorting and damaged-consumable assessment can affect timing; do not leave leaking supplies in an ordinary return box while waiting to reach a collection threshold.",
    readerQuestions: [
      { role: "Homeowner", q: "My printer says empty, but I can hear liquid in the cartridge. Should I drain it?", a: "No. Leave the cartridge intact and follow the accepting programme's packaging instructions. The printer's empty indication does not mean the reservoir contains no residue." },
      { role: "Office manager", q: "Our return box contains several brands. Can we use one manufacturer's label?", a: "Check the programme's current eligibility for every brand and supply type first. Separate unsupported items and obtain another confirmed route. Do not send the mixed box under a label whose acceptance scope is narrower." },
      { role: "School admin", q: "Can students collect cartridges to raise money?", a: "Confirm a supervised programme, accepted types and actual financial terms before advertising a fundraiser. Keep students away from leaking units and residue cleanup. Report real accepted quantities and proceeds rather than promising payment per cartridge." },
      { role: "Print-room technician", q: "The waste-toner container is damaged. Should I pour it into an empty cartridge?", a: "Do not transfer the contents or disturb released powder. Follow product safety information and contact trained workplace personnel and the receiver for a suitable response. Declare the damaged waste container separately from intact cartridges." },
    ],
    faq: [
      { q: "Are waste-toner bottles accepted wherever cartridges are accepted?", a: "Not necessarily. Waste containers, drums and cartridges can have different programme eligibility and residue-handling requirements. Identify the exact supply code and condition, and obtain explicit acceptance before packing. Do not transfer contents into another housing to make an excluded item resemble an eligible return." },
      { q: "Can I donate unopened cartridges from an old printer?", a: "Possibly, if a recipient uses the compatible model and the supplies remain suitable under manufacturer guidance. Check ownership and storage history and disclose any uncertainty about age or condition. Keep unused stock separate from spent returns and avoid promising print performance that has not been established." },
      { q: "Does returning toner also erase the printer's memory?", a: "No. Consumable return and printer data treatment are separate tasks. If the printer is being retired, have authorised IT staff assess stored information, management settings and the appropriate sanitization process. Keep the printer's asset and data records distinct from the cartridge dispatch receipt." },
      { q: "Are empty cartridges suitable for household plastic recycling?", a: "Do not assume so. Composite construction and residual ink or toner can require specialist processing. Confirm an appropriate cartridge programme rather than placing them in ordinary mixed recycling." },
      { q: "Can all brands go into one manufacturer return box?", a: "Only if that programme explicitly permits them. Check the current eligibility list and packaging requirements; unsupported mixing can result in rejection and additional transport costs." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Corporate e-waste management", path: "/corporate-e-waste-management/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },
      { label: "E-waste pickup service", path: "/pickup/" },    ],
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
      {
        heading: "Identify mixed display technologies without opening the cabinet",
        paragraphs: [
          "An old television can be a CRT, an early LCD, a plasma display or a later LED-backlit model, and age alone cannot reliably identify the construction. CRTs use bulky tubes with specialised glass, including lead-bearing portions. Some older LCD sets use fluorescent backlights that can contain mercury, while plasma panels and LED-backlit displays have different internal arrangements. These distinctions help a receiver select handling and processing rather than justify owner investigation. Use the external model number, purchase records or manufacturer documentation where available. If the label is inaccessible, describe the shape and known history without turning a heavy set over or removing the casing to settle the question.",
          "The complete television includes more than the visible screen: enclosures, circuit boards, power electronics, wiring and supporting metalwork all affect processing. A collector's interest in one recoverable component does not establish a suitable destination for the remaining glass and mixed materials. Ask how the complete set is accepted and which facility can manage that technology. Do not break a panel, remove a CRT coil or strip the cabinet to separate valuable-looking parts. The original sources explain material concerns but do not verify a particular local business. Keep the difference between technical background, applicable Indian requirements and the actual provider's acceptance clear when comparing services.",
          "Unknown technology should be recorded as unknown rather than grouped with the easiest displays to collect. In a hotel or campus clearance, different rooms may contain replacements bought across many years under similar screen-size descriptions. Create separate model groups and note known damage within each group. Do not require staff to power every stored television or move heavy units just to complete a spreadsheet. Existing procurement records and safely accessible exterior observations can support an initial survey. Have the receiving service review uncertain groups before announcing a collection date so a mixed lot does not leave difficult CRTs or damaged early flat panels behind without a plan.",
        ],
      },
      {
        heading: "Keep ageing cabinets stable and arrange technology-specific movement",
        paragraphs: [
          "Long storage can leave a television with brittle plastic, weakened feet, corroded fittings or a missing stand even when the screen looks intact. Keep the unit in a dry, stable, controlled location away from children and busy routes. Do not stack televisions on one another, support a heavy CRT on a narrow shelf or lean a large flat panel where it could slide. A television should not be moved by its cable or lifted using a loose base. Inform the collection team about visible deterioration and the current location so it can select appropriate handling. Emptying a storeroom quickly is not a reason to improvise heavy lifting.",
          "Declare broken screens, water exposure, missing covers and exposed components before transport. Keep people away from fragments and residues, and ask the qualified receiver or site safety lead how damaged material should be contained and collected. Do not sweep screen debris into ordinary rubbish, press cracked layers together or attempt to remove remaining glass. An unplugged set is not permission for internal electrical work, whether it has been unused for a day or a decade. If the condition changes while awaiting pickup, update the acceptance request. A plan for intact equipment may no longer be suitable after a fall, flood or accidental impact.",
          "Share floor levels, access widths, lift restrictions and wall-mounting details, using recorded dimensions or weight where available. A competent installer may be needed before a wall-mounted set is ready for transport, and a heavy tube television may require specialised moving assistance. Ask whether those tasks are included or must be booked separately. Confirm protective packaging with the receiver rather than assuming every display can travel in the same orientation or ordinary carton. Keep sets inside the approved holding location until the team is ready, not on a pavement exposed to weather. At handover, count the actual accepted televisions by type and record any rejected or retained equipment.",
        ],
      },
      {
        heading: "Separate a genuine second life from an unsupported donation",
        paragraphs: [
          "A safe, functioning television may be useful to a recipient even if it no longer meets the current owner's preferences. Establish the intended use, available inputs, mounting needs, remote availability and any required external receiver before promising compatibility. An older analogue set may need additional equipment for a particular service, and a smart set may lack support for the applications a recipient expects. Those practical limits do not automatically make it waste, but they should be disclosed. Ask a competent assessor to evaluate faults and safe operation where needed. Do not describe an untested storeroom television as working simply because it operated when it was first placed there.",
          "Account and ownership decisions also matter when the screen itself is old. Attached streaming sticks, set-top boxes, storage media and USB drives may belong to different people or retain information independent of the television. Follow manufacturer preparation guidance for safely functioning smart features, and keep inaccessible data handling explicitly unresolved. Do not energise damaged equipment to retrieve settings or give account passwords to a collector. Institutions should ask authorised IT and asset personnel to review managed displays and accessories. For leased hospitality equipment or grant-funded campus assets, obtain the appropriate release before sale or donation rather than assuming replacement by a newer model transfers ownership to whoever clears the room.",
          "Compare reuse and recycling offers on a complete, conditional basis. A specialist buyer may want a particular supported model, while another set of the same size may have no resale demand. Repair costs depend on diagnosis, parts and labour; transport and difficult glass processing can exceed recoverable material value. Ask whether the quote covers fragile handling, stairs, wall removal and the actual display types, and what inspection can change. For institutional donations, confirm recipient acceptance and a safe transfer plan rather than using a charity label to avoid processing costs. Retain the agreed disposition and follow up on downstream evidence without claiming guaranteed recovery, free collection or environmental results that have not been documented.",
        ],
      },
    ],
    tools: ["Exterior model list grouped by confirmed or unknown display technology", "Private ownership and accessory inventory with data-preparation status", "Access notes, damage photographs where safe and written technology-specific acceptance"],
    timeline: "Allow separate time for model identification, ownership review, specialist handling and any genuine reuse assessment. Mixed batches or broken displays may need several receiving arrangements; keep rejected equipment assigned to a responsible person until another suitable route is confirmed.",
    readerQuestions: [
      { role: "Homeowner", q: "The label is against the wall and the television is too heavy to turn. What should I send?", a: "Describe its shape, approximate screen size and known purchase history. Use an existing manual or invoice if available. Let the receiving team resolve identification rather than moving it unsafely for a photograph." },
      { role: "Hotel manager", q: "We have both bulky and flat televisions. Can one quote cover them?", a: "Possibly, but provide separate model groups and conditions so acceptance covers every type. Ask which downstream route handles the CRTs and older flat panels. Reconcile any exclusions before approving the collection." },
      { role: "School admin", q: "A donor says an old television only needs an adapter. Is that enough to accept it?", a: "Confirm safe operation and compatibility with the classroom's actual equipment through competent assessment. Consider space, mounting and ongoing support as well as the proposed adapter. Decline an unsuitable unit instead of taking on an uncertain repair and storage obligation." },
      { role: "Family executor", q: "A streaming box is attached to the old set. Should it go too?", a: "Establish ownership and whether anyone needs its information or account access before including it. Treat the box as a separate device in the inventory and follow its preparation guidance. Do not assume recycling the television resolves the accessory's data or return obligations." },
    ],
    faq: [
      { q: "Does every flat television have the same backlight materials?", a: "No. Flat-panel technologies and backlight designs vary, including older LCD models with fluorescent lamps and later LED-backlit sets. Give the receiver the model and leave uncertain identification to competent personnel. Do not open the display to look for lamps or assume every flat panel belongs in an identical processing stream." },
      { q: "Can I leave the set outside for an unconfirmed pickup?", a: "Avoid doing so. Weather, accidental impacts and public access can damage the equipment and complicate safe collection. Keep it in a controlled, stable location until the accepted receiver and handling arrangements are confirmed. If moving it is difficult, include that fact in the booking rather than attempting an unsafe advance relocation." },
      { q: "What if a donation recipient later decides the TV is unsuitable?", a: "Agree inspection and rejection terms before transfer, including who remains responsible for arranging a suitable route. Do not treat an unwanted or faulty item as successfully reused merely because it left your premises. Keep a revised disposition record and obtain explicit recycling acceptance if genuine reuse does not proceed." },
      { q: "Will any scrap buyer accept every television?", a: "Do not assume acceptance means a suitable processing route. Ask specifically about the display technology, receiving entity and treatment of glass or other difficult components before handing it over." },
      { q: "Should I smash the screen to make transport easier?", a: "No. Breaking screens creates sharp fragments and can expose problematic materials. Keep the unit intact where possible and obtain professional handling advice for an already-damaged television." },
    ],
    related: [
      { label: "Pickup service", path: "/pickup/" },
      { label: "Corporate compliance planning", path: "/corporate-e-waste-management/" },
      { label: "CRT monitor recycling", path: "/crt-monitor-recycling/" },
      { label: "LED TV recycling", path: "/led-tv-recycling/" },
    
      { label: "TV recycling Kochi", path: "/tv-recycling-kochi/" },
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "Sell used electronics", path: "/sell-electronics/" },    ],
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
      {
        heading: "Identify module materials and maintain the installation boundary",
        paragraphs: [
          "A photovoltaic module is a bonded assembly rather than an easily separable sheet of glass. Many crystalline-silicon modules combine cells, protective glass, encapsulating polymers, a backsheet or second glass layer, electrical connections and often an aluminium frame. Thin-film technologies can use different semiconductor materials, so one panel description cannot establish every module's composition or receiving needs. Use project specifications and manufacturer records to identify the technology without inspecting internal layers. Do not peel laminates, remove junction boxes or strip frames to establish recovery value. A receiving facility should explain whether it accepts the actual module technology and condition, not merely whether it buys aluminium or electrical scrap.",
          "An array also includes equipment outside the modules themselves: inverters, mounting structures, cabling, monitoring hardware and sometimes storage batteries. List these categories separately and let qualified personnel define the boundaries of the removal project. A roof refurbishment may require temporary professional relocation of working modules rather than disposal, while a failed inverter does not automatically make the array waste. Do not let a single mixed weight obscure which items were actually retired. Existing drawings and service records can support inventory preparation, but owners should not climb onto a roof or approach exposed electrical connections to make the paperwork complete. Keep uncertain quantities provisional until the professional survey resolves them.",
          "Photovoltaic modules can generate electricity when illuminated, and switching off an inverter does not by itself make every part of the array safe. Damaged glass, wiring and connectors require qualified assessment even if the building has lost mains power. Maintain access restrictions around storm-damaged installations and alert facilities or emergency personnel as appropriate. Do not touch fallen electrical components, attempt isolation, or improvise coverings as a substitute for a professional safety plan. A disposal appointment should begin from an authorised release and removal scope, not an assumption that old or disconnected equipment is harmless. Active fire or other immediate danger belongs under emergency arrangements rather than routine recycling logistics.",
        ],
      },
      {
        heading: "Coordinate professional removal, holding and transport",
        paragraphs: [
          "Ask a qualified installer to assess roof access, structural condition, mounting arrangements, lifting needs and weather constraints before confirming removal. The team should also establish how the remaining installation, if any, will be left in an appropriate condition. Transport contractors should not be expected to perform electrical or rooftop work outside their competence. Explain access restrictions, occupied areas, fragile roofing and loading locations during the survey. Do not move broken modules from a roof yourself or ask maintenance volunteers to carry them down stairs. The owner's practical preparation is to provide records, permissions and clear access for the agreed professionals, not to perform high-voltage work ahead of their arrival.",
          "Once modules are professionally removed, interim holding still needs a site-specific plan addressing electrical exposure, sharp glass, stability, weather and unauthorised access. Ask the installer and receiving specialist how intact and damaged modules should be supported, separated and packaged. Do not lean heavy panels along a public corridor, stack them to an improvised height or assume a detached module is inert. Broken units may require additional containment and handling arrangements rather than the packaging intended for intact products. Keep the storage location and responsible person documented, with a review point if collection is delayed. Solar-specific legal storage provisions for particular roles are not a universal instruction to stockpile waste on any available campus land.",
          "Provide the receiver with module count, model, technology where known, damage description and the proposed professionally prepared load. Ask who supplies transport packaging, who approves it and which facility will receive the modules. Confirm whether inverters, frames already separated by qualified personnel and batteries have distinct acceptance and documentation requirements. Do not add loose battery equipment to a panel load without its own confirmed route. At handover, reconcile the actual items against the project list and record any modules retained for assessment or declined by the collector. If the downstream destination changes, obtain a revised agreement rather than relying on the original booking to cover an unreviewed facility.",
        ],
      },
      {
        heading: "Evaluate continued generation, conditional value and institutional records",
        paragraphs: [
          "Lower output, age or cosmetic differences do not alone determine whether modules should be recycled. A qualified assessor can consider the installation's performance records, physical condition, warranty position and suitability for continued service. A proposed second-life installation also needs compatible system design, appropriate safety assessment and a genuine recipient, not simply space to store surplus panels. Do not test modules through improvised electrical connections or advertise them as proven safe because they still produce some power. Keep the distinction between assessed reusable equipment and waste clear in the transfer agreement. Where ownership or warranty claims remain unresolved, obtain the responsible party's decision before authorising irreversible treatment or resale.",
          "A removal quote may include engineering assessment, rooftop labour, lifting, packaging, transport and specialist treatment, with any material or resale credit stated separately. Glass and metal content do not guarantee that the project will generate a payment after those services are considered. Broken modules, difficult roofs, small quantities and distance to an accepting facility can change the balance. Ask which amounts are estimates, what inspection can revise and who authorises extra work. A repair or reuse proposal should explain the expected useful application without promising a fixed remaining lifespan or output. Compare complete service scopes rather than choosing solely on a headline price for aluminium that assumes the owner has dismantled modules.",
          "Universities, schools and other institutions should review project ownership, financing, grant conditions and any power-service contract before disposing of panels. The array may belong to an external operator even when mounted on the institution's roof. Keep module inventory, professional release, collection evidence and agreed downstream reporting separate from battery and inverter records. Compliance personnel should check current solar-specific rules and amendments for the organisation's actual manufacturer, producer, importer or user role. Do not apply ordinary electronics targets or another entity's storage responsibilities by analogy. Publish only documented aggregate outcomes; a collection receipt does not substantiate an invented recycling percentage, carbon saving, certification or guarantee that every module has completed final treatment.",
        ],
      },
    ],
    tools: ["Project drawings, module specifications and ownership or warranty records", "Private category-separated inventory with known damage and assessment status", "Qualified removal scope, approved holding plan and technology-specific receiver acceptance"],
    timeline: "Allow time for ownership review, professional survey, weather-dependent removal and an appropriate receiving route. Damaged arrays need prompt specialist attention, while downstream reporting can follow collection later; neither emergency safety nor legal role review should be reduced to a promised standard pickup interval.",
    readerQuestions: [
      { role: "Homeowner", q: "A storm cracked panels but the inverter is off. Can I clear the roof?", a: "Keep away from the damaged installation and arrange qualified assessment. An off inverter does not establish that illuminated modules or wiring are safe. Do not climb up, disconnect components or move broken panels yourself." },
      { role: "School admin", q: "Our roof contractor wants every panel removed tomorrow. Should we book a scrap van?", a: "Coordinate a qualified solar installer with the roof project first. Establish whether the modules are being temporarily relocated or genuinely retired and obtain ownership approval. Book collection only for equipment professionally released under the agreed disposal scope." },
      { role: "University procurement officer", q: "The panels were installed under an external operator's contract. Can we sell them?", a: "Review the agreement and obtain the owner's written decision before offering any equipment. Roof location does not establish ownership. Keep any authorised removal and receiving terms linked to the project records." },
      { role: "Facilities manager", q: "A receiver accepts the frames but not the glass. Is that a complete solution?", a: "No complete module route has been established by that offer alone. Ask for acceptance of the intact modules and a documented destination for their full material assembly. Do not remove frames yourself or leave the difficult remainder without an agreed responsible handler." },
    ],
    faq: [
      { q: "Does a switched-off inverter make the panels electrically safe?", a: "No. Illuminated photovoltaic modules can still generate electricity, and the safety of the installation requires qualified assessment. Do not disconnect wiring or treat a dark inverter display as permission to handle damaged modules. Keep untrained people away until responsible professionals establish the appropriate controls and removal plan." },
      { q: "Can a working panel be donated to a school project?", a: "Only after appropriate professional assessment and confirmation that the recipient has a suitable, supported application. A module is not an inert classroom prop simply because it is second-hand. Do not ask students to wire it up or dismantle it; use non-electrical demonstrations or published diagrams where a safe installation is not available." },
      { q: "Must every panel owner store waste indefinitely?", a: "Do not infer that from role-specific solar provisions. Ask a compliance professional to review current requirements for the actual owner and activities, and confirm a suitable receiving route. Any interim holding needs an appropriate safety plan and documented responsibility rather than an uncontrolled stockpile justified by a general statement about solar waste." },
      { q: "Do ordinary e-waste recycling targets apply identically to panels?", a: "No. The rules contain solar-specific provisions. Assess the responsible entity's role and current requirements rather than copying targets or paperwork from a general electronics disposal project." },
      { q: "Can I remove the aluminium frame myself?", a: "No. Leave modules intact and use qualified handlers. Frame removal can expose sharp glass and electrical hazards and may undermine the receiving facility's approved handling plan." },
    ],
    related: [
      { label: "Electronics recycling service", path: "/services/electronics-recycling-near-me/" },
      { label: "Business EPR roles", path: "/epr-registration-for-businesses/" },
      { label: "Industrial e-waste planning", path: "/industrial-e-waste-disposal/" },
      { label: "Inverter battery recycling", path: "/inverter-battery-recycling/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "E-waste center in Kerala", path: "/e-waste-center-in-kerala/" },
      { label: "E-waste pickup service", path: "/pickup/" },    ],
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
          "Start the inventory with what the institution actually owns and can lawfully release, then separate it from community contributions before any announcement. Grant-funded or leased equipment may have return, reporting or approval conditions that override a simple disposal decision, so check the original terms and the accountable office rather than assuming the asset register alone settles the question. Record the legal entity that owns each item, because a campus department and the institution's governing body can hold different responsibilities. Where a donor or vendor restricts reuse or requires specific downstream evidence, note those conditions next to the asset and carry them into the collection agreement. Do not authorise disposal of an item whose ownership or restrictions are unresolved; set it aside and obtain written approval first.",
          "Plan the storage as a short-term, supervised hold rather than a long-term repository. Choose a location with limited access, clear labelling and protection from dust, moisture and temperature extremes, and keep hazardous items such as batteries and damaged displays in a separate, marked area that staff alone can reach. Label boxes by category and collection date so a later audit can trace what arrived when, without exposing serial numbers or the contents of stored devices. Arrange periodic checks of the store so no item is forgotten, and agree a maximum hold period with the receiving partner so the institution does not accumulate an unmanaged stockpile that outlives the drive itself.",
        ],
      },
      {
        heading: "Confirm collection, costs and accountability",
        paragraphs: [
          "Identify the registered receiving entity and agree accepted categories, quantity limits, packing and pickup arrangements. Keep institutional asset references separate from contributor receipts. Battery waste follows its own framework. A campus is not automatically an EPR producer or a statutory bulk consumer solely because it teaches many students; assess equipment use and any other relevant activities.",
          "Budget for transport, supervision, packing, data services and difficult items. Any recovery value or manufacturer-supported return is conditional, not a guaranteed fundraiser or free event. Reconcile the final collection list, record rejected items and obtain agreed downstream evidence. Publish only aggregate educational results, avoiding student names, device contents or sensitive asset details.",
          "Agree the practical arrangements in writing before the drive is announced, so contributors and staff receive one consistent message. Confirm whether collection is a single pickup, a scheduled drop-off or a staged collection across multiple buildings, and identify who supervises each point. Agree how items will be packed, what protective materials the institution supplies and what the receiving partner expects, including any labelling or inventory format. Clarify who handles items that arrive damaged or outside the accepted list, and record the process so the institution is not left holding an unmanaged pile.",
          "Separate the institution's own costs from any contributor responsibilities. Transport, supervision, packing and specialist handling are real expenses, and a conditional manufacturer return or possible resale value does not by itself fund the drive. Ask the receiving partner which activities and records are included in any agreed fee, and compare proposals against the same scope rather than assuming the lowest transport charge covers every obligation. A recycling payment or service fee does not itself establish compliance or turn a collection event into a guaranteed revenue line. Keep receipts, quotes and any agreed cost-sharing terms with the collection records so the bursar's office can reconcile what was actually spent.",
        ],
      },
      {
        heading: "Run the drive with student involvement but no disassembly",
        paragraphs: [
          "Give students supervised, non-dismantling work: sorting illustrations, inventory exercises, acceptance-list checks and discussions of material recovery and hazards. Real waste equipment can contain stored energy, sharp components and confidential information, so keep it in the access-controlled store and out of student handling. Frame the drive as responsible disposal education rather than a competition to collect the most items, and explain why informal or damaged items are excluded.",
          "Design the student role as a supervised contribution rather than independent collection. Brief students on the acceptance criteria, safe handling limits and the distinction between campus-owned assets and community contributions before the drive opens, and have a staff member sign off each collection point. Use simple exercises that require no contact with the equipment itself, such as matching devices to material streams, completing inventory rows under supervision or explaining to families why certain items are excluded. Never assign a student to transport, stack or open a device, and keep any hands-on activity strictly within the agreed non-dismantling scope.",
          "Use the drive to teach the difference between reuse, refurbishment and recycling, since students often encounter these terms interchangeably. Explain that a working device sent for refurbishment follows a different route from one sent for material recovery, and that both are preferable to landfill when arranged through a verified partner. Discuss why damaged batteries, CRT displays and mixed electronics need specialist handling rather than ordinary waste collection, and invite the IT team to describe the downstream evidence the institution receives. Publishing only aggregate educational results keeps the session focused on learning without exposing student names, device contents or sensitive asset details.",
        ],
      },
      {
        heading: "Reconcile, report and keep the next cycle honest",
        paragraphs: [
          "After collection, reconcile the accepted list against the inventory, record rejected items and explain any exclusions. Keep contributor receipts and institutional asset records separate so a later audit can tell which equipment left under which authority. Store the evidence under the institution's retention and access policy, and restrict sensitive identifiers. If a drive is incomplete or a partner changes, assign a named owner rather than closing the file on an assumption.",
          "Prepare a factual summary for the institution's leadership and the community that states what was collected, what was excluded and what evidence remains outstanding, without inflating the environmental impact or claiming outcomes that have not yet been verified. Report quantities by category and note any reuse, refurbishment or manufacturer return separately from recycling, since these are different downstream routes. Keep the collection records linked to the receiving partner's processing evidence so a later review can trace a consignment, and retain the original acceptance criteria so the next cycle can compare what was promised with what was delivered.",
          "Close the drive with a review that informs the next one. Identify which announcements reached the right contributors, which items were frequently rejected and whether the storage or supervision arrangements worked as planned. Update the acceptance criteria, packing instructions and staff assignment list accordingly, and record any partner changes or evidence gaps with a named owner and a follow-up date. Do not treat a completed collection as proof that every obligation is discharged; outstanding processing evidence, unresolved ownership questions or changed receiving arrangements should remain visible until they are resolved. A well-run next cycle keeps the improvements rather than repeating the same gaps.",
        ],
      },
    ],
    faq: [
      { q: "Can students learn recycling by taking devices apart?", a: "Use supervised, non-dismantling activities such as sorting illustrations, inventory exercises and discussions of material recovery. Actual waste equipment can contain stored energy, sharp components and confidential information." },
      { q: "Can families bring any electrical item to a campus drive?", a: "Only items on the confirmed acceptance list. Explain exclusions, battery handling and collection arrangements in advance so the institution does not become responsible for an unmanaged stockpile." },
      { q: "Does a large campus automatically have producer EPR duties?", a: "Not because of its size or student numbers. Assess the equipment it actually uses and any other relevant activities against current requirements, and seek qualified advice where the facts are unclear." },
      { q: "Should we promise a fundraising total before collection?", a: "Do not. Any recovery value or manufacturer-supported return is conditional. State expected outcomes honestly and explain that a collection event is not itself a guaranteed revenue line." },
    ],
    readerQuestions: [
      { role: "Lab coordinator", q: "A projector is listed as working but has student login history on it. What should we do before it leaves?", a: "Have IT complete approved sanitization for the stored accounts and records, then redeploy or release the unit through the agreed route. Do not involve student volunteers in the data handling, and record the outcome in the asset register." },
      { role: "Faculty advisor", q: "Students want to run a battery drive as a project. What boundaries should we set?", a: "Confirm the receiving partner accepts the battery types and agree packing and transport arrangements. Keep batteries in supervised storage, require trained staff to handle damaged or swollen cells, and exclude them from student collection bins." },
      { role: "Bursar", q: "A sponsor offered to take the old computers for refurbishment. Is that acceptable?", a: "Verify the sponsor's scope, data handling and downstream evidence before authorising release. Agree custody and reporting terms in writing, and keep the arrangement separate from the registered recycling route." },
      { role: "Estate manager", q: "The collection date conflicts with exams. Should we move it?", a: "Reschedule rather than running a supervised store near an exam period. Confirm the new date with the receiving partner and update the acceptance criteria and publicity so contributors are not misled." },
    ],
    related: [
      { label: "Collection service", path: "/pickup/" },
      { label: "Data security encyclopedia", path: "/wiki/technical/data-security-recycling/" },
      { label: "Business compliance roles", path: "/epr-registration-for-businesses/" },
      { label: "Bulk recycling planning", path: "/bulk-e-waste-recycling/" },
    
      { label: "Electronics recycling service", path: "/electronics-recycling/" },
      { label: "E-waste drop-off points in Kochi", path: "/e-waste-drop-off-kochi/" },
      { label: "E-waste center in Kerala", path: "/e-waste-center-in-kerala/" },    ],
    sources: [
      { title: "FAQs under E-Waste (Management) Rules, 2022", href: "https://eprewaste.cpcb.gov.in/assets/PDF/faqewaste.pdf", publisher: "Central Pollution Control Board" },
      { title: "Guidelines for Media Sanitization, SP 800-88 Rev. 2", href: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", publisher: "National Institute of Standards and Technology", note: "Institutional sanitization planning, not mandatory Indian certification." },
      { title: "Battery EPR portal", href: "https://eprbattery.cpcb.gov.in/", publisher: "Central Pollution Control Board" },
    ],
  },
];
