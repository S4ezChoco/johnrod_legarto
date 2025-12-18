/**
 * Internship Service - Business Logic Layer
 * Handles internship data and business logic
 * Following rules.md: Business logic separated from UI
 */

const InternshipService = {
  /**
   * Get internship data
   * @returns {Object} Internship information
   */
  getInternshipData: function() {
    return {
      company: 'Food Machinery Industrial Corporation',
      position: 'IT Tech',
      startDate: 'June 2025',
      endDate: 'October 2025',
      hours: 486,
      logo: 'assets/images/FMIC_LOGO.jpg',
      description: 'Gained hands-on experience in IT support, system maintenance, and technical troubleshooting in an industrial manufacturing environment.',
      skills: ['Technical Support', 'System Maintenance', 'Hardware Troubleshooting', 'Network Configuration'],
      achievements: [
        'Completed 486 hours of intensive IT training',
        'Provided technical support for manufacturing systems',
        'Assisted in network infrastructure maintenance',
        'Developed problem-solving skills in real-world scenarios'
      ]
    };
  },

  /**
   * Format internship duration
   * @returns {string} Formatted duration string
   */
  getFormattedDuration: function() {
    const data = this.getInternshipData();
    return `${data.startDate} - ${data.endDate}`;
  },

  /**
   * Get total hours
   * @returns {number} Total internship hours
   */
  getTotalHours: function() {
    return this.getInternshipData().hours;
  }
};
