const fs = require('fs');
const path = require('path');

/**
 * Create Comprehensive Redirect System
 * Final optimized redirect system for EWaste Kochi
 */

class ComprehensiveRedirectCreator {
  constructor() {
    this.baseUrl = 'https://www.ewastekochi.com';
    this.outputPath = path.join(__dirname, '../comprehensive-vercel-redirects.json');
  }

  /**
   * Generate comprehensive redirect rules
   */
  generateRedirects() {
    const redirects = [];

    // 1. WWW Forcing (must be first)
    redirects.push({
      "source": "/(.*)",
      "has": [
        {
          "type": "host",
          "value": "ewastekochi.com"
        }
      ],
      "destination": "https://www.ewastekochi.com/$1",
      "permanent": true
    });

    // 2. HTML Extension Removal (must be second)
    redirects.push({
      "source": "/(.*)\\.html",
      "destination": "/$1",
      "permanent": true
    });

    // 3. Core Service Redirects
    const serviceRedirects = [
      { source: "/ml/buyback/:path*", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/laptops/:path*", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/phones/:path*", dest: "/sell-electronics-kochi/" },
      { source: "/comparisons/:path*", dest: "/sell-electronics-kochi/" },
      { source: "/industries/:path*", dest: "/services/" },
      { source: "/security/:path*", dest: "/services/data-destruction-kochi/" },
      { source: "/marketplace", dest: "/marketplace/" },
      { source: "/itad-kochi", dest: "/itad/" },
      { source: "/get-instant-quote", dest: "/contact/" }
    ];

    serviceRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 4. Blog Redirects
    const blogRedirects = [
      { source: "/blog/corporate-e-waste-policy-template-india", dest: "/blog/ewaste-laws-kerala-2026/" },
      { source: "/blog/data-destruction-kochi", dest: "/services/data-destruction-kochi/" },
      { source: "/blog/dpdp-act-impact-startups", dest: "/blog/dpdp-act-2023-it-disposal-compliance/" },
      { source: "/blog/e-waste-pickup-infopark", dest: "/locations/infopark-kochi/" },
      { source: "/blog/hard-drive-shredding-cost-kochi", dest: "/services/hard-drive-shredding-kochi/" },
      { source: "/blog/how-to-dispose-e-waste-in-infopark-kakkanad", dest: "/locations/infopark-kochi/" },
      { source: "/blog/itad-kakkanad", dest: "/locations/kakkanad/" },
      { source: "/blog/laptop-data-wiping-software-vs-nist", dest: "/blog/itad-roi-kochi-enterprise/" },
      { source: "/blog/laptop-resale-value-2026", dest: "/sell-electronics-kochi/" },
      { source: "/blog/secure-phone-disposal-guide", dest: "/blog/itad-roi-kochi-enterprise/" },
      { source: "/blog/where-sell-old-phone-kochi", dest: "/sell-electronics-kochi/" }
    ];

    blogRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 5. Buyback Page Redirects
    const buybackRedirects = [
      { source: "/bulk-laptop-buyback", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/bulk-laptop-buyback-kochi", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/office-it-clearance-kochi", dest: "/services/itad-kochi/" },
      { source: "/buyback/sell-broken-laptop-kochi", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/sell-old-laptop-kochi", dest: "/sell-electronics-kochi/" },
      { source: "/buyback/sell-water-damaged-macbook-kochi", dest: "/sell-electronics-kochi/" }
    ];

    buybackRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 6. Comparison Redirects
    const comparisonRedirects = [
      { source: "/comparisons/olx-vs-ewastekochi", dest: "/sell-electronics-kochi/" },
      { source: "/comparisons/quickr-vs-ewastekochi", dest: "/sell-electronics-kochi/" }
    ];

    comparisonRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 7. Compliance Redirects
    const complianceRedirects = [
      { source: "/compliance/dod-5220-22m-guide", dest: "/services/data-destruction-kochi/" },
      { source: "/compliance/kerala-pcb-authorization", dest: "/blogs/compliance/" },
      { source: "/compliance/nist-800-88-explained", dest: "/services/data-destruction-kochi/" }
    ];

    complianceRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 8. Location Name Redirects
    const locationNameRedirects = [
      { source: "/e-waste-vyttila", dest: "/locations/vyttila/" },
      { source: "/locations/edappally-ewaste-kochi", dest: "/locations/edappally/" },
      { source: "/locations/ewaste-angamaly", dest: "/locations/angamaly/" },
      { source: "/locations/ewaste-aroor", dest: "/locations/aroor/" },
      { source: "/locations/ewaste-binanipuram", dest: "/locations/binanipuram/" },
      { source: "/locations/ewaste-chalakudy", dest: "/locations/chalakudy/" },
      { source: "/locations/ewaste-cheranalloor", dest: "/locations/cheranalloor/" },
      { source: "/locations/ewaste-cheranallur", dest: "/locations/cheranallur/" },
      { source: "/locations/ewaste-chottanikkara", dest: "/locations/chottanikkara/" },
      { source: "/locations/ewaste-elamakkara", dest: "/locations/elamakkara/" },
      { source: "/locations/ewaste-eramalloor", dest: "/locations/eramalloor/" },
      { source: "/locations/ewaste-ernakulam", dest: "/locations/ernakulam/" },
      { source: "/locations/ewaste-infopark", dest: "/locations/infopark-kochi/" },
      { source: "/locations/ewaste-kakkanad", dest: "/locations/kakkanad/" },
      { source: "/locations/ewaste-kaloor", dest: "/locations/kaloor/" },
      { source: "/locations/ewaste-kolenchery", dest: "/locations/kolenchery/" },
      { source: "/locations/ewaste-kothamangalam", dest: "/locations/kothamangalam/" },
      { source: "/locations/ewaste-kottuvally", dest: "/locations/kottuvally/" },
      { source: "/locations/ewaste-mattancherry", dest: "/locations/fort-kochi/" },
      { source: "/locations/ewaste-mulanthuruthy", dest: "/locations/thrippunithura/" },
      { source: "/locations/ewaste-muvattupuzha", dest: "/locations/muvattupuzha/" },
      { source: "/locations/ewaste-north-paravur", dest: "/locations/north-paravur/" },
      { source: "/locations/ewaste-okkal", dest: "/locations/kothamangalam/" },
      { source: "/locations/ewaste-paravur", dest: "/locations/north-paravur/" },
      { source: "/locations/ewaste-pathalam", dest: "/locations/kakkanad/" },
      { source: "/locations/ewaste-ravipuram", dest: "/locations/ernakulam-south/" },
      { source: "/locations/ewaste-rayamangalam", dest: "/locations/kakkanad/" },
      { source: "/locations/ewaste-thammanam", dest: "/locations/edappally/" },
      { source: "/locations/ewaste-thripunithura", dest: "/locations/thrippunithura/" },
      { source: "/locations/ewaste-vadavucode", dest: "/locations/muvattupuzha/" },
      { source: "/locations/ewaste-vaduthala", dest: "/locations/ernakulam/" },
      { source: "/locations/ewaste-vallarpadam", dest: "/locations/willingdon-island/" },
      { source: "/locations/ewaste-vypeen", dest: "/locations/fort-kochi/" },
      { source: "/locations/kottayam/e-waste-recycling-kochi", dest: "/locations/kottayam/" },
      { source: "/locations/thrikkakara/data-destruction-kochi", dest: "/services/data-destruction-kochi/" }
    ];

    locationNameRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 9. Pincode Redirects (comprehensive)
    const pincodeRedirects = this.generatePincodeRedirects();
    redirects.push(...pincodeRedirects);

    // 10. ITAD Redirects
    const itadRedirects = [
      { source: "/itad/corporate-itad-ernakulam", dest: "/locations/ernakulam/" },
      { source: "/itad/data-destruction-infopark", dest: "/locations/infopark-kochi/" },
      { source: "/itad/it-clearance-smartcity-kochi", dest: "/locations/smart-city-kochi/" },
      { source: "/itad/itad-kochi", dest: "/itad/" },
      { source: "/itad/server-recycling-kochi", dest: "/services/itad-kochi/" },
      { source: "/itad/services/sell-ups-batteries-kochi", dest: "/services/battery-recycling-kochi/" },
      { source: "/industries/manufacturing-ewaste", dest: "/services/itad-kochi/" }
    ];

    itadRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 11. ML/Malayalam Redirects
    const mlRedirects = [
      { source: "/ml/locations/ewaste-682001", dest: "/locations/ernakulam/" },
      { source: "/ml/locations/ewaste-682002", dest: "/locations/ernakulam/" },
      { source: "/ml/locations/ewaste-682004", dest: "/locations/ernakulam-south/" },
      { source: "/ml/locations/ewaste-682006", dest: "/locations/palarivattom/" },
      { source: "/ml/locations/ewaste-682010", dest: "/locations/fort-kochi/" },
      { source: "/ml/locations/ewaste-682013", dest: "/locations/willingdon-island/" },
      { source: "/ml/locations/ewaste-682014", dest: "/locations/ernakulam/" },
      { source: "/ml/locations/ewaste-682015", dest: "/locations/ernakulam/" },
      { source: "/ml/locations/ewaste-682016", dest: "/locations/kakkanad/" },
      { source: "/ml/locations/ewaste-682017", dest: "/locations/kakkanad/" },
      { source: "/ml/locations/ewaste-682018", dest: "/locations/682018/" },
      { source: "/ml/locations/ewaste-682019", dest: "/locations/thrippunithura/" },
      { source: "/ml/locations/ewaste-682020", dest: "/locations/thrippunithura/" },
      { source: "/ml/locations/ewaste-682021", dest: "/locations/thrippunithura/" },
      { source: "/ml/locations/ewaste-682022", dest: "/locations/maradu/" },
      { source: "/ml/locations/ewaste-682024", dest: "/locations/kalamassery/" },
      { source: "/ml/locations/ewaste-682025", dest: "/locations/aluva/" },
      { source: "/ml/locations/ewaste-682029", dest: "/locations/north-paravur/" },
      { source: "/ml/locations/ewaste-682031", dest: "/locations/perumbavoor/" },
      { source: "/ml/locations/ewaste-682032", dest: "/locations/perumbavoor/" },
      { source: "/ml/locations/ewaste-682033", dest: "/locations/angamaly/" },
      { source: "/ml/locations/ewaste-682035", dest: "/locations/angamaly/" },
      { source: "/ml/locations/ewaste-682037", dest: "/locations/aluva/" },
      { source: "/ml/locations/ewaste-682038", dest: "/locations/muvattupuzha/" },
      { source: "/ml/locations/ewaste-682040", dest: "/locations/muvattupuzha/" },
      { source: "/ml/locations/ewaste-682044", dest: "/locations/muvattupuzha/" },
      { source: "/ml/locations/ewaste-682046", dest: "/locations/perumbavoor/" },
      { source: "/ml/locations/ewaste-048", dest: "/locations/aluva/" },
      { source: "/ml/locations/ewaste-682049", dest: "/locations/aluva/" }
    ];

    mlRedirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    // 12. V2 Redirects
    const v2Redirects = [
      { source: "/locations/v2/e-waste-aluva", dest: "/locations/aluva/" },
      { source: "/locations/v2/e-waste-kakkanad", dest: "/locations/kakkanad/" },
      { source: "/locations/v2/e-waste-vyttila", dest: "/locations/vyttila/" }
    ];

    v2Redirects.forEach(rule => {
      redirects.push({
        "source": rule.source,
        "destination": rule.dest,
        "permanent": true
      });
    });

    return redirects;
  }

  /**
   * Generate comprehensive pincode redirects
   */
  generatePincodeRedirects() {
    const pincodeMap = {
      '682002': 'ernakulam',
      '682003': 'ernakulam',
      '682004': 'ernakulam-south',
      '682008': 'aluva',
      '682009': '682009',
      '682010': 'fort-kochi',
      '682012': 'fort-kochi',
      '682014': 'ernakulam',
      '682015': 'ernakulam',
      '682016': 'kakkanad',
      '682026': 'aluva',
      '682028': 'north-paravur',
      '682030': 'north-paravur',
      '682035': 'angamaly',
      '682037': 'aluva',
      '682038': 'muvattupuzha',
      '682040': 'muvattupuzha',
      '682044': 'muvattupuzha',
      '682046': 'perumbavoor',
      '682049': 'aluva',
      '682054': '682054',
      '682055': '682055',
      '682058': '682058',
      '682064': '682064',
      '682065': '682065',
      '682066': '682066',
      '682068': '682068',
      '682069': '682069',
      '682070': '682070',
      '682071': '682071',
      '682074': 'vytilla',
      '682076': '682076',
      '682078': '682078',
      '682081': '682081',
      '682082': '682082',
      '682083': '682083',
      '682085': '682085',
      '682087': '682087',
      '682089': '682089',
      '682090': '682090',
      '682092': '682092',
      '682095': '682095',
      '682097': '682097',
      '682099': '682099',
      '682103': '682103',
      '682104': '682104',
      '682105': '682105',
      '682106': '682106',
      '682107': '682107',
      '682108': 'infopark-kochi',
      '682109': '682109',
      '682112': '682112',
      '682116': 'thrippunithura',
      '682118': '682118',
      '682121': '682121',
      '682124': '682124',
      '682125': 'maradu',
      '682126': 'maradu',
      '682127': '682127',
      '682133': '682133',
      '682135': '682135',
      '682136': '682136',
      '682139': '682139',
      '682143': '682143',
      '682148': '682148',
      '682150': '682150',
      '682151': '682151',
      '682152': '682152',
      '682154': '682154',
      '682158': '682158',
      '682161': '682161',
      '682162': '682162',
      '682164': '682164',
      '682165': 'aluva',
      '682166': '682166',
      '682168': '682168',
      '682169': '682169',
      '682170': '682170',
      '682172': '682172',
      '682173': '682173',
      '682175': '682175',
      '682177': '682177',
      '682179': '682179',
      '682180': '682180',
      '682181': '682181',
      '682182': '682182',
      '682184': '682184',
      '682185': 'kakkanad',
      '682186': '682186',
      '682189': '682189',
      '682190': '682190',
      '682191': 'ernakulam',
      '682192': '682192',
      '682195': '682195',
      '682196': '682196',
      '682200': '682200',
      '682202': '682202',
      '682206': '682206',
      '682207': '682207',
      '682210': '682210',
      '682213': '682213',
      '682214': '682214',
      '682217': '682217',
      '682218': '682218',
      '682220': '682220',
      '682221': '682221',
      '682227': '682227',
      '682228': '682228',
      '682229': 'aluva',
      '682231': 'north-paravur',
      '682232': '682232',
      '682234': '682234',
      '682235': '682235',
      '682236': '682236',
      '682237': '682237',
      '682240': '682240',
      '682241': '682241',
      '682245': '682245',
      '682246': 'perumbavoor',
      '682247': '682247'
    };

    return Object.entries(pincodeMap).map(([pincode, location]) => ({
      "source": `/locations/ewaste-${pincode}`,
      "destination": `/locations/${location}/`,
      "permanent": true
    }));
  }

  /**
   * Create comprehensive Vercel configuration
   */
  createVercelConfig() {
    const redirects = this.generateRedirects();
    
    const config = {
      "$schema": "https://openapi.vercel.sh/vercel.json",
      "cleanUrls": true,
      "trailingSlash": true,
      "framework": "astro",
      "redirects": redirects
    };

    return config;
  }

  /**
   * Save comprehensive redirects
   */
  saveComprehensiveRedirects() {
    const config = this.createVercelConfig();
    
    fs.writeFileSync(this.outputPath, JSON.stringify(config, null, 2));
    
    console.log('='.repeat(60));
    console.log('COMPREHENSIVE REDIRECT SYSTEM CREATED');
    console.log('='.repeat(60));
    console.log(`Total Redirect Rules: ${config.redirects.length}`);
    console.log(`Output File: ${this.outputPath}`);
    
    // Categorization
    const categories = {
      www: 0,
      html: 0,
      pincode: 0,
      service: 0,
      blog: 0,
      location: 0,
      itad: 0,
      ml: 0,
      v2: 0,
      other: 0
    };

    config.redirects.forEach(r => {
      if (r.source === '/(.*)' && r.has) {
        categories.www++;
      } else if (r.source.includes('.html')) {
        categories.html++;
      } else if (r.source.includes('ewaste-68')) {
        categories.pincode++;
      } else if (r.source.includes('/buyback/') || r.source.includes('/comparisons/') || r.source.includes('/security/') || r.source.includes('/industries/')) {
        categories.service++;
      } else if (r.source.includes('/blog/')) {
        categories.blog++;
      } else if (r.source.includes('/locations/') && !r.source.includes('ewaste-')) {
        categories.location++;
      } else if (r.source.includes('/itad/')) {
        categories.itad++;
      } else if (r.source.includes('/ml/')) {
        categories.ml++;
      } else if (r.source.includes('/v2/')) {
        categories.v2++;
      } else {
        categories.other++;
      }
    });

    console.log('\nRedirect Categories:');
    console.log(`WWW Forcing: ${categories.www}`);
    console.log(`HTML Removal: ${categories.html}`);
    console.log(`Pincode Redirects: ${categories.pincode}`);
    console.log(`Service Redirects: ${categories.service}`);
    console.log(`Blog Redirects: ${categories.blog}`);
    console.log(`Location Redirects: ${categories.location}`);
    console.log(`ITAD Redirects: ${categories.itad}`);
    console.log(`ML Redirects: ${categories.ml}`);
    console.log(`V2 Redirects: ${categories.v2}`);
    console.log(`Other Redirects: ${categories.other}`);
    
    console.log('\nSystem Features:');
    console.log('✅ WWW subdomain forcing');
    console.log('✅ HTML extension removal');
    console.log('✅ Comprehensive pincode coverage');
    console.log('✅ Service page redirects');
    console.log('✅ Blog URL updates');
    console.log('✅ Location name normalization');
    console.log('✅ ITAD page redirects');
    console.log('✅ Multi-language support');
    console.log('✅ Version compatibility');
    
    console.log('\nStatus: PRODUCTION READY');
    console.log('='.repeat(60));
    
    return config;
  }

  /**
   * Replace existing vercel.json
   */
  replaceVercelConfig() {
    const config = this.createVercelConfig();
    const vercelPath = path.join(__dirname, '../vercel.json');
    const backupPath = path.join(__dirname, '../vercel.json.backup');
    
    // Create backup
    if (fs.existsSync(vercelPath)) {
      fs.copyFileSync(vercelPath, backupPath);
      console.log(`Backup created: ${backupPath}`);
    }
    
    // Replace with new config
    fs.writeFileSync(vercelPath, JSON.stringify(config, null, 2));
    console.log(`Updated vercel.json with ${config.redirects.length} redirect rules`);
    
    return config;
  }
}

// Run if called directly
if (require.main === module) {
  const creator = new ComprehensiveRedirectCreator();
  
  // Save comprehensive version
  creator.saveComprehensiveRedirects();
  
  // Replace existing config
  creator.replaceVercelConfig();
}

module.exports = ComprehensiveRedirectCreator;
