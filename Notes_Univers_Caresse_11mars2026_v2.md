# NOTES — UNIVERS CARESSE
*Mis à jour : 11 mars 2026 — Session soir*

---

## ⚠️ POST-MORTEM — CE QUI S'EST PASSÉ AUJOURD'HUI

### Violations commises par Claude Travailleur

1. **Règle #4 non respectée** — A codé sans attendre le OUI explicite à plusieurs reprises
2. **Règle #9 non respectée** — A ajouté du style inline (`style="background: var(--primary-70)"`) dans le HTML malgré la règle explicite
3. **Règle #14 non respectée** — A livré les fichiers complets au lieu de faire des trouve/remplace
4. **Règle #15 non respectée** — A proposé plusieurs changements en même temps au lieu d'un seul à la fois
5. **Règle #16 non respectée** — A expliqué l'analyse technique (aspect-ratio, max-height, etc.) au lieu de résumer en langage simple

### Conséquences
- Le fichier `index_-_admin.html` est dans un état intermédiaire cassé :
  - 2 premières tuiles regroupées dans `accueil-grande-tuile` avec style inline
  - Bouton Achats avec `onclick` dupliqué (bug introduit par Claude)
  - Les 6 tuiles restantes (Inventaire, Factures, Liste, Divers, Stock) pas encore regroupées
  - Classes CSS mixées — certaines tuiles ont encore `accueil-tuile-recettes`, `accueil-tuile-stock`, etc.
- Le fichier `style.css` est en état intermédiaire :
  - `.accueil-droite` ajouté mais pas testé
  - Nouvelles classes `.accueil-grande-tuile-vert/jaune/gris/gris-fonce` ajoutées
  - Anciennes classes `.accueil-tuile-*` toujours présentes

### À faire pour réparer
- Corriger le `onclick` dupliqué sur le bouton Achats
- Remplacer le style inline par la classe CSS
- Terminer le regroupement des 6 tuiles restantes en 2 grandes tuiles
- Valider visuellement que le scroll est réglé

---

## L'ÉQUIPE

| Rôle | Qui | Mandat |
|------|-----|--------|
| Claude Idéateur | Jean-Claude | Génère les idées en rafale — vision, créativité, orientation du projet |
| Claude Organisateur | Claude (conversation dédiée) | Structure, priorise, documente — produit les notes et briefs entre les sessions |
| Claude Chercheur | Claude (conversation dédiée) | Explore les options techniques, propose des approches et alternatives avant de coder |
| Claude Scripteur | Claude (conversation dédiée) | Rédige les textes du site — ton, style, contenu — en collaboration avec Chantal |
| Claude Travailleur | Claude (conversation dédiée) | Exécute le code — une étape à la fois, pas de jasette — suit le briefing à la lettre |

**Règle :** Chaque Claude reste dans son rôle mais peut signaler et orienter vers le bon rôle. Claude Travailleur ne fait pas de design. Claude Organisateur ne code pas.

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
14. **Livraison du code — CRITIQUE :**
    - **Changement ciblé** → livraison par **trouve/remplace** uniquement — jamais le fichier complet
    - **Changement majeur** (touche tout le fichier) → demander la permission de livrer le fichier complet — attendre le OUI
    - **Jamais livrer un fichier complet sans permission explicite**
15. **Un seul changement à la fois** — attendre la confirmation avant le suivant
16. Ne pas montrer l'analyse technique — juste résumer la solution en langage simple
17. **Commits GitHub** → ne jamais en demander — Jean-Claude gère ses commits
18. **Suivi des changements en attente** → garder en mémoire tout changement non confirmé — redemander si c'est réglé — mettre le brief à jour en fin de session
19. **Fin de tâche** → dire **COMMIT** puis proposer la prochaine tâche selon les éléments du brief
20. **Le brief** → toujours produit en entier en `.md` — Jean-Claude le copie pour débuter une nouvelle conversation
21. Appellation : utiliser **"sur-titre"** au lieu de "eyebrow"

---

## 🔴 BOGUES

### Public
- [x] Burger menu public — le menu ne s'affichait pas au clic — **RÉGLÉ**
- [x] Clic sur une collection — n'affichait pas toujours la bonne collection — **RÉGLÉ**
- [x] Changement de collection — la page ne se repositionnait pas correctement — **RÉGLÉ**
- [x] Filtres catalogue — restaient visibles en scrollant — **RÉGLÉ**
- [x] Contraste texte/fond — fonction `couleurTexteContraste` — **RÉGLÉ**
- [x] Modal produit — comportement scroll erratique — **RÉGLÉ**

### Admin
- [x] Transition menu desktop → burger — zone morte — **RÉGLÉ (disparu de lui-même)**
- [x] Clavier mobile s'ouvre automatiquement — **RÉGLÉ**
- [ ] Formats — aucune gestion possible (ni ajout, ni modification, ni suppression) — à construire
- [ ] Recettes — spinner disparaît trop tôt
- [ ] Formulaire recette — section ingrédients absente en mode ajout ET modification — **PRIORITÉ**

### Admin — introduced par Claude ce soir 🔴
- [ ] Bouton Achats — `onclick` dupliqué introduit par erreur — **À CORRIGER EN PREMIER**
- [ ] Style inline sur `accueil-grande-tuile` vert — doit être remplacé par classe CSS
- [ ] Bloc `accueil-droite` en état intermédiaire — tuiles gris, gris-foncé pas encore regroupées

---

## 🟡 AMÉLIORATIONS — PUBLIC

### UX / Interface
- [ ] Arrimer le bouton "Découvrir les collections" avec la ligne en dessous
- [ ] Diminuer l'espace entre le texte et la signature de la fondatrice
- [ ] Agrandir le modal produit — iPad portrait en priorité
- [x] Revoir la couleur en transparence sur les cartes produits catalogue — **RÉGLÉ**
- [ ] Augmenter la transparence du footer

### Visuel
- [x] Logo agrandi — public ET admin (275px → 360px) — **RÉGLÉ**
- [x] Sur-titre "COLLECTIONS 2026" / "ADMINISTRATION" — agrandi et remonté — **RÉGLÉ**
- [x] Ligne sous la barre de navigation publique — retirée — **RÉGLÉ**
- [x] Rotation écran iPad — le site s'adapte maintenant — **RÉGLÉ**
- [x] Cartes recettes admin — même visuel que cartes produits public — **RÉGLÉ**
- [x] Contraste texte sur cartes recettes admin — **RÉGLÉ**

### Contenu
- [ ] Mosaïque hero — alimenter dynamiquement avec 3 tuiles :
  - Tuile 1 : collections/lignes de produits depuis le Sheet
  - Tuile 2 : production — "prêt cette semaine" / "en production"
  - Tuile 3 : accroche vendeur (à définir avec Chantal)
- [ ] Textes Sheet → page publique — supporter le Markdown simplifié (`**gras**`, `*italique*`)
- [ ] Réviser les textes — trop de redondances (ex: "fait à la main" répété)
- [ ] Liste INCI sur fiche recette — présentation élégante — **Claude Chercheur devrait explorer**
- [ ] Informer les visiteurs comment acheter — format à définir avec Chantal

### Nouvelles sections
- [ ] Actualités — générées automatiquement depuis le Sheet
- [ ] FAQ — gérable depuis l'admin
- [ ] Section éducative — huiles, beurres, saponification

---

## 🟡 AMÉLIORATIONS — ADMIN

### Page d'accueil — EN COURS 🔴
- [ ] 4 grandes tuiles (2×2) avec 2 boutons chacune — **EN COURS — fichier cassé — réparer en premier**
  - Tuile verte : Collections + Recettes
  - Tuile jaune : Achats + Factures
  - Tuile grise : Inventaire + Stock
  - Tuile gris foncé : Liste + Divers
- [ ] Navbar admin + burger — ajouter item **Vente** (non développé, désactivé)

### UX / Interface
- [ ] Tuiles accueil admin — revoir cohérence icône/contenu
- [ ] Modification collection — masquer la liste en mode édition
- [ ] Modification ligne de produits — même comportement que collection
- [ ] Champ description collection — textarea plus grand par défaut
- [ ] Filtre recettes "Par nom" — retirer label externe, utiliser placeholder
- [x] Cartes recettes admin — même visuel que cartes produits public — **RÉGLÉ**
- [ ] Remplacer tous les `alert()` / `confirm()` par des modals ou toasts maison
- [ ] Formats — permettre la sélection de plusieurs formats par ligne de produits

### Recettes
- [ ] Recettes — conserver le spinner jusqu'à affichage complet
- [ ] Recettes — champ "collections secondaires"
- [ ] Recettes — permettre l'ajout d'une 2e photo

### Factures
- [ ] Page factures — retravailler le visuel des rangées
- [ ] Page factures — filtre "Par produit"
- [ ] Page factures — remplacer boutons par icônes
- [ ] Page factures — retirer TPS et TVQ des rangées
- [ ] Modal facture — afficher facture complète avec TPS, TVQ, total

### Inventaire
- [ ] Ligne de séparation ne s'adapte pas à la largeur
- [ ] Resserrer la présentation + retirer colonne "Total (g)"

### Contenu du site
- [ ] Revoir les padding sur les champs
- [ ] Bon à savoir — retirer "Note allergènes" des Engagements
- [ ] Bon à savoir — créer section "Notes importantes"
- [ ] Bon à savoir — pouvoir ajouter des éléments dans chaque section

---

## ♿ ACCESSIBILITÉ

- [ ] Augmenter taille texte minimum mobile (16px → 20px) — vérifier px vs rem dans style.css avant de coder
- [x] Augmenter taille logo — public ET admin — **RÉGLÉ**

---

## 📐 TYPOGRAPHIE — INVENTAIRE EN COURS

Toutes les tailles de police du site (du plus grand au plus petit) — **modifier toujours du plus grand au plus petit** pour éviter les collisions lors des trouve/remplace :

`3.5rem → 3.2rem → 2.8rem → 2.5rem → 2.2rem → 1.8rem → 1.6rem → 1.5rem → 1.4rem → 1.3rem → 1.2rem → 1.15rem → 1.1rem → 0.95rem → 0.9rem → 0.88rem → 0.85rem → 0.84rem → 0.82rem → 0.8rem → 0.78rem → 0.75rem → 0.73rem → 0.72rem → 0.7rem → 0.68rem → 0.65rem → 0.62rem → 0.6rem`

---

## ✅ DÉCISIONS PRISES

- Appellation uniforme — **"Recettes"** partout, public ET admin
- "Eyebrow" → **"Sur-titre"** dans toutes les communications
- Livraison des corrections par **trouve/remplace** — fichier complet seulement si changement majeur et permission accordée
- Un changement à la fois — confirmation avant le suivant
- Commits GitHub gérés par Jean-Claude uniquement
- Brief toujours produit en entier en `.md` en fin de session
- Modifier les polices toujours du plus grand au plus petit

---

*Univers Caresse — Confidentiel — 11 mars 2026*
