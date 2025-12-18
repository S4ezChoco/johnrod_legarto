/**
 * Skills Service - Skills Data Management
 * Business Logic Layer: Handle skills data operations
 */

const SkillsService = {
  /**
   * Skills data organized by category
   */
  skills: {
    programming: [
      { name: 'HTML5', level: 'advanced', icon: 'html5' },
      { name: 'CSS3', level: 'advanced', icon: 'css3' },
      { name: 'JavaScript', level: 'intermediate', icon: 'javascript' },
      { name: 'PHP', level: 'intermediate', icon: 'php' },
      { name: 'Java', level: 'intermediate', icon: 'java' }
    ],
    design: [
      { name: 'Graphic Design', level: 'beginner', icon: 'design' },
      { name: 'Video Editing', level: 'intermediate', icon: 'video' },
      { name: 'Figma', level: 'intermediate', icon: 'figma' }
    ],
    technical: [
      { name: 'Computer Literacy', level: 'advanced', icon: 'computer' },
      { name: 'Typing Skills (90 WPM)', level: 'expert', icon: 'keyboard' },
      { name: 'Git/GitHub', level: 'intermediate', icon: 'git' },
      { name: 'MySQL', level: 'intermediate', icon: 'mysql' }
    ],
    frameworks: [
      { name: 'Bootstrap', level: 'advanced', icon: 'bootstrap' },
      { name: 'Tailwind CSS', level: 'intermediate', icon: 'tailwind' }
    ]
  },

  /**
   * Get all skills
   * @returns {Object} All skills by category
   */
  getAllSkills: function() {
    return { ...this.skills };
  },

  /**
   * Get skills by category
   * @param {string} category - Category name
   * @returns {Array} Skills in the category
   */
  getSkillsByCategory: function(category) {
    const categoryKey = category.toLowerCase();
    return this.skills[categoryKey] ? [...this.skills[categoryKey]] : [];
  },

  /**
   * Get all skill categories
   * @returns {Array} List of category names
   */
  getCategories: function() {
    return Object.keys(this.skills);
  },

  /**
   * Get flat list of all skills
   * @returns {Array} All skills as flat array
   */
  getFlatSkillsList: function() {
    const allSkills = [];
    for (const category in this.skills) {
      allSkills.push(...this.skills[category].map(skill => ({
        ...skill,
        category: category
      })));
    }
    return allSkills;
  },

  /**
   * Get skills by level
   * @param {string} level - Skill level (beginner, intermediate, advanced, expert)
   * @returns {Array} Skills at the specified level
   */
  getSkillsByLevel: function(level) {
    const allSkills = this.getFlatSkillsList();
    return allSkills.filter(skill => skill.level.toLowerCase() === level.toLowerCase());
  },

  /**
   * Get total skills count
   * @returns {number} Total number of skills
   */
  getSkillsCount: function() {
    return this.getFlatSkillsList().length;
  },

  /**
   * Get skills summary for display
   * @returns {Object} Summary statistics
   */
  getSkillsSummary: function() {
    const allSkills = this.getFlatSkillsList();
    
    return {
      total: allSkills.length,
      byLevel: {
        beginner: allSkills.filter(s => s.level === 'beginner').length,
        intermediate: allSkills.filter(s => s.level === 'intermediate').length,
        advanced: allSkills.filter(s => s.level === 'advanced').length,
        expert: allSkills.filter(s => s.level === 'expert').length
      },
      byCategory: {
        programming: this.skills.programming.length,
        design: this.skills.design.length,
        technical: this.skills.technical.length,
        frameworks: this.skills.frameworks.length
      }
    };
  }
};
