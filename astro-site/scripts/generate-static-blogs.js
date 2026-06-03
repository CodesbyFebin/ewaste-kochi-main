const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const db = new Database("src/data/content.db", { readonly: true });
const posts = db.prepare("SELECT * FROM blogs ORDER BY pillar, category, slug").all();
const outDir = path.resolve("blog");

console.log(`Generating ${posts.length} static blog pages...`);

let count = 0;
for (const post of posts) {
  const dir = path.join(outDir, post.pillar, post.category, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${post.title} | Ewaste Kochi</title>
<meta name="description" content="${post.excerpt}">
<link rel="canonical" href="https://www.ewastekochi.com/blog/${post.pillar}/${post.category}/${post.slug}/">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.excerpt}">
<meta property="og:url" content="https://www.ewastekochi.com/blog/${post.pillar}/${post.category}/${post.slug}/">
<meta property="og:type" content="article">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${post.title}",
  "description": "${post.excerpt}",
  "url": "https://www.ewastekochi.com/blog/${post.pillar}/${post.category}/${post.slug}/",
  "datePublished": "${post.date_published || "2026-05-17"}",
  "author": { "@type": "Organization", "name": "Ewaste Kochi", "url": "https://www.ewastekochi.com" },
  "publisher": { "@type": "Organization", "name": "Ewaste Kochi", "logo": { "@type": "ImageObject", "url": "https://www.ewastekochi.com/logo.png" } }
}
</script>
<link rel="stylesheet" href="/style.css">
<style>
body { font-family: system-ui, sans-serif; line-height: 1.7; max-width: 860px; margin: 0 auto; padding: 1rem 1.5rem; color: #1f2937; background: #f9fafb; }
header { background: #0d7a38; color: #fff; padding: 1rem 1.5rem; margin: -1rem -1.5rem 2rem; }
header a { color: #fff; text-decoration: none; font-weight: 700; }
nav a { margin-left: 1.2rem; font-size: .9rem; }
.breadcrumb { font-size: .85rem; color: #6b7280; margin-bottom: 1.5rem; }
.breadcrumb a { color: #0d7a38; text-decoration: none; }
article h1 { font-size: 1.8rem; font-weight: 800; color: #111827; margin-bottom: .5rem; }
article h2 { font-size: 1.2rem; font-weight: 700; color: #0d7a38; margin-top: 2rem; border-left: 3px solid #0d7a38; padding-left: .75rem; }
article h3 { font-size: 1rem; font-weight: 700; color: #374151; margin-top: 1.5rem; }
article ul, article ol { padding-left: 1.5rem; }
article li { margin-bottom: .4rem; }
.cta-box { background: #0d7a38; color: #fff; border-radius: 8px; padding: 1.5rem; margin: 2.5rem 0; text-align: center; }
.cta-box a { display: inline-block; background: #fff; color: #0d7a38; font-weight: 700; padding: .7rem 1.6rem; border-radius: 6px; text-decoration: none; margin-top: .5rem; }
footer { margin-top: 4rem; padding: 2rem 0; border-top: 1px solid #e5e7eb; font-size: .85rem; color: #6b7280; text-align: center; }
</style>
</head>
<body>
<header>
  <a href="https://www.ewastekochi.com">Ewaste Kochi</a>
  <nav>
    <a href="https://www.ewastekochi.com/itad/">ITAD</a>
    <a href="https://www.ewastekochi.com/recycling/">Recycling</a>
    <a href="https://www.ewastekochi.com/data-destruction/">Data Destruction</a>
    <a href="https://www.ewastekochi.com/contact/">Contact</a>
  </nav>
</header>
<nav class="breadcrumb">
  <a href="https://www.ewastekochi.com">Home</a> <span>›</span>
  <a href="https://www.ewastekochi.com/blog/${post.pillar}/">${post.pillar.replace(/-/g, ' ')}</a> <span>›</span>
  <a href="https://www.ewastekochi.com/blog/${post.pillar}/${post.category}/">${post.category.replace(/-/g, ' ')}</a> <span>›</span>
  <span>${post.title}</span>
</nav>
<article>
  <h1>${post.title}</h1>
  <div set:html="${post.content.replace(/"/g, '&quot;')}" />
</article>
<div class="cta-box">
  <div style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">Secure E-Waste Pickup & Data Destruction</div>
  <p style="margin-bottom: 1.5rem;">Free pickup across Kochi · NIST 800-88 Compliant · KSPCB Authorized</p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <a href="https://wa.me/917500555454?text=Hi%20I%20want%20to%20schedule%20a%20free%20e-waste%20pickup" style="background: #25D366; color: #fff; margin: 0;">WhatsApp for Instant Quote</a>
    <a href="https://www.ewastekochi.com/contact/" style="background: #fff; color: #0d7a38; margin: 0;">Book via Website</a>
  </div>
</div>
<footer>
  <div style="margin-bottom: 0.8rem; font-weight: 700; color: #111827;">Ewaste Kochi – Authorized E-Waste Recycler</div>
  <p style="margin-bottom: 0.8rem; opacity: 0.8;">KSPCB Authorized: KL/EW/628 | NIST 800-88 Compliant Data Destruction</p>
  <div>&copy; ${new Date().getFullYear()} Ewaste Kochi · <a href="https://www.ewastekochi.com" style="color: #0d7a38; font-weight: 700;">www.ewastekochi.com</a></div>
</footer>
</body>
</html>`;
  
  fs.writeFileSync(file, html);
  count++;
  if (count % 1000 === 0) console.log(`  Generated ${count}/${posts.length}...`);
}

console.log(`Done. Generated ${count} pages in ${outDir}`);
