// Theme Toggle with persistence
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  root.setAttribute('data-theme', 'dark');
}

document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) {
      e.target.classList.add('active'); 
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// PWA install prompt
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.hidden = false;
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(console.error);
  });
}

// Custom cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (cursorDot && cursorOutline) {
    document.body.classList.add('cursor-visible');
    
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .nav-item, .control-item, .project-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
    
    // Add click effects
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-click');
    });
    
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-click');
    });
  }
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-scroll');
      const targetElement = document.getElementById(target);
      
      if (targetElement) {
        // Remove active class from all items
        navItems.forEach(navItem => navItem.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        // Scroll to target
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
});

// Project filtering
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Show/hide projects based on filter
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// Project modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const projectPreviews = document.querySelectorAll('.project-preview');
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.querySelector('.modal-close');
  
  if (projectModal && modalClose) {
    // Close modal when clicking close button
    modalClose.addEventListener('click', () => {
      projectModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove('active');
      }
    });
    
    // Set up project previews
    if (projectPreviews.length) {
      projectPreviews.forEach(preview => {
        preview.addEventListener('click', (e) => {
          e.preventDefault();
          const projectCard = preview.closest('.project-card');
          const title = projectCard.querySelector('.project-title').textContent;
          const description = projectCard.querySelector('.project-desc').textContent;
          const tags = projectCard.querySelector('.project-tags').innerHTML;
          
          projectModal.querySelector('.modal-title').textContent = title;
          projectModal.querySelector('.modal-description').textContent = description;
          projectModal.querySelector('.modal-tags').innerHTML = tags;
          
          projectModal.classList.add('active');
        });
      });
    }
  }
});

// Animated counters for stats
document.addEventListener('DOMContentLoaded', () => {
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  
  if (statValues.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const target = parseInt(element.getAttribute('data-count'));
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60fps
          let current = 0;
          
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              clearInterval(timer);
              current = target;
            }
            element.textContent = Math.round(current);
          }, 16);
          
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    statValues.forEach(value => observer.observe(value));
  }
});

// Form submission
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('projectInquiryForm');
  const toast = document.getElementById('notificationToast');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      setTimeout(() => {
        if (toast) {
          toast.classList.add('show');
          toast.querySelector('.toast-message').textContent = 'Message sent successfully!';
          
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
        
        contactForm.reset();
      }, 1000);
    });
  }
});

// Skill bar animation
document.addEventListener('DOMContentLoaded', () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const width = element.getAttribute('data-width');
          element.style.width = width;
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
  }
});

// Hide loading screen when page is fully loaded
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    // Add a small delay for a smoother transition
    setTimeout(() => {
      loadingScreen.classList.add('loaded');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1000); // Reduced from longer delay to 1 second
  }
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', () => {
  const topLinks = document.querySelectorAll('.top-link, a[href="#top"]');
  
  topLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href !== '#' && href !== '#top') {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});

// Back to top button visibility
window.addEventListener('scroll', () => {
  const topLink = document.querySelector('.top-link');
  if (topLink) {
    if (window.scrollY > 500) {
      topLink.style.opacity = '1';
      topLink.style.visibility = 'visible';
    } else {
      topLink.style.opacity = '0';
      topLink.style.visibility = 'hidden';
    }
  }
});