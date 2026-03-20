# BRIEF — CLAUDE TRAVAILLEUR
## Univers Caresse
*Mis à jour : 20 mars 2026 — 16h45*

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

## 🔶 EN COURS — LISTES RECETTES / PUREAROME
- Décision : utiliser la Sheet `Purearome_Test` comme source de données pour les listes déroulantes dans les recettes (au lieu de la Sheet `Listes`)
- La Sheet `Listes` reste en place pour autre chose — on n'y touche pas
- Le scraping Purearome est déjà exécuté et la Sheet est peuplée — **mais il y a des problèmes avec les données** (à détailler au prochain démarrage)
- **Prochaine étape :** Jean-Claude décrit les problèmes avec les données Purearome avant de coder quoi que ce soit

---

## 🎯 PRIORITÉS (liste numérotée Jean-Claude)
1. Sur-titre hero "COLLECTIONS 2026" — iPhone
2. Fade in sections éducatives — refonte
3. Prix/g modal — refonte
4. Filtres catalogue par type de peau
5. Liens page 7 → catalogue filtré par ingrédient
6. Guide rapide — peaufiner le visuel
7. Guide rapide — colonne "Savons recommandés"
8. Accordéons huiles/additifs/HE — mobile seulement
9. Mosaïque hero — alimenter dynamiquement
10. Textes Sheet → Markdown simplifié
11. Liste INCI sur fiche recette
12. Informer visiteurs comment acheter
13. Actualités automatiques depuis Sheet
14. FAQ gérable depuis admin
15. Pages FAQ, conditions de vente, retours/livraison
16. Courriel confirmation automatique commande
17. Taille texte mobile — section par section
18. Menu burger — valider iPhone
19. Modal tablette — revalider
20. Affichage délais — à définir
21. Import recettes JSON
22. ✅ Ajouter champ "poids/formats" dans recettes — FAIT (module Formats)
23. Ajouter section "Emballage" — reporté au module Achats/Inventaire
24. Recherche INCI via API EU CosIng — exploration Chercheur + scraping Purearome à définir
25. Système commande léger sans panier — exploration Chercheur
26. Voir recettes incomplètes
27. Photo par ligne de produit
28. Mode saisonnier — toggle admin
29. Sauvegarde automatique Sheet + GitHub
30. Ordre collections par rang
31. Calculateur SAF intégré fiche recette
32. Générateur INCI
33. Coût de revient
34. Scan factures automatique (QuaggaJS)
35. Comptabilité — État des résultats, Bilan
36. Masquer contenu à l'ouverture fiche/formulaire
37. Inverser ordre Modifier/Supprimer
38. ✅ Formats — plusieurs formats par ligne de produits — FAIT (via Recettes_Formats)
39. Tuiles collections — revoir affichage lignes
40. Bouton Modifier dans modal facture
41. Page factures — filtre "Par produit", icônes, retirer TPS/TVQ
42. Modal facture — afficher facture complète
43. Filtres inventaire — revoir le visuel
44. Inventaire — ligne séparation + resserrer + retirer colonne "Total (g)"
45. Modification collection/ligne — masquer liste en mode édition
46. Remplacer `alert()`/`confirm()` par modals/toasts
47. Filtre recettes "Par nom" — placeholder
48. Bon à savoir — refaire section Notes importantes
49. Navbar admin — item Vente désactivé
50. Prix/g réel — optimiser `finalizeInvoice`
51. Taille texte minimum mobile (16px → 20px)
52. Nom de domaine `universcaresse.ca`
53. Catalogue PDF 11×17
54. Amortissement équipements
55. Module Vente complet
56. Refonte admin + design system

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
- Sheet Listes : A=Type, B=Ingrédient, C=Contenant habituel, D=Contenant lookup, E=Quantité, F=Unité
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
- Scraping Purearome — données présentes dans Sheet `Purearome_Test` mais problèmes à clarifier
- Sheet `Listes` — on n'y touche pas pour l'instant (contient d'autres données)
- Listes déroulantes recettes — migration prévue vers `Purearome_Test` (en attente description des problèmes)

---

## RÈGLES CRITIQUES (rappel)
- JAMAIS de code sans OUI explicite
- Un seul trouve/remplace à la fois
- Toujours lire le fichier avant de proposer
- Jamais de style inline dans JS/HTML
- Jamais suggérer pause/repos
- Fin de tâche → dire COMMIT
- Brief produit en entier en `.md` en fin de session sans rien effacer

---

*Univers Caresse — Confidentiel — 20 mars 2026 — 16h45*
