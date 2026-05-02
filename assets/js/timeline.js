// ================================================================
//  timeline.js — Logique de la page Histoire
//  Jungfrau-Aletsch V14
//  Dépendances : animations.js
// ================================================================

(function () {
    'use strict';

    // ── Toggle onglets patrimoine / géologie ──────────────────────
    window.switchTab = function (tabName) {
        document.getElementById('timeline-heritage').classList.add('hidden');
        document.getElementById('timeline-geology').classList.add('hidden');

        document.getElementById('tab-heritage').classList.remove('active');
        document.getElementById('tab-geology').classList.remove('active');

        document.getElementById('timeline-' + tabName).classList.remove('hidden');
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

})();
