# CRxUAL Virtual Exhibition 2026 — Developer Guide

A Three.js-based interactive 3D virtual art exhibition. Visitors walk through a virtual gallery, click on artworks to focus, read info, and watch video works.

## Commands

```bash
npm run dev      # Vite dev server (network-accessible via host: true)
npm run build    # Production build → /dist
npm run deploy   # build + push to gh-pages
```

## Architecture

```
src/
  main.js              # Entry point — creates App, exposes window.__APP__
  core/
    App.js             # Root orchestrator: wires Time → Renderer + World
    EventBus.js        # Pub/sub (Map-based): on/off/emit
    Sizes.js           # Window resize tracking, emits "resize"
    Time.js            # rAF loop, emits "tick" with { dt }
    Renderer.js        # WebGLRenderer setup, shadow mapping
    CameraRig.js       # PerspectiveCamera + resize handler
    SceneManager.js    # Recursive scene disposal helper
  world/
    World.js           # Scene content, focus state machine, artwork registry
    ScreenManager.js   # Screens, videos, 3D models, raycasting, click dispatch
    ControlsFPS.js     # Drag-to-look camera + auto-rotate + inertia physics
    CameraFocus.js     # Smooth tween to frame an object, returnHome()
    LocationManager.js # Named camera preset positions (lobby, galleryA…)
    makeTextPlane.js   # Canvas → Texture → PlaneGeometry label mesh
    lights.js          # addDefaultLights(scene)
    hdri.js            # applyHDRI({ renderer, scene, url, background, envIntensity })
  shaders/
    revealshader.js           # makeRevealMaterial() — radial wipe reveal + texture blend + contain scale
    gridShader.js             # makeArchGridMaterial() — architectural grid pattern (unused in demo)
    proximityRevealMaterial.js # ProximityRevealSystem + makeProximityRevealMaterial + applyProximityRevealToMaterial
  utils/
    tween.js           # makeTween01({ from, to, duration, onUpdate, onDone })
    gltfLoader.js      # loadGLTFWithAnimations(url) — Draco-enabled GLTF loader
    dispose.js         # disposeObject3D(root) — recursive geometry/material/texture cleanup
  ui/
    InfoPanel.js       # DOM info panel, video + audio narration controls, artwork list
    overlay.css        # All UI styles
```

## Key Systems

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
- Optional `narrationCues: "/art/audio/work-title.cues.json"` — sentence-boundary timestamps for Phase 3 text sync. One `{ start, end }` object per sentence, matching sentence order in `description`. Place alongside the `.m4a`.

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

### Adding a Location

```js
this.locations.setLocations({
  lobby:    { camera: { pos: [0, 0.8, 0],     lookAt: [0, 1.2, -1] } },
  galleryA: { camera: { pos: [-29, 0.8, -20], lookAt: [-14, 1.2, -6] } },
});
this.locations.goTo("galleryA", { duration: 1.5 });
```

Location buttons in `index.html` use `data-loc="galleryA"` — `App.js` binds them automatically.

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

`uReveal` is driven by `World._animateReveal(mesh, from, to, duration)`.
`uContainScale` is computed by `ScreenManager._computeContainScale(mediaAspect, screenAspect)`:
- Media wider than screen → `(1.0, va/sa)` — black bars top/bottom
- Media taller than screen → `(sa/va, 1.0)` — black bars left/right

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
- **Auto-rotate**: enabled by default, disabled during focus/location transitions
- **Inertia**: `yawVel`/`pitchVel` decay via `Math.exp(-INERTIA_DECAY * dt)` (frame-rate independent)
- **Wheel zoom**: moves camera forward/backward along look direction

Controls are suspended (`dragToLook = false`, `autoRotate = false`) while the camera is moving to a focus or location target.

## Asset Paths

All static assets live in `/public/` and are referenced via `import.meta.env.BASE_URL`:

```
public/
  art/
    hdri/     qwantani_dusk_2_puresky_4k.hdr
    textures/ radial-512px.jpg   ← reveal mask (required, do not remove)
    models/   *.glb
    film/     *.mp4
    audio/    *.m4a              ← narration files
              *.cues.json       ← optional sentence timestamps for text sync
    images/   *.jpg / *.png
```

For assets hosted on a CDN, pass the full URL directly — `import.meta.env.BASE_URL` is only needed for files in `/public/`.

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
```

Nav buttons (prev/next/list) live in `#menu` in `index.html`. Close button triggers `onClose` → `screenManager.onMiss?.()`.

Video and audio controls share identical CSS classes (`.video-ctrl__*`) but are scoped inside separate containers (`.info-panel__video` and `.info-panel__audio`). Never query `.video-ctrl__playpause` from the panel root — always scope to the parent container.

## HTML Structure

```html
<div id="app">          <!-- Three.js canvas mounts here -->
<div id="menu">         <!-- Bottom-centre nav: artwork prev/next + location buttons -->
<div id="info-panel">   <!-- Bottom-left artwork info (slides up on focus) -->
  .info-panel__video    <!-- video scrubber — visible only for video artworks -->
  .info-panel__audio    <!-- narration scrubber — visible only for non-video artworks with narration -->
<div id="artwork-list"> <!-- Artwork list overlay (slides up from bottom-left) -->
```

CSS classes toggle visibility:
- `.info-panel--visible` — info panel shown
- `.info-panel__video--visible` — video controls shown
- `.info-panel__audio--visible` — audio narration controls shown
- `.artwork-list--visible` — list shown

## Proximity Reveal System (`src/shaders/proximityRevealMaterial.js`)

A fog-of-war style environment reveal. GPU cost is a flat **2 texture samples per fragment** regardless of reveal count — O(1), safe on mobile/Safari.

### How it works

- Two `256×256` single-channel `DataTexture`s are painted on the CPU and sampled in the fragment shader:
  - `texture` — permanent reveals (camera trail + artwork focuses). Never decreases.
  - `tempTexture` — tap/click reveals that fade in then fade out.
- Fragment shader mixes `uFogColor` → model's own diffuse colour based on `max(settled, temp)`.
- `WORLD_MIN` / `WORLD_SIZE` in the file define the XZ world-space bounds the textures cover — adjust to match scene extents.

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
```

Disabling `edgeNoise` reduces CPU cost of `_paint()`. Disabling `tapReveal` skips the temp texture entirely.

### Tunable constants (top of file)

| Constant | Default | Effect |
|---|---|---|
| `REVEAL_RADIUS` | `5.0` | World-unit radius of camera/permanent circles |
| `TEMP_REVEAL_RADIUS` | `2.5` | World-unit radius of tap circles |
| `SAMPLE_DIST` | `0.1` | Camera must move this far before a new trail point is sampled |
| `TEX_SIZE` | `256` | Texture resolution — `512` gives smoother edges, costs more VRAM |
| `FADE_IN_DUR_MS` | `900` | Permanent reveal fade-in duration (ms) |
| `TEMP_FADE_IN_MS` | `300` | Tap reveal fade-in duration (ms) |
| `TEMP_REVEAL_DUR` | `4.0` | Tap reveal fade-out duration (seconds) |

### Edge noise texture

Drop a tileable greyscale PNG at `public/art/textures/noise.png`. Loaded once on construction, sampled in `_paint()` for organic reveal edges. Falls back to a deterministic hash if missing (warning logged).

### Tap reveal wiring (World.js)

```js
// _doEnvTapReveal() — called from screenManager.onMiss when focusState === "idle"
this._envRay.setFromCamera(this._lastNDC, this.camera);
const hits = this._envRay.intersectObjects(this._envMeshes, false);
if (hits.length > 0) this.proximityReveal.addTemporaryReveal(hits[0].point);
```

`this._lastNDC` is updated on every `pointerdown` event on the canvas.

### Step 4 (not yet implemented)
Gold expansion + persistent edge ring — third `goldTexture` DataTexture, fires on `addPermanentReveal`, fades out over ~3s. Will add `uRevealTexGold`, `uGoldColor`, `uGoldEdgeMult` uniforms and a `features.goldRing` flag.

## Environment

- **Build tool**: Vite 5, base path `/CRxUAL-Virtual-Exhibiton-2026/`
- **Deploy**: `npm run deploy` → `gh-pages` branch
- **Draco decoder**: loaded from `https://www.gstatic.com/draco/versioned/decoders/1.5.6/`
- **Debug flag**: `ScreenManager({ debugOn: true })` makes hitboxes visible
