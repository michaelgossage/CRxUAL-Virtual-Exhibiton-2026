import * as THREE from "three";


/**
 * ScreenManager
 * - addScreen({ url, width, height, position, rotation, clickable, text... })
 * - manages videos, clickable podiums, and clean disposal
 */
export class ScreenManager {
  constructor({ scene, camera, domElement, makeTextPlane }) {
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

    this._onClick = this._onClick.bind(this);
    this.domElement.addEventListener("pointerdown", this._onClick, { passive: true });
    // add these properties in constructor:
    this.onHit = null;
    this.onMiss = null;

  }

  destroy() {
    this.domElement.removeEventListener("pointerdown", this._onClick);

    // dispose everything we created
    for (const s of this.screens) this.removeScreen(s.mesh);
    this.screens.length = 0;
    this.podiums.length = 0;
    this.clickables.length = 0;
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
    onClick = null, // optional callback(meshOrPodium, hit)
  }) {

    rotation = rotation.map(r => THREE.MathUtils.degToRad(r));
    const isVideo = /\.(mp4|webm|ogg)$/i.test(url);

    const { texture, video } = isVideo
      ? this._makeVideoTexture(url)
      : this._makeImageTexture(url);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide,
      toneMapped: false,
      transparent: true
    });

    const geometry = new THREE.PlaneGeometry(width, height);
    const screenMesh = new THREE.Mesh(geometry, material);
    screenMesh.position.set(...position);
    screenMesh.rotation.set(...rotation);
    screenMesh.userData.isScreen = true;

    this.scene.add(screenMesh);

    // Optional clickable podium
    let podium = null;
    if (clickable) {
      podium = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, 1),
        new THREE.MeshBasicMaterial({ visible: false })
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

    // Text label under the screen
    let textMesh = null;
    if (this.makeTextPlane && text) {
      textMesh = this.makeTextPlane(text, {
        fontsize: fontSize,
        textColor: { r: 200, g: 255, b: 200 },
        canvasWidth: 100 * width + 20
      });
      textMesh.position.set(position[0], position[1] - (height / 2) - 0.6, position[2]);
      textMesh.rotation.set(...rotation);
      this.scene.add(textMesh);
    }

    const record = { mesh: screenMesh, material, texture, video: video ?? null, podium, textMesh };
    // store record so we can dispose later
    this.screens.push(record);

    // make screen itself clickable too (optional)
    screenMesh.userData.onClick = onClick;
    if (clickable) this.clickables.push(screenMesh);

    return screenMesh;
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
}
