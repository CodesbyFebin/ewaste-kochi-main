import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing blog index
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));

class SitemapUpdater {
  constructor() {
    this.blogs = blogIndex;
    this.baseUrl = 'https://www.ewastekochi.com';
    this.urls = [];
  }

  addUrl(loc, lastmod, changefreq = 'weekly', priority = 0.7) {
    this.urls.push({
      loc: loc,
      lastmod: lastmod,
      changefreq: changefreq,
      priority: priority
    });
  }

  generateSitemap() {
    console.log('Generating comprehensive sitemap with all blog URLs...');

    // Add core pages
    const corePages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/about/', priority: 0.8, changefreq: 'monthly' },
      { path: '/contact/', priority: 0.9, changefreq: 'weekly' },
      { path: '/blog/', priority: 0.8, changefreq: 'daily' },
      { path: '/blog/archives/', priority: 0.7, changefreq: 'weekly' },
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
      this.addUrl(
        `${this.baseUrl}${page.path}`,
        new Date().toISOString().split('T')[0],
        page.changefreq,
        page.priority
      );
    });

    // Add blog index pages
    const blogIndexPages = [
      '/blog/',
      '/blog/archives/',
      '/blog/topics/',
      '/blog/services/',
      '/blog/locations/'
    ];

    blogIndexPages.forEach(path => {
      this.addUrl(
        `${this.baseUrl}${path}`,
        new Date().toISOString().split('T')[0],
        'weekly',
        0.8
      );
    });

    // Add topic pages
    const topics = [...new Set(this.blogs.map(blog => blog.topic))];
    topics.forEach(topic => {
      this.addUrl(
        `${this.baseUrl}/blog/topic-${topic}/`,
        new Date().toISOString().split('T')[0],
        'weekly',
        0.7
      );
    });

    // Add service pages
    const services = [...new Set(this.blogs.map(blog => blog.service))];
    services.forEach(service => {
      this.addUrl(
        `${this.baseUrl}/blog/service-${service}/`,
        new Date().toISOString().split('T')[0],
        'weekly',
        0.7
      );
    });

    // Add location pages
    const locations = [...new Set(this.blogs.map(blog => blog.location))];
    locations.forEach(location => {
      this.addUrl(
        `${this.baseUrl}/blog/location-${location}/`,
        new Date().toISOString().split('T')[0],
        'weekly',
        0.7
      );
    });

    // Add all blog posts
    console.log(`Adding ${this.blogs.length} blog posts to sitemap...`);
    this.blogs.forEach((blog, index) => {
      this.addUrl(
        `${this.baseUrl}/blog/${blog.slug}/`,
        blog.publishDate,
        'monthly',
        0.6
      );

      if ((index + 1) % 200 === 0) {
        console.log(`Added ${index + 1} blog URLs...`);
      }
    });

    console.log(`Total URLs in sitemap: ${this.urls.length}`);
  }

  generateXml() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
    xml += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    this.urls.forEach(url => {
      xml += '<url>\n';
      xml += `<loc>${url.loc}</loc>\n`;
      xml += `<lastmod>${url.lastmod}</lastmod>\n`;
      xml += `<changefreq>${url.changefreq}</changefreq>\n`;
      xml += `<priority>${url.priority}</priority>\n`;
      xml += '</url>\n';
    });

    xml += '</urlset>';
    return xml;
  }

  saveSitemap() {
    const sitemapPath = path.join(__dirname, '../../public/sitemap-0.xml');
    const xml = this.generateXml();
    
    fs.writeFileSync(sitemapPath, xml);
    console.log(`Sitemap saved to: ${sitemapPath}`);
    console.log(`Sitemap contains ${this.urls.length} URLs`);
  }

  createSitemapIndex() {
    const sitemapIndexPath = path.join(__dirname, '../../public/sitemap-index.xml');
    const currentDate = new Date().toISOString().split('T')[0];
    
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.ewastekochi.com/sitemap-0.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    fs.writeFileSync(sitemapIndexPath, sitemapIndexXml);
    console.log(`Sitemap index saved to: ${sitemapIndexPath}`);
  }
}

// Generate and save sitemap
const updater = new SitemapUpdater();
updater.generateSitemap();
updater.saveSitemap();
updater.createSitemapIndex();

console.log('\nSitemap generation complete!');
console.log('Updated sitemap includes:');
console.log('- Core website pages');
console.log('- Blog index and archive pages');
console.log('- Topic category pages (8)');
console.log('- Service category pages (10)');
console.log('- Location category pages (10)');
console.log('- All blog posts (1,000)');
console.log(`Total: ${updater.urls.length} URLs`);
