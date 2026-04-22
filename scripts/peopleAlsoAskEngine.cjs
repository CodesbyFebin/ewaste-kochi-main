const fs = require('fs');
const path = require('path');

/**
 * People Also Ask Engine
 * Generates contextual FAQs based on page content and user behavior
 */

class PeopleAlsoAskEngine {
  constructor() {
    this.templates = this.loadTemplates();
    this.queryHistory = [];
    this.popularQuestions = this.loadPopularQuestions();
    this.contextualRules = this.loadContextualRules();
  }

  /**
   * Generate "People Also Ask" FAQs for blog posts
   */
  generatePeopleAlsoAsk(content, clusterName, postTitle) {
    const faqs = [];
    
    // Extract key topics from content
    const topics = this.extractTopics(content);
    
    // Generate related questions based on content analysis
    const relatedQuestions = this.generateRelatedQuestions(topics, postTitle);
    
    // Generate "what people also ask" questions
    const peopleAlsoAskQuestions = this.generatePeopleAlsoAskQuestions(topics, clusterName);
    
    // Generate comparison questions
    const comparisonQuestions = this.generateComparisonQuestions(topics);
    
    // Generate process questions
    const processQuestions = this.generateProcessQuestions(topics);
    
    // Combine all questions
    faqs.push(...peopleAlsoAskQuestions, ...relatedQuestions, ...comparisonQuestions, ...processQuestions);
    
    return faqs.slice(0, 8); // Limit to 8 most relevant
  }

  /**
   * Extract topics from content
   */
  extractTopics(content) {
    const topicPatterns = [
      /\b(laptop|phone|tablet|computer|server|monitor|printer)\b/gi,
      /\b(battery|ups|inverter|power)\b/gi,
      /\b(data|destruction|shredding|wiping|security)\b/gi,
      /\b(recycling|disposal|collection|pickup)\b/gi,
      /\b(e-waste|electronic|IT asset)\b/gi,
      /\b(pricing|cost|price|quote|estimate)\b/gi,
      /\b(document|certificate|compliance|KSPCB)\b/gi,
      /\b(service|provider|company|business)\b/gi
    ];
    
    const topics = new Set();
    topicPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          topics.add(match.toLowerCase());
        });
      }
    });
    
    return Array.from(topics);
  }

  /**
   * Generate related questions based on topics
   */
  generateRelatedQuestions(topics, postTitle) {
    const questions = [];
    
    const topicQuestionMap = {
      'laptop': [
        'What are the different types of laptop recycling services?',
        'How do I prepare my laptop for recycling?',
        'What documents are required for laptop disposal?',
        'Can I get cash for old laptops?'
      ],
      'phone': [
        'How much can I get for my old smartphone?',
        'What should I do before selling my phone?',
        'Is it safe to sell phones online?',
        'What happens to my data after phone recycling?'
      ],
      'data': [
        'How is data destruction different from formatting?',
        'What certificates do I get after data destruction?',
        'Is software data destruction secure?',
        'How long does hard drive shredding take?'
      ],
      'recycling': [
        'What items can be recycled?',
        'How does e-waste recycling work?',
        'Why is e-waste recycling important?',
        'Where can I recycle electronics near me?'
      ],
      'pricing': [
        'How are recycling prices determined?',
        'Do recycling services offer free pickup?',
        'Are there any hidden fees for e-waste disposal?',
        'Can I get a quote before committing?'
      ]
    };
    
    topics.forEach(topic => {
      if (topicQuestionMap[topic]) {
        questions.push(...topicQuestionMap[topic]);
      }
    });
    
    return questions.slice(0, 3);
  }

  /**
   * Generate "People Also Ask" questions
   */
  generatePeopleAlsoAskQuestions(topics, clusterName) {
    const questions = [
      `What are the common ${topics[0] || 'e-waste'} issues in ${clusterName}?`,
      `How do other customers handle ${topics[1] || 'recycling'} in ${clusterName}?`,
      `What are the best practices for ${topics[2] || 'data'} security in ${clusterName}?`,
      `What should I look for when choosing a ${topics[3] || 'service'} provider?`
    ];
    
    return questions.slice(0, 2);
  }

  /**
   * Generate comparison questions
   */
  generateComparisonQuestions(topics) {
    const questions = [
      `What's the difference between ${topics[0] || 'laptop'} buyback and ${topics[1] || 'phone'} buyback?`,
      `How does ${topics[2] || 'data'} destruction compare to ${topics[3] || 'recycling'}?`,
      `Which is more cost-effective: ${topics[4] || 'server'} recycling or ${topics[5] || 'monitor'} recycling?`
    ];
    
    return questions.slice(0, 2);
  }

  /**
   * Generate process questions
   */
  generateProcessQuestions(topics) {
    const questions = [
      `What's the step-by-step process for ${topics[0] || 'e-waste'} ${topics[1] || 'collection'}?`,
      `How long does ${topics[2] || 'data'} ${topics[3] || 'destruction'} typically take?`,
      `What preparations are needed before ${topics[4] || 'recycling'} ${topics[5] || 'pickup'}?`
    ];
    
    return questions.slice(0, 1);
  }

  /**
   * Load templates
   */
  loadTemplates() {
    return {
      related: [
        'Based on your interest in {topic}, customers also ask about {related_question}',
        'Many people searching for {topic} also want to know about {related_question}',
        'Related to {topic}, here\'s what others are asking: {related_question}'
      ],
      'people_also_ask': [
        'What do people also Ask about {topic} in {location}?',
        'Common questions about {topic} that customers frequently ask',
        'Popular {topic} questions from {location} residents',
        'People Also Ask: {topic} - {specific_question}'
      ],
      'comparison': [
        'How does {service1} compare to {service2} for {topic}?',
        '{service1} vs {service2}: Which is better for {topic}?',
        'Cost comparison: {service1} vs {service2} pricing',
        'Feature comparison: {service1} vs {service2} - key differences'
      ],
      'process': [
        'What is the process for {topic} {action}?',
        'Step-by-step guide: {topic} {action} explained',
        'How long does {topic} {action} take?',
        'What documents are needed for {topic} {action}?'
      ]
    };
  }

  /**
   * Load popular questions database
   */
  loadPopularQuestions() {
    const questionsPath = path.join(__dirname, '../data/popular-questions.json');
    
    if (fs.existsSync(questionsPath)) {
      return JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
    }
    
    // Return default popular questions if no database exists
    return {
      'laptop': [
        'What is the current laptop buyback price?',
        'Which laptops have the best resale value?',
        'How do I increase my laptop\'s resale value?',
        'What documents do I need to sell my laptop?'
      ],
      'phone': [
        'What is the best time to sell a phone?',
        'How much can I get for an iPhone?',
        'Is it better to sell old phones or trade them in?',
        'What happens to my phone data after selling?'
      ],
      'general': [
        'What e-waste items can be recycled for free?',
        'How do I find a certified e-waste recycler?',
        'What are the benefits of e-waste recycling?',
        'Is e-waste recycling mandatory in Kerala?'
      ]
    };
  }

  /**
   * Load contextual rules
   */
  loadContextualRules() {
    return {
      seasonal: {
        'spring': ['outdoor', 'garden', 'spring cleaning'],
        'summer': ['vacation', 'travel', 'summer electronics'],
        'monsoon': ['water damage', 'humidity protection', 'monsoon electronics']
      },
      location: {
        'kochi': ['corporate', 'business district', 'IT park'],
        'aluva': ['industrial', 'residential', 'railway station'],
        'ernakulam': ['commercial', 'shopping district', 'north railway'],
        'kakkanad': ['IT hub', 'technology park', 'startup']
      },
      service: {
        'data-destruction': ['certificate', 'compliance', 'security', 'NASSCOM'],
        'laptop-buyback': ['resale value', 'market price', 'condition grading', 'trade-in'],
        'recycling': ['pickup', 'drop-off', 'certified', 'environmental']
      }
    };
  }

  /**
   * Generate contextual questions based on rules
   */
  generateContextualQuestions(topics, context = {}) {
    const questions = [];
    const { season, location, service } = context;
    
    // Seasonal questions
    if (season && this.contextualRules.seasonal[season]) {
      const seasonalTopics = this.contextualRules.seasonal[season];
      const matchingTopics = topics.filter(topic => seasonalTopics.some(st => topic.includes(st)));
      
      matchingTopics.forEach(topic => {
        questions.push(`How does ${season} affect ${topic}?`);
        questions.push(`What ${topic} services are most needed during ${season}?`);
      });
    }
    
    // Location-specific questions
    if (location && this.contextualRules.location[location]) {
      const locationTopics = this.contextualRules.location[location];
      const matchingTopics = topics.filter(topic => locationTopics.some(st => topic.includes(st)));
      
      matchingTopics.forEach(topic => {
        questions.push(`What are the ${topic} regulations in ${location}?`);
        questions.push(`Which ${topic} providers operate in ${location}?`);
      });
    }
    
    // Service-specific questions
    if (service && this.contextualRules.service[service]) {
      const serviceTopics = this.contextualRules.service[service];
      const matchingTopics = topics.filter(topic => serviceTopics.some(st => topic.includes(st)));
      
      matchingTopics.forEach(topic => {
        questions.push(`What are the requirements for ${topic}?`);
        questions.push(`How is ${topic} different from other services?`);
      });
    }
    
    return questions.slice(0, 2);
  }
}

// Export for use in other modules
module.exports = PeopleAlsoAskEngine;
