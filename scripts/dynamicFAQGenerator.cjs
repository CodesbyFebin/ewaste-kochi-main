const fs = require('fs');
const path = require('path');

/**
 * Dynamic Runtime FAQ Generator
 * Generates FAQs based on real-time user queries and system state
 */

class DynamicFAQGenerator {
  constructor() {
    this.queryLogPath = path.join(__dirname, '../data/faq-queries.log');
    this.runtimeDataPath = path.join(__dirname, '../data/runtime-faq-data.json');
    this.templates = this.loadTemplates();
    this.activeQueries = new Map();
    this.queryHistory = [];
    this.systemState = {
      currentServices: [],
      currentLocations: [],
      trendingTopics: [],
      seasonalFactors: []
    };
  }

  /**
   * Main runtime generation loop
   */
  async startRuntimeGeneration() {
    console.log('🔄 Starting Dynamic FAQ Runtime Generation...\n');
    
    // Initialize system state
    this.initializeSystemState();
    
    // Start monitoring loop
    this.startQueryMonitoring();
    
    // Start generation loop
    this.startDynamicGeneration();
  }

  /**
   * Initialize system state from existing data
   */
  initializeSystemState() {
    try {
      // Load existing runtime data
      if (fs.existsSync(this.runtimeDataPath)) {
        const existingData = JSON.parse(fs.readFileSync(this.runtimeDataPath, 'utf8'));
        this.systemState = { ...this.systemState, ...existingData };
        console.log(`📂 Loaded existing runtime data`);
      }
      
      // Load query history
      if (fs.existsSync(this.queryLogPath)) {
        const logContent = fs.readFileSync(this.queryLogPath, 'utf8');
        this.queryHistory = logContent.split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line))
          .slice(-100); // Last 100 queries
      }
      
    } catch (error) {
      console.error('❌ Error initializing system state:', error.message);
    }
  }

  /**
   * Start query monitoring
   */
  startQueryMonitoring() {
    console.log('📡 Query monitoring active...');
    
    // Simulate real-time query detection
    setInterval(() => {
      this.processNewQueries();
      this.updateTrendingTopics();
      this.generateContextualFAQs();
    }, 5000); // Every 5 seconds
  }

  /**
   * Process new queries from log
   */
  processNewQueries() {
    try {
      if (fs.existsSync(this.queryLogPath)) {
        const currentLog = fs.readFileSync(this.queryLogPath, 'utf8');
        const currentQueries = currentLog.split('\n')
          .filter(line => line.trim())
          .map(line => JSON.parse(line));
        
        // Find new queries
        const newQueries = currentQueries.slice(this.queryHistory.length);
        
        newQueries.forEach(query => {
          if (!this.activeQueries.has(query.text)) {
            this.activeQueries.set(query.text, {
              ...query,
              timestamp: Date.now(),
              frequency: 1
            });
            
            // Generate immediate FAQ if high priority
            if (this.isHighPriorityQuery(query)) {
              this.generateRuntimeFAQ(query);
            }
          } else {
            // Update frequency
            const existing = this.activeQueries.get(query.text);
            existing.frequency++;
            existing.timestamp = Date.now();
          }
        });
        
        this.queryHistory = currentQueries;
      }
    } catch (error) {
      console.error('❌ Error processing queries:', error.message);
    }
  }

  /**
   * Start dynamic generation loop
   */
  startDynamicGeneration() {
    console.log('🔄 Dynamic generation loop started');
    
    setInterval(() => {
      this.generateScheduledFAQs();
      this.optimizeExistingFAQs();
      this.saveRuntimeData();
    }, 10000); // Every 10 seconds
  }

  /**
   * Update trending topics based on query patterns
   */
  updateTrendingTopics() {
    const recentQueries = Array.from(this.activeQueries.values())
      .filter(query => Date.now() - query.timestamp < 300000) // Last 5 minutes
      .sort((a, b) => b.frequency - a.frequency);
    
    // Extract trending topics
    const topicCounts = {};
    recentQueries.forEach(query => {
      const topics = this.extractTopics(query.text);
      topics.forEach(topic => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    });
    
    this.systemState.trendingTopics = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([topic]) => topic);
    
    console.log(`📈 Updated trending topics: ${this.systemState.trendingTopics.join(', ')}`);
  }

  /**
   * Generate contextual FAQs based on system state
   */
  generateContextualFAQs() {
    const contexts = this.generateContexts();
    
    contexts.forEach(context => {
      if (this.shouldGenerateFAQ(context)) {
        const faq = this.createContextualFAQ(context);
        this.saveRuntimeFAQ(faq);
      }
    });
  }

  /**
   * Generate contexts for FAQ creation
   */
  generateContexts() {
    return [
      {
        type: 'seasonal',
        trigger: this.isSeasonalTime(),
        data: {
          season: this.getCurrentSeason(),
          locations: this.systemState.currentLocations,
          services: this.systemState.currentServices
        }
      },
      {
        type: 'location_based',
        trigger: this.hasLocationActivity(),
        data: {
          activeLocation: this.getMostActiveLocation(),
          locationServices: this.getLocationBasedServices()
        }
      },
      {
        type: 'service_trending',
        trigger: this.hasServiceTrend(),
        data: {
          trendingService: this.getTrendingService(),
          relatedQueries: this.getServiceRelatedQueries()
        }
      },
      {
        type: 'time_based',
        trigger: this.isBusinessHours(),
        data: {
          timeOfDay: this.getTimeOfDay(),
          queryType: this.getTimeBasedQueryType()
        }
      }
    ];
  }

  /**
   * Generate scheduled FAQs
   */
  generateScheduledFAQs() {
    const schedules = [
      { hour: 9, type: 'business_hours', priority: 'high' },
      { hour: 12, type: 'lunch_break', priority: 'medium' },
      { hour: 15, type: 'afternoon', priority: 'high' },
      { hour: 18, type: 'closing_time', priority: 'medium' }
    ];
    
    const currentHour = new Date().getHours();
    const currentSchedule = schedules.find(s => s.hour === currentHour);
    
    if (currentSchedule && Math.random() > 0.7) { // 70% chance
      const faq = this.generateScheduledFAQ(currentSchedule);
      this.saveRuntimeFAQ(faq);
      console.log(`⏰ Generated scheduled FAQ: ${faq.question}`);
    }
  }

  /**
   * Create contextual FAQ
   */
  createContextualFAQ(context) {
    const templates = this.templates[context.type] || this.templates.general;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    const faq = {
      id: `runtime-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: this.interpolateTemplate(template, context.data),
      answer: this.generateContextualAnswer(context),
      category: context.type,
      priority: context.priority || 'medium',
      source: 'runtime-generation',
      context: context,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };
    
    return faq;
  }

  /**
   * Generate runtime FAQ
   */
  generateRuntimeFAQ(query) {
    const faq = {
      id: `runtime-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: query.text,
      answer: this.generateDynamicAnswer(query.text),
      category: this.categorizeQuery(query.text),
      priority: 'high',
      source: 'runtime-generation',
      queryData: query,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString() // 12 hours
    };
    
    this.saveRuntimeFAQ(faq);
    console.log(`🚀 Generated runtime FAQ: ${query.text}`);
  }

  /**
   * Save runtime FAQ to data file
   */
  saveRuntimeFAQ(faq) {
    const runtimeFAQsPath = path.join(__dirname, '../data/runtime-faqs.json');
    
    let runtimeFAQs = [];
    if (fs.existsSync(runtimeFAQsPath)) {
      runtimeFAQs = JSON.parse(fs.readFileSync(runtimeFAQsPath, 'utf8'));
    }
    
    // Add new FAQ
    runtimeFAQs.push(faq);
    
    // Remove expired FAQs
    const now = Date.now();
    runtimeFAQs = runtimeFAQs.filter(f => new Date(f.expiresAt) > now);
    
    // Keep only last 500 runtime FAQs
    runtimeFAQs = runtimeFAQs.slice(-500);
    
    fs.writeFileSync(runtimeFAQsPath, JSON.stringify(runtimeFAQs, null, 2));
  }

  /**
   * Utility methods
   */
  isHighPriorityQuery(query) {
    const highPriorityKeywords = ['urgent', 'emergency', 'immediate', 'asap', 'critical'];
    return highPriorityKeywords.some(keyword => 
      query.text.toLowerCase().includes(keyword)
    );
  }

  isSeasonalTime() {
    const month = new Date().getMonth();
    return month >= 10 && month <= 2; // Oct-Dec
  }

  hasLocationActivity() {
    return this.systemState.currentLocations.length > 0;
  }

  hasServiceTrend() {
    return this.systemState.trendingTopics.length > 0;
  }

  isBusinessHours() {
    const hour = new Date().getHours();
    return hour >= 9 && hour <= 17;
  }

  getCurrentSeason() {
    const month = new Date().getMonth();
    const seasons = ['winter', 'spring', 'summer', 'monsoon'];
    return seasons[Math.floor(month / 3) % 4];
  }

  getMostActiveLocation() {
    // Simulate based on query frequency
    const locationCounts = {};
    this.queryHistory.forEach(query => {
      const locations = this.extractLocations(query.text);
      locations.forEach(location => {
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      });
    });
    
    return Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'kochi';
  }

  getTrendingService() {
    const serviceCounts = {};
    this.queryHistory.forEach(query => {
      const services = this.extractServices(query.text);
      services.forEach(service => {
        serviceCounts[service] = (serviceCounts[service] || 0) + 1;
      });
    });
    
    return Object.entries(serviceCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'laptop-buyback';
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  getTimeBasedQueryType() {
    const hour = new Date().getHours();
    if (hour < 12) return 'how-to';
    if (hour < 17) return 'pricing';
    return 'requirements';
  }

  extractTopics(text) {
    const topicKeywords = {
      'laptop': 'laptop-buyback',
      'battery': 'battery-recycling',
      'data': 'data-destruction',
      'server': 'server-recycling',
      'phone': 'phone-buyback',
      'printer': 'printer-recycling',
      'monitor': 'monitor-recycling',
      'price': 'pricing',
      'cost': 'pricing',
      'how': 'how-to',
      'dispose': 'e-waste-collection'
    };
    
    const topics = [];
    const lowerText = text.toLowerCase();
    
    Object.entries(topicKeywords).forEach(([keyword, topic]) => {
      if (lowerText.includes(keyword)) {
        topics.push(topic);
      }
    });
    
    return [...new Set(topics)];
  }

  extractServices(text) {
    const services = ['e-waste-collection', 'laptop-buyback', 'phone-buyback', 'data-destruction', 'server-recycling', 'battery-recycling', 'printer-recycling', 'monitor-recycling'];
    const lowerText = text.toLowerCase();
    
    return services.filter(service => lowerText.includes(service));
  }

  extractLocations(text) {
    const locations = ['kochi', 'aluva', 'ernakulam', 'kakkanad', 'edappally', 'thrippunithura', 'angamaly', 'north-paravur'];
    const lowerText = text.toLowerCase();
    
    return locations.filter(location => lowerText.includes(location));
  }

  categorizeQuery(text) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('how to') || lowerText.includes('process')) return 'how-to';
    if (lowerText.includes('price') || lowerText.includes('cost')) return 'pricing';
    if (lowerText.includes('urgent') || lowerText.includes('emergency')) return 'urgent';
    if (lowerText.includes('best') || lowerText.includes('compare')) return 'comparison';
    if (lowerText.includes('problem') || lowerText.includes('troubleshoot')) return 'troubleshooting';
    
    return 'general';
  }

  interpolateTemplate(template, data) {
    let result = template;
    
    // Simple template interpolation
    Object.entries(data).forEach(([key, value]) => {
      const placeholder = new RegExp(`{${key}}`, 'g');
      result = result.replace(placeholder, value);
    });
    
    return result;
  }

  generateContextualAnswer(context) {
    const answerTemplates = {
      seasonal: [
        `During {season}, {service} services in {location} are especially important. We recommend scheduling your {service} before the {season} rush to ensure availability and better pricing.`,
        `{season} brings specific challenges for {service} in {location}. Our team is experienced in handling {service} during {season} conditions with proper safety measures.`
      ],
      location_based: [
        `For {activeLocation}, we offer specialized {service} solutions. Our local team understands the unique requirements of {activeLocation} and provides tailored services.`,
        `Based on recent activity in {activeLocation}, we've updated our {service} process to better serve the area. Contact us for location-specific {service} guidelines.`
      ],
      service_trending: [
        `With increased demand for {trendingService}, we've expanded our capacity. Current processing time is 24-48 hours for {trendingService} requests.`,
        `Many customers are asking about {trendingService}. Here's what you Need to Know: Our {trendingService} services include free pickup, certified processing, and compliance documentation.`
      ],
      time_based: [
        `Good {timeOfDay}! Our {service} team is available to help you with {queryType}-related questions.`,
        `During {timeOfDay}, we prioritize {queryType} inquiries. Expect faster response times for {service} questions.`
      ]
    };
    
    const templates = answerTemplates[context.type] || answerTemplates.general;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return this.interpolateTemplate(template, context.data);
  }

  generateScheduledFAQ(schedule) {
    const templates = {
      business_hours: [
        `What are your business hours for {service}?`,
        `Do you offer emergency {service} services?`,
        `How quickly can you respond to business {service} requests?`
      ],
      lunch_break: [
        `What's the best time to schedule {service} for minimal disruption?`,
        `Do you offer weekend {service} services?`,
        `How far in advance should I schedule {service}?`
      ],
      afternoon: [
        `What's the average turnaround time for {service}?`,
        `Do you provide same-day {service}?`,
        `What preparation is needed before {service}?`
      ],
      closing_time: [
        `What are your cutoff times for {service} requests?`,
        `How do I handle urgent {service} needs after hours?`,
        `What's the earliest next-day service available?`
      ]
    };
    
    const questionTemplates = templates[schedule.type] || [];
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    
    return {
      question: this.interpolateTemplate(template, {
        service: 'e-waste services',
        time: schedule.type
      }),
      answer: this.generateScheduledAnswer(schedule),
      category: 'scheduled',
      priority: schedule.priority,
      source: 'runtime-scheduling'
    };
  }

  generateScheduledAnswer(schedule) {
    const answers = {
      business_hours: [
        `Our business hours are 9 AM to 6 PM, Monday through Saturday. We offer emergency {service} services 24/7 with priority response.`,
        `Yes, we provide emergency {service} services outside regular hours. Call our hotline for immediate assistance.`,
        `We respond to business {service} inquiries within 30 minutes during business hours. Emergency requests are handled immediately.`
      ],
      lunch_break: [
        `Schedule {service} during 10-11 AM or 2-3 PM for minimal disruption to your operations. Weekends are ideal for larger {service} projects.`,
        `Yes, we offer weekend {service} services with advance booking. Our team provides flexible scheduling to accommodate your needs.`,
        `We recommend scheduling {service} 2-3 business days in advance to ensure availability and proper planning.`
      ],
      afternoon: [
        `Standard {service} processing takes 24-48 hours. Same-day {service} is available for requests received before 12 PM.`,
        `Same-day {service} is available for requests received before 12 PM. Additional fees may apply for expedited service.`,
        `Prepare your items by removing personal data and backing up important files. Our team provides checklists for {service} preparation.`
      ],
      closing_time: [
        `Our cutoff for same-day {service} is 3 PM. After this time, requests are scheduled for the next business day.`,
        `For urgent {service} needs after hours, call our emergency hotline. We offer 24/7 emergency response for critical situations.`,
        `Next-day {service} requests are processed at 8 AM the following business day. Schedule by 6 PM for priority service.`
      ]
    };
    
    return answers[schedule.type] || answers.business_hours[0];
  }

  /**
   * Load template system
   */
  loadTemplates() {
    return {
      seasonal: [
        '{season} {service} guidelines for {location}',
        'Preparing for {season} {service} in {location}',
        '{season} {service} offers and promotions'
      ],
      location_based: [
        'Why choose {service} in {location}?',
        'Best {service} providers in {location}',
        '{location} {service} regulations and requirements'
      ],
      service_trending: [
        'Trending {service}: What you need to know',
        '{service} demand and availability updates',
        'Customer questions about {service}'
      ],
      time_based: [
        '{timeOfDay} {service} inquiries',
        'Best time for {service} questions',
        '{timeOfDay} {service} response times'
      ],
      general: [
        'Common questions about {service}',
        '{service} process explanation',
        '{service} requirements and documentation'
      ]
    };
  }

  /**
   * Optimize existing FAQs
   */
  optimizeExistingFAQs() {
    // This would analyze existing FAQ performance
    // And suggest improvements
    console.log('🔧 Optimizing existing FAQs...');
  }

  /**
   * Save runtime data
   */
  saveRuntimeData() {
    const runtimeData = {
      lastUpdated: new Date().toISOString(),
      systemState: this.systemState,
      activeQueries: Array.from(this.activeQueries.entries()).map(([text, data]) => ({ text, ...data })),
      trendingTopics: this.systemState.trendingTopics,
      performance: {
        totalQueries: this.queryHistory.length,
        activeQueries: this.activeQueries.size,
        generationRate: this.calculateGenerationRate()
      }
    };
    
    fs.writeFileSync(this.runtimeDataPath, JSON.stringify(runtimeData, null, 2));
  }

  calculateGenerationRate() {
    const recentQueries = this.queryHistory.slice(-100); // Last 100 queries
    const recentGenerations = recentQueries.filter(q => q.source === 'runtime-generation').length;
    return (recentGenerations / recentQueries.length) * 100;
  }
}

// Export for use in other modules
module.exports = DynamicFAQGenerator;

// Run if called directly
if (require.main === module) {
  const generator = new DynamicFAQGenerator();
  generator.startRuntimeGeneration().catch(console.error);
}
