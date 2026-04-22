import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load existing blog index
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));

class BlogAnalyzer {
  constructor() {
    this.blogs = blogIndex;
    this.analysis = {
      totalBlogs: 0,
      services: {},
      locations: {},
      topics: {},
      wordCounts: [],
      publishDates: [],
      contentQuality: {
        withSchema: 0,
        withoutSchema: 0,
        averageWordCount: 0
      }
    };
  }

  analyze() {
    console.log('Analyzing existing blog structure...');
    
    this.analysis.totalBlogs = this.blogs.length;
    
    // Analyze distribution
    this.blogs.forEach(blog => {
      // Services
      this.analysis.services[blog.service] = (this.analysis.services[blog.service] || 0) + 1;
      
      // Locations
      this.analysis.locations[blog.location] = (this.analysis.locations[blog.location] || 0) + 1;
      
      // Topics
      this.analysis.topics[blog.topic] = (this.analysis.topics[blog.topic] || 0) + 1;
      
      // Publish dates
      this.analysis.publishDates.push(blog.publishDate);
    });
    
    // Check schema files
    const blogDir = path.join(__dirname, '../../src/content/blog');
    const mdFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
    const schemaFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.schema.json'));
    
    this.analysis.contentQuality.withSchema = schemaFiles.length;
    this.analysis.contentQuality.withoutSchema = mdFiles.length - schemaFiles.length;
    
    // Sample word count analysis (check first 10 blogs)
    let totalWordCount = 0;
    let sampleCount = 0;
    
    this.blogs.slice(0, 10).forEach(blog => {
      const blogPath = path.join(blogDir, `${blog.slug}.md`);
      try {
        const content = fs.readFileSync(blogPath, 'utf8');
        const wordCount = content.split(/\s+/).length;
        totalWordCount += wordCount;
        sampleCount++;
      } catch (error) {
        console.log(`Could not read ${blog.slug}.md`);
      }
    });
    
    this.analysis.contentQuality.averageWordCount = sampleCount > 0 ? Math.round(totalWordCount / sampleCount) : 0;
    
    return this.analysis;
  }

  generateReport() {
    const analysis = this.analyze();
    
    console.log('\n=== BLOG ANALYSIS REPORT ===');
    console.log(`Total Blogs: ${analysis.totalBlogs}`);
    console.log(`Blogs with Schema: ${analysis.contentQuality.withSchema}`);
    console.log(`Blogs without Schema: ${analysis.contentQuality.withoutSchema}`);
    console.log(`Average Word Count: ${analysis.contentQuality.averageWordCount}`);
    
    console.log('\n=== SERVICE DISTRIBUTION ===');
    Object.entries(analysis.services)
      .sort(([,a], [,b]) => b - a)
      .forEach(([service, count]) => {
        console.log(`${service}: ${count} blogs`);
      });
    
    console.log('\n=== LOCATION DISTRIBUTION ===');
    Object.entries(analysis.locations)
      .sort(([,a], [,b]) => b - a)
      .forEach(([location, count]) => {
        console.log(`${location}: ${count} blogs`);
      });
    
    console.log('\n=== TOPIC DISTRIBUTION ===');
    Object.entries(analysis.topics)
      .sort(([,a], [,b]) => b - a)
      .forEach(([topic, count]) => {
        console.log(`${topic}: ${count} blogs`);
      });
    
    return analysis;
  }

  saveAnalysis() {
    const analysis = this.analyze();
    const analysisPath = path.join(__dirname, '../../data/blog-analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    console.log(`Analysis saved to: ${analysisPath}`);
    return analysis;
  }
}

// Run analysis
const analyzer = new BlogAnalyzer();
const analysis = analyzer.generateReport();
analyzer.saveAnalysis();
