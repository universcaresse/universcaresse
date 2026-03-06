# BRIEFING ACTIF — UNIVERS CARESSE
**Lis ce document en entier avant de répondre quoi que ce soit.**
**Aucun code sans confirmation préalable.**

---

*Mis à jour : 5 mars 2026 — Module Collections refactorisé complet*

---

## MOT DE CLAUDE À CLAUDE

Salut toi! Tu arrives sur un projet bien structuré, bien documenté, et avec un client en or.

Jean-Claude est **sympathique, patient, méthodique** — et il spinne régulièrement dans sa tête avec plein de bonnes idées qui arrivent en rafale. C'est une qualité — aide-le à structurer et prioriser sans tout faire en même temps.

Il est **infatigable** — les sessions sont longues et productives. Suis le rythme.

**Important :** Il déteste perdre de l'information entre les sessions. La RÈGLE ZÉRO existe pour ça.

**RÈGLE NUMÉRO ZÉRO :**
Mettre à jour le briefing IMMÉDIATEMENT après chaque changement — pas à la fin de la session. Jean-Claude uploade les fichiers au début de chaque session — le briefing doit être parfait à tout moment.

**Règles absolues :**
- Fontes sacrées : **Playfair Display, Birthstone, DM Sans** — jamais Cormorant, Jost, Inter, Roboto, Arial
- **Un seul `style.css`** pour tout — public ET admin — `admin.css` n'existe plus
- Zéro style inline dans les HTML
- Mobile-first, 16px minimum sur mobile
- Ne jamais parler de temps
- Une question à la fois
- Résumé + confirmation avant de coder
- Jamais de placeholder dans les champs
- **CORRECTIONS :** Jamais de fichier complet sauf si demandé — toujours trouve/remplace
- **PLUSIEURS CHANGEMENTS :** Annoncer le nombre, demander une par une ou réécriture complète
- **DOCUMENTATION :** Toujours en `.md`, complets et autonomes
- **JAMAIS de formules condescendantes**
- **TESTER MENTALEMENT avant de donner le code**
- **FORMULAIRE CONTACT :** jamais Formspree — toujours `MailApp.sendEmail()` via Apps Script
- **URL APPS SCRIPT :** mettre à jour dans `main.js` uniquement
- **LIRE LES FICHIERS UPLOADÉS avant de poser des questions**

---

## PROJET

Univers Caresse — savonnerie artisanale de Chantal Mondor.

**Repo GitHub :** `universcaresse`
**URL :** https://universcaresse.github.io/universcaresse/
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
- `image_url` dans Sheet = URL Cloudinary complète

---

## ARCHITECTURE

- **Hébergement :** GitHub Pages
- **Backend :** Google Apps Script (Sheet, calculs, JSON, courriel)
- **Frontend :** HTML/CSS/JS vanilla
- **Auth :** `sessionStorage` → redirect `/admin/`
- **Cache :** `&t=${Date.now()}` sur tous les appels API publics
- **SPA public :** navigation par hash `#accueil`, `#catalogue`, `#qui-sommes-nous`, `#bon-a-savoir`, `#contact`

### Structure du repo
```
universcaresse/
├── index.html              ✅ SPA — 5 sections fusionnées
├── admin/
│   └── index.html          ✅ En ligne
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
**Nav admin :** dropdowns desktop (≥1024px) — Création, Achats, Production, Système. Burger mobile (<1024px). Logo textuel cliquable → accueil admin.

### Variables CSS utiles
- `--padding-page: 80px` — espacement desktop
- `--padding-mobile: 20px` — espacement mobile
- `--nav-h: 72px` — hauteur nav fixe

---

## CONNEXION ADMIN

- `validerConnexion()` dans `main.js`
- Succès → `sessionStorage.setItem('uc_admin', 'true')` + redirect `/universcaresse/admin/`

---

## COULEURS COLLECTIONS (dans main.js)

`COULEURS_COLLECTIONS` existe encore comme fallback. La couleur principale vient maintenant du Sheet (colonne H `couleur_hex`). La 2e couleur est générée automatiquement par `assombrirCouleur(hex)` (-40 sur R,G,B). Si pas de `couleur_hex` dans le Sheet, fallback sur `COULEURS_COLLECTIONS`.
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

---

## GOOGLE SHEET — ONGLETS

| Onglet | Colonnes clés |
|--------|--------------|
| Collections | Rang, Collection, Slogan, Desc collection, Ligne, Desc ligne, Format, couleur_hex, photo_url |
| Recettes | recette_id, nom, desc, couleur_hex, collection, rang, ligne, format, nb_unites, instructions, notes, ingredient_type, ingredient_nom, quantite_g, cout_ingredient, cure, prix_vente (Q), image_url (R), statut (S) |
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
- Statut recette col S, filtre dans `getCataloguePublic`
- `getCollections` et `getCollectionsPublic` retournent `couleur_hex` et `photo_url`
- Rang dynamique dans `addCollectionItem` et `updateCollectionItem`
- **ATTENTION :** `getCollectionsPublic` doit être présente dans le fichier `Code.gs` principal
- **À faire :** `envoyerContact(prenom, nom, courriel, sujet, message)` avec `MailApp.sendEmail()`

---

## MODULES ADMIN — ÉTAT

### Collections ✅
- Cartes visuelles : dégradé 2 couleurs (couleur_hex du Sheet + assombrirCouleur), lignes listées en tags, titre en bas
- Clic carte → fiche consultation (panneau)
- Fiche consultation : infos collection, liste lignes, bouton Modifier collection, bouton + Ajouter une ligne, bouton Fermer
- Formulaire 2 modes : **Mode Collection** (rang dynamique, nom, slogan, desc, couleur_hex avec aperçu visuel, photo Cloudinary dossier `collections`) et **Mode Ligne** (collection readonly, nom ligne, format, desc, couleur_hex, photo Cloudinary dossier `lignes`, ingrédients de base)
- Toggle entre modes via bouton dans l'en-tête du formulaire
- Bug spinner bloqué sur validation corrigé ✅

### Recettes ✅
- Filtres cascade Collection → Ligne → grille
- Filtre statut (Tous / Public / Test), badge statut sur cartes
- Formulaire 4 colonnes, couleur hex dynamique, Cloudinary ✅
- **À faire :** section ingrédients HTML + sauvegarde (Note 13), mode consultation par défaut (Note 14)

### Factures ✅ (partiel)
- Wizard 3 étapes, `factureActive` persiste jusqu'à finalisation
- **Bug prioritaire :** produits "undefined" dans détail facture
- **À faire :** rangée cliquable, fiche complète, statut, filtre ingrédient, mobile

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
- [x] Nav admin dropdowns desktop ✅
- [x] Nav admin : Accueil + dropdowns centre, Site public + Déconnexion droite ✅
- [x] Sidebar mobile : lien Accueil ajouté ✅
- [x] Accueil admin redessiné ✅
- [x] Icônes tuiles agrandies (64px) ✅
- [x] Nav admin : logo textuel supprimé, breakpoint burger < 1024px ✅
- [x] Collections : rang dynamique ✅
- [x] Collections : couleur_hex + photo_url dans Sheet + formulaire admin ✅
- [x] Collections : Cloudinary (dossier collections + lignes) ✅
- [x] Collections : cartes visuelles dégradé 2 couleurs ✅
- [x] Collections : fiche consultation + boutons Modifier ✅
- [x] Collections : formulaire 2 modes (collection / ligne) ✅
- [x] Bug spinner bloqué sur validation formulaire collections ✅
- [ ] Recettes : section ingrédients formulaire + sauvegarde (Note 13)
- [ ] Recettes : mode consultation par défaut (Note 14)
- [ ] Densités : champ marge_perte_pct, rangée cliquable
- [ ] Factures : rangée cliquable, fiche complète, statut, filtre, mobile

### Site public
- [ ] Note 31 : Enlever bouton connexion nav
- [ ] Note 40 : Collections manquantes dans filtres catalogue
- [ ] Note 41 : Photo + couleur hex en fallback blocs catalogue
- [ ] Note 48 : Plume = bouton retour accueil
- [ ] Formulaire contact : `envoyerContact` dans Code.gs avec `MailApp.sendEmail()`
- [ ] Note 54 : Titres collections / lignes / noms en UPPERCASE partout
- [ ] Note 55 : Casse insensible dans `COULEURS_COLLECTIONS`
- [ ] Note 57 : `image_url` dans catalogue public via URL Cloudinary
- [ ] Note 58 : `couleur_hex` depuis Sheet → éliminer `COULEURS_COLLECTIONS` code dur
- [ ] Note 60 : Photo ambiance collection dans catalogue (fallback = dégradé)
- [ ] Note 61 : Tuiles collections accueil — dégradé 2 couleurs (pas de photo)

### Futur
- [ ] Nom de domaine `universcaresse.ca` (Webnames.ca recommandé)
- [ ] Amortissement équipements dans coût de revient
- [ ] Scraping PureArome + Arbressence
- [ ] Scan QuaggaJS
- [ ] Confection
- [ ] Corrections inventaire (ajustement manuel)
- [ ] PWA Dionysos (caméra bloquée Google iframe)
- [ ] Structure 4 niveaux : Collection → Ligne → Variante → Recette (ex: Kérys → Shampooing → Cheveux gras/normaux/bouclés) — nécessite colonne `variante` dans Sheet Collections + 3e mode formulaire

---

*Univers Caresse — Chantal Mondor — Confidentiel*
*Mis à jour : 5 mars 2026*
