/* shared.js - Injects header, footer, floating buttons and common scripts */

const SITE = {
  phone: '917500555454',
  phoneDisplay: '75 0055 5454',
  wa: 'https://wa.me/917500555454?text=Hi%20I%20want%20to%20schedule%20a%20free%20e-waste%20pickup',
  email: 'info@ewastekochi.com',
  address: 'Door No. 34/1406, 2nd Floor, Palarivattom, Kochi, Kerala - 682025',
  hours: 'Mon - Sat: 9:00 AM – 6:00 PM',
};

const NAV_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'Services', href: 'services.html', dropdown: [
    { label: 'IT Asset Disposal (ITAD)', href: 'itad.html' },
    { label: 'Data Destruction Services', href: 'data-destruction.html' },
    { label: 'E-Waste Recycling', href: 'e-waste-recycling.html' },
    { label: 'Electronic Scrap Buyers', href: 'scrap-price.html' },
    { label: 'Free E-Waste Pickup', href: 'pickup.html' },
  ]},
  { label: 'ITAD Solutions', href: 'itad.html', dropdown: [
    { label: 'ITAD Services Kochi', href: 'itad.html' },
    { label: 'Hard Drive Shredding', href: 'hard-drive-shredding.html' },
    { label: 'Data Destruction', href: 'data-destruction.html' },
  ]},
  { label: 'About Us', href: 'about.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Pricing', href: 'pricing.html' },
  { label: 'Scrap Price', href: 'scrap-price.html' },
  { label: 'Locations', href: 'locations.html' },
  { label: 'FAQ', href: 'faq.html' },
  { label: 'Contact Us', href: 'contact.html' },
];

const FOOTER_SERVICES = [
  { label: 'IT Asset Disposal (ITAD)', href: 'itad.html' },
  { label: 'Data Destruction Services', href: 'data-destruction.html' },
  { label: 'E-Waste Recycling', href: 'e-waste-recycling.html' },
  { label: 'Electronic Scrap Buyers', href: 'scrap-price.html' },
  { label: 'Free E-Waste Pickup', href: 'pickup.html' },
];

const FOOTER_AREAS = ['Kakkanad','Edappally','Fort Kochi','Kalamassery','Aluva','Palarivattom','Vyttila','Tripunithura','& All Areas in Kochi'];

const SVG = {
  wa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.115 1.528 5.84L0 24l6.335-1.506A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 01-5.003-1.37l-.359-.214-3.718.976.991-3.636-.234-.373A9.787 9.787 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.59 1 1 0 01-.25 1.01l-2.2 2.2z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  pin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/></svg>`,
  recycle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2l3 6h-2v4l-3-6H8l4-4zM6 8l-3 6h2v4l3-6h2L6 8zm12 0l-4 8h2v4l3-6h2l-3-6z"/></svg>`,
  fb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`,
  ig: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" stroke="white" stroke-width="2" fill="none"/></svg>`,
  li: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="white"/></svg>`,
  yt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>`,
};

function renderHeader(activeLabel = '') {
  const dropdownHtml = (items) => `
    <div class="dropdown-menu">
      ${items.map(i => `<a href="${i.href}">${i.label}</a>`).join('')}
    </div>`;

  const navHtml = NAV_LINKS.map(n => {
    if (n.dropdown) {
      return `<div class="dropdown">
        <a href="${n.href}" class="${n.label === activeLabel ? 'active' : ''}">${n.label}</a>
        ${dropdownHtml(n.dropdown)}
      </div>`;
    }
    return `<a href="${n.href}" class="${n.label === activeLabel ? 'active' : ''}">${n.label}</a>`;
  }).join('');

  return `
  <!-- Announce Bar -->
  <div class="announce-bar">
    <div class="badges">
      <span class="badge-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Government Authorized
      </span>
      <span class="badge-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        ISO 14001:2015 Certified
      </span>
      <span class="badge-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        100% CPCB Compliant
      </span>
    </div>
    <div class="announce-right">
      Have e-waste? We'll pick it up for free!
      <a href="${SITE.wa}" style="color:#fff;font-weight:700;display:flex;align-items:center;gap:5px;" target="_blank">
        ${SVG.wa} ${SITE.phoneDisplay}
      </a>
    </div>
  </div>

  <!-- Header -->
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2l3 6h-2v4l-3-6H8l4-4zM6 8l-4 8h2v4l4-8H6zm12 0l-4 8h2v4l4-8h-2z"/></svg>
        </div>
        <div class="logo-text">
          <div class="name">EWASTE KOCHI</div>
          <div class="tagline">Recycle Today, Save Tomorrow</div>
        </div>
      </a>

      <nav id="main-nav">
        ${navHtml}
      </nav>

      <div class="header-actions">
        <a href="contact.html" class="btn-book">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="15" height="15"><path d="M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/></svg>
          Book Free Pickup
        </a>
        <a href="${SITE.wa}" class="btn-wa-header" target="_blank" rel="noopener">
          ${SVG.wa}
          ${SITE.phoneDisplay}
        </a>
        <button class="mobile-menu-btn" onclick="toggleMobileMenu()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <!-- Footer -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div>
          <div class="footer-brand-logo">
            <div class="logo-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 2l3 6h-2v4l-3-6H8l4-4zM6 8l-4 8h2v4l4-8H6zm12 0l-4 8h2v4l4-8h-2z"/></svg>
            </div>
            <div class="logo-text">
              <div class="name">EWASTE KOCHI</div>
              <div class="tagline" style="color:rgba(255,255,255,.6)">Recycle Today, Save Tomorrow</div>
            </div>
          </div>
          <p class="footer-desc">Kochi's trusted e-waste recycling and ITAD company committed to data security, responsible recycling and a cleaner tomorrow.</p>
          <div class="footer-socials">
            <a href="#" class="footer-social">${SVG.fb}</a>
            <a href="#" class="footer-social">${SVG.ig}</a>
            <a href="#" class="footer-social">${SVG.li}</a>
            <a href="#" class="footer-social">${SVG.yt}</a>
          </div>
        </div>
        <!-- Quick Links -->
        <div>
          <div class="footer-col-title">Quick Links</div>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <a href="itad.html">ITAD Solutions</a>
            <a href="about.html">About Us</a>
            <a href="blog.html">Blog</a>
            <a href="pricing.html">Pricing</a>
            <a href="contact.html">Contact Us</a>
          </div>
        </div>
        <!-- Services -->
        <div>
          <div class="footer-col-title">Our Services</div>
          <div class="footer-links">
            ${FOOTER_SERVICES.map(s => `<a href="${s.href}">${s.label}</a>`).join('')}
          </div>
        </div>
        <!-- Areas -->
        <div>
          <div class="footer-col-title">Service Areas</div>
          <div class="footer-links">
            ${FOOTER_AREAS.map(a => `<a href="locations.html">${a}</a>`).join('')}
          </div>
        </div>
        <!-- Contact -->
        <div>
          <div class="footer-col-title">Contact Us</div>
          <div class="footer-contact-item">${SVG.phone} <a href="tel:+${SITE.phone}">${SITE.phoneDisplay}</a></div>
          <div class="footer-contact-item">${SVG.mail} <a href="mailto:${SITE.email}">${SITE.email}</a></div>
          <div class="footer-contact-item">${SVG.pin} Kochi, Kerala, India</div>
          <div class="footer-contact-item">${SVG.clock} ${SITE.hours}</div>
          <a href="${SITE.wa}" class="footer-wa-btn" target="_blank" rel="noopener" style="margin-top:1rem;display:inline-flex;">
            ${SVG.wa} WhatsApp Us
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-copy">© 2025 Ewaste Kochi. All Rights Reserved.</div>
        <div class="footer-bottom-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp -->
  <a href="${SITE.wa}" class="float-wa" target="_blank" rel="noopener" aria-label="WhatsApp">
    ${SVG.wa}
  </a>

  <!-- Scroll Progress -->
  <div id="scroll-progress"></div>`;
}

function renderCTABar() {
  return `
  <div class="cta-bar">
    <div class="cta-bar-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 2v3M16 2v3M3 9h18" stroke="white" stroke-width="1.5" fill="none"/></svg>
      <div>
        <div>Book Free Pickup</div>
        <div class="cta-bar-sub">Hassle-free pickup anywhere in Kochi</div>
      </div>
    </div>
    <a href="tel:+${SITE.phone}" class="cta-bar-item" style="color:#fff">
      ${SVG.phone}
      <div>
        <div>Call Now ${SITE.phoneDisplay}</div>
        <div class="cta-bar-sub">Quick Response</div>
      </div>
    </a>
    <a href="${SITE.wa}" class="cta-bar-item" style="color:#fff" target="_blank">
      ${SVG.wa}
      <div>
        <div>WhatsApp Us</div>
        <div class="cta-bar-sub">Quick Response</div>
      </div>
    </a>
  </div>`;
}

function renderFAQ(faqs) {
  return faqs.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <div class="faq-q" onclick="toggleFAQ('faq-${i}')">
        <span>${f.q}</span>
        <span class="faq-toggle">+</span>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

// ── SCRIPTS ──
function toggleFAQ(id) {
  const el = document.getElementById(id);
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function toggleMobileMenu() {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('open');
}

window.addEventListener('scroll', () => {
  const p = document.getElementById('scroll-progress');
  if (p) p.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
  const header = document.querySelector('header');
  if (header) header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.12)' : '';
});

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(current).toLocaleString('en-IN') + suffix;
    }, 25);
  });
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); io.disconnect(); }});
}, { threshold: 0.3 });
document.querySelectorAll('.stats-bar, .stats-grid').forEach(el => io.observe(el));

/* ── Auto-load EcoBot chatbot on every page ── */
(function () {
  function loadBot() {
    var s = document.createElement('script');
    s.src = 'ewaste-chatbot.js';
    s.async = true;
    document.body.appendChild(s);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBot);
  } else {
    loadBot();
  }
})();

/* ── Auto-load SEO engine on every page ── */
(function () {
  function loadSEO() {
    var s = document.createElement('script');
    s.src = 'ewaste-seo.js';
    s.async = true;
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSEO);
  } else {
    loadSEO();
  }
})();
