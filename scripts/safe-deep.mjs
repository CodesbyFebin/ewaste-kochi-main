import fs from "node:fs";
import path from "node:path";
import { records, SITE, TODAY } from "./content-model.mjs";

const root = process.cwd();
const out = path.join(root, "src/content/articles");
const dataDir = path.join(root, "data");
const countArg = process.argv.find((v) => v.startsWith("--count="));
const count = Math.min(Number(countArg?.split("=")[1] || 100), records.length);

fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

// YAML serializer for frontmatter - produces valid YAML 1.2
function toYamlValue(value, indent = "") {
  if (value === null || value === undefined) {
    return "";
  }
  
  if (typeof value === "string") {
    // Check if string needs quoting in YAML
    if (value.includes(":") || value.includes("#") || value.includes(",") || value.includes("[") || value.includes("]") || value.includes("{") || value.includes("}") || value.startsWith(" ") || value.endsWith(" ")) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  
  if (typeof value === "number") {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    // Check if array contains only scalars (no nested objects)
    const allScalars = value.every(item => typeof item !== "object" || item === null);
    if (allScalars) {
      const yamlItems = value.map(item => {
        const yamlItem = toYamlValue(item, indent + "  ");
        return yamlItem.startsWith(" ") || yamlItem.startsWith("[") || yamlItem.startsWith("{") || yamlItem.includes(":") ? `- ${yamlItem}` : `- ${yamlItem}`;
      });
      return `[\n${yamlItems.map(item => indent + "  " + item).join("\n")}\n${indent}]`;
    } else {
      // Complex array - use JSON-style for simplicity
      return JSON.stringify(value);
    }
  }
  
  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const lines = [];
    for (const [key, val] of entries) {
      const yamlVal = toYamlValue(val, indent + "  ");
      if (yamlVal.includes("\n")) {
        lines.push(`${indent}${key}: |`);
        lines.push(yamlVal.split("\n").map(line => indent + "  " + line).join("\n"));
      } else {
        lines.push(`${indent}${key}: ${yamlVal}`);
      }
    }
    return "{\n" + lines.join("\n") + "\n" + indent + "}";
  }
  
  return String(value);
}

const q = (value) => toYamlValue(value);

const sourceMd = (sources) => sources.map((s, i) => `${i + 1}. [${s.name}](${s.url}) — accessed ${s.accessed}.`).join("\n");

function sectionFor(record) {
  const variants = {
    "Kochi Local Guides": `## Start with the item, not the nearest scrap shop

Write down what you have, whether it still works, whether it stores personal or business data, and whether a battery is installed. A working laptop with a healthy battery needs a different route from a broken television or a swollen power bank. This first pass prevents avoidable damage and makes pickup conversations specific.

For ${record.location}, group the load into reusable equipment, data-bearing equipment, loose batteries and non-working accessories. Ask a collector which categories they accept before moving anything. An address close to you is convenient, but authorisation, downstream traceability and safe transport matter more than distance.`,
    "Laptop & Computer Recycling": `## Decide whether the equipment should be reused

Reuse normally preserves more of the value already embedded in a computer than immediate material recovery. Test basic function, record visible damage and keep the charger with the machine when safe. Do not advertise or transfer a device until accounts, activation locks and business management profiles have been removed.

For a ${record.device.toLowerCase()}, the storage medium is the pivotal detail. A working system intended for reuse needs a sanitisation method compatible with that goal. Failed or damaged media may need a different treatment path. The handover record should connect the asset identity to the chosen outcome.`,
    "Mobile & Gadget Recycling": `## Check for a battery and an account lock

Compact gadgets often combine a lithium battery, personal data and accessories in one small enclosure. Remove cloud accounts, device-finding locks and paired payment credentials before transfer. If the unit is damaged, do not force it open merely to reach the battery.

Keep chargers and compatible accessories together when they support reuse. Separate unrelated cables and loose cells. A recycler can then assess the product as a complete device rather than an unidentified mixture.`,
    "Battery Recycling": `## Treat physical damage as a safety signal

Stop charging or using a battery that is swollen, leaking, unusually hot, punctured or mechanically damaged. Do not compress it to fit a container and do not test it by reconnecting it to equipment. Keep people away from fumes or heat and seek local emergency guidance if there is active smoke or fire.

For short-term holding, prevent terminals from touching conductive objects and keep the unit away from heat, moisture and combustible clutter. The correct containment depends on chemistry and condition, so confirm instructions with the receiving specialist rather than improvising a sealed package.`,
    "IT Asset Disposition": `## Define the disposition population

Begin with the approved asset list, not the loading bay. Record asset tag, serial number, owner, storage-media type, condition and intended route. Exceptions—missing devices, locked equipment or assets held for investigation—should remain visible rather than being silently removed from the count.

For a ${record.title.match(/for a (.+?) in Kerala/i)?.[1]?.toLowerCase() || "business"}, procurement, IT, information security and finance may each own part of the evidence. A named coordinator should reconcile the release list, collection receipt, sanitisation result, resale statement and final treatment report.`,
    "Data Security & Destruction": `## Separate deletion, sanitisation and destruction

Deleting files changes how a system references data; it is not automatically evidence that the underlying media is unreadable. A factory reset can be a useful operational step, but its adequacy depends on media, encryption state, device condition, threat model and the planned next use.

Document the selected method, tool or physical process, operator, timestamp, asset identity and verification result. Where a provider issues a certificate, reconcile it with the original inventory instead of treating the certificate as proof for assets it does not list.`,
    "E-Waste Law & Compliance": `## Identify the organisation's role first

The same equipment can create different obligations for a producer, manufacturer, refurbisher, recycler or organisational user. Begin with the definitions and current official text. Map each relevant duty to an owner, record and review date.

This article is operational guidance, not legal advice. Rules, portal processes and authorisation details can change. Confirm the current position with CPCB, KSPCB and qualified advisers before relying on a checklist for a regulatory decision.`,
    "Scrap Value & Reuse": `## A quote is a dated assessment, not a permanent price

The net value of ${record.device.toLowerCase()} depends on model, age, function, completeness, repair demand, recoverable parts, quantity, transport and secure handling. Commodity values and buyer demand move. A public number without a date, grading method and assumptions can mislead.

Ask whether the quote assumes reuse, parts harvesting or material recovery. Confirm whether collection, testing, data sanitisation and documentation are included. For business lots, compare the net result and risk controls rather than only the headline rate.`,
    "Circular Economy & ESG": `## Measure the treatment hierarchy

Track how many assets were avoided, repaired, redeployed, refurbished, recycled or otherwise treated. Collection weight alone does not prove a circular result. Define the reporting boundary and distinguish measured outcomes from conversion factors or estimates.

For credible reporting, connect each claim to an inventory, downstream record and calculation method. Avoid "zero landfill" or carbon claims unless the scope, exceptions and verification basis are explicit.`,
    "Recycling Technology": `## Place the technology in the process

${record.title.split(" for Electronics")[0]} may improve identification, separation, diagnostics or recovery, but it does not replace upstream collection controls or downstream authorisation. Evaluate the input material, maturity, throughput, operator requirements and residue management.

For Kerala relevance, verify whether the capability is commercially available in the actual downstream chain. A research paper or global vendor demonstration does not establish local deployment. Label pilots, estimates and future possibilities clearly.`
  };
  return variants[record.cluster];
}

function deepModules(record, index) {
  const name = record.device.toLowerCase();
  const modules = [
`## Build an accurate item profile

Start with observable facts about the ${name}: model family, approximate age, working condition, accessories, battery state and visible damage. For organisational equipment, add the asset tag, serial number, assigned owner and storage-media type. This profile determines whether testing, repair, data work or hazardous handling is needed.

Avoid opening an unfamiliar enclosure merely to complete the inventory. Photograph external labels when useful, but keep personal names, screen contents and network settings out of shared images. A precise profile lets a receiving facility confirm acceptance and quote scope without relying on vague categories such as "computer scrap."`,
`## Make a condition-led safety decision

Physical condition changes the correct route for ${name}. Heat, swelling, leakage, corrosion, crushed housings, sharp glass or exposed conductors require isolation and receiver-specific instructions. Do not reconnect damaged equipment just to see whether it still works. Do not compress a battery or tape over a vent.

Normal-looking equipment still deserves dry storage and protection from impact during collection. Keep loose batteries and fragile displays away from heavy metal items. If there is active smoke, fire or a strong chemical odour, move people away and use emergency guidance rather than treating the situation as a routine pickup.`,
`## Map the data surface

Ask where ${name} can retain information. Obvious storage drives are only one possibility; phones, printers, routers, consoles and managed accessories may retain accounts, logs, tokens or configuration. Record whether encryption, activation locks or enterprise management are enabled before removing access.

Choose a sanitisation or destruction method that matches the medium, condition, reuse plan and threat model. A menu reset is an action, not proof. Evidence should identify the asset, method, operator, date and verification result. Failed or inaccessible media should become an exception with an approved treatment path.`,
`## Test the reuse case honestly

Reuse is valuable only when ${name} is safe, functional enough for its next owner and supportable. Check essential operation, cosmetic condition, charger compatibility, locks and economically repairable faults. Do not shift an unsafe battery, unsupported security risk or undisclosed defect into the second-hand market.

When reuse is credible, keep compatible accessories with the product and document the grade. When it is not, identify whether parts harvesting or material recovery is more appropriate. The decision should preserve value without weakening data, consumer or environmental controls.`,
`## Plan collection and transport

Quantity, weight, fragility and battery condition determine how ${name} should move. Give the receiver a truthful description before collection. Separate reusable units from damaged items, prevent movement inside containers and avoid stacking heavy equipment on displays or battery packs.

For a business collection, define the pickup contact, approved loading area, asset release authority and count-verification method. Record discrepancies before the vehicle departs. Transport arrangements should match the accepted waste category and the receiver's instructions; convenience is not a reason to conceal damaged batteries or mixed material.`,
`## Evaluate the receiving channel

Verify what the receiver is permitted and equipped to handle, including ${name}, installed batteries and data-bearing components. Ask about the planned route, downstream partners and evidence returned after processing. Check current official information rather than relying on a certificate image, marketplace badge or an old social post.

The right due diligence depends on scale and risk. A household handover may need a receipt and clear destination. A corporate fleet may require authorisation checks, contract controls, insurance, chain of custody, serial reconciliation and audit rights. Record who checked what and when.`,
`## Reconcile the evidence

A complete file connects the released ${name} to its final approved outcome. Compare the original inventory, collection acknowledgment, sanitisation record, resale or refurbishment statement and recycling summary. Missing serial numbers, unexpected weights and rejected items should remain open exceptions until resolved.

Certificates should be read, not merely stored. Confirm the named customer, date, method, quantity and asset references. Where reporting uses aggregate weight, explain how that figure relates to the collected population. Evidence quality matters more than the number of documents in a folder.`,
`## Treat value as a net outcome

The value of ${name} may come from continued use, components or recovered material. A headline scrap rate can hide testing, transport, data work, missing accessories, rejected items and documentation costs. Ask for a dated assessment with condition grades and stated assumptions.

For organisations, compare net financial recovery alongside security and compliance control. The highest bidder is not automatically the lowest-risk route. For households, be cautious with requests to unlock a device or share credentials before the receiver has been verified. Prices and demand change, so this guide deliberately avoids a timeless quote.`,
`## Define environmental claims carefully

Collection of ${name} is not itself proof of recycling, carbon savings or landfill avoidance. Record the actual treatment hierarchy: prevented purchase, repair, internal redeployment, external reuse, parts recovery, recycling or another documented outcome. Keep measured results separate from estimates and conversion factors.

If an ESG report uses weight or carbon calculations, retain the inventory, boundary, methodology, factors and calculation date. Do not present theoretical material content as recovered output. Strong reporting explains uncertainty, exclusions and downstream evidence instead of relying on broad circular-economy language.`,
`## Use a closing checklist

Before ${name} leaves control, confirm that ownership release is approved, accounts and access are handled, hazardous condition is disclosed, accessories are sorted and the receiver accepts the category. Confirm who holds responsibility for sanitisation and what evidence will be returned.

After handover, save the receipt, reconcile quantities, review exceptions and update the asset or household record. Organisations should assign a retention period and owner for the evidence. If any authorisation, legal or technical point is unclear, pause the disposition and verify it with the official source or a qualified adviser.`
  ];
  const picks = [0, 1, 2, 3].map((offset) => modules[(index + offset) % modules.length]);
  return picks.join("\n\n");
}

function article(record, index) {
  const description = `A practical, evidence-aware guide to ${record.focus}, with safety, data and compliance checkpoints for Kerala.`;
  const metaDescription = description.length > 167 ? `${description.slice(0, 164).trimEnd()}…` : description;
  const related = records
    .filter((r) => r.slug !== record.slug && (r.cluster === record.cluster || r.device === record.device))
    .slice(0, 3)
    .map((r) => `/${r.clusterSlug}/${r.slug}/`);
  while (related.length < 3) related.push(`/${records[(index + related.length + 1) % records.length].clusterSlug}/${records[(index + related.length + 1) % records.length].slug}/`);
  const src = record.sources;
  
  // Build YAML frontmatter manually (proper YAML 1.2, block style for arrays)
  const lines = ["---"];
  lines.push(`title: ${q(record.title)}`);
  lines.push(`description: ${q(metaDescription)}`);
  // slug contains '/' and must be quoted to be a valid YAML string
  lines.push(`slug: "${record.clusterSlug}/${record.slug}"`);
  lines.push(`cluster: ${q(record.cluster)}`);
  lines.push(`intent: ${q(record.intent)}`);
  // Audience: block array
  lines.push("audience:");
  record.audience.forEach(a => lines.push(`  - ${q(a)}`));
  lines.push(`location: ${q(record.location)}`);
  lines.push(`device: ${q(record.device)}`);
  lines.push(`priority: ${record.priority}`);
  // publishedAt is a date string, but YAML parser may interpret as date - quote it
  lines.push(`publishedAt: "${record.publishedAt}"`);
  lines.push(`updatedAt: "${TODAY}"`);
  lines.push(`reviewedBy: ${q(record.reviewedBy)}`);
  // Sources: block array with nested objects
  lines.push("sources:");
  src.forEach(s => {
    lines.push("  -");
    lines.push(`    name: ${q(s.name)}`);
    lines.push(`    url: ${q(s.url)}`);
    // accessed is a date string, must be quoted to avoid auto-date conversion
    lines.push(`    accessed: "${s.accessed}"`);
  });
  // Related: block array
  lines.push("related:");
  related.forEach(r => lines.push(`  - ${q(r)}`));
  lines.push(`draft: ${record.draft !== undefined ? q(record.draft) : "false"}`);
  lines.push(`safetyReview: ${q(record.safetyReview)}`);
  lines.push(`legalReview: ${q(record.legalReview)}`);
  lines.push("---");
  
  const frontmatter = lines.join("\n");
  
  const body = `The useful question is not simply where to send an unwanted device. It is how to choose a route that protects people, information and material value. This guide focuses on ${record.focus}. Its central risk is ${record.risk}.

> **Quick answer:** ${record.decision}. Confirm current legal or safety requirements with the linked official sources before acting.

For this page, the working context is **${record.device} in ${record.location}** for ${record.audience.join(" and ")}. The priority is ${record.intent} intent, so the article emphasises decisions and evidence appropriate to that use case. It deliberately avoids naming an unverified receiver, promising a price or converting a general rule summary into legal advice.

${sectionFor(record)}

${deepModules(record, index)}

## Need a documented collection plan?

EWaste Kochi can help scope a Kochi-area pickup or an organisational ITAD requirement. Share device categories, approximate quantities, location, battery condition and whether serial-level reporting or data-destruction evidence is required. Do not send passwords or sensitive files.

## Sources and review notes

This page uses official sources for its regulatory and safety framing. It does not claim that a particular recycler, price, authorisation or technology is current unless verified at publication time.

${sourceMd(src)}

*Editorial review: ${record.reviewedBy}. Last reviewed ${TODAY}. ${record.legalReview ? "Legal/compliance review flag: required before material regulatory changes." : ""} ${record.safetyReview ? "Safety review flag: battery handling guidance requires periodic review." : ""}*`;

  return frontmatter + "\n\n" + body;
}

const selected = records.slice(0, count);
for (const file of fs.readdirSync(out)) if (file.endsWith(".md")) fs.unlinkSync(path.join(out, file));
selected.forEach((record, index) => fs.writeFileSync(path.join(out, `${record.slug}.md`), article(record, index)));

const roadmap = selected.map(({ focus, risk, decision, sources: src, ...r }) => ({
  ...r,
  sourceCount: src.length,
  status: "publishable-after-editorial-review"
}));
fs.writeFileSync(path.join(dataDir, "content-roadmap.json"), JSON.stringify(roadmap, null, 2));
const headers = Object.keys(roadmap[0]);
const csv = [headers.join(","), ...roadmap.map((row) => headers.map((h) => {
  const value = Array.isArray(row[h]) ? row[h].join("|") : String(row[h] ?? "");
  return `"${value.replaceAll('"', '""')}"`;
}).join(","))].join("\n");
fs.writeFileSync(path.join(dataDir, "content-roadmap.csv"), csv);

console.log(`Safe-Deep generated ${selected.length} articles and ${roadmap.length} roadmap records for ${SITE}.`);