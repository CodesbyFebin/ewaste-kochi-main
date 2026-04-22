const fs = require('fs');
const path = require('path');

/**
 * Test Redirect System
 * Validates the comprehensive Vercel redirect system
 */

class RedirectSystemTester {
  constructor() {
    this.vercelConfig = this.loadVercelConfig();
    this.testCases = this.generateTestCases();
  }

  /**
   * Load Vercel configuration
   */
  loadVercelConfig() {
    const vercelPath = path.join(__dirname, '../vercel.json');
    return JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  }

  /**
   * Generate comprehensive test cases
   */
  generateTestCases() {
    return [
      // WWW redirect tests
      {
        type: 'www-redirect',
        input: 'https://ewastekochi.com/',
        expected: 'https://www.ewastekochi.com/',
        description: 'Force www subdomain'
      },
      {
        type: 'www-redirect',
        input: 'https://ewastekochi.com/blog/',
        expected: 'https://www.ewastekochi.com/blog/',
        description: 'Force www with path'
      },

      // HTML extension removal tests
      {
        type: 'html-removal',
        input: 'https://www.ewastekochi.com/blog/data-destruction-kochi.html',
        expected: 'https://www.ewastekochi.com/blog/data-destruction-kochi',
        description: 'Remove .html extension'
      },
      {
        type: 'html-removal',
        input: 'https://www.ewastekochi.com/locations/ewaste-682002.html',
        expected: 'https://www.ewastekochi.com/locations/ewaste-682002',
        description: 'Remove .html from pincode URL'
      },

      // Pincode to location redirect tests
      {
        type: 'pincode-redirect',
        input: 'https://www.ewastekochi.com/locations/ewaste-682002',
        expected: 'https://www.ewastekochi.com/locations/ernakulam/',
        description: 'Pincode 682002 to Ernakulam'
      },
      {
        type: 'pincode-redirect',
        input: 'https://www.ewastekochi.com/locations/ewaste-682008',
        expected: 'https://www.ewastekochi.com/locations/aluva/',
        description: 'Pincode 682008 to Aluva'
      },
      {
        type: 'pincode-redirect',
        input: 'https://www.ewastekochi.com/locations/ewaste-682016',
        expected: 'https://www.ewastekochi.com/locations/kakkanad/',
        description: 'Pincode 682016 to Kakkanad'
      },

      // Service redirect tests
      {
        type: 'service-redirect',
        input: 'https://www.ewastekochi.com/ml/buyback/laptops',
        expected: 'https://www.ewastekochi.com/sell-electronics-kochi/',
        description: 'ML buyback to sell electronics'
      },
      {
        type: 'service-redirect',
        input: 'https://www.ewastekochi.com/security/data-destruction',
        expected: 'https://www.ewastekochi.com/services/data-destruction-kochi/',
        description: 'Security to data destruction service'
      },

      // Blog redirect tests
      {
        type: 'blog-redirect',
        input: 'https://www.ewastekochi.com/blog/corporate-e-waste-policy-template-india.html',
        expected: 'https://www.ewastekochi.com/blog/ewaste-laws-kerala-2026/',
        description: 'Old blog URL to new blog URL'
      },

      // Location name redirect tests
      {
        type: 'location-redirect',
        input: 'https://www.ewastekochi.com/locations/ewaste-kakkanad.html',
        expected: 'https://www.ewastekochi.com/locations/kakkanad/',
        description: 'Location name with .html to clean URL'
      },

      // Complex multi-step tests
      {
        type: 'complex-redirect',
        input: 'https://ewastekochi.com/locations/ewaste-682002.html',
        expected: 'https://www.ewastekochi.com/locations/ernakulam/',
        description: 'WWW + HTML removal + Pincode redirect'
      }
    ];
  }

  /**
   * Test redirect pattern matching
   */
  testPatternMatching() {
    console.log('Testing Redirect Pattern Matching...\n');
    
    const results = {
      passed: 0,
      failed: 0,
      details: []
    };

    this.testCases.forEach(testCase => {
      const matched = this.findMatchingRedirect(testCase.input);
      const success = matched && matched.destination === testCase.expected;
      
      if (success) {
        results.passed++;
      } else {
        results.failed++;
      }

      results.details.push({
        type: testCase.type,
        input: testCase.input,
        expected: testCase.expected,
        actual: matched ? matched.destination : 'No match',
        success,
        description: testCase.description
      });
    });

    return results;
  }

  /**
   * Find matching redirect rule
   */
  findMatchingRedirect(url) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const hostname = urlObj.hostname;

    for (const redirect of this.vercelConfig.redirects) {
      if (this.matchesRedirect(redirect, pathname, hostname)) {
        return redirect;
      }
    }

    return null;
  }

  /**
   * Check if redirect rule matches URL
   */
  matchesRedirect(redirect, pathname, hostname) {
    const source = redirect.source;
    
    // Check host conditions
    if (redirect.has) {
      const hostMatch = redirect.has.find(condition => condition.type === 'host');
      if (hostMatch && hostname !== hostMatch.value) {
        return false;
      }
    }

    // Simple pattern matching
    if (source.includes(':')) {
      // Parameterized pattern
      const pattern = source.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    } else if (source.includes('*')) {
      // Wildcard pattern
      const pattern = source.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    } else {
      // Exact match
      return pathname === source;
    }
  }

  /**
   * Analyze redirect configuration
   */
  analyzeConfiguration() {
    const redirects = this.vercelConfig.redirects;
    const analysis = {
      totalRules: redirects.length,
      categories: {
        www: 0,
        html: 0,
        pincode: 0,
        service: 0,
        blog: 0,
        location: 0,
        other: 0
      },
      destinations: {},
      sources: {}
    };

    redirects.forEach(redirect => {
      // Categorize redirects
      if (redirect.source === '/(.*)' && redirect.has) {
        analysis.categories.www++;
      } else if (redirect.source.includes('.html')) {
        analysis.categories.html++;
      } else if (redirect.source.includes('ewaste-68')) {
        analysis.categories.pincode++;
      } else if (redirect.source.includes('/ml/') || redirect.source.includes('/buyback/') || redirect.source.includes('/comparisons/') || redirect.source.includes('/security/')) {
        analysis.categories.service++;
      } else if (redirect.source.includes('/blog/')) {
        analysis.categories.blog++;
      } else if (redirect.source.includes('/locations/')) {
        analysis.categories.location++;
      } else {
        analysis.categories.other++;
      }

      // Count destinations
      const dest = redirect.destination;
      analysis.destinations[dest] = (analysis.destinations[dest] || 0) + 1;

      // Count sources
      const src = redirect.source;
      analysis.sources[src] = (analysis.sources[src] || 0) + 1;
    });

    return analysis;
  }

  /**
   * Generate redirect report
   */
  generateReport() {
    console.log('='.repeat(60));
    console.log('VERCEL REDIRECT SYSTEM ANALYSIS REPORT');
    console.log('='.repeat(60));

    // Configuration analysis
    const analysis = this.analyzeConfiguration();
    console.log('\nConfiguration Summary:');
    console.log(`Total Redirect Rules: ${analysis.totalRules}`);
    console.log(`WWW Forcing Rules: ${analysis.categories.www}`);
    console.log(`HTML Extension Removal: ${analysis.categories.html}`);
    console.log(`Pincode Redirects: ${analysis.categories.pincode}`);
    console.log(`Service Redirects: ${analysis.categories.service}`);
    console.log(`Blog Redirects: ${analysis.categories.blog}`);
    console.log(`Location Redirects: ${analysis.categories.location}`);
    console.log(`Other Redirects: ${analysis.categories.other}`);

    // Test results
    const testResults = this.testPatternMatching();
    console.log('\nTest Results:');
    console.log(`Tests Passed: ${testResults.passed}`);
    console.log(`Tests Failed: ${testResults.failed}`);
    console.log(`Success Rate: ${((testResults.passed / this.testCases.length) * 100).toFixed(1)}%`);

    // Failed tests details
    if (testResults.failed > 0) {
      console.log('\nFailed Tests:');
      testResults.details
        .filter(test => !test.success)
        .forEach(test => {
          console.log(`  ${test.description}`);
          console.log(`    Input: ${test.input}`);
          console.log(`    Expected: ${test.expected}`);
          console.log(`    Actual: ${test.actual}`);
        });
    }

    // Top destinations
    console.log('\nTop 10 Destinations:');
    const topDestinations = Object.entries(analysis.destinations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    
    topDestinations.forEach(([dest, count]) => {
      console.log(`  ${count}x ${dest}`);
    });

    console.log('\nRedirect System Status: ' + (testResults.failed === 0 ? 'OPTIMAL' : 'NEEDS ATTENTION'));
    console.log('='.repeat(60));

    return {
      analysis,
      testResults,
      status: testResults.failed === 0 ? 'OPTIMAL' : 'NEEDS ATTENTION'
    };
  }

  /**
   * Export redirect documentation
   */
  exportDocumentation() {
    const docs = {
      title: 'EWaste Kochi Redirect System Documentation',
      lastUpdated: new Date().toISOString(),
      configuration: this.analyzeConfiguration(),
      testCases: this.testCases,
      bestPractices: [
        'Always force www subdomain for consistency',
        'Remove .html extensions for cleaner URLs',
        'Use permanent (301) redirects for SEO',
        'Group similar redirects together',
        'Test redirects before deployment',
        'Monitor 404 errors and add missing redirects'
      ]
    };

    const docsPath = path.join(__dirname, '../data/redirect-documentation.json');
    fs.writeFileSync(docsPath, JSON.stringify(docs, null, 2));
    console.log(`Redirect documentation exported to: ${docsPath}`);
  }
}

// Run if called directly
if (require.main === module) {
  const tester = new RedirectSystemTester();
  const report = tester.generateReport();
  tester.exportDocumentation();
  
  process.exit(report.status === 'OPTIMAL' ? 0 : 1);
}

module.exports = RedirectSystemTester;
