import "./ui/overlay.css";
import { DefaultLoadingManager } from "three";

document.fonts.load("400 16px 'Swiss721BT'");
document.fonts.load("700 16px 'Swiss721BT'");
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
  titleScreen.setProgress((loaded / total) * 0.8); // network loads occupy 0→80%
  if (IMAGE_EXTS.test(url) && !EXCLUDE_PATHS.test(url)) titleScreen.addImage(url);
};

// ─── App — deferred until after first paint ───────────────────────────────
// requestAnimationFrame guarantees the browser has painted the title screen
// (solid white background) before the Three.js canvas is even created.
requestAnimationFrame(() => {
  const app = new App({ mount: document.querySelector("#app") });
  window.__APP__ = app;

  app.world.controls.autoRotate = false;
  app.time.stop(); // pause render loop while canvas is hidden — frees GPU for shader compilation

  // Signal ready only after all geometry is loaded AND all shaders compiled.
  // Previously used DefaultLoadingManager.onLoad which fires before compileAsync finishes.
  app.world.waitForReady({
    onCompileStart: () => titleScreen.setCompiling(true),
    onBatchProgress: (p) => {
      titleScreen.setCompiling(false);
      titleScreen.setProgress(0.8 + p * 0.2, "Preparing…");
    },
  }).then(() => {
    app.time.start(); // resume before enabling the button
    titleScreen.setReady();
  });

  titleScreen.onStart = () => {
    app.world.controls.autoRotate = true;
    app.world.autoplayNarration = titleScreen.autoplayNarration;

    const f = app.world.proximityReveal?.features;
    if (f) { f.tapReveal = false; f.edgeNoise = false; f.goldRing = false; }

    titleScreen.hide();
  };
});
