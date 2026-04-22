// Performance Monitoring Script for EWaste Kochi
// This script measures Core Web Vitals and provides insights

const { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } = require('web-vitals');

// Store vitals for analysis
const vitals = {};

function logMetric(metric) {
  console.log(`${metric.name}:`, metric.value, metric);
  vitals[metric.name] = metric;
  
  // Send to analytics or monitoring service
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Measure all Core Web Vitals
getCLS(logMetric);
getFID(logMetric); 
getFCP(logMetric);
getLCP(logMetric);
getTTFB(logMetric);
getINP(logMetric);

// Performance observer for additional metrics
if ('PerformanceObserver' in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        console.log('Navigation Timing:', {
          dns: entry.domainLookupEnd - entry.domainLookupStart,
          tcp: entry.connectEnd - entry.connectStart,
          ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
          ttfb: entry.responseStart - entry.requestStart,
          download: entry.responseEnd - entry.responseStart,
          domParse: entry.domContentLoadedEventStart - entry.responseEnd,
          domReady: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
          loadComplete: entry.loadEventEnd - entry.loadEventStart
        });
      }
    });
  });
  
  observer.observe({ entryTypes: ['navigation'] });
  
  // Resource timing analysis
  const resourceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) { // Slow resources
        console.warn('Slow resource detected:', entry.name, entry.duration + 'ms');
      }
    });
  });
  
  resourceObserver.observe({ entryTypes: ['resource'] });
}

// Export for manual inspection
window.ewasteVitals = vitals;

console.log('Performance monitoring initialized for EWaste Kochi');
