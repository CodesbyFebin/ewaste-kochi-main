const fs = require('fs');
const path = require('path');

/**
 * Complete Frontmatter Rewrite
 * Completely rewrites frontmatter with clean, valid YAML
 */

class FrontmatterRewriter {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.fixedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Rewrite all frontmatter completely
   */
  async rewriteAllFrontmatter() {
    console.log('Completely rewriting all frontmatter...\n');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const rewrittenContent = this.rewriteFrontmatter(content, file);
        
        if (rewrittenContent !== content) {
          fs.writeFileSync(filePath, rewrittenContent);
          this.fixedCount++;
        }
        
      } catch (error) {
        this.errorCount++;
        console.log(`Error rewriting ${file}: ${error.message}`);
      }
    }
    
    console.log(`\nComplete Frontmatter Rewrite:`);
    console.log(`- Rewritten: ${this.fixedCount} files`);
    console.log(`- Errors: ${this.errorCount} files`);
  }

  /**
   * Rewrite frontmatter completely
   */
  rewriteFrontmatter(content, filename) {
    // Extract title from filename
    const title = this.extractTitleFromFilename(filename);
    
    // Extract content after frontmatter
    const contentMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
    const bodyContent = contentMatch ? contentMatch[1] : content;
    
    // Generate clean frontmatter
    const cleanFrontmatter = this.generateCleanFrontmatter(title, filename);
    
    return `---\n${cleanFrontmatter}\n---\n\n${bodyContent}`;
  }

  /**
   * Extract title from filename
   */
  extractTitleFromFilename(filename) {
    const baseName = filename.replace('.md', '');
    return baseName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generate clean frontmatter
   */
  generateCleanFrontmatter(title, filename) {
    const baseName = filename.replace('.md', '');
    const parts = baseName.split('-');
    
    // Extract service and location from filename
    let service = 'e-waste-collection';
    let location = 'kochi';
    
    if (parts.includes('battery')) service = 'battery-recycling';
    else if (parts.includes('laptop')) service = 'laptop-buyback';
    else if (parts.includes('phone')) service = 'phone-buyback';
    else if (parts.includes('data')) service = 'data-destruction';
    else if (parts.includes('server')) service = 'server-recycling';
    else if (parts.includes('printer')) service = 'printer-recycling';
    else if (parts.includes('monitor')) service = 'monitor-recycling';
    else if (parts.includes('cable')) service = 'cable-recycling';
    else if (parts.includes('it-asset')) service = 'it-asset-disposition';
    
    const locations = ['kochi', 'aluva', 'ernakulam', 'kakkanad', 'edappally', 'thrippunithura', 'angamaly', 'north-paravur', 'kalamassery', 'vytilla'];
    locations.forEach(loc => {
      if (parts.includes(loc)) location = loc;
    });
    
    // Generate category based on filename
    let category = 'how-to';
    if (parts.includes('benefits')) category = 'benefits';
    else if (parts.includes('price') || parts.includes('cost')) category = 'pricing';
    else if (parts.includes('vs') || parts.includes('comparison')) category = 'comparison';
    else if (parts.includes('problem') || parts.includes('troubleshoot')) category = 'troubleshooting';
    else if (parts.includes('legal') || parts.includes('requirement')) category = 'legal';
    else if (parts.includes('season') || parts.includes('spring') || parts.includes('winter')) category = 'seasonal';
    else if (parts.includes('business') || parts.includes('corporate')) category = 'business';
    
    // Generate clean tags
    const tags = [
      'e-waste',
      service.replace('-', ' '),
      location,
      category,
      'recycling',
      'kochi',
      'disposal'
    ];
    
    // Generate description
    const description = `Complete guide to ${title.toLowerCase()} in ${location.charAt(0).toUpperCase() + location.slice(1)}. Expert insights, pricing, and best practices for e-waste management and recycling services.`;
    
    return `title: "${title}"
description: "${description}"
publishDate: "2025-04-23"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
service: "${service}"
location: "${location}"
author: "EWaste Kochi Team"
priority: 0.7
wordCount: 1200
readTime: "5 min"
canonical: "https://www.ewastekochi.com/blog/${baseName}/"
lastmod: "2025-04-23"
seoEnhanced: true`;
  }
}

// Run if called directly
if (require.main === module) {
  const rewriter = new FrontmatterRewriter();
  rewriter.rewriteAllFrontmatter().catch(console.error);
}

module.exports = FrontmatterRewriter;
