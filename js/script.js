// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {

    // 1. Animasi Fade-In saat di-scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Elemen muncul saat 10% terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hanya animasi sekali
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));


    // 2. Smooth Scroll untuk Link Navigasi
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Offset untuk navbar fixed
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Efek Navbar saat di-scroll (Opsional: Menambah shadow)
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

});