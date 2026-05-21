import "./ui/overlay.css";
import { DefaultLoadingManager } from "three";
import { TitleScreen } from "./ui/TitleScreen.js";
import { App } from "./core/App.js";

// ─── Title screen ─────────────────────────────────────────────────────────
const titleScreen = new TitleScreen();

// Hook THREE's default loading manager — all TextureLoader / GLTFLoader loads
// feed through here automatically (no changes to loader code needed).
const IMAGE_EXTS    = /\.(jpe?g|png|avif|webp|gif)(\?.*)?$/i;
// Exclude system textures (reveal mask, noise, HDRI-adjacent) — only artwork images
const EXCLUDE_PATHS = /\/art\/(textures|hdri)\//i;

DefaultLoadingManager.onProgress = (url, loaded, total) => {
  titleScreen.setProgress(loaded / total);
  if (IMAGE_EXTS.test(url) && !EXCLUDE_PATHS.test(url)) titleScreen.addImage(url);
};

// ─── App — deferred until after first paint ───────────────────────────────
// requestAnimationFrame guarantees the browser has painted the title screen
// (solid white background) before the Three.js canvas is even created.
requestAnimationFrame(() => {
  const app = new App({ mount: document.querySelector("#app") });
  window.__APP__ = app;

  app.world.controls.autoRotate = false;

  // Signal ready only after all geometry is loaded AND all shaders compiled.
  // Previously used DefaultLoadingManager.onLoad which fires before compileAsync finishes.
  app.world.waitForReady().then(() => {
    titleScreen.setReady();
  });

  titleScreen.onStart = () => {
    app.world.controls.autoRotate = true;
    app.world.autoplayNarration = titleScreen.autoplayNarration;

    if (!titleScreen.extraInteractions) {
      const f = app.world.proximityReveal?.features;
      if (f) {
        f.tapReveal = false;
        f.edgeNoise  = false;
        f.goldRing   = false;
      }
    }

    titleScreen.hide();
  };
});
