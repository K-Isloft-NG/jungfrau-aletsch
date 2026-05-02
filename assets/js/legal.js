// ================================================================
//  legal.js — Scrollspy sidebar pour mentions-legales & confidentialite
//  Jungfrau-Aletsch V14
//  Dépendances : animations.js
// ================================================================

(function () {
    'use strict';

    var sections = document.querySelectorAll('.scroll-offset');
    var tocLinks = document.querySelectorAll('.toc-link');

    if (!sections.length || !tocLinks.length) return;

    var scrollSpy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                var id = e.target.id;
                tocLinks.forEach(function (link) {
                    link.classList.toggle('active', link.dataset.section === id);
                });
            }
        });
    }, { rootMargin: '-120px 0px -60% 0px', threshold: 0 });

    sections.forEach(function (s) { scrollSpy.observe(s); });

})();
