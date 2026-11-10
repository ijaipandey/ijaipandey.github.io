/* ============================================================
   ECO POP - "Green by design" one-time pop for House of Jai
   ------------------------------------------------------------
   HOW TO UPDATE THE NUMBER (about 1 minute, phone or laptop):
     1. Open  github.com/ijaipandey/ijaipandey.github.io
     2. Tap this file:  eco-pop.js
     3. Tap the pencil (Edit this file) icon
     4. Change ONLY the number on the line below
     5. Scroll down, tap the green "Commit changes" button
     The live site updates by itself in about 1 minute.

   The pop shows once per visitor. When you change the number,
   everyone who saw the old number sees the new one once again.

   Honesty note: this is an ESTIMATE from page weight, using the
   websitecarbon.com method (about 0.8 g CO2 per MB).
   This page is about 0.25 MB; the average web page is about
   2.4 MB, so each visit saves roughly 1.7 g CO2.
   ============================================================ */

const ECO_SAVED_CO2_GRAMS = 1.7; // <-- THE ONLY LINE TO EDIT

(function () {
  'use strict';

  try {
    var KEY = 'hjp.ecoPop';
    var DELAY_MS = 2200;   // wait after load so the pop never blocks the page
    var VISIBLE_MS = 3000; // fully visible for 3 seconds, as requested

    var seen = null;
    try { seen = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (seen && seen.v === ECO_SAVED_CO2_GRAMS) return; // already shown for this number

    function markSeen() {
      try { localStorage.setItem(KEY, JSON.stringify({ v: ECO_SAVED_CO2_GRAMS })); } catch (e) {}
    }

    function fmt(n) {
      return (Math.round(n * 10) / 10).toString();
    }

    var CSS = ''
      + '.hjp-eco-card{position:fixed;right:18px;bottom:18px;z-index:9999;max-width:300px;'
      + 'padding:14px 16px 12px;border-radius:18px;color:#ecfdf5;'
      + 'font-family:"DM Sans",system-ui,-apple-system,sans-serif;'
      + 'background:linear-gradient(135deg,rgba(6,38,28,.92),rgba(20,83,45,.92));'
      + 'border:1px solid rgba(134,239,172,.45);'
      + 'box-shadow:0 10px 40px rgba(0,0,0,.35),0 0 24px rgba(74,222,128,.25);'
      + '-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);'
      + 'opacity:0;pointer-events:auto;overflow:hidden}'
      + '.hjp-eco-card.hjp-eco-in{animation:hjpEcoIn .9s cubic-bezier(.2,1.4,.3,1) forwards}'
      + '.hjp-eco-card.hjp-eco-out{animation:hjpEcoOut .55s ease-in forwards}'
      + '.hjp-eco-card::before{content:"";position:absolute;inset:-40%;'
      + 'background:linear-gradient(115deg,transparent 35%,rgba(190,242,100,.28) 50%,transparent 65%);'
      + 'transform:translateX(-80%);pointer-events:none}'
      + '.hjp-eco-card.hjp-eco-in::before{animation:hjpEcoShine 1.6s ease .25s forwards}'
      + '.hjp-eco-title{font-family:"Fredoka","DM Sans",system-ui,sans-serif;font-weight:700;'
      + 'font-size:1.02rem;letter-spacing:.01em;display:flex;align-items:center;gap:7px;'
      + 'color:#bbf7d0;padding-right:22px}'
      + '.hjp-eco-leaf{display:inline-block;transform-origin:bottom center}'
      + '.hjp-eco-card.hjp-eco-in .hjp-eco-leaf{animation:hjpEcoLeaf 1.1s ease .35s}'
      + '.hjp-eco-line{margin-top:5px;font-size:.86rem;line-height:1.4;color:#d1fae5}'
      + '.hjp-eco-line b{color:#fde047;font-weight:700;white-space:nowrap}'
      + '.hjp-eco-note{margin-top:5px;font-size:.68rem;color:#a7f3d0;opacity:.75;letter-spacing:.02em}'
      + '.hjp-eco-close{position:absolute;top:6px;right:9px;border:0;background:transparent;'
      + 'color:#a7f3d0;font-size:1.05rem;line-height:1;cursor:pointer;padding:4px;opacity:.8}'
      + '.hjp-eco-close:hover{opacity:1;color:#fff}'
      + '.hjp-eco-close:focus-visible{outline:2px solid #fde047;outline-offset:1px;border-radius:6px}'
      + '@keyframes hjpEcoIn{0%{opacity:0;transform:translateY(28px) scale(.55) rotate(-5deg);filter:blur(8px)}'
      + '55%{opacity:1;transform:translateY(-5px) scale(1.05) rotate(1.5deg);filter:blur(0)}'
      + '100%{opacity:1;transform:none;filter:none}}'
      + '@keyframes hjpEcoOut{to{opacity:0;transform:translateY(-20px) scale(.82);filter:blur(5px)}}'
      + '@keyframes hjpEcoShine{to{transform:translateX(80%)}}'
      + '@keyframes hjpEcoLeaf{0%{transform:scale(0) rotate(-40deg)}60%{transform:scale(1.35) rotate(10deg)}100%{transform:scale(1) rotate(0)}}'
      + '@media (max-width:480px){.hjp-eco-card{right:12px;left:12px;bottom:14px;max-width:none}}'
      + '@media (prefers-reduced-motion:reduce){'
      + '.hjp-eco-card.hjp-eco-in{animation:none;opacity:1;transition:opacity .2s ease}'
      + '.hjp-eco-card.hjp-eco-out{animation:none;opacity:0;transition:opacity .2s ease}'
      + '.hjp-eco-card::before{display:none}'
      + '.hjp-eco-card.hjp-eco-in .hjp-eco-leaf{animation:none}}';

    function show() {
      if (!document.body || document.querySelector('.hjp-eco-card')) return;
      markSeen();

      var style = document.createElement('style');
      style.id = 'hjp-eco-style';
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);

      var card = document.createElement('div');
      card.className = 'hjp-eco-card';
      card.setAttribute('role', 'status');
      card.innerHTML =
        '<button type="button" class="hjp-eco-close" aria-label="Close">&times;</button>' +
        '<div class="hjp-eco-title"><span class="hjp-eco-leaf" aria-hidden="true">&#127793;</span>Green by design</div>' +
        '<div class="hjp-eco-line">This site saved <b>&asymp;' + fmt(ECO_SAVED_CO2_GRAMS) + ' g CO<sub>2</sub></b> per visit vs an average web page</div>' +
        '<div class="hjp-eco-note">estimate from page weight &middot; updated by Jai</div>';
      document.body.appendChild(card);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () { card.classList.add('hjp-eco-in'); });
      });

      var dismissed = false;
      function dismiss() {
        if (dismissed) return;
        dismissed = true;
        card.classList.remove('hjp-eco-in');
        card.classList.add('hjp-eco-out');
        setTimeout(function () { if (card.parentNode) card.parentNode.removeChild(card); }, 700);
      }

      // 3 fully-visible seconds start after the ~0.9s entrance finishes
      setTimeout(dismiss, 900 + VISIBLE_MS);
      card.querySelector('.hjp-eco-close').addEventListener('click', dismiss);
    }

    function arm() { setTimeout(show, DELAY_MS); }
    if (document.readyState === 'complete' || document.readyState === 'interactive') arm();
    else document.addEventListener('DOMContentLoaded', arm);
  } catch (e) {
    /* the eco pop must never break the page */
  }
})();
