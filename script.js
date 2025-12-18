/* ========================================
   LUXURY GOLD 3D PORTFOLIO - SCRIPT.JS
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ========== LOADING SCREEN ==========
    const loader = document.getElementById('luxury-loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderPercent = document.querySelector('.loader-percent');

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);

            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initRevealAnimations();
                animateSkillBars();
            }, 500);
        }

        loaderProgress.style.width = progress + '%';
        loaderPercent.textContent = Math.floor(progress) + '%';
    }, 100);

    // ========== CUSTOM CURSOR ==========
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursorFollower && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-category');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.opacity = '0.3';
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.opacity = '0.5';
            });
        });
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', throttle(handleScroll, 100));

    // ========== MOBILE MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ACTIVE NAV LINK ==========
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

    // ========== TYPING EFFECT ==========
    const typedText = document.getElementById('typed-text');
    const professions = ['Frontend Developer', 'UI Developer', 'Problem Solver', 'Tech Innovator'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedText) return;

        const currentProfession = professions[professionIndex];

        if (isDeleting) {
            typedText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentProfession.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 1000);

    // ========== REVEAL ANIMATIONS ==========
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ========== SKILL BARS ANIMATION ==========
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = progress + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // ========== 3D TILT EFFECT ==========
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ========== STARS PROJECT VIDEO LOGIC ==========
    const starCards = document.querySelectorAll('.star-card');

    starCards.forEach(card => {
        const videoPlaceholder = card.querySelector('.video-placeholder');
        const video = card.querySelector('.star-video');

        if (videoPlaceholder && video) {
            // Play video on placeholder click
            videoPlaceholder.addEventListener('click', (e) => {
                e.preventDefault();
                stopAllVideos();
                card.classList.add('playing');
                video.play();
            });

            // Pause when clicking video
            video.addEventListener('click', () => {
                if (!video.paused) {
                    video.pause();
                    card.classList.remove('playing');
                }
            });
        }
    });

    function stopAllVideos() {
        starCards.forEach(c => {
            const v = c.querySelector('.star-video');
            if (v) {
                v.pause();
                v.currentTime = 0;
            }
            c.classList.remove('playing');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.star-card')) {
            stopAllVideos();
        }
    });

    // ========== MAGNETIC BUTTONS ==========
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========== PARALLAX EFFECT ==========
    const heroVisual = document.querySelector('.hero-visual');
    const floatingCards = document.querySelectorAll('.floating-card');

    if (heroVisual && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;

            floatingCards.forEach((card, index) => {
                const depth = (index + 1) * 0.5;
                card.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
            });

            // Hero Image 3D Tilt
            const imageFrame = document.querySelector('.image-frame');
            if (imageFrame) {
                const rect = heroVisual.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((mouseY - centerY) / 20) * -1; // Invert for natural feel
                const rotateY = (mouseX - centerX) / 20;

                imageFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });

        // Reset tilt on mouse leave
        heroVisual.addEventListener('mouseleave', () => {
            const imageFrame = document.querySelector('.image-frame');
            if (imageFrame) {
                imageFrame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        });
    }

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== FORM HANDLING ==========
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                e.preventDefault();
                showNotification('Please fill in all fields', 'error');
                return;
            }

            showNotification('Sending your message...', 'info');
        });
    }

    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;

        const colors = {
            info: '#D4AF37',
            success: '#10b981',
            error: '#ef4444'
        };

        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle'
        };

        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: colors[type],
            color: 'white',
            padding: '16px 24px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: '9999',
            transform: 'translateX(120%)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    }

    // ========== UTILITY FUNCTIONS ==========
    function throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // ========== RESIZE HANDLER ==========
    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth >= 992 && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250));

    // ========== KEYBOARD NAVIGATION ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ========== PRELOAD IMAGES ==========
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // ========== CONSOLE GREETING ==========
    console.log('%c🚀 Ahmad Azriel Portfolio', 'color: #D4AF37; font-size: 24px; font-weight: bold;');
    console.log('%cBuilt with passion and gold ✨', 'color: #FFD700; font-size: 14px;');
});



document.querySelectorAll('.psv-card').forEach(card => {
  const video = card.querySelector('video');
  const playBtn = card.querySelector('.psv-play');

  card.addEventListener('click', () => {
    if (video.paused) {
      // Pause video lain
      document.querySelectorAll('.psv-card video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.muted = true;
          v.closest('.psv-card').querySelector('.psv-play').textContent = '▶';
        }
      });

      video.muted = false;
      video.play();
      playBtn.textContent = '⏸';
    } else {
      video.pause();
      playBtn.textContent = '▶';
    }
  });
});


document.querySelectorAll('.lux-music-card').forEach(card => {
  const audio = card.querySelector('audio');
  const btn = card.querySelector('.lux-music-btn');

  btn.addEventListener('click', e => {
    e.stopPropagation();

    document.querySelectorAll('.lux-music-card').forEach(c => {
      if (c !== card) {
        c.classList.remove('playing');
        c.querySelector('audio').pause();
        c.querySelector('.lux-music-btn').textContent = '▶';
      }
    });

    if (audio.paused) {
      audio.play();
      card.classList.add('playing');
      btn.textContent = '⏸';
    } else {
      audio.pause();
      card.classList.remove('playing');
      btn.textContent = '▶';
    }
  });
});


document.querySelectorAll('.lux-faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.lux-faq-item');

    document.querySelectorAll('.lux-faq-item').forEach(el => {
      if (el !== item) el.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});



const steps = document.querySelectorAll('[data-step]');
const progress = document.querySelector('.workflow-progress');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      const index = [...steps].indexOf(entry.target) + 1;
      progress.style.height = `${(index / steps.length) * 100}%`;
    }
  });
}, { threshold: 0.4 });

steps.forEach(step => observer.observe(step));


const revealItems = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(item => revealObserver.observe(item));

