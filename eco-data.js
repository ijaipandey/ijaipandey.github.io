/* ============================================================
   JAI'S GREEN IMPACT - DAILY LOG
   This is the ONLY file you edit. About 1 minute per update.
   ------------------------------------------------------------
   HOW TO LOG A DAY (phone or laptop):
     1. Open  github.com/ijaipandey/ijaipandey.github.io
     2. Tap this file:  eco-data.js
     3. Tap the pencil (Edit this file)
     4. Add ONE new line inside the square brackets below:
          ['2026-11-12', 6, 14, 0],
        meaning:  date, km cycled/walked, km by bus/train, trees
        planted that day. Use 0 for anything that did not happen.
     5. Scroll down, tap the green "Commit changes" button.
     The site updates itself in about 1 minute.
     The pop-up AND the badge both recalculate from these lines.

   You can also fix an old day: just edit its line.

   EMISSION FACTORS (kg CO2 per km), with sources:
   - Cycled/walked km counts the car or auto trip it replaced:
     about 0.17 kg/km. Basis: petrol is 2.31 kg CO2/litre and a
     typical Indian car runs about 13-15 km/l, so 0.15-0.19 kg/km
     (ARAI test data analysed by CSE, cseindia.org).
   - Bus/train km counts the CAR trip minus the transit share:
     about 0.10 kg/km net. Buses emit about 0.03 kg per person-km
     and Indian electric trains under 0.01, so replacing a
     0.17 kg/km car trip saves roughly 0.07-0.16; 0.10 is a
     conservative middle.
   - TREES ARE NOT ADDED TO THE KG TOTAL. They are shown as
     "trees planted". A mature tree absorbs about 22 kg CO2 per
     YEAR (Arbor Day Foundation: 48 lb); a sapling absorbs far
     less. Counting a planting as instant savings would not be
     defensible, so we simply say "planted".
   These are honest estimates, not measurements. If someone asks:
   "it is a personal log using published per-km factors".
   ============================================================ */

const ECO_LOG = [
  // ['YYYY-MM-DD', kmCycledWalked, kmBusTrain, treesPlanted],
  // Example (delete this comment): ['2026-11-10', 5, 12, 1],
];

// kg CO2 per km factors from the notes above
const ECO_FACTOR_ACTIVE = 0.17;  // cycled/walked km (car/auto trip replaced)
const ECO_FACTOR_TRANSIT = 0.10; // bus/train km (net, vs same trip by car)
