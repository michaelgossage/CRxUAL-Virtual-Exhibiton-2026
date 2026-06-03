import * as THREE from "three";
import { loadGLTFWithAnimations } from "../../utils/gltfLoader.js";

const _mergeInfo = (base, override) => ({ ...base, ...(override ?? {}) });

function _makeArrowTex(label) {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.font         = "bold 96px sans-serif";
  ctx.fillStyle    = "#ffffff";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, size / 2, size / 2 + 4);
  return new THREE.CanvasTexture(c);
}

/**
 * ModelGalleryWalk — 3D models placed at specific world positions; camera moves
 * to focus on each model in sequence.
 *
 * Interaction flow:
 *   Click entry hitbox        → camera focuses on first model; ‹/› arrows appear
 *   Click ‹ / › arrow        → camera moves to adjacent model
 *   Arrow keys / nav buttons  → same (via onNav)
 *   Click a model hitbox      → jump directly to that model
 *   Click empty space         → exit experience (World.js returns home)
 *   Drag left/right           → rotates current model around Y
 *
 * Usage in World.js:
 *   const walk = new ModelGalleryWalk({ scene, models: [...], artworkInfo });
 *   walk.load().then(() => {
 *     walk.hitbox.userData.location = 'lobby';
 *     this._registerExperience(walk);
 *     walk._clickables = this.screenManager.clickables;
 *   });
 */
export class ModelGalleryWalk {
  constructor({
    scene,
    models = [],           // [{ url, position, rotation, normalizeTo, scale, hitboxSize, playAnimation, artworkInfo }]
    artworkInfo = {},      // shown on entry click
    entryPosition = null,  // defaults to first model's position
    entryHitboxSize = [3, 2.5, 3],
    arrowOffset = 1.5,     // lateral world-unit distance from model centre to each arrow
    arrowHeight = 0,       // Y offset of arrows above model centre
    arrowSize = 0.5,       // world-unit size of the arrow plane
    modelHitboxScale = 1.25, // multiplier on per-model geometry bounds; controls camera distance
    debugOn = false,
  }) {
    this.scene             = scene;
    this._modelDefs        = models;
    this.artworkInfo       = artworkInfo;
    this._entryPos         = entryPosition;
    this._entrySize        = entryHitboxSize;
    this._arrowOffset      = arrowOffset;
    this._arrowHeight      = arrowHeight;
    this._arrowSize        = arrowSize;
    this._modelHitboxScale = modelHitboxScale;
    this._debugOn          = debugOn;

    // root is a placeholder Group required by _registerExperience for associatedMeshes
    this.root = new THREE.Group();
    scene.add(this.root);

    this.hitbox        = null;
    this._models       = [];   // [{ root, hitbox, mixer, artworkInfo }]
    this.modelHitboxes = [];   // exposed so _registerExperience adds them to clickables
    this._arrowPrev    = null;
    this._arrowNext    = null;
    this._clickables   = null; // assigned by World.js: walk._clickables = screenManager.clickables
    this.activeIndex   = 0;
    this._isFocused    = false;
    this._camera       = null; // stored from onFocus for lookAt each frame
  }

  async load() {
    const defs = this._modelDefs;
    if (!defs.length) return this;

    const deg    = Math.PI / 180;
    const loaded = await Promise.all(defs.map(d => loadGLTFWithAnimations(d.url)));

    for (let i = 0; i < defs.length; i++) {
      const def   = defs[i];
      const { scene: modelRoot, animations } = loaded[i];

      // Scale then normalise (order matters: normalise reads current bounds)
      if (Array.isArray(def.scale)) modelRoot.scale.set(...def.scale);
      else if (def.scale != null)   modelRoot.scale.setScalar(def.scale);
      if (typeof def.normalizeTo === "number") this._normalizeToSize(modelRoot, def.normalizeTo);

      // Place in world — after normalisation so pivot is centred
      const pos = def.position ?? [0, 0, 0];
      const rot = def.rotation ?? [0, 0, 0];
      modelRoot.position.set(...pos);
      modelRoot.rotation.set(rot[0] * deg, rot[1] * deg, rot[2] * deg);
      modelRoot.userData.baseQuaternion = modelRoot.quaternion.clone();
      modelRoot.userData.isModel        = true;

      this.scene.add(modelRoot);
      modelRoot.updateWorldMatrix(true, true);

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

      // Per-model hitbox — world-space, sized from actual geometry bounds
      const worldBox    = new THREE.Box3().setFromObject(modelRoot);
      const worldCenter = worldBox.getCenter(new THREE.Vector3());
      const worldSize   = worldBox.getSize(new THREE.Vector3());

      const s = this._modelHitboxScale;
      const [hw, hh, hd] = def.hitboxSize ?? [
        Math.max(0.3, worldSize.x * s),
        Math.max(0.3, worldSize.y * s),
        Math.max(0.3, worldSize.z * s),
      ];

      const hitbox = new THREE.Mesh(
        new THREE.BoxGeometry(hw, hh, hd),
        new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true, visible: this._debugOn })
      );
      hitbox.position.copy(worldCenter);
      // Copy model rotation so CameraFocus approaches from the model's facing direction
      hitbox.quaternion.copy(modelRoot.quaternion);
      hitbox.userData.galleryModelIndex = i;
      hitbox.userData.artworkInfo       = _mergeInfo(this.artworkInfo, def.artworkInfo);
      hitbox.userData.experienceOwner   = this;
      hitbox.userData.modelRoot         = modelRoot;

      this.scene.add(hitbox);
      this.modelHitboxes.push(hitbox);

      // Tag all descendants so World.js routes clicks to this experience
      modelRoot.traverse(child => { child.userData.experienceOwner = this; });

      // Cache geometric centre + half-width for arrow placement (world-space, load-time snapshot)
      const worldSphere = new THREE.Sphere();
      worldBox.getBoundingSphere(worldSphere);

      this._models.push({
        root:        modelRoot,
        hitbox,
        mixer,
        artworkInfo:  _mergeInfo(this.artworkInfo, def.artworkInfo),
        center:       worldCenter.clone(),  // geometric centre in world space
        halfRadius:   worldSphere.radius,   // used to place arrows just outside model edge
      });
    }

    // Entry hitbox — large invisible box near first model (or entryPosition)
    const ep = this._entryPos ?? (defs[0]?.position ?? [0, 0, 0]);
    const [ew, eh, ed] = this._entrySize;
    this.hitbox = new THREE.Mesh(
      new THREE.BoxGeometry(ew, eh, ed),
      new THREE.MeshBasicMaterial({ color: 0xff8800, wireframe: true, visible: this._debugOn })
    );
    this.hitbox.position.set(...ep);
    this.hitbox.userData.artworkInfo     = _mergeInfo(this.artworkInfo, this._models[0]?.artworkInfo);
    this.hitbox.userData.focusTarget     = this._models[0]?.hitbox ?? this.root;
    this.hitbox.userData.experienceOwner = this;
    this.scene.add(this.hitbox);

    // Navigation arrow planes (hidden until the experience is focused)
    this._arrowPrev = this._buildArrow("prev");
    this._arrowNext = this._buildArrow("next");
    this._arrowPrev.visible = false;
    this._arrowNext.visible = false;
    this.scene.add(this._arrowPrev);
    this.scene.add(this._arrowNext);

    return this;
  }

  // ── Experience interface ────────────────────────────────────────────────────

  onFocus(camera) {
    this._isFocused = true;
    this._camera    = camera;

    // Hide entry hitbox — it sits in front of the model hitboxes and would intercept clicks
    this.hitbox.visible = false;

    const m = this._models[this.activeIndex];
    if (m?.mixer) m.mixer.timeScale = 1;

    this._updateArrows();
  }

  onUnfocus() {
    this._isFocused = false;
    this.hitbox.visible = true;

    for (const m of this._models) {
      if (m?.mixer) m.mixer.timeScale = 0;
    }

    this._arrowPrev.visible = false;
    this._arrowNext.visible = false;
    if (this._clickables) {
      this._removeFrom(this._clickables, this._arrowPrev);
      this._removeFrom(this._clickables, this._arrowNext);
    }

    // Reset so the next entry always starts from model 0
    this.activeIndex = 0;
    this.hitbox.userData.focusTarget = this._models[0]?.hitbox ?? this.root;
    this.hitbox.userData.artworkInfo = _mergeInfo(this.artworkInfo, this._models[0]?.artworkInfo);
  }

  // Clicking empty space always exits (no inner state to back out from)
  onMiss() {
    return false;
  }

  // dir: -1 | +1 — arrow keys / nav buttons
  onNav(dir) {
    return this._goTo(this.activeIndex + dir);
  }

  onHit(obj) {
    const arrow = obj.userData.galleryArrow;
    if (arrow === "prev") return this._goTo(this.activeIndex - 1);
    if (arrow === "next") return this._goTo(this.activeIndex + 1);

    const idx = obj.userData.galleryModelIndex;
    if (idx !== undefined) return this._goTo(idx);

    return false; // not ours — let World.js handle
  }

  // dx: horizontal pointer delta in pixels — rotates the current model
  onDrag(dx) {
    const m = this._models[this.activeIndex];
    if (m) m.root.rotateY(dx * 0.007);
  }

  update(dt) {
    if (!this._isFocused) return;
    const m = this._models[this.activeIndex];
    if (m?.mixer) m.mixer.update(dt);
    this._updateArrows();
  }

  // ── Internal ───────────────────────────────────────────────────────────────

  _goTo(index) {
    const n = this._models.length;
    if (!n) return null;

    const prev = this._models[this.activeIndex];
    if (prev?.mixer) prev.mixer.timeScale = 0;

    this.activeIndex = ((index % n) + n) % n;

    const next = this._models[this.activeIndex];
    if (next?.mixer) next.mixer.timeScale = 1;

    // _updateArrows() will reposition on the next frame via update(dt)
    // Use the hitbox as focus target — it is sized to the model's geometry bounds and
    // carries the model's rotation, so CameraFocus frames it correctly every time.
    return { consumed: true, focusTarget: next.hitbox, artworkInfo: next.artworkInfo };
  }

  // Recomputed every frame — uses camera right vector so arrows are always
  // visually left/right of the focused object regardless of model rotation.
  // Offset is derived from each model's bounding sphere so arrows sit just
  // outside its visual edge rather than at a fixed world-unit distance.
  _updateArrows() {
    if (!this._camera) return;

    const m = this._models[this.activeIndex];
    if (!m) return;

    // Camera's world-space right axis
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this._camera.quaternion);

    // Place arrows just outside this model's visual bounds
    const offset = m.halfRadius + this._arrowOffset;

    const base = m.center.clone();
    base.y += this._arrowHeight;

    this._arrowPrev.position.copy(base).addScaledVector(right, -offset);
    this._arrowNext.position.copy(base).addScaledVector(right,  offset);

    // Face arrows toward the camera so they're always legible
    const cp = this._camera.position;
    this._arrowPrev.lookAt(cp);
    this._arrowNext.lookAt(cp);
  }

  _buildArrow(dir) {
    const label = dir === "prev" ? "‹" : "›";
    const mesh  = new THREE.Mesh(
      new THREE.PlaneGeometry(this._arrowSize, this._arrowSize),
      new THREE.MeshBasicMaterial({
        map:         _makeArrowTex(label),
        transparent: true,
        depthTest:   false,
        side:        THREE.DoubleSide,
      })
    );
    mesh.userData.galleryArrow    = dir;
    mesh.userData.experienceOwner = this;
    return mesh;
  }

  _removeFrom(arr, item) {
    const i = arr.indexOf(item);
    if (i !== -1) arr.splice(i, 1);
  }

  _normalizeToSize(model, targetSize) {
    const box     = new THREE.Box3().setFromObject(model);
    const size    = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const center  = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.scale.multiplyScalar(targetSize / maxAxis);
    model.updateMatrixWorld(true);
  }
}
