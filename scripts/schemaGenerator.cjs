const fs = require('fs');
const path = require('path');

/**
 * Schema Generator - Creates structured data for blog posts
 * Generates JSON-LD schemas for SEO and search engine optimization
 */

class SchemaGenerator {
  constructor() {
    this.baseUrl = 'https://www.ewastekochi.com';
    this.organization = {
      name: 'EWaste Kochi',
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      contactPoint: {
        telephone: '+91-98765-43210',
        contactType: 'customer service'
      }
    };
  }

  /**
   * Generate complete schema set for a blog post
   */
  generateCompleteSchema(frontmatter, content, slug) {
    const schemas = [];

    // 1. Article schema
    schemas.push(this.generateArticleSchema(frontmatter, slug));

    // 2. FAQ schema if FAQs exist
    const faqs = this.extractFAQs(content);
    if (faqs.length > 0) {
      schemas.push(this.generateFAQSchema(faqs));
    }

    // 3. Breadcrumb schema
    schemas.push(this.generateBreadcrumbSchema(frontmatter, slug));

    // 4. Organization schema (for context)
    schemas.push(this.generateOrganizationSchema());

    // 5. Website schema (for site context)
    schemas.push(this.generateWebsiteSchema());

    return schemas;
  }

  /**
   * Generate Article schema
   */
  generateArticleSchema(frontmatter, slug) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": frontmatter.title || "Blog Post",
      "description": frontmatter.description || "Blog description",
      "datePublished": frontmatter.published || new Date().toISOString().split('T')[0],
      "dateModified": frontmatter.lastmod || frontmatter.published || new Date().toISOString().split('T')[0],
      "author": {
        "@type": "Organization",
        name: this.organization.name,
        url: this.organization.url
      },
      "publisher": {
        "@type": "Organization",
        name: this.organization.name,
        logo: {
          "@type": "ImageObject",
          url: this.organization.logo
        },
        contactPoint: this.organization.contactPoint
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${this.baseUrl}/blog/${slug}/`
      },
      "image": this.generateImageSchema(frontmatter),
      "wordCount": frontmatter.wordCount || 1000,
      "keywords": this.generateKeywords(frontmatter),
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        name: "EWaste Kochi Blog",
        url: `${this.baseUrl}/blog/`
      },
      "about": this.generateAboutSchema(frontmatter)
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate FAQ schema
   */
  generateFAQSchema(faqs) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
          "author": {
            "@type": "Organization",
            name: this.organization.name
          },
          "dateCreated": new Date().toISOString()
        },
        "position": index + 1
      }))
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate Breadcrumb schema
   */
  generateBreadcrumbSchema(frontmatter, slug) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": this.baseUrl,
          "image": `${this.baseUrl}/logo.png`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": `${this.baseUrl}/blog/`,
          "image": `${this.baseUrl}/logo.png`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": frontmatter.title,
          "item": `${this.baseUrl}/blog/${slug}/`,
          "image": this.generateImageSchema(frontmatter).url
        }
      ]
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate Organization schema
   */
  generateOrganizationSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": this.organization.name,
      "url": this.organization.url,
      "logo": {
        "@type": "ImageObject",
        url: this.organization.logo,
        width: 200,
        height: 200
      },
      "description": "Leading e-waste management and recycling service provider in Kochi, Kerala",
      "address": {
        "@type": "PostalAddress",
        streetAddress: "123 Main Road",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "postalCode": "682001",
        "addressCountry": "IN"
      },
      "contactPoint": this.organization.contactPoint,
      "sameAs": [
        "https://www.facebook.com/ewastekochi",
        "https://www.twitter.com/ewastekochi",
        "https://www.linkedin.com/company/ewaste-kochi"
      ],
      "areaServed": {
        "@type": "Place",
        name: "Kochi, Kerala"
      },
      "knowsAbout": [
        "E-waste recycling",
        "Battery disposal",
        "Laptop buyback",
        "Data destruction",
        "Server recycling",
        "IT asset disposition"
      ]
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate Website schema
   */
  generateWebsiteSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": this.organization.name,
      "url": this.baseUrl,
      "description": "Complete e-waste management solutions in Kochi - recycling, buyback, data destruction, and IT asset disposition services",
      "publisher": {
        "@type": "Organization",
        name: this.organization.name
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${this.baseUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": "en-US",
      "isAccessibleForFree": true
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate LocalBusiness schema
   */
  generateLocalBusinessSchema() {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": this.organization.name,
      "description": "Professional e-waste recycling and IT asset disposition services in Kochi",
      "url": this.baseUrl,
      "telephone": this.organization.contactPoint.telephone,
      "address": {
        "@type": "PostalAddress",
        streetAddress: "123 Main Road",
        "addressLocality": "Kochi",
        "addressRegion": "Kerala",
        "postalCode": "682001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 9.9312,
        "longitude": 76.2673
      },
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 09:00-14:00",
        "Su Closed"
      ],
      "paymentAccepted": [
        "Cash",
        "Credit Card",
        "Debit Card",
        "Bank Transfer",
        "UPI"
      ],
      "priceRange": "$$",
      "servesCuisine": "E-waste Management",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 150
      }
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate Service schema
   */
  generateServiceSchema(service, location) {
    const serviceName = service.replace(/-/g, ' ');
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${serviceName} in ${location.charAt(0).toUpperCase() + location.slice(1)}`,
      "description": `Professional ${serviceName} services in ${location}, Kerala. Certified e-waste management with proper documentation and environmental compliance.`,
      "provider": {
        "@type": "Organization",
        name: this.organization.name,
        url: this.baseUrl
      },
      "areaServed": {
        "@type": "Place",
        name: location.charAt(0).toUpperCase() + location.slice(1)
      },
      "serviceType": serviceName,
      "offers": {
        "@type": "Offer",
        "availability": "InStock",
        "priceRange": "Rs.500-5000",
        "priceCurrency": "INR",
        "validFrom": new Date().toISOString()
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `${serviceName} Services`,
        "itemListElement": this.generateServiceItems(serviceName)
      }
    };

    return this.wrapInScript(schema);
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
   * Generate image schema
   */
  generateImageSchema(frontmatter) {
    const defaultImage = {
      "@type": "ImageObject",
      "url": `${this.baseUrl}/img/ewaste-guide-hero.png`,
      "width": 1200,
      "height": 630,
      "caption": frontmatter.title || "E-Waste Management Services"
    };

    // Try to extract image from content
    const imageMatch = frontmatter.description ? frontmatter.description.match(/\b(img|image|photo|picture)\b.*?(\w+\.(jpg|jpeg|png|webp))/i) : null;
    
    if (imageMatch) {
      defaultImage.url = `${this.baseUrl}/img/${imageMatch[1]}`;
    }

    return defaultImage;
  }

  /**
   * Generate keywords
   */
  generateKeywords(frontmatter) {
    const baseKeywords = ['e-waste', 'recycling', 'kochi', 'kerala', 'electronics disposal'];
    const titleKeywords = frontmatter.title ? frontmatter.title.toLowerCase().split(' ').filter(word => word.length > 3) : [];
    const tagKeywords = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
    
    return [...new Set([...baseKeywords, ...titleKeywords, ...tagKeywords])].slice(0, 10);
  }

  /**
   * Generate about schema
   */
  generateAboutSchema(frontmatter) {
    const topics = [];
    
    if (frontmatter.service) {
      topics.push({
        "@type": "Thing",
        "name": frontmatter.service.replace(/-/g, ' ')
      });
    }
    
    if (frontmatter.location) {
      topics.push({
        "@type": "Place",
        "name": frontmatter.location.charAt(0).toUpperCase() + frontmatter.location.slice(1)
      });
    }
    
    if (frontmatter.brand) {
      topics.push({
        "@type": "Brand",
        "name": frontmatter.brand
      });
    }
    
    return topics;
  }

  /**
   * Generate service items
   */
  generateServiceItems(serviceName) {
    return [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `Free ${serviceName} Consultation`,
          "description": "Initial assessment and consultation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${serviceName} Pickup`,
          "description": "Door-to-door pickup service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": `${serviceName} Processing`,
          "description": "Professional processing and recycling"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Certificate of Disposal",
          "description": "Official documentation and certification"
        }
      }
    ];
  }

  /**
   * Wrap schema in script tags
   */
  wrapInScript(schema) {
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  /**
   * Generate schema for multiple blog posts
   */
  generateBatchSchemas(blogPosts) {
    const schemas = blogPosts.map(post => {
      const { frontmatter, body, slug } = this.parseBlogPost(post);
      return this.generateCompleteSchema(frontmatter, body, slug);
    });

    return schemas.flat();
  }

  /**
   * Parse blog post for schema generation
   */
  parseBlogPost(post) {
    // This would parse the blog post content
    // Implementation depends on the blog post format
    return {
      frontmatter: post.frontmatter || {},
      body: post.body || '',
      slug: post.slug || 'blog-post'
    };
  }

  /**
   * Validate schema
   */
  validateSchema(schema) {
    try {
      // Extract JSON from script tags
      const jsonMatch = schema.match(/<script[^>]*>([\s\S]*?)<\/script>/);
      if (!jsonMatch) {
        console.error('No JSON found in schema');
        return false;
      }
      
      JSON.parse(jsonMatch[1]);
      return true;
    } catch (error) {
      console.error('Invalid JSON-LD schema:', error.message);
      return false;
    }
  }

  /**
   * Generate schema report
   */
  generateSchemaReport(schemas) {
    const report = {
      totalSchemas: schemas.length,
      schemaTypes: {},
      validationErrors: [],
      generatedAt: new Date().toISOString()
    };

    schemas.forEach(schema => {
      const type = this.extractSchemaType(schema);
      report.schemaTypes[type] = (report.schemaTypes[type] || 0) + 1;
      
      if (!this.validateSchema(schema)) {
        report.validationErrors.push(`Invalid schema for ${type}`);
      }
    });

    return report;
  }

  /**
   * Extract schema type from JSON-LD
   */
  extractSchemaType(schema) {
    try {
      const parsed = JSON.parse(schema.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1]);
      return parsed['@type'] || 'Unknown';
    } catch (error) {
      return 'Invalid';
    }
  }
}

// Export for use in other modules
module.exports = SchemaGenerator;

// Run if called directly
if (require.main === module) {
  const generator = new SchemaGenerator();
  
  // Example usage
  const sampleFrontmatter = {
    title: "How to Dispose Laptops in Kochi",
    description: "Complete guide to laptop disposal services in Kochi",
    published: "2026-04-22",
    service: "laptop-disposal",
    location: "kochi"
  };
  
  const sampleContent = `
    # How to Dispose Laptops in Kochi
    
    ## Frequently Asked Questions
    
    ### What documents are required for laptop disposal?
    
    You'll need ID proof, address proof, and device ownership documents.
    
    ### How long does laptop disposal take?
    
    The process typically takes 20-30 minutes.
  `;
  
  const schemas = generator.generateCompleteSchema(sampleFrontmatter, sampleContent, 'how-to-dispose-laptops-kochi');
  console.log('Generated schemas:');
  schemas.forEach(schema => console.log(schema));
}
