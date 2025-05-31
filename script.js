// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 60; // Adjust based on navbar height
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// Enhanced Typing Effect with Loop
const typingElement = document.getElementById("typing-text");
const textToType = "saya adalah pelajar yang menduduki jurusan IT.";
let isTyping = true;
let charIndex = 0;
let typingInterval;

function typeAnimation() {
  // Clear any existing interval
  clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    // Typing forward
    if (isTyping) {
      if (charIndex < textToType.length) {
        typingElement.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;
      } else {
        // Pause before starting to delete
        isTyping = false;
        clearInterval(typingInterval);
        setTimeout(() => {
          typeAnimation();
        }, 2000); // 2 second pause when fully typed
      }
    }
    // Deleting
    else {
      if (charIndex > 0) {
        typingElement.textContent = textToType.substring(0, charIndex);
        charIndex--;
      } else {
        // Reset to typing mode when all text is deleted
        isTyping = true;
        clearInterval(typingInterval);
        setTimeout(() => {
          typeAnimation();
        }, 1000); // 1 second pause before typing again
      }
    }
  }, 111); // Speed of typing/deleting (milliseconds)
}

// Start the typing animation
typeAnimation();

// Scroll Progress Bar
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = scrollPercent + "%";
}
window.addEventListener("scroll", updateProgressBar);

// Intersection Observer for Fade-In Sections with Stagger
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.querySelectorAll(".card").forEach((card, i) => {
            card.style.animationDelay = `${i * 0.2}s`;
            card.style.opacity = "1";
          });
        }, index * 200);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in-section").forEach((section) => {
  fadeObserver.observe(section);
});

// Improved Skill Bar Animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-box div");
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            if (!bar.style.width) {
              const targetWidth = bar.textContent;
              bar.style.width = "0%";

              requestAnimationFrame(() => {
                bar.style.width = targetWidth;
              });
            }
          }, index * 200);
        });
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }
);

document.querySelectorAll(".skill-bar").forEach((bar) => {
  skillObserver.observe(bar);
});

// Intersection Observer for Reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach((card) => {
  revealObserver.observe(card);
});

// Back to Top Button
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Enhanced mobile menu functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
let isMenuOpen = false;

hamburger.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  navLinks.classList.toggle("show");

  if (isMenuOpen) {
    navLinks.style.animation = "slideIn 0.3s forwards";
  } else {
    navLinks.style.animation = "slideOut 0.3s forwards";
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    isMenuOpen &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    isMenuOpen = false;
    navLinks.classList.remove("show");
  }
});

// Close menu when clicking a link
document.querySelectorAll("#nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    isMenuOpen = false;
  });
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// Particles.js Configuration
let particleNumber = window.innerWidth < 480 ? 50 : 110;
particlesJS("particles-js", {
  particles: {
    number: {
      value: particleNumber,
      density: { enable: true, value_area: 800 },
    },
    color: { value: "#00f" },
    shape: { type: "circle" },
    opacity: { value: 0.7, random: true },
    size: { value: 5, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f",
      opacity: 0.6,
      width: 1.5,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: true,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.8 } },
      push: { particles_nb: 6 },
    },
  },
  retina_detect: true,
});

// Carousel Functionality
const carousel = document.querySelector(".carousel");
const cards = document.querySelectorAll(".carousel .card");
let currentIndex = 0;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 30; // Including margin
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.querySelector(".left-arrow").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Add glow effect to interactive elements
document
  .querySelectorAll(".bnt, .content a, .pra p a, .flip-back a, .social-icon")
  .forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.style.boxShadow = "0 0 15px rgba(0, 0, 255, 0.7)";
    });
    element.addEventListener("mouseout", () => {
      element.style.boxShadow = "none";
    });
  });

// Logo Bounce Animation
const logo = document.querySelector(".logo");

function bounceLogo() {
  logo.style.transition = "transform 0.5s ease";
  logo.style.transform = "scale(1.1)";
  setTimeout(() => {
    logo.style.transform = "scale(1)";
  }, 500);
  setTimeout(bounceLogo, 5000); // Repeat every 5 seconds
}
bounceLogo();

// Loading Animation
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "none";
});

// Performance Optimization for Animations
document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });
});

// Debounced Scroll Handler
function debounce(func, wait) {
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

// Optimized Scroll Events
const scrollHandler = debounce(() => {
  updateProgressBar();
  updateBackToTopButton();
}, 10);

window.addEventListener("scroll", scrollHandler);

// Add animation keyframes to your CSS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes slideIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
}`,
  styleSheet.cssRules.length
);

styleSheet.insertRule(
  `
  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
}`,
  styleSheet.cssRules.length
);
