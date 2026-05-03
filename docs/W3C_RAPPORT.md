# Rapport W3C — Jungfrau-Aletsch
Date : 2026-05-03

## Résumé
- Pages validées : 20
- Erreurs corrigées : 4 (sur 3 pages)
- Warnings restants : 0

## Erreurs corrigées

| Page | Erreur | Fix appliqué |
|------|--------|-------------|
| `parcours.html` | `<h3>` suit `<h1>` en sautant le niveau 2 | `<h2 class="sr-only">` déplacé après `<h1>` |
| `ressources.html` | Heading vide : `<h3 id="modal-name">` sans contenu | `<span class="sr-only">Ressource</span>` ajouté par défaut |
| `ressources.html` | `grid-cols-2` sans breakpoint mobile | `grid-cols-1 sm:grid-cols-2` |
| `timeline.html` | `src=""` invalide sur `<img id="lightbox-img">` | Remplacé par `src="data:,"` |

## Détail par page

### accessibility.html
- ✅ 0 erreurs / 0 warnings

### admin.html
- ✅ 0 erreurs / 0 warnings

### confidentialite.html
- ✅ 0 erreurs / 0 warnings

### faq.html
- ✅ 0 erreurs / 0 warnings

### index.html
- ✅ 0 erreurs / 0 warnings

### mentions-legales.html
- ✅ 0 erreurs / 0 warnings

### notreequipe.html
- ✅ 0 erreurs / 0 warnings

### page-faune.html
- ✅ 0 erreurs / 0 warnings

### page-flore.html
- ✅ 0 erreurs / 0 warnings

### page-geologie.html
- ✅ 0 erreurs / 0 warnings

### page-glacier.html
- ✅ 0 erreurs / 0 warnings

### page-jungfrau.html
- ✅ 0 erreurs / 0 warnings

### page-randonnees.html
- ✅ 0 erreurs / 0 warnings

### parcours.html
- ✅ 0 erreurs / 0 warnings (1 erreur corrigée)

### ressources.html
- ✅ 0 erreurs / 0 warnings (2 erreurs corrigées)

### signaler-probleme.html
- ✅ 0 erreurs / 0 warnings

### sitemap.html
- ✅ 0 erreurs / 0 warnings

### sites.html
- ✅ 0 erreurs / 0 warnings

### temoignages.html
- ✅ 0 erreurs / 0 warnings

### timeline.html
- ✅ 0 erreurs / 0 warnings (1 erreur corrigée)

## Notes
- Les IDs `btn-en`, `btn-fr`, `navbar`, `footer`, `mobile-menu` apparaissent dans plusieurs fichiers mais une seule fois par page : pas d'erreur de duplication intra-page.
- Les `<img>` détectés sans `alt=` en grep monoligne ont tous leur `alt` sur la ligne suivante : aucun attribut manquant réel.
- Aucun iframe non responsive détecté.
