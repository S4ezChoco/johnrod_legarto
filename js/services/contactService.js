/**
 * Contact Service - Contact Form Handling
 * Business Logic Layer: Handle contact form operations
 */

const ContactService = {
  /**
   * Process contact form submission
   * @param {Object} formData - Form data object
   * @returns {Promise<Object>} Response object with success status and message
   */
  submitContactForm: async function(formData) {
    // Validate form data
    const validation = Validators.validateContactForm(formData);
    
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validation.errors
      };
    }

    // Sanitize input data
    const sanitizedData = {
      name: Validators.sanitizeInput(formData.name),
      email: Validators.sanitizeInput(formData.email),
      subject: Validators.sanitizeInput(formData.subject),
      message: Validators.sanitizeInput(formData.message),
      timestamp: new Date().toISOString()
    };

    // Simulate API call (in production, this would be a real API endpoint)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success response
        resolve({
          success: true,
          message: 'Thank you for your message! I will get back to you soon.',
          data: sanitizedData
        });
      }, 1500);
    });
  },

  /**
   * Save form draft to localStorage
   * @param {Object} formData - Form data to save
   */
  saveDraft: function(formData) {
    try {
      const draft = {
        ...formData,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem(CONSTANTS.STORAGE.FORM_DRAFT, JSON.stringify(draft));
    } catch (e) {
      // localStorage not available
    }
  },

  /**
   * Load form draft from localStorage
   * @returns {Object|null} Saved draft or null
   */
  loadDraft: function() {
    try {
      const draft = localStorage.getItem(CONSTANTS.STORAGE.FORM_DRAFT);
      return draft ? JSON.parse(draft) : null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Clear form draft from localStorage
   */
  clearDraft: function() {
    try {
      localStorage.removeItem(CONSTANTS.STORAGE.FORM_DRAFT);
    } catch (e) {
      // localStorage not available
    }
  },

  /**
   * Get contact information
   * @returns {Object} Contact information
   */
  getContactInfo: function() {
    return {
      email: CONSTANTS.CONTACT.EMAIL,
      phone: CONSTANTS.CONTACT.PHONE,
      location: CONSTANTS.CONTACT.LOCATION,
      social: { ...CONSTANTS.SOCIAL }
    };
  },

  /**
   * Format mailto link
   * @param {string} subject - Email subject
   * @returns {string} Formatted mailto link
   */
  getMailtoLink: function(subject = '') {
    const email = CONSTANTS.CONTACT.EMAIL;
    const encodedSubject = encodeURIComponent(subject);
    return `mailto:${email}${subject ? `?subject=${encodedSubject}` : ''}`;
  },

  /**
   * Format tel link
   * @returns {string} Formatted tel link
   */
  getTelLink: function() {
    const phone = CONSTANTS.CONTACT.PHONE.replace(/\D/g, '');
    return `tel:+${phone}`;
  }
};
