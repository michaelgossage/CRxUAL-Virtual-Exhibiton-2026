import * as THREE from "three";

const SIM_SCALE = 0.35;

const simVertSrc = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const simFragSrc = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D u_vel;
  uniform vec2      u_res;
  uniform vec2      u_mouse;
  uniform vec2      u_mouseDelta;
  uniform float     u_dt;
  uniform float     u_active;

  void main() {
    vec2 uv = vUv;
    vec2 px = 1.0 / u_res;

    vec4 cur  = texture2D(u_vel, uv);
    vec2 vel  = cur.rg;
    float dye = cur.b;

    vec2 prevUV = clamp(uv - vel * u_dt * 0.4, px, 1.0 - px);
    vec4 prev   = texture2D(u_vel, prevUV);
    vel = prev.rg * 0.996;
    dye = prev.b  * 0.994;

    vec2 vN = texture2D(u_vel, uv + vec2(0.0, px.y)).rg;
    vec2 vS = texture2D(u_vel, uv - vec2(0.0, px.y)).rg;
    vec2 vE = texture2D(u_vel, uv + vec2(px.x, 0.0)).rg;
    vec2 vW = texture2D(u_vel, uv - vec2(px.x, 0.0)).rg;
    vel = mix(vel, (vN + vS + vE + vW) * 0.25, 0.10);

    if (u_active > 0.5) {
      vec2 mUV = u_mouse * 0.5 + 0.5;
      float ar = u_res.x / u_res.y;
      vec2 diff = uv - mUV;
      diff.x *= ar;

      float splat = exp(-dot(diff, diff) * 800.0);
      vel += u_mouseDelta * splat * 10.0;
      dye += splat * 3.0;
    }

    gl_FragColor = vec4(vel, clamp(dye, 0.0, 1.0), 1.0);
  }
`;

export class CarouselFluidSim {
  constructor() {
    this._simW = 0;
    this._simH = 0;
    this._fboA = null;
    this._fboB = null;

    // Fullscreen quad geometry for sim pass
    this._quadGeo = new THREE.PlaneGeometry(2, 2);

    // Orthographic camera (NDC-space, no projection needed)
    this._orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Sim material
    this._simMaterial = new THREE.ShaderMaterial({
      vertexShader: simVertSrc,
      fragmentShader: simFragSrc,
      uniforms: {
        u_vel:        { value: null },
        u_res:        { value: new THREE.Vector2(1, 1) },
        u_mouse:      { value: new THREE.Vector2(0, 0) },
        u_mouseDelta: { value: new THREE.Vector2(0, 0) },
        u_dt:         { value: 0.016 },
        u_active:     { value: 0.0 },
      },
      depthTest: false,
      depthWrite: false,
    });

    this._simMesh = new THREE.Mesh(this._quadGeo, this._simMaterial);
    this._simScene = new THREE.Scene();
    this._simScene.add(this._simMesh);
  }

  _ensureFBOs(renderer) {
    const size = renderer.getSize(new THREE.Vector2());
    const dpr  = renderer.getPixelRatio();
    const pw   = Math.round(size.width  * dpr);
    const ph   = Math.round(size.height * dpr);

    const needW = Math.max(2, Math.floor(pw * SIM_SCALE));
    const needH = Math.max(2, Math.floor(ph * SIM_SCALE));

    if (needW === this._simW && needH === this._simH) return;

    this._simW = needW;
    this._simH = needH;

    this._fboA?.dispose();
    this._fboB?.dispose();

    const opts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
    };
    this._fboA = new THREE.WebGLRenderTarget(needW, needH, opts);
    this._fboB = new THREE.WebGLRenderTarget(needW, needH, opts);

    this._simMaterial.uniforms.u_res.value.set(needW, needH);
  }

  update(dt, renderer, mouseNDC, mouseDelta, mouseActive) {
    this._ensureFBOs(renderer);

    const u = this._simMaterial.uniforms;
    u.u_vel.value        = this._fboA.texture;
    u.u_mouse.value.copy(mouseNDC);
    u.u_mouseDelta.value.copy(mouseDelta);
    u.u_dt.value         = dt;
    u.u_active.value     = mouseActive ? 1.0 : 0.0;

    const prevTarget     = renderer.getRenderTarget();
    const prevAutoClear  = renderer.autoClear;
    renderer.autoClear   = false;

    renderer.setRenderTarget(this._fboB);
    renderer.render(this._simScene, this._orthoCamera);

    renderer.setRenderTarget(prevTarget);
    renderer.autoClear = prevAutoClear;

    // Ping-pong
    const tmp   = this._fboA;
    this._fboA  = this._fboB;
    this._fboB  = tmp;
  }

  clearSim(renderer) {
    if (!this._fboA || !this._fboB) return;
    const prev      = renderer.getRenderTarget();
    const prevColor = new THREE.Color();
    const prevAlpha = renderer.getClearAlpha();
    renderer.getClearColor(prevColor);

    // Must clear to (0,0,0,0) so vel/dye are exactly zero
    renderer.setClearColor(new THREE.Color(0, 0, 0), 0);
    renderer.setRenderTarget(this._fboA);
    renderer.clear(true, false, false);
    renderer.setRenderTarget(this._fboB);
    renderer.clear(true, false, false);

    renderer.setClearColor(prevColor, prevAlpha);
    renderer.setRenderTarget(prev);
  }

  get texture() {
    return this._fboA?.texture ?? null;
  }

  dispose() {
    this._fboA?.dispose();
    this._fboB?.dispose();
    this._quadGeo.dispose();
    this._simMaterial.dispose();
  }
}
