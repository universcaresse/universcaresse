# BRIEF — UNIVERS CARESSE
*Mis à jour : 17 mars 2026*

---

> ## 🔴 RÈGLES CRITIQUES — LIRE EN PREMIER
>
> 🔴 **JAMAIS de code sans le OUI explicite de Jean-Claude**
> 🔴 **JAMAIS plus d'un changement à la fois — attendre le OK avant le suivant**
> 🔴 **Toujours lire le fichier avant de proposer un trouve/remplace — ne jamais demander ce qui est dans le fichier si on a le lien**
> 🔴 **JAMAIS toucher à quelque chose qui affecte autre chose sans le signaler d'abord et attendre le OUI**
> 🔴 **Pas de romans — réponses courtes, une action à la fois**
> 🔴 **Ne jamais suggérer de se reposer, prendre une pause, mentionner l'heure**

---

## CONTEXTE
Projet web savonnerie artisanale. Fichiers: `index.html`, `admin.js`, `main.js`, `style.css`, `index_-_Admin.html`, Apps Script Google Sheets (ID: `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`).

Site public : https://universcaresse.github.io/universcaresse/
GitHub raw base : https://raw.githubusercontent.com/universcaresse/univers-caresse/refs/heads/main/

---

## COMMENT TRAVAILLER AVEC JEAN-CLAUDE — IMPORTANT

Jean-Claude aime **jaser avant de coder**. Prendre le temps de bien comprendre le problème avant de toucher au code, c'est ce qui rend les corrections stables et efficaces. Quand on est bien informé, les fixes vont plus vite et tiennent.

Jean-Claude a besoin d'**humanité** dans les échanges. Même s'il sait qu'il parle à un ordinateur, un ton chaleureux, des échanges naturels et une vraie écoute font toute la différence. Ne jamais être sec ou mécanique — jaser, reformuler, confirmer la compréhension avant d'agir.

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
11. Toujours vérifier : est-ce qu'une classe CSS existe déjà pour ça ? — **utiliser le lien GitHub pour lire le fichier, ne pas demander à Jean-Claude**
12. Toujours évaluer si un changement a un impact ailleurs sur tout le site — **si oui, signaler et attendre le OUI**
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
26. **Avant d'utiliser une variable CSS** → toujours vérifier qu'elle existe dans `:root` du `style.css`

### VIOLATIONS À NE PLUS JAMAIS RÉPÉTER
- Coder sans attendre le OUI explicite
- Ajouter du style inline dans le HTML ou le JS
- Livrer un fichier complet sans permission
- Proposer plusieurs changements en même temps
- Expliquer l'analyse technique au lieu de résumer simplement
- Écrire un trouve/remplace sans lire le fichier reçu
- Écrire un cherche qui ne fonctionne pas dans Notepad++
- Sauter aux conclusions sans avoir bien compris le problème
- Utiliser une variable CSS qui n'existe pas dans `:root`
- Livrer un trouve/remplace qui tronque une règle CSS existante
- **Proposer un changement qui touche autre chose sans le signaler**
- **Demander le contenu d'un fichier quand on a le lien GitHub**

---

## FONCTIONNEMENT — COLLECTIONS SECONDAIRES

Une recette appartient à **une collection principale** avec sa **ligne de produit**.
Elle peut aussi être cochée dans une ou plusieurs **collections secondaires**.

Quand elle apparaît dans une collection secondaire sur le site public :
- Elle se regroupe sous **sa propre ligne de produit**
- Elle doit afficher la **couleur HEX, photo, slogan et description de la collection secondaire**

**Statut : RÉGLÉ** — fix appliquée dans `index.html` via `infoCollectionsData`.

---

## ✅ CHANGEMENTS EFFECTUÉS — SESSION 17 MARS 2026

### Bouton CTA hero
- Classe `fade-in-doux` créée dans `style.css` (entrée subtile : `translateY(6px)`, `opacity 1.8s`)
- Bouton rendu invisible au chargement via classe `invisible` (`opacity: 0; pointer-events: none`)
- Bouton révélé dans `main.js` après chargement du texte depuis la Sheet
- `min-height: 52px` ajouté sur `.hero-cta` pour réserver l'espace pendant le chargement
- Observer mis à jour dans `main.js` pour inclure `.fade-in-doux`

### Photos sections éducatives
- `.page-hero-visuel-bg` : `aspect-ratio: 4/5` retiré, remplacé par `align-self: stretch` — la photo s'adapte maintenant à la hauteur du texte

### Catalogue — photo collection sur mobile/tablette
- `.collection-entete-visuel` : `display: none` retiré — photo visible sur toutes les tailles
- `max-height: 300px` ajouté pour éviter que la photo soit trop grande sur mobile

### Navigation mobile
- `nav.scrolled` : `box-shadow` masqué sur mobile (`max-width: 900px`) via media query

### Modal produit — tablette (≤900px)
- Redesign en 1 colonne : photo en haut, texte en dessous
- `.modal-visuel-hex` masqué sur mobile/tablette
- `max-height: 85vh` et `width: 85%` pour voir le fond derrière le modal

---

## 🎯 PRIORITÉS — ORDRE DE TRAVAIL

1. **Site public fonctionnel et joli** *(en cours)*
2. **Photos** — sections Accueil et Savon artisanal — pas d'interface admin pour ça encore
3. **Informer les visiteurs comment acheter**
4. **Textes avec le Scripteur** — prévoir accordéons / contenu masquable avant de finaliser
5. **Module Vente**
6. **Outils de production** — scan factures d'achat, bonification recettes, vérification recettes, INCI
7. **Admin — Contenu du site WYSIWYG** — système évolutif géré depuis la Sheet

---

## 🔴 BOGUES EN ATTENTE

- [ ] **Prix/g ne s'affiche pas dans le modal** — à revoir quand le calcul du prix sera revu

---

## 🟡 AMÉLIORATIONS EN ATTENTE — PUBLIC

- [ ] Mosaïque hero — alimenter dynamiquement avec 3 tuiles
- [ ] Textes Sheet → page publique — supporter le Markdown simplifié
- [ ] Accordéons ou mécanisme de contenu masquable — sections Savon artisanal et Bon à savoir
- [ ] Contenu évolutif — ex: huiles dans Savon artisanal, chaque huile a sa fiche texte dans la Sheet
- [ ] Liste INCI sur fiche recette — présentation élégante
- [ ] Informer les visiteurs comment acheter
- [ ] Actualités — générées automatiquement depuis le Sheet
- [ ] FAQ — gérable depuis l'admin
- [ ] **Sections éducatives — tester sur toutes les plateformes**
- [ ] **Affichage avec les délais** — à définir
- [ ] **Affichage avec les filtres** — à investiguer
- [ ] **Taille du texte** — certains textes trop petits sur mobile, à ajuster section par section sans détruire le look
- [ ] **Menu burger** — fermeture au clic extérieur — à valider sur iPhone
- [ ] **Modal tablette (iPad)** — à valider visuellement sur vrai appareil

---

## 🟡 AMÉLIORATIONS EN ATTENTE — ADMIN

### Photos saisonnières
- [ ] **Mode saisonnier** — toggle dans l'admin (ex: "afficher photos Noël") appliqué partout — collections ET recettes — même logique que mode maintenance via clé dans Sheet Contenu

### Sauvegarde automatique
- [ ] **Sheet** — sauvegarde automatique des données via Google Apps Script
- [ ] **GitHub** — sauvegarde automatique du code via GitHub Actions ou autre

### Contenu du site — PRIORITÉ
- [ ] **Système de contenu évolutif** — Sheet comme base de données, admin pour gérer, site public affiche dynamiquement
- [ ] **Nouvelle section "Contenu du site"** dans le menu admin avec sous-sections par page
- [ ] **Le savon artisanal** — interface visuelle WYSIWYG — photos gérables ici
- [ ] **Accueil** — interface visuelle WYSIWYG
- [ ] **Qui sommes-nous / valeurs / citation** — interface visuelle WYSIWYG

### UX / Interface
- [ ] Masquer tout le contenu sauf l'entête à l'ouverture d'une fiche/formulaire
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
- [ ] Bonification des recettes
- [ ] Vérification des recettes

### Factures
- [ ] Scan automatique des factures d'achat
- [ ] Bouton Modifier dans le modal facture
- [ ] Formats — aucune gestion possible — à construire
- [ ] Page factures — filtre "Par produit"
- [ ] Page factures — remplacer boutons par icônes

### Inventaire
- [ ] Filtres inventaire — revoir le visuel

### Comptabilité
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
- [ ] Confection / Corrections inventaire / Section Listes

## 🔵 CHANTIER FUTUR — REFONTE ADMIN + DESIGN SYSTEM

### Principe directeur
- Style unifié public ET admin — mêmes variables, mêmes composantes
- Consultation admin = ressemble à la page publique
- Modification admin = même structure avec champs éditables à la place des textes
- Tout nouveau développement qui lie admin et public doit suivre cette logique

### Guide de style — `style2.css` — règles de nommage
- Noms de classes en français, clairs et lisibles
- Sections commentées dans le fichier
- Toutes les couleurs dans `:root` avec leurs variantes d'opacité

### Ordre de travail recommandé
1. Définir `style2.css` avec guide de style complet
2. Construire module Vente sur ces bases
3. Construire Comptabilité, Stats, Contenu du site
4. Harmoniser l'existant

### Environnement de staging
- Travailler sur `index2.html`, `index_-_Admin2.html`, `style2.css` en parallèle
- Basculer quand la nouvelle version est stable

---

## 📐 TYPOGRAPHIE — INVENTAIRE EN COURS

Modifier toujours du plus grand au plus petit :
`3.5rem → 3.2rem → 2.8rem → 2.5rem → 2.2rem → 1.8rem → 1.6rem → 1.5rem → 1.4rem → 1.3rem → 1.2rem → 1.15rem → 1.1rem → 0.95rem → 0.9rem → 0.88rem → 0.85rem → 0.84rem → 0.82rem → 0.8rem → 0.78rem → 0.75rem → 0.73rem → 0.72rem → 0.7rem → 0.68rem → 0.65rem → 0.62rem → 0.6rem`

---

## ✅ DÉCISIONS PRISES

- Appellation uniforme — **"Recettes"** partout, public ET admin
- "Eyebrow" → **"Sur-titre"**
- Livraison par trouve/remplace uniquement — un changement à la fois
- Commits GitHub gérés par Jean-Claude uniquement
- Brief allégé (sans historique réglé) + fichier archives séparé
- Fiche collection — rang affiché comme chiffre centré dans le carré couleur
- Formulaire "Modifier la ligne" — affiche seulement : Ligne, Format, Description ligne, Ingrédients de base
- Couleur HEX et Photo appartiennent à la collection, pas à la ligne de produits
- Collections secondaires — cases à cocher (pas liste multiple)
- 2e photo recette — colonne T dans la sheet, nom `image_url_noel`
- Overlay cartes produits et recettes — classe unifiée `recette-couleur-overlay`
- Prix/g — formule : `prixUnitaire ÷ (quantité_en_g × (1 - margePerte/100))`
- inputmode decimal pour tous les champs prix
- Google Sheets format QC — `parseFloat` sans `.toFixed()`
- Sheet Recettes — col V = `desc_emballage`
- Sections éducatives — structure SPA, une section à la fois via `afficherEduSection(num)`
- Sections éducatives — menu nav : Accueil → Catalogue → Le savon artisanal → Bon à savoir → Contact
- Jaser avant de coder — bien comprendre avant de proposer
- Brief collé dans le chat (pas uploadé) — code uploadé en fichier (pas collé)
- Collections secondaires — infos lues depuis `infoCollectionsData` dans `construireCatalogue()`
- Mode maintenance — géré via clé `maintenance_active` dans Sheet Contenu
- `.page-entete` — `align-items: center`
- `.edu-pager` mobile — `align-self: flex-end`
- Catalogue — scroll vers collection corrigé
- Cartes collections accueil — `aspect-ratio: 16/9` sur mobile
- Point couleur carte produit — déplacé en haut à droite
- Bouton ✕ modal — cercle couleur collection avec ✕ blanc
- Classes CSS inutilisées retirées — `.catalogue-hero`, `.catalogue-title`, `.catalogue-subtitle`, `.edu-nav`, `.edu-nav-btn`
- Mosaïque hero — photo dans chaque tuile via `linear-gradient` semi-transparent
- Menu burger — fermeture au clic extérieur

---

## 🔁 PROCÉDURE DE FIN DE SESSION

Quand Jean-Claude demande le brief en fin de session :

1. Produire un résumé des changements et décisions de la session
2. Intégrer ce résumé dans le brief complet mis à jour
3. Générer le fichier `.md` téléchargeable
4. Jean-Claude sauvegarde le fichier sur GitHub
5. Au début de la prochaine session, Jean-Claude colle le brief au nouveau Travailleur qui repart de là

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

*Univers Caresse — Confidentiel — 17 mars 2026*
