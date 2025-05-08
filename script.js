// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Effect
const typingElement = document.getElementById('typing-text');
const typingText = "I'm just learning how to start coding";
let typingIndex = 0;

function typeText() {
    if (typingIndex < typingText.length) {
        typingElement.textContent += typingText.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeText, 50);
    } else {
        typingElement.classList.add('typing-done');
    }
}
typeText();

// Scroll Progress Bar
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
}
window.addEventListener('scroll', updateProgressBar);

// Intersection Observer for Fade-In Sections with Stagger
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.querySelectorAll('.card').forEach((card, i) => {
                    card.style.animationDelay = `${i * 0.2}s`;
                    card.style.opacity = '1';
                });
            }, index * 200);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeObserver.observe(section);
});

// Intersection Observer for Skill Bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-box div');
            skillBars.forEach(bar => {
                if (!bar.dataset.animated) {
                    const targetWidth = parseInt(bar.textContent);
                    bar.style.width = '0%';
                    bar.textContent = '0%';
                    let currentWidth = 0;
                    const increment = targetWidth / 100;
                    const interval = setInterval(() => {
                        if (currentWidth >= targetWidth) {
                            clearInterval(interval);
                            bar.textContent = `${targetWidth}%`;
                        } else {
                            currentWidth += increment;
                            bar.style.width = `${currentWidth}%`;
                            bar.textContent = `${Math.round(currentWidth)}%`;
                        }
                    }, 10);
                    bar.dataset.animated = 'true';
                }
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillSection = document.querySelector('#skill');
skillObserver.observe(skillSection);

// Intersection Observer for Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(card => {
    revealObserver.observe(card);
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = document.body.classList.contains('light-theme') ? 'rgba(255, 255, 255, 1)' : 'rgba(7, 7, 7, 1)';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 255, 0.3)';
    } else {
        nav.style.backgroundColor = document.body.classList.contains('light-theme') ? 'rgba(255, 255, 255, 0.95)' : 'rgba(7, 7, 7, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#00f' },
        shape: { type: 'circle' },
        opacity: { value: 0.7, random: true },
        size: { value: 5, random: true },
        line_linked: { enable: true, distance: 150, color: '#00f', opacity: 0.6, width: 1.5 },
        move: { enable: true, speed: 3, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: true }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 200, line_linked: { opacity: 0.8 } }, push: { particles_nb: 6 } }
    },
    retina_detect: true
});

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.carousel .card');
let currentIndex = 0;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 30; // Including margin
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.querySelector('.left-arrow').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

document.querySelector('.right-arrow').addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Add glow effect to interactive elements
document.querySelectorAll('.bnt, .content a, .pra p a, .flip-back a, .social-icon').forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.boxShadow = '0 0 15px rgba(0, 0, 255, 0.7)';
    });
    element.addEventListener('mouseout', () => {
        element.style.boxShadow = 'none';
    });
});

// Logo Bounce Animation
const logo = document.querySelector('.logo');

function bounceLogo() {
    logo.style.transition = 'transform 0.5s ease';
    logo.style.transform = 'scale(1.1)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 500);
    setTimeout(bounceLogo, 5000); // Repeat every 5 seconds
}
bounceLogo();