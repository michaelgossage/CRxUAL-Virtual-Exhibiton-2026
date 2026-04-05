# CRxUAL Virtual Exhibition 2026

A Three.js-based interactive 3D virtual art exhibition. Visitors walk through a virtual gallery, click artworks to focus, read descriptions, watch video works, and listen to audio narrations.

---

## Quick Start

```bash
npm install
npm run dev       # dev server at http://localhost:5173 (also accessible on LAN)
npm run build     # production build → /dist
npm run deploy    # build + push to gh-pages
```

---

## Adding Content

All artworks are registered in `src/world/World.js`. Each call to `_registerArtwork()` adds the piece to the navigation list and makes it focusable.

---

### Image Artwork

```js
this._registerArtwork(this.screenManager.addScreen({
  url: "/art/images/work.jpg",
  width: 3,              // world units wide
  height: 2,             // world units tall
  position: [x, y, z],
  rotation: [0, 90, 0],  // degrees — Y rotation faces artwork toward viewer
  clickable: true,
  plinthVisible: true,   // grey pedestal below the screen
  text: "Work Title",    // small label rendered below the screen
  artworkInfo: {
    title: "Work Title",
    artist: "Artist Name",
    description: "Shown in the info panel when focused."
  }
}));
```

Aspect ratio is detected automatically from the image — no manual step needed.

---

### Video Artwork

Same as an image screen but point `url` at a video file:

```js
this._registerArtwork(this.screenManager.addScreen({
  url: "/art/film/work.mp4",        // .mp4 / .webm / .ogg
  poster: "/art/images/still.jpg",  // optional: frame shown before focus
  width: 3,
  height: 2,
  position: [x, y, z],
  rotation: [0, 0, 0],
  clickable: true,
  artworkInfo: {
    title: "Film Title",
    artist: "Artist Name",
    description: "Description shown in the info panel."
  }
}));
```

Video behaviour: stays paused until the visitor focuses the artwork, autoplays on focus, pauses and restores the poster on unfocus. Tapping while focused toggles play/pause. Only one video plays at a time.

---

### Audio Narration

Any non-video artwork can have a spoken narration that plays automatically when focused. Add a `narration` field to `artworkInfo`:

```js
artworkInfo: {
  title: "Work Title",
  artist: "Artist Name",
  description: "This sentence is read aloud. So is this one.",
  narration: "/art/audio/work-title.m4a"   // ← add this
}
```

When the visitor focuses this artwork, an audio player appears at the bottom of the info panel (identical in style to the video controls). The narration plays automatically and can be scrubbed, paused, or replayed.

**Recommended audio format:** AAC `.m4a`, mono, 64 kbps — approximately 1 MB per 2 minutes.

#### Synchronized text highlighting (optional)

To have the description highlight sentence-by-sentence as the narration plays, add a cues file alongside the audio and reference it in `artworkInfo`:

```js
artworkInfo: {
  title: "Work Title",
  artist: "Artist Name",
  description: "Sentence one. Sentence two. Sentence three.",
  narration: "/art/audio/work-title.m4a",
  narrationCues: "/art/audio/work-title.cues.json"
}
```

The cues file is a JSON array with one entry per sentence, in the same order as the sentences in `description`. Each entry has `start` and `end` in seconds:

```json
[
  { "start": 0.0,  "end": 4.2  },
  { "start": 4.2,  "end": 9.8  },
  { "start": 9.8,  "end": 15.1 }
]
```

Place the file next to the audio:

```
public/art/audio/
  work-title.m4a
  work-title.cues.json
```

#### Generating narration audio

**Option A — AI text-to-speech (recommended)**

Use ElevenLabs, OpenAI TTS, or similar. Paste the description text and download the audio file. These services produce natural-sounding voice at high quality and are fast to iterate.

**Option B — Self-recorded**

Record yourself reading the description in any DAW or voice recorder app. Export as `.m4a` or `.mp3`.

#### Asset location

Place audio files in:

```
public/art/audio/
  work-title.m4a
```

Reference them with a root-relative path: `"/art/audio/work-title.m4a"`.

---

### 3D Model

```js
this.screenManager.addModel({
  url: import.meta.env.BASE_URL + "art/models/sculpture.glb",
  position: [x, y, z],
  rotation: [0, 90, 0],  // degrees
  normalizeTo: 1.4,       // auto-scale: largest dimension → this value in world units
  clickable: true,
  plinthVisible: true,
  playAnimation: "first", // "first" | null | animation clip name
  artworkInfo: {
    title: "Sculpture Title",
    artist: "Artist Name",
    description: "Description."
  }
}).then(modelRoot => {
  this._registerArtwork(modelRoot); // models load async
});
```

Hitbox is computed automatically from the model bounds, or supply `hitboxSize: [w, h, d]` to override.

---

### Carousel / Biography Screen

Shows a title, bio text, and a cycling image gallery on a single screen:

```js
this._registerArtwork(this.screenManager.addContentScreen({
  content: {
    title: "Artist Name",
    artist: "Chancery Rosewood",
    bio: "Biography text shown alongside the images.",
    images: ["/art/images/img1.jpg", "/art/images/img2.jpg"]
  },
  width: 2,
  height: 2.25,
  position: [x, y, z],
  rotation: [0, 30, 0],
  transitionDuration: 0.35   // cross-fade between images, seconds
}).screenMesh);
```

Note: `addContentScreen` returns `{ screenMesh, infoMesh, prevBtn, nextBtn, carousel }` — pass `.screenMesh` to `_registerArtwork`.

---

## Locations

Named camera positions let visitors teleport around the space. Define them once:

```js
this.locations.setLocations({
  lobby:    { camera: { pos: [0, 0.8, 0],      lookAt: [0, 1.2, -1]   } },
  galleryA: { camera: { pos: [-29, 0.8, -20],  lookAt: [-14, 1.2, -6] } },
  galleryB: { camera: { pos: [15, 0.8, 5],     lookAt: [15, 1.2, -5]  } },
});
```

Add a button to `index.html`:

```html
<div class="btn" data-loc="galleryA">Gallery A</div>
```

`App.js` binds all `data-loc` buttons automatically. Switching location while an artwork is focused cleanly stops any playing video or narration before travelling.

---

## Proximity Reveal System

As visitors walk through the gallery, the environment geometry reveals its colour in a persistent trail behind the camera. Moving the mouse over the environment paints temporary circles that fade out after a few seconds. Clicking or tapping also paints a temporary reveal at that point. Focusing an artwork triggers a permanent reveal at that location, with a brief gold burst on the surrounding geometry.

The GPU cost is a fixed **3 texture samples per fragment** regardless of how many reveals exist — safe on mobile and Safari.

### Applying to environment GLBs

In `World.js`, inside the GLB `traverse` callback, call `applyProximityRevealToMaterial` instead of replacing the material. This preserves the model's existing textures and PBR properties:

```js
model.traverse((child) => {
  if (child.isMesh) {
    applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x000000 });
    this._envMeshes.push(child); // needed for tap/click raycasting
  }
});
```

`fogColor` is the hidden (unrevealed) colour — `0x000000` is black, `0xffffff` is white.

### Tuning

All constants are at the top of `src/shaders/proximityRevealMaterial.js`:

| Constant | Default | What it controls |
|---|---|---|
| `REVEAL_RADIUS` | `5.0` | World-unit radius of camera trail / permanent circles |
| `TEMP_REVEAL_RADIUS` | `2.5` | World-unit radius of tap/click/mouse-trail circles |
| `SAMPLE_DIST` | `0.2` | How far the camera must move before a new trail point is painted |
| `TEX_W` / `TEX_D` | `192` | Horizontal voxel resolution (X and Z axes) |
| `TEX_H` | `64` | Vertical voxel resolution (Y axis) |
| `FADE_IN_DUR_MS` | `900` | How long permanent reveals take to fade in (ms) |
| `TEMP_FADE_IN_MS` | `300` | How long tap/mouse reveals take to fade in (ms) |
| `TEMP_REVEAL_DUR` | `4.0` | How long temporary reveals stay visible before fading out (seconds) |
| `GOLD_DUR_MS` | `3000` | How long the gold burst lasts after a permanent reveal (ms) |

### Feature flags

Each behaviour can be toggled at runtime — useful for a settings/quality page, or to test performance on device:

```js
// Access from anywhere via the debug handle:
const f = window.__APP__.world.proximityReveal.features;

f.cameraTrail     = true;  // persistent colour trail as camera moves
f.permanentFadeIn = true;  // permanent reveals fade in smoothly (vs. instant pop)
f.edgeNoise       = true;  // organic noise texture on reveal edges
f.tapReveal       = true;  // tap/click on environment paints a temporary reveal
f.mouseTrail      = true;  // mouse movement paints temporary reveals while idle
f.goldRing        = true;  // gold burst + persistent edge ring on permanent reveals
```

Turning off `edgeNoise` reduces CPU cost per paint call. Turning off `tapReveal` or `mouseTrail` skips temporary reveal painting for those input modes.

### Edge noise texture

Drop any tileable greyscale PNG at:

```
public/art/textures/noise.png
```

It is loaded once at startup and used to add variation to reveal edges. Any resolution works — 128×128 or 256×256 is plenty. If the file is missing, a deterministic hash is used as a fallback (a warning is logged to the console).

Good sources: ambientCG, Poly Haven (greyscale noise / Perlin / Voronoi packs).

## Asset Folder Reference

```
public/
  art/
    images/     *.jpg / *.png / *.webp   — image artworks
    film/       *.mp4 / *.webm           — video artworks
    audio/      *.m4a / *.mp3            — narrations
    models/     *.glb                    — 3D models + environment geometry
    hdri/       *.hdr                    — environment lighting
    textures/   radial-512px.jpg         — artwork reveal mask (required, do not remove)
                noise.png               — optional tileable noise for proximity reveal edges
```

For images or audio hosted on a CDN, pass the full URL directly — e.g. `"https://cdn.example.com/art/work.jpg"`.

---

## Deployment

```bash
npm run deploy   # builds and pushes to the gh-pages branch
```

The site is served from the path `/CRxUAL-Virtual-Exhibiton-2026/`. All `import.meta.env.BASE_URL` references resolve correctly after build.

---

## Debugging

Pass `debugOn: true` when constructing `ScreenManager` in `World.js` to make hitboxes visible as wireframe boxes — useful when positioning clickable areas:

```js
this.screenManager = new ScreenManager({ scene: this.scene, camera: this.camera, debugOn: true });
```
