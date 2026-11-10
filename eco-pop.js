/* ============================================================
   ECO POP + BADGE - "Jai's Green Impact" personal log
   ------------------------------------------------------------
   YOU DO NOT NEED TO EDIT THIS FILE.
   Daily updates go in eco-data.js (one line per day).
   This file only reads that log and displays the totals.
   If the log is empty or all zeros, nothing is shown.

   Behaviour: the pop shows once per visitor per total, for 3
   seconds, plain fade in/out. A small badge stays at the
   bottom-left. Both recalculate from eco-data.js.
   (The earlier page-weight version, "=1.7 g CO2 per visit", was
   retired; it lives in git history if ever needed again.)
   ============================================================ */

(function () {
  'use strict';

  try {
    var KEY = 'hjp.ecoImpact';
    var DELAY_MS = 2200;   // pop wait after load so it never blocks the page
    var VISIBLE_MS = 3000; // pop fully visible for 3 seconds

    var log = (typeof ECO_LOG !== 'undefined' && Array.isArray(ECO_LOG)) ? ECO_LOG : [];
    var F_ACTIVE = (typeof ECO_FACTOR_ACTIVE === 'number') ? ECO_FACTOR_ACTIVE : 0.17;
    var F_TRANSIT = (typeof ECO_FACTOR_TRANSIT === 'number') ? ECO_FACTOR_TRANSIT : 0.10;

    var kmActive = 0, kmTransit = 0, trees = 0;
    for (var i = 0; i < log.length; i++) {
      var row = log[i];
      if (!row) continue;
      kmActive += Number(row[1]) || 0;
      kmTransit += Number(row[2]) || 0;
      trees += Number(row[3]) || 0;
    }
    var kg = kmActive * F_ACTIVE + kmTransit * F_TRANSIT;

    // Nothing real to report yet: stay invisible.
    if (kg <= 0 && trees <= 0) return;

    var signature = JSON.stringify([kg.toFixed(2), kmActive, kmTransit, trees]);
    var seen = null;
    try { seen = localStorage.getItem(KEY); } catch (e) {}
    var showPop = (seen !== signature);

    function markSeen() {
      try { localStorage.setItem(KEY, signature); } catch (e) {}
    }

    function fmtKg(n) {
      var r = Math.round(n * 10) / 10;
      return r.toString();
    }

    function breakdown() {
      var parts = [];
      if (kmActive > 0) parts.push(kmActive + ' km cycled or walked');
      if (kmTransit > 0) parts.push(kmTransit + ' km by bus or train');
      if (trees > 0) parts.push(trees + (trees === 1 ? ' tree' : ' trees') + ' planted');
      return parts.join(' \u00B7 ');
    }

    var CSS = ''
      + '.hjp-eco-card,.hjp-eco-badge{font-family:"DM Sans",system-ui,-apple-system,sans-serif;'
      + 'color:#ecfdf5;background:linear-gradient(135deg,rgba(6,38,28,.92),rgba(20,83,45,.92));'
      + 'border:1px solid rgba(134,239,172,.45);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}'
      + '.hjp-eco-card{position:fixed;right:18px;bottom:18px;z-index:9999;max-width:310px;'
      + 'padding:14px 16px 12px;border-radius:16px;'
      + 'box-shadow:0 10px 36px rgba(0,0,0,.3);'
      + 'opacity:0;pointer-events:auto;transition:opacity .45s ease,transform .45s ease;'
      + 'transform:translateY(10px)}'
      + '.hjp-eco-card.hjp-eco-in{opacity:1;transform:none}'
      + '.hjp-eco-card.hjp-eco-out{opacity:0;transform:translateY(-8px)}'
      + '.hjp-eco-title{font-family:"Fredoka","DM Sans",system-ui,sans-serif;font-weight:700;'
      + 'font-size:1rem;display:flex;align-items:center;gap:7px;color:#bbf7d0;padding-right:22px}'
      + '.hjp-eco-line{margin-top:5px;font-size:.88rem;line-height:1.45;color:#d1fae5}'
      + '.hjp-eco-line b{color:#fde047;font-weight:700;white-space:nowrap}'
      + '.hjp-eco-sub{margin-top:4px;font-size:.78rem;line-height:1.4;color:#a7f3d0}'
      + '.hjp-eco-note{margin-top:6px;font-size:.66rem;color:#a7f3d0;opacity:.75;letter-spacing:.02em}'
      + '.hjp-eco-close{position:absolute;top:6px;right:9px;border:0;background:transparent;'
      + 'color:#a7f3d0;font-size:1.05rem;line-height:1;cursor:pointer;padding:4px;opacity:.8}'
      + '.hjp-eco-close:hover{opacity:1;color:#fff}'
      + '.hjp-eco-close:focus-visible{outline:2px solid #fde047;outline-offset:1px;border-radius:6px}'
      + '.hjp-eco-badge{position:fixed;left:14px;bottom:14px;z-index:9998;max-width:calc(100vw - 28px);'
      + 'padding:7px 12px;border-radius:999px;font-size:.72rem;letter-spacing:.02em;color:#bbf7d0;'
      + 'box-shadow:0 4px 18px rgba(0,0,0,.25);'
      + 'opacity:0;transform:translateY(6px);transition:opacity .5s ease,transform .5s ease}'
      + '.hjp-eco-badge.hjp-eco-badge-on{opacity:.94;transform:none}'
      + '.hjp-eco-badge b{color:#fde047;font-weight:700;white-space:nowrap}'
      + '@media (max-width:480px){.hjp-eco-card{right:12px;left:12px;bottom:14px;max-width:none}'
      + '.hjp-eco-badge{left:10px;bottom:10px;font-size:.66rem;padding:6px 10px}}'
      + '@media (prefers-reduced-motion:reduce){'
      + '.hjp-eco-card,.hjp-eco-badge{transition:opacity .2s ease;transform:none}}';

    function ensureStyle() {
      var old = document.getElementById('hjp-eco-style');
      if (old) old.parentNode.removeChild(old); // always refresh with this file's styles
      var style = document.createElement('style');
      style.id = 'hjp-eco-style';
      style.textContent = CSS;
      (document.head || document.documentElement).appendChild(style);
    }

    var badgeShown = false;
    function showBadge() {
      if (badgeShown || !document.body) return;
      badgeShown = true;
      ensureStyle();
      var badge = document.createElement('div');
      badge.className = 'hjp-eco-badge';
      badge.setAttribute('role', 'note');
      badge.title = 'Personal log: ' + breakdown() + '. Estimate vs making those trips by car/auto; trees counted as planted, not as instant savings.';
      badge.innerHTML = '&#127757; Jai&rsquo;s Green Impact &nbsp;|&nbsp; <b>&asymp;' + fmtKg(kg) + ' kg CO<sub>2</sub></b> saved';
      document.body.appendChild(badge);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { badge.classList.add('hjp-eco-badge-on'); });
      });
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
        '<div class="hjp-eco-title"><span aria-hidden="true">&#127793;</span>Jai&rsquo;s Green Impact</div>' +
        '<div class="hjp-eco-line">Jai has saved <b>&asymp;' + fmtKg(kg) + ' kg CO<sub>2</sub></b> so far</div>' +
        '<div class="hjp-eco-sub">' + breakdown() + '</div>' +
        '<div class="hjp-eco-note">estimate vs those trips by car/auto &middot; trees counted as planted &middot; logged by Jai</div>';
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
        setTimeout(function () {
          if (card.parentNode) card.parentNode.removeChild(card);
          showBadge();
        }, 600);
      }

      setTimeout(dismiss, 450 + VISIBLE_MS); // 3 visible seconds after the fade-in
      card.querySelector('.hjp-eco-close').addEventListener('click', dismiss);
    }

    function arm() {
      if (showPop) {
        setTimeout(show, DELAY_MS);
        setTimeout(showBadge, DELAY_MS + 450 + VISIBLE_MS + 1100); // failsafe
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
