/* ============================================================
   ECO POP + BADGE - "Jai's Green Impact" for House of Jai
   ------------------------------------------------------------
   HOW TO UPDATE THE NUMBER (about 1 minute, phone or laptop):
     1. Open  github.com/ijaipandey/ijaipandey.github.io
     2. Tap this file:  eco-pop.js
     3. Tap the pencil (Edit this file) icon
     4. Change ONLY the number on the line below
     5. Scroll down, tap the green "Commit changes" button
     The live site updates by itself in about 1 minute.
     The pop-up AND the permanent badge both use this one number.

   The pop shows once per visitor. When you change the number,
   everyone who saw the old number sees the new one once again.

   Honesty note: this is an ESTIMATE from page weight, using the
   websitecarbon.com method (about 0.8 g CO2 per MB).
   This page is about 0.25 MB; the average web page is about
   2.4 MB, so each visit saves roughly 1.7 g CO2 vs average.
   ============================================================ */

const ECO_SAVED_CO2_GRAMS = 1.7; // <-- THE ONLY LINE TO EDIT

(function () {
  'use strict';

  try {
    var KEY = 'hjp.ecoPop';
    var DELAY_MS = 2200;   // pop wait after load so it never blocks the page
    var VISIBLE_MS = 3000; // pop fully visible for 3 seconds, as requested

    var seen = null;
    try { seen = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    var showPop = !(seen && seen.v === ECO_SAVED_CO2_GRAMS);

    function markSeen() {
      try { localStorage.setItem(KEY, JSON.stringify({ v: ECO_SAVED_CO2_GRAMS })); } catch (e) {}
    }

    function fmt(n) { return (Math.round(n * 10) / 10).toString(); }

    var CSS = ''
      /* ---------- shared ---------- */
      + '.hjp-eco-card,.hjp-eco-badge{font-family:"DM Sans",system-ui,-apple-system,sans-serif;'
      + 'color:#ecfdf5;background:linear-gradient(135deg,rgba(6,38,28,.92),rgba(20,83,45,.92));'
      + 'border:1px solid rgba(134,239,172,.45);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}'
      /* ---------- pop card ---------- */
      + '.hjp-eco-card{position:fixed;right:18px;bottom:18px;z-index:9999;max-width:310px;'
      + 'padding:16px 18px 13px;border-radius:20px;overflow:visible;'
      + 'box-shadow:0 12px 44px rgba(0,0,0,.35),0 0 28px rgba(74,222,128,.28),inset 0 1px 0 rgba(187,247,208,.25);'
      + 'opacity:0;pointer-events:auto}'
      + '.hjp-eco-card.hjp-eco-in{animation:hjpEcoIn .95s cubic-bezier(.2,1.4,.3,1) forwards}'
      + '.hjp-eco-card.hjp-eco-out{animation:hjpEcoOut .55s ease-in forwards}'
      + '.hjp-eco-card::before{content:"";position:absolute;inset:-40%;border-radius:inherit;'
      + 'background:linear-gradient(115deg,transparent 35%,rgba(190,242,100,.30) 50%,transparent 65%);'
      + 'transform:translateX(-80%);pointer-events:none;overflow:hidden}'
      + '.hjp-eco-card.hjp-eco-in::before{animation:hjpEcoShine 1.7s ease .3s forwards}'
      + '.hjp-eco-title{font-family:"Fredoka","DM Sans",system-ui,sans-serif;font-weight:700;'
      + 'font-size:1.05rem;letter-spacing:.01em;display:flex;align-items:center;gap:7px;'
      + 'color:#bbf7d0;padding-right:22px;text-shadow:0 0 14px rgba(74,222,128,.45)}'
      + '.hjp-eco-leaf{display:inline-block;transform-origin:bottom center;filter:drop-shadow(0 0 6px rgba(134,239,172,.8))}'
      + '.hjp-eco-card.hjp-eco-in .hjp-eco-leaf{animation:hjpEcoLeaf 1.15s ease .35s}'
      + '.hjp-eco-line{margin-top:6px;font-size:.9rem;line-height:1.45;color:#d1fae5}'
      + '.hjp-eco-line b{color:#fde047;font-weight:700;white-space:nowrap;text-shadow:0 0 12px rgba(253,224,71,.4)}'
      + '.hjp-eco-note{margin-top:6px;font-size:.68rem;color:#a7f3d0;opacity:.78;letter-spacing:.02em}'
      + '.hjp-eco-close{position:absolute;top:7px;right:10px;border:0;background:transparent;'
      + 'color:#a7f3d0;font-size:1.05rem;line-height:1;cursor:pointer;padding:4px;opacity:.8;z-index:2}'
      + '.hjp-eco-close:hover{opacity:1;color:#fff}'
      + '.hjp-eco-close:focus-visible{outline:2px solid #fde047;outline-offset:1px;border-radius:6px}'
      /* ---------- glowing particles ---------- */
      + '.hjp-eco-p{position:absolute;left:50%;top:55%;border-radius:50%;pointer-events:none;'
      + 'background:radial-gradient(circle,#d9f99d 0%,rgba(74,222,128,.9) 40%,rgba(74,222,128,0) 70%);'
      + 'box-shadow:0 0 8px rgba(74,222,128,.9);opacity:0;'
      + 'width:var(--s);height:var(--s);animation:hjpEcoP 1.25s cubic-bezier(.15,.8,.3,1) var(--d) forwards}'
      + '@keyframes hjpEcoP{0%{opacity:0;transform:translate(-50%,-50%) scale(.3)}'
      + '18%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.15)}}'
      /* ---------- permanent badge ---------- */
      + '.hjp-eco-badge{position:fixed;left:14px;bottom:14px;z-index:9998;max-width:calc(100vw - 28px);'
      + 'padding:7px 12px;border-radius:999px;font-size:.72rem;letter-spacing:.02em;color:#bbf7d0;'
      + 'box-shadow:0 4px 18px rgba(0,0,0,.25),0 0 14px rgba(74,222,128,.18);'
      + 'opacity:0;transform:translateY(8px);transition:opacity .7s ease,transform .7s ease;pointer-events:auto}'
      + '.hjp-eco-badge.hjp-eco-badge-on{opacity:.94;transform:none}'
      + '.hjp-eco-badge b{color:#fde047;font-weight:700;white-space:nowrap}'
      /* ---------- animations ---------- */
      + '@keyframes hjpEcoIn{0%{opacity:0;transform:translateY(30px) scale(.5) rotate(-6deg);filter:blur(9px)}'
      + '55%{opacity:1;transform:translateY(-6px) scale(1.06) rotate(1.5deg);filter:blur(0)}'
      + '100%{opacity:1;transform:none;filter:none}}'
      + '@keyframes hjpEcoOut{to{opacity:0;transform:translateY(-22px) scale(.8);filter:blur(6px)}}'
      + '@keyframes hjpEcoShine{to{transform:translateX(80%)}}'
      + '@keyframes hjpEcoLeaf{0%{transform:scale(0) rotate(-40deg)}60%{transform:scale(1.4) rotate(12deg)}100%{transform:scale(1) rotate(0)}}'
      /* ---------- mobile ---------- */
      + '@media (max-width:480px){.hjp-eco-card{right:12px;left:12px;bottom:14px;max-width:none}'
      + '.hjp-eco-badge{left:10px;bottom:10px;font-size:.66rem;padding:6px 10px}}'
      /* ---------- reduced motion ---------- */
      + '@media (prefers-reduced-motion:reduce){'
      + '.hjp-eco-card.hjp-eco-in{animation:none;opacity:1;transition:opacity .2s ease}'
      + '.hjp-eco-card.hjp-eco-out{animation:none;opacity:0;transition:opacity .2s ease}'
      + '.hjp-eco-card::before,.hjp-eco-p{display:none}'
      + '.hjp-eco-card.hjp-eco-in .hjp-eco-leaf{animation:none}'
      + '.hjp-eco-badge{transition:opacity .2s ease}}';

    var reduced = false;
    try { reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    function ensureStyle() {
      if (document.getElementById('hjp-eco-style')) return;
      var style = document.createElement('style');
      style.id = 'hjp-eco-style';
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
    }

    /* -------- permanent badge -------- */
    var badgeShown = false;
    function showBadge() {
      if (badgeShown || !document.body) return;
      badgeShown = true;
      ensureStyle();
      var badge = document.createElement('div');
      badge.className = 'hjp-eco-badge';
      badge.setAttribute('role', 'note');
      badge.title = 'Estimate from page weight: this page is about 0.25 MB vs about 2.4 MB for an average web page (websitecarbon.com method).';
      badge.innerHTML = '&#127757; Green by Design &nbsp;|&nbsp; <b>&asymp;' + fmt(ECO_SAVED_CO2_GRAMS) + ' g CO<sub>2</sub></b> avoided per visit';
      document.body.appendChild(badge);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { badge.classList.add('hjp-eco-badge-on'); });
      });
    }

    /* -------- one-time pop -------- */
    function spawnParticles(card) {
      if (reduced) return;
      for (var i = 0; i < 14; i++) {
        var p = document.createElement('span');
        p.className = 'hjp-eco-p';
        var ang = Math.random() * Math.PI * 2;
        var dist = 60 + Math.random() * 90;
        var size = 4 + Math.random() * 7;
        p.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(0) + 'px');
        p.style.setProperty('--dy', (Math.sin(ang) * dist - 30).toFixed(0) + 'px');
        p.style.setProperty('--s', size.toFixed(0) + 'px');
        p.style.setProperty('--d', (Math.random() * 0.35).toFixed(2) + 's');
        card.appendChild(p);
      }
    }

    function show() {
      if (!document.body || document.querySelector('.hjp-eco-card')) return;
      markSeen();
      ensureStyle();

      var card = document.createElement('div');
      card.className = 'hjp-eco-card';
      card.setAttribute('role', 'status');
      card.innerHTML =
        '<button type="button" class="hjp-eco-close" aria-label="Close">&times;</button>' +
        '<div class="hjp-eco-title"><span class="hjp-eco-leaf" aria-hidden="true">&#127793;</span>Jai&rsquo;s Green Impact</div>' +
        '<div class="hjp-eco-line">You&rsquo;ve helped save <b>&asymp;' + fmt(ECO_SAVED_CO2_GRAMS) + ' g CO<sub>2</sub></b> with this visit!</div>' +
        '<div class="hjp-eco-note">vs an average web page &middot; estimate from page weight &middot; updated by Jai</div>';
      document.body.appendChild(card);

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.classList.add('hjp-eco-in');
          spawnParticles(card);
        });
      });

      var dismissed = false;
      function dismiss() {
        if (dismissed) return;
        dismissed = true;
        card.classList.remove('hjp-eco-in');
        card.classList.add('hjp-eco-out');
        setTimeout(function () {
          if (card.parentNode) card.parentNode.removeChild(card);
          showBadge();
        }, 650);
      }

      // 3 fully-visible seconds start after the ~0.95s entrance finishes
      setTimeout(dismiss, 950 + VISIBLE_MS);
      card.querySelector('.hjp-eco-close').addEventListener('click', dismiss);
    }

    function arm() {
      if (showPop) {
        setTimeout(show, DELAY_MS);
        setTimeout(showBadge, DELAY_MS + 950 + VISIBLE_MS + 1200); // failsafe
      } else {
        setTimeout(showBadge, 1200);
      }
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') arm();
    else document.addEventListener('DOMContentLoaded', arm);
  } catch (e) {
    /* the eco pop must never break the page */
  }
})();
