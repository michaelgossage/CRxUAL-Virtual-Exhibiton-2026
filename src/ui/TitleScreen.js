// ─── CONFIGURE THESE ─────────────────────────────────────────────────────────
const LOGO_SRC   = "/CRxUAL-Virtual-Exhibiton-2026/art/images/logo.png";
const TITLE      = "CRxUAL";
const SUBTITLE   = "Virtual Exhibition 2026";
const DISCLAIMER = "By entering this exhibition you agree to our terms of use. All artworks are the property of their respective artists. Unauthorised reproduction is prohibited.";
const INSTRUCTIONS = "Click on artworks to focus. Drag to look around. Use the menu to move between spaces.";

// Carousel
const ROW_BASE_SPEED    = 38;   // px/s for the first row
const ROW_SPEED_STEP    = 14;   // px/s added per row (creates subtle parallax)
const ROW_HEIGHT_TARGET = 260;  // target px per row — drives row count
const MAX_ROWS          = 4;
// ─────────────────────────────────────────────────────────────────────────────

// Fisher-Yates shuffle — returns a new shuffled array
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class TitleScreen {
  constructor() {
    this._ready       = false;
    this._onStart     = null;
    this._rows        = [];  // [{ inner, stripA, stripB, x, speed, dir }]
    this._imagePool   = [];  // all artwork image URLs collected during loading
    this._carouselRaf = null;

    this._el = this._build();
    document.body.appendChild(this._el);
    this._startCarousel();
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  setProgress(p) {
    const pct = Math.round(p * 100);
    this._barFill.style.width = pct + "%";
    this._barLabel.textContent = "Loading… " + pct + "%";
  }

  /**
   * Called when all THREE assets are loaded.
   * Shuffles the collected image pool and rebuilds all strips so that:
   * - Every row shows the same shuffled order (different speeds/directions)
   * - Each strip is repeated until it is wider than the viewport
   * - Strip B is an exact mirror of strip A → seam always off-screen
   */
  setReady() {
    this._ready = true;
    this._barFill.style.width = "100%";
    this._barLabel.textContent = "Ready";
    this._startBtn.disabled = false;
    this._startBtn.classList.add("ts-start-btn--ready");
    this._finalizeStrips(); // async, fire-and-forget
  }

  /**
   * Adds an artwork image URL to the pool and also shows it immediately
   * in the carousel (loading-state visual effect).
   */
  addImage(url) {
    if (this._imagePool.includes(url)) return;
    this._imagePool.push(url);

    // Show in a row during loading so the grid fills as assets arrive
    if (this._rows.length === 0) return;
    const row = this._rows[(this._imagePool.length - 1) % this._rows.length];
    [row.stripA, row.stripB].forEach((strip) => {
      strip.appendChild(this._makeImg(url, false));
    });
  }

  set onStart(fn) { this._onStart = fn; }

  get autoplayNarration() { return this._toggleNarration.checked; }
  get extraInteractions() { return this._toggleExtras.checked; }

  hide() {
    cancelAnimationFrame(this._carouselRaf);
    this._el.classList.add("ts--hiding");
    const cleanup = () => { if (this._el.parentNode) this._el.remove(); };
    this._el.addEventListener("transitionend", cleanup, { once: true });
    // Fallback in case transitionend never fires (reduced-motion, 0s transition, etc.)
    setTimeout(cleanup, 2000);
  }

  // ─── DOM builder ───────────────────────────────────────────────────────────

  _build() {
    const root = document.createElement("div");
    root.id = "title-screen";

    const carousel = document.createElement("div");
    carousel.className = "ts-carousel";
    this._buildCarousel(carousel);
    root.appendChild(carousel);

    const vignette = document.createElement("div");
    vignette.className = "ts-vignette";
    root.appendChild(vignette);

    root.insertAdjacentHTML("beforeend", `
      <div class="ts-content">
        <div class="ts-panel">

          <img class="ts-logo" src="${LOGO_SRC}" alt="" onerror="this.style.display='none'">
          <h1 class="ts-title">${TITLE}</h1>
          <p  class="ts-subtitle">${SUBTITLE}</p>

          <div class="ts-divider"></div>

          <div class="ts-toggles">
            <label class="ts-toggle">
              <input type="checkbox" id="ts-toggle-narration" checked>
              <span class="ts-toggle__track"></span>
              <span class="ts-toggle__label">Autoplay narration</span>
            </label>
            <label class="ts-toggle">
              <input type="checkbox" id="ts-toggle-extras" checked>
              <span class="ts-toggle__track"></span>
              <span class="ts-toggle__label">Extra interactions</span>
            </label>
          </div>

          <div class="ts-loading">
            <div class="ts-bar-track"><div class="ts-bar-fill" id="ts-bar-fill"></div></div>
            <span class="ts-bar-label" id="ts-bar-label">Loading…</span>
          </div>

          <button class="ts-start-btn" id="ts-start-btn" disabled>Enter Exhibition</button>

          <p class="ts-instructions">${INSTRUCTIONS}</p>
          <p class="ts-disclaimer">${DISCLAIMER}</p>

        </div>
      </div>
    `);

    this._barFill         = root.querySelector("#ts-bar-fill");
    this._barLabel        = root.querySelector("#ts-bar-label");
    this._startBtn        = root.querySelector("#ts-start-btn");
    this._toggleNarration = root.querySelector("#ts-toggle-narration");
    this._toggleExtras    = root.querySelector("#ts-toggle-extras");

    this._startBtn.addEventListener("click", () => {
      if (!this._ready) return;
      this._ready = false;
      this._startBtn.disabled = true;
      this._onStart?.();
    });

    return root;
  }

  _buildCarousel(container) {
    const numRows = Math.max(2, Math.min(MAX_ROWS, Math.round(window.innerHeight / ROW_HEIGHT_TARGET)));

    for (let i = 0; i < numRows; i++) {
      const lane   = document.createElement("div");
      lane.className = "ts-lane";

      const inner  = document.createElement("div");
      inner.className = "ts-lane-inner";

      const stripA = document.createElement("div");
      const stripB = document.createElement("div");
      stripA.className = stripB.className = "ts-strip";

      inner.appendChild(stripA);
      inner.appendChild(stripB);
      lane.appendChild(inner);
      container.appendChild(lane);

      const dir   = i % 2 === 0 ? 1 : -1;
      const speed = ROW_BASE_SPEED + (i % 3) * ROW_SPEED_STEP;

      this._rows.push({ inner, stripA, stripB, x: 0, speed, dir });
    }
  }

  // ─── Strip finalisation ────────────────────────────────────────────────────

  /**
   * After all images are loaded:
   *  1. Shuffle the pool once (same order used for every row).
   *  2. Fill strip A with the shuffled list, repeated until wider than the viewport.
   *  3. Copy strip A into strip B — identical content, seam always off-screen.
   *  4. Restore each row's scroll position (modulo new width) to avoid a jump.
   */
  async _finalizeStrips() {
    if (this._imagePool.length === 0) return;

    // ── Phase 1: clear and seed each stripA with one pass ──────────────────
    for (const row of this._rows) {
      const pool = shuffle(this._imagePool); // independent shuffle per row
      row._pool  = pool;                     // remember for phase 2
      row.stripA.innerHTML = "";
      row.stripB.innerHTML = "";
      for (const url of pool) row.stripA.appendChild(this._makeImg(url, true));
    }

    // Wait two frames so the browser lays out the images and scrollWidth is real
    await new Promise(r => requestAnimationFrame(r));
    await new Promise(r => requestAnimationFrame(r));

    // ── Phase 2: repeat until every stripA is wider than the viewport ───────
    for (const row of this._rows) {
      while (row.stripA.scrollWidth < window.innerWidth + 100) {
        for (const url of row._pool) row.stripA.appendChild(this._makeImg(url, true));
      }

      // Mirror into stripB — identical content for seamless looping
      row.stripB.innerHTML = row.stripA.innerHTML;

      // Keep the scroll position in bounds so the carousel doesn't jump
      row.x = row.x % row.stripA.scrollWidth;
    }
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  _makeImg(url, visible) {
    const img = document.createElement("img");
    img.src = url;
    if (visible) {
      img.classList.add("ts-img--visible");
    } else {
      img.addEventListener("load", () => img.classList.add("ts-img--visible"), { once: true });
    }
    return img;
  }

  // ─── Carousel animation ────────────────────────────────────────────────────

  _startCarousel() {
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      for (const row of this._rows) {
        const w = row.stripA.scrollWidth;
        if (w === 0) continue;

        row.x += row.speed * dt;
        if (row.x >= w) row.x -= w;

        // dir 1  → scroll left:  translateX(-x)
        // dir -1 → scroll right: translateX(-(w - x))  (reads strip from the end)
        const offset = row.dir === 1 ? -row.x : -(w - row.x);
        row.inner.style.transform = `translateX(${offset}px)`;
      }

      this._carouselRaf = requestAnimationFrame(tick);
    };

    this._carouselRaf = requestAnimationFrame(tick);
  }
}
