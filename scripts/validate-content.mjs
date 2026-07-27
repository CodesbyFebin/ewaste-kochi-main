import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "src/content/articles");
function collectMarkdown(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectMarkdown(full, list);
    } else if (entry.name.endsWith(".md")) {
      list.push(path.relative(path.join(process.cwd(), "src/content/articles"), full));
    }
  }
  return list;
}
const files = collectMarkdown(dir);
const errors = [];
const docs = [];
const required = [
  "title",
  "description",
  "slug",
  "cluster",
  "intent",
  "audience",
  "priority",
  "publishedAt",
  "updatedAt",
  "reviewedBy",
  "sources",
  "related",
];

for (const file of files) {
  const raw = fs.readFileSync(path.join(process.cwd(), "src/content/articles", file), "utf8");
  const parsed = matter(raw);
  const words = parsed.content.match(/\b[\w’'-]+\b/g)?.length || 0;
  const headings = [...parsed.content.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
  required.forEach((key) => {
    if (parsed.data[key] === undefined) errors.push(`${file}: missing ${key}`);
  });
  if (words < 650) errors.push(`${file}: thin content (${words} words)`);
  if (headings.length < 6) errors.push(`${file}: insufficient topical depth (${headings.length} H2s)`);
  if (!Array.isArray(parsed.data.sources) || parsed.data.sources.length < 1)
    errors.push(`${file}: no source ledger`);
  if (!Array.isArray(parsed.data.related) || parsed.data.related.length < 2)
    errors.push(`${file}: weak internal linking`);
  if (
    /guaranteed|best recycler|₹\s?\d|authorized recycler near/i.test(
      parsed.content
    )
  )
    errors.push(`${file}: unverified commercial claim`);
  docs.push({
    file,
    slug: parsed.data.slug,
    title: parsed.data.title,
    text: parsed.content.toLowerCase(),
  });
}

const seen = new Set();
for (const doc of docs) {
  if (seen.has(doc.slug)) errors.push(`${doc.file}: duplicate slug`);
  seen.add(doc.slug);
}

const shingles = (text) => {
  const words = text.replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  return new Set(words.slice(0, -4).map((_, i) => words.slice(i, i + 5).join(" ")));
};
const signature = docs.map((d) => ({ ...d, set: shingles(d.text) }));
for (let i = 0; i < signature.length; i++) {
  for (let j = i + 1; j < signature.length; j++) {
    if (docs[i].title === docs[j].title)
      errors.push(`${docs[i].file}/${docs[j].file}: duplicate title`);
    const a = signature[i].set;
    const b = signature[j].set;
    let overlap = 0;
    for (const item of a) {
      if (b.has(item)) overlap++;
    }
    const similarity = overlap / Math.max(1, Math.min(a.size, b.size));
    if (similarity > 0.90)
      errors.push(
        `${docs[i].file}/${docs[j].file}: excessive similarity ${similarity
          .toFixed(2)}`
      );
  }
}

if (files.length === 0) {
  // No files yet, that's okay for initial run
  console.log("No content files found to validate.");
  process.exit(0);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Validated ${files.length} articles: schema, depth, claims, links, slugs and pairwise similarity passed.`
);
