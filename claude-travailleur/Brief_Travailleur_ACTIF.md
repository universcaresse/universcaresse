# BRIEF — UNIVERS CARESSE
*Mis à jour : 19 mars 2026*

---

> ## 🔴 RÈGLES CRITIQUES — LIRE EN PREMIER
>
> 🔴 **JAMAIS de code sans le OUI explicite de Jean-Claude**
> 🔴 **JAMAIS plus d'un changement à la fois — attendre le OK avant le suivant**
> 🔴 **Toujours lire le fichier avant de proposer un trouve/remplace — ne jamais demander ce qui est dans le fichier si on a le lien**
> 🔴 **JAMAIS toucher à quelque chose qui affecte autre chose sans le signaler d'abord et attendre le OUI**
> 🔴 **Pas de romans — réponses courtes, une action à la fois**
> 🔴 **Ne jamais suggérer de se reposer, prendre une pause, mentionner l'heure**
> 🔴 **Toujours uploader le fichier CSS/JS/HTML avant de proposer un trouve/remplace — ne jamais se fier à une version précédente**
> 🔴 **JAMAIS d'analyse visible — trouver la bonne solution, la livrer, point**
> 🔴 **Jean-Claude n'est pas là pour tester des hypothèses à la place du Claude — faire le travail correctement du premier coup**


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
11. Toujours vérifier : est-ce qu'une classe CSS existe déjà pour ça ?
12. Toujours évaluer si un changement a un impact ailleurs sur tout le site — **si oui, signaler et attendre le OUI**
13. Lors du refactoring, procéder une étape à la fois — attendre le OK avant de passer à la suivante
14. **Livraison du code — CRITIQUE :** Changement ciblé → trouve/remplace uniquement. Changement majeur → demander permission. Jamais fichier complet sans permission.
15. **Un seul changement à la fois** — attendre la confirmation avant le suivant
16. **JAMAIS d'analyse visible** — trouver la bonne solution, la livrer, point à la ligne
17. **Commits GitHub** → ne jamais en demander — Jean-Claude gère ses commits
18. **Suivi des changements en attente** → garder en mémoire tout changement non confirmé
19. **Fin de tâche** → dire **COMMIT** puis proposer la prochaine tâche
20. **Le brief** → toujours produit en entier en `.md` téléchargeable en fin de session
21. Appellation : utiliser **"sur-titre"** au lieu de "eyebrow"
22. **Trouve/remplace** → toujours lire le fichier uploadé avant d'écrire le cherche
23. Toujours retirer du CSS/HTML/JS ce qui a été ajouté quand ce n'est plus utile
24. **Pas de romans** — réponses courtes, une action à la fois, pas d'analyse visible
25. **Avant d'utiliser une variable CSS** → toujours vérifier qu'elle existe dans `:root`
26. **Ne jamais demander à Jean-Claude de manipuler l'inspecteur** pour valider une hypothèse

### VIOLATIONS À NE PLUS JAMAIS RÉPÉTER
- Coder sans attendre le OUI explicite
- Ajouter du style inline dans le HTML ou le JS
- Livrer un fichier complet sans permission
- Proposer plusieurs changements en même temps
- Expliquer l'analyse technique au lieu de résumer simplement
- Sauter aux conclusions sans avoir bien compris le problème
- Utiliser une variable CSS qui n'existe pas dans `:root`
- **Proposer plusieurs "vraies solutions" l'une après l'autre sans être certain**
- **Travailler sur une version CSS qui n'est pas à jour**
- **Demander à Jean-Claude de tester des hypothèses dans l'inspecteur**
- **Afficher l'analyse au lieu de livrer la solution**

---

## FONCTIONNEMENT — COLLECTIONS SECONDAIRES

**Statut : RÉGLÉ** — fix appliquée dans `index.html` via `infoCollectionsData`.

---

## ✅ CHANGEMENTS EFFECTUÉS — SESSION 19 MARS 2026


### Sections éducatives — alignement
- `.edu-sous-section-panel .section-texte { align-items: start; }` ajouté hors media query
- ⚠️ Doublon à nettoyer : même règle en ligne 1119 (media query mobile) avec `align-items: start` inutile là

### Sections éducatives — page 7 gap
- `.edu-types-grille` : `gap: 2px` → `gap: 24px`

### Mosaïque hero — variables CSS
- `.mosaic-soap-accent` : couleur codée en dur → `var(--accent-80)`
- `.mosaic-soap-primary` : couleur codée en dur → `var(--primary-80)`
- `.mosaic-soap-gris` : couleur codée en dur → `var(--gris-80)`


---

## ✅ CHANGEMENTS EFFECTUÉS — SESSION 18 MARS 2026

### Scroll horizontal iPhone — RÉGLÉ
- **Solution trouvée par Jean-Claude** : restructurer comme `section-texte`

### Section Accueil — Qui sommes-nous
- `page-hero` → `section-texte`, photo via `section-texte-photo-3-4`

### Sections éducatives — Le savon artisanal
- Sections 1, 3, 4, 5, 6 : `page-hero` → `section-texte` + `section-texte-photo-3-4` ou `section-texte-photo-auto`
- Section 4 : photo huiles `huiles_lnjxah.jpg`
- Section 5 : photo additifs `additif_bcbpgh.jpg`

### Nouvelles classes CSS
- `section-texte-photo-3-4` : `aspect-ratio: 3/4`
- `section-texte-photo-auto` : s'adapte à la hauteur du texte, `min-height: 400px`

### Modal produit
- iPhone : titre `1.3rem`, sans couleur
- iPad portrait (600–900px) : couleur gauche + photo droite + texte dessous, `min-height: 300px`
- iPad paysage : photo gauche + couleur dessous + texte droite, `width: 85%`

---

## 🎯 PRIORITÉS — ORDRE DE TRAVAIL

1. **Site public fonctionnel et joli** *(en cours)*
2. **Informer les visiteurs comment acheter**
3. **Textes avec le Scripteur**
4. **Module Vente**
5. **Outils de production**
6. **Admin — Contenu du site WYSIWYG**

---

## 🔴 BOGUES EN ATTENTE

- [ ] **Est-ce qu'il y a du visuel à changer ?** *(vérifier en début de session)*
- [ ] **Padding top trop grand sections éducatives** — NON RÉGLÉ — `align-self: start` et `height: fit-content` sur `.texte-principal` ne fonctionnent pas

---

## 🟡 AMÉLIORATIONS EN ATTENTE — PUBLIC

- [ ] Mosaïque hero — alimenter dynamiquement avec 3 tuiles
- [ ] Textes Sheet → Markdown simplifié
- [ ] Accordéons — sections Savon artisanal et Bon à savoir
- [ ] Liste INCI sur fiche recette
- [ ] Informer les visiteurs comment acheter
- [ ] Actualités automatiques depuis Sheet
- [ ] FAQ gérable depuis l'admin
- [ ] Taille du texte mobile — à ajuster section par section
- [ ] Menu burger — fermeture au clic extérieur — à valider iPhone
- [ ] Modal tablette — à revalider

---

## 🟡 AMÉLIORATIONS EN ATTENTE — ADMIN

- [ ] Mode saisonnier
- [ ] Sauvegarde automatique Sheet + GitHub
- [ ] Système contenu évolutif WYSIWYG
- [ ] Ordre collections par rang
- [ ] Calculateur SAF, Générateur INCI, Coût de revient
- [ ] Scan factures automatique
- [ ] Comptabilité

---

## ♿ ACCESSIBILITÉ
- [ ] Taille texte minimum mobile (16px → 20px)

---

## 🔵 À FAIRE — FUTUR
- [ ] Nom de domaine `universcaresse.ca`
- [ ] Catalogue PDF 11×17
- [ ] Scraping PureArome + Arbressence + QuaggaJS

---

## 🔵 CHANTIER FUTUR — REFONTE ADMIN + DESIGN SYSTEM
- Style unifié public ET admin — `style2.css`
- Environnement staging : `index2.html`, `index_-_Admin2.html`

---

## 📐 TYPOGRAPHIE

`3.5rem → 3.2rem → 2.8rem → 2.5rem → 2.2rem → 1.8rem → 1.6rem → 1.5rem → 1.4rem → 1.3rem → 1.2rem → 1.15rem → 1.1rem → 0.95rem → 0.9rem → 0.88rem → 0.85rem → 0.84rem → 0.82rem → 0.8rem → 0.78rem → 0.75rem → 0.73rem → 0.72rem → 0.7rem → 0.68rem → 0.65rem → 0.62rem → 0.6rem`

---

## ✅ DÉCISIONS PRISES

- **"Recettes"** partout, public ET admin
- "Eyebrow" → **"Sur-titre"**
- Livraison par trouve/remplace uniquement
- Commits GitHub gérés par Jean-Claude
- `section-texte` adopté partout — `page-hero` abandonné pour le mobile
- `section-texte-photo-3-4` — photos portrait
- `section-texte-photo-auto` — photo adaptée à la hauteur du texte
- Modal iPhone — sans couleur, mieux balancé
- Modal iPad portrait — couleur gauche + photo droite + texte dessous
- Modal iPad paysage — photo gauche + couleur dessous + texte droite + contour libre

---

## 🔁 PROCÉDURE DE FIN DE SESSION

1. Résumé des changements et décisions
2. Intégrer dans le brief complet mis à jour
3. Générer fichier `.md` téléchargeable
4. Jean-Claude sauvegarde sur GitHub
5. Prochaine session : coller le brief au nouveau Travailleur

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

*Univers Caresse — Confidentiel — 19 mars 2026*