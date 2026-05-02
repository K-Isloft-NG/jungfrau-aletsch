// ================================================================
//  signaler.js — Logique du formulaire de signalement
//  Jungfrau-Aletsch V14
//  Dépendances : i18n.js, animations.js
// ================================================================

(function () {
    'use strict';

    // ── Type cards → select sync ──────────────────────────────────
    var typeCards  = document.querySelectorAll('.type-card');
    var typeSelect = document.getElementById('report-type');

    typeCards.forEach(function (card) {
        card.addEventListener('click', function () {
            typeCards.forEach(function (c) { c.classList.remove('selected'); });
            card.classList.add('selected');
            typeSelect.value = card.dataset.type;
            document.getElementById('form-wrapper').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    typeSelect.addEventListener('change', function () {
        typeCards.forEach(function (c) {
            c.classList.toggle('selected', c.dataset.type === typeSelect.value);
        });
    });

    // ── Pré-remplissage page depuis le référent ───────────────────
    try {
        var ref = document.referrer;
        if (ref) {
            var pageName = ref.split('/').pop().replace('.html', '').replace(/-/g, ' ');
            if (pageName && pageName !== 'signaler probleme') {
                document.getElementById('report-page').value =
                    pageName.charAt(0).toUpperCase() + pageName.slice(1);
            }
        }
    } catch (e) {}

    // ── File upload (drag & drop) ─────────────────────────────────
    var fileDrop  = document.getElementById('file-drop');
    var fileInput = document.getElementById('report-file');
    var fileName  = document.getElementById('file-name');

    fileDrop.addEventListener('click', function () { fileInput.click(); });

    fileDrop.addEventListener('dragover', function (e) {
        e.preventDefault();
        fileDrop.classList.add('dragover');
    });
    fileDrop.addEventListener('dragleave', function () {
        fileDrop.classList.remove('dragover');
    });
    fileDrop.addEventListener('drop', function (e) {
        e.preventDefault();
        fileDrop.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            showFileName();
        }
    });
    fileInput.addEventListener('change', showFileName);

    function showFileName() {
        if (fileInput.files.length) {
            fileName.textContent = fileInput.files[0].name;
            fileName.classList.remove('hidden');
        }
    }

    // ── Soumission du formulaire (Formspree) ──────────────────────
    var form         = document.getElementById('report-form');
    var formState    = document.getElementById('form-state');
    var confirmState = document.getElementById('confirmation-state');
    var FORMSPREE_URL = 'https://formspree.io/f/xyknjqqr';

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var type = typeSelect.value;
        var page = document.getElementById('report-page').value.trim();
        var desc = document.getElementById('report-desc').value.trim();

        if (!type || !page || !desc) {
            [typeSelect, document.getElementById('report-page'), document.getElementById('report-desc')]
                .forEach(function (f) {
                    if (!f.value.trim()) {
                        f.style.borderColor = '#ef4444';
                        f.addEventListener('input',  function () { f.style.borderColor = ''; }, { once: true });
                        f.addEventListener('change', function () { f.style.borderColor = ''; }, { once: true });
                    }
                });
            return;
        }

        var formData  = new FormData(form);
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalBtnHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<svg class="w-4 h-4 animate-spin -ml-1 mr-2 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Envoi en cours...';
        submitBtn.disabled = true;

        fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function (response) {
            if (response.ok) {
                formState.classList.add('hidden-form');
                confirmState.classList.add('show');
                confirmState.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (window.lucide) lucide.createIcons();
            } else {
                alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
            }
        })
        .catch(function (error) {
            console.error('Erreur:', error);
            alert("Erreur de connexion. Veuillez vérifier votre réseau et réessayer.");
        })
        .finally(function () {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled  = false;
        });
    });

    window.resetForm = function () {
        confirmState.classList.remove('show');
        formState.classList.remove('hidden-form');
        form.reset();
        typeCards.forEach(function (c) { c.classList.remove('selected'); });
        fileName.classList.add('hidden');
        formState.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    form.addEventListener('reset', function () {
        typeCards.forEach(function (c) { c.classList.remove('selected'); });
        fileName.classList.add('hidden');
    });

    // ── Mini FAQ ──────────────────────────────────────────────────
    document.getElementById('mini-faq').addEventListener('click', function (e) {
        var btn = e.target.closest('.mini-faq-btn');
        if (!btn) return;
        var item   = btn.closest('.mini-faq-item');
        var answer = item.querySelector('.mini-faq-answer');
        var isOpen = item.classList.contains('open');

        document.querySelectorAll('.mini-faq-item.open').forEach(function (other) {
            if (other !== item) {
                other.classList.remove('open');
                other.querySelector('.mini-faq-btn').setAttribute('aria-expanded', 'false');
                other.querySelector('.mini-faq-answer').style.maxHeight = '0';
            }
        });

        if (isOpen) {
            item.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
        } else {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });

})();
