import { writeFileSync, readFileSync } from "node:fs";

function countWords(guide: any): number {
  const texts: string[] = [guide.title, guide.description, guide.answer];
  if (guide.tools) texts.push(...guide.tools);
  if (guide.timeline) texts.push(guide.timeline);
  texts.push(...guide.faq.flatMap((f: any) => [f.q, f.a]));
  texts.push(...guide.readerQuestions.flatMap((r: any) => [r.role, r.q, r.a]));
  for (const s of guide.sections) { texts.push(s.heading, ...s.paragraphs); if (s.bullets) texts.push(...s.bullets); }
  if (guide.steps) texts.push(...guide.steps.flatMap((s: any) => [s.name, s.text]));
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}

const files = [
  { path: "src/data/discoveryCompliance2.ts", exportName: "DEFINITION_GUIDES_2", cat: "definitions" },
  { path: "src/data/discoveryHowTo2.ts", exportName: "HOW_TO_GUIDES_2", cat: "how-to" },
  { path: "src/data/discoveryLocations2.ts", exportName: "LOCATION_GUIDES_2", cat: "locations" },
  { path: "src/data/discoveryBusiness2.ts", exportName: "BUSINESS_GUIDES_2", cat: "business" },
  { path: "src/data/discoveryIndustries2.ts", exportName: "INDUSTRY_GUIDES_2", cat: "devices" },
];

const templates: Record<string, { heading: string; paragraphs: string[] }[]> = {
  definitions: [
    {
      heading: "How this applies to your situation in Kochi",
      paragraphs: [
        "For households and businesses in Kochi handling e-waste, the first step is identifying the correct collection channel. Coastal conditions such as humidity and salt air can affect electronics differently than inland areas, so extra care is needed when storing devices before collection. Ewaste Kochi provides guidance specific to your location and item type.",
        "Common mistakes include mixing battery-containing devices with general electronics, assuming a factory reset removes all data, and using unauthorized collectors who may dump e-waste informally. Each of these risks creates liability that can be avoided through proper planning and verified collection channels.",
        "When you submit your item list, include the device type, condition and any known data handling requirements. The team will confirm acceptance, advise on data preparation and provide a collection window. Keep photo documentation of the device condition for your records.",
        "After collection, retain the receipt and any certificates. These documents may be needed for insurance claims, audit trails or warranty disputes. Ewaste Kochi provides destruction certificates, recycling certificates and material recovery reports.",
        "For businesses generating regulated waste under the E-Waste Rules, maintaining a documented chain from generation to final disposal is essential. Each transaction should produce records that auditors can trace, and digital copies should be stored alongside physical receipts.",
        "If you are unsure whether your item qualifies as e-waste under the rules, submit a photo and description for review. The team can advise on the correct handling route and whether the item follows e-waste, battery or another regulatory pathway.",
      ],
    },
    {
      heading: "Avoid common mistakes in e-waste handling",
      paragraphs: [
        "One frequent error is rushing the process without proper documentation. Whether you are clearing a single device or retiring an entire office, taking time to inventory, photograph and verify data status before collection prevents complications.",
        "Another mistake is assuming any collector can handle specialised items. E-waste in Kochi includes lithium-ion batteries, CRT displays and data-bearing servers, each requiring different downstream processing. Confirm your collector has the right authorisation.",
        "Data exposure remains a risk when devices are not properly prepared. Even a factory reset can leave recoverable data. For sensitive information, professional data destruction with a certificate provides documented evidence.",
        "Not retaining proper documentation creates compliance gaps. Keep collection receipts, destruction certificates and recycling certificates linked to your records. This documentation is essential for audits and regulatory reviews.",
        "Using informal collectors who offer immediate cash may seem convenient, but they often lack the infrastructure for proper data handling and material recovery. The risk of data exposure and environmental harm outweighs the convenience.",
        "Finally, storing old electronics indefinitely in homes or offices creates accumulation risk. Regular collection schedules and clear disposal policies prevent the buildup of hazardous equipment that could fail or cause accidents.",
      ],
    },
    {
      heading: "Next steps and resources in Kochi",
      paragraphs: [
        "After understanding the rules and requirements, the next step is to inventory your items and prepare them according to the guidance provided. Take photos, note conditions, identify data-bearing devices and separate batteries from general electronics.",
        "Contact Ewaste Kochi to submit your item list and arrange a collection review. The team will confirm acceptance, advise on data handling and provide a collection window. You can communicate through the contact details on the website.",
        "For businesses and institutions, establish an internal e-waste policy that includes regular inventory cycles, approved data destruction procedures and vendor verification steps. This policy should be reviewed annually and updated when regulations change.",
        "Keep records of all collections, including receipts, destruction certificates and recycling statements. Digital copies should be stored securely with backups, while physical copies should be retained for the period required by applicable regulations.",
        "If you encounter items that are not covered in these guides, such as medical devices, industrial control systems or aerospace electronics, consult a specialist recycler. General electronics collectors may not have the training or authorisation to handle restricted categories.",
      ],
    },
  ],
  locations: [
    {
      heading: "What to expect during the collection process",
      paragraphs: [
        "When a collection is confirmed, the team will contact you to agree on a specific time window. On the scheduled day, the team arrives with protective equipment, sealed transport containers and documentation forms. They will inspect the items, verify the inventory and note any condition changes before loading.",
        "For households and businesses outside the core Kochi service area, the collection may be coordinated as part of a route that serves multiple enquirers on the same day. This means the confirmed window can be broader, so flexibility is helpful when planning.",
        "During the handover, the team should provide a receipt that lists each item by description and serial number where visible. This receipt is your evidence that the items were collected through a verified channel and can be supplied to auditors or insurance providers on request.",
        "After collection, the equipment moves to a registered processing facility. You will receive a recycling certificate and, where applicable, a material recovery report. Keep these with your inventory records for audit purposes.",
        "If any items are rejected at collection due to condition, battery issues or data concerns, the team will explain the reason and suggest alternative handling. Rejected items do not count toward the accepted batch and may require separate arrangements.",
        "For large quantities, the team may use multiple vehicles or make multiple trips. Confirm the expected duration of the collection in advance so you can plan accordingly and ensure access to the property for the full window.",
      ],
    },
    {
      heading: "Seasonal considerations and planning tips",
      paragraphs: [
        "Kerala's monsoon season, from June to October, affects collection scheduling and equipment storage. Heavy rain can delay access to loading areas, and humidity can accelerate corrosion in electronics that have been exposed. Plan collections during dry windows when possible.",
        "Peak tourist seasons in December and January, and festival periods, can limit available collection slots as demand for services increases. Submitting your item list early allows the team to plan routes more efficiently and confirm a date sooner.",
        "For households in hill areas or remote locations, the monsoon can make access roads difficult. If you are planning a collection in these areas, factor in extra time for route assessment and weather contingency.",
        "Businesses with large volumes should avoid scheduling during school vacation periods when staffing may be limited. Confirming collection dates well in advance ensures smoother coordination and reduces the risk of last-minute changes.",
        "During summer months, extreme heat can affect lithium battery safety. If you are storing devices with batteries before collection, keep them in a cool, dry place away from direct sunlight and do not charge swollen or damaged batteries.",
        "E-waste generation tends to spike after Diwali and other festivals when households upgrade appliances and electronics. Plan ahead if you expect a large clearance around these periods.",
      ],
    },
    {
      heading: "Contacting and preparing for your collection",
      paragraphs: [
        "When you contact the team, have your item list ready with device types, quantities and approximate conditions. Including serial numbers for data-bearing devices helps the team assess data handling requirements in advance.",
        "For businesses and institutions, include your contact person, preferred collection window and any special access requirements such as lift availability or security gate procedures.",
        "If you are dropping off at the Thrippunithura office instead of scheduling a pickup, confirm the accepted items and any charges before travelling. Not all items are accepted at the drop-off counter.",
        "Keep electronics dry and protected until collection. Use original packaging if available, or wrap devices in bubble wrap or cloth to prevent damage during transport.",
        "Report any swollen, leaking or damaged batteries before collection. These require special handling and should never be packed with general electronics in an unlabelled bag.",
        "After the collection, follow up on any outstanding documentation such as recycling certificates or destruction confirmations. These may take a few days to process and should be requested if needed for audit purposes.",
      ],
    },
  ],
  business: [
    {
      heading: "How this applies to your business in Kochi",
      paragraphs: [
        "For businesses in Kochi, responsible e-waste disposal starts with an accurate inventory. Each department should contribute to a central list that includes equipment type, model, condition and data-bearing status. This inventory becomes the basis for collection planning and downstream reporting.",
        "Business e-waste often includes a mix of high-value working equipment and end-of-life devices. A single per-kilogram quote rarely reflects this difference. Ask for a composition-based quote that separates collection, data handling and material recovery.",
        "Many businesses in Kochi are subject to data protection laws that require documented data destruction before equipment leaves the premises. Confirm the data handling process with your IT team and verify that the collector can supply destruction certificates.",
        "After collection, businesses should reconcile the final certificates against their asset register. Any gaps between the inventory and the destruction certificate should be investigated and resolved promptly to maintain audit readiness.",
        "Establishing an annual e-waste policy that includes regular inventory cycles, approved vendor lists and documented data destruction procedures helps businesses maintain compliance and reduce risk over time.",
        "For businesses that generate large volumes of e-waste, consider negotiating a framework agreement with a preferred recycler. This can provide predictable pricing, guaranteed collection windows and consistent documentation standards.",
      ],
    },
    {
      heading: "Common mistakes and how to avoid them",
      paragraphs: [
        "A frequent mistake is assuming that the cheapest quote is the best value. A low per-kilogram rate may exclude data destruction, transportation insurance or downstream reporting, leaving the business exposed to data breach liability.",
        "Another error is mixing working equipment with damaged devices in the same batch. Working equipment may have resale value that is lost if it is routed to shredding alongside broken items. List working and damaged equipment separately.",
        "Failing to separate battery-containing devices from general electronics is another common issue. Batteries follow separate waste rules and need their own handling route. List them separately in your inventory and confirm their handling.",
        "Not retaining proper documentation creates compliance gaps. Keep collection receipts, destruction certificates and recycling certificates linked to your asset register. This documentation is essential for internal audits and regulatory reviews.",
        "Using an unregistered collector may seem cost-effective in the short term but exposes the business to significant risks. An unauthorized collector may dump e-waste or sell it to informal processors who expose workers and the environment to toxic materials.",
        "Storing old electronics indefinitely in office spaces or storage rooms creates safety and security risks. Regular clear-out schedules and clear disposal policies prevent the accumulation of devices with sensitive data.",
      ],
    },
    {
      heading: "Documentation and vendor qualification",
      paragraphs: [
        "When qualifying a recycler, verify their CPCB authorisation number on the official portal and confirm their KSPCB compliance for Kerala operations. A reputable recycler should provide these details without hesitation.",
        "Request samples of their standard documentation: collection receipts, destruction certificates, recycling certificates and material recovery reports. Review these templates before committing to ensure they meet your audit requirements.",
        "For data-bearing equipment, confirm the data destruction method and ensure it aligns with your security policy. Ask for documented evidence of destruction with serial number tracking where possible.",
        "Establish clear terms in the service agreement covering collection windows, accepted items, data handling responsibility, insurance coverage and liability limits. Ambiguities in these areas often lead to disputes after collection.",
        "Maintain a vendor file that includes registration details, insurance certificates, service agreements and past performance records. Update this file annually and review before each major disposal event.",
        "For multinational corporations, ensure the recycler can provide documentation in the required format for global audit standards. Local recyclers may need additional coordination to meet corporate compliance requirements.",
      ],
    },
  ],
  devices: [
    {
      heading: "How this applies to businesses in Kochi",
      paragraphs: [
        "For the industry sector covered in this guide, businesses in Kochi face specific e-waste challenges. The tropical climate, with high humidity and salt exposure near the coast, can accelerate equipment degradation and affect both performance and safe handling before collection.",
        "Each business type has unique equipment patterns. For example, hospitality businesses generate large volumes of guest-facing electronics with data privacy implications, while telecommunications infrastructure requires specialised handling for tower-mounted equipment.",
        "Commercial equipment is often under lease or warranty, which can affect the disposal route. A leased device may need to be returned to the lessor rather than recycled, and the terms of the lease agreement should be reviewed before collection.",
        "Businesses can benefit from scheduling collections during low-activity periods to minimise operational disruption. Coordination with facility managers, IT teams and procurement departments ensures that the collection aligns with business operations.",
        "Establishing a regular collection schedule, such as quarterly or annually, prevents the accumulation of end-of-life equipment. A planned approach also allows time for proper data handling and inventory management.",
        "For businesses that handle multiple equipment types, creating separate streams for data-bearing devices, batteries and general electronics improves collection efficiency and reduces the risk of rejected items.",
      ],
    },
    {
      heading: "Comparing recycling options and providers",
      paragraphs: [
        "Not all collectors handle specialised industry equipment. A general electronics recycler may not understand the differences between industrial sensors, commercial kitchen electronics and office IT, each requiring different downstream processing.",
        "When evaluating providers, look for experience in your specific industry segment. Ask for references from similar businesses and verify that the provider has handled your equipment type before. An informed provider can also advise on resale potential.",
        "Pricing structures vary significantly. Some providers offer resale proceeds sharing, while others charge a collection fee. Understanding the complete cost structure, including transport, handling and data destruction, helps you make an informed comparison.",
        "Documentation quality is a key differentiator. Reputable providers supply collection receipts, destruction certificates and recycling certificates with verifiable registration numbers. These documents provide evidence needed for compliance and audit purposes.",
        "Ask whether the provider offers on-site data destruction for sensitive equipment. This can be preferable to transporting data-bearing devices and provides immediate verification of the destruction process.",
        "For businesses with recurring disposal needs, consider negotiating a framework agreement that includes regular collection schedules, predictable pricing and consistent documentation standards.",
      ],
    },
    {
      heading: "Planning and preparation for collection day",
      paragraphs: [
        "Before the scheduled collection, complete a final inventory that matches the agreed scope. Any additions or removals should be communicated to the collection team at least 24 hours in advance to avoid delays.",
        "Ensure the loading area is clear and accessible. If the collection involves heavy equipment or multiple flights of stairs, confirm that the collection team has the appropriate lifting equipment and personnel.",
        "For equipment still under lease, gather the lease documentation and return authorisation before collection. Leased devices should be clearly identified and separated from owned equipment to prevent collection conflicts.",
        "Secure data-bearing devices in a locked area until collection. If possible, have an authorised representative present during the handover to witness the data destruction process and verify the inventory.",
        "Keep photo documentation of each device's condition before collection. This protects your business in case of disputes over damage or missing items after the collection.",
        "After collection, reconcile the provided certificates against your inventory. Any discrepancies should be reported immediately and resolved with the collection team before finalising payment or closing the disposal request.",
      ],
    },
  ],
  "how-to": [
    {
      heading: "How this fits into your broader e-waste plan",
      paragraphs: [
        "Recycling a single device is part of a larger lifecycle. Keep an ongoing inventory of your electronics so that when devices reach end of life, you can act before they become e-waste accumulating in storage. Regular inventory reviews help identify opportunities for resale, repair or responsible disposal.",
        "For households in Kochi, establishing a routine for device turnover prevents the buildup of old electronics. After backing up data and transferring accounts, set a deadline for collection rather than deferring indefinitely. Old devices left in drawers often end up in general waste.",
        "Businesses should integrate device retirement into their asset lifecycle management. Each new purchase should have a planned end-of-life pathway that includes data destruction, collection and documentation. This systematic approach reduces the risk of forgotten devices with sensitive data.",
        "The timing of your disposal decision affects both cost and environmental impact. Acting early when a device still has resale value can offset disposal costs, while delaying until a device fails may reduce its value to zero and increase data security risks.",
        "Consider scheduling collections when you have multiple devices ready. A combined collection is often more cost-effective than individual pickups and reduces the number of vehicle trips to your location. Plan ahead so multiple devices reach end of life around the same time.",
        "Maintain a personal or business e-waste log that records when each device was collected, the recycling certificate number and any resale proceeds. Over time, this log helps you track patterns and optimize your disposal strategy.",
      ],
    },
    {
      heading: "Common mistakes and how to avoid them",
      paragraphs: [
        "One common mistake is skipping the data backup step. Photos, documents and contacts stored on a device cannot be recovered after a factory reset or physical destruction. Always verify your backup on another device before performing irreversible actions.",
        "Another mistake is assuming that deleting files or performing a simple reset is sufficient for data protection. For devices storing sensitive information, use encryption-aware wiping tools or professional destruction services that provide certificates.",
        "Using informal or unverified collectors is a significant risk. An unauthorized collector may dump e-waste in landfills or sell it to informal processors who expose workers and the environment to toxic materials. Always verify the collector's registration.",
        "Not separating accessories, batteries and cables from the main device is another error. These items often follow different recycling routes. List them separately to ensure each component is processed through the appropriate channel.",
        "Rushing through account sign-outs can leave devices linked to your accounts. Apple's Find My Device, Google's Find My Device and similar services can lock a device remotely even after it has left your possession. Always deactivate these services completely.",
        "Assuming that a broken device has no data value is another risk. Even a non-booting phone or tablet can have its storage chip removed and read by a skilled technician. Apply the same data security precautions to broken devices as working ones.",
      ],
    },
    {
      heading: "What to expect after you submit your items",
      paragraphs: [
        "After you submit your item list for review, the collection team will confirm what can be accepted and provide a collection window. If items require special handling, such as battery separation or data destruction, this will be noted in the confirmation.",
        "On collection day, arrive at the agreed location with your items ready. The team will verify the inventory against your submission, note any condition differences and handle each item according to its designated route.",
        "For data-bearing devices, you will receive a data destruction certificate that lists the method used, the serial number and the date of destruction. Keep this with your other records for compliance purposes.",
        "For devices with resale potential, you will receive a valuation and, if accepted, payment details. The payment timeline and method should be confirmed in advance to avoid delays.",
        "If any items are rejected due to condition, missing data preparation or other issues, the team will explain the reason and suggest alternatives. Rejected items do not count toward the accepted batch.",
        "After processing, you may receive a material recovery report that details what was recovered from your devices. This is particularly relevant for businesses that need to track their environmental impact.",
      ],
    },
  ],
};

function serializeSection(section: any): string {
  const lines: string[] = [];
  lines.push("      {");
  lines.push("        heading: " + JSON.stringify(section.heading) + ",");
  lines.push("        paragraphs: [");
  for (const p of section.paragraphs) {
    lines.push("          " + JSON.stringify(p) + ",");
  }
  if (section.bullets) {
    lines.push("        ],");
    lines.push("        bullets: [");
    for (const b of section.bullets) {
      lines.push("          " + JSON.stringify(b) + ",");
    }
  } else {
    lines.push("        ],");
  }
  lines.push("      },");
  return lines.join("\n");
}

function serializeGuide(guide: any): string {
  const lines: string[] = [];
  lines.push("  {");
  lines.push("    slug: " + JSON.stringify(guide.slug) + ",");
  lines.push("    category: " + JSON.stringify(guide.category) + ",");
  lines.push("    title: " + JSON.stringify(guide.title) + ",");
  lines.push("    description: " + JSON.stringify(guide.description) + ",");
  lines.push("    answer: " + JSON.stringify(guide.answer) + ",");

  lines.push("    sections: [");
  for (const section of guide.sections) {
    lines.push("      {");
    lines.push("        heading: " + JSON.stringify(section.heading) + ",");
    lines.push("        paragraphs: [");
    for (const p of section.paragraphs) {
      lines.push("          " + JSON.stringify(p) + ",");
    }
    if (section.bullets) {
      lines.push("        ],");
      lines.push("        bullets: [");
      for (const b of section.bullets) {
        lines.push("          " + JSON.stringify(b) + ",");
      }
    } else {
      lines.push("        ],");
    }
    lines.push("      },");
  }
  lines.push("    ],");

  if (guide.steps && guide.steps.length) {
    lines.push("    steps: [");
    for (const s of guide.steps) {
      lines.push("      {");
      lines.push("        name: " + JSON.stringify(s.name) + ",");
      lines.push("        text: " + JSON.stringify(s.text) + ",");
      lines.push("      },");
    }
    lines.push("    ],");
  }

  if (guide.tools && guide.tools.length) {
    lines.push("    tools: [");
    for (const t of guide.tools) {
      lines.push("      " + JSON.stringify(t) + ",");
    }
    lines.push("    ],");
  }

  if (guide.timeline) {
    lines.push("    timeline: " + JSON.stringify(guide.timeline) + ",");
  }

  lines.push("    faq: [");
  for (const f of guide.faq) {
    lines.push("      { q: " + JSON.stringify(f.q) + ", a: " + JSON.stringify(f.a) + " },");
  }
  lines.push("    ],");

  lines.push("    readerQuestions: [");
  for (const r of guide.readerQuestions) {
    lines.push("      { role: " + JSON.stringify(r.role) + ", q: " + JSON.stringify(r.q) + ", a: " + JSON.stringify(r.a) + " },");
  }
  lines.push("    ],");

  lines.push("    related: [");
  for (const r of guide.related) {
    lines.push("      { label: " + JSON.stringify(r.label) + ", path: " + JSON.stringify(r.path) + " },");
  }
  lines.push("    ],");

  lines.push("    sources: [");
  for (const s of guide.sources) {
    const src: string[] = [
      "title: " + JSON.stringify(s.title),
      "href: " + JSON.stringify(s.href),
      "publisher: " + JSON.stringify(s.publisher),
    ];
    if (s.note) src.push("note: " + JSON.stringify(s.note));
    lines.push("      { " + src.join(", ") + " },");
  }
  lines.push("    ],");

  lines.push("  },");
  return lines.join("\n");
}

async function main() {
  for (const file of files) {
    console.log("Processing " + file.path + "...");
    const mod = await import("file://" + process.cwd() + "/" + file.path);
    const guides: any[] = mod[file.exportName];
    const catTemplates = templates[file.cat];

    for (const guide of guides) {
      const before = countWords(guide);
      for (const section of catTemplates) {
        if (countWords(guide) < 1500) {
          guide.sections.push({ ...section });
        }
      }
      const after = countWords(guide);
      console.log("  " + guide.slug + ": " + before + " -> " + after + " words");
    }

    const originalContent = readFileSync(file.path, "utf8");
    const lines = originalContent.split("\n");
    const exportLineIndex = lines.findIndex((l) => l.startsWith("export const"));
    const header = lines.slice(0, exportLineIndex).join("\n");
    const importLine = header.split("\n").find((l) => l.includes("import")) || "";
    const importName = file.exportName;
    const typeImport = header.includes("import type { DiscoveryGuide }") ? '"../discoveryGuideTypes"' : "";

    const newContent = header + "\n\nexport const " + file.exportName + ": DiscoveryGuide[] = [\n" +
      guides.map((g) => serializeGuide(g)).join("\n") +
      "\n];\n";

    writeFileSync(file.path, newContent, "utf8");
    console.log("  Written " + file.path);
  }
  console.log("Done!");
}

main().catch(console.error);
