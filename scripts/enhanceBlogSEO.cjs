const fs = require('fs');
const path = require('path');

/**
 * Blog Content Enhancement Pipeline
 * End-to-end process for enhancing blog posts with structured data and SEO improvements
 */

class BlogSEOEnhancer {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.processedCount = 0;
    this.skippedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Main enhancement pipeline
   */
  async enhanceAllBlogs() {
    console.log('🚀 Starting Blog SEO Enhancement Pipeline...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    console.log(`📁 Found ${files.length} blog files to process`);

    for (const file of files) {
      await this.processBlogFile(file);
    }

    this.generateReport();
  }

  /**
   * Process individual blog file
   */
  async processBlogFile(filename) {
    const filePath = path.join(this.blogDir, filename);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontmatter, body } = this.parseMarkdown(content);
      
      // Skip if already enhanced
      if (this.isAlreadyEnhanced(frontmatter, body)) {
        this.skippedCount++;
        console.log(`⏭️  Skipped: ${filename} (already enhanced)`);
        return;
      }

      // Enhance content
      const enhancedContent = await this.enhanceContent(frontmatter, body, filename);
      
      // Write back to file
      fs.writeFileSync(filePath, enhancedContent);
      this.processedCount++;
      console.log(`✅ Enhanced: ${filename}`);
      
    } catch (error) {
      this.errorCount++;
      console.log(`❌ Error processing ${filename}: ${error.message}`);
    }
  }

  /**
   * Parse markdown file into frontmatter and body
   */
  parseMarkdown(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? this.parseFrontmatter(frontmatterMatch[1]) : {};
    const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length) : content;
    
    return { frontmatter, body };
  }

  /**
   * Parse YAML frontmatter
   */
  parseFrontmatter(frontmatterText) {
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
          }
        }
        frontmatter[match[1]] = value;
      }
    });
    
    return frontmatter;
  }

  /**
   * Check if blog is already enhanced
   */
  isAlreadyEnhanced(frontmatter, body) {
    return body.includes('application/ld+json') || 
           frontmatter.schema === 'enhanced' ||
           frontmatter.seoEnhanced === true;
  }

  /**
   * Enhance content with SEO improvements
   */
  async enhanceContent(frontmatter, body, filename) {
    const enhancements = [];

    // 1. Add missing frontmatter fields
    const enhancedFrontmatter = this.enhanceFrontmatter(frontmatter, filename);
    
    // 2. Generate structured data
    const structuredData = this.generateStructuredData(enhancedFrontmatter, body);
    
    // 3. Enhance body content
    const enhancedBody = this.enhanceBody(body, enhancedFrontmatter);

    // Reconstruct content
    const frontmatterText = this.stringifyFrontmatter(enhancedFrontmatter);
    return `${frontmatterText}\n\n${structuredData}\n\n${enhancedBody}`;
  }

  /**
   * Enhance frontmatter with SEO fields
   */
  enhanceFrontmatter(frontmatter, filename) {
    const enhanced = { ...frontmatter };
    
    // Add missing essential fields
    if (!enhanced.title) {
      enhanced.title = this.generateTitleFromFilename(filename);
    }
    
    if (!enhanced.description) {
      enhanced.description = this.generateDescription(enhanced.title);
    }
    
    if (!enhanced.published) {
      enhanced.published = new Date().toISOString().split('T')[0];
    }
    
    if (!enhanced.priority) {
      enhanced.priority = 0.7;
    }
    
    if (!enhanced.tags) {
      enhanced.tags = this.generateTags(enhanced.title);
    }
    
    // SEO enhancement markers
    enhanced.seoEnhanced = true;
    enhanced.enhancedDate = new Date().toISOString();
    enhanced.wordCount = this.countWords(body);
    
    return enhanced;
  }

  /**
   * Generate structured data (JSON-LD)
   */
  generateStructuredData(frontmatter, body) {
    const schemas = [];
    
    // Article schema
    schemas.push(this.generateArticleSchema(frontmatter));
    
    // FAQ schema if FAQs exist
    const faqs = this.extractFAQs(body);
    if (faqs.length > 0) {
      schemas.push(this.generateFAQSchema(faqs));
    }
    
    // Breadcrumb schema
    schemas.push(this.generateBreadcrumbSchema(frontmatter));
    
    return schemas.join('\n\n');
  }

  /**
   * Generate Article schema
   */
  generateArticleSchema(frontmatter) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": frontmatter.title || "Blog Post",
      "description": frontmatter.description || "Blog description",
      "datePublished": frontmatter.published || new Date().toISOString().split('T')[0],
      "dateModified": frontmatter.lastmod || frontmatter.published || new Date().toISOString().split('T')[0],
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
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.ewastekochi.com/blog/${this.generateSlug(frontmatter.title)}/`
      }
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
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return this.wrapInScript(schema);
  }

  /**
   * Generate Breadcrumb schema
   */
  generateBreadcrumbSchema(frontmatter) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.ewastekochi.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.ewastekochi.com/blog/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": frontmatter.title,
          "item": `https://www.ewastekochi.com/blog/${this.generateSlug(frontmatter.title)}/`
        }
      ]
    };

    return this.wrapInScript(schema);
  }

  /**
   * Wrap schema in script tags
   */
  wrapInScript(schema) {
    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  /**
   * Enhance body content
   */
  enhanceBody(body, frontmatter) {
    let enhanced = body;
    
    // Add table of contents if missing
    if (!enhanced.includes('## Table of Contents') && enhanced.length > 2000) {
      enhanced = this.addTableOfContents(enhanced);
    }
    
    // Add internal links if missing
    if (!enhanced.includes('## Related Links') && frontmatter.relatedPosts) {
      enhanced = this.addRelatedLinks(enhanced, frontmatter);
    }
    
    // Ensure proper heading structure
    enhanced = this.fixHeadingStructure(enhanced);
    
    return enhanced;
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
  generateTitleFromFilename(filename) {
    return filename
      .replace('.md', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  generateDescription(title) {
    return `Complete guide to ${title.toLowerCase()} in Kochi. Expert insights, pricing, and best practices for e-waste management and recycling services.`;
  }

  generateTags(title) {
    const tags = ['e-waste', 'kochi', 'recycling'];
    const titleWords = title.toLowerCase().split(' ');
    tags.push(...titleWords.filter(word => word.length > 3));
    return tags.slice(0, 5);
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  countWords(text) {
    return text.split(/\s+/).filter(word => word.length > 0).length;
  }

  stringifyFrontmatter(frontmatter) {
    let yaml = '---\n';
    Object.entries(frontmatter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        yaml += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
      } else if (typeof value === 'string' && value.includes(':')) {
        yaml += `${key}: "${value}"\n`;
      } else {
        yaml += `${key}: ${value}\n`;
      }
    });
    yaml += '---';
    return yaml;
  }

  addTableOfContents(content) {
    const headings = content.match(/^##\s+(.+)$/gm) || [];
    if (headings.length < 3) return content;
    
    let toc = '## Table of Contents\n\n';
    headings.forEach((heading, index) => {
      const title = heading.replace(/^##\s+/, '');
      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      toc += `${index + 1}. [${title}](#${slug})\n`;
    });
    toc += '\n';
    
    return toc + content;
  }

  addRelatedLinks(content, frontmatter) {
    const links = '\n\n## Related Links\n\n';
    if (typeof frontmatter.relatedPosts === 'string') {
      const posts = frontmatter.relatedPosts.split(',').map(post => post.trim());
      posts.forEach(post => {
        links += `- [${post}](/blog/${post}/)\n`;
      });
    }
    return content + links;
  }

  fixHeadingStructure(content) {
    // Ensure proper H1, H2 hierarchy
    return content
      .replace(/^# /gm, '## ') // Convert H1 to H2
      .replace(/^### /gm, '### ') // Keep H3 as is
      .replace(/^#### /gm, '#### '); // Keep H4 as is
  }

  /**
   * Generate final report
   */
  generateReport() {
    console.log('\n📊 Enhancement Report:');
    console.log(`✅ Processed: ${this.processedCount} files`);
    console.log(`⏭️  Skipped: ${this.skippedCount} files`);
    console.log(`❌ Errors: ${this.errorCount} files`);
    console.log(`📈 Success Rate: ${((this.processedCount / (this.processedCount + this.skippedCount + this.errorCount)) * 100).toFixed(1)}%`);
  }
}

// Export for use in other modules
module.exports = BlogSEOEnhancer;

// Run if called directly
if (require.main === module) {
  const enhancer = new BlogSEOEnhancer();
  enhancer.enhanceAllBlogs().catch(console.error);
}
