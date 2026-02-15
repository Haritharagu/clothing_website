document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);

        // Update Scroll Progress
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollPercent = (lenis.scroll / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }

        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP Initialization
    gsap.registerPlugin(ScrollTrigger);

    // 3. Loader Animation
    const loadTimeline = gsap.timeline();
    loadTimeline.to('.loader-text', {
        opacity: 0,
        y: -10,
        duration: 1,
        ease: 'power3.inOut'
    })
        .to('.loader', {
            yPercent: -100,
            duration: 1.2,
            ease: 'expo.inOut'
        })
        .from('.hero-bg img', {
            scale: 1.2,
            duration: 2,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-title span', {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1.2')
        .from('.hero-tagline, .scroll-indicator', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5');

    // 4. Split Text for Headlines (Simple Implementation)
    const splitTextElements = document.querySelectorAll('.split-text');
    splitTextElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = text.split('').map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    });

    // 5. Horizontal Scroll Pinning
    const horizontalSection = document.querySelector('.collection-pinned');
    const horizontalContainer = document.querySelector('.collection-grid-horizontal');

    if (horizontalSection && horizontalContainer) {
        let scrollWidth = horizontalContainer.offsetWidth - window.innerWidth + (window.innerWidth * 0.14); // padding offset

        gsap.to(horizontalContainer, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: horizontalSection,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => "+=" + scrollWidth,
                invalidateOnRefresh: true
            }
        });
    }

    // 6. Magnetic Interactions
    const magneticElements = document.querySelectorAll('.submit-btn, .item-img-wrapper');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(el, {
                x: x * 40,
                y: y * 40,
                rotate: x * 5,
                duration: 1,
                ease: 'power4.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                rotate: 0,
                duration: 1,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // 7. Advanced Letter Reveal
    const revealElements = document.querySelectorAll('.huge-title, .hero-title');
    revealElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = text.split('').map(char => `<span class="letter">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

        gsap.from(el.querySelectorAll('.letter'), {
            y: 100,
            rotate: 15,
            opacity: 0,
            stagger: 0.05,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
            }
        });
    });

    // 8. Visual Break Parallax
    gsap.to('.visual-break .parallax-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.visual-break',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // 9. Form Interactive Stagger
    const formGroups = document.querySelectorAll('.form-group');
    gsap.from(formGroups, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
        }
    });
});
