const fs = require('fs');
const path = require('path');

/**
 * Test the Real Generator with Small Batch
 * Creates 10 test posts to verify the generator works
 */

class TestRealGenerator {
  constructor() {
    this.blogDir = path.join(__dirname, '../src/content/blog');
    this.testDir = path.join(this.blogDir, 'test-posts');
  }

  /**
   * Run test with 10 posts
   */
  async runTest() {
    console.log('Testing Real Generator with 10 posts...\n');
    
    // Create test directory
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true });
    }
    
    // Load the real generator
    const RealBlogGenerator = require('./generateReal10kBlogs.cjs');
    const generator = new RealBlogGenerator();
    
    // Generate 10 test posts
    for (let i = 0; i < 10; i++) {
      try {
        const post = generator.generateSinglePost(i);
        const filename = `test-${post.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')}.md`;
        const filePath = path.join(this.testDir, filename);
        
        fs.writeFileSync(filePath, post.content);
        console.log(`Created: ${filename}`);
        
      } catch (error) {
        console.log(`Error creating test post ${i + 1}: ${error.message}`);
      }
    }
    
    console.log('\nTest complete! Check src/content/blog/test-posts/ for generated files.');
    
    // Show sample content
    const testFiles = fs.readdirSync(this.testDir).filter(file => file.endsWith('.md'));
    if (testFiles.length > 0) {
      const sampleFile = path.join(this.testDir, testFiles[0]);
      const content = fs.readFileSync(sampleFile, 'utf8');
      const lines = content.split('\n');
      
      console.log('\nSample content (first 20 lines):');
      console.log('-'.repeat(50));
      lines.slice(0, 20).forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);
      });
      console.log('-'.repeat(50));
    }
  }
}

// Run test
if (require.main === module) {
  const tester = new TestRealGenerator();
  tester.runTest().catch(console.error);
}

module.exports = TestRealGenerator;
