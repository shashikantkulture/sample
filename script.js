document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant cursor movement
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower movement
    function animateCursor() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects on links and buttons
    const hoverElements = document.querySelectorAll('a, button, .product-img-wrapper, .gallery-item, .catalog-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const fadeElements = document.querySelectorAll('.fade-up-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));

    // Parallax scrolling effect
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    const parallaxImgs = document.querySelectorAll('.parallax-img');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        
        // Hero Background Parallax
        parallaxBgs.forEach(bg => {
            bg.style.transform = `translateY(${scrollY * 0.4}px)`;
        });
        
        // Image Parallax within sections
        parallaxImgs.forEach(img => {
            const container = img.closest('.parallax-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                const containerTop = rect.top;
                const windowHeight = window.innerHeight;
                
                // Only animate if in viewport
                if (containerTop < windowHeight && rect.bottom > 0) {
                    const progress = 1 - (rect.bottom / (windowHeight + rect.height));
                    // Move image up slightly as user scrolls down
                    const yPos = -10 + (progress * 15);
                    img.style.transform = `translateY(${yPos}%)`;
                }
            }
        });
    });
});
