// Blog Internal Linking Engine - Topical Cluster Management
// Ensures every blog post is internally linked to strengthen topical authority

export class BlogInternalLinkingEngine {
  constructor() {
    this.topicalClusters = {
      'e-waste-basics': {
        keywords: ['e-waste', 'electronic waste', 'digital waste', 'tech disposal'],
        relatedServices: ['free-ewaste-pickup-kochi', 'laptop-recycling-kochi'],
        pillarContent: 'complete-guide-e-waste-recycling-kerala',
        clusterPages: [
          'what-is-e-waste-kochi',
          'e-waste-types-kochi', 
          'e-waste-effects-kochi',
          'e-waste-laws-kochi'
        ]
      },
      'data-security': {
        keywords: ['data destruction', 'data wiping', 'hard drive shredding', 'data security'],
        relatedServices: ['data-destruction-kochi'],
        pillarContent: 'data-destruction-methods-compared-kochi',
        clusterPages: [
          'nist-800-88-guide-kochi',
          'hard-drive-shredding-kochi',
          'data-wiping-software-kochi',
          'data-destruction-cost-kochi'
        ]
      },
      'buyback-pricing': {
        keywords: ['sell laptop', 'buyback', 'laptop price', 'device value'],
        relatedServices: ['dell-laptop-kochi', 'hp-laptop-kochi', 'lenovo-laptop-kochi', 'iphone-kochi'],
        pillarContent: 'laptop-resale-value-2026',
        clusterPages: [
          'dell-laptop-price-kochi',
          'hp-laptop-price-kochi',
          'macbook-resale-kochi',
          'phone-buyback-kochi'
        ]
      },
      'compliance-legal': {
        keywords: ['KSPCB', 'compliance', 'legal requirements', 'environmental laws'],
        relatedServices: ['corporate-e-waste-pickup-kochi'],
        pillarContent: 'dpdp-act-2023-it-disposal-compliance',
        clusterPages: [
          'ewaste-fines-kochi',
          'kspcb-guidelines-kochi',
          'corporate-compliance-kochi',
          'environmental-certifications-kochi'
        ]
      },
      'location-specific': {
        keywords: ['kochi', 'kakkanad', 'edappally', 'aluva', 'infopark'],
        relatedServices: ['free-ewaste-pickup-kochi'],
        pillarContent: 'e-waste-pickup-kochi',
        clusterPages: [
          'ewaste-kakkanad',
          'ewaste-edappally', 
          'ewaste-aluva',
          'ewaste-infopark'
        ]
      }
    };

    this.serviceLinks = {
      'free-ewaste-pickup-kochi': {
        url: '/services/free-ewaste-pickup-kochi/',
        anchorTexts: ['free e-waste pickup', 'same-day pickup', 'doorstep collection'],
        priority: 'high'
      },
      'data-destruction-kochi': {
        url: '/services/data-destruction-kochi/',
        anchorTexts: ['certified data destruction', 'secure data wiping', 'hard drive shredding'],
        priority: 'high'
      },
      'laptop-recycling-kochi': {
        url: '/services/laptop-recycling-kochi/',
        anchorTexts: ['laptop recycling', 'computer disposal', 'tech recycling'],
        priority: 'medium'
      },
      'dell-laptop-kochi': {
        url: '/buyback/dell-laptop-kochi/',
        anchorTexts: ['sell Dell laptop', 'Dell buyback', 'Dell laptop price'],
        priority: 'medium'
      },
      'corporate-e-waste-pickup-kochi': {
        url: '/services/corporate-e-waste-pickup-kochi/',
        anchorTexts: ['corporate e-waste', 'business disposal', 'bulk pickup'],
        priority: 'medium'
      }
    };

    this.blogLinkPatterns = {
      // Internal blog post links
      blogPosts: {
        pattern: /\b(complete guide|data destruction|laptop price|dpdp act|ewaste fines)\b/gi,
        links: {
          'complete guide': '/blog/complete-guide-e-waste-recycling-kerala/',
          'data destruction': '/blog/data-destruction-methods-compared-kochi/',
          'laptop price': '/blog/laptop-resale-value-2026/',
          'dpdp act': '/blog/dpdp-act-2023-it-disposal-compliance/',
          'ewaste fines': '/blog/ewaste-fines-kochi/'
        }
      },
      
      // Location-based links
      locations: {
        pattern: /\b(kochi|kakkanad|edappally|aluva|infopark|ernakulam)\b/gi,
        links: {
          'kochi': '/locations/kochi/',
          'kakkanad': '/locations/kakkanad/',
          'edappally': '/locations/edappally/',
          'aluva': '/locations/aluva/',
          'infopark': '/locations/infopark-kochi/',
          'ernakulam': '/locations/ernakulam/'
        }
      }
    };
  }

  // Identify topical cluster for a blog post
  identifyTopicalCluster(title, content, tags = []) {
    const tagsText = Array.isArray(tags) ? tags.join(' ') : tags || '';
    const text = `${title} ${content} ${tagsText}`.toLowerCase();
    
    for (const [clusterName, cluster] of Object.entries(this.topicalClusters)) {
      const keywordMatches = cluster.keywords.filter(keyword => 
        text.includes(keyword.toLowerCase())
      ).length;
      
      if (keywordMatches >= 2) {
        return clusterName;
      }
    }
    
    return 'general';
  }

  // Generate internal links for blog content
  generateInternalLinks(content, clusterName, maxLinks = 3) {
    let processedContent = content;
    const linksAdded = [];
    let linkCount = 0;

    // Add service links based on cluster
    const cluster = this.topicalClusters[clusterName];
    if (cluster && cluster.relatedServices) {
      cluster.relatedServices.forEach(serviceKey => {
        if (linkCount >= maxLinks) return;
        
        const service = this.serviceLinks[serviceKey];
        if (!service) return;

        // Find the best anchor text match
        const anchorText = service.anchorTexts.find(anchor => 
          processedContent.toLowerCase().includes(anchor.toLowerCase())
        );

        if (anchorText) {
          const regex = new RegExp(`\\b${anchorText}\\b`, 'gi');
          const match = processedContent.match(regex);
          
          if (match && match.length > 0) {
            // Replace only the first occurrence to avoid over-linking
            processedContent = processedContent.replace(regex, 
              `[${anchorText}](${service.url})`
            );
            linksAdded.push({
              type: 'service',
              url: service.url,
              anchor: anchorText,
              priority: service.priority
            });
            linkCount++;
          }
        }
      });
    }

    // Add blog post links
    for (const [category, pattern] of Object.entries(this.blogLinkPatterns)) {
      if (linkCount >= maxLinks) break;
      
      const matches = content.match(pattern.pattern);
      if (matches) {
        matches.forEach(match => {
          if (linkCount >= maxLinks) return;
          
          const linkUrl = pattern.links[match.toLowerCase()];
          if (linkUrl) {
            const regex = new RegExp(`\\b${match}\\b`, 'gi');
            processedContent = processedContent.replace(regex, 
              `[${match}](${linkUrl})`
            );
            linksAdded.push({
              type: 'blog',
              url: linkUrl,
              anchor: match,
              priority: 'medium'
            });
            linkCount++;
          }
        });
      }
    }

    return {
      content: processedContent,
      links: linksAdded
    };
  }

  // Generate related posts based on topical cluster
  generateRelatedPosts(currentSlug, clusterName, allPosts, limit = 3) {
    const cluster = this.topicalClusters[clusterName];
    if (!cluster) return [];

    // Get pillar content first
    const pillarPost = allPosts.find(post => post.slug === cluster.pillarContent);
    const relatedPosts = [];

    if (pillarPost && pillarPost.slug !== currentSlug) {
      relatedPosts.push(pillarPost);
    }

    // Add cluster pages
    cluster.clusterPages.forEach(clusterSlug => {
      if (relatedPosts.length >= limit) return;
      
      const clusterPost = allPosts.find(post => post.slug === clusterSlug);
      if (clusterPost && clusterPost.slug !== currentSlug && 
          !relatedPosts.find(p => p.slug === clusterPost.slug)) {
        relatedPosts.push(clusterPost);
      }
    });

    // Fill with posts from same cluster if needed
    if (relatedPosts.length < limit) {
      const clusterPosts = allPosts.filter(post => {
        const postCluster = this.identifyTopicalCluster(
          post.data.title, 
          '', 
          post.data.tags || []
        );
        return postCluster === clusterName && 
               post.slug !== currentSlug &&
               !relatedPosts.find(p => p.slug === post.slug);
      });

      relatedPosts.push(...clusterPosts.slice(0, limit - relatedPosts.length));
    }

    return relatedPosts.slice(0, limit);
  }

  // Generate table of contents from content
  generateTableOfContents(content) {
    const headings = [];
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({
        id,
        title,
        level
      });
    }

    return headings;
  }

  // Generate FAQ section based on content
  generateFAQs(content, clusterName) {
    const faqTemplates = {
      'e-waste-basics': [
        {
          question: "What counts as e-waste in Kochi?",
          answer: "E-waste includes any electronic device that's no longer needed - computers, laptops, phones, printers, batteries, and other electronic equipment. We accept all types for proper recycling."
        },
        {
          question: "How do I prepare my e-waste for pickup?",
          answer: "Simply gather your electronic items and we'll handle the rest. For devices with storage, we recommend backing up data before pickup. We provide secure data destruction on-site if needed."
        }
      ],
      'data-security': [
        {
          question: "How do you ensure data is completely destroyed?",
          answer: "We use NIST 800-88 compliant methods including physical shredding, degaussing, and multi-pass software wiping. You'll receive a certificate of destruction for your records."
        },
        {
          question: "Can I watch the data destruction process?",
          answer: "Yes, we offer on-site data destruction services where you can witness the entire process. This is especially recommended for highly sensitive business data."
        }
      ],
      'buyback-pricing': [
        {
          question: "How do you determine the value of my laptop?",
          answer: "We evaluate based on brand, model, age, condition, specifications, and current market demand. Our pricing is transparent and competitive with Kochi market rates."
        },
        {
          question: "Do you buy broken or non-working devices?",
          answer: "Yes, we buy both working and non-working devices. Prices vary based on condition, but we ensure responsible recycling even for damaged electronics."
        }
      ],
      'compliance-legal': [
        {
          question: "What are the legal requirements for e-waste disposal in Kerala?",
          answer: "Kerala requires e-waste to be disposed of through KSPCB authorized recyclers. We provide all necessary documentation and certificates for compliance."
        },
        {
          question: "What happens if I don't follow proper e-waste disposal procedures?",
          answer: "Improper disposal can result in fines ranging from Rs 5,000 to Rs 5,00,000 depending on the violation. Using certified services like ours ensures compliance."
        }
      ]
    };

    const defaultFAQs = [
      {
        question: "How quickly can you pick up my e-waste in Kochi?",
        answer: "We offer same-day pickup service across Kochi. Schedule your pickup and we'll collect within 4 hours, including weekends."
      },
      {
        question: "Is your e-waste recycling certified?",
        answer: "Yes, we are KSPCB authorized and follow international standards for environmental compliance and data security."
      }
    ];

    return faqTemplates[clusterName] || defaultFAQs;
  }

  // Generate conversion-focused CTAs based on content
  generateCTAs(content, clusterName) {
    const ctaTemplates = {
      'e-waste-basics': [
        {
          title: "Start Your E-Waste Journey",
          text: "Schedule free pickup for your electronic waste",
          url: "/contact/",
          type: "primary"
        },
        {
          title: "Learn More About Recycling",
          text: "Read our complete e-waste recycling guide",
          url: "/blog/complete-guide-e-waste-recycling-kerala/",
          type: "secondary"
        }
      ],
      'data-security': [
        {
          title: "Protect Your Data Today",
          text: "Schedule certified data destruction service",
          url: "/services/data-destruction-kochi/",
          type: "primary"
        },
        {
          title: "Data Security Consultation",
          text: "Get expert advice on data protection",
          url: "/contact/",
          type: "secondary"
        }
      ],
      'buyback-pricing': [
        {
          title: "Get Best Price for Your Device",
          text: "Instant quote for your laptop or phone",
          url: "/buyback/dell-laptop-kochi/",
          type: "primary"
        },
        {
          title: "Business Buyback Program",
          text: "Special rates for bulk device disposal",
          url: "/services/corporate-e-waste-pickup-kochi/",
          type: "secondary"
        }
      ],
      'compliance-legal': [
        {
          title: "Ensure Compliance Today",
          text: "Get certified e-waste disposal services",
          url: "/services/corporate-e-waste-pickup-kochi/",
          type: "primary"
        },
        {
          title: "Compliance Documentation",
          text: "Learn about required certificates",
          url: "/blog/dpdp-act-2023-it-disposal-compliance/",
          type: "secondary"
        }
      ]
    };

    const defaultCTAs = [
      {
        title: "Schedule Free Pickup",
        text: "Get same-day e-waste collection service",
        url: "/contact/",
        type: "primary"
      },
      {
        title: "Explore Our Services",
        text: "View all our e-waste management solutions",
        url: "/services/",
        type: "secondary"
      }
    ];

    return ctaTemplates[clusterName] || defaultCTAs;
  }

  // Process blog post with all optimizations
  processBlogPost(post, allPosts = []) {
    const clusterName = this.identifyTopicalCluster(
      post.data.title, 
      post.data.content || '', 
      post.data.tags || []
    );

    // Generate internal links
    const { content: linkedContent, links } = this.generateInternalLinks(
      post.data.content || '', 
      clusterName
    );

    // Generate table of contents
    const tableOfContents = this.generateTableOfContents(linkedContent);

    // Generate related posts
    const relatedPosts = this.generateRelatedPosts(
      post.slug, 
      clusterName, 
      allPosts
    );

    // Generate FAQs
    const faqs = this.generateFAQs(linkedContent, clusterName);

    // Generate CTAs
    const ctas = this.generateCTAs(linkedContent, clusterName);

    return {
      ...post,
      data: {
        ...post.data,
        content: linkedContent,
        cluster: clusterName,
        internalLinks: links,
        tableOfContents,
        relatedPosts,
        faqs,
        ctas
      }
    };
  }

  // Validate blog post SEO optimization
  validateSEOOptimization(post) {
    const issues = [];
    const suggestions = [];

    // Check heading structure
    const content = post.data.content || '';
    const h1Count = (content.match(/^# /gm) || []).length;
    const h2Count = (content.match(/^## /gm) || []).length;
    const h3Count = (content.match(/^### /gm) || []).length;

    if (h1Count !== 1) {
      issues.push(`Blog post should have exactly 1 H1 tag, found ${h1Count}`);
    }

    if (h2Count < 2) {
      suggestions.push("Add more H2 headings to improve content structure");
    }

    // Check internal links
    const internalLinks = post.data.internalLinks || [];
    if (internalLinks.length < 2) {
      suggestions.push("Add more internal links to strengthen topical authority");
    }

    // Check content length
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 1000) {
      suggestions.push("Consider expanding content to at least 1000 words for better SEO");
    }

    // Check for key elements
    if (!post.data.tableOfContents || post.data.tableOfContents.length === 0) {
      suggestions.push("Add a table of contents for better user experience");
    }

    if (!post.data.faqs || post.data.faqs.length === 0) {
      suggestions.push("Add FAQ section to address common user questions");
    }

    if (!post.data.ctas || post.data.ctas.length === 0) {
      suggestions.push("Add conversion-focused CTAs to improve lead generation");
    }

    return {
      score: Math.max(0, 100 - (issues.length * 10) - (suggestions.length * 5)),
      issues,
      suggestions,
      cluster: post.data.cluster || 'general'
    };
  }
}

export default BlogInternalLinkingEngine;
