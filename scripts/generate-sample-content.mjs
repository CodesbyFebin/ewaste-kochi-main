import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Get the current directory (similar to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the content model using ES modules
import { records } from "../EWaste-Kochi-Astro-Safe-Deep/scripts/content-model.mjs";

const outDir = path.join(process.cwd(), "src/content/articles");

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Simple frontmatter generator
const generateFrontmatter = (record) => {
  const { title, slug, cluster, intent, audience, location, device, priority, sources } = record;
  
  // Format date (use today's date for simplicity)
  const today = new Date().toISOString().split('T')[0];
  
  // Format sources as required by our schema
  const formattedSources = sources.map(source => ({
    name: source.name,
    url: source.url,
    accessed: source.accessed || new Date().toISOString().split('T')[0]
  }));
  
  return `---
title: "${title}"
description: "A sample article about ${title.toLowerCase()} in Kerala."
slug: "${slug}"
cluster: "${cluster}"
intent: "${intent}"
audience: ${JSON.stringify(audience)}
location: "${location || "Kerala"}"
device: "${device || "electronics"}"
priority: ${priority}
publishedAt: "${today}"
updatedAt: "${today}"
reviewedBy: "EWaste Kochi Editorial Desk"
sources: ${JSON.stringify(formattedSources)}
related: ["/sample-1/", "/sample-2/"]
draft: false
safetyReview: false
legalReview: false
---
`;
};

// Generate content for each article
const generateContent = (record) => {
  const { title, focus, risk, decision, cluster, device, location, audience, intent } = record;
  
  return `# ${title}

The useful question is not simply where to send an unwanted device. It is how to choose a route that protects people, information and material value. This guide focuses on ${focus.toLowerCase()}. Its central risk is ${risk.toLowerCase()}.

> **Quick answer:** ${decision}. Confirm current legal or safety requirements with the linked official sources before acting.

For this page, the working context is **${device} in ${location}** for ${audience.join(" and ")}. The priority is ${intent} intent, so the article emphasises decisions and evidence appropriate to that use case. It deliberately avoids naming an unverified receiver, promising a price or converting a general rule summary into legal advice.

## Start with the item, not the nearest scrap shop

Write down what you have, whether it still works, whether it stores personal or business data, and whether a battery is installed. A working laptop with a healthy battery needs a different route from a broken television or a swollen power bank. This first pass prevents avoidable damage and makes pickup conversations specific.

For ${location}, group the load into reusable equipment, data-bearing equipment, loose batteries and non-working accessories. Ask a collector which categories they accept before moving anything. An address close to you is convenient, but authorisation, downstream traceability and safe transport matter more than distance.

## Make a condition-led safety decision

Physical condition changes the correct route for ${device.toLowerCase()}. Heat, swelling, leakage, corrosion, crushed housings, sharp glass or exposed conductors require isolation and receiver-specific instructions. Do not reconnect damaged equipment just to see whether it still works. Do not compress a battery or tape over a vent.

Normal-looking equipment still deserves dry storage and protection from impact during collection. Keep loose batteries and fragile displays away from heavy metal items. If there is active smoke, fire or a strong chemical odour, move people away and use emergency guidance rather than treating the situation as a routine pickup.

## Map the data surface

Ask where ${device.toLowerCase()} can retain information. Obvious storage drives are only one possibility; phones, printers, routers, consoles and managed accessories may retain accounts, logs, tokens or configuration. Record whether encryption, activation locks or enterprise management are enabled before removing access.

Choose a sanitisation or destruction method that matches the medium, condition, reuse plan and threat model. A menu reset is an action, not proof. Evidence should identify the asset, method, operator, date and verification result. Failed or inaccessible media should become an exception with an approved treatment path.

## Test the reuse case honestly

Reuse is valuable only when ${device.toLowerCase()} is safe, functional enough for its next owner and supportable. Check essential operation, cosmetic condition, charger compatibility, locks and economically repairable faults. Do not shift an unsafe battery, unsupported security risk or undisclosed defect into the second-hand market.

When reuse is credible, keep compatible accessories with the product and document the grade. When it is not, identify whether parts harvesting or material recovery is more appropriate. The decision should preserve value without weakening data, consumer or environmental controls.

## Plan collection and transport

Quantity, weight, fragility and battery condition determine how ${device.toLowerCase()} should move. Give the receiver a truthful description before collection. Separate reusable units from damaged items, prevent movement inside containers and avoid stacking heavy equipment on displays or battery packs.

For a business collection, define the pickup contact, approved loading area, asset release authority and count-verification method. Record discrepancies before the vehicle departs. Transport arrangements should match the accepted waste category and the receiver’s instructions; convenience is not a reason to conceal damaged batteries or mixed material.

## Need a documented collection plan?

EWaste Kochi can help scope a Kochi-area pickup or an organisational ITAD requirement. Share device categories, approximate quantities, location, battery condition and whether serial-level reporting or data-destruction evidence is required. Do not send passwords or sensitive files.

## Sources and review notes

This page uses official sources for its regulatory and safety framing. It does not claim that a particular recycler, price, authorisation or technology is current unless verified at publication time.

1. [Central Pollution Control Board — E-Waste](https://cpcb.nic.in/e-waste/) — accessed ${new Date().toISOString().split('T')[0]}.
2. [Kerala State Pollution Control Board](https://kspcb.kerala.gov.in/) — accessed ${new Date().toISOString().split('T')[0]}.

*Editorial review: EWaste Kochi Editorial Desk. Last reviewed ${new Date().toISOString().split('T')[0]}.`;
};

// Generate a small sample of articles (first 5 records)
const sampleSize = Math.min(5, records.length);
const selected = records.slice(0, sampleSize);

// Generate the files
selected.forEach((record, index) => {
  const frontmatter = generateFrontmatter(record);
  const content = generateContent(record);
  const filePath = path.join(outDir, `${record.slug}.md`);
  
  fs.writeFileSync(filePath, frontmatter + content);
  console.log(`Generated: ${filePath}`);
});

console.log(`Generated ${selected.length} sample articles in ${outDir}`);
