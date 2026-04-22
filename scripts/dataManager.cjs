const fs = require('fs');
const path = require('path');

/**
 * Centralized Data Management System
 * Manages FAQ data, analytics, and component rendering
 */

class DataManager {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.cache = new Map();
    this.components = this.loadComponents();
    this.metrics = {
      faqsServed: 0,
      cacheHitRate: 0,
      averageResponseTime: 0,
      errorRate: 0
    };
  }

  /**
   * Initialize data management system
   */
  async initialize() {
    console.log('💾 Initializing Centralized Data Management...\n');
    
    try {
      // Create data directory structure
      this.createDataStructure();
      
      // Load existing data
      await this.loadExistingData();
      
      // Start monitoring
      this.startMetricsMonitoring();
      
      console.log('✅ Data Management System Ready');
      
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
    }
  }

  /**
   * Create data directory structure
   */
  createDataStructure() {
    const directories = [
      'faqs',
      'analytics',
      'cache',
      'components',
      'templates',
      'schemas'
    ];
    
    directories.forEach(dir => {
      const dirPath = path.join(this.dataDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
      }
    });
  }

  /**
   * Load existing data
   */
  async loadExistingData() {
    console.log('📂 Loading existing data...');
    
    // Load FAQ database
    await this.loadFAQDatabase();
    
    // Load analytics
    await this.loadAnalytics();
    
    // Load cache
    await this.loadCache();
    
    console.log('✅ Data loading complete');
  }

  /**
   * Load FAQ database
   */
  async loadFAQDatabase() {
    const faqPath = path.join(this.dataDir, 'faqs/faq-database.json');
    
    if (fs.existsSync(faqPath)) {
      const faqData = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
      this.cache.set('faq-database', faqData);
      console.log(`📋 Loaded ${faqData.metadata.totalFAQs} FAQs from database`);
    }
  }

  /**
   * Load analytics data
   */
  async loadAnalytics() {
    const analyticsPath = path.join(this.dataDir, 'analytics/faq-analytics.json');
    
    if (fs.existsSync(analyticsPath)) {
      const analyticsData = JSON.parse(fs.readFileSync(analyticsPath, 'utf8'));
      this.cache.set('analytics', analyticsData);
      console.log(`📈 Loaded analytics data`);
    }
  }

  /**
   * Load cache data
   */
  async loadCache() {
    const cachePath = path.join(this.dataDir, 'cache/faq-cache.json');
    
    if (fs.existsSync(cachePath)) {
      const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      this.cache.set('cache', cacheData);
      console.log(`💾 Loaded cache data`);
    }
  }

  /**
   * Load component templates
   */
  loadComponents() {
    return {
      faqRenderer: this.loadFAQRenderer(),
      searchEngine: this.loadSearchEngine(),
      analytics: this.loadAnalyticsEngine(),
      cache: this.loadCacheManager()
    };
  }

  /**
   * Load FAQ renderer component
   */
  loadFAQRenderer() {
    return {
      renderFAQList: (faqs, options = {}) => {
        const { 
          maxItems = 10, 
          category = null, 
          priority = null,
          format = 'html',
          includeSchema = false 
        } = options;
        
        let filteredFAQs = faqs;
        
        // Apply filters
        if (category) {
          filteredFAQs = filteredFAQs.filter(faq => faq.category === category);
        }
        
        if (priority) {
          filteredFAQs = filteredFAQs.filter(faq => faq.priority === priority);
        }
        
        filteredFAQs = filteredFAQs.slice(0, maxItems);
        
        if (format === 'html') {
          return this.renderHTMLFAQList(filteredFAQs, options);
        } else if (format === 'json') {
          return this.renderJSONFAQList(filteredFAQs, options);
        } else if (format === 'schema') {
          return this.renderFAQSchema(filteredFAQs);
        }
        
        return filteredFAQs;
      },
      
      renderFAQDetails: (faq, options = {}) => {
        const { includeRelated = true, includeAnalytics = false } = options;
        
        let html = `
          <div class="faq-details" data-faq-id="${faq.id}">
            <h3 class="faq-question">${faq.question}</h3>
            <div class="faq-answer">${faq.answer}</div>
        `;
        
        if (includeRelated) {
          html += this.renderRelatedFAQs(faq);
        }
        
        if (includeAnalytics) {
          html += this.renderFAQAnalytics(faq);
        }
        
        return html;
      },
      
      renderFAQSchema: (faqs) => {
        const schema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq, index) => ({
            "@type": "Question",
            "@id": faq.id,
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            },
            "position": index + 1
          }))
        };
        
        return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
      }
    };
  }

  /**
   * Load search engine component
   */
  loadSearchEngine() {
    return {
      searchFAQs: (query, options = {}) => {
        const { 
          category = null, 
          location = null, 
          service = null,
          limit = 10 
        } = options;
        
        const cachedResults = this.searchCache(query);
        if (cachedResults) {
          return cachedResults;
        }
        
        const faqData = this.cache.get('faq-database');
        if (!faqData) return [];
        
        let results = faqData.faqs;
        
        // Apply filters
        if (category) {
          results = results.filter(faq => faq.category === category);
        }
        
        if (location) {
          results = results.filter(faq => 
            faq.question.toLowerCase().includes(location.toLowerCase()) ||
            faq.answer.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        if (service) {
          results = results.filter(faq => 
            faq.question.toLowerCase().includes(service.toLowerCase()) ||
            faq.answer.toLowerCase().includes(service.toLowerCase())
          );
        }
        
        // Text search
        if (query) {
          const queryLower = query.toLowerCase();
          results = results.filter(faq => 
            faq.question.toLowerCase().includes(queryLower) ||
            faq.answer.toLowerCase().includes(queryLower)
          );
        }
        
        // Sort by relevance
        results = this.sortByRelevance(results, query);
        
        const limitedResults = results.slice(0, limit);
        
        // Cache results
        this.cacheSearchResults(query, limitedResults);
        
        return limitedResults;
      },
      
      getSuggestions: (query) => {
        const faqData = this.cache.get('faq-database');
        if (!faqData) return [];
        
        const queryLower = query.toLowerCase();
        const suggestions = new Set();
        
        // Extract key terms from query
        const terms = queryLower.split(' ').filter(term => term.length > 2);
        
        faqData.faqs.forEach(faq => {
          const questionLower = faq.question.toLowerCase();
          const answerLower = faq.answer.toLowerCase();
          
          terms.forEach(term => {
            if (questionLower.includes(term) || answerLower.includes(term)) {
              suggestions.add(faq.question);
            }
          });
        });
        
        return Array.from(suggestions).slice(0, 5);
      }
    };
  }

  /**
   * Load analytics engine component
   */
  loadAnalyticsEngine() {
    return {
      trackFAQView: (faqId, userId = null) => {
        const timestamp = Date.now();
        
        // Update view count
        this.updateFAQAnalytics(faqId, 'views', 1);
        
        // Log user interaction
        if (userId) {
          this.logUserInteraction(userId, 'faq_view', { faqId, timestamp });
        }
        
        this.metrics.faqsServed++;
      },
      
      trackFAQSearch: (query, resultsCount, userId = null) => {
        this.updateAnalytics('searches', {
          query,
          resultsCount,
          timestamp: Date.now(),
          userId
        });
      },
      
      trackFAQFeedback: (faqId, feedback, userId = null) => {
        this.updateFAQAnalytics(faqId, 'feedback', feedback);
        
        if (userId) {
          this.logUserInteraction(userId, 'faq_feedback', { faqId, feedback, timestamp: Date.now() });
        }
      },
      
      generateReport: (timeframe = '24h') => {
        const analyticsData = this.cache.get('analytics');
        if (!analyticsData) return null;
        
        const now = Date.now();
        const timeframes = {
          '1h': 60 * 60 * 1000,
          '24h': 24 * 60 * 60 * 1000,
          '7d': 7 * 24 * 60 * 60 * 1000,
          '30d': 30 * 24 * 60 * 60 * 1000
        };
        
        const startTime = now - timeframes[timeframe];
        
        const recentAnalytics = analyticsData.searches?.filter(search => 
          new Date(search.timestamp) > startTime
        ) || [];
        
        const recentFAQViews = analyticsData.faqViews?.filter(view => 
          new Date(view.timestamp) > startTime
        ) || [];
        
        const topQueries = this.getTopQueries(recentAnalytics);
        const topFAQs = this.getTopFAQs(recentFAQViews);
        
        return {
          timeframe,
          generatedAt: new Date().toISOString(),
          metrics: {
            totalSearches: recentAnalytics.length,
            totalFAQViews: recentFAQViews.length,
            topQueries,
            topFAQs,
            averageResponseTime: this.calculateAverageResponseTime(recentAnalytics)
          }
        };
      }
    };
  }

  /**
   * Load cache manager component
   */
  loadCacheManager() {
    return {
      get: (key) => this.cache.get(key),
      
      set: (key, value, ttl = 3600000) => { // 1 hour default TTL
        this.cache.set(key, {
          value,
          timestamp: Date.now(),
          ttl
        });
      },
      
      has: (key) => {
        const cached = this.cache.get(key);
        if (!cached) return false;
        
        const now = Date.now();
        const age = now - cached.timestamp;
        return age < cached.ttl;
      },
      
      clear: (pattern = null) => {
        if (pattern) {
          const regex = new RegExp(pattern);
          for (const [key] of this.cache.keys()) {
            if (regex.test(key)) {
              this.cache.delete(key);
            }
          }
        } else {
          this.cache.clear();
        }
      }
    };
  }

  /**
   * Rendering methods
   */
  renderHTMLFAQList(faqs, options) {
    const { includeSchema = false, showCategory = true } = options;
    
    let html = '<div class="faq-list">\n';
    
    faqs.forEach((faq, index) => {
      html += `  <div class="faq-item" data-category="${faq.category}" data-priority="${faq.priority}">\n`;
      html += `    <h3 class="faq-question">${faq.question}</h3>\n`;
      html += `    <div class="faq-answer">${faq.answer}</div>\n`;
      
      if (showCategory) {
        html += `    <div class="faq-category-tag">${faq.category}</div>\n`;
      }
      
      html += `  </div>\n`;
    });
    
    html += '</div>';
    
    if (includeSchema) {
      html += '\n' + this.renderFAQSchema(faqs);
    }
    
    return html;
  }

  renderJSONFAQList(faqs) {
    return JSON.stringify(faqs, null, 2);
  }

  renderRelatedFAQs(faq) {
    const faqData = this.cache.get('faq-database');
    if (!faqData) return '';
    
    const related = faqData.faqs
      .filter(other => other.id !== faq.id)
      .filter(other => other.category === faq.category)
      .slice(0, 3)
      .map(other => `
        <div class="related-faq">
          <a href="#faq-${other.id}" class="related-faq-link">${other.question}</a>
        </div>
      `)
      .join('');
    
    return related ? `
      <div class="related-faqs">
        <h4>Related Questions</h4>
        ${related}
      </div>
    ` : '';
  }

  renderFAQAnalytics(faq) {
    const analytics = this.cache.get('analytics');
    if (!analytics) return '';
    
    const views = analytics.faqViews?.filter(view => view.faqId === faq.id) || [];
    const feedback = analytics.feedback?.filter(f => f.faqId === faq.id) || [];
    
    return `
      <div class="faq-analytics">
        <div class="analytics-views">Views: ${views.length}</div>
        <div class="analytics-feedback">Feedback: ${feedback.length}</div>
        <div class="analytics-rating">Rating: ${this.calculateAverageRating(feedback)}</div>
      </div>
    `;
  }

  /**
   * Utility methods
   */
  sortByRelevance(results, query) {
    if (!query) return results;
    
    const queryLower = query.toLowerCase();
    const queryTerms = queryLower.split(' ');
    
    return results.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      queryTerms.forEach(term => {
        if (a.question.toLowerCase().includes(term)) scoreA += 2;
        if (a.answer.toLowerCase().includes(term)) scoreA += 1;
        if (b.question.toLowerCase().includes(term)) scoreB += 2;
        if (b.answer.toLowerCase().includes(term)) scoreB += 1;
      });
      
      return scoreB - scoreA;
    });
  }

  getTopQueries(analytics, limit = 10) {
    const queryCounts = {};
    
    analytics.forEach(search => {
      const query = search.query.toLowerCase();
      queryCounts[query] = (queryCounts[query] || 0) + 1;
    });
    
    return Object.entries(queryCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([query, count]) => ({ query, count }));
  }

  getTopFAQs(analytics, limit = 10) {
    const viewCounts = {};
    
    analytics.forEach(view => {
      viewCounts[view.faqId] = (viewCounts[view.faqId] || 0) + 1;
    });
    
    return Object.entries(viewCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, limit)
      .map(([faqId, count]) => ({ faqId, count }));
  }

  calculateAverageRating(feedback) {
    if (!feedback.length) return 0;
    
    const total = feedback.reduce((sum, f) => sum + (f.rating || 0), 0);
    return (total / feedback.length).toFixed(1);
  }

  updateFAQAnalytics(faqId, metric, value) {
    const analytics = this.cache.get('analytics') || { faqViews: [], feedback: [] };
    
    if (metric === 'views') {
      analytics.faqViews.push({ faqId, timestamp: Date.now() });
    } else if (metric === 'feedback') {
      analytics.feedback.push({ faqId, ...value, timestamp: Date.now() });
    }
    
    this.cache.set('analytics', analytics);
    
    // Persist to file
    const analyticsPath = path.join(this.dataDir, 'analytics/faq-analytics.json');
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));
  }

  updateAnalytics(type, data) {
    const analytics = this.cache.get('analytics') || { searches: [], faqViews: [], feedback: [] };
    
    if (type === 'searches') {
      analytics.searches.push(data);
    }
    
    this.cache.set('analytics', analytics);
    
    // Persist to file
    const analyticsPath = path.join(this.dataDir, 'analytics/faq-analytics.json');
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));
  }

  cacheSearchResults(query, results) {
    this.cache.set(`search:${query}`, {
      results,
      timestamp: Date.now(),
      ttl: 300000 // 5 minutes
    });
  }

  logUserInteraction(userId, action, data) {
    const logPath = path.join(this.dataDir, 'logs/user-interactions.log');
    
    const logEntry = {
      timestamp: Date.now(),
      userId,
      action,
      data
    };
    
    const logContent = fs.existsSync(logPath) 
      ? fs.readFileSync(logPath, 'utf8') + '\n' + JSON.stringify(logEntry)
      : JSON.stringify(logEntry);
    
    fs.writeFileSync(logPath, logContent);
  }

  /**
   * Start metrics monitoring
   */
  startMetricsMonitoring() {
    setInterval(() => {
      this.updateMetrics();
      this.cleanupCache();
      this.generateMetricsReport();
    }, 60000); // Every minute
  }

  updateMetrics() {
    const cacheSize = this.cache.size;
    const now = Date.now();
    
    // Update cache hit rate
    let validCacheEntries = 0;
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp < value.ttl) {
        validCacheEntries++;
      }
    }
    
    this.metrics.cacheHitRate = cacheSize > 0 ? (validCacheEntries / cacheSize) * 100 : 0;
  }

  cleanupCache() {
    const now = Date.now();
    
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > value.ttl) {
        this.cache.delete(key);
      }
    }
  }

  generateMetricsReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      cacheSize: this.cache.size,
      uptime: process.uptime()
    };
    
    const reportPath = path.join(this.dataDir, 'reports/metrics.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
}

// Export for use in other modules
module.exports = DataManager;

// Run if called directly
if (require.main === module) {
  const dataManager = new DataManager();
  dataManager.initialize().catch(console.error);
}
