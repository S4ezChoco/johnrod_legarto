/**
 * Theme Manager - Dark/Light Mode Handler
 * Utility Layer: Theme switching and persistence
 */

const ThemeManager = {
  /**
   * Initialize theme based on saved preference or system preference
   */
  init: function() {
    const savedTheme = this.getSavedTheme();
    
    if (savedTheme) {
      this.applyTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark ? CONSTANTS.THEME.DARK : CONSTANTS.THEME.LIGHT);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getSavedTheme()) {
        this.applyTheme(e.matches ? CONSTANTS.THEME.DARK : CONSTANTS.THEME.LIGHT);
      }
    });
  },

  /**
   * Get saved theme from localStorage
   * @returns {string|null} Saved theme or null
   */
  getSavedTheme: function() {
    try {
      return localStorage.getItem(CONSTANTS.STORAGE.THEME);
    } catch (e) {
      return null;
    }
  },

  /**
   * Save theme preference to localStorage
   * @param {string} theme - Theme to save
   */
  saveTheme: function(theme) {
    try {
      localStorage.setItem(CONSTANTS.STORAGE.THEME, theme);
    } catch (e) {
      // localStorage not available
    }
  },

  /**
   * Apply theme to document
   * @param {string} theme - Theme to apply
   */
  applyTheme: function(theme) {
    const html = document.documentElement;
    
    if (theme === CONSTANTS.THEME.DARK) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    this.saveTheme(theme);
    this.updateToggleIcon(theme);
  },

  /**
   * Get current theme
   * @returns {string} Current theme
   */
  getCurrentTheme: function() {
    return document.documentElement.classList.contains('dark') 
      ? CONSTANTS.THEME.DARK 
      : CONSTANTS.THEME.LIGHT;
  },

  /**
   * Toggle between light and dark theme
   */
  toggle: function() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === CONSTANTS.THEME.DARK 
      ? CONSTANTS.THEME.LIGHT 
      : CONSTANTS.THEME.DARK;
    
    this.applyTheme(newTheme);
  },

  /**
   * Update toggle button icon based on theme
   * @param {string} theme - Current theme
   */
  updateToggleIcon: function(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const sunIcon = toggleBtn.querySelector('.theme-toggle__sun');
    const moonIcon = toggleBtn.querySelector('.theme-toggle__moon');

    if (sunIcon && moonIcon) {
      if (theme === CONSTANTS.THEME.DARK) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }
};
