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

DefaultLoadingManager.onLoad = () => {
  titleScreen.setReady();
};

// ─── App (loads behind title screen) ──────────────────────────────────────
const app = new App({ mount: document.querySelector("#app") });

// Debug handle (optional)
window.__APP__ = app;

// ─── Start button ─────────────────────────────────────────────────────────
titleScreen.onStart = () => {
  // Apply toggle preferences to the running world
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
