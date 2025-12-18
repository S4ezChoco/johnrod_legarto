/**
 * Validators - Form Validation Utilities
 * Utility Layer: Input validation functions
 */

const Validators = {
  /**
   * Validate email address format
   * @param {string} email - Email address to validate
   * @returns {Object} Validation result with isValid and message
   */
  validateEmail: function(email) {
    if (!email || typeof email !== 'string') {
      return { isValid: false, message: 'Email is required' };
    }

    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length === 0) {
      return { isValid: false, message: 'Email is required' };
    }

    if (trimmedEmail.length > CONSTANTS.VALIDATION.MAX_EMAIL_LENGTH) {
      return { isValid: false, message: 'Email is too long' };
    }

    if (!CONSTANTS.VALIDATION.EMAIL_REGEX.test(trimmedEmail)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    return { isValid: true, message: '' };
  },

  /**
   * Validate name field
   * @param {string} name - Name to validate
   * @returns {Object} Validation result with isValid and message
   */
  validateName: function(name) {
    if (!name || typeof name !== 'string') {
      return { isValid: false, message: 'Name is required' };
    }

    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      return { isValid: false, message: 'Name is required' };
    }

    if (trimmedName.length < CONSTANTS.VALIDATION.MIN_NAME_LENGTH) {
      return { isValid: false, message: 'Name must be at least 2 characters' };
    }

    if (trimmedName.length > CONSTANTS.VALIDATION.MAX_NAME_LENGTH) {
      return { isValid: false, message: 'Name is too long' };
    }

    return { isValid: true, message: '' };
  },

  /**
   * Validate subject field
   * @param {string} subject - Subject to validate
   * @returns {Object} Validation result with isValid and message
   */
  validateSubject: function(subject) {
    if (!subject || typeof subject !== 'string') {
      return { isValid: false, message: 'Subject is required' };
    }

    const trimmedSubject = subject.trim();
    
    if (trimmedSubject.length === 0) {
      return { isValid: false, message: 'Subject is required' };
    }

    if (trimmedSubject.length > CONSTANTS.VALIDATION.MAX_SUBJECT_LENGTH) {
      return { isValid: false, message: 'Subject is too long' };
    }

    return { isValid: true, message: '' };
  },

  /**
   * Validate message field
   * @param {string} message - Message to validate
   * @returns {Object} Validation result with isValid and message
   */
  validateMessage: function(message) {
    if (!message || typeof message !== 'string') {
      return { isValid: false, message: 'Message is required' };
    }

    const trimmedMessage = message.trim();
    
    if (trimmedMessage.length === 0) {
      return { isValid: false, message: 'Message is required' };
    }

    if (trimmedMessage.length < CONSTANTS.VALIDATION.MIN_MESSAGE_LENGTH) {
      return { isValid: false, message: 'Message must be at least 10 characters' };
    }

    if (trimmedMessage.length > CONSTANTS.VALIDATION.MAX_MESSAGE_LENGTH) {
      return { isValid: false, message: 'Message is too long' };
    }

    return { isValid: true, message: '' };
  },

  /**
   * Validate entire contact form
   * @param {Object} formData - Form data object
   * @returns {Object} Validation result with isValid and errors object
   */
  validateContactForm: function(formData) {
    const errors = {};
    let isValid = true;

    const nameValidation = this.validateName(formData.name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.message;
      isValid = false;
    }

    const emailValidation = this.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message;
      isValid = false;
    }

    const subjectValidation = this.validateSubject(formData.subject);
    if (!subjectValidation.isValid) {
      errors.subject = subjectValidation.message;
      isValid = false;
    }

    const messageValidation = this.validateMessage(formData.message);
    if (!messageValidation.isValid) {
      errors.message = messageValidation.message;
      isValid = false;
    }

    return { isValid, errors };
  },

  /**
   * Sanitize string input to prevent XSS
   * @param {string} input - Input string to sanitize
   * @returns {string} Sanitized string
   */
  sanitizeInput: function(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }

    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .trim();
  }
};
