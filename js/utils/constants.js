/**
 * Constants - Application Configuration
 * Utility Layer: Centralized configuration values
 */

const CONSTANTS = {
  // Breakpoints (matching CSS)
  BREAKPOINTS: {
    MOBILE: 320,
    TABLET: 641,
    DESKTOP: 1025
  },

  // Animation durations (ms)
  ANIMATION: {
    FAST: 150,
    NORMAL: 200,
    SLOW: 300
  },

  // Scroll behavior
  SCROLL: {
    HEADER_OFFSET: 80,
    SCROLL_TOP_THRESHOLD: 300
  },

  // Theme
  THEME: {
    LIGHT: 'light',
    DARK: 'dark',
    STORAGE_KEY: 'portfolio-theme'
  },

  // Form validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_NAME_LENGTH: 2,
    MIN_MESSAGE_LENGTH: 10,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 254,
    MAX_SUBJECT_LENGTH: 200,
    MAX_MESSAGE_LENGTH: 2000
  },

  // Toast notification
  TOAST: {
    DURATION: 3000,
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
  },

  // Local storage keys
  STORAGE: {
    THEME: 'portfolio-theme',
    FORM_DRAFT: 'portfolio-form-draft'
  },

  // Social links
  SOCIAL: {
    FACEBOOK: '#',
    TWITTER: '#',
    LINKEDIN: '#',
    GITHUB: '#',
    INSTAGRAM: '#'
  },

  // Contact info
  CONTACT: {
    EMAIL: 'johnrod.legarto@example.com',
    PHONE: '+63 XXX XXX XXXX',
    LOCATION: 'Valenzuela City, Metro Manila, Philippines'
  }
};

// Freeze to prevent modifications
Object.freeze(CONSTANTS);
Object.freeze(CONSTANTS.BREAKPOINTS);
Object.freeze(CONSTANTS.ANIMATION);
Object.freeze(CONSTANTS.SCROLL);
Object.freeze(CONSTANTS.THEME);
Object.freeze(CONSTANTS.VALIDATION);
Object.freeze(CONSTANTS.TOAST);
Object.freeze(CONSTANTS.STORAGE);
Object.freeze(CONSTANTS.SOCIAL);
Object.freeze(CONSTANTS.CONTACT);
