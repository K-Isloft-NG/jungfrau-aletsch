// ================================================================
//  timeline.js — Logique de la page Histoire
//  Jungfrau-Aletsch V14
//  Dépendances : animations.js
// ================================================================

(function () {
    'use strict';

    // ── Toggle onglets patrimoine / géologie ──────────────────────
    window.switchTab = function (tabName) {
        var heritage = document.getElementById('timeline-heritage');
        var geology  = document.getElementById('timeline-geology');

        // Masquer les deux panneaux (class CSS + attribut HTML)
        heritage.classList.add('hidden');
        heritage.setAttribute('hidden', '');
        geology.classList.add('hidden');
        geology.setAttribute('hidden', '');

        document.getElementById('tab-heritage').classList.remove('active');
        document.getElementById('tab-geology').classList.remove('active');

        // Afficher le panneau actif (retirer class CSS + attribut HTML)
        var active = document.getElementById('timeline-' + tabName);
        active.classList.remove('hidden');
        active.removeAttribute('hidden');
        document.getElementById('tab-' + tabName).classList.add('active');

        history.replaceState(null, null, '#' + (tabName === 'heritage' ? 'patrimoine' : 'geologie'));

        if (window.lucide) lucide.createIcons();
    };

    // ── Accordéon ─────────────────────────────────────────────────
    window.toggleAccordion = function (btn) {
        var container = btn.nextElementSibling;
        var chevron = btn.querySelector('.chevron');
        var span = btn.querySelector('span');
        var isFr = document.documentElement.lang === 'fr';

        if (container.classList.contains('open')) {
            container.classList.remove('open');
            chevron.classList.remove('rotate');
            span.textContent = isFr ? 'En savoir plus' : 'Learn more';
        } else {
            container.classList.add('open');
            chevron.classList.add('rotate');
            span.textContent = isFr ? 'Voir moins' : 'See less';
        }
    };

    // ── Support hash au chargement ────────────────────────────────
    if (location.hash === '#geologie' || location.hash === '#geology') {
        window.switchTab('geology');
    }

    // ── Lightbox ─────────────────────────────────────────────────
    document.addEventListener('click', function(e) {
        var img = e.target.closest('.timeline-zoomable');
        if (!img) return;
        e.stopPropagation();
        var lightbox = document.getElementById('timeline-lightbox');
        var lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });

    window.closeLightbox = function() {
        var lightbox = document.getElementById('timeline-lightbox');
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

})();
