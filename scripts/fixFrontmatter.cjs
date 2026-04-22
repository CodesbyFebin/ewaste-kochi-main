const fs = require('fs');
const path = require('path');

/**
 * Fix Frontmatter YAML Syntax
 * Fixes malformed tags arrays and frontmatter structure
 */

class FrontmatterFixer {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.fixedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Fix all frontmatter issues
   */
  async fixAllFrontmatter() {
    console.log('Fixing frontmatter YAML syntax...\n');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const fixedContent = this.fixFrontmatter(content);
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent);
          this.fixedCount++;
        }
        
      } catch (error) {
        this.errorCount++;
        console.log(`Error fixing ${file}: ${error.message}`);
      }
    }
    
    console.log(`\nFrontmatter Fixing Complete:`);
    console.log(`- Fixed: ${this.fixedCount} files`);
    console.log(`- Errors: ${this.errorCount} files`);
  }

  /**
   * Fix frontmatter YAML syntax
   */
  fixFrontmatter(content) {
    let fixedContent = content;
    
    // Fix 1: Fix malformed tags arrays
    fixedContent = fixedContent.replace(
      /tags:\s*\[([^\]]+)\]/g,
      (match, tagsContent) => {
        // Extract clean tags from malformed content
        const cleanTags = this.extractCleanTags(tagsContent);
        return `tags: [${cleanTags}]`;
      }
    );
    
    // Fix 2: Fix service and location fields
    fixedContent = fixedContent.replace(
      /service:\s*"\[object Object\]"/g,
      'service: "battery-recycling"'
    );
    
    fixedContent = fixedContent.replace(
      /location:\s*"\[object Object\]"/g,
      'location: "aluva"'
    );
    
    // Fix 3: Fix description field if it contains location object
    fixedContent = fixedContent.replace(
      /description:\s*"([^"]*\{[^}]*\}[^"]*)"/g,
      (match, description) => {
        // Remove object references from description
        const cleanDesc = description.replace(/\{[^}]*\}/g, '').replace(/\s+/g, ' ').trim();
        return `description: "${cleanDesc}"`;
      }
    );
    
    // Fix 4: Ensure proper YAML syntax for arrays
    fixedContent = fixedContent.replace(
      /(\w+):\s*\[([^\]]*)\]/g,
      (match, key, content) => {
        // Ensure proper comma separation in arrays
        const items = content.split(',').map(item => item.trim()).filter(item => item);
        const cleanItems = items.map(item => {
          if (!item.startsWith('"') && !item.startsWith("'")) {
            return `"${item}"`;
          }
          return item;
        });
        return `${key}: [${cleanItems.join(', ')}]`;
      }
    );
    
    // Fix 5: Ensure proper date format
    fixedContent = fixedContent.replace(
      /published:\s*"([^"]+)"/g,
      (match, date) => {
        // Convert to ISO date format if needed
        const isoDate = this.formatDate(date);
        return `published: "${isoDate}"`;
      }
    );
    
    return fixedContent;
  }

  /**
   * Extract clean tags from malformed content
   */
  extractCleanTags(tagsContent) {
    const tags = [];
    
    // Extract quoted strings
    const quotedMatches = tagsContent.match(/"([^"]+)"/g);
    if (quotedMatches) {
      quotedMatches.forEach(match => {
        const tag = match.replace(/"/g, '');
        if (tag && !tag.includes('{') && !tag.includes('}')) {
          tags.push(`"${tag}"`);
        }
      });
    }
    
    // Extract simple words (non-quoted)
    const wordMatches = tagsContent.match(/\b([a-zA-Z0-9-]+)\b/g);
    if (wordMatches) {
      wordMatches.forEach(word => {
        if (word !== 'tags' && word !== 'slug' && word !== 'pincode' && 
            word !== 'coordinates' && word !== 'landmarks' && 
            word !== 'businessParks' && word !== 'population' &&
            !word.includes('{') && !word.includes('}') &&
            !tags.includes(`"${word}"`)) {
          tags.push(`"${word}"`);
        }
      });
    }
    
    return tags.join(', ');
  }

  /**
   * Format date to ISO format
   */
  formatDate(dateStr) {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return '2025-04-23'; // Default date
      }
      return date.toISOString().split('T')[0];
    } catch (error) {
      return '2025-04-23';
    }
  }
}

// Run if called directly
if (require.main === module) {
  const fixer = new FrontmatterFixer();
  fixer.fixAllFrontmatter().catch(console.error);
}

module.exports = FrontmatterFixer;
