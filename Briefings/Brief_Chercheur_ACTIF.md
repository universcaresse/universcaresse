# BRIEF — CLAUDE CHERCHEUR
## Univers Caresse
*Mis à jour : 21 mars 2026 — 10h56*

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
- Script test scraping Les Mauvaises Herbes — ✅ validé (`test_scraping_mauvaisesherbes.gs`)
- Scraping complet Les Mauvaises Herbes — ✅ exécuté, feuille `Scraping_MH` peuplée (~110 produits)
- Générateur INCI — prototype prêt (implémenté en production par Travailleur)
- Catalogue PDF — prototype prêt (`catalogue-booklet-v2.html`) ⚠️ Lumina à remplacer par Casa

---

## 🔶 EN COURS — MODULE INGREDIENTS_INCI (#24) — CHERCHEUR PREND LA RELÈVE COMPLÈTE

**Mandat clair :**
1. **Reprendre la solution PA du Travailleur** (regex dernier match pour contourner le bloc vedette sidebar) — lire ce que Travailleur a fait et améliorer pour produire un `Scraping_PA` propre
2. **MH** ✅ déjà fait — `Scraping_MH` peuplée
3. **Divine Essence** — scraping (nom botanique → EU CosIng pour trouver INCI)
4. **EU CosIng** — fallback pour tout ingrédient introuvable chez les fournisseurs
5. **Produire `Ingredients_INCI` propre** avec col G `Note olfactive` peuplée

**Architecture en cours (pas finale) :**
```
Purearome → Scraping_PA → Ingredients_INCI (priorité 1)
Les Mauvaises Herbes → Scraping_MH → Ingredients_INCI (priorité 2)
Divine Essence → Scraping_DE → EU CosIng → Ingredients_INCI (priorité 3)
EU CosIng → fallback pour tout introuvable
```

**⚠️ Scraping PA — problème connu :**
- Le bloc vedette sidebar contient un INCI (Rosa rubiginosa) qui pollue les résultats
- Travailleur a trouvé : prendre le **dernier** match regex sur la page — à reprendre et améliorer
- Ne pas partir de zéro — lire la solution Travailleur d'abord

**Résultats reconnaissance fournisseurs :**
| Fournisseur | INCI explicite | Plateforme | Statut |
|---|---|---|---|
| Purearome | ✅ Oui | Panierdachat API + HTML | ⚠️ PA à reprendre par Chercheur |
| Les Mauvaises Herbes | ✅ Oui | Shopify | ✅ Scraping_MH peuplé |
| Divine Essence | ❌ Nom botanique seulement | Shopify | 🔜 À faire |
| Arbressence | ❌ Non | WordPress | Écarté |

**Feuille `Scraping_MH` — observations :**
- ~110 produits, majorité Propre
- Mélanges à diffuser (7) → INCI manquant normal, à exclure de `Ingredients_INCI`
- 2 erreurs (bourrache, coco bio) → URLs indisponibles, ignorées
- Doublons entre collections → `construireIngredientsINCI()` dédupliquera
- Catégorie `À classer` → table de correspondance à faire avec Chantal
- Provenance parfois avec texte parasite → à nettoyer

**Colonnes uniformes tous les stagings :**
Nom | Catégorie | INCI | Nom botanique | Partie plante | Composantes majoritaires | Point éclair | Provenance | Bio | Source | URL produit | Qualité | Statut | Date scraping

**Règle Qualité :**
- `Propre` → INCI présent, sans parasite → éligible pour `Ingredients_INCI`
- `À valider` → INCI manquant ou suspect → ignoré, fallback autre source

**Structure `Ingredients_INCI` :**
A=Catégorie | B=Nom | C=INCI | D=CAS | E=Source | F=Date ajout | G=Note olfactive

**Règles `Ingredients_INCI` :**
- Ne prend que les lignes `Qualité = Propre`
- Dédupliqué par INCI — source de priorité la plus haute gagne
- Pas de saisie manuelle (sauf via formulaire admin avec vérification doublon)
- Priorité : Purearome > Les Mauvaises Herbes > Divine Essence (via EU CosIng) > EU CosIng direct

**Nomenclature catégories (Purearome) :**
Argiles | Bases neutres | Cires | Colorants et Pigments | Herbes et Fleurs | Huiles aromatiques naturelle | Huiles essentielles | Huiles et Beurres | Hydrolats | Ingrédients Liquides | Ingrédients Secs | Fragrances | Saveurs naturelles

**À faire avec Chantal :**
- Table de correspondance catégories `À classer` (MH)
- Identifier 2 autres fournisseurs possibles

---

## 🎯 CHANTIERS À EXPLORER
- Système commande léger sans panier — attendre specs Chantal
- Couleurs hex sur boutons CTA — à explorer
- Comptabilité — État des résultats, Bilan
- Catalogue PDF 11×17

---

## ✅ DÉCISIONS PRISES
- Collection Lumina retirée — fusionnée dans Casa (⚠️ mettre à jour prototype catalogue)
- Formats recettes — Sheet `Recettes_Formats` séparée — un-à-plusieurs
- "Sur-titre" au lieu de "eyebrow"
- `Purearome_Test` = ancien staging bugué — remplacé par `Scraping_PA`
- Priorité INCI : Purearome > Les Mauvaises Herbes > Divine Essence (via EU CosIng) > EU CosIng direct
- Pas de saisie manuelle
- Colonne `Qualité` dans tous les stagings
- Nommage onglets : `Scraping_PA`, `Scraping_MH`, `Scraping_DE`
- Prioriser fournisseurs québécois
- Arbressence écarté (pas d'INCI)
- Chercheur prend la relève complète pour `Scraping_PA` — reprendre solution Travailleur (regex dernier match) et améliorer

---

## FICHIERS PRODUITS
| Fichier | État |
|---------|------|
| `catalogue-booklet-v2.html` | ⚠️ Lumina à remplacer par Casa |
| `test_scraping_mauvaisesherbes.gs` | ✅ validé |
| `Scraping_MH.gs` | ✅ livré — feuille peuplée |
| `Scraping_PA.gs` | ⚠️ à reprendre — INCI à améliorer |

---

*Univers Caresse — Confidentiel — 21 mars 2026 — 10h56*
