const BlogSEOEnhancer = require('./enhanceBlogSEO.cjs');
const BlogGenerator = require('./generateBlogs.cjs');
const SchemaGenerator = require('./schemaGenerator.cjs');

/**
 * Blog Content Enhancement Pipeline Runner
 * End-to-end orchestration of blog enhancement processes
 */

class PipelineRunner {
  constructor() {
    this.enhancer = new BlogSEOEnhancer();
    this.generator = new BlogGenerator();
    this.schemaGenerator = new SchemaGenerator();
    this.startTime = Date.now();
  }

  /**
   * Run complete enhancement pipeline
   */
  async runCompletePipeline() {
    console.log('🚀 Starting Complete Blog Enhancement Pipeline...\n');

    try {
      // Phase 1: Enhance existing blogs
      await this.runEnhancementPhase();
      
      // Phase 2: Generate new blogs (if needed)
      await this.runGenerationPhase();
      
      // Phase 3: Schema validation
      await this.runValidationPhase();
      
      // Phase 4: Generate report
      this.generateFinalReport();
      
    } catch (error) {
      console.error('❌ Pipeline failed:', error);
    }
  }

  /**
   * Phase 1: Enhance existing blog posts
   */
  async runEnhancementPhase() {
    console.log('📝 Phase 1: Enhancing Existing Blog Posts');
    console.log('=' .repeat(50));
    
    await this.enhancer.enhanceAllBlogs();
    
    console.log('\n✅ Enhancement phase completed.\n');
  }

  /**
   * Phase 2: Generate new blog posts
   */
  async runGenerationPhase(options = {}) {
    console.log('📝 Phase 2: Generating New Blog Posts');
    console.log('=' .repeat(50));
    
    const { count = 100, fromTitles = false, csvPath = null } = options;
    
    if (fromTitles && csvPath) {
      await this.generator.generateFromCSV(csvPath);
    } else if (fromTitles) {
      const sampleTitles = [
        'How to Dispose Laptops in Kochi',
        'Benefits of Battery Recycling in Aluva',
        'Cost of Data Destruction in Ernakulam',
        'Server Recycling Guide for Kakkanad',
        'Phone Buyback Best Practices Edappally',
        'Monitor Recycling Process Thrippunithura',
        'Cable Management Solutions Angamaly',
        'E-Waste Collection North Paravur',
        'IT Asset Disposition Compliance',
        'Environmental Benefits of Electronics Recycling'
      ];
      await this.generator.generateFromTitles(sampleTitles);
    } else {
      await this.generator.generateBulkBlogs(count);
    }
    
    console.log('\n✅ Generation phase completed.\n');
  }

  /**
   * Phase 3: Schema validation
   */
  async runValidationPhase() {
    console.log('🔍 Phase 3: Schema Validation');
    console.log('=' .repeat(50));
    
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(__dirname, '../src/content/blog');
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    let validSchemas = 0;
    let invalidSchemas = 0;
    let totalSchemas = 0;
    
    for (const file of files.slice(0, 10)) { // Validate first 10 files as sample
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      const schemaMatches = content.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
      
      schemaMatches.forEach(schema => {
        totalSchemas++;
        if (this.schemaGenerator.validateSchema(schema)) {
          validSchemas++;
        } else {
          invalidSchemas++;
          console.log(`❌ Invalid schema in ${file}`);
        }
      });
    }
    
    console.log(`📊 Schema Validation Results:`);
    console.log(`   Total schemas: ${totalSchemas}`);
    console.log(`   Valid schemas: ${validSchemas}`);
    console.log(`   Invalid schemas: ${invalidSchemas}`);
    console.log(`   Success rate: ${((validSchemas / totalSchemas) * 100).toFixed(1)}%\n`);
  }

  /**
   * Generate final pipeline report
   */
  generateFinalReport() {
    const endTime = Date.now();
    const duration = ((endTime - this.startTime) / 1000 / 60).toFixed(2);
    
    console.log('📊 Final Pipeline Report');
    console.log('=' .repeat(50));
    console.log(`⏱️  Total execution time: ${duration} minutes`);
    console.log(`📅 Completed at: ${new Date().toISOString()}`);
    
    // Count total files
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(__dirname, '../src/content/blog');
    const totalFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md')).length;
    
    // Count files with schema
    const filesWithSchema = fs.readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .filter(file => {
        const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
        return content.includes('application/ld+json');
      }).length;
    
    console.log(`📁 Total blog files: ${totalFiles}`);
    console.log(`📝 Files with schema: ${filesWithSchema}`);
    console.log(`📈 Schema coverage: ${((filesWithSchema / totalFiles) * 100).toFixed(1)}%`);
    
    console.log('\n🎉 Pipeline completed successfully!');
  }

  /**
   * Run specific pipeline phases
   */
  async runPhase(phase, options = {}) {
    switch (phase) {
      case 'enhance':
        await this.runEnhancementPhase();
        break;
      case 'generate':
        await this.runGenerationPhase(options);
        break;
      case 'validate':
        await this.runValidationPhase();
        break;
      default:
        console.error('❌ Unknown phase. Use: enhance, generate, or validate');
    }
  }

  /**
   * Quick enhancement for new blogs
   */
  async quickEnhance(filename) {
    console.log(`⚡ Quick enhancing: ${filename}`);
    await this.enhancer.processBlogFile(filename);
  }

  /**
   * Bulk schema generation
   */
  async bulkSchemaGeneration() {
    console.log('🔄 Running bulk schema generation...');
    
    const fs = require('fs');
    const path = require('path');
    const blogDir = path.join(__dirname, '../src/content/blog');
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    let processed = 0;
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('application/ld+json')) {
        const { frontmatter, body } = this.enhancer.parseMarkdown(content);
        const schemas = this.schemaGenerator.generateCompleteSchema(frontmatter, body, file.replace('.md', ''));
        const enhancedContent = `${content}\n\n${schemas.join('\n\n')}`;
        
        fs.writeFileSync(filePath, enhancedContent);
        processed++;
        
        if (processed % 100 === 0) {
          console.log(`📝 Processed ${processed} files...`);
        }
      }
    }
    
    console.log(`✅ Added schema to ${processed} files.`);
  }
}

// CLI interface
function showUsage() {
  console.log(`
Blog Content Enhancement Pipeline

Usage:
  node pipeline-runner.js [command] [options]

Commands:
  complete                    Run full pipeline
  enhance                    Enhance existing blogs only
  generate [count]            Generate new blogs (default: 100)
  validate                    Validate existing schemas
  quick-enhance [filename]      Quick enhance single file
  bulk-schema                 Add schema to all files without it

Examples:
  node pipeline-runner.js complete
  node pipeline-runner.js generate 1000
  node pipeline-runner.js enhance
  node pipeline-runner.js validate
  node pipeline-runner.js quick-enhance my-blog-post.md
  node pipeline-runner.js bulk-schema
`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'help') {
    showUsage();
    return;
  }
  
  const runner = new PipelineRunner();
  
  try {
    switch (command) {
      case 'complete':
        await runner.runCompletePipeline();
        break;
      case 'enhance':
        await runner.runPhase('enhance');
        break;
      case 'generate':
        const count = parseInt(args[1]) || 100;
        await runner.runPhase('generate', { count });
        break;
      case 'validate':
        await runner.runPhase('validate');
        break;
      case 'quick-enhance':
        const filename = args[1];
        if (!filename) {
          console.error('❌ Please provide a filename');
          showUsage();
          return;
        }
        await runner.quickEnhance(filename);
        break;
      case 'bulk-schema':
        await runner.bulkSchemaGeneration();
        break;
      default:
        console.error(`❌ Unknown command: ${command}`);
        showUsage();
    }
  } catch (error) {
    console.error('❌ Execution failed:', error.message);
    process.exit(1);
  }
}

// Export for use in other modules
module.exports = PipelineRunner;

// Run if called directly
if (require.main === module) {
  main();
}
