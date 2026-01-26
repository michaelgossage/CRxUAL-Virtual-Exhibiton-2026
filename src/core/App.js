import { Scene } from "three";
import { Renderer } from "./Renderer.js";
import { SceneManager } from "./SceneManager.js";
import { CameraRig } from "./CameraRig.js";
import { Sizes } from "./Sizes.js";
import { Time } from "./Time.js";
import { World } from "../world/World.js";

export class App {
  constructor({ mount }) {
    this.mount = mount;

    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new Scene();

    this.cameraRig = new CameraRig(this.sizes);
    this.renderer = new Renderer({ mount: this.mount, sizes: this.sizes });
    this.sceneManager = new SceneManager(this.scene);

    this.world = new World({
      scene: this.scene,
      camera: this.cameraRig.camera,
      renderer: this.renderer.gl,
      sizes: this.sizes
    });

    this._bind();
    this._start();
  }

  _bind() {
    this.sizes.on("resize", () => {
      this.cameraRig.onResize(this.sizes);
      this.renderer.onResize(this.sizes);
      this.world.onResize?.(this.sizes);
    });

    this.time.on("tick", (dt) => {
      this.world.update(dt);
      this.cameraRig.update(dt);
      this.renderer.render(this.scene, this.cameraRig.camera);
    });
  }

  _start() {
    this.time.start();
  }

  destroy() {
    this.time.stop();
    this.renderer.destroy();
    this.sceneManager.disposeAll();
  }
}
