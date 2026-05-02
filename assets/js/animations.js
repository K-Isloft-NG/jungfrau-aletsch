// ================================================================
//  animations.js — Comportements partagés — Jungfrau-Aletsch V14
//  Chargé par toutes les pages (après le CDN Lucide et i18n.js)
// ================================================================

(function () {
    'use strict';

    // ── Lucide icons ─────────────────────────────────────────────
    if (window.lucide) {
        lucide.createIcons();
    }

    // ── Fade-up IntersectionObserver ─────────────────────────────
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(function (el) {
        observer.observe(el);
    });

    // Exposé globalement pour les pages qui ajoutent des éléments .fade-up dynamiquement
    window.JA_Observer = observer;

    // ── Menu mobile ───────────────────────────────────────────────
    var burgerBtn  = document.querySelector('header button.md\\:hidden');
    var mobileMenu = document.getElementById('mobile-menu');
    var closeBtn   = document.getElementById('close-menu');

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('hidden-menu-state', 'translate-x-full');
        document.body.style.overflow = 'hidden';
        if (window.lucide) window.lucide.createIcons();
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('translate-x-full');
        setTimeout(function () {
            mobileMenu.classList.add('hidden-menu-state');
        }, 300);
        document.body.style.overflow = '';
    }

    // Exposés globalement (utilisés par les boutons de langue inline)
    window.openMobileMenu  = openMobileMenu;
    window.closeMobileMenu = closeMobileMenu;

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', openMobileMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
        document.querySelectorAll('.mobile-link').forEach(function (link) {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // ── Indicateur de page active dans la navbar (desktop uniquement) ─
    var currentPage = location.pathname.split('/').pop() || 'index.html';
    var currentHash = location.hash;
    document.querySelectorAll('header nav a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        var parts    = href.split('#');
        var hrefPage = parts[0];
        var hrefHash = parts[1] ? '#' + parts[1] : '';
        var pageMatches = hrefPage === currentPage || (currentPage === '' && hrefPage === 'index.html');
        if (!pageMatches) return;
        // Si l'URL a un hash, seul le lien avec le même hash est actif
        // Sinon, seul le lien sans hash est actif
        if (currentHash ? hrefHash === currentHash : hrefHash === '') {
            link.classList.add('nav-active');
        }
    });

})();
