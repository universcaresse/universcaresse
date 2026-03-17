# BRIEF — UNIVERS CARESSE
*Mis à jour : 14 mars 2026 — Session samedi soir*

---

## CONTEXTE
Projet web savonnerie artisanale. Fichiers: `index.html`, `admin.js`, `main.js`, `style.css`, `index_-_Admin.html`, Apps Script Google Sheets (ID: `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`).

---

## RÈGLES DE TRAVAIL — CLAUDE TRAVAILLEUR

1. Réponses et explications brèves
2. Proposer une solution, pas expliquer le problème
3. Toujours résumer la demande avant de commencer pour valider la compréhension
4. **Toujours demander l'autorisation avant de coder — attendre le OUI explicite**
5. Ne jamais suggérer de se reposer, prendre une pause, mentionner l'heure
6. Quand "réécrit" est demandé, retourner le bloc AU COMPLET sans rien modifier sauf ce qui est demandé
7. Pas d'emoji qui rit quand un problème ne se règle pas
8. Avant tout travail de code, lire le fichier REFERENCE et s'y conformer strictement
9. **Ne jamais ajouter de style inline dans le JS ou le HTML**
10. **Ne jamais créer une nouvelle fonction ou classe CSS si une existante peut être réutilisée**
11. Toujours vérifier : est-ce qu'une classe CSS existe déjà pour ça ?
12. Toujours évaluer si un changement a un impact ailleurs sur tout le site
13. Lors du refactoring, procéder une étape à la fois — attendre le OK avant de passer à la suivante
14. **Livraison du code — CRITIQUE :** Changement ciblé → trouve/remplace uniquement. Changement majeur → demander permission. Jamais fichier complet sans permission.
15. **Un seul changement à la fois** — attendre la confirmation avant le suivant
16. Ne pas montrer l'analyse technique — juste résumer la solution en langage simple
17. **Commits GitHub** → ne jamais en demander — Jean-Claude gère ses commits
18. **Suivi des changements en attente** → garder en mémoire tout changement non confirmé
19. **Fin de tâche** → dire **COMMIT** puis proposer la prochaine tâche
20. **Le brief** → toujours produit en entier en `.md` téléchargeable en fin de session
21. Appellation : utiliser **"sur-titre"** au lieu de "eyebrow"
22. **Trouve/remplace** → toujours lire le fichier reçu avec `cat -A` avant d'écrire le cherche — chaîne unique — indiquer le mode Notepad++ (Normal ou Étendu) — vérifier conflits — confirmer fonction cible
23. Toujours retirer du CSS/HTML/JS ce qui a été ajouté quand ce n'est plus utile
24. **Pas de romans** — réponses courtes, une action à la fois, pas d'analyse visible
25. **Commits** → ne pas attendre le commit pour proposer la prochaine tâche — demander plus tard si c'est réglé

### VIOLATIONS À NE PLUS JAMAIS RÉPÉTER
- Coder sans attendre le OUI explicite
- Ajouter du style inline dans le HTML ou le JS
- Livrer un fichier complet sans permission
- Proposer plusieurs changements en même temps
- Expliquer l'analyse technique au lieu de résumer simplement
- Écrire un trouve/remplace sans lire le fichier reçu avec `cat -A`
- Livrer des fichiers complets inutilement
- Écrire de longs paragraphes d'analyse au lieu d'agir
- Écrire un cherche qui ne fonctionne pas dans Notepad++

---

## ✅ RÉGLÉ — SESSION 14 MARS 2026 (soir)

- **Sections éducatives — mise en page** — 7 sections créées dans `sections-educatives-v2.html` (prototype validé)
- **Sections éducatives — intégration index.html** — nouvelle `page-section` id `section-educatif` ajoutée entre Catalogue et Bon à savoir
- **Sections éducatives — navigation** — lien "Le savon artisanal" ajouté dans le menu nav
- **Sections éducatives — affichage une à la fois** — fonction `afficherEduSection()` ajoutée dans `main.js`
- **Sections éducatives — CSS** — classes `edu-*` ajoutées dans `style.css` (collé en 2 étapes, fonctionne)
- **Sections éducatives — styles inline tableau section 7** — laissés en place volontairement, sera refait quand les sections seront gérées via la Sheet/admin

---

## ✅ RÉGLÉ — SESSION 14 MARS 2026 (après-midi)

- **Collections secondaires — fiche recette consultation** — champ ajouté dans `admin.js`
- **Collections secondaires — ordre par rang** — sélecteur formulaire recette trié par rang via `donneesCollections`
- **Collections secondaires — cases cochées qui persistent** — réglé (reset déjà en place)
- **Collections secondaires — recettes non affichées sur le site public** — `row[19]` corrigé en `row[20]` dans `getCataloguePublic`
- **Modal produit — paysage iPad** — media query `orientation: landscape` ajoutée dans `style.css`
- **Boutons Fermer admin** — remplacés par X dans un cube dans `index_-_Admin.html` (5 boutons)
- **Textarea description collection** — `min-height` passé de 80px à 120px
- **Textarea description ligne** — `rows="4"` ajouté
- **Description emballage** — champ ajouté dans HTML, `admin.js`, Apps Script (col V de la Sheet Recettes)
- **Filtres inventaire** — recherche par nom, type, fournisseur ajoutés dans HTML et `admin.js`
- **Filtres inventaire — visuel** — classes `form-ctrl filtre-select` appliquées

---

## ✅ RÉGLÉ — SESSION 14 MARS 2026 (matin)

- **Tuiles collections — lignes empilées** — `.collection-carte-lignes-haut` : `flex-direction: column; align-items: flex-start`
- **Collections secondaires — contamination entre recettes** — reset des cases à `false` avant de cocher
- **Collections secondaires — casse** — comparaison `.toUpperCase()` pour éviter mismatch

---

## ✅ RÉGLÉ — SESSION 13 MARS 2026 (matin)

- **Cloudinary overlay iPad** — nettoyage de l'overlay après fermeture
- **Fiche collection — boutons** — ordre inversé : Modifier / Supprimer / + Ajouter une ligne / ✕
- **Fiche collection — bouton Fermer** — remplacé par X dans un cube aligné à droite
- **Photo recette après sauvegarde** — `await chargerRecettes()` ajouté
- **Photo recette — colonne Sheet** — `image_url_noel` corrigée en colonne T dans `saveRecette` et `getRecettes`
- **Fiche recette consultation** — `image_url_noel` ajoutée dans le bloc `fiche-visuel`
- **Statut public/test sur les cartes recettes** — badge déplacé en bas à droite
- **Page factures — ligne cliquable** — bouton Voir retiré, `tr.onclick`
- **Page factures — styles inline** — remplacés par classes CSS
- **Page factures — filtres en cascade** — fournisseur → statut → période
- **Page factures — total dynamique** — en bas, recalculé selon les filtres
- **Page factures — bouton Réinitialiser** — remplacé par X dans un cube
- **Page factures — total** — `parseFloat` ajouté pour corriger le calcul
- **Inventaire — colonne Prix/g** — retirée
- **Inventaire — styles inline** — remplacés par classes CSS
- **Inventaire — meilleur prix** — fournisseur le moins cher en vert avec ★
- **Inventaire — colonnes alignées** — un seul tableau global, catégories en rangées `.inv-titre-rangee`
- **Filtre recette par nom** — réinitialisé à la fermeture de la fiche
- **Photo de fond admin** — `fond.png` à 7% d'opacité, côté gauche, portrait seulement

---

## ✅ RÉGLÉ — SESSIONS PRÉCÉDENTES

- **Suppression collection** — `deleteRow` au lieu de `clearContent`, boucle décroissante
- **Fiche collection** — cache `contenu-collections` à l'ouverture
- **Fiche recette** — cache `filtres-bar` et `grille-recettes` à l'ouverture
- **Page Densités** — multiples corrections HTML et CSS
- **Fiches recettes** — s'ouvrent correctement
- **Bouton Supprimer ligne** — vérifie les recettes liées avant suppression
- **Ingrédients de base en mode modification** — vérifie `fr-id` avant de copier
- **Tuiles recettes hauteur inégale** — `min-height` sur `.recette-nom`
- **Menu admin — catégories trop pâles** — `.sidebar-titre` : `color: var(--gris)`
- **Lignes de produits cliquables** — bouton Modifier retiré, cliquable via `onclick`
- **Cloudinary Media Library** — `.show()` natif, `_mediaLibrary` recréé à chaque appel

---

## 🔴 BOGUES EN COURS — PRIORITÉ

- [ ] **Collections secondaires — couleur de la section** — la couleur de la collection secondaire a été remplacée par `var(--gris)` sur le site public
- [ ] **Collections secondaires — description** — la recette affiche la description de sa collection principale au lieu de celle de la collection secondaire sur le site public
- [ ] **Ligne de produit dans collection — clic ouvre modification** — devrait ouvrir la consultation, pas le mode modification

---

## 🔴 BOGUES EN ATTENTE

- [ ] **Prix/g ne s'affiche pas dans le modal** — à revoir quand le calcul du prix sera revu

---

## 🟡 AMÉLIORATIONS EN ATTENTE — PUBLIC

- [ ] Mosaïque hero — alimenter dynamiquement avec 3 tuiles *(pas assez d'info)*
- [ ] Textes Sheet → page publique — supporter le Markdown simplifié
- [ ] Réviser les textes — revoir avec Chantal
- [ ] Liste INCI sur fiche recette — présentation élégante
- [ ] Informer les visiteurs comment acheter
- [ ] Actualités — générées automatiquement depuis le Sheet
- [ ] FAQ — gérable depuis l'admin
- [ ] **Sections éducatives — tester sur toutes les plateformes** (PC, iPad portrait, iPad paysage, mobile) après intégration dans index.html

---

## 🟡 AMÉLIORATIONS EN ATTENTE — ADMIN

### UX / Interface — Global
- [ ] Comportement global — masquer tout le contenu sauf l'entête à l'ouverture d'une fiche/formulaire
- [ ] Inverser l'ordre Modifier/Supprimer partout
- [ ] **Navbar admin — ajouter item Vente (désactivé)** *(basse priorité)*
- [ ] **Boutons Modifier/Enregistrer** — déplacés en bas de fiche, X aligné à l'extrême droite de l'entête

### Collections
- [ ] **Ordre des collections par rang** — sélecteur formulaire recette ET page collections
- [ ] Formats — plusieurs formats par ligne de produits
- [ ] Tuiles collections — revoir l'affichage des lignes de produits

### Recettes
- [ ] Calculateur SAF — intégré à la fiche recette
- [ ] Générateur INCI — nécessite champ `nom_inci` sur chaque ingrédient
- [ ] Coût de revient — séparer ingrédients / emballages / amortissement

### Factures
- [ ] Bouton Modifier dans le modal facture
- [ ] Formats — aucune gestion possible — à construire
- [ ] Page factures — filtre "Par produit"
- [ ] Page factures — remplacer boutons par icônes

### Inventaire
- [ ] Filtres inventaire — revoir le visuel *(en cours)*

### Contenu du site
- [ ] **Page contenu admin** — affichage identique au site public avec champs éditables inline, incluant les photos
- [ ] **Sections éducatives — gestion via admin** — les 7 sections sont actuellement en dur dans `index.html`. À refactoriser pour que les textes soient éditables via l'admin et stockés dans Google Sheets. Quand ce sera fait, retirer le contenu en dur du HTML et les classes CSS `edu-*` temporaires de `style.css` ainsi que la fonction `afficherEduSection()` de `main.js` si elles deviennent inutiles.
- [ ] Revoir les padding sur les champs

### Comptabilité *(nouvelle section)*
- [ ] Ajouter section "Comptabilité" dans le menu admin
- [ ] État des résultats — par catégories, filtre par période, comparatif 2 ans
- [ ] Bilan

---

## ♿ ACCESSIBILITÉ

- [ ] Augmenter taille texte minimum mobile (16px → 20px)

---

## 🔵 À FAIRE — FUTUR

- [ ] Nom de domaine `universcaresse.ca`
- [ ] Catalogue PDF — format 11×17
- [ ] Amortissement équipements dans coût de revient
- [ ] Scraping PureArome + Arbressence + Scan QuaggaJS
- [ ] Confection
- [ ] Corrections inventaire (ajustement manuel)
- [ ] Section Listes

---

## 📐 TYPOGRAPHIE — INVENTAIRE EN COURS

Modifier toujours du plus grand au plus petit :
`3.5rem → 3.2rem → 2.8rem → 2.5rem → 2.2rem → 1.8rem → 1.6rem → 1.5rem → 1.4rem → 1.3rem → 1.2rem → 1.15rem → 1.1rem → 0.95rem → 0.9rem → 0.88rem → 0.85rem → 0.84rem → 0.82rem → 0.8rem → 0.78rem → 0.75rem → 0.73rem → 0.72rem → 0.7rem → 0.68rem → 0.65rem → 0.62rem → 0.6rem`

---

## ✅ DÉCISIONS PRISES

- Appellation uniforme — **"Recettes"** partout, public ET admin
- "Eyebrow" → **"Sur-titre"**
- Livraison par trouve/remplace uniquement
- Un changement à la fois — confirmation avant le suivant
- Commits GitHub gérés par Jean-Claude uniquement
- Brief toujours produit en entier en `.md` téléchargeable en fin de session
- Modifier les polices toujours du plus grand au plus petit
- Fiche collection — rang affiché comme chiffre centré dans le carré couleur
- Formulaire "Modifier la ligne" — affiche seulement : Ligne, Format, Description ligne, Ingrédients de base
- Couleur HEX et Photo appartiennent à la collection, pas à la ligne de produits
- Collections secondaires — cases à cocher (pas liste multiple)
- 2e photo recette — colonne T dans la sheet, nom `image_url_noel`
- Overlay cartes produits et recettes — classe unifiée `recette-couleur-overlay`
- Prix/g — formule : `prixUnitaire ÷ (quantité_en_g × (1 - margePerte/100))`
- inputmode decimal pour tous les champs prix
- Google Sheets format QC — `parseFloat` sans `.toFixed()`
- Sheet Listes : col A=Type, B=Ingrédient, C=Contenant habituel, D=Contenant (lookup), E=Quantité, F=Unité
- Sheet Config : col A=Type, B=Densité, C=Unité source, D=marge_perte_pct
- Toujours retirer du code ce qui a été ajouté quand ce n'est plus utile
- Inventaire — un seul tableau global, catégories en rangées de titre
- Sheet Recettes — col V = `desc_emballage`
- Ne pas attendre le commit pour proposer la prochaine tâche
- Trouve/remplace — toujours indiquer le mode Notepad++ (Normal ou Étendu)
- Sections éducatives — structure SPA, une section à la fois via `afficherEduSection(num)`
- Sections éducatives — menu nav : Accueil → Catalogue → Le savon artisanal → Bon à savoir → Contact

---

## L'ÉQUIPE

| Rôle | Qui | Mandat |
|------|-----|--------|
| Claude Idéateur | Jean-Claude | Vision, créativité, orientation |
| Claude Organisateur | Claude (dédié) | Structure, priorise, documente |
| Claude Chercheur | Claude (dédié) | Explore options techniques |
| Claude Scripteur | Claude (dédié) | Rédige textes avec Chantal |
| Claude Travailleur | Claude (dédié) | Exécute le code — une étape à la fois |

---

*Univers Caresse — Confidentiel — 14 mars 2026*
