/* ═══════════════════════════════════════
   UNIVERS CARESSE — style2.css
   Source unique — public + admin
   V2 — 2026-04-04
   ═══════════════════════════════════════ */

/* ═══════════════════════════════════════
   ROOT — SYSTÈME DE DESIGN COMPLET
   ═══════════════════════════════════════ */

:root {

  /* ─── COULEURS DE BASE ─── */
  --primary:        #5a8a3a;
  --primary-dark:   #4a6e2e;
  --accent:         #d4a445;
  --danger:         #c44536;
  --blanc:          #f9f7f4;
  --beige:          #e8dcc8;
  --gris:           #8b8680;
  --gris-fonce:     #3d3b39;
  --noir:           #1a1917;
  --logo:           #333333;

  /* ─── OPACITÉS — PRIMARY ─── */
  --primary-04:  rgba(90,138,58,0.04);
  --primary-05:  rgba(90,138,58,0.05);
  --primary-06:  rgba(90,138,58,0.06);
  --primary-08:  rgba(90,138,58,0.08);
  --primary-10:  rgba(90,138,58,0.10);
  --primary-12:  rgba(90,138,58,0.12);
  --primary-15:  rgba(90,138,58,0.15);
  --primary-18:  rgba(90,138,58,0.18);
  --primary-20:  rgba(90,138,58,0.20);
  --primary-30:  rgba(90,138,58,0.30);
  --primary-40:  rgba(90,138,58,0.40);
  --primary-50:  rgba(90,138,58,0.50);
  --primary-60:  rgba(90,138,58,0.60);
  --primary-70:  rgba(90,138,58,0.70);
  --primary-75:  rgba(90,138,58,0.75);
  --primary-80:  rgba(90,138,58,0.80);
  --primary-85:  rgba(90,138,58,0.85);
  --primary-90:  rgba(90,138,58,0.90);

  /* ─── OPACITÉS — ACCENT ─── */
  --accent-04:   rgba(212,164,69,0.04);
  --accent-08:   rgba(212,164,69,0.08);
  --accent-10:   rgba(212,164,69,0.10);
  --accent-12:   rgba(212,164,69,0.12);
  --accent-15:   rgba(212,164,69,0.15);
  --accent-20:   rgba(212,164,69,0.20);
  --accent-30:   rgba(212,164,69,0.30);
  --accent-40:   rgba(212,164,69,0.40);
  --accent-50:   rgba(212,164,69,0.50);
  --accent-60:   rgba(212,164,69,0.60);
  --accent-70:   rgba(212,164,69,0.70);
  --accent-75:   rgba(212,164,69,0.75);
  --accent-80:   rgba(212,164,69,0.80);
  --accent-85:   rgba(212,164,69,0.85);
  --accent-90:   rgba(212,164,69,0.90);

  /* ─── OPACITÉS — DANGER ─── */
  --danger-04:   rgba(196,69,54,0.04);
  --danger-06:   rgba(196,69,54,0.06);
  --danger-08:   rgba(196,69,54,0.08);
  --danger-10:   rgba(196,69,54,0.10);
  --danger-15:   rgba(196,69,54,0.15);
  --danger-20:   rgba(196,69,54,0.20);
  --danger-30:   rgba(196,69,54,0.30);
  --danger-40:   rgba(196,69,54,0.40);
  --danger-50:   rgba(196,69,54,0.50);
  --danger-60:   rgba(196,69,54,0.60);
  --danger-70:   rgba(196,69,54,0.70);
  --danger-80:   rgba(196,69,54,0.80);
  --danger-90:   rgba(196,69,54,0.90);

  /* ─── OPACITÉS — BEIGE ─── */
  --beige-08:    rgba(232,220,200,0.08);
  --beige-10:    rgba(232,220,200,0.10);
  --beige-15:    rgba(232,220,200,0.15);
  --beige-20:    rgba(232,220,200,0.20);
  --beige-30:    rgba(232,220,200,0.30);
  --beige-40:    rgba(232,220,200,0.40);
  --beige-50:    rgba(232,220,200,0.50);
  --beige-60:    rgba(232,220,200,0.60);
  --beige-70:    rgba(232,220,200,0.70);
  --beige-80:    rgba(232,220,200,0.80);
  --beige-90:    rgba(232,220,200,0.90);

  /* ─── OPACITÉS — GRIS ─── */
  --gris-08:     rgba(139,134,128,0.08);
  --gris-10:     rgba(139,134,128,0.10);
  --gris-15:     rgba(139,134,128,0.15);
  --gris-20:     rgba(139,134,128,0.20);
  --gris-30:     rgba(139,134,128,0.30);
  --gris-40:     rgba(139,134,128,0.40);
  --gris-50:     rgba(139,134,128,0.50);
  --gris-60:     rgba(139,134,128,0.60);
  --gris-70:     rgba(139,134,128,0.70);
  --gris-80:     rgba(139,134,128,0.80);
  --gris-90:     rgba(139,134,128,0.90);

  /* ─── OPACITÉS — GRIS FONCÉ ─── */
  --gris-fonce-08:  rgba(61,59,57,0.08);
  --gris-fonce-10:  rgba(61,59,57,0.10);
  --gris-fonce-15:  rgba(61,59,57,0.15);
  --gris-fonce-20:  rgba(61,59,57,0.20);
  --gris-fonce-30:  rgba(61,59,57,0.30);
  --gris-fonce-40:  rgba(61,59,57,0.40);
  --gris-fonce-50:  rgba(61,59,57,0.50);
  --gris-fonce-60:  rgba(61,59,57,0.60);
  --gris-fonce-70:  rgba(61,59,57,0.70);
  --gris-fonce-80:  rgba(61,59,57,0.80);
  --gris-fonce-90:  rgba(61,59,57,0.90);

  /* ─── OPACITÉS — NOIR ─── */
  --noir-08:     rgba(0,0,0,0.08);
  --noir-10:     rgba(0,0,0,0.10);
  --noir-15:     rgba(0,0,0,0.15);
  --noir-20:     rgba(0,0,0,0.20);
  --noir-30:     rgba(0,0,0,0.30);
  --noir-40:     rgba(0,0,0,0.40);
  --noir-50:     rgba(0,0,0,0.50);
  --noir-60:     rgba(0,0,0,0.60);
  --noir-70:     rgba(0,0,0,0.70);
  --noir-80:     rgba(0,0,0,0.80);
  --noir-90:     rgba(0,0,0,0.90);

  /* ─── OPACITÉS — BLANC PUR ─── */
  --blanc-pur-08:  rgba(255,255,255,0.08);
  --blanc-pur-10:  rgba(255,255,255,0.10);
  --blanc-pur-15:  rgba(255,255,255,0.15);
  --blanc-pur-20:  rgba(255,255,255,0.20);
  --blanc-pur-30:  rgba(255,255,255,0.30);
  --blanc-pur-40:  rgba(255,255,255,0.40);
  --blanc-pur-50:  rgba(255,255,255,0.50);
  --blanc-pur-60:  rgba(255,255,255,0.60);
  --blanc-pur-70:  rgba(255,255,255,0.70);
  --blanc-pur-75:  rgba(255,255,255,0.75);
  --blanc-pur-80:  rgba(255,255,255,0.80);
  --blanc-pur-85:  rgba(255,255,255,0.85);
  --blanc-pur-90:  rgba(255,255,255,0.90);

  /* ─── TYPOGRAPHIE — FAMILLES ─── */
  --font-titre:     'Playfair Display', serif;
  --font-corps:     'DM Sans', sans-serif;
  --font-cursive:   'Birthstone', cursive;

  /* ─── TYPOGRAPHIE — TAILLES T1 à T7 ─── */
  --t1: clamp(2.5rem, 4vw, 4rem);      /* Grand titre hero */
  --t2: clamp(2.2rem, 3.5vw, 3.2rem);  /* Titre page */
  --t3: 2rem;                           /* Titre section */
  --t4: 1.6rem;                         /* Titre modal / accueil */
  --t5: 1.3rem;                         /* Titre carte / tuile */
  --t6: 1.05rem;                        /* Corps de texte */
  --t7: 0.85rem;                        /* Texte secondaire */
  --t8: 0.75rem;                        /* Labels, nav, badges */
  --t9: 0.62rem;                        /* Micro labels, sidebar */

  /* ─── TYPOGRAPHIE — LINE-HEIGHT ─── */
  --lh-titre:  1.1;   /* Titres serrés */
  --lh-sous:   1.3;   /* Sous-titres */
  --lh-corps:  1.9;   /* Corps de texte aéré */
  --lh-dense:  1.6;   /* Texte dense */
  --lh-label:  1.2;   /* Labels courts */

  /* ─── TYPOGRAPHIE — LETTER-SPACING ─── */
  --ls-titre:  0.03em;  /* Titres Playfair */
  --ls-nav:    0.10em;  /* Navigation */
  --ls-label:  0.12em;  /* Labels boutons */
  --ls-badge:  0.15em;  /* Badges, tableaux */
  --ls-eyebrow:0.25em;  /* Eyebrows, sur-titres */

  /* ─── MISE EN PAGE ─── */
  --nav-h:      72px;
  --sidebar-w:  220px;

  /* ─── ESPACEMENTS — PAR APPAREIL ─── */
  --padding-ordi:         80px;   /* 1200px+ */
  --padding-ipad-paysage: 56px;   /* ~1024px */
  --padding-ipad-portrait:40px;   /* ~768px  */
  --padding-mobile:       20px;   /* ~390px  */

  /* ─── GAPS ─── */
  --gap-sm:   16px;
  --gap-md:   24px;
  --gap-lg:   48px;
  --gap-xl:   80px;

  /* ─── BREAKPOINTS ─── */
  --bp-ordi:          1200px;
  --bp-ipad-paysage:  1024px;
  --bp-ipad-portrait:  768px;
  --bp-mobile:          390px;

  /* ─── TRANSITIONS ─── */
  --tr-rapide:   0.15s ease;   /* Hover instantané */
  --tr-normal:   0.2s ease;    /* Standard */
  --tr-moyen:    0.3s ease;    /* Dropdowns, panels */
  --tr-lent:     0.5s ease;    /* Images, zooms */
  --tr-tres-lent:0.8s ease;    /* Animations d'entrée */
  --tr-fade:     1.8s ease;    /* Fade-in de page */

}