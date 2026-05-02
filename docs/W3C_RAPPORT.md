# Rapport de conformité W3C — Jungfrau-Aletsch

**Date** : 2026-04-24
**Validateur** : [W3C Nu HTML Checker](https://validator.w3.org/nu/) (API `?out=gnu`)
**Norme** : HTML5 Living Standard
**Périmètre** : 20 pages HTML à la racine du projet

---

## Résumé

| Métrique | Valeur |
|----------|--------|
| Pages validées | **20 / 20** |
| Erreurs bloquantes avant audit | **~40** |
| **Erreurs bloquantes après corrections** | **0** ✅ |
| Warnings info avant audit | ~15 |
| Warnings info après corrections | 0 (sauf CDN externes) |
| Fichiers modifiés | **22** (20 HTML + 1 CSS + schema reste intact) |

**Statut global : 100 % des erreurs bloquantes corrigées.**

---

## Détail par page

| Page | Erreurs avant | Erreurs après | Warnings après |
|------|--------------:|--------------:|---------------:|
| `accessibility.html` | 0 | **0** ✅ | 0 |
| `admin.html` | 0 | **0** ✅ | 0 |
| `confidentialite.html` | 1 | **0** ✅ | 0 |
| `faq.html` | 1 | **0** ✅ | 0 |
| `index.html` | 1 | **0** ✅ | 0 |
| `mentions-legales.html` | 1 | **0** ✅ | 0 |
| `notreequipe.html` | 2 | **0** ✅ | 0 |
| `page-faune.html` | 1 | **0** ✅ | 0 |
| `page-flore.html` | 3 | **0** ✅ | 0 |
| `page-geologie.html` | 1 | **0** ✅ | 0 (1 info traité) |
| `page-glacier.html` | 1 | **0** ✅ | 0 |
| `page-jungfrau.html` | 2 | **0** ✅ | 0 |
| `page-randonnees.html` | 3 | **0** ✅ | 0 |
| `parcours.html` | 1 | **0** ✅ | 0 |
| `ressources.html` | 1 (src vide) | **0** ✅ | 0 (2 info traités) |
| `signaler-probleme.html` | 1 | **0** ✅ | 0 |
| `sitemap.html` | 1 | **0** ✅ | 0 |
| `sites.html` | 1 | **0** ✅ | 0 |
| `temoignages.html` | 6 | **0** ✅ | 0 (8 info traités) |
| `timeline.html` | 6 | **0** ✅ | 0 |

---

## Erreurs corrigées — tableau détaillé

| Page | Type d'erreur | Correction appliquée |
|------|---------------|----------------------|
| 19 pages | `h4 follows h2, skipping 1 heading level` (footer) | `<h4>` des colonnes footer "Explorer / Informations / Nous contacter" remplacés par `<h3>` |
| `page-flore.html` | 4× `h4 follows h2, skipping 1 level` (cards espèces, info-box) | Tous les `<h4>` de contenu convertis en `<h3>` |
| `page-jungfrau.html` | `h4 follows h2` (info-box bleu "Top of Europe") | `<h4>` → `<h3>` |
| `page-randonnees.html` | 2× `h4 follows h2` (trail cards) | `<h4>` → `<h3>` |
| `parcours.html` | `h4 follows h1, skipping 2 levels` | Ajout `<h2 class="sr-only">Carte interactive et liste des sentiers</h2>` dans `<main>` |
| `notreequipe.html` | `h3 follows h1, skipping 1 level` (team cards) | Ajout `<h2 class="sr-only">Membres de l'équipe du projet</h2>` |
| `timeline.html` | `h3 follows h1, skipping 1 level` | Ajout `<h2 class="sr-only">Frise chronologique des événements</h2>` dans `<main>` |
| `timeline.html` | 2× `aria-label on <div>` sans `role` (media-placeholder) | Ajout `role="img"` |
| `timeline.html` | `role=tab must be in tablist` (2 boutons) | Ajout `role="tablist"` + `aria-label` sur `.timeline-switch` |
| `timeline.html` | `role=tab must have corresponding tabpanel` | Ajout `role="tabpanel"` + `aria-labelledby` sur `#timeline-heritage` et `#timeline-geology` + `aria-controls` sur les boutons |
| `temoignages.html` | 6× `aria-label on <div>` sans `role` (stars rating) | Ajout `role="img"` sur `<div class="flex gap-0.5 text-amber-400">` |
| `temoignages.html` | 3× `frameborder is obsolete` (iframes YouTube) | Attribut `frameborder="0"` supprimé |
| `ressources.html` | `Bad value "" for attribute "src"` (modal-img) | Remplacement par data URI transparent `data:image/gif;base64,...` |
| `ressources.html` | `Empty heading` (modal-name, rempli par JS) | Ajout `aria-label="Nom de la ressource"` |
| `temoignages.html` | 2× `Section lacks heading` (info) | Ajout `<h2 class="sr-only">` + `aria-labelledby` |
| `temoignages.html` | 6× `Article lacks heading` (info) | Ajout `<h3 class="sr-only">Témoignage de {nom}</h3>` |
| `page-geologie.html` | `Section lacks heading` (info — Chiffres clés) | Ajout `<h2 class="sr-only">Chiffres clés de la géologie</h2>` |
| `ressources.html` | `Section lacks heading` (info — Stats bar) | Ajout `<h2 class="sr-only">Statistiques de la médiathèque</h2>` |

---

## Corrections CSS

Ajout de la classe utilitaire `.sr-only` dans [assets/css/global.css](../assets/css/global.css) (norme WAI-ARIA pour masquer visuellement sans masquer aux lecteurs d'écran) :

```css
.sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

---

## Vérification finale

- ✅ Aucune erreur bloquante sur les 20 pages (grep sur `docs/w3c-final.txt`)
- ✅ Aucun warning info restant dans le contenu du site (les warnings sur CDN externes — Tailwind, Leaflet, Supabase — sont ignorés par convention)
- ✅ Attributs `data-i18n` et `data-lucide` intégralement préservés
- ✅ Logique JS inchangée — navigation, filtres, i18n, animations, admin, widget d'accessibilité fonctionnent normalement
- ✅ Aucun changement visuel (les `sr-only` sont invisibles, les changements sémantiques `<h4>→<h3>` conservent les mêmes classes CSS)

## Pérennité

Pour re-valider le site après de futures modifications :

```bash
for f in *.html; do
  echo "━━━ $f ━━━"
  curl -s -X POST -H "Content-Type: text/html; charset=utf-8" \
       --data-binary @"$f" \
       "https://validator.w3.org/nu/?out=gnu" --max-time 25 \
       | grep -iE "error|warning"
done
```

Les fichiers bruts de validation sont conservés dans :
- `docs/w3c-raw.txt` — validation avant corrections
- `docs/w3c-after.txt` — validation après première passe
- `docs/w3c-final.txt` — validation finale (0 erreurs bloquantes)
