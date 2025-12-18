/**
 * Education Service - Education Data Management
 * Business Logic Layer: Handle education and experience data
 */

const EducationService = {
  /**
   * Education history data
   */
  education: [
    {
      id: 1,
      degree: 'Bachelor of Science in Information Technology',
      school: 'Pamantasan ng Lungsod ng Valenzuela (PLV)',
      location: 'Valenzuela City, Metro Manila',
      startYear: 2021,
      endYear: null, // null means present/ongoing
      description: 'Pursuing a degree in Information Technology with focus on software development and web technologies.',
      achievements: [
        'Active member of IT Student Organization',
        'Participated in various coding competitions',
        'Consistent academic performer'
      ],
      current: true
    },
    {
      id: 2,
      degree: 'Senior High School - STEM Strand',
      school: 'Senior High School',
      location: 'Valenzuela City',
      startYear: 2019,
      endYear: 2021,
      description: 'Completed Science, Technology, Engineering, and Mathematics track.',
      achievements: [
        'Graduated with honors',
        'Member of Science Club'
      ],
      current: false
    }
  ],

  /**
   * Certifications and courses
   */
  certifications: [
    {
      id: 1,
      name: 'Web Development Fundamentals',
      issuer: 'Online Learning Platform',
      date: '2023',
      link: '#'
    },
    {
      id: 2,
      name: 'JavaScript Basics',
      issuer: 'Online Course',
      date: '2023',
      link: '#'
    }
  ],

  /**
   * Get all education entries
   * @returns {Array} All education entries
   */
  getAllEducation: function() {
    return [...this.education];
  },

  /**
   * Get current education
   * @returns {Object|null} Current education entry or null
   */
  getCurrentEducation: function() {
    return this.education.find(edu => edu.current) || null;
  },

  /**
   * Get education by ID
   * @param {number} id - Education ID
   * @returns {Object|null} Education entry or null
   */
  getEducationById: function(id) {
    return this.education.find(edu => edu.id === id) || null;
  },

  /**
   * Get all certifications
   * @returns {Array} All certifications
   */
  getAllCertifications: function() {
    return [...this.certifications];
  },

  /**
   * Get formatted education timeline
   * @returns {Array} Education sorted by start year (newest first)
   */
  getEducationTimeline: function() {
    return [...this.education].sort((a, b) => b.startYear - a.startYear);
  },

  /**
   * Calculate years of education
   * @returns {number} Total years
   */
  getTotalEducationYears: function() {
    const currentYear = new Date().getFullYear();
    let totalYears = 0;

    this.education.forEach(edu => {
      const endYear = edu.endYear || currentYear;
      totalYears += (endYear - edu.startYear);
    });

    return totalYears;
  }
};
