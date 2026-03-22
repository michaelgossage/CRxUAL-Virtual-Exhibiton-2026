import * as THREE from "three";

// ─── Tunable constants ────────────────────────────────────────────────────────
const MAX_REVEALS   = 16;  // 1 live camera + up to 15 permanent artwork reveals
const REVEAL_RADIUS = 5.0; // world units — how far colour spreads from each point
// ─────────────────────────────────────────────────────────────────────────────

// Pre-allocated to avoid per-frame garbage
const _posPool = new Array(MAX_REVEALS).fill(null).map(() => new THREE.Vector3());

export function makeProximityRevealMaterial({ color = 0x808080, fogColor = 0x444444, side = THREE.FrontSide } = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, side });

  mat.onBeforeCompile = (shader) => {
    mat.userData.shader = shader;

    shader.uniforms.uRevealPositions = {
      value: new Array(MAX_REVEALS).fill(null).map(() => new THREE.Vector3())
    };
    shader.uniforms.uRevealRadius = { value: REVEAL_RADIUS };
    shader.uniforms.uFogColor     = { value: new THREE.Color(fogColor) };

    // ── Vertex: world-space position ──────────────────────────────────────
    shader.vertexShader = "varying vec3 vWorld;\n" + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vWorld = (modelMatrix * vec4(position, 1.0)).xyz;`
    );

    // ── Fragment: uniforms only — no noise helpers needed ────────────────
    shader.fragmentShader = /* glsl */`
uniform vec3  uRevealPositions[${MAX_REVEALS}];
uniform float uRevealRadius;
uniform vec3  uFogColor;
varying vec3  vWorld;
` + shader.fragmentShader;

    // ── Fragment: squared-distance loop, no noise, no sqrt ───────────────
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      /* glsl */`
#include <color_fragment>

float _r0 = uRevealRadius;
float _r1 = _r0 * 0.55;
float _r0sq = _r0 * _r0;
float _r1sq = _r1 * _r1;

float _reveal = 0.0;
for (int i = 0; i < ${MAX_REVEALS}; i++) {
  vec3 rp = uRevealPositions[i];
  if (dot(rp, rp) < 0.0001) break;

  float dsq = dot(vWorld - rp, vWorld - rp);
  if (dsq > _r0sq) continue;
  float dist = sqrt(dsq);
  _reveal = max(_reveal, smoothstep(_r0, _r1, dist));
}

diffuseColor.rgb = mix(uFogColor, diffuseColor.rgb, _reveal);
`
    );
  };

  return mat;
}


export class ProximityRevealSystem {
  constructor() {
    this._materials        = [];
    this._permanentReveals = [];
    this.enabled           = true;  // set false to freeze/hide all reveals
  }

  registerMaterial(mat) {
    this._materials.push(mat);
  }

  // Call once after addPermanentReveal to push updated positions to the shader.
  // No longer called every frame — only when a new artwork is focused.
  _syncUniforms() {
    if (!this.enabled) {
      for (let i = 0; i < MAX_REVEALS; i++) _posPool[i].set(0, 0, 0);
    } else {
      let count = 0;
      for (const p of this._permanentReveals) {
        if (count >= MAX_REVEALS) break;
        _posPool[count++].copy(p);
      }
      for (let i = count; i < MAX_REVEALS; i++) _posPool[i].set(0, 0, 0);
    }

    for (const mat of this._materials) {
      const shader = mat.userData.shader;
      if (shader) shader.uniforms.uRevealPositions.value = _posPool;
    }
  }

  addPermanentReveal(worldPos) {
    const pos = worldPos.clone();
    if (!this._permanentReveals.some(p => p.distanceTo(pos) < 0.5)) {
      this._permanentReveals.push(pos);
      this._syncUniforms();
    }
  }

  // No-op kept so World.js call signature doesn't need changing
  update() {}
}
