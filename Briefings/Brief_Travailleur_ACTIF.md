# BRIEF — CLAUDE TRAVAILLEUR
## Univers Caresse
*Mis à jour : 20 mars 2026 — 21h39*

---

## PROJET — FICHIERS ET URLS
- Fichiers : `index.html`, `index_-_Admin.html`, `main.js`, `admin.js`, `css/style.css`, `code.gs`
- **Google Sheets ID :** `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`
- **Apps Script URL :** `https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec`
- Site public : https://universcaresse.github.io/universcaresse/
- GitHub : https://github.com/universcaresse/univers-caresse

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

### Module Formats Recettes (NOUVEAU — #22)
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

### Migration listes déroulantes vers Purearome_Test
- `getDropdownLists()` — migré de Sheet `Listes` vers `Purearome_Test` (col A=catégorie, col B=nom)
- `getIngredientsPrixMin()` — même migration
- Impact : listes déroulantes recettes ET factures utilisent maintenant `Purearome_Test`

### Module Ingredients_INCI (NOUVEAU — EN COURS — #24)
**Architecture :**
```
Scraping Purearome → Purearome_Test (brut)
                           ↓ automatique post-scraping
                    Ingredients_INCI (propre, toutes sources)

EU CosIng / Manuel → directement dans Ingredients_INCI
                           ↓
              Listes déroulantes + Générateur INCI
```

**Priorité des sources INCI :**
1. Purearome — toujours prioritaire
2. EU CosIng — fallback si pas chez Purearome
3. Manuel — dernier recours absolu
- Si EU CosIng a fourni un INCI et que Purearome le trouve lors d'un nouveau scraping → remplace EU par Purearome
- Jamais remplacer Manuel par automatique sans confirmation

**Fournisseurs à scraper (en plus de Purearome) :**
- Divine Essence : https://www.divineessence.com/fr/collections/bases + https://www.divineessence.com/fr/collections/union-nature-essential-oils
- Kamelya : https://www.kamelya.ca/fc/huiles-essentielles/categories/huiles-essentielles/
- Arbressence : https://arbressence.ca/produits-huiles-essentielles/huiles-essentielles/
- Les Mauvaises Herbes : https://boutique.lesmauvaisesherbes.com/collections/ingredients

**code.gs ajouté :**
- `nettoyerTexte(str)` — décode unicode `\uXXXX` + entités HTML + retire balises
- `getIngredientsInciSheet()` — crée/retourne Sheet `Ingredients_INCI` (colonnes : Nom, Catégorie, INCI, CAS, Source, Date ajout)
- `initialiserIngredientsInci()` — ✅ exécuté, onglet créé
- `transfererVersIngredientsInci()` — lit `Purearome_Test` complet, transfère proprement sans écraser, appelé automatiquement à la fin de `scrapeInciPurearome()`
- `scrapeInciPurearome()` — corrigé : applique `nettoyerTexte()` sur INCI/CAS/Description avant écriture

**À faire (dans l'ordre) :**
1. Exécuter `lancerScrapingInci()` dans Apps Script pour repeupler `Purearome_Test` proprement + transfert auto vers `Ingredients_INCI`
2. Migrer `getDropdownLists()` pour lire `Ingredients_INCI` au lieu de `Purearome_Test`
3. Alerte admin — ingrédients de recette sans INCI dans `Ingredients_INCI`
4. Formulaire admin — ajout manuel d'un ingrédient dans `Ingredients_INCI`
5. Bouton admin — lancer scraping ciblé sur les manquants
6. Scraping Divine Essence, Kamelya, Arbressence, Les Mauvaises Herbes
7. Fallback EU CosIng pour ingrédients introuvables partout
8. Générateur INCI recette — ordre décroissant

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
Voir section "Module Ingredients_INCI" ci-dessus — prochaine étape : exécuter `lancerScrapingInci()` puis migrer `getDropdownLists()` vers `Ingredients_INCI`.

---

## 🎯 PRIORITÉS (liste numérotée Jean-Claude)
1. Exécuter `lancerScrapingInci()` + migration `getDropdownLists()` vers `Ingredients_INCI` (suite module #24)
2. Alerte admin ingrédients sans INCI + formulaire ajout manuel (suite module #24)
3. Scraping autres fournisseurs + EU CosIng fallback (suite module #24)
4. Générateur INCI recette ordre décroissant (#32)
5. Voir recettes incomplètes (#26)
6. Mode saisonnier — toggle admin (#28)
7. Ordre collections par rang (#30)
8. Section "Emballage" — reporté au module Achats/Inventaire (#23)
9. Sur-titre hero "COLLECTIONS 2026" — iPhone (#1)
10. Fade in sections éducatives — refonte (#2)
11. Prix/g modal — refonte (#3)
12. Filtres catalogue par type de peau (#4)
13. Liens page 7 → catalogue filtré par ingrédient (#5)
14. Guide rapide — peaufiner le visuel (#6)
15. Guide rapide — colonne "Savons recommandés" (#7)
16. Accordéons huiles/additifs/HE — mobile seulement (#8)
17. Mosaïque hero — alimenter dynamiquement (#9)
18. Textes Sheet → Markdown simplifié (#10)
19. Liste INCI sur fiche recette (#11)
20. Informer visiteurs comment acheter (#12)
21. Actualités automatiques depuis Sheet (#13)
22. FAQ gérable depuis admin (#14)
23. Pages FAQ, conditions de vente, retours/livraison (#15)
24. Courriel confirmation automatique commande (#16)
25. Taille texte mobile — section par section (#17)
26. Menu burger — valider iPhone (#18)
27. Modal tablette — revalider (#19)
28. Affichage délais — à définir (#20)
29. Import recettes JSON (#21)
30. Ajouter section "Emballage" — reporté (#23)
31. Recherche INCI via API EU CosIng (#24) — en cours
32. Système commande léger sans panier (#25)
33. Photo par ligne de produit (#27)
34. Sauvegarde automatique Sheet + GitHub (#29)
35. Calculateur SAF intégré fiche recette (#31)
36. Coût de revient (#33)
37. Scan factures automatique (QuaggaJS) (#34)
38. Comptabilité — État des résultats, Bilan (#35)
39. Masquer contenu à l'ouverture fiche/formulaire (#36)
40. Inverser ordre Modifier/Supprimer (#37)
41. Tuiles collections — revoir affichage lignes (#39)
42. Bouton Modifier dans modal facture (#40)
43. Page factures — filtre "Par produit", icônes, retirer TPS/TVQ (#41)
44. Modal facture — afficher facture complète (#42)
45. Filtres inventaire — revoir le visuel (#43)
46. Inventaire — ligne séparation + resserrer + retirer colonne "Total (g)" (#44)
47. Modification collection/ligne — masquer liste en mode édition (#45)
48. Remplacer `alert()`/`confirm()` par modals/toasts (#46)
49. Filtre recettes "Par nom" — placeholder (#47)
50. Bon à savoir — refaire section Notes importantes (#48)
51. Navbar admin — item Vente désactivé (#49)
52. Prix/g réel — optimiser `finalizeInvoice` (#50)
53. Taille texte minimum mobile (16px → 20px) (#51)
54. Nom de domaine `universcaresse.ca` (#52)
55. Catalogue PDF 11×17 (#53)
56. Amortissement équipements (#54)
57. Module Vente complet (#55)
58. Refonte admin + design system (#56)

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
- Listes déroulantes recettes/factures — source migrée vers `Purearome_Test` puis vers `Ingredients_INCI` (en cours)
- `Purearome_Test` = zone de staging brute du scraping Purearome
- `Ingredients_INCI` = source de vérité propre et permanente (toutes sources)
- Priorité INCI : Purearome > EU CosIng > Manuel
- Fournisseurs connus : Purearome, Divine Essence, Kamelya, Arbressence, Les Mauvaises Herbes + 2 autres possibles à identifier avec Chantal

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

*Univers Caresse — Confidentiel — 20 mars 2026 — 21h39*
