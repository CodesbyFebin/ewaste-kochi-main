const fs = require('fs');
const path = require('path');

const pillars = {
  collection: {
    title: 'E-Waste Collection Services in Kerala',
    desc: 'Free doorstep e-waste collection for homes and businesses in Kerala.',
    cats: ['enterprise', 'hospitals', 'residential', 'schools', 'sme']
  },
  recycling: {
    title: 'E-Waste Recycling Services in Kerala',
    desc: 'CPCB-authorized zero-landfill e-waste recycling services across Kerala.',
    cats: ['enterprise', 'hospitals', 'residential', 'schools', 'sme']
  },
  'data-destruction': {
    title: 'Data Destruction Services in Kerala',
    desc: 'DoD/NIST certified data destruction with Certificate of Destruction.',
    cats: ['enterprise', 'hospitals', 'residential', 'schools', 'sme']
  },
  itad: {
    title: 'IT Asset Disposal (ITAD) Services in Kerala',
    desc: 'Certified IT asset disposal and decommissioning for businesses in Kerala.',
    cats: ['enterprise', 'hospitals', 'residential', 'schools', 'sme']
  }
};

const catMeta = {
  enterprise: 'IT asset disposal and bulk e-waste pickup for offices.',
  hospitals: 'Biomedical and IT e-waste collection for healthcare facilities.',
  residential: 'Free home e-waste pickup for households.',
  schools: 'E-waste collection for educational institutions.',
  sme: 'Affordable e-waste collection for small businesses.'
};

const base = 'blog';

for (const [pillar, meta] of Object.entries(pillars)) {
  const dir = path.join(base, pillar);
  fs.mkdirSync(dir, { recursive: true });
  
  const catCards = meta.cats.map(cat => {
    return `<div class="card"><a href="https://www.ewastekochi.com/blog/${pillar}/${cat}/">${cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Guide →</a><p>${catMeta[cat]}</p></div>`;
  }).join('\n    ');
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${meta.title} | Ewaste Kochi</title>
<meta name="description" content="${meta.desc}">
<link rel="canonical" href="https://www.ewastekochi.com/blog/${pillar}/">
<link rel="stylesheet" href="/style.css">
<style>
body { font-family: system-ui, sans-serif; line-height: 1.7; max-width: 1000px; margin: 0 auto; padding: 1rem 1.5rem; color: #1f2937; background: #f9fafb; }
header { background: #0d7a38; color: #fff; padding: 1rem 1.5rem; margin: -1rem -1.5rem 2rem; }
header a { color: #fff; text-decoration: none; font-weight: 700; }
nav a { margin-left: 1.2rem; font-size: .9rem; }
.breadcrumb { font-size: .85rem; color: #6b7280; margin-bottom: 1.5rem; }
.breadcrumb a { color: #0d7a38; text-decoration: none; }
h1 { font-size: 2rem; font-weight: 800; color: #111827; margin-bottom: .5rem; }
.intro { font-size: 1.1rem; color: #374151; margin-bottom: 2rem; }
h2 { font-size: 1.2rem; font-weight: 700; color: #0d7a38; margin-top: 2.5rem; border-left: 3px solid #0d7a38; padding-left: .75rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: .8rem; margin-top: 1rem; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; padding: .9rem; font-size: .9rem; }
.card a { color: #0d7a38; text-decoration: none; font-weight: 600; display: block; margin-bottom: .3rem; }
.card p { font-size: .8rem; color: #6b7280; margin: 0; }
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
  <a href="https://www.ewastekochi.com/blog/">Blog</a> <span>›</span>
  <span>${meta.title}</span>
</nav>
<h1>${meta.title}</h1>
<p class="intro">${meta.desc}</p>
${meta.cats.map(cat => `<h2>${cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2><div class="grid">${catMeta[cat].split('.').slice(0,2).join('.') + '.'}</div>`).join('\n')}
<h2>Browse All Categories</h2>
<div class="grid">
    ${catCards}
</div>
<div class="cta-box">
  <h3>Professional ITAD & E-Waste Services</h3>
  <p>We serve 500+ enterprises across Kerala with certified data destruction and green recycling.</p>
  <a href="https://wa.me/917500555454?text=Hi%20I%20want%20to%20schedule%20a%20free%20e-waste%20pickup">Book Free Pickup Now</a>
</div>
<footer>
  <div style="margin-bottom: 0.8rem; font-weight: 700; color: #111827;">Ewaste Kochi – Authorized E-Waste Recycler</div>
  <p style="margin-bottom: 0.8rem; opacity: 0.8;">KSPCB Authorized: KL/EW/628 | NIST 800-88 Compliant Data Destruction</p>
  <div>&copy; 2026 Ewaste Kochi · <a href="https://www.ewastekochi.com" style="color: #0d7a38; font-weight: 700;">www.ewastekochi.com</a></div>
</footer>
</body>
</html>`;
  
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('Created:', dir + '/index.html');
}

console.log('Done creating hub pages');
