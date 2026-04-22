const fs = require('fs');
const path = require('path');

/**
 * Blog Generator - Creates blog posts from title lists
 * Generates 10,000 blog posts with proper structure and SEO
 */

class BlogGenerator {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.templates = this.loadTemplates();
    this.blogData = this.loadBlogData();
    this.locations = this.blogData.locations;
    this.services = this.blogData.services;
    this.topics = this.blogData.topics;
    this.brands = this.blogData.brands;
    this.contentTypes = this.blogData.contentTypes;
  }

  /**
   * Generate blogs from CSV or array of titles
   */
  async generateFromTitles(titles) {
    console.log(`🚀 Starting blog generation for ${titles.length} titles...`);
    
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const blogPost = this.generateBlogPost(title, i);
      
      const filename = this.generateFilename(title);
      const filePath = path.join(this.blogDir, filename);
      
      fs.writeFileSync(filePath, blogPost);
      
      if ((i + 1) % 100 === 0) {
        console.log(`📝 Generated ${i + 1}/${titles.length} blog posts...`);
      }
    }
    
    console.log(`✅ Successfully generated ${titles.length} blog posts!`);
  }

  /**
   * Generate 10,000 diverse blog posts using structured data
   */
  async generateBulkBlogs(count = 10000) {
    console.log(`🚀 Generating ${count} diverse blog posts using structured data...`);
    
    for (let i = 0; i < count; i++) {
      const { title, service, location, topic, brand } = this.generateStructuredContent(i);
      const blogPost = this.generateBlogPost(title, i, service, location, topic, brand);
      
      const filename = this.generateFilename(title);
      const filePath = path.join(this.blogDir, filename);
      
      fs.writeFileSync(filePath, blogPost);
      
      if ((i + 1) % 500 === 0) {
        console.log(`📝 Generated ${i + 1}/${count} blog posts...`);
      }
    }
    
    console.log(`✅ Successfully generated ${count} blog posts!`);
  }

  /**
   * Generate individual blog post
   */
  generateBlogPost(title, index) {
    const frontmatter = this.generateFrontmatter(title, index);
    const content = this.generateContent(title);
    const schema = this.generateSchema(frontmatter, content);
    
    return `${frontmatter}\n\n${schema}\n\n${content}`;
  }

  /**
   * Generate frontmatter
   */
  generateFrontmatter(title, index) {
    const location = this.locations[Math.floor(Math.random() * this.locations.length)];
    const service = this.services[Math.floor(Math.random() * this.services.length)];
    const brand = this.brands[Math.floor(Math.random() * this.brands.length)];
    
    return `---
title: "${title}"
description: "${this.generateDescription(title, location)}"
author: "EWaste Kochi Team"
published: "${this.generateDate(index)}"
priority: ${(Math.random() * 0.3 + 0.7).toFixed(1)}
category: "${this.getCategory(title)}"
tags: ${JSON.stringify(this.generateTags(title, location, service))}
service: "${service}"
location: "${location}"
brand: "${brand}"
wordCount: ${1500 + Math.floor(Math.random() * 1000)}
templateType: "comprehensive-guide"
sections: "introduction, process, benefits, costs, faq, conclusion"
internalLinks: ${Math.floor(Math.random() * 5) + 3}
relatedPosts: "${this.generateRelatedPosts(title)}"
tableOfContents: ${Math.floor(Math.random() * 4) + 4}
faqs: ${Math.floor(Math.random() * 4) + 4}
ctas: ${Math.floor(Math.random() * 2) + 2}
canonical: ""
lastmod: "${this.generateDate(index)}"
seoEnhanced: true
---`;
  }

  /**
   * Generate blog content using structured data
   */
  generateContent(title, service, location, topic, brand) {
    const serviceData = this.services.find(s => s.slug === service) || this.services[0];
    const locationData = this.locations.find(l => l.slug === location) || this.locations[0];
    
    return `# ${title}

${title} services in ${locationData.name} have evolved significantly over years. With increasing focus on environmental sustainability and regulatory compliance, proper ${title} has become essential for both individuals and businesses.

## Understanding ${title} in ${locationData.name}

In ${locationData.name}, ${title} services have evolved significantly to meet growing demand for responsible e-waste management. The process typically takes ${serviceData.timeRequired} and costs range from ${serviceData.priceRange}.

${title} in ${locationData.name} serves various areas including ${locationData.landmarks.join(', ')} and business parks like ${locationData.businessParks.join(', ')}. The service caters to both residential and commercial clients, with special attention to well-known electronics brand devices.

Key aspects of ${serviceData.name} in ${locationData.name} include:
- Proper documentation and compliance with KSPCB regulations
- Secure data handling for devices containing sensitive information
- Environmentally responsible disposal methods
- Convenient pickup services across ${locationData.name} areas
- Competitive pricing based on device condition and market value

## Step-by-Step Process

1. **Initial Assessment**: Evaluate your ${title.toLowerCase()} needs
2. **Documentation**: Prepare required documents
3. **Collection**: Schedule pickup from your ${locationData.name} location
4. **Processing**: Professional handling and segregation
5. **Disposal**: Environmentally safe disposal methods
6. **Certification**: Receive compliance certificates

## Local Regulations

The Kerala State Pollution Control Board (KSPCB) regulates ${title.toLowerCase()} in ${locationData.name}. Key regulations include proper documentation, certified processing, and environmental compliance standards.

## Cost Considerations

${title} costs in ${locationData.name} vary based on volume, type, and service level. On average, prices range from ${serviceData.priceRange}. Factors affecting cost include:

- Volume and weight of items
- Type of electronic waste
- Pickup location in ${locationData.name}
- Urgency of service
- Additional services like data destruction

## Benefits of Professional ${title}

Choosing professional ${title.toLowerCase()} services in ${locationData.name} offers numerous advantages:

**Environmental Benefits**:
- Reduces landfill waste
- Conserves natural resources
- Prevents soil and water contamination
- Supports circular economy

**Data Security**:
- Professional data destruction
- Compliance with data protection laws
- Certificate of destruction
- Peace of mind

**Legal Compliance**:
- KSPCB compliance
- Proper documentation
- Avoids legal penalties
- Corporate social responsibility

## Common Mistakes to Avoid

When disposing of electronics in ${locationData.name}, avoid these common mistakes:

- Improper disposal in regular waste
- Not removing personal data
- Choosing uncertified providers
- Missing documentation requirements
- Ignoring environmental regulations

## Conclusion

${title} in ${locationData.name} is more than just disposal - it's a commitment to environmental responsibility and regulatory compliance.

With proper documentation, competitive pricing, and professional service providers, ${locationData.name} residents and businesses can easily manage their e-waste needs. The process ensures that valuable materials are recovered, harmful substances are safely handled, and environmental impact is minimized.

For best ${title.toLowerCase()} experience in ${locationData.name}, choose certified providers who offer transparent pricing, proper documentation, and environmentally responsible disposal methods. This not only ensures compliance but also contributes to ${locationData.name}'s sustainability goals.

Take action today by contacting a reputable ${title.toLowerCase()} service in ${locationData.name} and join the growing movement toward responsible e-waste management.

## Frequently Asked Questions

### What documents are required for ${title.toLowerCase()} in ${locationData.name}?

You'll need a valid ID proof, address proof, and device ownership documents. For businesses, GST certificate and company registration documents are required. All documentation must comply with KSPCB regulations for ${locationData.name}.

### How long does ${title.toLowerCase()} take in ${locationData.name}?

The complete process typically takes ${serviceData.timeRequired} from initial contact to certificate issuance. Pickup in ${locationData.name} usually happens within 24 hours of scheduling.

### Is ${title.toLowerCase()} in ${locationData.name} environmentally safe?

Yes, certified providers in ${locationData.name} follow strict environmental guidelines and KSPCB regulations. They ensure proper disposal and material recovery while preventing environmental contamination.

### Can I get instant cash for ${title.toLowerCase()} in ${locationData.name}?

Payment methods vary by provider and item condition. Most offer cash, bank transfer, or UPI payments. Some high-value items may require verification before payment.

## Related Links

- [${title} in ${locationData.name}](/services/${service}-${location}/)
- [${locationData.name} E-Waste Services](/locations/${location}/)
- [Best Way to ${serviceData.name.replace(/-/g, ' ')} in ${locationData.name} 2026](/blog/best-way-to-${service}-in-${location}-2026-${location}/)
- [Benefits of ${serviceData.name.replace(/-/g, ' ')} in ${locationData.name}](/blog/benefits-of-${service}-in-${location}-${location}/)
- [Pricing Guide for ${title}](/blog/${title.toLowerCase().replace(/\s+/g, '-')}-pricing-guide-${location}/)`;
  }

  /**
   * Generate structured data schema
   */
  generateSchema(frontmatter, content) {
    const faqs = this.extractFAQs(content);
    const schemas = [];

    // Article schema
    schemas.push(this.generateArticleSchema(frontmatter));

    // FAQ schema
    if (faqs.length > 0) {
      schemas.push(this.generateFAQSchema(faqs));
    }

    return schemas.join('\n\n');
  }

  /**
   * Generate Article schema
   */
  generateArticleSchema(frontmatter) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": frontmatter.title,
      "description": frontmatter.description,
      "datePublished": frontmatter.published,
      "dateModified": frontmatter.lastmod,
      "author": {
        "@type": "Organization",
        "name": "EWaste Kochi"
      },
      "publisher": {
        "@type": "Organization",
        "name": "EWaste Kochi",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.ewastekochi.com/logo.png"
        }
      }
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  /**
   * Generate FAQ schema
   */
  generateFAQSchema(faqs) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  /**
   * Extract FAQs from content
   */
  extractFAQs(content) {
    const faqs = [];
    const faqSectionMatch = content.match(/## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/);
    
    if (!faqSectionMatch) return faqs;
    
    const faqContent = faqSectionMatch[1];
    const qaPairs = faqContent.match(/### ([^\n]+)\n\n([^\n#]+(?:\n[^#\n][^\n]*)*)/g);
    
    if (qaPairs) {
      qaPairs.forEach(pair => {
        const match = pair.match(/### ([^\n]+)\n\n([^\n#]+(?:\n[^#\n][^\n]*)*)/);
        if (match) {
          faqs.push({
            question: match[1].trim(),
            answer: match[2].trim().replace(/\n\s*\n/g, ' ').replace(/\s+/g, ' ')
          });
        }
      });
    }
    
    return faqs;
  }

  /**
   * Utility methods
   */
  generateFilename(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '.md';
  }

  generateDescription(title, location) {
    const locationName = typeof location === 'string' ? location : location.name;
    return `Complete guide to ${title.toLowerCase()} in ${locationName}. Expert insights, pricing, and best practices for e-waste management and recycling services.`;
  }

  getCategory(title) {
    const categories = ['how-to', 'benefits', 'pricing', 'comparison', 'troubleshooting', 'legal', 'seasonal', 'business'];
    const keywords = {
      'how': 'how-to',
      'why': 'benefits',
      'cost': 'pricing',
      'price': 'pricing',
      'vs': 'comparison',
      'troubleshoot': 'troubleshooting',
      'legal': 'legal',
      'compliance': 'legal',
      'spring': 'seasonal',
      'winter': 'seasonal',
      'business': 'business'
    };
    
    const lowerTitle = title.toLowerCase();
    for (const [keyword, category] of Object.entries(keywords)) {
      if (lowerTitle.includes(keyword)) return category;
    }
    return 'how-to';
  }

  generateTags(title, location, service) {
    const baseTags = ['e-waste', location, 'recycling', 'kochi'];
    const titleTags = title.toLowerCase().split(' ').filter(word => word.length > 4);
    const serviceTag = typeof service === 'string' ? service.replace(/-/g, ' ') : (service.name || service).replace(/-/g, ' ');
    
    return [...new Set([...baseTags, ...titleTags, serviceTag])].slice(0, 6);
  }

  generateDate(index) {
    const baseDate = new Date('2026-01-01');
    const date = new Date(baseDate);
    date.setDate(date.getDate() + Math.floor(index / 10));
    return date.toISOString().split('T')[0];
  }

  generateRelatedPosts(title) {
    const related = [
      `${title.toLowerCase().replace(/\s+/g, '-')}-pricing-guide-kochi`,
      `best-way-to-${this.services[Math.floor(Math.random() * this.services.length)]}-in-kochi-2026`,
      `benefits-of-${this.services[Math.floor(Math.random() * this.services.length)]}-in-kochi`
    ];
    return related.slice(0, 3).join(', ');
  }

  /**
   * Generate structured content using blog data
   */
  generateStructuredContent(index) {
    // Cycle through combinations systematically
    const locationIndex = index % this.locations.length;
    const serviceIndex = Math.floor(index / this.locations.length) % this.services.length;
    const topicIndex = Math.floor(index / (this.locations.length * this.services.length)) % this.topics.length;
    const brandIndex = Math.floor(index / (this.locations.length * this.services.length * this.topics.length)) % this.brands.length;
    
    const location = this.locations[locationIndex];
    const service = this.services[serviceIndex];
    const topic = this.topics[topicIndex];
    const brand = this.brands[brandIndex];
    
    // Generate title using topic templates
    const templates = topic.templates;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const replacements = {
      '{service}': service.name,
      '{action}': service.name.replace(/-/g, ' '),
      '{location}': location.name,
      '{season}': ['spring', 'winter', 'monsoon', 'summer'][Math.floor(Math.random() * 4)],
      '{year}': '2026',
      '{alternative}': this.services[(serviceIndex + 1) % this.services.length].name,
      '{brand}': brand,
      '{brand2}': this.brands[(brandIndex + 1) % this.brands.length]
    };
    
    let title = template;
    for (const [placeholder, value] of Object.entries(replacements)) {
      title = title.replace(new RegExp(placeholder, 'g'), value);
    }
    
    return {
      title: title,
      service: service.slug,
      location: location.slug,
      topic: topic.category,
      brand: brand
    };
  }

  /**
   * Generate random title (legacy method)
   */
  generateRandomTitle(index) {
    const patterns = [
      `How to ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `Benefits of ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `Cost of ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `${this.brands[index % this.brands]} vs ${this.brands[(index + 1) % this.brands]} ${this.services[index % this.services.length].replace('-', ' ')} comparison`,
      `Why choose ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `Complete guide to ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `${this.services[index % this.services.length].replace('-', ' ')} pricing guide ${this.locations[index % this.locations.length]}`,
      `Legal requirements for ${this.services[index % this.services.length].replace('-', ' ')} in ${this.locations[index % this.locations.length]}`,
      `${this.services[index % this.services.length].replace('-', ' ')} during ${['spring', 'winter', 'monsoon'][index % 3]} in ${this.locations[index % this.locations.length]}`,
      `Troubleshooting ${this.services[index % this.services.length].replace('-', ' ')} issues in ${this.locations[index % this.locations.length]}`
    ];
    
    return patterns[index % patterns.length];
  }

  generateTopics() {
    const topics = [];
    this.services.forEach(service => {
      this.locations.forEach(location => {
        this.brands.forEach(brand => {
          topics.push({
            service: service.replace('-', ' '),
            location: location,
            brand: brand
          });
        });
      });
    });
    return topics;
  }

  /**
   * Load blog structured data from JSON file
   */
  loadBlogData() {
    try {
      const blogDataPath = path.join(__dirname, '../data/blog-structures.json');
      const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
      console.log(`📂 Loaded blog data: ${blogData.locations.length} locations, ${blogData.services.length} services, ${blogData.topics.length} topics`);
      return blogData;
    } catch (error) {
      console.error('❌ Error loading blog data:', error.message);
      return {
        locations: [],
        services: [],
        topics: [],
        brands: [],
        contentTypes: []
      };
    }
  }

  /**
   * Load templates for different blog types
   */
  loadTemplates() {
    return {
      'how-to': 'how-to-template.md',
      'benefits': 'benefits-template.md',
      'pricing': 'pricing-template.md',
      'comparison': 'comparison-template.md',
      'troubleshooting': 'troubleshooting-template.md',
      'legal': 'legal-template.md',
      'seasonal': 'seasonal-template.md',
      'business': 'business-template.md'
    };
  }

  /**
   * Generate blogs from CSV file
   */
  async generateFromCSV(csvPath) {
    console.log(`📂 Reading blog titles from CSV: ${csvPath}`);
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const titles = csvContent.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    await this.generateFromTitles(titles);
  }
}

// Export for use in other modules
module.exports = BlogGenerator;

// Run if called directly
if (require.main === module) {
  const generator = new BlogGenerator();
  
  // Example usage
  const sampleTitles = [
    'How to Dispose Laptops in Kochi',
    'Benefits of Battery Recycling in Aluva',
    'Cost of Data Destruction in Ernakulam',
    'Server Recycling Guide for Kakkanad',
    'Phone Buyback Best Practices Edappally'
  ];
  
  generator.generateFromTitles(sampleTitles).catch(console.error);
}
