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

    // 5. Parallax Effects
    const parallaxImages = document.querySelectorAll('[data-speed]');
    parallaxImages.forEach(el => {
        const speed = el.getAttribute('data-speed');
        gsap.to(el, {
            y: (index, target) => {
                const height = target.offsetHeight;
                return height * speed;
            },
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 6. Mask Animation for Images
    const maskElements = document.querySelectorAll('.animate-mask');
    maskElements.forEach(el => {
        gsap.to(el, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.inOut',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true
            }
        });
    });

    // 7. Scroll Reveal for Text Blocks
    gsap.utils.toArray('.about-text-block, .collection-header h2, .contact h2').forEach(text => {
        gsap.from(text, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
            }
        });
    });

    // 8. Collection Hover Motion (Mouse move subtle interaction)
    const collectionItems = document.querySelectorAll('.collection-item');
    collectionItems.forEach(item => {
        const img = item.querySelector('img');
        item.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(img, {
                x: x * 30,
                y: y * 30,
                scale: 1.15,
                duration: 0.8,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(img, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    });

    // 9. Form Interactive Stagger
    const formGroups = document.querySelectorAll('.form-group');
    gsap.from(formGroups, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
        }
    });
});
