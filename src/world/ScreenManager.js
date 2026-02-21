import * as THREE from "three";
import { makeRevealMaterial } from "../shaders/revealshader.js";
import { loadGLTFWithAnimations } from "../utils/gltfLoader.js"; // adjust path



/**
 * ScreenManager
 * - addScreen({ url, width, height, position, rotation, clickable, text... })
 * - manages videos, clickable podiums, and clean disposal
 */
export class ScreenManager {
  constructor({ scene, camera, domElement, makeTextPlane, debugOn }) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;
    this.makeTextPlane = makeTextPlane; // function(text, opts) => Mesh

    this.textureLoader = new THREE.TextureLoader();

    this.raycaster = new THREE.Raycaster();
    this.pointerNDC = new THREE.Vector2();

    this.screens = [];   // { mesh, material, texture, video?, textMesh?, podium? }
    this.podiums = [];   // clickable meshes (invisible)
    this.clickables = []; // meshes to raycast against

    this.models = [];   // { root, podium?, textMesh?, mixer?, clips?, url? }


    this._onClick = this._onClick.bind(this);
    this.domElement.addEventListener("pointerdown", this._onClick, { passive: true });

    this._texCache = new Map(); // url -> THREE.Texture



    // Optional callbacks for click hits/misses
    this.onHit = null;
    this.onMiss = null;

    //debug flag to show clickable podiums
    this.debugOn = debugOn;

  }

  destroy() {
    this.domElement.removeEventListener("pointerdown", this._onClick);

    // dispose everything we created
    for (const s of this.screens) this.removeScreen(s.mesh);
    this.screens.length = 0;
    this.podiums.length = 0;
    this.clickables.length = 0;

    for (const m of this.models) this.removeModel(m.root);
    this.models.length = 0;

  }

  // -------- public API --------

  addScreen({
    url,
    width = 4,
    height = 2.25,
    _cameraScalar = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    offsetClick = 0,
    clickable = false,
    text = "",
    fontSize = 30,
    plinthVisible = true,
    clickableSize = [width * 1.2, height * 1.2], // size of the clickable podium (if clickable)
    onClick = null, // optional callback(meshOrPodium, hit)
  }) {

    if (this.debugOn) {
      console.log("Adding screen:", url, position, rotation);
    }

    rotation = rotation.map(r => THREE.MathUtils.degToRad(r));
    const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

    const { texture, video } = isVideo
      ? this._makeVideoTexture(url)
      : this._makeImageTexture(url);

    

    const revealTex = this.textureLoader.load("src/art/textures/gradient.png");
    revealTex.wrapS = revealTex.wrapT = THREE.ClampToEdgeWrapping;
    revealTex.minFilter = THREE.LinearFilter;
    revealTex.magFilter = THREE.LinearFilter;

    /*
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      toneMapped: false,
      transparent: true
    });*/
    
    const material = makeRevealMaterial({ map: texture, revealMap: revealTex });
    material.userData = { uReveal: 1.0 }; // start hidden

    const geometry = new THREE.PlaneGeometry(width, height);
    const screenMesh = new THREE.Mesh(geometry, material);
    screenMesh.position.set(...position);
    screenMesh.rotation.set(...rotation);
    screenMesh.userData.isScreen = true;
    screenMesh.userData.revealMaterial = material; // for easy access later

    this.scene.add(screenMesh);

    //add a box for the artwork to sit on
    if(plinthVisible){
      const boxGeoHeight = 2.0;
      const boxGeo = new THREE.BoxGeometry(width * 0.9, boxGeoHeight, 1.0);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x404040 });
      const boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.set(position[0], position[1] - (height / 2) - (boxGeoHeight / 2), position[2]);
      boxMesh.rotation.set(...rotation);
      boxMesh.receiveShadow = true;
      boxMesh.castShadow = true;

      this.scene.add(boxMesh);
    }

    // Optional clickable podium
    let podium = null;
    if (clickable) {
      //podium is invisible if no in debug, but it still receives clicks
      
      podium = new THREE.Mesh(
        new THREE.BoxGeometry(...clickableSize, 0.5),
        new THREE.MeshBasicMaterial({ visible: this.debugOn, opacity: 0.3, transparent: true })
      );

      podium.position.set(position[0], position[1] - offsetClick, position[2]);
      podium.rotation.set(...rotation);
      podium.userData.cameraScalar = _cameraScalar;
      podium.userData.onClick = onClick;
      podium.userData.focusTarget = screenMesh;

      if (isVideo) podium.userData.video = video;

      this.scene.add(podium);
      this.podiums.push(podium);
      this.clickables.push(podium);
    }
    if (podium) {
      //podium.userData.focusTarget = screenMesh;
      podium.userData.focusTarget = podium;
      screenMesh.userData.focusTarget = podium; // so clicking screen also focuses podium (which is where the video toggle is)
      podium.userData.revealTarget = screenMesh; // so we can reveal the screen when podium is clicked
    }

    // Text label under the screen. the textMesh should sit on the front of the box the artwork is on, so we position it slightly in front of the box and use the same rotation.

    let textMesh = null;
    if (this.makeTextPlane && text) {
      textMesh = this.makeTextPlane(text, {
        fontsize: fontSize,
        textColor: { r: 200, g: 255, b: 200 },
        canvasWidth: 100 * width + 20
      });

      
      //rotation and position is relative to screen rotation
      textMesh.rotation.set(...rotation);
      const textOffsetY = -height / 2 -  0.2; // below the box
      const textOffsetZ = 0.6; // in front of the box
      const localOffset = new THREE.Vector3(0, textOffsetY, textOffsetZ);

      // Apply the same rotation as the screen
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(...rotation)
      );

      localOffset.applyQuaternion(quaternion);

      // Final world position
      textMesh.position.set(
        position[0] + localOffset.x,
        position[1] + localOffset.y,
        position[2] + localOffset.z
      );

      
      this.scene.add(textMesh);
    }

    // extra info text to be revealed on click


    const record = { mesh: screenMesh, material, texture, video: video ?? null, podium, textMesh };
    // store record so we can dispose later
    this.screens.push(record);

    // make screen itself clickable too (optional)
    screenMesh.userData.onClick = onClick;
    if (clickable) this.clickables.push(screenMesh);

    return screenMesh;
  }

  //content screen
  addContentScreen({
    content,                 // { title, bio, images: [] }
    width = 4,
    height = 2.25,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    clickable = true,
    offsetClick = 0,
    fontSize = 30,
    clickableSize = [width * 1.2, height * 1.2], // size of the clickable podium (if clickable)

    // layout
    infoPanel = true,
    infoWidth = 3.2,
    infoHeight = 2.25,
    infoOffset = [2.4, 0.0, 0.0], // local offset to the right of the screen
    buttonSize = 0.45,
    buttonOffsetY = -0.85,        // local Y offset for prev/next hit areas

    onFocusClick = null
  }) {
    if (!content || !Array.isArray(content.images) || content.images.length === 0) {
      throw new Error("addContentScreen: content.images[] is required.");
    }

    // IMPORTANT: your addScreen expects degrees right now (you convert degToRad inside addScreen)
    // So we keep passing rotation as degrees array here.

    // 1) Create the main image screen using your existing addScreen
    const screenMesh = this.addScreen({
      url: content.images[0],
      width,
      height,
      position,
      rotation,
      clickable,
      offsetClick,
      text: content.title ?? "",
      fontSize,
      clickableSize,
      onClick: onFocusClick
    });

    // Find its record (so we can swap its texture later)
    const record = this.screens.find(s => s.mesh === screenMesh);
    if (!record) throw new Error("addContentScreen: could not find screen record.");

    // 2) Make an info panel next to it (optional)
    let infoMesh = null;
    if (infoPanel) {
      // Convert screen's world transform into local right/up/forward
      const q = new THREE.Quaternion();
      screenMesh.getWorldQuaternion(q);

      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(q);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(q);
      const fwd = new THREE.Vector3(0, 0, 1).applyQuaternion(q);

      const infoPos = new THREE.Vector3(...position)
        .addScaledVector(right, infoOffset[0])
        .addScaledVector(up, infoOffset[1])
        .addScaledVector(fwd, infoOffset[2]);

      const infoTex = this._makeInfoPanelTexture({
        title: content.title ?? "",
        body: content.bio ?? "",
        width: width * 256, // increase for better text quality
        height: height * 256
      });

      const infoMat = new THREE.MeshBasicMaterial({
        map: infoTex,
        transparent: true,
        toneMapped: false,
        side: THREE.DoubleSide
      });

      infoMesh = new THREE.Mesh(new THREE.PlaneGeometry(infoWidth, infoHeight), infoMat);
      infoMesh.position.copy(infoPos);
      infoMesh.rotation.copy(screenMesh.rotation); // same facing
      infoMesh.userData.isInfoPanel = true;

      this.scene.add(infoMesh);

      // store for disposal later
      record.infoMesh = infoMesh;
      record.infoTex = infoTex;
    }

    // 3) Prev/Next invisible hit areas (click targets)
    const makeBtn = (name, localX) => {
      const btn = new THREE.Mesh(
        new THREE.PlaneGeometry(buttonSize, buttonSize),
        new THREE.MeshBasicMaterial({ visible: true })
      );

      // place in screen local space
      const q = new THREE.Quaternion();
      screenMesh.getWorldQuaternion(q);

      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(q);
      const up = new THREE.Vector3(0, 1, 0).applyQuaternion(q);
      const front = new THREE.Vector3(0, 0, 1).applyQuaternion(q);

      const base = screenMesh.position.clone();
      btn.position.copy(base)
        .addScaledVector(right, localX)
        .addScaledVector(up, buttonOffsetY-0.2) // lower than screen center so it's more intuitive to click
        .addScaledVector(front, 0.2); // 🔑 push in front so raycaster hits it

      btn.quaternion.copy(screenMesh.quaternion);

      btn.userData.isContentButton = true;
      btn.userData.button = name;

      // IMPORTANT: clicking button should NOT refocus camera; focusTarget remains the screen
      btn.userData.focusTarget = screenMesh.userData.focusTarget;

      this.scene.add(btn);
      this.clickables.push(btn);

      return btn;
    };

    const prevBtn = makeBtn("prev", -width * 0.35- clickableSize[0] * 0.25);
    const nextBtn = makeBtn("next",  width * 0.35+ clickableSize[0] * 0.25);

    // 4) Carousel state + functions
    const state = {
      index: 0,
      images: content.images.slice(),
      setIndex: (i) => {
        const n = state.images.length;
        state.index = ((i % n) + n) % n;

        const url = state.images[state.index];

        // Swap the main map texture (fast)
        // Use cache so we don't reload repeatedly:
        const tex = this._getCachedTexture(url);

        // Your screen uses a ShaderMaterial reveal; it samples uMap.
        // So update uniform:
        if (record.material?.uniforms?.uMap) {
          record.material.uniforms.uMap.value = tex;
          record.material.needsUpdate = true;
        } else {
          // fallback if screen is a basic material
          record.material.map = tex;
          record.material.needsUpdate = true;
        }

        // If you want to change info panel per image, you can also update record.infoMesh here.
      },
      next: () => state.setIndex(state.index + 1),
      prev: () => state.setIndex(state.index - 1),
    };

    // attach to mesh for easy access from World
    screenMesh.userData.contentCarousel = state;
    prevBtn.userData.contentCarousel = state;
    nextBtn.userData.contentCarousel = state;

    // 5) Hook button clicks without breaking your existing onHit/onClick flow
    // We reuse your global _onClick: it calls onHit(obj, hit) and then obj.userData.onClick
    prevBtn.userData.onClick = () => state.prev();
    nextBtn.userData.onClick = () => state.next();

    // store buttons for disposal later
    record.prevBtn = prevBtn;
    record.nextBtn = nextBtn;

    return {
      screenMesh,
      infoMesh,
      prevBtn,
      nextBtn,
      carousel: state
    };
  }


  removeScreen(screenMesh) {
    const idx = this.screens.findIndex(s => s.mesh === screenMesh);
    if (idx === -1) return;

    const s = this.screens[idx];

    if (s.textMesh) {
      this.scene.remove(s.textMesh);
      this._disposeMesh(s.textMesh);
    }

    if (s.podium) {
      this.scene.remove(s.podium);
      this._disposeMesh(s.podium);
      this._removeFromArray(this.podiums, s.podium);
      this._removeFromArray(this.clickables, s.podium);
    }

    this.scene.remove(s.mesh);
    this._disposeMesh(s.mesh);

    // dispose texture
    s.texture?.dispose?.();

    // stop video (if any)
    if (s.video) {
      try {
        s.video.pause();
        s.video.src = "";
        s.video.load();
      } catch {}
    }

    this._removeFromArray(this.clickables, s.mesh);

    this.screens.splice(idx, 1);
  }

  // -------- internal helpers --------

  _makeImageTexture(url) {
    const tex = this.textureLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { texture: tex, video: null };
  }

  _makeVideoTexture(url) {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;     // iOS
    video.autoplay = true;

    // attempt autoplay (may fail until user gesture)
    video.play().catch(() => {
      // leave it paused; you can play it on first user click if you want
    });

    const tex = new THREE.VideoTexture(video);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    return { texture: tex, video };
  }

  _onClick(e) {
    // If pointer-locked, clicks are usually for lock; ignore or handle differently
    if (document.pointerLockElement === this.domElement) return;

    const rect = this.domElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    this.pointerNDC.set(x, y);
    this.raycaster.setFromCamera(this.pointerNDC, this.camera);

    const hits = this.raycaster.intersectObjects(this.clickables, false);
    if (!hits.length){
        if (typeof this.onMiss === "function") this.onMiss();
        return;
    }

    const hit = hits[0];
    const obj = hit.object;

    if (typeof this.onHit === "function") this.onHit(obj, hit);

    // If it’s a podium with a video, you might want to toggle play/pause
    const v = obj.userData.video;
    if (v) {
      if (v.paused) v.play().catch(() => {});
      else v.pause();
    }

    const cb = obj.userData.onClick;
    if (typeof cb === "function") cb(obj, hit);
  }

  _disposeMesh(mesh) {
    mesh.geometry?.dispose?.();
    if (mesh.material) {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const m of mats) {
        if (!m) continue;
        m.map?.dispose?.();
        m.dispose?.();
      }
    }
  }

  _removeFromArray(arr, item) {
    const i = arr.indexOf(item);
    if (i !== -1) arr.splice(i, 1);
  }

  // simple texture cache to avoid reloading the same URL multiple times
  _getCachedTexture(url) {
    if (this._texCache.has(url)) return this._texCache.get(url);
    const tex = this.textureLoader.load(url);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    this._texCache.set(url, tex);
    return tex;
  }

  // helper to create a text texture for info panels
  _makeInfoPanelTexture({ title = "", body = "", width = 768, height = 768 }) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  // background
  ctx.fillStyle = "#0e1016";
  ctx.fillRect(0, 0, width, height);

  // title
  const pad = 48;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.font = "700 44px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  ctx.textBaseline = "top";
  ctx.fillText(title, pad, pad);

  // body text (simple wrap)
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "400 26px system-ui, -apple-system, Segoe UI, Roboto, Arial";
  const maxW = width - pad * 2;
  const lineH = 34;

  const words = String(body).split(/\s+/);
  let x = pad;
  let y = pad + 74;
  let line = "";

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    const metrics = ctx.measureText(test);
    if (metrics.width > maxW) {
      ctx.fillText(line, x, y);
      line = w;
      y += lineH;
      if (y > height - pad - lineH) break;
    } else {
      line = test;
    }
  }
  if (y <= height - pad - lineH) ctx.fillText(line, x, y);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/**
 * addModel
 * - addModel({ url, position, rotation, scale, clickable, hitboxSize, onClick, text... })
 * - loads glb/gltf, adds to scene, optionally adds click proxy + text label
 */
async addModel({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],     // degrees like your addScreen
  scale = 1.0,              // scalar OR [x,y,z]
  normalizeTo = null,       // e.g. 1.5 to auto-scale largest dimension to 1.5 units
  center = true,

  clickable = false,
  offsetClick = 0,          // like your podium Y offset (optional)
  hitboxSize = null,        // if null we compute from model bounds

  text = "",
  fontSize = 30,
  textOffset = [0, -0.6, 0.6], // local [x,y,z] offset relative to model rotation
  plinthVisible = true,

  castShadow = true,
  receiveShadow = true,

  playAnimation = "first",  // "first" | null | "name"
  onClick = null
}) {
  // Convert degrees to radians to match your convention
  const rotRad = rotation.map(r => THREE.MathUtils.degToRad(r));

  const { scene: modelRoot, animations } = await loadGLTFWithAnimations(url);

  // Basic flags
  modelRoot.traverse(o => {
    if (!o.isMesh) return;
    o.castShadow = castShadow;
    //o.receiveShadow = receiveShadow;
  });

  // Apply user scale before normalize (so user can pre-scale imports)
  if (Array.isArray(scale)) modelRoot.scale.set(scale[0], scale[1], scale[2]);
  else modelRoot.scale.setScalar(scale);

  // Optional normalize sizing
  if (typeof normalizeTo === "number") {
    this._normalizeModelToSize(modelRoot, normalizeTo, center);
  }

  // Place in world
  modelRoot.position.set(...position);
  modelRoot.rotation.set(...rotRad);
  modelRoot.userData.isModel = true;
  modelRoot.userData.onClick = onClick;

  this.scene.add(modelRoot);

  // Optional animation mixer
  let mixer = null;
  if (animations && animations.length && playAnimation) {
    mixer = new THREE.AnimationMixer(modelRoot);

    let clip = animations[0];
    if (playAnimation !== "first") {
      const byName = animations.find(a => a.name === playAnimation);
      if (byName) clip = byName;
    }
    mixer.clipAction(clip).play();
  }

  // Optional clickable proxy (hitbox)
  let podium = null;
  if (clickable) {
    // Use provided hitbox size OR compute from bounds
    let w = 1, h = 1, d = 1;
    if (hitboxSize) {
      [w, h, d] = hitboxSize;
    } else {
      const box = new THREE.Box3().setFromObject(modelRoot);
      const s = box.getSize(new THREE.Vector3());
      w = Math.max(0.25, s.x);
      h = Math.max(0.25, s.y);
      d = Math.max(0.25, s.z);
    }

    podium = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ visible: true, opacity: 0.3, transparent: true })
    );

    podium.position.set(position[0], position[1] - offsetClick, position[2]);
    podium.rotation.set(...rotRad);
    podium.userData.onClick = onClick;
    podium.userData.focusTarget = modelRoot; // so camera focus can target the model
    podium.userData.focusTarget = podium; // focus on podium itself for better framing, but you can switch to modelRoot if you want to focus on the model directly
    podium.userData.isModelHitbox = true;

    this.scene.add(podium);
    this.podiums.push(podium);
    this.clickables.push(podium);
  }

  //add plinth for the model to sit on, we can use the same dimensions as the hitbox but make it a thin box under the model
  if(plinthVisible){
  const plinthHeight = 10.2;
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry( 1.2, plinthHeight, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x404040 }) // dark gray
  );
  plinth.position.set(position[0], position[1] - (plinthHeight / 2), position[2]);
  plinth.rotation.set(...rotRad);
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  this.scene.add(plinth);
  }

  // Optional label (relative to model rotation, like you fixed for screens)
  let textMesh = null;
  if (this.makeTextPlane && text) {
    textMesh = this.makeTextPlane(text, {
      fontsize: fontSize,
      textColor: { r: 200, g: 255, b: 200 },
      canvasWidth: 640
    });

    textMesh.rotation.set(...rotRad);

    const localOffset = new THREE.Vector3(...textOffset);
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotRad));
    localOffset.applyQuaternion(q);

    textMesh.position.set(
      position[0] + localOffset.x,
      position[1] + localOffset.y,
      position[2] + localOffset.z
    );

    this.scene.add(textMesh);
  }

  // Make model root clickable too if you want (optional; can be heavy)
  // If you DO want it, push meshes; if not, rely on hitbox.
  // if (clickable) this.clickables.push(modelRoot);

  const record = { root: modelRoot, podium, textMesh, mixer, clips: animations, url };
  this.models.push(record);

  return modelRoot;
}


// Remove model and all associated resources (meshes, materials, textures, videos, mixers)
removeModel(modelRoot) {
  const idx = this.models.findIndex(m => m.root === modelRoot);
  if (idx === -1) return;

  const m = this.models[idx];

  if (m.textMesh) {
    this.scene.remove(m.textMesh);
    this._disposeMesh(m.textMesh);
  }

  if (m.podium) {
    this.scene.remove(m.podium);
    this._disposeMesh(m.podium);
    this._removeFromArray(this.podiums, m.podium);
    this._removeFromArray(this.clickables, m.podium);
  }

  // stop animations
  if (m.mixer) {
    try { m.mixer.stopAllAction(); } catch {}
  }

  // remove + dispose gltf meshes/materials/textures
  this.scene.remove(m.root);
  m.root.traverse(o => {
    if (!o.isMesh) return;
    o.geometry?.dispose?.();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const mat of mats) {
        mat.map?.dispose?.();
        mat.normalMap?.dispose?.();
        mat.roughnessMap?.dispose?.();
        mat.metalnessMap?.dispose?.();
        mat.emissiveMap?.dispose?.();
        mat.aoMap?.dispose?.();
        mat.dispose?.();
      }
    }
  });

  this.models.splice(idx, 1);
}








_normalizeModelToSize(model, targetSize = 1.0, center = true) {
  // Optionally center pivot
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const maxAxis = Math.max(size.x, size.y, size.z) || 1;

  if (center) {
    const c = box.getCenter(new THREE.Vector3());
    model.position.sub(c);
  }

  const s = targetSize / maxAxis;
  model.scale.multiplyScalar(s);
  model.updateMatrixWorld(true);
}



}
