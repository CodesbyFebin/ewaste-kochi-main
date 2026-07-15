import { existsSync, readFileSync } from "node:fs";

const manifestPath = ".content-quarantine/blog-drafts/MANIFEST.json";
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : [];
const reviewCount = manifest.filter((row: { status?: string }) => row.status === "review").length;
const draftCount = manifest.filter((row: { status?: string }) => row.status === "draft").length;

console.error("Blocked: bulk blog generation is disabled for this repository.");
console.error("");
console.error("Why:");
console.error("- This site already has a blog scale safety gate and quarantined draft backlog.");
console.error("- Publishing placeholder posts into src/content/blog/ or src/pages/blog/ would create thin-content risk.");
console.error("- Sitemap/discovery should only include rewritten, fact-checked, manually promoted articles.");
console.error("");
console.error("Current safe backlog:");
console.error(`- Quarantined drafts: ${manifest.length}`);
console.error(`- Review candidates: ${reviewCount}`);
console.error(`- Generated drafts needing rewrite: ${draftCount}`);
console.error("");
console.error("Use instead:");
console.error("- npm run blog:silo-plan");
console.error("- Rewrite Batch 1 posts to 1200+ original words.");
console.error("- Promote only 5-10 reviewed posts at a time, then run validation.");
console.error("");
console.error("No blog pages were generated.");

process.exit(1);
