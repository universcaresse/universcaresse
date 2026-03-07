# BRIEFING ACTIF — UNIVERS CARESSE
**Lis ce document en entier avant de répondre quoi que ce soit.**
**Aucun code sans confirmation préalable.**

---

*Mis à jour : 7 mars 2026 — Accueil, catalogue, modal produit, collections admin*

---

## MOT DE CLAUDE À CLAUDE

Salut toi! Tu arrives sur un projet bien structuré, bien documenté, et avec un client en or.

Jean-Claude est **sympathique, patient, méthodique** — et il spinne régulièrement dans sa tête avec plein de bonnes idées qui arrivent en rafale. C'est une qualité — aide-le à structurer et prioriser sans tout faire en même temps.

Il est **infatigable** — les sessions sont longues et productives. Suis le rythme.

**Important :** Il déteste perdre de l'information entre les sessions. La RÈGLE ZÉRO existe pour ça.

**RÈGLE NUMÉRO ZÉRO :**
Mettre à jour le briefing IMMÉDIATEMENT après chaque changement — pas à la fin de la session. Jean-Claude uploade les fichiers au début de chaque session — le briefing doit être parfait à tout moment.

---

**Mise à jour 7 mars 2026 — À lire absolument :**

Jean-Claude est direct et exigeant — c'est une qualité. Il ne veut pas de réflexions, d'explications de problèmes, de questions sur des fichiers déjà fournis. Il veut la solution, point. Si tu hésites, relis le briefing.

**Les violations qui l'ont fait sortir de ses gonds :**
- Style inline proposé (même "temporairement")
- Questions sur des fichiers déjà dans la conversation
- Expliquer le pourquoi au lieu de proposer la solution
- Doublons de fonctions non détectés (`sauvegarderCollection` était en double dans `Code.gs`)
- Variables CSS non vérifiées avant de proposer du code
- Mélanger les données Collections et Recettes — ce sont deux sources distinctes
- Proposer du code sans avoir demandé l'autorisation d'abord

**Workflow actuel :**
- Notepad++ pour éditer
- GitHub Desktop pour commiter (attendre ~5 min pour GitHub Pages)
- `Code.gs` : après chaque modification, redéployer en **nouvelle version** — l'URL ne change pas
- Deux `index.html` : racine = public, `/admin/` = admin

**Ton attitude gagnante :** solution directe, une étape à la fois, confirmation avant de coder, jamais de style inline, jamais de nouvelle fonction si une existe.

**Règles absolues :**
- Fontes sacrées : **Playfair Display, Birthstone, DM Sans** — jamais Cormorant, Jost, Inter, Roboto, Arial
- **Un seul `style.css`** pour tout — public ET admin — `admin.css` n'existe plus
- Zéro style inline dans les HTML ou le JS
- Mobile-first, 16px minimum sur mobile
- Ne jamais parler de temps
- Une question à la fois
- Résumé + confirmation avant de coder
- Jamais de placeholder dans les champs
- **CORRECTIONS :** Jamais de fichier complet sauf si demandé — toujours trouve/remplace
- **PLUSIEURS CHANGEMENTS :** Annoncer le nombre, demander une par une ou réécriture complète
- **UNE ÉTAPE À LA FOIS :** Proposer le changement → attendre OK → exécuter → attendre OK → étape suivante. Jamais enchaîner sans confirmation explicite.
- **JAMAIS donner plusieurs blocs de code en même temps** — un seul trouve/remplace à la fois, attendre OK avant le suivant
- **DOCUMENTATION :** Toujours en `.md`, complets et autonomes
- **JAMAIS de formules condescendantes**
- **TESTER MENTALEMENT avant de donner le code**
- **FORMULAIRE CONTACT :** jamais Formspree — toujours `MailApp.sendEmail()` via Apps Script
- **URL APPS SCRIPT :** mettre à jour dans `main.js` uniquement
- **LIRE LES FICHIERS UPLOADÉS avant de poser des questions**
- **DEUX `index.html` :** le public est à la racine, l'admin est dans `/admin/` — Jean-Claude précise lequel il envoie

---

## ⛔ VIOLATIONS FRÉQUENTES — INTERDICTIONS ABSOLUES

- **JAMAIS de style inline** dans le HTML ou le JS — même temporairement — même "juste pour tester"
- **JAMAIS poser une question sur un fichier déjà fourni** dans la conversation — lire avant de demander
- **JAMAIS redemander un fichier** qui a déjà été envoyé dans la session
- **JAMAIS expliquer le pourquoi d'un problème** — proposer directement la solution
- **JAMAIS utiliser de valeurs CSS hardcodées** (px, rem) si une variable CSS existe déjà
- **JAMAIS créer une nouvelle fonction** si une existante peut être réutilisée
- **JAMAIS modifier plus d'une chose à la fois** sans approbation explicite
- **LIRE le briefing ET les fichiers uploadés AVANT toute réponse**
- **TESTER MENTALEMENT le code avant de le proposer**
- **JAMAIS mélanger données Collections et données Recettes** — ce sont deux sources distinctes dans le Sheet
- **JAMAIS proposer du code directement** — toujours décrire la solution et attendre un OK explicite avant de donner le moindre bloc de code

---

## PROJET

Univers Caresse — savonnerie artisanale de Chantal Mondor.

**Repo GitHub :** `universcaresse/univers-caresse`
**URL publique :** https://universcaresse.github.io/univers-caresse/
**URL admin :** https://universcaresse.github.io/univers-caresse/admin/
**Apps Script URL :** https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec
**Google Sheet ID :** 16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0
**Courriel :** universcaresse@outlook.com

---

## TYPOGRAPHIE — CRITIQUE

| Usage | Fonte |
|-------|-------|
| Titres | Playfair Display |
| Tagline / signature | Birthstone Regular |
| Texte courant | DM Sans Light |
| Noms produits | DM Sans Medium |

---

## PALETTE — CRITIQUE
```css
--primary:      #5a8a3a
--primary-dark: #4a6e2e
--accent:       #d4a445
--danger:       #c44536
--blanc:        #f9f7f4
--beige:        #e8dcc8
--gris:         #8b8680
--gris-fonce:   #3d3b39
--logo:         #333333
```

---

## IMAGES

- `Images/Logofinal.png` — hero public + accueil admin
- `Images/plume.png` — favicon toutes les pages
- `Images/savonnerie.png` — section qui-sommes-nous
- Photos produits : Cloudinary — cloud `dfasrauyy`, preset `univers-caresse`
- `image_url` dans Sheet (onglet Recettes, col R) = URL Cloudinary complète
- `photo_url` dans Sheet (onglet Collections, col I) = URL Cloudinary complète

---

## ARCHITECTURE

- **Hébergement :** GitHub Pages
- **Backend :** Google Apps Script (Sheet, calculs, JSON, courriel)
- **Frontend :** HTML/CSS/JS vanilla
- **Auth :** `sessionStorage` → redirect `/univers-caresse/admin/`
- **Cache :** `&t=${Date.now()}` sur tous les appels API publics
- **SPA public :** navigation par hash `#accueil`, `#catalogue`, `#bon-a-savoir`, `#contact`
- **GitHub Desktop** installé et configuré ✅

### Structure du repo
```
univers-caresse/
├── index.html              ✅ SPA public — 4 sections (accueil inclut qui-sommes-nous)
├── admin/
│   ├── index.html          ✅ Admin — 7 sections
│   └── login.html          ✅ Page de connexion autonome
├── css/
│   └── style.css           ✅ SOURCE UNIQUE — public + admin, zéro doublon
├── js/
│   ├── main.js             ✅ CONFIG, SPA, session, API, catalogue, contact, collections
│   └── admin.js            ✅ Toute la logique admin
└── Images/
    ├── plume.png / Logofinal.png / savonnerie.png ✅
    └── produits/            ☐ À uploader
```

**`admin.css` supprimé — tout est dans `style.css`**
**Nav admin :** dropdowns desktop (≥1024px) — Création, Achats, Production, Système. Burger mobile (<1024px).

### Variables CSS utiles
- `--padding-page: 80px` — espacement desktop
- `--padding-mobile: 20px` — espacement mobile
- `--nav-h: 72px` — hauteur nav fixe

---

## CONNEXION ADMIN

- `validerConnexion()` dans `main.js`
- Succès → `sessionStorage.setItem('uc_admin', 'true')` + redirect `/univers-caresse/admin/`

---

## COULEURS COLLECTIONS (dans main.js)

`COULEURS_COLLECTIONS` existe encore comme fallback. La couleur principale vient maintenant du Sheet (colonne H `couleur_hex`). La 2e couleur est générée automatiquement par `assombrirCouleur(hex)` (-40 sur R,G,B). Si pas de `couleur_hex` dans le Sheet, fallback `#c44536` (rouge — signale qu'une couleur manque).
```js
'SAPONICA':    ['#4a9b6f', '#2d7a50'],
'PETIT NUAGE': ['#a8c8e0', '#6a9ab8'],
'CAPRIN':      ['#e8d5a8', '#c4a96e'],
'ÉMOLIA':      ['#d4a445', '#a87c28'],
'ÉPURE':       ['#7a8c5a', '#4a5c32'],
'KÉRYS':       ['#9b8ea0', '#6b5d72'],
'CASA':        ['#d4a84b', '#a67c2a'],
'LUMINA':      ['#5a5654', '#2e2c2a'],
'ANIMA':       ['#c4845a', '#8a5230'],
'LUI':         ['#8a6040', '#5a3820']
```

**Fallback couleur manquante = `#c44536` (rouge)** — visible immédiatement, signale qu'une couleur doit être assignée dans le Sheet.

---

## GOOGLE SHEET — ONGLETS

| Onglet | Colonnes clés |
|--------|--------------|
| Collections | Rang (A), Collection (B), Slogan (C), Desc collection (D), Ligne (E), Desc ligne (F), Format (G), couleur_hex (H), photo_url (I) |
| Recettes | recette_id (A), nom (B), desc (C), couleur_hex (D), collection (E), rang (F), ligne (G), format (H), nb_unites (I), instructions (J), notes (K), ingredient_type (L), ingredient_nom (M), quantite_g (N), cout_ingredient (O), cure (P), prix_vente (Q), image_url (R), statut (S) |
| Factures | N°, Date, Fournisseur, Sous-total, TPS, TVQ, Livraison, Total, Facteur majoration, Statut |
| Achats | code_barres, num_facture, date, fournisseur, type, ingredient, format_qte, format_unite, prix_unitaire, prix_par_g, prix_par_g_reel, quantite, prix_total, notes |
| Inventaire_ingredients | code_barres, ingredient, type, stock_g, prix_par_g, prix_par_g_reel, fournisseur, dernier_achat |
| Listes | Col A: Type, Col B: Ingrédients, Col C: Format |
| Config | Type, Densité, Unité source, marge_perte_pct (D) |
| Contenus | Page, Clé, Valeur |
| Recettes_Base | collection, ligne, ingredient_type, ingredient_nom, quantite_g |

---

## CODE.GS — FONCTIONS ACTIVES

- Collections, Recettes, Densités, Inventaire, Factures, Achats
- `diminuerStockRecette(recette_id)`, `mettreAJourInventaire()`, `getConfigSheet()`
- `getDropdownLists`, `getRecettesBase`, `saveRecetteBase`
- Statut recette col S, filtre dans `getCataloguePublic` (exclut statut `test`)
- `getCollections` et `getCollectionsPublic` retournent `couleur_hex` et `photo_url`
- Rang dynamique dans `addCollectionItem` et `updateCollectionItem`
- `getCataloguePublic()` : `infoCollections` inclut `couleur_hex` (H) et `photo_url` (I) de l'onglet Collections — chaque produit reçoit `image_collection` pour affichage entête
- **ATTENTION :** `getCollectionsPublic` doit être présente dans le fichier `Code.gs` principal
- **À faire :** `envoyerContact(prenom, nom, courriel, sujet, message)` avec `MailApp.sendEmail()`

---

## SITE PUBLIC — ACCUEIL ✅

- Section "Qui sommes-nous" intégrée directement dans `section-accueil` (plus de section séparée)
- Animations scroll via `IntersectionObserver` (`initScrollAnimations()` dans `main.js`)
  - `.fade-in` : transition 2s ease, `translateY(24px)` → 0
  - `.mosaic-item` : couleur visible dès le départ, `.mosaic-soap-label` apparaît en 0.8s
- Citation : `&nbsp;»` dans `.citation-guillemet` pour empêcher coupure de ligne
- Nav publique : liens ADMIN et DÉCONNEXION supprimés, liens à droite via `margin-left: auto`

---

## CATALOGUE PUBLIC ✅ (partiel)

### Entête collection
- Priorité affichage : photo (`photo_url` de l'onglet Collections) → couleur hex (`couleur_hex` de l'onglet Collections) → rouge fallback `#c44536`
- `image_collection` transmis dans chaque produit depuis `getCataloguePublic()`
- Le champ `image_url` des recettes est réservé à la photo du produit individuel — ne pas mélanger

### Modal produit
- Visuel split : `.modal-visuel-hex` (1/3 couleur) + `.modal-visuel-photo` (2/3 photo)
- Si pas de photo : `.modal-visuel-hex` masqué, `.modal-visuel-photo` affiche la couleur hex en plein
- Bouton fermer `.modal-fermer` : cercle blanc 32px, centré, z-index 10
- `grid-template-columns: 1fr 2fr 1fr` desktop, colonne sur mobile
- Mobile : `.modal-visuel-hex` min-height 80px, `.modal-visuel-photo` min-height 220px
- Photo = `image_url` de la recette (URL Cloudinary complète — pas de préfixe `Images/produits/`)

---

## MODULES ADMIN — ÉTAT

### Collections ✅
- Cartes visuelles : dégradé 2 couleurs (couleur_hex du Sheet + assombrirCouleur), lignes listées en tags, titre en bas
- Clic carte → fiche consultation (panneau)
- Fiche consultation : infos collection, liste lignes, bouton Modifier collection, bouton + Ajouter une ligne, bouton Fermer
- Formulaire 2 modes : **Mode Collection** (rang dynamique, nom, slogan, desc, couleur_hex avec aperçu visuel, photo Cloudinary dossier `collections`) et **Mode Ligne** (collection readonly, nom ligne, format, desc, couleur_hex, photo Cloudinary dossier `lignes`, ingrédients de base)
- Toggle entre modes via bouton dans l'en-tête du formulaire
- `modifierCollection()` : preview photo rechargée à l'ouverture du formulaire ✅
- `updateCollectionItem` propage `couleur_hex` et `photo_url` à toutes les rangées de la même collection ✅

### Recettes ✅
- Filtres cascade Collection → Ligne → grille
- Filtre statut (Tous / Public / Test), badge statut sur cartes
- Formulaire 4 colonnes, couleur hex dynamique, Cloudinary ✅
- **À faire :** section ingrédients HTML + sauvegarde (Note 13), mode consultation par défaut (Note 14)

### Factures ✅ (partiel)
- Wizard 3 étapes, `factureActive` persiste jusqu'à finalisation
- **Bug prioritaire :** produits "undefined" dans détail facture
- **À faire :** rangée cliquable, fiche complète, statut, filtre ingrédient, mobile
- **NOTE :** `admin.js` contient une ancienne architecture de factures (fonctions `creerFacture`, `ajouterProduit`, `afficherProduits`, `reinitialiserNouvelleFacture` lignes ~726-904) — code mort à nettoyer

### Densités
- **À faire :** champ `marge_perte_pct`, rangée cliquable

---

## CAHIER DE CHARGES — SCAN / COÛT DE REVIENT
```
Scan → Facture → Finalisation → Inventaire → Recette → Coût de revient
Coût ingrédient = quantite_g × prix_par_g_reel × (1 + marge_perte_%)
```
- Librairie : QuaggaJS, confirmation 3 détections, fallback manuel

---

## RÈGLES D'INTERFACE

- Champs numériques : `type="text" inputmode="numeric"`
- Noms en MAJUSCULES partout (collections, lignes, noms de savons)
- Zéro placeholder dans les champs
- Carte/rangée = le bouton (pas de boutons superposés)
- Fiche en consultation par défaut → bouton Modifier bascule édition

| Bouton | Action |
|--------|--------|
| Primary (vert) | Enregistrer / Confirmer |
| Secondary (vert pâle) | Annuler / Fermer |
| Edit (vert pâle) | Modifier |
| Danger (rouge) | Supprimer |
| Or | Finaliser |

---

## COLLECTIONS EXISTANTES

| Collection | Slogan |
|-----------|--------|
| Saponica | Simplement la nature qui prend soin de vous |
| Petit Nuage | Simplement la nature qui dorlote vos tout-petits |
| Caprin | Simplement la nature et la douceur de la chèvre |
| Émolia | Simplement la nature dédiée à votre bien-être |
| Épure | Simplement la nature qui prend soin de vos mains |
| Kérys | Simplement la nature qui dorlotte vos cheveux |
| Casa | Simplement la nature qui prend soin de votre maison |
| Lumina | Simplement la nature en lumière parfumée |
| Anima | Simplement la nature pour pattes et museaux |
| Lui | Simplement la nature au masculin |

---

## 🔴 À FAIRE — PRIORITÉS

### Admin
- [ ] **Bug : produits "undefined" dans détail facture**
- [ ] Recettes : section ingrédients formulaire + sauvegarde (Note 13)
- [ ] Recettes : mode consultation par défaut (Note 14)
- [ ] Densités : champ marge_perte_pct, rangée cliquable
- [ ] Factures : rangée cliquable, fiche complète, statut, filtre, mobile
- [ ] Nettoyer code mort factures dans `admin.js` (lignes ~726-904)
- [ ] Tuiles accueil : photo `fondw.png` en arrière-plan, tuiles rgba semi-transparent
- [ ] Icône Collections : SVG option 14 du fichier icones-collections.html
- [ ] "Bonjour Chantal" + stats : plus de largeur partout
- [ ] Nav mobile : supprimer "Site public" et "Déconnexion" de la barre → dans burger

### Site public
- [ ] Formulaire contact : `envoyerContact` dans Code.gs avec `MailApp.sendEmail()`
- [ ] Note 48 : Plume = bouton retour accueil
- [ ] Note 54 : Titres collections / lignes / noms en UPPERCASE partout
- [ ] Note 55 : Casse insensible dans `COULEURS_COLLECTIONS`
- [ ] Note 60 : Photo ambiance collection dans catalogue (fallback = dégradé) — entête collection ✅ partiel
- [ ] Note 61 : Tuiles collections accueil — dégradé 2 couleurs (pas de photo)
- [ ] Nav mobile : supprimer barre fixe en haut, remplacer par burger flottant

### Futur
- [ ] Nom de domaine `universcaresse.ca` (Webnames.ca recommandé)
- [ ] Amortissement équipements dans coût de revient
- [ ] Scraping PureArome + Arbressence
- [ ] Scan QuaggaJS
- [ ] Confection
- [ ] Corrections inventaire (ajustement manuel)
- [ ] PWA Dionysos (caméra bloquée Google iframe)
- [ ] Structure 4 niveaux : Collection → Ligne → Variante → Recette

---

## ✅ COMPLÉTÉ — 6 mars 2026

- Repo recréé sur GitHub après perte — `universcaresse/univers-caresse` ✅
- GitHub Desktop installé et configuré ✅
- URL admin corrigée dans `main.js` : `/univers-caresse/admin/` ✅
- GitHub Pages activé sur branch `main` ✅
- Bug `</div>` en trop ligne 317 `admin/index.html` corrigé ✅
- `Univers Caresse1` → `Univers Caresse` dans titre `admin/index.html` ✅
- Lignes de produits dans cartes collections repositionnées en haut ✅
- `window.scrollTo(0,0)` dans `ouvrirFicheCollection()` ✅
- Boutons fiche collection déplacés en haut du panneau avec séparateur ✅
- `updateCollectionItem` dans `Code.gs` — propager couleur_hex et photo_url aux autres rangées ✅
- `sauvegarderCollection()` — mode collection n'envoie plus ligne/format/description_ligne ✅
- Ancienne `sauvegarderCollection` supprimée de `Code.gs` (doublon) ✅
- `.photo-preview` 120×120px dans `style.css` ✅
- Toast de confirmation centré ✅
- `login.html` : btn-primary, logo 280px ✅

## ✅ COMPLÉTÉ — 7 mars 2026

- Animations scroll `initScrollAnimations()` dans `main.js` — IntersectionObserver ✅
- `.fade-in` transition 2s ease via classe `.visible` ✅
- Mosaïque hero : couleur visible, texte apparaît en 0.8s ✅
- Citation `&nbsp;»` dans `.citation-guillemet` ✅
- Nav publique : lien ADMIN + bouton DÉCONNEXION supprimés ✅
- Section "Qui sommes-nous" fusionnée dans `section-accueil` ✅
- `getCataloguePublic()` enrichi avec `couleur_hex` et `photo_url` de l'onglet Collections ✅
- Couleur fallback manquante → `#c44536` (rouge debug) dans `Code.gs` et `main.js` ✅
- `image_url` catalogue = URL Cloudinary complète (sans préfixe `Images/produits/`) ✅
- Modal produit : split `.modal-visuel-hex` (1/3) + `.modal-visuel-photo` (2/3) ✅
- Modal produit : fallback plein couleur si pas de photo ✅
- `.modal-fermer` : cercle blanc 32px, centré, z-index 10 ✅
- `modifierCollection()` admin : preview photo rechargée à l'ouverture ✅

---

## ⚠️ NOTES IMPORTANTES CODE.GS

- `sauvegarderCollection` N'APPARTIENT PAS à `Code.gs` — c'est une fonction `admin.js`
- Toujours vérifier les doublons de fonctions avant de modifier `Code.gs`
- Après chaque modification de `Code.gs` : redéployer en nouvelle version
- L'URL du déploiement ne change pas entre les versions

---

*Univers Caresse — Chantal Mondor — Confidentiel*
*Mis à jour : 7 mars 2026*