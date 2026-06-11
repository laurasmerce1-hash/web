// JavaScript code for Laura Salazar's Personal Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.remove('hidden');
            menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        }
        lucide.createIcons();
    });

    // Close mobile menu when clicking any link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
            lucide.createIcons();
        });
    });

    // 2. Active Navigation link on scroll using IntersectionObserver
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle part of viewport
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Desktop navbar links update
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('nav-link-active', 'text-blue-500');
                        link.classList.remove('text-slate-300');
                    } else {
                        link.classList.remove('nav-link-active', 'text-blue-500');
                        link.classList.add('text-slate-300');
                    }
                });

                // Mobile navbar links update
                mobileNavLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('text-blue-500', 'font-semibold');
                        link.classList.remove('text-slate-300');
                    } else {
                        link.classList.remove('text-blue-500', 'font-semibold');
                        link.classList.add('text-slate-300');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('opacity-0');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        el.classList.add('opacity-0'); // start hidden
        revealObserver.observe(el);
    });

    // 4. Premium Form Submission Simulation
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Visual feedback - Submitting state
            formSubmitBtn.disabled = true;
            const originalBtnContent = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> Enviando...
            `;

            // Simulating API network request delay
            setTimeout(() => {
                // Success feedback
                formStatus.classList.remove('hidden');
                formStatus.innerHTML = `
                    <div class="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-lg flex items-center gap-3">
                        <i data-lucide="check-circle" class="w-5 h-5 flex-shrink-0 text-emerald-500"></i>
                        <span>¡Muchas gracias por tu mensaje! Me pondré en contacto contigo lo antes posible.</span>
                    </div>
                `;
                lucide.createIcons();

                // Reset form fields
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    formSubmitBtn.disabled = false;
                    formSubmitBtn.innerHTML = originalBtnContent;
                }, 1000);

                // Hide success message after 7 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 7000);

            }, 1500);
        });
    }

    // 5. Dynamic initialization of Icons
    lucide.createIcons();
});
