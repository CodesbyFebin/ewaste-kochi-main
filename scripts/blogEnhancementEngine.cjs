const fs = require('fs');
const path = require('path');

/**
 * Automated Blog Content Enhancement Engine
 * Enhances blog posts with FAQ schema, structured data, and SEO improvements
 */

class BlogEnhancementEngine {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.dataDir = path.join(__dirname, '../data');
    this.enhancementRules = this.loadEnhancementRules();
    this.performance = {
      filesProcessed: 0,
      enhancementsApplied: 0,
      errors: 0,
      startTime: Date.now()
    };
  }

  /**
   * Main enhancement engine entry point
   */
  async runEnhancementEngine() {
    console.log('🚀 Starting Automated Blog Content Enhancement Engine...\n');
    
    try {
      // Phase 1: Load enhancement rules
      await this.loadEnhancementRules();
      
      // Phase 2: Analyze existing blog content
      await this.analyzeBlogContent();
      
      // Phase 3: Apply enhancement rules
      await this.applyEnhancementRules();
      
      // Phase 4: Generate enhancement report
      this.generateEnhancementReport();
      
    } catch (error) {
      console.error('❌ Enhancement Engine Error:', error.message);
    }
  }

  /**
   * Phase 1: Load enhancement rules
   */
  async loadEnhancementRules() {
    console.log('📋 Loading enhancement rules...');
    
    const rulesPath = path.join(this.dataDir, 'enhancement-rules.json');
    
    if (fs.existsSync(rulesPath)) {
      const rulesData = fs.readFileSync(rulesPath, 'utf8');
      this.enhancementRules = JSON.parse(rulesData);
      console.log(`✅ Loaded ${this.enhancementRules.length} enhancement rules`);
    } else {
      // Create default rules if none exist
      this.enhancementRules = this.createDefaultRules();
      await this.saveEnhancementRules();
    }
  }

  /**
   * Create default enhancement rules
   */
  createDefaultRules() {
    return [
      {
        id: 'faq-schema-missing',
        name: 'Missing FAQ Schema',
        condition: 'content.includes("## Frequently Asked Questions") && !content.includes("application/ld+json")',
        action: 'add-faq-schema',
        priority: 'high',
        autoApply: true
      },
      {
        id: 'missing-table-of-contents',
        name: 'Missing Table of Contents',
        condition: 'content.length > 2000 && !content.includes("## Table of Contents")',
        action: 'add-toc',
        priority: 'medium',
        autoApply: true
      },
      {
        id: 'missing-related-links',
        name: 'Missing Related Links',
        condition: 'content.includes("## Conclusion") && !content.includes("## Related Links")',
        action: 'add-related-links',
        priority: 'medium',
        autoApply: true
      },
      {
        id: 'missing-internal-links',
        name: 'Missing Internal Links',
        condition: 'frontmatter.relatedPosts && !content.includes("## Related Links")',
        action: 'add-internal-links',
        priority: 'medium',
        autoApply: true
      },
      {
        id: 'missing-breadcrumb-schema',
        name: 'Missing Breadcrumb Schema',
        condition: 'content.includes("application/ld+json") && !content.includes("BreadcrumbList")',
        action: 'add-breadcrumb-schema',
        priority: 'low',
        autoApply: true
      },
      {
        id: 'missing-meta-description',
        name: 'Missing Meta Description',
        condition: '!frontmatter.description || frontmatter.description.length < 100',
        action: 'improve-meta-description',
        priority: 'high',
        autoApply: false
      },
      {
        id: 'missing-read-time',
        name: 'Missing Read Time',
        condition: '!frontmatter.wordCount || frontmatter.wordCount < 500',
        action: 'add-read-time',
        priority: 'low',
        autoApply: false
      },
      {
        id: 'missing-canonical-url',
        name: 'Missing Canonical URL',
        condition: '!frontmatter.canonical || frontmatter.canonical.length === 0',
        action: 'add-canonical-url',
        priority: 'low',
        autoApply: false
      }
    ];
  }

  /**
   * Save enhancement rules
   */
  async saveEnhancementRules() {
    const rulesPath = path.join(this.dataDir, 'enhancement-rules.json');
    fs.writeFileSync(rulesPath, JSON.stringify(this.enhancementRules, null, 2));
    console.log(`✅ Saved enhancement rules to ${rulesPath}`);
  }

  /**
   * Phase 2: Analyze existing blog content
   */
  async analyzeBlogContent() {
    console.log('🔍 Analyzing existing blog content...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    const analysisResults = [];
    
    for (const file of files) {
      const filePath = path.join(this.blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontmatter } = this.parseFrontmatter(content);
      
      const analysis = {
        file,
        hasFAQ: content.includes('## Frequently Asked Questions'),
        hasSchema: content.includes('application/ld+json'),
        hasTOC: content.includes('## Table of Contents'),
        hasRelatedLinks: content.includes('## Related Links'),
        wordCount: this.countWords(content),
        missingElements: this.identifyMissingElements(content, frontmatter),
        enhancementOpportunities: this.identifyEnhancementOpportunities(content, frontmatter)
      };
      
      analysisResults.push(analysis);
    }
    
    // Save analysis results
    const analysisPath = path.join(this.dataDir, 'content-analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify(analysisResults, null, 2));
    
    console.log(`✅ Analyzed ${files.length} blog files`);
    console.log(`📊 Content analysis saved to ${analysisPath}`);
  }

  /**
   * Phase 3: Apply enhancement rules
   */
  async applyEnhancementRules() {
    console.log('🔧 Applying enhancement rules...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    let enhancedCount = 0;
    
    for (const file of files) {
      const filePath = path.join(this.blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      let enhancedContent = content;
      const { frontmatter } = this.parseFrontmatter(content);
      
      // Apply enhancement rules
      for (const rule of this.enhancementRules) {
        if (this.evaluateCondition(rule.condition, content, frontmatter)) {
          enhancedContent = await this.applyEnhancementRule(enhancedContent, rule, file, frontmatter);
          enhancedCount++;
          
          if (!rule.autoApply) {
            console.log(`🔧 Applied rule: ${rule.name} to ${file}`);
          }
        }
      }
      
      // Write enhanced content
      if (enhancedContent !== content) {
        fs.writeFileSync(filePath, enhancedContent);
        this.performance.enhancementsApplied++;
      }
      
      this.performance.filesProcessed++;
    }
    
    console.log(`✅ Applied ${enhancedCount} enhancements to ${files.length} files`);
  }

  /**
   * Apply individual enhancement rule
   */
  async applyEnhancementRule(content, rule, file, frontmatter) {
    switch (rule.action) {
      case 'add-faq-schema':
        return this.addFAQSchema(content);
        
      case 'add-toc':
        return this.addTableOfContents(content);
        
      case 'add-related-links':
        return this.addRelatedLinks(content, frontmatter);
        
      case 'add-internal-links':
        return this.addInternalLinks(content, frontmatter);
        
      case 'add-breadcrumb-schema':
        return this.addBreadcrumbSchema(content);
        
      case 'improve-meta-description':
        return this.improveMetaDescription(content, frontmatter);
        
      case 'add-read-time':
        return this.addReadTime(content, frontmatter);
        
      case 'add-canonical-url':
        return this.addCanonicalURL(content, frontmatter);
        
      default:
        return content;
    }
  }

  /**
   * Enhancement rule implementations
   */
  addFAQSchema(content) {
    if (content.includes('## Frequently Asked Questions') && !content.includes('application/ld+json')) {
      const faqs = this.extractFAQs(content);
      if (faqs.length > 0) {
        const schema = this.generateFAQSchema(faqs);
        const faqSectionMatch = content.match(/## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/);
        
        if (faqSectionMatch) {
          const newContent = content.replace(
            faqSectionMatch[0],
            `${faqSectionMatch[1]}\n\n${schema}\n\n${faqSectionMatch[2] || ''}`
          );
          return newContent;
        }
      }
    }
    return content;
  }

  addTableOfContents(content) {
    if (content.length > 2000 && !content.includes('## Table of Contents')) {
      const headings = content.match(/^##\s+(.+)$/gm) || [];
      if (headings.length > 3) {
        let toc = '## Table of Contents\n\n';
        
        headings.forEach((heading, index) => {
          const title = heading.replace(/^##\s+/, '');
          const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          toc += `${index + 1}. [${title}](#${slug})\n`;
        });
        
        const firstHeadingMatch = content.match(/^#\s+(.+)$/m);
        if (firstHeadingMatch) {
          return content.replace(firstHeadingMatch[0], `${firstHeadingMatch[0]}\n\n${toc}\n\n## ${firstHeadingMatch[1]}`);
        } else {
          const firstH2Match = content.match(/^##\s+(.+)$/m);
          if (firstH2Match) {
            return content.replace(firstH2Match[0], `${firstH2Match[0]}\n\n${toc}\n\n${firstH2Match[1]}`);
          }
        }
      }
    }
    return content;
  }

  addRelatedLinks(content, frontmatter) {
    if (!content.includes('## Related Links') && frontmatter.relatedPosts) {
      const relatedLinks = frontmatter.relatedPosts.split(',').map(post => post.trim());
      let linksSection = '\n\n## Related Links\n\n';
      
      relatedLinks.forEach(link => {
        linksSection += `- [${link}](/blog/${link}/)\n`;
      });
      
      return content + linksSection;
    }
    return content;
  }

  addInternalLinks(content, frontmatter) {
    if (!content.includes('## Related Links') && frontmatter.relatedPosts) {
      const relatedPosts = frontmatter.relatedPosts.split(',').map(post => post.trim());
      let linksSection = '\n\n## Related Links\n\n';
      
      relatedPosts.forEach(post => {
        linksSection += `- [${post}](/blog/${post}/)\n`;
      });
      
      return content + linksSection;
    }
    return content;
  }

  addBreadcrumbSchema(content) {
    if (content.includes('application/ld+json') && !content.includes('BreadcrumbList')) {
      const { frontmatter } = this.parseFrontmatter(content);
      const breadcrumbSchema = this.generateBreadcrumbSchema(frontmatter);
      
      // Insert breadcrumb schema after first schema
      const firstSchemaMatch = content.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/);
      
      if (firstSchemaMatch) {
        const newContent = content.replace(
          firstSchemaMatch[0],
          `${firstSchemaMatch[0]}\n\n${breadcrumbSchema}`
        );
        return newContent;
      }
    }
    return content;
  }

  improveMetaDescription(content, frontmatter) {
    if (!frontmatter.description || frontmatter.description.length < 100) {
      const { title } = this.parseFrontmatter(content);
      const improvedDescription = this.generateOptimizedDescription(title.title);
      
      // Update frontmatter
      const updatedContent = content.replace(
        /^---\n([\s\S]*?)\n---/,
        (match) => {
          let frontmatterText = match[1];
          frontmatterText = frontmatterText.replace(
            /^description:\s*".*?"/gm,
            `description: "${improvedDescription}"`
          );
          return `---\n${frontmatterText}\n---`;
        }
      );
      
      return updatedContent;
    }
    return content;
  }

  addReadTime(content, frontmatter) {
    if (!frontmatter.wordCount || frontmatter.wordCount < 500) {
      const readTime = this.calculateReadTime(content);
      
      // Update frontmatter
      const updatedContent = content.replace(
        /^---\n([\s\S]*?)\n---/,
        (match) => {
          let frontmatterText = match[1];
          frontmatterText = frontmatterText.replace(
            /^wordCount:\s*\d*$/gm,
            `wordCount: ${this.countWords(content)}`
          );
          if (!frontmatterText.includes('readTime')) {
            frontmatterText += `\nreadTime: "${readTime}"`;
          }
          return `---\n${frontmatterText}\n---`;
        }
      );
      
      return updatedContent;
    }
    return content;
  }

  addCanonicalURL(content, frontmatter) {
    if (!frontmatter.canonical || frontmatter.canonical.length === 0) {
      const { title } = this.parseFrontmatter(content);
      const canonicalURL = this.generateCanonicalURL(title.title);
      
      // Update frontmatter
      const updatedContent = content.replace(
        /^---\n([\s\S]*?)\n---/,
        (match) => {
          let frontmatterText = match[1];
          frontmatterText = frontmatterText.replace(
            /^canonical:\s*".*?"/gm,
            `canonical: "${canonicalURL}"`
          );
          return `---\n${frontmatterText}\n---`;
        }
      );
      
      return updatedContent;
    }
    return content;
  }

  /**
   * Utility methods
   */
  evaluateCondition(condition, content, frontmatter) {
    try {
      // Simple condition evaluator
      if (condition.includes('&&')) {
        const conditions = condition.split('&&').map(c => c.trim());
        return conditions.every(c => {
          if (c.includes('content.includes(')) {
            const match = c.match(/content\.includes\("([^"]+)"\)/);
            return match && content.includes(match[1]);
          } else if (c.includes('!content.includes(')) {
            const match = c.match(/content\.includes\("([^"]+)"\)/);
            return match && !content.includes(match[1]);
          } else if (c.includes('frontmatter.')) {
            const match = c.match(/frontmatter\.(\w+)\s*(===|!==|>|<|>=|<=)/);
            if (match) {
              const field = match[1];
              const operator = match[2];
              const value = frontmatter[field];
              
              switch (operator) {
                case '!==': return value !== c.split(' ').pop();
                case '===': return value === c.split(' ').pop();
                case '>': return Number(value) > Number(c.split(' ').pop());
                case '<': return Number(value) < Number(c.split(' ').pop());
                case '>=': return Number(value) >= Number(c.split(' ').pop());
                case '<=': return Number(value) <= Number(c.split(' ').pop());
                default: return false;
              }
            }
          }
        } else if (c.includes('||')) {
            return c.split('||').some(subCond => this.evaluateCondition(subCond, content, frontmatter));
          }
        });
      }
      
      return eval(condition);
    } catch (error) {
      console.error('❌ Condition evaluation error:', error.message);
      return false;
    }
  }

  identifyMissingElements(content, frontmatter) {
    const missing = [];
    
    if (!content.includes('## Frequently Asked Questions')) {
      missing.push('faq-section');
    }
    
    if (!content.includes('application/ld+json')) {
      missing.push('faq-schema');
    }
    
    if (content.length > 2000 && !content.includes('## Table of Contents')) {
      missing.push('table-of-contents');
    }
    
    if (!content.includes('## Related Links') && frontmatter.relatedPosts) {
      missing.push('related-links');
    }
    
    if (!frontmatter.description || frontmatter.description.length < 100) {
      missing.push('meta-description');
    }
    
    if (!frontmatter.wordCount || frontmatter.wordCount < 500) {
      missing.push('word-count');
    }
    
    if (!frontmatter.canonical || frontmatter.canonical.length === 0) {
      missing.push('canonical-url');
    }
    
    return missing;
  }

  identifyEnhancementOpportunities(content, frontmatter) {
    const opportunities = [];
    
    // Content length opportunities
    if (content.length > 3000) {
      opportunities.push({
        type: 'content-length',
        priority: 'medium',
        description: 'Consider splitting long content into series'
      });
    }
    
    // FAQ opportunities
    if (content.includes('## Frequently Asked Questions')) {
      const faqs = this.extractFAQs(content);
      if (faqs.length < 3) {
        opportunities.push({
          type: 'faq-expansion',
          priority: 'high',
          description: 'Add more comprehensive FAQs'
        });
      }
    }
    
    // Internal linking opportunities
    const internalLinks = (content.match(/\[([^\]]+)\]\(\/blog\/([^)]+)\)/g) || []).length;
    if (internalLinks < 3) {
      opportunities.push({
        type: 'internal-linking',
        priority: 'medium',
        description: 'Add more internal links to related content'
      });
    }
    
    // Schema opportunities
    if (!content.includes('application/ld+json')) {
      opportunities.push({
        type: 'structured-data',
        priority: 'high',
        description: 'Add JSON-LD schema for better SEO'
      });
    }
    
    return opportunities;
  }

  /**
   * Schema generation methods
   */
  extractFAQs(content) {
    const faqs = [];
    const faqSectionMatch = content.match(/## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/);
    
    if (faqSectionMatch) {
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
    }
    
    return faqs;
  }

  generateFAQSchema(faqs) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq, index) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        },
        "position": index + 1
      }))
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

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
          "name": frontmatter.title || "Blog Post",
          "item": `https://www.ewastekochi.com/blog/${this.generateSlug(frontmatter.title)}/`
        }
      ]
    };

    return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  }

  generateOptimizedDescription(title) {
    const keywords = ['e-waste', 'recycling', 'kochi', 'disposal', 'management'];
    const titleWords = title.toLowerCase().split(' ');
    
    // Add relevant keywords to description
    let description = `Complete guide to ${title} in Kochi. `;
    
    // Add service-specific terms
    if (titleWords.some(word => keywords.includes(word))) {
      description += 'Professional e-waste recycling and disposal services. ';
    }
    
    // Add location-specific terms
    if (titleWords.some(word => ['kochi', 'ernakulam', 'aluva'].includes(word))) {
      description += 'Serving all major areas including Kochi, Ernakulam, and Aluva. ';
    }
    
    // Add call-to-action
    description += 'Get expert help with proper documentation and environmental compliance. ';
    
    // Ensure optimal length (150-160 characters)
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    return description;
  }

  generateCanonicalURL(title) {
    return `https://www.ewastekochi.com/blog/${this.generateSlug(title)}/`;
  }

  /**
   * Utility methods
   */
  parseFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return {};
    
    const frontmatter = {};
    const lines = frontmatterMatch[1].split('\n');
    
    lines.forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        let value = match[2].trim();
        
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        
        frontmatter[match[1]] = value;
      }
    });
    
    return frontmatter;
  }

  countWords(content) {
    return content.split(/\s+/).filter(word => word.length > 0).length;
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * Generate enhancement report
   */
  generateEnhancementReport() {
    const endTime = Date.now();
    const duration = ((endTime - this.performance.startTime) / 1000 / 60).toFixed(2);
    
    console.log('\n📊 Blog Enhancement Engine Report');
    console.log('=' .repeat(50));
    console.log(`⏱️  Execution Time: ${duration} minutes`);
    console.log(`📁 Files Processed: ${this.performance.filesProcessed}`);
    console.log(`🔧 Enhancements Applied: ${this.performance.enhancementsApplied}`);
    console.log(`❌ Errors: ${this.performance.errors}`);
    console.log(`📈 Success Rate: ${((this.performance.enhancementsApplied / this.performance.filesProcessed) * 100).toFixed(1)}%`);
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      performance: this.performance,
      enhancementRules: this.enhancementRules.map(rule => ({
        id: rule.id,
        name: rule.name,
        priority: rule.priority,
        autoApplied: rule.autoApply
      }))
    };
    
    const reportPath = path.join(this.dataDir, 'enhancement-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`📈 Detailed report saved to ${reportPath}`);
  }
}

// Export for use in other modules
module.exports = BlogEnhancementEngine;

// Run if called directly
if (require.main === module) {
  const engine = new BlogEnhancementEngine();
  engine.runEnhancementEngine().catch(console.error);
}
