import * as THREE from "three";

export function _makeRevealMaterial_(map) {
    
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uMap: { value: map },
      uReveal: { value: 1.0 },   // 0 hidden → 1 fully shown
      uSoft: { value: 0.12 },    // edge softness
      uTime: { value: 0.0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform float uReveal;
      uniform float uSoft;
      varying vec2 vUv;

      float sCurve(float t){ return t*t*(3.0 - 2.0*t); }

      void main(){
        vec4 tex = texture2D(uMap, vUv);

        // left-to-right wipe with soft edge
        float r = sCurve(clamp(uReveal, 0.0, 1.0));
        float edge0 = r - uSoft;
        float edge1 = r + uSoft;
        float mask = smoothstep(edge0, edge1, vUv.x);

        float a = tex.a * mask;
        if (a < 0.001) discard;

        gl_FragColor = vec4(tex.rgb, a);
      }
    `,
  });
}


//import * as THREE from "three";

//this shader can reveal using the alpha valuse controlled by uReveal and blende between 2 images using uBlend

export function makeRevealMaterial({
  map,
  mapNext,
  revealMap,
  revealSoftness = 0.15
}) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uMap:        { value: map },
      uMapNext:    { value: mapNext },   // for blending to next texture (not implemented yet)
      uRevealMap:  { value: revealMap },
      uReveal:     { value: 1.0 },   // 1 hidden → 0 visible
      uSoft:       { value: revealSoftness },
      uBlend:      { value: 0.0 },   // 0 hard reveal, 1 full blend (for debugging)
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap;
      uniform sampler2D uMapNext;
      uniform sampler2D uRevealMap;
      uniform float uReveal;
      uniform float uSoft;
      uniform float uBlend;

      varying vec2 vUv;

      void main() {
        //invert uReveal so 1 → 0 and 0 → 1, s curve for sharper transition at the start and end
        //float r = 1.0 - uReveal;
        float r = uReveal;
        r = r * r * (3.0 - 2.0 * r); //s-curve

        
        vec4 color = texture2D(uMap, vUv);
        vec4 colorNext = texture2D(uMapNext, vUv);

        

        

        // reveal texture: assume grayscale in R channel
        float maskValue = texture2D(uRevealMap, vUv).r;

        // blend threshold uses same painterly mask
        float t = 1.0-smoothstep(uBlend - uSoft, uBlend + uSoft, maskValue);

        //blend between current and next texture (not implemented yet)
        color = mix(color, colorNext, t);

        // compare reveal threshold against mask
        float alpha = smoothstep(
          r - uSoft,
          r + uSoft,
          maskValue
        );

        //float a = color.a;// * alpha;
        float a = color.a * alpha;
        if (a < 0.001) discard;

        gl_FragColor = vec4(color.rgb, a);
      }
    `
  });
}

