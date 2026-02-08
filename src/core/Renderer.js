import { WebGLRenderer } from "three";

export class Renderer {
  constructor({ mount, sizes }) {
    this.mount = mount;
    this.sizes = sizes;

    this.canvas = document.createElement("canvas");
    this.mount.appendChild(this.canvas);

    this.gl = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    this.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.gl.setSize(this.sizes.width, this.sizes.height, false);

    //shadows
    this.gl.shadowMap.enabled = true;
    this.gl.shadowMap.type = 2; //PCFSoftShadowMap

    //color space
    this.gl.outputColorSpace = "srgb";
  }

  onResize(sizes) {
    this.gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.gl.setSize(sizes.width, sizes.height, false);
  }

  render(scene, camera) {
    this.gl.render(scene, camera);
  }

  destroy() {
    this.gl.dispose();
    this.canvas?.remove();
  }
}
