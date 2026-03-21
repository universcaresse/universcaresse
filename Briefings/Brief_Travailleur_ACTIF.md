# BRIEF — CLAUDE TRAVAILLEUR
## Univers Caresse
*Mis à jour : 21 mars 2026 — 10h56*

---

## PROJET — FICHIERS ET URLS
- Fichiers : `index.html`, `index_-_Admin.html`, `main.js`, `admin.js`, `css/style.css`, `code.gs`
- **Google Sheets ID :** `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`
- **Apps Script URL :** `https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec`
- Site public : https://universcaresse.github.io/universcaresse/
- GitHub : https://github.com/universcaresse/univers-caresse

---

## ✅ CHANGEMENTS — SESSION 21 MARS 2026

### Module Ingredients_INCI — suite (#24)

**Bogues scraping corrigés :**
- `scrapeInciPurearome()` — décodage unicode avant extraction regex (le site Purearome encode le HTML en `\uXXXX`)
- Regex INCI/CAS — prend le **dernier** match sur la page (le 1er est toujours Rosa rubiginosa du bloc vedette sidebar)
- `transfererVersIngredientsInci()` — exclut les lignes sans INCI (`if (!inciVal) continue`)

**Migration `getDropdownLists()` vers `Ingredients_INCI` :**
- Source changée de `Purearome_Test` vers `Ingredients_INCI`
- Bug corrigé : `data` n'était pas défini depuis `listesSheet`
- Champ `inci` ajouté dans `fullData`
- Champ `note_olfactive` ajouté dans `fullData` (col G de `Ingredients_INCI`)

**Sheet `Ingredients_INCI` :**
- Structure : A=Catégorie, B=Nom, C=INCI, D=CAS, E=Source, F=Date ajout, G=Note olfactive
- Col G ajoutée manuellement par Jean-Claude — sera peuplée par Chercheur

**Affichage INCI dans formulaire recette :**
- Champ INCI en lecture seule apparaît automatiquement à la sélection d'un ingrédient
- Option "+ Ajouter un ingrédient" en bas de chaque liste déroulante d'ingrédients
- `ajouterIngredientInci(categorie, index)` — sauvegarde dans `Ingredients_INCI` (Source=Manuel), recharge les listes
- ⚠️ Utilise `prompt()` natif — à remplacer par vrai modal lors du chantier #46

**`saveIngredientInci(data)` — `code.gs` :**
- Sauvegarde un nouvel ingrédient dans `Ingredients_INCI` (catégorie pré-remplie, nom saisi)
- Vérifie les doublons avant insertion
- Branché dans `doPost`

**Générateur INCI recette (#32) ✅ :**
- `genererInci(ingredients)` — `admin.js`
- Tri décroissant par quantité, séparation >1% / ≤1% du poids total
- Ingrédients de type `Fragrances` regroupés en `Fragrance (note1, note2...)` via col G `Ingredients_INCI`
- Affiché dans fiche recette consultation avec bouton "Copier INCI"
- Bouton désactivé si INCI manquants — liste les ingrédients manquants en avertissement rouge

**⚠️ Solution PA partielle — laissée au Chercheur :**
- Regex dernier match trouvée par Travailleur — mais solution non terminée
- Chercheur prend la relève complète pour `Scraping_PA` — doit regarder ce que Travailleur a fait et améliorer

---

## ✅ CHANGEMENTS — SESSION 20 MARS 2026

### Bogues réglés
- **Bogue #1** ✅ — Panneau admin ne se ferme pas après suppression ligne → `fermerFicheLigne()` ajouté dans `supprimerLigne()` (admin.js)
- **Bogue #2** ✅ — "Votre guide rapide" s'affichait partout → bloc déplacé à l'intérieur de `#edu-7` (index.html)
- **Bogue #3** ✅ — Références LUMINA retirées de `main.js` (palette couleurs ligne 21 + liste collections ligne 361)
- **Bogue** ✅ — `ouvrirFormCollection()` ferme maintenant la fiche collection ouverte avant d'ouvrir le formulaire
- **Bogue** ✅ — `afficherSection()` appelle `afficherEduSection(1)` pour `id === 'educatif'`
- **Bogue** ✅ — `modifierRecette` déclarée `async` (erreur await)
- **Bogue** ✅ — Flash de la grille recettes lors du passage consultation→modification → `basculerModeEditionRecette` réécrite en `async`, retire `fiche-recette` sans passer par `fermerFicheRecette`

### Boutons X admin standardisés
- Nouvelle classe CSS `.btn-fermer-panneau` (sans bordure, position absolue coin supérieur droit)
- `.form-panel` → `position: relative` ajouté
- Fiches traitées : `fiche-collection`, `fiche-ligne`, `form-collections`, `fiche-recette`, `form-recettes`, `form-densites`, modal facture, filtres factures, filtres inventaire
- Boutons action (Modifier/Supprimer/Enregistrer/Annuler) déplacés en bas avec `<hr class="separateur">`
- Filtres factures : compteur `factures-compte` avant le ✕, ✕ à l'extrême droite

### Module Formats Recettes (#22) ✅
**Structure :** Sheet `Recettes_Formats` (col A=recette_id, B=poids, C=unite, D=prix_vente, E=desc_emballage)

**code.gs ajouté :**
- `getRecettesFormatsSheet()` — crée/retourne la Sheet
- `getRecettesFormats(recette_id)` — lecture
- `saveRecetteFormat(data)` — création/modification
- `deleteRecetteFormat(rowIndex)` — suppression
- Branché dans `doGet` et `doPost`

**admin.js ajouté :**
- `formatsRecette = []` — variable globale
- `ajouterFormatRecette()`, `supprimerFormatRecette()`, `rafraichirListeFormatsRecette()`
- `modifierRecette` → charge les formats via `appelAPIPost('getRecettesFormats', ...)`
- `sauvegarderRecette` → sauvegarde chaque format via `appelAPIPost('saveRecetteFormat', ...)`
- `ouvrirFicheRecette` → async, charge et affiche les formats en consultation
- `ouvrirFormRecette` → réinitialise `formatsRecette = []`

**index_-_Admin.html ajouté :**
- Zone `#zone-formats-recette` avec `#liste-formats-recette` et bouton `+ Ajouter un format`

**Visuel formats :** classes `format-rangee`, `format-champ-court`, `format-champ-long`, `format-champ-action` avec labels

**À faire :** visuel fiche recette consultation à revoir (noté)

### Migration listes déroulantes
- `getDropdownLists()` — migré de `Listes` → `Purearome_Test` → `Ingredients_INCI` (final)
- `getIngredientsPrixMin()` — même migration

---

## ✅ CHANGEMENTS — SESSIONS PRÉCÉDENTES
- Section "Votre guide rapide" intégrée, clés `edu_guide_*` dans Sheet Contenu
- CSS `.edu-tableau`, `.edu-tableau-wrap`, `.edu-accord-*` ajoutés
- Liens éducatifs pages 3 et 7 corrigés
- Mosaïque hero — couleurs → variables CSS
- Admin — `ouvrirFormCollectionPour(col)`
- Scroll horizontal iPhone, modal produit, bouton CTA hero, collections secondaires, sections éducatives SPA, filtres inventaire, factures, Cloudinary

---

## 🔴 BOGUES EN ATTENTE
- [ ] Sur-titre hero "COLLECTIONS 2026" — positionnement iPhone — plusieurs tentatives ratées
- [ ] Fade in sections éducatives — refonte complète requise (`display:none` incompatible animations CSS)
- [ ] Prix/g modal — refonte du bloc requise

---

## 🔶 EN COURS — MODULE INGREDIENTS_INCI
**État :** `getDropdownLists()` migré ✅ — Générateur INCI ✅ — PA laissé au Chercheur

**Reste à faire (Chercheur) :**
1. Reprendre solution PA du Travailleur (regex dernier match) et améliorer
2. MH ✅ déjà fait
3. Poursuivre avec EU CosIng (fallback)
4. Peupler col G `Note olfactive`
5. Livrer `Ingredients_INCI` propre

**Reste à faire (Travailleur — après Chercheur) :**
- Bouton admin — lancer scraping ciblé sur les manquants
- Visuel fiche recette consultation formats — à revoir

---

## 🎯 PRIORITÉS (liste numérotée Jean-Claude)
1. Attendre livraison Chercheur (`Ingredients_INCI` propre + note olfactive)
2. Voir recettes incomplètes (#26)
3. Mode saisonnier — toggle admin (#28)
4. Ordre collections par rang (#30)
5. Section "Emballage" — reporté au module Achats/Inventaire (#23)
6. Sur-titre hero "COLLECTIONS 2026" — iPhone (#1)
7. Fade in sections éducatives — refonte (#2)
8. Prix/g modal — refonte (#3)
9. Filtres catalogue par type de peau (#4)
10. Liens page 7 → catalogue filtré par ingrédient (#5)
11. Guide rapide — peaufiner le visuel (#6)
12. Guide rapide — colonne "Savons recommandés" (#7)
13. Accordéons huiles/additifs/HE — mobile seulement (#8)
14. Mosaïque hero — alimenter dynamiquement (#9)
15. Textes Sheet → Markdown simplifié (#10)
16. Liste INCI sur fiche recette (#11) ✅ fait session 21 mars
17. Informer visiteurs comment acheter (#12)
18. Actualités automatiques depuis Sheet (#13)
19. FAQ gérable depuis admin (#14)
20. Pages FAQ, conditions de vente, retours/livraison (#15)
21. Courriel confirmation automatique commande (#16)
22. Taille texte mobile — section par section (#17)
23. Menu burger — valider iPhone (#18)
24. Modal tablette — revalider (#19)
25. Affichage délais — à définir (#20)
26. Import recettes JSON (#21)
27. Ajouter section "Emballage" — reporté (#23)
28. Recherche INCI via API EU CosIng (#24) — Chercheur
29. Système commande léger sans panier (#25)
30. Photo par ligne de produit (#27)
31. Sauvegarde automatique Sheet + GitHub (#29)
32. Calculateur SAF intégré fiche recette (#31)
33. Générateur INCI recette ordre décroissant (#32) ✅ fait session 21 mars
34. Coût de revient (#33)
35. Scan factures automatique (QuaggaJS) (#34)
36. Comptabilité — État des résultats, Bilan (#35)
37. Masquer contenu à l'ouverture fiche/formulaire (#36)
38. Inverser ordre Modifier/Supprimer (#37)
39. Tuiles collections — revoir affichage lignes (#39)
40. Bouton Modifier dans modal facture (#40)
41. Page factures — filtre "Par produit", icônes, retirer TPS/TVQ (#41)
42. Modal facture — afficher facture complète (#42)
43. Filtres inventaire — revoir le visuel (#43)
44. Inventaire — ligne séparation + resserrer + retirer colonne "Total (g)" (#44)
45. Modification collection/ligne — masquer liste en mode édition (#45)
46. Remplacer `alert()`/`confirm()` par modals/toasts (#46) — **`ajouterIngredientInci()` utilise `prompt()` natif à remplacer**
47. Filtre recettes "Par nom" — placeholder (#47)
48. Bon à savoir — refaire section Notes importantes (#48)
49. Navbar admin — item Vente désactivé (#49)
50. Prix/g réel — optimiser `finalizeInvoice` (#50)
51. Taille texte minimum mobile (16px → 20px) (#51)
52. Nom de domaine `universcaresse.ca` (#52)
53. Catalogue PDF 11×17 (#53)
54. Amortissement équipements (#54)
55. Module Vente complet (#55)
56. Refonte admin + design system (#56)

---

## ✅ DÉCISIONS PRISES (cumulatif)
- "Recettes" partout — "Sur-titre" au lieu de "eyebrow"
- Livraison par trouve/remplace — commits par Jean-Claude
- Brief sans rien effacer
- `section-texte` adopté partout — `page-hero` abandonné mobile
- Modal iPhone sans couleur — iPad portrait 2 colonnes — iPad paysage photo gauche
- Quand le code est écrit = c'est livré
- Fiche collection — rang dans carré couleur
- Formulaire ligne — Ligne, Format, Description, Ingrédients de base seulement
- Couleur HEX et Photo → collection, pas ligne de produits
- Collections secondaires — cases à cocher
- 2e photo recette — col T, `image_url_noel`
- Overlay — classe unifiée `recette-couleur-overlay`
- Prix/g — `prixUnitaire ÷ (quantité_en_g × (1 - margePerte/100))`
- Prix/g réel — facteur = `total / sousTotal` à la finalisation
- inputmode decimal tous les champs prix
- Google Sheets format QC — `parseFloat` sans `.toFixed()`
- Sheet Recettes col V = `desc_emballage`
- Sheet Listes : A=Type, B=Ingrédient, C=Contenant habituel, D=Contenant lookup, E=Quantité, F=Unité — **N'EST PLUS UTILISÉE pour les listes déroulantes**
- Sheet Config : A=Type, B=Densité, C=Unité source, D=marge_perte_pct
- Sections éducatives SPA via `afficherEduSection(num)` — 178 clés pattern `edu_sX_element`
- Nav sections : Accueil → Catalogue → Le savon artisanal → Bon à savoir → Contact
- `edu-pager` — navigateur `← X/7 →` — accroche `edu-accroche` pas italique
- Boutons Précédent/Suivant du bas retirés — retour section 1 via `naviguer()`
- `.page-entete` center / mobile flex-start — `.edu-pager` mobile flex-end
- Catalogue — scroll corrigé avec hauteur entête
- Cartes collections accueil — `aspect-ratio: 16/9` mobile
- Point couleur carte — haut à droite — bouton ✕ modal — cercle couleur avec ✕ blanc
- Classes CSS inutilisées retirées
- Mosaïque hero — `linear-gradient` semi-transparent
- Menu burger — fermeture au clic extérieur
- Fiche ligne — consultation avec boutons Modifier/Supprimer en bas
- `infoCollectionsData` dans `construireCatalogue()`
- Mode maintenance via `maintenance_active` dans Sheet Contenu
- Import recettes — en attente finalisation avec Chantal
- Trouve/remplace — toujours indiquer mode Notepad++ (Normal ou Étendu)
- Inventaire — tableau global, catégories en rangées de titre
- Guide rapide — tableau 4 colonnes (Type de peau, Surgraissage, Huiles, Argiles/Additifs)
- Accordéons sections éducatives — mobile seulement
- Tout contenu éditable par Chantal passe par l'admin — rien codé en dur
- Nouvelles clés Contenu ajoutées via Apps Script — pas manuellement
- Collection Lumina retirée — fusionnée dans Casa
- Boutons X admin — classe `btn-fermer-panneau`, position absolue coin supérieur droit, sans bordure
- Boutons action admin — en bas des panneaux avec `<hr class="separateur">`
- Formats recettes — Sheet `Recettes_Formats` séparée (Option B) — un-à-plusieurs
- Emballage — reporté au module Achats/Inventaire
- Listes déroulantes recettes/factures — source finale : `Ingredients_INCI`
- `Purearome_Test` = ancien staging — remplacé par `Scraping_PA`
- `Ingredients_INCI` = source de vérité propre et permanente (toutes sources)
- Structure `Ingredients_INCI` : A=Catégorie, B=Nom, C=INCI, D=CAS, E=Source, F=Date ajout, G=Note olfactive
- Priorité INCI : Purearome > Les Mauvaises Herbes > Divine Essence (via EU CosIng) > EU CosIng direct
- Pas de saisie manuelle dans `Ingredients_INCI` — sauf via formulaire admin avec vérification doublon
- Fournisseurs connus : Purearome, Les Mauvaises Herbes, Divine Essence + autres à identifier avec Chantal
- Générateur INCI — fragrances regroupées sous `Fragrance (note1, note2...)` via col G
- Règle canadienne INCI : ordre décroissant concentration, ingrédients ≤1% peuvent être dans n'importe quel ordre après les autres
- `ajouterIngredientInci()` utilise `prompt()` natif — à remplacer lors du chantier #46
- Chercheur prend la relève complète pour `Scraping_PA` — doit regarder solution Travailleur (regex dernier match) et améliorer

---

## ⚠️ PIÈGE DOCUMENTÉ — doGet vs doPost dans code.gs

**Problème rencontré :** `getRecettesFormats` a été ajouté dans `doGet` seulement. Mais `appelAPIPost` dans `admin.js` envoie toutes les requêtes vers `doPost`. Résultat : la fonction était inaccessible depuis l'admin.

**Règle à toujours respecter :**
- `appelAPIPost` → appelle `doPost` dans `code.gs`
- Toute fonction appelée depuis `admin.js` via `appelAPIPost` **doit être branchée dans `doPost`**
- Si une fonction doit aussi être accessible en lecture directe (URL), la brancher dans `doGet` EN PLUS — jamais à la place

**Réflexe avant tout ajout dans code.gs :**
1. Vérifier comment la fonction est appelée dans `admin.js` (`appelAPIPost` ou `appelAPI`)
2. `appelAPIPost` → brancher dans `doPost`
3. `appelAPI` → brancher dans `doGet`
4. Ne jamais retirer les branchements existants — ajouter seulement

---

## RÈGLES CRITIQUES (rappel)
- JAMAIS de code sans OUI explicite
- Un seul trouve/remplace à la fois
- Toujours lire le fichier avant de proposer
- Jamais de style inline dans JS/HTML
- Jamais suggérer pause/repos
- Fin de tâche → dire COMMIT
- Brief produit en entier en `.md` en fin de session sans rien effacer — **JAMAIS en conversation, toujours en fichier `.md`**
- **Avant toute proposition de solution technique : toujours cerner le problème au complet en jasant d'abord — poser des questions pour comprendre le contexte global, pas juste le symptôme immédiat — ne jamais proposer la première solution "facile" sans avoir exploré tout autour — une solution proposée sans avoir cerné le problème = violation**

---

*Univers Caresse — Confidentiel — 21 mars 2026 — 10h56*
