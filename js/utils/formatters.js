/**
 * Formatters - Data Formatting Utilities
 * Utility Layer: Format data for display
 */

const Formatters = {
  /**
   * Format date to readable string
   * @param {Date|string} date - Date to format
   * @param {string} locale - Locale for formatting
   * @returns {string} Formatted date string
   */
  formatDate: function(date, locale = 'en-US') {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Format year range
   * @param {number} startYear - Start year
   * @param {number|null} endYear - End year (null for present)
   * @returns {string} Formatted year range
   */
  formatYearRange: function(startYear, endYear = null) {
    if (!startYear) return '';
    
    if (endYear === null) {
      return `${startYear} - Present`;
    }
    
    return `${startYear} - ${endYear}`;
  },

  /**
   * Capitalize first letter of string
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  capitalize: function(str) {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Capitalize first letter of each word
   * @param {string} str - String to format
   * @returns {string} Title cased string
   */
  titleCase: function(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  truncate: function(text, maxLength = 100) {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    
    return text.slice(0, maxLength).trim() + '...';
  },

  /**
   * Format phone number
   * @param {string} phone - Phone number to format
   * @returns {string} Formatted phone number
   */
  formatPhone: function(phone) {
    if (!phone || typeof phone !== 'string') return '';
    
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 11 && cleaned.startsWith('63')) {
      return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
  },

  /**
   * Format skill level to percentage
   * @param {string} level - Skill level (beginner, intermediate, advanced, expert)
   * @returns {number} Percentage value
   */
  skillLevelToPercent: function(level) {
    const levels = {
      'beginner': 25,
      'intermediate': 50,
      'advanced': 75,
      'expert': 95
    };
    
    return levels[level.toLowerCase()] || 0;
  },

  /**
   * Generate initials from name
   * @param {string} name - Full name
   * @returns {string} Initials (max 2 characters)
   */
  getInitials: function(name) {
    if (!name || typeof name !== 'string') return '';
    
    const parts = name.trim().split(' ').filter(Boolean);
    
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
};
