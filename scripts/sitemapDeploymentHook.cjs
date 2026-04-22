const fs = require('fs');
const path = require('path');

/**
 * Sitemap Deployment Hook
 * Automatically runs sitemap generation during deployment
 */

const SitemapUpdater = require('./updateSitemap.cjs');

function runSitemapGeneration() {
  console.log('Running automated sitemap generation for deployment...');
  
  try {
    const updater = new SitemapUpdater();
    updater.updateSitemap();
    
    console.log('Sitemap generation completed successfully for deployment!');
    console.log('Sitemaps are ready for search engine indexing.');
    
    return true;
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return false;
  }
}

// Export for use in deployment scripts
module.exports = { runSitemapGeneration };

// Run if called directly
if (require.main === module) {
  runSitemapGeneration();
}
