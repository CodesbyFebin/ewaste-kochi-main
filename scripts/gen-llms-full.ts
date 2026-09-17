// Generates public/llms-full.txt from the live route registry.
// Run: npx tsx scripts/gen-llms-full.ts
import { readFileSync, writeFileSync } from "node:fs";
import { ROUTES } from "../src/data/routes";
import { SITE_URL } from "../src/data/site";

const lines: string[] = [];
lines.push(`# ${SITE_URL}`);
lines.push(`# Full content dump for LLM/RAG ingestion`);
lines.push(`# Generated: ${new Date().toISOString()}`);
lines.push(`# Total routes: ${ROUTES.length}`);
lines.push("");

for (const route of ROUTES) {
  lines.push(`## ${route.path}`);
  lines.push(`Title: ${route.title}`);
  lines.push(`Description: ${route.description}`);
  lines.push(`Type: ${route.type}`);
  lines.push(`Language: ${route.lang}`);
  lines.push(`Indexable: ${route.indexable ?? true}`);
  lines.push(`URL: ${SITE_URL}${route.path}`);
  lines.push("");
}

writeFileSync("public/llms-full.txt", lines.join("\n"), "utf8");
console.log(`Wrote ${lines.length} lines to public/llms-full.txt`);
