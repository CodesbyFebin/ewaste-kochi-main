import fs from 'fs';
import * as cheerio from 'cheerio';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// Configuration
const DOMAIN = 'https://ewastekochi.com';
const SITEMAP_URL = `${DOMAIN}/sitemap-index.xml`; // or specific sitemap
const INPUT_CSV = process.argv[2] || 'urls.csv';
const OUTPUT_CSV = 'qa_results.csv';
const SIMILARITY_THRESHOLD = 0.8; // Alert if >80% similar to another page

// Basic Jaccard Similarity for text uniqueness
function getTokens(text) {
  return new Set(text.toLowerCase().match(/\b\w+\b/g) || []);
}

function jaccardSimilarity(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

// Extract main content for length and uniqueness
function extractMainText($) {
  // Try to find main content areas, fallback to body text excluding nav/footer
  let content = $('main, article, .content, .post-body').text();
  if (!content) {
    const clone = $('body').clone();
    clone.find('nav, header, footer, script, style, aside').remove();
    content = clone.text();
  }
  return content.replace(/\s+/g, ' ').trim();
}

async function fetchSitemapUrls(sitemapUrl) {
  try {
    const res = await fetch(sitemapUrl);
    if (!res.ok) return new Set();
    const xml = await res.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    
    // If it's a sitemap index, we should ideally fetch sub-sitemaps. 
    // For simplicity, we'll collect all <loc> tags from whichever XML is returned.
    const urls = new Set();
    $('loc').each((_, el) => urls.add($(el).text().trim()));
    return urls;
  } catch (err) {
    console.error(`Error fetching sitemap ${sitemapUrl}:`, err.message);
    return new Set();
  }
}

async function runQA() {
  console.log(`🚀 Starting SEO QA Script...`);
  
  let urlsToTest = [];
  
  if (fs.existsSync(INPUT_CSV)) {
    console.log(`📄 Reading URLs from ${INPUT_CSV}`);
    const fileContent = fs.readFileSync(INPUT_CSV, 'utf-8');
    const records = parse(fileContent, { columns: true, skip_empty_lines: true });
    urlsToTest = records.map(r => r.URL || r.url).filter(Boolean);
  } else {
    console.log(`⚠️ No ${INPUT_CSV} found. Using sample URLs for demonstration.`);
    urlsToTest = [
      `${DOMAIN}/`,
      `${DOMAIN}/services/`,
      `${DOMAIN}/data-destruction/`
    ];
  }

  console.log(`🗺️  Fetching sitemap to verify inclusion...`);
  const sitemapUrls = await fetchSitemapUrls(SITEMAP_URL);

  const results = [];
  const processedTokens = []; // Store sets of tokens for uniqueness check

  for (let i = 0; i < urlsToTest.length; i++) {
    const url = urlsToTest[i];
    console.log(`[${i + 1}/${urlsToTest.length}] Validating: ${url}`);
    
    const result = {
      url,
      status: 'Error',
      word_count: 0,
      has_canonical: false,
      has_schema: false,
      internal_links: 0,
      in_sitemap: sitemapUrls.has(url),
      max_similarity: 0,
      similar_to: '',
      warnings: []
    };

    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'SEO-QA-Bot/1.0' }});
      result.status = res.status;
      
      if (!res.ok) {
        result.warnings.push(`HTTP ${res.status}`);
        results.push(result);
        continue;
      }

      const html = await res.text();
      const $ = cheerio.load(html);

      // 1. Canonical
      const canonical = $('link[rel="canonical"]').attr('href');
      result.has_canonical = !!canonical;
      if (!canonical) result.warnings.push('Missing Canonical');
      else if (canonical !== url && !url.endsWith('/') && canonical !== url + '/') {
          // Soft match for trailing slashes
          result.warnings.push(`Canonical mismatch: ${canonical}`);
      }

      // 2. Schema (JSON-LD)
      const schemas = $('script[type="application/ld+json"]');
      result.has_schema = schemas.length > 0;
      if (!result.has_schema) result.warnings.push('Missing Schema');

      // 3. Internal Links (count)
      const internalLinks = $(`a[href^="/"], a[href^="${DOMAIN}"]`);
      result.internal_links = internalLinks.length;
      if (result.internal_links < 5) result.warnings.push('Low internal links (<5)');

      // 4. Length & Uniqueness
      const mainText = extractMainText($);
      const tokens = getTokens(mainText);
      result.word_count = tokens.size;
      
      if (result.word_count < 250) result.warnings.push('Thin content (<250 words)');

      // Uniqueness check against previously parsed pages
      let maxSim = 0;
      let similarUrl = '';
      
      for (const [prevUrl, prevTokens] of processedTokens) {
        const sim = jaccardSimilarity(tokens, prevTokens);
        if (sim > maxSim) {
          maxSim = sim;
          similarUrl = prevUrl;
        }
      }
      
      result.max_similarity = parseFloat((maxSim * 100).toFixed(1));
      if (maxSim > SIMILARITY_THRESHOLD) {
        result.similar_to = similarUrl;
        result.warnings.push(`High duplication (${result.max_similarity}%) with ${similarUrl}`);
      }
      
      processedTokens.push([url, tokens]);

    } catch (error) {
      result.warnings.push(`Fetch failed: ${error.message}`);
    }

    result.warnings = result.warnings.join(' | ');
    results.push(result);
    
    // Simple delay to avoid hammering the server
    await new Promise(r => setTimeout(r, 500)); 
  }

  // Write output
  const output = stringify(results, { header: true });
  fs.writeFileSync(OUTPUT_CSV, output);
  
  console.log(`\n✅ QA Complete! Results saved to ${OUTPUT_CSV}`);
  
  // Summary
  const thinPages = results.filter(r => r.word_count < 250).length;
  const missingSchema = results.filter(r => !r.has_schema).length;
  const missingCanonical = results.filter(r => !r.has_canonical).length;
  
  console.log(`\n📊 Summary:`);
  console.log(`- URLs Processed: ${results.length}`);
  console.log(`- Thin Pages: ${thinPages}`);
  console.log(`- Missing Schema: ${missingSchema}`);
  console.log(`- Missing Canonical: ${missingCanonical}`);
}

runQA();
