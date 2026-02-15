import { PerspectiveCamera } from "three";

export class CameraRig {
  constructor(sizes) {
    this.camera = new PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 100);
    this.camera.rotation.order = "YXZ";
    this.camera.position.set(0, .8, 0);
  }

  onResize(sizes) {
    this.camera.aspect = sizes.width / sizes.height;
    this.camera.updateProjectionMatrix();
  }

  update(dt) {
    // keep empty by default; your world/controller can own look movement
  }
}
