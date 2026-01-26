import { disposeObject3D } from "../utils/dispose.js";

export class SceneManager {
  constructor(scene) {
    this.scene = scene;
  }

  disposeAll() {
    disposeObject3D(this.scene);
  }
}
