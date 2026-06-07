import { WebGLRenderer, ACESFilmicToneMapping } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass }     from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass }     from "three/examples/jsm/postprocessing/ShaderPass.js";
import { ColorGradeShader } from "../shaders/colorGradeShader.js";

export class Renderer {
  constructor({ mount, sizes, scene, camera, isLowPower = false }) {
    this.mount = mount;
    this.sizes = sizes;

    this.canvas = document.createElement("canvas");
    this.mount.appendChild(this.canvas);

    this.gl = new WebGLRenderer({
      canvas: this.canvas,
      antialias: !isLowPower,
      alpha: true,
      powerPreference: isLowPower ? "default" : "high-performance"
    });

    this._dprCap = isLowPower ? 1.0 : 2.0;
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._dprCap));
    this.gl.setSize(this.sizes.width, this.sizes.height, false);

    //shadows
    this.gl.shadowMap.enabled = true;
    this.gl.shadowMap.type = 1; // PCFShadowMap — 4 taps vs PCFSoft's 9, sufficient for gallery
    this.gl.shadowMap.autoUpdate = false; // scene is static; needsUpdate triggered manually after load

    //color space
    this.gl.outputColorSpace = "srgb";
    this.gl.toneMapping = ACESFilmicToneMapping;
    this.gl.toneMappingExposure = 1.0;

    // post-processing
    this._composer = new EffectComposer(this.gl);
    this._composer.addPass(new RenderPass(scene, camera));
    this._composer.addPass(new ShaderPass(ColorGradeShader));
  }

  onResize(sizes) {
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._dprCap));
    this.gl.setSize(sizes.width, sizes.height, false);
    this._composer.setSize(sizes.width, sizes.height);
  }

  render() {
    this.gl.info.autoReset = false;
    this.gl.info.reset();
    this._composer.render();
    this.gl.info.autoReset = true;
  }

  destroy() {
    this.gl.dispose();
    this.canvas?.remove();
  }
}
