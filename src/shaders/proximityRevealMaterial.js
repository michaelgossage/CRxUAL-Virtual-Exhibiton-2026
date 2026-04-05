import * as THREE from "three";

// ─── Tunable constants ────────────────────────────────────────────────────────
const REVEAL_RADIUS      = 5.0;  // world units — radius of permanent/camera reveal circles
const TEMP_REVEAL_RADIUS = 2.5;  // world units — radius of tap reveal circles (smaller)
const SAMPLE_DIST        = 0.1;  // world units the camera must move before a new sample
const TEX_SIZE           = 256;  // fog-of-war texture resolution
const FADE_IN_DUR_MS     = 900;  // ms for permanent reveals to fade in
const TEMP_FADE_IN_MS    = 300;  // ms for tap reveals to fade in
const TEMP_REVEAL_DUR    = 4.0;  // seconds for tap reveals to fade out (default)
const GOLD_DUR_MS        = 3000; // ms for gold expansion to fade out after a permanent reveal
const GOLD_EDGE_WIDTH    = 0.18; // 0..1 — width of the persistent gold ring (fraction of reveal radius)
const GOLD_EDGE_MULT     = 0.7;  // 0..1 — brightness of the persistent gold edge ring
// ─────────────────────────────────────────────────────────────────────────────
// World-space XZ bounds the texture covers. Adjust to match your scene extents.
const WORLD_MIN  = new THREE.Vector2(-80, -80);
const WORLD_SIZE = new THREE.Vector2(200, 200);

// ─── Shared GLSL injection ────────────────────────────────────────────────────
const _vertexPreamble = "varying vec3 vWorld;\n";
const _vertexInject   = `#include <begin_vertex>
vWorld = (modelMatrix * vec4(position, 1.0)).xyz;`;

const _fragUniforms = /* glsl */`
uniform sampler2D uRevealTex;
uniform sampler2D uRevealTexTemp;
uniform sampler2D uRevealTexGold;
uniform vec2      uWorldMin;
uniform vec2      uWorldSize;
uniform vec3      uFogColor;
uniform vec3      uGoldColor;
uniform float     uGoldEdgeWidth;
uniform float     uGoldEdgeMult;
varying vec3      vWorld;
`;

const _fragReveal = /* glsl */`
#include <color_fragment>
vec2  _uv      = clamp((vWorld.xz - uWorldMin) / uWorldSize, 0.0, 1.0);
float _settled = texture2D(uRevealTex,     _uv).r;
float _temp    = texture2D(uRevealTexTemp, _uv).r;
float _gold    = texture2D(uRevealTexGold, _uv).r;

// Persistent gold ring — peaks at the boundary of the settled reveal, zero GPU cost
float _edge    = smoothstep(0.0, uGoldEdgeWidth, _settled) * smoothstep(1.0, 1.0 - uGoldEdgeWidth, _settled);

// Total reveal: settled (permanent) + temp tap + expanding gold
float _reveal  = max(_settled, max(_temp, _gold));

// Composite: gold fill fades, gold edge ring persists at boundary
float _goldAmt = clamp(_gold + _edge * uGoldEdgeMult, 0.0, 1.0);
vec3  _colored = mix(diffuseColor.rgb, uGoldColor, _goldAmt);

diffuseColor.rgb = mix(uFogColor, _colored, _reveal);
`;

function _injectReveal(shader, mat, texture, tempTexture, goldTexture, fogColor) {
  mat.userData.shader = shader;

  shader.uniforms.uRevealTex      = { value: texture };
  shader.uniforms.uRevealTexTemp  = { value: tempTexture };
  shader.uniforms.uRevealTexGold  = { value: goldTexture };
  shader.uniforms.uWorldMin       = { value: WORLD_MIN };
  shader.uniforms.uWorldSize      = { value: WORLD_SIZE };
  shader.uniforms.uFogColor       = { value: new THREE.Color(fogColor) };
  shader.uniforms.uGoldColor      = { value: new THREE.Color(0xFFD700) };
  shader.uniforms.uGoldEdgeWidth  = { value: GOLD_EDGE_WIDTH };
  shader.uniforms.uGoldEdgeMult   = { value: GOLD_EDGE_MULT };

  shader.vertexShader = _vertexPreamble + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>", _vertexInject
  );

  shader.fragmentShader = _fragUniforms + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>", _fragReveal
  );

  // Drive PBR properties in gold areas — _goldAmt is in scope from the color_fragment replacement above.
  // roughnessFactor → 0 (mirror-smooth), metalnessFactor → 1 (fully metallic).
  // These chunks only exist in MeshStandardMaterial — safe to skip if absent (Lambert, etc.)
  if (shader.fragmentShader.includes("#include <roughnessmap_fragment>")) {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <roughnessmap_fragment>",
      `#include <roughnessmap_fragment>
       roughnessFactor = mix(roughnessFactor, 0.05, _goldAmt);`
    );
  }
  if (shader.fragmentShader.includes("#include <metalnessmap_fragment>")) {
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <metalnessmap_fragment>",
      `#include <metalnessmap_fragment>
       metalnessFactor = mix(metalnessFactor, 1.0, _goldAmt);`
    );
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export function makeProximityRevealMaterial(system, { color = 0x808080, fogColor = 0x000000, side = THREE.FrontSide } = {}) {
  const mat = new THREE.MeshStandardMaterial({ color, side, roughness: 1.0, metalness: 0.0 });
  mat.onBeforeCompile = (shader) => _injectReveal(shader, mat, system.texture, system.tempTexture, system.goldTexture, fogColor);
  system.registerMaterial(mat);
  return mat;
}

export function applyProximityRevealToMaterial(mat, system, { fogColor = 0xffffff } = {}) {
  if (mat.userData._proximityRevealApplied) return;
  mat.userData._proximityRevealApplied = true;

  const _prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (shader, renderer) => {
    if (_prev) _prev(shader, renderer);
    _injectReveal(shader, mat, system.texture, system.tempTexture, system.goldTexture, fogColor);
  };

  mat.needsUpdate = true;
  system.registerMaterial(mat);
}


export class ProximityRevealSystem {
  constructor() {
    this._materials  = [];
    this._lastCamPos = null;
    this.enabled     = true;

    // ─── Feature flags — toggle any of these at runtime or from a settings page ──
    // e.g. world.proximityReveal.features.tapReveal = false
    this.features = {
      cameraTrail:     true,  // permanent colour trail left by camera movement
      permanentFadeIn: true,  // permanent reveals fade in smoothly instead of popping
      edgeNoise:       true,  // organic noise on the edges of permanent reveals
      tapReveal:       true,  // click/tap on environment paints a temporary reveal
      goldRing:        true,  // gold expansion burst + persistent edge ring on permanent reveals
    };
    // ─────────────────────────────────────────────────────────────────────────────

    // Active fade-in list for permanent reveals: [{ x, z, t0 }]
    this._activeFade = [];

    // Seamless noise texture — loaded once from a PNG, sampled in _paint().
    // Null until loaded; falls back to hash noise in the meantime.
    this._noiseData = null;
    this._noiseSize = 0;
    const img = new Image();
    img.src = '/art/textures/noise.png'; // any tileable greyscale PNG
    img.onload = () => {
      const size = img.naturalWidth;
      const c    = document.createElement('canvas');
      c.width    = size;
      c.height   = size;
      c.getContext('2d').drawImage(img, 0, 0);
      const px = c.getContext('2d').getImageData(0, 0, size, size).data;
      this._noiseSize = size;
      this._noiseData = new Uint8Array(size * size);
      for (let i = 0; i < this._noiseData.length; i++) this._noiseData[i] = px[i * 4];
    };
    img.onerror = () => {
      // No noise texture found — hash fallback stays active (noiseData remains null)
      console.warn('[ProximityReveal] noise.png not found — using hash noise fallback');
    };

    // Permanent reveal texture — never decreases
    this._texData = new Uint8Array(TEX_SIZE * TEX_SIZE);
    this.texture  = new THREE.DataTexture(
      this._texData, TEX_SIZE, TEX_SIZE,
      THREE.RedFormat, THREE.UnsignedByteType
    );
    this.texture.magFilter   = THREE.LinearFilter;
    this.texture.minFilter   = THREE.LinearFilter;
    this.texture.needsUpdate = true;

    // Temporary reveal texture — tap/click reveals that fade out
    this._tempData    = new Uint8Array(TEX_SIZE * TEX_SIZE);
    this._activeTemp  = [];
    this.tempTexture  = new THREE.DataTexture(
      this._tempData, TEX_SIZE, TEX_SIZE,
      THREE.RedFormat, THREE.UnsignedByteType
    );
    this.tempTexture.magFilter   = THREE.LinearFilter;
    this.tempTexture.minFilter   = THREE.LinearFilter;
    this.tempTexture.needsUpdate = true;

    // Gold expansion texture — burst on permanent reveal, fades out leaving the edge ring
    // The edge ring itself is derived in-shader from the settled texture (zero extra CPU cost)
    this._goldData    = new Uint8Array(TEX_SIZE * TEX_SIZE);
    this._goldReveals = []; // [{ x, z, t0 }]
    this.goldTexture  = new THREE.DataTexture(
      this._goldData, TEX_SIZE, TEX_SIZE,
      THREE.RedFormat, THREE.UnsignedByteType
    );
    this.goldTexture.magFilter   = THREE.LinearFilter;
    this.goldTexture.minFilter   = THREE.LinearFilter;
    this.goldTexture.needsUpdate = true;
  }

  registerMaterial(mat) {
    this._materials.push(mat);
  }

  // ─── Core painter ──────────────────────────────────────────────────────────
  // data   : Uint8Array to paint into (allows reuse for temp/gold textures later)
  // alpha  : 0..1 multiplier — used for fade-in; pixels only increase (max semantics)
  // noisy  : if true, adds deterministic per-pixel hash variation at the edge
  //          (baked once on paint, zero GPU cost)
  _paint(data, worldX, worldZ, alpha = 1.0, noisy = false, radius = REVEAL_RADIUS) {
    const u  = (worldX - WORLD_MIN.x) / WORLD_SIZE.x;
    const v  = (worldZ - WORLD_MIN.y) / WORLD_SIZE.y;
    const cx = Math.round(u * TEX_SIZE);
    const cy = Math.round(v * TEX_SIZE);

    const rx = (radius / WORLD_SIZE.x) * TEX_SIZE;
    const ry = (radius / WORLD_SIZE.y) * TEX_SIZE;
    const r  = Math.ceil(Math.max(rx, ry));

    for (let dy = -r; dy <= r; dy++) {
      const ny = cy + dy;
      if (ny < 0 || ny >= TEX_SIZE) continue;
      for (let dx = -r; dx <= r; dx++) {
        const nx = cx + dx;
        if (nx < 0 || nx >= TEX_SIZE) continue;

        const nd = (dx / rx) * (dx / rx) + (dy / ry) * (dy / ry);
        if (nd > 1.0) continue;

        // Smooth Hermite falloff
        const t = 1.0 - nd;
        let val = t * t * (3.0 - 2.0 * t) * alpha;

        // Organic edge noise — only in outer 35% of radius, baked once on paint.
        // Uses seamless texture if loaded, otherwise falls back to deterministic hash.
        if (noisy && nd > 0.65) {
          let sample;
          if (this._noiseData) {
            const tnx    = ((nx % this._noiseSize) + this._noiseSize) % this._noiseSize;
            const tny    = ((ny % this._noiseSize) + this._noiseSize) % this._noiseSize;
            sample = this._noiseData[tny * this._noiseSize + tnx] / 255;
          } else {
            sample = ((nx * 1664525 + ny * 1013904223) >>> 0) / 0xFFFFFFFF;
          }
          val *= 0.65 + sample * 0.35;
        }

        const byte = Math.round(val * 255);
        const idx  = ny * TEX_SIZE + nx;
        if (byte > data[idx]) data[idx] = byte;
      }
    }
  }

  // ─── Permanent reveal (with fade-in) ───────────────────────────────────────
  // Called by World when an artwork is focused or the camera crosses a threshold.
  addPermanentReveal(worldPos) {
    const { x, z } = worldPos;
    // Gold burst — always push when goldRing feature is on, independent of fadeIn
    if (this.features.goldRing) {
      this._goldReveals.push({ x, z, t0: performance.now() });
    }

    if (this.features.permanentFadeIn) {
      // Smooth fade-in — avoid duplicate fades for the same spot
      const already = this._activeFade.some(f => Math.abs(f.x - x) < 0.5 && Math.abs(f.z - z) < 0.5);
      if (!already) this._activeFade.push({ x, z, t0: performance.now() });
    } else {
      // Instant paint — no animation
      this._paint(this._texData, x, z, 1.0, this.features.edgeNoise);
      this.texture.needsUpdate = true;
    }
  }

  // ─── Temporary reveal (tap/click — fades out) ─────────────────────────────
  addTemporaryReveal(worldPos, duration = TEMP_REVEAL_DUR) {
    if (!this.features.tapReveal) return;
    this._activeTemp.push({
      x: worldPos.x, z: worldPos.z,
      t0: performance.now(),
      dur: duration * 1000,
      fadeIn: TEMP_FADE_IN_MS
    });
  }

  // ─── Camera trail (instant — called frequently, no fade needed) ─────────────
  _paintCameraTrail(x, z) {
    this._paint(this._texData, x, z, 1.0, this.features.edgeNoise);
    this.texture.needsUpdate = true;
  }

  // ─── Update (called every frame from World.update) ─────────────────────────
  update(cameraPos) {
    if (!this.enabled || !cameraPos) return;

    // Camera trail
    if (this.features.cameraTrail) {
      if (!this._lastCamPos) {
        this._lastCamPos = cameraPos.clone();
        this._paintCameraTrail(cameraPos.x, cameraPos.z);
      } else if (this._lastCamPos.distanceTo(cameraPos) >= SAMPLE_DIST) {
        this._lastCamPos.copy(cameraPos);
        this._paintCameraTrail(cameraPos.x, cameraPos.z);
      }
    }

    const now = performance.now();

    // Fade-in permanent reveals
    if (this.features.permanentFadeIn && this._activeFade.length > 0) {
      for (let i = this._activeFade.length - 1; i >= 0; i--) {
        const f     = this._activeFade[i];
        const alpha = Math.min((now - f.t0) / FADE_IN_DUR_MS, 1.0);
        this._paint(this._texData, f.x, f.z, alpha, this.features.edgeNoise);
        if (alpha >= 1.0) this._activeFade.splice(i, 1);
      }
      this.texture.needsUpdate = true;
    }

    // Gold expansion — fades out, leaving the in-shader edge ring behind
    if (this.features.goldRing && this._goldReveals.length > 0) {
      this._goldData.fill(0);
      for (let i = this._goldReveals.length - 1; i >= 0; i--) {
        const g     = this._goldReveals[i];
        const alpha = Math.max(1.0 - (now - g.t0) / GOLD_DUR_MS, 0.0);
        if (alpha <= 0.0) { this._goldReveals.splice(i, 1); continue; }
        this._paint(this._goldData, g.x, g.z, alpha, false);
      }
      this.goldTexture.needsUpdate = true;
    }

    // Fade-in then fade-out temporary reveals
    if (this.features.tapReveal && this._activeTemp.length > 0) {
      this._tempData.fill(0);
      for (let i = this._activeTemp.length - 1; i >= 0; i--) {
        const t       = this._activeTemp[i];
        const elapsed = now - t.t0;
        const fadeIn  = Math.min(elapsed / t.fadeIn, 1.0);
        const fadeOut = Math.max(1.0 - elapsed / t.dur, 0.0);
        if (fadeOut <= 0.0) { this._activeTemp.splice(i, 1); continue; }
        this._paint(this._tempData, t.x, t.z, fadeIn * fadeOut, false, TEMP_REVEAL_RADIUS);
      }
      this.tempTexture.needsUpdate = true;
    }
  }
}
