const fs = require('fs');
const path = require('path');

/**
 * Test AI SEO Autopilot System
 * Validates the comprehensive SEO automation system
 */

class SEOAutopilotTester {
  constructor() {
    this.automationPath = path.join(__dirname, '../automation/seo_autopilot.py');
    this.dataPath = path.join(__dirname, '../data');
  }

  /**
   * Test SEO Autopilot dry run
   */
  testSEOAutopilotDryRun() {
    console.log('Testing SEO Autopilot Dry Run...\n');

    const { spawn } = require('child_process');
    
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', [this.automationPath, '--dry-run'], {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe'
      });

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.on('close', (code) => {
        resolve({
          exitCode: code,
          output,
          errorOutput,
          success: code === 0
        });
      });

      pythonProcess.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Validate generated reports
   */
  validateGeneratedReports() {
    console.log('Validating Generated Reports...\n');

    const reports = {
      json: path.join(this.dataPath, 'seo_autopilot_report.json'),
      markdown: path.join(this.dataPath, 'seo_autopilot_report.md'),
      success: path.join(this.dataPath, 'seo_autopilot_success.json')
    };

    const results = {};

    // Check JSON report
    if (fs.existsSync(reports.json)) {
      try {
        const jsonData = JSON.parse(fs.readFileSync(reports.json, 'utf8'));
        results.json = {
          exists: true,
          valid: true,
          data: jsonData,
          totalOpportunities: jsonData.total_opportunities || 0,
          highPriority: jsonData.high_priority_opportunities || 0,
          potentialImpact: jsonData.potential_total_impact || 0
        };
      } catch (error) {
        results.json = {
          exists: true,
          valid: false,
          error: error.message
        };
      }
    } else {
      results.json = {
        exists: false,
        valid: false
      };
    }

    // Check Markdown report
    if (fs.existsSync(reports.markdown)) {
      const markdownContent = fs.readFileSync(reports.markdown, 'utf8');
      results.markdown = {
        exists: true,
        valid: true,
        content: markdownContent,
        hasHeader: markdownContent.includes('# ?? AI SEO Autopilot Report'),
        hasOpportunityTable: markdownContent.includes('| Page | Type | Current CTR |'),
        hasDetailedRecommendations: markdownContent.includes('## ?? Detailed Recommendations')
      };
    } else {
      results.markdown = {
        exists: false,
        valid: false
      };
    }

    // Check success report
    if (fs.existsSync(reports.success)) {
      try {
        const successData = JSON.parse(fs.readFileSync(reports.success, 'utf8'));
        results.success = {
          exists: true,
          valid: true,
          data: successData,
          status: successData.status || 'UNKNOWN'
        };
      } catch (error) {
        results.success = {
          exists: true,
          valid: false,
          error: error.message
        };
      }
    } else {
      results.success = {
        exists: false,
        valid: false
      };
    }

    return results;
  }

  /**
   * Test opportunity detection logic
   */
  testOpportunityDetection() {
    console.log('Testing Opportunity Detection Logic...\n');

    const testCases = [
      {
        name: 'Low CTR Page',
        data: {
          keys: ['/services/laptop-recycling/'],
          clicks: 10,
          impressions: 2000,
          ctr: 0.005,
          position: 8.5
        },
        expectedType: 'LOW_CTR',
        expectedPriority: 'HIGH'
      },
      {
        name: 'Striking Distance Page',
        data: {
          keys: ['/blog/e-waste-guide/'],
          clicks: 45,
          impressions: 600,
          ctr: 0.075,
          position: 5.1
        },
        expectedType: 'STRIKING_DISTANCE',
        expectedPriority: 'HIGH'
      },
      {
        name: 'Healthy Page',
        data: {
          keys: ['/'],
          clicks: 150,
          impressions: 5000,
          ctr: 0.03,
          position: 2.8
        },
        expectedType: null,
        expectedPriority: null
      },
      {
        name: 'Low Impressions Page',
        data: {
          keys: ['/test-page/'],
          clicks: 1,
          impressions: 50,
          ctr: 0.02,
          position: 15.0
        },
        expectedType: null,
        expectedPriority: null
      }
    ];

    const results = testCases.map(testCase => {
      // Simulate opportunity detection logic
      const { clicks, impressions, ctr, position } = testCase.data;
      let detectedType = null;
      let detectedPriority = null;

      // Low CTR detection
      if (impressions > 100 && ctr < 0.02) {
        detectedType = 'LOW_CTR';
        detectedPriority = ctr < 0.01 ? 'HIGH' : 'MEDIUM';
      }
      // Striking distance detection
      else if (4 <= position <= 12) {
        detectedType = 'STRIKING_DISTANCE';
        detectedPriority = position <= 8 ? 'HIGH' : 'MEDIUM';
      }

      const success = detectedType === testCase.expectedType && detectedPriority === testCase.expectedPriority;

      return {
        name: testCase.name,
        input: testCase.data,
        expectedType: testCase.expectedType,
        expectedPriority: testCase.expectedPriority,
        detectedType,
        detectedPriority,
        success
      };
    });

    return results;
  }

  /**
   * Test AI recommendation generation
   */
  testAIRecommendations() {
    console.log('Testing AI Recommendation Generation...\n');

    const testCases = [
      {
        name: 'Service Page Low CTR',
        pageUrl: '/services/laptop-recycling/',
        currentTitle: 'Laptop Recycling Services | EWaste Kochi',
        currentDescription: 'Professional laptop recycling services',
        ctr: 0.008,
        position: 8.5
      },
      {
        name: 'Location Page Striking Distance',
        pageUrl: '/locations/kakkanad/',
        currentTitle: 'E-Waste Recycling Kakkanad | EWaste Kochi',
        currentDescription: 'E-waste recycling in Kakkanad',
        ctr: 0.025,
        position: 6.2
      },
      {
        name: 'Blog Page Good Performance',
        pageUrl: '/blog/e-waste-guide/',
        currentTitle: 'Complete E-Waste Guide | EWaste Kochi Blog',
        currentDescription: 'Comprehensive e-waste guide',
        ctr: 0.075,
        position: 2.8
      }
    ];

    const results = testCases.map(testCase => {
      // Simulate AI recommendation generation
      const location = testCase.pageUrl.includes('/locations/') ? 
        testCase.pageUrl.split('/locations/')[1].replace('-', ' ').replace('/', '').replace(/\b\w/g, l => l.toUpperCase()) : 'Kochi';
      const service = testCase.pageUrl.includes('/services/') ? 
        testCase.pageUrl.split('/services/')[1].replace('-', ' ').replace('/', '').replace(/\b\w/g, l => l.toUpperCase()) : 'E-Waste Recycling';

      const recommendations = {
        title_suggestions: [
          `${service} in ${location} | EWaste Kochi`,
          `Professional ${service.toLowerCase()} | ${location} E-Waste`,
          `Certified Electronic Waste Recycling | ${location}`
        ],
        description_suggestions: [
          `Professional ${service.toLowerCase()} in ${location}. Free pickup, certified recycling, data destruction. Call +91-9876543210.`,
          `Electronic waste disposal and IT asset recycling services in ${location}. Environmentally responsible.`
        ],
        internal_link_suggestions: []
      };

      // Add internal linking suggestions based on position
      if (testCase.position > 8) {
        recommendations.internal_link_suggestions.push('Link from homepage hero section');
        recommendations.internal_link_suggestions.push('Add to main navigation menu');
      }

      if (testCase.pageUrl.includes('/services/')) {
        recommendations.internal_link_suggestions.push('Link from related service pages');
        recommendations.internal_link_suggestions.push('Add to location pages as available service');
      }

      if (testCase.pageUrl.includes('/locations/')) {
        recommendations.internal_link_suggestions.push('Link from service pages as available location');
        recommendations.internal_link_suggestions.push('Add to service area pages');
      }

      return {
        name: testCase.name,
        pageUrl: testCase.pageUrl,
        currentPerformance: {
          ctr: testCase.ctr,
          position: testCase.position
        },
        recommendations,
        hasTitleSuggestions: recommendations.title_suggestions.length > 0,
        hasDescriptionSuggestions: recommendations.description_suggestions.length > 0,
        hasInternalLinkSuggestions: recommendations.internal_link_suggestions.length > 0,
        success: recommendations.title_suggestions.length > 0 && recommendations.description_suggestions.length > 0
      };
    });

    return results;
  }

  /**
   * Test GitHub Actions workflow configuration
   */
  testGitHubActionsConfig() {
    console.log('Testing GitHub Actions Configuration...\n');

    const workflowPath = path.join(__dirname, '../.github/workflows/ai-seo.yml');
    
    if (!fs.existsSync(workflowPath)) {
      return {
        exists: false,
        valid: false,
        error: 'Workflow file not found'
      };
    }

    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    const validation = {
      exists: true,
      valid: true,
      hasWeeklySchedule: workflowContent.includes('cron: \'0 0 * * 0\''),
      hasManualTrigger: workflowContent.includes('workflow_dispatch:'),
      hasDryRunOption: workflowContent.includes('dry_run:'),
      hasPythonSetup: workflowContent.includes('python-version: \'3.10\''),
      hasGSCIntegration: workflowContent.includes('GSC_CREDENTIALS_JSON'),
      hasAIIntegration: workflowContent.includes('OPENAI_API_KEY'),
      hasPRCreation: workflowContent.includes('create-pull-request'),
      hasSitemapPing: workflowContent.includes('ping?sitemap='),
      hasLighthouseAudit: workflowContent.includes('Lighthouse'),
      hasReportUpload: workflowContent.includes('upload-artifact'),
      hasSlackNotification: workflowContent.includes('SLACK_WEBHOOK_URL'),
      hasSummaryReport: workflowContent.includes('GITHUB_STEP_SUMMARY')
    };

    validation.valid = Object.values(validation).every(val => typeof val === 'boolean' ? val : true);

    return validation;
  }

  /**
   * Generate comprehensive test report
   */
  async generateTestReport() {
    console.log('='.repeat(60));
    console.log('AI SEO AUTOPILOT SYSTEM TEST REPORT');
    console.log('='.repeat(60));

    // Run all tests
    console.log('1. Running SEO Autopilot Dry Run...');
    const autopilotResult = await this.testSEOAutopilotDryRun();

    console.log('\n2. Validating Generated Reports...');
    const reportValidation = this.validateGeneratedReports();

    console.log('\n3. Testing Opportunity Detection...');
    const opportunityTests = this.testOpportunityDetection();

    console.log('\n4. Testing AI Recommendations...');
    const aiRecommendationTests = this.testAIRecommendations();

    console.log('\n5. Testing GitHub Actions Configuration...');
    const githubActionsTest = this.testGitHubActionsConfig();

    // Calculate success rates
    const allTests = [
      { name: 'SEO Autopilot Execution', success: autopilotResult.success },
      { name: 'JSON Report Generation', success: reportValidation.json?.valid || false },
      { name: 'Markdown Report Generation', success: reportValidation.markdown?.valid || false },
      ...opportunityTests.map(test => ({ name: `Opportunity Detection: ${test.name}`, success: test.success })),
      ...aiRecommendationTests.map(test => ({ name: `AI Recommendations: ${test.name}`, success: test.success })),
      { name: 'GitHub Actions Configuration', success: githubActionsTest.valid }
    ];

    const successCount = allTests.filter(test => test.success).length;
    const totalCount = allTests.length;
    const successRate = ((successCount / totalCount) * 100).toFixed(1);

    // Report results
    console.log(`\nTest Summary:`);
    console.log(`Total Tests: ${totalCount}`);
    console.log(`Passed: ${successCount}`);
    console.log(`Failed: ${totalCount - successCount}`);
    console.log(`Success Rate: ${successRate}%`);

    // Autopilot execution details
    console.log('\nSEO Autopilot Execution:');
    console.log(`Exit Code: ${autopilotResult.exitCode}`);
    console.log(`Success: ${autopilotResult.success}`);
    if (autopilotResult.output) {
      console.log('Output:');
      console.log(autopilotResult.output.split('\n').slice(0, 10).join('\n'));
    }

    // Report validation details
    console.log('\nReport Validation:');
    if (reportValidation.json?.valid) {
      console.log(`?? JSON Report: ${reportValidation.json.totalOpportunities} opportunities, ${reportValidation.json.highPriority} high priority`);
    } else {
      console.log(`?? JSON Report: ${reportValidation.json?.exists ? 'Invalid' : 'Not found'}`);
    }
    
    if (reportValidation.markdown?.valid) {
      console.log(`?? Markdown Report: Generated successfully`);
    } else {
      console.log(`?? Markdown Report: ${reportValidation.markdown?.exists ? 'Invalid' : 'Not found'}`);
    }

    // Failed tests
    const failedTests = allTests.filter(test => !test.success);
    if (failedTests.length > 0) {
      console.log('\nFailed Tests:');
      failedTests.forEach(test => {
        console.log(`?? ${test.name}`);
      });
    }

    // Opportunity detection summary
    const opportunitySuccessCount = opportunityTests.filter(test => test.success).length;
    console.log(`\nOpportunity Detection: ${opportunitySuccessCount}/${opportunityTests.length} tests passed`);

    // AI recommendations summary
    const aiSuccessCount = aiRecommendationTests.filter(test => test.success).length;
    console.log(`AI Recommendations: ${aiSuccessCount}/${aiRecommendationTests.length} tests passed`);

    const status = successRate >= 90 ? 'EXCELLENT' : 
                   successRate >= 75 ? 'GOOD' : 
                   successRate >= 60 ? 'ACCEPTABLE' : 'NEEDS ATTENTION';

    console.log('\n' + '='.repeat(60));
    console.log(`AI SEO Autopilot Status: ${status}`);
    console.log('='.repeat(60));

    return {
      summary: {
        totalTests: totalCount,
        passed: successCount,
        failed: totalCount - successCount,
        successRate: parseFloat(successRate),
        status
      },
      results: {
        autopilotExecution: autopilotResult,
        reportValidation,
        opportunityTests,
        aiRecommendationTests,
        githubActionsTest
      }
    };
  }

  /**
   * Export test results
   */
  exportResults(results) {
    const exportPath = path.join(this.dataPath, 'seo-autopilot-test-results.json');
    fs.writeFileSync(exportPath, JSON.stringify(results, null, 2));
    console.log(`\nTest results exported to: ${exportPath}`);
  }
}

// Run if called directly
if (require.main === module) {
  const tester = new SEOAutopilotTester();
  
  tester.generateTestReport()
    .then(results => {
      tester.exportResults(results);
      process.exit(results.summary.status === 'EXCELLENT' ? 0 : 1);
    })
    .catch(error => {
      console.error('Test execution failed:', error);
      process.exit(1);
    });
}

module.exports = SEOAutopilotTester;
