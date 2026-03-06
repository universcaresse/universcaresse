/* ═══════════════════════════════════════
   UNIVERS CARESSE — main.js
   Mis à jour : 5 mars 2026
   ═══════════════════════════════════════ */
 
// ─── CONFIGURATION ───
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyDbcy6kBKcTWtj2B0kLfAioy9f2ShI0UtMPP1wg2K-xKUUDdIDONH_rbB_RCzu7lyhVw/exec',
  MOT_DE_PASSE: '2026'
};

// ─── COULEURS COLLECTIONS ───
const COULEURS_COLLECTIONS = {
  'SAPONICA':    ['#4a9b6f', '#2d7a50'],
  'PETIT NUAGE': ['#a8c8e0', '#6a9ab8'],
  'CAPRIN':      ['#e8d5a8', '#c4a96e'],
  'ÉMOLIA':      ['#d4a445', '#a87c28'],
  'ÉPURE':       ['#7a8c5a', '#4a5c32'],
  'KÉRYS':       ['#9b8ea0', '#6b5d72'],
  'CASA':        ['#d4a84b', '#a67c2a'],
  'LUMINA':      ['#5a5654', '#2e2c2a'],
  'ANIMA':       ['#c4845a', '#8a5230'],
  'LUI':         ['#8a6040', '#5a3820']
};

function couleurCollection(nom, hex) {
  if (hex && hex.trim()) return [hex.trim(), assombrirCouleur(hex.trim())];
  const cle = nom ? nom.toUpperCase() : '';
  return COULEURS_COLLECTIONS[cle] || ['#8b8680', '#5a5654'];
}
function assombrirCouleur(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = Math.max(0, parseInt(hex.substring(0,2), 16) - 40);
  const g = Math.max(0, parseInt(hex.substring(2,4), 16) - 40);
  const b = Math.max(0, parseInt(hex.substring(4,6), 16) - 40);
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}


// ─── ÉTAT ───
let adminConnecte = false;

// ─── INITIALISATION ───
document.addEventListener('DOMContentLoaded', () => {
  verifierSession();
  initNav();
  initSPA();
});

// ─── SPA — NAVIGATION PAR SECTIONS ───
function initSPA() {
  // Lire le hash ou défaut = accueil
  const hash = window.location.hash.replace('#', '') || 'accueil';
  afficherSection(hash);

  // Écouter les changements de hash (bouton retour navigateur)
  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'accueil';
    afficherSection(h);
  });
}

function afficherSection(id) {
  // Cacher toutes les sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Afficher la bonne
  const cible = document.getElementById('section-' + id);
  if (cible) {
    cible.classList.add('active');
  } else {
    // Fallback accueil
    const accueil = document.getElementById('section-accueil');
    if (accueil) accueil.classList.add('active');
  }

  // Mettre à jour les liens actifs dans le nav
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + id) a.classList.add('active');
  });

  // Fermer le menu mobile si ouvert
  const liens = document.getElementById('nav-links');
  if (liens) liens.classList.remove('ouvert');

  // Scroller vers le haut
  window.scrollTo(0, 0);

  // Charger le contenu dynamique selon la section
  if (id === 'accueil') {
    chargerCollections();
    chargerNbProduits();
  }
  if (id === 'catalogue') {
    chargerCatalogue();
  }
}

function naviguer(id) {
  window.location.hash = id;
}

// ─── SESSION ADMIN ───
function verifierSession() {
  const session = sessionStorage.getItem('uc_admin');
  if (session === 'true') {
    adminConnecte = true;
    afficherModeAdmin();
  }
}

function afficherConnexion() {
  document.getElementById('modal-connexion').classList.add('ouvert');
  setTimeout(() => document.getElementById('input-mdp').focus(), 100);
}

function fermerConnexion() {
  document.getElementById('modal-connexion').classList.remove('ouvert');
  document.getElementById('input-mdp').value = '';
  document.getElementById('erreur-connexion').style.display = 'none';
}

function fermerModalConnexion(e) {
  if (e.target === document.getElementById('modal-connexion')) fermerConnexion();
}

function validerConnexion() {
  const mdp = document.getElementById('input-mdp').value;
  if (mdp === CONFIG.MOT_DE_PASSE) {
    sessionStorage.setItem('uc_admin', 'true');
    window.location.href = '/univers-caresse/admin/';
  } else {
    document.getElementById('erreur-connexion').style.display = 'block';
    document.getElementById('input-mdp').value = '';
    document.getElementById('input-mdp').focus();
  }
}

function seDeconnecter() {
  adminConnecte = false;
  sessionStorage.removeItem('uc_admin');
  afficherModePublic();
  if (window.location.pathname.includes('/admin/')) {
    window.location.href = '../index.html';
  }
}

function afficherModeAdmin() {
  const btnConnexion  = document.getElementById('btn-connexion');
  const btnDeconnexion = document.getElementById('btn-deconnexion');
  const lienAdmin     = document.getElementById('nav-admin-link');
  if (btnConnexion)  btnConnexion.style.display  = 'none';
  if (btnDeconnexion) btnDeconnexion.style.display = 'inline-flex';
  if (lienAdmin)     lienAdmin.style.display     = 'list-item';
}

function afficherModePublic() {
  const btnConnexion  = document.getElementById('btn-connexion');
  const btnDeconnexion = document.getElementById('btn-deconnexion');
  const lienAdmin     = document.getElementById('nav-admin-link');
  if (btnConnexion)  btnConnexion.style.display  = 'inline-flex';
  if (btnDeconnexion) btnDeconnexion.style.display = 'none';
  if (lienAdmin)     lienAdmin.style.display     = 'none';
}

// ─── NAVIGATION MOBILE ───
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

function toggleMenu() {
  const liens = document.getElementById('nav-links');
  if (liens) liens.classList.toggle('ouvert');
}

// ─── APPEL APPS SCRIPT ───
async function appelAPI(action, params = {}) {
  try {
    const url = new URL(CONFIG.APPS_SCRIPT_URL);
    url.searchParams.set('action', action);
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
  } catch (err) {
    console.error('Erreur API:', err);
    return null;
  }
}

async function appelAPIPost(action, data = {}) {
  try {
    const payload = JSON.stringify({ action, ...data });
    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: 'POST',
      body: payload,
      redirect: 'follow'
    });
    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
  } catch (err) {
    console.error('Erreur API POST:', err);
    return null;
  }
}

// ─── UTILITAIRES ───
function formaterPrix(montant) {
  return parseFloat(montant).toFixed(2).replace('.', ',') + ' $';
}

function majuscules(texte) {
  return texte ? texte.toUpperCase() : '';
}

// ─── ACCUEIL — COLLECTIONS ───
async function chargerCollections() {
  try {
    const data = await appelAPI('getCollectionsPublic');
    if (!data || !data.success || !data.collections) { afficherCollectionsFallback(); return; }

    const strip = document.getElementById('collections-strip');
    const count = document.getElementById('collections-count');
    const statCol = document.getElementById('hero-stat-collections');
    if (count) count.textContent = data.collections.length + ' collections';
    if (statCol) statCol.textContent = data.collections.length;
    if (!strip) return;
    strip.innerHTML = '';

    data.collections.forEach(col => {
    const couleurs = couleurCollection(col.nom, col.couleur_hex);
      const lien = encodeURIComponent(col.nom);
      strip.innerHTML += `
        <a href="#catalogue" onclick="naviguer('catalogue')" class="collection-tile">
          <div class="collection-tile-bg" style="background: linear-gradient(135deg, ${couleurs[0]} 0%, ${couleurs[1]} 100%);"></div>
          <div class="collection-tile-overlay"></div>
          <div class="collection-tile-content">
            <span class="collection-tile-name">${col.nom}</span>
            <span class="collection-tile-slogan">${col.slogan || ''}</span>
          </div>
        </a>`;
    });
  } catch (err) {
    afficherCollectionsFallback();
  }
}

async function chargerNbProduits() {
  try {
    const data = await appelAPI('getRecettes', { t: Date.now() });
    if (!data || !data.recettes) return;
    const nb = data.recettes.filter(r => r.statut === 'public').length;
    const statProd = document.getElementById('hero-stat-produits');
    if (nb > 0 && statProd) statProd.textContent = nb + '+';
  } catch (err) {}
}

function afficherCollectionsFallback() {
  const collections = [
    { nom: 'Saponica',    slogan: 'Simplement la nature qui prend soin de vous' },
    { nom: 'Petit Nuage', slogan: 'Simplement la nature qui dorlote vos tout-petits' },
    { nom: 'Caprin',      slogan: 'Simplement la nature et la douceur de la chèvre' },
    { nom: 'Émolia',      slogan: 'Simplement la nature dédiée à votre bien-être' },
    { nom: 'Épure',       slogan: 'Simplement la nature qui prend soin de vos mains' },
    { nom: 'Kérys',       slogan: 'Simplement la nature qui dorlotte vos cheveux' },
    { nom: 'Casa',        slogan: 'Simplement la nature qui prend soin de votre maison' },
    { nom: 'Lumina',      slogan: 'Simplement la nature en lumière parfumée' },
    { nom: 'Anima',       slogan: 'Simplement la nature pour pattes et museaux' }
  ];
  const strip = document.getElementById('collections-strip');
  const count = document.getElementById('collections-count');
  if (count) count.textContent = collections.length + ' collections';
  if (!strip) return;
  strip.innerHTML = '';
  collections.forEach(col => {
    const couleurs = couleurCollection(col.nom);
    strip.innerHTML += `
      <a href="#catalogue" onclick="naviguer('catalogue')" class="collection-tile">
        <div class="collection-tile-bg" style="background: linear-gradient(135deg, ${couleurs[0]} 0%, ${couleurs[1]} 100%);"></div>
        <div class="collection-tile-overlay"></div>
        <div class="collection-tile-content">
          <span class="collection-tile-name">${col.nom}</span>
          <span class="collection-tile-slogan">${col.slogan}</span>
        </div>
      </a>`;
  });
}

// ─── CATALOGUE ───
async function chargerCatalogue() {
  const conteneur = document.getElementById('catalogue-contenu');
  if (!conteneur) return;
  conteneur.innerHTML = '<p style="padding:40px;color:var(--gris);">Chargement…</p>';
  try {
    const data = await appelAPI('getRecettes', { t: Date.now() });
    if (!data || !data.recettes) { conteneur.innerHTML = '<p style="padding:40px;">Aucun produit disponible.</p>'; return; }
    const publics = data.recettes.filter(r => r.statut === 'public');
    if (publics.length === 0) { conteneur.innerHTML = '<p style="padding:40px;">Aucun produit disponible.</p>'; return; }
    conteneur.innerHTML = publics.map(r => {
    const couleurs = couleurCollection(r.collection, r.couleur_hex);
      return `
        <div class="catalogue-carte">
          <div class="catalogue-carte-couleur" style="background: linear-gradient(135deg, ${couleurs[0]} 0%, ${couleurs[1]} 100%);"></div>
          <div class="catalogue-carte-info">
            <span class="catalogue-carte-collection">${r.collection || ''}</span>
            <span class="catalogue-carte-nom">${r.nom || ''}</span>
            <span class="catalogue-carte-ligne">${r.ligne || ''}</span>
          </div>
        </div>`;
    }).join('');
  } catch (err) {
    conteneur.innerHTML = '<p style="padding:40px;">Erreur de chargement.</p>';
  }
}

// ─── CONTACT ───
async function envoyerFormulaire() {
  const prenom   = document.getElementById('prenom')?.value.trim();
  const nom      = document.getElementById('nom')?.value.trim();
  const courriel = document.getElementById('courriel')?.value.trim();
  const sujet    = document.getElementById('sujet')?.value;
  const message  = document.getElementById('message')?.value.trim();

  const msgSucces = document.getElementById('msg-succes');
  const msgErreur = document.getElementById('msg-erreur');

  if (!prenom || !nom || !courriel || !message) {
    msgErreur.textContent = 'Veuillez remplir tous les champs obligatoires.';
    msgErreur.style.display = 'block';
    msgSucces.style.display = 'none';
    return;
  }

  const btn = document.getElementById('btn-envoyer');
  btn.disabled = true;
  btn.textContent = 'Envoi en cours…';

  try {
    const result = await appelAPIPost('envoyerContact', {
      prenom, nom, courriel,
      sujet: sujet || 'Non précisé',
      message
    });

    if (result && result.success) {
      msgSucces.style.display = 'block';
      msgErreur.style.display = 'none';
      document.getElementById('formulaire-contact').style.opacity = '0.4';
      document.getElementById('formulaire-contact').style.pointerEvents = 'none';
    } else {
      throw new Error('Échec envoi');
    }
  } catch (err) {
    msgErreur.textContent = 'Une erreur s\'est produite. Veuillez réessayer ou nous écrire directement.';
    msgErreur.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Envoyer le message';
  }
}
