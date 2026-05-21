import * as THREE from "three";
import { loadGLTFWithAnimations } from "../../utils/gltfLoader.js";
import { makeTween01 } from "../../utils/tween.js";

const _WORLD_UP  = new THREE.Vector3(0, 1, 0);
const _mergeInfo = (base, override) => ({ ...base, ...(override ?? {}) });

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

function _removeFrom(arr, item) {
  const i = arr.indexOf(item);
  if (i !== -1) arr.splice(i, 1);
}

function _makeTogglePlane(enabled) {
  const w = 256, h = 64;
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  _drawToggle(canvas, enabled);
  const mat = new THREE.MeshBasicMaterial({
    map:         new THREE.CanvasTexture(canvas),
    transparent: true,
    depthTest:   false,
    side:        THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.225), mat);
  mesh.userData.toggleCanvas = canvas;
  return mesh;
}

function _drawToggle(canvas, enabled) {
  const w = canvas.width, h = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = enabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)";
  ctx.beginPath();
  ctx.roundRect(2, 2, w - 4, h - 4, (h - 4) / 2);
  ctx.fill();
  ctx.strokeStyle = enabled ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.font      = "bold 26px sans-serif";
  ctx.fillStyle = enabled ? "#ffffff" : "rgba(255,255,255,0.4)";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(enabled ? "AUTO SPIN  ●" : "AUTO SPIN  ○", w / 2, h / 2 + 1);
}

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
    materialOverride = null,   // { color?, metalness?, roughness?, envMapIntensity? } — replaces all mesh materials
    showSpinToggle = false,    // show the auto-spin toggle button when focused
  }) {
    this.scene = scene;
    this._modelDefs = models;
    this._position = position;
    this._radius = radius;
    this._normalizeTo = normalizeTo;
    this.artworkInfo = artworkInfo;
    this._debugOn = debugOn;
    this._materialOverride = materialOverride;
    this._showSpinToggle = showSpinToggle;

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
    this._targetAngle  = this._baseAngle;

    this._clickables  = null;  // assigned by World.js after load
    this._camera      = null;
    this._arrowPrev   = null;
    this._arrowNext   = null;
    this._arrowOffset = 0.8;   // lateral world units from active model centre

    this._spinEnabled = true;
    this._spinSpeed   = 0.5;   // radians/second
    this._spinToggle  = null;
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

      if (this._materialOverride) this._applyMaterialOverride(modelRoot);

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

      this._models.push({ root: modelRoot, mixer, artworkInfo: _mergeInfo(this.artworkInfo, def.artworkInfo) });
      this.root.add(modelRoot);

      // Compute ACTUAL geometry bounds after the model is placed in the ring so
      // the hitbox wraps real visible geometry, not just the pivot position.
      this.root.updateWorldMatrix(true, true);
      const worldBox = new THREE.Box3().setFromObject(modelRoot);
      const worldCenter = worldBox.getCenter(new THREE.Vector3());
      const worldSize   = worldBox.getSize(new THREE.Vector3());

      // Convert world centre to root-local space using full inverse transform
      const localCenter = this.root.worldToLocal(worldCenter.clone());

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
      hb.userData.carouselModelIndex = i;
      hb.userData.artworkInfo        = _mergeInfo(this.artworkInfo, def.artworkInfo);
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
    this.hitbox.userData.artworkInfo     = _mergeInfo(this.artworkInfo, this._models[0]?.artworkInfo);
    this.hitbox.userData.focusTarget     = this.root;
    this.hitbox.userData.experienceOwner = this;
    this.scene.add(this.hitbox);

    // Navigation arrows — shown when focused, hidden otherwise
    this._arrowPrev = _makeArrowPlane("‹");
    this._arrowNext = _makeArrowPlane("›");
    this._arrowPrev.userData.carouselArrow    = "prev";
    this._arrowPrev.userData.experienceOwner  = this;
    this._arrowNext.userData.carouselArrow    = "next";
    this._arrowNext.userData.experienceOwner  = this;
    this._arrowPrev.visible = false;
    this._arrowNext.visible = false;
    this.scene.add(this._arrowPrev);
    this.scene.add(this._arrowNext);

    // Auto-spin toggle button
    this._spinToggle = _makeTogglePlane(this._spinEnabled);
    this._spinToggle.userData.carouselSpinToggle = true;
    this._spinToggle.userData.experienceOwner    = this;
    this._spinToggle.visible = false;
    this.scene.add(this._spinToggle);
  }

  // ── Experience interface ────────────────────────────────────────────────────

  onFocus(camera) {
    this._isFocused = true;
    this._camera    = camera;
    // Hide central hitbox so it can't block clicks on the model hitboxes behind it
    this.hitbox.visible = false;
    const m = this._models[this.activeIndex];
    if (m?.mixer) m.mixer.timeScale = 1;
    if (this._arrowPrev) {
      this._arrowPrev.visible = true;
      this._arrowNext.visible = true;
      this._spinToggle.visible = this._showSpinToggle;
      if (this._clickables) {
        if (!this._clickables.includes(this._arrowPrev))  this._clickables.push(this._arrowPrev);
        if (!this._clickables.includes(this._arrowNext))  this._clickables.push(this._arrowNext);
        if (this._showSpinToggle && !this._clickables.includes(this._spinToggle)) this._clickables.push(this._spinToggle);
      }
      this._updateArrows();
    }
  }

  onUnfocus() {
    this._isFocused = false;
    this._camera    = null;
    // Restore central hitbox so the carousel is clickable from the gallery again
    this.hitbox.visible = true;
    for (const m of this._models) {
      if (m?.mixer) m.mixer.timeScale = 0;
    }
    // Snap ring back to index 0 silently for next entry
    this.activeIndex   = 0;
    this._currentAngle = this._baseAngle;
    this._targetAngle  = this._baseAngle;
    this.root.rotation.y = this._baseAngle;
    this._rotTween = null;
    this.hitbox.userData.focusTarget     = this.root;
    this.hitbox.userData.artworkInfo     = _mergeInfo(this.artworkInfo, this._models[0]?.artworkInfo);
    if (this._arrowPrev) {
      this._arrowPrev.visible  = false;
      this._arrowNext.visible  = false;
      this._spinToggle.visible = false;
      if (this._clickables) {
        _removeFrom(this._clickables, this._arrowPrev);
        _removeFrom(this._clickables, this._arrowNext);
        if (this._showSpinToggle) _removeFrom(this._clickables, this._spinToggle);
      }
    }
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
    this._rotateByDelta(dir);

    const next = this._models[this.activeIndex];
    if (next?.mixer) next.mixer.timeScale = 1;

    return {
      consumed: true,
      // No focusTarget — camera stays at the overview position
      artworkInfo: next?.artworkInfo ?? null,
    };
  }

  // obj: the mesh that was clicked (model hitbox, arrow, spin toggle, or descendant)
  onHit(obj) {
    const arrow = obj.userData.carouselArrow;
    if (arrow === "prev") return this.onNav(-1);
    if (arrow === "next") return this.onNav(+1);

    if (obj.userData.carouselSpinToggle) {
      this._spinEnabled = !this._spinEnabled;
      _drawToggle(this._spinToggle.userData.toggleCanvas, this._spinEnabled);
      this._spinToggle.material.map.needsUpdate = true;
      return { consumed: true };
    }

    const idx = obj.userData.carouselModelIndex;
    if (idx !== undefined) {
      if (idx === this.activeIndex) {
        // Already at front — just refresh the info panel
        const m = this._models[idx];
        return { consumed: true, artworkInfo: _mergeInfo(this.artworkInfo, m?.artworkInfo) };
      }

      const prev = this._models[this.activeIndex];
      if (prev?.mixer) prev.mixer.timeScale = 0;

      // rotateTo uses this.activeIndex as FROM — must call before updating it
      this.rotateTo(idx);
      this.activeIndex = idx;

      const m = this._models[idx];
      if (m?.mixer) m.mixer.timeScale = 1;

      return { consumed: true, artworkInfo: _mergeInfo(this.artworkInfo, m?.artworkInfo) };
    }
    return false; // not a carousel object — let World.js handle normally
  }

  update(dt) {
    if (this._rotTween) {
      this._rotTween.update(dt);
      if (this._rotTween.done) this._rotTween = null;
    }
    if (this._isFocused) {
      const active = this._models[this.activeIndex];
      if (active?.mixer) active.mixer.update(dt);
      if (this._spinEnabled) {
        for (const m of this._models) {
          m.root.rotateOnWorldAxis(_WORLD_UP, this._spinSpeed * dt);
        }
      }
      this._updateArrows();
      this._updateToggle();
    }
  }

  // ── Internal ───────────────────────────────────────────────────────────────

  _updateArrows() {
    if (!this._camera || !this._arrowPrev || !this._models.length) return;
    const m = this._models[this.activeIndex];
    if (!m) return;
    const worldPos = new THREE.Vector3();
    m.root.getWorldPosition(worldPos);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this._camera.quaternion);
    this._arrowPrev.position.copy(worldPos).addScaledVector(right, -this._arrowOffset);
    this._arrowNext.position.copy(worldPos).addScaledVector(right,  this._arrowOffset);
    this._arrowPrev.lookAt(this._camera.position);
    this._arrowNext.lookAt(this._camera.position);
  }

  _updateToggle() {
    if (!this._camera || !this._spinToggle || !this._models.length) return;
    const m = this._models[this.activeIndex];
    if (!m) return;
    const worldPos = new THREE.Vector3();
    m.root.getWorldPosition(worldPos);
    this._spinToggle.position.set(worldPos.x, worldPos.y - 0.85, worldPos.z);
    this._spinToggle.lookAt(this._camera.position);
  }

  // Rotate one step in dir — accumulates via _targetAngle so rapid clicks don't snap back
  _rotateByDelta(dir, duration = 0.65) {
    const step         = (2 * Math.PI) / this._models.length;
    const target       = this._targetAngle - dir * step;
    this._targetAngle  = target;
    this._rotTween = makeTween01({
      from: this._currentAngle, to: target, duration,
      onUpdate: (v) => { this._currentAngle = v; this.root.rotation.y = v; },
    });
  }

  // Rotate to a specific index via shortest arc (used for direct hitbox clicks)
  rotateTo(index, duration = 0.65) {
    const n    = this._models.length;
    const step = (2 * Math.PI) / n;
    let delta  = ((index - this.activeIndex) % n + n) % n;
    if (delta > n / 2) delta -= n;
    const target      = this._targetAngle - delta * step;
    this._targetAngle = target;
    this._rotTween = makeTween01({
      from: this._currentAngle, to: target, duration,
      onUpdate: (v) => { this._currentAngle = v; this.root.rotation.y = v; },
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

  _applyMaterialOverride(modelRoot) {
    const o = this._materialOverride;
    const mat = new THREE.MeshStandardMaterial({
      color:            o.color            ?? 0xC8C8C8,
      metalness:        o.metalness        ?? 1.0,
      roughness:        o.roughness        ?? 0.15,
      envMapIntensity:  o.envMapIntensity  ?? 1.5,
    });
    modelRoot.traverse(child => {
      if (!child.isMesh) return;
      if (Array.isArray(child.material)) {
        child.material = child.material.map(() => mat);
      } else {
        child.material = mat;
      }
    });
  }
}
