# 🏔️ Contexte Complet - Projet Jungfrau-Aletsch V14

**Créé:** Avril 2026  
**Version du Projet:** V14  
**Stack:** HTML5 + CSS3 + Vanilla JavaScript (Tailwind CDN + Lucide Icons + Leaflet.js)  
**Équipe:** M.C.N. (Médiation Culturelle et Numérique) - 5 membres  
**Contexte:** Projet SAE (Situation d'Apprentissage et d'Évaluation) - BUT Informatique 1ère année

---

## 📋 Table des Matières

1. [État du Projet](#état-du-projet)
2. [Stack Technique](#stack-technique)
3. [Structure des Fichiers](#structure-des-fichiers)
4. [Patterns et Bonnes Pratiques](#patterns-et-bonnes-pratiques)
5. [Bugs et Issues Connus](#bugs-et-issues-connus)
6. [Tâches en Cours](#tâches-en-cours)
7. [Workflow de Développement](#workflow-de-développement)
8. [Guide Complet des Pages](#guide-complet-des-pages)
9. [Instructions pour Continuer](#instructions-pour-continuer)

---

## État du Projet

### ✅ Complété (V14)

- **Site multi-page complet**
  - Accueil (index.html) avec design système cohérent
  - Timeline (timeline.html) avec chronologie géologique et historique
  - Sites (sites.html) avec présentation des 4 zones principales
  - Parcours (parcours.html) avec carte interactive SVG + 8 sentiers GPX/GeoJSON
  - Équipe (notreequipe.html) avec profils membres
  - Accessibilité (accessibility.html) avec certification WCAG

- **Système de design unifié**
  - Thème clair bleu UNESCO (#2563eb)
  - Animations IntersectionObserver (fade-up)
  - Composants standardisés: hero, badge, heading, footer
  - Responsive design (mobile-first)

- **Pages de footer opérationnelles**
  - FAQ (faq.html)
  - Mentions Légales (mentions-legales.html)
  - Confidentialité (confidentialite.html)
  - Sitemap (sitemap.html)
  - Signaler un Problème (signaler-probleme.html)

- **Système i18n (FR/EN)**
  - Traducteur global via i18n.js
  - Tous les contenus multilingues
  - Switch lingua avec flag icons

- **Carte Interactive Parcours (Version Corrigée)**
  - SVG simple et performant (pas d'animations natives inutiles)
  - 8 sentiers avec filtrage par difficulté + région
  - Modes de vue: carte, liste, split
  - Export GPX/GeoJSON fonctionnel
  - Algorithme de couleur par difficulté

- **Présentation Orale**
  - PowerPoint 7 slides (aligné structure 5 speakers)
  - Prêt pour défense finale

### ⚠️ En Cours (Partiellement Complété)

- **Responsive design**
  - Pages principales adaptées
  - **À améliorer:** Certaines pages nécessitent ajustements mobile/tablette
  - **Issue principale:** Bug affichage carte (apparaît puis disparaît)

- **W3C HTML validation**
  - Quelques warnings/errors à corriger
  - Priorité moyenne

### ❌ À Faire (Backlog)

- **Bento Design Category Pages**
  - Jungfrau (jungfrau.html)
  - Flore Alpine (flore.html)
  - Randonnées (randonnees.html)
  - Glacier (glacier.html)
  - État: Planifié, pas encore implémenté

- **Améliorations Parcours**
  - Zoom/Pan sur carte
  - Modale détail sentier
  - Profil d'élévation interactif

- **Formulaire Contact Équipe**
  - Champ par member
  - Intégration email (backend future)

- **Intégrations Professionnelles**
  - LinkedIn links (notreequipe.html)
  - Portfolio links per member

---

## Stack Technique

### ✅ Autorisé et Imposé

```
HTML5
CSS3
Vanilla JavaScript (ES6+)
Tailwind CSS (CDN)
Lucide Icons (CDN)
Leaflet.js (map library, CDN)
```

### ❌ Interdit

```
React, Vue, Angular (frameworks)
TypeScript
Node.js build tools
npm scripts, webpack, babel
Frameworks CSS (Bootstrap, etc.)
jQuery ou autres libs JS
```

### Libraires Actuellement Utilisées

| Libraire | Version | Usage |
|----------|---------|-------|
| Tailwind CSS | Latest CDN | Styling + responsive |
| Lucide Icons | Latest CDN | SVG icons |
| Leaflet.js | CDN | Interactive map (parcours) |
| i18n.js | Custom script | Traduction FR/EN |

### Hosting

- **Plateforme:** Netlify
- **Branch:** main (production)
- **Domain:** À vérifier (jungfrau-aletsch.netlify.app ou custom)
- **Déploiement:** Automatique sur push

---

## Structure des Fichiers

### Organisation Générale

```
project-root/
├── index.html                    # Accueil (page principale)
├── timeline.html                 # Histoire & Géologie
├── sites.html                    # Présentation 4 zones
├── parcours.html                 # Carte interactive + sentiers
├── notreequipe.html              # Équipe (profils)
├── accessibility.html            # Page accessibilité
│
├── footer-pages/                 # Pages footer
│   ├── faq.html
│   ├── mentions-legales.html
│   ├── confidentialite.html
│   ├── sitemap.html
│   └── signaler-probleme.html
│
├── assets/
│   ├── css/
│   │   ├── global.css            # Styles globaux
│   │   ├── components.css        # Composants réutilisables
│   │   └── parcours.css          # Styles specifiques parcours
│   │
│   ├── js/
│   │   ├── i18n.js               # Système traduction
│   │   ├── animations.js         # IntersectionObserver
│   │   └── parcours.js           # Logique carte interactive
│   │
│   ├── images/
│   │   ├── logomcnnoir.svg
│   │   ├── hero-*.jpg            # Images hero par page
│   │   └── icons/
│   │
│   └── data/
│       └── trails.json           # Données 8 sentiers (GPX coords)
│
├── DOCUMENTATION.md              # Doc technique complète
├── README.md                      # Guide d'intégration
├── NOTES_CORRECTIONS.md          # Problèmes/solutions v1→v14
└── PRESENTATION.pptx             # PowerPoint défense
```

### Fichiers Clés et Rôles

#### Pages HTML Principales

| Fichier | Rôle | Status | Responsive |
|---------|------|--------|-----------|
| index.html | Accueil + hero | ✅ Complet | 🟡 Partiellement |
| timeline.html | Historique géologique | ✅ Complet | 🟡 Partiellement |
| sites.html | Présentation zones | ✅ Complet | 🟡 Partiellement |
| parcours.html | Sentiers + carte SVG | ✅ Complet (bug affichage) | 🟡 Partiellement |
| notreequipe.html | Profils équipe | ✅ Complet | 🟡 Partiellement |
| accessibility.html | Accessibilité WCAG | ✅ Complet | ✅ Oui |

#### Fichiers Styles

| Fichier | Contenu | Taille | Maintenance |
|---------|---------|--------|------------|
| global.css | Variables + reset + global | ~300 lignes | Utilisé partout |
| components.css | Composants réutilisables | ~400 lignes | Utilisé partout |
| parcours.css | Styles spécifiques carte | ~200 lignes | Isolé à parcours.html |

#### Fichiers JavaScript

| Fichier | Fonction | Taille | Critique |
|---------|----------|--------|----------|
| i18n.js | Système traduction FR/EN | ~150 lignes | ✅ OUI - ne pas modifier |
| animations.js | IntersectionObserver fade-up | ~100 lignes | ✅ OUI - pattern standard |
| parcours.js | Carte interactive + filtres | ~600 lignes | ✅ OUI - logique métier |

---

## Patterns et Bonnes Pratiques

### 🎨 Pattern Design System

**Tous les pages respectent cette structure:**

```html
<!-- 1. Hero section avec image -->
<section class="hero-section" style="background-image: url(...)">
    <h1 data-i18n="page.hero.title">Titre</h1>
</section>

<!-- 2. Badge UNESCO optionnel -->
<div class="badge-container">
    <span class="badge">UNESCO World Heritage</span>
</div>

<!-- 3. Contenu principal avec heading standardisé -->
<div class="container mx-auto max-w-6xl px-6 py-12">
    <h2 class="text-4xl font-bold mb-8" data-i18n="page.heading">Heading</h2>
    <!-- Contenu avec fade-up animations -->
    <div class="fade-up">...</div>
</div>

<!-- 4. Footer standard -->
<footer><!-- Footer partagé --></footer>
```

**Avantages:**
- ✅ Cohérence visuelle sur toutes les pages
- ✅ Facilite la maintenance
- ✅ Professionnalisme reconnaissable

### 🔄 Système i18n (Traduction)

**Utilisation:**
```html
<!-- Dans le HTML, ajouter data-i18n -->
<h1 data-i18n="home.hero.title">Titre en français par défaut</h1>
<p data-i18n="home.description">Description...</p>
```

**Traduction automatique:**
```javascript
// Dans i18n.js
const translations = {
    "home.hero.title": {
        "fr": "Bienvenue à Jungfrau-Aletsch",
        "en": "Welcome to Jungfrau-Aletsch"
    }
};

// Appel au changement de langue
setLanguage('en');  // Bascule auto tous les data-i18n
```

**Points clés:**
- ⚠️ Ne pas override `window.setLanguage` localement - utiliser le système global
- ⚠️ Toujours utiliser `data-i18n` avec format "section.key"
- ✅ Les traductions se chargent automatiquement au démarrage

### 🎬 Animations IntersectionObserver

**Pattern standardisé:**

```html
<!-- 1. Classe fade-up sur éléments -->
<div class="fade-up">
    <h2>Titre animé</h2>
</div>

<!-- 2. Style CSS -->
<style>
.fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-up.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>

<!-- 3. JavaScript observateur (dans animations.js) -->
<!-- Automatique - aucune action nécessaire -->
```

**Important - Bug Connu:**
- ❌ IntersectionObserver n'active pas les classes en mode headless (Chromium)
- ✅ Solution: Injection JavaScript force `.visible` avant screenshot
- 📌 C'est normal, ne pas "corriger" pour screenshots

### 📊 Architecture Carte Parcours

**Flux de données:**

```
1. trails.json
   ↓
2. fetch + appState.trails
   ↓
3. Filtrage (difficultés + région)
   ↓
4. Rendu SVG ou Liste
   ↓
5. Événements utilisateur (clic, téléchargement)
```

**Données trail (structure):**

```javascript
{
    id: 1,
    nameKey: "trails.aletsch.name",      // Pour traduction
    difficulty: "Difficile",              // Facile|Moyen|Difficile|Expert
    region: "Aletsch",
    duration: "4h30",
    distance: 14.2,                       // km
    elevation: 450,                       // m de dénivelé
    coords: [                             // Tableau lat/lng
        [46.55, 8.15],
        [46.54, 8.16],
        // ...
    ],
    views: ["Alpine meadows", "Glacier"],
    difficulty_color: "#ef4444"           // Calculé
}
```

**Points clés:**
- 📌 Les `coords` sont en [lat, lng] format
- 📌 Difficulté détermine la couleur SVG
- 📌 Region permet le filtrage
- 📌 `nameKey` utilise le système i18n

### 🎯 Event Delegation

**Pour les listes/filtres dynamiques:**

```javascript
// ❌ MAUVAIS: Event listener par élément
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', handler);  // Cassé après re-render
});

// ✅ BON: Event delegation au container
document.querySelector('.filter-container').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (btn) {
        // Gérer le clic
    }
});
```

### 📱 Responsive Design

**Breakpoints Tailwind (inchangés):**
```
xs: 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

**Usage dans les classes:**
```html
<div class="hidden md:flex">     <!-- Caché sur mobile, visible md+ -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<div class="text-sm md:text-base lg:text-lg">
```

---

## Bugs et Issues Connus

### 🔴 Bug Principal - Carte Parcours Apparaît/Disparaît

**Symptôme:**
- La carte SVG s'affiche brièvement puis disparaît sur certains navigateurs
- Visible surtout sur rechargement de page
- Affecte principalement parcours.html

**Cause probable:**
- Race condition entre chargement data (fetch) et rendu SVG
- Possiblement animation CSS interfère avec affichage

**Impact:**
- 🟠 Fonctionnalité partiellement dégradée
- 🟢 La liste reste fonctionnelle
- 🟢 L'export GPX fonctionne

**À investiguer:**
1. Ajouter `console.log` dans parcours.js à chaque étape:
   - Avant `fetch(trails.json)`
   - Après fetch (data reçue)
   - Avant `renderMap()`
   - Après `renderMap()`

2. Vérifier CSS (parcours.css):
   - Classes CSS ne cachent pas SVG accidentellement
   - Z-index correct
   - Display/visibility pas en conflit

3. Timeline temporelle:
   - Vérifier que `appState.trails` n'est pas vide quand `renderMap()` est appelé
   - Ajouter délai si nécessaire: `await new Promise(r => setTimeout(r, 100))`

**Fix Temporaire:**
Ajouter dans `parcours.html` juste avant `</body>`:
```javascript
<script>
// Force affichage si cache trop long
setTimeout(() => {
    if (document.querySelector('#map-svg') === null) {
        console.warn('SVG non rendu, trigger manual render');
        // Appeler renderMap() manuellement
    }
}, 500);
</script>
```

### 🟡 Issues Mineurs

| Issue | Sévérité | Status | Notes |
|-------|----------|--------|-------|
| W3C HTML validation | Moyen | À faire | Quelques warnings seulement |
| Responsive mobile | Moyen | Partiellement | Pages principales OK, détails à affiner |
| Accessibilité liens | Faible | OK | WCAG AA atteint |

---

## Tâches en Cours

### Par Membre d'Équipe

#### 🔴 Nassim
- [ ] Ajouter faune alpine en configuration Bento Design
- [ ] Logo UNESCO cliquable (lien UNESCO official)
- [ ] Nouvelles catégories Bento (flore.html, etc.)

#### 🔴 Karlos (Current - Toi)
- [ ] **URGENT:** Résoudre bug carte parcours (apparaît/disparaît)
- [ ] Responsive design complet (toutes pages)
- [ ] W3C HTML validation (warnings → 0)
- [ ] Continuer implémentation Bento pour catégories

#### 🔴 Mohamed
- [ ] Améliorations interactives parcours (zoom/pan)
- [ ] Modale détail sentier
- [ ] Profil d'élévation (si données disponibles)

#### 🔴 Julien
- [ ] Compléter footer pages (déjà complétées, valider)
- [ ] Formulaire contact par member équipe
- [ ] Liens LinkedIn + portfolio per member

#### 🔴 Ilyes
- [ ] Validation timeline (dates pertinentes validées)
- [ ] Illustrations géologiques complètes
- [ ] À vérifier: toutes les infos historiques

### Priorité Recommandée

1. **🔴 P0 - Critique**
   - [ ] Bug carte parcours (bloque la démo)
   - [ ] Responsive design (client peut tester sur mobile)

2. **🟠 P1 - Important**
   - [ ] W3C validation
   - [ ] Bento design pages (jungfrau.html, glacier.html, etc.)

3. **🟡 P2 - Amélioration**
   - [ ] Améliorations parcours (zoom, modale)
   - [ ] Intégrations professionnelles (LinkedIn)

---

## Workflow de Développement

### Pour Continuer Efficacement

#### 1. Récupérer le Projet Actuel

```bash
# Option A: Si fichier ZIP
unzip project-v14.zip
cd project

# Option B: Si déjà en dossier local
cd ~/projects/jungfrau-aletsch
```

#### 2. Structure des Modifications

**Chaque tâche = 1 fichier modifié minimum:**

- Modifier uniquement ce qui est nécessaire
- Respecter la structure existante
- Tester en navigateur (F5 → cache clear)

#### 3. Tests Avant/Après

```javascript
// Console browser (F12)
console.log(appState.trails);        // Vérifier données chargées
console.log(window.currentLanguage); // Vérifier langue active
```

#### 4. Vérifier les 3 Navigateurs

- ✅ Chrome (principal)
- ✅ Firefox (retro-compat)
- ✅ Safari (Mac si accès)

#### 5. Responsivité

```
Testé à:
- 320px (iPhone SE)
- 768px (iPad)
- 1024px (laptop)
- 1920px (desktop)
```

#### 6. Déploiement

```bash
# Netlify git push → automatic deployment
git add .
git commit -m "Fix: [description]"
git push origin main

# Vérifier sur netlify.app URL après ~30s
```

---

## Guide Complet des Pages

### 📄 index.html - Accueil

**Sections:**
1. Hero avec image observatory
2. Présentation UNESCO
3. 4 zones principales (preview)
4. Stats (altitude, superficie, etc.)
5. Appel à action vers timeline/sites
6. Footer

**Fichiers liés:**
- `assets/css/global.css`
- `assets/css/components.css`
- `assets/js/i18n.js`
- `assets/js/animations.js`

**Points d'édition:**
- Hero image: `background-image: url(...)`
- Contenu stats: sections data-i18n
- Boutons CTA: href vers autres pages

### 📖 timeline.html - Histoire & Géologie

**Sections:**
1. Hero "Chronique des Alpes"
2. Timeline verticale (1800 → présent)
3. Points clés géologiques/historiques
4. Images par époque
5. Infographiques géologiques

**Points clés:**
- ⚠️ Vérifier dates avec Ilyes (pertinence pour visiteurs)
- 📌 Images géologiques doivent avoir crédits/sources
- ✅ Animations fade-up sur chaque point

**Fichiers:**
- timeline.html (~1500 lignes)
- Pas de CSS spécifique (utilise global)

### 🗺️ sites.html - Zones Principales

**Sections:**
1. Présentation 4 zones
   - Jungfrau (4158m)
   - Aletsch Glacier
   - Flore Alpine
   - Randonnées

2. Cartes visuelles par zone
3. Statistiques (altitude, faune, etc.)
4. Liens vers pages détail (futures)

**Structure:**
- Chaque zone = 1 card avec image + description
- Lien vers "jungfrau.html", "glacier.html", etc. (à créer)

**Fichiers:**
- sites.html (~900 lignes)
- Utilise Leaflet (optionnel, pour visualisation)

### 🥾 parcours.html - Sentiers & Carte

**Sections:**
1. Hero "Parcourir la Région"
2. Barre filtres (difficulté, région)
3. Switchs mode (carte/liste/split)
4. Carte SVG interactive
5. Liste détails sentiers

**Logique JavaScript (parcours.js):**
- Chargement trails.json
- Filtrage par difficulté + région
- Rendu SVG avec couleurs
- Event handlers (clic marqueur)
- Export GPX/GeoJSON

**Données:**
- trails.json = 8 sentiers avec coords GPS
- Chaque trail = 50-200 coordonnées [lat,lng]

**Bug à Corriger:**
- 🔴 Carte apparaît puis disparaît
- **À investiguer:** Timing chargement/rendu

### 👥 notreequipe.html - Équipe

**Sections:**
1. Photos équipe
2. Profils (Julien, Nassim, Mohamed, Ilyes, Karlos)
3. Descriptions rôles
4. Contacts (LinkedIn, email, portfolio)

**À compléter:**
- [ ] LinkedIn links par member
- [ ] Portfolio links
- [ ] Formulaire contact optionnel

### ♿ accessibility.html - Accessibilité

**Contenu:**
- Norme WCAG AA atteinte
- Certifications validées
- Tips pour les utilisateurs

**Ne pas modifier** (complété et validé)

### 📄 Footer Pages

| Page | Fichier | Status | Notes |
|------|---------|--------|-------|
| FAQ | faq.html | ✅ Complet | FAQ UNESCO site |
| Mentions Légales | mentions-legales.html | ✅ Complet | Légal standard |
| Confidentialité | confidentialite.html | ✅ Complet | RGPD compliant |
| Sitemap | sitemap.html | ✅ Complet | Tous les liens |
| Signaler | signaler-probleme.html | ✅ Complet | Bug report form |

---

## Instructions pour Continuer

### 🚀 Démarrer une Session Claude Code

**1. Contexte Minimal (si pas accès à ce fichier):**
```
Je travaille sur le projet Jungfrau-Aletsch (site UNESCO), V14.
Stack: HTML5/CSS3/Vanilla JS, Tailwind CDN, Lucide Icons, Leaflet.js
Bug principal: Carte parcours apparaît puis disparaît
Tâche: [VOTRE TÂCHE SPÉCIFIQUE]
Envoyer-moi la structure du code et je t'aiderai à déboguer.
```

**2. Avec ce Fichier de Contexte:**
```
J'utilise le fichier JUNGFRAU_ALETSCH_CONTEXT.md comme référence.
Je dois: [VOTRE TÂCHE]
Peux-tu m'aider en vérifiant d'abord la structure du code?
```

### 📦 Charger le Projet dans Claude Code

```bash
# Terminal Claude Code
cd ~/projects/jungfrau-aletsch
claude-code  # Charge le projet

# Ou drag-drop le dossier
```

### 🔍 Diagnostic Rapide

**Pour explorer l'état du projet:**

```bash
# Voir structure
ls -la

# Vérifier fichiers clés existent
ls assets/css/
ls assets/js/
ls assets/data/

# Chercher bugs
grep -r "console.error" assets/js/
grep -r "TODO" assets/

# Taille du code
wc -l assets/js/*.js assets/css/*.css
```

### 📝 Modifier Efficacement

**Workflow pour une tâche:**

1. **Lire** → Comprendre le code existant
2. **Planifier** → Définir modifications nécessaires
3. **Implémenter** → Coder + tester localement
4. **Valider** → F12 console, pas d'erreurs
5. **Livrer** → ZIP ou fichiers modifiés

### ✅ Checklist Avant Livraison

- [ ] Aucune erreur console (F12)
- [ ] Fonctionne sur Chrome + Firefox
- [ ] Responsive testé (320px, 768px, 1920px)
- [ ] Traductions OK (FR/EN)
- [ ] Images chargent correctement
- [ ] SVG carte affiche (si modification parcours)
- [ ] Code commenté et lisible

### 🎓 Points à Retenir

1. **Ne pas casser le système i18n**
   - Ne pas override `window.setLanguage` localement
   - Utiliser `data-i18n` systématiquement

2. **Respecter les patterns**
   - Hero/Badge/Heading structure sur nouvelles pages
   - Utiliser classes Tailwind existantes
   - Fade-up sur contenu important

3. **Vanilla JS seulement**
   - Pas de React/Vue/TypeScript
   - Pas de build tools
   - ES6+ OK (const, let, arrow functions, etc.)

4. **Netlify deploy**
   - Push → déploie auto en ~30s
   - Tester URL netlify.app après

5. **Code crédible**
   - Lisible et structuré
   - Commentaires sur logic complexe
   - Respecte exigences académiques

---

## Références Rapides

### Couleurs Officielles

```css
--unesco-blue: #2563eb
--accent-red: #e60004
--text-primary: #0f172a
--text-secondary: #64748b
--bg-light: #ffffff
--bg-card: #f8fafc
```

### Typographies

```css
Famille: Inter (500, 600, 700, 900 weights)
H1: 3xl/4xl bold
H2: 2xl/3xl bold
H3: xl bold
Body: base regular
Small: sm regular
```

### Commandes Utiles

```javascript
// Console debug
window.currentLanguage          // Langue active
appState.trails                 // Données sentiers
appState.selectedTrailId        // Sentier sélectionné
setLanguage('en')               // Changer langue
```

---

**Document créé pour continuité de développement**  
**Mise à jour: Avril 2026**  
**Maintenu par: Karlos (et équipe M.C.N.)**
