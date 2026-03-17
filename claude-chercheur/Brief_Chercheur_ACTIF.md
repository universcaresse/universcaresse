# BRIEF ACTIF — CLAUDE CHERCHEUR
## Univers Caresse
*Mis à jour : 16 mars 2026*

---

## CHANTIER 1 — SCRAPING PUREAROME
*Date : 12 mars 2026*

**Objectif :** Scraper https://www.purearome.com/fr/categorie/produits pour alimenter la base de données — éviter la saisie manuelle.

**Décisions prises :**
- Outil : `UrlFetchApp` dans Apps Script (pas de Python local)
- Destination : onglet `Purearome_Test` dans le Google Sheet existant
- Périmètre initial : page `/fr/categorie/produits` uniquement

**Script de test :** `scrapePurearome()` — rédigé et fourni à Jean-Claude.
Fait : fetch de la page, log status HTTP, extraction par regex (noms h2, prix, liens, images), écriture dans `Purearome_Test`.

**Statut : EN ATTENTE**
Jean-Claude doit exécuter `scrapePurearome()` et reporter :
- Le status HTTP retourné
- Le nombre de liens/prix/noms trouvés dans les logs
- Ce qui apparaît dans l'onglet `Purearome_Test`

**Points d'attention :**
- Apps Script n'a pas de vrai parser DOM — regex sur HTML brut
- Site pourrait retourner HTML minimal si rendu dynamique (JavaScript côté client)
- Status HTTP et longueur HTML = premiers indicateurs

---

## CHANTIER 2 — GÉNÉRATEUR INCI
*Date : 12 mars 2026*

**Objectif :** Lire un fichier Excel de recettes, générer la liste INCI (Santé Canada), exporter en .txt pour le graphiste.

**Structure Excel attendue :**
`collection` / `ligne` / `ingredient_type` / `ingredient_nom` / `quantite_g` / `INCI`

**Logique :**
1. Filtrer par collection + ligne
2. Trier par quantite_g décroissant
3. Regrouper les HA sous `Fragrance (nom1, nom2...)` sauf si colonne INCI remplie avec nom botanique
4. Output : liste séparée par virgules

**Statut : PROTOTYPE PRÊT**
Fichier `inci-generator.js` produit avec 4 fonctions :
- `lireExcel(file)` — lit le .xlsx
- `listerRecettes(rows)` — liste les combinaisons collection/ligne
- `genererListeINCI(rows, collection, ligne)` — génère la liste
- `exporterTxt(contenu, nomFichier)` — exporte en .txt

Dépendance : SheetJS (`xlsx`)

**Prochaine étape :** Passer à Claude Travailleur pour intégration dans l'interface admin.

---

## CHANTIER 3 — COMPTABILITÉ DEPUIS GOOGLE SHEETS
*Signalé par Claude Organisateur*

**Objectif :** Explorer comment tirer les données comptables des onglets existants du Sheet pour alimenter :
- État des résultats par catégories
- Filtre par période + comparatif 2 ans
- Bilan

**Statut : À EXPLORER**
Aucune exploration faite encore. À démarrer quand Jean-Claude le priorise.

---

## CHANTIER 4 — CATALOGUE PDF
*Date : mars 2026*

**Objectif :** Catalogue imprimable format 11×17 recto-verso, généré dynamiquement depuis le Sheet.

**Statut : PROTOTYPE HTML EXISTANT**
Fichier `catalogue-booklet-v2.html` — 10 pages complètes :
- P1 Couverture
- P2 Chantal
- P3 Saponica
- P4 Petit Nuage + Caprin
- P5 Émolia
- P6 Épure
- P7 Kérys + Lumina
- P8 Anima + LUI + Casa
- P9 Philosophie
- P10 Dos de couverture

**Prochaine étape :** Décider si on connecte au Sheet ou on garde statique. À valider avec Jean-Claude.

---

*Univers Caresse — Confidentiel — 16 mars 2026*
