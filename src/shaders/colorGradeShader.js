export const ColorGradeShader = {
  uniforms: {
    tDiffuse:    { value: null },
    uContrast:   { value: 1.08 },
    uBrightness: { value: 0.01 },
    uSaturation: { value: 1.00 },
  },

  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float uContrast;
    uniform float uBrightness;
    uniform float uSaturation;
    varying vec2 vUv;

    vec3 linearToSRGB(vec3 c) {
      return mix(
        c * 12.92,
        1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
        step(vec3(0.0031308), c)
      );
    }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);

      col.rgb += uBrightness;
      col.rgb = (col.rgb - 0.5) * uContrast + 0.5;

      float luma = dot(col.rgb, vec3(0.2126, 0.7152, 0.0722));
      col.rgb = mix(vec3(luma), col.rgb, uSaturation);

      gl_FragColor = vec4(linearToSRGB(clamp(col.rgb, 0.0, 1.0)), col.a);
    }
  `,
};
