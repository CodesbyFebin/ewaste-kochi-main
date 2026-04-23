// Accessibility Enhancements for EWaste Kochi
// WCAG 2.1 AA Compliance

class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupScreenReaderSupport();
    this.setupFocusManagement();
    this.setupAriaLiveRegions();
    this.setupSkipLinks();
    this.setupColorContrast();
  }

  // Keyboard Navigation
  setupKeyboardNavigation() {
    // Add keyboard support for dropdown menus
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
        this.closeMobileMenu();
      }
    });

    // Focus trap for modals
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal[role="dialog"]');
        if (modal) {
          const focusableContent = modal.querySelectorAll(focusableElements);
          const firstFocusableElement = focusableContent[0];
          const lastFocusableElement = focusableContent[focusableContent.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    });
  }

  // Screen Reader Support
  setupScreenReaderSupport() {
    // Announce page changes
    this.announcePageChanges();
    
    // Add ARIA labels dynamically
    this.addDynamicAriaLabels();
    
    // Enhance form accessibility
    this.enhanceFormAccessibility();
  }

  announcePageChanges() {
    // Announce when content loads dynamically
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const announcement = document.getElementById('page-announcement');
          if (announcement) {
            announcement.textContent = 'Content updated';
            setTimeout(() => {
              announcement.textContent = '';
            }, 1000);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  addDynamicAriaLabels() {
    // Add aria-label to interactive elements
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
      const text = button.textContent.trim();
      if (text && !button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', text);
      }
    });

    // Add aria-describedby to form inputs
    document.querySelectorAll('input, textarea, select').forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label && !input.getAttribute('aria-describedby')) {
        const helpText = document.querySelector(`#${input.id}-help`);
        if (helpText) {
          input.setAttribute('aria-describedby', helpText.id);
        }
      }
    });
  }

  enhanceFormAccessibility() {
    // Add required field indicators
    document.querySelectorAll('[required]').forEach(field => {
      field.setAttribute('aria-required', 'true');
      
      // Add visual indicator
      const label = document.querySelector(`label[for="${field.id}"]`);
      if (label && !label.querySelector('.required-indicator')) {
        const indicator = document.createElement('span');
        indicator.className = 'required-indicator';
        indicator.textContent = ' *';
        indicator.setAttribute('aria-label', 'required');
        label.appendChild(indicator);
      }
    });

    // Add validation announcements
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        const invalidFields = form.querySelectorAll(':invalid');
        if (invalidFields.length > 0) {
          e.preventDefault();
          this.announceValidationErrors(invalidFields);
        }
      });
    });
  }

  // Focus Management
  setupFocusManagement() {
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: 2px solid var(--gr) !important;
        outline-offset: 2px !important;
      }
      
      *:focus:not(:focus-visible) {
        outline: none !important;
      }
      
      *:focus-visible {
        outline: 2px solid var(--gr) !important;
        outline-offset: 2px !important;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);

    // Skip to main content focus
    this.setupSkipLinks();
  }

  // Skip Links
  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--gr);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      font-weight: bold;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // ARIA Live Regions
  setupAriaLiveRegions() {
    // Create live regions for announcements
    const liveRegions = [
      { id: 'page-announcement', politeness: 'polite' },
      { id: 'error-announcement', politeness: 'assertive' },
      { id: 'status-announcement', politeness: 'polite' }
    ];

    liveRegions.forEach(region => {
      if (!document.getElementById(region.id)) {
        const div = document.createElement('div');
        div.id = region.id;
        div.setAttribute('aria-live', region.politeness);
        div.setAttribute('aria-atomic', 'true');
        div.className = 'sr-only';
        document.body.appendChild(div);
      }
    });
  }

  // Color Contrast
  setupColorContrast() {
    // Add high contrast mode toggle
    const contrastToggle = document.createElement('button');
    contrastToggle.id = 'contrast-toggle';
    contrastToggle.setAttribute('aria-label', 'Toggle high contrast mode');
    contrastToggle.innerHTML = '🔆';
    contrastToggle.style.cssText = `
      position: fixed;
      top: 80px;
      right: 22px;
      width: 40px;
      height: 40px;
      background: var(--gl);
      border: 1px solid var(--gb);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      z-index: 997;
      cursor: pointer;
    `;

    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      localStorage.setItem('high-contrast', isHighContrast);
      contrastToggle.innerHTML = isHighContrast ? '🔅' : '🔆';
      this.announceToScreenReader(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
    });

    // Restore high contrast setting
    const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
    if (savedHighContrast) {
      document.body.classList.add('high-contrast');
      contrastToggle.innerHTML = '🔅';
    }

    document.body.appendChild(contrastToggle);

    // Add high contrast styles
    const highContrastStyle = document.createElement('style');
    highContrastStyle.textContent = `
      body.high-contrast {
        --bg: #000000 !important;
        --bg2: #1a1a1a !important;
        --tx: #ffffff !important;
        --t2: #ffffff !important;
        --gr: #ffff00 !important;
        --gb: #ffffff !important;
      }
      
      body.high-contrast * {
        border-color: #ffffff !important;
      }
      
      body.high-contrast .glass {
        background: #1a1a1a !important;
        border: 2px solid #ffffff !important;
      }
    `;
    document.head.appendChild(highContrastStyle);
  }

  // Utility Functions
  announceToScreenReader(message) {
    const announcement = document.getElementById('page-announcement');
    if (announcement) {
      announcement.textContent = message;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }

  announceValidationErrors(invalidFields) {
    const errorAnnouncement = document.getElementById('error-announcement');
    if (errorAnnouncement) {
      const fieldNames = Array.from(invalidFields).map(field => {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.trim() : field.name;
      });
      
      errorAnnouncement.textContent = `Please correct the following fields: ${fieldNames.join(', ')}`;
      
      // Focus first invalid field
      invalidFields[0].focus();
    }
  }

  closeAllDropdowns() {
    document.querySelectorAll('[aria-expanded="true"]').forEach(element => {
      element.setAttribute('aria-expanded', 'false');
    });
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }
}

// Voice Recognition Enhancement
class VoiceEnhancement {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.setupVoiceRecognition();
  }

  setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        this.processVoiceCommand(command);
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.updateVoiceStatus('Voice recognition error. Please try again.');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateVoiceStatus('Voice assistant ready');
      };
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      this.updateVoiceStatus('Listening...');
      this.recognition.start();
    }
  }

  processVoiceCommand(command) {
    this.updateVoiceStatus(`You said: "${command}"`);
    
    // Enhanced command processing
    const commands = {
      'pickup': () => this.scrollToSection('contact'),
      'quote': () => this.scrollToSection('contact'),
      'destruction': () => this.scrollToSection('data-destruction'),
      'services': () => this.scrollToSection('services'),
      'about': () => this.scrollToSection('about'),
      'contact': () => this.scrollToSection('contact'),
      'faq': () => this.scrollToSection('faq'),
      'call': () => window.location.href = 'tel:+917500555454',
      'whatsapp': () => window.location.href = 'https://wa.me/917500555454'
    };

    for (const [keyword, action] of Object.entries(commands)) {
      if (command.includes(keyword)) {
        action();
        this.updateVoiceStatus(`Navigating to ${keyword}`);
        return;
      }
    }

    this.updateVoiceStatus('Command not recognized. Try: pickup, quote, services, or contact.');
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      section.focus();
    }
  }

  updateVoiceStatus(message) {
    const statusElement = document.getElementById('spt');
    if (statusElement) {
      statusElement.textContent = message;
    }
  }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
  window.voiceEnhancement = new VoiceEnhancement();
});

// Export for global access
window.AccessibilityManager = AccessibilityManager;
window.VoiceEnhancement = VoiceEnhancement;
