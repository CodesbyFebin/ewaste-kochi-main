const fs = require('fs');
const path = require('path');

/**
 * Fix Build Errors Script
 * Fixes tags schema validation and duplicate IDs
 */

class BuildErrorFixer {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.fixedCount = 0;
    this.errorCount = 0;
  }

  /**
   * Fix all build errors
   */
  async fixAllErrors() {
    console.log('Fixing build errors...\n');
    
    // Fix 1: Tags schema validation
    await this.fixTagsSchema();
    
    // Fix 2: Duplicate IDs
    await this.fixDuplicateIDs();
    
    // Fix 3: Content schema validation
    await this.fixContentSchema();
    
    console.log(`\nBuild Error Fixing Complete:`);
    console.log(`- Fixed: ${this.fixedCount} files`);
    console.log(`- Errors: ${this.errorCount} files`);
  }

  /**
   * Fix tags schema validation
   */
  async fixTagsSchema() {
    console.log('Fixing tags schema validation...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Fix tags array - convert objects to strings
        const fixedContent = content.replace(
          /tags:\s*\[([^\]]+)\]/g,
          (match, tagsContent) => {
            // Remove object references and keep only strings
            const cleanTags = tagsContent
              .split(',')
              .map(tag => {
                const trimmed = tag.trim();
                // If it's an object, extract the string value
                if (trimmed.startsWith('{') && trimmed.includes('"name":')) {
                  const nameMatch = trimmed.match(/"name":\s*"([^"]+)"/);
                  return nameMatch ? `"${nameMatch[1]}"` : trimmed;
                }
                return trimmed;
              })
              .filter(tag => tag && !tag.startsWith('{'))
              .join(', ');
            
            return `tags: [${cleanTags}]`;
          }
        );
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent);
          this.fixedCount++;
        }
        
      } catch (error) {
        this.errorCount++;
        console.log(`Error fixing ${file}: ${error.message}`);
      }
    }
    
    console.log(`Fixed tags schema in ${this.fixedCount} files`);
  }

  /**
   * Fix duplicate IDs
   */
  async fixDuplicateIDs() {
    console.log('Fixing duplicate IDs...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    const idMap = new Map();
    
    // First pass: identify duplicates
    files.forEach(file => {
      const baseName = file.replace('.md', '');
      const parts = baseName.split('-');
      const id = parts.slice(0, -1).join('-'); // Remove last part (usually location)
      
      if (idMap.has(id)) {
        idMap.get(id).push(file);
      } else {
        idMap.set(id, [file]);
      }
    });
    
    // Second pass: fix duplicates
    for (const [id, duplicateFiles] of idMap.entries()) {
      if (duplicateFiles.length > 1) {
        duplicateFiles.forEach((file, index) => {
          if (index > 0) { // Keep first file, rename others
            const filePath = path.join(this.blogDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Add unique suffix to filename
            const newFileName = file.replace('.md', `-${index + 1}.md`);
            const newFilePath = path.join(this.blogDir, newFileName);
            
            // Update content with new filename reference
            const updatedContent = content.replace(
              new RegExp(file.replace('.md', ''), 'g'),
              newFileName.replace('.md', '')
            );
            
            fs.writeFileSync(newFilePath, updatedContent);
            fs.unlinkSync(filePath);
            
            this.fixedCount++;
          }
        });
      }
    }
    
    console.log(`Fixed duplicate IDs`);
  }

  /**
   * Fix content schema validation
   */
  async fixContentSchema() {
    console.log('Fixing content schema validation...');
    
    const files = fs.readdirSync(this.blogDir).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      try {
        const filePath = path.join(this.blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Fix frontmatter schema issues
        const fixedContent = this.fixFrontmatter(content);
        
        if (fixedContent !== content) {
          fs.writeFileSync(filePath, fixedContent);
          this.fixedCount++;
        }
        
      } catch (error) {
        this.errorCount++;
        console.log(`Error fixing schema in ${file}: ${error.message}`);
      }
    }
    
    console.log(`Fixed content schema validation`);
  }

  /**
   * Fix frontmatter schema
   */
  fixFrontmatter(content) {
    let fixedContent = content;
    
    // Fix tags field
    fixedContent = fixedContent.replace(
      /tags:\s*\[([^\]]+)\]/g,
      (match, tagsContent) => {
        const cleanTags = tagsContent
          .split(',')
          .map(tag => {
            const trimmed = tag.trim();
            if (trimmed.startsWith('{')) {
              const nameMatch = trimmed.match(/"name":\s*"([^"]+)"/);
              return nameMatch ? `"${nameMatch[1]}"` : '"unknown"';
            }
            return trimmed.startsWith('"') ? trimmed : `"${trimmed}"`;
          })
          .filter(tag => tag && tag !== '""')
          .join(', ');
        
        return `tags: [${cleanTags}]`;
      }
    );
    
    // Ensure required fields exist
    if (!fixedContent.includes('publishDate:')) {
      fixedContent = fixedContent.replace(
        /^---\n([\s\S]*?)\n---/,
        (match, frontmatter) => {
          return `---\n${frontmatter}\npublishDate: "2025-04-23"\n---`;
        }
      );
    }
    
    return fixedContent;
  }
}

// Run if called directly
if (require.main === module) {
  const fixer = new BuildErrorFixer();
  fixer.fixAllErrors().catch(console.error);
}

module.exports = BuildErrorFixer;
