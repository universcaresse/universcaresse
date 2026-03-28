/* ═══════════════════════════════════════
   UNIVERS CARESSE — admin.js
   ═══════════════════════════════════════ */

// ─── INITIALISATION ───

document.addEventListener('DOMContentLoaded', async () => {
  const session = sessionStorage.getItem('uc_admin');
  if (session !== 'true') {
    window.location.href = '/universcaresse/admin/login.html';
    return;
  }
  document.getElementById('ecran-connexion').classList.add('cache');
  chargerStatsAccueil();
  const dateField = document.getElementById('nf-date');
  if (dateField) dateField.value = new Date().toISOString().split('T')[0];
  initBurgerAdmin();
  await chargerCollections();
});

// ─── NAVIGATION SIDEBAR ───
function toggleDropdownAdmin(el) {
  const item = el.closest('.nav-admin-item');
  const estOuvert = item.classList.contains('ouvert');
  document.querySelectorAll('.nav-admin-item.ouvert').forEach(i => i.classList.remove('ouvert'));
  if (!estOuvert) item.classList.add('ouvert');
}

function afficherSection(id, bouton) {
  document.querySelectorAll('.nav-admin-item.ouvert').forEach(i => i.classList.remove('ouvert'));
  document.querySelectorAll('.section-admin').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.sidebar-lien').forEach(l => l.classList.remove('actif'));
  fermerFicheCollection();
   const s = document.getElementById('section-' + id);
  if (s) s.classList.add('visible');
  if (bouton) bouton.classList.add('actif');
  fermerSidebarMobile();
  document.querySelectorAll('.nav-admin-btn').forEach(b => b.blur());
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const contenu = document.querySelector('.admin-contenu');
  if (contenu) contenu.scrollTop = 0;
if (id === 'accueil')        chargerStatsAccueil();
if (id === 'collections')    { chargerCollections(); chargerListesFournisseurs(); }
 if (id === 'recettes')       { chargerRecettes(); chargerListesFournisseurs(); }
  if (id === 'inci')           chargerInci();
  if (id === 'densites')       chargerDensites();
  if (id === 'inventaire')     chargerInventaire();
  if (id === 'factures')       chargerFactures();
 if (id === 'nouvelle-facture' && !factureActive) initialiserNouvelleFacture();
if (id === 'contenu-site')    chargerContenuSite();
}

// ─── STATS ACCUEIL ───
async function chargerStatsAccueil() {
  try {
   const resCol = await appelAPI('getCollectionsPublic');
    if (resCol && resCol.collections) {
      document.getElementById('admin-stat-collections').textContent = resCol.collections.length;
    }
    const resRec = await appelAPI('getRecettes');
    if (resRec && resRec.recettes) {
      const nb = resRec.recettes.filter(r => r.statut === 'public').length;
      document.getElementById('admin-stat-produits').textContent = nb + '+';
    }
  } catch(err) {}
}

// ─── BURGER MOBILE ───
function initBurgerAdmin() {
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.addEventListener('click', fermerSidebarMobile);
  const burger = document.getElementById('burger-admin');
  if (burger) burger.addEventListener('click', function(e) { e.stopPropagation(); });
  let dernierScroll = 0;
  window.addEventListener('scroll', () => {
    if (!burger || window.innerWidth > 900) return;
    const scrollActuel = window.scrollY;
    if (scrollActuel > dernierScroll && scrollActuel > 60) {
      burger.classList.add('cache-scroll');
    } else {
      burger.classList.remove('cache-scroll');
    }
    dernierScroll = scrollActuel;
  });
}

function toggleSidebarAdmin() {
 
  document.getElementById('sidebar-admin').classList.toggle('ouvert');
  document.getElementById('sidebar-overlay').classList.toggle('visible');
}

function fermerSidebarMobile() {
  const sidebar = document.getElementById('sidebar-admin');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('ouvert');
  if (overlay) overlay.classList.remove('visible');
}

// ─── MESSAGES ───
function afficherMsg(zone, texte, type = 'succes') {
  const el = document.getElementById('msg-' + zone);
  if (el) {
    el.innerHTML = `<div class="msg msg-${type}">${texte}</div>`;
    setTimeout(() => { el.innerHTML = ''; }, 4000);
  }
  let toast = document.getElementById('toast-global');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-global';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = texte;
  toast.className = `toast toast-${type}`;
  setTimeout(() => toast.classList.add('visible'), 10);
  setTimeout(() => toast.classList.remove('visible'), 3000);
}

// ─── COULEUR PAR NOM ───
function couleurTexteContraste(hex) {
  if (!hex || !hex.startsWith('#')) return 'carte-infos-clair';
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? 'carte-infos-fonce' : 'carte-infos-clair';
}

function stringToColor(str) {
  const palette = ['#5a8a3a','#4a7c9e','#9b6b9b','#c4773a','#3a8a7a','#8a5a3a','#6b7a3a','#9b3a5a','#3a5a8a'];
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}

/* ════════════════════════════════
   COLLECTIONS
════════════════════════════════ */
let donneesCollections = [];
 
async function chargerCollections() {
  const loading = document.getElementById('loading-collections');
  const contenu = document.getElementById('contenu-collections');
  const vide    = document.getElementById('vide-collections');
  loading.classList.remove('cache');
  contenu.innerHTML = '';
  vide.classList.add('cache');

  const res = await appelAPI('getCollections');
  loading.classList.add('cache');
  if (!res || !res.success) { afficherMsg('collections', 'Erreur lors du chargement.', 'erreur'); return; }
  donneesCollections = res.items || [];
  if (!donneesCollections.length) { vide.classList.remove('cache'); return; }

  const groupes = {};
  donneesCollections.forEach(item => {
    if (!groupes[item.collection]) {
      groupes[item.collection] = { slogan: item.slogan, couleur_hex: item.couleur_hex, lignes: [] };
    }
    if (item.ligne) groupes[item.collection].lignes.push(item);
  });

  let html = '<div class="collections-grille">';
  Object.entries(groupes).forEach(([col, data]) => {
    const couleurs = couleurCollection(col, data.couleur_hex);
    const lignesHtml = data.lignes.map(item =>
 `<span class="collection-carte-ligne-tag">${String(item.ligne || '').toUpperCase()}</span>`
    ).join('');
    html += `
      <div class="collection-carte" onclick="ouvrirFicheCollection('${col.replace(/'/g, "\\'")}')">
        <div class="collection-carte-bg" style="background:linear-gradient(145deg,${couleurs[0]},${couleurs[1]});"></div>
        <div class="collection-carte-overlay"></div>
   <div class="collection-carte-lignes-haut">${lignesHtml}</div>
        <div class="collection-carte-contenu">
          <span class="collection-carte-nom">${col.toUpperCase()}</span>
          <span class="collection-carte-slogan">${data.slogan || ''}</span>
        </div>
      </div>`;
  });
  html += '</div>';
  contenu.innerHTML = html;
}

function ouvrirFicheCollection(col) {
  const groupe = {};
  donneesCollections.forEach(item => {
    if (item.collection === col) {
      if (!groupe.info) {
        groupe.info = item;
      }
      if (item.ligne) {
        if (!groupe.lignes) groupe.lignes = [];
        groupe.lignes.push(item);
      }
    }
  });
  if (!groupe.info) return;

  const couleurs = couleurCollection(col, groupe.info.couleur_hex);
  const lignesHtml = (groupe.lignes || []).map(item => `
  
 <div class="fiche-ligne-item" onclick="ouvrirFicheLigne(${item.rowIndex})">
      <div class="fiche-ligne-info">
        <span class="fiche-ligne-nom">${item.ligne.toUpperCase()}</span>
        ${item.format ? `<span class="fiche-ligne-format">${item.format}</span>` : ''}
        ${item.description_ligne ? `<p class="fiche-ligne-desc">${item.description_ligne}</p>` : ''}
      </div>
    </div>`).join('');

  const fiche = document.getElementById('fiche-collection');
  document.getElementById('fiche-collection-titre').textContent = col.toUpperCase();
document.getElementById('fiche-collection-bandeau').style.background = '';
  document.getElementById('fiche-collection-slogan').textContent = groupe.info.slogan || '';
 document.getElementById('fiche-collection-desc').textContent = groupe.info.description_collection || '';
  const couleur = groupe.info.couleur_hex || '';
  const photo   = groupe.info.photo_url   || '';
  const rang    = groupe.info.rang || '';
  let ficheExtrasHtml = '';
  let wrapHtml = '';
  if (couleur) wrapHtml += `<div class="fiche-collection-couleur" style="background:${couleur}">${rang}</div>`;
  if (photo)   wrapHtml += `<div class="fiche-collection-photo"><img src="${photo}" alt="Photo collection"></div>`;
  if (wrapHtml) ficheExtrasHtml += `<div class="fiche-collection-extras-wrap">${wrapHtml}</div>`;
  const ficheExtras = document.getElementById('fiche-collection-extras');
  if (ficheExtras) ficheExtras.innerHTML = ficheExtrasHtml;
  document.getElementById('fiche-collection-lignes').innerHTML = lignesHtml || '<p class="vide-desc">Aucune ligne</p>';
document.getElementById('fiche-collection-modifier').onclick = () => {
    fermerFicheCollection();
    modifierCollection(groupe.info.rowIndex);
  };
document.getElementById('fiche-collection-ajouter-ligne').onclick = () => {
    fermerFicheCollection();
    ouvrirFormCollectionPour(col);
    basculerModeFormCollection();
    document.getElementById('fc-collection-ligne').value = col || '';
  };
 document.getElementById('btn-supprimer-collection').onclick = () => supprimerCollection(col, groupe);
  fiche.classList.add('visible');
  document.getElementById('contenu-collections').classList.add('cache');
  window.scrollTo(0, 0);
}

function fermerFicheCollection() {
  document.getElementById('fiche-collection').classList.remove('visible');
  document.getElementById('contenu-collections').classList.remove('cache');
}





function ouvrirFormCollectionPour(col) {
  ouvrirFormCollection();
  document.getElementById('fc-collection-ligne').value = col || '';
}

function ouvrirFormCollection() {
  fermerFicheCollection();
  document.getElementById('form-collections-titre').textContent = 'Nouvelle collection';
  document.getElementById('fc-rowIndex').value = '';
  document.getElementById('fc-mode').value = 'collection';
  document.getElementById('fc-bloc-collection').classList.remove('cache');
  document.getElementById('fc-bloc-ligne').classList.add('cache');
  document.getElementById('fc-toggle-mode').textContent = '+ Ajouter une ligne';
  ['fc-rang','fc-collection','fc-slogan','fc-desc-col','fc-couleur-hex','fc-photo-url',
   'fc-ligne','fc-format','fc-desc-ligne','fc-couleur-hex-ligne','fc-photo-url-ligne','fc-collection-ligne']
    .forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  ['fc-photo-preview','fc-photo-preview-ligne','fc-photo-preview-noel'].forEach(id => {
    const e = document.getElementById(id); if (e) e.innerHTML = '';
  });
  ['fc-couleur-apercu','fc-couleur-apercu-ligne'].forEach(id => {
    const e = document.getElementById(id); if (e) e.style.background = '';
  });
  ingredientsBase = [];
  rafraichirListeIngredientsBase();
  document.getElementById('contenu-collections').classList.add('cache');
 document.getElementById('contenu-collections').classList.add('cache');
  document.getElementById('form-collections').classList.add('visible');
  const btnSupprLigneNouv = document.getElementById('btn-supprimer-ligne');
  if (btnSupprLigneNouv) btnSupprLigneNouv.classList.add('cache');
  window.scrollTo(0, 0);
}
function confirmerAction(message, callback) {
  document.getElementById('modal-confirm-message').textContent = message;
  document.getElementById('modal-confirm-btn').onclick = () => { fermerModalConfirm(); callback(); };
  document.getElementById('modal-confirm').classList.add('ouvert');
}

function fermerModalConfirm() {
  document.getElementById('modal-confirm').classList.remove('ouvert');
}


function fermerFormCollection() {
  document.getElementById('contenu-collections').classList.remove('cache');
  document.getElementById('form-collections').classList.remove('visible');
}

async function ouvrirFicheLigne(rowIndex) {
  const item = donneesCollections.find(i => i.rowIndex === rowIndex);
  if (!item) return;
  document.getElementById('fiche-ligne-titre').textContent = item.ligne.toUpperCase();
  document.getElementById('fiche-ligne-format').textContent = item.format || '';
  document.getElementById('fiche-ligne-collection').textContent = item.collection || '';
  document.getElementById('fiche-ligne-format-detail').textContent = item.format || '—';
  document.getElementById('fiche-ligne-desc').textContent = item.description_ligne || '—';
  document.getElementById('fiche-ligne-modifier').onclick = () => {
    fermerFicheLigne();
    modifierLigneProduit(rowIndex);
  };
  document.getElementById('btn-supprimer-ligne-fiche').onclick = () => supprimerLigne(rowIndex, item.collection, item.ligne);
  const resBase = await appelAPI('getRecettesBase');
  const ings = (resBase && resBase.items ? resBase.items : [])
    .filter(i => i.collection === item.collection && i.ligne === item.ligne);
  const listeEl = document.getElementById('fiche-ligne-ingredients');
  if (ings.length === 0) {
    listeEl.innerHTML = '<span class="form-valeur">—</span>';
  } else {
    listeEl.innerHTML = ings.map(i => {
      const inci = (listesDropdown.fullData||[]).find(d => d.type===i.ingredient_type && d.ingredient===i.ingredient_nom)?.inci || '';
      return `<div class="fp-ing-row"><span>${i.ingredient_type}</span><span>${i.ingredient_nom}</span><span class="fp-ing-inci">${inci}</span><span>${i.quantite_g} g</span></div>`;
    }).join('');
  }
  document.getElementById('fiche-collection').classList.remove('visible');
  document.getElementById('fiche-ligne').classList.add('visible');
  document.getElementById('contenu-collections').classList.add('cache');
  window.scrollTo(0, 0);
}

function fermerFicheLigne() {
  document.getElementById('fiche-ligne').classList.remove('visible');
  document.getElementById('fiche-collection').classList.add('visible');
}

async function modifierLigneProduit(rowIndex) {
  const item = donneesCollections.find(i => i.rowIndex === rowIndex);
 if (!item) return;
  document.getElementById('fiche-collection').classList.remove('visible');
  document.getElementById('contenu-collections').classList.add('cache');
  document.getElementById('form-collections-titre').textContentt = 'Modifier la ligne — ' + (item.collection || '');
  document.getElementById('fc-rowIndex').value = rowIndex;
  document.getElementById('fc-mode').value = 'ligne';
  document.getElementById('fc-bloc-collection').classList.add('cache');
  document.getElementById('fc-bloc-ligne').classList.remove('cache');
  document.getElementById('fc-toggle-mode').textContent = '← Retour collection';
  document.getElementById('fc-collection-ligne').value = item.collection || '';
  document.getElementById('fc-ligne').value = item.ligne || '';
  document.getElementById('fc-format').value = item.format || '';
  document.getElementById('fc-desc-ligne').value = item.description_ligne || '';
  document.getElementById('fc-couleur-hex-ligne').value = item.couleur_hex || '';
  document.getElementById('fc-photo-url-ligne').value = item.photo_url || '';
 apercuCouleurCollection(document.getElementById('fc-couleur-hex-ligne'));
  const resBase = await appelAPI('getRecettesBase');
  ingredientsBase = (resBase && resBase.items ? resBase.items : [])
    .filter(i => i.collection === item.collection && i.ligne === item.ligne)
    .map(i => ({ type: i.ingredient_type, nom: i.ingredient_nom, quantite: i.quantite_g }));
  rafraichirListeIngredientsBase();
   document.getElementById('contenu-collections').classList.add('cache');
  document.getElementById('form-collections').classList.add('visible');
  const btnSupprLigne = document.getElementById('btn-supprimer-ligne');
  if (btnSupprLigne) {
    btnSupprLigne.classList.remove('cache');
    btnSupprLigne.onclick = () => supprimerLigne(rowIndex, item.collection, item.ligne);
  }
  window.scrollTo(0, 0);
}

async function modifierCollection(rowIndex) {
  const item = donneesCollections.find(i => i.rowIndex === rowIndex);
  if (!item) return;
  document.getElementById('form-collections-titre').textContent = 'Modifier l\'entrée';
  document.getElementById('fc-rowIndex').value          = rowIndex;
  document.getElementById('fc-rang').value              = item.rang || '';
  document.getElementById('fc-collection').value        = item.collection || '';
  document.getElementById('fc-slogan').value            = item.slogan || '';
 const descCol = document.getElementById('fc-desc-col');
descCol.value = item.description_collection || '';
ajusterHauteurTextarea(descCol);
  document.getElementById('fc-ligne').value             = item.ligne || '';
  document.getElementById('fc-format').value            = item.format || '';
  document.getElementById('fc-desc-ligne').value        = item.description_ligne || '';
document.getElementById('fc-couleur-hex').value       = item.couleur_hex || 'var(--gris)';
  apercuCouleurCollection(document.getElementById('fc-couleur-hex'));
  document.getElementById('fc-photo-url').value         = item.photo_url || '';
  const preview = document.getElementById('fc-photo-preview');
  if (preview) preview.innerHTML = item.photo_url ? `<img src="${item.photo_url}" class="photo-preview">` : '';
  document.getElementById('fc-photo-url-noel').value    = item.photo_url_noel || '';
  const previewNoel = document.getElementById('fc-photo-preview-noel');
  if (previewNoel) previewNoel.innerHTML = item.photo_url_noel ? `<img src="${item.photo_url_noel}" class="photo-preview">` : '';
  const res = await appelAPI('getRecettesBase');
  ingredientsBase = (res && res.items ? res.items : [])
    .filter(i => i.collection === item.collection && i.ligne === item.ligne)
    .map(i => ({ type: i.ingredient_type, nom: i.ingredient_nom, quantite: i.quantite_g }));
rafraichirListeIngredientsBase();
  document.getElementById('contenu-collections').classList.add('cache');
  document.getElementById('form-collections').classList.add('visible');
  window.scrollTo(0, 0);
}


async function sauvegarderCollection() {
  const btnSauvegarder = document.querySelector('#form-collections .btn-primary');
  if (btnSauvegarder) { btnSauvegarder.disabled = true; btnSauvegarder.innerHTML = '<span class="spinner"></span> Sauvegarde…'; }
  const rowIndex = document.getElementById('fc-rowIndex').value;
  const mode     = document.getElementById('fc-mode').value;

  if (mode === 'ligne') {
    const col   = document.getElementById('fc-collection-ligne').value;
    const ligne = document.getElementById('fc-ligne').value.toUpperCase();
    if (!col || !ligne) {
      if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
      afficherMsg('collections', 'Le nom de la ligne est requis.', 'erreur');
      return;
    }
    await appelAPIPost('saveRecetteBase', {
      collection: col,
      ligne,
      ingredients: ingredientsBase.map(i => ({ type: i.type, nom: i.nom, quantite_g: i.quantite }))
    });
 const infoCol = donneesCollections.find(i => i.collection === col);
    const d = {
      collection:        col,
      ligne,
      format:            document.getElementById('fc-format').value,
      description_ligne: document.getElementById('fc-desc-ligne').value,
      couleur_hex:       document.getElementById('fc-couleur-hex-ligne').value,
      photo_url:         document.getElementById('fc-photo-url-ligne').value,
      rang:              infoCol ? infoCol.rang : '',
      slogan:            infoCol ? infoCol.slogan : '',
      description_collection: infoCol ? infoCol.description_collection : ''
    };
  const res = rowIndex
      ? await appelAPIPost('updateCollectionItem', { ...d, rowIndex: parseInt(rowIndex) })
      : await appelAPIPost('addCollectionItem', d);
    if (res && res.success) {
      if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
      fermerFormCollection();
      afficherMsg('collections', rowIndex ? 'Ligne mise à jour.' : 'Ligne ajoutée.');
      await chargerCollections();
    } else {
      afficherMsg('collections', 'Erreur lors de la sauvegarde.', 'erreur');
      if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
    }
    return;
  }

  const d = {
    rang:                   document.getElementById('fc-rang').value,
    collection:             document.getElementById('fc-collection').value.toUpperCase(),
    slogan:                 document.getElementById('fc-slogan').value,
    description_collection: document.getElementById('fc-desc-col').value,
    couleur_hex:            document.getElementById('fc-couleur-hex').value,
    photo_url:              document.getElementById('fc-photo-url').value,
    photo_url_noel:         document.getElementById('fc-photo-url-noel').value,
  };
  if (!d.collection) {
    if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
    afficherMsg('collections', 'Le nom de la collection est requis.', 'erreur');
    return;
  }
  const res = rowIndex
    ? await appelAPIPost('updateCollectionItem', { ...d, rowIndex: parseInt(rowIndex) })
    : await appelAPIPost('addCollectionItem', d);
  if (res && res.success) {
    if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
    fermerFormCollection();
    afficherMsg('collections', rowIndex ? 'Entrée mise à jour.' : 'Entrée ajoutée.');
    chargerCollections();
  } else {
    afficherMsg('collections', 'Erreur lors de la sauvegarde.', 'erreur');
    if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
  }
}
async function supprimerCollection(col, groupe) {
  if (!donneesRecettes.length) {
    const res = await appelAPI('getRecettes');
    donneesRecettes = (res && res.recettes) ? res.recettes : [];
  }
  const recettesLiees = donneesRecettes.filter(r => r.collection === col);
  if (recettesLiees.length > 0) {
    afficherMsg('collections', `Impossible — ${recettesLiees.length} recette(s) référencent cette collection. Modifiez-les d'abord.`, 'erreur');
    return;
  }
  const lignes = groupe.lignes ? groupe.lignes.length : 0;
  const msg = lignes > 0
    ? `Cette collection contient ${lignes} ligne(s). Supprimer quand même ?`
    : 'Supprimer cette collection ?';
  confirmerAction(msg, async () => {
  const rowIndexes = donneesCollections.filter(i => i.collection === col).map(i => i.rowIndex).sort((a, b) => b - a);
    for (const rowIndex of rowIndexes) {
      const res = await appelAPIPost('deleteCollectionItem', { rowIndex });
      if (!res || !res.success) {
        afficherMsg('collections', 'Erreur lors de la suppression.', 'erreur');
        return;
      }
    }
    fermerFicheCollection();
    afficherMsg('collections', 'Collection supprimée.');
    await chargerCollections();
  });
}

async function supprimerLigne(rowIndex, collection, ligne) {
  if (!donneesRecettes.length) {
    const res = await appelAPI('getRecettes');
    donneesRecettes = (res && res.recettes) ? res.recettes : [];
  }
  const recettesLiees = donneesRecettes.filter(r => r.collection === collection && r.ligne === ligne);
  if (recettesLiees.length > 0) {
    afficherMsg('collections', `Impossible — ${recettesLiees.length} recette(s) référencent cette ligne. Modifiez-les d'abord.`, 'erreur');
    return;
  }
  confirmerAction('Supprimer cette ligne ?', async () => {
    const res = await appelAPIPost('deleteCollectionItem', { rowIndex });
    if (res && res.success) {
      fermerFicheLigne();
      fermerFicheCollection();
      afficherMsg('collections', 'Ligne supprimée.');
      await chargerCollections();
    } else {
      afficherMsg('collections', 'Erreur.', 'erreur');
    }
  });
}

/* ════════════════════════════════
   RECETTES
════════════════════════════════ */
let donneesRecettes = [];
let recetteActive = null;
let collectionsDisponibles = {};

async function chargerRecettes() {
  const loading = document.getElementById('loading-recettes');
  const grille  = document.getElementById('grille-recettes');
  const vide    = document.getElementById('vide-recettes');
  loading.classList.remove('cache');
  grille.classList.add('cache');
  vide.classList.add('cache');
  document.getElementById('filtre-recette-collection').value = '';
  document.getElementById('filtre-recette-ligne').innerHTML  = '<option value="">Toutes les lignes</option>';
  document.getElementById('filtre-recette-ligne').disabled   = true;

   const res = await appelAPI('getRecettes');

 if (!res || !res.success) { loading.classList.add('cache'); afficherMsg('recettes', 'Erreur.', 'erreur'); return; }
  donneesRecettes = (res.recettes || []).sort((a, b) =>
    (parseInt(a.rang) || 99) - (parseInt(b.rang) || 99) ||
    (a.ligne || '').localeCompare(b.ligne || '') ||
    (a.nom || '').localeCompare(b.nom || '')
  );
  await chargerCollectionsPourSelecteur();

  if (!donneesRecettes.length) { loading.classList.add('cache'); vide.classList.remove('cache'); return; }

grille.innerHTML = '';
  grille.classList.remove('cache');
  loading.classList.add('cache');

  const parCollection = {};
  const ordreCollections = [];
  donneesRecettes.forEach(rec => {
    const col = rec.collection || '—';
    if (!parCollection[col]) { parCollection[col] = {}; ordreCollections.push(col); }
    const ligne = rec.ligne || '';
    if (!parCollection[col][ligne]) parCollection[col][ligne] = [];
    parCollection[col][ligne].push(rec);
  });

  ordreCollections.forEach(col => {
    const secCol = document.createElement('div');
    secCol.className = 'recette-section-collection';
    secCol.dataset.collection = col;
    secCol.innerHTML = `<div class="recette-collection-titre">${col.toUpperCase()}</div>`;

    const lignes = parCollection[col];
    Object.keys(lignes).forEach(ligne => {
      const secLigne = document.createElement('div');
      secLigne.className = 'recette-section-ligne';
      secLigne.dataset.ligne = ligne;
      if (ligne) {
        secLigne.innerHTML = `<div class="recette-ligne-titre">${ligne.toUpperCase()}</div>`;
      }
      const grilleInner = document.createElement('div');
      grilleInner.className = 'recette-cartes-grille';

      lignes[ligne].forEach(rec => {
        const couleur = rec.couleur_hex || 'var(--gris)';
        const div = document.createElement('div');
        div.className = 'recette-carte';
        div.onclick = () => ouvrirFicheRecette(rec.recette_id);
        div.style.setProperty('--col-hex', couleur);
        div.innerHTML = `
          <div class="recette-visuel">
            <div class="recette-couleur">
              ${rec.image_url
                ? `<img src="${rec.image_url}" alt="${rec.nom}" onerror="this.style.display='none'">`
                : `<div class="recette-photo-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    Photo à venir
                  </div>`}
              <div class="recette-couleur-overlay"></div>
              <div class="recette-dot"></div>
            </div>
          </div>
		  <div class="recette-infos ${couleurTexteContraste(couleur)}">
          

		<span class="recette-badge">${rec.collection || '—'}</span>
            <div class="recette-nom">${rec.nom || '—'}</div>
            <div class="recette-ligne">${rec.ligne || ''}</div>
            <div class="recette-bas">
              <span class="recette-prix">${rec.prix_vente ? formaterPrix(rec.prix_vente) : '—\u00a0$'}</span>
              <span class="recette-statut-badge recette-statut-${rec.statut || 'test'} recette-statut-droite">${rec.statut === 'public' ? 'Public' : 'Test'}</span>
            </div>
			
			
          </div>`;
        grilleInner.appendChild(div);
      });

      secLigne.appendChild(grilleInner);
      secCol.appendChild(secLigne);
    });

    grille.appendChild(secCol);
  });
  peuplerFiltresRecettes();
}

function peuplerFiltresRecettes() {
  const sel = document.getElementById('filtre-recette-collection');
  const valActuelle = sel.value;
  sel.innerHTML = '<option value="">Toutes les collections</option>';
const collections = [...new Set(donneesRecettes.map(r => r.collection).filter(Boolean))]
    .sort((a, b) => {
      const rangA = (donneesCollections.find(i => i.collection === a) || {}).rang || 99;
      const rangB = (donneesCollections.find(i => i.collection === b) || {}).rang || 99;
      return rangA - rangB || a.localeCompare(b);
    });
  collections.forEach(col => {
    const opt = document.createElement('option');
    opt.value = col; opt.textContent = col;
    sel.appendChild(opt);
  });
  sel.value = valActuelle;
}

function onFiltreCollection() {
  const col = document.getElementById('filtre-recette-collection').value;
  const selLigne = document.getElementById('filtre-recette-ligne');
  selLigne.innerHTML = '<option value="">Toutes les lignes</option>';
  if (col) {
    const lignes = [...new Set(donneesRecettes.filter(r => r.collection === col).map(r => r.ligne).filter(Boolean))].sort();
    lignes.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l; opt.textContent = l;
      selLigne.appendChild(opt);
    });
    selLigne.disabled = false;
  } else {
    selLigne.disabled = true;
  }
  filtrerRecettes();
}

function filtrerRecettes() {
  const col    = document.getElementById('filtre-recette-collection').value;
  const ligne  = document.getElementById('filtre-recette-ligne').value;
  const statut = document.getElementById('filtre-recette-statut').value;
  const nom    = (document.getElementById('filtre-recette-nom').value || '').toLowerCase().trim();
  const cartes = document.querySelectorAll('#grille-recettes .recette-carte');
  const vide   = document.getElementById('vide-recettes');
  let visible  = 0;
  cartes.forEach(carte => {
    const rec = donneesRecettes.find(r => r.nom === carte.querySelector('.recette-nom').textContent);
    if (!rec) return;
    const ok = (!col || rec.collection === col)
            && (!ligne || rec.ligne === ligne)
            && (!statut || (rec.statut || 'test') === statut)
            && (!nom || rec.nom.toLowerCase().includes(nom));
    carte.classList.toggle('cache', !ok);
    if (ok) visible++;
  });
  vide.classList.toggle('cache', visible !== 0);

document.querySelectorAll('#grille-recettes .recette-section-ligne').forEach(sec => {
    const secCol = sec.closest('.recette-section-collection');
    const okCol = !col || secCol?.dataset.collection === col;
    const okLigne = !ligne || sec.dataset.ligne === ligne;
    const aDesCartesVisibles = [...sec.querySelectorAll('.recette-carte')].some(c => !c.classList.contains('cache'));
    sec.classList.toggle('cache', !(okCol && okLigne) || !aDesCartesVisibles);
  });

  document.querySelectorAll('#grille-recettes .recette-section-collection').forEach(sec => {
    const okCol = !col || sec.dataset.collection === col;
    const aDesLignesVisibles = [...sec.querySelectorAll('.recette-section-ligne')].some(l => !l.classList.contains('cache'));
    sec.classList.toggle('cache', !okCol || !aDesLignesVisibles);
  });
}

function reinitialiserFiltresRecettes() {
  document.getElementById('filtre-recette-collection').value = '';
  document.getElementById('filtre-recette-ligne').value = '';
  document.getElementById('filtre-recette-statut').value = '';
  document.getElementById('filtre-recette-nom').value = '';
  document.getElementById('filtre-recette-ligne').disabled = true;
  filtrerRecettes();
}



   
async function chargerCollectionsPourSelecteur() {
  const res = await appelAPI('getCollections');
  if (!res || !res.success) return;
  const sel = document.getElementById('fr-collection');
  sel.innerHTML = '<option value="">— Choisir —</option>';
  collectionsDisponibles = {};
  (res.items || []).forEach(item => {
    if (!collectionsDisponibles[item.collection]) collectionsDisponibles[item.collection] = [];
    if (item.ligne && !collectionsDisponibles[item.collection].includes(item.ligne))
      collectionsDisponibles[item.collection].push(item.ligne);
  });
 const colsParRang = Object.keys(collectionsDisponibles).sort((a, b) => {
    const rangA = (donneesCollections.find(i => i.collection === a) || {}).rang || 99;
    const rangB = (donneesCollections.find(i => i.collection === b) || {}).rang || 99;
    return rangA - rangB;
  });
  colsParRang.forEach(col => {
    const o = document.createElement('option');
    o.value = col; o.textContent = col; sel.appendChild(o);
  });
  const selSec = document.getElementById('fr-collections-secondaires');
  if (selSec) {
    selSec.innerHTML = '';
    colsParRang.forEach(col => {
		
		
		
      const label = document.createElement('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox'; cb.value = col; cb.id = 'sec-' + col;
      label.appendChild(cb);
      label.appendChild(document.createTextNode(col));
      selSec.appendChild(label);
    });
  }
}

async function mettreAJourLignes() {
  const col = document.getElementById('fr-collection').value;
  const sel = document.getElementById('fr-ligne');
  sel.innerHTML = '';
  const lignes = collectionsDisponibles[col] || [];
  if (!lignes.length) { sel.innerHTML = '<option value="">— Aucune ligne —</option>'; return; }
  lignes.forEach(l => {
    const o = document.createElement('option'); o.value = l; o.textContent = l; sel.appendChild(o);
  });
  await chargerIngredientsBaseRecette();
}

async function chargerIngredientsBaseRecette() {
  const col   = document.getElementById('fr-collection').value;
  const ligne = document.getElementById('fr-ligne').value;
  if (!col || !ligne) return;
  const res = await appelAPI('getRecettesBase');
  if (!res || !res.items) return;
  ingredientsBase = res.items
    .filter(i => i.collection === col && i.ligne === ligne)
    .map(i => ({ type: i.ingredient_type, nom: i.ingredient_nom, quantite: i.quantite_g }));
  if (!document.getElementById('fr-id').value) {
    ingredientsRecette = [...ingredientsBase];
    rafraichirListeIngredientsRecette();
  }
  rafraichirListeIngredientsBase();
}



async function ouvrirFicheRecette(id) {
  const rec = donneesRecettes.find(r => r.recette_id === id);
  if (!rec) return;
  recetteActive = rec;
  const resFormats = await appelAPIPost('getRecettesFormats', { recette_id: id });
  const formats = (resFormats && resFormats.formats) ? resFormats.formats : [];
  const formatsHtml = formats.length
    ? formats.map(f => `<div class="fiche-ingredient"><span class="fiche-ing-nom">${f.poids} ${f.unite}</span><span class="fiche-ing-qte">${formaterPrix(f.prix_vente)}</span>${f.desc_emballage ? `<span class="fiche-label">${f.desc_emballage}</span>` : ''}</div>`).join('')
    : '<div class="fiche-vide">Aucun format</div>';
  document.getElementById('fiche-recette-titre').textContent = rec.nom || '—';
  const ings = rec.ingredients && rec.ingredients.length
    ? rec.ingredients.map(i => `<div class="fiche-ingredient"><span class="fiche-ing-nom">${i.nom}</span><span class="fiche-ing-qte">${i.quantite_g} g</span></div>`).join('')
    : '<div class="fiche-vide">Aucun ingrédient</div>';
  document.getElementById('fiche-recette-contenu').innerHTML = `
  <div class="fiche-visuel">
      ${rec.image_url ? `<img src="${rec.image_url}" class="fiche-visuel-photo">` : ''}
      ${rec.image_url_noel ? `<img src="${rec.image_url_noel}" class="fiche-visuel-photo">` : ''}
      <div class="fiche-visuel-hex" style="background:${rec.couleur_hex || 'var(--beige)'}"></div>
    </div>
    <div class="fiche-grille">
      <div class="fiche-champ"><span class="fiche-label">Collection</span><span class="fiche-valeur">${rec.collection || '—'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Collections secondaires</span><span class="fiche-valeur">${Array.isArray(rec.collections_secondaires) && rec.collections_secondaires.length ? rec.collections_secondaires.join(', ') : '—'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Ligne</span><span class="fiche-valeur">${rec.ligne || '—'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Ligne</span><span class="fiche-valeur">${rec.ligne || '—'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Format</span><span class="fiche-valeur">${rec.format || '—'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Statut</span><span class="fiche-valeur">${rec.statut || 'test'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Prix</span><span class="fiche-valeur">${rec.prix_vente ? formaterPrix(rec.prix_vente) : '— $'}</span></div>
      <div class="fiche-champ"><span class="fiche-label">Cure</span><span class="fiche-valeur">${rec.cure || '—'} jours</span></div>
    </div>
    <div class="fiche-section-titre">Description</div>
    <div class="fiche-texte">${rec.description || '—'}</div>
    <div class="fiche-section-titre">Description emballage</div>
    <div class="fiche-texte">${rec.desc_emballage || '—'}</div>
    <div class="fiche-section-titre">Instructions</div>
    <div class="fiche-texte">${rec.instructions || '—'}</div>
    <div class="fiche-section-titre">Notes</div>
    <div class="fiche-texte">${rec.notes || '—'}</div>
    <div class="fiche-section-titre">Formats disponibles</div>
    <div class="fiche-ingredients">${formatsHtml}</div>
    <div class="fiche-section-titre">Liste INCI</div>
    ${(() => {
      const manquants = (rec.ingredients || []).filter(i => i.type !== 'Fragrances' && !(listesDropdown.fullData||[]).find(d => d.type===i.type && d.ingredient===i.nom && d.inci));
      const avertissement = manquants.length > 0
        ? `<div class="msg-erreur">INCI manquants : ${manquants.map(i=>i.nom).join(', ')}</div>`
        : '';
      const inci = genererInci(rec.ingredients);
      const btnDisabled = manquants.length > 0 ? 'disabled' : '';
      return `${avertissement}<div class="fiche-texte" id="fiche-inci-texte">${inci}</div><button class="btn btn-secondary" ${btnDisabled} onclick="navigator.clipboard.writeText(document.getElementById('fiche-inci-texte').textContent)">Copier INCI</button>`;
    })()}
  `;
fermerFormRecette();
  document.getElementById('fiche-recette').classList.add('visible');
  document.querySelector('#section-recettes .filtres-bar').classList.add('cache');
  document.getElementById('grille-recettes').classList.add('cache');
  document.querySelector('.admin-contenu').scrollTop = 0;
}
function fermerFicheRecette() {
  document.getElementById('fiche-recette').classList.remove('visible');
  document.querySelector('#section-recettes .filtres-bar').classList.remove('cache');
  document.getElementById('grille-recettes').classList.remove('cache');
  document.getElementById('filtre-recette-nom').value = '';
  filtrerRecettes();
  recetteActive = null;
}

async function basculerModeEditionRecette() {
  if (!recetteActive) return;
  const id = recetteActive.recette_id;
  const rec = recetteActive;
  document.getElementById('fiche-recette').classList.remove('visible');
  await modifierRecette(id);
}

function supprimerRecetteActive() {
  if (!recetteActive) return;
  supprimerRecette(recetteActive.recette_id);
}


function ouvrirFormRecette() {
  formatsRecette = [];
  document.getElementById('form-recettes-titre').textContent = 'Nouvelle recette';
  document.getElementById('fr-id').value = '';
 ['fr-nom','fr-couleur','fr-format','fr-unites','fr-cure','fr-prix','fr-description','fr-instructions','fr-notes']
    .forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  document.getElementById('fr-statut').value = 'test';
  document.getElementById('fr-collection').value = '';
  document.getElementById('fr-ligne').innerHTML = '<option value="">— Choisir collection —</option>';
  document.getElementById('fr-couleur-visible').value = '';
  document.getElementById('fr-image-url').value = '';
  document.getElementById('fr-image-url-noel').value = '';
  const prevRecette = document.getElementById('fr-image-preview');
  if (prevRecette) { prevRecette.src = ''; prevRecette.classList.add('cache'); }
  const prevNoel = document.getElementById('fr-image-preview-noel');
  if (prevNoel) prevNoel.innerHTML = '';
  const apercuRecette = document.getElementById('fr-couleur-apercu');
  if (apercuRecette) apercuRecette.style.background = '';
 document.querySelector('#section-recettes .filtres-bar').classList.add('cache');
  document.getElementById('grille-recettes').classList.add('cache');
 document.getElementById('form-recettes').classList.add('visible');
  window.scrollTo(0, 0);
}

function fermerFormRecette() {
  document.getElementById('form-recettes').classList.remove('visible');
document.querySelector('#section-recettes .filtres-bar').classList.remove('cache');
  document.getElementById('grille-recettes').classList.remove('cache');
}

async function modifierRecette(id) {
  const rec = donneesRecettes.find(r => r.recette_id === id);
  if (!rec) return;
  document.getElementById('form-recettes-titre').textContent = 'Modifier la recette';
  document.getElementById('fr-id').value           = rec.recette_id;
  document.getElementById('fr-nom').value          = rec.nom || '';
  document.getElementById('fr-couleur').value      = rec.couleur_hex || '';
  document.getElementById('fr-couleur-visible').value = rec.couleur_hex || '';
  const apercu = document.getElementById('fr-couleur-apercu');
  if (apercu) apercuCouleurRecette(document.getElementById('fr-couleur-visible'));
  document.getElementById('fr-format').value       = rec.format || '';
  document.getElementById('fr-unites').value       = rec.nb_unites || '';
  document.getElementById('fr-cure').value         = rec.cure || '';
  document.getElementById('fr-prix').value         = rec.prix_vente || '';
  document.getElementById('fr-description').value  = rec.description || '';
   document.getElementById('fr-desc-emballage').value = rec.desc_emballage || '';
  document.getElementById('fr-instructions').value = rec.instructions || '';
  document.getElementById('fr-notes').value        = rec.notes || '';
  document.getElementById('fr-statut').value       = rec.statut || 'test';
document.getElementById('fr-collection').value   = rec.collection || '';
  mettreAJourLignes();
  document.getElementById('fr-ligne').value        = rec.ligne || '';
  document.getElementById('fr-image-url').value = rec.image_url || '';
  const preview = document.getElementById('fr-image-preview');
  if (preview) preview.innerHTML = rec.image_url ? `<img src="${rec.image_url}" class="photo-preview">` : '';
  document.getElementById('fr-image-url-noel').value = rec.image_url_noel || '';
  const previewNoel = document.getElementById('fr-image-preview-noel');
  if (previewNoel) previewNoel.innerHTML = rec.image_url_noel ? `<img src="${rec.image_url_noel}" class="photo-preview">` : '';
  const selSec = document.getElementById('fr-collections-secondaires');
  if (selSec) {
    Array.from(selSec.querySelectorAll('input[type="checkbox"]')).forEach(cb => {
      cb.checked = false;
    });
    Array.from(selSec.querySelectorAll('input[type="checkbox"]')).forEach(cb => {
      cb.checked = Array.isArray(rec.collections_secondaires) && rec.collections_secondaires.map(s => s.trim().toUpperCase()).includes(cb.value.trim().toUpperCase());
    });
  }
ingredientsRecette = (rec.ingredients || []).map(i => ({ type: i.type, nom: i.nom, quantite: i.quantite_g }));
  const resFormats = await appelAPIPost('getRecettesFormats', { recette_id: rec.recette_id });
  formatsRecette = (resFormats && resFormats.formats) ? resFormats.formats.map(f => ({ poids: f.poids, unite: f.unite, prix: f.prix_vente, desc: f.desc_emballage })) : [];
  document.querySelector('#section-recettes .filtres-bar').classList.add('cache');
  document.getElementById('grille-recettes').classList.add('cache');
  document.getElementById('form-recettes').classList.add('visible');
  rafraichirListeIngredientsRecette();
  rafraichirListeFormatsRecette();
  window.scrollTo(0, 0);
}
async function sauvegarderRecette() {
  const btnSauvegarder = document.querySelector('#form-recettes .btn-primary');
  if (btnSauvegarder) { btnSauvegarder.disabled = true; btnSauvegarder.innerHTML = '<span class="spinner"></span> Sauvegarde…'; }
  const id = document.getElementById('fr-id').value;
  const d = {
    recette_id:   id || ('REC-' + Date.now()),
    nom:          document.getElementById('fr-nom').value.toUpperCase(),
    couleur_hex:  document.getElementById('fr-couleur').value,
    collection:   document.getElementById('fr-collection').value,
    ligne:        document.getElementById('fr-ligne').value,
    format:       document.getElementById('fr-format').value,
    nb_unites:    parseInt(document.getElementById('fr-unites').value) || 1,
    cure:         parseInt(document.getElementById('fr-cure').value) || 0,
    prix_vente:   parseFloat(document.getElementById('fr-prix').value) || 0,
    description:  document.getElementById('fr-description').value,
    desc_emballage: document.getElementById('fr-desc-emballage').value,
    instructions: document.getElementById('fr-instructions').value,
    notes:        document.getElementById('fr-notes').value,
    statut:       document.getElementById('fr-statut').value || 'test',
    image_url:         document.getElementById('fr-image-url').value,
    image_url_noel:    document.getElementById('fr-image-url-noel').value,
    collections_secondaires: Array.from(document.getElementById('fr-collections-secondaires')?.querySelectorAll('input[type="checkbox"]:checked') || []).map(cb => cb.value),
     ingredients:  ingredientsRecette.map(i => ({ type: i.type, nom: i.nom, quantite_g: i.quantite }))
  };
  if (!d.nom) { afficherMsg('recettes', 'Le nom est requis.', 'erreur'); return; }
  const res = await appelAPIPost('saveRecette', d);
if (res && res.success) {
    for (const f of formatsRecette) {
      await appelAPIPost('saveRecetteFormat', { recette_id: d.recette_id, poids: f.poids, unite: f.unite, prix_vente: f.prix, desc_emballage: f.desc || '' });
    }
    if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
   fermerFormRecette();
    afficherMsg('recettes', id ? 'Recette mise à jour.' : 'Recette créée.');
    await chargerRecettes();
  } else {
    afficherMsg('recettes', 'Erreur.', 'erreur');
    if (btnSauvegarder) { btnSauvegarder.disabled = false; btnSauvegarder.innerHTML = 'Enregistrer'; }
  }
}

// ─── CLOUDINARY ───
let _mediaLibrary = null;
let _mediaLibraryChampId = null;
let _mediaLibraryPreviewId = null;

function ajusterHauteurTextarea(el) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function ouvrirMediaLibrary(champId, previewId) {
  if (typeof cloudinary === 'undefined') {
    afficherMsg('recettes', 'La librairie photo n\'est pas disponible. Rechargez la page.', 'erreur');
    return;
  }
  _mediaLibraryChampId = champId;
  _mediaLibraryPreviewId = previewId;
  _mediaLibrary = cloudinary.createMediaLibrary(
    { cloud_name: 'dfasrauyy', api_key: '' },
    {
      insertHandler: function(data) {
        if (data && data.assets && data.assets.length > 0) {
          const url = data.assets[0].secure_url;
          document.getElementById(_mediaLibraryChampId).value = url;
          const preview = document.getElementById(_mediaLibraryPreviewId);
          if (preview) preview.innerHTML = `<img src="${url}" class="photo-preview">`;
        }
      }
    }
  );
_mediaLibrary.show();
  setTimeout(function nettoyerOverlayCloudinary() {
    const overlays = document.querySelectorAll('body > div[style*="z-index: 99999"]');
    overlays.forEach(el => {
      if (el.style.visibility === 'hidden' || el.style.display === 'none') el.remove();
    });
    if (document.querySelector('body > div[style*="z-index: 99999"]')) {
      setTimeout(nettoyerOverlayCloudinary, 1000);
    }
  }, 2000);
}

function fermerMediaLibrary() {
  document.getElementById('modal-cloudinary').classList.add('cache');
}

function ouvrirCloudinary()           { ouvrirMediaLibrary('fr-image-url',     'fr-image-preview');       }
function ouvrirCloudinaryCollection()      { ouvrirMediaLibrary('fc-photo-url',      'fc-photo-preview');      }
function ouvrirCloudinaryCollectionNoel()  { ouvrirMediaLibrary('fc-photo-url-noel', 'fc-photo-preview-noel'); }
function ouvrirCloudinaryLigne()      { ouvrirMediaLibrary('fc-photo-url-ligne','fc-photo-preview-ligne'); }

function basculerModeFormCollection() {
  const mode    = document.getElementById('fc-mode');
  const blocCol = document.getElementById('fc-bloc-collection');
  const blocLig = document.getElementById('fc-bloc-ligne');
  const titre   = document.getElementById('form-collections-titre');
  const toggle  = document.getElementById('fc-toggle-mode');
  const col     = document.getElementById('fc-collection').value;

  if (mode.value === 'collection') {
    mode.value = 'ligne';
    blocCol.classList.add('cache');
    blocLig.classList.remove('cache');
    titre.textContent = 'Nouvelle ligne — ' + (col || '');
    toggle.textContent = '← Retour collection';
    document.getElementById('fc-collection-ligne').value = col;
  } else {
    mode.value = 'collection';
    blocCol.classList.remove('cache');
    blocLig.classList.add('cache');
    titre.textContent = document.getElementById('fc-rowIndex').value ? 'Modifier la collection' : 'Nouvelle collection';
    toggle.textContent = '+ Ajouter une ligne';
  }
}






function apercuCouleurCollection(input) {
  const val = input.value.trim();
  const apercuId = input.id === 'fc-couleur-hex' ? 'fc-couleur-apercu' : 'fc-couleur-apercu-ligne';
  const apercu = document.getElementById(apercuId);
  if (!apercu) return;
  apercu.style.background = /^#[0-9a-fA-F]{6}$/.test(val) ? val : 'var(--beige)';
}
function apercuCouleurRecette(input) {
  const apercu = document.getElementById('fr-couleur-apercu');
  if (apercu) apercu.style.background = /^#[0-9a-fA-F]{6}$/.test(input.value.trim()) ? input.value.trim() : 'var(--beige)';
  document.getElementById('fr-couleur').value = input.value;
}

// ─── INGRÉDIENTS RECETTE ───
let ingredientsRecette = [];

function ajouterIngredientRecette(type='', nom='', quantite=0) {
  ingredientsRecette.push({ type, nom, quantite });
  rafraichirListeIngredientsRecette();
}

function supprimerIngredientRecette(index) {
  ingredientsRecette.splice(index, 1);
  rafraichirListeIngredientsRecette();
}

function rafraichirListeIngredientsRecette() {
  const liste = document.getElementById('liste-ingredients-recette');
  if (!liste) return;
  if (ingredientsRecette.length === 0) { liste.innerHTML = ''; return; }
  liste.innerHTML = ingredientsRecette.map((ing, i) => `
    <div class="ingredient-rangee">
      <select class="form-ctrl ing-type" onchange="ingredientsRecette[${i}].type=this.value; ingredientsRecette[${i}].nom=''; rafraichirListeIngredientsRecette()">
        <option value="">— Type —</option>
        ${(listesDropdown.types || []).map(t => `<option value="${t}" ${ing.type===t?'selected':''}>${t}</option>`).join('')}
      </select>
      <select class="form-ctrl ing-nom" onchange="if(this.value==='__nouveau__'){ajouterIngredientInci('${ing.type}',${i})}else{ingredientsRecette[${i}].nom=this.value; rafraichirListeIngredientsRecette()}">
        <option value="">— Ingrédient —</option>
        ${(listesDropdown.fullData || []).filter(d => d.type===ing.type).map(d => `<option value="${d.ingredient}" ${ing.nom===d.ingredient?'selected':''}>${d.ingredient}</option>`).join('')}
        <option value="__nouveau__">+ Ajouter un ingrédient</option>
      </select>
      <input type="text" class="form-ctrl ing-inci" readonly placeholder="INCI" value="${(listesDropdown.fullData||[]).find(d=>d.type===ing.type&&d.ingredient===ing.nom)?.inci||''}">
      <input type="text" inputmode="decimal" class="form-ctrl ing-qte" value="${ing.quantite||''}" placeholder="g" onchange="ingredientsRecette[${i}].quantite=parseFloat(this.value)||0">
      <button class="btn btn-sm btn-danger" onclick="supprimerIngredientRecette(${i})">✕</button>
    </div>
  `).join('');
}

async function ajouterIngredientInci(categorie, index, liste = 'recette') {
  const nom = prompt(`Nouvel ingrédient — Catégorie : ${categorie}\n\nNom de l'ingrédient :`);
  if (!nom || !nom.trim()) return;
  const res = await appelAPIPost('saveIngredientInci', { nom: nom.trim(), categorie });
  if (res && res.success) {
    await chargerListesDeroulantes();
    if (liste === 'base') {
      ingredientsBase[index].nom = nom.trim();
      rafraichirListeIngredientsBase();
    } else {
      ingredientsRecette[index].nom = nom.trim();
      rafraichirListeIngredientsRecette();
    }
  } else {
    alert(res?.message || 'Erreur lors de l\'ajout.');
  }
}

function genererInci(ingredients) {
  if (!ingredients || ingredients.length === 0) return '';
  const total = ingredients.reduce((s, i) => s + (parseFloat(i.quantite_g) || 0), 0);
  if (total === 0) return '';

  // Séparer fragrances et autres
  const fragrances = ingredients.filter(i => i.type === 'Fragrances');
  const autres = ingredients.filter(i => i.type !== 'Fragrances');

  // Trier autres par quantité décroissante
  const plusDeUnPct = autres.filter(i => (i.quantite_g / total) > 0.01).sort((a, b) => b.quantite_g - a.quantite_g);
  const unPctOuMoins = autres.filter(i => (i.quantite_g / total) <= 0.01);

  const getInci = (ing) => {
    const found = (listesDropdown.fullData || []).find(d => d.type === ing.type && d.ingredient === ing.nom);
    return found ? (found.inci || '') : '';
  };

  const lignes = [
    ...plusDeUnPct.map(i => getInci(i)),
    ...unPctOuMoins.map(i => getInci(i))
  ];

  // Ajouter fragrances regroupées
  if (fragrances.length > 0) {
    const notes = fragrances.map(i => {
      const found = (listesDropdown.fullData || []).find(d => d.type === i.type && d.ingredient === i.nom);
      return found ? (found.note_olfactive || i.nom) : i.nom;
    }).filter(Boolean);
    lignes.push('Fragrance' + (notes.length > 0 ? ' (' + notes.join(', ') + ')' : ''));
  }

  return lignes.join(', ');
}

// ─── INGRÉDIENTS DE BASE ───
let ingredientsBase = [];

function ajouterIngredientBase(type='', nom='', quantite=0) {
  ingredientsBase.push({ type, nom, quantite });
  rafraichirListeIngredientsBase();
}

function supprimerIngredientBase(index) {
  ingredientsBase.splice(index, 1);
  rafraichirListeIngredientsBase();
}

function rafraichirListeIngredientsBase() {
  const liste = document.getElementById('liste-ingredients-base');
  if (!liste) return;
  if (ingredientsBase.length === 0) { liste.innerHTML = ''; return; }
  liste.innerHTML = ingredientsBase.map((ing, i) => `
    <div class="ingredient-rangee">
      <select class="form-ctrl ing-type" onchange="ingredientsBase[${i}].type=this.value; ingredientsBase[${i}].nom=''; rafraichirListeIngredientsBase()">
        <option value="">— Type —</option>
        ${(listesDropdown.types || []).map(t => `<option value="${t}" ${ing.type===t?'selected':''}>${t}</option>`).join('')}
      </select>
      <select class="form-ctrl ing-nom" onchange="if(this.value==='__nouveau__'){ajouterIngredientInci('${ing.type}',${i},'base')}else{ingredientsBase[${i}].nom=this.value; rafraichirListeIngredientsBase()}">
        <option value="">— Ingrédient —</option>
        ${(listesDropdown.fullData || []).filter(d => d.type===ing.type).map(d => `<option value="${d.ingredient}" ${ing.nom===d.ingredient?'selected':''}>${d.ingredient}</option>`).join('')}
        <option value="__nouveau__">+ Ajouter un ingrédient</option>
      </select>
      <input type="text" class="form-ctrl ing-inci" readonly placeholder="INCI" value="${(listesDropdown.fullData||[]).find(d=>d.type===ing.type&&d.ingredient===ing.nom)?.inci||''}">
      <input type="text" inputmode="decimal" class="form-ctrl ing-qte" value="${ing.quantite||''}" placeholder="g" onchange="ingredientsBase[${i}].quantite=parseFloat(this.value)||0">
      <button class="btn btn-sm btn-danger" onclick="supprimerIngredientBase(${i})">✕</button>
    </div>
  `).join('');
}

// ─── FORMATS RECETTE ───
let formatsRecette = [];

function ajouterFormatRecette(poids='', unite='g', prix='', desc='') {
  formatsRecette.push({ poids, unite, prix, desc });
  rafraichirListeFormatsRecette();
}

function supprimerFormatRecette(index) {
  formatsRecette.splice(index, 1);
  rafraichirListeFormatsRecette();
}

function rafraichirListeFormatsRecette() {
  const liste = document.getElementById('liste-formats-recette');
  if (!liste) return;
  if (formatsRecette.length === 0) { liste.innerHTML = ''; return; }
  liste.innerHTML = formatsRecette.map((f, i) => `
    <div class="format-rangee">
      <div class="format-champ-court">
        <label class="form-label">Poids</label>
        <input type="text" inputmode="decimal" class="form-ctrl" value="${f.poids||''}" placeholder="ex: 90" onchange="formatsRecette[${i}].poids=this.value">
      </div>
      <div class="format-champ-court">
        <label class="form-label">Unité</label>
        <select class="form-ctrl" onchange="formatsRecette[${i}].unite=this.value">
          <option value="g" ${f.unite==='g'?'selected':''}>g</option>
          <option value="ml" ${f.unite==='ml'?'selected':''}>ml</option>
        </select>
      </div>
      <div class="format-champ-court">
        <label class="form-label">Prix ($)</label>
        <input type="text" inputmode="decimal" class="form-ctrl" value="${f.prix||''}" placeholder="ex: 12.50" onchange="formatsRecette[${i}].prix=parseFloat(this.value)||0">
      </div>
      <div class="format-champ-long">
        <label class="form-label">Emballage</label>
        <input type="text" class="form-ctrl" value="${f.desc||''}" placeholder="ex: Boîte kraft recyclée" onchange="formatsRecette[${i}].desc=this.value">
      </div>
      <div class="format-champ-action">
        <label class="form-label">&nbsp;</label>
        <button class="btn-fermer-panneau" onclick="supprimerFormatRecette(${i})">✕</button>
      </div>
    </div>
  `).join('');
}

function supprimerRecette(id) {
  confirmerAction('Supprimer cette recette ?', async () => {
    const res = await appelAPIPost('deleteRecette', { recette_id: id });
    if (res && res.success) {
      fermerFicheRecette();
      afficherMsg('recettes', 'Recette supprimée.');
      await chargerRecettes();
    } else {
      afficherMsg('recettes', 'Erreur.', 'erreur');
    }
  });
}

/* ════════════════════════════════
   NOUVELLE FACTURE
════════════════════════════════ */
let factureActive = null;
let produitsFacture = [];

function calculerPrixParG() {
  const prix  = parseFloat(document.getElementById('fp-prix-unitaire').value) || 0;
  const qte   = parseFloat(document.getElementById('fp-contenu-qte').value) || 0;
  const unite = document.getElementById('fp-contenu-unite').value;
  let g = qte;
  if (unite === 'L')  g = qte * 1000;
  if (unite === 'kg') g = qte * 1000;
  document.getElementById('fp-prix-par-g').value = g > 0 ? (prix / g).toFixed(4) + ' $/g' : '';
}

async function creerFacture() {
  const numero      = document.getElementById('nf-numero').value.trim();
  const date        = document.getElementById('nf-date').value;
  const fournisseur = document.getElementById('nf-fournisseur').value.trim();
  if (!numero || !date || !fournisseur) {
    afficherMsg('nouvelle-facture', 'Tous les champs sont requis.', 'erreur');
    return;
  }
  const res = await appelAPIPost('createInvoice', { numeroFacture: numero, date, fournisseur });
  if (res && res.success) {
    factureActive = { numero, date, fournisseur };
    produitsFacture = [];
    document.getElementById('etape1-facture').classList.add('cache');
    document.getElementById('etape2-facture').classList.remove('cache');
    document.getElementById('nf-entete-titre').textContent = 'Facture ' + numero;
    document.getElementById('nf-entete-info').textContent  = date + ' — ' + fournisseur;
    mettreAJourTotaux(0);
    afficherMsg('nouvelle-facture', 'Facture créée. Ajoutez les produits.');
  } else {
    afficherMsg('nouvelle-facture', res?.message || 'Erreur.', 'erreur');
  }
}

async function ajouterProduit() {
  if (!factureActive) return;
  const rowIndex     = document.getElementById('fp-row-index').value;
  const nom          = document.getElementById('fp-nom').value.trim();
  const quantite     = parseFloat(document.getElementById('fp-quantite').value) || 0;
  const unite        = document.getElementById('fp-unite').value.trim();
  const contenuQte   = parseFloat(document.getElementById('fp-contenu-qte').value) || 0;
  const contenuUnite = document.getElementById('fp-contenu-unite').value;
  const prixUnitaire = parseFloat(document.getElementById('fp-prix-unitaire').value) || 0;
  const type         = document.getElementById('fp-type').value;
  const ingredient   = document.getElementById('fp-ingredient').value.trim();
  if (!nom || quantite <= 0 || prixUnitaire <= 0) {
    afficherMsg('nouvelle-facture', 'Nom, quantité et prix sont requis.', 'erreur');
    return;
  }
  let g = contenuQte;
  if (contenuUnite === 'L')  g = contenuQte * 1000;
  if (contenuUnite === 'kg') g = contenuQte * 1000;
  const prixParG = g > 0 ? (prixUnitaire / g) : 0;
  const d = {
    numeroFacture: factureActive.numero,
    fournisseur:   factureActive.fournisseur,
    nomProduit:    nom, quantite, unite,
    contenuQte, contenuUnite,
    prixUnitaire,
    prixParUnite:  prixParG.toFixed(4),
    type, ingredient
  };
  const res = rowIndex
    ? await appelAPIPost('updateProduct', { ...d, rowIndex: parseInt(rowIndex) })
    : await appelAPIPost('addProduct', d);
  if (res && res.success) {
    reinitialiserFormProduit();
    await rechargerProduits();
    afficherMsg('nouvelle-facture', rowIndex ? 'Produit mis à jour.' : 'Produit ajouté.');
  } else {
    afficherMsg('nouvelle-facture', 'Erreur.', 'erreur');
  }
}

async function rechargerProduits() {
  const res = await appelAPIPost('getInvoiceProducts', { numeroFacture: factureActive.numero });
  if (!res || !res.success) return;
  produitsFacture = res.products || [];
  afficherProduits();
  mettreAJourTotaux(res.total || 0);
}

function afficherProduits() {
  const tableau = document.getElementById('tableau-produits');
  const vide    = document.getElementById('vide-produits');
  const tbody   = document.getElementById('tbody-produits');
  if (!produitsFacture.length) { tableau.classList.add('cache'); vide.classList.remove('cache'); return; }
  tbody.innerHTML = '';
  produitsFacture.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:500">${p.nomProduit}</td>
      <td>${p.quantite}</td>
      <td style="color:var(--gris);font-size:0.78rem">${p.contenuQte ? p.contenuQte + ' ' + p.contenuUnite : '—'}</td>
      <td>${formaterPrix(p.prixUnitaire)}</td>
      <td style="color:var(--gris);font-size:0.75rem">${p.prixParUnite ? parseFloat(p.prixParUnite).toFixed(4) + ' $/g' : '—'}</td>
      <td style="color:var(--primary);font-weight:500">${formaterPrix(p.prixTotal)}</td>
      <td style="color:var(--gris);font-size:0.75rem">${p.type || '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn-edit" onclick="modifierProduit(${p.rowIndex})">Modifier</button>
          <button class="btn-suppr" onclick="supprimerProduit(${p.rowIndex})">Supprimer</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  vide.classList.add('cache');
  tableau.classList.remove('cache');
}

function mettreAJourTotaux(sousTotal) {
  const st  = sousTotal || 0;
  const tps = parseFloat(document.getElementById('nf-tps').value) || 0;
  const tvq = parseFloat(document.getElementById('nf-tvq').value) || 0;
  document.getElementById('nf-sous-total').textContent  = formaterPrix(st);
  document.getElementById('nf-total-final').textContent = formaterPrix(st + tps + tvq);
}

function recalculerTotal() {
  const st = produitsFacture.reduce((acc, p) => acc + (p.prixTotal || 0), 0);
  mettreAJourTotaux(st);
}

function modifierProduit(rowIndex) {
  const p = produitsFacture.find(x => x.rowIndex === rowIndex);
  if (!p) return;
  document.getElementById('fp-row-index').value     = rowIndex;
  document.getElementById('fp-nom').value           = p.nomProduit;
  document.getElementById('fp-quantite').value      = p.quantite;
  document.getElementById('fp-unite').value         = p.unite || '';
  document.getElementById('fp-contenu-qte').value   = p.contenuQte || '';
  document.getElementById('fp-contenu-unite').value = p.contenuUnite || 'g';
  document.getElementById('fp-prix-unitaire').value = p.prixUnitaire;
  document.getElementById('fp-type').value          = p.type || '';
  document.getElementById('fp-ingredient').value    = p.ingredient || '';
  calculerPrixParG();
 
}

function annulerEditionProduit() { reinitialiserFormProduit(); }

function reinitialiserFormProduit() {
  ['fp-row-index','fp-nom','fp-quantite','fp-unite','fp-contenu-qte','fp-prix-unitaire','fp-ingredient','fp-prix-par-g']
    .forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  document.getElementById('fp-contenu-unite').value = 'g';
  document.getElementById('fp-type').value = '';
  document.getElementById('btn-annuler-produit').classList.add('cache');
}

function supprimerProduit(rowIndex) {
  confirmerAction('Supprimer ce produit ?', async () => {
    const res = await appelAPIPost('deleteProduct', { numeroFacture: factureActive.numero, rowIndex });
    if (res && res.success) {
      await rechargerProduits();
      afficherMsg('nouvelle-facture', 'Produit supprimé.');
    } else {
      afficherMsg('nouvelle-facture', 'Erreur.', 'erreur');
    }
  });
}



function reinitialiserNouvelleFacture() {
  factureActive = null;
  produitsFacture = [];
  document.getElementById('etape2-facture').classList.add('cache');
  document.getElementById('etape1-facture').classList.remove('cache');
  ['facture-numero','facture-fournisseur','facture-fournisseur-nouveau','final-tps','final-tvq','final-livraison'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const champNouv = document.getElementById('facture-fournisseur-nouveau');
  if (champNouv) champNouv.classList.add('cache');
  document.getElementById('nf-date').value = new Date().toISOString().split('T')[0];
}

/* ════════════════════════════════
   FACTURES
════════════════════════════════ */
let toutesFactures = [];

async function chargerFactures() {
  const loading = document.getElementById('loading-factures');
  const tableau = document.getElementById('tableau-factures');
  const vide    = document.getElementById('vide-factures');
  loading.classList.remove('cache');
  tableau.classList.add('cache');
  vide.classList.add('cache');

  const res = await appelAPI('getInvoicesListWithFilters');

loading.classList.add('cache');
  if (!res || !res.invoices) { afficherMsg('factures', 'Erreur lors du chargement.', 'erreur'); return; }
  toutesFactures = res.invoices || [];

  const selFourn    = document.getElementById('filtre-fournisseur');
  const valActuelle = selFourn.value;
  selFourn.innerHTML = '<option value="">Tous les fournisseurs</option>';
  (res.fournisseurs || []).forEach(f => {
    const o = document.createElement('option');
    o.value = f; o.textContent = f; selFourn.appendChild(o);
  });
  selFourn.value = valActuelle;

  afficherFactures(toutesFactures);
}

function filtrerFactures() {
  const fourn  = document.getElementById('filtre-fournisseur').value;
  const statut = document.getElementById('filtre-statut').value;
  const debut  = document.getElementById('filtre-date-debut').value;
  const fin    = document.getElementById('filtre-date-fin').value;

  const filtrees = toutesFactures.filter(f => {
    if (fourn  && f.fournisseur !== fourn)  return false;
    if (statut && f.statut !== statut)      return false;
    if (debut  && f.dateRaw < debut)        return false;
    if (fin    && f.dateRaw > fin)          return false;
    return true;
  });

  const selStatut = document.getElementById('filtre-statut');
  const valStatut = selStatut.value;
  const statutsDispo = [...new Set(
    toutesFactures.filter(f => !fourn || f.fournisseur === fourn).map(f => f.statut)
  )];
  selStatut.innerHTML = '<option value="">Tous les statuts</option>';
  ['En cours', 'Finalisée'].filter(s => statutsDispo.includes(s)).forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s; selStatut.appendChild(o);
  });
  selStatut.value = valStatut;

  afficherFactures(filtrees);
}

function reinitialiserFiltres() {
  document.getElementById('filtre-fournisseur').value = '';
  document.getElementById('filtre-statut').value = '';
  document.getElementById('filtre-date-debut').value = '';
  document.getElementById('filtre-date-fin').value = '';
  afficherFactures(toutesFactures);
}

function afficherFactures(liste) {
  const tableau = document.getElementById('tableau-factures');
  const vide    = document.getElementById('vide-factures');
  const tbody   = document.getElementById('tbody-factures');
  const compte  = document.getElementById('factures-compte');
  const totalEl = document.getElementById('factures-total');

  compte.textContent = liste.length + ' facture' + (liste.length > 1 ? 's' : '');

  if (!liste.length) { tableau.classList.add('cache'); vide.classList.remove('cache'); if (totalEl) totalEl.classList.add('cache'); return; }

  tbody.innerHTML = '';
  const triees = [...liste].sort((a, b) => b.dateRaw.localeCompare(a.dateRaw));

  triees.forEach(f => {
    const badge = f.statut === 'Finalisée'
      ? `<span class="badge-statut-ok">✓</span>`
      : `<span class="badge-statut-cours">●</span>`;
    const tr = document.createElement('tr');
    tr.className = 'cliquable';
    tr.onclick = () => voirDetailFacture(String(f.numero));
    tr.innerHTML = `
      <td class="td-numero">${f.numero}</td>
      <td class="td-date">${f.date}</td>
      <td>${f.fournisseur}</td>
      <td class="td-prix">${f.total ? formaterPrix(f.total) : '—'}</td>
      <td>${badge}</td>`;
    tbody.appendChild(tr);
  });

 const total = triees.reduce((acc, f) => acc + (parseFloat(f.total) || 0), 0);
  if (totalEl) { totalEl.textContent = formaterPrix(total); totalEl.classList.remove('cache'); }

  vide.classList.add('cache');
  tableau.classList.remove('cache');
}

async function voirDetailFacture(numero) {
  const facture = toutesFactures.find(f => String(f.numero) === String(numero));
  const modal = document.getElementById('modal-facture');
  modal.classList.add('ouvert');
  document.getElementById('modal-facture-titre').textContent = 'Facture ' + numero;
  document.getElementById('modal-facture-info').textContent  = (facture ? facture.date + ' — ' + facture.fournisseur : '');
  document.getElementById('contenu-detail-facture').innerHTML = '';
  document.getElementById('loading-detail-facture').classList.remove('cache');

  const res = await appelAPIPost('getInvoiceProducts', { numeroFacture: numero });
  document.getElementById('loading-detail-facture').classList.add('cache');

  if (!res || !res.success || !res.products.length) {
    document.getElementById('contenu-detail-facture').innerHTML = '<div class="vide"><div class="vide-titre">Aucun produit</div></div>';
    return;
  }

  let html = `
    <div class="tableau-wrap">
      <table>
        <thead>
          <tr><th>Produit</th><th>Qté</th><th>Contenu</th><th>Prix unit.</th><th>Prix/g</th><th>Total</th></tr>
        </thead>
        <tbody>`;
  res.products.forEach(p => {
    html += `
      <tr>
     <td style="font-weight:500">${p.ingredient || '—'}</td>
        <td>${p.quantite}</td>
        <td style="color:var(--gris);font-size:0.78rem">${p.formatQte ? p.formatQte + ' ' + p.formatUnite : '—'}</td>
        <td>${formaterPrix(p.prixUnitaire)}</td>
        <td style="color:var(--gris);font-size:0.75rem">${p.prixParUnite ? parseFloat(p.prixParUnite).toFixed(4) + ' $/g' : '—'}</td>
        <td style="color:var(--primary);font-weight:500">${formaterPrix(p.prixTotal)}</td>
      
      </tr>`;
  });
  html += `</tbody></table></div>`;
 
const tps      = facture ? parseFloat(facture.tps) || 0 : 0;
  const tvq      = facture ? parseFloat(facture.tvq) || 0 : 0;
  const livraison = facture ? parseFloat(facture.livraison) || 0 : 0;
  const total    = facture ? parseFloat(facture.total) || 0 : res.total;
  html += `
    <div class="facture-totaux">
      <div class="facture-total-ligne">Sous-total <span>${formaterPrix(res.total)}</span></div>
      ${tps ? `<div class="facture-total-ligne">TPS <span>${formaterPrix(tps)}</span></div>` : ''}
      ${tvq ? `<div class="facture-total-ligne">TVQ <span>${formaterPrix(tvq)}</span></div>` : ''}
      ${livraison ? `<div class="facture-total-ligne">Livraison <span>${formaterPrix(livraison)}</span></div>` : ''}
      <div class="facture-total-ligne facture-total-final">Total <span>${formaterPrix(total)}</span></div>
    </div>
    <div class="form-actions">
      <button class="btn btn-danger" onclick="fermerModalFacture(); supprimerFacture('${numero}')">Supprimer</button>
    </div>`;
  document.getElementById('contenu-detail-facture').innerHTML = html;
}

function fermerModalFacture() {
  document.getElementById('modal-facture').classList.remove('ouvert');
}

function supprimerFacture(numero) {
  confirmerAction('Supprimer la facture ' + numero + ' et tous ses produits ?', async () => {
    const res = await appelAPIPost('deleteInvoice', { numeroFacture: numero });
    if (res && res.success) {
      afficherMsg('factures', 'Facture supprimée.');
      chargerFactures();
    } else {
      afficherMsg('factures', 'Erreur lors de la suppression.', 'erreur');
    }
  });
}

/* ════════════════════════════════
   INVENTAIRE
════════════════════════════════ */
let donneesInventaire = {};
async function chargerInventaire() {
  const loading = document.getElementById('loading-inventaire');
  const contenu = document.getElementById('contenu-inventaire');
  const vide    = document.getElementById('vide-inventaire');
  loading.classList.remove('cache');
  contenu.innerHTML = '';
  vide.classList.add('cache');

  const res = await appelAPI('getInventory');


 loading.classList.add('cache');
  if (!res || !res.success) { afficherMsg('inventaire', 'Erreur.', 'erreur'); return; }

donneesInventaire = res.inventory || {};
  const inv   = donneesInventaire;
  const types = Object.keys(inv).sort();
  if (!types.length) { vide.classList.remove('cache'); return; }

  const selType = document.getElementById('inv-filtre-type');
  const selFourn = document.getElementById('inv-filtre-fourn');
  selType.innerHTML = '<option value="">Tous les types</option>';
  selFourn.innerHTML = '<option value="">Tous les fournisseurs</option>';
  const fournsSet = new Set();
  types.forEach(type => {
    selType.innerHTML += `<option value="${type}">${type}</option>`;
    Object.keys(inv[type]).forEach(nom => Object.keys(inv[type][nom]).forEach(f => fournsSet.add(f)));
  });
  Array.from(fournsSet).sort().forEach(f => { selFourn.innerHTML += `<option value="${f}">${f}</option>`; });

  let html = '';
  let total = 0;

 html += `
    <div class="tableau-wrap">
      <table>
        <thead>
          <tr><th>Ingrédient</th><th>Fournisseur</th><th>Unités</th><th>Format</th><th>Valeur</th></tr>
        </thead>
        <tbody>`;

  types.forEach(type => {
    const ings = inv[type];
    html += `<tr><td colspan="5" class="inv-titre-rangee">${type}</td></tr>`;
    Object.keys(ings).sort().forEach(nom => {
      const fournisseurs = Object.keys(ings[nom]);
      const prixMin = Math.min(...fournisseurs.map(f => ings[nom][f].prixParG || Infinity));
      fournisseurs.forEach((fourn, idx) => {
        const d = ings[nom][fourn];
        total += d.valeur || 0;
        const meilleur = d.prixParG && d.prixParG === prixMin && fournisseurs.length > 1;
        html += `
          <tr>
            <td class="${idx === 0 ? 'td-ing-nom' : 'td-ing-nom-suite'}">${idx === 0 ? nom : ''}</td>
            <td class="${meilleur ? 'td-ing-fourn-meilleur' : 'td-ing-fourn'}">${fourn}${meilleur ? ' ★' : ''}</td>
            <td>${d.unites}</td>
            <td class="td-ing-format">${d.format || '—'}</td>
            <td class="td-ing-valeur">${formaterPrix(d.valeur)}</td>
          </tr>`;
      });
    });
  });

  html += `</tbody></table></div>`;

  html += `
    <div class="inv-total">
      <div class="inv-total-label">Valeur totale de l'inventaire</div>
      <div class="inv-total-montant">${formaterPrix(total)}</div>
    </div>`;

contenu.innerHTML = html;
}

function filtrerInventaire() {
  const recherche = (document.getElementById('inv-recherche')?.value || '').toLowerCase();
  const typeFiltre = document.getElementById('inv-filtre-type')?.value || '';
  const fournFiltre = document.getElementById('inv-filtre-fourn')?.value || '';
  const inv = donneesInventaire;
  const types = Object.keys(inv).sort();
  const contenu = document.getElementById('contenu-inventaire');
  let html = '<div class="tableau-wrap"><table><thead><tr><th>Ingrédient</th><th>Fournisseur</th><th>Unités</th><th>Format</th><th>Valeur</th></tr></thead><tbody>';
  let total = 0;
  types.forEach(type => {
    if (typeFiltre && type !== typeFiltre) return;
    const ings = inv[type];
    let rangeeType = false;
    Object.keys(ings).sort().forEach(nom => {
      if (recherche && !nom.toLowerCase().includes(recherche)) return;
      const fournisseurs = Object.keys(ings[nom]).filter(f => !fournFiltre || f === fournFiltre);
      if (!fournisseurs.length) return;
      if (!rangeeType) { html += `<tr><td colspan="5" class="inv-titre-rangee">${type}</td></tr>`; rangeeType = true; }
      const prixMin = Math.min(...fournisseurs.map(f => ings[nom][f].prixParG || Infinity));
      fournisseurs.forEach((fourn, idx) => {
        const d = ings[nom][fourn];
        total += d.valeur || 0;
        const meilleur = d.prixParG && d.prixParG === prixMin && fournisseurs.length > 1;
        html += `<tr><td class="${idx === 0 ? 'td-ing-nom' : 'td-ing-nom-suite'}">${idx === 0 ? nom : ''}</td><td class="${meilleur ? 'td-ing-fourn-meilleur' : 'td-ing-fourn'}">${fourn}${meilleur ? ' ★' : ''}</td><td>${d.unites}</td><td class="td-ing-format">${d.format || '—'}</td><td class="td-ing-valeur">${formaterPrix(d.valeur)}</td></tr>`;
      });
    });
  });
  html += `</tbody></table></div><div class="inv-total"><div class="inv-total-label">Valeur totale de l'inventaire</div><div class="inv-total-montant">${formaterPrix(total)}</div></div>`;
  contenu.innerHTML = html;
}

function reinitialiserFiltresInventaire() {
  document.getElementById('inv-recherche').value = '';
  document.getElementById('inv-filtre-type').value = '';
  document.getElementById('inv-filtre-fourn').value = '';
  filtrerInventaire();
}

/* ════════════════════════════════
   PAGE INCI
════════════════════════════════ */

let inciDonnees = [];
let inciCorrespondance = [];
let inciCategoriesUC = [];

async function chargerInci() {
  document.getElementById('loading-inci').classList.remove('cache');
  document.getElementById('inci-accordeons').innerHTML = '';

  const [res, resUC] = await Promise.all([
    appelAPI('getSourcesInci'),
    appelAPI('getCategoriesUC')
  ]);
  document.getElementById('loading-inci').classList.add('cache');

  if (!res || !res.success) {
    afficherMsg('inci', 'Erreur de chargement.', 'erreur');
    return;
  }

  inciDonnees = res.lignes || [];
  inciCorrespondance = res.correspondance || [];
  inciCategoriesUC = (resUC && resUC.success) ? resUC.categories : [];

  inciConstruireAccordeons();
}

function inciAppliquerFiltres() {
  const btn = event && event.currentTarget;
  if (btn && btn.dataset.filtreStatut !== undefined) {
    document.querySelectorAll('[data-filtre-statut]').forEach(b => b.classList.remove('actif'));
    btn.classList.add('actif');
  } else if (btn && btn.dataset.filtreSource !== undefined) {
    document.querySelectorAll('[data-filtre-source]').forEach(b => b.classList.remove('actif'));
    btn.classList.add('actif');
  }
  inciConstruireAccordeons();
}

function inciGetFiltres() {
  const btnStatut = document.querySelector('[data-filtre-statut].actif');
  const btnSource = document.querySelector('[data-filtre-source].actif');
  const recherche = document.getElementById('inci-recherche');
  return {
    statut: btnStatut ? btnStatut.dataset.filtreStatut : 'tout',
    source: btnSource ? btnSource.dataset.filtreSource : 'tout',
    recherche: recherche ? recherche.value.trim().toLowerCase() : ''
  };
}

function inciConstruireAccordeons() {
  const { statut, source, recherche } = inciGetFiltres();
  const container = document.getElementById('inci-accordeons');
  container.innerHTML = '';

  let donnees = inciDonnees.filter(l => {
    if (source !== 'tout' && l.source !== source) return false;
    if (statut === 'a-valider' && l.valide) return false;
    if (statut === 'valide' && !l.valide) return false;
    if (recherche && !l.nom.toLowerCase().includes(recherche)) return false;
    return true;
  });

  // Accordéon Catégories UC
  const blocUC = document.createElement('div');
  blocUC.className = 'form-panel visible';
  blocUC.innerHTML = `
    <div class="form-panel-header" onclick="inciToggleAccordeon(this)" style="cursor:pointer">
      <div class="form-panel-titre">Catégories Univers Caresse</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge-statut-ok">${inciCategoriesUC.length} catégories</span>
        <span class="inci-accord-chevron">▶</span>
      </div>
    </div>
    <div class="form-body inci-accord-body cache" id="inci-uc-body">
      ${inciRendreUC()}
    </div>`;
  container.appendChild(blocUC);

  // Accordéon table de correspondance
  const blocCorr = document.createElement('div');
  blocCorr.className = 'form-panel visible';
  blocCorr.innerHTML = `
    <div class="form-panel-header" onclick="inciToggleAccordeon(this)" style="cursor:pointer">
      <div class="form-panel-titre">Table de correspondance des catégories</div>
      <span class="inci-accord-chevron">▶</span>
    </div>
    <div class="form-body inci-accord-body cache" id="inci-corresp-body">
      ${inciRendreCorrespondance()}
    </div>`;
  container.appendChild(blocCorr);

  // Grouper par catégorie maître
  const parCat = {};
  donnees.forEach(l => {
    const cat = l.categorMaitre || l.categorie || 'Sans catégorie';
    if (!parCat[cat]) parCat[cat] = [];
    parCat[cat].push(l);
  });

  const cats = Object.keys(parCat).sort();
  if (cats.length === 0) {
    const vide = document.createElement('div');
    vide.className = 'vide';
    vide.innerHTML = '<div class="vide-titre">Aucun ingrédient à afficher</div>';
    container.appendChild(vide);
    return;
  }

  cats.forEach((cat, idx) => {
    const lignes     = parCat[cat];
    const nbTotal    = lignes.length;
    const nbValides  = lignes.filter(l => l.valide).length;
    const nbRestants = nbTotal - nbValides;

    const bloc = document.createElement('div');
    bloc.className = 'form-panel visible';
    bloc.dataset.cat = cat;
    bloc.innerHTML = `
      <div class="form-panel-header" onclick="inciToggleAccordeon(this)" style="cursor:pointer">
        <div class="form-panel-titre">${cat}</div>
        <div style="display:flex;gap:8px;align-items:center">
          ${nbRestants > 0 ? `<span class="badge-statut-cours">${nbRestants} à valider</span>` : ''}
          <span class="badge-statut-ok">${nbValides} validés</span>
          <span class="inci-accord-chevron">▶</span>
        </div>
      </div>
      <div class="form-body inci-accord-body cache">
        <div class="tableau-wrap">
          <table class="tableau-admin">
            <thead>
              <tr>
                <th style="width:25%">Nom</th>
                <th style="width:35%">INCI</th>
                <th style="width:25%">Catégorie UC</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${lignes.map((l, i) => inciRendreLigne(l, cat, `${idx}-${i}`)).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    container.appendChild(bloc);
  });
}

function inciRendreLigne(l, cat, uid) {
  const statutClass = l.valide ? 'badge-statut-ok' : 'badge-statut-cours';
  const statutLabel = l.valide ? '✅' : '🔴';
  const id = `inci-${uid}`;
  const nomSafe = l.nom.replace(/'/g, "\\'");
  const catSafe = cat.replace(/'/g, "\\'");
  const ligneValideeClass = l.valide ? 'ligne-validee' : '';
  return `
    <tr class="${ligneValideeClass}">
      <td>${l.nom}</td>
      <td></td>
      <td></td>
      <td>
        <span class="${statutClass}">${statutLabel}</span>
        <button class="btn btn-sm btn-outline" onclick="inciToggleDetail('${id}')">▼</button>
      </td>
    </tr>
    <tr class="accordeon-detail cache" id="${id}-detail">
      <td colspan="4">
        <div class="form-groupe">
          <label class="form-label">INCI</label>
          <input type="text" class="form-ctrl" id="${id}-inci" value="${(l.inci || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-groupe">
          <label class="form-label">Catégorie UC</label>
          <select class="form-ctrl" id="${id}-cat">
            <option value="">— Choisir —</option>
            ${inciCategoriesUC.map(c => `<option value="${c.categorie}" ${(l.categorMaitre === c.categorie) ? 'selected' : ''}>${c.categorie}</option>`).join('')}
          </select>
        </div>
        <div class="form-groupe">
          <label class="form-label">Catégorie fournisseur</label>
          <div class="form-valeur">${l.categorie || '—'}</div>
        </div>
        <div class="form-groupe">
          <label class="form-label">Nom botanique</label>
          <input type="text" class="form-ctrl" id="${id}-bot" value="${(l.nomBotanique || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-groupe">
          <label class="form-label">Note olfactive</label>
          <input type="text" class="form-ctrl" id="${id}-note" value="${(l.noteOlfactive || '').replace(/"/g, '&quot;')}">
        </div>
        <div class="form-groupe">
          <label class="form-label">Texte brut</label>
          <div class="texte-brut">${(l.texteBrut || '—')}</div>
        </div>
        <hr class="separateur">
        <div class="form-actions">
          ${l.url ? `<a href="${l.url}" target="_blank" class="btn btn-sm btn-outline">↗ Voir fiche</a>` : '<span></span>'}
          <button class="btn btn-sm btn-primary" onclick="inciValider('${id}','${nomSafe}','${catSafe}','${l.source}')">Valider</button>
        </div>
      </td>
    </tr>`;
}

function inciRendreUC() {
  if (inciCategoriesUC.length === 0) {
    return `<p class="form-valeur">Aucune catégorie définie.</p>
      <button class="btn btn-sm btn-secondary" onclick="inciAjouterUC()">+ Ajouter une catégorie</button>`;
  }
  return `
    <table class="tableau-admin">
      <thead>
        <tr>
          <th>Catégorie</th>
          <th>Date ajout</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${inciCategoriesUC.map((c, i) => `
          <tr>
            <td><input type="text" class="form-ctrl" id="uc-cat-${i}" value="${c.categorie.replace(/"/g,'&quot;')}"></td>
            <td>${c.dateAjout || '—'}</td>
            <td>
              <div class="td-actions">
                <button class="btn-edit" onclick="inciModifierUC(${i}, ${c.rowIndex})">Modifier</button>
                <button class="btn-suppr" onclick="inciSupprimerUC(${c.rowIndex})">Supprimer</button>
              </div>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>
    <hr class="separateur">
    <div class="form-actions">
      <button class="btn btn-sm btn-secondary" onclick="inciAjouterUC()">+ Ajouter une catégorie</button>
    </div>`;
}

function inciAjouterUC() {
  inciCategoriesUC.push({ rowIndex: null, categorie: '', dateAjout: '' });
  document.getElementById('inci-uc-body').innerHTML = inciRendreUC();
  const dernierIndex = inciCategoriesUC.length - 1;
  const input = document.getElementById(`uc-cat-${dernierIndex}`);
  if (input) input.focus();
}

async function inciModifierUC(i, rowIndex) {
  const input = document.getElementById(`uc-cat-${i}`);
  const val   = (input?.value || '').trim();
  if (!val) { afficherMsg('inci', 'Le nom est requis.', 'erreur'); return; }

  if (!rowIndex) {
    const res = await appelAPIPost('ajouterCategorieUC', { categorie: val });
    if (res && res.success) {
      afficherMsg('inci', `✅ Catégorie "${val}" ajoutée.`);
      await chargerInci();
    } else {
      afficherMsg('inci', res?.message || 'Erreur.', 'erreur');
    }
  } else {
    const res = await appelAPIPost('modifierCategorieUC', { rowIndex, categorie: val });
    if (res && res.success) {
      afficherMsg('inci', `✅ Catégorie mise à jour.`);
      await chargerInci();
    } else {
      afficherMsg('inci', res?.message || 'Erreur.', 'erreur');
    }
  }
}

async function inciSupprimerUC(rowIndex) {
  if (!rowIndex) { await chargerInci(); return; }
  const res = await appelAPIPost('supprimerCategorieUC', { rowIndex });
  if (res && res.success) {
    afficherMsg('inci', 'Catégorie supprimée.');
    await chargerInci();
  } else {
    afficherMsg('inci', res?.message || 'Erreur.', 'erreur');
  }
}

function inciRendreCorrespondance() {
  const categoriesPA = inciCategoriesUC.map(c => c.categorie).sort((a, b) => a.localeCompare(b, 'fr'));

  if (inciCorrespondance.length === 0) {
    return `<p class="form-valeur">Aucune correspondance définie.</p>
      <button class="btn btn-sm btn-secondary" onclick="inciAjouterCorrespondance()">+ Ajouter une correspondance</button>`;
  }

  return `
    <table class="tableau-admin">
      <thead>
        <tr>
          <th>Catégorie source</th>
          <th>Provenance</th>
          <th>Catégorie maître</th>
          <th>Statut</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${inciCorrespondance.map((r, i) => {
          const statutClass = r.confirme ? 'badge-statut-ok' : 'badge-statut-cours';
          const statutLabel = r.confirme ? '✅ Confirmé' : '🔴 À confirmer';
          return `
            <tr>
              <td><strong>${r.categorieSource}</strong></td>
              <td><span class="badge-collection">${r.sourceProvenance || '—'}</span></td>
              <td>
                <select class="form-ctrl" id="corresp-mai-${i}" onchange="inciToggleNouvelleCategorie(${i})">
                  <option value="">— Choisir —</option>
                  ${categoriesPA.map(c => `<option value="${c}" ${r.categorieMaitre === c ? 'selected' : ''}>${c}</option>`).join('')}
                  <option value="__nouveau__">+ Nouvelle catégorie…</option>
                </select>
                <input type="text" class="form-ctrl cache" id="corresp-mai-new-${i}" placeholder="Nom de la nouvelle catégorie">
              </td>
              <td><span class="${statutClass}">${statutLabel}</span></td>
              <td><button class="btn btn-sm btn-primary" onclick="inciConfirmerCorrespondance(${i})">Confirmer</button></td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>
    <hr class="separateur">
    <div class="form-actions">
      <button class="btn btn-sm btn-primary" onclick="inciSauvegarderToutesCorrespondances()">Enregistrer toutes</button>
    </div>`;
}

function inciToggleDetail(id) {
  const detail = document.getElementById(`${id}-detail`);
  if (detail) detail.classList.toggle('cache');
}

function inciToggleAccordeon(header) {
  const body    = header.nextElementSibling;
  const chevron = header.querySelector('.inci-accord-chevron');
  const estOuvert = !body.classList.contains('cache');
  body.classList.toggle('cache', estOuvert);
  if (chevron) chevron.textContent = estOuvert ? '▶' : '▼';
}

async function inciValider(id, nom, cat, source) {
  const inci          = document.getElementById(`${id}-inci`)?.value  || '';
  const nomBotanique  = document.getElementById(`${id}-bot`)?.value   || '';
  const noteOlfactive = document.getElementById(`${id}-note`)?.value  || '';
  const categorieUC   = document.getElementById(`${id}-cat`)?.value   || cat;

  const res = await appelAPIPost('validerIngredientInci', {
    nom, categorie: categorieUC, inci, source, nomBotanique, noteOlfactive
  });

  if (res && res.success) {
    afficherMsg('inci', `✅ ${nom} validé.`);
    await chargerInci();
  } else {
    afficherMsg('inci', 'Erreur lors de la validation.', 'erreur');
  }
}

function inciAjouterCorrespondance() {
  inciCorrespondance.push({ categorieSource: '', categorieMaitre: '' });
  document.getElementById('inci-corresp-body').innerHTML = inciRendreCorrespondance();
}

function inciToggleNouvelleCategorie(i) {
  const select   = document.getElementById(`corresp-mai-${i}`);
  const inputNew = document.getElementById(`corresp-mai-new-${i}`);
  if (!inputNew) return;
  inputNew.classList.toggle('cache', select.value !== '__nouveau__');
  if (select.value === '__nouveau__') inputNew.focus();
}

async function inciConfirmerCorrespondance(i) {
  const select = document.getElementById(`corresp-mai-${i}`);
  const inputNew = document.getElementById(`corresp-mai-new-${i}`);
  let valeur = select.value;

  if (valeur === '__nouveau__') {
    valeur = (inputNew?.value || '').trim();
    if (!valeur) {
      afficherMsg('inci', 'Entre un nom de catégorie.', 'erreur');
      return;
    }
  }

  if (!valeur) {
    afficherMsg('inci', 'Choisis une catégorie maître.', 'erreur');
    return;
  }

  inciCorrespondance[i].categorieMaitre = valeur;
  inciCorrespondance[i].confirme = true;

  const res = await appelAPIPost('sauvegarderCorrespondanceInci', {
    correspondance: inciCorrespondance.map(r => ({
      categorieSource:  r.categorieSource,
      categorieMaitre:  r.categorieMaitre,
      sourceProvenance: r.sourceProvenance || '',
      confirme:         r.confirme || false
    }))
  });

  if (res && res.success) {
    afficherMsg('inci', `✅ Correspondance confirmée.`);
    await chargerInci();
  } else {
    afficherMsg('inci', 'Erreur lors de la sauvegarde.', 'erreur');
  }
}

async function inciSauvegarderCorrespondance() {
  const inputs = document.querySelectorAll('[id^="corresp-src-"]');
  const correspondance = [];
  inputs.forEach((el, i) => {
    const src = el.value.trim();
    const mai = document.getElementById(`corresp-mai-${i}`)?.value.trim() || '';
    if (src) correspondance.push({ categorieSource: src, categorieMaitre: mai });
  });

  const res = await appelAPIPost('sauvegarderCorrespondanceInci', { correspondance });
  if (res && res.success) {
    afficherMsg('inci', 'Correspondances sauvegardées.');
    await chargerInci();
  } else {
    afficherMsg('inci', 'Erreur lors de la sauvegarde.', 'erreur');
  }
}

/* ════════════════════════════════
   DENSITÉS
════════════════════════════════ */
let donneesDensites = [];

async function chargerDensites() {
  const loading = document.getElementById('loading-densites');
  const tableau = document.getElementById('tableau-densites');
  const vide    = document.getElementById('vide-densites');
  loading.classList.remove('cache');
  tableau.classList.add('cache');
  vide.classList.add('cache');

  const res = await appelAPI('getDensities');


loading.classList.add('cache');
  if (!res || !Array.isArray(res.densities)) { afficherMsg('densites', 'Erreur.', 'erreur'); return; }
  donneesDensites = res.densities;

  if (!donneesDensites.length) { vide.classList.remove('cache'); return; }

  const tbody = document.getElementById('tbody-densites');
  tbody.innerHTML = '';
  donneesDensites.forEach(d => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.onclick = () => modifierDensite(d.type);
    tr.innerHTML = `
      <td>${d.type}</td>
      <td>${parseFloat(d.densite).toFixed(3)}</td>
      <td>${d.unite}</td>
      <td>${d.marge_perte_pct ? parseFloat(d.marge_perte_pct).toFixed(1) + ' %' : '—'}</td>
      <td>
        <div class="td-actions">
          <button class="btn-edit" onclick="event.stopPropagation(); modifierDensite('${d.type.replace(/'/g, "\\'")}')">Modifier</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
  tableau.classList.remove('cache');
}

function ouvrirFormDensite() {
  document.getElementById('form-densites-titre').textContent = 'Nouveau type';
  document.getElementById('fd-mode').value         = 'ajout';
  document.getElementById('fd-type').value         = '';
  document.getElementById('fd-densite').value      = '';
  document.getElementById('fd-unite').value        = 'ml';
  document.getElementById('fd-marge-perte').value  = '';
  document.getElementById('fd-type').readOnly      = false;
  document.getElementById('form-densites').classList.add('visible');
  document.getElementById('fd-type').focus();
}

function fermerFormDensite() {
  document.getElementById('form-densites').classList.remove('visible');
}

function modifierDensite(type) {
  const d = donneesDensites.find(x => x.type === type);
  if (!d) return;
  document.getElementById('form-densites-titre').textContent = 'Modifier la densité';
  document.getElementById('fd-mode').value         = 'modif';
  document.getElementById('fd-type').value         = d.type;
  document.getElementById('fd-densite').value      = d.densite;
  document.getElementById('fd-unite').value        = d.unite;
  document.getElementById('fd-marge-perte').value  = d.marge_perte_pct || '';
  document.getElementById('fd-type').readOnly      = true;
  document.getElementById('form-densites').classList.add('visible');
  document.getElementById('fd-densite').focus();
}

async function sauvegarderDensite() {
  const mode    = document.getElementById('fd-mode').value;
  const type    = document.getElementById('fd-type').value.trim();
  const densite = parseFloat(document.getElementById('fd-densite').value);
  const unite   = document.getElementById('fd-unite').value;
  if (!type) { afficherMsg('densites', 'Le type est requis.', 'erreur'); return; }
  if (isNaN(densite) || densite <= 0) { afficherMsg('densites', 'Densité invalide.', 'erreur'); return; }
  const marge_perte_pct = parseFloat(document.getElementById('fd-marge-perte').value) || 0;
  const action = mode === 'modif' ? 'saveDensity' : 'addDensityType';
  const res = await appelAPIPost(action, { type, densite, unite, marge_perte_pct });
  if (res && res.success) {
    fermerFormDensite();
    afficherMsg('densites', mode === 'modif' ? 'Densité mise à jour.' : 'Type ajouté.');
    donneesDensites = [];
    chargerDensites();
  } else {
    afficherMsg('densites', res?.message || 'Erreur.', 'erreur');
  }
}

/* ════════════════════════════════
   NOUVELLE FACTURE — WIZARD
════════════════════════════════ */

let listesDropdown = { types: [], fullData: [], fournisseurs: [] };

async function initialiserNouvelleFacture() {
  if (factureActive) return;
  factureActive   = null;
  produitsFacture = [];
  const dateField = document.getElementById('facture-date');
  if (dateField && !dateField.value) dateField.value = new Date().toISOString().split('T')[0];
  await chargerListesFournisseurs();
  wizardEtape1();
}

async function chargerListesFournisseurs() {
  const res = await appelAPI('getDropdownLists');
  if (res) {
    listesDropdown.types    = res.types    || [];
 listesDropdown.fullData = res.fullData || [];
    listesDropdown.config   = res.config   || {};
  }
  const resFactures = await appelAPI('getInvoicesListWithFilters');
  if (resFactures) {
    listesDropdown.fournisseurs = resFactures.fournisseurs || [];
  }
  peuplerSelectFournisseur();
  peuplerSelectType();
}

function peuplerSelectFournisseur() {
  const sel = document.getElementById('facture-fournisseur');
  if (!sel) return;
  sel.innerHTML = '<option value=""></option>';
  listesDropdown.fournisseurs.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f; opt.textContent = f;
    sel.appendChild(opt);
  });
  const optNew = document.createElement('option');
  optNew.value = '__nouveau__'; optNew.textContent = '+ Nouveau fournisseur…';
  sel.appendChild(optNew);
}

function peuplerSelectType() {
  const sel = document.getElementById('item-type');
  if (!sel) return;
  sel.innerHTML = '<option value=""></option>';
  listesDropdown.types.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t;
    sel.appendChild(opt);
  });
}

function onChangeFournisseur() {
  const sel   = document.getElementById('facture-fournisseur');
  const champ = document.getElementById('facture-fournisseur-nouveau');
  if (!sel || !champ) return;
  champ.classList.toggle('cache', sel.value !== '__nouveau__');
  if (sel.value === '__nouveau__' && window.innerWidth > 900) champ.focus();
}

function onChangeType() {
  const type = document.getElementById('item-type')?.value;
  const sel  = document.getElementById('item-ingredient');
  if (!sel) return;
  sel.innerHTML = '<option value=""></option>';
  listesDropdown.fullData.filter(d => d.type === type).forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.ingredient; opt.textContent = d.ingredient;
    sel.appendChild(opt);
  });
  const optNew = document.createElement('option');
  optNew.value = '__nouveau__'; optNew.textContent = '+ Nouvel ingrédient…';
  sel.appendChild(optNew);
}

function onChangeIngredient() {
  const sel   = document.getElementById('item-ingredient');
  const champ = document.getElementById('item-ingredient-nouveau');
  if (!sel || !champ) return;
  champ.classList.toggle('cache', sel.value !== '__nouveau__');

  const selFormat = document.getElementById('item-format');
  if (!selFormat) return;
  selFormat.innerHTML = '<option value="">— Choisir un format —</option>';
  const type = document.getElementById('item-type')?.value;
  const ing  = sel.value;
  if (!ing || ing === '__nouveau__') return;
  const item = listesDropdown.fullData.find(d => d.type === type && d.ingredient === ing);
  if (!item || !item.formats.length) return;
  item.formats.forEach(f => {
    const opt = document.createElement('option');
    opt.value = JSON.stringify(f);
    opt.textContent = f.contenant + ' ' + f.quantite + ' ' + f.unite;
    selFormat.appendChild(opt);
  });
}

function onChangeFormat() {
  const selFormat = document.getElementById('item-format');
  if (!selFormat || !selFormat.value) return;
  const f = JSON.parse(selFormat.value);
  document.getElementById('item-format-qte').value   = f.quantite;
  document.getElementById('item-format-unite').value = f.unite;
}

function wizardEtape1() {
  document.getElementById('wizard-step-1').classList.remove('cache');
  document.getElementById('wizard-step-2').classList.add('cache');
  document.getElementById('wizard-step-3').classList.add('cache');
  document.getElementById('wizard-etape-1').classList.add('active');
  document.getElementById('wizard-etape-1').classList.remove('complete');
  document.getElementById('wizard-etape-2').classList.remove('active', 'complete');
  document.getElementById('wizard-etape-3').classList.remove('active', 'complete');
}

async function wizardEtape2() {
  const numeroFacture = document.getElementById('facture-numero')?.value?.trim();
  const date          = document.getElementById('facture-date')?.value;
  let fournisseur     = document.getElementById('facture-fournisseur')?.value;
  if (fournisseur === '__nouveau__') {
    fournisseur = document.getElementById('facture-fournisseur-nouveau')?.value?.trim();
  }
  if (!numeroFacture || !date || !fournisseur) {
    afficherMsg('facture-msg', 'Numéro, date et fournisseur sont requis.', 'erreur');
    return;
  }

  if (!factureActive) {
    const res = await appelAPIPost('createInvoice', { numeroFacture, date, fournisseur });
    if (!res || !res.success) {
      afficherMsg('facture-msg', res?.message || 'Erreur lors de la création.', 'erreur');
      return;
    }
    factureActive = { numeroFacture, date, fournisseur };
    if (!listesDropdown.fournisseurs.includes(fournisseur)) {
      listesDropdown.fournisseurs.push(fournisseur);
      listesDropdown.fournisseurs.sort();
    }
  }

  document.getElementById('wizard-step-1').classList.add('cache');
  document.getElementById('wizard-step-2').classList.remove('cache');
  document.getElementById('wizard-step-3').classList.add('cache');
  document.getElementById('wizard-etape-1').classList.remove('active');
  document.getElementById('wizard-etape-1').classList.add('complete');
  document.getElementById('wizard-etape-2').classList.add('active');
  document.getElementById('wizard-etape-3').classList.remove('active', 'complete');
  afficherBanniereFacture();
  afficherItemsFacture();
}

function wizardEtape3() {
  if (produitsFacture.length === 0) {
    afficherMsg('item-msg', 'Ajoutez au moins un item avant de continuer.', 'erreur');
    return;
  }
  document.getElementById('wizard-step-1').classList.add('cache');
  document.getElementById('wizard-step-2').classList.add('cache');
  document.getElementById('wizard-step-3').classList.remove('cache');
  document.getElementById('wizard-etape-2').classList.remove('active');
  document.getElementById('wizard-etape-2').classList.add('complete');
  document.getElementById('wizard-etape-3').classList.add('active');
  const sousTotal = produitsFacture.reduce((s, i) => s + i.prixTotal, 0);
  document.getElementById('final-sous-total').value = sousTotal.toFixed(2);
  calculerTotalFinal();
}

function afficherBanniereFacture() {
  const banniere = document.getElementById('facture-banniere');
  if (!banniere || !factureActive) return;
  banniere.classList.remove('cache');
  const sousTotal = produitsFacture.reduce((s, i) => s + i.prixTotal, 0);
  document.getElementById('banniere-numero').textContent     = factureActive.numeroFacture;
  document.getElementById('banniere-fournisseur').textContent = factureActive.fournisseur;
  document.getElementById('banniere-sous-total').textContent  = formaterPrix(sousTotal);
}

async function ajouterItem() {
  if (!factureActive) {
    afficherMsg('item-msg', 'Aucune facture active.', 'erreur');
    return;
  }
  let ingredient = document.getElementById('item-ingredient')?.value;
  if (ingredient === '__nouveau__') {
    ingredient = document.getElementById('item-ingredient-nouveau')?.value?.trim();
  }
  const type        = document.getElementById('item-type')?.value;
  const formatQte   = document.getElementById('item-format-qte')?.value?.trim();
  const formatUnite = document.getElementById('item-format-unite')?.value;
  const prixUnit    = document.getElementById('item-prix-unitaire')?.value?.trim();
  const quantite    = document.getElementById('item-quantite')?.value?.trim();
  const notes       = document.getElementById('item-notes')?.value?.trim();

  if (!type || !ingredient || !formatQte || !prixUnit || !quantite) {
    afficherMsg('item-msg', 'Tous les champs obligatoires doivent être remplis.', 'erreur');
    return;
  }

const prixTotal = parseFloat(quantite) * parseFloat(prixUnit);

  // Calcul prix/g
  let prixParG = null;
  const cfg = listesDropdown.config?.[type];
  if (cfg && formatQte) {
    const qte      = parseFloat(formatQte);
    const densite  = cfg.densite || 1;
    const perte    = cfg.margePertePct || 0;
    let qteEnG     = cfg.unite === 'ml' ? qte * densite : qte;
    if (formatUnite === 'kg') qteEnG = qte * 1000;
    if (formatUnite === 'L')  qteEnG = qte * 1000 * densite;
    const qteUtile = qteEnG * (1 - perte / 100);
    prixParG = qteUtile > 0 ? parseFloat(prixUnit) / qteUtile : null;
  }

  const res = await appelAPIPost('addProduct', {
    numFacture:   factureActive.numeroFacture,
    date:         factureActive.date,
    fournisseur:  factureActive.fournisseur,
    type,
    ingredient,
    formatQte:    parseFloat(formatQte),
    formatUnite,
    prixUnitaire: parseFloat(prixUnit),
    prixParG:     prixParG,
    quantite:     parseFloat(quantite),
    notes:        notes || '',
    codeBarres:   ''
  });

  if (!res || !res.success) {
    afficherMsg('item-msg', res?.message || 'Erreur lors de l\'ajout.', 'erreur');
    return;
  }

  produitsFacture.push({ type, ingredient, formatQte, formatUnite, prixUnitaire: parseFloat(prixUnit), quantite: parseFloat(quantite), prixTotal });
  afficherMsg('item-msg', 'Item ajouté.', 'succes');
  reinitialiserFormulaireItem();
  afficherItemsFacture();
  afficherBanniereFacture();
}

function reinitialiserFormulaireItem() {
 ['item-type','item-ingredient','item-format-qte','item-format-unite','item-prix-unitaire','item-quantite','item-notes']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const champNouv = document.getElementById('item-ingredient-nouveau');
  if (champNouv) { champNouv.classList.add('cache'); champNouv.value = ''; }
  document.getElementById('item-ingredient').innerHTML = '<option value=""></option>';
  const selFormat = document.getElementById('item-format');
  if (selFormat) selFormat.innerHTML = '<option value="">— Choisir un format —</option>';
}

function afficherItemsFacture() {
  const zone = document.getElementById('items-tableau-zone');
  if (!zone) return;
  if (produitsFacture.length === 0) {
    zone.innerHTML = '<p class="vide-desc" style="padding:24px 0;">Aucun item pour l\'instant.</p>';
    return;
  }
  const sousTotal = produitsFacture.reduce((s, i) => s + i.prixTotal, 0);
  let html = `
    <div class="tableau-wrap">
      <table>
        <thead>
          <tr><th>Type</th><th>Ingrédient</th><th>Format</th><th>Prix unit.</th><th>Qté</th><th>Total</th></tr>
        </thead>
        <tbody>`;
  produitsFacture.forEach(item => {
    html += `
      <tr>
        <td>${item.type}</td>
        <td>${item.ingredient}</td>
        <td>${item.formatQte} ${item.formatUnite}</td>
        <td>${formaterPrix(item.prixUnitaire)}</td>
        <td>${item.quantite}</td>
        <td>${formaterPrix(item.prixTotal)}</td>
      </tr>`;
  });
  html += `</tbody></table></div>
    <div class="inv-total" style="margin-top:16px;">
      <div class="inv-total-label">Sous-total</div>
      <div class="inv-total-montant">${formaterPrix(sousTotal)}</div>
    </div>`;
  zone.innerHTML = html;
}

function calculerTotalFinal() {
  const sousTotal = parseFloat(document.getElementById('final-sous-total')?.value) || 0;
  const tps       = parseFloat(document.getElementById('final-tps')?.value)        || 0;
  const tvq       = parseFloat(document.getElementById('final-tvq')?.value)        || 0;
  const livraison = parseFloat(document.getElementById('final-livraison')?.value)  || 0;
  const affichage = document.getElementById('final-total-affichage');
  if (affichage) affichage.textContent = formaterPrix(sousTotal + tps + tvq + livraison);
}

async function finaliserFacture() {
  if (!factureActive) {
    afficherMsg('final-msg', 'Aucune facture active.', 'erreur');
    return;
  }
  if (produitsFacture.length === 0) {
    afficherMsg('final-msg', 'Aucun item à finaliser.', 'erreur');
    return;
  }
  const btnFinaliser = document.querySelector('.btn-finaliser');
  if (btnFinaliser) { btnFinaliser.disabled = true; btnFinaliser.innerHTML = '<span class="spinner"></span> Finalisation…'; }
  const sousTotal = parseFloat(document.getElementById('final-sous-total')?.value) || 0;
  const tps       = parseFloat(document.getElementById('final-tps')?.value)        || 0;
  const tvq       = parseFloat(document.getElementById('final-tvq')?.value)        || 0;
  const livraison = parseFloat(document.getElementById('final-livraison')?.value)  || 0;
  const res = await appelAPIPost('finalizeInvoice', {
    numeroFacture: factureActive.numeroFacture,
    sousTotal, tps, tvq, livraison
  });
 
if (!res || !res.success) {
    if (btnFinaliser) { btnFinaliser.disabled = false; btnFinaliser.innerHTML = 'Finaliser'; }
    afficherMsg('final-msg', res?.message || 'Erreur lors de la finalisation.', 'erreur');
    return;
  }
  afficherMsg('final-msg', `✓ Facture ${factureActive.numeroFacture} finalisée — Total : ${formaterPrix(res.total)}`, 'succes');
  setTimeout(() => {

     
     factureActive   = null;
    produitsFacture = [];
    wizardEtape1();
    document.getElementById('facture-numero').value = '';
    document.getElementById('facture-date').value   = new Date().toISOString().split('T')[0];
    document.getElementById('facture-fournisseur').value = '';
    document.getElementById('facture-banniere').classList.add('cache');
    document.getElementById('items-tableau-zone').innerHTML = '';
    document.getElementById('final-total-affichage').textContent = '0,00 $';
  }, 5000);
}
function validerConnexionAdmin() {
  const mdp = document.getElementById('input-mdp-admin').value;
  if (mdp === CONFIG.MOT_DE_PASSE) {
    sessionStorage.setItem('uc_admin', 'true');
    document.getElementById('ecran-connexion').classList.add('cache');
    chargerStatsAccueil();
    afficherSection('accueil', null);
  } else {
    document.getElementById('erreur-mdp-admin').textContent = 'Mot de passe incorrect.';
    document.getElementById('input-mdp-admin').value = '';
    document.getElementById('input-mdp-admin').focus();
  }
}

// ─── CONTENU DU SITE ───
async function chargerContenuSite() {
  const loading = document.getElementById('loading-contenu-site');
  const corps = document.getElementById('corps-contenu-site');
  if (loading) loading.classList.remove('cache');
  if (corps) corps.classList.add('cache');
  const data = await appelAPI('getContenu');
  if (loading) loading.classList.add('cache');
  if (!data || !data.success || !data.contenu) { afficherMsg('msg-contenu-site', 'Erreur de chargement.', 'erreur'); return; }
  const c = data.contenu;
  Object.keys(c).forEach(cle => {
    const el = document.getElementById('cs-' + cle);
    if (el) el.value = c[cle];
  });
  const btnSaisonnier = document.getElementById('btn-mode-saisonnier');
  if (btnSaisonnier) {
    const actif = c.mode_saisonnier === 'oui';
    btnSaisonnier.textContent = actif ? '🌲 Mode saisonnier ON' : '🌲 Mode saisonnier OFF';
    btnSaisonnier.classList.toggle('btn-primary', actif);
    btnSaisonnier.classList.toggle('btn-secondary', !actif);
  }
  if (corps) corps.classList.remove('cache');
}

async function toggleModeSaisonnier() {
  const res = await appelAPI('getContenu');
  if (!res || !res.success) return;
  const actuel = res.contenu.mode_saisonnier || 'non';
  const nouveau = actuel === 'oui' ? 'non' : 'oui';
  const data = await appelAPIPost('updateContenu', { contenu: { mode_saisonnier: nouveau } });
  if (data && data.success) {
    document.getElementById('btn-mode-saisonnier').textContent = nouveau === 'oui' ? '🌲 Mode saisonnier ON' : '🌲 Mode saisonnier OFF';
    document.getElementById('btn-mode-saisonnier').classList.toggle('btn-primary', nouveau === 'oui');
    document.getElementById('btn-mode-saisonnier').classList.toggle('btn-secondary', nouveau !== 'oui');
    afficherMsg('contenu-site', nouveau === 'oui' ? 'Mode saisonnier activé.' : 'Mode saisonnier désactivé.');
  }
}

async function sauvegarderContenuSite() {
  const corps = document.getElementById('corps-contenu-site');
  if (!corps) return;
  const contenu = {};
  corps.querySelectorAll('[id^="cs-"]').forEach(el => {
    const cle = el.id.replace('cs-', '');
    contenu[cle] = el.value;
  });
const data = await appelAPIPost('updateContenu', { contenu });
if (data && data.success) {
    afficherMsg('msg-contenu-site', 'Contenu sauvegardé.', 'succes');
  } else {
    afficherMsg('msg-contenu-site', 'Erreur lors de la sauvegarde.', 'erreur');
  }
}