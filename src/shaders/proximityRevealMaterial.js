import * as THREE from "three";

// ─── Tunable constants ────────────────────────────────────────────────────────
const REVEAL_RADIUS      = 5.0;  // world units — radius of permanent/camera reveal spheres
const TEMP_REVEAL_RADIUS = 2.5;  // world units — radius of tap reveal spheres (smaller)
const SAMPLE_DIST        = 0.2;  // world units the camera must move before a new sample
const TEX_W              = 192;  // voxel volume width  (X) — matches 2D resolution for smooth trail
const TEX_H              = 64;   // voxel volume height (Y) — gallery is not very tall
const TEX_D              = 192;  // voxel volume depth  (Z) — matches 2D resolution for smooth trail
const FADE_IN_DUR_MS     = 900;  // ms for permanent reveals to fade in
const TEMP_FADE_IN_MS    = 300;  // ms for tap reveals to fade in
const TEMP_REVEAL_DUR    = 4.0;  // seconds for tap reveals to fade out (default)
const GOLD_DUR_MS        = 3000; // ms for gold expansion to fade out after a permanent reveal
const GOLD_EDGE_WIDTH    = 0.18; // 0..1 — width of the persistent gold ring
const GOLD_EDGE_MULT     = 0.7;  // 0..1 — brightness of the persistent gold edge ring
// ─────────────────────────────────────────────────────────────────────────────
// World-space bounds the voxel volume covers. Adjust to match your scene extents.
// XZ covers the horizontal footprint; Y covers vertical (height) range.
const WORLD_MIN_X  = -50;   // ──┐
const WORLD_SIZE_X =  100;  //   ├─ horizontal XZ bounds (world units)
const WORLD_MIN_Z  = -50;   //   │
const WORLD_SIZE_Z =  100;  // ──┘
const WORLD_MIN_Y  = 0;    // ──┐ vertical Y bounds
const WORLD_SIZE_Y =  30;   // ──┘ covers -6 → +14 world units

// ─── Shared GLSL injection ────────────────────────────────────────────────────
// Uses sampler3D + texture() — requires WebGL 2 / GLSL ES 3.00 (Three.js default).
// GPU cost: 3 × texture() lookups per fragment — O(1) regardless of reveal count.
const _vertexPreamble = "varying vec3 vWorld;\n";
const _vertexInject   = `#include <begin_vertex>
vWorld = (modelMatrix * vec4(position, 1.0)).xyz;`;

// Uses Data3DTexture (sampler3D) for true trilinear interpolation — no slice boundary
// artefacts. Requires GLSL ES 3.00 (WebGL 2), which Three.js r152+ uses by default.
// The precision declaration is injected manually because Three.js doesn't add it for
// custom sampler3D uniforms — this was the root cause of the original shader error.
const _fragUniforms = /* glsl */`
precision highp sampler3D;
uniform sampler3D uRevealTex;
uniform sampler3D uRevealTexTemp;
uniform sampler3D uRevealTexGold;
uniform vec2      uWorldMinXZ;
uniform vec2      uWorldSizeXZ;
uniform float     uWorldMinY;
uniform float     uWorldSizeY;
uniform vec3      uFogColor;
uniform vec3      uGoldColor;
uniform float     uGoldEdgeWidth;
uniform float     uGoldEdgeMult;
varying vec3      vWorld;
`;

const _fragReveal = /* glsl */`
#include <color_fragment>

// Normalised 3D UVW — clamped so out-of-bounds geometry stays hidden
vec3 _uvw = clamp(vec3(
  (vWorld.x - uWorldMinXZ.x) / uWorldSizeXZ.x,
  (vWorld.y - uWorldMinY)    / uWorldSizeY,
  (vWorld.z - uWorldMinXZ.y) / uWorldSizeXZ.y
), 0.0, 1.0);

float _settled = texture(uRevealTex,     _uvw).r;
float _temp    = texture(uRevealTexTemp, _uvw).r;
float _gold    = texture(uRevealTexGold, _uvw).r;

// Persistent gold ring — derived from boundary of settled reveal, zero extra sample
float _edge    = smoothstep(0.0, uGoldEdgeWidth, _settled) * smoothstep(1.0, 1.0 - uGoldEdgeWidth, _settled);

float _reveal  = max(_settled, max(_temp, _gold));
float _goldAmt = clamp(_gold + _edge * uGoldEdgeMult, 0.0, 1.0);
vec3  _colored = mix(diffuseColor.rgb, uGoldColor, _goldAmt);

diffuseColor.rgb = mix(uFogColor, _colored, _reveal);
`;

function _injectReveal(shader, mat, texture, tempTexture, goldTexture, fogColor) {
  mat.userData.shader = shader;

  shader.uniforms.uRevealTex      = { value: texture };
  shader.uniforms.uRevealTexTemp  = { value: tempTexture };
  shader.uniforms.uRevealTexGold  = { value: goldTexture };
  shader.uniforms.uWorldMinXZ     = { value: new THREE.Vector2(WORLD_MIN_X, WORLD_MIN_Z) };
  shader.uniforms.uWorldSizeXZ    = { value: new THREE.Vector2(WORLD_SIZE_X, WORLD_SIZE_Z) };
  shader.uniforms.uWorldMinY      = { value: WORLD_MIN_Y };
  shader.uniforms.uWorldSizeY     = { value: WORLD_SIZE_Y };
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

  // Drive PBR roughness/metalness in gold areas — _goldAmt is in scope above.
  // Only MeshStandardMaterial has these chunks — guard so Lambert materials are unaffected.
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

    // ─── Feature flags — toggle at runtime or from a settings page ───────────
    this.features = {
      cameraTrail:     true,  // permanent colour trail left by camera movement
      permanentFadeIn: true,  // permanent reveals fade in smoothly instead of popping
      edgeNoise:       true,  // organic noise on the edges of permanent reveals
      tapReveal:       true,  // click/tap on environment paints a temporary reveal
      goldRing:        true,  // gold expansion burst + persistent edge ring on permanent reveals
      mouseTrail:      true,  // mouse movement paints temporary reveals while idle
    };
    // ─────────────────────────────────────────────────────────────────────────

    this._activeFade  = [];
    this._activeTemp  = [];
    this._goldReveals = [];

    // Noise texture — loaded from PNG, sampled on XZ plane per voxel
    this._noiseData = null;
    this._noiseSize = 0;
    const img = new Image();
    img.src = '/art/textures/noise.png';
    img.onload = () => {
      const size = img.naturalWidth;
      const c    = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(img, 0, 0);
      const px = c.getContext('2d').getImageData(0, 0, size, size).data;
      this._noiseSize = size;
      this._noiseData = new Uint8Array(size * size);
      for (let i = 0; i < this._noiseData.length; i++) this._noiseData[i] = px[i * 4];
    };
    img.onerror = () => console.warn('[ProximityReveal] noise.png not found — using hash fallback');

    // Data3DTexture — true trilinear interpolation, no slice boundary artefacts.
    // precision highp sampler3D; is injected in the GLSL preamble to satisfy WebGL 2.
    const make3DTex = (data) => {
      const tex = new THREE.Data3DTexture(data, TEX_W, TEX_H, TEX_D);
      tex.format         = THREE.RedFormat;
      tex.type           = THREE.UnsignedByteType;
      tex.magFilter      = THREE.LinearFilter;
      tex.minFilter      = THREE.LinearFilter;
      tex.unpackAlignment = 1;
      tex.needsUpdate    = true;
      return tex;
    };

    // Permanent reveal — never decreases
    this._texData = new Uint8Array(TEX_W * TEX_H * TEX_D);
    this.texture  = make3DTex(this._texData);

    // Temporary (tap/click) reveal — cleared and repainted each frame
    this._tempData   = new Uint8Array(TEX_W * TEX_H * TEX_D);
    this.tempTexture = make3DTex(this._tempData);

    // Gold expansion — cleared and repainted each frame while active
    this._goldData   = new Uint8Array(TEX_W * TEX_H * TEX_D);
    this.goldTexture = make3DTex(this._goldData);
  }

  registerMaterial(mat) {
    this._materials.push(mat);
  }

  // ─── Core 3D voxel painter ─────────────────────────────────────────────────
  // Paints a smooth ellipsoidal sphere into any voxel Uint8Array.
  // max-value semantics — pixels only increase, so partial alpha accumulates correctly.
  // Noise samples on the XZ plane so edge variation is consistent regardless of height.
  _paint(data, worldX, worldY, worldZ, alpha = 1.0, noisy = false, radius = REVEAL_RADIUS) {
    const cx = Math.round((worldX - WORLD_MIN_X) / WORLD_SIZE_X * TEX_W);
    const cy = Math.round((worldY - WORLD_MIN_Y) / WORLD_SIZE_Y * TEX_H);
    const cz = Math.round((worldZ - WORLD_MIN_Z) / WORLD_SIZE_Z * TEX_D);

    const rx = (radius / WORLD_SIZE_X) * TEX_W;
    const ry = (radius / WORLD_SIZE_Y) * TEX_H;
    const rz = (radius / WORLD_SIZE_Z) * TEX_D;
    const ri = Math.ceil(Math.max(rx, ry, rz));

    for (let dz = -ri; dz <= ri; dz++) {
      const nz = cz + dz;
      if (nz < 0 || nz >= TEX_D) continue;
      for (let dy = -ri; dy <= ri; dy++) {
        const ny = cy + dy;
        if (ny < 0 || ny >= TEX_H) continue;
        for (let dx = -ri; dx <= ri; dx++) {
          const nx = cx + dx;
          if (nx < 0 || nx >= TEX_W) continue;

          // Normalised squared distance (ellipsoid — each axis scaled independently)
          const nd = (dx/rx)*(dx/rx) + (dy/ry)*(dy/ry) + (dz/rz)*(dz/rz);
          if (nd > 1.0) continue;

          const t = 1.0 - nd;
          let val = t * t * (3.0 - 2.0 * t) * alpha;

          // Edge noise on XZ plane — baked once on paint, zero GPU cost
          if (noisy && nd > 0.65) {
            let sample;
            if (this._noiseData) {
              const tnx = ((nx % this._noiseSize) + this._noiseSize) % this._noiseSize;
              const tnz = ((nz % this._noiseSize) + this._noiseSize) % this._noiseSize;
              sample = this._noiseData[tnz * this._noiseSize + tnx] / 255;
            } else {
              sample = ((nx * 1664525 + nz * 1013904223) >>> 0) / 0xFFFFFFFF;
            }
            val *= 0.65 + sample * 0.35;
          }

          const byte = Math.round(val * 255);
          const idx  = nx + ny * TEX_W + nz * TEX_W * TEX_H;
          if (byte > data[idx]) data[idx] = byte;
        }
      }
    }
  }

  // ─── Permanent reveal ────────────────────────────────────────────────────
  addPermanentReveal(worldPos) {
    const { x, y, z } = worldPos;

    if (this.features.goldRing) {
      this._goldReveals.push({ x, y, z, t0: performance.now() });
    }

    if (this.features.permanentFadeIn) {
      const already = this._activeFade.some(
        f => Math.abs(f.x - x) < 0.5 && Math.abs(f.z - z) < 0.5
      );
      if (!already) this._activeFade.push({ x, y, z, t0: performance.now() });
    } else {
      this._paint(this._texData, x, y, z, 1.0, this.features.edgeNoise);
      this.texture.needsUpdate = true;
    }
  }

  // ─── Area reveal (location completion) ───────────────────────────────────
  // One-shot fill of a large zone — called once when all artworks in a location are seen.
  addAreaReveal(worldX, worldY, worldZ, radius) {
    this._paint(this._texData, worldX, worldY, worldZ, 1.0, false, radius);
    this.texture.needsUpdate = true;
  }

  // ─── Temporary reveal (tap/click) ─────────────────────────────────────────
  addTemporaryReveal(worldPos, duration = TEMP_REVEAL_DUR) {
    if (!this.features.tapReveal) return;
    this._activeTemp.push({
      x: worldPos.x, y: worldPos.y, z: worldPos.z,
      t0: performance.now(),
      dur: duration * 1000,
      fadeIn: TEMP_FADE_IN_MS
    });
  }

  // ─── Camera trail ─────────────────────────────────────────────────────────
  _paintCameraTrail(x, y, z) {
    this._paint(this._texData, x, y, z, 1.0, this.features.edgeNoise);
    this.texture.needsUpdate = true;
  }

  // ─── Update (called every frame from World.update) ────────────────────────
  update(cameraPos) {
    if (!this.enabled || !cameraPos) return;

    if (this.features.cameraTrail) {
      if (!this._lastCamPos) {
        this._lastCamPos = cameraPos.clone();
        this._paintCameraTrail(cameraPos.x, cameraPos.y, cameraPos.z);
      } else if (this._lastCamPos.distanceTo(cameraPos) >= SAMPLE_DIST) {
        this._lastCamPos.copy(cameraPos);
        this._paintCameraTrail(cameraPos.x, cameraPos.y, cameraPos.z);
      }
    }

    const now = performance.now();

    // Fade-in permanent reveals
    if (this.features.permanentFadeIn && this._activeFade.length > 0) {
      for (let i = this._activeFade.length - 1; i >= 0; i--) {
        const f     = this._activeFade[i];
        const alpha = Math.min((now - f.t0) / FADE_IN_DUR_MS, 1.0);
        this._paint(this._texData, f.x, f.y, f.z, alpha, this.features.edgeNoise);
        if (alpha >= 1.0) this._activeFade.splice(i, 1);
      }
      this.texture.needsUpdate = true;
    }

    // Gold expansion — fades out, leaving in-shader edge ring behind
    if (this.features.goldRing && this._goldReveals.length > 0) {
      this._goldData.fill(0);
      for (let i = this._goldReveals.length - 1; i >= 0; i--) {
        const g     = this._goldReveals[i];
        const alpha = Math.max(1.0 - (now - g.t0) / GOLD_DUR_MS, 0.0);
        if (alpha <= 0.0) { this._goldReveals.splice(i, 1); continue; }
        this._paint(this._goldData, g.x, g.y, g.z, alpha, false);
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
        this._paint(this._tempData, t.x, t.y, t.z, fadeIn * fadeOut, false, TEMP_REVEAL_RADIUS);
      }
      this.tempTexture.needsUpdate = true;
    }
  }
}
