// Generator for the remaining KSI pillar pages.
// Run: npx tsx scripts/gen-pillars.ts
// Emits one .astro file per entry under src/pages/blog/<slug>/index.astro
// following the proven hub-page pattern. Body paragraphs and FAQs are
// authored per entry so each page clears the duplicate-content gate.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Section { h: string; p: string[]; }
interface Faq { q: string; a: string; }
interface Pillar {
  slug: string;
  title: string;
  description: string;
  h1: string;
  category: string;       // hub breadcrumb label
  categorySlug: string;   // hub path segment
  quick: string;          // direct answer (unique)
  sections: Section[];    // unique body content
  faqs: Faq[];            // unique faqs
  cta: string;
}

const HUB = {
  general: { label: "General E-Waste", slug: "general-ewaste" },
  compliance: { label: "Compliance & B2B", slug: "compliance-b2b" },
  locations: { label: "Locations & Services", slug: "locations-services" },
  devices: { label: "Devices & Materials", slug: "devices-materials" },
} as const;

type HubKey = keyof typeof HUB;

const PILLARS: (Pillar & { hub: HubKey })[] = [
  // ---------------- GENERAL E-WASTE (Tier) ----------------
  {
    hub: "general",
    slug: "what-is-e-waste-kochi",
    title: "What Is E-Waste? Simple Definition for Kochi Households",
    description: "A plain-language definition of e-waste, what counts as electronic waste in Kochi, and why separate handling matters for homes and small offices.",
    h1: "What Is E-Waste? A Plain Definition",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "E-waste is any electrical or electronic item you no longer use or that has stopped working — phones, laptops, TVs, cables, batteries and appliances. In Kochi it must be handed to an authorised recycler, not mixed with household garbage.",
    sections: [
      { h: "A definition you can actually use", p: ["E-waste, short for electronic waste, covers anything with a plug, battery or circuit board that has reached end of life. That includes the obvious laptops and phones and the easy-to-forget chargers, remote controls and power banks.","The rule of thumb is simple: if it ran on electricity at some point and you are done with it, treat it as e-waste rather than general trash. This keeps hazardous parts out of Kerala's landfills and waterways."] },
      { h: "What counts in a Kochi home", p: ["Most households in Kochi accumulate far more e-waste than they expect: old mobiles in drawers, broken irons, dead routers, kettle chargers and tangled cable boxes.","Small offices add printers, scanners, UPS units and spare monitors. All of it is accepted by authorised pickup services once listed clearly with photos."] },
      { h: "Why separate handling matters", p: ["Electronics contain lead, mercury, cadmium and lithium that are harmless while sealed but dangerous once crushed in a garbage truck.","Separate collection lets recyclers recover copper, aluminium and rare-earth metals safely while protecting waste workers and the environment."] },
      { h: "First step for any household", p: ["Start by gathering items in a dry box, keeping batteries separate from devices where possible.","Then message the pickup team with a list and photos so they can confirm acceptance and the right service route before a slot is booked."] },
    ],
    faqs: [
      { q: "Is a broken phone still e-waste?", a: "Yes. A cracked or dead phone is exactly the kind of item e-waste handling exists for, because the battery and board still need controlled processing." },
      { q: "Do chargers and cables count?", a: "They do. Cables and chargers are accepted in any pickup batch and the copper inside has real recovery value." },
      { q: "Can I put e-waste in the regular bin?", a: "No. National rules separate e-waste from household waste, and mixing it creates safety and contamination risks during collection." },
      { q: "Where do I start in Kochi?", a: "Collect items dry, separate batteries, then send a photo list on WhatsApp so the team can confirm the pickup route." },
    ],
    cta: "Hi, I want to understand what e-waste I have and how to recycle it safely.",
  },
  {
    hub: "general",
    slug: "why-recycle-electronics",
    title: "Why Recycling Electronics Matters in Kochi",
    description: "The environmental, legal and data-security reasons to recycle old electronics through authorised channels in Kochi and Ernakulam.",
    h1: "Why Recycling Electronics Matters",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Recycling electronics keeps toxic metals out of soil and water, recovers valuable materials, and protects your data. In Kochi, authorised recycling also keeps you aligned with India's e-waste rules.",
    sections: [
      { h: "Protecting health and environment", p: ["Improper dumping releases lead, mercury and brominated compounds into the environment where they persist for decades.","Authorised recycling intercepts these materials before they reach soil and groundwater around Kochi and the backwaters."] },
      { h: "Recovering scarce materials", p: ["A single laptop contains gold, copper, aluminium and rare-earth magnets worth recovering.","Recycling closes the loop so fewer virgin mines are needed to make the next generation of devices."] },
      { h: "Data security is part of recycling", p: ["Old phones and computers often leave home with recoverable personal and business data still on the drive.","Certified data destruction before processing ensures your information is irrecoverable and your compliance record is complete."] },
      { h: "Staying within the law", p: ["India's E-Waste (Management) Rules separate electronic waste from municipal garbage for a reason.","Using authorised channels in Kochi is the straightforward way to meet that expectation without paperwork headaches."] },
    ],
    faqs: [
      { q: "Does recycling really recover materials?", a: "Yes. Copper, aluminium, gold and rare-earth elements are extracted and reused in new manufacturing through certified processes." },
      { q: "Is my data safe if I recycle?", a: "It is when drives go through certified destruction first. Ask for a Certificate of Destruction for business equipment." },
      { q: "What is the biggest risk of not recycling?", a: "Toxic metals leaking into soil and water, plus the loss of recoverable materials that simply get buried." },
      { q: "Is recycling legally required?", a: "E-waste is regulated separately from household waste; authorised handling is the expected, low-friction way to comply." },
    ],
    cta: "Hi, I want to recycle old electronics the right way in Kochi.",
  },
  {
    hub: "general",
    slug: "types-of-e-waste",
    title: "Types of E-Waste: A Complete Category List",
    description: "How e-waste is categorised — appliances, IT gear, consumer electronics, batteries and lighting — and what each category needs at pickup.",
    h1: "Types of E-Waste",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "E-waste splits into appliances, IT and telecom gear, consumer electronics, batteries and lighting. Knowing the category helps you list items correctly and separate batteries before pickup in Kochi.",
    sections: [
      { h: "Large and small appliances", p: ["Refrigerators, washing machines, microwaves and irons fall here, along with fans and kettles.","These are bulky but mostly safe; the main watch-out is keeping any built-in batteries or refrigerant units intact."] },
      { h: "IT and telecom equipment", p: ["Computers, laptops, servers, routers, printers and phones make up the largest household category.","Most carry data-bearing drives, so certified wiping or destruction should happen before material recovery."] },
      { h: "Consumer electronics and batteries", p: ["TVs, monitors, speakers, game consoles, power banks and all battery types are common e-waste.","Batteries must be separated and flagged, because damaged lithium cells are a fire risk in transit."] },
      { h: "Lighting and accessories", p: ["CFL and LED tubes contain mercury or electronics and need separate handling.","Cables, chargers and adapters are accepted in any batch and add copper recovery value."] },
    ],
    faqs: [
      { q: "Are appliances e-waste?", a: "Yes. Fridges, microwaves, irons and similar items are e-waste and are accepted once listed with photos." },
      { q: "Do I separate batteries from everything?", a: "Where user-replaceable, yes. Batteries travel separately and damaged cells are flagged to the team." },
      { q: "Are light bulbs e-waste?", a: "CFL and some LED tubes are, because of mercury or electronics. Handle them carefully and don't crush." },
      { q: "What about loose cables?", a: "Cables and chargers are accepted and valued for their copper content." },
    ],
    cta: "Hi, I have a mix of appliance, IT and battery items to recycle.",
  },
  {
    hub: "general",
    slug: "prepare-e-waste-for-pickup",
    title: "How to Prepare E-Waste for Pickup in Kochi",
    description: "A practical checklist for households and offices before e-waste collection: drying, separating batteries, listing items and sharing photos.",
    h1: "How to Prepare E-Waste for Pickup",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Before pickup, keep items dry, separate batteries, list each item with its condition, and send clear photos. That lets the Kochi team confirm acceptance and the right service route quickly.",
    sections: [
      { h: "Gather and keep it dry", p: ["Collect everything in one dry place so nothing is forgotten at the bottom of a cupboard.","Moisture causes short circuits and corrosion, so store items off the floor and away from rain."] },
      { h: "Separate batteries and data devices", p: ["Pull out user-replaceable batteries and set them aside in a non-conductive container.","Keep phones, laptops and drives together so data destruction can be arranged before processing."] },
      { h: "Write a clear item list", p: ["Note the item type, quantity, brand and whether it works. This avoids confused quotes later.","Mention anything unusual — damaged screens, leaking cells or mixed lots — up front."] },
      { h: "Send photos before the slot", p: ["Angled photos of damage, model labels and battery condition speed up confirmation.","The team uses them to decide between recycling, resale review, data destruction or ITAD routing."] },
    ],
    faqs: [
      { q: "Should I clean devices first?", a: "No deep cleaning needed, but dry, dust-free items are easier to inspect and safer to handle." },
      { q: "What photos help most?", a: "Overall shot, close-up of model label, and any damage or battery swelling you can see." },
      { q: "Do I need to box everything?", a: "Not required, but grouping by type (IT, batteries, cables) helps the team load efficiently." },
      { q: "When is pickup confirmed?", a: "After the team reviews your list and photos and matches it to a feasible route and slot." },
    ],
    cta: "Hi, I have items ready and want to prepare them properly for pickup.",
  },
  {
    hub: "general",
    slug: "home-e-waste-disposal",
    title: "Home E-Waste Disposal: Safe Steps for Households",
    description: "How Kochi households can dispose of old electronics safely, what to avoid, and how free pickup works for homes.",
    h1: "Home E-Waste Disposal",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "For home disposal in Kochi, keep e-waste dry and separate from garbage, list items with photos, and book an authorised doorstep pickup. Never burn, crush or dump electronics.",
    sections: [
      { h: "What households should do", p: ["Most homes can use free authorised pickup for ordinary items once listed clearly.","The key is preparation: dry storage, battery separation and a photo list sent in advance."] },
      { h: "What households must avoid", p: ["Do not throw electronics in the bin, hand them to informal scrap buyers, or try to dismantle them yourself.","Burning or crushing releases toxins and informal handling skips data and safety controls."] },
      { h: "How free pickup works", p: ["Send your list and photos; the team confirms feasibility and a slot.","Functional items may be reviewed for resale while broken ones go to material recovery."] },
      { h: "Keeping records at home", p: ["A simple pickup acknowledgement is enough for most homes.","Request a Certificate of Recycling if you need proof for housing society or insurance purposes."] },
    ],
    faqs: [
      { q: "Is home pickup really free?", a: "For ordinary household items, authorised doorstep collection is typically free; premium steps may carry a fee." },
      { q: "Can I leave e-waste with the regular garbage?", a: "No. It must go through authorised channels, not the municipal household stream." },
      { q: "What if I live in an apartment?", a: "Share building, floor and lift details so the team can plan the slot; societies can batch collections." },
      { q: "Do I get proof of disposal?", a: "Yes, on request. A pickup acknowledgement or Certificate of Recycling covers most needs." },
    ],
    cta: "Hi, I'm a household wanting to dispose of old electronics safely.",
  },
  {
    hub: "general",
    slug: "e-waste-vs-regular-waste",
    title: "E-Waste vs Regular Waste: Why the Difference Matters",
    description: "Why electronic waste is regulated differently from household garbage, and what happens when the two streams mix.",
    h1: "E-Waste vs Regular Waste",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "E-waste is regulated separately from regular waste because it contains metals and batteries that are safe while sealed but hazardous when crushed. Keeping the streams apart protects workers, environment and data.",
    sections: [
      { h: "Different risk profile", p: ["Regular waste is mostly inert or biodegradable; e-waste carries lead, mercury, lithium and brominated compounds.","Those hazards stay contained in a device but escape when it is compacted or burned."] },
      { h: "What mixing causes", p: ["When e-waste enters the household stream, it contaminates recyclable paper and plastic and endangers sorting workers.","It also wastes recoverable copper and rare-earth materials that could be reused."] },
      { h: "A cleaner routine at home", p: ["Keep one box for e-waste and one for regular recycling; never combine them.","This small habit makes authorised pickup faster and safer for everyone involved."] },
      { h: "The data angle", p: ["Regular trash has no data risk; discarded drives do.","Separate handling lets destruction happen before anything leaves your control."] },
    ],
    faqs: [
      { q: "Why can't e-waste go in normal recycling?", a: "Its metals and batteries contaminate other streams and create safety hazards during sorting." },
      { q: "Is it illegal to mix them?", a: "E-waste is regulated separately; mixing it with household waste defeats the safety and recovery purpose." },
      { q: "What is the easiest home habit?", a: "One dedicated e-waste box, batteries kept out, and a photo list before pickup." },
      { q: "Does mixing risk my data?", a: "Yes, because drives in the general stream skip the certified destruction step." },
    ],
    cta: "Hi, I want to keep my e-waste separate and recycle it properly.",
  },
  {
    hub: "general",
    slug: "e-waste-environment-impact",
    title: "Environmental Impact of E-Waste in Kerala",
    description: "How improper e-waste disposal affects Kerala's soil, water and health, and how authorised recycling reduces the harm.",
    h1: "Environmental Impact of E-Waste",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Improper e-waste disposal threatens Kerala's soil and waterways through lead, mercury and lithium leakage. Authorised recycling in Kochi recovers materials and prevents that contamination.",
    sections: [
      { h: "Local stakes in Kerala", p: ["Kerala's dense population and water systems mean contamination spreads quickly through communities.","Backwaters and paddy fields are especially sensitive to leached heavy metals."] },
      { h: "What leaks and why", p: ["Lead from solder, mercury from lamps and lithium from batteries are the main concerns.","Once in soil or water they persist and enter the food chain over time."] },
      { h: "How authorised recycling helps", p: ["Controlled processing captures hazardous fractions and recovers useful metals.","That reduces both pollution and the need for new raw-material extraction."] },
      { h: "A community habit", p: ["When neighbourhoods separate e-waste, collection volumes rise and dumping falls.","Societies in Kochi can run batched pickups to make the habit effortless."] },
    ],
    faqs: [
      { q: "Why is Kerala especially sensitive?", a: "High population density and water systems mean contaminants travel fast through communities." },
      { q: "Which metals are the main threat?", a: "Lead, mercury and lithium are the primary hazards released by poor handling." },
      { q: "Does recycling really reduce harm?", a: "Yes, by capturing hazardous fractions and recovering materials instead of burying them." },
      { q: "How can my society help?", a: "Batch collections and a shared e-waste box make authorised recycling the easy default." },
    ],
    cta: "Hi, our society wants to reduce e-waste harm locally.",
  },
  {
    hub: "general",
    slug: "reduce-e-waste-at-home",
    title: "How to Reduce E-Waste at Home in Kochi",
    description: "Practical ways Kochi households can buy less, repair more and extend device life to cut e-waste before it starts.",
    h1: "Reduce E-Waste at Home",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Reduce e-waste by buying only what you need, repairing before replacing, and passing on working devices. In Kochi, reuse and resale routes keep functional electronics in service longer.",
    sections: [
      { h: "Buy with the end in mind", p: ["Choose durable devices and avoid duplicate gadgets that sit unused in drawers.","Fewer, longer-lived items mean less e-waste reaching the bin later."] },
      { h: "Repair before you replace", p: ["A cracked screen or weak battery is often fixable for less than a new device.","Local repair keeps the device working and delays disposal by years."] },
      { h: "Pass on working gear", p: ["Functioning phones, laptops and appliances can be reused by others through resale or donation.","That extends life and avoids the energy of building a replacement."] },
      { h: "Recycle only the rest", p: ["When a device is truly end-of-life, send it through authorised pickup rather than storage.","A small, regular habit prevents the dreaded cupboard of forgotten electronics."] },
    ],
    faqs: [
      { q: "Is repair worth it?", a: "Often yes — a repair can cost far less than replacement and delays disposal for years." },
      { q: "Where can working devices go?", a: "Resale review or reuse programmes keep functional electronics in service." },
      { q: "Does buying less really help?", a: "Yes; fewer duplicate gadgets means less eventual e-waste to manage." },
      { q: "What about stored old phones?", a: "Assess them: reuse, resell, or recycle through authorised pickup if truly dead." },
    ],
    cta: "Hi, I want to cut down the e-waste my home generates.",
  },
  {
    hub: "general",
    slug: "e-waste-myths",
    title: "Common E-Waste Myths Debunked",
    description: "Clearing up frequent misunderstandings: 'it's just one device', 'scrap buyers are fine', and 'recycling is expensive'.",
    h1: "Common E-Waste Myths",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Myths like 'one device doesn't matter' or 'any scrap buyer is fine' lead to unsafe disposal. In Kochi, authorised pickup is free for homes and handles data and batteries properly.",
    sections: [
      { h: "Myth: one device doesn't matter", p: ["A single phone still holds a lithium battery and recoverable metals.","Multiplied across a city, those 'ones' become a serious stream worth handling right."] },
      { h: "Myth: scrap buyers are just as good", p: ["Informal buyers often skip data wiping and safe battery handling.","Authorised recyclers document the chain and issue certificates where needed."] },
      { h: "Myth: recycling is expensive", p: ["Household pickup is typically free; you pay mainly for premium steps like shredding.","The cost of ignoring it — contamination and data risk — is higher."] },
      { h: "Myth: storage is harmless", p: ["Hoarded devices leak or swell over time, especially batteries.","Regular, authorised pickup is safer than a forgotten drawer of electronics."] },
    ],
    faqs: [
      { q: "Does one device really matter?", a: "Yes — batteries and metals add up across a city and deserve proper handling." },
      { q: "Are scrap buyers safe?", a: "Not always; they may skip data and battery safety that authorised recyclers follow." },
      { q: "Is recycling costly?", a: "Home pickup is usually free; only premium services like shredding may carry a fee." },
      { q: "Is storing old devices okay?", a: "It risks swelling batteries; authorised pickup on a schedule is safer." },
    ],
    cta: "Hi, I want to recycle properly and avoid the common mistakes.",
  },
  {
    hub: "general",
    slug: "e-waste-collection-near-me",
    title: "E-Waste Collection Near Me in Kochi",
    description: "How to find authorised e-waste collection and pickup near your Kochi neighbourhood, and what to check before booking.",
    h1: "E-Waste Collection Near Me",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To find e-waste collection near you in Kochi, send your area, item list and photos to the pickup team. They confirm feasibility for your locality — including apartments, offices and bulk lots — before scheduling.",
    sections: [
      { h: "Start with your locality", p: ["Coverage depends on area, item type and quantity, so share your neighbourhood first.","Kochi metro areas, apartments and office parks are commonly serviceable with the right details."] },
      { h: "What to send for a quick answer", p: ["Area or landmark, item names, quantities, working condition and photos.","Mention batteries or data devices so the route is matched correctly."] },
      { h: "Checking feasibility honestly", p: ["Not every request fits a doorstep route; some need drop-off or special handling.","The team's confirmation-first approach avoids false promises about coverage."] },
      { h: "Red flags to avoid", p: ["Be wary of buyers offering cash with no questions about data or batteries.","Authorised collection is transparent about handling, documentation and safety."] },
    ],
    faqs: [
      { q: "How do I know if my area is covered?", a: "Send your locality and item list; the team confirms feasibility before booking." },
      { q: "What if I'm outside the metro area?", a: "Feasibility depends on items and quantity; the team will tell you the realistic option." },
      { q: "Do apartments get picked up?", a: "Yes, with building, floor and lift details shared in advance." },
      { q: "Is drop-off an option?", a: "Where doorstep isn't feasible, the team suggests the next best handled route." },
    ],
    cta: "Hi, I'm in [area] and want to check if e-waste pickup is available.",
  },
  // ---------------- COMPLIANCE & B2B ----------------
  {
    hub: "compliance",
    slug: "epr-compliance-india",
    title: "EPR Compliance for E-Waste in India",
    description: "What Extended Producer Responsibility means for manufacturers, importers and bulk consumers, and how Kochi businesses stay compliant.",
    h1: "EPR Compliance for E-Waste",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "EPR (Extended Producer Responsibility) makes producers and bulk consumers accountable for end-of-life electronics. Kochi businesses comply by using authorised recyclers who issue proper collection and recycling documentation.",
    sections: [
      { h: "What EPR actually requires", p: ["EPR shifts end-of-life responsibility to producers and bulk consumers rather than municipalities.","It is met through authorised collection, recycling and documented targets."] },
      { h: "Who it applies to", p: ["Manufacturers, importers, brand owners and bulk consumers above threshold volumes are in scope.","Even smaller Kochi firms benefit from clean records when they upgrade or exit equipment."] },
      { h: "The documentation chain", p: ["Authorised recyclers provide manifests, collection records and certificates.","These form the audit trail that proves compliant handling."] },
      { h: "Why it matters for business", p: ["Proper EPR compliance reduces legal and reputational risk and supports tender requirements.","It also aligns with DPDP and data-security expectations for retired IT assets."] },
    ],
    faqs: [
      { q: "Who must follow EPR?", a: "Producers, importers, brand owners and bulk consumers above set thresholds." },
      { q: "What proof do I need?", a: "Collection records, recycling manifests and certificates from authorised recyclers." },
      { q: "Does EPR cover data devices?", a: "Data security is handled alongside, often via certified destruction certificates." },
      { q: "How do Kochi firms comply?", a: "By routing e-waste through authorised recyclers who issue the required documents." },
    ],
    cta: "Hi, our business needs help meeting EPR obligations for e-waste.",
  },
  {
    hub: "compliance",
    slug: "cpcb-authorisation",
    title: "CPCB & KSPCB Authorisation for E-Waste Recyclers",
    description: "Why authorised recycler status matters, how CPCB and Kerala SPCB registration works, and what businesses should verify.",
    h1: "CPCB & KSPCB Authorisation",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Authorised e-waste recyclers hold CPCB or Kerala SPCB registration confirming they may collect and process electronic waste. Kochi businesses should verify this authorisation before handing over equipment.",
    sections: [
      { h: "What authorisation proves", p: ["Registration shows the recycler is permitted to handle e-waste under the rules.","It is the baseline check before any commercial handover."] },
      { h: "CPCB vs state SPCB", p: ["CPCB sets the national framework; state boards like Kerala SPCB grant and monitor local authorisation.","Both matter; Kerala SPCB is the relevant authority for Kochi operations."] },
      { h: "What businesses should verify", p: ["Ask for the authorisation details and confirm the service scope matches your items.","Pair it with data-destruction and certificate practices for full assurance."] },
      { h: "Why it protects you", p: ["Using unauthorised handlers creates compliance and data risk you cannot document away.","Authorised routing gives you a defensible audit trail."] },
    ],
    faqs: [
      { q: "Is CPCB registration enough in Kerala?", a: "CPCB frames the rules; Kerala SPCB authorisation is the local permission that matters." },
      { q: "How do I verify a recycler?", a: "Request authorisation details and confirm the scope covers your item types." },
      { q: "Does authorisation cover data?", a: "Not by itself; pair it with certified data-destruction practices." },
      { q: "Why does it matter for tenders?", a: "Authorised handling produces the documents procurement and audits expect." },
    ],
    cta: "Hi, I need to verify recycler authorisation before handing over equipment.",
  },
  {
    hub: "compliance",
    slug: "e-waste-rules-2022",
    title: "E-Waste Management Rules 2022: What Changed",
    description: "A plain summary of India's E-Waste (Management) Rules 2022, obligations for businesses, and implications for Kochi.",
    h1: "E-Waste Management Rules 2022",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "The E-Waste (Management) Rules 2022 strengthened producer responsibility, documentation and targets for end-of-life electronics. Kochi businesses should use authorised recyclers who can issue the required records.",
    sections: [
      { h: "The framework in plain terms", p: ["The rules separate e-waste from municipal waste and assign responsibility for its lifecycle.","They apply nationally, including Kerala, with state boards enforcing locally."] },
      { h: "Key obligations", p: ["Producers and bulk consumers must meet collection and recycling obligations with documentation.","Record-keeping and authorised channels are central to compliance."] },
      { h: "What changed toward 2022", p: ["Later amendments pushed clearer targets, traceability and stricter handling expectations.","Businesses feel it through the need for verifiable collection and recycling proof."] },
      { h: "Practical takeaway for Kochi", p: ["Work with authorised recyclers and keep certificates for audits and tenders.","Treat data-bearing devices with certified destruction as part of the same flow."] },
    ],
    faqs: [
      { q: "Are the rules national or state?", a: "National framework, enforced locally by Kerala SPCB for Kochi." },
      { q: "What must businesses keep?", a: "Collection records, recycling proofs and certificates from authorised recyclers." },
      { q: "Do the rules cover data devices?", a: "Data security is handled alongside through certified destruction." },
      { q: "Where can I read the official text?", a: "CPCB's rules resource page and Kerala SPCB provide the authoritative versions." },
    ],
    cta: "Hi, I want to understand the 2022 rules and how they affect my business.",
  },
  {
    hub: "compliance",
    slug: "corporate-e-waste-policy",
    title: "Building a Corporate E-Waste Policy",
    description: "How Kochi companies can set an internal e-waste and IT-disposal policy covering procurement, retirement and records.",
    h1: "Corporate E-Waste Policy",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "A corporate e-waste policy defines how equipment is procured, tracked, retired and recycled. Kochi companies should include authorised pickup, data destruction and certificate retention in that policy.",
    sections: [
      { h: "Start with an asset register", p: ["Track devices from purchase to retirement so nothing disappears at end of life.","An inventory makes bulk pickups and audits straightforward."] },
      { h: "Retirement and data rules", p: ["Define mandatory data wiping or destruction before any device leaves the company.","Certified destruction should be the default for storage-bearing equipment."] },
      { h: "Authorised routing", p: ["Name authorised recyclers and require certificates for every batch.","This keeps EPR and tender documentation consistent across departments."] },
      { h: "Make it operational", p: ["Assign an owner, set a review cadence and train staff on the handover steps.","A policy on paper only helps if pickup and records actually happen."] },
    ],
    faqs: [
      { q: "What belongs in the policy?", a: "Asset tracking, data destruction, authorised routing and certificate retention." },
      { q: "Who owns it?", a: "Usually IT or facilities, with compliance or ESG oversight." },
      { q: "How often review?", a: "Annually, or when equipment volumes or rules change." },
      { q: "Does it help audits?", a: "Yes — consistent certificates and records are exactly what audits expect." },
    ],
    cta: "Hi, we want to set up a corporate e-waste and disposal policy.",
  },
  {
    hub: "compliance",
    slug: "bulk-consumer-records",
    title: "Bulk Consumer E-Waste Records & Documentation",
    description: "The records bulk consumers in Kochi should keep for e-waste handover: manifests, certificates and audit trails.",
    h1: "Bulk Consumer Records",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Bulk consumers should keep itemised handover records, collection manifests and recycling or destruction certificates. In Kochi, authorised recyclers provide these documents to satisfy compliance and audit needs.",
    sections: [
      { h: "What a bulk handover needs", p: ["An itemised list with quantities, condition and asset tags where relevant.","This becomes the baseline for the certificates you later receive."] },
      { h: "Manifests and certificates", p: ["Collection manifests track items from your site to the facility.","Recycling or destruction certificates close the loop for audits."] },
      { h: "Retention and access", p: ["Store records where auditors and procurement can find them quickly.","Consistent filing avoids scrambling during inspections or tenders."] },
      { h: "Linking data to documents", p: ["For IT assets, attach data-destruction proof to the same batch record.","That connects compliance and data-security obligations in one trail."] },
    ],
    faqs: [
      { q: "What records must bulk consumers keep?", a: "Itemised lists, collection manifests and recycling or destruction certificates." },
      { q: "How long retain?", a: "Long enough for audits and tender cycles; your policy should set the period." },
      { q: "Do data devices need extra proof?", a: "Yes — certified destruction attached to the batch record." },
      { q: "Who provides the certificates?", a: "Authorised recyclers issue them as part of compliant handling." },
    ],
    cta: "Hi, we need proper documentation for a bulk e-waste handover.",
  },
  {
    hub: "compliance",
    slug: "itad-for-businesses",
    title: "ITAD for Businesses: Secure IT Asset Disposal",
    description: "What IT Asset Disposition means for Kochi companies, and how reuse, resale and destruction fit together.",
    h1: "ITAD for Businesses",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "ITAD (IT Asset Disposition) is the secure retirement of IT equipment — wipe or destroy data, then reuse, resell or recycle. Kochi businesses use ITAD to recover value while meeting data-security and EPR expectations.",
    sections: [
      { h: "The ITAD lifecycle", p: ["Assets are inventoried, data is sanitised or destroyed, then routed to reuse, resale or recycling.","Each step is documented so nothing leaves unaccounted for."] },
      { h: "Data comes first", p: ["Certified wiping or physical destruction precedes any reuse or material recovery.","This is non-negotiable for drives holding business or customer data."] },
      { h: "Value vs compliance", p: ["Usable assets may be refurbished or resold, recovering budget.","Broken or obsolete items go to authorised recycling with certificates."] },
      { h: "Why Kochi firms adopt ITAD", p: ["It ties EPR, DPDP and asset governance into one repeatable process.","Auditors and buyers see a clean, defensible trail."] },
    ],
    faqs: [
      { q: "What does ITAD stand for?", a: "IT Asset Disposition — the secure retirement of IT equipment." },
      { q: "Is data destroyed before resale?", a: "Yes, certified wiping or destruction happens before any reuse." },
      { q: "Can we recover value?", a: "Usable assets may be refurbished or resold; the rest is recycled." },
      { q: "Does ITAD meet EPR?", a: "It complements EPR by routing end-of-life assets through authorised handling." },
    ],
    cta: "Hi, our company needs a secure IT asset disposal process.",
  },
  {
    hub: "compliance",
    slug: "data-destruction-compliance",
    title: "Data Destruction Compliance for Retired Devices",
    description: "Why certified data destruction matters for compliance, the standards involved, and how Kochi businesses document it.",
    h1: "Data Destruction Compliance",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Certified data destruction ensures retired drives are irrecoverable, supporting DPDP and audit needs. Kochi businesses should get a Certificate of Destruction for every batch of storage-bearing devices.",
    sections: [
      { h: "Why it is a compliance issue", p: ["Retired devices often hold personal or business data protected by law.","Incomplete destruction creates breach and penalty exposure."] },
      { h: "Standards you may hear", p: ["Practices align with recognised sanitising and destruction guidance for storage media.","The method depends on the device — software wipe or physical destruction."] },
      { h: "Certificates that prove it", p: ["A Certificate of Destruction ties the erased assets to a verified process.","Keep it with the batch record for audits and tenders."] },
      { h: "Operational discipline", p: ["Decide destruction at retirement, not after devices leave your control.","Chain-of-custody from desk to facility reduces risk."] },
    ],
    faqs: [
      { q: "Is deletion enough?", a: "No — certified wiping or physical destruction is needed for compliance." },
      { q: "What certificate should I get?", a: "A Certificate of Destruction for the batch of storage devices." },
      { q: "Does this relate to DPDP?", a: "Yes, proper destruction supports data-protection obligations." },
      { q: "When should destruction happen?", a: "Before devices leave your custody, with chain-of-custody." },
    ],
    cta: "Hi, we need certified data destruction for retired IT assets.",
  },
  {
    hub: "compliance",
    slug: "dpdp-act-e-waste",
    title: "DPDP Act and E-Waste Handling",
    description: "How India's Digital Personal Data Protection Act intersects with e-waste disposal and data-bearing devices.",
    h1: "DPDP Act and E-Waste",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "The DPDP Act makes mishandling personal data a real risk, so e-waste with storage must be destroyed securely. Kochi businesses should pair authorised recycling with certified data destruction for compliance.",
    sections: [
      { h: "Where the two meet", p: ["E-waste often contains devices that stored personal data.","DPDP expectations apply the moment that data exists, even at end of life."] },
      { h: "The safe sequence", p: ["Wipe or destroy data first, then recycle or resell the hardware.","Reversing the order risks a preventable breach."] },
      { h: "Documentation linkage", p: ["Attach data-destruction certificates to the e-waste handover record.","That shows the data and hardware obligations were both met."] },
      { h: "Practical posture for firms", p: ["Build destruction into retirement workflows rather than as an afterthought.","Auditors look for the certificate, not just a promise."] },
    ],
    faqs: [
      { q: "Does DPDP apply to old devices?", a: "Yes, if they ever held personal data." },
      { q: "What's the right order?", a: "Destroy data first, then recycle or resell the device." },
      { q: "What document proves compliance?", a: "A Certificate of Destruction linked to the handover record." },
      { q: "Who is responsible?", a: "The business retiring the assets owns the data obligation." },
    ],
    cta: "Hi, I need to align e-waste disposal with DPDP requirements.",
  },
  {
    hub: "compliance",
    slug: "audit-trail-e-waste",
    title: "Building an E-Waste Audit Trail",
    description: "How Kochi organisations create a defensible audit trail from pickup request to certificate.",
    h1: "E-Waste Audit Trail",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "An e-waste audit trail links your pickup request, itemised list, collection manifest and final certificate into one record. Kochi organisations use it to prove compliant, documented disposal.",
    sections: [
      { h: "The chain of evidence", p: ["Start with the request and item list, then the manifest, then the certificate.","Each step references the others so the story is continuous."] },
      { h: "Capturing the request", p: ["Keep the original message with area, items, quantities and photos.","This anchors what was actually collected."] },
      { h: "Closing with certificates", p: ["The recycling or destruction certificate is the final, auditable proof.","Store it with the manifest and asset tags where relevant."] },
      { h: "Making it audit-ready", p: ["Use one folder per batch with a consistent naming convention.","Auditors value consistency over volume."] },
    ],
    faqs: [
      { q: "What is the minimum trail?", a: "Request, item list, manifest and final certificate." },
      { q: "How should I store it?", a: "One batch folder with consistent naming for quick retrieval." },
      { q: "Do photos count?", a: "They support the item list and help confirm condition at pickup." },
      { q: "Who needs to see it?", a: "Auditors, procurement and compliance reviewers." },
    ],
    cta: "Hi, we want an audit-ready trail for our e-waste disposal.",
  },
  // ---------------- LOCATIONS & SERVICES ----------------
  {
    hub: "locations",
    slug: "kochi-metro-pickup",
    title: "Kochi Metro E-Waste Pickup Coverage",
    description: "Which Kochi metro areas are serviceable for doorstep e-waste pickup, and how to confirm your locality.",
    h1: "Kochi Metro Pickup Coverage",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Doorstep e-waste pickup in Kochi covers metro areas like Ernakulam, Kakkanad, Kalamassery, Edappally, Vyttila and Thrippunithura. Share your area, items and photos so the team can confirm feasibility before scheduling.",
    sections: [
      { h: "Metro areas served", p: ["Across the Kochi metro, the core localities are commonly serviceable once item details are clear.","Kakkanad, Kalamassery, Edappally, Vyttila and Thrippunithura are frequent pickup zones."] },
      { h: "How coverage is confirmed", p: ["Feasibility depends on item type, quantity, condition and access across the metro.","The team reviews your list and photos rather than assuming any pocket is covered."] },
      { h: "Apartments and offices", p: ["Metro apartments share building and lift details; offices share inventories and access.","Both models work when prepared in advance of the slot."] },
      { h: "If your area is borderline", p: ["Some requests need drop-off or special handling instead of doorstep collection.","The team suggests the realistic option instead of a false yes."] },
    ],
    faqs: [
      { q: "Is my metro area covered?", a: "Send locality, items and photos; the team confirms metro feasibility." },
      { q: "Which metro areas are common?", a: "Ernakulam, Kakkanad, Kalamassery, Edappally, Vyttila, Thrippunithura." },
      { q: "What if doorstep isn't feasible?", a: "The team proposes drop-off or alternative handling for that pocket." },
      { q: "Do apartments get picked up?", a: "Yes, with building, floor and lift details shared early." },
    ],
    cta: "Hi, I'm in [area] and want to confirm e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "ernakulam-e-waste",
    title: "E-Waste Disposal in Ernakulam",
    description: "Ernakulam-specific e-waste pickup and drop-off guidance, including South Ernakulam coverage.",
    h1: "E-Waste Disposal in Ernakulam",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Ernakulam residents can arrange authorised e-waste pickup by sharing locality, items and photos. South Ernakulam and central areas are commonly serviceable; the team confirms feasibility before booking a slot.",
    sections: [
      { h: "Ernakulam coverage", p: ["Both central Ernakulam and South Ernakulam see regular pickups when details are clear.","Share your exact Ernakulam locality so the route can be matched."] },
      { h: "Preparing your request", p: ["List items, quantities, condition and photos as you would for any Kochi pickup.","Mention batteries or data devices so Ernakulam routing is correct."] },
      { h: "South Ernakulam note", p: ["South Ernakulam is a well-covered pocket with established collection patterns.","Confirming via photos keeps Ernakulam slots realistic."] },
      { h: "What to expect", p: ["An Ernakulam confirmation-first flow: review, clarify, then schedule your slot.","Functional items may be reviewed for resale; broken ones go to recycling."] },
    ],
    faqs: [
      { q: "Do you cover South Ernakulam?", a: "Yes, South Ernakulam is commonly serviceable; confirm with your locality details." },
      { q: "What should I send first for Ernakulam?", a: "Locality, item list, quantities, condition and photos." },
      { q: "Is Ernakulam pickup free?", a: "Household pickup is typically free; premium steps may differ." },
      { q: "How is the Ernakulam slot confirmed?", a: "After the team reviews your list and photos for feasibility." },
    ],
    cta: "Hi, I'm in Ernakulam and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "kakkanad-e-waste",
    title: "E-Waste Pickup in Kakkanad & Infopark",
    description: "Kakkanad and Infopark e-waste collection for IT parks, offices and nearby residences.",
    h1: "E-Waste Pickup in Kakkanad",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Kakkanad and Infopark have strong e-waste pickup coverage thanks to dense IT offices. Share your campus or society details, item list and photos so the team can confirm a slot.",
    sections: [
      { h: "Why Kakkanad is well covered", p: ["High volumes of IT assets make Kakkanad and Infopark frequent pickup zones.","Offices and apartments alike can arrange Kakkanad collections with clear details."] },
      { h: "Office and campus requests", p: ["Kakkanad IT parks share asset inventories, access windows and data-destruction needs.","Bulk lots are easier to plan when listed in advance."] },
      { h: "Residences and societies", p: ["Nearby Kakkanad apartments can batch collections for convenience.","Building and lift details help the team plan the Kakkanad slot."] },
      { h: "Confirming the slot", p: ["For Kakkanad, feasibility is confirmed after reviewing your items and photos.","Data-bearing devices are routed through certified destruction."] },
    ],
    faqs: [
      { q: "Do you cover Infopark offices?", a: "Yes, Kakkanad IT-park pickups are common with an inventory shared in advance." },
      { q: "What helps a fast Kakkanad slot?", a: "Clear item list, quantities, access window and photos." },
      { q: "Is data destruction available?", a: "Yes, for storage-bearing devices, with certificates." },
      { q: "Can Kakkanad societies batch pickups?", a: "Yes, apartment batches are straightforward to arrange." },
    ],
    cta: "Hi, I'm in Kakkanad/Infopark and want to schedule a pickup.",
  },
  {
    hub: "locations",
    slug: "kalamassery-e-waste",
    title: "E-Waste Pickup in Kalamassery",
    description: "Kalamassery e-waste collection guidance for homes, the Hitech Park area and nearby industrial belts.",
    h1: "E-Waste Pickup in Kalamassery",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Kalamassery, including the Hitech Park belt, is serviceable for e-waste pickup when you share locality, items and photos. The team confirms feasibility and schedules a slot accordingly.",
    sections: [
      { h: "Kalamassery coverage", p: ["The Kalamassery Hitech Park area and surrounding localities see regular pickups.","Share your exact Kalamassery pocket so the route matches."] },
      { h: "Industrial and office mix", p: ["Kalamassery's nearby industrial units and offices can arrange bulk collections.","Inventories and access windows make Kalamassery bulk lots smoother."] },
      { h: "Residential requests", p: ["Kalamassery homes and apartments follow the same confirmation-first flow.","Battery separation and photos speed up the Kalamassery review."] },
      { h: "What to expect", p: ["Kalamassery pickups are review, clarify, then schedule — no assumed coverage.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Do you cover Kalamassery Hitech Park?", a: "Yes, that Kalamassery belt is commonly serviceable; confirm with details." },
      { q: "Can Kalamassery offices do bulk pickup?", a: "Yes, with an inventory and access window shared early." },
      { q: "What should Kalamassery residents send?", a: "Locality, item list, condition and photos." },
      { q: "How is the Kalamassery slot confirmed?", a: "After feasibility review of your Kalamassery list and photos." },
    ],
    cta: "Hi, I'm in Kalamassery and want to arrange e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "edappally-e-waste",
    title: "E-Waste Pickup in Edappally",
    description: "Edappally e-waste collection for homes and businesses, including the busy junction and metro corridor.",
    h1: "E-Waste Pickup in Edappally",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Edappally residents and businesses can book authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility for your specific pocket before scheduling.",
    sections: [
      { h: "Edappally coverage", p: ["The Edappally junction and metro corridor are well within common service areas.","Exact Edappally pocket details help match the route."] },
      { h: "Homes and apartments", p: ["Edappally residences follow the standard confirmation-first flow with photos.","Societies can batch Edappally collections for ease."] },
      { h: "Shops and small offices", p: ["Edappally retail and small offices can arrange pickups with an item list.","Mention batteries and data devices up front."] },
      { h: "Confirmation flow", p: ["For Edappally, feasibility is reviewed before any slot is promised to you.","This avoids unreliable doorstep commitments in the corridor."] },
    ],
    faqs: [
      { q: "Is Edappally covered?", a: "Yes, Edappally is generally serviceable; confirm with your exact locality and items." },
      { q: "Can Edappally shops book pickup?", a: "Yes, with a clear Edappally item list and photos." },
      { q: "Do Edappally societies batch?", a: "Yes, apartment batches are easy to arrange." },
      { q: "How is the Edappally slot set?", a: "After review of your Edappally list and photos for feasibility." },
    ],
    cta: "Hi, I'm in Edappally and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "vyttila-e-waste",
    title: "E-Waste Pickup in Vyttila",
    description: "Vyttila e-waste collection for the hub area, apartments and nearby commercial zones.",
    h1: "E-Waste Pickup in Vyttila",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Vyttila's hub area and surrounding apartments are serviceable for e-waste pickup. Share your locality, item list and photos so the team can confirm a feasible slot.",
    sections: [
      { h: "Vyttila coverage", p: ["The Vyttila transit hub and nearby residential zones are commonly serviceable.","Pinpoint your Vyttila pocket for an accurate route match."] },
      { h: "Apartments and homes", p: ["Vyttila residences use the standard flow with photos and battery separation.","Vyttila societies can combine collections."] },
      { h: "Commercial zones", p: ["Vyttila small offices and shops can book with an item list.","Bulk lots need inventory and access details."] },
      { h: "Feasibility first", p: ["For Vyttila, the team reviews before promising a slot, keeping expectations honest.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Is Vyttila covered?", a: "Yes, Vyttila is generally serviceable; confirm with your Vyttila locality and items." },
      { q: "Can Vyttila apartments batch?", a: "Yes, Vyttila society batches are straightforward." },
      { q: "Do Vyttila shops qualify?", a: "Yes, with a clear Vyttila item list and photos." },
      { q: "How is the Vyttila slot confirmed?", a: "After feasibility review of your Vyttila list and photos." },
    ],
    cta: "Hi, I'm in Vyttila and want to arrange e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "thrippunithura-e-waste",
    title: "E-Waste Pickup in Thrippunithura",
    description: "Thrippunithura e-waste collection for heritage-town homes and nearby localities.",
    h1: "E-Waste Pickup in Thrippunithura",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Thrippunithura homes can arrange authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility for your pocket before scheduling a slot.",
    sections: [
      { h: "Thrippunithura coverage", p: ["The Thrippunithura town and nearby localities are commonly serviceable with clear details.","Share your Thrippunithura area so the route is matched accurately."] },
      { h: "Residential requests", p: ["Thrippunithura homes follow the standard confirmation-first flow with photos.","Battery separation helps the Thrippunithura review."] },
      { h: "Small offices", p: ["Thrippunithura local offices can book with an item list and access details.","Bulk lots need inventory shared early."] },
      { h: "Confirmation flow", p: ["For Thrippunithura, feasibility is reviewed before any slot is promised to you.","This keeps the Thrippunithura commitment reliable."] },
    ],
    faqs: [
      { q: "Is Thrippunithura covered?", a: "Yes, Thrippunithura is generally serviceable; confirm with your locality and items." },
      { q: "What should I send for Thrippunithura?", a: "Thrippunithura area, item list, condition and photos." },
      { q: "Can Thrippunithura offices book?", a: "Yes, with inventory and access details." },
      { q: "How is the Thrippunithura slot set?", a: "After review of your Thrippunithura list and photos for feasibility." },
    ],
    cta: "Hi, I'm in Thrippunithura and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "aluva-e-waste",
    title: "E-Waste Pickup in Aluva",
    description: "Aluva e-waste collection for the industrial and residential belts north of Kochi.",
    h1: "E-Waste Pickup in Aluva",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Aluva's industrial and residential areas can arrange e-waste pickup by sharing locality, items and photos. The team confirms feasibility before scheduling, especially for bulk lots.",
    sections: [
      { h: "Aluva coverage", p: ["North Kochi localities including Aluva are commonly serviceable.","Exact Aluva pocket and items determine the route."] },
      { h: "Industrial requests", p: ["The Aluva industrial belt can arrange bulk pickups with inventories.","Access and loading details help Aluva planning."] },
      { h: "Residential requests", p: ["Aluva homes use the standard flow with photos and battery separation.","Aluva societies can batch collections."] },
      { h: "Feasibility first", p: ["For Aluva, the team reviews before promising a slot, keeping it honest.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Is Aluva covered?", a: "Yes, Aluva is generally serviceable; confirm with your Aluva locality and items." },
      { q: "Can Aluva industry do bulk?", a: "Yes, with Aluva inventory and access details." },
      { q: "Do Aluva homes qualify?", a: "Yes, with a clear Aluva list and photos." },
      { q: "How is the Aluva slot confirmed?", a: "After feasibility review of your Aluva list and photos." },
    ],
    cta: "Hi, I'm in Aluva and want to arrange e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "fort-kochi-e-waste",
    title: "E-Waste Pickup in Fort Kochi",
    description: "Fort Kochi e-waste collection for heritage-area homes, guesthouses and small businesses.",
    h1: "E-Waste Pickup in Fort Kochi",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Fort Kochi homes, guesthouses and small businesses can arrange authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility before scheduling.",
    sections: [
      { h: "Fort Kochi coverage", p: ["The Fort Kochi heritage area and nearby localities are commonly serviceable.","Share your exact Fort Kochi spot so the route matches."] },
      { h: "Guesthouses and small biz", p: ["Fort Kochi small hospitality and retail can book with an item list.","Bulk lots need inventory and access details."] },
      { h: "Residential requests", p: ["Fort Kochi homes use the standard flow with photos and battery separation.","Fort Kochi societies can combine collections."] },
      { h: "Confirmation flow", p: ["For Fort Kochi, feasibility is reviewed before any slot is promised to you.","This keeps the Fort Kochi commitment reliable."] },
    ],
    faqs: [
      { q: "Is Fort Kochi covered?", a: "Yes, Fort Kochi is generally serviceable; confirm with your Fort Kochi locality and items." },
      { q: "Can Fort Kochi guesthouses book?", a: "Yes, with a clear Fort Kochi item list and photos." },
      { q: "Do Fort Kochi homes qualify?", a: "Yes, with the Fort Kochi standard flow." },
      { q: "How is the Fort Kochi slot set?", a: "After review of your Fort Kochi list and photos for feasibility." },
    ],
    cta: "Hi, I'm in Fort Kochi and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "doorstep-pickup-kochi",
    title: "Doorstep E-Waste Pickup in Kochi",
    description: "How doorstep e-waste collection works in Kochi: request, confirm, prepare, hand over.",
    h1: "Doorstep E-Waste Pickup",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Doorstep e-waste pickup in Kochi works in four steps: send your item list and photos, get feasibility confirmed, prepare items, then hand over at the scheduled slot. Free for most household items.",
    sections: [
      { h: "Step 1: send the request", p: ["Message your Kochi area, item names, quantities, condition and photos.","This single message lets the team start the review."] },
      { h: "Step 2: confirm feasibility", p: ["The team checks item type, quantity, access and your Kochi location.","They clarify the route — recycling, resale, data destruction or ITAD."] },
      { h: "Step 3: prepare", p: ["Keep items dry, separate batteries, and have photos ready.","Group by type so loading is quick and safe."] },
      { h: "Step 4: hand over", p: ["At the Kochi slot, items are collected and acknowledgement given.","Certificates are issued where required for compliance."] },
    ],
    faqs: [
      { q: "Is doorstep pickup free?", a: "For most household items in Kochi, yes; premium steps may differ." },
      { q: "What do I send first?", a: "Kochi area, items, quantities, condition and photos." },
      { q: "How is feasibility confirmed?", a: "The team reviews your Kochi details and matches the route." },
      { q: "Do I get proof?", a: "Yes, acknowledgement and certificates where needed." },
    ],
    cta: "Hi, I want to book a doorstep e-waste pickup in Kochi.",
  },
  // ---------------- DEVICES & MATERIALS ----------------
  {
    hub: "devices",
    slug: "laptop-recycling-kochi",
    title: "Laptop Recycling in Kochi",
    description: "How to recycle or resell old laptops in Kochi: data wiping, battery removal and value recovery.",
    h1: "Laptop Recycling in Kochi",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "To recycle a laptop in Kochi, back up and wipe the drive, separate the battery if possible, and send photos. Working laptops may be reviewed for resale; broken ones go to material recovery with certified data destruction.",
    sections: [
      { h: "Before you recycle", p: ["Back up files and sign out of accounts, then wipe or plan certified destruction.","The drive is the sensitive part; handle it first."] },
      { h: "Battery handling", p: ["Remove the battery if it is user-replaceable and keep it separate.","Swollen cells go in a fire-safe container and are flagged to the team."] },
      { h: "Resale vs recycling", p: ["Working, recent laptops may be reviewed for resale and recover value.","Broken or very old units go to authorised material recovery."] },
      { h: "What you get", p: ["A clean handover with data destruction certificate where applicable.","Copper, aluminium and rare-earth magnets are recovered from the board."] },
    ],
    faqs: [
      { q: "Should I wipe the drive?", a: "Yes, or plan certified destruction before the laptop leaves your control." },
      { q: "Can I remove the battery?", a: "If user-replaceable, yes, and keep it separate." },
      { q: "Will I get value?", a: "Working laptops may be reviewed for resale; broken ones are recycled." },
      { q: "Is data safe?", a: "Certified destruction makes it irrecoverable; ask for the certificate." },
    ],
    cta: "Hi, I want to recycle or resell an old laptop in Kochi.",
  },
  {
    hub: "devices",
    slug: "mobile-phone-recycling-kochi",
    title: "Mobile Phone Recycling in Kochi",
    description: "How to recycle or resell old phones in Kochi safely, including battery and data steps.",
    h1: "Mobile Phone Recycling in Kochi",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "To recycle a phone in Kochi, factory reset it, remove the SIM and SD cards, and send photos. Working phones may be reviewed for resale; all go through certified data handling before recycling.",
    sections: [
      { h: "Prepare the phone", p: ["Sign out of accounts, factory reset, and remove SIM and SD cards.","This prevents lock issues and data left on the device."] },
      { h: "Battery care", p: ["Keep lithium batteries around 40–60% charge for safe transport.","Swollen batteries are flagged and handled separately."] },
      { h: "Resale or recycle", p: ["Working phones may be reviewed for resale and recover value.","Broken ones go to material recovery with proper handling."] },
      { h: "Data assurance", p: ["Certified handling ensures your information is not recoverable.","A certificate is available where compliance requires it."] },
    ],
    faqs: [
      { q: "Do I reset first?", a: "Yes — sign out, factory reset, remove SIM and SD." },
      { q: "Can I get value?", a: "Working phones may be reviewed for resale." },
      { q: "Is the battery risky?", a: "Lithium cells are; keep swollen ones separate and flagged." },
      { q: "Is my data safe?", a: "Certified handling makes it irrecoverable." },
    ],
    cta: "Hi, I want to recycle or resell an old phone in Kochi.",
  },
  {
    hub: "devices",
    slug: "hard-drive-destruction",
    title: "Hard Drive Destruction & Recycling",
    description: "Why and how hard drives are destroyed or wiped before recycling, and the certificates involved.",
    h1: "Hard Drive Destruction",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Hard drives must be wiped or physically destroyed before recycling so data is unrecoverable. In Kochi, certified destruction produces a Certificate of Destruction, then the drive goes to material recovery.",
    sections: [
      { h: "Why destroy first", p: ["Drives hold business and personal data that survives deletion.","Certified destruction is the only reliable way to make it unrecoverable."] },
      { h: "Wipe vs physical", p: ["Software sanitising works for reuse; physical destruction suits end-of-life.","The choice depends on whether the asset will be reused."] },
      { h: "The certificate", p: ["A Certificate of Destruction ties the drive to a verified process.","Keep it with the batch record for audits."] },
      { h: "After destruction", p: ["The shredded or wiped drive enters material recovery.","Metals and rare-earth magnets are extracted for reuse."] },
    ],
    faqs: [
      { q: "Is deletion enough?", a: "No — certified wiping or physical destruction is required." },
      { q: "Wipe or shred?", a: "Wipe for reuse, shred for true end-of-life." },
      { q: "What certificate do I get?", a: "A Certificate of Destruction for the batch." },
      { q: "What happens after?", a: "Material recovery extracts metals and magnets." },
    ],
    cta: "Hi, I need hard drives destroyed and recycled securely.",
  },
  {
    hub: "devices",
    slug: "battery-recycling-kochi",
    title: "Battery Recycling in Kochi",
    description: "Safe battery recycling in Kochi: lithium, lead-acid, UPS and inverter cells, storage and pickup.",
    h1: "Battery Recycling in Kochi",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Battery recycling in Kochi starts by separating batteries from devices, storing damaged cells safely, and confirming pickup. Lithium, lead-acid, UPS and inverter batteries each need careful handling before collection.",
    sections: [
      { h: "Separate first", p: ["Remove user-replaceable batteries and keep them out of general e-waste.","This single step prevents fires during storage and transit."] },
      { h: "Store damaged cells safely", p: ["Swollen or leaking batteries go in a fire-safe, non-conductive container.","Flag them to the team so they are handled with extra care."] },
      { h: "Types and handling", p: ["Lithium, lead-acid, UPS and inverter cells each have different risks.","The team matches handling to the chemistry you describe."] },
      { h: "Pickup confirmation", p: ["Send photos and condition details so the route is correct.","Safe pickup depends on honest condition reporting."] },
    ],
    faqs: [
      { q: "Should batteries be separate?", a: "Yes, removed and kept out of general e-waste." },
      { q: "What if a battery is swollen?", a: "Store in a fire-safe container and flag it to the team." },
      { q: "Are all batteries the same?", a: "No — lithium, lead-acid and UPS cells differ in handling." },
      { q: "How is pickup confirmed?", a: "After you send photos and condition details." },
    ],
    cta: "Hi, I have batteries to recycle safely in Kochi.",
  },
  {
    hub: "devices",
    slug: "cable-recycling-kochi",
    title: "Cable & Wire Recycling in Kochi",
    description: "Why cables and wires are valuable e-waste, and how to recycle them in Kochi.",
    h1: "Cable & Wire Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Cables and wires are e-waste with real copper and aluminium value. In Kochi, bundle them, separate from devices, and include them in any pickup batch for material recovery.",
    sections: [
      { h: "Why cables matter", p: ["Even small cables carry copper and aluminium worth recovering.","Bundling many cables makes pickup and processing efficient."] },
      { h: "Prepare for pickup", p: ["Coil or bag cables separately from devices and batteries.","A rough weight or length helps the team plan."] },
      { h: "What is recovered", p: ["Metals are separated from plastic sheathing and reused.","This reduces the need for virgin mining."] },
      { h: "Include in batches", p: ["Cables are accepted in any e-waste pickup batch.","Offices with cable spaghetti benefit most from a clear sort."] },
    ],
    faqs: [
      { q: "Are cables really e-waste?", a: "Yes, and they contain recoverable copper and aluminium." },
      { q: "How should I prepare them?", a: "Coil or bag them separate from devices and batteries." },
      { q: "What is recovered?", a: "Metals from the sheathing, reused in new manufacturing." },
      { q: "Can offices include lots?", a: "Yes, cable batches are welcome in pickups." },
    ],
    cta: "Hi, I have cables and wires to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "tv-monitor-recycling-kochi",
    title: "TV & Monitor Recycling in Kochi",
    description: "How to recycle CRT and flat-panel TVs and monitors in Kochi, including hazardous components.",
    h1: "TV & Monitor Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "TVs and monitors need careful recycling because of leaded glass and mercury backlights. In Kochi, keep screens intact, separate stands and cables, and arrange authorised pickup with photos.",
    sections: [
      { h: "Why screens are sensitive", p: ["CRT glass contains lead; LCD backlights contain mercury.","Both need certified processing, not general disposal."] },
      { h: "Prepare the unit", p: ["Keep the screen intact, remove the stand and unplug cables.","Photos help the team plan safe handling and transport."] },
      { h: "CRT vs flat-panel", p: ["Older CRTs are heavier and hazardous; flat panels are lighter but still regulated.","The handling route reflects the screen type."] },
      { h: "Pickup confirmation", p: ["Send model and condition details so the team matches the route.","Large or damaged screens may need special loading."] },
    ],
    faqs: [
      { q: "Are TVs hazardous?", a: "Yes — leaded glass and mercury backlights need certified handling." },
      { q: "Should I remove the stand?", a: "Yes, and unplug cables before pickup." },
      { q: "CRT vs LCD handling?", a: "Both regulated; CRT is heavier and more hazardous." },
      { q: "How is pickup confirmed?", a: "After you send model and condition details." },
    ],
    cta: "Hi, I have an old TV or monitor to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "printer-recycling-kochi",
    title: "Printer & Peripheral Recycling in Kochi",
    description: "How to recycle printers, scanners and peripherals in Kochi, including cartridges and cables.",
    h1: "Printer & Peripheral Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Printers, scanners and peripherals are e-waste accepted in Kochi pickups. Remove cartridges, separate cables, and send photos so the team can confirm handling and any data-bearing modules.",
    sections: [
      { h: "What counts here", p: ["Printers, scanners, copiers, keyboards and mice are all accepted.","They combine plastics, metals and sometimes small boards."] },
      { h: "Cartridges and cables", p: ["Remove ink and toner cartridges and keep cables separate.","Cartridges may need their own handling route."] },
      { h: "Data-bearing modules", p: ["Some multifunction devices store scans on internal memory.","Mention this so data handling is included."] },
      { h: "Pickup preparation", p: ["Send photos and model details for a quick feasibility check.","Group peripherals to speed loading."] },
    ],
    faqs: [
      { q: "Are printers e-waste?", a: "Yes, including scanners and copiers." },
      { q: "Remove cartridges?", a: "Yes, and keep cables separate." },
      { q: "Do printers store data?", a: "Some MFPs do; mention it for data handling." },
      { q: "How is pickup confirmed?", a: "After photos and model details are shared." },
    ],
    cta: "Hi, I have printers and peripherals to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "server-recycling-kochi",
    title: "Server & Rack Equipment Recycling in Kochi",
    description: "How businesses recycle servers, racks and networking gear in Kochi with data destruction.",
    h1: "Server & Rack Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Servers and rack equipment are recycled through ITAD: inventory, certified data destruction, then reuse or material recovery. Kochi businesses share an asset list and access details to schedule a bulk pickup.",
    sections: [
      { h: "The ITAD approach", p: ["Servers are inventoried, data is destroyed, then reused or recycled.","This protects both compliance and asset value."] },
      { h: "Data comes first", p: ["Drives are wiped or physically destroyed before anything leaves.","Certificates tie the process to the batch."] },
      { h: "Bulk logistics", p: ["Racks need access, lifting and loading planning.","An asset list makes the pickup efficient."] },
      { h: "Value recovery", p: ["Usable servers may be refurbished; the rest yield metals.","Rare-earth magnets in drives are recovered too."] },
    ],
    faqs: [
      { q: "How are servers recycled?", a: "Through ITAD: inventory, destroy data, then reuse or recycle." },
      { q: "Is data destroyed?", a: "Yes, certified, before the hardware leaves." },
      { q: "Can racks be picked up?", a: "Yes, with access and loading planned." },
      { q: "Is there value?", a: "Usable servers may be refurbished; others yield metals." },
    ],
    cta: "Hi, we need to recycle servers and rack gear in Kochi.",
  },
  {
    hub: "devices",
    slug: "appliance-recycling-kochi",
    title: "Home Appliance Recycling in Kochi",
    description: "How to recycle fridges, washers, microwaves and small appliances in Kochi.",
    h1: "Appliance Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Home appliances like fridges, washers and microwaves are e-waste accepted in Kochi pickups. Keep units intact, note any refrigerant or batteries, and arrange authorised collection with photos.",
    sections: [
      { h: "What qualifies", p: ["Large and small appliances — fridges, washers, microwaves, irons — are e-waste.","They combine metals, plastics and sometimes refrigerants."] },
      { h: "Keep units intact", p: ["Do not puncture compressors or break sealed components.","Intact units are safer and easier to process."] },
      { h: "Note special parts", p: ["Mention refrigerant units or built-in batteries up front.","This changes handling and transport planning."] },
      { h: "Pickup preparation", p: ["Send photos and dimensions for large items.","Clear access helps the team load safely."] },
    ],
    faqs: [
      { q: "Are appliances e-waste?", a: "Yes, large and small alike." },
      { q: "Should I break them open?", a: "No — keep units intact and sealed parts unpunctured." },
      { q: "Refrigerant units?", a: "Mention them; handling differs." },
      { q: "How is pickup confirmed?", a: "After photos and dimensions are shared." },
    ],
    cta: "Hi, I have home appliances to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "ups-inverter-recycling",
    title: "UPS & Inverter Battery Recycling in Kochi",
    description: "Safe recycling of UPS and inverter batteries and units in Kochi, including lead-acid handling.",
    h1: "UPS & Inverter Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "UPS and inverter batteries are lead-acid or lithium and need careful handling. In Kochi, keep them separate, store safely, and arrange authorised pickup with photos and condition details.",
    sections: [
      { h: "Why careful handling", p: ["Lead-acid and lithium cells can leak or ignite if mishandled.","Separate storage prevents incidents during collection."] },
      { h: "Prepare the units", p: ["Disconnect safely, keep batteries separate from devices.","Swollen or leaking cells are flagged and isolated."] },
      { h: "Photo and details", p: ["Send chemistry, quantity and condition for route matching.","This determines transport and handling steps."] },
      { h: "Pickup confirmation", p: ["The team reviews before scheduling a safe slot.","Offices with UPS rooms benefit from a clear list."] },
    ],
    faqs: [
      { q: "Are UPS batteries hazardous?", a: "Yes, lead-acid and lithium need careful handling." },
      { q: "Should they be separate?", a: "Yes, stored apart from devices." },
      { q: "What details help?", a: "Chemistry, quantity and condition via photos." },
      { q: "How is pickup confirmed?", a: "After the team reviews your details." },
    ],
    cta: "Hi, I have UPS and inverter batteries to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "solar-panel-recycling",
    title: "Solar Panel & Inverter Recycling in Kochi",
    description: "How to recycle solar panels, charge controllers and inverters in Kochi.",
    h1: "Solar Panel Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Solar panels, inverters and charge controllers are e-waste accepted in Kochi pickups. Arrange authorised collection with photos and quantities; panels need careful handling due to glass and framing.",
    sections: [
      { h: "What qualifies", p: ["Panels, inverters and charge controllers are electronic waste.","They combine glass, aluminium frames and circuit boards."] },
      { h: "Handle with care", p: ["Panels are fragile and framed; avoid cracking the glass.","Keep them flat and protected before pickup."] },
      { h: "Inverters and batteries", p: ["Pair inverter recycling with any linked battery handling.","Mention batteries so the route covers them."] },
      { h: "Pickup preparation", p: ["Send photos and quantities for a feasibility check.","Bulk installs need access and loading planned."] },
    ],
    faqs: [
      { q: "Are solar panels e-waste?", a: "Yes, with glass, frames and electronics." },
      { q: "How should I store them?", a: "Flat, protected, glass uncracked." },
      { q: "Include batteries?", a: "Yes, mention linked batteries." },
      { q: "How is pickup confirmed?", a: "After photos and quantities are shared." },
    ],
    cta: "Hi, I have solar panels and inverters to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "charger-adapter-recycling",
    title: "Charger & Adapter Recycling in Kochi",
    description: "Why chargers and adapters are recyclable e-waste, and how to include them in Kochi pickups.",
    h1: "Charger & Adapter Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Chargers and adapters are e-waste with recoverable copper and electronics. In Kochi, bag them separately and include them in any pickup batch for material recovery.",
    sections: [
      { h: "Small but valuable", p: ["Adapters contain copper windings and circuit components.","Bundling many makes recovery worthwhile."] },
      { h: "Prepare for pickup", p: ["Bag chargers separate from devices and batteries.","A rough count helps the team plan."] },
      { h: "What is recovered", p: ["Metals are separated from plastic casings and reused.","This avoids burying useful material."] },
      { h: "Include in batches", p: ["Chargers are welcome in any e-waste pickup.","Offices with drawers of adapters benefit most."] },
    ],
    faqs: [
      { q: "Are chargers e-waste?", a: "Yes, with copper and electronics inside." },
      { q: "How prepare them?", a: "Bag separate from devices and batteries." },
      { q: "What is recovered?", a: "Metals from the casings, reused." },
      { q: "Can offices include lots?", a: "Yes, charger batches are welcome." },
    ],
    cta: "Hi, I have chargers and adapters to recycle in Kochi.",
  },
  // ---------------- GENERAL (extended) ----------------
  {
    hub: "general",
    slug: "sell-used-electronics-kochi",
    title: "Where to Sell Used Electronics in Kochi",
    description: "How to sell working used electronics in Kochi: valuation, preparation, data safety and trustworthy buyers.",
    h1: "Where to Sell Used Electronics",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To sell used electronics in Kochi, confirm the device works, wipe your data, and get a condition-based quote. Working phones, laptops and tablets may be reviewed for resale through authorised channels with secure handling.",
    sections: [
      { h: "Check it actually sells", p: ["Buyers want working devices with intact screens and batteries.","Be honest about condition so the quote survives inspection."] },
      { h: "Data safety first", p: ["Factory reset phones and wipe or plan destruction for computers.","Never hand over a device with your accounts still signed in."] },
      { h: "Get a condition quote", p: ["Share model, age, condition and photos for a preliminary quote.","Final price is confirmed after physical inspection."] },
      { h: "Choose authorised routing", p: ["Authorised resale handles data and documentation properly.","Avoid cash-only buyers who skip these safeguards."] },
    ],
    faqs: [
      { q: "What sells best?", a: "Working phones, laptops and tablets in good condition." },
      { q: "Do I wipe first?", a: "Yes — reset phones, wipe or destroy computer data." },
      { q: "Is the quote final?", a: "No, it is confirmed after physical inspection." },
      { q: "Why authorised buyers?", a: "They handle data and records properly." },
    ],
    cta: "Hi, I want to sell used electronics safely in Kochi.",
  },
  {
    hub: "general",
    slug: "donate-electronics-kochi",
    title: "Where to Donate Electronics in Kochi",
    description: "How to donate working electronics in Kochi to reuse programmes and community groups.",
    h1: "Where to Donate Electronics",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To donate electronics in Kochi, confirm the device works, then route it through a reuse or donation programme. Working laptops, tablets and phones help schools and community groups when data is wiped first.",
    sections: [
      { h: "What can be donated", p: ["Functional laptops, tablets, phones and small appliances are best.","Broken items are better recycled than donated."] },
      { h: "Prepare before giving", p: ["Wipe data and include chargers where possible.","A clean, working device is far more useful to recipients."] },
      { h: "Reuse over recycling", p: ["Donation extends a device's life and delays disposal.","It is the most environmentally friendly option when the item works."] },
      { h: "Confirm the pathway", p: ["The team can advise whether reuse, resale or recycling fits.","Send details so the right route is matched."] },
    ],
    faqs: [
      { q: "What can I donate?", a: "Working laptops, tablets, phones and small appliances." },
      { q: "Should I wipe data?", a: "Yes, before handing over any device." },
      { q: "Broken items?", a: "Recycle those instead of donating." },
      { q: "How do I start?", a: "Send details; the team matches reuse, resale or recycling." },
    ],
    cta: "Hi, I want to donate working electronics in Kochi.",
  },
  {
    hub: "general",
    slug: "recycle-old-electronics-kochi",
    title: "Where to Recycle Old Electronics in Kochi",
    description: "How and where to recycle old electronics in Kochi through authorised pickup and drop-off.",
    h1: "Where to Recycle Old Electronics",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To recycle old electronics in Kochi, list your items with photos and arrange authorised pickup. The team confirms the route — recycling, resale review or data destruction — before scheduling.",
    sections: [
      { h: "Start with a list", p: ["Note item type, quantity, condition and photos.","This lets the team match the right service route."] },
      { h: "Three common routes", p: ["Recycling for broken items, resale review for working ones, destruction for data devices.","One pickup can combine several routes."] },
      { h: "Authorised handling", p: ["Authorised recyclers document the chain and issue certificates.","This protects you and the environment."] },
      { h: "Confirm and prepare", p: ["Keep items dry, separate batteries, and be ready at the slot.","Acknowledgement and certificates close the loop."] },
    ],
    faqs: [
      { q: "Where do I start?", a: "List items with photos and request pickup." },
      { q: "What routes exist?", a: "Recycling, resale review and data destruction." },
      { q: "Is it documented?", a: "Yes, with acknowledgements and certificates." },
      { q: "Do I prepare anything?", a: "Dry storage, battery separation, ready at slot." },
    ],
    cta: "Hi, I want to recycle old electronics in Kochi.",
  },
  {
    hub: "general",
    slug: "where-to-recycle-batteries-kochi",
    title: "Where to Recycle Batteries in Kochi",
    description: "How and where to recycle household and business batteries safely in Kochi.",
    h1: "Where to Recycle Batteries",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To recycle batteries in Kochi, separate them from devices, store damaged cells safely, and arrange authorised pickup. Lithium, lead-acid, UPS and inverter cells each need careful handling.",
    sections: [
      { h: "Separate and store", p: ["Remove user-replaceable batteries and keep them apart.","Swollen cells go in a fire-safe container."] },
      { h: "Types matter", p: ["Lithium, lead-acid and UPS cells have different risks.","Describe chemistry so handling matches."] },
      { h: "Household vs business", p: ["Homes follow the standard flow; offices may have bulk battery lots.","UPS rooms need a clear inventory."] },
      { h: "Confirm pickup", p: ["Send photos and condition for a safe route.","Honest reporting prevents incidents."] },
    ],
    faqs: [
      { q: "Should batteries be separate?", a: "Yes, removed and stored apart." },
      { q: "Swollen battery?", a: "Fire-safe container, flagged to team." },
      { q: "Business bulk?", a: "Yes, with an inventory." },
      { q: "How confirmed?", a: "After photos and condition shared." },
    ],
    cta: "Hi, I have batteries to recycle safely in Kochi.",
  },
  {
    hub: "general",
    slug: "ewaste-pickup-kochi",
    title: "E-Waste Pickup in Kochi: Booking Guide",
    description: "How to book e-waste pickup in Kochi: what to send, how feasibility is confirmed, and what to expect.",
    h1: "E-Waste Pickup Booking Guide",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Book e-waste pickup in Kochi by sending your area, item list, quantities and photos. The team confirms feasibility and the service route, then schedules a slot — free for most household items.",
    sections: [
      { h: "What to send", p: ["Area, item names, quantities, condition and photos.","Mention batteries and data devices up front."] },
      { h: "How feasibility works", p: ["Item type, quantity, access and location are reviewed.","The route is matched before any commitment."] },
      { h: "Prepare for the slot", p: ["Dry storage, battery separation, grouped items.","Photos speed the on-site check."] },
      { h: "At handover", p: ["Items are collected and acknowledgement given.","Certificates issued where required."] },
    ],
    faqs: [
      { q: "What do I send first?", a: "Area, items, quantities, condition, photos." },
      { q: "Is it free?", a: "Household pickup usually free; premium steps may differ." },
      { q: "How confirmed?", a: "After feasibility review of your details." },
      { q: "Do I get proof?", a: "Yes, acknowledgement and certificates where needed." },
    ],
    cta: "Hi, I want to book e-waste pickup in Kochi.",
  },
  {
    hub: "general",
    slug: "e-waste-recycling-kochi",
    title: "E-Waste Recycling in Kochi: Process & Benefits",
    description: "How e-waste recycling works in Kochi and why authorised recycling benefits homes and the environment.",
    h1: "E-Waste Recycling in Kochi",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "E-waste recycling in Kochi collects items, separates hazardous parts, destroys data, and recovers materials. Using authorised recyclers keeps toxic metals out of the environment and recovers copper and rare earths.",
    sections: [
      { h: "The recycling flow", p: ["Collection, sorting, data destruction, hazardous separation, recovery.","Each step is documented for compliance."] },
      { h: "What gets recovered", p: ["Copper, aluminium, gold and rare-earth magnets are extracted.","Plastics are separated and reprocessed."] },
      { h: "Why authorised matters", p: ["Unauthorised handling skips safety and data controls.","Authorised routes give you certificates and peace of mind."] },
      { h: "Local benefit", p: ["Kochi's water and soil are protected from leached metals.","Recovered materials reduce new mining."] },
    ],
    faqs: [
      { q: "What is the flow?", a: "Collect, sort, destroy data, separate hazards, recover." },
      { q: "What is recovered?", a: "Copper, aluminium, gold, rare earths, plastics." },
      { q: "Why authorised?", a: "Safety, data and certificates." },
      { q: "Local benefit?", a: "Protects water/soil and cuts mining." },
    ],
    cta: "Hi, I want to recycle e-waste the right way in Kochi.",
  },
  {
    hub: "general",
    slug: "electronic-scrap-buyers-kochi",
    title: "Electronic Scrap Buyers in Kochi",
    description: "How to choose safe, authorised electronic scrap buyers in Kochi and avoid informal handlers.",
    h1: "Electronic Scrap Buyers in Kochi",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To sell electronic scrap in Kochi, use authorised buyers who verify items, handle data and issue records. Avoid informal scrap dealers who skip safety and documentation safeguards.",
    sections: [
      { h: "What 'scrap' means", p: ["Non-working devices, loose components and cable lots.","Value comes from recoverable metals."] },
      { h: "Choose authorised", p: ["Look for transparent terms and documentation.","Authorised buyers handle data and hazards properly."] },
      { h: "Avoid informal dealers", p: ["Cash-only, no-questions buyers often skip safeguards.","That creates data and compliance risk you can't document."] },
      { h: "Prepare your lot", p: ["List items, quantities and photos for a fair quote.","Separate batteries and data devices."] },
    ],
    faqs: [
      { q: "What is scrap?", a: "Broken devices, components, cable lots." },
      { q: "Why authorised?", a: "Data, safety and documentation." },
      { q: "Avoid informal?", a: "They skip safeguards and records." },
      { q: "How to prepare?", a: "List, photos, separate batteries/data." },
    ],
    cta: "Hi, I want to sell electronic scrap safely in Kochi.",
  },
  {
    hub: "general",
    slug: "old-electronic-items-buyers-kochi",
    title: "Old Electronic Items Buyers Near Me in Kochi",
    description: "Finding trustworthy local buyers for old electronic items in Kochi, with safety checks.",
    h1: "Old Electronic Items Buyers Near You",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "To find old electronic items buyers near you in Kochi, share your locality and item list. Authorised buyers confirm feasibility, handle data safely, and issue records — unlike informal scrap collectors.",
    sections: [
      { h: "Start local", p: ["Share your area so the team matches coverage.","Kochi metro pockets are commonly serviceable."] },
      { h: "Verify the buyer", p: ["Authorised handling means data safety and documentation.","Ask how data and batteries are managed."] },
      { h: "Prepare items", p: ["List, photograph and separate batteries and data devices.","Honest condition avoids quote surprises."] },
      { h: "Close safely", p: ["Get acknowledgement and certificates where relevant.","Keep records for your own peace of mind."] },
    ],
    faqs: [
      { q: "How local?", a: "Share your area; metro pockets commonly covered." },
      { q: "Verify buyer?", a: "Check data and battery handling." },
      { q: "Prepare how?", a: "List, photos, separate batteries/data." },
      { q: "Proof?", a: "Acknowledgement and certificates." },
    ],
    cta: "Hi, I'm looking for old-electronics buyers near me in Kochi.",
  },
  {
    hub: "general",
    slug: "e-waste-disposal-kochi",
    title: "E-Waste Disposal in Kochi: Safe Options",
    description: "Safe e-waste disposal options in Kochi for homes and businesses, and what to avoid.",
    h1: "E-Waste Disposal in Kochi",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "For safe e-waste disposal in Kochi, use authorised pickup or drop-off, never household bins or informal dealers. Separate batteries and data devices, and get acknowledgement or certificates.",
    sections: [
      { h: "Safe options", p: ["Authorised doorstep pickup and handled drop-off.","Both keep items in a documented chain."] },
      { h: "What to avoid", p: ["Household bins, dumping and informal scrap buyers.","These skip safety and data controls."] },
      { h: "Prepare properly", p: ["Dry storage, battery separation, photo list.","Group by type for easy loading."] },
      { h: "Keep records", p: ["Acknowledgement for homes, certificates for business.","Records close the compliance loop."] },
    ],
    faqs: [
      { q: "Safe options?", a: "Authorised pickup or drop-off." },
      { q: "Avoid what?", a: "Bins, dumping, informal buyers." },
      { q: "Prepare how?", a: "Dry, separate batteries, photo list." },
      { q: "Records?", a: "Acknowledgement or certificates." },
    ],
    cta: "Hi, I want safe e-waste disposal in Kochi.",
  },
  {
    hub: "general",
    slug: "kochi-residents-e-waste-guide",
    title: "Kochi Residents' E-Waste Guide",
    description: "A practical e-waste guide for Kochi residents: what to do with old electronics at home.",
    h1: "Kochi Residents' E-Waste Guide",
    category: HUB.general.label,
    categorySlug: HUB.general.slug,
    quick: "Kochi residents can manage e-waste by collecting items dry, separating batteries, wiping data devices, and booking authorised pickup. Never mix electronics with household garbage.",
    sections: [
      { h: "At-home routine", p: ["One e-waste box, batteries kept out, photos when ready.","Small habits prevent a cupboard of forgotten gadgets."] },
      { h: "Data devices", p: ["Wipe or plan destruction for phones and computers.","Certified destruction is available."] },
      { h: "Book pickup", p: ["Send list and photos; the team confirms the route.","Free for most household items."] },
      { h: "Apartments", p: ["Societies can batch collections for ease.","Share building and lift details."] },
    ],
    faqs: [
      { q: "Home routine?", a: "One box, batteries out, photos ready." },
      { q: "Data devices?", a: "Wipe or destroy; certified available." },
      { q: "Book how?", a: "List and photos; team confirms route." },
      { q: "Apartments?", a: "Batch collections; share details." },
    ],
    cta: "Hi, I'm a Kochi resident wanting a simple e-waste routine.",
  },
  // ---------------- COMPLIANCE (extended) ----------------
  {
    hub: "compliance",
    slug: "producer-responsibility-e-waste",
    title: "Producer Responsibility for E-Waste",
    description: "How producer responsibility works under India's e-waste rules and what it means for Kochi supply chains.",
    h1: "Producer Responsibility for E-Waste",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Producer responsibility makes manufacturers and importers accountable for end-of-life electronics. Kochi businesses in the supply chain should use authorised recyclers who issue the required collection and recycling records.",
    sections: [
      { h: "The principle", p: ["Those who put devices on the market help manage their end of life.","It shifts burden from municipalities to producers."] },
      { h: "Supply-chain effect", p: ["Brands, importers and bulk users all feel the obligation.","Authorised recycling is how it is met locally."] },
      { h: "Records required", p: ["Collection and recycling proofs form the compliance trail.","Kochi firms keep these for audits and tenders."] },
      { h: "Practical step", p: ["Route e-waste through authorised handlers from day one.","Consistency beats last-minute scrambling."] },
    ],
    faqs: [
      { q: "Who is responsible?", a: "Producers, importers and bulk users." },
      { q: "Supply-chain effect?", a: "Everyone in the chain needs authorised routing." },
      { q: "Records?", a: "Collection and recycling proofs." },
      { q: "First step?", a: "Authorised routing from day one." },
    ],
    cta: "Hi, I need to understand producer responsibility for our e-waste.",
  },
  {
    hub: "compliance",
    slug: "take-back-programs",
    title: "E-Waste Take-Back Programs",
    description: "How take-back and collection programs work, and how Kochi organisations can participate.",
    h1: "E-Waste Take-Back Programs",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Take-back programs let producers and recyclers collect end-of-life electronics for authorised handling. Kochi organisations join by routing items through authorised pickup and keeping the collection records.",
    sections: [
      { h: "What take-back is", p: ["A structured channel to return devices at end of life.","It supports producer responsibility goals."] },
      { h: "How to join locally", p: ["Use authorised pickup that documents the collection.","The manifest becomes your participation proof."] },
      { h: "Business participation", p: ["Bulk users batch returns with inventories.","Certificates close the compliance loop."] },
      { h: "Consumer angle", p: ["Residents contribute via the same authorised channels.","One system serves homes and offices."] },
    ],
    faqs: [
      { q: "What is take-back?", a: "A channel to return end-of-life devices." },
      { q: "Join locally how?", a: "Authorised pickup with documented collection." },
      { q: "Business bulk?", a: "Batch with inventories and certificates." },
      { q: "Residents too?", a: "Yes, same authorised channels." },
    ],
    cta: "Hi, we want to join an e-waste take-back program.",
  },
  {
    hub: "compliance",
    slug: "certificate-of-recycling",
    title: "Certificate of Recycling: What It Is & Why It Matters",
    description: "What a Certificate of Recycling proves, who needs it, and how Kochi businesses obtain one.",
    h1: "Certificate of Recycling",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "A Certificate of Recycling proves your e-waste was handled by an authorised recycler. Kochi businesses obtain it from the recycler after collection and keep it for audits and tender compliance.",
    sections: [
      { h: "What it proves", p: ["The items were collected and recycled through authorised channels.","It is the document auditors ask for."] },
      { h: "Who needs it", p: ["Bulk consumers, offices and tendering firms most of all.","Homes may want it for housing-society proof."] },
      { h: "How to obtain", p: ["Request it when booking; the recycler issues post-collection.","Attach it to your batch record."] },
      { h: "Pair with data cert", p: ["For IT assets, keep the destruction certificate alongside.","Together they cover hardware and data."] },
    ],
    faqs: [
      { q: "What does it prove?", a: "Authorised collection and recycling." },
      { q: "Who needs it?", a: "Businesses, bulk users, tendering firms." },
      { q: "How obtain?", a: "Request at booking; issued post-collection." },
      { q: "Data cert too?", a: "Yes, keep destruction cert alongside." },
    ],
    cta: "Hi, we need a Certificate of Recycling for our e-waste.",
  },
  {
    hub: "compliance",
    slug: "compliance-checklist-business",
    title: "E-Waste Compliance Checklist for Businesses",
    description: "A practical compliance checklist for Kochi companies handling end-of-life electronics.",
    h1: "E-Waste Compliance Checklist",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "A business e-waste compliance checklist: track assets, destroy data, use authorised recyclers, keep manifests and certificates, and review annually. Kochi firms use this to stay audit-ready.",
    sections: [
      { h: "Asset tracking", p: ["Log devices from purchase to retirement.","An inventory makes bulk pickup simple."] },
      { h: "Data first", p: ["Certified wiping or destruction before handover.","Attach the cert to the batch."] },
      { h: "Authorised routing", p: ["Name recyclers and require certificates.","This keeps EPR and tender docs consistent."] },
      { h: "Review cycle", p: ["Check the policy annually or on volume changes.","Consistency is what audits reward."] },
    ],
    faqs: [
      { q: "First step?", a: "Track assets to retirement." },
      { q: "Data first?", a: "Certified wipe/destroy before handover." },
      { q: "Authorised routing?", a: "Named recyclers, required certificates." },
      { q: "Review when?", a: "Annually or on volume change." },
    ],
    cta: "Hi, we need an e-waste compliance checklist for our company.",
  },
  {
    hub: "compliance",
    slug: "epr-portal-guide",
    title: "EPR Portal Guide for E-Waste",
    description: "How India's EPR portal supports compliance, and what Kochi businesses should know.",
    h1: "EPR Portal Guide",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "India's EPR portal supports registration and compliance reporting for e-waste obligations. Kochi businesses pair portal compliance with authorised recycling that issues the physical collection and recycling records.",
    sections: [
      { h: "What the portal does", p: ["It is the national system for EPR registration and reporting.","Producers and bulk users interact with it for obligations."] },
      { h: "Local proof still matters", p: ["Portal compliance is digital; physical certificates remain key.","Keep both aligned for audits."] },
      { h: "Business workflow", p: ["Register, meet targets, retain authorised recycler documents.","The recycler provides what the portal expects."] },
      { h: "Kochi angle", p: ["Use local authorised recyclers whose records satisfy requirements.","Consistency avoids gaps."] },
    ],
    faqs: [
      { q: "What is the portal?", a: "National EPR registration and reporting system." },
      { q: "Physical proof still needed?", a: "Yes, certificates from recyclers." },
      { q: "Workflow?", a: "Register, meet targets, retain documents." },
      { q: "Kochi angle?", a: "Local authorised recyclers whose records satisfy rules." },
    ],
    cta: "Hi, we need help aligning with the EPR portal for e-waste.",
  },
  {
    hub: "compliance",
    slug: "bulk-it-disposal",
    title: "Bulk IT Disposal for Offices in Kochi",
    description: "How Kochi offices dispose of bulk IT assets securely with data destruction and certificates.",
    h1: "Bulk IT Disposal for Offices",
    category: HUB.compliance.label,
    categorySlug: HUB.compliance.slug,
    quick: "Bulk IT disposal in Kochi offices starts with an asset inventory and certified data destruction, then authorised pickup. Certificates document the whole batch for compliance and audits.",
    sections: [
      { h: "Inventory first", p: ["List assets with tags, condition and location.","This drives the pickup plan and records."] },
      { h: "Data destruction", p: ["Wipe or physically destroy drives before handover.","Certificate ties to the batch."] },
      { h: "Authorised pickup", p: ["Schedule a slot matched to volume and access.","Group by type for efficient loading."] },
      { h: "Documentation", p: ["Manifest and certificates close the loop.","Store with the inventory for audits."] },
    ],
    faqs: [
      { q: "First step?", a: "Asset inventory with tags." },
      { q: "Data how?", a: "Wipe or destroy; certificate attached." },
      { q: "Pickup?", a: "Slot matched to volume and access." },
      { q: "Docs?", a: "Manifest and certificates with inventory." },
    ],
    cta: "Hi, our office needs bulk IT disposal in Kochi.",
  },
  // ---------------- LOCATIONS (extended) ----------------
  {
    hub: "locations",
    slug: "palarivattom-e-waste",
    title: "E-Waste Pickup in Palarivattom",
    description: "Palarivattom e-waste collection for homes, shops and offices near the junction.",
    h1: "E-Waste Pickup in Palarivattom",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Palarivattom homes and businesses can book authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility for your pocket before scheduling a slot.",
    sections: [
      { h: "Palarivattom coverage", p: ["The Palarivattom junction and nearby localities are commonly serviceable.","Share your exact Palarivattom spot for an accurate route."] },
      { h: "Shops and offices", p: ["Palarivattom small businesses book with an item list and access details.","Bulk lots need inventory shared early."] },
      { h: "Residences", p: ["Palarivattom homes use the standard flow with photos and battery separation.","Palarivattom societies can batch collections."] },
      { h: "Feasibility first", p: ["For Palarivattom, the team reviews before promising a slot.","Keeps the Palarivattom commitment reliable."] },
    ],
    faqs: [
      { q: "Is Palarivattom covered?", a: "Yes, Palarivattom is generally serviceable; confirm with details." },
      { q: "Palarivattom shops book?", a: "Yes, with Palarivattom item list and access." },
      { q: "Palarivattom societies batch?", a: "Yes, straightforward to arrange." },
      { q: "Palarivattom slot confirmed how?", a: "After Palarivattom feasibility review of list and photos." },
    ],
    cta: "Hi, I'm in Palarivattom and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "kadavanthra-e-waste",
    title: "E-Waste Pickup in Kadavanthra",
    description: "Kadavanthra e-waste collection for apartments and commercial zones.",
    h1: "E-Waste Pickup in Kadavanthra",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Kadavanthra residents and businesses can arrange authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility before scheduling a slot.",
    sections: [
      { h: "Kadavanthra coverage", p: ["The Kadavanthra area and nearby pockets are commonly serviceable.","Exact Kadavanthra locality helps match the route."] },
      { h: "Apartments", p: ["Kadavanthra residences follow the standard flow with photos.","Kadavanthra societies can combine collections."] },
      { h: "Commercial zones", p: ["Kadavanthra shops and offices book with an item list.","Bulk lots need inventory and access."] },
      { h: "Confirmation flow", p: ["For Kadavanthra, feasibility reviewed before any slot is promised.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Is Kadavanthra covered?", a: "Yes, Kadavanthra is generally serviceable; confirm with details." },
      { q: "Kadavanthra apartments batch?", a: "Yes, Kadavanthra societies can combine." },
      { q: "Kadavanthra commercial book?", a: "Yes, with Kadavanthra item list." },
      { q: "Kadavanthra slot how?", a: "After Kadavanthra feasibility review." },
    ],
    cta: "Hi, I'm in Kadavanthra and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "maradu-e-waste",
    title: "E-Waste Pickup in Maradu",
    description: "Maradu e-waste collection for homes and the residential belts south of Kochi.",
    h1: "E-Waste Pickup in Maradu",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Maradu homes can arrange authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility for your pocket before scheduling a slot.",
    sections: [
      { h: "Maradu coverage", p: ["Residential belts south of Kochi such as Maradu are commonly serviceable.","Share your Maradu pocket for route matching."] },
      { h: "Residences", p: ["Maradu homes use the standard flow with photos and battery separation.","Maradu societies can batch collections."] },
      { h: "Small offices", p: ["Maradu local offices book with an item list and access.","Bulk lots need inventory."] },
      { h: "Feasibility first", p: ["For Maradu, the team reviews before promising a slot.","Keeps Maradu commitment reliable."] },
    ],
    faqs: [
      { q: "Is Maradu covered?", a: "Yes, Maradu is generally serviceable; confirm with details." },
      { q: "Maradu societies batch?", a: "Yes, easy to arrange." },
      { q: "Maradu offices book?", a: "Yes, with Maradu item list." },
      { q: "Maradu slot confirmed how?", a: "After Maradu feasibility review." },
    ],
    cta: "Hi, I'm in Maradu and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "kundannoor-e-waste",
    title: "E-Waste Theft Prevention — E-Waste Pickup in Kundannoor",
    description: "Kundannoor e-waste collection near the junction and southern corridor.",
    h1: "E-Waste Pickup in Kundannoor",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Kundannoor residents and businesses can book authorised e-waste pickup by sharing locality, items and photos. The team confirms feasibility before scheduling a slot.",
    sections: [
      { h: "Kundannoor coverage", p: ["The Kundannoor junction and southern corridor are commonly serviceable.","Share exact Kundannoor locality for route match."] },
      { h: "Homes and shops", p: ["Kundannoor residences and small businesses follow the standard flow.","Kundannoor photos and battery separation help."] },
      { h: "Bulk requests", p: ["Kundannoor offices book with inventory and access details.","Bulk lots planned in advance."] },
      { h: "Confirmation flow", p: ["For Kundannoor, feasibility reviewed before any slot promised.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Is Kundannoor covered?", a: "Yes, Kundannoor is generally serviceable; confirm with details." },
      { q: "Kundannoor shops book?", a: "Yes, with Kundannoor item list." },
      { q: "Kundannoor bulk planned?", a: "Yes, with Kundannoor inventory and access." },
      { q: "Kundannoor slot how?", a: "After Kundannoor feasibility review." },
    ],
    cta: "Hi, I'm in Kundannoor and want to book e-waste pickup.",
  },
  {
    hub: "locations",
    slug: "infopark-e-waste",
    title: "E-Waste Pickup at Infopark Kochi",
    description: "Infopark campus e-waste collection for IT companies and nearby facilities.",
    h1: "E-Waste Pickup at Infopark",
    category: HUB.locations.label,
    categorySlug: HUB.locations.slug,
    quick: "Infopark companies can arrange e-waste pickup by sharing campus details, asset inventory and data-destruction needs. The team confirms a bulk slot matched to volume and access.",
    sections: [
      { h: "Campus coverage", p: ["Infopark is a well-covered IT corridor for e-waste pickup.","Infopark campus and building details help planning."] },
      { h: "Bulk IT assets", p: ["Infopark companies share inventories and access windows.","Data destruction is arranged for Infopark storage devices."] },
      { h: "Nearby facilities", p: ["Adjacent Infopark offices and flats can join batches.","Grouping reduces trips and effort."] },
      { h: "Confirmation flow", p: ["For Infopark, feasibility reviewed before scheduling a slot.","Certificates document the Infopark batch."] },
    ],
    faqs: [
      { q: "Infopark covered?", a: "Yes, Infopark is a well-covered corridor." },
      { q: "Infopark bulk IT?", a: "Yes, with Infopark inventory and access." },
      { q: "Infopark nearby join?", a: "Yes, via batched Infopark collections." },
      { q: "Infopark slot confirmed how?", a: "After Infopark feasibility review." },
    ],
    cta: "Hi, we're at Infopark and need e-waste pickup.",
  },
  // ---------------- DEVICES (extended) ----------------
  {
    hub: "devices",
    slug: "tablet-recycling-kochi",
    title: "Tablet Recycling in Kochi",
    description: "How to recycle or resell old tablets in Kochi with data and battery safety.",
    h1: "Tablet Recycling in Kochi",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "To recycle a tablet in Kochi, sign out of accounts, factory reset, remove the SIM if any, and send photos. Working tablets may be reviewed for resale; all go through secure data handling.",
    sections: [
      { h: "Prepare the tablet", p: ["Sign out, factory reset, remove SIM and SD if present.","This prevents lock and leftover data issues."] },
      { h: "Battery care", p: ["Keep lithium batteries around safe charge for transport.","Swollen cells are flagged and handled separately."] },
      { h: "Resale or recycle", p: ["Working tablets may be reviewed for resale.","Broken ones go to material recovery."] },
      { h: "Data assurance", p: ["Certified handling makes information unrecoverable.","Certificate available where needed."] },
    ],
    faqs: [
      { q: "Reset first?", a: "Yes, sign out and factory reset." },
      { q: "Value?", a: "Working tablets may be reviewed for resale." },
      { q: "Battery risk?", a: "Lithium; swollen kept separate." },
      { q: "Data safe?", a: "Certified handling makes it unrecoverable." },
    ],
    cta: "Hi, I want to recycle or resell an old tablet in Kochi.",
  },
  {
    hub: "devices",
    slug: "smartwatch-recycling-kochi",
    title: "Smartwatch & Wearable Recycling in Kochi",
    description: "How to recycle smartwatches and wearables in Kochi, including batteries.",
    h1: "Smartwatch & Wearable Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Smartwatches and wearables are e-waste with lithium batteries. In Kochi, factory reset them, keep the battery safe, and include them in an authorised pickup with photos.",
    sections: [
      { h: "Prepare the device", p: ["Unpair and reset the wearable before handover.","This clears accounts and personal data."] },
      { h: "Battery safety", p: ["Lithium cells are small but still a transport risk.","Swollen units are flagged and isolated."] },
      { h: "Included in batches", p: ["Wearables go in any e-waste pickup batch.","Group with phones and cables for efficiency."] },
      { h: "Confirmation", p: ["Send photos so the team matches handling.","Small items are easy to overlook without a list."] },
    ],
    faqs: [
      { q: "Reset first?", a: "Yes, unpair and reset." },
      { q: "Battery risk?", a: "Lithium; swollen kept separate." },
      { q: "Include in batch?", a: "Yes, with phones and cables." },
      { q: "Confirm how?", a: "After photos shared." },
    ],
    cta: "Hi, I have smartwatches and wearables to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "router-recycling-kochi",
    title: "Router & Networking Gear Recycling in Kochi",
    description: "How to recycle routers, switches and networking equipment in Kochi, including data notes.",
    h1: "Router & Networking Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Routers, switches and networking gear are e-waste accepted in Kochi pickups. Reset configs, separate cables, and mention any stored settings so data handling is included.",
    sections: [
      { h: "What counts", p: ["Routers, switches, modems, access points and cabling.","They combine plastics, metals and small boards."] },
      { h: "Reset first", p: ["Clear configurations and credentials before handover.","Some devices store network settings."] },
      { h: "Cables separate", p: ["Unplug and bag cables apart from the units.","Copper recovery benefits from clean separation."] },
      { h: "Confirmation", p: ["Send photos and model details for a quick check.","Group gear to speed loading."] },
    ],
    faqs: [
      { q: "Routers e-waste?", a: "Yes, with switches and modems." },
      { q: "Reset first?", a: "Yes, clear configs and credentials." },
      { q: "Cables separate?", a: "Yes, bagged apart." },
      { q: "Confirm how?", a: "After router photos and model details are shared." },
    ],
    cta: "Hi, I have routers and networking gear to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "cctv-recycling-kochi",
    title: "CCTV & Surveillance Recycling in Kochi",
    description: "How to recycle CCTV cameras, DVRs and NVRs in Kochi with data handling.",
    h1: "CCTV & Surveillance Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "CCTV cameras, DVRs and NVRs are e-waste with stored footage. In Kochi, reset devices, separate cables, and arrange authorised pickup with data handling included.",
    sections: [
      { h: "What counts", p: ["Cameras, DVRs, NVRs and power supplies.","They often store video on internal drives."] },
      { h: "Data handling", p: ["Wipe or destroy storage before recycling.","Mention recording devices so destruction is included."] },
      { h: "Reset devices", p: ["Clear credentials and network settings.","This prevents leftover access data."] },
      { h: "Confirmation", p: ["Send photos and model details for a check.","Group with cables for efficiency."] },
    ],
    faqs: [
      { q: "CCTV e-waste?", a: "Yes, cameras, DVRs, NVRs." },
      { q: "Data handled?", a: "Wipe or destroy storage first." },
      { q: "Reset devices?", a: "Yes, clear credentials." },
      { q: "Confirm how?", a: "After CCTV photos and model details are shared." },
    ],
    cta: "Hi, I have CCTV and surveillance gear to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "gaming-console-recycling-kochi",
    title: "Gaming Console Recycling in Kochi",
    description: "How to recycle or resell old gaming consoles in Kochi with data and disc safety.",
    h1: "Gaming Console Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Gaming consoles are e-waste accepted in Kochi pickups. Sign out of accounts, remove discs and games, and send photos. Working consoles may be reviewed for resale.",
    sections: [
      { h: "Prepare the console", p: ["Sign out of accounts and remove discs and cartridges.","This avoids locked devices and lost media."] },
      { h: "Resale or recycle", p: ["Working consoles may be reviewed for resale.","Broken ones go to material recovery."] },
      { h: "Accessories", p: ["Controllers and cables are included in the batch.","Bag cables separate from units."] },
      { h: "Confirmation", p: ["Send photos and model details for a check.","Group with accessories for efficiency."] },
    ],
    faqs: [
      { q: "Consoles e-waste?", a: "Yes, with controllers and cables." },
      { q: "Remove discs?", a: "Yes, and sign out of accounts." },
      { q: "Value?", a: "Working consoles may be reviewed for resale." },
      { q: "Confirm how?", a: "After console photos and model details are shared." },
    ],
    cta: "Hi, I have an old gaming console to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "speaker-recycling-kochi",
    title: "Speaker & Audio Device Recycling in Kochi",
    description: "How to recycle speakers, soundbars and audio gear in Kochi.",
    h1: "Speaker & Audio Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Speakers, soundbars and audio gear are e-waste accepted in Kochi pickups. Separate cables, note any batteries, and arrange authorised collection with photos.",
    sections: [
      { h: "What counts", p: ["Speakers, soundbars, amplifiers and headsets.","They combine plastics, magnets and electronics."] },
      { h: "Batteries and cables", p: ["Note built-in batteries and separate loose cables.","Magnets need careful handling."] },
      { h: "Prepare", p: ["Send photos and model details for a check.","Group with other audio gear."] },
      { h: "Confirmation", p: ["The team reviews your speaker request before scheduling.","Functional items may be reviewed for resale."] },
    ],
    faqs: [
      { q: "Speakers e-waste?", a: "Yes, with soundbars and amps." },
      { q: "Batteries noted?", a: "Yes, and cables separated." },
      { q: "Magnets?", a: "Handled carefully during recovery." },
      { q: "Confirm how?", a: "After speaker photos and model details are shared." },
    ],
    cta: "Hi, I have speakers and audio gear to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "power-bank-recycling-kochi",
    title: "Power Bank Recycling in Kochi",
    description: "How to recycle power banks and portable batteries safely in Kochi.",
    h1: "Power Bank Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Power banks are lithium battery e-waste. In Kochi, keep them separate, store swollen units safely, and arrange authorised pickup with photos and condition details.",
    sections: [
      { h: "Why careful", p: ["Power banks are dense lithium cells, a transport fire risk.","Separate storage prevents incidents."] },
      { h: "Store damaged safely", p: ["Swollen or hot units go in a fire-safe container.","Flag them to the team immediately."] },
      { h: "Prepare", p: ["Send photos and condition for route matching.","Honest reporting keeps pickup safe."] },
      { h: "Confirmation", p: ["The team reviews your power-bank request before scheduling.","Bulk lots need quantity details."] },
    ],
    faqs: [
      { q: "Power banks hazardous?", a: "Yes, dense lithium cells." },
      { q: "Swollen unit?", a: "Fire-safe container, flagged." },
      { q: "Prepare how?", a: "Photos and condition details." },
      { q: "Confirm how?", a: "After team review." },
    ],
    cta: "Hi, I have power banks to recycle safely in Kochi.",
  },
  {
    hub: "devices",
    slug: "led-bulb-recycling-kochi",
    title: "LED & CFL Bulb Recycling in Kochi",
    description: "How to recycle LED and CFL bulbs in Kochi, including mercury handling.",
    h1: "LED & CFL Bulb Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "LED and CFL bulbs are e-waste; CFLs contain mercury. In Kochi, keep them intact, never crush, and arrange authorised pickup or drop-off with careful packaging.",
    sections: [
      { h: "Why careful", p: ["CFLs contain mercury; LEDs have electronics.","Both need controlled handling, not crushing."] },
      { h: "Keep intact", p: ["Store bulbs unbroken in protective packaging.","Broken CFLs release mercury vapour."] },
      { h: "Prepare", p: ["Send quantity and type for a handling plan.","Group with other e-waste carefully."] },
      { h: "Confirmation", p: ["The team reviews your bulb request before scheduling.","Small volumes may join a batch pickup."] },
    ],
    faqs: [
      { q: "Bulbs e-waste?", a: "Yes, CFLs have mercury, LEDs have electronics." },
      { q: "Keep intact?", a: "Yes, never crush; package protectively." },
      { q: "Broken CFL?", a: "Handle as mercury release; flag to team." },
      { q: "Confirm how?", a: "After quantity and type shared." },
    ],
    cta: "Hi, I have LED and CFL bulbs to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "pcb-motherboard-recycling",
    title: "PCB & Motherboard Recycling in Kochi",
    description: "How circuit boards and motherboards are recycled in Kochi for precious metals.",
    h1: "PCB & Motherboard Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Printed circuit boards and motherboards carry gold, copper and rare metals. In Kochi, include them in authorised pickup; they are processed for precious-metal recovery.",
    sections: [
      { h: "Why valuable", p: ["Boards hold gold contact points and copper traces.","Recovering them beats mining new ore."] },
      { h: "Where they come from", p: ["Computers, phones, appliances and networking gear.","Loose boards are accepted in batches."] },
      { h: "Prepare", p: ["Send photos and rough quantity for a plan.","Keep boards dry and separated."] },
      { h: "Confirmation", p: ["The team reviews your board request before scheduling.","Bulk board lots need details."] },
    ],
    faqs: [
      { q: "Boards valuable?", a: "Yes, gold and copper recovery." },
      { q: "From what devices?", a: "Computers, phones, appliances, networking." },
      { q: "Prepare how?", a: "Photos, quantity, dry and separated." },
      { q: "Confirm how?", a: "After team review." },
    ],
    cta: "Hi, I have circuit boards and motherboards to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "ssd-ram-recycling-kochi",
    title: "SSD & RAM Recycling in Kochi",
    description: "How to recycle SSDs and RAM modules in Kochi with data destruction.",
    h1: "SSD & RAM Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "SSDs and RAM are e-waste with recoverable metals and stored data. In Kochi, destroy data on SSDs first, then include them in authorised pickup with certificates.",
    sections: [
      { h: "Data on SSDs", p: ["SSDs store data that needs certified destruction.","RAM is volatile but still recycled for metals."] },
      { h: "Destroy then recycle", p: ["Wipe or physically destroy SSDs before handover.","Certificate ties to the batch."] },
      { h: "Metal recovery", p: ["Boards contain gold, copper and rare earths.","Recovery reduces new mining."] },
      { h: "Confirmation", p: ["Send photos and quantity for a plan.","Group with other components."] },
    ],
    faqs: [
      { q: "SSDs need destruction?", a: "Yes, certified, before recycling." },
      { q: "RAM recycled?", a: "Yes, for its metals." },
      { q: "What recovered?", a: "Gold, copper, rare earths." },
      { q: "Confirm how?", a: "After photos and quantity." },
    ],
    cta: "Hi, I have SSDs and RAM to recycle securely in Kochi.",
  },
  {
    hub: "devices",
    slug: "camera-recycling-kochi",
    title: "Camera & Photography Gear Recycling in Kochi",
    description: "How to recycle cameras, lenses and photography electronics in Kochi.",
    h1: "Camera & Photography Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Cameras, lenses and photography electronics are e-waste accepted in Kochi pickups. Remove memory cards and batteries, and send photos. Working gear may be reviewed for resale.",
    sections: [
      { h: "What counts", p: ["Cameras, lenses, flashes, drones and accessories.","They combine optics, electronics and batteries."] },
      { h: "Prepare", p: ["Remove memory cards and batteries first.","Send photos and model details."] },
      { h: "Resale or recycle", p: ["Working gear may be reviewed for resale.","Broken units go to material recovery."] },
      { h: "Confirmation", p: ["The team reviews your camera request before scheduling.","Group accessories for efficiency."] },
    ],
    faqs: [
      { q: "Cameras e-waste?", a: "Yes, with lenses and accessories." },
      { q: "Remove cards/batteries?", a: "Yes, before handover." },
      { q: "Value?", a: "Working gear may be reviewed for resale." },
      { q: "Confirm how?", a: "After camera photos and model details are shared." },
    ],
    cta: "Hi, I have cameras and photography gear to recycle in Kochi.",
  },
  {
    hub: "devices",
    slug: "keyboard-mouse-recycling-kochi",
    title: "Keyboard, Mouse & Peripheral Recycling in Kochi",
    description: "How to recycle keyboards, mice and small peripherals in Kochi.",
    h1: "Keyboard & Peripheral Recycling",
    category: HUB.devices.label,
    categorySlug: HUB.devices.slug,
    quick: "Keyboards, mice and small peripherals are e-waste accepted in Kochi pickups. Separate cables, note wireless batteries, and include them in any batch for material recovery.",
    sections: [
      { h: "What counts", p: ["Keyboards, mice, webcams, headsets and docks.","They combine plastics, metals and small boards."] },
      { h: "Batteries and cables", p: ["Note wireless batteries and separate cables.","Copper recovery benefits from clean separation."] },
      { h: "Prepare", p: ["Send photos and quantity for a plan.","Group with other peripherals."] },
      { h: "Confirmation", p: ["The team reviews your peripheral request before scheduling.","Bulk office lots need an inventory."] },
    ],
    faqs: [
      { q: "Peripherals e-waste?", a: "Yes, keyboards, mice, webcams." },
      { q: "Batteries noted?", a: "Yes, and cables separated." },
      { q: "Prepare how?", a: "Photos, quantity, grouped." },
      { q: "Confirm how?", a: "After team review." },
    ],
    cta: "Hi, I have keyboards and peripherals to recycle in Kochi.",
  },
];

function escapeAstr(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function render(p: Pillar & { hub: HubKey }): string {
  const hub = HUB[p.hub];
  const sections = p.sections
    .map(
      (s, i) =>
        `  <section id="section-${i + 1}">\n    <h2>${escapeAstr(s.h)}</h2>\n${s.p
          .map((para) => `    <p>${escapeAstr(para)}</p>`)
          .join("\n")}\n  </section>`
    )
    .join("\n");

  const faqs = p.faqs
    .map((f) => `  {\n    q: "${escapeAstr(f.q)}",\n    a: "${escapeAstr(f.a)}"\n  }`)
    .join(",\n");

  const date = "2026-08-18";

  return `---
import Layout from "../../../layouts/Layout.astro";
import Breadcrumbs from "../../../components/Breadcrumbs.astro";
import DirectAnswer from "../../../components/DirectAnswer.astro";
import CtaBar from "../../../components/CtaBar.astro";
import Faq from "../../../components/Faq.astro";
import RelatedContent from "../../../components/RelatedContent.astro";
import LongformExpansion from "../../../components/LongformExpansion.astro";
import Sources from "../../../components/Sources.astro";
import { BUSINESS, SITE_URL } from "../../../data/site";

const title = "${escapeAstr(p.title)}";
const description = "${escapeAstr(p.description)}";
const lastUpdated = "${date}";

const breadcrumbItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog/" },
  { name: "${escapeAstr(hub.label)}", path: "/blog/${hub.slug}/" },
  { name: "${escapeAstr(p.h1)}", path: "/blog/${p.slug}/" }
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "datePublished": "${date}",
    "dateModified": lastUpdated,
    "author": { "@type": "Organization", name: BUSINESS.legalName },
    "publisher": { "@id": \`\${SITE_URL}/#organization\` },
    "mainEntityOfPage": \`\${SITE_URL}/blog/${p.slug}/\`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": \`\${SITE_URL}/blog/${p.slug}/\`,
    "name": title,
    "description": description,
    "dateModified": lastUpdated,
  }
];

const faqItems = [
${faqs}
];

const sourceItems = [
  {
    title: "E-Waste Management Rules and related regulatory resources",
    href: "https://cpcb.nic.in/rules-6/",
    publisher: "Central Pollution Control Board",
    note: "Official CPCB resource page for e-waste rules and updates."
  },
  {
    title: "EPR E-Waste portal",
    href: "https://eprewastecpcb.in/",
    publisher: "Central Pollution Control Board",
    note: "Official portal for e-waste EPR registration and compliance workflows."
  },
  {
    title: "Kerala State Pollution Control Board",
    href: "https://kspcb.kerala.gov.in/",
    publisher: "Kerala State Pollution Control Board",
    note: "Regional enforcement and authorization for e-waste recyclers in Kerala."
  }
];
---

<Layout title={title} description={description} path="/blog/${p.slug}/" jsonLd={jsonLd}>
  <Breadcrumbs items={breadcrumbItems} />

  <h1>${escapeAstr(p.h1)}</h1>

  <DirectAnswer>
    <p>${escapeAstr(p.quick)}</p>
  </DirectAnswer>

  <CtaBar whatsappMessage="${escapeAstr(p.cta)}" />

${sections}

  <RelatedContent>
    <h2>Explore more guides</h2>
    <ul>
      <li><a href="/blog/${hub.slug}/">${escapeAstr(hub.label)} hub</a></li>
      <li><a href="/blog/general-ewaste/">General e-waste basics</a></li>
      <li><a href="/recycling/">Recycling service</a></li>
      <li><a href="/pickup/">Book a pickup</a></li>
    </ul>
  </RelatedContent>

  <LongformExpansion
    label="Expanded field guide"
    audience="households and businesses in Kochi"
    localIntent="${escapeAstr(p.h1.toLowerCase())} with authorised pickup"
    items={["old electronics", "batteries", "cables", "data devices"]}
    themes={["Preparation", "Safety", "Compliance", "Recovery"]}
  />

  <section id="faq-section">
    <h2>Frequently asked questions</h2>
    <Faq items={faqItems} heading="${escapeAstr(p.h1)} FAQs" />
  </section>

  <Sources items={sourceItems} heading="Official sources & regulatory references" />
</Layout>

<style>
  .blog-hub { max-width: 1200px; margin: 0 auto; padding: 2rem 1rem; }
  .blog-hub h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-primary); text-align: center; }
  .blog-hub section { margin-bottom: 3rem; padding: 2rem; background: var(--color-bg); border-radius: 0.75rem; border: 1px solid var(--color-border); }
  .blog-hub h2 { color: var(--color-primary); margin-bottom: 1.5rem; font-size: 1.8rem; }
  .blog-hub ul { margin-bottom: 1rem; padding-left: 1.5rem; }
  .blog-hub li { margin-bottom: 0.5rem; line-height: 1.6; }
  @media (max-width: 768px) {
    .blog-hub h1 { font-size: 2rem; }
    .blog-hub section { padding: 1.5rem; }
    .blog-hub h2 { font-size: 1.5rem; }
  }
</style>
`;
}

// Also emit a route-data file so the new pillars register in routes.ts
// without 74 hand-written entries.
const routeEntries = PILLARS.map((p) => {
  const hub = HUB[p.hub];
  return `  {
    path: "/blog/${p.slug}/",
    changefreq: "monthly",
    priority: 0.6,
    title: ${JSON.stringify(p.title)},
    description: ${JSON.stringify(p.description)},
    type: "blog" as const,
    sitemapGroup: "blog" as const,
    lang: "en-IN" as const,
    status: "published" as const,
    contentSource: "manual" as const,
    indexable: true,
  },`;
}).join("\n");

const routeFile = `// AUTO-GENERATED by scripts/gen-pillars.ts — do not edit by hand.
// Re-run the generator after changing pillar definitions.
import type { RouteEntry } from "./routes";

export const GENERATED_PILLAR_ROUTES: RouteEntry[] = [
${routeEntries}
];
`;

const routeOut = join(process.cwd(), "src/data/generatedPillarRoutes.ts");
writeFileSync(routeOut, routeFile, "utf8");

let created = 0;
for (const p of PILLARS) {
  const dir = join(process.cwd(), "src/pages/blog", p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.astro"), render(p), "utf8");
  created++;
}
console.log(`Generated ${created} pillar pages and route data.`);
