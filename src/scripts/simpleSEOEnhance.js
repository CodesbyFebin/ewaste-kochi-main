import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load blog index and data
const blogIndex = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-index.json'), 'utf8'));
const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/blog-structures.json'), 'utf8'));

class SimpleSEOEnhancer {
  constructor() {
    this.locations = blogData.locations;
    this.services = blogData.services;
    this.topics = blogData.topics;
    this.brands = blogData.brands;
  }

  enhanceBlogSEO(blog) {
    const location = this.locations.find(l => l.slug === blog.location);
    const service = this.services.find(s => s.slug === blog.service);
    
    // Enhanced SEO title
    const currentYear = new Date().getFullYear();
    const seoTitle = `${service ? service.name : 'E-Waste Services'} in ${location ? location.name : 'Kochi'} ${currentYear}: Complete Guide`;
    
    // Enhanced meta description
    const metaDescription = `Looking for ${service ? service.name.toLowerCase() : 'e-waste services'} in ${location ? location.name : 'Kochi'}? Our ${currentYear} guide covers pricing, process, legal requirements, and environmental benefits. Get expert insights and free quotes.`;
    
    // Enhanced keywords
    const keywords = [
      service ? service.name : 'E-Waste Services',
      location ? location.name : 'Kochi',
      service ? service.category : 'recycling',
      blog.topic,
      'featured-snippet',
      'local-seo'
    ].filter(Boolean);

    // Enhanced tags
    const tags = [
      service ? service.name : 'E-Waste Services',
      location ? location.name : 'Kochi',
      service ? service.category : 'recycling',
      blog.topic,
      'featured-snippet',
      'local-seo'
    ].filter(Boolean);

    return {
      seoTitle,
      metaDescription,
      keywords,
      tags,
      currentYear
    };
  }

  enhanceAllBlogs() {
    console.log('Enhancing SEO for 1,000 blog posts...');
    
    const blogsDir = path.join(__dirname, '../../src/content/blog');
    
    blogIndex.forEach((blog, index) => {
      const enhanced = this.enhanceBlogSEO(blog);
      const blogPath = path.join(blogsDir, `${blog.slug}.md`);
      
      try {
        // Read existing file
        const existingContent = fs.readFileSync(blogPath, 'utf8');
        const lines = existingContent.split('\n');
        
        // Find frontmatter section
        const frontmatterStart = lines.findIndex(line => line === '---');
        const frontmatterEnd = lines.findIndex((line, i) => i > frontmatterStart && line === '---');
        
        if (frontmatterStart !== -1 && frontmatterEnd !== -1) {
          // Update frontmatter
          const frontmatter = lines.slice(frontmatterStart + 1, frontmatterEnd);
          const content = lines.slice(frontmatterEnd + 1).join('\n');
          
          // Update specific fields
          const updatedFrontmatter = frontmatter.map(line => {
            if (line.startsWith('title:')) {
              return `title: "${enhanced.seoTitle}"`;
            }
            if (line.startsWith('description:')) {
              return `description: "${enhanced.metaDescription}"`;
            }
            if (line.startsWith('tags:')) {
              return `tags: [${enhanced.tags.map(tag => `"${tag}"`).join(', ')}]`;
            }
            return line;
          });
          
          // Add new SEO fields if not present
          if (!updatedFrontmatter.some(line => line.startsWith('seo:'))) {
            updatedFrontmatter.push('seo:');
            updatedFrontmatter.push('  title: "' + enhanced.seoTitle + '"');
            updatedFrontmatter.push('  description: "' + enhanced.metaDescription + '"');
            updatedFrontmatter.push('  keywords: [' + enhanced.keywords.map(k => `"${k}"`).join(', ') + ']');
            updatedFrontmatter.push('  featuredSnippet: true');
          }
          
          // Add local SEO if not present
          if (!updatedFrontmatter.some(line => line.startsWith('localSEO:')) && location) {
            updatedFrontmatter.push('localSEO:');
            updatedFrontmatter.push('  city: "' + location.name + '"');
            updatedFrontmatter.push('  state: "Kerala"');
            updatedFrontmatter.push('  pincode: "' + location.pincode + '"');
            updatedFrontmatter.push('  coordinates: { lat: ' + location.coordinates.lat + ', lng: ' + location.coordinates.lng + ' }');
          }
          
          // Reconstruct file
          const newContent = [
            '---',
            ...updatedFrontmatter,
            '---',
            content
          ].join('\n');
          
          fs.writeFileSync(blogPath, newContent);
        }
        
        if ((index + 1) % 100 === 0) {
          console.log(`Enhanced ${index + 1} blogs...`);
        }
        
      } catch (error) {
        console.log(`Error processing ${blog.slug}: ${error.message}`);
      }
    });
    
    console.log('SEO enhancement complete!');
  }
}

// Run enhancement
const enhancer = new SimpleSEOEnhancer();
enhancer.enhanceAllBlogs();

console.log('Successfully enhanced all blog posts with basic SEO features!');
console.log('Enhancements include:');
console.log('- SEO-optimized titles');
console.log('- Enhanced meta descriptions');
console.log('- Better keywords and tags');
console.log('- Local SEO elements');
console.log('- Featured snippet optimization');
