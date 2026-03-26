document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    // Select all elements with the 'animate-on-scroll' class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Options for the observer
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Callback function when an element intersects
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS transition
                entry.target.classList.add('visible');

                // Optional: Stop observing once the animation has triggered
                // observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate scroll position factoring in sticky navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
