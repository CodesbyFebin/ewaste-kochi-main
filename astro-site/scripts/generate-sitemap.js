const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const db = new Database("src/data/content.db", { readonly: true });
const today = new Date().toISOString().split("T")[0];

const pages = [
  { loc: "https://www.ewastekochi.com/", lastmod: today, changefreq: "weekly", priority: "1.0" },
  { loc: "https://www.ewastekochi.com/about/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.ewastekochi.com/services/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/contact/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/pricing/", lastmod: "2026-05-09", changefreq: "weekly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/faq/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.ewastekochi.com/blog/", lastmod: today, changefreq: "weekly", priority: "0.7" },
  { loc: "https://www.ewastekochi.com/terms/", lastmod: "2026-01-01", changefreq: "yearly", priority: "0.3" },
  { loc: "https://www.ewastekochi.com/privacy/", lastmod: "2026-01-01", changefreq: "yearly", priority: "0.3" },
  { loc: "https://www.ewastekochi.com/recycling/", lastmod: "2026-05-13", changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.ewastekochi.com/data-destruction/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/itad/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/sell-electronics/", lastmod: "2026-05-01", changefreq: "weekly", priority: "0.9" },
  { loc: "https://www.ewastekochi.com/scrap-price/", lastmod: "2026-05-09", changefreq: "weekly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/pickup/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/battery-recycling/", lastmod: "2026-05-13", changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.ewastekochi.com/hard-drive-shredding/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.ewastekochi.com/locations/", lastmod: "2026-05-01", changefreq: "monthly", priority: "0.8" },
];

const locations = [
  "kakkanad", "edappally", "ernakulam", "ernakulam-south", "fort-kochi", "kalamassery",
  "aluva", "vyttila", "palarivattom", "thrippunithura", "kaloor", "kadavanthra",
  "infopark-kochi", "angamaly", "north-paravur", "perumbavoor", "smart-city-kochi",
  "thrikkakara", "maradu", "kothamangalam", "kalamassery-hitech-park", "kalady",
  "muvattupuzha", "willingdon-island", "kozhikode", "thiruvananthapuram", "thrissur",
  "malappuram", "kollam", "kottayam", "kannur", "palakkad"
];
for (const loc of locations) {
  pages.push({ loc: `https://www.ewastekochi.com/locations/${loc}/`, lastmod: "2026-05-01", changefreq: "monthly", priority: "0.7" });
}

const blogs = db.prepare("SELECT pillar, category, slug FROM blogs ORDER BY pillar, category, slug").all();
for (const b of blogs) {
  pages.push({
    loc: `https://www.ewastekochi.com/blog/${b.pillar}/${b.category}/${b.slug}/`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.6"
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join("..", "ewk-site", "sitemap.xml"), xml);
console.log(`Generated sitemap with ${pages.length} URLs (${blogs.length} blogs)`);
