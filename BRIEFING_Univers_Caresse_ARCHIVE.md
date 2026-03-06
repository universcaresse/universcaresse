# ARCHIVE — UNIVERS CARESSE
*Décisions techniques passées, historique des sessions, contexte résolu.*
*Ne pas uploader au début des sessions — pour référence seulement.*

---

## HISTORIQUE DES SESSIONS

### ✅ 3 mars 2026
- CORS résolu — `doGet` nettoyé, nouveau déploiement Apps Script
- Burger à droite, sidebar depuis la droite
- Sauvegarde recette corrigée, spinners corrigés
- Module Factures JS + HTML + CSS
- Filtres en cascade Recettes
- Cartes recettes cliquables

### ✅ 4 mars 2026 — matin
- Statut public/test recettes (col S)
- Filtre statut + badge statut sur cartes
- Cache Apps Script contourné (`&t=${Date.now()}`)

### ✅ 4 mars 2026 — après-midi
- Favicon `plume.png` sur tous les HTML
- Burger admin visible tous les écrans
- Collections — tableau supprimé, lignes intégrées dans les blocs couleur
- Recettes — grille 4 colonnes, champ couleur hex dynamique

### ✅ 4 mars 2026 — soir
- Photo `qui-sommes-nous.html` → `Images/savonnerie.png`
- Logo `Logofinal.png` remplace le texte hero sur `index.html`
- Burger + menu mobile depuis la droite
- Stats collections + produits dynamiques dans le hero public
- Couleurs collections revues, clés MAJUSCULES dans `COULEURS_COLLECTIONS`
- Cloudinary intégré dans formulaire recette
- Accueil admin redessiné — eyebrow, logo, "Bonjour Chantal", stats, animations
- 4 tuiles admin avec icônes SVG + hover animé
- Stats accueil admin dynamiques via `chargerStatsAccueil()`

### ✅ 5 mars 2026 — SPA public
- 5 pages HTML fusionnées en `index.html` SPA
- Navigation par hash : `#accueil`, `#catalogue`, `#qui-sommes-nous`, `#bon-a-savoir`, `#contact`
- `style.css` : tous les styles catalogue intégrés, variables `--padding-page` / `--padding-mobile`
- `main.js` : logique SPA, `chargerCatalogue()`, `envoyerFormulaire()`, `COULEURS_COLLECTIONS` centralisé
- Formspree supprimé — contact branché sur `appelAPIPost('envoyerContact')`
- Zéro style inline dans `index.html`

### ✅ 5 mars 2026 — CSS unifié
- `admin.css` fusionné dans `style.css` — source unique pour public ET admin
- `admin/index.html` mis à jour — ne charge plus `admin.css`
- Architecture finale : 1 `style.css`, 1 `main.js`, 1 `admin.js`, 0 doublon

---

## DÉCISIONS TECHNIQUES ABANDONNÉES

- **Google Drive pour les photos** — tenté et abandonné → remplacé par Cloudinary
- **Formspree** pour le formulaire contact — abandonné → remplacé par `MailApp.sendEmail()`
- **2 fichiers CSS** (style.css + admin.css) — abandonné → source unique `style.css`
- **5 pages HTML séparées** — abandonnées → SPA dans `index.html`

---

## CONTEXTE PERSONNEL (utile mais pas critique)

- Jean-Claude a une expérience pratique de la fabrication de savon à froid
- Recette personnelle "Nordet" pour peau très sèche hivernale québécoise — indigo + patchouli/vétiver/poivre noir
- Connaissance de la saponification, calculateurs de lye, marketing savon
- Projet Dionysos : application gestion cave à vin sur Apps Script (caméra bloquée par Google iframe)

---

## ARCHITECTURE PASSÉE (pour référence)

Avant le 5 mars 2026, le site public était composé de 5 pages séparées :
- `index.html` — accueil
- `catalogue.html` — catalogue
- `qui-sommes-nous.html` — à propos
- `bon-a-savoir.html` — informations
- `contact.html` — formulaire

Ces fichiers existent encore dans le repo mais sont inactifs — tout est maintenant dans `index.html` SPA.

---

*Univers Caresse — Chantal Mondor — Confidentiel*
*Archive créée : 5 mars 2026*
