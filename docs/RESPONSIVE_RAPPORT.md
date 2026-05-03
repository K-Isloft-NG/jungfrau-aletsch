# Rapport Responsive — Jungfrau-Aletsch
Date : 2026-05-03

## Résumé
- Pages auditées : 20
- Problèmes corrigés : 2 (timeline mobile + grille ressources)
- Iframes non responsives : 0
- Overflow horizontal à 375px : aucun détecté

## Corrections appliquées

### Fix A — Timeline mobile — `timeline.html`
**Problème :** Sur mobile (< 1024px), le dot était à `left: 24px` sur le bord du padding, partiellement coupé. Cards avec padding gauche insuffisant.

**Fix :**
- `.timeline-wrapper` : ajout `padding-left: 1rem; padding-right: 1rem`
- `::before` (ligne verticale) : `left: 24px` → `left: 32px`
- `.timeline-row` : `padding-left: 2rem`, `margin-bottom: 4rem` → `3rem`
- `.is-card` / `.is-media` : padding `4rem` → `3rem`
- `.timeline-dot` : `left: 24px` → `left: 32px`, `top: 2rem` → `top: 1.5rem`
- Ajout `@media (max-width: 480px)` : dot et ligne à `left: 20px`, cards `padding-left: 2.5rem`

### Fix B — Grille sans breakpoint mobile — `ressources.html:357`
**Problème :** `<dl class="grid grid-cols-2">` dans une modale sans fallback colonne unique.

**Fix :** `grid-cols-1 sm:grid-cols-2`

## Audit grep

| Catégorie | Occurrences | Action |
|-----------|-------------|--------|
| `grid-cols-[2-6]` sans breakpoint | 1 (`ressources.html:357`) | ✅ Corrigé |
| `flex` sans `flex-col` / direction | Patterns icône+texte uniquement | ✅ Aucun débordement réel |
| `<img>` sans `w-full` / `max-w` | Toutes ont contraintes (multilignes) | ✅ OK |
| `<iframe>` sans `aspect-video` | 0 iframe dans le projet | ✅ OK |

## Détail par page

### index.html
| Viewport | Statut | Notes |
|----------|--------|-------|
| 375px | ✅ | Hero, bento grid, navbar hamburger OK |
| 768px | ✅ | |
| 1280px | ✅ | |

### parcours.html
| Viewport | Statut | Notes |
|----------|--------|-------|
| 375px | ✅ | Carte Leaflet, filtres sticky, trail cards 1 col |
| 768px | ✅ | |
| 1280px | ✅ | |

### sites.html
| Viewport | Statut | Notes |
|----------|--------|-------|
| 375px | ✅ | Subnav sticky, sections alternées, bandeau éco OK |
| 768px | ✅ | |
| 1280px | ✅ | |

### timeline.html
| Viewport | Statut | Notes |
|----------|--------|-------|
| 375px | ✅ | Dots et ligne repositionnés, cards lisibles, tabs fonctionnels |
| 768px | ✅ | |
| 1280px | ✅ | |

### temoignages.html
| Viewport | Statut | Notes |
|----------|--------|-------|
| 375px | ✅ | Grille témoignages 1 col, aucun iframe |
| 768px | ✅ | |
| 1280px | ✅ | |
