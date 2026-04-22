const fs = require('fs');
const path = require('path');

/**
 * Validate Redirect System
 * Real-world validation of Vercel redirect patterns
 */

class RedirectSystemValidator {
  constructor() {
    this.vercelConfig = this.loadVercelConfig();
    this.testResults = [];
  }

  /**
   * Load Vercel configuration
   */
  loadVercelConfig() {
    const vercelPath = path.join(__dirname, '../vercel.json');
    return JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  }

  /**
   * Test specific redirect scenarios
   */
  testRedirectScenarios() {
    console.log('Testing Real-World Redirect Scenarios...\n');

    const scenarios = [
      {
        name: 'WWW Forcing',
        url: 'https://ewastekochi.com/',
        expectedRedirect: 'https://www.ewastekochi.com/',
        description: 'Non-www domain should redirect to www'
      },
      {
        name: 'WWW Forcing with Path',
        url: 'https://ewastekochi.com/blog/',
        expectedRedirect: 'https://www.ewastekochi.com/blog/',
        description: 'Non-www domain with path should redirect to www'
      },
      {
        name: 'HTML Extension Removal',
        url: 'https://www.ewastekochi.com/blog/data-destruction-kochi.html',
        expectedRedirect: 'https://www.ewastekochi.com/blog/data-destruction-kochi',
        description: 'HTML extension should be removed'
      },
      {
        name: 'Pincode Redirect',
        url: 'https://www.ewastekochi.com/locations/ewaste-682002',
        expectedRedirect: 'https://www.ewastekochi.com/locations/ernakulam/',
        description: 'Pincode 682002 should redirect to Ernakulam'
      },
      {
        name: 'Complex Multi-Step',
        url: 'https://ewastekochi.com/locations/ewaste-682002.html',
        expectedRedirect: 'https://www.ewastekochi.com/locations/ernakulam/',
        description: 'WWW + HTML removal + Pincode redirect'
      }
    ];

    scenarios.forEach(scenario => {
      const result = this.testScenario(scenario);
      this.testResults.push(result);
    });

    return this.testResults;
  }

  /**
   * Test individual scenario
   */
  testScenario(scenario) {
    const url = new URL(scenario.url);
    const pathname = url.pathname;
    const hostname = url.hostname;

    // Find matching redirect
    const redirect = this.findMatchingRedirect(pathname, hostname);
    
    // Apply redirect transformation
    let finalUrl = scenario.url;
    if (redirect) {
      finalUrl = this.applyRedirect(scenario.url, redirect);
    }

    return {
      name: scenario.name,
      description: scenario.description,
      input: scenario.url,
      expected: scenario.expectedRedirect,
      actual: finalUrl,
      success: finalUrl === scenario.expectedRedirect,
      redirect: redirect
    };
  }

  /**
   * Find matching redirect rule
   */
  findMatchingRedirect(pathname, hostname) {
    const redirects = this.vercelConfig.redirects;

    for (const redirect of redirects) {
      if (this.matchesRedirect(redirect, pathname, hostname)) {
        return redirect;
      }
    }

    return null;
  }

  /**
   * Check if redirect matches URL
   */
  matchesRedirect(redirect, pathname, hostname) {
    const source = redirect.source;

    // Check host conditions first
    if (redirect.has) {
      const hostCondition = redirect.has.find(h => h.type === 'host');
      if (hostCondition && hostname !== hostCondition.value) {
        return false;
      }
    }

    // Pattern matching
    if (source.includes(':')) {
      // Parameterized pattern
      const regex = new RegExp('^' + source.replace(/:[^/]+/g, '([^/]+)') + '$');
      return regex.test(pathname);
    } else if (source.includes('*')) {
      // Wildcard pattern
      const regex = new RegExp('^' + source.replace(/\*/g, '.*') + '$');
      return regex.test(pathname);
    } else if (source.includes('\\.') && source.includes('.html')) {
      // Regex pattern for HTML
      const regex = new RegExp('^' + source + '$');
      return regex.test(pathname);
    } else {
      // Exact match
      return pathname === source;
    }
  }

  /**
   * Apply redirect transformation
   */
  applyRedirect(originalUrl, redirect) {
    const url = new URL(originalUrl);
    const pathname = url.pathname;

    if (redirect.has && redirect.has.some(h => h.type === 'host')) {
      // WWW redirect
      const newPath = pathname.replace(redirect.source, redirect.destination);
      return `https://www.ewastekochi.com${newPath}`;
    } else if (redirect.source.includes('\\.') && redirect.source.includes('.html')) {
      // HTML removal
      const regex = new RegExp(redirect.source);
      const newPath = pathname.replace(regex, redirect.destination);
      return `${url.protocol}//${url.hostname}${newPath}`;
    } else {
      // Regular redirect
      const newPath = pathname.replace(redirect.source, redirect.destination);
      return `${url.protocol}//${url.hostname}${newPath}`;
    }
  }

  /**
   * Analyze redirect coverage
   */
  analyzeCoverage() {
    const redirects = this.vercelConfig.redirects;
    
    const coverage = {
      total: redirects.length,
      categories: {
        www: 0,
        html: 0,
        pincode: 0,
        service: 0,
        location: 0,
        blog: 0,
        other: 0
      },
      patterns: {
        exact: 0,
        wildcard: 0,
        parameterized: 0,
        regex: 0
      }
    };

    redirects.forEach(redirect => {
      // Categorize by type
      if (redirect.source === '/(.*)' && redirect.has) {
        coverage.categories.www++;
      } else if (redirect.source.includes('\\.') && redirect.source.includes('.html')) {
        coverage.categories.html++;
      } else if (redirect.source.includes('ewaste-68')) {
        coverage.categories.pincode++;
      } else if (redirect.source.includes('/ml/') || redirect.source.includes('/buyback/') || redirect.source.includes('/comparisons/')) {
        coverage.categories.service++;
      } else if (redirect.source.includes('/blog/')) {
        coverage.categories.blog++;
      } else if (redirect.source.includes('/locations/')) {
        coverage.categories.location++;
      } else {
        coverage.categories.other++;
      }

      // Categorize by pattern type
      if (redirect.source.includes(':')) {
        coverage.patterns.parameterized++;
      } else if (redirect.source.includes('*')) {
        coverage.patterns.wildcard++;
      } else if (redirect.source.includes('\\.')) {
        coverage.patterns.regex++;
      } else {
        coverage.patterns.exact++;
      }
    });

    return coverage;
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('='.repeat(60));
    console.log('REDIRECT SYSTEM VALIDATION REPORT');
    console.log('='.repeat(60));

    // Coverage analysis
    const coverage = this.analyzeCoverage();
    console.log('\nCoverage Analysis:');
    console.log(`Total Redirect Rules: ${coverage.total}`);
    console.log(`WWW Forcing: ${coverage.categories.www}`);
    console.log(`HTML Removal: ${coverage.categories.html}`);
    console.log(`Pincode Redirects: ${coverage.categories.pincode}`);
    console.log(`Service Redirects: ${coverage.categories.service}`);
    console.log(`Blog Redirects: ${coverage.categories.blog}`);
    console.log(`Location Redirects: ${coverage.categories.location}`);
    console.log(`Other Redirects: ${coverage.categories.other}`);

    console.log('\nPattern Types:');
    console.log(`Exact Matches: ${coverage.patterns.exact}`);
    console.log(`Wildcard Patterns: ${coverage.patterns.wildcard}`);
    console.log(`Parameterized: ${coverage.patterns.parameterized}`);
    console.log(`Regex Patterns: ${coverage.patterns.regex}`);

    // Test scenarios
    const testResults = this.testRedirectScenarios();
    
    console.log('\nScenario Testing:');
    const passed = testResults.filter(r => r.success).length;
    const failed = testResults.filter(r => !r.success).length;
    
    console.log(`Tests Passed: ${passed}/${testResults.length}`);
    console.log(`Success Rate: ${((passed / testResults.length) * 100).toFixed(1)}%`);

    // Failed tests
    if (failed > 0) {
      console.log('\nFailed Tests:');
      testResults.filter(r => !r.success).forEach(test => {
        console.log(`\n❌ ${test.name}: ${test.description}`);
        console.log(`   Input: ${test.input}`);
        console.log(`   Expected: ${test.expected}`);
        console.log(`   Actual: ${test.actual}`);
        if (test.redirect) {
          console.log(`   Matched Rule: ${test.redirect.source}`);
        } else {
          console.log(`   Matched Rule: None`);
        }
      });
    }

    // Passed tests
    if (passed > 0) {
      console.log('\nPassed Tests:');
      testResults.filter(r => r.success).forEach(test => {
        console.log(`\n✅ ${test.name}: ${test.description}`);
        console.log(`   Input: ${test.input}`);
        console.log(`   Output: ${test.actual}`);
      });
    }

    // Overall status
    const status = failed === 0 ? 'OPTIMAL' : passed > testResults.length / 2 ? 'GOOD' : 'NEEDS ATTENTION';
    
    console.log('\n' + '='.repeat(60));
    console.log(`Redirect System Status: ${status}`);
    console.log('='.repeat(60));

    return {
      coverage,
      testResults,
      status
    };
  }

  /**
   * Export validation results
   */
  exportResults(results) {
    const exportPath = path.join(__dirname, '../data/redirect-validation.json');
    fs.writeFileSync(exportPath, JSON.stringify(results, null, 2));
    console.log(`\nValidation results exported to: ${exportPath}`);
  }
}

// Run if called directly
if (require.main === module) {
  const validator = new RedirectSystemValidator();
  const results = validator.generateReport();
  validator.exportResults(results);
  
  process.exit(results.status === 'OPTIMAL' ? 0 : 1);
}

module.exports = RedirectSystemValidator;
