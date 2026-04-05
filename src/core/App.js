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
      sizes: this.sizes,
      debugOn: true,  // enable debug logging for location reveal system
    });

    this._fpsEl = null;
    this._fpsAccum = 0;
    this._fpsFrames = 0;

    this._bind();
    this._start();
    this._initFPS();

    // UI interactions
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", () => this.bindUI());
    } else {
      this.bindUI();
    }
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
      this._tickFPS(dt);
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

  _initFPS() {
    if (!this.world.screenManager?.debugOn) return;
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;top:8px;left:8px;color:#0f0;background:rgba(0,0,0,0.55);font:bold 13px/1 monospace;padding:4px 7px;border-radius:4px;z-index:9999;pointer-events:none";
    document.body.appendChild(el);
    this._fpsEl = el;
  }

  _tickFPS(dt) {
    if (!this._fpsEl) return;
    this._fpsAccum  += dt;
    this._fpsFrames += 1;
    if (this._fpsAccum >= 0.5) {
      const fps = Math.round(this._fpsFrames / this._fpsAccum);
      this._fpsEl.textContent = `${fps} fps`;
      this._fpsAccum  = 0;
      this._fpsFrames = 0;
    }
  }

  bindUI() {
    const menu = document.getElementById("menu");
    if (!menu) return;

    menu.querySelectorAll(".btn[data-loc]").forEach((btn) => {

      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        // unlock pointer if needed
        if (document.pointerLockElement) {
          document.exitPointerLock?.();
        }

        const id = btn.dataset.loc;

        // ✅ correct reference
        this.world.goToLocation(id, { duration: 3.0 });

        // update active styling
        menu.querySelectorAll(".btn")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
      });

    });
  }

}
