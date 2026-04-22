import fs from 'fs';
import path from 'path';

// Load existing blog index
const blogIndex = JSON.parse(fs.readFileSync('./data/blog-index.json', 'utf8'));

const baseUrl = 'https://www.ewastekochi.com';
const urls = [];

function addUrl(loc, lastmod, changefreq = 'weekly', priority = 0.7) {
  urls.push({
    loc: loc,
    lastmod: lastmod,
    changefreq: changefreq,
    priority: priority
  });
}

// Add core pages
const corePages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/about/', priority: 0.8, changefreq: 'monthly' },
  { path: '/contact/', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog/', priority: 0.8, changefreq: 'daily' },
  { path: '/blog/topics/', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/services/', priority: 0.7, changefreq: 'weekly' },
  { path: '/blog/locations/', priority: 0.7, changefreq: 'weekly' },
  { path: '/services/', priority: 0.9, changefreq: 'weekly' },
  { path: '/locations/', priority: 0.9, changefreq: 'weekly' },
  { path: '/itad/', priority: 0.8, changefreq: 'weekly' },
  { path: '/faq/', priority: 0.7, changefreq: 'monthly' },
  { path: '/sell-electronics-kochi/', priority: 0.9, changefreq: 'weekly' },
  { path: '/recycling/', priority: 0.8, changefreq: 'weekly' }
];

corePages.forEach(page => {
  addUrl(
    `${baseUrl}${page.path}`,
    new Date().toISOString().split('T')[0],
    page.changefreq,
    page.priority
  );
});

// Add topic pages
const topics = [...new Set(blogIndex.map(blog => blog.topic))];
topics.forEach(topic => {
  addUrl(
    `${baseUrl}/blog/topic-${topic}/`,
    new Date().toISOString().split('T')[0],
    'weekly',
    0.7
  );
});

// Add service pages
const services = [...new Set(blogIndex.map(blog => blog.service))];
services.forEach(service => {
  addUrl(
    `${baseUrl}/blog/service-${service}/`,
    new Date().toISOString().split('T')[0],
    'weekly',
    0.7
  );
});

// Add location pages
const locations = [...new Set(blogIndex.map(blog => blog.location))];
locations.forEach(location => {
  addUrl(
    `${baseUrl}/blog/location-${location}/`,
    new Date().toISOString().split('T')[0],
    'weekly',
    0.7
  );
});

// Add all blog posts
console.log(`Adding ${blogIndex.length} blog posts to sitemap...`);
blogIndex.forEach((blog, index) => {
  addUrl(
    `${baseUrl}/blog/${blog.slug}/`,
    blog.publishDate,
    'monthly',
    0.6
  );

  if ((index + 1) % 200 === 0) {
    console.log(`Added ${index + 1} blog URLs...`);
  }
});

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

urls.forEach(url => {
  xml += '<url>\n';
  xml += `<loc>${url.loc}</loc>\n`;
  xml += `<lastmod>${url.lastmod}</lastmod>\n`;
  xml += `<changefreq>${url.changefreq}</changefreq>\n`;
  xml += `<priority>${url.priority}</priority>\n`;
  xml += '</url>\n';
});

xml += '</urlset>';

// Save sitemap
fs.writeFileSync('./public/sitemap-0.xml', xml);
console.log(`Sitemap saved to: ./public/sitemap-0.xml`);
console.log(`Sitemap contains ${urls.length} URLs`);

// Create sitemap index
const currentDate = new Date().toISOString().split('T')[0];
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.ewastekochi.com/sitemap-0.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync('./public/sitemap-index.xml', sitemapIndexXml);
console.log(`Sitemap index saved to: ./public/sitemap-index.xml`);

console.log('\nSitemap generation complete!');
console.log(`Total URLs: ${urls.length}`);
