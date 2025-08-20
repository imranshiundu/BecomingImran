
        
        // Theme Toggle Functionality
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });

        // Role Animation
        const roles = document.querySelectorAll('.role');
        let currentRole = 0;
        
        function changeRole() {
            // Remove active class from current role
            roles[currentRole].classList.remove('active');
            
            // Move to next role
            currentRole = (currentRole + 1) % roles.length;
            
            // Add active class to new role
            roles[currentRole].classList.add('active');
        }
        
        // Start role animation if there are multiple roles
        if (roles.length > 1) {
            setInterval(changeRole, 3000);
        }

        // Scroll Animation
        const sections = document.querySelectorAll('section');
        
        function checkScroll() {
            const triggerBottom = window.innerHeight * 0.8;
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                
                if (sectionTop < triggerBottom) {
                    section.classList.add('visible');
                }
            });
        }
        
        // Initial check and add scroll listener
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // Hire Me button functionality
        document.querySelector('.hire-button').addEventListener('click', function() {
            // Scroll to contact section
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });

        // Project card touch interaction for mobile
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('touched');
            }, {passive: true});
            
            card.addEventListener('touchend', function() {
                this.classList.remove('touched');
            }, {passive: true});
        });
    