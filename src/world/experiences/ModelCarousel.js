import * as THREE from "three";
import { loadGLTFWithAnimations } from "../../utils/gltfLoader.js";
import { makeTween01 } from "../../utils/tween.js";

const _WORLD_UP = new THREE.Vector3(0, 1, 0);

/**
 * ModelCarousel — models arranged in a fixed circle; camera stays at one position.
 *
 * Interaction flow:
 *   Click carousel area   → camera moves to a fixed viewpoint looking at the ring
 *   Click background model / prev / next → ring rotates to bring that model to front
 *   Camera never moves after initial focus
 *   Click empty space → exit experience (World.js returns home)
 *
 * Hitboxes are children of this.root so they rotate with the ring automatically.
 *
 * Experience interface: onFocus(camera, triggerObj), onUnfocus(), onNav(dir),
 *                       onHit(obj), onMiss(), update(dt)
 */
export class ModelCarousel {
  constructor({
    scene,
    models = [],          // [{ url, playAnimation?, artworkInfo? }]
    position = [0, 0, 0],
    rotation = [0, 0, 0], // degrees [x, y, z]
    radius = 2.5,
    normalizeTo = null,
    artworkInfo = {},
    debugOn = false,
  }) {
    this.scene = scene;
    this._modelDefs = models;
    this._position = position;
    this._radius = radius;
    this._normalizeTo = normalizeTo;
    this.artworkInfo = artworkInfo;
    this._debugOn = debugOn;

    const deg = Math.PI / 180;
    this._baseAngle = rotation[1] * deg;

    this.root = new THREE.Group();
    this.root.position.set(...position);
    this.root.rotation.set(rotation[0] * deg, rotation[1] * deg, rotation[2] * deg);
    scene.add(this.root);

    this.hitbox = null;       // central entry hitbox (world-space, registered in registry)
    this.modelHitboxes = [];  // per-model hitboxes (children of root, rotate with ring)
    this.activeIndex = 0;
    this._models = [];        // [{ root, mixer, artworkInfo }]
    this._isFocused = false;
    this._rotTween = null;
    this._currentAngle = this._baseAngle;
  }

  async load() {
    const defs = this._modelDefs;
    const n = defs.length;
    if (!n) return;

    const loaded = await Promise.all(defs.map(d => loadGLTFWithAnimations(d.url)));

    for (let i = 0; i < n; i++) {
      const def = defs[i];
      const { scene: modelRoot, animations } = loaded[i];

      if (typeof this._normalizeTo === "number") {
        this._normalizeToSize(modelRoot, this._normalizeTo);
      }

      // Per-model scale (applied on top of normalizeTo)
      if (def.scale != null) {
        const s = typeof def.scale === "number" ? def.scale : 1;
        const sv = Array.isArray(def.scale) ? def.scale : [s, s, s];
        modelRoot.scale.multiply(new THREE.Vector3(...sv));
      }

      // Fixed ring position — model 0 at +Z (front, toward camera)
      const deg = Math.PI / 180;
      const angle = (2 * Math.PI / n) * i;
      const rx = (def.rotation?.[0] ?? 0) * deg;
      const ry = (def.rotation?.[1] ?? 0) * deg;
      const rz = (def.rotation?.[2] ?? 0) * deg;

      modelRoot.position.set(
        Math.sin(angle) * this._radius,
        0,
        Math.cos(angle) * this._radius
      );
      // Ring facing (outward) + per-model Y offset; X/Z are pure user offsets
      modelRoot.rotation.set(rx, angle + Math.PI + ry, rz);

      // Animation mixer — paused until this model is active and focused
      let mixer = null;
      const play = def.playAnimation;
      if (animations?.length && play) {
        mixer = new THREE.AnimationMixer(modelRoot);
        if (play === "all") {
          for (const clip of animations) mixer.clipAction(clip).play();
        } else {
          const clip = play === "first"
            ? animations[0]
            : (animations.find(a => a.name === play) ?? animations[0]);
          mixer.clipAction(clip).play();
        }
        mixer.update(0);
        mixer.timeScale = 0;
      }

      // Tag all mesh descendants for experience routing in World.js
      modelRoot.traverse(child => { child.userData.experienceOwner = this; });

      this._models.push({ root: modelRoot, mixer, artworkInfo: def.artworkInfo ?? null });
      this.root.add(modelRoot);

      // Compute ACTUAL geometry bounds after the model is placed in the ring so
      // the hitbox wraps real visible geometry, not just the pivot position.
      this.root.updateWorldMatrix(true, true);
      const worldBox = new THREE.Box3().setFromObject(modelRoot);
      const worldCenter = worldBox.getCenter(new THREE.Vector3());
      const worldSize   = worldBox.getSize(new THREE.Vector3());

      // Convert world centre to root-local space (root has no rotation yet at load time)
      const localCenter = worldCenter.clone().sub(this.root.getWorldPosition(new THREE.Vector3()));

      const hb = new THREE.Mesh(
        new THREE.BoxGeometry(
          Math.max(0.4, worldSize.x * 1.15),
          Math.max(0.4, worldSize.y * 1.15),
          Math.max(0.4, worldSize.z * 1.15)
        ),
        new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          wireframe: true,
          visible: this._debugOn,
        })
      );
      hb.position.copy(localCenter);
      hb.rotation.y = angle;
      hb.userData.carouselModelIndex = i;
      hb.userData.artworkInfo        = def.artworkInfo ?? this.artworkInfo;
      hb.userData.experienceOwner    = this;

      this.root.add(hb); // child of root — rotates with ring
      this.modelHitboxes.push(hb);
    }

    // Central invisible hitbox in world space — entry point only.
    // focusTarget = model 0's root so first click goes straight to the front model.
    // Hidden while the experience is active so it can't block model hitbox clicks.
    const span = this._radius * 2 + 1.5;
    this.hitbox = new THREE.Mesh(
      new THREE.BoxGeometry(span, 2.5, span),
      new THREE.MeshBasicMaterial({ color: 0xff8800, wireframe: true, visible: this._debugOn })
    );
    this.hitbox.position.set(...this._position);
    // Show model 0's artworkInfo on first click; focusTarget = root frames ALL models
    this.hitbox.userData.artworkInfo     = this._models[0]?.artworkInfo ?? this.artworkInfo;
    this.hitbox.userData.focusTarget     = this.root;
    this.hitbox.userData.experienceOwner = this;
    this.scene.add(this.hitbox);
  }

  // ── Experience interface ────────────────────────────────────────────────────

  onFocus() {
    this._isFocused = true;
    // Hide central hitbox so it can't block clicks on the model hitboxes behind it
    this.hitbox.visible = false;
    const m = this._models[this.activeIndex];
    if (m?.mixer) m.mixer.timeScale = 1;
  }

  onUnfocus() {
    this._isFocused = false;
    // Restore central hitbox so the carousel is clickable from the gallery again
    this.hitbox.visible = true;
    for (const m of this._models) {
      if (m?.mixer) m.mixer.timeScale = 0;
    }
    // Snap ring back to index 0 silently for next entry
    this.activeIndex = 0;
    this._currentAngle = this._baseAngle;
    this.root.rotation.y = this._baseAngle;
    this._rotTween = null;
    this.hitbox.userData.focusTarget     = this.root;
    this.hitbox.userData.artworkInfo     = this._models[0]?.artworkInfo ?? this.artworkInfo;
  }

  // Clicking empty space always exits (no deeper state to return from)
  onMiss() {
    return false;
  }

  // dx: horizontal pointer delta in pixels — rotates the active front model
  onDrag(dx) {
    const m = this._models[this.activeIndex];
    if (m) m.root.rotateOnWorldAxis(_WORLD_UP, dx * 0.007);
  }

  // dir: -1 | +1 — rotate ring to adjacent model
  onNav(dir) {
    const n = this._models.length;
    if (n <= 1) return null;

    const prev = this._models[this.activeIndex];
    if (prev?.mixer) prev.mixer.timeScale = 0;

    this.activeIndex = ((this.activeIndex + dir) % n + n) % n;
    this.rotateTo(this.activeIndex);

    const next = this._models[this.activeIndex];
    if (next?.mixer) next.mixer.timeScale = 1;

    return {
      consumed: true,
      // No focusTarget — camera stays at the overview position
      artworkInfo: next?.artworkInfo ?? null,
    };
  }

  // obj: the mesh that was clicked (model hitbox or descendant)
  onHit(obj) {
    const idx = obj.userData.carouselModelIndex;
    if (idx !== undefined) {
      if (idx === this.activeIndex) {
        // Already at front — just refresh the info panel
        const m = this._models[idx];
        return { consumed: true, artworkInfo: m?.artworkInfo ?? this.artworkInfo };
      }

      const prev = this._models[this.activeIndex];
      if (prev?.mixer) prev.mixer.timeScale = 0;

      this.activeIndex = idx;
      this.rotateTo(idx);

      const m = this._models[idx];
      if (m?.mixer) m.mixer.timeScale = 1;

      return { consumed: true, artworkInfo: m?.artworkInfo ?? this.artworkInfo };
    }
    return false; // not a carousel object — let World.js handle normally
  }

  update(dt) {
    if (this._rotTween) {
      this._rotTween.update(dt);
      if (this._rotTween.done) this._rotTween = null;
    }
    if (this._isFocused) {
      const m = this._models[this.activeIndex];
      if (m?.mixer) m.mixer.update(dt);
    }
  }

  // ── Internal ───────────────────────────────────────────────────────────────

  rotateTo(index, duration = 0.65) {
    const n = this._models.length;
    const targetAngle = this._baseAngle - ((2 * Math.PI / n) * index);
    const from = this._currentAngle;
    const to = targetAngle;
    this._rotTween = makeTween01({
      from, to, duration,
      onUpdate: (v) => {
        this._currentAngle = v;
        this.root.rotation.y = v;
      },
    });
  }

  _normalizeToSize(model, targetSize) {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.scale.multiplyScalar(targetSize / maxAxis);
  }
}
