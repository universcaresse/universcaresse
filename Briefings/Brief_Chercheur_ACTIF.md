# BRIEF — CLAUDE CHERCHEUR
## Univers Caresse
*Mis à jour : 22 mars 2026 — 11h00*

---

## LE PROJET
Site web pour la savonnerie artisanale de **Chantal Mondor** (Québec).
- **Google Sheets ID :** `16Syw5XypiHauOMpuAu-bWfIMMnMObn9avqoSEYjaNu0`
- **Apps Script URL :** `https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec`
- Site public : https://universcaresse.github.io/universcaresse/
- GitHub : https://github.com/universcaresse/univers-caresse

---

## TON RÔLE
Explorer les options techniques — prototypes, faisabilité, recherche. Tu ne codes pas en production — tu explores et remets des prototypes ou des recommandations sous forme de fichiers `.gs` autonomes.

---

## COMMENT DÉMARRER
Je lis ce brief, je confirme ma compréhension en une phrase, j'attends les instructions. **Je ne produis jamais un brief dans la conversation.**

---

## 🚨 STOP — LIS CECI AVANT DE TOUCHER AU CODE

Ces deux règles ont été violées par un Claude avec mémoire fraîche. Ce n'est pas acceptable. Chaque réponse qui implique du code doit passer ce test mental avant d'être envoyée :

**TEST #1 — Est-ce que j'ai le OUI ?**
L'analyse est faite. La solution est claire. Le contexte est évident. **Ça ne compte pas.** Sans le mot OUI de Jean-Claude dans la conversation, les doigts ne bougent pas. On propose, on attend, on reçoit le OUI, alors seulement on code.

**TEST #2 — Est-ce que c'est UN seul changement ?**
Compter les blocs de code dans la réponse. Si la réponse est plus que 1 — arrêter. Couper. Livrer le premier. Attendre la confirmation. Seulement ensuite proposer le suivant.

**TEST #3 — Le brief est-il livré en fichier .md ?**
Le brief est TOUJOURS produit en entier comme fichier `.md` téléchargeable via `present_files`. **Jamais collé dans le chat. Jamais en aperçu. Sans exception.**

Ces règles ne sont pas des suggestions. Un Claude qui les viole nuit directement au travail de Jean-Claude sur un vrai projet pour une vraie personne.

---

## ✅ CHANTIERS COMPLÉTÉS
- Script test scraping Les Mauvaises Herbes — ✅ validé (`test_scraping_mauvaisesherbes.gs`)
- Scraping complet Les Mauvaises Herbes — ✅ exécuté, feuille `Scraping_MH` peuplée (~110 produits)
- Générateur INCI — prototype prêt (implémenté en production par Travailleur)
- Catalogue PDF — prototype prêt (`catalogue-booklet-v2.html`) ⚠️ Lumina à remplacer par Casa

---

## 🔶 EN COURS — MODULE INGREDIENTS_INCI (#24) — CHERCHEUR PREND LA RELÈVE COMPLÈTE

**Mandat clair :**
1. **Scraping PA** ⚠️ — `Scraping_PA_v2.gs` livré et lancé — INCI manquant sur beaucoup de produits — à investiguer
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

**Scraping PA — état et limites connues :**
- `Scraping_PA_v2.gs` livré — fonctionne mais encore beaucoup de INCI manquants
- Deux structures HTML coexistent sur purearome.com
- **Ancienne structure** (`product-main__description` présent) → scraping HTML fonctionne → INCI, Parties, Origine extraits
- **Nouvelle structure** (contenu chargé dynamiquement en JS) → `product-main__description` absent → INCI inaccessible → marquer `À valider`
- **Nom botanique** → absent comme champ structuré chez PA — laisser vide
- **API Panierdachat** → ne contient pas les métadonnées INCI — inutile pour ce besoin
- **Puppeteer écarté partout** — Apps Script uniquement sur ce projet
- INCI tronqué corrigé — `pa2_nettoyerInci()` coupe le texte descriptif après parenthèse fermante
- Entités HTML (`&nbsp;`) nettoyées

**Deux formats HTML PA :**
- **Format A** (`<span>`) — HE et certaines huiles : `INCI : valeur` puis `Méthode d'extraction : X - Parties : Y - Origine : Z` sur une ligne
- **Format B** (`<strong>`) — beurres, argiles : `<strong>INCI :</strong> valeur` dans des `<li>`

**Prochaine investigation PA :**
- Beaucoup de produits encore sans INCI après le scraping v2
- Catégories concernées : Herbes et Fleurs, Huiles aromatiques, certaines HE, certaines Cires
- Hypothèse : ces produits n'ont tout simplement pas d'INCI sur leur page PA
- À confirmer : ouvrir manuellement 5-6 URLs `À valider` et vérifier si l'INCI est présent sur la page

**Résultats debug validés (22 mars 2026) :**
| Produit | INCI | Partie | Provenance | Nom botanique |
|---|---|---|---|---|
| huile-essentielle-lavande-vraie | ✅ | ✅ | ✅ | ❌ (dans INCI) |
| beurre-karite | ✅ | ❌ | ❌ | ❌ |
| argile-blanche-kaolin | ✅ | ❌ | ❌ | ❌ |
| hydrolat-rose | ❌ nouvelle structure | — | — | — |
| cire-candelilla | ❌ nouvelle structure | — | — | — |

**Résultats reconnaissance fournisseurs :**
| Fournisseur | INCI explicite | Plateforme | Statut |
|---|---|---|---|
| Purearome | ✅ Oui (ancienne structure) | Panierdachat API + HTML | ⚠️ v2 lancée — INCI manquants à investiguer |
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
- Puppeteer écarté partout — Apps Script uniquement
- PA nouvelle structure → contenu JS dynamique → inaccessible via fetch → marquer `À valider`
- PA nom botanique → absent comme champ structuré → laisser vide
- Chercheur produit des fichiers `.gs` autonomes — jamais de trouve/remplace dans le code Travailleur
- **Brief = fichier `.md` uniquement via `present_files` — jamais collé dans le chat, jamais en aperçu. Sans exception.**

---

## FICHIERS PRODUITS
| Fichier | État |
|---------|------|
| `catalogue-booklet-v2.html` | ⚠️ Lumina à remplacer par Casa |
| `test_scraping_mauvaisesherbes.gs` | ✅ validé |
| `Scraping_MH.gs` | ✅ livré — feuille peuplée |
| `Scraping_PA_v2.gs` | ⚠️ lancé — INCI manquants à investiguer |

---

*Univers Caresse — Confidentiel — 22 mars 2026 — 11h00*
