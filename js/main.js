/**
 * Main Application - Presentation Layer
 * Initializes the application and handles UI interactions
 * Following rules.md: Business logic is separated in services
 */

const App = {
  /**
   * Initialize the application
   */
  init: function() {
    this.initTheme();
    this.initNavigation();
    this.initScrollEffects();
    this.initContactForm();
    this.initScrollToTop();
    this.initDynamicContent();
    this.initHeroSlideshow();
    this.setCurrentYear();
  },

  /**
   * Initialize theme manager
   */
  initTheme: function() {
    ThemeManager.init();

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        ThemeManager.toggle();
      });
    }
  },

  /**
   * Initialize navigation functionality
   */
  initNavigation: function() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const navMobile = document.getElementById('navMobile');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav__link');
    const navMobileLinks = document.querySelectorAll('.nav-mobile__link');

    // Mobile menu toggle
    if (navToggle && navMobile && overlay) {
      navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
      });

      // Close mobile menu
      if (navClose) {
        navClose.addEventListener('click', closeMobileNav);
      }

      overlay.addEventListener('click', closeMobileNav);

      // Close on mobile link click
      navMobileLinks.forEach(function(link) {
        link.addEventListener('click', closeMobileNav);
      });

      function closeMobileNav() {
        navToggle.classList.remove('active');
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
      if (header) {
        if (window.scrollY > CONSTANTS.SCROLL.HEADER_OFFSET) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset;

      sections.forEach(function(section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerOffset = CONSTANTS.SCROLL.HEADER_OFFSET;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  /**
   * Initialize scroll effects
   */
  initScrollEffects: function() {
    // Simple fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.skill-card, .portfolio-card, .experience__card, .internship__card, .education__item');
    animateElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  },

  /**
   * Initialize contact form
   */
  initContactForm: function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');

    // Load draft if exists
    const draft = ContactService.loadDraft();
    if (draft) {
      if (nameInput) nameInput.value = draft.name || '';
      if (emailInput) emailInput.value = draft.email || '';
      if (subjectInput) subjectInput.value = draft.subject || '';
      if (messageInput) messageInput.value = draft.message || '';
    }

    // Save draft on input
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    inputs.forEach(function(input) {
      if (input) {
        input.addEventListener('input', function() {
          ContactService.saveDraft({
            name: nameInput ? nameInput.value : '',
            email: emailInput ? emailInput.value : '',
            subject: subjectInput ? subjectInput.value : '',
            message: messageInput ? messageInput.value : ''
          });
        });

        // Clear error on input
        input.addEventListener('input', function() {
          this.classList.remove('error');
          const errorEl = document.getElementById(this.id + 'Error');
          if (errorEl) errorEl.textContent = '';
        });
      }
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Clear previous errors
      document.querySelectorAll('.form-error').forEach(function(el) {
        el.textContent = '';
      });
      document.querySelectorAll('.form-input, .form-textarea').forEach(function(el) {
        el.classList.remove('error');
      });

      const formData = {
        name: nameInput ? nameInput.value : '',
        email: emailInput ? emailInput.value : '',
        subject: subjectInput ? subjectInput.value : '',
        message: messageInput ? messageInput.value : ''
      };

      // Validate using business logic layer
      const validation = Validators.validateContactForm(formData);

      if (!validation.isValid) {
        // Show errors
        for (const field in validation.errors) {
          const input = document.getElementById(field);
          const errorEl = document.getElementById(field + 'Error');
          
          if (input) input.classList.add('error');
          if (errorEl) errorEl.textContent = validation.errors[field];
        }
        return;
      }

      // Show loading state
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Sending...';
      if (submitSpinner) submitSpinner.style.display = 'inline-block';

      // Submit using business logic layer
      const response = await ContactService.submitContactForm(formData);

      // Reset loading state
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send Message';
      if (submitSpinner) submitSpinner.style.display = 'none';

      if (response.success) {
        App.showToast(response.message, 'success');
        form.reset();
        ContactService.clearDraft();
      } else {
        App.showToast(response.message || 'Something went wrong. Please try again.', 'error');
      }
    });
  },

  /**
   * Initialize scroll to top button
   */
  initScrollToTop: function() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > CONSTANTS.SCROLL.SCROLL_TOP_THRESHOLD) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  },

  /**
   * Initialize dynamic content from services
   */
  initDynamicContent: function() {
    // Update project count
    const projectsCountEl = document.getElementById('projectsCount');
    if (projectsCountEl) {
      const count = PortfolioService.getProjectsCount();
      projectsCountEl.textContent = count + '+';
    }

    // Update skills count
    const skillsCountEl = document.getElementById('skillsCount');
    if (skillsCountEl) {
      const count = SkillsService.getSkillsCount();
      skillsCountEl.textContent = count + '+';
    }

    // Update contact info
    const contactInfo = ContactService.getContactInfo();
    const contactEmailEl = document.getElementById('contactEmail');
    if (contactEmailEl && contactInfo.email) {
      contactEmailEl.textContent = contactInfo.email;
    }

    // Initialize internship data from service
    this.initInternshipData();
  },

  /**
   * Initialize internship section with data from service
   */
  initInternshipData: function() {
    const internshipData = InternshipService.getInternshipData();
    
    const positionEl = document.getElementById('internshipPosition');
    const companyEl = document.getElementById('internshipCompany');
    const durationEl = document.getElementById('internshipDuration');
    const hoursEl = document.getElementById('internshipHours');
    
    if (positionEl) positionEl.textContent = internshipData.position;
    if (companyEl) companyEl.textContent = internshipData.company;
    if (durationEl) durationEl.textContent = InternshipService.getFormattedDuration();
    if (hoursEl) hoursEl.textContent = internshipData.hours + ' Hours';
  },

  /**
   * Initialize hero image slideshow with fade effect
   */
  initHeroSlideshow: function() {
    const slides = document.querySelectorAll('.hero__image-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showNextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }

    setInterval(showNextSlide, 3000);
  },

  /**
   * Set current year in footer
   */
  setCurrentYear: function() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  },

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - Type of toast (success, error, info)
   */
  showToast: function(message, type) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast';
    
    if (type === 'success') {
      toast.classList.add('toast--success');
    } else if (type === 'error') {
      toast.classList.add('toast--error');
    }

    toast.classList.add('visible');

    setTimeout(function() {
      toast.classList.remove('visible');
    }, CONSTANTS.TOAST.DURATION);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  App.init();
});
