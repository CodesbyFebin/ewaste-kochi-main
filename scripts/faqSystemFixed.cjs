const fs = require('fs');
const path = require('path');

/**
 * Fixed FAQ System
 * Extracts FAQs from blog posts and adds JSON-LD schema
 */

class FixedFAQSystem {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.stats = {
      filesProcessed: 0,
      faqsExtracted: 0,
      schemasGenerated: 0,
      errors: 0
    };
  }

  /**
   * Main FAQ system entry point
   */
  async runCompleteSystem() {
    console.log('Running Fixed FAQ System...\n');
    
    try {
      // Phase 1: Script-based FAQ extraction and schema addition
      await this.addSchemaToBlogs();
      
      // Phase 2: Generate system report
      this.generateSystemReport();
      
    } catch (error) {
      console.error('FAQ System Error:', error.message);
      this.stats.errors++;
    }
  }

  /**
   * Add schema to all blog files
   */
  addSchemaToBlogs() {
    console.log('Adding FAQ schemas to blog files...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    console.log(`Processing ${files.length} blog files...`);
    
    files.forEach(file => {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (this.hasFAQSection(content)) {
          const faqs = this.extractFAQs(content);
          if (faqs.length > 0) {
            const schema = this.generateFAQSchema(faqs);
            const enhancedContent = this.addSchemaToContent(content, schema);
            
            fs.writeFileSync(filePath, enhancedContent);
            this.stats.faqsExtracted += faqs.length;
            this.stats.schemasGenerated++;
          }
        }
        
        this.stats.filesProcessed++;
        
      } catch (error) {
        this.stats.errors++;
        console.log(`Error processing ${file}: ${error.message}`);
      }
    });
    
    console.log(`Processed ${this.stats.filesProcessed} files`);
    console.log(`Extracted ${this.stats.faqsExtracted} FAQs`);
    console.log(`Generated ${this.stats.schemasGenerated} schemas`);
  }

  /**
   * Check if content has FAQ section
   */
  hasFAQSection(content) {
    const patterns = [
      /## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/,
      /## FAQ\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/,
      /### Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/,
      /## Questions?\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/
    ];
    
    return patterns.some(pattern => pattern.test(content));
  }

  /**
   * Extract FAQs from content
   */
  extractFAQs(content) {
    const faqs = [];
    
    // Multiple extraction patterns
    const patterns = [
      // Pattern 1: ### Question \n\n Answer
      /### ([^\n]+)\n\n([^\n#]+(?:\n[^#\n][^\n]*)*)/g,
      // Pattern 2: **Q:** \n\n **A:**
      /\*\*Q:[\s]*([^\n*]+)\*\*\s*\n\*\*A:[\s]*([^\n*]+)/g,
      // Pattern 3: Q: \n\n A:
      /Q:\s*([^\n]+)\s*\nA:\s*([^\n]+)/g,
      // Pattern 4: Numbered Q&A
      /\d+\.\s*([^\n]+)\s*\n\d+\.\s*([^\n]+)/g
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim().replace(/\n\s*\n/g, ' ').replace(/\s+/g, ' ')
        });
      }
    });
    
    return faqs;
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
        "@id": `faq-${index + 1}`,
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

  /**
   * Add schema to content
   */
  addSchemaToContent(content, schema) {
    // Insert schema after frontmatter, before first heading
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return content;
    
    const firstHeadingMatch = content.match(/\n#([^\n]+)/);
    if (!firstHeadingMatch) return content + '\n\n' + schema;
    
    const insertionPoint = firstHeadingMatch.index;
    return content.slice(0, insertionPoint) + '\n\n' + schema + content.slice(insertionPoint);
  }

  /**
   * Generate system report
   */
  generateSystemReport() {
    console.log('\nFAQ System Report');
    console.log('=' .repeat(50));
    console.log(`Files Processed: ${this.stats.filesProcessed}`);
    console.log(`FAQs Extracted: ${this.stats.faqsExtracted}`);
    console.log(`Schemas Generated: ${this.stats.schemasGenerated}`);
    console.log(`Errors: ${this.stats.errors}`);
    console.log(`Success Rate: ${this.stats.filesProcessed > 0 ? ((this.stats.schemasGenerated / this.stats.filesProcessed) * 100).toFixed(1) : 0}%`);
  }
}

// Export for use in other modules
module.exports = FixedFAQSystem;

// Run if called directly
if (require.main === module) {
  const faqSystem = new FixedFAQSystem();
  faqSystem.runCompleteSystem().catch(console.error);
}
