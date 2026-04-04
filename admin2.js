/* ═══════════════════════════════════════
   UNIVERS CARESSE — admin2.js
   ═══════════════════════════════════════ */

// ─── CONFIGURATION ───

const GAS_URL_V2 = 'https://script.google.com/macros/s/AKfycbwwiGLwj8QJ6c5dGEtPEHUojzdbdncsTXnmEn-LJJxg7xBeckcbiCX1bvkMb3E3ba1FEA/exec';

// ─── APPELS API V2 ───

async function appelAPI_v2(action, params = {}) {
  try {
    const qs = new URLSearchParams({ action, v: '2', ...params }).toString();
    const res = await fetch(`${GAS_URL_V2}?${qs}`);
    return await res.json();
  } catch(e) {
    console.error('appelAPI_v2 erreur:', e);
    return null;
  }
}

async function appelAPIPost_v2(action, data = {}) {
  try {
    const res = await fetch(GAS_URL_V2, {
      method: 'POST',
      body: JSON.stringify({ action, v: '2', ...data })
    });
    return await res.json();
  } catch(e) {
    console.error('appelAPIPost_v2 erreur:', e);
    return null;
  }
}

// ─── FIN DU FICHIER ───