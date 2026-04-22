const fs = require('fs');
const path = require('path');

/**
 * Test Metadata System
 * Validates the comprehensive SEO metadata system
 */

class MetadataSystemTester {
  constructor() {
    this.metaPath = path.join(__dirname, '../src/utils/meta.js');
    this.meta = this.loadMetadataSystem();
  }

  /**
   * Load metadata system
   */
  loadMetadataSystem() {
    delete require.cache[require.resolve(this.metaPath)];
    return require(this.metaPath);
  }

  /**
   * Test metadata presets
   */
  testMetadataPresets() {
    console.log('Testing Metadata Presets...\n');

    const tests = [
      {
        name: 'Homepage Preset',
        preset: 'homepage',
        expectedTitle: 'EWaste Recycling Kochi | Electronic Waste Disposal Services',
        expectedKeywords: 'e-waste recycling Kochi, electronic waste disposal, IT asset disposition, data destruction, laptop recycling, battery recycling'
      },
      {
        name: 'Service Preset',
        preset: 'service',
        args: ['Laptop Recycling', 'Professional laptop recycling services in Kochi, Kerala. Certified recycling and data destruction.'],
        expectedKeywords: 'laptop recycling kochi, laptop recycling services, e-waste laptop recycling, electronic waste laptop recycling'
      },
      {
        name: 'Location Preset',
        preset: 'location',
        args: ['Kakkanad', 'E-waste recycling and pickup services in Kakkanad, Kochi. Free electronic waste disposal and IT asset recycling.'],
        expectedKeywords: 'e-waste kakkanad, recycling kakkanad, electronic waste kakkanad, kakkanad e-waste pickup'
      },
      {
        name: 'Blog Preset',
        preset: 'blog',
        args: ['E-Waste Guide 2026', 'Complete guide to e-waste recycling in Kerala', 'e-waste-guide-2026', '2026-04-01'],
        expectedKeywords: 'e-waste blog, electronic waste guide, recycling tips, IT disposal, data security'
      },
      {
        name: 'Contact Preset',
        preset: 'contact',
        expectedKeywords: 'contact e-waste Kochi, electronic waste contact, recycling services contact, IT disposal contact'
      },
      {
        name: 'FAQ Preset',
        preset: 'faq',
        args: ['Common Recycling Questions', 'Frequently asked questions about e-waste recycling', ['What is e-waste?', 'How to dispose electronics?']],
        expectedKeywords: 'e-waste FAQ, recycling questions, electronic waste guide, IT disposal FAQ'
      }
    ];

    const results = tests.map(test => {
      try {
        let metadata;
        if (test.preset === 'service') {
          metadata = this.meta.metadataPresets.service(...test.args);
        } else if (test.preset === 'location') {
          metadata = this.meta.metadataPresets.location(...test.args);
        } else if (test.preset === 'blog') {
          metadata = this.meta.metadataPresets.blog(...test.args);
        } else if (test.preset === 'faq') {
          metadata = this.meta.metadataPresets.faq(...test.args);
        } else {
          metadata = this.meta.metadataPresets[test.preset]();
        }

        return {
          name: test.name,
          success: true,
          result: metadata,
          expectedTitle: test.expectedTitle,
          expectedKeywords: test.expectedKeywords,
          actualTitle: metadata.title,
          actualKeywords: metadata.keywords
        };
      } catch (error) {
        return {
          name: test.name,
          success: false,
          error: error.message
        };
      }
    });

    return results;
  }

  /**
   * Test title truncation
   */
  testTitleTruncation() {
    console.log('Testing Title Truncation...\n');

    const tests = [
      {
        name: 'Long Title',
        title: 'This is a very long title that should be truncated exactly at sixty characters which is the maximum allowed by Google search results',
        expectedLength: 60
      },
      {
        name: 'Short Title',
        title: 'Short title',
        expectedLength: 15
      },
      {
        name: 'Exact Limit Title',
        title: 'This title is exactly sixty characters long and should not be truncated',
        expectedLength: 60
      }
    ];

    return tests.map(test => {
      const truncated = this.meta.metadataUtils.truncate(test.title, 60);
      const actualLength = truncated.length;
      const wasTruncated = test.title.length > 60 && truncated.endsWith('...');

      return {
        name: test.name,
        inputLength: test.title.length,
        actualLength,
        expectedLength: test.expectedLength,
        success: actualLength <= 60,
        wasTruncated,
        truncated
      };
    });
  }

  /**
   * Test description truncation
   */
  testDescriptionTruncation() {
    console.log('Testing Description Truncation...\n');

    const tests = [
      {
        name: 'Long Description',
        description: 'This is a very long description that exceeds the maximum length of one hundred fifty five characters and should be properly truncated with an ellipsis to prevent Google search result truncation issues',
        expectedLength: 155
      },
      {
        name: 'Short Description',
        description: 'Short description',
        expectedLength: 17
      },
      {
        name: 'Exact Limit Description',
        description: 'This description is exactly one hundred fifty five characters long and should not be truncated at all when processed by the metadata system',
        expectedLength: 155
      }
    ];

    return tests.map(test => {
      const truncated = this.meta.metadataUtils.truncate(test.description, 155);
      const actualLength = truncated.length;
      const wasTruncated = test.description.length > 155 && truncated.endsWith('...');

      return {
        name: test.name,
        inputLength: test.description.length,
        actualLength,
        expectedLength: test.expectedLength,
        success: actualLength <= 155,
        wasTruncated,
        truncated
      };
    });
  }

  /**
   * Test canonical URL building
   */
  testCanonicalURLs() {
    console.log('Testing Canonical URL Building...\n');

    const tests = [
      {
        name: 'Root Path',
        path: '/',
        expected: 'https://ewastekochi.com/'
      },
      {
        name: 'Service Path',
        path: '/services/laptop-recycling',
        expected: 'https://ewastekochi.com/services/laptop-recycling/'
      },
      {
        name: 'Blog Path',
        path: '/blog/e-waste-guide',
        expected: 'https://ewastekochi.com/blog/e-waste-guide/'
      },
      {
        name: 'Location Path',
        path: '/locations/kakkanad',
        expected: 'https://ewastekochi.com/locations/kakkanad/'
      },
      {
        name: 'Absolute URL',
        path: 'https://ewastekochi.com/about',
        expected: 'https://ewastekochi.com/about/'
      },
      {
        name: 'Uppercase Path',
        path: '/BLOG/Test-Post',
        expected: 'https://ewastekochi.com/blog/test-post/'
      },
      {
        name: 'Multiple Slashes',
        path: '//services//laptop-recycling//',
        expected: 'https://ewastekochi.com/services/laptop-recycling/'
      }
    ];

    return tests.map(test => {
      const canonical = this.meta.metadataUtils.buildCanonical(test.path);
      
      return {
        name: test.name,
        input: test.path,
        expected: test.expected,
        actual: canonical,
        success: canonical === test.expected
      };
    });
  }

  /**
   * Test structured data generation
   */
  testStructuredData() {
    console.log('Testing Structured Data Generation...\n');

    const tests = [
      {
        name: 'LocalBusiness Schema',
        pageType: 'LocalBusiness',
        data: {
          title: 'EWaste Kochi',
          description: 'E-waste recycling services',
          url: 'https://ewastekochi.com'
        },
        expectedType: 'LocalBusiness'
      },
      {
        name: 'Article Schema',
        pageType: 'Article',
        data: {
          title: 'E-Waste Guide',
          description: 'Complete e-waste guide',
          url: 'https://ewastekochi.com/blog/e-waste-guide',
          publishedTime: '2026-04-01',
          image: 'https://ewastekochi.com/img/blog-hero.jpg'
        },
        expectedType: 'Article'
      },
      {
        name: 'Service Schema',
        pageType: 'Service',
        data: {
          title: 'Laptop Recycling',
          description: 'Professional laptop recycling',
          url: 'https://ewastekochi.com/services/laptop-recycling'
        },
        expectedType: 'Service'
      },
      {
        name: 'FAQ Schema',
        pageType: 'FAQPage',
        data: {
          faqItems: [
            {
              question: 'What is e-waste?',
              answer: 'Electronic waste that needs recycling'
            }
          ]
        },
        expectedType: 'FAQPage'
      }
    ];

    return tests.map(test => {
      try {
        const structuredData = this.meta.metadataUtils.generateStructuredData(test.pageType, test.data);
        
        return {
          name: test.name,
          success: true,
          result: structuredData,
          expectedType: test.expectedType,
          actualType: structuredData['@type'],
          hasContext: !!structuredData['@context'],
          hasRequiredFields: this.validateSchemaFields(test.pageType, structuredData)
        };
      } catch (error) {
        return {
          name: test.name,
          success: false,
          error: error.message
        };
      }
    });
  }

  /**
   * Validate schema has required fields
   */
  validateSchemaFields(pageType, schema) {
    const requiredFields = {
      LocalBusiness: ['name', 'description', 'url', 'address', 'telephone'],
      Article: ['headline', 'description', 'author', 'publisher', 'datePublished'],
      Service: ['name', 'description', 'provider'],
      FAQPage: ['mainEntity'],
      WebPage: ['name', 'description', 'url']
    };

    const fields = requiredFields[pageType] || [];
    return fields.every(field => {
      const value = schema[field];
      return value !== undefined && value !== null && value !== '';
    });
  }

  /**
   * Test Open Graph generation
   */
  testOpenGraph() {
    console.log('Testing Open Graph Generation...\n');

    const testData = {
      title: 'E-Waste Recycling Kochi',
      description: 'Professional e-waste recycling services',
      image: '/img/blog-hero.jpg',
      url: 'https://ewastekochi.com/services/laptop-recycling/'
    };

    const openGraph = this.meta.metadataUtils.generateOpenGraph(
      testData.title,
      testData.description,
      testData.image,
      testData.url
    );

    const expectedFields = [
      'og:title', 'og:description', 'og:image', 'og:url',
      'og:type', 'og:locale', 'og:site_name',
      'og:image:width', 'og:image:height', 'og:image:alt'
    ];

    const actualFields = Object.keys(openGraph);
    const hasAllFields = expectedFields.every(field => actualFields.includes(field));

    return {
      name: 'Open Graph Generation',
      success: true,
      result: openGraph,
      expectedFields,
      actualFields,
      hasAllFields,
      missingFields: expectedFields.filter(field => !actualFields.includes(field))
    };
  }

  /**
   * Test Twitter Card generation
   */
  testTwitterCard() {
    console.log('Testing Twitter Card Generation...\n');

    const testData = {
      title: 'E-Waste Recycling Kochi',
      description: 'Professional e-waste recycling services',
      image: '/img/blog-hero.jpg'
    };

    const twitterCard = this.meta.metadataUtils.generateTwitterCard(
      testData.title,
      testData.description,
      testData.image
    );

    const expectedFields = [
      'twitter:card', 'twitter:title', 'twitter:description',
      'twitter:image', 'twitter:site', 'twitter:creator'
    ];

    const actualFields = Object.keys(twitterCard);
    const hasAllFields = expectedFields.every(field => actualFields.includes(field));

    return {
      name: 'Twitter Card Generation',
      success: true,
      result: twitterCard,
      expectedFields,
      actualFields,
      hasAllFields,
      missingFields: expectedFields.filter(field => !actualFields.includes(field))
    };
  }

  /**
   * Test organization data consistency
   */
  testOrganizationData() {
    console.log('Testing Organization Data Consistency...\n');

    const orgData = this.meta.metadataUtils.organizationData;
    
    const requiredFields = [
      'name', 'description', 'url', 'logo', 'contactPoint',
      'address', 'geo', 'openingHours'
    ];

    const actualFields = Object.keys(orgData);
    const hasAllFields = requiredFields.every(field => actualFields.includes(field));

    // Validate nested structure
    const hasValidContactPoint = orgData.contactPoint && 
      orgData.contactPoint.telephone && 
      orgData.contactPoint.contactType;

    const hasValidAddress = orgData.address && 
      orgData.address.streetAddress && 
      orgData.address.addressLocality && 
      orgData.address.postalCode;

    const hasValidGeo = orgData.geo && 
      typeof orgData.geo.latitude === 'number' && 
      typeof orgData.geo.longitude === 'number';

    return {
      name: 'Organization Data',
      success: true,
      result: orgData,
      expectedFields: requiredFields,
      actualFields,
      hasAllFields,
      hasValidContactPoint,
      hasValidAddress,
      hasValidGeo,
      missingFields: requiredFields.filter(field => !actualFields.includes(field))
    };
  }

  /**
   * Generate comprehensive test report
   */
  generateTestReport() {
    console.log('='.repeat(60));
    console.log('METADATA SYSTEM TEST REPORT');
    console.log('='.repeat(60));

    // Run all tests
    const presetTests = this.testMetadataPresets();
    const titleTests = this.testTitleTruncation();
    const descriptionTests = this.testDescriptionTruncation();
    const canonicalTests = this.testCanonicalURLs();
    const structuredDataTests = this.testStructuredData();
    const openGraphTests = this.testOpenGraph();
    const twitterCardTests = this.testTwitterCard();
    const orgDataTests = this.testOrganizationData();

    // Calculate success rates
    const allTests = [
      ...presetTests,
      ...titleTests,
      ...descriptionTests,
      ...canonicalTests,
      ...structuredDataTests,
      openGraphTests,
      twitterCardTests,
      orgDataTests
    ];

    const successCount = allTests.filter(test => test.success !== false).length;
    const totalCount = allTests.length;
    const successRate = ((successCount / totalCount) * 100).toFixed(1);

    // Report results
    console.log(`\nTest Summary:`);
    console.log(`Total Tests: ${totalCount}`);
    console.log(`Passed: ${successCount}`);
    console.log(`Failed: ${totalCount - successCount}`);
    console.log(`Success Rate: ${successRate}%`);

    // Failed tests
    const failedTests = allTests.filter(test => !test.success || test.wasTruncated);
    if (failedTests.length > 0) {
      console.log('\nFailed Tests:');
      failedTests.forEach(test => {
        console.log(`❌ ${test.name}`);
        if (test.error) {
          console.log(`   Error: ${test.error}`);
        } else if (test.wasTruncated) {
          console.log(`   Input: "${test.input}" (${test.inputLength} chars)`);
          console.log(`   Output: "${test.truncated}" (${test.actualLength} chars)`);
        } else {
          console.log(`   Expected: ${test.expected}`);
          console.log(`   Actual: ${test.actual}`);
        }
      });
    }

    // Warnings
    const warningTests = allTests.filter(test => test.wasTruncated && test.success);
    if (warningTests.length > 0) {
      console.log('\nTruncation Warnings:');
      warningTests.forEach(test => {
        console.log(`⚠️  ${test.name}: Content truncated`);
      });
    }

    const status = successRate >= 95 ? 'EXCELLENT' : 
                   successRate >= 85 ? 'GOOD' : 
                   successRate >= 70 ? 'ACCEPTABLE' : 'NEEDS ATTENTION';

    console.log('\n' + '='.repeat(60));
    console.log(`Metadata System Status: ${status}`);
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
        presetTests,
        titleTests,
        descriptionTests,
        canonicalTests,
        structuredDataTests,
        openGraph: openGraphTests,
        twitterCard: twitterCardTests,
        organizationData: orgDataTests
      }
    };
  }

  /**
   * Export test results
   */
  exportResults(results) {
    const exportPath = path.join(__dirname, '../data/metadata-test-results.json');
    fs.writeFileSync(exportPath, JSON.stringify(results, null, 2));
    console.log(`\nTest results exported to: ${exportPath}`);
  }
}

// Run if called directly
if (require.main === module) {
  const tester = new MetadataSystemTester();
  const results = tester.generateTestReport();
  tester.exportResults(results);
  
  process.exit(results.summary.status === 'EXCELLENT' ? 0 : 1);
}

module.exports = MetadataSystemTester;
