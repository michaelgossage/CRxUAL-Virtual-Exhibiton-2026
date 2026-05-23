import { Mesh, MeshStandardMaterial, SphereGeometry, Vector3, Raycaster, Vector2 } from "three";
import { makeProximityRevealMaterial, applyProximityRevealToMaterial, ProximityRevealSystem } from "../shaders/proximityRevealMaterial.js";
import { addDefaultLights } from "./lights.js";
import { BoxGeometry } from "three";
import { ScreenManager } from "./ScreenManager.js";
import { makeTextPlane } from "./makeTextPlane.js";
import { ControlsFPS } from "./ControlsFPS.js";
import { CameraFocus } from "./CameraFocus.js";
import { makeTween01 } from "../utils/tween.js";

import { loadGLTFWithAnimations } from "../utils/gltfLoader.js"; 
import { applyHDRI } from "./hdri.js";

import { LocationManager } from "./LocationManager.js";
import { makeArchGridMaterial } from "../shaders/gridShader.js";
import { InfoPanel } from "../ui/InfoPanel.js";
import { ModelCarousel } from "./experiences/ModelCarousel.js";
import { ImmersiveCarousel } from "./experiences/ImmersiveCarousel.js";
import { ModelGalleryWalk } from "./experiences/ModelGalleryWalk.js";




export class World {
  constructor({ scene, camera, renderer, sizes, debugOn = false, isMobile = false }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this._debug = debugOn;
    this.isMobile = isMobile;
    this.controls = new ControlsFPS({ camera: this.camera, domElement: this.renderer.domElement, autoRotate: true, autoRotateSpeed: -0.05 });
    // focus helper for smoothly moving camera to screens
    this.focus = new CameraFocus({ camera: this.camera });
    this._artworkRegistry = [];
    this._currentArtworkIndex = -1;
    this.infoPanel = new InfoPanel({
      onClose: () => this.screenManager.onMiss?.(),
      onNav: (dir) => this._navigateArtwork(dir),
      onJumpTo: (idx) => this._navigateToIndex(idx)
    });
    this._controlsSaved = null;
    this._focusState = "idle"; // idle | focusing | focused | returning
    this._focusCooldown = 0;
    this._focusedExperience = null;
    this._exitingExperience = null; // experience playing its exit animation after unfocus
    this._focusedScreen = null;
    this._focusedHitbox = null;
    this._lastfocusedScreen = null;
    this._lastRevealedScreen = null;
    this._activeNarration = null; // { audio: HTMLAudioElement, obj }

    // Narration autoplay — set to false from TitleScreen toggle before Start
    this.autoplayNarration = true;

    //tween animations
    this._tweens = [];

    // location-based visibility
    this._currentLocation = 'lobby';
    this._pendingLocation = null;
    this._pendingFocusIndex = null; // set when cross-location jump is triggered from list

    // proximity reveal system for environment geometry
    this.proximityReveal = new ProximityRevealSystem();

    // Tracks all async loading promises (models, experiences, env GLBs).
    // waitForReady() resolves only after all of these complete + final compileAsync.
    this._loadingPromises = [];

    // Location completion reveal — tracks which artworks have been seen
    this._seenArtworkIndices  = new Set();  // Set<number> — registry indices focused this session
    this._locationRevealZones = {};         // { [locationName]: { center:[x,y,z], radius:number } }
    this._completedLocations  = new Set();  // prevents re-triggering after first completion

    // env meshes collected from GLB traversal — used for tap + mouse-trail raycasts
    this._envMeshes          = [];
    this._envRay             = new Raycaster();
    this._lastNDC            = new Vector2();
    this._mouseRevealDirty   = false;   // true when pointermove fired since last update
    this._lastMouseRevealPos = null;    // Vector3 — world pos of last mouse trail reveal
    this._modelDrag = null;             // { lastX, modelRoot } while drag-rotating a focused model
    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      this._lastNDC.set(
        (e.clientX / this.sizes.width)  * 2 - 1,
       -(e.clientY / this.sizes.height) * 2 + 1
      );
      // Start model drag if focused on a 3D model or experience
      if (this._focusState === "focused") {
        if (this._focusedExperience?.onDrag) {
          this._modelDrag = { lastX: e.clientX, modelRoot: null };
        } else {
          const modelRoot = this._focusedScreen?.userData?.modelRoot;
          if (modelRoot) this._modelDrag = { lastX: e.clientX, modelRoot };
        }
      }
    });
    this.renderer.domElement.addEventListener('pointermove', (e) => {
      this._lastNDC.set(
        (e.clientX / this.sizes.width)  * 2 - 1,
       -(e.clientY / this.sizes.height) * 2 + 1
      );
      this._mouseRevealDirty = true;
      // Rotate focused model on drag (or delegate to active experience)
      if (this._modelDrag) {
        const dx = e.clientX - this._modelDrag.lastX;
        if (this._focusedExperience?.onDrag) {
          this._focusedExperience.onDrag(dx);
        } else if (this._modelDrag.modelRoot) {
          this._modelDrag.modelRoot.rotateY(dx * 0.007);
          this.renderer.shadowMap.needsUpdate = true;
        }
        this._modelDrag.lastX = e.clientX;
      }
    });
    this.renderer.domElement.addEventListener('pointerup', () => {
      this._modelDrag = null;
    }, { passive: true });
    

    // initialise the screen manager for adding artworks
    this.screenManager = new ScreenManager({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
      domElement: this.renderer.domElement,
      makeTextPlane,
      debugOn: this._debug,  // set to true to show clickable podiums
      isMobile: this.isMobile,
    });

    this.screenManager.onHit = (obj) => {
      if (this.locations.isMoving) return;
      // Route clicks to the active experience first
      if (this._focusedExperience) {
        const result = this._focusedExperience.onHit?.(obj);
        if (result === true) return; // absorbed, no camera action
        if (result?.consumed) {
          // Experience wants to move camera to a specific model
          if (result.focusTarget) {
            this.focus.focusOn({ targetObject: result.focusTarget, distance: "fit", duration: 0.6, padding: 1 });
          }
          if (result.artworkInfo) this.infoPanel.show(result.artworkInfo);
          return;
        }
      }

      const target = obj.userData.focusTarget || obj;
      // If already focused on this artwork, tap toggles video play/pause
      if (this._focusState === "focused" && this._focusedScreen === target) {
        const video = obj.userData.video;
        if (video) {
          if (video.paused) video.play().catch(() => {});
          else video.pause();
        }
        return;
      }
      this._focusOnObj(obj);
    };

    this.screenManager.onMiss = () => {
      // Tap on empty environment — paint a temporary reveal at the hit point
      if (this._focusState === "idle") {
        this._doEnvTapReveal();
        return;
      }

      if (this._focusCooldown > 0) return;
      if (this.focus.isMoving) return;
      if (this._focusState === "idle") return;

      // Let the active experience intercept — e.g. carousel returning to overview
      if (this._focusedExperience) {
        const result = this._focusedExperience.onMiss?.();
        if (result === true || result?.consumed) {
          if (result?.focusTarget) {
            this.focus.focusOn({ targetObject: result.focusTarget, distance: "fit", duration: 0.6, padding: 1.5 });
          }
          if (result?.artworkInfo) this.infoPanel.show(result.artworkInfo);
          else this.infoPanel.hide();
          return;
        }
        // result === false → fall through to full exit
      }

      const _prevExp = this._focusedExperience;
      this._restoreExperienceHitbox(_prevExp);
      _prevExp?.onUnfocus();
      this._focusedExperience = null;
      if (_prevExp?._isExiting) this._exitingExperience = _prevExp;
      this._focusState = "returning";
      this._focusCooldown = 0.2;

      // Spin focused model back to its rest quaternion
      const _modelRoot = this._focusedScreen?.userData?.modelRoot;
      if (_modelRoot?.userData?.baseQuaternion) {
        const _from = _modelRoot.quaternion.clone();
        const _to   = _modelRoot.userData.baseQuaternion.clone();
        this._tweens.push(makeTween01({
          from: 0, to: 1,
          duration: 0.5,
          onUpdate: (v) => _modelRoot.quaternion.slerpQuaternions(_from, _to, v),
        }));
      }

      this.focus.returnHome(0.7);

      // Pause any playing video/audio and restore poster
      this.screenManager.deactivateVideo(this._focusedScreen);
      this.screenManager.setActiveFluids(null);
      this._deactivateNarration();
      this.infoPanel.hide();
      this.infoPanel.hideVideoControls();
      this.infoPanel.hideAudioControls();

      // 🔥 HIDE animation
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.3);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.3);
      const _expMiss = this._resolveExperienceChildren(this._focusedHitbox, this._focusedScreen);
      if (_expMiss) {
        for (const child of _expMiss) {
          this._animateReveal(child.userData?.screenMesh ?? child, 0.0, 1.0, 0.3);
        }
      }
      // clear focused screen immediately so you can click the same one again if you want
      this._focusedScreen = null;
      this._focusedHitbox = null;
      this._lastRevealedScreen = null;
      
    };

  

    //set camera locaitons
    this.locations = new LocationManager({ camera: this.camera });
    this.locations.setLocations({
      lobby:   { camera: { pos:[0,0.8,0], lookAt:[0,0.8,-1] } },
      WestPavillion:{ camera: { pos:[-34,0.8,-22.4], lookAt:[-36,0.8,-24.0] } },
      EagleBar:{ camera: { pos:[ 1,23,12.8], lookAt:[ 1,23,12] } },
      //winners: { camera: { pos:[0, 12, 24], lookAt:[0, 0, -1] } }
      winners: { camera: { pos:[0, 0.8, 0], lookAt:[0, 0, -1] } }
    });

    // start location
    //this.locations.goTo("lobby", { duration: 0.01 });
    this.locations.goTo("lobby", { duration: 0.01 });
    //this.locations.goTo("WestPavillion", { duration: 0.01 });

      // make a path between 2 lodcations
  this.locations.setPathBidirectional("lobby", "EagleBar", [   
    { pos: [0, 10, 0], lookAt: [0, 23, 0] },                                                                                                                                                      
    { pos: [0, 23, 0], lookAt: [10, 23, 0] },
    { pos: [10, 23, 0], lookAt: [10, 23, 3.2] },
    { pos: [10, 23, 3.2], lookAt: [1,23,12.8] },
    { pos: [7, 23, 4], lookAt: [ 1,23,12.8] },                                                                                                                                                             
  ],
{duration: 5.0, distanceWeighted: true}); 

      // make a path between 2 lodcations
  this.locations.setPathBidirectional("lobby", "WestPavillion", [
    { pos: [3, 0.8, -8], lookAt: [-10, 0.8,-15] },                                                                                                                                                      
    { pos: [-10, 0.8, -15], lookAt: [-12, 0.8, -18] },
    { pos: [-12, 0.8, -18], lookAt: [-28, 0.8, -18] },
    { pos: [-28, 0.8, -18], lookAt: [-30, 0.8, -20] }
  ],
{duration: 5.0, distanceWeighted: true}); 
      // make a path between 2 lodcations
  this.locations.setPathBidirectional("WestPavillion", "EagleBar", [
    { pos: [-28, 0.8, -18], lookAt: [-15, 0.8, -15] },
    { pos: [-12, 0.8, -18], lookAt: [-28, 0.8, -18] },
    { pos: [-10, 0.8, -15], lookAt: [-12, 0.8, -18] },
    { pos: [3, 0.8, -8], lookAt: [-10, 0.8,-15] },
    { pos: [0, 10, 0], lookAt: [0, 23, 0] },                                                                                                                                                      
    { pos: [0, 23, 0], lookAt: [10, 23, 0] },
    { pos: [10, 23, 0], lookAt: [10, 23, 3.2] },
    { pos: [10, 23, 3.2], lookAt: [1,23,12.8] },
    { pos: [7, 23, 4], lookAt: [ 1,23,12.8] }

  ],
{duration: 8.0, distanceWeighted: true}); 

this.setLocationRevealZone("lobby", { center: [0, 4, 0],     radius: 25});
this.setLocationRevealZone("WestPavillion", { center: [-34,0.8,-22.4],     radius: 18});
this.setLocationRevealZone("EagleBar", { center: [1,23,12.8],     radius: 18});

    // Arrow key navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft")  this._navigateArtwork(-1);
      if (e.key === "ArrowRight") this._navigateArtwork(1);
    });

    
    

    // add lights
    addDefaultLights(this.scene);

    
    /**/

    //add geometry
    const room = new Mesh(
      new BoxGeometry(30, 1, 30),
      new MeshStandardMaterial({ color: 0x108080, side: 2 })
    );
    room.position.set(0, -1.5, 0);
    room.receiveShadow = true;
    const envMat1 = makeProximityRevealMaterial(this.proximityReveal, { color: 0x808080, fogColor: 0x000000, side: 2 });
          room.material = envMat1;
    //this.scene.add(room);

    //add walls to the room in a loop
    const wallMaterial = new MeshStandardMaterial({ color: 0x808080, side: 2 });
    const wallThickness = 0.5;
    const wallHeight = 6;
    const halfSize = 30;
    const walls = [
      new BoxGeometry(wallThickness, wallHeight, halfSize * 2), // left
      new BoxGeometry(wallThickness, wallHeight, halfSize * 2), // right
      new BoxGeometry(halfSize * 2, wallHeight, wallThickness), // back
      new BoxGeometry(halfSize * 2, wallHeight, wallThickness)  // front
    ];
    const wallPositions = [
      [-halfSize - wallThickness / 2, wallHeight / 2 - 1.5, 0], // left
      [halfSize + wallThickness / 2, wallHeight / 2 - 1.5, 0], // right
      [0, wallHeight / 2 - 1.5, -halfSize - wallThickness / 2], // back
      [0, wallHeight / 2 - 1.5, halfSize + wallThickness / 2]  // front
    ];
    for (let i = 0; i < walls.length; i++) {
      const wall = new Mesh(walls[i], wallMaterial);
      wall.position.set(...wallPositions[i]);
      wall.receiveShadow = true;
      //this.scene.add(wall);
    }
      




    //Test box
    const ball = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ roughness: 0.4, metalness: 0.1 })
    );
    ball.position.set(0, 0, -3);
    ball.castShadow = true;
    //this.scene.add(ball);

    this.ball = ball;
    

    //import environment models
    const gridMat = makeArchGridMaterial({ });
    /*
    const room01 = loadGLTFWithAnimations(import.meta.env.BASE_URL + "art/test3d/Chancery Rosewood_V8_.glb").then((gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.receiveShadow = true;
          applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x800000 });
          this._envMeshes.push(child);

          //child.material = envMat;
          //child.material = new MeshStandardMaterial({ color: 0x808080, side: 2 }); 
          //show glbs texture
          //child.material = child.material.clone();
          //child.material = envMat;
          
          //child.material = gridMat;
        }
      });
      model.scale.set(1.0, 1.0, 1.0);
      model.position.set(0.0, -4.0, 16.0);
      this.scene.add(model);
    }).catch(console.error);
    */

    const _loadEnvGLB = (url, fogColor = 0x800000) => {
      return loadGLTFWithAnimations(url).then((gltf) => {
        const model1 = gltf.scene;
        model1.traverse((child) => {
          if (child.isMesh) {
            // Baked GLBs export MeshBasicMaterial which ignores scene.environment.
            // Swap to MeshStandardMaterial, preserving the baked texture map.
            if (child.material.isMeshBasicMaterial) {
              const prev = child.material;
              child.material = new MeshStandardMaterial({
                map: prev.map,
                side: prev.side,
                roughness: 1.0,
                metalness: 0.0,
              });
              prev.dispose();
            }
            child.material.envMapIntensity = 1.0;
            child.receiveShadow = true;
            applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor });
            this._envMeshes.push(child);
          }
        });
        model1.scale.set(1.0, 1.0, 1.0);
        model1.position.set(0.0, -4.0, 16.0);
        this.scene.add(model1);
      }).catch(console.error);
    };

    const base = import.meta.env.BASE_URL;
    const Lobby          = _loadEnvGLB(base + "art/Building/Chancery Rosewood_LOBBY_BAKE_V4.glb");
    const LobbyFurniture = _loadEnvGLB(base + "art/Building/Chancery Rosewood_LOBBY_FURNITURE_BAKE_V4.glb");
    const WestPavillion  = _loadEnvGLB(base + "art/Building/Chancery Rosewood_Pavilion_BAKE_V4.glb");
    const EagleBar       = _loadEnvGLB(base + "art/Building/Chancery Rosewood_EagleBar_V1.glb");

    // Trigger one shadow-map render pass after all static geometry is in the scene.
    // autoUpdate is disabled in Renderer so this is the only pass for static content.
    this._loadingPromises.push(
      Promise.allSettled([Lobby, LobbyFurniture, WestPavillion, EagleBar]).then(() => {
        this.renderer.shadowMap.needsUpdate = true;
      })
    );

    // add environment (a simple room for now, but could be more complex later)
    applyHDRI({
      renderer: this.renderer,
      scene: this.scene,
      url: import.meta.env.BASE_URL + "art/hdri/qwantani_dusk_2_puresky_4k Medium.jpeg",
      background: true,   // keep your room/fog background
      envIntensity: 1.0
    });


      //base URL
      const baseURL = import.meta.env.BASE_URL;
    //screens

    //above the fireplace
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/birdcage_jichu zhang/IMG_1571-1.jpeg`,
      width: 2,
      height: 1.85,
      position: [0.0, 1.6, -6.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: .1,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "birdcage",
        artist: "Jichu Zhang",
        description: "My paintings are spaces of suspended narration, where the relationship between people and their surroundings is never fixed, but constantly shifting — between intimacy and distance, memory and control. Inspired by familial experiences, everyday interpersonal patterns, and the lingering structures of myth, I seek to construct visual environments that do not illustrate stories, but evoke atmospheres — spaces where something is felt before it is understood. Visually, my compositions follow drifting, current-like rhythms — inspired by the unseen movement of oceanic flows, as a way to mirror the subtle undercurrents of perception and emotional experience.",
        link: "https://ualshowcase.arts.ac.uk/@zhangjichu",
        narration: `${baseURL}audio/birdcage_Narration.mp3`,
        narrationCues: `${baseURL}audio/birdcage_Narration.json`
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //Right of fireplace
     
      

    //right side, left front desk




    //left side, left front desk
    

    
    const unrenderedCarousel = new ImmersiveCarousel({
      scene: this.scene,
      position: [-7.10, 0.7, 1.55],
      rotation: [0, 315, 0],
      panelWidth: 1.4,
      panelHeight: 1.8,
      revealMap: this.screenManager._revealTex,
      debugOn: this._debug,
      artworkInfo: {
        title: "Unrendered",
        artist: "Marie-Lisette Cropp",
        description: "Unrendered explores how the female body is represented and reshaped through technology and Western cultural expectations. The project examines the tension between the physical and the digital, and how images shape our understanding of identity and beauty. Using photogrammetry, the body is scanned into digital form, fragmenting in the process and celebrating these glitches and distortions. By reworking these scans by hand and through darkroom printing, the work restores a raw, physical presence. Inspired by Rosi Braidotti's Posthuman theory, Unrendered views the body as part of a wider ecosystem, continuously shaped by machines, nature, and technology.",
        link: "https://ualshowcase.arts.ac.uk/@marielisette",
        narration: `${baseURL}audio/Unrendered_Narration.mp3`,
        narrationCues: `${baseURL}audio/Unrendered_Narration.json`
      },
      images: [
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-2-1.jpg.avif` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-3-2.jpg` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-3-3.jpg` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-4.jpg` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-5-4.jpg` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-5-5.jpg` },
        { url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-6-2.jpg` },
      ],
    });
    this._loadingPromises.push(unrenderedCarousel.load().then(() => {
      unrenderedCarousel.hitbox.userData.location = 'lobby';
      this._registerExperience(unrenderedCarousel);
      unrenderedCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));

     

    //left side right front desk
    const noosScreen = this.screenManager.addScreen({
      url: "https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Invocation%20of%20the%20Black%20flame_MB.mp4",
      poster: `${baseURL}art/TheNoos-SanneWinderickx/IMG_4879-final-sRGB_Ratio-HQ-landscape-fill-1_1.jpg`,
      width: 2.8,
      height: 1.8,
      position: [-4.8, 23.0, 16.0],
    rotation: [0, 110, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Video Screen",
      location: 'EagleBar',
      artworkInfo: {
        title: "The Noös-∞",
        artist: "Sanne Winderickx",
        description: "The Noös-∞ is a perceptual system and cosmology combining sonic prosthetics, kinaesthetic movement, and narrative design to shift how depression is sensed and understood. It is not a cure, but a method of transmutation—where melancholy is an altered state. At its core are a prosthetic limb and sonic wand, registering sound, gesture, and rhythm to generate live sensory feedback through slow synchrony with self and other.",
        link: "https://ualshowcase.arts.ac.uk/@kinaestheticalchemy"
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
    this._registerArtwork(noosScreen);

    this._loadingPromises.push(this.screenManager.addModel({
      url: `${baseURL}art/TheNoos-SanneWinderickx/TheNoos_yellowHand.glb`,
      position: [-4.3, 22.3, 18.0],
      rotation: [0, 100, 0],
      normalizeTo: 0.8,
      clickable: false,
      text: "",
      textOffset: [0, -0.1, 0.9],
      hitboxSize: [1.8, 1.5, 1.8],
      offsetClick: 0.2,
      plinthVisible:true,
      plinthOffset: [0, -0.5, 0],
      plinthSize: [1.0, 0.5, 1.0],
      location: 'EagleBar',
    }).then((modelRoot) => {
      (noosScreen.userData.hitBox ?? noosScreen).userData.experienceChildren = [modelRoot];
    }).catch(console.error));

    //right side, right front desk
    const whimsyCarousel = new ImmersiveCarousel({
      scene: this.scene,
      position: [7.1, 0.7, 1.4],
      rotation: [0, 45, 0],
      panelWidth: 1.4,
      panelHeight: 1.8,
      revealMap: this.screenManager._revealTex,
      debugOn: this._debug,
      artworkInfo: {
        title: "Whimsy Through The Window",
        artist: "Sarah Abdi",
        description: "My final collection centres around whimsy from nostalgic childhood media. I chose this theme as I believe small forms of escapism is essential, especially when we live in such unstable times; from the rise of fascism to feeling the effects of climate change. Its important maintain a balance to avoid burnout and actually be able to help others. I created woven samples intended as curtains/drapes to block out the grey and dreary London landscape, made from waste and deadstock materials.",
        link: "https://ualshowcase.arts.ac.uk/@sazweaves",
        narration: `${baseURL}audio/Whimsy_Narration.mp3`,
        narrationCues: `${baseURL}audio/Whimsy_Narration.json`
      },
      images: [
        { url: `${baseURL}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193358.jpg` },
        { url: `${baseURL}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193601-1.jpg` },
        { url: `${baseURL}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193031-rotated.jpg` },
        { url: `${baseURL}art/WhimsyThroughTheWindow_SarahAbdi/20250510_104607.jpg` },
      ],
    });
    this._loadingPromises.push(whimsyCarousel.load().then(() => {
      whimsyCarousel.hitbox.userData.location = 'lobby';
      this._registerExperience(whimsyCarousel);
      whimsyCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));

    
    //3d models

    //entrance way
    const Experiment58 = import.meta.env.BASE_URL + "art/Experimentn58-2PositioninSpace_MarieSaintYves/Eperiment58.glb";

    this._loadingPromises.push(this.screenManager.addModel({
      url: Experiment58,
      position: [0, 0.3, 8.5],
      rotation: [0, -35, 0],
      normalizeTo: 2.2,
      clickable: true,
      onClick: (obj, hit) => console.log("Model clicked:", obj),
      //text: "STATUE_01",
      textOffset: [0, -0.1, 0.9],
      hitboxSize: [1.8, 1.5, 1.8],
      offsetClick: 0.2,
      plinthVisible: false,
      playAnimation: "first",
      location: 'lobby',
      artworkInfo: {
        title: "Experiment n°58-2: Position in Space",
        artist: "Marie Saint-Yves",
        description: "An exploration of space, physical forces of the Earth and the theory of material agency. Binding air and helium with low materials (surival blankets, salvaged sack trolley, nylon thread), I aimed to challenge our perception of the World via a contrasting piece, engaging viewers' personal sensory experience while inviting them to take a step back from their daily lives. Interested in leaving work open to individual interpretations, I wonder: What's yours?",
        narration:`${baseURL}audio/Exploration-n58_Narration.mp3`,
        narrationCues: `${baseURL}audio/Exploration-n58_Narration.json`
      }
      
    }).then((modelRoot) => {
      this.statue = modelRoot;
      this._registerArtwork(modelRoot);
    }).catch(console.error));

    const a=import.meta.env.BASE_URL + "art/test3d/8 Ultra High Quality Scan_low poly DRACO jpeg (1024).glb";
    
  



  //right front desk

  this._registerArtwork(this.screenManager.addScreen({
      url: `https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/No%20Longer%20Us_MB.mp4`,
      poster: `${baseURL}art/NoLongerUs_JunShya/Jun-Shya-1-1.jpg`,
      width: 2,
      height: 2.25,
      position: [8.4, 1.1, -1.5],
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.0,
      clickableSize: [2.2, 2.2],
      //text: "",
      location: 'lobby',
      artworkInfo: {
        title: "No Longer Us",
        artist: "Jun Shya",
        description: "By putting a mask on, we begin to play different versions of ourselves. Intrigued by the process of unbalancing composition through distinct colours, crackled textures, and seemingly incongruous references, this series of paintings explores the theme of reality versus illusion in relation to the coexistence of present and past. By capturing the intimate gesture of push and pull in a ballet performance, each dancer becomes a version of another. It reflects the idea that a different version of you exists in the mind of everyone who knows you. Curious images emerge through a process of patient layering and excavation. Parts of the human body and face are either left blank or slightly concealed, yet we, as viewers, are still able to make sense of them.",
        link: "https://ualshowcase.arts.ac.uk/project/638926/cover",
        narration: `${baseURL}audio/NoLongerUs_Narration.mp3`,
        narrationCues: `${baseURL}audio/NoLongerUs_Narration.json`

      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));



    // ── Dummy ModelCarousel ──────────────────────────────────────────────────
    //west pavillion
    const dummyCarousel = new ModelCarousel({
      scene: this.scene,
      position: [-34.2, .5, -15.8],
      rotation: [0, 180, 0],
      radius: 1.0,
      normalizeTo: 1.0,
      debugOn: this._debug,
      artworkInfo: {
        title: "3D Works",
        artist: "Genevieve Carr",
        description: "Nailed transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials.",
        link: "https://ualshowcase.arts.ac.uk/@genevievefkcarr",
        narration: `${baseURL}audio/Nailed_Narration.mp3`,
        narrationCues: `${baseURL}audio/Nailed_Narration.json`
      },
      models: [
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/5Hole_Decimate.glb`,
          playAnimation: "first",
          
          artworkInfo: {
            title: "5 Hole",
            artist: "Genevieve Carr",
            
          }
        },
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/Bone_Decimate.glb`,
          playAnimation: "first",
          
          artworkInfo: {
            title: "3D Bone",
            artist: "Genevieve Carr",
            
          }
        },
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/Hmmnotsure_Decimate.glb`,
          playAnimation: "all",
          
          artworkInfo: {
            title: "Hmm... Not Sure",
            artist: "Genevieve Carr",
            
          }
        },
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/lotsofholes_Decimate.glb`,
          playAnimation: "all",
          
          artworkInfo: {
            title: "Lots of Holes",
            artist: "Genevieve Carr",
            
          }
        },
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/PointBall_Decimate.glb`,
          playAnimation: "all",
          
          artworkInfo: {
            title: "Point Ball",
            artist: "Genevieve Carr",
            
          }
        },
        {
          url: `${baseURL}art/Nailed_Genevieve Carr/3D/TroPhobia_Decimate.glb`,
          playAnimation: "all",
          
          artworkInfo: {
            title: "TroPhobia",
            artist: "Genevieve Carr",
            
          }
        },
      ]
    });

    this._loadingPromises.push(dummyCarousel.load().then(() => {
      dummyCarousel.hitbox.userData.location = 'WestPavillion';
      this._registerExperience(dummyCarousel);
      dummyCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));
    // ────────────────────────────────────────────────────────────────────────

    // ── Dummy ImmersiveCarousel ──────────────────────────────────────────────
    const dummyImmersive = new ImmersiveCarousel({
      scene: this.scene,
      position: [-8.4, 0.8, -1.4],
      rotation: [0, -90, 0],
      radius: 3.5,
      panelWidth: 2.2,
      panelHeight: 1.8,
      revealMap: this.screenManager._revealTex,
      debugOn: this._debug,
      artworkInfo: {
        title: "Self-Finish",
        artist: "Beatrice El Asmar",
        description: "This series of self-portraits was created using slit scan technology, mostly known for its use for photo-finish in racing sports, thus reclaiming a patriarchal automation which judges, measures and commodifies linear speed and \'progress\'. Subverting our expectations of how time and space occupy the photographic image, the work highlights how the supposedly linear progression of human rights, especially for cis and trans women, is being eroded to the extent that it is actually moving backwards. A fragmented portrait of one of the two female photo-finish operators in the UK, this work invites a different kind of embodied photographic seeing.",
        link: "https://ualshowcase.arts.ac.uk/project/682951/cover",
        narration: `${baseURL}audio/Self-Finish_Narration.mp3`,
        narrationCues: `${baseURL}audio/Self-Finish_Narration.json`
      },
      images: [
        {
          url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_02.jpg.avif`,
          
        },
        {
          url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF-01.jpg`,
          
        },
        {
          url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_03.jpg`,
          
        },
        {
          url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_04.jpg`,
          
        },
        {
          url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_08.jpg`,
          
        },
      ],
      
    });

    this._loadingPromises.push(dummyImmersive.load().then(() => {
      dummyImmersive.hitbox.userData.location = 'lobby';
      this._registerExperience(dummyImmersive);
      dummyImmersive._clickables = this.screenManager.clickables;
    }).catch(console.error));
    // ────────────────────────────────────────────────────────────────────────

    

  

  //lobby

  

  //West Pavilion

  //left of entrance way — EMBODIED ModelCarousel
    const veepraCarousel = new ModelCarousel({
      scene: this.scene,
      position: [-28.2, 0.5, -17.0],
      rotation: [0, 180, 0],
      radius: 1.5,
      normalizeTo: 0.6,
      debugOn: this._debug,
      materialOverride: { color: 0xC8C8C8, metalness: 1.0, roughness: 0.15, envMapIntensity: 1.5 },
      artworkInfo: {
        title: "EMBODIED",
        artist: "Veepra Mishra",
        description: "It began with the slightest gesture: my mother hiding her cane behind her back every time a camera appeared, as if the object were never meant to speak for her. This project turns toward that silence and wonders how assistive devices might become sites of cultural expression rather than symbols of concealment. In the realm of assistive design and fashion, such moments reveal how deeply aesthetics and embodiment intertwine, particularly for disabled people of colour whose identities are shaped through layered histories of visibility and belonging. Guided by co-design conversations with two South Asian participants and informed by critical disabilities, material culture, and cultural symbolism, I developed usable prototypes that merge function with cultural resonance. These artefacts, rooted in traditions, memory, agency, and empowerment, ask what happens when assistive devices are culturally expressive artefacts that hold beauty, heritage, and emotional truth. The work demonstrates that when disabled people of colour shape the instruments that support them, assistive devices shift from clinical symbols into objects of affirmation and pride. The process illuminated both the challenges and possibilities of designing across distance, culture, and lived experience. It reveals how identity and functionality are inseparable. Ultimately, the project suggests that inclusive futures emerge when design listens closely, honours complexity, and treats assistive devices not as objects that should be hidden, but as sites of beauty, cultural identity, and empowerment.",
        link: "https://ualshowcase.arts.ac.uk/@veepramishra",
        narration: `${baseURL}audio/Embodied_Narration.mp3`,
        narrationCues: `${baseURL}audio/Embodied_Narration.json`
      },
      models: [
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-01.glb`, artworkInfo: { title: "Ear Study 01", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-02.glb`, artworkInfo: { title: "Ear Study 02", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-03.glb`, artworkInfo: { title: "Ear Study 03", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-04.glb`, artworkInfo: { title: "Ear Study 04", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-05.glb`, artworkInfo: { title: "Ear Study 05", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-06.glb`, artworkInfo: { title: "Ear Study 06", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-07.glb`, artworkInfo: { title: "Ear Study 07", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-08.glb`, artworkInfo: { title: "Ear Study 08", artist: "Veepra Mishra" } },
        { url: `${baseURL}art/EMBODIED_VeepraMishra/Optimized 3D/VeepraMishra-Ear-09.glb`, artworkInfo: { title: "Ear Study 09", artist: "Veepra Mishra" } },
      ],
    });
    this._loadingPromises.push(veepraCarousel.load().then(() => {
      veepraCarousel.hitbox.userData.location = 'WestPavillion';
      this._registerExperience(veepraCarousel);
      veepraCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));

    // ── Black Swan — ImmersiveCarousel ──────────────────────────────────────
    const blackSwanCarousel = new ImmersiveCarousel({
      scene: this.scene,
      position: [-33.9, 0.9, -25.5],
      rotation: [0, 180, 0],
      panelWidth: 1.5,
      panelHeight: 2.0,
      revealMap: this.screenManager._revealTex,
      debugOn: this._debug,
      artworkInfo: {
        title: "Black Swan",
        artist: "Jieun Sung",
        description: "This project is about the black swan. Of all animals, I've always been particularly afraid of birds, but swans are the only ones that have ever helped me overcome that fear. So, I was intrigued to research them. I didn't even know that black swans existed before, and I was fascinated to discover this species of swan. The black swan, with its dark mood and colour, really appealed to me, so I decided to make it the focus of my project.",
        link: "https://ualshowcase.arts.ac.uk/project/645817/cover",
        narration: `${baseURL}audio/BlackSwan_Narration.mp3`,
        narrationCues: `${baseURL}audio/BlackSwan_Narration.json`
      },
      images: [
        { url: `${baseURL}art/BlackSwan-JieunSung/IMG_5414-2.png.avif` },
        { url: `${baseURL}art/BlackSwan-JieunSung/IMG_1886.jpg` },
        { url: `${baseURL}art/BlackSwan-JieunSung/IMG_5433.jpg` },
        { url: `${baseURL}art/BlackSwan-JieunSung/IMG_5435-1.jpg` },
      ],
    });
    this._loadingPromises.push(blackSwanCarousel.load().then(() => {
      blackSwanCarousel.hitbox.userData.location = 'WestPavillion';
      this._registerExperience(blackSwanCarousel);
      blackSwanCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));
    // ────────────────────────────────────────────────────────────────────────

    // ── Dehumanized — Chi An Chou (EagleBar) ────────────────────────────────────
    const dehumanizedCarousel = new ImmersiveCarousel({
      scene: this.scene,
      position: [-7.8, 23, 7.0],
      rotation: [0, -90, 0],
      panelWidth: 1.8,
      panelHeight: 1.35,
      revealMap: this.screenManager._revealTex,
      debugOn: this._debug,
      artworkInfo: {
        title: "Dehumanized",
        artist: "Chi An Chou",
        description: "In this era of artificial intelligence, automation and highly mature technology, the definition of human is gradually disintegrating, and machines and technology are infiltrating and dominating our daily lives. Dehumanized is a conceptual exploration of a future world in which technology no longer centers on human nature, but instead gradually controls, holds power, and eventually replaces humanity. When digital systems take over judgment, aesthetics become algorithmically defined, and the body is transformed into a tool that prioritizes efficiency, emotions and individual consciousness begin to be seen as redundant residues. This project want to use visual language to present a imaginary future worldview: redesigned organisms, individuality erased, and a void beneath the human shell. Is Dehumanized a dystopian fantasy world, or is it a mirror held up to our present? In the wave of rapid innovation, what may ultimately be sacrificed is the very essence of what makes us human.",
        link: "https://ualshowcase.arts.ac.uk/@chiannj",
        narration: `${baseURL}audio/Dehumanized_Narration.mp3`,
        narrationCues: `${baseURL}audio/Dehumanized_Narration.json`
      },
      images: [
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7018-Large.jpeg.avif` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_4790-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_4797-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7023-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7046-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7074-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7099-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7271-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/cdf4401975effd4b5e3a229839cc6976-2-Large.jpg` },
        { url: `${baseURL}art/Dehumanized_ChiAnChou/${encodeURIComponent('未命名的作品-7.jpg')}` },
      ],
    });

    this._loadingPromises.push(dehumanizedCarousel.load().then(() => {
      dehumanizedCarousel.hitbox.userData.location = 'EagleBar';
      this._registerExperience(dehumanizedCarousel);
      dehumanizedCarousel._clickables = this.screenManager.clickables;
    }).catch(console.error));
    // ─────────────────────────────────────────────────────────────────────────────

    //on the wall in to the dining room
    this._registerArtwork(this.screenManager.addScreen({
      url:"https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Pseudosynthesis.mp4",
      poster: `${baseURL}art/Pseudosynthesis_LeonLin/Vertical_comp-1.png.avif`,
      width: 5,
      height: 2.25,
      position: [-26.0, 0.8, -23.0],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.0,
      clickableSize: [5.2, 2.45], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: false,
      location: 'WestPavillion',
      artworkInfo: {
        title: "Pseudosynthesis",
        artist: "Leon Lin",
        description: "This project investigates whether AI-generated performers can authentically replicate human emotional expression in dance and performance. Through interviews with dancers and motion-capture experiments, it identifies three stages of human emotion (raw, mechanical, controlled) and argues that AI is limited to mimicry due to its lack of consciousness, embodiment, and lived experience. Drawing on Judith Butler's theories, it contrasts human performativity (fluid, culturally embedded) with AI's programmed rigidity. The work also explores queering digital avatars, critiques the commodification of bodies, and uses a 3D fashion film to visualize the human-machine divide.",
        link: "https://ualshowcase.arts.ac.uk/project/655404/cover"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));



  this._loadingPromises.push(this.screenManager.addModel({
    url: import.meta.env.BASE_URL + "art/LetMeEatCake_SuzannaTeal/CakeTable_NoCake.glb",
    position: [-29.0, -1.0, -21.0],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
    rotationOffset: 90,
    normalizeTo: 2.2,
    clickable: false,
    text: "",
    textOffset: [0, -0.7, 0.9],
    hitboxSize: [1.8, 1.2, 1.6],
    offsetClick: -1.5,
    plinthVisible: false,
    plinthOffset: [0, -0.8, 0],
    playAnimation: "first",
    location: 'WestPavillion',
  }).catch(console.error));

  // ── Let Me Eat Cake — ModelGalleryWalk ────────────────────────────────────
  const cakeWalk = new ModelGalleryWalk({
    scene: this.scene,
    debugOn: this._debug,
    artworkInfo: {
      title: "Let Me Eat Cake",
      artist: "Suzanna Teal",
      description: "Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it. The installation features a series of sculptural cakes that respond to viewer interaction, creating a dynamic and engaging experience that blurs the line between art and culinary tradition.",
      link: "https://ualshowcase.arts.ac.uk/project/616847/cover",
      narration: `${baseURL}audio/LetMeEatCake_Narration.mp3`,
      narrationCues: `${baseURL}audio/LetMeEatCake_Narration.json`
    },
    entryPosition: [-29.0, 0.0, -21.0],
    entryHitboxSize: [2.4, 2.4, 1.4],
    arrowOffset: 1.0,
    arrowHeight: 0.0,
    arrowSize: 0.5,
    models: [
      {
        url: `${baseURL}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_01.glb`,
        position: [-29.4, -.04, -21.7],
        rotation: [0, 30, 0],
        normalizeTo: .5,
        artworkInfo: {
          title: "Let Me Eat Cake — I",
          artist: "Suzanna Teal",
          description: "Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",
          link: "https://ualshowcase.arts.ac.uk/project/616847/cover",
        },
      },
      {
        url: `${baseURL}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_02.glb`,
        position: [-28.7, -.04, -21.7],
        rotation: [0, 10, 0],
        normalizeTo: .5,
        artworkInfo: {
          title: "Let Me Eat Cake — II",
          artist: "Suzanna Teal",
          description: "Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",
          link: "https://ualshowcase.arts.ac.uk/project/616847/cover",
        },
      },
      {
        url: `${baseURL}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_03.glb`,
        position: [-28.7, -.04, -20.3],
        rotation: [0, -10, 0],
        normalizeTo: .5,
        artworkInfo: {
          title: "Let Me Eat Cake — III",
          artist: "Suzanna Teal",
          description: "Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",
          link: "https://ualshowcase.arts.ac.uk/project/616847/cover",
        },
      },
      {
        url: `${baseURL}art/LetMeEatCake_SuzannaTeal/LetMeEatCake_04.glb`,
        position: [-29.4, -.04, -20.3],
        rotation: [0, -30, 0],
        normalizeTo: .5,
        artworkInfo: {
          title: "Let Me Eat Cake — IV",
          artist: "Suzanna Teal",
          description: "Let Me Eat Cake is a multimedia installation that explores the relationship between food, memory, and identity. Through a combination of sculpture, video, and interactive elements, the work invites viewers to reflect on their own experiences with food and the stories they tell about it.",
          link: "https://ualshowcase.arts.ac.uk/project/616847/cover",
        },
      },
    ],
  });
  this._loadingPromises.push(cakeWalk.load().then(() => {
    cakeWalk.hitbox.userData.location = 'WestPavillion';
    this._registerExperience(cakeWalk);
    cakeWalk._clickables = this.screenManager.clickables;
  }).catch(console.error));
  // ──────────────────────────────────────────────────────────────────────────

    //window corner
        const c=import.meta.env.BASE_URL + "art/EmbodiedMemories_YoonJuChung/JU CHUNG_V2.glb";

  this._loadingPromises.push(this.screenManager.addModel({
    url: c,
    position: [-40.8, 1.0, -25.2],
    //position: [-4, 1.0, -4],
      rotation: [0, 45, 0],
    rotationOffset: 0,
    normalizeTo: 1.5,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "",
    textOffset: [0, -0.7, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: true,
    plinthOffset: [0, -0.8, 0],
    playAnimation: "first",
    location: 'WestPavillion',
    playAnimation:"all",
    artworkInfo: {
        title: "Embodied Memories",
        artist: "Yoon Ju Chung",
        description: "Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist's hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul's geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered.",
        link: "https://ualshowcase.arts.ac.uk/@yoonjuchung",
        narration: `${baseURL}audio/EmbodiedMemories_Narration.mp3`,
        narrationCues: `${baseURL}audio/EmbodiedMemories_Narration.json`
      }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error));

    //wall in the window corner
    this._registerArtwork(this.screenManager.addScreen({
      url: "https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Synesthetic%20Skin_MB.mp4",
      poster: `${baseURL}art/SynestheticSkin_JianingDing/Screenshot 2026-03-22 at 17.33.20.png`,
      width: 3,
      height: 1.5,
      position: [-39, 1.0, -20.4],
      rotation: [0, 180, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "",
      location: 'WestPavillion',
      artworkInfo: {
        title: "Synesthetic Skin：A Posthuman Visual Narrative",
        artist: "Jianing Ding",
        description: "This project explores how the human body is shaped by socio-technical influences within the context of Future Human–Machine Intelligence, and investigates how we might use this “bodily structure” to form new relationships in the future. Through mediums such as virtual digital humans, visual narratives, and AR masks, the work creates a visual experimental space that invites viewers to reflect on their own position within the digital environment. Drawing on Doreen Massey’s (2005) theory of “space as process,” the project understands space as a dynamic field co-generated by body and technology. From this perspective, it begins with the fluidity between virtual and real, breaking down binary oppositions and presenting a state of symbiotic and continuous perception—guiding audiences to recognise that they too exist within a life network composed of data and code. Ultimately, the project constructs a visual experiment of human–machine symbiosis and posthuman perception.",
        link: "https://ualshowcase.arts.ac.uk/project/690407/cover"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //bar Sound art, 
  //Be Not Afraid, Lust Feels Like Bad Luck, 

  //left of bar wall
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Nailed_Genevieve Carr/nailed.webp`,
      width: 1.5,
      height: 2.0,
      position: [-33.4, 1.0, -13.8],
      rotation: [0, 210, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "",
      plinthVisible: false,
      location: 'WestPavillion',
      artworkInfo: {
        title: "Nailed",
        artist: "Genevieve Carr",
        description: "\"Nailed\" transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials.",
        narration: `${baseURL}audio/Nailed_Narration.mp3`,
        narrationCues: `${baseURL}audio/Nailed_Narration.json`
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    

    //right side outside — Faux Flora: 3D model is primary, screen + arrangement are children
    const fauxFloraChildren = [];
    const fauxFloraScreen = this.screenManager.addScreen({
      url: `${baseURL}art/FauxFlora_JustinaAlexandrof/Justina_Alexandroff_2-2.jpg`,
      width: 1.5,
      height: 2.0,
      position: [5.5, 23, 16.5],
      rotation: [0, -135, 0],
      clickable: false,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "",
      plinthVisible: false,
      location: 'EagleBar',
    });
    fauxFloraChildren.push(fauxFloraScreen);

    this._loadingPromises.push(this.screenManager.addModel({
      url: `${baseURL}art/FauxFlora_JustinaAlexandrof/FauxFlora01.glb`,
      position: [5.0, 22.5, 16.0],
      rotation: [0, -135, 0],
      normalizeTo: 0.8,
      clickable: true,
      //text: "",
      textOffset: [0, -0.1, 0.9],
      hitboxSize: [1.4, 1.4, 1.4],
      offsetClick: -0.3,
      plinthVisible:true,
      plinthOffset: [0, -0.3, 0],
      plinthSize: [0.8, 0.8, 0.8],
      location: 'EagleBar',
      artworkInfo: {
        title: "Faux Flora",
        artist: "Justina Alexandroff",
        description: "Urban air pollutants disrupt floral odors, altering the scent of flowers and making it difficult for pollinating insects to locate essential plants. Faux Flora is an artificial flower system designed to guide pollinators toward nearby flower-rich areas. This project is a collaboration with NICE Lab (based in Bangalore) and incorporates Aditi Mishra’s PhD research that an insect pollinator identifies a flower object when it has three traits in combination: radial symmetry, a sweet scent and a reflective surface. I have reimagined these traits through parametric 3D design and printing (for radial symmetry), chemical ecology (for the sweet scent) and nano-cellulose structural colour (for the reflective surface). Acting as visual and olfactory beacons with no nectar reward, insects quickly learn to forage in the surrounding environment. Through artificial chemistry and biomimicry, Faux Flora explores new relationships between species, technology, and cities.",
        link: "https://ualshowcase.arts.ac.uk/@justinaalexandroff",
        narration: `${baseURL}audio/FauxFlora_Narration.mp3`,
        narrationCues: `${baseURL}audio/FauxFlora_Narration.json`
      }
    }).then((modelRoot) => {
      this._registerArtwork(modelRoot);
      modelRoot.userData.experienceChildren = fauxFloraChildren;
    }).catch(console.error));

    this._loadingPromises.push(this.screenManager.addModel({
      url: `${baseURL}art/FauxFlora_JustinaAlexandrof/FauxFloraArrangement.glb`,
      position: [4.1, 21.3, 17.0],
      rotation: [0, -135, 0],
      normalizeTo: 2.5,
      clickable: false,
      text: "",
      textOffset: [0, -0.1, 0.9],
      hitboxSize: [1.8, 1.5, 1.8],
      offsetClick: 0.2,
      plinthVisible:false,
      plinthOffset: [0, -0.5, 0],
      plinthSize: [1.0, 1.0, 1.0],
      location: 'EagleBar',
    }).then((m) => { fauxFloraChildren.push(m); }).catch(console.error));

    //right side of bar
    this._registerArtwork(this.screenManager.addScreen({
      url: "https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/PYTKO%20-%20Lust%20Feels%20Like%20Bad%20Luck.mp4",
      poster: `${baseURL}art/LustFeelsLikeBadLuck-JuliaPytko/Backwards-Artwork-1_1.jpg`,
      width: 1.5,
      height: 1.5,
      position: [7.8, 23, 7.0],
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Lust Feels Like Bad Luck",
        artist: "Julia Pytko",
        description: "Lust Feels Like Bad Luck is an experimental, community-driven exploration of sound, identity, and interactivity. Centred on a four-track EP of experimental electronica, the project expands into a constellation of interconnected works including music videos, a text-based video game and a MetaHuman performance. Together, these elements form an evolving environment where sound, image, and participation flow into one another. The project approaches sound as a living language, a way of listening, reflecting, and connecting. Through collaboration and experimentation across digital and physical spaces, Lust Feels Like Bad Luck reimagines music as a shared process of attention and care, inviting audiences to engage not just as listeners but as participants in an unfolding ecology of experience.",
        link: "https://ualshowcase.arts.ac.uk/@juliapytko"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

   
    //left outside tunnel
    const beNotAfraidScreen = this.screenManager.addScreen({
      url: ` https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Be%20Not%20Afraid.mp4`,
      poster: `${baseURL}art/BeNotAfraid-RysiaAnnaKaczmar/9T0A5893_1.jpg`,
      width: 1.8,
      height: 1.2,
      position: [-5.0, 23, 12.0],
    rotation: [0, 90, 0],
      clickable: true,
      offsetClick: 0.0,
      clickableSize: [2.2, 1.0],
      text: "",
      plinthVisible: false,
      location: 'EagleBar',
      exposure: 1.0,
      artworkInfo: {
        title: "Be Not Afraid",
        artist: "Rysia Anna Kaczmar",
        description: "Be Not Afraid is a sculptural sound work inspired by biblically accurate angels and childhood comfort objects. Constructed from plush fabric and embedded with a speaker in place of an eye, the piece features six oversized wings in various states of motion. It explores the intersection of sacred imagery and emotional attachment, questioning how tenderness and terror can coexist within a single form. Sound pulses through the speaker to activate the work sonically and symbolically. Drawing from religious aesthetics while acknowledging the erosion of moral certainty in contemporary life, Be Not Afraid invites reflection on how belief, fear, and care shape the way we encounter the unknown.",
        link: "https://ualshowcase.arts.ac.uk/@lynxiewho"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
    this._registerArtwork(beNotAfraidScreen);


     this._loadingPromises.push(this.screenManager.addModel({
    url: `${baseURL}art/BeNotAfraid-RysiaAnnaKaczmar/BeNotAfraid_Artwork3D.glb`,
    position: [-4.5, 22.4, 11.2],
    rotation: [0, 90, 0],
    normalizeTo: 0.8,
    clickable: false,
    text: "STATUE_01",
    textOffset: [0, -0.5, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'EagleBar',
  }).then((modelRoot) => {
    this.statue = modelRoot;
    //this._registerArtwork(modelRoot);
    (beNotAfraidScreen.userData.hitBox ?? beNotAfraidScreen).userData.experienceChildren = [modelRoot];
  }).catch(console.error));

  //on the bar
  

    // ── Material Place — ModelGalleryWalk ────────────────────────────────────
    const materialPlaceWalk = new ModelGalleryWalk({
      scene: this.scene,
      debugOn: this._debug,
      artworkInfo: {
        title: "Material Place",
        artist: "Neve Beill",
        description: "This project investigates a sense of place through materiality. Taking an exploratory approach, Neve Beill walked along areas of the River Thames and the coast of the Isle of Wight, collecting various wild clays and other natural materials to create two distinct collections of pots. A key focus of this project is finding innovative ways to use found materials while reducing waste. It replaces conventional commercial materials commonly used in the ceramics industry with a wide variety of waste materials, such as clay from construction sites, broken pieces of glass, and ash from various sources. Honouring her own cultural identity, growing up between London and the Isle of Wight, she draws on the historical significance of ceramics in these areas. The primary forms are inspired by Roman vessels discovered in both locations, while the range of finishes reflects the differing tactile qualities of each place.",
        narration: `${baseURL}audio/MaterialPlaces_Narration.mp3`,
        narrationCues: `${baseURL}audio/MaterialPlaces_Narration.json`
      },
      entryPosition: [0.0, .1, -4.0],
      entryHitboxSize: [4.5, 1.5, 2.0],
      arrowOffset: 0.2,
      arrowHeight: 0.0,
      arrowSize: 0.35,
      models: [
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_01.glb`,
          position: [-1.6, -.55, -4.6],
          rotation: [0, 30, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — I",
            artist: "Neve Beill"
            
          },
        },
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_02.glb`,
          position: [-.4, -.7, -4.5],
          rotation: [0, 10, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — II",
            artist: "Neve Beill"
            
          },
        },
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_03.glb`,
          position: [-0.2, -.7, -4.9],
          rotation: [0, -10, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — III",
            artist: "Neve Beill"
            
          },
        },
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_04.glb`,
          position: [0.2, -.7, -4.9],
          rotation: [0, -20, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — IV",
            artist: "Neve Beill"
            
          },
        },
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_05.glb`,
          position: [.4, -.7, -4.5],
          rotation: [0, -30, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — V",
            artist: "Neve Beill"
            
          },
        },
        {
          url: `${baseURL}art/MaterialPlace_NeveBeill/MaterialPlace_06.glb`,
          position: [1.6, -.55, -4.6],
          rotation: [0, -40, 0],
          normalizeTo: 0.25,
          artworkInfo: {
            title: "Material Place — VI",
            artist: "Neve Beill"
            
          },
        },
      ],
    });
    this._loadingPromises.push(materialPlaceWalk.load().then(() => {
      materialPlaceWalk.hitbox.userData.location = 'lobby';
      this._registerExperience(materialPlaceWalk);
      materialPlaceWalk._clickables = this.screenManager.clickables;
    }).catch(console.error));
    // ─────────────────────────────────────────────────────────────────────────

    //left wall from bar
    const symbionScreen = this.screenManager.addScreen({
      url: `https://pub-866c71617b57495a9adcc2fe87aaff0e.r2.dev/film/Show_Video_ShuyangWang_MB.mp4`,
      poster: `${baseURL}art/Symbion/hero_img-3.jpg-2.avif`,
      width: 1.8,
      height: 1.0,
      position: [1.8, 23, 5.0],
    rotation: [0, -10, 0],
      clickable: true,
      offsetClick: 0.0,
      clickableSize: [2.7, 1.5],
      text: "",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Symbion",
        artist: "Shuyang Wang",
        description: "Symbion is a conceptual model for human–embodied AI collaboration that centers on a novel human–AI relationship spectrum under which a biomimetic robotic hand operates. The spectrum spans five modes—Manual, Training, Collaboration, Guidance, and Automated—each reflecting a different balance of control and learning between human and AI. Within this framework, the robotic hand is designed to collaborate seamlessly with humans in existing ergonomic contexts while expressing movements in ways that are naturally intuitive and easy to interpret. Together, these elements create a unified environment for exploring how embodied AI and humans can learn from one another, share control, and work in synergy.",
        link: "https://ualshowcase.arts.ac.uk/@shuyangwang"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
    this._registerArtwork(symbionScreen);

     this._loadingPromises.push(this.screenManager.addModel({
    url: `${baseURL}art/Symbion/symbionHand.glb`,
    position: [0.8, 22.6, 5.0],
    rotation: [0, -90, 0],
    normalizeTo: 0.8,
    clickable: false,
    text: "",
    textOffset: [0, -0.5, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'EagleBar',
  }).then((modelRoot) => {
    this.statue = modelRoot;
    //this._registerArtwork(modelRoot);
    (symbionScreen.userData.hitBox ?? symbionScreen).userData.experienceChildren = [modelRoot];
  }).catch(console.error));

    // Belt-and-suspenders: hide sync-registered artworks not in the starting location.
    // Async registrations are handled by _registerArtwork itself.
    for (const entry of this._artworkRegistry) {
      const loc = entry.obj.userData.location;
      if (loc && loc !== this._currentLocation) {
        entry.obj.visible = false;
        (entry.obj.userData.associatedMeshes ?? []).forEach(m => { m.visible = false; });
      }
    }



  }

  

  update(dt) {
    //test rotation
    //this.ball.rotation.y += dt * 0.6;

    // update focus cooldown
    this._focusCooldown = Math.max(0, this._focusCooldown - dt);

    const wasLocMoving = this.locations.isMoving;
    this.locations.update(dt);

    // goTo() may be called between frames (click handler), so isMoving can be true
    // before update() sees the false→true edge. Instead, detect a new transition by
    // checking whether _pendingLocation is out-of-sync with the current activeId.
    const justStarted = this.locations.isMoving && this._pendingLocation !== this.locations.activeId;
    const justArrived = wasLocMoving && !this.locations.isMoving;

    if (justStarted) {
      // Show destination artworks — camera hasn't arrived yet
      this._pendingLocation = this.locations.activeId;
      this._setLocationVisibility(this._pendingLocation, true);
    }

    if (justArrived && this._pendingLocation) {
      // Hide previous location artworks — camera has left
      // Skip if travelling to the same location (e.g. initial goTo on load)
      if (this._currentLocation !== this._pendingLocation) {
        this._setLocationVisibility(this._currentLocation, false);
      }
      this._currentLocation = this._pendingLocation;
      this._pendingLocation = null;
    }

    if (justArrived && this._pendingFocusIndex !== null) {
      const pidx = this._pendingFocusIndex;
      this._pendingFocusIndex = null;
      const pending = this._artworkRegistry[pidx];
      // Only focus if we actually arrived at the correct location
      if (pending && pending.obj.userData.location === this._currentLocation) {
        this._focusOnObj(pending.obj);
      }
    }

    // Sync controls orientation when a location transition finishes,
    // otherwise controls.update() would snap the camera back to the old direction.
    if (justArrived) {
      this.camera.rotation.order = "YXZ";
      this.controls.yawTotal = this.camera.rotation.y;
      this.controls.pitch = this.camera.rotation.x;
      this.controls.yawVel = 0;
      this.controls.pitchVel = 0;
    }

    // if not moving between locations and in idle focus state, allow controls to update (e.g. for auto-rotate or user input)
    if (!this.locations.isMoving && this._focusState === "idle") {
      this.controls.update(dt);
    }

    // update camera focus movement
    this.focus.update(dt);

    // state transitions after focus movement
    if (this._focusState === "focusing" && !this.focus.isMoving) {
      this._focusState = "focused";
    }
    if (this._focusState === "returning" && !this.focus.isMoving) {
      this._focusState = "idle";
      this._exitFocusMode();
    }
    
    // update tweens
    // iterate backwards in case any get removed mid-loop
    for (let i = this._tweens.length - 1; i >= 0; i--) {
      const t = this._tweens[i];
      t.update(dt);
      if (t.done) this._tweens.splice(i, 1);
    }

    // update fluid carousel sims
    this.screenManager.update(dt);

    // advance animation mixer for the focused model only
    const focusedModelRoot = this._focusedScreen?.userData?.modelRoot ?? null;
    this.screenManager.updateMixers(dt, focusedModelRoot);

    // tick the active experience (handles its own mixers + tweens)
    this._focusedExperience?.update(dt);
    // tick any experience still playing its exit animation
    if (this._exitingExperience) {
      this._exitingExperience.update(dt);
      if (!this._exitingExperience._isExiting) this._exitingExperience = null;
    }

    // mouse-trail temporary reveal — one raycast per frame at most
    this._tryMouseTrailReveal();

    // sample camera position into environment proximity reveal trail
    this.proximityReveal.update(this.camera.position);
  }

  // Resolves after all async loads (models, experiences, env GLBs) complete and a
  // final compileAsync pass ensures no shader is left uncompiled before user entry.
  async waitForReady() {
    await Promise.allSettled(this._loadingPromises);

    // compileAsync and render() both use traverseVisible + frustum culling, so they
    // skip invisible objects. Temporarily force everything on so ALL geometry is
    // warmed up before the user enters — canvas is hidden behind the loading overlay.
    const wasHidden = [];
    const wasCulled = [];
    this.scene.traverse(obj => {
      if (!obj.visible)            { wasHidden.push(obj); obj.visible = true; }
      if (obj.isMesh && obj.frustumCulled) { wasCulled.push(obj); obj.frustumCulled = false; }
    });

    await this.renderer.compileAsync(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera); // uploads VBOs to GPU

    // Restore location-based visibility
    for (const obj of wasHidden) obj.visible = false;
    for (const obj of wasCulled) obj.frustumCulled = true;
  }

  onResize() {
    // optional: any world-specific resize logic
  }

  _isInFocusMode() {
    return this.focus.isFocused || this.focus.isMoving; // either focused or returning
  }

  _enterFocusMode() {
    if (this._controlsSaved) return; // already in focus mode

    // save controls state so we can restore later
    this._controlsSaved = {
      autoRotate: this.controls.autoRotate,
      dragToLook: this.controls.dragToLook
    };

    // immediately stop any auto-rotation or dragging to prevent conflicts with focus movement
    this.controls.resetDrag();
    this.controls.dragToLook = false;
    this.controls.autoRotate = false;
  }

  _exitFocusMode() {
    if (!this._controlsSaved) return;

    // restore controls state
    this.controls.dragToLook = this._controlsSaved.dragToLook;
    this.controls.autoRotate = this._controlsSaved.autoRotate;

      // ✅ important: clear any stuck drag state
    this.controls.resetDrag();
    this._controlsSaved = null;
  }


  _focusOnObj(obj) {
    if (this._focusCooldown > 0) return;
    if (this.focus.isMoving) return;

    const target = obj.userData.focusTarget || obj;
    const revealTarget = obj.userData.revealTarget || obj;

    if (this._focusState === "idle") {
      this.focus.setHomeFromCurrent?.();
    }
    this._enterFocusMode();
    this._focusState = "focusing";
    this._focusCooldown = 0.2;

    if (this._focusedScreen && this._focusedScreen !== target) {
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.25);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.25);
    }

    this._focusedScreen = target;
    this._focusedHitbox = obj;
    this._lastRevealedScreen = revealTarget;
    this.screenManager.setActiveFluids(target);

    // Permanently reveal colour around this artwork in the environment
    const artworkWorldPos = new Vector3();
    target.getWorldPosition(artworkWorldPos);
    this.proximityReveal.addPermanentReveal(artworkWorldPos);

    if (this._focusedScreen !== this._lastfocusedScreen) {
      this._animateReveal(target, 1.0, 0.0, 0.4);
      this._animateReveal(revealTarget, 1.0, 0.0, 0.4);
      this._lastfocusedScreen = this._focusedScreen;
      const _expFocus = this._resolveExperienceChildren(obj, target);
      if (_expFocus) {
        for (const child of _expFocus) {
          this._animateReveal(child.userData?.screenMesh ?? child, 1.0, 0.0, 0.4);
        }
      }
    }

    // Animate grayscale → colour — only if not already colourised
    const revealMat = revealTarget?.userData?.revealMaterial;
    const currentColor = revealMat?.uniforms?.uColorReveal?.value ?? 0;
    if (currentColor < 1.2) {
      this._animateColorReveal(revealTarget, currentColor, 1.2, 1.5);
    }

    if (target.userData.focusPose) {
      const { position, quaternion, duration: d = 0.9 } = target.userData.focusPose;
      this.focus.moveTo({ position, quaternion, duration: d });
    } else {
      this.focus.focusOn({ targetObject: target, distance: "fit", heightOffset: 0.0, duration: 0.7, padding: 1 });
    }

    const info = obj.userData.artworkInfo;
    if (info) this.infoPanel.show(info);

    // Activate video if this is a film screen (stops any previously playing video)
    const video = this.screenManager.activateVideo(obj);
    if (video) {
      this.infoPanel.showVideoControls(video);
      this.infoPanel.hideAudioControls();
      this._deactivateNarration();
    } else {
      this.infoPanel.hideVideoControls();
      const audio = this._activateNarration(obj);
      if (audio) {
        this.infoPanel.showAudioControls(audio, obj.userData.narrationCuesData ?? null);
        const cuesUrl = obj.userData.artworkInfo?.narrationCues;
        if (cuesUrl && !obj.userData.narrationCuesData) {
          fetch(cuesUrl)
            .then(r => r.json())
            .then(data => {
              obj.userData.narrationCuesData = data.segments ?? [];
              if (this._activeNarration?.obj === obj) {
                this.infoPanel.setCues(obj.userData.narrationCuesData);
              }
            })
            .catch(err => console.warn('[Narration] Could not load cues:', cuesUrl, err));
        }
      } else {
        this.infoPanel.hideAudioControls();
      }
    }

    const idx = this._artworkRegistry.findIndex(r => r.obj === obj);
    if (idx !== -1) {
      this._currentArtworkIndex = idx;
      this.infoPanel.setActiveIndex(idx, this._artworkRegistry.length);
      this._seenArtworkIndices.add(idx);
      const loc = this._artworkRegistry[idx].obj.userData.location;
      if (this._debug) {
        const seenInLoc = loc
          ? this._artworkRegistry.filter((r, i) => r.obj.userData.location === loc && this._seenArtworkIndices.has(i)).length
          : 0;
        const totalInLoc = loc
          ? this._artworkRegistry.filter(r => r.obj.userData.location === loc).length
          : 0;
        console.log(`[LocationReveal] seen artwork #${idx} "${this._artworkRegistry[idx].info.title}" (location: "${loc}" — ${seenInLoc}/${totalInLoc} seen)`);
      }
      if (loc) this._checkLocationCompletion(loc);
    }

    // Activate experience if this object belongs to one
    const _exp = obj.userData.experience ?? null;
    if (_exp !== this._focusedExperience) {
      // Re-add previous experience's entry hitbox before switching away
      const _prevExp2 = this._focusedExperience;
      this._restoreExperienceHitbox(_prevExp2);
      if (this._exitingExperience && this._exitingExperience !== _exp) {
        this._exitingExperience._cancelExit?.();
        this._exitingExperience = null;
      }
      _prevExp2?.onUnfocus();
      this._focusedExperience = _exp;
      if (_prevExp2?._isExiting) this._exitingExperience = _prevExp2;
      _exp?.onFocus(this.camera, obj);
      // Remove entry hitbox from clickables — Three.js raycasts visible=false objects too,
      // so the large central box would intercept clicks meant for the per-model hitboxes.
      this._removeExperienceHitbox(_exp);
    }
  }

  _removeExperienceHitbox(exp) {
    if (!exp?.hitbox) return;
    const idx = this.screenManager.clickables.indexOf(exp.hitbox);
    if (idx !== -1) this.screenManager.clickables.splice(idx, 1);
  }

  _restoreExperienceHitbox(exp) {
    if (!exp?.hitbox) return;
    if (!this.screenManager.clickables.includes(exp.hitbox)) {
      this.screenManager.clickables.push(exp.hitbox);
    }
  }

  _activateNarration(obj) {
    this._deactivateNarration();
    const url = obj.userData.artworkInfo?.narration;
    if (!url) return null;

    if (!obj.userData.audioEl) {
      obj.userData.audioEl = new Audio(url);
      obj.userData.audioEl.preload = "metadata";
    }

    const audio = obj.userData.audioEl;
    this._activeNarration = { audio, obj };
    if (this.autoplayNarration) audio.play().catch(() => {});
    return audio;
  }

  _deactivateNarration() {
    if (!this._activeNarration) return;
    this._activeNarration.audio.pause();
    this._activeNarration = null;
  }

  _setLocationVisibility(locationId, visible) {
    for (const entry of this._artworkRegistry) {
      if (entry.obj.userData.location !== locationId) continue;
      if (!visible && entry.obj === this._focusedScreen) continue;
      entry.obj.visible = visible;
      (entry.obj.userData.associatedMeshes ?? []).forEach(m => { m.visible = visible; });
    }
  }

  // Raycast the last pointer position against env meshes and paint a temporary reveal.
  // Only fires when in idle state (clicking empty space, not an artwork).
  _doEnvTapReveal() {
    if (!this._envMeshes.length) return;
    this._envRay.setFromCamera(this._lastNDC, this.camera);
    const hits = this._envRay.intersectObjects(this._envMeshes, false);
    if (hits.length > 0) {
      this.proximityReveal.addTemporaryReveal(hits[0].point);
      this._lastMouseRevealPos = hits[0].point.clone();
    }
  }

  // Mouse-trail reveal — called once per frame, raycasts only if pointermove fired.
  // Throttled by world-space distance so fast drags don't flood _activeTemp.
  _tryMouseTrailReveal() {
    if (!this._mouseRevealDirty) return;
    this._mouseRevealDirty = false;

    if (!this.proximityReveal.features.mouseTrail) return;
    if (this._focusState !== "idle") return;
    if (!this._envMeshes.length) return;

    this._envRay.setFromCamera(this._lastNDC, this.camera);
    const hits = this._envRay.intersectObjects(this._envMeshes, false);
    if (!hits.length) return;

    const pt = hits[0].point;
    const MIN_DIST = 1.5; // world units — prevent flooding _activeTemp on slow hover
    if (this._lastMouseRevealPos && this._lastMouseRevealPos.distanceTo(pt) < MIN_DIST) return;

    this._lastMouseRevealPos = pt.clone();
    this.proximityReveal.addTemporaryReveal(pt);
  }

  _registerArtwork(mesh) {
    // For screens: focusTarget is the hitBox; for models: userData.hitBox is set
    const clickable = mesh.userData?.hitBox || mesh.userData?.focusTarget || mesh;
    const info = clickable.userData?.artworkInfo || mesh.userData?.artworkInfo;
    if (!info) return;
    // Propagate location and associatedMeshes from source mesh to the registered object
    if (clickable !== mesh) {
      if (clickable.userData.location === undefined) clickable.userData.location = mesh.userData.location ?? null;
      if (!clickable.userData.associatedMeshes) clickable.userData.associatedMeshes = mesh.userData.associatedMeshes ?? [];
    }
    // Auto-tag with current location if not explicitly set by the developer
    if (clickable.userData.location === undefined || clickable.userData.location === null) {
      clickable.userData.location = this._currentLocation;
    }
    this._artworkRegistry.push({ info, obj: clickable });
    if (this._debug) {
      const idx = this._artworkRegistry.length - 1;
      console.log(`[LocationReveal] registered artwork #${idx} "${info.title}" → location: "${clickable.userData.location}"`);
    }

    // Hide immediately if registering into a non-current location (covers async loads)
    const loc = clickable.userData.location;
    if (loc && loc !== this._currentLocation) {
      clickable.visible = false;
      (clickable.userData.associatedMeshes ?? []).forEach(m => { m.visible = false; });
    }

    this.infoPanel.setRegistry(this._artworkRegistry);
  }

  // Register a mini-experience (ModelCarousel, etc.) into the artwork registry.
  // Adds the experience's hitbox to ScreenManager's click list and tags it.
  _registerExperience(exp) {
    exp.hitbox.userData.experience = exp;
    exp.hitbox.userData.hitBox = exp.hitbox; // prevent _registerArtwork following focusTarget → root
    this.screenManager.clickables.push(exp.hitbox);

    if (exp.modelHitboxes?.length) {
      for (const hb of exp.modelHitboxes) {
        hb.userData.experience = exp;
        this.screenManager.clickables.push(hb);
      }
    }

    // Always include root so _setLocationVisibility hides the whole experience.
    // model hitboxes listed explicitly because Three.js raycaster checks each
    // mesh's own .visible, not ancestor visibility.
    exp.hitbox.userData.associatedMeshes = [
      ...(exp.hitbox.userData.associatedMeshes ?? []),
      exp.root,
      ...(exp.modelHitboxes ?? []),
    ];

    this._registerArtwork(exp.hitbox);
  }

  // ─── Location reveal zone registration ───────────────────────────────────
  // Call after setLocations() in scene setup. When all artworks tagged with
  // `name` have been seen, floods the zone permanently.
  // Usage: world.setLocationRevealZone('lobby', { center: [0, 1, 0], radius: 20 });
  setLocationRevealZone(name, { center, radius }) {
    this._locationRevealZones[name] = { center, radius };
  }

  _checkLocationCompletion(locationName) {
    if (this._completedLocations.has(locationName)) return;
    const zone = this._locationRevealZones[locationName];
    if (!zone) {
      if (this._debug) console.log(`[LocationReveal] no zone registered for "${locationName}" — call setLocationRevealZone() to enable completion reveal`);
      return;
    }

    const inZone = this._artworkRegistry
      .map((r, i) => ({ r, i }))
      .filter(({ r }) => r.obj.userData.location === locationName);

    if (inZone.length === 0) return;
    if (!inZone.every(({ i }) => this._seenArtworkIndices.has(i))) return;

    this._completedLocations.add(locationName);
    if (!zone.center || !zone.radius) {
      if (this._debug) console.warn(`[LocationReveal] zone "${locationName}" is missing center or radius`);
      return;
    }
    if (this._debug) console.log(`[LocationReveal] ✓ location "${locationName}" complete — flooding area at`, zone.center, 'r =', zone.radius);
    const [cx, cy, cz] = zone.center;
    this.proximityReveal.addAreaReveal(cx, cy, cz, zone.radius);
  }

  _navigateArtwork(dir) {
    // Let a focused experience consume the nav first (e.g. carousel cycling)
    if (this._focusedExperience) {
      const result = this._focusedExperience.onNav?.(dir);
      if (result?.consumed) {
        if (result.focusTarget) this.focus.focusOn({ targetObject: result.focusTarget, duration: 0.5 });
        if (result.artworkInfo) this.infoPanel.show(result.artworkInfo);
        return;
      }
    }

    // Only cycle through artworks in the current location (or always-visible null-location ones)
    const activeIndices = this._artworkRegistry
      .map((entry, i) => ({ entry, i }))
      .filter(({ entry }) => {
        const loc = entry.obj.userData.location;
        return loc === this._currentLocation || loc === null;
      })
      .map(({ i }) => i);

    if (!activeIndices.length) return;

    const posInActive = activeIndices.indexOf(this._currentArtworkIndex);
    const nextPos = posInActive === -1
      ? 0
      : ((posInActive + dir) % activeIndices.length + activeIndices.length) % activeIndices.length;

    this._navigateToIndex(activeIndices[nextPos]);
  }

  _navigateToIndex(idx) {
    const entry = this._artworkRegistry[idx];
    if (!entry) return;

    const targetLocation = entry.obj.userData.location;
    const needsTravel = targetLocation && targetLocation !== this._currentLocation;

    if (needsTravel) {
      // Exit focus mode immediately — location transition takes over the camera
      if (this._focusState !== "idle") {
        this.screenManager.deactivateVideo(this._focusedScreen);
        this._deactivateNarration();
        this.infoPanel.hide();
        this.infoPanel.hideVideoControls();
        this.infoPanel.hideAudioControls();
        this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.15);
        this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.15);
        const _expNav1 = this._resolveExperienceChildren(this._focusedHitbox, this._focusedScreen);
        if (_expNav1) {
          for (const child of _expNav1) {
            this._animateReveal(child.userData?.screenMesh ?? child, 0.0, 1.0, 0.15);
          }
        }
        this._focusedScreen = null;
        this._focusedHitbox = null;
        this._lastRevealedScreen = null;
        this._exitFocusMode();
        this._focusState = "idle";
      }
      this.locations.goTo(targetLocation, { duration: 3.0 });
      this._pendingFocusIndex = idx;
      return;
    }

    this._focusOnObj(entry.obj);
  }

  goToLocation(id, options = {}) {
    // If currently focused on an artwork, clean up focus state before travelling
    if (this._focusState !== "idle") {
      this.screenManager.deactivateVideo(this._focusedScreen);
      this._deactivateNarration();
      this.infoPanel.hide();
      this.infoPanel.hideVideoControls();
      this.infoPanel.hideAudioControls();
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.15);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.15);
      const _expNav2 = this._resolveExperienceChildren(this._focusedHitbox, this._focusedScreen);
      if (_expNav2) {
        for (const child of _expNav2) {
          this._animateReveal(child.userData?.screenMesh ?? child, 0.0, 1.0, 0.15);
        }
      }
      this._focusedScreen = null;
      this._focusedHitbox = null;
      this._lastRevealedScreen = null;
      this._exitFocusMode();
      this._focusState = "idle";
      // Stop any in-progress focus tween and clear saved home so returnHome
      // won't snap back to the old location after travelling
      this.focus.isMoving = false;
      this.focus.isFocused = false;
      this.focus._hasHome = false;
    }
    this.locations.goTo(id, options);
  }

  _setReveal(mesh, v) {
    const mat = mesh?.userData?.revealMaterial;
    if (!mat) return;
    mat.uniforms.uReveal.value = v;
  }

  _animateReveal(mesh, from, to, duration = 0.35) {
    if (!mesh) return;
    if (mesh.userData.skipReveal) return;

    // cancel existing reveal tweens on this mesh
    this._tweens = this._tweens.filter(t => t.mesh !== mesh);

    const tween = makeTween01({
      from,
      to,
      duration,
      onUpdate: (v) => this._setReveal(mesh, v)
    });

    tween.mesh = mesh;
    this._tweens.push(tween);
  }

  _resolveExperienceChildren(hitbox, focusTarget) {
    return hitbox?.userData.experienceChildren
      ?? hitbox?.userData.revealTarget?.userData.experienceChildren
      ?? hitbox?.userData.modelRoot?.userData.experienceChildren
      ?? focusTarget?.userData.experienceChildren
      ?? null;
  }

  _setColorReveal(mesh, v) {
    const mat = mesh?.userData?.revealMaterial;
    if (!mat?.uniforms?.uColorReveal) return;
    mat.uniforms.uColorReveal.value = v;
  }

  _animateColorReveal(mesh, from, to, duration = 1.2) {
    if (!mesh) return;
    this._tweens = this._tweens.filter(t => t.colorMesh !== mesh);
    const tween = makeTween01({
      from,
      to,
      duration,
      onUpdate: (v) => this._setColorReveal(mesh, v)
    });
    tween.colorMesh = mesh;
    this._tweens.push(tween);
  }


  

}

