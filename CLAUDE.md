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
    revealshader.js    # makeRevealMaterial() — radial wipe reveal + texture blend + contain scale
    gridShader.js      # makeArchGridMaterial() — architectural grid pattern (unused in demo)
  utils/
    tween.js           # makeTween01({ from, to, duration, onUpdate, onDone })
    gltfLoader.js      # loadGLTFWithAnimations(url) — Draco-enabled GLTF loader
    dispose.js         # disposeObject3D(root) — recursive geometry/material/texture cleanup
  ui/
    InfoPanel.js       # DOM info panel, video controls, artwork list
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
- Click on empty space → `onMiss` → `returnHome()`

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
    description: "Description text shown in info panel."
  }
}));
```

**Aspect ratio** is auto-detected from the loaded media (image `naturalWidth/Height`, video `videoWidth/videoHeight`) and applied to the shader as `uContainScale`. No manual step needed.

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
  artworkInfo: { title: "…", artist: "…", description: "…" }
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
    textures/ radial-512px.jpg   ← reveal mask (required)
    test3d/   *.glb
    film/     *.mp4
```

For images served from external URLs or a CDN, pass the full URL directly.

## UI (`InfoPanel.js`)

The info panel is a fixed DOM overlay (not Three.js). It appears when an artwork is focused.

Key methods:
```js
infoPanel.show({ title, artist, description }) // slide up + populate
infoPanel.hide()                                // slide down
infoPanel.showVideoControls(videoElement)       // show play bar
infoPanel.hideVideoControls()
infoPanel.setRegistry(artworkRegistry)          // populate "All works" list
infoPanel.setActiveIndex(idx, total)            // highlight current item in list
```

Nav buttons (prev/next/list) live in `#menu` in `index.html`. Close button triggers `onClose` → `screenManager.onMiss?.()`.

## HTML Structure

```html
<div id="app">         <!-- Three.js canvas mounts here -->
<div id="menu">        <!-- Bottom-centre nav: artwork prev/next + location buttons -->
<div id="info-panel">  <!-- Bottom-left artwork info (slides up on focus) -->
<div id="artwork-list"> <!-- Artwork list overlay (slides up from bottom-left) -->
```

CSS classes toggle visibility:
- `.info-panel--visible` — info panel shown
- `.info-panel__video--visible` — video controls shown
- `.artwork-list--visible` — list shown

## Environment

- **Build tool**: Vite 5, base path `/CRxUAL-Virtual-Exhibiton-2026/`
- **Deploy**: `npm run deploy` → `gh-pages` branch
- **Draco decoder**: loaded from `https://www.gstatic.com/draco/versioned/decoders/1.5.6/`
- **Debug flag**: `ScreenManager({ debugOn: true })` makes hitboxes visible
