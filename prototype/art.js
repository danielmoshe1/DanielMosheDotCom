/* =========================================================
   Orenj — illustrated art kit (hand-built SVG)
   Pip the citrus sprite, audience characters, scenery.
   All vector, animation-studio styling via gradients +
   layered shapes. No external images.
   ========================================================= */
"use strict";

const ART = {};

/* ---------- Pip: the guide character ---------- */
/* A round little orange sprite with a leaf sprout, big
   expressive eyes and rosy cheeks. mood drives eyes+mouth. */
ART.pip = function (mood = "happy") {
  let eyes, mouth, brows = "", extra = "";

  const eyeWhite = (cx) => `<ellipse cx="${cx}" cy="98" rx="17" ry="20" fill="#fffdf7"/>`;
  const sparkle = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="3.4" fill="#fff"/>`;

  switch (mood) {
    case "cheer":
      eyes = `
        <path d="M55 100 q14 -20 28 0" stroke="#3a2412" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M117 100 q14 -20 28 0" stroke="#3a2412" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      mouth = `<path d="M74 128 q26 34 52 0 q-26 14 -52 0Z" fill="#7a2e1e"/>
               <path d="M88 140 q12 10 24 0Z" fill="#ff7a8a"/>`;
      extra = `<g class="pip-spark">
                 <path d="M30 60 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4Z" fill="#ffe66d"/>
                 <path d="M168 70 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#fff4b0"/>
               </g>`;
      break;
    case "wow":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="72" cy="100" r="9" fill="#2a1a10"/>
              <circle cx="132" cy="100" r="9" fill="#2a1a10"/>
              ${sparkle(75, 95)}${sparkle(135, 95)}`;
      mouth = `<ellipse cx="100" cy="132" rx="16" ry="19" fill="#7a2e1e"/>
               <ellipse cx="100" cy="140" rx="9" ry="8" fill="#ff7a8a"/>`;
      brows = `<path d="M52 70 q18 -8 34 -2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>
               <path d="M114 68 q18 -6 34 2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      break;
    case "think":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="74" cy="92" r="8" fill="#2a1a10"/>
              <circle cx="134" cy="92" r="8" fill="#2a1a10"/>
              ${sparkle(77, 88)}${sparkle(137, 88)}`;
      mouth = `<path d="M82 134 q18 -6 34 2" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      brows = `<path d="M52 74 q18 -10 32 -2" stroke="#3a2412" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      extra = `<text x="150" y="56" font-size="34" class="pip-think">?</text>`;
      break;
    case "encourage":
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="71" cy="100" r="8" fill="#2a1a10"/>
              <circle cx="131" cy="100" r="8" fill="#2a1a10"/>
              ${sparkle(74, 96)}${sparkle(134, 96)}`;
      mouth = `<path d="M78 130 q22 16 44 0" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
      break;
    default: // happy
      eyes = `${eyeWhite(70)}${eyeWhite(130)}
              <circle cx="72" cy="101" r="9" fill="#2a1a10"/>
              <circle cx="132" cy="101" r="9" fill="#2a1a10"/>
              ${sparkle(75, 96)}${sparkle(135, 96)}`;
      mouth = `<path d="M76 126 q24 24 48 0" stroke="#7a2e1e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }

  return `
  <svg class="pip mood-${mood}" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="pipBody" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stop-color="#ffd27a"/>
        <stop offset="42%" stop-color="#ff9f29"/>
        <stop offset="100%" stop-color="#ec6a00"/>
      </radialGradient>
      <linearGradient id="pipLeaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#7ed957"/>
        <stop offset="100%" stop-color="#2f9e44"/>
      </linearGradient>
    </defs>
    <ellipse class="pip-shadow" cx="100" cy="206" rx="52" ry="10" fill="rgba(40,20,0,.25)"/>
    <g class="pip-body">
      <!-- sprout -->
      <path d="M100 34 C96 8 78 6 70 14 C84 16 90 28 96 40Z" fill="url(#pipLeaf)"/>
      <path d="M100 36 C104 10 124 6 132 16 C116 18 110 30 104 42Z" fill="url(#pipLeaf)"/>
      <rect x="96" y="34" width="8" height="20" rx="4" fill="#3f7d2f"/>
      <!-- body -->
      <circle cx="100" cy="118" r="80" fill="url(#pipBody)"/>
      <circle cx="100" cy="118" r="80" fill="none" stroke="#c85700" stroke-width="2.5" opacity=".5"/>
      <!-- dimple texture -->
      <g fill="#e8720a" opacity=".25">
        <circle cx="60" cy="150" r="3"/><circle cx="140" cy="150" r="3"/>
        <circle cx="100" cy="178" r="3"/><circle cx="48" cy="110" r="3"/><circle cx="152" cy="112" r="3"/>
      </g>
      <!-- arms -->
      <path class="pip-arm-l" d="M28 132 q-18 6 -22 26 q14 -6 26 -10Z" fill="#ef7a00"/>
      <path class="pip-arm-r" d="M172 132 q18 6 22 26 q-14 -6 -26 -10Z" fill="#ef7a00"/>
      <!-- feet -->
      <ellipse cx="74" cy="196" rx="16" ry="9" fill="#d96200"/>
      <ellipse cx="126" cy="196" rx="16" ry="9" fill="#d96200"/>
      <!-- cheeks -->
      <ellipse cx="58" cy="122" rx="13" ry="9" fill="#ff7a8a" opacity=".55"/>
      <ellipse cx="142" cy="122" rx="13" ry="9" fill="#ff7a8a" opacity=".55"/>
      ${brows}${eyes}${mouth}
    </g>
    ${extra}
  </svg>`;
};

/* ---------- Audience characters (circular portrait) ---------- */
ART.audience = function (kind = "abstract") {
  const frame = (inner, bg, ring) => `
    <svg class="aud" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="audClip"><circle cx="100" cy="100" r="92"/></clipPath>
        ${bg}
      </defs>
      <circle cx="100" cy="100" r="96" fill="${ring}"/>
      <g clip-path="url(#audClip)">${inner}</g>
      <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3"/>
    </svg>`;

  switch (kind) {
    case "alien":
      return frame(`
        <radialGradient id="agA" cx="50%" cy="30%" r="80%"><stop offset="0%" stop-color="#3b2f6b"/><stop offset="100%" stop-color="#140e2e"/></radialGradient>
        <rect width="200" height="200" fill="url(#agA)"/>
        <g fill="#fff"><circle cx="40" cy="44" r="2"/><circle cx="160" cy="38" r="2.4"/><circle cx="150" cy="150" r="1.8"/><circle cx="56" cy="150" r="2"/><circle cx="100" cy="30" r="1.6"/></g>
        <ellipse cx="100" cy="120" rx="46" ry="52" fill="#76e0a1"/>
        <ellipse cx="100" cy="106" rx="52" ry="46" fill="#8af0b3"/>
        <path d="M78 64 q-8 -34 6 -42" stroke="#8af0b3" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M122 64 q8 -34 -6 -42" stroke="#8af0b3" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="80" cy="56" r="5" fill="#bdf7ce"/><circle cx="120" cy="56" r="5" fill="#bdf7ce"/>
        <ellipse cx="82" cy="104" rx="14" ry="20" fill="#10131f" transform="rotate(-12 82 104)"/>
        <ellipse cx="118" cy="104" rx="14" ry="20" fill="#10131f" transform="rotate(12 118 104)"/>
        <circle cx="86" cy="96" r="4" fill="#fff"/><circle cx="122" cy="96" r="4" fill="#fff"/>
        <path d="M86 138 q14 10 28 0" stroke="#2f8f5b" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        "", "#2a2150");
    case "robot":
      return frame(`
        <linearGradient id="agR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c4a5a"/><stop offset="100%" stop-color="#0b2530"/></linearGradient>
        <rect width="200" height="200" fill="url(#agR)"/>
        <rect x="92" y="22" width="16" height="22" rx="6" fill="#7fd3e6"/><circle cx="100" cy="20" r="7" fill="#ffe66d"/>
        <rect x="52" y="56" width="96" height="92" rx="20" fill="#c9d6dd"/>
        <rect x="52" y="56" width="96" height="92" rx="20" fill="none" stroke="#8aa0ab" stroke-width="3"/>
        <rect x="64" y="78" width="72" height="40" rx="10" fill="#10242c"/>
        <rect x="74" y="90" width="16" height="16" rx="4" fill="#5ee0ff" class="bot-eye"/>
        <rect x="110" y="90" width="16" height="16" rx="4" fill="#5ee0ff" class="bot-eye"/>
        <g stroke="#5b6f78" stroke-width="4" stroke-linecap="round"><line x1="72" y1="132" x2="80" y2="132"/><line x1="90" y1="132" x2="98" y2="132"/><line x1="108" y1="132" x2="116" y2="132"/><line x1="126" y1="132" x2="134" y2="132"/></g>`,
        "", "#10343f");
    case "animal":
      return frame(`
        <linearGradient id="agAn" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd9a0"/><stop offset="100%" stop-color="#f6a14f"/></linearGradient>
        <rect width="200" height="200" fill="url(#agAn)"/>
        <path d="M52 70 L40 30 L82 58Z" fill="#d9772e"/><path d="M148 70 L160 30 L118 58Z" fill="#d9772e"/>
        <ellipse cx="100" cy="116" rx="56" ry="50" fill="#f08a3c"/>
        <ellipse cx="100" cy="138" rx="38" ry="34" fill="#fff1dc"/>
        <circle cx="80" cy="104" r="9" fill="#2a1a10"/><circle cx="120" cy="104" r="9" fill="#2a1a10"/>
        <circle cx="83" cy="101" r="3" fill="#fff"/><circle cx="123" cy="101" r="3" fill="#fff"/>
        <path d="M92 126 q8 8 16 0Z" fill="#2a1a10"/>
        <path d="M100 134 v8 M100 142 q-10 8 -20 4 M100 142 q10 8 20 4" stroke="#a9622c" stroke-width="3" fill="none" stroke-linecap="round"/>`,
        "", "#c9742e");
    case "fish":
      return frame(`
        <linearGradient id="agF" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2aa6c9"/><stop offset="100%" stop-color="#0e5f80"/></linearGradient>
        <rect width="200" height="200" fill="url(#agF)"/>
        <g fill="#bfe9f5" opacity=".5"><circle cx="40" cy="50" r="6"/><circle cx="58" cy="34" r="4"/><circle cx="150" cy="150" r="5"/><circle cx="168" cy="120" r="3"/></g>
        <path d="M150 100 l34 -24 v48Z" fill="#ff9f4a"/>
        <ellipse cx="92" cy="104" rx="58" ry="44" fill="#ffb84d"/>
        <path d="M70 64 q24 -18 44 0Z" fill="#ff9f4a"/>
        <circle cx="74" cy="98" r="13" fill="#fff"/><circle cx="76" cy="100" r="7" fill="#1a2a30"/><circle cx="79" cy="96" r="2.5" fill="#fff"/>
        <path d="M40 110 q-12 6 0 14" stroke="#e07c1f" stroke-width="5" fill="none" stroke-linecap="round"/>`,
        "", "#0c4a63");
    case "ancient":
      return frame(`
        <linearGradient id="agK" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#caa46a"/><stop offset="100%" stop-color="#8a6a3a"/></linearGradient>
        <rect width="200" height="200" fill="url(#agK)"/>
        <path d="M64 60 q36 -30 72 0 v18 H64Z" fill="#b5bcc4"/>
        <rect x="64" y="74" width="72" height="78" rx="14" fill="#cdd4db"/>
        <rect x="96" y="60" width="8" height="56" fill="#aab2ba"/>
        <path d="M98 36 l6 0 4 22 -14 0Z" fill="#e23b3b"/>
        <rect x="72" y="104" width="22" height="14" rx="4" fill="#10131a"/>
        <rect x="106" y="104" width="22" height="14" rx="4" fill="#10131a"/>
        <path d="M86 138 q14 8 28 0" stroke="#6a4f2a" stroke-width="4" fill="none" stroke-linecap="round"/>`,
        "", "#7a5c30");
    case "child":
      return frame(`
        <radialGradient id="agC" cx="50%" cy="35%" r="80%"><stop offset="0%" stop-color="#ffe6c2"/><stop offset="100%" stop-color="#ffd29e"/></radialGradient>
        <rect width="200" height="200" fill="#ffefd6"/>
        <circle cx="100" cy="112" r="62" fill="url(#agC)"/>
        <path d="M44 96 q4 -56 56 -58 q52 2 56 58 q-18 -28 -56 -28 q-38 0 -56 28Z" fill="#7a4a22"/>
        <circle cx="76" cy="110" r="10" fill="#2a1a10"/><circle cx="124" cy="110" r="10" fill="#2a1a10"/>
        <circle cx="79" cy="106" r="3.5" fill="#fff"/><circle cx="127" cy="106" r="3.5" fill="#fff"/>
        <ellipse cx="64" cy="128" rx="11" ry="8" fill="#ff9aa8" opacity=".6"/><ellipse cx="136" cy="128" rx="11" ry="8" fill="#ff9aa8" opacity=".6"/>
        <path d="M80 136 q20 22 40 0" stroke="#9c3b2e" stroke-width="6" fill="none" stroke-linecap="round"/>`,
        "", "#f2c48c");
    default: // abstract — a swirling idea
      return frame(`
        <radialGradient id="agX" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#3a2c66"/><stop offset="100%" stop-color="#160f2c"/></radialGradient>
        <rect width="200" height="200" fill="url(#agX)"/>
        <g class="abstract-swirl">
          <path d="M100 100 m-58 0 a58 58 0 1 1 116 0" stroke="#ff8c1a" stroke-width="6" fill="none" stroke-linecap="round" opacity=".9"/>
          <path d="M100 100 m-38 0 a38 38 0 1 0 76 0" stroke="#b98aff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
          <path d="M100 100 m-18 0 a18 18 0 1 1 36 0" stroke="#5ab1ff" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>
        <g fill="#fff"><circle cx="100" cy="100" r="5"/><circle cx="44" cy="60" r="2"/><circle cx="156" cy="140" r="2"/></g>`,
        "", "#241a44");
  }
};

/* ---------- decorative silhouettes for the world ---------- */
ART.mountainLayer = function (fill) {
  return `<svg viewBox="0 0 1000 240" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 240 L0 150 L120 60 L220 140 L340 40 L470 150 L600 70 L740 160 L860 80 L1000 150 L1000 240Z" fill="${fill}"/>
  </svg>`;
};
ART.hillLayer = function (fill) {
  return `<svg viewBox="0 0 1000 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 200 L0 120 Q250 40 500 120 T1000 120 L1000 200Z" fill="${fill}"/>
  </svg>`;
};
ART.cloud = function () {
  return `<svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
    <g fill="rgba(255,255,255,.85)"><ellipse cx="60" cy="55" rx="46" ry="28"/><ellipse cx="110" cy="45" rx="54" ry="34"/><ellipse cx="150" cy="58" rx="40" ry="24"/></g>
  </svg>`;
};
