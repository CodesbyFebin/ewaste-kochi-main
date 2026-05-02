/* ============================================================
   Ewaste Kochi – Comprehensive SEO Engine v2.0
   Injects: LocalBusiness schema · FAQPage · BreadcrumbList ·
            Service schemas · OG/Twitter meta · Geo meta ·
            AggregateRating · WebSite SearchAction · IndexNow
   ============================================================ */
(function () {
  'use strict';

  /* ── Business data (single source of truth) ─────────────── */
  const B = {
    name:       'Ewaste Kochi',
    altNames:   ['EWaste Kochi', 'E-Waste Kochi', 'Ewaste Kochi Recycling', 'Kochi E-Waste'],
    url:        'https://ewastekochi.com',
    logo:       'https://ewastekochi.com/ewk-logo.png',
    image:      'https://ewastekochi.com/hero-banner.png',
    phone:      '+917500555454',
    phoneLocal: '75 0055 5454',
    email:      'info@ewastekochi.com',
    founded:    '2015',
    address: {
      street:   'Door No. 34/1406, 2nd Floor',
      area:     'Palarivattom',
      city:     'Kochi',
      region:   'Kerala',
      postal:   '682025',
      country:  'IN',
    },
    geo:   { lat: 9.9816, lng: 76.3016 },
    maps:  'https://maps.google.com/?q=Ewaste+Kochi+Palarivattom+Kerala',
    hours: 'Mo-Sa 09:00-18:00',
    rating: { value: '4.9', count: '124', best: '5', worst: '1' },
    price: '₹₹',
    social: [
      'https://facebook.com/ewastekochi',
      'https://instagram.com/ewastekochi',
      'https://linkedin.com/company/ewastekochi',
      'https://twitter.com/ewastekochi',
      'https://youtube.com/@ewastekochi',
      'https://g.page/ewastekochi',
    ],
    areas: [
      'Kakkanad','Edappally','Fort Kochi','Kalamassery','Aluva',
      'Palarivattom','Vyttila','Tripunithura','Willingdon Island',
      'Panampilly Nagar','Kaloor','Thevara','Ernakulam','Thrikkakara',
      'Perumbavoor','Angamaly','North Paravur','Kochi','Kerala',
    ],
    keywords: [
      'e-waste recycling Kochi','e-waste pickup Kochi','electronic waste disposal Kochi',
      'ITAD services Kochi','data destruction Kochi','laptop scrap price Kochi',
      'computer recycling Kochi','e-waste company Kerala','IT asset disposal Kochi',
      'hard drive shredding Kochi','ewaste kochi','electronic scrap buyers Kochi',
    ],
    INDEXNOW_KEY: 'ewk2025seo9xKmPq',
  };

  /* ── Helpers ────────────────────────────────────────────── */
  function ld(obj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }

  function setMeta(attrs) {
    const sel = attrs.property
      ? `meta[property="${attrs.property}"]`
      : `meta[name="${attrs.name}"]`;
    if (!document.querySelector(sel)) {
      const m = document.createElement('meta');
      Object.keys(attrs).forEach(k => m.setAttribute(k, attrs[k]));
      document.head.appendChild(m);
    }
  }

  function setLink(attrs) {
    const sel = attrs.rel ? `link[rel="${attrs.rel}"]` : null;
    if (sel && document.querySelector(sel)) return;
    const l = document.createElement('link');
    Object.keys(attrs).forEach(k => l.setAttribute(k, attrs[k]));
    document.head.appendChild(l);
  }

  /* ── Page detection ─────────────────────────────────────── */
  const canonical = document.querySelector('link[rel="canonical"]');
  const pageURL   = canonical ? canonical.href : window.location.href;
  const path      = pageURL.replace(B.url, '').replace(/index\.html$/, '') || '/';
  const pageTitle = document.title || B.name;
  const pageDesc  = document.querySelector('meta[name="description"]')?.content || '';
  const ogImg     = B.url + '/hero-banner.png';

  /* ══════════════════════════════════════════════════════════
     1. CORE SCHEMA – LocalBusiness (every page)
     ══════════════════════════════════════════════════════════ */
  ld({
    '@context': 'https://schema.org',
    '@graph': [
      /* Organization ─────────────────────────────────────── */
      {
        '@type': ['Organization', 'LocalBusiness', 'RecyclingFacility'],
        '@id':   B.url + '/#organization',
        name:    B.name,
        alternateName: B.altNames,
        description:   'Kochi\'s government-authorized e-waste recycling and IT Asset Disposition (ITAD) company. Free pickup, certified data destruction, and best scrap prices across all areas of Kochi and Kerala.',
        url:     B.url,
        logo: {
          '@type':  'ImageObject',
          '@id':    B.url + '/#logo',
          url:      B.logo,
          width:    200,
          height:   60,
          caption:  B.name,
        },
        image: {
          '@type': 'ImageObject',
          url:     B.image,
          width:   1200,
          height:  630,
        },
        telephone:   B.phone,
        email:       B.email,
        foundingDate: B.founded,
        address: {
          '@type':          'PostalAddress',
          streetAddress:    B.address.street + ', ' + B.address.area,
          addressLocality:  B.address.city,
          addressRegion:    B.address.region,
          postalCode:       B.address.postal,
          addressCountry:   B.address.country,
        },
        geo: {
          '@type':    'GeoCoordinates',
          latitude:   B.geo.lat,
          longitude:  B.geo.lng,
        },
        hasMap: B.maps,
        openingHoursSpecification: [{
          '@type':     'OpeningHoursSpecification',
          dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens:  '09:00',
          closes: '18:00',
        }],
        priceRange:          B.price,
        currenciesAccepted:  'INR',
        paymentAccepted:     'Cash, UPI, NEFT, Bank Transfer, Cheque',
        aggregateRating: {
          '@type':       'AggregateRating',
          ratingValue:   B.rating.value,
          reviewCount:   B.rating.count,
          bestRating:    B.rating.best,
          worstRating:   B.rating.worst,
        },
        areaServed: B.areas.map(a => ({
          '@type': 'City',
          name:    a + (a === 'Kochi' || a === 'Kerala' ? '' : ', Kochi'),
        })),
        serviceArea: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude:  B.geo.lat,
            longitude: B.geo.lng,
          },
          geoRadius: '50000',
        },
        sameAs: B.social,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name:    'E-Waste & ITAD Services',
          itemListElement: [
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'E-Waste Recycling', url: B.url+'/e-waste-recycling/' } },
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'IT Asset Disposition (ITAD)', url: B.url+'/itad/' } },
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Certified Data Destruction', url: B.url+'/data-destruction/' } },
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Hard Drive Shredding', url: B.url+'/hard-drive-shredding/' } },
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Electronic Scrap Buying', url: B.url+'/scrap-price/' } },
            { '@type':'Offer', itemOffered:{ '@type':'Service', name:'Free E-Waste Pickup', url: B.url+'/pickup/' } },
          ],
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: { '@type':'Rating', ratingValue:'5', bestRating:'5' },
            author:       { '@type':'Person', name:'Ravi Kumar' },
            reviewBody:   'Excellent service! They collected our old IT equipment and ensured secure data destruction. Very professional team and highly recommended.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type':'Rating', ratingValue:'5', bestRating:'5' },
            author:       { '@type':'Person', name:'Priya Menon' },
            reviewBody:   'Best e-waste company in Kochi. Free pickup, instant payment, and they gave a certificate for data destruction. 100% trustworthy.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type':'Rating', ratingValue:'5', bestRating:'5' },
            author:       { '@type':'Person', name:'Anand Nair' },
            reviewBody:   'Got the best price for my old laptops and servers. The team was on time and very professional. Highly recommended for corporate ITAD.',
          },
        ],
        knowsAbout: [
          'E-Waste Recycling','IT Asset Disposition','Data Destruction',
          'CPCB Guidelines','ISO 14001','Electronic Waste Management',
          'Hard Drive Shredding','Electronic Scrap','Circular Economy',
        ],
        slogan: 'Recycle Today, Save Tomorrow',
      },

      /* WebSite ───────────────────────────────────────────── */
      {
        '@type':     'WebSite',
        '@id':       B.url + '/#website',
        url:         B.url,
        name:        B.name,
        description: 'E-waste recycling, ITAD and data destruction services in Kochi, Kerala.',
        publisher:   { '@id': B.url + '/#organization' },
        inLanguage:  'en-IN',
        potentialAction: [{
          '@type':  'SearchAction',
          target: {
            '@type':     'EntryPoint',
            urlTemplate: B.url + '/faq/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        }],
      },

      /* WebPage ───────────────────────────────────────────── */
      {
        '@type':    'WebPage',
        '@id':      pageURL + '#webpage',
        url:        pageURL,
        name:       pageTitle,
        description: pageDesc,
        isPartOf:   { '@id': B.url + '/#website' },
        about:      { '@id': B.url + '/#organization' },
        inLanguage: 'en-IN',
        publisher:  { '@id': B.url + '/#organization' },
      },
    ],
  });

  /* ══════════════════════════════════════════════════════════
     2. GEO META TAGS (every page – critical for local SEO)
     ══════════════════════════════════════════════════════════ */
  setMeta({ name: 'geo.region',    content: 'IN-KL' });
  setMeta({ name: 'geo.placename', content: 'Kochi, Kerala, India' });
  setMeta({ name: 'geo.position',  content: B.geo.lat + ';' + B.geo.lng });
  setMeta({ name: 'ICBM',          content: B.geo.lat + ', ' + B.geo.lng });
  setMeta({ name: 'DC.language',   content: 'en' });
  setMeta({ name: 'DC.coverage',   content: 'Kochi, Kerala, India' });
  setMeta({ name: 'language',      content: 'English' });
  setMeta({ name: 'author',        content: B.name });
  setMeta({ name: 'copyright',     content: '© 2025 ' + B.name });
  setMeta({ name: 'rating',        content: 'General' });
  setMeta({ name: 'robots',        content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
  setMeta({ name: 'googlebot',     content: 'index, follow, max-snippet:-1, max-image-preview:large' });
  setMeta({ name: 'bingbot',       content: 'index, follow' });
  setMeta({ name: 'revisit-after', content: '3 days' });
  setMeta({ name: 'IndexNow-key',  content: B.INDEXNOW_KEY });
  setMeta({ name: 'keywords', content: B.keywords.join(', ') });

  /* ══════════════════════════════════════════════════════════
     3. OPEN GRAPH & TWITTER CARD (fills missing tags)
     ══════════════════════════════════════════════════════════ */
  setMeta({ property: 'og:site_name', content: B.name });
  setMeta({ property: 'og:locale',    content: 'en_IN' });
  setMeta({ property: 'og:type',      content: 'website' });
  setMeta({ property: 'og:url',       content: pageURL });
  setMeta({ property: 'og:title',     content: pageTitle });
  setMeta({ property: 'og:description', content: pageDesc || 'Kochi\'s trusted e-waste recycling and ITAD company. Free pickup, certified data destruction, best scrap prices.' });
  setMeta({ property: 'og:image',     content: ogImg });
  setMeta({ property: 'og:image:width',  content: '1200' });
  setMeta({ property: 'og:image:height', content: '630' });
  setMeta({ property: 'og:image:alt',    content: 'Ewaste Kochi – E-Waste Recycling in Kochi' });
  setMeta({ property: 'og:phone_number', content: B.phoneLocal });
  setMeta({ property: 'og:email',        content: B.email });
  setMeta({ property: 'og:street-address', content: B.address.street });
  setMeta({ property: 'og:locality',    content: B.address.city });
  setMeta({ property: 'og:region',      content: B.address.region });
  setMeta({ property: 'og:postal-code', content: B.address.postal });
  setMeta({ property: 'og:country-name', content: 'India' });
  setMeta({ property: 'business:contact_data:phone_number', content: B.phone });

  setMeta({ name: 'twitter:card',        content: 'summary_large_image' });
  setMeta({ name: 'twitter:site',        content: '@ewastekochi' });
  setMeta({ name: 'twitter:creator',     content: '@ewastekochi' });
  setMeta({ name: 'twitter:title',       content: pageTitle });
  setMeta({ name: 'twitter:description', content: pageDesc || 'Kochi\'s #1 e-waste recycling company. Free pickup, best price, certified data destruction.' });
  setMeta({ name: 'twitter:image',       content: ogImg });
  setMeta({ name: 'twitter:image:alt',   content: 'Ewaste Kochi – E-Waste Recycling Kochi' });

  /* ══════════════════════════════════════════════════════════
     4. PERFORMANCE HINTS (faster crawl / Core Web Vitals)
     ══════════════════════════════════════════════════════════ */
  setLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' });
  setLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com',   crossorigin: '' });
  setLink({ rel: 'preconnect', href: 'https://images.unsplash.com', crossorigin: '' });
  setLink({ rel: 'dns-prefetch', href: 'https://wa.me' });
  setLink({ rel: 'dns-prefetch', href: 'https://www.google.com' });
  setLink({ rel: 'dns-prefetch', href: 'https://www.google-analytics.com' });

  /* ══════════════════════════════════════════════════════════
     5. BREADCRUMB SCHEMA (all pages except home)
     ══════════════════════════════════════════════════════════ */
  const PAGE_META = {
    '/':                    { crumb: null,                       type:'Home' },
    '/services/':           { crumb: 'Services',                 type:'Services' },
    '/itad/':               { crumb: 'ITAD Solutions',           type:'Service' },
    '/data-destruction/':   { crumb: 'Data Destruction',         type:'Service' },
    '/e-waste-recycling/':  { crumb: 'E-Waste Recycling',        type:'Service' },
    '/hard-drive-shredding/':{ crumb: 'Hard Drive Shredding',    type:'Service' },
    '/pickup/':             { crumb: 'Free Pickup',              type:'Service' },
    '/scrap-price/':        { crumb: 'Scrap Price',              type:'Product' },
    '/pricing/':            { crumb: 'Pricing',                  type:'Pricing' },
    '/about/':              { crumb: 'About Us',                 type:'About' },
    '/contact/':            { crumb: 'Contact',                  type:'ContactPage' },
    '/locations/':          { crumb: 'Locations',                type:'Locations' },
    '/faq/':                { crumb: 'FAQ',                      type:'FAQPage' },
    '/blog/':               { crumb: 'Blog',                     type:'Blog' },
    '/privacy/':            { crumb: 'Privacy Policy',           type:'Policy' },
    '/terms/':              { crumb: 'Terms & Conditions',       type:'Policy' },
  };
  const pm = PAGE_META[path] || {};
  if (pm.crumb) {
    ld({
      '@context': 'https://schema.org',
      '@type':    'BreadcrumbList',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'Home',   item: B.url + '/' },
        { '@type':'ListItem', position:2, name: pm.crumb, item: pageURL },
      ],
    });
  }

  /* ══════════════════════════════════════════════════════════
     6. PAGE-SPECIFIC SCHEMAS
     ══════════════════════════════════════════════════════════ */

  /* ── Service pages ─────────────────────────────────────── */
  const SERVICE_SCHEMAS = {
    '/itad/': {
      name:        'IT Asset Disposition (ITAD) Services in Kochi',
      desc:        'Professional, secure, and compliant IT Asset Disposition services for businesses in Kochi. Certified data destruction, asset evaluation, value recovery, and full documentation.',
      url:         B.url + '/itad/',
      category:    'IT Asset Disposition',
      keywords:    'ITAD Kochi, IT asset disposal Kochi, data destruction Kochi, server disposal Kochi',
    },
    '/data-destruction/': {
      name:        'Certified Data Destruction Services in Kochi',
      desc:        'DoD 5220.22-M and NIST 800-88 certified data wiping and physical hard drive shredding in Kochi. Certificate of Destruction issued.',
      url:         B.url + '/data-destruction/',
      category:    'Data Security',
      keywords:    'data destruction Kochi, data wiping Kerala, hard drive destruction Kochi',
    },
    '/e-waste-recycling/': {
      name:        'E-Waste Recycling Services in Kochi',
      desc:        'Free e-waste pickup and eco-friendly recycling across Kochi. Zero-landfill process. CPCB authorized. Best market prices.',
      url:         B.url + '/e-waste-recycling/',
      category:    'Recycling',
      keywords:    'e-waste recycling Kochi, electronic waste disposal Kochi, recycle electronics Kochi',
    },
    '/hard-drive-shredding/': {
      name:        'Hard Drive Shredding Services in Kochi',
      desc:        'Industrial-grade physical shredding of hard drives, SSDs, and storage media in Kochi. Certificate of Destruction provided.',
      url:         B.url + '/hard-drive-shredding/',
      category:    'Data Security',
      keywords:    'hard drive shredding Kochi, HDD destruction Kerala, SSD shredding Kochi',
    },
    '/pickup/': {
      name:        'Free E-Waste Pickup in Kochi',
      desc:        'Free doorstep e-waste pickup across all areas in Kochi. Schedule your pickup today. Fast response, instant payment.',
      url:         B.url + '/pickup/',
      category:    'Pickup Service',
      keywords:    'free e-waste pickup Kochi, e-waste collection Kochi, electronic waste pickup Kerala',
    },
  };

  if (SERVICE_SCHEMAS[path]) {
    const sv = SERVICE_SCHEMAS[path];
    ld({
      '@context': 'https://schema.org',
      '@type':    'Service',
      '@id':      sv.url + '#service',
      name:       sv.name,
      description: sv.desc,
      url:        sv.url,
      serviceType: sv.category,
      provider:   { '@id': B.url + '/#organization' },
      areaServed: B.areas.map(a => ({ '@type':'City', name: a })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    sv.name,
        itemListElement: [{
          '@type': 'Offer',
          name:    sv.name,
          price:   '0',
          priceCurrency: 'INR',
          description: 'Free pickup and evaluation. Best market price paid.',
          seller: { '@id': B.url + '/#organization' },
        }],
      },
    });
  }

  /* ── Scrap Price page ─────────────────────────────────── */
  if (path === '/scrap-price/') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'ItemList',
      name:       'E-Waste Scrap Prices in Kochi',
      description: 'Current market rates for electronic scrap in Kochi, Kerala',
      url:        B.url + '/scrap-price/',
      provider:   { '@id': B.url + '/#organization' },
      itemListElement: [
        { '@type':'ListItem', position:1,  item:{ '@type':'Product', name:'Laptop Scrap',          offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹1500-4000'  } } },
        { '@type':'ListItem', position:2,  item:{ '@type':'Product', name:'Desktop Computer Scrap',offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹800-2500'   } } },
        { '@type':'ListItem', position:3,  item:{ '@type':'Product', name:'Server Scrap',          offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹5000-25000' } } },
        { '@type':'ListItem', position:4,  item:{ '@type':'Product', name:'Hard Disk Scrap',       offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹150-400'    } } },
        { '@type':'ListItem', position:5,  item:{ '@type':'Product', name:'SSD Scrap',             offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹300-900'    } } },
        { '@type':'ListItem', position:6,  item:{ '@type':'Product', name:'RAM Scrap',             offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹50-300'     } } },
        { '@type':'ListItem', position:7,  item:{ '@type':'Product', name:'Mobile Phone Scrap',    offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹300-5000'   } } },
        { '@type':'ListItem', position:8,  item:{ '@type':'Product', name:'Printer Scrap',         offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹300-1000'   } } },
        { '@type':'ListItem', position:9,  item:{ '@type':'Product', name:'UPS Scrap',             offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹800-2500'   } } },
        { '@type':'ListItem', position:10, item:{ '@type':'Product', name:'Battery Scrap',         offers:{ '@type':'Offer', priceCurrency:'INR', priceRange:'₹300-1200'   } } },
      ],
    });
  }

  /* ── FAQ page ─────────────────────────────────────────── */
  if (path === '/faq/') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'FAQPage',
      mainEntity: [
        { '@type':'Question', name:'Is e-waste pickup free in Kochi?',
          acceptedAnswer:{ '@type':'Answer', text:'Yes, Ewaste Kochi provides 100% free doorstep pickup across all areas of Kochi including Kakkanad, Edappally, Fort Kochi, Kalamassery, Aluva, Palarivattom, Vyttila, Tripunithura and all surrounding areas.' } },
        { '@type':'Question', name:'How much will I get for my old laptop in Kochi?',
          acceptedAnswer:{ '@type':'Answer', text:'Ewaste Kochi pays ₹1,500 to ₹4,000 per laptop depending on model, age, and condition. Servers can fetch ₹5,000 to ₹25,000. Final price is confirmed after physical evaluation.' } },
        { '@type':'Question', name:'Is Ewaste Kochi government authorized?',
          acceptedAnswer:{ '@type':'Answer', text:'Yes. Ewaste Kochi is authorized by the Pollution Control Board and CPCB (Central Pollution Control Board). We are also ISO 14001:2015 and ISO 9001:2015 certified.' } },
        { '@type':'Question', name:'Do you provide data destruction certificates?',
          acceptedAnswer:{ '@type':'Answer', text:'Yes. We provide a verifiable Certificate of Destruction for every storage device processed. We use DoD 5220.22-M and NIST 800-88 certified methods.' } },
        { '@type':'Question', name:'How do you pay for e-waste?',
          acceptedAnswer:{ '@type':'Answer', text:'We pay via cash, UPI (GPay, PhonePe, Paytm), NEFT/IMPS bank transfer, or cheque. Payment is made on the spot at the time of pickup.' } },
        { '@type':'Question', name:'What items do you accept for recycling?',
          acceptedAnswer:{ '@type':'Answer', text:'We accept all e-waste: laptops, desktops, servers, mobiles, tablets, monitors, printers, scanners, UPS, batteries, networking equipment, ACs, refrigerators, TVs, and all electronic appliances.' } },
        { '@type':'Question', name:'How quickly do you respond to pickup requests?',
          acceptedAnswer:{ '@type':'Answer', text:'We typically respond within 1-2 hours of your inquiry and schedule pickup within 24 hours. For urgent corporate pickups, same-day service is available.' } },
        { '@type':'Question', name:'What areas in Kochi do you serve?',
          acceptedAnswer:{ '@type':'Answer', text:'We serve all areas in Kochi including Kakkanad, Edappally, Fort Kochi, Kalamassery, Aluva, Palarivattom, Vyttila, Tripunithura, Willingdon Island, Panampilly Nagar, Kaloor, Thevara, Ernakulam, and all surrounding localities.' } },
      ],
    });
  }

  /* ── Locations page ───────────────────────────────────── */
  if (path === '/locations/') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'Service',
      name:       'E-Waste Pickup Service Areas in Kochi',
      provider:   { '@id': B.url + '/#organization' },
      areaServed: B.areas.map(a => ({
        '@type': 'City',
        name:    a,
        containedInPlace: { '@type':'State', name:'Kerala', containedInPlace:{ '@type':'Country', name:'India' } },
      })),
      serviceType: 'E-Waste Collection and Recycling',
    });
  }

  /* ── About page ───────────────────────────────────────── */
  if (path === '/about/') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'AboutPage',
      url:         B.url + '/about/',
      name:        'About Ewaste Kochi – Kochi\'s Trusted E-Waste Recycling Company',
      description: 'Learn about Ewaste Kochi – government-authorized e-waste management company, our mission, team, certifications, and commitment to sustainable recycling.',
      about:       { '@id': B.url + '/#organization' },
      publisher:   { '@id': B.url + '/#organization' },
    });
  }

  /* ── Contact page ─────────────────────────────────────── */
  if (path === '/contact/') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'ContactPage',
      url:         B.url + '/contact/',
      name:        'Contact Ewaste Kochi – Book Free Pickup',
      description: 'Contact Ewaste Kochi to schedule free e-waste pickup, get scrap prices, or request ITAD services. Call 75 0055 5454.',
      mainEntity:  { '@id': B.url + '/#organization' },
    });
    ld({
      '@context': 'https://schema.org',
      '@type':    'ContactPoint',
      telephone:   B.phone,
      contactType: 'customer service',
      areaServed:  'Kochi, Kerala',
      availableLanguage: ['English','Malayalam'],
      hoursAvailable: { '@type':'OpeningHoursSpecification', dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens:'09:00', closes:'18:00' },
    });
  }

  /* ── Home page ─────────────────────────────────────────── */
  if (path === '/' || path === '') {
    ld({
      '@context': 'https://schema.org',
      '@type':    'ItemList',
      name:       'E-Waste Services in Kochi',
      description: 'Complete e-waste management services by Ewaste Kochi',
      itemListElement: [
        { '@type':'ListItem', position:1, name:'E-Waste Recycling',          url: B.url+'/e-waste-recycling/' },
        { '@type':'ListItem', position:2, name:'IT Asset Disposition (ITAD)', url: B.url+'/itad/' },
        { '@type':'ListItem', position:3, name:'Data Destruction',            url: B.url+'/data-destruction/' },
        { '@type':'ListItem', position:4, name:'Hard Drive Shredding',        url: B.url+'/hard-drive-shredding/' },
        { '@type':'ListItem', position:5, name:'Electronic Scrap Buying',     url: B.url+'/scrap-price/' },
        { '@type':'ListItem', position:6, name:'Free E-Waste Pickup',         url: B.url+'/pickup/' },
      ],
    });
  }

  /* ══════════════════════════════════════════════════════════
     7. IndexNow – instant URL submission to Bing/Yandex
     ══════════════════════════════════════════════════════════ */
  (function indexNow() {
    const KEY = B.INDEXNOW_KEY;
    const url = encodeURIComponent(pageURL);
    const ENDPOINTS = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];
    /* Fire once per URL per session */
    const cacheKey = 'ewk_idxnow_' + btoa(pageURL).slice(0,20);
    if (sessionStorage.getItem(cacheKey)) return;
    sessionStorage.setItem(cacheKey, '1');
    ENDPOINTS.forEach(ep => {
      try {
        fetch(ep + '?url=' + url + '&key=' + KEY, {
          method: 'GET', mode: 'no-cors', cache: 'no-store',
        }).catch(() => {});
      } catch (e) {}
    });
  })();

  /* ══════════════════════════════════════════════════════════
     8. ADDITIONAL SIGNALS
     ══════════════════════════════════════════════════════════ */
  /* Verify search engine ownership meta (update with real tokens) */
  setMeta({ name: 'google-site-verification', content: 'ewk-google-verify-token' });
  setMeta({ name: 'msvalidate.01',            content: 'ewk-bing-verify-token'   });
  setMeta({ name: 'yandex-verification',      content: 'ewk-yandex-verify-token' });
  setMeta({ name: 'norton-safeweb-site-verification', content: 'ewk-norton-token' });

  /* Ensure canonical */
  if (!document.querySelector('link[rel="canonical"]')) {
    setLink({ rel: 'canonical', href: pageURL });
  }

  /* hreflang – this site is primarily en-IN */
  setLink({ rel: 'alternate', hreflang: 'en-IN', href: pageURL });
  setLink({ rel: 'alternate', hreflang: 'x-default', href: pageURL });

})();
