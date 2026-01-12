// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== SMOOTH SCROLL BEHAVIOR =====
// Only apply to internal anchor links (not external links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if it's an external link or has target="_blank"
        if (this.getAttribute('target') === '_blank' || !href.startsWith('#')) {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = () => {
    const elements = document.querySelectorAll('.section-header, .tabs, .menu-card, .testimonial-left, .testimonial-right, .newsletter-title, .newsletter-subtitle, .newsletter-form, .footer-column');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal');
        }
    });
};

// Trigger reveal on scroll
window.addEventListener('scroll', revealElements);

// Trigger reveal on load
window.addEventListener('load', () => {
    revealElements();
    initTabIndicator();
});

// ===== TABS FUNCTIONALITY =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const tabIndicator = document.querySelector('.tab-indicator');

// Initialize tab indicator position
function initTabIndicator() {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab && tabIndicator) {
        updateIndicator(activeTab);
    }
}

// Update indicator position
function updateIndicator(button) {
    const buttonRect = button.getBoundingClientRect();
    const tabsRect = button.parentElement.getBoundingClientRect();

    tabIndicator.style.left = (buttonRect.left - tabsRect.left) + 'px';
    tabIndicator.style.width = buttonRect.width + 'px';
}

// Tab click handler
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');

        // Update indicator position
        updateIndicator(button);

        // Re-trigger reveal animation for menu cards
        setTimeout(() => {
            const menuCards = document.querySelectorAll(`#${tabName} .menu-card`);
            menuCards.forEach((card, index) => {
                card.classList.remove('reveal');
                setTimeout(() => {
                    card.classList.add('reveal');
                }, index * 100);
            });
        }, 50);
    });
});

// Initialize menu cards reveal
setTimeout(() => {
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
        const menuCards = activeTabContent.querySelectorAll('.menu-card');
        menuCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('reveal');
            }, index * 150);
        });
    }
}, 500);

// ===== TESTIMONIAL CAROUSEL =====
let currentTestimonial = 1;
let testimonialInterval;

const testimonialItems = document.querySelectorAll('.testimonial-item');
const avatars = document.querySelectorAll('.avatar');
const dots = document.querySelectorAll('.dot');

// Function to show testimonial
function showTestimonial(index) {
    // Remove active class from all
    testimonialItems.forEach(item => item.classList.remove('active'));
    avatars.forEach(avatar => avatar.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to selected
    const selectedItem = document.querySelector(`.testimonial-item[data-testimonial="${index}"]`);
    const selectedAvatar = document.querySelector(`.avatar[data-testimonial="${index}"]`);
    const selectedDot = document.querySelector(`.dot[data-testimonial="${index}"]`);

    if (selectedItem) selectedItem.classList.add('active');
    if (selectedAvatar) selectedAvatar.classList.add('active');
    if (selectedDot) selectedDot.classList.add('active');

    currentTestimonial = index;
}

// Auto-slide testimonials
function startTestimonialCarousel() {
    testimonialInterval = setInterval(() => {
        let next = currentTestimonial + 1;
        if (next > 3) next = 1;
        showTestimonial(next);
    }, 5000); // Change every 5 seconds
}

// Stop auto-slide
function stopTestimonialCarousel() {
    clearInterval(testimonialInterval);
}

// Avatar click handlers
avatars.forEach(avatar => {
    avatar.addEventListener('click', () => {
        const testimonialId = parseInt(avatar.getAttribute('data-testimonial'));
        showTestimonial(testimonialId);
        stopTestimonialCarousel();
        startTestimonialCarousel(); // Restart the interval
    });
});

// Dot click handlers
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const testimonialId = parseInt(dot.getAttribute('data-testimonial'));
        showTestimonial(testimonialId);
        stopTestimonialCarousel();
        startTestimonialCarousel(); // Restart the interval
    });
});

// Start carousel on load
window.addEventListener('load', () => {
    startTestimonialCarousel();
});

// ===== PARALLAX EFFECT FOR INGREDIENTS =====
const ingredients = document.querySelectorAll('.ingredient');

// ===== PARALLAX MOUSE MOVEMENT (SUBTLE) =====
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 50;
    mouseY = (e.clientY - window.innerHeight / 2) / 50;
});

function animateIngredients() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    ingredients.forEach((ingredient, index) => {
        const speed = (index + 1) * 0.2;
        const scrolled = window.pageYOffset;
        const scrollSpeed = (index + 1) * 0.05;
        const yPos = -(scrolled * scrollSpeed);
        ingredient.style.transform = `translateY(${yPos}px) translate(${currentX * speed}px, ${currentY * speed}px)`;
    });

    requestAnimationFrame(animateIngredients);
}

animateIngredients();

// ===== NEWSLETTER FORM HANDLER =====
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterInput.value;

    if (email) {
        // Send to secte.community@gmail.com
        const mailtoLink = `mailto:secte.community@gmail.com?subject=Newsletter Subscription&body=Email: ${encodeURIComponent(email)}`;
        window.location.href = mailtoLink;
        
        // Show success message
        alert(`Thank you for subscribing! Subscription request will be sent to secte.community@gmail.com`);
        newsletterInput.value = '';
    }
});

// ===== NAVBAR SCROLL EFFECT (OPTIONAL) =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR BETTER PERFORMANCE =====
// Alternative to scroll event for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');

            // Special handling for menu cards stagger
            if (entry.target.classList.contains('menu-card')) {
                const cards = entry.target.parentElement.querySelectorAll('.menu-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all elements that need reveal animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll(
        '.section-header, .tabs, .testimonial-left, .testimonial-right, .newsletter-title, .newsletter-subtitle, .newsletter-form, .footer-column'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// ===== SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS =====
if (!('scrollBehavior' in document.documentElement.style)) {
    const scrollToSmooth = (element) => {
        window.scrollTo({
            behavior: 'smooth',
            top: element.offsetTop - 80
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSmooth(target);
            }
        });
    });
}

// ===== LAZY LOADING IMAGES (PERFORMANCE OPTIMIZATION) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE: DEBOUNCE SCROLL EVENTS =====
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedReveal = debounce(revealElements, 10);
window.removeEventListener('scroll', revealElements);
window.addEventListener('scroll', debouncedReveal);

// ===== ACCESSIBILITY: KEYBOARD NAVIGATION FOR TABS =====
tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', (e) => {
        let newIndex = index;

        if (e.key === 'ArrowRight') {
            newIndex = index + 1 >= tabButtons.length ? 0 : index + 1;
        } else if (e.key === 'ArrowLeft') {
            newIndex = index - 1 < 0 ? tabButtons.length - 1 : index - 1;
        } else {
            return;
        }

        tabButtons[newIndex].focus();
        tabButtons[newIndex].click();
    });
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Luscious Restaurant Website - All scripts loaded successfully!');
