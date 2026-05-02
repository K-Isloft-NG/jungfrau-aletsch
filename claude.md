# 🤖 Contexte du Projet pour Claude IA

Salut Claude ! Ce document sert de point d'entrée pour te donner le contexte actuel du projet afin que nous puissions poursuivre le développement efficacement.

## 🎯 Contexte Général
Nous travaillons sur la création d'un site web pour **Jungfrau-Aletsch** (projet dans le cadre du BUT Informatique). L'objectif est de fournir une interface moderne, performante, accessible et responsive.

## 🗺️ Focus Actuel : La Page Parcours
Récemment, nous nous sommes concentrés sur l'intégration de la page **Parcours** (`parcours.html`), qui présente une carte interactive avec différents sentiers de randonnée.

### 🛠️ Dernières Implémentations Effectuées
Voici ce qui a été réalisé et validé récemment, principalement détaillé dans le fichier `README.md` et `DOCUMENTATION.md` :

1. **Refonte Architecturale (Vanilla JS vs React)** : 
   - Abandon d'une architecture complexe en React/TSX au profit d'un code en **Vanilla JS** (ES6+).
   - Plus de dépendance à un framework lourd pour cette fonctionnalité : code structuré par modules, simple et facile à maintenir (`parcours.js`).

2. **Carte Interactive SVG Optimisée** :
   - Remplacement des animations SVG trop complexes par un rendu simple, stable et épuré.
   - Mise en place d'event listeners propres en évitant les clickhandlers directs.
   - Les tracés sont désormais fluides, avec des couleurs dynamiques selon la difficulté (via `parcours.css`).
   - Marqueurs cliquables offrant un bon retour visuel.

3. **Gestion des Données Statiques** :
   - Mise en place d'un chargement asynchrone (Fetch API) ciblant un fichier de données local : `assets/data/trails.json` qui contient les 8 sentiers.
   - Intégration de filtres fonctionnels (par difficulté, etc.).

4. **Fonctionnalités Supplémentaires** :
   - Boutons de téléchargement fonctionnels pour générer et télécharger des tracés en format GPX et GeoJSON.
   - Design totalement responsive (Mobile, Tablette, Desktop) utilisant des classes utilitaires (Tailwind via CDN) combinées à du CSS personnalisé.

5. **Intégration au site global** :
   - Connexion de la page à la navigation principale (`index.html`) via la refonte de la navbar.

## 📋 Prochaines Étapes / To-Do
À partir de maintenant, nos axes de développement pourront concerner :
- L’amélioration de la carte SVG (ajout de zoom et de pan).
- L’ajout d'une modale détaillée pour les informations de chaque sentier.
- L'intégration d'un profil d'élévation dynamique.
- Voire l'intégration d'une vraie librairie cartographique (comme Leaflet ou Mapbox) si les besoins évoluent.
- La revue globale du reste du site (voir `TODO.txt` ou `NOTES_CORRECTIONS.md` potentiellement).

**Instruction pour Claude :**
Base-toi sur cet état des lieux pour m'aider à produire du code Vanilla JS optimisé, maintenir la cohérence du design, respecter les bonnes pratiques et assurer la responsivité globale du site !
