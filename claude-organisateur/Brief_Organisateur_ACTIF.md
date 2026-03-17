# NOTES — UNIVERS CARESSE
*Mis à jour : 11 mars 2026*
*Produit par Claude Organisateur*

---

## L'ÉQUIPE

| Rôle | Qui | Mandat |
|------|-----|--------|
| Claude Idéateur | Jean-Claude | Génère les idées en rafale — vision, créativité, orientation du projet |
| Claude Organisateur | Claude (conversation dédiée) | Structure, priorise, documente — produit les notes et briefs entre les sessions |
| Claude Chercheur | Claude (conversation dédiée) | Explore les options techniques, propose des approches et alternatives avant de coder |
| Claude Scripteur | Claude (conversation dédiée) | Rédige les textes du site — ton, style, contenu — en collaboration avec Chantal |
| Claude Travailleur | Claude (conversation dédiée) | Exécute le code — une étape à la fois, pas de jasette — suit le briefing à la lettre |

**Règle :** Chaque Claude reste dans son rôle mais peut signaler et orienter vers le bon rôle.

---

## 🔴 BOGUES

### Admin
- [ ] Formulaire recette — les ingrédients de base s'ajoutent aussi en mode modification — devrait être seulement à la création
- [ ] Formulaire recette — ajout de photo ne fonctionne pas sur iPad
- [ ] Tuiles recettes — hauteur inégale quand le nom prend 2 lignes — uniformiser la hauteur
- [ ] Menu admin — lisibilité à revoir : couleurs, taille de texte, contraste — trop petit pour un usage quotidien

---

## 🟡 AMÉLIORATIONS — PUBLIC

### Contenu
- [ ] Mosaïque hero — alimenter dynamiquement avec 3 tuiles
- [ ] Textes Sheet → page publique — supporter le Markdown simplifié
- [ ] Réviser les textes — revoir avec Chantal
- [ ] Liste INCI sur fiche recette — présentation élégante — **Claude Chercheur devrait explorer les options**
- [ ] Informer les visiteurs comment acheter les produits

### Nouvelles sections
- [ ] Actualités — générées automatiquement
- [ ] FAQ — contenu gérable depuis l'admin
- [ ] Section éducative — huiles, beurres, saponification avec photos

---

## 🟡 AMÉLIORATIONS — ADMIN

### UX / Interface — Global
- [ ] Comportement global — masquer tout le contenu sauf l'entête à l'ouverture d'une fiche/formulaire
- [ ] Remplacer tous les boutons "Fermer" et "Réinitialiser" par un X dans un carré
- [ ] Inverser l'ordre Modifier/Supprimer partout
- [ ] Remplacer les `alert()` / `confirm()` système par des modals ou toasts maison

### Recettes
- [ ] Calculateur SAF — intégré à la fiche recette
- [ ] Générateur INCI — nécessite champ `nom_inci` sur chaque ingrédient
- [ ] Coût de revient — séparer ingrédients / emballages / amortissement
- [ ] Recette — ajouter un champ "Description emballage"

### Factures
- [ ] Page factures — filtre de recherche "Par produit"
- [ ] Page factures — remplacer les boutons d'action par des icônes
- [ ] Page factures — supprimer le bouton "Voir", rendre la ligne cliquable
- [ ] Page factures — trier par date la plus récente en premier
- [ ] Page factures — afficher le total d'achats
- [ ] Page factures — filtre par période + total dynamique

### Inventaire
- [ ] Resserrer la présentation + retirer colonnes "Total (g)" et "Prix au g"
- [ ] Uniformiser la largeur des colonnes
- [ ] Afficher fournisseur et format le moins dispendieux par ingrédient
- [ ] Filtres : par fournisseur, par ingrédient, par moins cher

### Comptabilité *(nouvelle section)*
- [ ] Ajouter section "Comptabilité" dans le menu admin
- [ ] État des résultats — détaillé par catégories, filtre par période, comparatif 2 ans
- [ ] Bilan
**Claude Chercheur devrait explorer comment tirer ces données des onglets existants du Sheet.**

---

## ♿ ACCESSIBILITÉ

- [ ] Augmenter taille de texte minimum mobile — 16px → 20px

---

## 🔵 À FAIRE — FUTUR

- [ ] Nom de domaine `universcaresse.ca`
- [ ] Catalogue PDF
- [ ] Amortissement équipements dans coût de revient
- [ ] Scraping PureArome + Arbressence + Scan QuaggaJS
- [ ] Confection / Corrections inventaire / Section Listes

---

## ✅ DÉCISIONS PRISES

- Appellation uniforme — **"Recettes"** partout, public ET admin

---

*Univers Caresse — Confidentiel*
*Créé : 10 mars 2026 — Mis à jour : 11 mars 2026*
