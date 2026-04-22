import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load blog index
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));

class SitemapGenerator {
  constructor() {
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
    console.log('Generating comprehensive sitemap...');

    // Add core pages
    const corePages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/about/', priority: 0.8, changefreq: 'monthly' },
      { path: '/contact/', priority: 0.9, changefreq: 'weekly' },
      { path: '/blog/', priority: 0.8, changefreq: 'daily' },
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

    // Add service pages
    const services = [
      'e-waste-collection',
      'laptop-buyback', 
      'phone-buyback',
      'data-destruction',
      'itad',
      'battery-recycling',
      'server-recycling',
      'monitor-recycling',
      'printer-recycling',
      'cable-recycling'
    ];

    const locations = [
      'kochi', 'ernakulam', 'kakkanad', 'aluva', 'vyttila',
      'edappally', 'north-paravur', 'angamaly', 'thrippunithura', 'kalamassery'
    ];

    services.forEach(service => {
      locations.forEach(location => {
        this.addUrl(
          `${this.baseUrl}/services/${service}-${location}/`,
          new Date().toISOString().split('T')[0],
          'weekly',
          0.8
        );
      });
    });

    // Add location pages
    locations.forEach(location => {
      this.addUrl(
        `${this.baseUrl}/locations/${location}/`,
        new Date().toISOString().split('T')[0],
        'weekly',
        0.8
      );
    });

    // Add all blog posts
    console.log(`Adding ${blogIndex.length} blog posts to sitemap...`);
    blogIndex.forEach((blog, index) => {
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
}

// Generate and save sitemap
const generator = new SitemapGenerator();
generator.generateSitemap();
generator.saveSitemap();

console.log('Sitemap generation complete!');
