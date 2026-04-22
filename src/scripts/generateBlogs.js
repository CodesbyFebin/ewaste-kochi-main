import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load structured data
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-structures.json'), 'utf8'));

class BlogGenerator {
  constructor() {
    this.locations = blogData.locations;
    this.services = blogData.services;
    this.topics = blogData.topics;
    this.brands = blogData.brands;
    this.contentTypes = blogData.contentTypes;
    this.generatedBlogs = [];
    this.usedSlugs = new Set();
  }

  generateSlug(title, location) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    const locationSlug = location ? `-${location.slug}` : '';
    const finalSlug = `${slug}${locationSlug}`;
    
    // Ensure unique slug
    let uniqueSlug = finalSlug;
    let counter = 1;
    while (this.usedSlugs.has(uniqueSlug)) {
      uniqueSlug = `${finalSlug}-${counter}`;
      counter++;
    }
    
    this.usedSlugs.add(uniqueSlug);
    return uniqueSlug;
  }

  generateTitle(template, service, location, brand = null, contentType = null) {
    const action = service.name.toLowerCase().replace('buyback', 'sell').replace('recycling', 'recycle');
    const alternative = this.getRandomAlternative(service);
    const season = this.getRandomSeason();
    const year = new Date().getFullYear();
    
    let title = template
      .replace(/{action}/g, action)
      .replace(/{service}/g, service.name)
      .replace(/{alternative}/g, alternative)
      .replace(/{brand}/g, brand || '')
      .replace(/{brand2}/g, this.getRandomBrand(brand))
      .replace(/{location}/g, location.name)
      .replace(/{season}/g, season)
      .replace(/{year}/g, year)
      .replace(/{contentType}/g, contentType || '');
    
    return title.replace(/\s+/g, ' ').trim();
  }

  getRandomAlternative(service) {
    const alternatives = {
      'E-Waste Collection': 'Electronic Waste Pickup',
      'Laptop Buyback': 'Laptop Recycling',
      'Phone Buyback': 'Mobile Phone Recycling',
      'Data Destruction': 'Data Wiping',
      'IT Asset Disposition': 'IT Asset Management',
      'Battery Recycling': 'Battery Disposal',
      'Server Recycling': 'Server Disposal',
      'Monitor Recycling': 'Screen Recycling',
      'Printer Recycling': 'Office Equipment Recycling',
      'Cable Recycling': 'Wire Recycling'
    };
    return alternatives[service.name] || service.name;
  }

  getRandomBrand(excludeBrand = null) {
    const availableBrands = excludeBrand 
      ? this.brands.filter(b => b !== excludeBrand)
      : this.brands;
    return availableBrands[Math.floor(Math.random() * availableBrands.length)];
  }

  getRandomSeason() {
    const seasons = ['Summer', 'Monsoon', 'Winter', 'Spring'];
    return seasons[Math.floor(Math.random() * seasons.length)];
  }

  generateContent(title, service, location, topic, brand = null) {
    const locationContext = this.getLocationContext(location);
    const serviceContext = this.getServiceContext(service);
    const brandContext = brand ? this.getBrandContext(brand) : '';
    
    const intro = this.generateIntroduction(title, service, location, brand);
    const mainContent = this.generateMainContent(service, location, topic, locationContext, serviceContext, brandContext);
    const conclusion = this.generateConclusion(service, location);
    const faq = this.generateFAQ(service, location);
    
    return {
      intro,
      mainContent,
      conclusion,
      faq
    };
  }

  getLocationContext(location) {
    return {
      landmarks: location.landmarks.join(', '),
      businessParks: location.businessParks.join(', '),
      population: location.population,
      pincode: location.pincode
    };
  }

  getServiceContext(service) {
    return {
      priceRange: service.priceRange,
      timeRequired: service.timeRequired,
      keywords: service.keywords.join(', ')
    };
  }

  getBrandContext(brand) {
    const brandInfo = {
      'Dell': 'renowned for reliable business laptops',
      'HP': 'known for quality office equipment',
      'Lenovo': 'popular for durable ThinkPad series',
      'Apple': 'premium devices with high resale value',
      'Samsung': 'leading smartphone manufacturer',
      'OnePlus': 'flagship killer smartphones',
      'Xiaomi': 'budget-friendly with great features',
      'LG': 'trusted electronics brand'
    };
    return brandInfo[brand] || 'well-known electronics brand';
  }

  generateIntroduction(title, service, location, brand) {
    const brandText = brand ? ` ${brand}` : '';
    const locationText = location.name;
    
    const intros = [
      `Looking for reliable ${service.name.toLowerCase()} in ${locationText}? This comprehensive guide covers everything you need to know about${brandText} e-waste management in ${locationText}, including process, pricing, and environmental benefits.`,
      
      `${locationText} residents and businesses often wonder about proper${brandText} disposal. Our detailed guide explains ${service.name.toLowerCase()} services available in ${locationText}, with expert insights on compliance and best practices.`,
      
      `Proper${brandText} e-waste management is crucial for ${locationText}'s environmental sustainability. This guide explores ${service.name.toLowerCase()} options, legal requirements, and trusted service providers in the ${locationText} area.`,
      
      `In ${locationText}'s growing tech landscape, responsible${brandText} disposal matters. Learn about ${service.name.toLowerCase()} services, pricing structures, and environmental impact for ${locationText} residents and businesses.`
    ];
    
    return intros[Math.floor(Math.random() * intros.length)];
  }

  generateMainContent(service, location, topic, locationContext, serviceContext, brandContext) {
    const sections = [];
    
    // Service-specific content
    sections.push({
      title: `Understanding ${service.name} in ${location.name}`,
      content: this.generateServiceSection(service, location, serviceContext, locationContext, brandContext)
    });
    
    // Location-specific content
    sections.push({
      title: `${location.name} Specific Considerations`,
      content: this.generateLocationSection(location, service, locationContext)
    });
    
    // Process/Procedure content
    sections.push({
      title: 'Step-by-Step Process',
      content: this.generateProcessSection(service, location)
    });
    
    // Pricing information
    sections.push({
      title: 'Pricing and Cost Factors',
      content: this.generatePricingSection(service, location, serviceContext)
    });
    
    // Environmental impact
    sections.push({
      title: 'Environmental Benefits',
      content: this.generateEnvironmentalSection(service, location)
    });
    
    return sections;
  }

  generateServiceSection(service, location, serviceContext, locationContext, brandContext) {
    const brandText = brandContext ? ` ${brandContext}` : '';
    
    return `In ${location.name}, ${service.name} services have evolved significantly to meet the growing demand for responsible e-waste management. The process typically takes ${serviceContext.timeRequired} and costs range from ${serviceContext.priceRange}.

${service.name} in ${location.name} serves various areas including ${locationContext.landmarks} and business parks like ${locationContext.businessParks}. The service caters to both residential and commercial clients, with special attention to${brandText} devices.

Key aspects of ${service.name.toLowerCase()} in ${location.name} include:
- Proper documentation and compliance with KSPCB regulations
- Secure data handling for devices containing sensitive information
- Environmentally responsible disposal methods
- Convenient pickup services across ${location.name} areas
- Competitive pricing based on device condition and market value`;
  }

  generateLocationSection(location, service, locationContext) {
    return `${location.name}, with a population of ${locationContext.population}, presents unique challenges and opportunities for ${service.name.toLowerCase()} services.

The service coverage extends to major landmarks including ${locationContext.landmarks}, ensuring accessibility for residents and businesses alike. Business parks in ${locationContext.businessParks} have specific requirements for corporate e-waste disposal, making ${service.name.toLowerCase()} services essential for compliance.

Local regulations in ${location.name} (Pincode: ${locationContext.pincode}) align with Kerala State Pollution Control Board guidelines, requiring proper documentation and certified disposal methods. Service providers in ${location.name} must maintain detailed records of collected e-waste and disposal certificates.`;
  }

  generateProcessSection(service, location) {
    return `The ${service.name.toLowerCase()} process in ${location.name} follows these standardized steps:

1. **Initial Assessment**: Contact the service provider with device details and location in ${location.name}
2. **Quotation**: Receive price estimate based on device condition, brand, and current market rates
3. **Documentation**: Complete required forms for KSPCB compliance and record-keeping
4. **Device Collection**: Schedule pickup at your ${location.name} location or drop-off at designated center
5. **Data Security**: For storage devices, professional data wiping or destruction is performed
6. **Transportation**: Secure transfer to certified recycling facility
7. **Processing**: Environmentally safe extraction of valuable materials
8. **Certificate**: Receive disposal certificate for your records

This entire process typically takes ${service.timeRequired} and ensures full compliance with environmental regulations.`;
  }

  generatePricingSection(service, location, serviceContext) {
    return `${service.name} pricing in ${location.name} varies based on several factors:

**Base Price Range**: ${serviceContext.priceRange}

**Factors Affecting Price**:
- Device condition and functionality
- Brand and model (premium brands fetch higher prices)
- Market demand for specific components
- Quantity of items being disposed
- Pickup location within ${location.name}
- Additional services like data destruction

**Additional Costs**:
- Data destruction services: Rs.500 - Rs.2,000
- Urgent pickup: 10-20% premium
- Bulk disposal discounts available for 10+ items
- Corporate contracts with customized pricing

**Payment Methods**:
- Cash on pickup
- Bank transfer
- UPI and digital payments
- Corporate billing options

Prices in ${location.name} are competitive with other major Kerala cities, reflecting the high demand for responsible e-waste management services.`;
  }

  generateEnvironmentalSection(service, location) {
    return `${service.name} in ${location.name} contributes significantly to environmental sustainability:

**Direct Environmental Benefits**:
- Reduces landfill waste by up to 95%
- Prevents toxic materials from contaminating soil and water
- Conserves natural resources through material recovery
- Reduces carbon footprint compared to manufacturing new products

**Local Impact in ${location.name}**:
- Supports Kerala's goal of 80% e-waste recycling by 2026
- Creates local employment in the recycling sector
- Reduces pollution in ${location.name}'s water systems
- Preserves natural resources for future generations

**Resource Recovery**:
- Metals: 70-90% recovery rate
- Plastics: 40-60% recovery rate  
- Precious metals: Gold, silver, copper extraction
- Hazardous materials: Safe disposal and neutralization

By choosing ${service.name.toLowerCase()} in ${location.name}, you're not just disposing of electronics - you're participating in a circular economy that benefits both the environment and local community.`;
  }

  generateConclusion(service, location) {
    return `${service.name} in ${location.name} is more than just disposal - it's a commitment to environmental responsibility and regulatory compliance.

With proper documentation, competitive pricing, and professional service providers, ${location.name} residents and businesses can easily manage their e-waste needs. The process ensures that valuable materials are recovered, harmful substances are safely handled, and environmental impact is minimized.

For the best ${service.name.toLowerCase()} experience in ${location.name}, choose certified providers who offer transparent pricing, proper documentation, and environmentally responsible disposal methods. This not only ensures compliance but also contributes to ${location.name}'s sustainability goals.

Take action today by contacting a reputable ${service.name.toLowerCase()} service in ${location.name} and join the growing movement toward responsible e-waste management.`;
  }

  generateFAQ(service, location) {
    const faqs = [
      {
        question: `What documents are required for ${service.name.toLowerCase()} in ${location.name}?`,
        answer: `You'll need a valid ID proof, address proof, and device ownership documents. For businesses, GST certificate and company registration documents are required. All documentation must comply with KSPCB regulations for ${location.name}.`
      },
      {
        question: `How long does ${service.name.toLowerCase()} take in ${location.name}?`,
        answer: `The complete process typically takes ${service.timeRequired} from initial contact to certificate issuance. Pickup in ${location.name} usually happens within 24 hours of scheduling.`
      },
      {
        question: `Is ${service.name.toLowerCase()} in ${location.name} environmentally safe?`,
        answer: `Yes, certified providers in ${location.name} follow strict environmental guidelines and KSPCB regulations. They ensure proper disposal and material recovery while preventing environmental contamination.`
      },
      {
        question: `Can I get instant cash for ${service.name.toLowerCase()} in ${location.name}?`,
        answer: `Payment methods vary by provider and item condition. Most offer cash, bank transfer, or UPI payments. Some high-value items may require verification before payment.`
      },
      {
        question: `Do you provide ${service.name.toLowerCase()} services for businesses in ${location.name}?`,
        answer: `Yes, we offer corporate ${service.name.toLowerCase()} services across ${location.name}, including bulk pickups, data destruction, and compliance documentation for businesses of all sizes.`
      }
    ];
    
    return faqs.slice(0, 3 + Math.floor(Math.random() * 2)); // 3-4 FAQs per article
  }

  generateSchema(title, slug, service, location, publishDate, content) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": content.intro.substring(0, 160) + '...',
      "image": `https://www.ewastekochi.com/images/blog/${slug}.jpg`,
      "author": {
        "@type": "Organization",
        "name": "EWaste Kochi",
        "url": "https://www.ewastekochi.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EWaste Kochi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.ewastekochi.com/logo.png"
        }
      },
      "datePublished": publishDate,
      "dateModified": publishDate,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.ewastekochi.com/blog/${slug}/`
      },
      "articleSection": service.category,
      "keywords": [service.name, location.name, ...service.keywords].join(', '),
      "wordCount": 1200 + Math.floor(Math.random() * 800),
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".blog-intro"]
      },
      "about": {
        "@type": "Thing",
        "name": service.name
      },
      "locationCreated": {
        "@type": "Place",
        "name": location.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": location.name,
          "addressRegion": "Kerala",
          "postalCode": location.pincode,
          "addressCountry": "IN"
        }
      }
    };
  }

  generateInternalLinks(currentBlog, allBlogs) {
    const links = [];
    
    // Link to related service pages
    links.push({
      text: `${currentBlog.service.name} in ${currentBlog.location.name}`,
      url: `/services/${currentBlog.service.slug}-${currentBlog.location.slug}/`,
      type: 'service'
    });
    
    // Link to location page
    links.push({
      text: `${currentBlog.location.name} E-Waste Services`,
      url: `/locations/${currentBlog.location.slug}/`,
      type: 'location'
    });
    
    // Link to 2-3 related blogs
    const relatedBlogs = allBlogs
      .filter(blog => 
        blog.slug !== currentBlog.slug && 
        (blog.service.slug === currentBlog.service.slug || 
         blog.location.slug === currentBlog.location.slug)
      )
      .slice(0, 3);
    
    relatedBlogs.forEach(blog => {
      links.push({
        text: blog.title,
        url: `/blog/${blog.slug}/`,
        type: 'blog'
      });
    });
    
    return links;
  }

  generateBlogs() {
    console.log('Generating 1,000 semantic blog posts...');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 365); // Start from 1 year ago
    
    for (let i = 0; i < 1000; i++) {
      const location = this.locations[Math.floor(Math.random() * this.locations.length)];
      const service = this.services[Math.floor(Math.random() * this.services.length)];
      const topic = this.topics[Math.floor(Math.random() * this.topics.length)];
      const template = topic.templates[Math.floor(Math.random() * topic.templates.length)];
      const brand = Math.random() > 0.7 ? this.getRandomBrand() : null; // 30% chance of brand-specific content
      
      const title = this.generateTitle(template, service, location, brand);
      const slug = this.generateSlug(title, location);
      
      // Generate publish date (spread over last year)
      const publishDate = new Date(startDate);
      publishDate.setDate(publishDate.getDate() + Math.floor((365 / 1000) * i));
      
      const content = this.generateContent(title, service, location, topic, brand);
      const schema = this.generateSchema(title, slug, service, location, publishDate.toISOString().split('T')[0], content);
      
      const blog = {
        slug,
        title,
        service,
        location,
        topic: topic.category,
        brand,
        publishDate: publishDate.toISOString().split('T')[0],
        content,
        schema,
        internalLinks: [] // Will be populated after all blogs are generated
      };
      
      this.generatedBlogs.push(blog);
      
      if ((i + 1) % 100 === 0) {
        console.log(`Generated ${i + 1} blogs...`);
      }
    }
    
    // Generate internal links after all blogs are created
    this.generatedBlogs.forEach(blog => {
      blog.internalLinks = this.generateInternalLinks(blog, this.generatedBlogs);
    });
    
    console.log('Blog generation complete!');
    return this.generatedBlogs;
  }

  saveBlogs() {
    const blogsDir = path.join(__dirname, '../../src/content/blog');
    
    if (!fs.existsSync(blogsDir)) {
      fs.mkdirSync(blogsDir, { recursive: true });
    }
    
    this.generatedBlogs.forEach((blog, index) => {
      const blogPath = path.join(blogsDir, `${blog.slug}.md`);
      
      // Generate markdown content
      let markdown = `---
title: "${blog.title}"
description: "${blog.content.intro.substring(0, 160)}..."
publishDate: "${blog.publishDate}"
category: "${blog.topic}"
tags: ["${blog.service.name}", "${blog.location.name}", "${blog.service.category}"${blog.brand ? `, "${blog.brand}"` : ''}]
service: "${blog.service.slug}"
location: "${blog.location.slug}"
${blog.brand ? `brand: "${blog.brand}"` : ''}
layout: "../../layouts/BlogPost.astro"
---

# ${blog.title}

${blog.content.intro}

${blog.content.mainContent.map(section => `
## ${section.title}

${section.content}
`).join('\n')}

## Conclusion

${blog.content.conclusion}

## Frequently Asked Questions

${blog.content.faq.map(faq => `
### ${faq.question}

${faq.answer}
`).join('\n')}

## Related Links

${blog.internalLinks.map(link => `- [${link.text}](${link.url})`).join('\n')}
`;
      
      fs.writeFileSync(blogPath, markdown);
      
      // Save schema separately for JSON-LD
      const schemaPath = path.join(blogsDir, `${blog.slug}.schema.json`);
      fs.writeFileSync(schemaPath, JSON.stringify(blog.schema, null, 2));
      
      if ((index + 1) % 100 === 0) {
        console.log(`Saved ${index + 1} blog files...`);
      }
    });
    
    // Save blog index for sitemap generation
    const indexPath = path.join(__dirname, '../../data/blog-index.json');
    fs.writeFileSync(indexPath, JSON.stringify(this.generatedBlogs.map(blog => ({
      slug: blog.slug,
      title: blog.title,
      publishDate: blog.publishDate,
      service: blog.service.slug,
      location: blog.location.slug,
      topic: blog.topic
    })), null, 2));
    
    console.log('All blog files saved successfully!');
  }
}

// Generate and save blogs
const generator = new BlogGenerator();
const blogs = generator.generateBlogs();
generator.saveBlogs();

console.log(`Successfully generated ${blogs.length} semantic blog posts!`);
console.log('Files saved to:');
console.log('- src/content/blog/*.md (blog content)');
console.log('- src/content/blog/*.schema.json (schema markup)');
console.log('- data/blog-index.json (blog index for sitemap)');
