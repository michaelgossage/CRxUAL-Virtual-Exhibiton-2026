# CRxUAL Virtual Exhibition 2026 — Developer Guide

A Three.js-based interactive 3D virtual art exhibition. Visitors walk through a virtual gallery, click on artworks to focus, read info, and watch video works.

## Commands

```bash
npm run dev        # Vite dev server — https://localhost:8457 (HTTPS, self-signed cert, LAN-accessible)
npm run build      # Production build → /dist (base path /)
npm run build:gh   # Production build → /dist with GitHub Pages base path
npm run deploy:gh  # build:gh + push to gh-pages branch
```

## Architecture

```
src/
  main.js              # Entry point — creates App, exposes window.__APP__; loads Swiss721BT font
  core/
    App.js             # Root orchestrator: wires Time → Renderer + World; device detection; FPS overlay
    EventBus.js        # Pub/sub (Map-based): on/off/emit
    Sizes.js           # Window resize tracking, emits "resize"
    Time.js            # rAF loop, emits "tick" with { dt } (dt clamped to 50 ms max)
    Renderer.js        # WebGLRenderer + EffectComposer post-processing; DPR cap; shadow autoUpdate off
    CameraRig.js       # PerspectiveCamera + resize handler
    SceneManager.js    # Recursive scene disposal helper
  world/
    World.js           # Scene content, focus state machine, artwork registry, experiences
    ScreenManager.js   # Screens, videos, 3D models, raycasting, click dispatch, texture cache
    ControlsFPS.js     # Drag-to-look camera + auto-rotate + inertia physics
    CameraFocus.js     # Smooth tween to frame an object; moveTo(); returnHome()
    LocationManager.js # Named camera positions + waypoint path transitions
    CarouselFluidSim.js # GPU fluid simulation for interactive carousel wipe effects
    makeTextPlane.js   # Canvas → Texture → PlaneGeometry label mesh
    lights.js          # addDefaultLights(scene)
    hdri.js            # applyHDRI({ renderer, scene, url, backgroundUrl, background, envIntensity })
    Experiences/
      ImmersiveCarousel.js  # 360° image carousel — places visitor inside a ring of images
      ModelCarousel.js      # 360° 3D-model carousel — drag-to-rotate individual models on focus
      ModelGalleryWalk.js   # Linear walk-through model gallery experience
  shaders/
    revealshader.js           # makeRevealMaterial() + makeCarouselMaterial() — reveal + fluid-warp shaders
    gridShader.js             # makeArchGridMaterial() — architectural grid pattern (unused in demo)
    proximityRevealMaterial.js # ProximityRevealSystem + makeProximityRevealMaterial + applyProximityRevealToMaterial
  utils/
    tween.js           # makeTween01({ from, to, duration, onUpdate, onDone })
    gltfLoader.js      # loadGLTF / loadGLTFScene / loadGLTFWithAnimations — Draco-enabled, auto-retry
    dispose.js         # disposeObject3D(root) — recursive geometry/material/texture cleanup
  ui/
    InfoPanel.js       # DOM info panel, video + audio narration controls, transcript cues, artwork list
    TitleScreen.js     # Loading/title screen with progress bar and "extra interactions" toggle
    overlay.css        # All UI styles
  fonts/               # Swiss721BT font files (loaded by main.js before canvas creation)
```

## Key Systems

### App.js — Device Detection & Debug Tools

On startup `App.js` detects device capabilities and sets `isLowPower = true` if any of: `navigator.hardwareConcurrency < 4`, device RAM < 4 GB, or touch-only device. This flag is passed to `Renderer` to cap DPR at `1.0` and disable antialias on weak hardware (full DPR up to `2.0` otherwise).

When `screenManager.debugOn === true`, a live performance overlay is drawn each frame showing FPS, avg/max frame time, draw calls, triangle count, and GPU memory.

Call `window.__APP__.triReport()` in the browser console to log a scene triangle breakdown.

### Renderer.js — Post-Processing & Shadows

- **Post-processing**: The final render goes through an `EffectComposer` (RenderPass → ColorGradeShader). Do not call `renderer.render()` directly — the composer owns the render loop.
- **DPR cap**: `1.0` on low-power devices, `2.0` on capable hardware. Never uncapped.
- **Shadows**: `shadowMap.autoUpdate = false`. Shadows are **not** recalculated automatically. After adding or moving shadow-casting geometry at runtime, call `renderer.shadowMap.needsUpdate = true` once.

### Time.js — Frame Loop

- `dt` (delta time per frame) is clamped to a **50 ms max** to prevent enormous physics jumps when the tab returns from sleep.
- Uncaught errors inside the tick function are caught and logged to the console — the RAF loop keeps running.

### Focus State Machine (`World.js`)

```
idle → focusing → focused → returning → idle
```

- `_focusState` drives whether camera controls are active, what happens on click
- `_focusCooldown` (seconds) prevents re-clicks immediately after transitions
- `_focusedScreen` holds the active hitBox/model root
- Click on already-focused video artwork → toggles play/pause (no re-focus)
- Click on empty space → `onMiss` → `returnHome()` → stops video + narration, hides controls

### Adding an Artwork Screen

```js
this._registerArtwork(this.screenManager.addScreen({
  url: "/art/images/work.jpg",  // or .mp4/.webm/.ogg for video
  poster: "/art/images/still.jpg", // optional: shown before video focuses
  width: 3,           // world units
  height: 2,          // world units (aspect ratio → contain scale auto-computed)
  position: [x, y, z],
  rotation: [0, 90, 0], // degrees
  clickable: true,
  offsetClick: 0,       // Y offset on hitBox centre
  clickableSize: [3.6, 2.4], // defaults to [width*1.2, height*1.2]
  plinthVisible: true,  // shows grey pedestal box underneath
  text: "Label",        // canvas text label below screen
  artworkInfo: {
    title: "Work Title",
    artist: "Artist Name",
    description: "Description text shown in info panel.",
    narration: "/art/audio/work-title.m4a"  // optional — triggers audio player on focus
  }
}));
```

**Aspect ratio** is auto-detected from the loaded media (image `naturalWidth/Height`, video `videoWidth/videoHeight`) and applied to the shader as `uContainScale`. No manual step needed.

### Adding Audio Narration to an Artwork

Add `narration` to `artworkInfo` on any non-video artwork (image, model, or carousel):

```js
artworkInfo: {
  title: "Work Title",
  artist: "Artist Name",
  description: "Sentence one. Sentence two. Sentence three.",
  narration: "/art/audio/work-title.m4a"
}
```

On focus: `World._activateNarration(obj)` creates (or reuses) an `HTMLAudioElement` stored on `obj.userData.audioEl`, plays it, and `InfoPanel.showAudioControls(audio)` shows the scrubber. On unfocus: `_deactivateNarration()` pauses and `hideAudioControls()` hides the controls.

**Rules:**
- Video and narration are mutually exclusive — a video screen never shows audio controls
- The audio element is cached on `userData.audioEl` so re-focusing resumes from the paused position
- Only one narration plays at a time (`_activeNarration` in `World.js`)
- Recommended format: AAC `.m4a`, mono, 64 kbps (~1 MB / 2 min)
- Optional `narrationCues: "/art/audio/work-title.json"` — sentence-boundary timestamps for text sync. The JSON must have a `segments` array, each entry containing at minimum `start_time` and `end_time` (seconds). Place alongside the `.m4a`. See **Transcript cues** in the InfoPanel section below.

### Adding a Video Screen

Same as above with a `.mp4/.webm/.ogg` URL. Video behaviour:

- Stays paused (shows poster if set) until artwork is focused
- Autoplays on focus — waits for `readyState >= 3` or `canplay` event if still loading
- Pauses and restores poster on unfocus
- Only one video plays at a time (`ScreenManager._activeVideo`)
- Tap while focused → toggles play/pause

### Adding a Carousel (Content Screen)

```js
this._registerArtwork(this.screenManager.addContentScreen({
  content: {
    title: "Artist Name",
    artist: "Chancery Rosewood",
    bio: "Biography text…",
    images: ["img1.jpg", "img2.jpg", "img3.jpg"]
  },
  width: 2,
  height: 2.25,
  position: [x, y, z],
  rotation: [0, 30, 0],
  transitionDuration: 0.35, // cross-fade between images (seconds)
}).screenMesh);
// Note: returns { screenMesh, infoMesh, prevBtn, nextBtn, carousel }
// Must pass .screenMesh to _registerArtwork
```

### Adding a 3D Model

```js
this.screenManager.addModel({
  url: import.meta.env.BASE_URL + "/art/test3d/model.glb",
  position: [x, y, z],
  rotation: [0, 90, 0],  // degrees
  normalizeTo: 1.4,       // auto-scales largest dimension to this value
  clickable: true,
  hitboxSize: [1.0, 2.0, 1.0], // [w, h, d] — omit to auto-compute from bounds
  offsetClick: 0,
  plinthVisible: true,
  playAnimation: "first", // "first" | null | animation name
  artworkInfo: { title: "…", artist: "…", description: "…", narration: "/art/audio/…" }
}).then(modelRoot => {
  this._registerArtwork(modelRoot); // models load async
});
```

### Experiences (`src/world/Experiences/`)

Experiences are self-contained, focusable interactive objects with full lifecycle hooks: `onHit`, `onMiss`, `onUnfocus`, `onDrag`. Unlike plain screens/models they manage their own camera positioning, input routing, and internal navigation.

```js
// ImmersiveCarousel — places the visitor inside a ring of images
// Left/right swipe or carousel-prev/next buttons step through slides
// Uses makeCarouselMaterial() with fluid-sim wipe transitions
const carousel = new ImmersiveCarousel({ scene, camera, ... });
await carousel.load();
this._registerArtwork(carousel.screenMesh);

// ModelCarousel — ring of 3D models; drag-to-rotate each model while focused
const mc = new ModelCarousel({ scene, camera, models: [...], ... });
await mc.load();
this._registerArtwork(mc.root);
```

`ModelGalleryWalk` is in development — a linear walk-through model display.

Register experiences the same way as any artwork — `_registerArtwork` adds them to the navigation list.

### Adding a Location

```js
this.locations.setLocations({
  lobby:    { camera: { pos: [0, 0.8, 0],     lookAt: [0, 1.2, -1] } },
  galleryA: { camera: { pos: [-29, 0.8, -20], lookAt: [-14, 1.2, -6] } },
});
this.locations.goTo("galleryA", { duration: 1.5 });
```

Location buttons in `index.html` use `data-loc="galleryA"` — `App.js` binds them automatically.

#### Waypoint Paths

For a guided multi-segment transition between two locations:

```js
// One-directional path (A → B only)
this.locations.setPath("lobby", "galleryA", [
  { pos: [x1, y, z1], lookAt: [lx1, ly, lz1] },
  { pos: [x2, y, z2], lookAt: [lx2, ly, lz2] },
]);

// Bidirectional — automatically reverses waypoints for the B → A trip
this.locations.setPathBidirectional("lobby", "galleryA", waypoints);
```

Segment durations are weighted by world-space distance so the camera travels at a consistent speed. A shortest-arc quaternion correction prevents unwanted 360° rotations during turns.

## Reveal Shader (`makeRevealMaterial`)

All screens use a custom `THREE.ShaderMaterial` with these uniforms:

| Uniform | Type | Default | Purpose |
|---|---|---|---|
| `uMap` | `sampler2D` | — | Current texture |
| `uMapNext` | `sampler2D` | — | Target texture for cross-fade |
| `uRevealMap` | `sampler2D` | — | Radial grayscale mask |
| `uReveal` | `float` | `1.0` | `1` = hidden, `0` = fully visible |
| `uSoft` | `float` | `0.15` | Reveal edge softness |
| `uBlend` | `float` | `0.0` | Cross-fade between `uMap` and `uMapNext` |
| `uContainScale` | `vec2` | `(1,1)` | Letterbox/pillarbox scale — auto-set from media aspect |
| `uColorReveal` | `float` | `0.0` | 0 = greyscale, 1 = full colour — fades colour in after reveal |
| `uExposure` | `float` | `1.0` | Tone/brightness adjustment |

`uReveal` is driven by `World._animateReveal(mesh, from, to, duration)`.
`uContainScale` is computed by `ScreenManager._computeContainScale(mediaAspect, screenAspect)`:
- Media wider than screen → `(1.0, va/sa)` — black bars top/bottom
- Media taller than screen → `(sa/va, 1.0)` — black bars left/right

Note: `_makeRevealMaterial_(map)` (underscored name) is legacy dead code in the same file — ignore it. The active function is `makeRevealMaterial()`.

### Carousel material (`makeCarouselMaterial`)

Used by `ImmersiveCarousel` and fluid content screens. Adds interactive warp driven by `CarouselFluidSim`:

| Uniform | Purpose |
|---|---|
| `uSim` | Fluid simulation texture — drives interactive image warp |
| `uDragReveal` | 0–1 drag-progress reveal |
| `uWipeOrigin` | UV origin point of the wipe transition |
| `uIsTransitioning` | 1.0 while a slide transition is playing |

Transitions use procedural Perlin/fbm noise for a painterly wipe effect. Includes vignette and a speed-based glow that brightens edges during fast drags.

## Tween System

```js
const tween = makeTween01({
  from: 0, to: 1,
  duration: 0.4,           // seconds
  onUpdate: (v) => { … },  // called every frame
  onDone: () => { … }      // optional
});
tween.update(dt); // call in your update loop
tween.done        // true when finished
```

`World._tweens[]` stores active tweens and calls `update(dt)` each frame, auto-removing finished ones. Cancel tweens for a mesh with:
```js
this._tweens = this._tweens.filter(t => t.mesh !== mesh);
```

## Camera Controls (`ControlsFPS`)

- **Drag to look**: pointer down/move/up — accumulates raw deltas
- **Auto-rotate**: enabled by default, disabled during focus/location transitions; resumes after a 1 s pause following any input
- **Inertia**: `yawVel`/`pitchVel` decay via `Math.exp(-INERTIA_DECAY * dt)` (frame-rate independent)
- **Wheel**: nudges the camera **yaw** (horizontal pan), not a dolly. Internally accumulates into `yawNudgeVel`
- **Touch sensitivity**: `0.75×` mouse drag sensitivity (intentional — reduces over-rotation on mobile)
- **Pitch drift**: when idle, pitch slowly drifts back toward the horizon (`pitch *= 0.99` per frame)

Controls are suspended (`dragToLook = false`, `autoRotate = false`) while the camera is moving to a focus or location target.

## CameraFocus

`CameraFocus` computes a fit distance from the target's bounding sphere + camera FOV, then smoothly interpolates position (lerp) and orientation (slerp) using cubic easeInOut.

```js
// Used by ImmersiveCarousel to place the viewer at an explicit world position:
cameraFocus.moveTo({ position: [x, y, z], lookAt: [lx, ly, lz], duration: 1.2 });

// Save and restore "home" pose:
cameraFocus.setHomeFromCurrent(); // called automatically on first focus
cameraFocus.returnHome();         // smooth return when unfocusing
```

## Asset Paths

All static assets live in `/public/` and are referenced via `import.meta.env.BASE_URL`:

```
public/
  art/
    ArtistName_WorkTitle/   ← per-artist folder (any structure inside is fine)
      image.jpg
      3D/
        model.glb
    hdri/                   ← HDRI + background equirect images
    textures/
      radial-512px.jpg      ← reveal mask (required, do not remove)
      noise.png             ← optional tileable noise for proximity reveal edges
    audio/                  ← narration .mp3/.m4a files + cue JSON files
  Building/                 ← environment GLBs (lobby, bar, pavilion)
```

For assets hosted on a CDN, pass the full URL directly — `import.meta.env.BASE_URL` is only needed for files in `/public/`.

### `applyHDRI` — separate background

```js
applyHDRI({
  renderer, scene,
  url: "/art/hdri/lighting.jpg",          // used for reflections + env map
  backgroundUrl: "/art/hdri/skybox.jpg",  // separate equirect shown as sky (optional)
  background: true,
  envIntensity: 1.0
})
// If backgroundUrl is omitted, url is also used as the background.
// After load, envMapIntensity is set uniformly on every mesh in the scene.
```

### `gltfLoader` — variants and retry

```js
import { loadGLTF, loadGLTFScene, loadGLTFWithAnimations } from './utils/gltfLoader.js';

loadGLTF(url)               // → full GLTF object (scene + animations + metadata)
loadGLTFScene(url)          // → gltf.scene only
loadGLTFWithAnimations(url) // → { scene, animations }
```

All three variants retry automatically: **3 attempts total**, 8 s timeout per attempt, 2 s delay between retries. Failures are logged as warnings — not thrown — so a missing asset won't crash the RAF loop.

## UI (`InfoPanel.js`)

The info panel is a fixed DOM overlay (not Three.js). It appears when an artwork is focused.

Key methods:
```js
infoPanel.show({ title, artist, description }) // slide up + populate
infoPanel.hide()                                // slide down
infoPanel.showVideoControls(videoElement)       // show video play bar
infoPanel.hideVideoControls()
infoPanel.showAudioControls(audioElement)       // show narration play bar
infoPanel.hideAudioControls()
infoPanel.setRegistry(artworkRegistry)          // populate "All works" list
infoPanel.setActiveIndex(idx, total)            // highlight current item in list
infoPanel.setCues(segmentsArray)                // attach transcript cues for the active narration
```

Nav buttons (prev/next/list) live in `#menu` in `index.html`. Close button triggers `onClose` → `screenManager.onMiss?.()`.

Video and audio controls share identical CSS classes (`.video-ctrl__*`) but are scoped inside separate containers (`.info-panel__video` and `.info-panel__audio`). Never query `.video-ctrl__playpause` from the panel root — always scope to the parent container.

#### Transcript cues

When a narration cue file is provided (`narrationCues` in `artworkInfo`), `World.js` fetches the JSON and calls `infoPanel.setCues(data.segments)`. `InfoPanel` then highlights the matching sentence in `description` as the audio plays.

The cue file format (generated by services like AssemblyAI):
```json
{
  "segments": [
    { "start_time": 0.08, "end_time": 3.5, "text": "First sentence." },
    { "start_time": 3.5,  "end_time": 7.1, "text": "Second sentence." }
  ]
}
```

Keys are `start_time` / `end_time` (seconds). The `text` field is optional — the panel highlights sentences from `description` by index, not by text match.

#### Mobile header

On viewports narrower than 640 px, a fixed top-bar (`#mobile-artwork-header`) replaces the bottom info panel for the title/artist display. The bottom scrubber controls remain visible in both layouts.

## HTML Structure

```html
<div id="app">                    <!-- Three.js canvas mounts here -->
<div id="menu">                   <!-- Bottom-centre nav: artwork prev/next + location buttons -->
<div id="info-panel">             <!-- Bottom-left artwork info (slides up on focus) -->
  .info-panel__video              <!-- video scrubber — visible only for video artworks -->
  .info-panel__audio              <!-- narration scrubber — visible only for non-video artworks with narration -->
<div id="artwork-list">           <!-- Artwork list overlay (slides up from bottom-left) -->
<div id="mobile-artwork-header">  <!-- Fixed top bar on viewports < 640 px: title + artist -->
<div id="carousel-prev/next">     <!-- Carousel navigation buttons (wired by ImmersiveCarousel/ModelCarousel) -->
```

CSS classes toggle visibility:
- `.info-panel--visible` — info panel shown
- `.info-panel__video--visible` — video controls shown
- `.info-panel__audio--visible` — audio narration controls shown
- `.artwork-list--visible` — list shown

## Proximity Reveal System (`src/shaders/proximityRevealMaterial.js`)

A fog-of-war style environment reveal. GPU cost is a flat **2 texture samples per fragment** regardless of reveal count — O(1), safe on mobile/Safari.

### How it works

Three `Data3DTexture`s (192 × 64 × 192 voxels) are painted on the CPU and sampled in the fragment shader:
- `texture` — permanent reveals (camera trail + artwork focuses). Values only increase.
- `tempTexture` — tap/click/mouse-trail reveals that fade in then fade out.
- `goldTexture` — short-lived gold burst painted on `addPermanentReveal`, fades out over `GOLD_DUR_MS`.

Fragment shader mixes `uFogColor` → model's own diffuse colour based on `max(settled, temp)`.
`WORLD_MIN` / `WORLD_SIZE` in the file define the XZ world-space bounds the textures cover — adjust to match scene extents.

`NOISE_MODE = 'gpu'` (default) — noise sampled per-fragment in the shader. Set to `'cpu'` to bake noise into voxels at paint time instead (slightly different visual character, lower shader cost).

### Applying to GLB environment meshes

```js
// In World.js GLB traversal — preserves existing material textures/PBR
model.traverse((child) => {
  if (child.isMesh) {
    applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x000000 });
    this._envMeshes.push(child); // needed for tap raycast
  }
});
```

`makeProximityRevealMaterial(system, { color, fogColor, side })` creates a new `MeshLambertMaterial` with the shader already injected (used for simple coloured geometry).

### Feature flags

Toggle at runtime — e.g. from a settings page or `window.__APP__.world.proximityReveal.features`:

```js
world.proximityReveal.features.cameraTrail     = true;  // permanent trail left by camera movement
world.proximityReveal.features.permanentFadeIn = true;  // permanent reveals fade in (900ms)
world.proximityReveal.features.edgeNoise       = true;  // organic noise on reveal edges
world.proximityReveal.features.tapReveal       = true;  // tap/click paints a temporary reveal
world.proximityReveal.features.mouseTrail      = true;  // mouse movement paints temporary reveals while idle
world.proximityReveal.features.goldRing        = true;  // gold burst + persistent edge ring on permanent reveals
```

Disabling `edgeNoise` reduces CPU cost of `_paint()`. Disabling `tapReveal` or `mouseTrail` skips temporary reveal painting for those input modes.

### Tunable constants (top of file)

| Constant | Default | Effect |
|---|---|---|
| `REVEAL_RADIUS` | `5.0` | World-unit radius of camera/permanent circles |
| `TEMP_REVEAL_RADIUS` | `2.5` | World-unit radius of tap circles |
| `SAMPLE_DIST` | `0.2` | Camera must move this far before a new trail point is sampled |
| `TEX_W` / `TEX_D` | `192` | Horizontal voxel resolution (X and Z axes) |
| `TEX_H` | `64` | Vertical voxel resolution (Y axis — gallery is not very tall) |
| `FADE_IN_DUR_MS` | `900` | Permanent reveal fade-in duration (ms) |
| `TEMP_FADE_IN_MS` | `300` | Tap reveal fade-in duration (ms) |
| `TEMP_REVEAL_DUR` | `4.0` | Tap reveal fade-out duration (seconds) |
| `GOLD_DUR_MS` | `3000` | Gold ring burst duration on permanent reveals (ms) |
| `NOISE_MODE` | `'gpu'` | `'gpu'` = per-fragment shader noise; `'cpu'` = baked at paint time |

### Edge noise texture

Drop a tileable greyscale PNG at `public/art/textures/noise.png`. Loaded once on construction, sampled in `_paint()` for organic reveal edges. Falls back to a deterministic hash if missing (warning logged).

### Tap reveal wiring (World.js)

```js
// _doEnvTapReveal() — called from screenManager.onMiss when focusState === "idle"
this._envRay.setFromCamera(this._lastNDC, this.camera);
const hits = this._envRay.intersectObjects(this._envMeshes, false);
if (hits.length > 0) {
  this.proximityReveal.addTemporaryReveal(hits[0].point);
  this._lastMouseRevealPos = hits[0].point.clone(); // reset mouse-trail distance guard
}
```

`this._lastNDC` is updated on every `pointerdown` and `pointermove` event on the canvas.

### Mouse trail wiring (`World.js`)

`_tryMouseTrailReveal()` is called once per frame from `update()`. It consumes a dirty flag set by the `pointermove` listener, then raycasts against `_envMeshes` and calls `addTemporaryReveal` only if the hit point is more than **1.5 world units** from `_lastMouseRevealPos`. This prevents flooding `_activeTemp` during slow hover.

Mouse trail reveals only fire when `_focusState === "idle"` (not while focused on artwork or transitioning).

### Gold ring (implemented)

Third `goldTexture` Data3DTexture is painted on `addPermanentReveal` and fades out over `GOLD_DUR_MS` (3 s). Uniforms: `uRevealTexGold`, `uGoldColor`, `uGoldEdgeWidth`, `uGoldEdgeMult`. Controlled by `features.goldRing`.

## Environment

- **Build tool**: Vite 6, dev server at `https://localhost:8457` (HTTPS via basicSsl plugin)
- **GitHub Pages base path**: `/CRxUAL-Virtual-Exhibiton-2026/` (set by `build:gh` script)
- **Deploy**: `npm run deploy:gh` → `gh-pages` branch
- **Draco decoder**: loaded from `https://www.gstatic.com/draco/versioned/decoders/1.5.6/`
- **Debug flag**: `ScreenManager({ debugOn: true })` makes hitboxes visible and enables the FPS overlay
