# BRIEF — UNIVERS CARESSE
*Mis à jour : 15 mars 2026*

---

## CONTEXTE
Projet web savonnerie artisanale. Fichiers: `index.html`, `admin.js`, `main.js`, `style.css`, `index_-_Admin.html`, Apps Script Google Sheets (ID: `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`).

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
- Écrire un cherche qui ne fonctionne pas dans Notepad++
- Sauter aux conclusions sans avoir bien compris le problème — toujours jaser d'abord

---

## FONCTIONNEMENT — COLLECTIONS SECONDAIRES

Une recette appartient à **une collection principale** avec sa **ligne de produit**.
Elle peut aussi être cochée dans une ou plusieurs **collections secondaires**.

Quand elle apparaît dans une collection secondaire sur le site public :
- Elle se regroupe sous **sa propre ligne de produit**
- Elle doit afficher la **couleur HEX, photo, slogan et description de la collection secondaire**

**Le bogue actuel :** la recette affiche bien le nom de la collection secondaire, mais utilise la couleur HEX, photo, slogan et description de sa collection principale.

**La fix :** dans `main.js`, quand une recette est rendue dans une collection secondaire, aller chercher les infos de cette collection secondaire dans les données des collections — pas dans la recette elle-même.

---

## 🔴 BOGUES EN COURS — PRIORITÉ

- [ ] **Collections secondaires — couleur et infos** — affiche les infos de la collection principale au lieu de la secondaire
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
- [ ] **Sections éducatives — tester sur toutes les plateformes** après intégration dans index.html

---

## 🟡 AMÉLIORATIONS EN ATTENTE — ADMIN

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

### Factures
- [ ] Bouton Modifier dans le modal facture
- [ ] Formats — aucune gestion possible — à construire
- [ ] Page factures — filtre "Par produit"
- [ ] Page factures — remplacer boutons par icônes

### Inventaire
- [ ] Filtres inventaire — revoir le visuel

### Contenu du site
- [ ] **Page contenu admin** — affichage identique au site public avec champs éditables inline
- [ ] **Sections éducatives — gestion via admin** — actuellement en dur dans `index.html`. Quand refactorisé, retirer contenu en dur, classes `edu-*` et fonction `afficherEduSection()` si inutiles.
- [ ] Revoir les padding sur les champs

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

*Univers Caresse — Confidentiel — 15 mars 2026*
