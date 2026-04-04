import * as THREE from "three";

// ─── Tunable constants ────────────────────────────────────────────────────────
const REVEAL_RADIUS = 5.0;  // world units — radius of each painted reveal circle
const SAMPLE_DIST   = 0.1;  // world units the camera must move before a new sample is taken
const TEX_SIZE      = 256;  // fog-of-war texture resolution (256 = ~0.6 wu/texel at default bounds)
// ─────────────────────────────────────────────────────────────────────────────
// World-space XZ bounds the texture covers. Adjust to match your scene extents.
// Anything outside these bounds will clamp to the edge value (0 = not revealed).
const WORLD_MIN = new THREE.Vector2(-80, -80);
const WORLD_SIZE = new THREE.Vector2(200, 200); // WORLD_MIN + WORLD_SIZE = max corner

// ─── Shared GLSL injection ────────────────────────────────────────────────────
// One texture lookup per fragment — no loop, O(1) regardless of reveal count.
// Linear filtering on the DataTexture gives smooth edges without extra shader math.
const _vertexPreamble = "varying vec3 vWorld;\n";
const _vertexInject   = `#include <begin_vertex>
vWorld = (modelMatrix * vec4(position, 1.0)).xyz;`;

const _fragUniforms = /* glsl */`
uniform sampler2D uRevealTex;
uniform vec2      uWorldMin;
uniform vec2      uWorldSize;
uniform vec3      uFogColor;
varying vec3      vWorld;
`;

const _fragReveal = /* glsl */`
#include <color_fragment>
vec2  _uv     = clamp((vWorld.xz - uWorldMin) / uWorldSize, 0.0, 1.0);
float _reveal = texture2D(uRevealTex, _uv).r;
diffuseColor.rgb = mix(uFogColor, diffuseColor.rgb, _reveal);
`;

function _injectReveal(shader, mat, texture, fogColor) {
  mat.userData.shader = shader;

  shader.uniforms.uRevealTex  = { value: texture };
  shader.uniforms.uWorldMin   = { value: WORLD_MIN };
  shader.uniforms.uWorldSize  = { value: WORLD_SIZE };
  shader.uniforms.uFogColor   = { value: new THREE.Color(fogColor) };

  shader.vertexShader = _vertexPreamble + shader.vertexShader;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>", _vertexInject
  );

  shader.fragmentShader = _fragUniforms + shader.fragmentShader;
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>", _fragReveal
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export function makeProximityRevealMaterial(system, { color = 0x808080, fogColor = 0x000000, side = THREE.FrontSide } = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, side });
  mat.onBeforeCompile = (shader) => _injectReveal(shader, mat, system.texture, fogColor);
  system.registerMaterial(mat);
  return mat;
}

export function applyProximityRevealToMaterial(mat, system, { fogColor = 0xffffff } = {}) {
  if (mat.userData._proximityRevealApplied) return;
  mat.userData._proximityRevealApplied = true;

  const _prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (shader, renderer) => {
    if (_prev) _prev(shader, renderer);
    _injectReveal(shader, mat, system.texture, fogColor);
  };

  mat.needsUpdate = true;
  system.registerMaterial(mat);
}


export class ProximityRevealSystem {
  constructor() {
    this._materials  = [];
    this._lastCamPos = null;
    this.enabled     = true;

    // Single-channel (R) DataTexture — painted on the CPU, sampled in the shader.
    // Linear filtering gives smooth reveal edges without extra shader math.
    this._texData = new Uint8Array(TEX_SIZE * TEX_SIZE);
    this.texture  = new THREE.DataTexture(
      this._texData, TEX_SIZE, TEX_SIZE,
      THREE.RedFormat, THREE.UnsignedByteType
    );
    this.texture.magFilter   = THREE.LinearFilter;
    this.texture.minFilter   = THREE.LinearFilter;
    this.texture.needsUpdate = true;
  }

  registerMaterial(mat) {
    this._materials.push(mat);
  }

  // Paint a smooth falloff circle into the DataTexture at the given world XZ position.
  // Runs on the CPU — only called when the camera has moved SAMPLE_DIST world units.
  _paint(worldX, worldZ) {
    const u  = (worldX - WORLD_MIN.x) / WORLD_SIZE.x;
    const v  = (worldZ - WORLD_MIN.y) / WORLD_SIZE.y;
    const cx = Math.round(u * TEX_SIZE);
    const cy = Math.round(v * TEX_SIZE);

    // Radius in texels, derived from world-space radius
    const rx = (REVEAL_RADIUS / WORLD_SIZE.x) * TEX_SIZE;
    const ry = (REVEAL_RADIUS / WORLD_SIZE.y) * TEX_SIZE;
    const r  = Math.ceil(Math.max(rx, ry));

    for (let dy = -r; dy <= r; dy++) {
      const ny = cy + dy;
      if (ny < 0 || ny >= TEX_SIZE) continue;
      for (let dx = -r; dx <= r; dx++) {
        const nx = cx + dx;
        if (nx < 0 || nx >= TEX_SIZE) continue;

        // Normalised squared distance (0 at centre → 1 at edge)
        const nd = (dx / rx) * (dx / rx) + (dy / ry) * (dy / ry);
        if (nd > 1.0) continue;

        // Smooth Hermite falloff — matches smoothstep shape, no GPU math needed
        const t   = 1.0 - nd;
        const val = Math.round(t * t * (3.0 - 2.0 * t) * 255);
        const idx = ny * TEX_SIZE + nx;
        if (val > this._texData[idx]) this._texData[idx] = val;
      }
    }

    this.texture.needsUpdate = true;
  }

  addPermanentReveal(worldPos) {
    this._paint(worldPos.x, worldPos.z);
    // No uniform sync needed — all shaders already hold a reference to this.texture
  }

  update(cameraPos) {
    if (!this.enabled || !cameraPos) return;
    if (!this._lastCamPos) {
      this._lastCamPos = cameraPos.clone();
      this._paint(cameraPos.x, cameraPos.z);
      return;
    }
    if (this._lastCamPos.distanceTo(cameraPos) < SAMPLE_DIST) return;
    this._lastCamPos.copy(cameraPos);
    this._paint(cameraPos.x, cameraPos.z);
  }
}
