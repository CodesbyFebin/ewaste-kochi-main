import type { DiscoveryGuide } from "./discoveryGuideTypes";
import { SITE_URL } from "./site";

export const LOCATION_GUIDES: DiscoveryGuide[] = [
  {
    slug: "e-waste-recycling-kochi",
    category: "locations",
    title: "E-Waste Recycling in Kochi: Planning a Household Handover",
    description: "Plan a Kochi household electronics handover with apartment access, item sorting, data preparation and confirmed pickup or drop-off arrangements.",
    answer: "For e-waste recycling in Kochi, start with an item list and your exact collection location. Ewaste Kochi reviews pickup requests against equipment, access and route availability. The published office is in Thrippunithura; a Kochi area listing does not identify a separate neighbourhood drop-off counter.",
    sections: [
      {
        heading: "Make an apartment cleanout manageable",
        paragraphs: [
          "A household clearing a cupboard needs a different plan from a building collecting electronics from several flats. For your own items, count devices and photograph their condition. For a shared collection, get association permission, nominate one coordinator and keep each household's items identifiable rather than creating an unattended pile.",
        ],
        bullets: [
          "Describe the floor, lift access and where a vehicle can load.",
          "Confirm who will meet the collector and approve the final item count.",
        ],
      },
      {
        heading: "Choose collection or a confirmed visit",
        paragraphs: [
          "Use the actual starting point when comparing a trip to the Kochi office with pickup. A city name alone cannot establish travel time or whether a bulky television will fit safely in your vehicle. Before travelling, confirm item acceptance, the receiving location, an appointment and any charges; office hours alone are not a drop-off booking.",
        ],
      },
      {
        heading: "Finish preparation before moving devices",
        paragraphs: [
          "Back up needed files and complete the appropriate account-removal and data-erasure process for working personal devices. Flag inaccessible storage for a separate data-handling discussion. Keep electronics dry and intact. Report swollen batteries or broken screens before any movement, and request handling instructions instead of packing damaged items with ordinary chargers.",
        ],
      },
    ],
    faq: [
      { q: "Can one household request collection?", a: "Yes, a small item list can be submitted for review. Confirm feasibility and any costs rather than assuming a dedicated vehicle will be available for one device." },
      { q: "Can I leave the items with building security?", a: "Only after both the building and collector agree. An authorised person should be able to identify the approved items and record what was handed over." },
    ],
    related: [
      { label: "How to schedule e-waste pickup", path: "/how-to-schedule-e-waste-pickup/" },
      { label: "Household pickup service", path: "/home-e-waste-pickup/" },
      { label: "Electronics recycling", path: "/recycling/" },
    ],
    sources: [
      { title: "Pickup planning and feasibility", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
      { title: "Published Kochi office details", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-ernakulam",
    category: "locations",
    title: "E-Waste Recycling in Ernakulam: Specify the Site, Not Just the District",
    description: "Prepare an Ernakulam collection enquiry with precise locality, separate site inventories and clear ownership for mixed household and business equipment.",
    answer: "An Ernakulam recycling enquiry should identify the exact locality and premises, not just the district. Central Ernakulam South and other district locations can involve different collection logistics. Ewaste Kochi's published Kochi office is in Thrippunithura; this guide does not establish additional offices across Ernakulam.",
    sections: [
      {
        heading: "Resolve an ambiguous collection address",
        paragraphs: [
          "Ernakulam South's existing location page describes a mix of homes, small businesses and offices. If that is your collection area, specify the building and entrance. If you mean somewhere else in the district, send its locality and location pin. Do not infer a slot or travel distance from the word Ernakulam alone.",
        ],
      },
      {
        heading: "Keep multiple premises separate on paper",
        paragraphs: [
          "A business clearing a shop, office and storeroom should list each address separately, even if one person owns them all. Record which devices belong to each site and whether someone can authorise release there. Moving everything to a single premises may simplify loading, but only do so after acceptance and safe transport arrangements are agreed.",
        ],
        bullets: [
          "Separate personal electronics from company assets awaiting approval.",
          "Include heavy equipment, stairs and storage-bearing devices in each site's list.",
        ],
      },
      {
        heading: "Match the paperwork to the job",
        paragraphs: [
          "A household may need a simple handover record; an office may need serial-number reconciliation and a documented data-handling scope. State those needs before agreeing the collection. A pickup receipt is not proof that every drive has been sanitised. Availability, charges and any further documentation remain subject to confirmation for the specific enquiry.",
        ],
      },
    ],
    faq: [
      { q: "Does an Ernakulam listing confirm district-wide same-day pickup?", a: "No. Exact location, equipment and route capacity must be reviewed. A district-level page is neither a booking confirmation nor a fixed delivery-time commitment." },
      { q: "Should all sites share one inventory?", a: "Use a master list if helpful, but retain site-level counts and ownership. This makes discrepancies easier to resolve when equipment leaves different premises." },
    ],
    related: [
      { label: "How to get a recycling certificate", path: "/how-to-get-certificate-of-recycling/" },
      { label: "Office pickup service", path: "/office-e-waste-pickup/" },
      { label: "IT asset disposition", path: "/itad/" },
    ],
    sources: [
      { title: "Ernakulam South collection context", href: `${SITE_URL}/locations/ernakulam-south/`, publisher: "Ewaste Kochi", note: "Local premises context, not a scheduling guarantee." },
      { title: "Location coverage and feasibility", href: `${SITE_URL}/locations/`, publisher: "Ewaste Kochi" },
      { title: "Office and documentation enquiries", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-kakkanad",
    category: "locations",
    title: "E-Waste Recycling in Kakkanad: Campus Permissions and Asset Release",
    description: "Plan Kakkanad office or campus electronics clearance around gate permissions, tenant ownership, storage-media decisions and an agreed collection scope.",
    answer: "For Kakkanad offices, including enquiries from Infopark and SmartCity, arrange asset-release approval and site access before requesting collection. A household enquiry needs a simpler item list. Pickup feasibility must be confirmed; the shared Kochi office details do not identify a Kakkanad branch or campus collection counter.",
    sections: [
      {
        heading: "Separate tenant approval from campus access",
        paragraphs: [
          "An IT team's permission to retire laptops does not necessarily authorise a vehicle to enter a managed campus. Ask your facilities contact about visitor registration, loading access and any gate pass. Share the approved entrance and a contact who can resolve access issues. These are planning checks, not claims about any particular campus's rules.",
        ],
      },
      {
        heading: "Define what leaves the office",
        paragraphs: [
          "Make an inventory by asset tag or serial number for company devices. Exclude leased equipment and employee-owned items until the responsible owner approves disposal. If servers or shared storage are involved, have your IT team confirm retirement and retention requirements before equipment is disconnected. Collection should follow that decision, not trigger an improvised shutdown.",
        ],
        bullets: [
          "Record which drives need an agreed sanitisation or destruction process.",
          "Confirm the required handover record and later reporting before booking.",
        ],
      },
      {
        heading: "Keep residential collections proportionate",
        paragraphs: [
          "Residents do not need a corporate asset register to enquire about a laptop or printer. Provide the building, floor, condition and access details instead. Do not add personal devices to an employer's disposal lot without permission. In either setting, confirm acceptance, pricing and timing individually rather than relying on another office's previous arrangement.",
        ],
      },
    ],
    faq: [
      { q: "Is a campus name enough to book pickup?", a: "No. Include your company or building, approved entry point, equipment count and site contact. Vehicle access and a collection slot still need confirmation." },
      { q: "Does office pickup automatically include data destruction?", a: "Do not assume so. Agree the media inventory, method and evidence required before release; the scope may differ from general equipment recycling." },
    ],
    related: [
      { label: "How to destroy hard-drive data", path: "/how-to-destroy-hard-drive-data/" },
      { label: "IT asset disposition", path: "/itad/" },
      { label: "Corporate pickup", path: "/corporate-pickup/" },
    ],
    sources: [
      { title: "Kakkanad homes and IT-office context", href: `${SITE_URL}/locations/kakkanad/`, publisher: "Ewaste Kochi", note: "Used for area and equipment context, not automatic data-handling or timing claims." },
      { title: "Pickup requirements", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-aluva",
    category: "locations",
    title: "E-Waste Recycling in Aluva: Household Batteries and Business Access",
    description: "Prepare Aluva electronics enquiries with separate battery details, safe handling questions and precise access information for homes or airport-corridor offices.",
    answer: "Aluva is listed among Ewaste Kochi's core enquiry areas, but each collection still needs item and scheduling confirmation. Household inverter equipment and office electronics require different preparation. The contact address belongs to the Kochi office in Thrippunithura, not an Aluva storefront or an airport collection facility.",
    sections: [
      {
        heading: "Identify the battery as well as the device",
        paragraphs: [
          "For an old UPS or inverter setup, say whether the battery remains connected and whether it is damaged or leaking. Do not treat a heavy backup battery like a bag of cables. Arrange safe disconnection through a qualified person where needed, and ask for handling instructions before attempting to move equipment downstairs or into a vehicle.",
        ],
      },
      {
        heading: "Describe access rather than a transport landmark",
        paragraphs: [
          "The existing Aluva page includes businesses along the airport corridor. An address described only as near the airport or metro does not establish the actual collection point. Give the premises entrance, contact person and any access restrictions. Do not assume that proximity to public transport makes carrying bulky or damaged electronics a suitable drop-off plan.",
        ],
        bullets: [
          "For homes, identify the floor and whether heavy items need lifting assistance.",
          "For businesses, confirm release approval and the loading location.",
        ],
      },
      {
        heading: "Choose the right disposal scope",
        paragraphs: [
          "List laptops, batteries and peripherals separately so acceptance can be checked by category. A working computer may warrant a reuse assessment, while storage media may need a separate data process. Keep backup copies before release and agree any documentation or valuation in advance. Regional requests beyond the stated collection location must be reviewed separately.",
        ],
      },
    ],
    faq: [
      { q: "Can an inverter battery be included with a laptop enquiry?", a: "List both, but identify the battery type, connection status and condition separately. Collection together is subject to acceptance and the agreed handling plan." },
      { q: "Can I take equipment to an Aluva office?", a: "This guide confirms no Aluva office. Contact the published Kochi office to discuss collection or an explicitly agreed receiving arrangement before travelling." },
    ],
    related: [
      { label: "How to recycle batteries safely", path: "/how-to-recycle-batteries-safely/" },
      { label: "Battery recycling", path: "/battery-recycling/" },
      { label: "Pickup service", path: "/pickup/" },
    ],
    sources: [
      { title: "Aluva household and business collection context", href: `${SITE_URL}/locations/aluva/`, publisher: "Ewaste Kochi", note: "No free collection or fixed timing inferred." },
      { title: "Condition and access information for pickup", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-trivandrum",
    category: "locations",
    title: "E-Waste Recycling in Trivandrum: Institutional Feasibility Planning",
    description: "Assess Trivandrum electronics collection without assuming routine coverage: institutional inventories, release permissions, transport costs and household alternatives.",
    answer: "Trivandrum, also called Thiruvananthapuram, is outside Ewaste Kochi's standard scheduled collection area. Bulk and institutional enquiries are assessed individually; pickup is not promised. The published contact and map identify the Kochi office, not a Trivandrum branch, local recycling plant or walk-in collection centre.",
    sections: [
      {
        heading: "Prepare an institutional enquiry before a deadline",
        paragraphs: [
          "The existing regional page discusses Technopark-area businesses and institutional clearances. For such an enquiry, provide asset counts, equipment categories and the earliest date authorised release is possible. Government or campus teams should complete their own disposal approvals and access checks first. A vendor conversation does not replace an organisation's procurement, retention or security procedures.",
        ],
      },
      {
        heading: "Make the intercity logistics explicit",
        paragraphs: [
          "A dedicated trip from Kochi must be evaluated against volume, the actual route and loading requirements. Request a written scope identifying transport charges, collection responsibilities and any data work. Do not use a generic city-to-city distance as a quotation. Avoid promising a clearance date internally until both approval and collection feasibility are confirmed.",
        ],
        bullets: [
          "Identify storage media that cannot leave without a separately approved process.",
          "State whether equipment is gathered together or spread across campus buildings.",
        ],
      },
      {
        heading: "Treat one household device differently",
        paragraphs: [
          "A single phone does not have the same transport economics as an institutional batch. If collection is not feasible, ask its manufacturer about a current take-back channel or verify a local authorised option. Confirm acceptance directly before visiting. Do not send electronics, especially damaged battery devices, to the Kochi office by unarranged courier.",
        ],
      },
    ],
    faq: [
      { q: "Does a large campus inventory guarantee collection?", a: "No. Volume can support a feasibility assessment, but location, equipment, approvals and available logistics still determine whether an arrangement can be made." },
      { q: "Can the Kochi office hours be used for a Trivandrum visit?", a: "No. Those hours describe the published Kochi office only. No Trivandrum receiving site or local opening hours are confirmed here." },
    ],
    related: [
      { label: "How to comply with e-waste rules", path: "/how-to-comply-with-e-waste-rules/" },
      { label: "Bulk e-waste pickup", path: "/bulk-e-waste-pickup/" },
      { label: "IT asset disposition", path: "/itad/" },
    ],
    sources: [
      { title: "Thiruvananthapuram collection feasibility", href: `${SITE_URL}/locations/thiruvananthapuram/`, publisher: "Ewaste Kochi", note: "Regional scope and institutional context; no route-distance estimate reused." },
      { title: "Published office and documentation enquiries", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-thrissur",
    category: "locations",
    title: "E-Waste Recycling in Thrissur: Trade-Office Data and Batch Planning",
    description: "Plan Thrissur trade-office electronics disposal around POS and DVR data, equipment ownership and intercity collection feasibility without a branch assumption.",
    answer: "Thrissur enquiries are reviewed for feasibility rather than booked onto a standard local collection route. Trade offices should identify data-bearing equipment and approved disposal batches before requesting a quote. Shared contact details refer to Ewaste Kochi's Kochi office; this page does not establish a Thrissur office or drop-off point.",
    sections: [
      {
        heading: "Look beyond the obvious office computer",
        paragraphs: [
          "The existing Thrissur page highlights jewellery and trade-office clearances, including POS systems and security DVRs. These devices may contain customer records or recordings even when they no longer look useful. Have the responsible team review retention requirements and identify storage before release. Do not treat all peripherals as data-free simply because they lack a keyboard.",
        ],
      },
      {
        heading: "Consolidate with ownership intact",
        paragraphs: [
          "If several shops are clearing equipment, prepare a list for each owner before discussing a combined collection. Separate approved assets from leased terminals, repair stock and devices still under review. A consolidated batch may change transport feasibility, but it does not remove each owner's authority to decide what leaves or how its data is handled.",
        ],
        bullets: [
          "Name one loading coordinator while preserving separate owner records.",
          "Confirm serial-number reporting and any destruction evidence in the agreed scope.",
        ],
      },
      {
        heading: "Do not let a shop-refit date become a guarantee",
        paragraphs: [
          "Share your intended clearance window early and ask about route planning and logistics charges. Intercity travel depends on the actual premises and load, not a generic distance from Kochi. Keep an approved storage fallback if the requested date cannot be arranged. A household with one device can instead investigate a verified manufacturer take-back or local option.",
        ],
      },
    ],
    faq: [
      { q: "Is a DVR part of general electronics recycling?", a: "Describe it in the inventory and flag its storage. Equipment acceptance and any required data treatment need confirmation rather than being assumed from the device category." },
      { q: "Will several shops sharing a batch make pickup free?", a: "No price follows automatically from consolidation. Ask for the proposed transport and service costs after the complete equipment list and collection point are reviewed." },
    ],
    related: [
      { label: "How to destroy hard-drive data", path: "/how-to-destroy-hard-drive-data/" },
      { label: "Data destruction service", path: "/data-destruction/" },
      { label: "Business e-waste recycling", path: "/business-e-waste-recycling/" },
    ],
    sources: [
      { title: "Thrissur feasibility and trade-office equipment", href: `${SITE_URL}/locations/thrissur/`, publisher: "Ewaste Kochi", note: "Used for regional scope and POS/DVR context, not mileage or guaranteed service." },
      { title: "Documentation requests", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-recycling-kollam",
    category: "locations",
    title: "E-Waste Recycling in Kollam: Separate Office Electronics from Process Equipment",
    description: "Scope Kollam business clearances by distinguishing office electronics from industrial equipment, with condition checks and confirmed intercity collection logistics.",
    answer: "Kollam is a feasibility-check area, not a standard scheduled pickup location for Ewaste Kochi. Businesses should distinguish ordinary office electronics from production equipment before enquiring. The shared address and map are for the Kochi office only; no Kollam branch, recycling plant or local receiving counter is asserted here.",
    sections: [
      {
        heading: "Define the clearance at a processing business",
        paragraphs: [
          "The existing Kollam page discusses cashew-processing and coir businesses. An office computer from such a business is not the same enquiry as dismantling production machinery. Identify each equipment category, size and visible condition, and flag contamination or attached process components. Do not assume general electronics collection includes industrial dismantling, hazardous residues or the entire contents of a workshop.",
        ],
      },
      {
        heading: "Plan removal without disrupting operations",
        paragraphs: [
          "Have the responsible facilities team decide which equipment is retired and safe to release. State whether qualified disconnection is still needed, whether a vehicle can reach the loading point and whether production activity limits access. Keep business records backed up and list storage-bearing computers separately. Avoid moving heavy or connected equipment merely to obtain a photograph.",
        ],
        bullets: [
          "Separate office IT, loose peripherals and batteries in the enquiry list.",
          "Ask which items are excluded before reserving labour or transport.",
        ],
      },
      {
        heading: "Evaluate the trip using the real starting point",
        paragraphs: [
          "Request a feasibility decision based on your premises, load and proposed date, with any intercity logistics charges stated explicitly. This guide supplies no mileage or travel-time estimate. A household replacing one phone should compare a confirmed local take-back option with the cost and practicality of an arranged handover, rather than assuming a business-scale collection route applies.",
        ],
      },
    ],
    faq: [
      { q: "Can a processing unit request a bulk electronics review?", a: "Yes, submit a category-level inventory for review. Acceptance of office devices does not automatically extend to production machines or contaminated equipment." },
      { q: "Should I transport everything to Kochi first?", a: "No. Confirm acceptance, the receiving location, safe transport requirements and charges before dispatch. A published office address is not permission to deliver an unreviewed load." },
    ],
    related: [
      { label: "How to schedule e-waste pickup", path: "/how-to-schedule-e-waste-pickup/" },
      { label: "Bulk electronics disposal", path: "/bulk-electronics-disposal/" },
      { label: "Electronics recycling", path: "/recycling/" },
    ],
    sources: [
      { title: "Kollam collection feasibility and business context", href: `${SITE_URL}/locations/kollam/`, publisher: "Ewaste Kochi", note: "Only regional feasibility and business context used; distance and comparative proximity claims are not relied on." },
      { title: "Item, condition and loading review", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-drop-off-kochi",
    category: "locations",
    title: "E-Waste Drop-Off in Kochi: Confirm Before You Travel",
    description: "Check acceptance, appointment, receiving location and charges before a Kochi e-waste drop-off; prepare a safe load and a clear handover record.",
    answer: "Ask Ewaste Kochi to confirm a drop-off arrangement before travelling. Its published Kochi office is in Thrippunithura, but an office address does not establish unrestricted walk-in acceptance. Confirm your items, the receiving point, appointment and any charges. This guide does not claim that drop-off is free.",
    sections: [
      {
        heading: "Obtain a receiving plan, not just directions",
        paragraphs: [
          "Send a count and photos of the electronics, including anything broken, unusually heavy or battery-powered. Ask whether the specific load can be received and where the handover should happen. Use the shared Kochi office contact and map for orientation only after that discussion; a regional service page is not evidence of another receiving counter.",
        ],
        bullets: [
          "Confirm the appointment and the person or team expecting the delivery.",
          "Agree any assessment, recycling or handling charges before setting off.",
        ],
      },
      {
        heading: "Decide whether self-transport is sensible",
        paragraphs: [
          "Compare your actual route and return journey with a pickup enquiry. A small intact laptop and a bulky CRT television have different loading needs. Keep screens protected and equipment stable without dismantling it. If a battery is swollen, leaking or damaged, stop the ordinary drop-off plan and request specialist handling advice before transport; do not send it by unarranged courier.",
        ],
      },
      {
        heading: "Keep evidence of the handover",
        paragraphs: [
          "Bring your agreed item list and confirm any changes before unloading. Complete backups and the appropriate data preparation beforehand, or agree a separate media-handling service. Ask what receipt or later documentation can be provided. Leaving a device at an office does not itself demonstrate recycling completion or verified destruction of the information stored on it.",
        ],
      },
    ],
    faq: [
      { q: "Can I arrive during the displayed business hours?", a: "Those are Kochi office hours, not a drop-off appointment or assurance that every item can be received. Confirm a visit for your particular load first." },
      { q: "Can I leave a box outside if nobody is available?", a: "No. Keep possession until an agreed recipient accepts the identified items. Unattended delivery prevents a reliable handover and can create handling problems." },
    ],
    related: [
      { label: "How to recycle a laptop in India", path: "/how-to-recycle-laptop-in-india/" },
      { label: "Electronics recycling", path: "/recycling/" },
      { label: "Arrange pickup instead", path: "/pickup/" },
      { label: "Kochi office contact", path: "/contact/" },
    ],
    sources: [
      { title: "Published Kochi office and contact details", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi", note: "Office details do not establish walk-in acceptance or free drop-off." },
      { title: "Equipment condition and transport planning", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-pickup-service",
    category: "locations",
    title: "E-Waste Pickup Service: From Enquiry to an Agreed Handover",
    description: "Understand pickup feasibility, loading responsibilities, household versus office preparation and the difference between collection and completed recycling.",
    answer: "An e-waste pickup service starts with a review of location, item type, quantity, condition and access. Ewaste Kochi primarily supports Kochi-metro enquiries; other Kerala locations require individual feasibility confirmation. A submitted request is not a confirmed slot, and the shared office details identify Kochi rather than regional branches.",
    sections: [
      {
        heading: "Send enough information to plan the vehicle",
        paragraphs: [
          "A bag of chargers, a household television and an office rack cannot be scheduled from the same description. Include approximate dimensions for bulky items, the floor and lift access, and whether equipment is already disconnected. Flag batteries and broken screens separately. Send useful condition photos without exposing personal files or confidential information on a powered screen.",
        ],
        bullets: [
          "Provide the exact collection point and a reachable handover contact.",
          "Distinguish an enquiry, a proposed slot and a mutually confirmed booking.",
        ],
      },
      {
        heading: "Agree responsibilities before collection day",
        paragraphs: [
          "Ask who handles lifting, packing and any necessary disconnection; do not assume a vehicle booking includes every removal task. Households should obtain building permission where relevant. Offices should approve asset release and any required gate pass. Confirm acceptance, costs, the time window and what happens if the quantity changes, especially for an intercity or multi-site job.",
        ],
      },
      {
        heading: "Close the loop after the vehicle leaves",
        paragraphs: [
          "Reconcile the collected items with your list and retain the handover record. Collection is one stage, not proof of completed recycling or data destruction. If you need later reports, agree their scope and expected process before booking. Keep excluded equipment securely stored and arrange a suitable alternative rather than adding it to the load without approval.",
        ],
      },
    ],
    faq: [
      { q: "Does pickup include a payment for old electronics?", a: "Not automatically. A buyback assessment and a recycling collection are different arrangements. Confirm any valuation, fees and payment terms for the identified items." },
      { q: "How is a collection date confirmed within Kochi?", a: "No. Timing depends on route availability and the reviewed equipment and access requirements. Regional requests outside core coverage need an additional feasibility assessment." },
    ],
    related: [
      { label: "How to schedule e-waste pickup", path: "/how-to-schedule-e-waste-pickup/" },
      { label: "Book a pickup enquiry", path: "/pickup/" },
      { label: "Scheduled pickup service", path: "/scheduled-pickup/" },
      { label: "Office pickup service", path: "/office-e-waste-pickup/" },
    ],
    sources: [
      { title: "Pickup process and feasibility factors", href: `${SITE_URL}/pickup/`, publisher: "Ewaste Kochi" },
      { title: "Core and regional enquiry areas", href: `${SITE_URL}/locations/`, publisher: "Ewaste Kochi" },
    ],
  },
  {
    slug: "e-waste-center-in-kerala",
    category: "locations",
    title: "Choosing an E-Waste Centre in Kerala: Verify Its Role Before Visiting",
    description: "Distinguish a Kerala collection point, business office and processing facility; verify acceptance, current operating status and the onward recycling route.",
    answer: "An e-waste centre in Kerala might be a collection point, an office coordinating pickup or a processing facility; these roles are not interchangeable. Ewaste Kochi publishes a Kochi office in Thrippunithura. That address does not establish a statewide branch network or prove that recycling machinery operates at the office.",
    sections: [
      {
        heading: "Ask what the site actually does",
        paragraphs: [
          "Before travelling, ask whether the location accepts public deliveries, which device categories it handles and whether an appointment is required. A map listing alone cannot confirm current operations or equipment acceptance. If material is transferred elsewhere, ask who receives it next and what handover evidence is available. Do not infer authorisation from a business name containing recycling.",
        ],
        bullets: [
          "Check that any registration or permission shown matches the operator, role and site.",
          "Ask about batteries separately rather than assuming every electronics channel handles them.",
        ],
      },
      {
        heading: "Compare a local option with intercity coordination",
        paragraphs: [
          "For a household, a verified nearby manufacturer take-back channel may avoid a long dedicated journey for one device. For a campus, compare collection scope, loading access and reporting across the whole batch. Ewaste Kochi's location directory distinguishes core Kochi-metro enquiries from regional feasibility checks. Neither a district page nor a successful past collection proves a local branch exists.",
        ],
      },
      {
        heading: "Match evidence to the outcome you need",
        paragraphs: [
          "Ask for a receipt identifying what was accepted, and agree any later recycling or data-treatment documentation before handover. A collection receipt and a destruction report establish different things. Organisations should review current requirements with their responsible compliance team instead of assuming one generic certificate covers every material stream, legal role or internal asset-retirement obligation.",
        ],
      },
    ],
    faq: [
      { q: "Does this guide list verified centres in every district?", a: "No. It explains selection checks and the published Kochi office context. Regional receiving locations, availability and appointments must be confirmed directly." },
      { q: "Does a collection address prove recycler registration?", a: "No. Verify the relevant operator's current documents and activity scope. An office, collection service and processing facility should not be treated as equivalent evidence." },
    ],
    related: [
      { label: "How to comply with e-waste rules", path: "/how-to-comply-with-e-waste-rules/" },
      { label: "How to get a recycling certificate", path: "/how-to-get-certificate-of-recycling/" },
      { label: "Electronics recycling service", path: "/recycling/" },
      { label: "Kochi office contact", path: "/contact/" },
    ],
    sources: [
      { title: "Published Kochi office and documentation scope", href: `${SITE_URL}/contact/`, publisher: "Ewaste Kochi" },
      { title: "Core coverage and regional feasibility directory", href: `${SITE_URL}/locations/`, publisher: "Ewaste Kochi" },
    ],
  },
];
