/**
 * Portfolio Service - Portfolio Data Management
 * Business Logic Layer: Handle portfolio data operations
 */

const PortfolioService = {
  /**
   * Portfolio projects data
   * In a real application, this would come from an API
   */
  projects: [
    {
      id: 1,
      title: 'E-Commerce Website',
      category: 'Web Development',
      description: 'A full-stack e-commerce platform with shopping cart, payment integration, and admin dashboard.',
      image: 'assets/images/project-1.jpg',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      link: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Student Portal System',
      category: 'Web Application',
      description: 'A comprehensive student information system for managing grades, schedules, and announcements.',
      image: 'assets/images/project-2.jpg',
      tags: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      link: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Mobile Banking UI',
      category: 'UI/UX Design',
      description: 'Modern and intuitive mobile banking application interface design with focus on user experience.',
      image: 'assets/images/project-3.jpg',
      tags: ['Figma', 'UI Design', 'Prototyping'],
      link: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Inventory Management',
      category: 'Desktop Application',
      description: 'Desktop application for small businesses to track inventory, sales, and generate reports.',
      image: 'assets/images/project-4.jpg',
      tags: ['Java', 'MySQL', 'Swing'],
      link: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Restaurant Website',
      category: 'Web Development',
      description: 'Responsive restaurant website with online menu, reservation system, and contact form.',
      image: 'assets/images/project-5.jpg',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Weather Dashboard',
      category: 'Web Application',
      description: 'Interactive weather dashboard that displays real-time weather data with beautiful visualizations.',
      image: 'assets/images/project-6.jpg',
      tags: ['JavaScript', 'API', 'CSS'],
      link: '#',
      featured: false
    }
  ],

  /**
   * Get all portfolio projects
   * @returns {Array} All projects
   */
  getAllProjects: function() {
    return [...this.projects];
  },

  /**
   * Get featured projects
   * @returns {Array} Featured projects only
   */
  getFeaturedProjects: function() {
    return this.projects.filter(project => project.featured);
  },

  /**
   * Get projects by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered projects
   */
  getProjectsByCategory: function(category) {
    if (!category || category.toLowerCase() === 'all') {
      return this.getAllProjects();
    }
    return this.projects.filter(
      project => project.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Get unique categories
   * @returns {Array} List of unique categories
   */
  getCategories: function() {
    const categories = this.projects.map(project => project.category);
    return ['All', ...new Set(categories)];
  },

  /**
   * Get project by ID
   * @param {number} id - Project ID
   * @returns {Object|null} Project object or null
   */
  getProjectById: function(id) {
    return this.projects.find(project => project.id === id) || null;
  },

  /**
   * Search projects by keyword
   * @param {string} keyword - Search keyword
   * @returns {Array} Matching projects
   */
  searchProjects: function(keyword) {
    if (!keyword || typeof keyword !== 'string') {
      return this.getAllProjects();
    }

    const searchTerm = keyword.toLowerCase().trim();
    
    return this.projects.filter(project => {
      return (
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.category.toLowerCase().includes(searchTerm) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });
  },

  /**
   * Get projects count
   * @returns {number} Total number of projects
   */
  getProjectsCount: function() {
    return this.projects.length;
  }
};
