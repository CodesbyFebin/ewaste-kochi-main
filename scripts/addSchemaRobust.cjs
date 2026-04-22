const fs = require('fs');
const path = require('path');

// Function to extract FAQs from blog content
function extractFAQs(content) {
  const faqs = [];
  
  // Look for FAQ section - more flexible pattern
  const faqSectionMatch = content.match(/## Frequently Asked Questions\s*\n\n([\s\S]*?)(?=\n## |\n---|$)/);
  if (!faqSectionMatch) return faqs;
  
  const faqContent = faqSectionMatch[1];
  
  // Extract individual Q&A pairs - handle different formats
  const qaPatterns = [
    /### ([^\n]+)\n\n([^\n#]+(?:\n[^\n#][^\n]*)*)/g,
    /### ([^\n]+)\n\n([^\n]+(?:\n[^#\n][^\n]*)*)/g,
    /\*\*Q:[\s]*([^\*]+)\*\*\s*\n*([^\n]+(?:\n[^\n][^\n]*)*)/g
  ];
  
  qaPatterns.forEach(pattern => {
    const matches = [...faqContent.matchAll(pattern)];
    matches.forEach(match => {
      if (match[1] && match[2]) {
        const question = match[1].trim().replace(/^###\s*/, '');
        const answer = match[2].trim();
        
        // Clean up the answer - remove extra whitespace and format
        const cleanAnswer = answer.replace(/\n\s*\n/g, ' ').replace(/\s+/g, ' ').trim();
        
        if (question && cleanAnswer && question.length > 10 && cleanAnswer.length > 20) {
          faqs.push({
            question: question,
            answer: cleanAnswer
          });
        }
      }
    });
  });
  
  return faqs;
}

// Function to generate JSON-LD FAQ schema
function generateFAQSchema(faqs) {
  if (faqs.length === 0) return '';
  
  let schema = '\n<script type="application/ld+json">\n{\n';
  schema += '  "@context": "https://schema.org",\n';
  schema += '  "@type": "FAQPage",\n';
  schema += '  "mainEntity": [\n';
  
  faqs.forEach((faq, index) => {
    schema += '    {\n';
    schema += '      "@type": "Question",\n';
    schema += `      "name": "${faq.question.replace(/"/g, '\\"')}",\n`;
    schema += '      "acceptedAnswer": {\n';
    schema += '        "@type": "Answer",\n';
    schema += `        "text": "${faq.answer.replace(/"/g, '\\"')}"\n`;
    schema += '      }\n';
    schema += `    }${index < faqs.length - 1 ? ',' : ''}\n`;
  });
  
  schema += '  ]\n';
  schema += '}\n</script>\n\n';
  
  return schema;
}

// Function to generate Article schema
function generateArticleSchema(frontmatter) {
  const title = frontmatter.title || 'Blog Post';
  const description = frontmatter.description || 'Blog description';
  const publishDate = frontmatter.publishDate || frontmatter.published || new Date().toISOString().split('T')[0];
  
  let schema = '\n<script type="application/ld+json">\n{\n';
  schema += '  "@context": "https://schema.org",\n';
  schema += '  "@type": "Article",\n';
  schema += `  "headline": "${title.replace(/"/g, '\\"')}",\n`;
  schema += `  "description": "${description.replace(/"/g, '\\"')}",\n`;
  schema += `  "datePublished": "${publishDate}",\n`;
  schema += '  "author": {\n';
  schema += '    "@type": "Organization",\n';
  schema += '    "name": "EWaste Kochi"\n';
  schema += '  },\n';
  schema += '  "publisher": {\n';
  schema += '    "@type": "Organization",\n';
  schema += '    "name": "EWaste Kochi",\n';
  schema += '    "logo": {\n';
  schema += '      "@type": "ImageObject",\n';
  schema += '      "url": "https://www.ewastekochi.com/logo.png"\n';
  schema += '    }\n';
  schema += '  }\n';
  schema += '}\n</script>\n\n';
  
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
      // Handle array values
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
        }
      }
      frontmatter[match[1]] = value;
    }
  });
  
  return frontmatter;
}

// Process all blog files
function addSchemaToBlogs() {
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
      const articleSchema = generateArticleSchema(frontmatter);
      
      // Find insertion point - after frontmatter, before first content
      const frontmatterEnd = content.indexOf('---', 1);
      if (frontmatterEnd === -1) {
        errors++;
        return;
      }
      
      // Find the first ## heading after frontmatter
      const firstHeadingMatch = content.substring(frontmatterEnd).match(/\n\n(# |\n## )/);
      if (!firstHeadingMatch) {
        errors++;
        return;
      }
      
      const insertionPoint = frontmatterEnd + firstHeadingMatch.index + firstHeadingMatch[0].length;
      
      // Insert schemas
      const newContent = 
        content.substring(0, insertionPoint) + 
        '\n\n' + articleSchema + faqSchema + 
        content.substring(insertionPoint);
      
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
addSchemaToBlogs();
