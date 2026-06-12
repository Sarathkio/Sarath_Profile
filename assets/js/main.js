
(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
    
    const navmenu = document.querySelector('.navmenu');
    if(navmenu) navmenu.classList.toggle('active');
    
    let overlay = document.querySelector('.sidebar-overlay');
    if(overlay) overlay.classList.toggle('active');

    // Toggle background scrolling on mobile
    if (header.classList.contains('header-show')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  if(headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Robust touch/click handler for mobile navigation links
   */
  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', (e) => {
      const isHomepage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '' || window.location.pathname.split('/').pop() === '';
      const href = link.getAttribute('href');

      if (href && (href.startsWith('index.html#') || href.startsWith('#'))) {
        const hash = href.substring(href.indexOf('#'));
        
        if (isHomepage) {
          e.preventDefault();

          const targetElement = document.querySelector(hash);
          if (targetElement) {
            // Close mobile menu if open
            if (document.querySelector('.header-show')) {
              headerToggle();
            }

            // Scroll to target
            const scrollMarginTop = parseInt(getComputedStyle(targetElement).scrollMarginTop) || 0;
            window.scrollTo({
              top: targetElement.offsetTop - scrollMarginTop,
              behavior: 'smooth'
            });

            // Update URL hash
            history.pushState(null, null, hash);
          }
        } else {
          // If we are not on the homepage, let browser navigate
          if (document.querySelector('.header-show')) {
            headerToggle();
          }
        }
      } else {
        // Regular link navigation (e.g. project.html)
        if (document.querySelector('.header-show')) {
          headerToggle();
        }
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    // Inject modern UI
    preloader.innerHTML = `
      <div class="preloader-spinner"></div>
      <div class="preloader-text">Initializing Developer Experience...</div>
    `;
    
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', () => {
      // Add fade out animation class
      preloader.classList.add('preloader-fadeout');
      
      // Restore scrolling
      document.body.style.overflow = '';
      
      // Remove from DOM after transition completes
      setTimeout(() => {
        preloader.remove();
      }, 600); // 0.6s matches CSS transition
    });
  }

  /**
   * Mobile Sidebar Setup
   */
  function setupMobileSidebar() {
    // 1. Create overlay
    if (!document.querySelector('.sidebar-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
      
      // Close sidebar on overlay click
      overlay.addEventListener('click', () => {
        if (document.querySelector('.header-show')) {
          headerToggle();
        }
      });
    }

    // 2. Build drawer header if not exists
    const navmenu = document.querySelector('.navmenu');
    if (navmenu && !document.querySelector('.navmenu .drawer-header')) {
      const drawerHeader = document.createElement('div');
      drawerHeader.className = 'drawer-header';

      // Clone logo first (name/title at the top)
      const logo = document.querySelector('.header > .logo');
      if (logo) {
        drawerHeader.appendChild(logo.cloneNode(true));
      }

      // Clone profile img second (profile image below name/title)
      const profileImg = document.querySelector('.header > .profile-img');
      if (profileImg) {
        drawerHeader.appendChild(profileImg.cloneNode(true));
      }

      // Clone social links third (social links at the bottom)
      const socialLinks = document.querySelector('.header > .social-links');
      if (socialLinks) {
        drawerHeader.appendChild(socialLinks.cloneNode(true));
      }

      navmenu.insertBefore(drawerHeader, navmenu.firstChild);
    }
  }
  
  setupMobileSidebar();

  /**
   * Scroll top button
   */
  /**
   * Scroll top button and sticky header scroll effect
   */
  let scrollTop = document.querySelector('.scroll-top');
  const headerEl = document.querySelector('#header');

  function handleScrollEffects() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    if (headerEl) {
      window.scrollY > 20 ? headerEl.classList.add('scrolled') : headerEl.classList.remove('scrolled');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', handleScrollEffects);
  document.addEventListener('scroll', handleScrollEffects);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



// Theme Toggling, Custom Cursor & Scroll Progress

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dark Mode Toggle
  const toggleButton = document.getElementById('dark-mode-toggle');
  const moonIcon = document.getElementById('moon-icon');

  if (toggleButton && moonIcon) {
    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Change icon based on the dark mode status
      if (document.body.classList.contains('dark-mode')) {
        moonIcon.classList.remove('bi-moon');
        moonIcon.classList.add('bi-sun'); // Switch to sun icon in dark mode
        localStorage.setItem('theme', 'dark');
      } else {
        moonIcon.classList.remove('bi-sun');
        moonIcon.classList.add('bi-moon'); // Switch back to moon icon in light mode
        localStorage.setItem('theme', 'light');
      }
    });

    // Persist theme across sessions on page load
    if (localStorage.getItem('theme') === 'dark' || document.body.classList.contains('dark-mode')) {
      document.body.classList.add('dark-mode');
      moonIcon.classList.remove('bi-moon');
      moonIcon.classList.add('bi-sun');
    }
  }

  // 2. Custom Interactive Cursor (Fine pointer devices only)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      // Immediate translation for inner dot
      cursorDot.style.left = `${targetX}px`;
      cursorDot.style.top = `${targetY}px`;
    });

    // Interpolation loop for smooth trailing ring lag
    function renderCursor() {
      cursorX += (targetX - cursorX) * 0.15;
      cursorY += (targetY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect trigger on links, buttons and cards
    const hoverElements = document.querySelectorAll('a, button, .service-item, .project-item, .progress, [role="button"], input, textarea');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // 3. Scroll Progress Bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollProgress.style.width = scrolled + '%';
  });

  // 4. Show More/Less Resume Experience Items
  const btn = document.querySelector(".show-more-btn");
  const moreItems = document.querySelector(".more-items");

  if (btn && moreItems) {
    btn.addEventListener("click", () => {
      if (moreItems.style.display === "none" || moreItems.style.display === "") {
        moreItems.style.display = "block";
        btn.textContent = "Show Less";
      } else {
        moreItems.style.display = "none";
        btn.textContent = "Show More";
      }
    });
  }
});


