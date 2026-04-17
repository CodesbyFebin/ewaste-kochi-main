// src/data/internalLinks.js
// Centralized internal linking rules for automated scale

export const internalLinkRules = {
  // Category-based automatic linking
  categories: {
    'data-destruction': {
      label: 'Related Services',
      links: [
        {
          label: 'Hard Drive Shredding',
          path: '/itad/hard-drive-shredding-kochi',
          description: 'Physical destruction of storage media with certified verification',
          tags: ['physical', 'secure', 'certified']
        },
        {
          label: 'NIST 800-88 Compliant Wiping',
          path: '/itad/nist-800-88-vs-dod-5220-22m',
          description: 'Military-grade data wiping using NIST-approved algorithms',
          tags: ['digital', 'certified', 'nist']
        },
        {
          label: 'KSPCB Authorization',
          path: '/ewaste/kspcb-authorization-list-ernakulam',
          description: 'Official KSPCB certified recyclers list for Kerala',
          tags: ['regulatory', 'kspcb', 'authorization']
        }
      ]
    },
    'recycling': {
      label: 'Related Services',
      links: [
        {
          label: 'ITAD Services',
          path: '/itad/',
          description: 'Professional IT asset disposition with certified data destruction',
          tags: ['professional', 'certified', 'data-security']
        },
        {
          label: 'Free Pickup Service',
          path: '/services/free-pickup-kochi',
          description: 'Free e-waste pickup for businesses across Ernakulam',
          tags: ['free', 'business', 'convenient']
        },
        {
          label: 'Sell Electronics',
          path: '/sell-electronics-kochi',
          description: 'Get cash for your old electronics with competitive buyback prices',
          tags: ['sell', 'cashback', 'value']
        }
      ]
    },
    'compliance': {
      label: 'Related Services',
      links: [
        {
          label: 'DPDP Act 2023 Checklist',
          path: '/ewaste/dpdp-act-2023-compliance-checklist',
          description: 'Complete compliance checklist for Digital Personal Data Protection Act',
          tags: ['legal', 'compliance', 'dpdp']
        },
        {
          label: 'EPR Registration',
          path: '/ewaste/epr-registration-kerala',
          description: 'Extended Producer Responsibility registration for Kerala businesses',
          tags: ['epr', 'registration', 'legal']
        },
        {
          label: 'Certificate of Destruction Sample',
          path: '/certificate-of-destruction-sample',
          description: 'Sample certificate showing our destruction documentation process',
          tags: ['certificate', 'documentation', 'compliance']
        }
      ]
    }
  },
  
  // Tag-specific automatic linking
  tags: {
    'kerala': {
      label: 'Local Services in Kerala',
      links: [
        {
          label: 'E-Waste Recycling Near Me',
          path: '/ewaste/ewaste-recycling-kochi',
          description: 'Find certified e-waste recycling centers across Kochi and Ernakulam',
          tags: ['local', 'kochi', 'ernakulam']
        },
        {
          label: 'ITAD Services Kerala',
          path: '/itad/',
          description: 'Professional IT asset disposition services across Kerala',
          tags: ['kerala', 'professional', 'itad']
        }
      ]
    },
    'business': {
      label: 'Business Solutions',
      links: [
        {
          label: 'Corporate ITAD Services',
          path: '/itad/',
          description: 'Enterprise-grade IT asset disposition for businesses',
          tags: ['business', 'enterprise', 'corporate']
        },
        {
          label: 'Free Business Pickup',
          path: '/services/free-pickup-kochi',
          description: 'Free pickup service for businesses with 10+ units',
          tags: ['business', 'free', 'bulk']
        },
        {
          label: 'Bulk Buyback Programs',
          path: '/sell-electronics-kochi',
          description: 'Volume discount programs for business e-waste recycling',
          tags: ['business', 'bulk', 'discount']
        }
      ]
    },
    'secure': {
      label: 'Security Services',
      links: [
        {
          label: 'NIST 800-88 Data Wiping',
          path: '/itad/nist-800-88-vs-dod-5220-22m',
          description: 'Military-grade data destruction compliance',
          tags: ['secure', 'nist', 'data-destruction']
        },
        {
          label: 'On-Site Data Destruction',
          path: '/itad/',
          description: 'On-site witnessed data destruction for high-security requirements',
          tags: ['secure', 'onsite', 'witnessed']
        }
      ]
    }
  },
  
  // Specific page overrides
  pages: {
    '/itad/': {
      labels: ['Professional Services', 'Compliance'],
      links: [
        {
          label: 'E-Waste Recycling Fundamentals',
          path: '/ewaste/',
          description: 'Learn about responsible e-waste recycling practices',
          tags: ['fundamentals', 'recycling', 'education']
        },
        {
          label: 'Data Security Standards',
          path: '/itad/nist-800-88-vs-dod-5220-22m',
          description: 'Compare NIST and DoD data destruction standards',
          tags: ['security', 'standards', 'compliance']
        }
      ]
    },
    '/ewaste/': {
      labels: ['Consumer Services', 'Recycling'],
      links: [
        {
          label: 'Professional ITAD Services',
          path: '/itad/',
          description: 'When you need certified data destruction',
          tags: ['professional', 'data-security', 'enterprise']
        },
        {
          label: 'Business Bulk Services',
          path: '/services/free-pickup-kochi',
          description: 'Free pickup for large volume e-waste',
          tags: ['business', 'bulk', 'free']
        }
      ]
    }
  }
};

// Helper function to get relevant links for a page
export function getRelevantLinks(pageData) {
  const relevantLinks = [];
  const seenPaths = new Set();
  
  // Get category-based links
  if (pageData.category && internalLinkRules.categories[pageData.category]) {
    relevantLinks.push(...internalLinkRules.categories[pageData.category].links);
  }
  
  // Get tag-based links
  if (pageData.tags) {
    pageData.tags.forEach(tag => {
      if (internalLinkRules.tags[tag]) {
        relevantLinks.push(...internalLinkRules.tags[tag].links);
      }
    });
  }
  
  // Get page-specific overrides
  if (internalLinkRules.pages[pageData.path]) {
    relevantLinks.push(...internalLinkRules.pages[pageData.path].links);
  }
  
  // Deduplicate by path
  return relevantLinks.filter(link => {
    if (seenPaths.has(link.path)) return false;
    seenPaths.add(link.path);
    return true;
  });
}