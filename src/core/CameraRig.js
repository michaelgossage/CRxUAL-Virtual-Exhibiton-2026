import { PerspectiveCamera } from "three";

export class CameraRig {
  constructor(sizes) {
    this.camera = new PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 800);
    this.camera.rotation.order = "YXZ";
    this.camera.position.set(0, 1.2, 0);
  }

  onResize(sizes) {
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update(dt) {
    // keep empty by default; your world/controller can own look movement
  }
}
