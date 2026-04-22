const fs = require('fs');
const path = require('path');

// Function to extract FAQs from blog content
function extractFAQs(content) {
  const faqs = [];
  
  // Look for FAQ section
  const faqSectionMatch = content.match(/## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/);
  if (!faqSectionMatch) return faqs;
  
  const faqContent = faqSectionMatch[1];
  
  // Extract individual Q&A pairs
  const qaPairs = faqContent.match(/### ([^\n]+)\n\n([^\n]+(?:\n[^#\n][^\n]*)*)/g);
  
  if (qaPairs) {
    qaPairs.forEach(pair => {
      const match = pair.match(/### ([^\n]+)\n\n([^\n]+(?:\n[^#\n][^\n]*)*)/);
      if (match) {
        faqs.push({
          question: match[1].trim(),
          answer: match[2].trim()
        });
      }
    });
  }
  
  return faqs;
}

// Function to generate JSON-LD FAQ schema
function generateFAQSchema(faqs) {
  if (faqs.length === 0) return '';
  
  let schema = `\n<script type="application/ld+json">\n{\n`;
  schema += `  "@context": "https://schema.org",\n`;
  schema += `  "@type": "FAQPage",\n`;
  schema += `  "mainEntity": [\n`;
  
  faqs.forEach((faq, index) => {
    schema += `    {\n`;
    schema += `      "@type": "Question",\n`;
    schema += `      "name": "${faq.question.replace(/"/g, '\\"')}",\n`;
    schema += `      "acceptedAnswer": {\n`;
    schema += `        "@type": "Answer",\n`;
    schema += `        "text": "${faq.answer.replace(/"/g, '\\"').replace(/\n/g, ' ')}"\n`;
    schema += `      }\n`;
    schema += `    }${index < faqs.length - 1 ? ',' : ''}\n`;
  });
  
  schema += `  ]\n`;
  schema += `}\n</script>\n\n`;
  
  return schema;
}

// Function to add Article schema
function generateArticleSchema(title, description, publishDate) {
  let schema = `\n<script type="application/ld+json">\n{\n`;
  schema += `  "@context": "https://schema.org",\n`;
  schema += `  "@type": "Article",\n`;
  schema += `  "headline": "${title.replace(/"/g, '\\"')}",\n`;
  schema += `  "description": "${description.replace(/"/g, '\\"')}",\n`;
  schema += `  "datePublished": "${publishDate}",\n`;
  schema += `  "author": {\n`;
  schema += `    "@type": "Organization",\n`;
  schema += `    "name": "EWaste Kochi"\n`;
  schema += `  },\n`;
  schema += `  "publisher": {\n`;
  schema += `    "@type": "Organization",\n`;
  schema += `    "name": "EWaste Kochi",\n`;
  schema += `    "logo": {\n`;
  schema += `      "@type": "ImageObject",\n`;
  schema += `      "url": "https://www.ewastekochi.com/logo.png"\n`;
  schema += `    }\n`;
  schema += `  }\n`;
  schema += `}\n</script>\n\n`;
  
  return schema;
}

// Function to extract frontmatter data
function extractFrontmatter(content) {
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

// Process all blog files
function addFAQSchemaToBlogs() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${files.length} blog files to process...`);
  
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  
  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has schema
    if (content.includes('application/ld+json')) {
      skipped++;
      return;
    }
    
    try {
      // Extract frontmatter
      const frontmatter = extractFrontmatter(content);
      
      // Extract FAQs
      const faqs = extractFAQs(content);
      
      if (faqs.length === 0) {
        skipped++;
        return;
      }
      
      // Generate schemas
      const faqSchema = generateFAQSchema(faqs);
      const articleSchema = generateArticleSchema(
        frontmatter.title || 'Blog Post',
        frontmatter.description || 'Blog description',
        frontmatter.published || new Date().toISOString().split('T')[0]
      );
      
      // Find where to insert schemas (before the first ## heading)
      const contentMatch = content.match(/^---[\s\S]*?---\n\n(##)/);
      if (!contentMatch) {
        errors++;
        console.log(`Error: Could not find content structure in ${file}`);
        return;
      }
      
      // Insert schemas after frontmatter
      const newContent = content.replace(
        contentMatch[0],
        `---${contentMatch[1]}---\n\n${articleSchema}${faqSchema}${contentMatch[1]}`
      );
      
      // Write updated content
      fs.writeFileSync(filePath, newContent);
      processed++;
      
      console.log(`Added schema to: ${file} (${faqs.length} FAQs)`);
      
    } catch (error) {
      errors++;
      console.log(`Error processing ${file}: ${error.message}`);
    }
  });
  
  console.log(`\nSchema Addition Complete:`);
  console.log(`- Processed: ${processed} files`);
  console.log(`- Skipped: ${skipped} files (already had schema or no FAQs)`);
  console.log(`- Errors: ${errors} files`);
  console.log(`- Total: ${files.length} files`);
}

// Run the script
addFAQSchemaToBlogs();
