/* ════════════════════════════════════════════════════════════
   accessibility-widget.js — Jungfrau-Aletsch
   Widget d'accessibilité WCAG 2.2 : bouton flottant + panneau
   10 modes persistés via localStorage, respect des media queries OS
   ════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    var STORAGE_KEY = 'a11y-prefs';
    var hasExistingPrefs = false;
    try { hasExistingPrefs = localStorage.getItem(STORAGE_KEY) !== null; } catch (e) {}

    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch (e) {}

    var readingMaskEl = null;

    // ─── Liste ordonnée des 10 fonctionnalités ──────────────────
    var FEATURES = [
        { id: 'font-increase',   icon: 'a-large-small',   title: 'Agrandir le texte',       desc: '3 niveaux : normal, moyen, grand', multi: true },
        { id: 'high-contrast',   icon: 'contrast',        title: 'Contraste élevé',         desc: 'Fond sombre, texte clair' },
        { id: 'dyslexia-font',   icon: 'type',            title: 'Police Dyslexie',         desc: 'Police OpenDyslexic' },
        { id: 'letter-spacing',  icon: 'move-horizontal', title: 'Espacement accru',        desc: 'Lettres et mots espacés' },
        { id: 'color-blind',     icon: 'eye-off',         title: 'Mode daltonien',          desc: 'Désaturation des couleurs' },
        { id: 'underline-links', icon: 'underline',       title: 'Souligner les liens',     desc: 'Tous les liens soulignés' },
        { id: 'big-cursor',      icon: 'mouse-pointer',   title: 'Curseur agrandi',         desc: 'Pointeur plus visible' },
        { id: 'stop-animations', icon: 'pause',           title: 'Stopper les animations',  desc: 'Désactive les mouvements' },
        { id: 'reading-mask',    icon: 'scan-line',       title: 'Masque de lecture',       desc: 'Bande de lecture guidée' },
        { id: 'focus-highlight', icon: 'focus',           title: 'Focus clavier visible',   desc: 'Contour renforcé au clavier' },
        { id: 'text-to-speech',  icon: 'volume-2',        title: 'Écouter le contenu',      desc: 'Cliquez sur un texte pour l\'écouter' }
    ];

    // ─── Text-to-Speech : état module ───────────────────────────
    var ttsActive = false;
    var ttsUtterance = null;
    var ttsListenerAttached = false;
    var ttsPlayerCreated = false;

    var FONT_LABELS = ['', 'Moyen', 'Grand'];

    // ─── Persistance ────────────────────────────────────────────
    function savePrefs() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) {}
    }

    // ─── Application des modes sur <html> / <body> ──────────────
    function applyAll() {
        var html = document.documentElement;
        var body = document.body;
        if (!body) return;

        // Taille de texte : classe sur <html>
        html.classList.remove('a11y-font-medium', 'a11y-font-large');
        var lvl = prefs['font-increase'] || 0;
        if (lvl === 1) html.classList.add('a11y-font-medium');
        if (lvl === 2) html.classList.add('a11y-font-large');

        // Autres modes : classes sur <body>
        var bodyFeatures = [
            'high-contrast', 'dyslexia-font', 'letter-spacing', 'color-blind',
            'underline-links', 'big-cursor', 'stop-animations', 'focus-highlight'
        ];
        bodyFeatures.forEach(function (f) {
            body.classList.toggle('a11y-' + f, !!prefs[f]);
        });

        // Masque de lecture : overlay dynamique
        if (prefs['reading-mask']) enableReadingMask();
        else                        disableReadingMask();

        // Text-to-Speech : mode lecture audio au clic
        if (prefs['text-to-speech']) enableTTS();
        else                          disableTTS();

        updateToggles();
    }

    // ─── Rafraîchit l'état visuel des toggles ───────────────────
    function updateToggles() {
        var panel = document.getElementById('a11y-panel');
        if (!panel) return;
        panel.querySelectorAll('.a11y-option').forEach(function (btn) {
            var f = btn.dataset.feature;
            var isActive;
            if (f === 'font-increase') {
                var fontLvl = prefs[f] || 0;
                isActive = fontLvl > 0;
                var stateEl = btn.querySelector('.a11y-option-state');
                if (stateEl) stateEl.textContent = FONT_LABELS[fontLvl] || '';
            } else {
                isActive = !!prefs[f];
            }
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            btn.classList.toggle('a11y-option-active', isActive);
        });
    }

    // ─── Handlers de toggles ────────────────────────────────────
    function handleToggle(feature) {
        if (feature === 'font-increase') {
            var lvl = prefs[feature] || 0;
            lvl = (lvl + 1) % 3;
            if (lvl === 0) delete prefs[feature];
            else           prefs[feature] = lvl;
        } else {
            if (prefs[feature]) delete prefs[feature];
            else                prefs[feature] = true;
        }
        savePrefs();
        applyAll();
    }

    function resetAll() {
        prefs = {};
        savePrefs();
        applyAll();
    }

    // ─── Masque de lecture ──────────────────────────────────────
    function onMouseMoveMask(e) {
        if (!readingMaskEl) return;
        readingMaskEl.style.top = (e.clientY - 50) + 'px';
    }

    function enableReadingMask() {
        if (readingMaskEl) return;
        readingMaskEl = document.createElement('div');
        readingMaskEl.className = 'a11y-reading-mask-slit';
        readingMaskEl.setAttribute('aria-hidden', 'true');
        readingMaskEl.style.top = (window.innerHeight / 2 - 50) + 'px';
        document.body.appendChild(readingMaskEl);
        document.addEventListener('mousemove', onMouseMoveMask);
    }

    function disableReadingMask() {
        if (!readingMaskEl) return;
        document.removeEventListener('mousemove', onMouseMoveMask);
        readingMaskEl.remove();
        readingMaskEl = null;
    }

    // ─── Text-to-Speech (Web Speech API) ────────────────────────
    var TTS_READABLE_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, li, blockquote, td, dd, dt, figcaption, .trail-description';

    function ttsClickHandler(e) {
        if (!ttsActive) return;

        var target = e.target.closest(TTS_READABLE_SELECTOR);
        if (!target) return;
        // Exclure les zones interactives du widget, navbar, footer, player
        if (target.closest('#a11y-panel, #a11y-toggle, #tts-player, header, nav, footer, button, [role="button"]')) return;

        var text = target.textContent.trim();
        if (!text) return;

        e.preventDefault();
        e.stopPropagation();

        // Stop la lecture en cours et nettoyer le surlignage
        try { window.speechSynthesis.cancel(); } catch (err) {}
        var prev = document.querySelector('.tts-reading');
        if (prev) prev.classList.remove('tts-reading');

        target.classList.add('tts-reading');

        // Détection langue depuis <html lang>
        var lang = (document.documentElement.lang || 'fr').toLowerCase();
        var speechLang = lang.indexOf('en') === 0 ? 'en-US' : 'fr-FR';

        ttsUtterance = new SpeechSynthesisUtterance(text);
        ttsUtterance.lang = speechLang;
        ttsUtterance.rate = parseFloat(localStorage.getItem('tts-rate') || '1');
        ttsUtterance.pitch = 1;

        // Choisir une voix dans la langue
        try {
            var voices = window.speechSynthesis.getVoices();
            var voice = voices.find(function (v) { return v.lang && v.lang.toLowerCase().indexOf(lang) === 0; });
            if (voice) ttsUtterance.voice = voice;
        } catch (err) {}

        ttsUtterance.onend = function () {
            var reading = document.querySelector('.tts-reading');
            if (reading) reading.classList.remove('tts-reading');
            hideTTSPlayer();
        };
        ttsUtterance.onerror = ttsUtterance.onend;

        showTTSPlayer(text);
        try { window.speechSynthesis.speak(ttsUtterance); } catch (err) {}
    }

    function enableTTS() {
        if (ttsActive) return;
        ttsActive = true;
        document.body.classList.add('a11y-tts-active');
        if (!ttsPlayerCreated) {
            createTTSPlayer();
            ttsPlayerCreated = true;
        }
        if (!ttsListenerAttached) {
            // Capture phase pour intercepter avant les liens
            document.addEventListener('click', ttsClickHandler, true);
            ttsListenerAttached = true;
        }
        // Pré-charger les voix (asynchrones dans la plupart des navigateurs)
        if (window.speechSynthesis) {
            try { window.speechSynthesis.getVoices(); } catch (err) {}
        }
    }

    function disableTTS() {
        if (!ttsActive) return;
        ttsActive = false;
        document.body.classList.remove('a11y-tts-active');
        try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (err) {}
        var reading = document.querySelector('.tts-reading');
        if (reading) reading.classList.remove('tts-reading');
        hideTTSPlayer();
    }

    function createTTSPlayer() {
        if (document.getElementById('tts-player')) return;
        var rate = parseFloat(localStorage.getItem('tts-rate') || '1');
        var player = document.createElement('div');
        player.id = 'tts-player';
        player.className = 'tts-player a11y-hidden';
        player.setAttribute('role', 'region');
        player.setAttribute('aria-label', 'Lecteur audio');
        player.innerHTML =
            '<div class="tts-player-inner">' +
                '<div class="tts-player-text" id="tts-current-text"></div>' +
                '<div class="tts-player-controls">' +
                    '<button type="button" id="tts-pause-btn" aria-label="Pause / Reprendre" class="tts-btn">' +
                        '<i data-lucide="pause" class="w-4 h-4"></i>' +
                    '</button>' +
                    '<button type="button" id="tts-stop-btn" aria-label="Arrêter la lecture" class="tts-btn">' +
                        '<i data-lucide="square" class="w-4 h-4"></i>' +
                    '</button>' +
                    '<div class="tts-speed">' +
                        '<button type="button" id="tts-speed-down" aria-label="Diminuer la vitesse" class="tts-btn-sm">−</button>' +
                        '<span id="tts-speed-label">' + rate + 'x</span>' +
                        '<button type="button" id="tts-speed-up" aria-label="Augmenter la vitesse" class="tts-btn-sm">+</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        document.body.appendChild(player);

        document.getElementById('tts-pause-btn').addEventListener('click', ttsTogglePause);
        document.getElementById('tts-stop-btn').addEventListener('click', ttsStop);
        document.getElementById('tts-speed-down').addEventListener('click', function () { ttsChangeSpeed(-0.25); });
        document.getElementById('tts-speed-up').addEventListener('click', function () { ttsChangeSpeed(0.25); });

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            try { window.lucide.createIcons(); } catch (e) {}
        }
    }

    function showTTSPlayer(text) {
        var player = document.getElementById('tts-player');
        if (!player) return;
        var label = document.getElementById('tts-current-text');
        if (label) label.textContent = text.length > 80 ? text.substring(0, 80) + '…' : text;
        player.classList.remove('a11y-hidden');
    }

    function hideTTSPlayer() {
        var player = document.getElementById('tts-player');
        if (player) player.classList.add('a11y-hidden');
    }

    function ttsTogglePause() {
        if (!window.speechSynthesis) return;
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        else if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
    }

    function ttsStop() {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        var reading = document.querySelector('.tts-reading');
        if (reading) reading.classList.remove('tts-reading');
        hideTTSPlayer();
    }

    function ttsChangeSpeed(delta) {
        var current = parseFloat(localStorage.getItem('tts-rate') || '1');
        var newRate = Math.max(0.5, Math.min(2, Math.round((current + delta) * 100) / 100));
        localStorage.setItem('tts-rate', newRate.toString());
        var label = document.getElementById('tts-speed-label');
        if (label) label.textContent = newRate + 'x';
        // Si une lecture est en cours, relancer avec la nouvelle vitesse
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            var reading = document.querySelector('.tts-reading');
            if (reading) {
                var text = reading.textContent.trim();
                window.speechSynthesis.cancel();
                ttsUtterance = new SpeechSynthesisUtterance(text);
                var lang = (document.documentElement.lang || 'fr').toLowerCase();
                ttsUtterance.lang = lang.indexOf('en') === 0 ? 'en-US' : 'fr-FR';
                ttsUtterance.rate = newRate;
                ttsUtterance.pitch = 1;
                ttsUtterance.onend = function () {
                    var r = document.querySelector('.tts-reading');
                    if (r) r.classList.remove('tts-reading');
                    hideTTSPlayer();
                };
                window.speechSynthesis.speak(ttsUtterance);
            }
        }
    }

    // ─── Construction du HTML du panneau ────────────────────────
    function buildOptionsHTML() {
        return FEATURES.map(function (f) {
            return (
                '<button class="a11y-option" data-feature="' + f.id + '" aria-pressed="false" type="button">' +
                    '<span class="a11y-option-icon" aria-hidden="true"><i data-lucide="' + f.icon + '"></i></span>' +
                    '<span class="a11y-option-info">' +
                        '<span class="a11y-option-title">' + f.title + '</span>' +
                        '<span class="a11y-option-desc">' + f.desc + '</span>' +
                        (f.multi ? '<span class="a11y-option-state"></span>' : '') +
                    '</span>' +
                    '<span class="a11y-option-toggle" aria-hidden="true"><span class="a11y-toggle-indicator"></span></span>' +
                '</button>'
            );
        }).join('');
    }

    function buildPanelHTML() {
        return (
            '<div class="a11y-panel-header">' +
                '<h2 id="a11y-title">Accessibilité</h2>' +
                '<button class="a11y-close" aria-label="Fermer le panneau" type="button">&times;</button>' +
            '</div>' +
            '<div class="a11y-panel-body">' + buildOptionsHTML() + '</div>' +
            '<div class="a11y-panel-info">' +
                '<i data-lucide="info" aria-hidden="true"></i>' +
                '<span>Les vidéos du site disposent de sous-titres YouTube intégrés (CC).</span>' +
            '</div>' +
            '<div class="a11y-panel-footer">' +
                '<button id="a11y-reset" class="a11y-reset-btn" type="button">' +
                    '<i data-lucide="rotate-ccw" aria-hidden="true"></i>' +
                    '<span>Réinitialiser tout</span>' +
                '</button>' +
            '</div>'
        );
    }

    function injectHTML() {
        // Ne pas injecter deux fois (navigation SPA, etc.)
        if (document.getElementById('a11y-toggle')) return;

        var btn = document.createElement('button');
        btn.id = 'a11y-toggle';
        btn.className = 'a11y-toggle-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', "Options d'accessibilité");
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'a11y-panel');
        btn.setAttribute('title', 'Accessibilité');
        btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">' +
                '<path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143m-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z"/>' +
                '<path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8"/>' +
            '</svg>';
        document.body.appendChild(btn);

        var panel = document.createElement('div');
        panel.id = 'a11y-panel';
        panel.className = 'a11y-panel a11y-hidden';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-labelledby', 'a11y-title');
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML = buildPanelHTML();
        document.body.appendChild(panel);

        // Remplace les <i data-lucide="..."> par les vraies SVG si Lucide est chargé
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            try { window.lucide.createIcons(); } catch (e) {}
        }
    }

    // ─── Ouverture / fermeture du panneau ───────────────────────
    function openPanel() {
        var btn = document.getElementById('a11y-toggle');
        var panel = document.getElementById('a11y-panel');
        if (!btn || !panel) return;
        panel.classList.remove('a11y-hidden');
        panel.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
    }
    function closePanel() {
        var btn = document.getElementById('a11y-toggle');
        var panel = document.getElementById('a11y-panel');
        if (!btn || !panel) return;
        panel.classList.add('a11y-hidden');
        panel.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
    }
    function isPanelOpen() {
        var panel = document.getElementById('a11y-panel');
        return panel && !panel.classList.contains('a11y-hidden');
    }

    // ─── Écouteurs ──────────────────────────────────────────────
    function attachEvents() {
        var btn   = document.getElementById('a11y-toggle');
        var panel = document.getElementById('a11y-panel');
        if (!btn || !panel) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isPanelOpen()) closePanel();
            else                openPanel();
        });

        panel.querySelector('.a11y-close').addEventListener('click', closePanel);
        panel.querySelector('#a11y-reset').addEventListener('click', resetAll);

        panel.querySelectorAll('.a11y-option').forEach(function (opt) {
            opt.addEventListener('click', function () {
                handleToggle(opt.dataset.feature);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isPanelOpen()) closePanel();
        });

        document.addEventListener('click', function (e) {
            if (!isPanelOpen()) return;
            if (panel.contains(e.target) || btn.contains(e.target)) return;
            closePanel();
        });
    }

    // ─── Defaults basés sur les préférences système ─────────────
    function applyMediaDefaults() {
        if (hasExistingPrefs) return;
        try {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                prefs['stop-animations'] = true;
            }
            if (window.matchMedia('(prefers-contrast: more)').matches) {
                prefs['high-contrast'] = true;
            }
        } catch (e) {}
        if (Object.keys(prefs).length > 0) savePrefs();
    }

    // ─── Init ───────────────────────────────────────────────────
    function init() {
        applyMediaDefaults();
        injectHTML();
        attachEvents();
        // Pré-charger les voix Web Speech (asynchrones sur Chrome/Edge)
        if (window.speechSynthesis) {
            try {
                window.speechSynthesis.getVoices();
                window.speechSynthesis.onvoiceschanged = function () {
                    try { window.speechSynthesis.getVoices(); } catch (e) {}
                };
            } catch (e) {}
        }
        applyAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
