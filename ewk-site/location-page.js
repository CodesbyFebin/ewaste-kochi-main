const LOCATION_PAGES = {
  ernakulam: { name: 'Ernakulam', district: 'Ernakulam', lead: 'central Ernakulam, offices, apartments, shops and institutions', nearby: ['Kochi', 'Kakkanad', 'Palarivattom', 'Edappally'] },
  kakkanad: { name: 'Kakkanad', district: 'Ernakulam', lead: 'Infopark, SmartCity, IT offices, apartments and villas', nearby: ['Ernakulam', 'Kalamassery', 'Edappally', 'Thrikkakara'] },
  thrippunithura: { name: 'Thrippunithura', district: 'Ernakulam', lead: 'homes, offices, schools, clinics and commercial spaces', nearby: ['Vyttila', 'Kakkanad', 'Ernakulam', 'Maradu'] },
  aluva: { name: 'Aluva', district: 'Ernakulam', lead: 'homes, factories, warehouses, shops and offices', nearby: ['Kalamassery', 'Eloor', 'Angamaly', 'Ernakulam'] },
  edappally: { name: 'Edappally', district: 'Ernakulam', lead: 'retail stores, flats, showrooms, offices and service centres', nearby: ['Palarivattom', 'Kalamassery', 'Kakkanad', 'Ernakulam'] },
  kalamassery: { name: 'Kalamassery', district: 'Ernakulam', lead: 'industrial units, colleges, offices, warehouses and homes', nearby: ['Aluva', 'Edappally', 'Eloor', 'Kakkanad'] },
  vyttila: { name: 'Vyttila', district: 'Ernakulam', lead: 'commercial buildings, apartments, showrooms and offices', nearby: ['Kadavanthra', 'Maradu', 'Thrippunithura', 'Ernakulam'] },
  kozhikode: { name: 'Kozhikode', district: 'Kozhikode', lead: 'homes, businesses, hospitals, colleges and electronics shops', nearby: ['Malappuram', 'Kannur', 'Thrissur', 'Palakkad'] },
  kollam: { name: 'Kollam', district: 'Kollam', lead: 'homes, offices, schools, hospitals, retailers and warehouses', nearby: ['Thiruvananthapuram', 'Alappuzha', 'Kottayam', 'Kochi'] },
  thrissur: { name: 'Thrissur', district: 'Thrissur', lead: 'offices, jewellery showrooms, homes, colleges and institutions', nearby: ['Kochi', 'Palakkad', 'Malappuram', 'Kozhikode'] },
  malappuram: { name: 'Malappuram', district: 'Malappuram', lead: 'homes, mobile shops, offices, schools and institutions', nearby: ['Kozhikode', 'Thrissur', 'Palakkad', 'Kochi'] },
  trivandrum: { name: 'Thiruvananthapuram', district: 'Thiruvananthapuram', lead: 'Technopark offices, homes, government offices and institutions', nearby: ['Kollam', 'Kottayam', 'Alappuzha', 'Kochi'] },
  kottayam: { name: 'Kottayam', district: 'Kottayam', lead: 'homes, offices, colleges, hospitals and commercial buildings', nearby: ['Alappuzha', 'Pathanamthitta', 'Kochi', 'Kollam'] },
  kannur: { name: 'Kannur', district: 'Kannur', lead: 'homes, shops, offices, hospitals and educational institutions', nearby: ['Kozhikode', 'Kasargod', 'Wayanad', 'Malappuram'] },
  palakkad: { name: 'Palakkad', district: 'Palakkad', lead: 'industrial units, homes, offices, schools and warehouses', nearby: ['Thrissur', 'Malappuram', 'Kochi', 'Coimbatore'] },
  alappuzha: { name: 'Alappuzha', district: 'Alappuzha', lead: 'homes, hotels, offices, schools and local businesses', nearby: ['Kottayam', 'Kochi', 'Kollam', 'Pathanamthitta'] },
  pathanamthitta: { name: 'Pathanamthitta', district: 'Pathanamthitta', lead: 'homes, offices, schools, hospitals and small businesses', nearby: ['Kottayam', 'Kollam', 'Alappuzha', 'Kochi'] },
  kasargod: { name: 'Kasargod', district: 'Kasargod', lead: 'homes, offices, shops, hospitals and institutions', nearby: ['Kannur', 'Kozhikode', 'Wayanad', 'Mangalore'] },
  wayanad: { name: 'Wayanad', district: 'Wayanad', lead: 'homes, resorts, offices, schools and institutions', nearby: ['Kozhikode', 'Kannur', 'Malappuram', 'Mysuru'] },
  idukki: { name: 'Idukki', district: 'Idukki', lead: 'homes, resorts, offices, shops and institutions', nearby: ['Kottayam', 'Ernakulam', 'Thrissur', 'Munnar'] }
};

const LOCATION_SERVICES = [
  ['recycling.html', 'E-waste recycling', 'Responsible recycling for laptops, computers, printers, TVs, UPS, cables and mixed electronic scrap.'],
  ['battery-recycling.html', 'Battery recycling', 'Safe pickup for UPS, inverter, laptop, mobile, car and solar batteries with market-rate payment where applicable.'],
  ['sell-electronics.html', 'Sell old electronics', 'Best prices for laptops, mobiles, servers, RAM, HDD, SSD, GPU and electronic scrap with instant payment.'],
  ['scrap-price.html', 'Scrap price list', 'Check indicative daily prices before you book a pickup or request a quote on WhatsApp.']
];

function renderLocationPage(key) {
  const loc = LOCATION_PAGES[key] || LOCATION_PAGES.ernakulam;
  const pageUrl = `https://www.ewastekochi.com/locations/${key}/`;
  document.title = `E-Waste Pickup in ${loc.name} | Free Collection + Best Rates`;
  document.querySelector('meta[name="description"]').setAttribute('content', `Book e-waste pickup in ${loc.name}. Free collection, instant payment and eco-friendly recycling for laptops, batteries, computers, TVs and all electronics.`);
  document.querySelector('link[rel="canonical"]').setAttribute('href', pageUrl);
  document.querySelector('meta[property="og:title"]').setAttribute('content', `E-Waste Pickup in ${loc.name} | Free Collection + Best Rates`);
  document.querySelector('meta[property="og:description"]').setAttribute('content', `Book e-waste pickup in ${loc.name}. Free collection, best scrap prices and safe recycling for all electronics.`);
  document.querySelector('meta[property="og:url"]').setAttribute('content', pageUrl);
  document.querySelector('meta[name="twitter:title"]').setAttribute('content', `E-Waste Pickup in ${loc.name} | Free Collection`);
  document.querySelector('meta[name="twitter:description"]').setAttribute('content', `Free e-waste pickup, best scrap prices and safe recycling in ${loc.name}.`);

  document.getElementById('hdr').innerHTML = renderHeader('Locations');
  document.getElementById('ftr').innerHTML = renderFooter();
  document.getElementById('city-jsonld').textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `E-Waste Pickup in ${loc.name}`,
    serviceType: 'E-waste Recycling and Pickup',
    url: pageUrl,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Ewaste Kochi',
      telephone: '+917500555454',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        postalCode: '682025',
        addressCountry: 'IN'
      }
    },
    areaServed: { '@type': 'City', name: loc.name },
    description: `Free doorstep e-waste pickup and recycling in ${loc.name}, Kerala.`
  });

  document.getElementById('city-name').textContent = loc.name;
  document.getElementById('city-name-2').textContent = loc.name;
  document.getElementById('city-name-3').textContent = loc.name;
  document.getElementById('district-name').textContent = loc.district;
  document.getElementById('lead-copy').textContent = `We collect e-waste from ${loc.lead} in ${loc.name}. Schedule free doorstep pickup for old laptops, computers, mobiles, batteries, printers, servers, TVs and mixed electronic scrap.`;
  document.getElementById('nearby-list').innerHTML = loc.nearby.map(n => `<li>${n}</li>`).join('');
  document.getElementById('service-cards').innerHTML = LOCATION_SERVICES.map(([href, title, text]) => `
    <a class="loc-service-card" href="${href}">
      <strong>${title}</strong>
      <span>${text}</span>
    </a>`).join('');
  document.getElementById('faq-list').innerHTML = [
    [`Do you provide free e-waste pickup in ${loc.name}?`, `Yes. Ewaste Kochi provides free scheduled pickup in ${loc.name} for homes, offices, shops, institutions and bulk business collections.`],
    [`What electronic scrap do you collect in ${loc.name}?`, 'We collect laptops, desktops, servers, mobiles, printers, batteries, UPS units, cables, monitors, TVs and most electronic waste categories.'],
    [`Can I sell old laptops or batteries in ${loc.name}?`, 'Yes. We pay instant cash, UPI or bank transfer for items with scrap value, based on current market prices and device condition.'],
    [`How fast can you arrange pickup in ${loc.name}?`, 'Most pickups are confirmed within 24 hours. Same-day pickup is available for bulk e-waste and nearby routes when slots are open.']
  ].map((f, i) => `<div class="faq-item" id="lfaq-${i}"><div class="faq-q" onclick="toggleFAQ('lfaq-${i}')"><span>${f[0]}</span><span class="faq-toggle">+</span></div><div class="faq-a">${f[1]}</div></div>`).join('');
}
