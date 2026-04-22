const fs = require('fs');
const path = require('path');

/**
 * Automated Sitemap Generation System
 * Handles 1000+ blog posts and complex URL structure for e-waste recycling website
 */

class SitemapUpdater {
  constructor() {
    this.baseUrl = 'https://www.ewastekochi.com';
    this.blogIndex = this.loadBlogIndex();
    this.servicePages = this.getServicePages();
    this.locationPages = this.getLocationPages();
    this.corePages = this.getCorePages();
  }

  /**
   * Load blog index data from JSON file
   */
  loadBlogIndex() {
    try {
      const blogIndexPath = path.join(__dirname, '../data/blog-index.json');
      if (fs.existsSync(blogIndexPath)) {
        return JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
      }
    } catch (error) {
      console.log('Blog index file not found, generating from blog files...');
    }
    
    // Generate blog index from existing files
    const blogDir = path.join(__dirname, '../src/content/blog');
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    
    return blogFiles.map(file => {
      const slug = file.replace('.md', '');
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      let publishDate = new Date().toISOString();
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const dateMatch = frontmatter.match(/publishDate:\s*"([^"]+)"/);
        if (dateMatch) {
          publishDate = dateMatch[1];
        }
      }
      
      return {
        slug,
        publishDate,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      };
    });
  }

  /**
   * Get service pages with proper structure
   */
  getServicePages() {
    const services = [
      'battery-recycling',
      'laptop-buyback',
      'data-destruction',
      'server-recycling',
      'phone-buyback',
      'printer-recycling',
      'monitor-recycling',
      'cable-recycling',
      'e-waste-collection',
      'it-asset-disposition',
      'hard-drive-shredding',
      'free-ewaste-pickup',
      'mobile-recycling',
      'corporate-ewaste',
      'tv-monitor-recycling',
      'network-equipment-disposal',
      'ups-inverter-recycling',
      'air-conditioner-recycling',
      'dpdp-act-compliance',
      'certificate-of-destruction',
      'sell-electronics',
      'hard-drive-destruction',
      'it-asset-inventory-audit',
      'electronics-recycling-near-me',
      'computer-recycling',
      'secure-computer-recycling',
      'laptop-recycling-near-me',
      'electronic-waste-disposal',
      'old-computer-disposal',
      'sell-old-electronics',
      'secure-laptop-disposal',
      'business-it-decommissioning',
      'hard-drive-degaussing'
    ];

    return services.map(service => ({
      url: `${this.baseUrl}/services/${service}/`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }));
  }

  /**
   * Get location pages for Kerala locations
   */
  getLocationPages() {
    const locations = [
      'kochi',
      'aluva',
      'ernakulam',
      'kakkanad',
      'edappally',
      'thrippunithura',
      'angamaly',
      'north-paravur',
      'kalamassery',
      'vytilla'
    ];

    return locations.map(location => ({
      url: `${this.baseUrl}/locations/${location}/`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));
  }

  /**
   * Get core pages with highest priority
   */
  getCorePages() {
    return [
      {
        url: this.baseUrl,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/about/`,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/contact/`,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/recycling/`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/marketplace/`,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/faq/`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/blog/`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/itad/`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/privacy-policy/`,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/terms/`,
        changefreq: 'yearly',
        priority: 0.3,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/seo-tips/`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString()
      },
      {
        url: `${this.baseUrl}/ultimate-seo-guide/`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString()
      }
    ];
  }

  /**
   * Add URL to sitemap
   */
  addUrl(url, lastmod, changefreq, priority) {
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }

  /**
   * Generate complete XML sitemap with multiple namespaces
   */
  generateXml() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" ';
    xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" ';
    xml += 'xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    // Add core pages first (highest priority)
    this.corePages.forEach(page => {
      xml += this.addUrl(page.url, page.lastmod, page.changefreq, page.priority) + '\n';
    });

    // Add service pages
    this.servicePages.forEach(page => {
      xml += this.addUrl(page.url, page.lastmod, page.changefreq, page.priority) + '\n';
    });

    // Add location pages
    this.locationPages.forEach(page => {
      xml += this.addUrl(page.url, page.lastmod, page.changefreq, page.priority) + '\n';
    });

    // Add blog posts
    this.blogIndex.forEach((blog, index) => {
      const url = `${this.baseUrl}/blog/${blog.slug}/`;
      xml += this.addUrl(url, blog.publishDate, 'monthly', 0.6) + '\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate sitemap index file for large sites
   */
  generateSitemapIndex() {
    let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    indexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Main sitemap
    indexXml += `  <sitemap>
    <loc>${this.baseUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>\n`;

    // Blog sitemap (if too many blog posts)
    if (this.blogIndex.length > 500) {
      indexXml += `  <sitemap>
    <loc>${this.baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>\n`;
    }

    // Services sitemap
    indexXml += `  <sitemap>
    <loc>${this.baseUrl}/sitemap-services.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>\n`;

    indexXml += '</sitemapindex>';
    return indexXml;
  }

  /**
   * Generate blog-specific sitemap
   */
  generateBlogSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    this.blogIndex.forEach(blog => {
      const url = `${this.baseUrl}/blog/${blog.slug}/`;
      xml += this.addUrl(url, blog.publishDate, 'monthly', 0.6) + '\n';
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Generate services-specific sitemap
   */
  generateServicesSitemap() {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add service-location combinations
    const locations = ['kochi', 'aluva', 'ernakulam', 'kakkanad', 'edappally'];
    const services = ['battery-recycling', 'laptop-buyback', 'data-destruction', 'server-recycling'];

    locations.forEach(location => {
      services.forEach(service => {
        const url = `${this.baseUrl}/${service}-${location}/`;
        xml += this.addUrl(url, new Date().toISOString(), 'weekly', 0.8) + '\n';
      });
    });

    xml += '</urlset>';
    return xml;
  }

  /**
   * Save sitemap files
   */
  saveSitemaps() {
    const publicDir = path.join(__dirname, '../public');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save main sitemap
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    const mainXml = this.generateXml();
    fs.writeFileSync(sitemapPath, mainXml);
    console.log(`Main sitemap saved: ${sitemapPath}`);

    // Save sitemap index
    const sitemapIndexPath = path.join(publicDir, 'sitemap-index.xml');
    const indexXml = this.generateSitemapIndex();
    fs.writeFileSync(sitemapIndexPath, indexXml);
    console.log(`Sitemap index saved: ${sitemapIndexPath}`);

    // Save blog sitemap if needed
    if (this.blogIndex.length > 500) {
      const blogSitemapPath = path.join(publicDir, 'sitemap-blogs.xml');
      const blogXml = this.generateBlogSitemap();
      fs.writeFileSync(blogSitemapPath, blogXml);
      console.log(`Blog sitemap saved: ${blogSitemapPath}`);
    }

    // Save services sitemap
    const servicesSitemapPath = path.join(publicDir, 'sitemap-services.xml');
    const servicesXml = this.generateServicesSitemap();
    fs.writeFileSync(servicesSitemapPath, servicesXml);
    console.log(`Services sitemap saved: ${servicesSitemapPath}`);

    // Save blog index for future use
    const blogIndexPath = path.join(__dirname, '../data/blog-index.json');
    fs.writeFileSync(blogIndexPath, JSON.stringify(this.blogIndex, null, 2));
    console.log(`Blog index saved: ${blogIndexPath}`);
  }

  /**
   * Update sitemap - main method
   */
  updateSitemap() {
    console.log('Starting sitemap generation...');
    console.log(`Processing ${this.blogIndex.length} blog posts...`);
    
    this.saveSitemaps();
    
    console.log('Sitemap generation complete!');
    console.log(`Generated sitemaps for:`);
    console.log(`- ${this.corePages.length} core pages`);
    console.log(`- ${this.servicePages.length} service pages`);
    console.log(`- ${this.locationPages.length} location pages`);
    console.log(`- ${this.blogIndex.length} blog posts`);
    console.log(`Total URLs: ${this.corePages.length + this.servicePages.length + this.locationPages.length + this.blogIndex.length}`);
  }
}

// Run if called directly
if (require.main === module) {
  const updater = new SitemapUpdater();
  updater.updateSitemap();
}

module.exports = SitemapUpdater;
