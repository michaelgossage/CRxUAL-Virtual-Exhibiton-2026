import * as THREE from "three";

export function makeArchGridMaterial({
  minorSize = 1.0,
  majorEvery = 10,
  minorWidth = 1.0,
  majorWidth = 1.8,
  axisWidth  = 2.2,
  fadeStart = 25.0,
  fadeEnd   = 80.0,

  // NEW
  baseColor = new THREE.Color(0x555555),
  baseOpacity = 1.20,     // fill opacity
  gridOpacity = 1.0,      // grid alpha multiplier

  plane = "XZ",
  origin = new THREE.Vector3(0, 0, 0),
} = {}) {
  const planeId = plane === "XY" ? 1 : plane === "YZ" ? 2 : 0;

  const mat = new THREE.ShaderMaterial({
    transparent: true,    // needed for baseOpacity
    depthWrite: true,
    toneMapped: false,
    uniforms: {
      uMinorSize:   { value: minorSize },
      uMajorEvery:  { value: majorEvery },
      uMinorWidth:  { value: minorWidth },
      uMajorWidth:  { value: majorWidth },
      uAxisWidth:   { value: axisWidth },
      uFadeStart:   { value: fadeStart },
      uFadeEnd:     { value: fadeEnd },

      // NEW
      uBaseColor:   { value: baseColor.clone() },
      uBaseOpacity: { value: baseOpacity },
      uGridOpacity: { value: gridOpacity },

      uPlaneId:     { value: planeId },
      uOrigin:      { value: origin.clone() },
      uCamPos:      { value: new THREE.Vector3() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      uniform float uMinorSize;
      uniform int   uMajorEvery;
      uniform float uMinorWidth;
      uniform float uMajorWidth;
      uniform float uAxisWidth;
      uniform float uFadeStart;
      uniform float uFadeEnd;

      uniform vec3  uBaseColor;
      uniform float uBaseOpacity;
      uniform float uGridOpacity;

      uniform int   uPlaneId;
      uniform vec3  uOrigin;
      uniform vec3  uCamPos;

      varying vec3 vWorldPos;

      vec2 planeUV(vec3 p) {
        if (uPlaneId == 0) return vec2(p.x, p.z);
        if (uPlaneId == 1) return vec2(p.x, p.y);
        return vec2(p.y, p.z);
      }

      float gridLine(vec2 uv, float cellSize, float width) {
        vec2 g = uv / cellSize;
        vec2 a = abs(fract(g - 0.5) - 0.5);
        vec2 fw = fwidth(g);

        float lx = 1.0 - smoothstep(0.0, fw.x * width, a.x);
        float ly = 1.0 - smoothstep(0.0, fw.y * width, a.y);
        return max(lx, ly);
      }

      float axisLine(vec2 uv, float width) {
        vec2 g = uv / uMinorSize;
        vec2 fw = fwidth(g);
        float ax = 1.0 - smoothstep(0.0, fw.x * width, abs(g.x));
        float ay = 1.0 - smoothstep(0.0, fw.y * width, abs(g.y));
        return max(ax, ay);
      }

      void main() {
        vec3 p = vWorldPos - uOrigin;
        vec2 uv = planeUV(p);

        float minor = gridLine(uv, uMinorSize, uMinorWidth);
        float major = gridLine(uv, uMinorSize * float(uMajorEvery), uMajorWidth);
        float ax    = axisLine(uv, uAxisWidth);

        float d = distance(vWorldPos, uCamPos);
        float fade = 1.0 - smoothstep(uFadeStart, uFadeEnd, d);

        vec3 cMinor = vec3(1.0) * 0.18;
        vec3 cMajor = vec3(1.0) * 0.32;
        vec3 cAxis  = vec3(1.0) * 0.55;

        vec3 gridCol = cMinor * minor + cMajor * major + cAxis * ax;

        // base fill + grid overlay
        vec3 col = uBaseColor + gridCol * fade;

        float gridA = (minor * 0.55 + major * 0.85 + ax) * fade * uGridOpacity;
        float baseA = uBaseOpacity;

        float alpha = clamp(baseA + gridA, 0.0, 1.0);
        if (alpha < 0.01) discard;

        gl_FragColor = vec4(col, alpha);
      }
    `
  });

  return mat;
}
