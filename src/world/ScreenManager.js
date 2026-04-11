import * as THREE from "three";
import { makeRevealMaterial, makeCarouselMaterial } from "../shaders/revealshader.js";
import { loadGLTFWithAnimations } from "../utils/gltfLoader.js"; // adjust path
import { CarouselFluidSim } from "./CarouselFluidSim.js";



/**
 * ScreenManager
 * - addScreen({ url, width, height, position, rotation, clickable, text... })
 * - manages videos, clickable hitBoxes, and clean disposal
 */
export class ScreenManager {
  constructor({ scene, camera, renderer, domElement, makeTextPlane, debugOn }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer ?? null;
    this.domElement = domElement;
    this.makeTextPlane = makeTextPlane; // function(text, opts) => Mesh

    this.textureLoader = new THREE.TextureLoader();

    this.raycaster = new THREE.Raycaster();
    this.pointerNDC = new THREE.Vector2();

    this.screens = [];   // { mesh, material, texture, video?, textMesh?, hitBox? }
    this.hitBoxes = [];   // clickable meshes (invisible)
    this.clickables = []; // meshes to raycast against
    this._activeVideo = null; // only one video plays at a time

    this.models = [];   // { root, hitBox?, textMesh?, mixer?, clips?, url? }


    // fluid carousel tracking
    this._fluidRecords = [];   // { record, fluidSim, hitBox, state }
    this._fluidMouse      = new THREE.Vector2(0, 0);
    this._fluidMousePrev  = new THREE.Vector2(0, 0);
    this._fluidMouseActive = false;
    this._fluidActiveRecord = null;
    this._fluidDragStartX = 0;
    this._fluidDragStartY = 0;
    this._tapStartX = 0;
    this._tapStartY = 0;

    this._onPointerMove  = this._onPointerMove.bind(this);
    this._onPointerUpFluid = this._onPointerUpFluid.bind(this);

    // Tap vs drag disambiguation: only fire raycast if pointer moved < 8px
    this._doRaycast = this._onClick.bind(this);
    this._onTapDown = (e) => { this._tapStartX = e.clientX; this._tapStartY = e.clientY; };
    this._onTapUp   = (e) => {
      const dx = e.clientX - this._tapStartX;
      const dy = e.clientY - this._tapStartY;
      if (Math.hypot(dx, dy) < 8) this._doRaycast(e);
    };
    this.domElement.addEventListener("pointerdown", this._onTapDown, { passive: true });
    this.domElement.addEventListener("pointerup",   this._onTapUp,   { passive: true });

    this._texCache = new Map(); // url -> THREE.Texture



    // Optional callbacks for click hits/misses
    this.onHit = null;
    this.onMiss = null;

    //debug flag to show clickable hitBoxes
    this.debugOn = debugOn;

  }

  destroy() {
    this.domElement.removeEventListener("pointerdown", this._onTapDown);
    this.domElement.removeEventListener("pointerup",   this._onTapUp);

    // dispose everything we created
    for (const s of this.screens) this.removeScreen(s.mesh);
    this.screens.length = 0;
    this.hitBoxes.length = 0;
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
    clickableSize = [width * 1.2, height * 1.2], // size of the clickable hitBox (if clickable)
    onClick = null, // optional callback(meshOrPodium, hit)
    artworkInfo = null, // { title, artist, description }
    poster = null,    // still image URL shown when not focused (video screens only)
    skipReveal = true, // true = always fully visible, no radial wipe animation
    location = null,  // location ID this artwork belongs to (null = always visible)
  }) {

    if (this.debugOn) {
      console.log("Adding screen:", url, position, rotation);
    }

    rotation = rotation.map(r => THREE.MathUtils.degToRad(r));
    const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

    let texture, video, videoTexture, posterTexture;

    const screenAspect = width / height;

    // Async onLoad callbacks below close over `setContainScale` which is defined after
    // material creation — safe because THREE.TextureLoader always fires onLoad async.
    if (isVideo) {
      const vr = this._makeVideoTexture(url);
      video = vr.video;
      videoTexture = vr.texture;

      if (poster) {
        posterTexture = this._makeImageTexture(poster, (loadedTex) => {
          const img = loadedTex.image;
          if (img?.naturalWidth > 0) setContainScale(img.naturalWidth / img.naturalHeight);
        }).texture;
        texture = posterTexture; // show still until focused
      } else {
        texture = videoTexture;
      }

      if (artworkInfo) artworkInfo.isVideo = true;
    } else {
      texture = this._makeImageTexture(url, (loadedTex) => {
        const img = loadedTex.image;
        if (img?.naturalWidth > 0) setContainScale(img.naturalWidth / img.naturalHeight);
      }).texture;
      video = null; videoTexture = null; posterTexture = null;
    }

    

    const revealTex = this.textureLoader.load(import.meta.env.BASE_URL + "/art/textures/radial-512px.jpg");
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
    material.userData = { uReveal: skipReveal ? 0.0 : 1.0 };
    if (skipReveal) material.uniforms.uReveal.value = 0.0;

    // Auto-detect media aspect ratio and set contain scale on material
    const setContainScale = (mediaAspect) => {
      const [sx, sy] = this._computeContainScale(mediaAspect, screenAspect);
      material.uniforms.uContainScale.value.set(sx, sy);
    };

    if (isVideo) {
      const applyVideoScale = () => {
        if (video.videoWidth > 0) setContainScale(video.videoWidth / video.videoHeight);
      };
      if (video.videoWidth > 0) applyVideoScale();
      else video.addEventListener("loadedmetadata", applyVideoScale, { once: true });
    }
    // Images: contain scale set via onLoad callbacks in _makeImageTexture calls above

    const geometry = new THREE.PlaneGeometry(width, height);
    const screenMesh = new THREE.Mesh(geometry, material);
    screenMesh.position.set(...position);
    screenMesh.rotation.set(...rotation);
    screenMesh.userData.isScreen = true;
    screenMesh.userData.revealMaterial = material; // for easy access later
    screenMesh.userData.skipReveal = skipReveal;

    this.scene.add(screenMesh);

    // --- Frame / backing ---
    const frameThickness = 0.08;
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const frameGeo = new THREE.PlaneGeometry(width + frameThickness * 2, height + frameThickness * 2);
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);

    const frameLocalOffset = new THREE.Vector3(0, 0, -0.02);
    const frameQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation));
    frameLocalOffset.applyQuaternion(frameQuat);
    frameMesh.position.set(
      position[0] + frameLocalOffset.x,
      position[1] + frameLocalOffset.y,
      position[2] + frameLocalOffset.z
    );
    frameMesh.rotation.set(...rotation);
    this.scene.add(frameMesh);

    //add a box for the artwork to sit on
    let boxMesh = null;
    if(plinthVisible){
      const boxGeoHeight = 2.0;
      const boxGeo = new THREE.BoxGeometry(width * 0.9, boxGeoHeight, 1.0);
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x404040 });
      boxMesh = new THREE.Mesh(boxGeo, boxMat);
      boxMesh.position.set(position[0], position[1] - (height / 2) - (boxGeoHeight / 2), position[2]);
      boxMesh.rotation.set(...rotation);
      boxMesh.receiveShadow = true;
      boxMesh.castShadow = true;

      this.scene.add(boxMesh);
    }

    // Optional clickable hitBox
    let hitBox = null;
    if (clickable) {
      //hitBox is invisible if no in debug, but it still receives clicks
      
      hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(...clickableSize, 0.5),
        new THREE.MeshBasicMaterial({ visible: this.debugOn, opacity: 0.3, transparent: true })
      );

      hitBox.position.set(position[0], position[1] - offsetClick, position[2]);
      hitBox.rotation.set(...rotation);
      hitBox.userData.cameraScalar = _cameraScalar;
      hitBox.userData.onClick = onClick;
      hitBox.userData.focusTarget = screenMesh;
      hitBox.userData.artworkInfo = artworkInfo;

      if (isVideo) {
        hitBox.userData.video = video;
        hitBox.userData.videoTexture = videoTexture;
        hitBox.userData.posterTexture = posterTexture; // null if no poster

        // Contain scales — populated async once dimensions are known
        hitBox.userData.videoContainScale = [1, 1];
        hitBox.userData.posterContainScale = [1, 1];

        const applyVideoScale = () => {
          if (video.videoWidth > 0) {
            hitBox.userData.videoContainScale = this._computeContainScale(
              video.videoWidth / video.videoHeight, screenAspect
            );
          }
        };
        if (video.videoWidth > 0) applyVideoScale();
        else video.addEventListener("loadedmetadata", applyVideoScale, { once: true });

        if (poster) {
          this.textureLoader.load(poster, (loadedTex) => {
            const img = loadedTex.image;
            if (img && img.naturalWidth > 0) {
              hitBox.userData.posterContainScale = this._computeContainScale(
                img.naturalWidth / img.naturalHeight, screenAspect
              );
            }
          });
        }
      }

      this.scene.add(hitBox);
      this.hitBoxes.push(hitBox);
      this.clickables.push(hitBox);
    }
    if (hitBox) {
      //hitBox.userData.focusTarget = screenMesh;
      hitBox.userData.focusTarget = hitBox;
      screenMesh.userData.focusTarget = hitBox; // so clicking screen also focuses hitBox (which is where the video toggle is)
      hitBox.userData.revealTarget = screenMesh; // so we can reveal the screen when hitBox is clicked
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


    screenMesh.userData.location = location;
    // screenMesh itself is included so toggling via hitBox (the registered obj) also hides the screen
    screenMesh.userData.associatedMeshes = [screenMesh, frameMesh, hitBox, boxMesh, textMesh].filter(Boolean);

    const record = { mesh: screenMesh, material, texture, video: video ?? null, videoTexture, posterTexture, hitBox, textMesh, frameMesh };
    // store record so we can dispose later
    this.screens.push(record);

    // make screen itself clickable too (optional)
    screenMesh.userData.onClick = onClick;
    screenMesh.userData.artworkInfo = artworkInfo;
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
    clickableSize = [width * 1.2, height * 1.2], // size of the clickable hit box (if clickable)
    plinthVisible = true,

    // layout
    infoPanel = true,
    infoWidth = 3.2,
    infoHeight = 2.25,
    infoOffset = [2.4, 0.0, 0.0], // local offset to the right of the screen
    buttonSize = 0.45,
    buttonOffsetY = -0.85,        // local Y offset for prev/next hit areas

    //transition
    transitionDuration = 1.2,

    skipReveal = true,
    onFocusClick = null,
    location = null,
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
      onClick: onFocusClick,
      plinthVisible,
      skipReveal,
      location,
      artworkInfo: {
        title: content.title ?? "",
        artist: content.artist ?? "",
        description: content.bio ?? "",
        narration: content.narration,
        narrationCues: content.narrationCues
      }
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
        if (state._transitioning) return; // prevent overlap

        const n = state.images.length;
        state.index = ((i % n) + n) % n;
        const url = state.images[state.index];
        const tex = this._getCachedTexture(url);
        const uniforms = record.material?.uniforms;
        if (!uniforms) return;

        state._transitioning = true;

        // Set the incoming texture into uMapNext
        uniforms.uMapNext.value = tex;

        // Tween uBlend 0 → 1
        const duration = transitionDuration; // seconds
        const start = performance.now();

        const animate = () => {
          const elapsed = (performance.now() - start) / 1000;
          const p = Math.min(elapsed / duration, 1.0);
          uniforms.uBlend.value = p;

          if (p < 1.0) {
            requestAnimationFrame(animate);
          } else {
            // Commit: move next into current, reset blend
            uniforms.uMap.value = tex;
            uniforms.uMapNext.value = tex; // avoid stale ref
            uniforms.uBlend.value = 0.0;
            state._transitioning = false;
          }
        };
        requestAnimationFrame(animate);
      },

      /*
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
      */
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

    // Append carousel-specific meshes to associatedMeshes so location visibility works
    const extra = [infoMesh, prevBtn, nextBtn].filter(Boolean);
    if (extra.length) {
      screenMesh.userData.associatedMeshes = (screenMesh.userData.associatedMeshes ?? []).concat(extra);
    }

    return {
      screenMesh,
      infoMesh,
      prevBtn,
      nextBtn,
      carousel: state
    };
  }


  // -------- fluid carousel --------

  addFluidContentScreen(params) {
    // identical params to addContentScreen — delegates to it then swaps the material
    const {
      content,
      width = 4,
      height = 2.25,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      clickable = true,
      offsetClick = 0,
      fontSize = 30,
      clickableSize = [width * 1.2, height * 1.2],
      plinthVisible = true,
      infoPanel = true,
      infoWidth = 3.2,
      infoHeight = 2.25,
      infoOffset = [2.4, 0.0, 0.0],
      buttonSize = 0.45,
      buttonOffsetY = -0.85,
      transitionDuration = 1.2,
      skipReveal = true,
      onFocusClick = null,
      location = null,
    } = params;

    // 1) Build via addContentScreen (creates mesh, hitbox, buttons, info panel, carousel state)
    const result = this.addContentScreen({
      content, width, height, position, rotation, clickable, offsetClick,
      fontSize, clickableSize, plinthVisible, infoPanel, infoWidth, infoHeight,
      infoOffset, buttonSize, buttonOffsetY,
      transitionDuration,
      skipReveal,
      onFocusClick,
      location,
    });

    const { screenMesh, prevBtn, nextBtn, carousel } = result;
    const record = this.screens.find(s => s.mesh === screenMesh);
    if (!record) return result;

    // Seed _texCache with the index-0 texture (loaded by addScreen via _makeImageTexture,
    // not _getCachedTexture) so navigating back to index 0 reuses the same GPU texture.
    const firstUrl = content.images[0];
    if (!this._texCache.has(firstUrl) && record.texture) {
      this._texCache.set(firstUrl, record.texture);
    }
    // Preload all carousel images so navigation never stalls on an empty cache.
    for (const url of content.images) {
      this._getCachedTexture(url); // no-op if already cached
    }

    // 2) Replace material with fluid carousel material
    const revealTex = record.material?.uniforms?.uRevealMap?.value;
    const currentMap = record.material?.uniforms?.uMap?.value;
    const oldMat = record.material;

    const fluidMat = makeCarouselMaterial({ map: currentMap, revealMap: revealTex });

    screenMesh.material = fluidMat;
    screenMesh.userData.revealMaterial = fluidMat;
    screenMesh.userData.skipReveal = skipReveal;
    if (skipReveal) fluidMat.uniforms.uReveal.value = 0.0;
    record.material = fluidMat;

    oldMat?.dispose?.();

    // Propagate contain scale to fluidMat — the addScreen callback fires async
    // (after image load) and updates the now-disposed oldMat, so we re-derive it here.
    const screenAspect = width / height;
    const applyContainScale = (img) => {
      if (!img?.naturalWidth) return;
      const [sx, sy] = this._computeContainScale(img.naturalWidth / img.naturalHeight, screenAspect);
      fluidMat.uniforms.uContainScale.value.set(sx, sy);
    };
    if (currentMap?.image?.naturalWidth > 0) {
      applyContainScale(currentMap.image);
    } else if (currentMap?.image) {
      if (currentMap.image.naturalWidth > 0) {
        applyContainScale(currentMap.image);
      } else {
        currentMap.image.addEventListener(
          'load',
          () => applyContainScale(currentMap.image),
          { once: true }
        );
      }
    }

    // 3) Create fluid sim
    const fluidSim = new CarouselFluidSim();

    // 4) Override carousel setIndex to use fluid transition
    // Records transition intent; update(dt) drives the blend inside the main loop.
    carousel.setIndex = (i, wipeOriginNDC = null) => {
      if (carousel._transitioning) return;
      const n = carousel.images.length;
      carousel.index = ((i % n) + n) % n;
      const url = carousel.images[carousel.index];
      const tex = this._getCachedTexture(url);
      const uniforms = fluidMat.uniforms;

      carousel._transitioning = true;
      uniforms.uMapNext.value = tex;
      if (wipeOriginNDC) uniforms.uWipeOrigin.value.copy(wipeOriginNDC);
      else uniforms.uWipeOrigin.value.set(0, 0);
      uniforms.uIsTransitioning.value = 1.0;
      uniforms.uDragReveal.value = 0.0;

      fr._transition = { tex, uniforms, elapsed: 0, duration: transitionDuration };
    };

    // Wire prev/next buttons with wipe origin from button NDC position
    prevBtn.userData.onClick = () => {
      const origin = prevBtn.position.clone().project(this.camera);
      carousel.setIndex(carousel.index - 1, origin);
    };
    nextBtn.userData.onClick = () => {
      const origin = nextBtn.position.clone().project(this.camera);
      carousel.setIndex(carousel.index + 1, origin);
    };

    // 5) Register fluid record for update loop
    const fr = { record, fluidSim, hitBox: record.hitBox, state: carousel, screenMesh, _transition: null };
    this._fluidRecords.push(fr);

    // 6) Add pointer listeners for fluid drag + swipe
    this.domElement.addEventListener("pointermove",  this._onPointerMove,   { passive: true });
    this.domElement.addEventListener("pointerup",    this._onPointerUpFluid, { passive: true });
    this.domElement.addEventListener("pointercancel",this._onPointerUpFluid, { passive: true });

    // Override pointerdown to also track fluid drag start
    const domEl = this.domElement;
    const fluidOnDown = (e) => {
      if (document.pointerLockElement === domEl) return;
      const rect = domEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const ndc = new THREE.Vector2(x, y);
      this.raycaster.setFromCamera(ndc, this.camera);
      if (fr.hitBox) {
        const hits = this.raycaster.intersectObject(fr.hitBox, false);
        if (hits.length > 0) {
          this._fluidMouseActive = true;
          this._fluidActiveRecord = fr;
          this._fluidDragStartX = e.clientX;
          this._fluidDragStartY = e.clientY;
          const uv = hits[0].uv;
          const simUV = new THREE.Vector2(uv.x * 2 - 1, uv.y * 2 - 1);
          this._fluidMouse.copy(simUV);
          this._fluidMousePrev.copy(simUV);
          fluidMat.uniforms.uDragReveal.value = 1.0;
        }
      }
    };
    domEl.addEventListener("pointerdown", fluidOnDown, { passive: true });

    return result;
  }

  // Per-frame update: steps fluid sims, updates uSim + uTime uniforms
  update(dt) {
    if (!this.renderer || !this._fluidRecords.length) return;
    const mouseDelta = new THREE.Vector2();
    for (const fr of this._fluidRecords) {
      const { fluidSim, record } = fr;
      const uniforms = record.material?.uniforms;
      if (!uniforms) continue;

      const isActive = this._fluidMouseActive && this._fluidActiveRecord === fr;
      mouseDelta.subVectors(this._fluidMouse, this._fluidMousePrev).multiplyScalar(120);

      fluidSim.update(dt, this.renderer, this._fluidMouse, mouseDelta, isActive);

      if (fluidSim.texture) uniforms.uSim.value = fluidSim.texture;
      uniforms.uTime.value += dt;

      // Advance active blend transition inside the main loop (safe renderer context)
      if (fr._transition) {
        const t = fr._transition;
        t.elapsed += dt;
        const p = Math.min(t.elapsed / t.duration, 1.0);
        t.uniforms.uBlend.value = p;
        if (p >= 1.0) {
          t.uniforms.uMap.value = t.tex;
          t.uniforms.uMapNext.value = t.tex;
          t.uniforms.uBlend.value = 0.0;
          t.uniforms.uIsTransitioning.value = 0.0;
          fr.state._transitioning = false;
          fr._transition = null;
          fluidSim.clearSim(this.renderer);
        }
      }
    }
    this._fluidMousePrev.copy(this._fluidMouse);
  }

  _onPointerMove(e) {
    if (!this._fluidMouseActive || !this._fluidActiveRecord) return;
    const fr = this._fluidActiveRecord;
    if (!fr.hitBox) return;
    const rect = this.domElement.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
    const hits = this.raycaster.intersectObject(fr.hitBox, false);
    if (hits.length > 0) {
      const uv = hits[0].uv;
      this._fluidMouse.set(uv.x * 2 - 1, uv.y * 2 - 1);
    }
  }

  _onPointerUpFluid(e) {
    if (!this._fluidMouseActive) return;
    const fr = this._fluidActiveRecord;
    this._fluidMouseActive = false;

    if (fr) {
      const uniforms = fr.record.material?.uniforms;
      if (uniforms) uniforms.uDragReveal.value = 0.0;

      // swipe detection
      const dx = e.clientX - this._fluidDragStartX;
      if (Math.abs(dx) > 40) {
        const rect = this.domElement.getBoundingClientRect();
        const ox = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const oy = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        const wipeOrigin = new THREE.Vector2(ox, oy);
        if (dx < 0) fr.state.setIndex(fr.state.index + 1, wipeOrigin);
        else        fr.state.setIndex(fr.state.index - 1, wipeOrigin);
      }
    }

    this._fluidActiveRecord = null;
  }

  removeScreen(screenMesh) {
    const idx = this.screens.findIndex(s => s.mesh === screenMesh);
    if (idx === -1) return;

    const s = this.screens[idx];

    if (s.textMesh) {
      this.scene.remove(s.textMesh);
      this._disposeMesh(s.textMesh);
    }

    if (s.frameMesh) {
      this.scene.remove(s.frameMesh);
      this._disposeMesh(s.frameMesh);
    }

    if (s.hitBox) {
      this.scene.remove(s.hitBox);
      this._disposeMesh(s.hitBox);
      this._removeFromArray(this.hitBoxes, s.hitBox);
      this._removeFromArray(this.clickables, s.hitBox);
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

  _makeImageTexture(url, onLoad = null) {
    const tex = this.textureLoader.load(url, onLoad);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return { texture: tex, video: null };
  }

  _computeContainScale(mediaAspect, screenAspect) {
    if (mediaAspect >= screenAspect) return [1.0, mediaAspect / screenAspect];
    return [screenAspect / mediaAspect, 1.0];
  }

  _makeVideoTexture(url) {
    const video = document.createElement("video");
    video.src = url;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = false;
    video.playsInline = true; // required for iOS
    video.preload = "metadata"; // fetch headers only (dimensions for containScale); buffer starts on focus
    // No autoplay — started explicitly on focus via activateVideo()

    const tex = new THREE.VideoTexture(video);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    return { texture: tex, video };
  }

  // -------- video management --------

  activateVideo(hitBox) {
    // Always stop any currently playing video first
    if (this._activeVideo) {
      this._activeVideo.pause();
      const prevHitBox = this.hitBoxes.find(h => h.userData.video === this._activeVideo);
      if (prevHitBox?.userData.posterTexture) {
        this._swapScreenTexture(prevHitBox, prevHitBox.userData.posterTexture, prevHitBox.userData.posterContainScale);
      }
      this._activeVideo = null;
    }

    const video = hitBox?.userData?.video;
    if (!video) return null;

    // Upgrade preload so the browser starts buffering now that the user is watching.
    // Only call load() if readyState is 0 (never loaded) — calling it when data is
    // already buffered resets currentTime to 0, causing a restart on re-focus.
    video.preload = "auto";
    if (video.readyState === 0) video.load();

    this._activeVideo = video;

    // Swap screen to video texture (with its contain scale)
    if (hitBox.userData.videoTexture) {
      this._swapScreenTexture(hitBox, hitBox.userData.videoTexture, hitBox.userData.videoContainScale);
    }

    // Play — called within a user-gesture chain so audio is allowed.
    // readyState >= 3 (HAVE_FUTURE_DATA) means enough is buffered to start.
    // If not there yet, wait for the first canplay event then try again.
    const tryPlay = () => video.play().catch(() => {});

    if (video.readyState >= 3) {
      tryPlay();
    } else {
      const onCanPlay = () => {
        tryPlay();
        video.removeEventListener("canplay", onCanPlay);
      };
      video.addEventListener("canplay", onCanPlay);
    }
    return video;
  }

  deactivateVideo(hitBox) {
    const video = hitBox?.userData?.video;
    if (!video) return;

    video.pause();
    // Drop back to metadata-only so the browser can free the video buffer
    video.preload = "metadata";
    video.load();
    if (this._activeVideo === video) this._activeVideo = null;

    // Restore poster if one was provided (with its contain scale)
    if (hitBox.userData.posterTexture) {
      this._swapScreenTexture(hitBox, hitBox.userData.posterTexture, hitBox.userData.posterContainScale);
    }
  }

  _swapScreenTexture(hitBox, tex, containScale) {
    if (!tex) return;
    const screenMesh = hitBox.userData.revealTarget;
    if (!screenMesh) return;
    const mat = screenMesh.userData.revealMaterial;
    if (mat?.uniforms?.uMap) mat.uniforms.uMap.value = tex;
    if (containScale && mat?.uniforms?.uContainScale) {
      mat.uniforms.uContainScale.value.set(...containScale);
    }
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
    const tex = this.textureLoader.load(url, (loadedTex) => {
      if (this.renderer) this.renderer.initTexture(loadedTex);
    });
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
  offsetClick = 0,          // like your hitBox Y offset (optional)
  hitboxSize = null,        // if null we compute from model bounds

  text = "",
  fontSize = 30,
  textOffset = [0, -0.6, 0.6], // local [x,y,z] offset relative to model rotation
  plinthVisible = true,

  castShadow = true,

  playAnimation = "first",  // "first" | null | "name"
  onClick = null,
  artworkInfo = null, // { title, artist, description }
  location = null,   // location ID this artwork belongs to (null = always visible)
  rotationOffset = 0, // extra Y-axis degrees applied after rotation — sets the drag-to-rotate rest angle
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
  if (rotationOffset) modelRoot.rotateY(THREE.MathUtils.degToRad(rotationOffset));
  modelRoot.userData.baseQuaternion = modelRoot.quaternion.clone(); // rest pose for drag-to-rotate
  modelRoot.userData.isModel = true;
  modelRoot.userData.onClick = onClick;

  this.scene.add(modelRoot);

  // GPU warmup: pre-upload textures + compile shaders to avoid first-render stutter
  if (this.renderer) {
    modelRoot.traverse(child => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      mats.forEach(mat => {
        [mat.map, mat.normalMap, mat.roughnessMap, mat.metalnessMap,
         mat.emissiveMap, mat.aoMap, mat.lightMap, mat.envMap]
          .forEach(t => { if (t) this.renderer.initTexture(t); });
      });
    });
    await this.renderer.compileAsync(this.scene, this.camera);
  }

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
  let hitBox = null;
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

    hitBox = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ visible: this.debugOn, opacity: 0.3, transparent: true })
    );

    hitBox.position.set(position[0], position[1] - offsetClick, position[2]);
    hitBox.rotation.set(...rotRad);
    hitBox.userData.onClick = onClick;
    hitBox.userData.focusTarget = modelRoot; // so camera focus can target the model
    hitBox.userData.focusTarget = hitBox; // focus on hitBox itself for better framing, but you can switch to modelRoot if you want to focus on the model directly
    hitBox.userData.isModelHitbox = true;
    hitBox.userData.artworkInfo = artworkInfo;
    hitBox.userData.modelRoot = modelRoot; // for drag-to-rotate in World.js
    modelRoot.userData.hitBox = hitBox; // expose for external registry access

    this.scene.add(hitBox);
    this.hitBoxes.push(hitBox);
    this.clickables.push(hitBox);
  }

  //add plinth for the model to sit on, we can use the same dimensions as the hitbox but make it a thin box under the model
  let plinth = null;
  if(plinthVisible){
  const plinthHeight = 10.2;
  plinth = new THREE.Mesh(
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

  modelRoot.userData.location = location;
  // modelRoot itself is included so visibility toggling via hitBox (the registered obj) also hides the model
  modelRoot.userData.associatedMeshes = [modelRoot, textMesh, plinth].filter(Boolean);

  const record = { root: modelRoot, hitBox, textMesh, mixer, clips: animations, url };
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

  if (m.hitBox) {
    this.scene.remove(m.hitBox);
    this._disposeMesh(m.hitBox);
    this._removeFromArray(this.hitBoxes, m.hitBox);
    this._removeFromArray(this.clickables, m.hitBox);
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
