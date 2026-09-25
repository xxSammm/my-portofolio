// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Animasi Fade-In saat di-scroll
    // ==========================================
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


    // ==========================================
    // 2. Smooth Scroll untuk Link Navigasi
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Abaikan jika hanya '#'

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Offset untuk navbar fixed
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 3. Efek Navbar saat di-scroll (Shadow)
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }


    // ==========================================
    // 4. Dynamic Back Button (Halaman Project)
    // ==========================================
    const backLink = document.querySelector('.back-link');

    if (backLink) {
        const referrer = document.referrer;
        const currentPath = window.location.pathname;
        
        // Cek apakah user datang dari halaman project lain
        const isFromProject = referrer.includes('/projects/') && !referrer.includes(currentPath);
        
        if (isFromProject) {
            // Jika datang dari project lain, kembali ke project tersebut
            backLink.href = referrer;
        } else {
            // Default: kembali ke section projects di index.html
            backLink.href = '../index.html#projects';
        }
    }


    // ==========================================
    // 5. Hamburger Menu untuk Mobile
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksContainer) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            
            // Mencegah scroll pada body saat menu terbuka
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        };

        // Buka/tutup menu saat hamburger diklik
        hamburger.addEventListener('click', toggleMenu);

        // Tutup menu saat overlay gelap diklik
        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMenu);
        }

        // Tutup menu otomatis saat salah satu link navigasi diklik
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

});