import * as THREE from "three";
import { makeRevealMaterial } from "../../shaders/revealshader.js";
import { makeTween01 } from "../../utils/tween.js";

const _easeInOut = (t) => t * t * (3 - 2 * t);
const _clamp01   = (t) => Math.max(0, Math.min(1, t));
const _WORLD_UP  = new THREE.Vector3(0, 1, 0);

/**
 * ImmersiveCarousel — still images arranged in a ring; camera moves to ring
 * centre on focus so images surround the viewer.
 *
 * Interaction flow:
 *   Click entry hitbox         → camera moves inside ring; side panels stagger in
 *   ‹/› arrows or arrow keys  → ring rotates to adjacent image
 *   Click panel hitbox         → ring rotates to bring that image to front
 *   Click empty space          → exit (World.js returns home)
 *
 * Experience interface: onFocus(camera, triggerObj), onUnfocus(), onNav(dir),
 *                       onHit(obj), onMiss(), update(dt)
 */
export class ImmersiveCarousel {
  constructor({
    scene,
    images = [],            // [{ url, artworkInfo? }]
    position = [0, 0, 0],
    rotation = [0, 0, 0],  // degrees [x, y, z]
    radius = null,          // world units; auto-computed from N if null
    panelWidth  = 2.5,
    panelHeight = 2.0,
    artworkInfo = {},       // shown on initial entry click
    debugOn = false,
  }) {
    this.scene        = scene;
    this._imageDefs   = images;
    this._panelWidth  = panelWidth;
    this._panelHeight = panelHeight;
    this.artworkInfo  = artworkInfo;
    this._debugOn     = debugOn;

    const deg = Math.PI / 180;
    this._baseYDeg = rotation[1];

    const n = Math.max(1, images.length);
    // Auto-radius: arc between adjacent panels > panel width * 1.3
    this._radius = radius != null
      ? radius
      : Math.max(2.5, (panelWidth * n * 1.3) / (2 * Math.PI));

    this.root = new THREE.Group();
    this.root.position.set(...position);
    this.root.rotation.set(rotation[0] * deg, rotation[1] * deg, rotation[2] * deg);
    scene.add(this.root);

    // ring is a child of root and rotates Y to cycle images
    this.ring = new THREE.Group();
    this.root.add(this.ring);

    this.hitbox          = null;  // central entry hitbox (child of root)
    this._panelHitboxes  = [];    // per-panel hitboxes (children of ring)
    this.modelHitboxes   = [];    // stays EMPTY — panel hitboxes managed dynamically
    this.arrowPrev       = null;  // 3D ‹ plane (child of root)
    this.arrowNext       = null;  // 3D › plane (child of root)

    this.activeIndex    = 0;
    this._panels        = [];     // [{ mesh, material }]
    this._isFocused     = false;
    this._rotTween      = null;
    this._colorTween    = null;  // greyscale → colour on first focus
    this._currentAngle  = 0;     // ring.rotation.y — separate from root's base angle
    this._revealTweens  = [];    // [{ mesh, elapsed, duration }] — side panel fade-in
    this._clickables    = null;  // set by World.js after _registerExperience

    this._textureLoader = new THREE.TextureLoader();
  }

  async load() {
    const defs = this._imageDefs;
    const n    = defs.length;
    if (!n) return this;

    const R  = this._radius;
    const W  = this._panelWidth;
    const H  = this._panelHeight;
    const SA = W / H;
    const step = (2 * Math.PI) / n;

    // Shared reveal mask — only needed for the front panel's reveal shader
    const revealTex = this._textureLoader.load(
      import.meta.env.BASE_URL + "/art/textures/radial-512px.jpg"
    );
    revealTex.wrapS = revealTex.wrapT = THREE.ClampToEdgeWrapping;
    revealTex.minFilter = revealTex.magFilter = THREE.LinearFilter;

    for (let i = 0; i < n; i++) {
      const def   = defs[i];
      const angle = step * i; // i=0 → +Z in ring-local space (front, facing camera)
      let mesh, material;

      if (i === 0) {
        // Front panel — uses the reveal shader so World.js can animate the radial wipe
        const tex = this._textureLoader.load(def.url, (loaded) => {
          const img = loaded.image;
          if (img?.naturalWidth > 0) {
            material.uniforms.uContainScale.value =
              _computeContainScale(img.naturalWidth / img.naturalHeight, SA);
          }
        });
        material = makeRevealMaterial({ map: tex, revealMap: revealTex });
        material.uniforms.uReveal.value = 0.0; // start visible, like all other artworks
        material.side = THREE.FrontSide;
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H), material);
      } else {
        // Side panels — simple transparent material, opacity tweened on focus
        const tex = this._textureLoader.load(def.url, (loaded) => {
          const img = loaded.image;
          if (img?.naturalWidth > 0) _applyCoverFit(tex, img.naturalWidth / img.naturalHeight, SA);
        });
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        material = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0,
          side: THREE.FrontSide,
          depthWrite: false,
          toneMapped: false,
        });
        mesh = new THREE.Mesh(new THREE.PlaneGeometry(W, H), material);
        mesh.visible = false;
      }

      // Place panel in ring — i=0 at +Z, others evenly spaced
      mesh.position.set(Math.sin(angle) * R, 0, Math.cos(angle) * R);
      mesh.lookAt(0, 0, 0); // front face toward ring centre = camera when focused
      this.ring.add(mesh);
      this._panels.push({ mesh, material });

      // Per-panel hitbox — child of ring so it auto-rotates; hidden until focused
      const hb = new THREE.Mesh(
        new THREE.BoxGeometry(W * 1.15, H * 1.15, 0.1),
        new THREE.MeshBasicMaterial({
          color: 0x00ffff, wireframe: true, visible: this._debugOn,
        })
      );
      hb.position.copy(mesh.position);
      hb.quaternion.copy(mesh.quaternion);
      hb.visible = false; // shown only when experience is focused
      hb.userData.artworkInfo = def.artworkInfo ?? this.artworkInfo;
      hb.userData.experience  = this; // tag for World.js routing
      this.ring.add(hb);
      this._panelHitboxes.push(hb);
    }

    // modelHitboxes stays empty — panel hitboxes are added/removed from clickables
    // dynamically in onFocus/onUnfocus so they can never be hit while hidden

    // ── Central entry hitbox — front-panel-sized, child of root ─────────────
    // Covers only the visible front image so clicking elsewhere doesn't trigger entry.
    this.hitbox = new THREE.Mesh(
      new THREE.BoxGeometry(W * 1.15, H * 1.15, 0.3),
      new THREE.MeshBasicMaterial({
        color: 0xff8800, wireframe: true, visible: this._debugOn,
      })
    );
    // Position at front panel location in root-local space and face inward
    this.hitbox.position.set(0, 0, R);
    this.hitbox.lookAt(new THREE.Vector3(0, 0, 0));
    this.hitbox.userData.artworkInfo     = defs[0].artworkInfo ?? this.artworkInfo;
    this.hitbox.userData.focusTarget     = this.hitbox;
    // No revealTarget — we own the greyscale→colour tween ourselves in onFocus()
    this.hitbox.userData.experienceOwner = this;
    this.root.add(this.hitbox); // child of root — moves with the carousel

    // Back-fill: panel hitboxes redirect focus to the central hitbox (no camera re-move)
    for (const hb of this._panelHitboxes) {
      hb.userData.focusTarget = this.hitbox;
    }

    // ── Bake focus pose onto hitbox so _focusOnObj() uses moveTo() ───────────
    this._bakeFocusPose();

    // ── 3D arrow planes ──────────────────────────────────────────────────────
    this.arrowPrev = _makeArrowPlane("‹");
    this.arrowNext = _makeArrowPlane("›");

    const ax = W / 2 + 0.55;
    const az = R - 0.05;
    this.arrowPrev.position.set(-ax, 0, az); // root-local space
    this.arrowNext.position.set( ax, 0, az);
    // Face inward (toward ring centre = camera when focused)
    this.arrowPrev.lookAt(new THREE.Vector3(0, 0, 0));
    this.arrowNext.lookAt(new THREE.Vector3(0, 0, 0));
    this.arrowPrev.visible = false;
    this.arrowNext.visible = false;
    this.arrowPrev.userData.experience = this;
    this.arrowNext.userData.experience = this;
    this.root.add(this.arrowPrev);
    this.root.add(this.arrowNext);

    return this;
  }

  // ── Experience interface ───────────────────────────────────────────────────

  onFocus() {
    this._isFocused = true;
    this.hitbox.visible = false;
    this.arrowPrev.visible = true;
    this.arrowNext.visible = true;

    // Add panel hitboxes to the live raycast list so they can be clicked
    if (this._clickables) {
      for (const hb of this._panelHitboxes) {
        if (!this._clickables.includes(hb)) this._clickables.push(hb);
      }
    }

    // Greyscale → colour on the front panel (only animates once; stays colour after)
    const frontMat = this._panels[0].material;
    const fromColor = frontMat.uniforms.uColorReveal.value;
    if (fromColor < 1.0) {
      this._colorTween = makeTween01({
        from: fromColor, to: 1.0, duration: 1.5,
        onUpdate: (v) => { frontMat.uniforms.uColorReveal.value = v; },
      });
    }

    // Staggered fade-in for side panels
    this._revealTweens = [];
    for (let i = 1; i < this._panels.length; i++) {
      this._revealTweens.push({
        mesh: this._panels[i].mesh,
        elapsed: -(i * 0.1),
        duration: 0.45,
      });
    }
  }

  onUnfocus() {
    this._isFocused = false;
    this.hitbox.visible = true;
    this.arrowPrev.visible = false;
    this.arrowNext.visible = false;

    // Remove panel hitboxes from the raycast list — only entry hitbox clickable from outside
    if (this._clickables) {
      for (const hb of this._panelHitboxes) {
        const idx = this._clickables.indexOf(hb);
        if (idx !== -1) this._clickables.splice(idx, 1);
      }
    }

    // Instantly hide side panels; clear any in-progress fade tweens
    this._revealTweens = [];
    for (let i = 1; i < this._panels.length; i++) {
      const { mesh, material } = this._panels[i];
      material.opacity = 0;
      mesh.visible     = false;
    }

    // Snap ring to index 0 for clean re-entry
    this.activeIndex   = 0;
    this._currentAngle = 0;
    this.ring.rotation.y = 0;
    this._rotTween = null;

    this.hitbox.userData.artworkInfo = this._imageDefs[0].artworkInfo ?? this.artworkInfo;
  }

  onMiss() {
    return false; // World.js handles exit to gallery
  }

  onNav(dir) {
    const n = this._panels.length;
    if (n <= 1) return null;
    const next = ((this.activeIndex + dir) % n + n) % n;
    this._rotateToIndex(next);
    this.activeIndex = next;
    const info = this._imageDefs[next].artworkInfo ?? this.artworkInfo;
    this.hitbox.userData.artworkInfo = info;
    return { consumed: true, artworkInfo: info };
  }

  onHit(obj) {
    if (obj === this.arrowPrev) return this.onNav(-1);
    if (obj === this.arrowNext) return this.onNav(+1);

    const idx = this._panelHitboxes.indexOf(obj);
    if (idx !== -1) {
      this._rotateToIndex(idx);
      this.activeIndex = idx;
      const info = this._imageDefs[idx].artworkInfo ?? this.artworkInfo;
      this.hitbox.userData.artworkInfo = info;
      return { consumed: true, artworkInfo: info };
    }
    return false;
  }

  update(dt) {
    if (this._rotTween) {
      this._rotTween.update(dt);
      if (this._rotTween.done) this._rotTween = null;
    }

    if (this._colorTween) {
      this._colorTween.update(dt);
      if (this._colorTween.done) this._colorTween = null;
    }

    // Step side-panel fade-in tweens
    for (let i = this._revealTweens.length - 1; i >= 0; i--) {
      const t = this._revealTweens[i];
      t.elapsed += dt;
      if (t.elapsed < 0) continue; // still in delay window
      if (!t.mesh.visible) t.mesh.visible = true;
      const a = _easeInOut(_clamp01(t.elapsed / t.duration));
      t.mesh.material.opacity = a;
      if (t.elapsed >= t.duration) {
        t.mesh.material.opacity = 1;
        this._revealTweens.splice(i, 1);
      }
    }
  }

  // ── Internal ───────────────────────────────────────────────────────────────

  _bakeFocusPose() {
    this.root.updateWorldMatrix(true, false);

    const worldPos = new THREE.Vector3();
    this.root.getWorldPosition(worldPos);

    // +Z of root in world space = the "front" direction (toward panel 0)
    const rootQuat = new THREE.Quaternion();
    this.root.getWorldQuaternion(rootQuat);
    const frontDir = new THREE.Vector3(0, 0, 1).applyQuaternion(rootQuat);

    // Camera sits 0.3 units toward front panel — avoids exact-centre near-plane edge case
    const camPos    = worldPos.clone().addScaledVector(frontDir, 0.3);
    const lookTarget = worldPos.clone().addScaledVector(frontDir, this._radius);

    const mat  = new THREE.Matrix4().lookAt(camPos, lookTarget, _WORLD_UP);
    const quat = new THREE.Quaternion().setFromRotationMatrix(mat);

    this.hitbox.userData.focusPose = { position: camPos, quaternion: quat, duration: 0.9 };
  }

  _rotateToIndex(index, duration = 0.6) {
    const step   = (2 * Math.PI) / this._panels.length;
    const target = -(step * index);
    this._rotTween = makeTween01({
      from: this._currentAngle,
      to:   target,
      duration,
      onUpdate: (v) => {
        this._currentAngle  = v;
        this.ring.rotation.y = v;
      },
    });
  }
}

// ── Module-level helpers ───────────────────────────────────────────────────

function _computeContainScale(mediaAspect, screenAspect) {
  // Used by makeRevealMaterial uniform — centres media with black bars
  if (mediaAspect > screenAspect) {
    return new THREE.Vector2(1.0, screenAspect / mediaAspect);
  }
  return new THREE.Vector2(mediaAspect / screenAspect, 1.0);
}

function _applyCoverFit(tex, mediaAspect, screenAspect) {
  // Fills the panel completely, cropping the longer axis — no black bars
  if (mediaAspect > screenAspect) {
    const rx = screenAspect / mediaAspect;
    tex.repeat.set(rx, 1);
    tex.offset.set((1 - rx) / 2, 0);
  } else {
    const ry = mediaAspect / screenAspect;
    tex.repeat.set(1, ry);
    tex.offset.set(0, (1 - ry) / 2);
  }
  tex.needsUpdate = true;
}

function _makeArrowPlane(symbol) {
  const size   = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.font         = "bold 96px sans-serif";
  ctx.fillStyle    = "#ffffff";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, size / 2, size / 2 + 4);
  const mat = new THREE.MeshBasicMaterial({
    map:         new THREE.CanvasTexture(canvas),
    transparent: true,
    depthTest:   false,
    side:        THREE.DoubleSide,
  });
  return new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), mat);
}
