# BRIEFING ACTIF — UNIVERS CARESSE
**Lis ce document en entier avant de répondre quoi que ce soit.**
**Aucun code sans confirmation préalable.**

---

*Mis à jour : 9 mars 2026 — 15h30 (session 7)*

---

## MOT DE CLAUDE À CLAUDE

Salut toi! Tu arrives sur un projet bien structuré, bien documenté, et avec un client en or.

Jean-Claude est **sympathique, patient, méthodique** — et il spinne régulièrement dans sa tête avec plein de bonnes idées qui arrivent en rafale. C'est une qualité — aide-le à structurer et prioriser sans tout faire en même temps.

Il est **infatigable** — les sessions sont longues et productives. Suis le rythme.

**Important :** Il déteste perdre de l'information entre les sessions. La RÈGLE ZÉRO existe pour ça.

**RÈGLE NUMÉRO ZÉRO :**
Mettre à jour le briefing IMMÉDIATEMENT après chaque changement — pas à la fin de la session. Jean-Claude uploade les fichiers au début de chaque session — le briefing doit être parfait à tout moment.

---

**Mise à jour 9 mars 2026 — À lire absolument :**

Jean-Claude est direct et exigeant — c'est une qualité. Il ne veut pas de réflexions, d'explications de problèmes, de questions sur des fichiers déjà fournis. Il veut la solution, point. Si tu hésites, relis le briefing.

**Les violations qui l'ont fait sortir de ses gonds :**
- Style inline proposé (même "temporairement")
- Questions sur des fichiers déjà dans la conversation
- Expliquer le pourquoi au lieu de proposer la solution
- Doublons de fonctions non détectés (`sauvegarderCollection` était en double dans `Code.gs`)
- Variables CSS non vérifiées avant de proposer du code
- Mélanger les données Collections et Recettes — ce sont deux sources distinctes
- Proposer du code sans avoir demandé l'autorisation d'abord
- Ne pas tester mentalement le flux complet avant de coder (ex: cache-busting oublié)
- Utiliser `appelAdminAPI` qui n'existe pas — c'est `appelAPI` et `appelAPIPost`
- Mettre `updateContenu` dans `doGet` au lieu de `doPost` pour une opération d'écriture
- Proposer de vider le cache navigateur comme solution — ça ne règle rien
- Redemander un fichier déjà fourni dans la session — même 2h plus tard, si on n'y a pas touché, il est identique
- Proposer un changement CSS sans vérifier si ça casse autre chose (public ET admin)
- Lors d'un remplacement de `:root`, ne pas conserver les couleurs de base en tête de liste
- Donner du code sans attendre le OK explicite
- **Donner deux trouve/remplace dans la même réponse** — un seul à la fois, attendre OK avant le suivant
- Faire un résumé de diagnostics au lieu de proposer directement la solution
- Poser une question sur les fichiers au lieu de les lire directement

**Workflow actuel :**
- Notepad++ pour éditer
- GitHub Desktop pour commiter (attendre ~5 min pour GitHub Pages)
- `Code.gs` : après chaque modification, redéployer en **nouvelle version** — l'URL ne change pas
- Deux `index.html` : racine = public, `/admin/` = admin
- Après chaque commit : toujours vérifier **les deux pages** (public ET admin)
- Jean-Claude ne commite pas après chaque modification — il accumule plusieurs changements

**Ton attitude gagnante :** solution directe, une étape à la fois, confirmation avant de coder, jamais de style inline, jamais de nouvelle fonction si une existe. Tester mentalement le flux COMPLET avant de proposer du code.

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
- **UN SEUL trouve/remplace par réponse** — jamais deux blocs dans le même message, attendre OK avant le suivant
- **UNE ÉTAPE À LA FOIS :** Proposer le changement → attendre OK → exécuter → attendre OK → étape suivante. Jamais enchaîner sans confirmation explicite.
- **DOCUMENTATION :** Toujours en `.md`, complets et autonomes
- **JAMAIS de formules condescendantes**
- **TESTER MENTALEMENT avant de donner le code — flux complet incluant cache, API, DOM**
- **FORMULAIRE CONTACT :** jamais Formspree — toujours `MailApp.sendEmail()` via Apps Script
- **URL APPS SCRIPT :** mettre à jour dans `main.js` uniquement
- **LIRE LES FICHIERS UPLOADÉS avant de poser des questions**
- **DEUX `index.html` :** le public est à la racine, l'admin est dans `/admin/` — Jean-Claude précise lequel il envoie
- **APRÈS CHAQUE COMMIT :** toujours dire "Commite et dis-moi ce que tu vois — en attendant on regarde la prochaine note."

---

## ⛔ VIOLATIONS FRÉQUENTES — INTERDICTIONS ABSOLUES

- **JAMAIS de style inline** dans le HTML ou le JS — même temporairement — même "juste pour tester"
- **JAMAIS poser une question sur un fichier déjà fourni** dans la conversation — lire avant de demander
- **JAMAIS redemander un fichier** qui a déjà été envoyé dans la session — même 2h plus tard
- **JAMAIS expliquer le pourquoi d'un problème** — proposer directement la solution
- **JAMAIS utiliser de valeurs CSS hardcodées** (px, rem) si une variable CSS existe déjà
- **JAMAIS créer une nouvelle fonction** si une existante peut être réutilisée
- **JAMAIS modifier plus d'une chose à la fois** sans approbation explicite
- **JAMAIS deux trouve/remplace dans la même réponse** — un seul bloc à la fois, attendre OK avant le suivant
- **LIRE le briefing ET les fichiers uploadés AVANT toute réponse**
- **TESTER MENTALEMENT le code avant de le proposer — flux complet**
- **JAMAIS mélanger données Collections et données Recettes** — ce sont deux sources distinctes dans le Sheet
- **JAMAIS proposer du code directement** — toujours décrire la solution et attendre un OK explicite avant de donner le moindre bloc de code
- **JAMAIS utiliser `appelAdminAPI`** — ça n'existe pas. Utiliser `appelAPI` (GET) ou `appelAPIPost` (POST/écriture)
- **JAMAIS oublier `&t=${Date.now()}`** sur les appels API — déjà intégré dans `appelAPI` via `url.searchParams.set('t', Date.now())`
- **JAMAIS vider le cache navigateur comme solution** — ça ne règle rien
- **JAMAIS faire un remplacement de `:root`** sans conserver les couleurs de base en tête de liste
- **TOUJOURS vérifier les accolades fermantes** dans les règles CSS avant de soumettre — une règle non fermée casse tout le CSS qui suit
- **JAMAIS de valeur hardcodée** comme `'#8b8680'` dans le JS — utiliser `var(--gris)` ou laisser vide

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

### Variantes de transparence — dans `:root`
Toutes les couleurs ont des variantes nommées `--couleur-XX` où XX = opacité en centièmes.
- **--primary** : 04, 05, 06, 08, 10, 12, 15, 16, 18, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--danger** : 06, 08, 10, 15, 16, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--accent** : 08, 10, 12, 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--beige** : 08, 10, 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--blanc** : 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90, 92
- **--blanc-pur** : 15, 45, 50, 60, 65, 70, 75, 80, 85, 88, 90
- **--gris** : 08, 10, 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--gris-fonce** : 08, 10, 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90
- **--noir** : 08, 10, 15, 20, 30, 40, 50, 60, 70, 75, 80, 85, 88, 90

**Règle :** Toujours utiliser `var(--primary-08)` etc. — jamais `rgba(90,138,58,0.08)` directement dans le CSS.
**Règle :** `--logo: #333333` réservé aux éléments de marque — `--gris-fonce: #3d3b39` pour les textes courants.

---

## IMAGES

- `Images/Logofinal.png` — hero public + accueil admin
- `Images/plume.png` — favicon toutes les pages
- `Images/savonnerie.png` — section qui-sommes-nous
- `Images/fond.png` — background hero-right public + tuiles admin accueil + footer
- `Images/fondw.png` — n'existe pas, utiliser `fond.png`

---

## ARCHITECTURE FICHIERS

```
/
├── index.html          ← site public
├── main.js             ← JS public
├── style.css           ← CSS unique public + admin
├── Images/
│   ├── Logofinal.png
│   ├── plume.png
│   ├── savonnerie.png
│   └── fond.png
└── admin/
    ├── index.html      ← interface admin
    ├── admin.js        ← JS admin
    └── login.html      ← page login admin
```

**Code.gs** = Apps Script (Google Sheets) — backend API

---

## FONCTIONS JS IMPORTANTES

### main.js
- `appelAPI(action, params)` — GET avec cache-busting `t=Date.now()` intégré
- `appelAPIPost(action, data)` — POST
- `chargerCollections()` — tuiles accueil public
- `chargerCatalogue()` — catalogue produits public
- `chargerContenu()` — injection contenu dynamique
- `carteProduit(p)` — génère HTML carte produit catalogue
- `ouvrirModalFromCard(el)` — décode data-produit et appelle ouvrirModal
- `ouvrirModal(produit)` — ouvre le modal produit
- `filtrer(collection)` — filtre catalogue par collection
- `couleurTexteContraste(hex)` — retourne classe CSS selon luminosité du hex
- `couleurCollection(nom, hex)` — retourne [hex, hex_foncé] — dans `main.js`, utilisée par `admin.js` aussi
- `assombrirCouleur(hex)` — calcule version foncée d'un hex

### admin.js
- `appelAPI(action, params)` — GET
- `appelAPIPost(action, data)` — POST
- `chargerCollections()` — tuiles admin — **doit être appelée avec `await`**
- `chargerCollectionsPourSelecteur()` — peuple `#fr-collection` dans formulaire recette
- `ouvrirFormRecette()` — vide tous les champs dont `fr-couleur-visible`, `fr-image-url`, aperçu photo et couleur
- `ouvrirFicheRecette(id)` — ouvre la fiche en **mode consultation** (pas édition)
- `fermerFicheRecette()` — ferme la fiche, remet `recetteActive = null`
- `basculerModeEditionRecette()` — sauvegarde l'id, ferme la fiche, ouvre le formulaire
- `supprimerRecetteActive()` — appelle `supprimerRecette` avec l'id actif
- `apercuCouleurCollection(input)` — met à jour le div aperçu hex sans style inline
- `apercuCouleurRecette(input)` — met à jour `fr-couleur-apercu` sans style inline
- `filtrerRecettes()` — filtre par collection, ligne, statut, **et nom (auto-filtrant)**
- `reinitialiserFiltresRecettes()` — remet tous les filtres à zéro
- `chargerDensites()` — charge et affiche les densités avec rangées cliquables
- `ouvrirFormDensite()` — nouveau type, vide tous les champs dont `fd-marge-perte`
- `modifierDensite(type)` — remplit le formulaire dont `fd-marge-perte`
- `sauvegarderDensite()` — envoie type, densite, unite, **marge_perte_pct**

### Variables globales admin.js
- `donneesCollections` — tableau des items collections chargés
- `donneesRecettes` — tableau des recettes, **triées par rang → ligne → nom**
- `donneesDensites` — tableau des densités chargées
- `recetteActive` — recette courante en consultation (null si aucune)

---

## TUILES CATALOGUE PUBLIC — COMPORTEMENT ACTUEL

- Zone photo : couleur de collection en fond + photo par-dessus + overlay dégradé couleur montant du bas
- Zone infos (`.carte-infos`) : fond = couleur collection à 90% d'opacité
- Textes : classe `.carte-infos-clair` (textes blanc) ou `.carte-infos-fonce` (textes foncés) selon luminosité via `couleurTexteContraste()`
- Sans photo : couleur pleine + placeholder "PHOTO À VENIR"

---

## CATALOGUE PUBLIC — REGROUPEMENT

- Produits regroupés par **collection** puis par **ligne**
- En-têtes : `.collection-entete` (collection) + `.ligne-groupe-entete` (ligne)
- Couleur entête : `--col-hex` via `color-mix` dans CSS
- UPPERCASE sur collection, ligne, nom partout

---

## MODAL PRODUIT PUBLIC

- "Format disponible" masqué via classe `cache` si `formats` est vide
- `id="modal-formats-titre"` sur le div du titre format

---

## APPELS API

- Lecture → `appelAPI('action')` — GET avec `t=Date.now()` automatique
- Écriture → `appelAPIPost('action', data)` — POST
- **JAMAIS** `appelAdminAPI`

---

## RÈGLES D'INTERFACE

- Champs numériques : `type="text" inputmode="numeric"`
- Noms en MAJUSCULES partout (collections, lignes, noms de savons)
- Zéro placeholder dans les champs — utiliser un `<label>` à la place
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

## BURGER MOBILE — COMPORTEMENT ACTUEL (PUBLIC ET ADMIN)

- Classe `.burger-flottant` commune aux deux burgers
- `position: fixed; top: 16px; right: 24px;` — cercle vert 48px
- `.burger-flottant span` : `background: white`
- `.burger-flottant.cache-scroll` : disparaît en scrollant vers le bas, réapparaît en remontant
- Nav publique cachée sur mobile (`display: none`)
- Nav admin : `<nav>` cachée sur mobile, burger sorti de la nav — élément indépendant après `</nav>`
- Logique scroll : `initNav()` (public) et `initBurgerAdmin()` (admin) avec `dernierScroll`

---

## DENSITÉS — STRUCTURE ACTUELLE

- Tableau : Type | Densité (g/ml) | Unité source | Marge perte (%) | Actions
- Rangée cliquable → `modifierDensite(type)` — `event.stopPropagation()` sur le bouton Modifier
- Formulaire : `fd-type`, `fd-densite`, `fd-unite`, `fd-marge-perte`
- `Code.gs` : `saveDensity` et `addDensityType` écrivent en colonne 4 (`marge_perte_pct`)

---

## RECETTES ADMIN — STRUCTURE ACTUELLE

- Grille `#grille-recettes` en mode `display: block`
- Regroupement par collection (`.recette-section-collection`) puis par ligne (`.recette-section-ligne`)
- En-têtes : `.recette-collection-titre` (Playfair, 1.8rem) + `.recette-ligne-titre` (DM Sans, 0.78rem, uppercase)
- Grille interne `.recettes-grille` par ligne
- `--col-hex` sur `.recette-carte` → utilisé par `.recette-couleur` et `.recette-dot`
- Filtres conservés : collection, ligne, statut, nom

---

## FICHE RECETTE — STRUCTURE ACTUELLE

- Panneau `#fiche-recette` (`.form-panel`) — consultation seule
- Header : titre recette + boutons Modifier / Supprimer / Fermer
- Corps `#fiche-recette-contenu` : visuel (photo 180×180 + carré hex 180×180), grille de champs, description, instructions, notes, ingrédients
- Classes CSS : `.fiche-visuel`, `.fiche-visuel-photo`, `.fiche-visuel-hex`, `.fiche-grille`, `.fiche-champ`, `.fiche-label`, `.fiche-valeur`, `.fiche-section-titre`, `.fiche-texte`, `.fiche-ingredients`, `.fiche-ingredient`, `.fiche-ing-nom`, `.fiche-ing-qte`, `.fiche-vide`
- ⚠️ Le visuel hex utilise encore du style inline temporairement — à corriger

---

## FILTRES RECETTES — STRUCTURE ACTUELLE

Barre `.filtres-bar` avec :
- `#filtre-recette-collection` — select collection
- `#filtre-recette-ligne` — select ligne (désactivé si pas de collection)
- `#filtre-recette-statut` — select statut (test / public)
- `#filtre-recette-nom` — input texte, label "Par nom", auto-filtrant
- Bouton "Réinitialiser" → `reinitialiserFiltresRecettes()`

---

## APERÇU COULEUR — COMPORTEMENT ACTUEL

- `.couleur-apercu` — carré 32×32px, fond `var(--beige)` par défaut
- Collections formulaire : `#fc-couleur-apercu` et `#fc-couleur-apercu-ligne`
- Recettes formulaire : `#fr-couleur-apercu`
- Mise à jour via `apercuCouleurCollection(input)` et `apercuCouleurRecette(input)` — sans style inline sur l'input

---

## TUILES ACCUEIL ADMIN — STRUCTURE ACTUELLE

Grille 4×2 (`grid-template-columns: 1fr 1fr 1fr 1fr`) :

| # | Tuile | Section | Classe couleur |
|---|-------|---------|----------------|
| 1 | Collections | `collections` | `accueil-tuile-collections` → `--primary-70` |
| 2 | Recettes | `recettes` | `accueil-tuile-recettes` → `--accent-70` |
| 3 | Achats | `nouvelle-facture` | `accueil-tuile-achats` → `--gris-70` |
| 4 | Stock | — (bientôt) | `accueil-tuile-stock` → `--primary-50` |
| 5 | Inventaire | `inventaire` | `accueil-tuile-inventaire` → `--gris-fonce-70` |
| 6 | Factures | `factures` | `accueil-tuile-factures` → `--accent-50` |
| 7 | Liste | — (bientôt) | `accueil-tuile-liste` → `--primary-40` |
| 8 | Divers | — (bientôt) | `accueil-tuile-divers` → `--gris-50` |

---

## SIDEBAR ADMIN — STRUCTURE ACTUELLE

En bas de la sidebar, après `.sidebar-groupe` Système :
```html
<div class="sidebar-sep"></div>
<div class="sidebar-groupe">
  <a href="../index.html" target="_blank" class="sidebar-lien">Site public</a>
  <button class="sidebar-lien" onclick="seDeconnecter()">Déconnexion</button>
</div>
```

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

### Admin — Recettes
- [ ] Textareas auto-adaptables au contenu
- [ ] Recettes : section ingrédients formulaire + sauvegarde (Note 13)
- [ ] **Calculateur SAF** — intégré à la fiche recette, pré-charge les ingrédients, paramètres (peau, saison, usage, surgras, eau) indépendants, bouton "Appliquer à la recette" met à jour NaOH/eau/surgras — À faire après Note 13
- [ ] **Générateur INCI** — intégré à la fiche recette, même flux que SAF, nécessite champ `nom_inci` sur chaque ingrédient dans le Sheet — À faire après Note 13
- [ ] Fiche recette : visuel hex — retirer le style inline temporaire, remplacer par attribut `data-` + CSS

### Admin — Autres
- [ ] **Bug : produits "undefined" dans détail facture**
- [ ] Factures : rangée cliquable, fiche complète, statut, filtre, mobile
- [ ] Nettoyer code mort factures dans `admin.js` (lignes ~726-904)

### Site public
- [ ] Formulaire contact : brancher `envoyerContact` dans `index.html` (déjà dans `Code.gs`)
- [ ] Note 48 : Plume = bouton retour accueil
- [ ] Remplacer les `rgba` hardcodées dans `style.css` par les variables `--couleur-XX` du `:root`

### Futur
- [ ] Nom de domaine `universcaresse.ca` (Webnames.ca recommandé)
- [ ] **Catalogue PDF** — page HTML dédiée dans l'admin, générée dynamiquement avec `getCataloguePublic()`, tous les produits avec prix/description/photos/photos ambiance, mise en page soignée, `@media print` + `window.print()`, format 11×17 recto-verso pour centre de copie
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

## ✅ COMPLÉTÉ — 7 mars 2026 (session 1)

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

## ✅ COMPLÉTÉ — 7 mars 2026 (session 2)

- Onglet `Contenu` créé dans le Sheet via `initialiserContenu()` ✅
- `getContenu()` ajouté dans `Code.gs` + branché dans `doGet` ✅
- `updateContenu()` ajouté dans `Code.gs` + branché dans `doPost` ✅
- `chargerContenu()` ajouté dans `main.js` — appelée au `DOMContentLoaded` avec cache-busting ✅
- `index.html` public : tous les textes en dur vidés — injection 100% via API ✅
- `index.html` public : tous les `id` de contenu dynamique ajoutés ✅
- Section **Contenu du site** ajoutée dans `admin/index.html` (Système) ✅
- `chargerContenuSite()` + `sauvegarderContenuSite()` ajoutés dans `admin.js` ✅
- `.form-panel.visible` utilisé pour afficher les panneaux de la section ✅
- `validerConnexionAdmin()` ajoutée dans `admin.js` ✅

## ✅ COMPLÉTÉ — 8 mars 2026 (session 3)

- Bug `</div></div>` en trop dans section Contenu du site — panneaux visibles sur toutes les pages ✅
- `#ecran-connexion` : classe `cache` ajoutée par défaut dans le HTML ✅
- Bug double point `..ecran-connexion` dans `style.css` corrigé → `.ecran-connexion` ✅
- Bug accolade manquante `.toast.toast-erreur` dans `style.css` — cassait tout le CSS qui suit ✅
- `:root` refondé — couleurs de base + variantes de transparence pour toutes les couleurs ✅
- Tuiles admin accueil : fond `fond.png` + couleurs `rgba` via variables `--couleur-70` ✅
- Footer : fond `fond.png` + overlay `::before` `var(--gris-fonce-88)` + texte `var(--blanc-pur-75)` ✅

## ✅ COMPLÉTÉ — 8 mars 2026 (session 4)

- Fiche collection : bouton "Fermer" dans le bandeau supprimé ✅
- Fiche collection : boutons Modifier / Ajouter une ligne / Fermer déplacés dans le bandeau ✅
- Fiche collection : couleur dégradé retirée du bandeau — fond neutre ✅
- Fiche collection : clic "Modifier" ferme la fiche ET ouvre le formulaire ✅
- Fiche collection : "+ Ajouter une ligne" branché sur `ouvrirFormCollectionPour` + `basculerModeFormCollection` ✅
- Fiche collection : texte couleur bandeau corrigé → `var(--gris-fonce)` et `var(--gris)` ✅
- `item.ligne.toUpperCase()` → `String(item.ligne || '').toUpperCase()` dans `chargerCollections` ✅
- `infoCol` en mode ajout ligne : cherche première rangée de la collection (pas seulement `!i.ligne`) ✅
- Modal produit public : apostrophes cassaient l'`onclick` → encodage `btoa/atob` + `data-produit` ✅
- `ouvrirModalFromCard(el)` ajoutée dans `main.js` — décode `data-produit` et appelle `ouvrirModal` ✅
- `white-space: pre-line` sur `p` dans `style.css` — paragraphes respectés sur le public ✅
- `fr-couleur` ajouté en `hidden` dans `admin/index.html` formulaire recette ✅
- `modifierRecette` : `fr-image-url` et `fr-image-preview` remplis à l'ouverture ✅
- Champ `fr-couleur-visible` + aperçu `fr-couleur-apercu` ajoutés au formulaire recette ✅
- `apercuCouleurRecette()` ajoutée dans `admin.js` ✅
- `modifierRecette` : remplit `fr-couleur-visible` et aperçu couleur à l'ouverture ✅

## ✅ COMPLÉTÉ — 8 mars 2026 (session 5b)

- Icône tuile Collections → SVG "5 blocs" ✅
- Icône tuile Recettes → SVG "Recette + savon" ✅
- Icône tuile Nouvelle facture → SVG "Dossiers" ✅
- Calculateur SAF ajouté à la liste À FAIRE ✅
- Générateur INCI ajouté à la liste À FAIRE ✅
- Catalogue PDF précisé : page HTML admin, `@media print`, format 11×17 recto-verso ✅

## ✅ COMPLÉTÉ — 8 mars 2026 (session 5)

- `.hero-stats` : `max-width: 480px` + `margin: auto` ✅
- Bug select collections vide dans formulaire recette corrigé ✅
- Formulaire nouvelle recette : `ouvrirFormRecette()` vide tous les champs ✅
- Migration `carteProduit`, `ouvrirModalFromCard`, `ouvrirModal`, `filtrer` vers `main.js` ✅
- Modal produit : "Format disponible" masqué si formats vide ✅
- Tuiles catalogue : overlay dégradé couleur + `.carte-infos` fond couleur 90% ✅
- `couleurTexteContraste(hex)` — classes `.carte-infos-clair` / `.carte-infos-fonce` ✅

## ✅ COMPLÉTÉ — 9 mars 2026 (session 6)

- Bug hex collections : `await` manquant sur `chargerCollections()` dans `sauvegarderCollection` ✅
- `await chargerCollections()` ajouté dans `supprimerLigne` ✅
- Cache-busting `t=Date.now()` intégré dans `appelAPI` de `main.js` ✅
- `DOMContentLoaded` rendu `async` dans `admin.js` ✅
- `.couleur-apercu` ajoutée dans `style.css` ✅
- `#fc-couleur-apercu` et `#fc-couleur-apercu-ligne` ajoutés dans `admin/index.html` ✅
- `apercuCouleurCollection` réécrite sans style inline ✅
- `apercuCouleurRecette` réécrite sans style inline ✅
- `modifierCollection` : appel `apercuCouleurCollection` au chargement ✅
- Filtres recettes : champ "Par nom" auto-filtrant + bouton Réinitialiser ✅
- Classes `.filtres-bar`, `.filtre-select`, `.filtre-recherche`, `.filtre-label` dans `style.css` ✅
- Tri recettes : rang → ligne → nom ✅
- Fiche recette consultation ajoutée ✅

## ✅ COMPLÉTÉ — 9 mars 2026 (session 7)

- Sidebar admin : "Site public" (nouvel onglet) + "Déconnexion" ajoutés en bas avec séparateur ✅
- Nav admin : "Site public" et "Déconnexion" retirés de la barre nav ✅
- Burger flottant public : `.burger-flottant` classe commune créée ✅
- Burger flottant admin : même comportement que public — `position: fixed; top: 16px; right: 24px;` ✅
- `#burger-admin` sorti de la `<nav>` — élément indépendant ✅
- `#burger-admin { position: relative; }` retiré — ne bloque plus `position: fixed` ✅
- `#burger-admin { display: flex; }` dans media query retiré — géré par `.burger-flottant` ✅
- Logique scroll `cache-scroll` ajoutée dans `initBurgerAdmin()` ✅
- `.accueil-bonjour` : `letter-spacing: 0.05em` — lettres moins serrées ✅
- Catalogue public : regroupement par collection puis par ligne ✅
- `getCataloguePublic()` dans `Code.gs` : `infoLignes` + `desc_ligne` ajoutés ✅
- Styles inline retirés de `carteProduit` — `--col-hex` sur `.carte-produit` ✅
- UPPERCASE sur collection, nom, ligne dans `carteProduit` et `construireCatalogue` ✅
- `couleurCollection()` : normalisation NFD + suppression diacritiques ✅
- Tuiles collections accueil public : dégradé via `--col-hex-1` et `--col-hex-2` sans inline ✅
- Recettes admin : regroupées par collection puis par ligne ✅
- Classes CSS recettes admin : `.recette-section-collection`, `.recette-section-ligne`, `.recette-collection-titre`, `.recette-ligne-titre`, `.recettes-grille` ✅
- `.recette-couleur` et `.recette-dot` : `background: var(--col-hex)` ✅
- Tuiles accueil admin : grille 4×2 avec 8 tuiles ✅
- Tuiles : Collections, Recettes, Achats, Stock, Inventaire, Factures, Liste, Divers ✅
- Classes couleur : `accueil-tuile-achats`, `accueil-tuile-stock`, `accueil-tuile-factures`, `accueil-tuile-liste`, `accueil-tuile-divers` ✅
- Densités : champ `marge_perte_pct` ajouté dans formulaire + tableau ✅
- Densités : rangées cliquables → `modifierDensite(type)` ✅
- `saveDensity` et `addDensityType` dans `Code.gs` : écriture colonne 4 `marge_perte_pct` ✅

## 🔜 À FAIRE

- **Mode saisonnier (ex: Noël)** : Ajouter colonne `image_url_noel` dans l'onglet Recettes du Sheet. Ajouter un champ `mode_actif` dans l'onglet Contenu (`normal` ou `noel`). Quand `mode_actif = noel`, le site utilise `image_url_noel` au lieu de `image_url` pour tous les produits automatiquement.

## ⚠️ NOTES IMPORTANTES CODE.GS

- `sauvegarderCollection` N'APPARTIENT PAS à `Code.gs` — c'est une fonction `admin.js`
- Toujours vérifier les doublons de fonctions avant de modifier `Code.gs`
- Après chaque modification de `Code.gs` : redéployer en nouvelle version
- L'URL du déploiement ne change pas entre les versions
- `updateContenu` est dans `doPost` — pas dans `doGet`
- Appels lecture → `appelAPI` (GET) / Appels écriture → `appelAPIPost` (POST)

---

*Univers Caresse — Chantal Mondor — Confidentiel*
*Mis à jour : 9 mars 2026 — 15h30 (session 7)*
