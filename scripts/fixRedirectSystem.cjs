const fs = require('fs');
const path = require('path');

/**
 * Fix Redirect System
 * Addresses issues found in testing
 */

class RedirectSystemFixer {
  constructor() {
    this.vercelPath = path.join(__dirname, '../vercel.json');
    this.backupPath = path.join(__dirname, '../vercel.json.backup');
  }

  /**
   * Create backup of current vercel.json
   */
  createBackup() {
    const currentConfig = fs.readFileSync(this.vercelPath, 'utf8');
    fs.writeFileSync(this.backupPath, currentConfig);
    console.log('Backup created: vercel.json.backup');
  }

  /**
   * Fix www redirect rule
   */
  fixWWWRedirect(redirects) {
    // Remove existing www redirect if present
    const filteredRedirects = redirects.filter(r => 
      !(r.source === '/(.*)' && r.has && r.has.some(h => h.type === 'host'))
    );

    // Add corrected www redirect at the beginning
    const wwwRedirect = {
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "ewastekochi.com"
        }
      ],
      "destination": "https://www.ewastekochi.com/$1",
      "permanent": true
    };

    return [wwwRedirect, ...filteredRedirects];
  }

  /**
   * Fix HTML extension removal rule
   */
  fixHTMLExtensionRemoval(redirects) {
    // Remove existing HTML removal rules
    const filteredRedirects = redirects.filter(r => 
      !(r.source === '/(.*)\\.html')
    );

    // Add corrected HTML removal rule after www redirect
    const htmlRedirect = {
      "source": "/(.*)\\.html",
      "destination": "/$1",
      "permanent": true
    };

    // Insert after www redirect
    const result = [...filteredRedirects];
    const wwwIndex = result.findIndex(r => 
      r.source === '/(.*)' && r.has && r.has.some(h => h.type === 'host')
    );
    
    if (wwwIndex !== -1) {
      result.splice(wwwIndex + 1, 0, htmlRedirect);
    } else {
      result.unshift(htmlRedirect);
    }

    return result;
  }

  /**
   * Add missing pincode redirects
   */
  addMissingPincodeRedirects(redirects) {
    const existingPincodes = new Set();
    
    // Extract existing pincodes
    redirects.forEach(r => {
      const match = r.source.match(/ewaste-(\d{6})/);
      if (match) {
        existingPincodes.add(match[1]);
      }
    });

    // Missing important pincodes
    const missingPincodes = [
      { pincode: '682037', location: 'aluva' },
      { pincode: '682038', location: 'muvattupuzha' },
      { pincode: '682040', location: 'muvattupuzha' },
      { pincode: '682044', location: 'muvattupuzha' },
      { pincode: '682046', location: 'perumbavoor' },
      { pincode: '682049', location: 'aluva' },
      { pincode: '682054', location: '682054' },
      { pincode: '682055', location: '682055' },
      { pincode: '682058', location: '682058' },
      { pincode: '682064', location: '682064' },
      { pincode: '682065', location: '682065' },
      { pincode: '682066', location: '682066' },
      { pincode: '682068', location: '682068' },
      { pincode: '682069', location: '682069' },
      { pincode: '682070', location: '682070' },
      { pincode: '682071', location: '682071' },
      { pincode: '682076', location: '682076' },
      { pincode: '682078', location: '682078' },
      { pincode: '682081', location: '682081' },
      { pincode: '682082', location: '682082' },
      { pincode: '682083', location: '682083' },
      { pincode: '682087', location: '682087' },
      { pincode: '682089', location: '682089' },
      { pincode: '682090', location: '682090' },
      { pincode: '682092', location: '682092' },
      { pincode: '682095', location: '682095' },
      { pincode: '682097', location: '682097' },
      { pincode: '682099', location: '682099' },
      { pincode: '682103', location: '682103' },
      { pincode: '682104', location: '682104' },
      { pincode: '682105', location: '682105' },
      { pincode: '682106', location: '682106' },
      { pincode: '682107', location: '682107' },
      { pincode: '682112', location: '682112' },
      { pincode: '682116', location: 'thrippunithura' },
      { pincode: '682118', location: '682118' },
      { pincode: '682121', location: '682121' },
      { pincode: '682124', location: '682124' },
      { pincode: '682125', location: 'maradu' },
      { pincode: '682126', location: 'maradu' },
      { pincode: '682127', location: '682127' },
      { pincode: '682133', location: '682133' },
      { pincode: '682135', location: '682135' },
      { pincode: '682136', location: '682136' },
      { pincode: '682139', location: '682139' },
      { pincode: '682143', location: '682143' },
      { pincode: '682148', location: '682148' },
      { pincode: '682150', location: '682150' },
      { pincode: '682151', location: '682151' },
      { pincode: '682152', location: '682152' },
      { pincode: '682154', location: '682154' },
      { pincode: '682158', location: '682158' },
      { pincode: '682161', location: '682161' },
      { pincode: '682162', location: '682162' },
      { pincode: '682164', location: '682164' },
      { pincode: '682165', location: 'aluva' },
      { pincode: '682166', location: '682166' },
      { pincode: '682168', location: '682168' },
      { pincode: '682169', location: '682169' },
      { pincode: '682170', location: '682170' },
      { pincode: '682172', location: '682172' },
      { pincode: '682173', location: '682173' },
      { pincode: '682175', location: '682175' },
      { pincode: '682177', location: '682177' },
      { pincode: '682179', location: '682179' },
      { pincode: '682180', location: '682180' },
      { pincode: '682181', location: '682181' },
      { pincode: '682182', location: '682182' },
      { pincode: '682184', location: '682184' },
      { pincode: '682185', location: 'kakkanad' },
      { pincode: '682186', location: '682186' },
      { pincode: '682189', location: '682189' },
      { pincode: '682190', location: '682190' },
      { pincode: '682191', location: 'ernakulam' },
      { pincode: '682192', location: '682192' },
      { pincode: '682195', location: '682195' },
      { pincode: '682196', location: '682196' },
      { pincode: '682200', location: '682200' },
      { pincode: '682202', location: '682202' },
      { pincode: '682206', location: '682206' },
      { pincode: '682207', location: '682207' },
      { pincode: '682210', location: '682210' },
      { pincode: '682213', location: '682213' },
      { pincode: '682214', location: '682214' },
      { pincode: '682217', location: '682217' },
      { pincode: '682218', location: '682218' },
      { pincode: '682220', location: '682220' },
      { pincode: '682221', location: '682221' },
      { pincode: '682227', location: '682227' },
      { pincode: '682228', location: '682228' },
      { pincode: '682229', location: 'aluva' },
      { pincode: '682231', location: 'north-paravur' },
      { pincode: '682232', location: '682232' },
      { pincode: '682234', location: '682234' },
      { pincode: '682235', location: '682235' },
      { pincode: '682236', location: '682236' },
      { pincode: '682237', location: '682237' },
      { pincode: '682240', location: '682240' },
      { pincode: '682241', location: '682241' },
      { pincode: '682245', location: '682245' },
      { pincode: '682246', location: 'perumbavoor' },
      { pincode: '682247', location: '682247' }
    ].filter(p => !existingPincodes.has(p.pincode));

    // Create new redirect rules
    const newRedirects = missingPincodes.map(p => ({
      "source": `/locations/ewaste-${p.pincode}.html`,
      "destination": `/locations/${p.location}/`,
      "permanent": true
    }));

    return [...redirects, ...newRedirects];
  }

  /**
   * Optimize redirect order
   */
  optimizeRedirectOrder(redirects) {
    // Priority order: www, html, pincodes, services, locations, others
    const ordered = [];
    const categories = {
      www: [],
      html: [],
      pincode: [],
      service: [],
      location: [],
      other: []
    };

    redirects.forEach(r => {
      if (r.source === '/(.*)' && r.has && r.has.some(h => h.type === 'host')) {
        categories.www.push(r);
      } else if (r.source.includes('.html') && !r.source.includes('ewaste-')) {
        categories.html.push(r);
      } else if (r.source.includes('ewaste-68')) {
        categories.pincode.push(r);
      } else if (r.source.includes('/ml/') || r.source.includes('/buyback/') || r.source.includes('/comparisons/') || r.source.includes('/security/')) {
        categories.service.push(r);
      } else if (r.source.includes('/locations/')) {
        categories.location.push(r);
      } else {
        categories.other.push(r);
      }
    });

    return [
      ...categories.www,
      ...categories.html,
      ...categories.pincode,
      ...categories.service,
      ...categories.location,
      ...categories.other
    ];
  }

  /**
   * Apply all fixes
   */
  applyFixes() {
    console.log('Applying redirect system fixes...');
    
    // Load current configuration
    const config = JSON.parse(fs.readFileSync(this.vercelPath, 'utf8'));
    
    // Create backup
    this.createBackup();
    
    // Apply fixes
    let redirects = config.redirects;
    redirects = this.fixWWWRedirect(redirects);
    redirects = this.fixHTMLExtensionRemoval(redirects);
    redirects = this.addMissingPincodeRedirects(redirects);
    redirects = this.optimizeRedirectOrder(redirects);
    
    // Update configuration
    config.redirects = redirects;
    
    // Save updated configuration
    fs.writeFileSync(this.vercelPath, JSON.stringify(config, null, 2));
    
    console.log(`Redirect system updated!`);
    console.log(`Total redirects: ${redirects.length}`);
    console.log(`Backup saved to: ${this.backupPath}`);
    
    return redirects;
  }

  /**
   * Generate fix report
   */
  generateReport(before, after) {
    console.log('\n='.repeat(60));
    console.log('REDIRECT SYSTEM FIX REPORT');
    console.log('='.repeat(60));
    console.log(`Before: ${before.length} redirects`);
    console.log(`After: ${after.length} redirects`);
    console.log(`Added: ${after.length - before.length} new redirects`);
    
    // Categorize before and after
    const categorize = (redirects) => {
      const cats = {
        www: 0,
        html: 0,
        pincode: 0,
        service: 0,
        location: 0,
        other: 0
      };
      
      redirects.forEach(r => {
        if (r.source === '/(.*)' && r.has && r.has.some(h => h.type === 'host')) {
          cats.www++;
        } else if (r.source.includes('.html') && !r.source.includes('ewaste-')) {
          cats.html++;
        } else if (r.source.includes('ewaste-68')) {
          cats.pincode++;
        } else if (r.source.includes('/ml/') || r.source.includes('/buyback/') || r.source.includes('/comparisons/') || r.source.includes('/security/')) {
          cats.service++;
        } else if (r.source.includes('/locations/')) {
          cats.location++;
        } else {
          cats.other++;
        }
      });
      
      return cats;
    };
    
    const beforeCats = categorize(before);
    const afterCats = categorize(after);
    
    console.log('\nCategory Changes:');
    console.log(`WWW: ${beforeCats.www} → ${afterCats.www}`);
    console.log(`HTML: ${beforeCats.html} → ${afterCats.html}`);
    console.log(`Pincode: ${beforeCats.pincode} → ${afterCats.pincode}`);
    console.log(`Service: ${beforeCats.service} → ${afterCats.service}`);
    console.log(`Location: ${beforeCats.location} → ${afterCats.location}`);
    console.log(`Other: ${beforeCats.other} → ${afterCats.other}`);
    
    console.log('\nFix Status: COMPLETED');
    console.log('='.repeat(60));
  }
}

// Run if called directly
if (require.main === module) {
  const fixer = new RedirectSystemFixer();
  
  // Load current redirects
  const currentConfig = JSON.parse(fs.readFileSync(fixer.vercelPath, 'utf8'));
  const beforeRedirects = currentConfig.redirects;
  
  // Apply fixes
  const afterRedirects = fixer.applyFixes();
  
  // Generate report
  fixer.generateReport(beforeRedirects, afterRedirects);
}

module.exports = RedirectSystemFixer;
