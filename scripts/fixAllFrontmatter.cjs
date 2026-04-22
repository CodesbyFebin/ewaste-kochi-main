const fs = require('fs');
const path = require('path');

/**
 * Complete Frontmatter Fix
 * Fixes all YAML syntax issues in frontmatter
 */

class CompleteFrontmatterFixer {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.fixedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Fix all frontmatter issues
   */
  async fixAllFrontmatter() {
    console.log('Fixing all frontmatter issues...\n');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const fixedContent = this.fixCompleteFrontmatter(content);
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent);
          this.fixedCount++;
        }
        
      } catch (error) {
        this.errorCount++;
        console.log(`Error fixing ${file}: ${error.message}`);
      }
    }
    
    console.log(`\nComplete Frontmatter Fixing:`);
    console.log(`- Fixed: ${this.fixedCount} files`);
    console.log(`- Errors: ${this.errorCount} files`);
  }

  /**
   * Fix complete frontmatter
   */
  fixCompleteFrontmatter(content) {
    let fixedContent = content;
    
    // Extract frontmatter section
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return content;
    
    let frontmatter = frontmatterMatch[1];
    
    // Fix 1: Replace malformed tags with clean tags
    frontmatter = this.fixTagsArray(frontmatter);
    
    // Fix 2: Fix service and location fields
    frontmatter = this.fixServiceLocationFields(frontmatter);
    
    // Fix 3: Fix description field
    frontmatter = this.fixDescriptionField(frontmatter);
    
    // Fix 4: Fix date fields
    frontmatter = this.fixDateFields(frontmatter);
    
    // Fix 5: Fix priority field
    frontmatter = this.fixPriorityField(frontmatter);
    
    // Fix 6: Fix author field
    frontmatter = this.fixAuthorField(frontmatter);
    
    // Replace frontmatter with fixed version
    fixedContent = content.replace(/^---\n[\s\S]*?\n---/, `---\n${frontmatter}\n---`);
    
    return fixedContent;
  }

  /**
   * Fix tags array completely
   */
  fixTagsArray(frontmatter) {
    // Replace entire tags line with clean version
    const tagsMatch = frontmatter.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      const cleanTags = this.generateCleanTags();
      frontmatter = frontmatter.replace(
        /tags:\s*\[([^\]]*)\]/,
        `tags: [${cleanTags}]`
      );
    }
    
    return frontmatter;
  }

  /**
   * Generate clean tags array
   */
  generateCleanTags() {
    const baseTags = [
      '"e-waste"',
      '"recycling"', 
      '"kochi"',
      '"battery"',
      '"disposal"',
      '"environment"',
      '"sustainability"'
    ];
    
    return baseTags.join(', ');
  }

  /**
   * Fix service and location fields
   */
  fixServiceLocationFields(frontmatter) {
    // Fix service field
    frontmatter = frontmatter.replace(
      /service:\s*"[^"]*"/g,
      'service: "battery-recycling"'
    );
    
    // Fix location field  
    frontmatter = frontmatter.replace(
      /location:\s*"[^"]*"/g,
      'location: "kochi"'
    );
    
    return frontmatter;
  }

  /**
   * Fix description field
   */
  fixDescriptionField(frontmatter) {
    const descMatch = frontmatter.match(/description:\s*"([^"]*)"/);
    if (descMatch) {
      const description = descMatch[1];
      // Remove object references and clean up
      const cleanDesc = description
        .replace(/\{[^}]*\}/g, '')
        .replace(/\s+/g, ' ')
        .replace(/in\s+\w+\s+in\s+\w+/g, 'in Kochi')
        .trim();
      
      frontmatter = frontmatter.replace(
        /description:\s*"[^"]*"/,
        `description: "${cleanDesc}"`
      );
    }
    
    return frontmatter;
  }

  /**
   * Fix date fields
   */
  fixDateFields(frontmatter) {
    // Fix published field
    frontmatter = frontmatter.replace(
      /published:\s*"([^"]*)"/g,
      'published: "2025-04-23"'
    );
    
    // Fix publishDate field if exists
    frontmatter = frontmatter.replace(
      /publishDate:\s*"([^"]*)"/g,
      'publishDate: "2025-04-23"'
    );
    
    return frontmatter;
  }

  /**
   * Fix priority field
   */
  fixPriorityField(frontmatter) {
    frontmatter = frontmatter.replace(
      /priority:\s*[^,\n]*/g,
      'priority: 0.7'
    );
    
    return frontmatter;
  }

  /**
   * Fix author field
   */
  fixAuthorField(frontmatter) {
    frontmatter = frontmatter.replace(
      /author:\s*"[^"]*"/g,
      'author: "EWaste Kochi Team"'
    );
    
    return frontmatter;
  }
}

// Run if called directly
if (require.main === module) {
  const fixer = new CompleteFrontmatterFixer();
  fixer.fixAllFrontmatter().catch(console.error);
}

module.exports = CompleteFrontmatterFixer;
