/* ==========================================================================
    Bishwash Kafle - Personal Portfolio Scripts
    Interactive Behaviors, Mobile Drawer, Scroll Reveal Animations
    Contact Form: Real email delivery via Web3Forms API
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // 2. Sticky Navbar on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Drawer Controls
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  function openMobileMenu() {
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      if (e.target === mobileOverlay) closeMobileMenu();
    });
  }

  mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });

  // 4. Contact Form — Real Email via Web3Forms API
  // Delivers to: bishwashkafle0102@gmail.com
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalHTML = submitBtn.innerHTML;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: json
        });

        const result = await response.json();

        if (result.success) {
          // ✅ Success — email sent to bishwashkafle0102@gmail.com
          submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Message Sent!`;
          submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Message delivered!</strong> Thank you for reaching out. Bishwash will reply to you soon at your email.
          `;

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            formStatus.textContent = '';
            formStatus.className = 'form-status';
          }, 6000);

        } else {
          throw new Error(result.message || 'Submission failed');
        }

      } catch (error) {
        // ❌ Error state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;

        formStatus.className = 'form-status error';
        formStatus.innerHTML = `
          <i class="fas fa-exclamation-circle"></i>
          <strong>Could not send message.</strong> Please email directly at
          <a href="mailto:bishwashkafle0102@gmail.com">bishwashkafle0102@gmail.com</a>
        `;

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 8000);
      }
    });
  }

  // 5. Dark/Light Theme Switcher Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

  // Check saved user preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcons(true);
  } else {
    updateThemeIcons(false);
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    const iconClass = isDark ? 'fa-sun' : 'fa-moon';
    const textMarkup = isDark ? '<i class="fas fa-sun"></i> Toggle Light Mode' : '<i class="fas fa-moon"></i> Toggle Dark Mode';

    if (themeToggle) {
      themeToggle.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }
    if (mobileThemeToggle) {
      mobileThemeToggle.innerHTML = textMarkup;
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  // 6. Tabbed Page Navigation Controller (SPA tabs)
  const tabs = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');
  const mobileNavItemsList = document.querySelectorAll('.mobile-nav-item');
  const logoLink = document.querySelector('.nav-logo');
  const hireMeBtn = document.querySelector('.hire-btn');
  const btnSecondaryContact = document.querySelector('.btn-secondary'); // Contact Me button in Hero
  const btnPrimaryPortfolio = document.querySelector('.btn-primary'); // View Projects button in Hero

  function switchTab(targetId) {
    const cleanId = targetId.replace('#', '');
    const targetSection = document.getElementById(cleanId);
    
    if (!targetSection) return;

    // Hide all tabs
    tabs.forEach(tab => {
      tab.classList.remove('active-tab');
    });

    // Show target tab
    targetSection.classList.add('active-tab');

    // Update active state in nav bar links
    navItems.forEach(item => {
      if (item.getAttribute('href') === `#${cleanId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update mobile nav items active state
    mobileNavItemsList.forEach(item => {
      if (item.getAttribute('href') === `#${cleanId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Reset scroll position to top of page
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Bind click listeners for all nav items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      switchTab(href);
      history.pushState(null, null, href);
    });
  });

  mobileNavItemsList.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      switchTab(href);
      history.pushState(null, null, href);
      closeMobileMenu();
    });
  });

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('#home');
      history.pushState(null, null, '#home');
    });
  }

  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('#contact');
      history.pushState(null, null, '#contact');
    });
  }

  if (btnSecondaryContact) {
    btnSecondaryContact.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('#contact');
      history.pushState(null, null, '#contact');
    });
  }

  if (btnPrimaryPortfolio) {
    btnPrimaryPortfolio.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('#portfolio');
      history.pushState(null, null, '#portfolio');
    });
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#home';
    switchTab(hash);
  });

  // Initialize on load
  const initialHash = window.location.hash || '#home';
  switchTab(initialHash);

});
