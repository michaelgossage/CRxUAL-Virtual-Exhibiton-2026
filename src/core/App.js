import { Scene } from "three";
import { Renderer } from "./Renderer.js";
import { SceneManager } from "./SceneManager.js";
import { CameraRig } from "./CameraRig.js";
import { Sizes } from "./Sizes.js";
import { Time } from "./Time.js";
import { World } from "../world/World.js";

function _fmtK(n) { return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`; }

export class App {
  constructor({ mount }) {
    this.mount = mount;

    this.sizes = new Sizes();
    this.time = new Time();

    this.scene = new Scene();

    this.cameraRig = new CameraRig(this.sizes);
    this.renderer = new Renderer({ mount: this.mount, sizes: this.sizes });
    this.sceneManager = new SceneManager(this.scene);

    this.isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

    this.world = new World({
      scene: this.scene,
      camera: this.cameraRig.camera,
      renderer: this.renderer.gl,
      sizes: this.sizes,
      debugOn: true,  // enable debug logging for location reveal system
      isMobile: this.isMobile,
    });

    this._fpsEl = null;
    this._fpsAccum = 0;
    this._fpsFrames = 0;
    this._fpsMaxDt = 0;

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
    if (!this.world.screenManager?.debugOn) {
      this._tickFPS = () => {};  // checked once at load; no-op hereafter
      return;
    }
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;top:8px;left:8px;color:#0f0;background:rgba(0,0,0,0.55);font:bold 12px/1.5 monospace;padding:5px 8px;border-radius:4px;z-index:9999;pointer-events:none;white-space:pre";
    document.body.appendChild(el);
    this._fpsEl = el;
  }

  _tickFPS(dt) {
    this._fpsAccum  += dt;
    this._fpsFrames += 1;
    if (dt > this._fpsMaxDt) this._fpsMaxDt = dt;

    if (this._fpsAccum >= 0.5) {
      const fps   = Math.round(this._fpsFrames / this._fpsAccum);
      const avgMs = (this._fpsAccum / this._fpsFrames * 1000).toFixed(1);
      const maxMs = (this._fpsMaxDt * 1000).toFixed(1);

      const info  = this.renderer.gl.info;
      const calls = info.render.calls;
      const tris  = _fmtK(info.render.triangles);
      const geos  = info.memory.geometries;
      const texs  = info.memory.textures;
      const shds  = info.programs?.length ?? '–';

      const lines = [
        `${fps} fps  ${avgMs}ms avg  ▲${maxMs}ms`,
        `Calls: ${calls}  Tris: ${tris}`,
        `Geo: ${geos}  Tex: ${texs}  Sh: ${shds}`,
      ];

      if (performance.memory) {
        const used  = (performance.memory.usedJSHeapSize  / 1048576).toFixed(1);
        const limit = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(0);
        lines.push(`Heap: ${used}MB / ${limit}MB`);
      }

      this._fpsEl.textContent = lines.join('\n');
      this._fpsAccum  = 0;
      this._fpsFrames = 0;
      this._fpsMaxDt  = 0;
    }
  }

  triReport() {
    const rows = [];
    this.scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const geo = obj.geometry;
      if (!geo) return;
      const tris = geo.index
        ? geo.index.count / 3
        : (geo.attributes.position?.count ?? 0) / 3;
      // Walk ancestors — a mesh is only rendered if the whole chain is visible
      let rendered = true;
      let o = obj;
      while (o) { if (!o.visible) { rendered = false; break; } o = o.parent; }
      rows.push({
        name:     obj.name || "(unnamed)",
        parent:   obj.parent?.name || "–",
        tris:     Math.round(tris),
        rendered,
      });
    });
    rows.sort((a, b) => b.tris - a.tris);
    const total = rows.reduce((s, r) => s + r.tris, 0);
    console.log(`Scene triangles: ${_fmtK(total)} across ${rows.length} meshes (top 30 shown)`);
    console.table(rows.slice(0, 100));
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
