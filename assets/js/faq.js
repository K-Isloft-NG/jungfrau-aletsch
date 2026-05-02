// ================================================================
//  faq.js — Données et logique de la page FAQ
//  Jungfrau-Aletsch V14
//  Dépendances : i18n.js, animations.js (pour JA_Observer + lucide)
// ================================================================

// ── Données FAQ bilingues ────────────────────────────────────────

var FAQ_DATA_FR = [
    {
        id: "unesco", title: "Le site UNESCO", icon: "landmark",
        questions: [
            { q: "Pourquoi le site Jungfrau-Aletsch est-il classé à l'UNESCO ?", a: "Le site Jungfrau-Aletsch a été inscrit au patrimoine mondial de l'UNESCO en 2001 en raison de sa beauté naturelle exceptionnelle et de sa valeur scientifique. Il abrite le plus grand glacier des Alpes (le glacier d'Aletsch, 23 km), une diversité géologique et écologique remarquable, ainsi que des paysages montagneux spectaculaires allant des sommets enneigés aux vallées tempérées." },
            { q: "Quelle est la superficie du site Jungfrau-Aletsch ?", a: "Le site couvre une superficie d'environ 824 km², ce qui en fait l'un des plus grands sites naturels classés UNESCO en Europe. Il s'étend du massif de la Jungfrau (4 158 m) au sud jusqu'aux forêts de la vallée du Rhône, englobant une diversité d'écosystèmes unique." },
            { q: "Depuis quand le site est-il protégé ?", a: "Le site a été inscrit au patrimoine mondial de l'UNESCO en décembre 2001. Initialement limité à la région Jungfrau-Aletsch-Bietschhorn, il a été élargi en 2007 pour inclure des zones supplémentaires, portant sa superficie à 824 km²." },
            { q: "Quels pays sont concernés par ce site UNESCO ?", a: "Le site Jungfrau-Aletsch se trouve intégralement en Suisse, à cheval sur les cantons de Berne et du Valais. Il est situé dans les Alpes bernoises, au cœur de l'Oberland bernois et du Haut-Valais." }
        ]
    },
    {
        id: "visite", title: "Visiter le massif", icon: "compass",
        questions: [
            { q: "Quelle est la meilleure période pour visiter la région ?", a: "La période idéale dépend de vos activités. Pour la randonnée, privilégiez juin à septembre, lorsque les sentiers sont dégagés et les conditions optimales. L'hiver (décembre à mars) est idéal pour le ski et les raquettes. Le printemps et l'automne offrent des paysages magnifiques avec moins de fréquentation touristique." },
            { q: "Comment accéder au glacier d'Aletsch ?", a: "Le glacier d'Aletsch est accessible depuis plusieurs points. Le plus populaire est le belvédère de l'Eggishorn, accessible par téléphérique depuis Fiesch. Vous pouvez aussi rejoindre le point de vue de Bettmerhorn depuis Bettmeralp, ou emprunter les sentiers depuis Riederalp." },
            { q: "Le site est-il ouvert toute l'année ?", a: "La plupart des installations et sentiers sont accessibles toute l'année, mais les conditions varient considérablement selon les saisons. Certains sentiers de haute montagne sont fermés en hiver pour des raisons de sécurité. Les remontées mécaniques fonctionnent selon des calendriers saisonniers." },
            { q: "Y a-t-il des frais d'entrée pour visiter le site ?", a: "L'accès au site naturel Jungfrau-Aletsch en lui-même est gratuit. En revanche, certaines infrastructures touristiques impliquent des coûts : les remontées mécaniques pour accéder au Jungfraujoch (train à crémaillère) ou aux belvédères sont payantes." }
        ]
    },
    {
        id: "glaciers", title: "Les glaciers", icon: "mountain-snow",
        questions: [
            { q: "Quelle est la longueur du glacier d'Aletsch ?", a: "Le grand glacier d'Aletsch s'étend sur environ 23 km de long, avec une épaisseur maximale d'environ 900 mètres. Il est considéré comme le plus long glacier des Alpes et contient environ 11 km³ de glace." },
            { q: "Le glacier d'Aletsch est-il en train de fondre ?", a: "Oui, comme la grande majorité des glaciers alpins, le glacier d'Aletsch recule de manière significative en raison du changement climatique. Depuis le début du XXe siècle, il a perdu plusieurs kilomètres de longueur et des dizaines de mètres d'épaisseur." },
            { q: "Peut-on marcher sur le glacier d'Aletsch ?", a: "Il est possible de randonner aux abords et sur certaines parties du glacier avec un guide certifié. Des excursions guidées sont organisées depuis Riederalp et Bettmeralp. Il est fortement déconseillé de s'aventurer seul sur le glacier sans équipement adapté." }
        ]
    },
    {
        id: "randonnees", title: "Randonnées et sentiers", icon: "footprints",
        questions: [
            { q: "Quels sont les sentiers les plus populaires ?", a: "Les sentiers les plus appréciés incluent : le Chemin du Glacier d'Aletsch (Riederalp–Bettmeralp), la Haute Route Valaisanne, le sentier du Märjelensee, et le panorama depuis le Jungfraujoch. La page Parcours de ce site présente 8 sentiers balisés avec leurs caractéristiques." },
            { q: "Quel niveau de forme physique est nécessaire ?", a: "Les sentiers disponibles couvrent tous les niveaux, du très facile (promenades accessibles) au très difficile (ascensions alpines techniques). La plupart des randonnées standards nécessitent une bonne condition physique générale et des chaussures de randonnée adaptées." },
            { q: "Les chiens sont-ils autorisés sur les sentiers ?", a: "Les chiens sont généralement tolérés sur les sentiers balisés, mais doivent être tenus en laisse dans les zones de protection naturelle. Dans certaines zones sensibles pour la faune sauvage, les animaux de compagnie peuvent être interdits." }
        ]
    },
    {
        id: "flore", title: "Faune et flore", icon: "leaf",
        questions: [
            { q: "Quelles espèces animales peut-on observer ?", a: "La région abrite une faune alpine remarquable : marmottes, chamois, bouquetins, gypaètes barbus, aigles royaux, et de nombreuses espèces d'oiseaux. Les forêts d'épicéas et de mélèzes accueillent tétras lyre et chouettes de Tengmalm." },
            { q: "Quelles sont les fleurs typiques de la région ?", a: "Le site est réputé pour sa flore alpine exceptionnelle : edelweiss, gentiane, rhododendron des Alpes, anémone des Alpes. Plus de 700 espèces végétales ont été répertoriées, dont de nombreuses espèces protégées." }
        ]
    },
    {
        id: "pratique", title: "Infos pratiques", icon: "info",
        questions: [
            { q: "Comment se rendre sur le site depuis la France ?", a: "Depuis la France, le site est accessible en voiture via l'autoroute A40 jusqu'à Genève, puis direction Berne/Interlaken ou Sierre/Viège selon le versant. En train, des liaisons directes depuis Paris, Lyon ou Genève rejoignent Interlaken et Visp." },
            { q: "Y a-t-il des hébergements sur place ?", a: "Oui, la région dispose d'un large éventail d'hébergements : hôtels, refuges de montagne (CAS), appartements de vacances, campings. Les villages de Riederalp, Bettmeralp, Grindelwald, Lauterbrunnen et Saas-Fee offrent de nombreuses options pour tous les budgets." },
            { q: "Quels sont les numéros d'urgence en Suisse ?", a: "Urgences générales : 112 (Europe) ou 117 (police), 144 (ambulance), 118 (pompiers). Sauvetage montagne : 1414 (REGA, sauvetage aérien suisse). Ces numéros fonctionnent depuis les téléphones suisses et la plupart des réseaux étrangers." }
        ]
    }
];

var FAQ_DATA_EN = [
    {
        id: "unesco", title: "The UNESCO Site", icon: "landmark",
        questions: [
            { q: "Why is the Jungfrau-Aletsch site listed by UNESCO?", a: "The Jungfrau-Aletsch site was inscribed on the UNESCO World Heritage List in 2001 for its exceptional natural beauty and scientific value. It is home to the largest glacier in the Alps (the Aletsch Glacier, 23 km), remarkable geological and ecological diversity, and spectacular mountain landscapes ranging from snow-capped peaks to temperate valleys." },
            { q: "What is the area of the Jungfrau-Aletsch site?", a: "The site covers an area of approximately 824 km², making it one of the largest natural UNESCO-listed sites in Europe. It extends from the Jungfrau massif (4,158 m) in the south to the forests of the Rhône Valley, encompassing a unique diversity of ecosystems." },
            { q: "How long has the site been protected?", a: "The site was inscribed on the UNESCO World Heritage List in December 2001. Initially limited to the Jungfrau-Aletsch-Bietschhorn region, it was expanded in 2007 to include additional areas, bringing its total area to 824 km²." },
            { q: "Which countries are included in this UNESCO site?", a: "The Jungfrau-Aletsch site is located entirely in Switzerland, spanning the cantons of Berne and Valais. It is situated in the Bernese Alps, at the heart of the Bernese Oberland and Upper Valais." }
        ]
    },
    {
        id: "visite", title: "Visiting the Massif", icon: "compass",
        questions: [
            { q: "What is the best time to visit the region?", a: "The ideal period depends on your activities. For hiking, aim for June to September when trails are clear and conditions are optimal. Winter (December to March) is ideal for skiing and snowshoeing. Spring and autumn offer magnificent scenery with fewer crowds." },
            { q: "How do I reach the Aletsch Glacier?", a: "The Aletsch Glacier is accessible from several points. The most popular is the Eggishorn viewpoint, accessible by cable car from Fiesch. You can also reach the Bettmerhorn viewpoint from Bettmeralp, or take trails from Riederalp." },
            { q: "Is the site open all year round?", a: "Most facilities and trails are accessible throughout the year, but conditions vary considerably by season. Some high-mountain trails are closed in winter for safety reasons. Cable cars operate on seasonal schedules." },
            { q: "Are there entry fees to visit the site?", a: "Access to the natural Jungfrau-Aletsch site itself is free. However, certain tourist facilities involve costs: cable cars to the Jungfraujoch (rack railway) or viewpoints are paid attractions." }
        ]
    },
    {
        id: "glaciers", title: "The Glaciers", icon: "mountain-snow",
        questions: [
            { q: "How long is the Aletsch Glacier?", a: "The Great Aletsch Glacier stretches approximately 23 km in length, with a maximum thickness of around 900 metres. It is considered the longest glacier in the Alps and contains approximately 11 km³ of ice." },
            { q: "Is the Aletsch Glacier melting?", a: "Yes, like the vast majority of Alpine glaciers, the Aletsch Glacier is retreating significantly due to climate change. Since the early 20th century, it has lost several kilometres in length and dozens of metres in thickness." },
            { q: "Can you walk on the Aletsch Glacier?", a: "It is possible to hike around and on certain parts of the glacier with a certified guide. Guided excursions are organised from Riederalp and Bettmeralp. It is strongly inadvisable to venture onto the glacier alone without appropriate equipment." }
        ]
    },
    {
        id: "randonnees", title: "Hiking & Trails", icon: "footprints",
        questions: [
            { q: "What are the most popular trails?", a: "The most popular trails include: the Aletsch Glacier Path (Riederalp–Bettmeralp), the Haute Route Valaisanne, the Märjelensee trail, and the panorama from Jungfraujoch. The Trails page on this site presents 8 marked routes with their characteristics." },
            { q: "What level of fitness is required?", a: "Available trails cover all levels, from very easy (accessible walks) to very difficult (technical alpine ascents). Most standard hikes require good general physical fitness and appropriate hiking footwear." },
            { q: "Are dogs allowed on the trails?", a: "Dogs are generally tolerated on marked trails but must be kept on a lead in nature protection zones. In certain areas sensitive to wildlife, pets may be prohibited." }
        ]
    },
    {
        id: "flore", title: "Wildlife & Flora", icon: "leaf",
        questions: [
            { q: "What animal species can be observed?", a: "The region is home to remarkable alpine wildlife: marmots, chamois, ibex, bearded vultures, golden eagles, and many bird species. The spruce and larch forests shelter black grouse and Tengmalm's owls." },
            { q: "What are the typical flowers of the region?", a: "The site is renowned for its exceptional alpine flora: edelweiss, gentian, alpine rhododendron, alpine anemone. More than 700 plant species have been recorded, including many protected species." }
        ]
    },
    {
        id: "pratique", title: "Practical Information", icon: "info",
        questions: [
            { q: "How do I get to the site from abroad?", a: "The site is accessible by car via motorway to Geneva, then towards Berne/Interlaken or Sierre/Viège depending on the side. By train, direct services from major cities connect to Interlaken and Visp." },
            { q: "Is there accommodation on site?", a: "Yes, the region offers a wide range of accommodation: hotels, mountain huts (CAS), holiday apartments, campsites. The villages of Riederalp, Bettmeralp, Grindelwald, Lauterbrunnen and Saas-Fee offer many options for all budgets." },
            { q: "What are the emergency numbers in Switzerland?", a: "General emergencies: 112 (Europe) or 117 (police), 144 (ambulance), 118 (fire brigade). Mountain rescue: 1414 (REGA, Swiss air rescue). These numbers work from Swiss phones and most foreign networks." }
        ]
    }
];

function getFAQData(lang) {
    return lang === 'en' ? FAQ_DATA_EN : FAQ_DATA_FR;
}

var FAQ_DATA = getFAQData(localStorage.getItem('preferredLanguage') || 'fr');

// ── Logique FAQ ──────────────────────────────────────────────────
(function () {
    'use strict';

    function getCurrentLang() {
        return localStorage.getItem('preferredLanguage') || 'fr';
    }

    function debounce(fn, ms) {
        var timer;
        return function () {
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () { fn.apply(this, args); }, ms);
        };
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    var sidebar    = document.getElementById('cat-sidebar');
    var tabs       = document.getElementById('cat-tabs');
    var content    = document.getElementById('faq-content');
    var searchInput = document.getElementById('faq-search');
    var clearBtn   = document.getElementById('faq-search-clear');
    var noResults  = document.getElementById('faq-no-results');
    var faqLayout  = document.getElementById('faq-layout');
    var scrollSpyObserver = null;

    function renderSidebar() {
        sidebar.innerHTML = '';
        tabs.innerHTML = '';
        getFAQData(getCurrentLang()).forEach(function (cat, i) {
            var link = document.createElement('a');
            link.href = '#cat-' + cat.id;
            link.className = 'cat-link' + (i === 0 ? ' active' : '');
            link.dataset.cat = cat.id;
            link.innerHTML = '<i data-lucide="' + cat.icon + '" class="cat-icon"></i>' + cat.title;
            sidebar.append(link);

            var tab = document.createElement('button');
            tab.className = 'cat-tab' + (i === 0 ? ' active' : '');
            tab.dataset.cat = cat.id;
            tab.textContent = cat.title;
            tabs.append(tab);
        });
    }

    function renderFAQ() {
        content.innerHTML = '';
        var data = getFAQData(getCurrentLang());
        FAQ_DATA = data;

        data.forEach(function (cat, ci) {
            var section = document.createElement('section');
            section.id = 'cat-' + cat.id;
            section.className = 'scroll-offset mb-12 fade-up';
            section.style.transitionDelay = (ci * 80) + 'ms';

            var header = document.createElement('div');
            header.className = 'flex items-center gap-3 mb-5';
            header.innerHTML = '<div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><i data-lucide="' + cat.icon + '" class="w-4.5 h-4.5 text-blue-600"></i></div><h2 class="text-xl font-bold text-slate-900">' + cat.title + '</h2>';
            section.append(header);

            var list = document.createElement('div');
            list.className = 'space-y-3';

            cat.questions.forEach(function (item, qi) {
                var faqId = cat.id + '-' + qi;
                var div = document.createElement('div');
                div.className = 'faq-item';
                div.dataset.question = item.q.toLowerCase();
                div.dataset.answer   = item.a.toLowerCase().replace(/<[^>]+>/g, '');
                div.innerHTML = '<button class="faq-question" aria-expanded="false" aria-controls="ans-' + faqId + '"><span class="faq-q-text">' + item.q + '</span><svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-answer" id="ans-' + faqId + '" role="region"><div class="faq-answer-inner faq-a-text">' + item.a + '</div></div>';
                list.append(div);
            });

            section.append(list);
            content.append(section);
        });

        if (window.lucide) lucide.createIcons();

        // Observer les nouveaux éléments fade-up
        if (window.JA_Observer) {
            document.querySelectorAll('.fade-up').forEach(function (el) {
                window.JA_Observer.observe(el);
            });
        }

        initScrollSpy();
    }

    function initScrollSpy() {
        if (scrollSpyObserver) scrollSpyObserver.disconnect();
        var catSections = getFAQData(getCurrentLang())
            .map(function (c) { return document.getElementById('cat-' + c.id); })
            .filter(Boolean);

        scrollSpyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) setActiveCategory(e.target.id.replace('cat-', ''));
            });
        }, { rootMargin: '-120px 0px -60% 0px', threshold: 0 });

        catSections.forEach(function (s) { scrollSpyObserver.observe(s); });
    }

    function setActiveCategory(catId) {
        document.querySelectorAll('.cat-link').forEach(function (l) { l.classList.toggle('active', l.dataset.cat === catId); });
        document.querySelectorAll('.cat-tab').forEach(function (t)  { t.classList.toggle('active', t.dataset.cat === catId); });
    }

    sidebar.addEventListener('click', function (e) {
        var link = e.target.closest('.cat-link');
        if (link) setActiveCategory(link.dataset.cat);
    });

    tabs.addEventListener('click', function (e) {
        var tab = e.target.closest('.cat-tab');
        if (!tab) return;
        setActiveCategory(tab.dataset.cat);
        var target = document.getElementById('cat-' + tab.dataset.cat);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function closeAccordion(item) {
        item.classList.remove('open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').style.maxHeight = '0';
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.faq-question');
        if (!btn) return;
        var item   = btn.closest('.faq-item');
        var answer = item.querySelector('.faq-answer');
        var inner  = answer.querySelector('.faq-answer-inner');
        var isOpen = item.classList.contains('open');
        var section = item.closest('section');
        section.querySelectorAll('.faq-item.open').forEach(function (other) {
            if (other !== item) closeAccordion(other);
        });
        if (isOpen) {
            closeAccordion(item);
        } else {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = inner.scrollHeight + 'px';
        }
    });

    window.clearSearch = function () {
        searchInput.value = '';
        handleSearch();
        searchInput.focus();
    };

    searchInput.addEventListener('input', debounce(handleSearch, 200));
    clearBtn.addEventListener('click', window.clearSearch);

    function handleSearch() {
        var query = searchInput.value.trim().toLowerCase();
        clearBtn.style.display = query ? 'flex' : 'none';
        var allItems    = document.querySelectorAll('.faq-item');
        var allSections = document.querySelectorAll('#faq-content > section');
        var totalVisible = 0;

        if (!query) {
            allItems.forEach(function (item) { item.style.display = ''; resetHighlight(item); });
            allSections.forEach(function (s)  { s.style.display = ''; });
            noResults.classList.add('hidden');
            faqLayout.classList.remove('hidden');
            return;
        }

        allSections.forEach(function (section) {
            var items = section.querySelectorAll('.faq-item');
            var sectionVisible = 0;
            items.forEach(function (item) {
                var matchQ = item.dataset.question.includes(query);
                var matchA = item.dataset.answer.includes(query);
                if (matchQ || matchA) {
                    item.style.display = '';
                    sectionVisible++;
                    totalVisible++;
                    highlightText(item, query);
                    if (matchA && !item.classList.contains('open')) {
                        item.classList.add('open');
                        item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
                        var answer = item.querySelector('.faq-answer');
                        answer.style.maxHeight = answer.querySelector('.faq-answer-inner').scrollHeight + 'px';
                    }
                } else {
                    item.style.display = 'none';
                    resetHighlight(item);
                }
            });
            section.style.display = sectionVisible > 0 ? '' : 'none';
        });

        noResults.classList.toggle('hidden', totalVisible > 0);
        faqLayout.classList.toggle('hidden',  totalVisible === 0);
    }

    function highlightText(item, query) {
        var qEl = item.querySelector('.faq-q-text');
        qEl.innerHTML = highlightInText(qEl.textContent, query);
    }

    function highlightInText(text, query) {
        if (!query) return text;
        var regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function resetHighlight(item) {
        var qEl = item.querySelector('.faq-q-text');
        qEl.innerHTML = qEl.textContent;
    }

    renderSidebar();
    renderFAQ();

    window.addEventListener('languageChanged', function (e) {
        var lang = e.detail.lang;
        FAQ_DATA = getFAQData(lang);
        searchInput.value = '';
        clearBtn.style.display = 'none';
        noResults.classList.add('hidden');
        faqLayout.classList.remove('hidden');
        renderSidebar();
        renderFAQ();
    });

})();
