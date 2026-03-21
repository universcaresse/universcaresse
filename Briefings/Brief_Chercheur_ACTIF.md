# BRIEF — CLAUDE CHERCHEUR
## Univers Caresse
*Mis à jour : 20 mars 2026 — 21h39*

---

## LE PROJET
Site web pour la savonnerie artisanale de **Chantal Mondor** (Québec).
- **Google Sheets ID :** `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`
- **Apps Script URL :** `https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec`
- Site public : https://universcaresse.github.io/universcaresse/
- GitHub : https://github.com/universcaresse/univers-caresse

---

## TON RÔLE
Explorer les options techniques — prototypes, faisabilité, recherche. Tu ne codes pas en production — tu explores et remets des prototypes ou des recommandations.

---

## COMMENT DÉMARRER
Je lis ce brief, je confirme ma compréhension en une phrase, j'attends les instructions.

---

## ✅ CHANTIERS COMPLÉTÉS
- Scraping Purearome — ✅ exécuté, Sheet `Purearome_Test` peuplée (zone staging brute)
- Générateur INCI — prototype prêt
- Catalogue PDF — prototype prêt (`catalogue-booklet-v2.html`) ⚠️ Lumina à remplacer par Casa

---

## 🔶 EN COURS — MODULE INGREDIENTS_INCI (#24)

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
- Si EU CosIng a fourni un INCI et que Purearome le trouve → remplace EU par Purearome
- Jamais remplacer Manuel par automatique sans confirmation

**Fournisseurs à scraper :**
- Divine Essence : https://www.divineessence.com/fr/collections/bases + https://www.divineessence.com/fr/collections/union-nature-essential-oils
- Kamelya : https://www.kamelya.ca/fc/huiles-essentielles/categories/huiles-essentielles/
- Arbressence : https://arbressence.ca/produits-huiles-essentielles/huiles-essentielles/
- Les Mauvaises Herbes : https://boutique.lesmauvaisesherbes.com/collections/ingredients
- 2 autres fournisseurs possibles — à identifier avec Chantal

**Prochaines étapes :**
1. Exécuter `lancerScrapingInci()` → repeupler `Purearome_Test` + transfert auto vers `Ingredients_INCI`
2. Migrer `getDropdownLists()` vers `Ingredients_INCI`
3. Alerte admin ingrédients sans INCI + formulaire ajout manuel
4. Scraping Divine Essence, Kamelya, Arbressence, Les Mauvaises Herbes
5. Fallback EU CosIng pour introuvables
6. Générateur INCI recette — ordre décroissant

---

## 🎯 CHANTIERS À EXPLORER
- Système commande léger sans panier — attendre specs Chantal
- Couleurs hex sur boutons CTA — à explorer
- Comptabilité — État des résultats, Bilan
- Catalogue PDF 11×17

---

## ✅ DÉCISIONS PRISES
- Collection Lumina retirée — fusionnée dans Casa (⚠️ mettre à jour prototype catalogue)
- Formats recettes — Sheet `Recettes_Formats` séparée — un-à-plusieurs (implémenté par Travailleur)
- Emballage → reporté au module Achats/Inventaire
- "Sur-titre" au lieu de "eyebrow"
- `Purearome_Test` = zone staging brute — `Ingredients_INCI` = source de vérité permanente
- Priorité INCI : Purearome > EU CosIng > Manuel

---

## FICHIERS PRODUITS
| Fichier | Emplacement | État |
|---------|-------------|------|
| `catalogue-booklet-v2.html` | `claude-chercheur/` | ⚠️ Lumina à remplacer par Casa |

---

*Univers Caresse — Confidentiel — 20 mars 2026 — 21h39*
