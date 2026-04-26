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




export class World {
  constructor({ scene, camera, renderer, sizes, debugOn = false }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this._debug = debugOn;
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
    this._focusedScreen = null;
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
      // Start model drag if focused on a 3D model
      if (this._focusState === "focused") {
        const modelRoot = this._focusedScreen?.userData?.modelRoot;
        if (modelRoot) this._modelDrag = { lastX: e.clientX, modelRoot };
      }
    });
    this.renderer.domElement.addEventListener('pointermove', (e) => {
      this._lastNDC.set(
        (e.clientX / this.sizes.width)  * 2 - 1,
       -(e.clientY / this.sizes.height) * 2 + 1
      );
      this._mouseRevealDirty = true;
      // Rotate focused model on drag
      if (this._modelDrag) {
        const dx = e.clientX - this._modelDrag.lastX;
        this._modelDrag.modelRoot.rotateY(dx * 0.007);
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
      debugOn: this._debug  // set to true to show clickable podiums
    });

    this.screenManager.onHit = (obj) => {
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
      this._deactivateNarration();
      this.infoPanel.hide();
      this.infoPanel.hideVideoControls();
      this.infoPanel.hideAudioControls();

      // 🔥 HIDE animation
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.3);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.3);
      // clear focused screen immediately so you can click the same one again if you want
      this._focusedScreen = null;
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

this.setLocationRevealZone("lobby", { center: [0, 4, 0],     radius: 50});
this.setLocationRevealZone("WestPavillion", { center: [-34,0.8,-22.4],     radius: 50});
this.setLocationRevealZone("EagleBar", { center: [1,23,12.8],     radius: 50});

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
    const room01 = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/test3d/Chancery Rosewood_V8_.glb").then((gltf) => {
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

    const Lobby = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/Building/ChanceryRosewood-Lobby-V1.glb").then((gltf) => {
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
          applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x800000 });
          this._envMeshes.push(child);
        }
      });
      model1.scale.set(1.0, 1.0, 1.0);
      model1.position.set(0.0, -4.0, 16.0);
      this.scene.add(model1);
    }).catch(console.error);

    const WestPavillion = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/Building/ChanceryRosewood-Pavilion-V1.glb").then((gltf) => {
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
          applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x800000 });
          this._envMeshes.push(child);
        }
      });
      model1.scale.set(1.0, 1.0, 1.0);
      model1.position.set(0.0, -4.0, 16.0);
      this.scene.add(model1);
    }).catch(console.error);


    const EagleBar = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/test3d/EagleBar_V1.glb").then((gltf) => {
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
          applyProximityRevealToMaterial(child.material, this.proximityReveal, { fogColor: 0x800000 });
          this._envMeshes.push(child);
        }
      });
      model1.scale.set(1.0, 1.0, 1.0);
      model1.position.set(0, 21.3, 19.2);
      this.scene.add(model1);
    }).catch(console.error);

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
      position: [0.0, 1.4, -6.0],   // e.g. on/near carousel A
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
        narration: `${baseURL}audio/birdcage_Narration.mp3`,
        narrationCues: `${baseURL}audio/birdcage_Narration.json`
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //Right of fireplace
     
      /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EMBODIED_VeepraMishra/20251114_Veepra0132-1-1.webp`,
      width: 1.3,
      height: 1.74,
      position: [4.65, 0.9, -6.0],   // e.g. on/near carousel A
      rotation: [0, -35, 0],
      clickable: true,
      offsetClick: .1,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: true,
      location: 'lobby',
      artworkInfo: {
        title: "EMBODIED: Reclaiming Assistive Devices as Culturally Expressive Fashion",
        artist: "Veepra Mishra",
        description: "It began with the slightest gesture: my mother hiding her cane behind her back every time a camera appeared, as if the object were never meant to speak for her. This project turns toward that silence and wonders how assistive devices might become sites of cultural expression rather than symbols of concealment. In the realm of assistive design and fashion, such moments reveal how deeply aesthetics and embodiment intertwine, particularly for disabled people of colour whose identities are shaped through layered histories of visibility and belonging. Guided by co-design conversations with two South Asian participants and informed by critical disabilities, material culture, and cultural symbolism, I developed usable prototypes that merge function with cultural resonance. These artefacts, rooted in traditions, memory, agency, and empowerment, ask what happens when assistive devices are culturally expressive artefacts that hold beauty, heritage, and emotional truth. The work demonstrates that when disabled people of colour shape the instruments that support them, assistive devices shift from clinical symbols into objects of affirmation and pride. The process illuminated both the challenges and possibilities of designing across distance, culture, and lived experience. It reveals how identity and functionality are inseparable. Ultimately, the project suggests that inclusive futures emerge when design listens closely, honours complexity, and treats assistive devices not as objects that should be hidden, but as sites of beauty, cultural identity, and empowerment.  "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 2,
      height: 1.25,
      position: [5.0, 1.0, -10.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //right side, left front desk

    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/BlackSwan-JieunSung/IMG_5414-2.png.avif`,
      width: 1.5,
      height: 2,
      position: [7.2, .5, -4.35],   // e.g. on/near carousel A
      rotation: [0, -45, 0],
      clickable: true,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Black Swan",
        artist: "Jieun Sung",
        description: "This project is about the black swan. Of all animals, I’ve always been particularly afraid of birds, but swans are the only ones that have ever helped me overcome that fear. So, I was intrigued to research them. I didn’t even know that black swans existed before, and I was fascinated to discover this species of swan. The black swan, with its dark mood and colour, really appealed to me, so I decided to make it the focus of my project."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    /*
    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 1,
      height: 2.25,
      position: [8.4, 1.0, -2.5],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 1.0,
      clickableSize: [2.2, 3.25],
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
    */

    //right side, right front desk

    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Nailed_Genevieve Carr/nailed.webp`,
      width: 1.5,
      height: 2.0,
      position: [7.2, 0.5, 1.55],
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Nailed",
        artist: "Genevieve Carr",
        description: "\"Nailed\" transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

      
      //right side, middle front desk

      /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7018-Large.jpeg.avif`,
      width: 1.8,
      height: 1.3,
      position: [8.4, 0.8, -1.5],
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Dehumanized",
        artist: "Chi An Chou",
        description: "In this era of artificial intelligence, automation and highly mature technology, the definition of human is gradually disintegrating, and machines and technology are infiltrating and dominating our daily lives. Dehumanized is a conceptual exploration of a future world in which technology no longer centers on human nature, but instead gradually controls, holds power, and eventually replaces humanity. When digital systems take over judgment, aesthetics become algorithmically defined, and the body is transformed into a tool that prioritizes efficiency, emotions and individual consciousness begin to be seen as redundant residues. This project want to use visual language to present a imaginary future worldview: redesigned organisms, individuality erased, and a void beneath the human shell. Is Dehumanized a dystopian fantasy world, or is it a mirror held up to our present? In the wave of rapid innovation, what may ultimately be sacrificed is the very essence of what makes us human."
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //above front door
    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Pseudosynthesis_LeonLin/Vertical_comp-1.png.avif`,
      width: 5,
      height: 2.25,
      position: [0.0, 0.8, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Pseudosynthesis",
        artist: "Leon Lin",
        description: "This project investigates whether AI-generated performers can authentically replicate human emotional expression in dance and performance. Through interviews with dancers and motion-capture experiments, it identifies three stages of human emotion (raw, mechanical, controlled) and argues that AI is limited to mimicry due to its lack of consciousness, embodiment, and lived experience. Drawing on Judith Butler’s theories, it contrasts human performativity (fluid, culturally embedded) with AI’s programmed rigidity. The work also explores queering digital avatars, critiques the commodification of bodies, and uses a 3D fashion film to visualize the human-machine divide."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    
    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: "public/art/film/-46631048878830026754dgs_social_v5.MP4",
      poster: "https://picsum.photos/id/1011/900/900",
      width: 3,
      height: 3,
      position: [2.0, 0.5, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //right side hallway next to stairs
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/film/-46631048878830026754dgs_social_v5.MP4`,
      poster: "https://picsum.photos/id/1011/900/900",
      width: 1.4,
      height: 2.4,
      position: [7.0, 0.6, 4.0],   // e.g. on/near carousel A
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'lobby',
      artworkInfo: {
        title: "Untitled II",
        artist: "Placeholder Artist 2",
        description: "A test artwork to demonstrate the info panel functionality. This description will be read aloud for accessibility."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //atrium left wall, above front desk

      /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EmbodiedMemories_YoonJuChung/B0009341-1-1.webp`,
      width: 4,
      height: 2.1,
      position: [-7.5, 3.6, -1.5],
      rotation: [0, 90, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Embodied Memories",
        artist: "Yoon Ju Chung",
        description: "Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist’s hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul’s geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered. "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */
  
    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/SynestheticSkin_JianingDing/Screenshot 2026-03-22 at 17.33.20.png`,
      width: 3,
      height: 1.5,
      position: [7.5, 3.5, -1.0],
      rotation: [0, -90, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Synesthetic Skin：A Posthuman Visual Narrative",
        artist: "Jianing Ding",
        description: "A conceptual and experimental platform—an art-philosophy construct designed to utilize digital space as a medium for examining the interplay between reality and virtuality, embodied and digital identities"
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    */

    //left side, left front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Unrendered_MarieLisetteCropp/25.10.17.-Marie-cropp-2-1.jpg.avif`,
      width: 1.4,
      height: 1.8,
      position: [-7.15, 0.7, 1.6],   // e.g. on/near carousel A
      rotation: [0, 135, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Unrendered",
        artist: "Marie-Lisette Cropp",
        description: "Unrendered explores how the female body is represented and reshaped through technology and Western cultural expectations. The project examines the tension between the physical and the digital, and how images shape our understanding of identity and beauty. Using photogrammetry, the body is scanned into digital form, fragmenting in the process and celebrating these glitches and distortions. By reworking these scans by hand and through darkroom printing, the work restores a raw, physical presence. Inspired by Rosi Braidotti’s Posthuman theory, Unrendered views the body as part of a wider ecosystem, continuously shaped by machines, nature, and technology.",
        narration: `${baseURL}audio/Unrendered_Narration.mp3`,
        narrationCues: `${baseURL}audio/Unrendered_Narration.json`
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

      //left side, middle front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/SelfFinish_BeatriceElAsmar/SF_02.jpg.avif`,
      width: 1.8,
      height: 1.3,
      position: [-8.4, 0.8, -1.5],
      rotation: [0, 90, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Self-Finish",
        artist: "Beatrice El Asmar",
        description: "This series of self-portraits was created using slit scan technology, mostly known for its use for photo-finish in racing sports, thus reclaiming a patriarchal automation which judges, measures and commodifies linear speed and \‘progress\'. Subverting our expectations of how time and space occupy the photographic image, the work highlights how the supposedly linear progression of human rights, especially for cis and trans women, is being eroded to the extent that it is actually moving backwards. A fragmented portrait of one of the two female photo-finish operators in the UK, this work invites a different kind of embodied photographic seeing.",
        narration: `${baseURL}audio/Self-Finish_Narration.mp3`,
        narrationCues: `${baseURL}audio/Self-Finish_Narration.json`
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //right side, right front desk
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/WhimsyThroughTheWindow_SarahAbdi/20250530_193358.jpg`,
      width: 1.2,
      height: 2.0,
      position: [7.1, 0.8, 1.4],
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'lobby',
      artworkInfo: {
        title: "Whimsy Through The Window",
        artist: "Sarah Abdi",
        description: "My final collection centres around whimsy from nostalgic childhood media. I chose this theme as I believe small forms of escapism is essential, especially when we live in such unstable times; from the rise of fascism to feeling the effects of climate change. Its important maintain a balance to avoid burnout and actually be able to help others. I created woven samples intended as curtains/drapes to block out the grey and dreary London landscape, made from waste and deadstock materials.",
        narration: `${baseURL}audio/Whimsy_Narration.mp3`,
        narrationCues: `${baseURL}audio/Whimsy_Narration.json`
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));
    /*
    this._registerArtwork(this.screenManager.addContentScreen({
      content: {
        title: "Artist Name",
        artist: "Chancery Rosewood",
        bio: "Long bio goes here...lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        images: [
          "https://picsum.photos/id/1011/900/900",
          "https://picsum.photos/id/1015/900/900",
          "https://picsum.photos/id/1025/900/900"
        ]
      },
      width: 2,
      height: 2.25,
      position: [-5, 1.4, -6],
      rotation: [0, 30, 0],
      offsetClick: .2,
      infoWidth: 1.6,
      infoHeight: 1.2,
      infoOffset: [0, -1.7, 0.55],
      clickableSize: [2.2, 2.2],
      clickable: true,
      plinthVisible: false,

      //transition
      transitionDuration: 0.35,
    }).screenMesh);
    //test model url
    */
    
    //3d models

    //entrance way
    const Experiment58 = import.meta.env.BASE_URL + "/art/Experimentn58-2PositioninSpace_MarieSaintYves/Eperiment58.glb";

    this.screenManager.addModel({
      url: Experiment58,
      position: [0, -1.0, 8.5],
      rotation: [0, -35, 0],
      normalizeTo: 2.0,
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
    }).catch(console.error);

    const a=import.meta.env.BASE_URL + "/art/test3d/8 Ultra High Quality Scan_low poly DRACO jpeg (1024).glb";
    //central coffee table
    /*
    this.screenManager.addModel({
    url: a,
    position: [.7, -.5, -4.5],
    rotation: [0, 35, 0],
    normalizeTo: 1.0,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    hitboxSize: [.5, 1.0, .5],
    offsetClick: -0.4,
    plinthVisible: false,
    playAnimation: "first",
    location: 'lobby',
    artworkInfo: {
      title: "Statue 01",
      artist: "Placeholder Sculptor",
      description: "A 3D sculptural work rendered in real-time. Rotate and explore the form from any angle."
    }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);
  */

    //left front desk
    const b=import.meta.env.BASE_URL + "/art/LetMeEatCake_SuzannaTeal/LetMeEatCake01.glb";

  this.screenManager.addModel({
    url: b,
    position: [.7, -.5, -4.5],
    rotation: [0, 20, 0],
    rotationOffset: 180,
    normalizeTo: 0.8,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.5, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'lobby',
    artworkInfo: {
      title: "Let Me Eat Cake",
      artist: "Suzanna Teal",
      description: "Let Me Eat Cake is a multi-disciplinary project comprising clay sculptures resembling slices of cake alongside a series of studio-based, still-life images showing them tightly clenched in angry fists. In taking cake beyond its characteristic material form, I’m interested in problematising diet culture by disrupting dominant perceptions related to how cake should act, look and feel. The clay creates a cold, hard, heavy tactile experience, that contrasts with our experience of cake as soft and light; a material that ‘gives’.  The strained fists reveal the difficulty and awkwardness of holding them, evoking the strained relationship many women have with food due to diet culture. The act of interacting with the sculptures alters the meaning. There's a thin facade of something positive and shiny under which is sinister, hard and potentially dangerous. They become weapon-like objects, subverting the soft, spongy characteristics we associate with cake and creating an exaggerated disturbance of accepted norms. The fist connotes anger, frustration, and resistance, which are key themes in this series. The sculptures parody indulgence and exaggerate the ridiculousness of diet culture. They are inedible; deliberately cold and heavy. By physically resisting the grasp of the viewer's hand, they resist traditional ideas of femininity.",
      narration: `${baseURL}audio/LetMeEatCake_Narration.mp3`,
      narrationCues: `${baseURL}audio/LetMeEatCake_Narration.json`
    }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);


/*
  this.screenManager.addModel({
    url: a,
    position: [4.8, 0, 3.8],
    rotation: [0, 235, 0],
    normalizeTo: 1.4,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    offsetClick: -0.1,
    hitboxSize: [1.0, 3.0, 1.0],
    plinthVisible: true,
    playAnimation: "first"
  }).then((modelRoot) => {
    // optional: store reference
    this.statue = modelRoot;
  }).catch(console.error);

 
  this.screenManager.addModel({
    url: a,
    position: [-4.8, 0, 3.8],
    rotation: [0, 135, 0],
    normalizeTo: 1.4,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    hitboxSize: [1.0, 3.0, 1.0],
    plinthVisible: true,
    playAnimation: "first"
  }).then((modelRoot) => {
    // optional: store reference
    this.statue = modelRoot;
  }).catch(console.error);
  */

  //right front desk
this._registerArtwork(this.screenManager.addFluidContentScreen({
      location: 'lobby',
      content: {
        title: "No Longer Us",
        artist: "Jun Shya",
        bio: "By putting a mask on, we begin to play different versions of ourselves. Intrigued by the process of unbalancing composition through distinct colours, crackled textures, and seemingly incongruous references, this series of paintings explores the theme of reality versus illusion in relation to the coexistence of present and past. By capturing the intimate gesture of push and pull in a ballet performance, each dancer becomes a version of another. It reflects the idea that a different version of you exists in the mind of everyone who knows you. Curious images emerge through a process of patient layering and excavation. Parts of the human body and face are either left blank or slightly concealed, yet we, as viewers, are still able to make sense of them.",
        images: [
          "public/art/NoLongerUs_JunShya/Jun-Shya-1-1.jpg",
          "https://picsum.photos/id/1015/900/900",
          "https://picsum.photos/id/1025/900/900"
        ],
        narration: `${baseURL}audio/NoLongerUs_Narration.mp3`,
        narrationCues: `${baseURL}audio/NoLongerUs_Narration.json`
      },
      width: 2,
      height: 2.25,
      position: [8.4, 1.1, -1.5],
      rotation: [0, -90, 0],
      offsetClick: .2,
      infoWidth: 1.6,
      infoHeight: 1.2,
      infoOffset: [0, -1.7, 0.55],
      clickableSize: [2.2, 2.2],
      clickable: true,
      plinthVisible: false,

      //transition
      transitionDuration: 0.35,
    }).screenMesh);

    // Hide artworks that don't belong to the starting location
    // (runs after sync artworks; async models hide themselves on first transition)
    for (const entry of this._artworkRegistry) {
      const loc = entry.obj.userData.location;
      if (loc && loc !== this._currentLocation) {
        entry.obj.visible = false;
        (entry.obj.userData.associatedMeshes ?? []).forEach(m => { m.visible = false; });
      }
    }

  

  //lobby - Fine Art, Photography, 
  //birdcage, No Longer Us, Experiment n58, Whimsy Through the Window
  //Self-Finish, Unrendered, Let Me Eat Cake

  

  //West Pavilion - Technology, Fashion and body
  //Pseudosynthesis, Synesthetic Skin, EMBODIED, Embodied Memories, Dehumanized, Black Swan

  //left of entrance way
  this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EMBODIED_VeepraMishra/20251114_Veepra0132-1-1.webp`,
      width: 1.3,
      height: 1.74,
      position: [-34.2, 0.9, -15.8],   // e.g. on/near carousel A
      rotation: [0, 180, 0],
      clickable: true,
      offsetClick: .1,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      text: "",
      plinthVisible: true,
      location: 'WestPavillion',
      artworkInfo: {
        title: "EMBODIED: Reclaiming Assistive Devices as Culturally Expressive Fashion",
        artist: "Veepra Mishra",
        description: "It began with the slightest gesture: my mother hiding her cane behind her back every time a camera appeared, as if the object were never meant to speak for her. This project turns toward that silence and wonders how assistive devices might become sites of cultural expression rather than symbols of concealment. In the realm of assistive design and fashion, such moments reveal how deeply aesthetics and embodiment intertwine, particularly for disabled people of colour whose identities are shaped through layered histories of visibility and belonging. Guided by co-design conversations with two South Asian participants and informed by critical disabilities, material culture, and cultural symbolism, I developed usable prototypes that merge function with cultural resonance. These artefacts, rooted in traditions, memory, agency, and empowerment, ask what happens when assistive devices are culturally expressive artefacts that hold beauty, heritage, and emotional truth. The work demonstrates that when disabled people of colour shape the instruments that support them, assistive devices shift from clinical symbols into objects of affirmation and pride. The process illuminated both the challenges and possibilities of designing across distance, culture, and lived experience. It reveals how identity and functionality are inseparable. Ultimately, the project suggests that inclusive futures emerge when design listens closely, honours complexity, and treats assistive devices not as objects that should be hidden, but as sites of beauty, cultural identity, and empowerment.  "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //window behind counter
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/BlackSwan-JieunSung/IMG_5414-2.png.avif`,
      width: 1.5,
      height: 2,
      position: [-33.9, .9, -26.4],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      clickableSize: [2.0, 2.0], // make click area bigger than screen size to include podium
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'WestPavillion',
      artworkInfo: {
        title: "Black Swan",
        artist: "Jieun Sung",
        description: "This project is about the black swan. Of all animals, I’ve always been particularly afraid of birds, but swans are the only ones that have ever helped me overcome that fear. So, I was intrigued to research them. I didn’t even know that black swans existed before, and I was fascinated to discover this species of swan. The black swan, with its dark mood and colour, really appealed to me, so I decided to make it the focus of my project."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //window behind counter
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Dehumanized_ChiAnChou/IMG_7018-Large.jpeg.avif`,
      width: 1.8,
      height: 1.3,
      position: [-37.3, .9, -26.4],
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'WestPavillion',
      artworkInfo: {
        title: "Dehumanized",
        artist: "Chi An Chou",
        description: "In this era of artificial intelligence, automation and highly mature technology, the definition of human is gradually disintegrating, and machines and technology are infiltrating and dominating our daily lives. Dehumanized is a conceptual exploration of a future world in which technology no longer centers on human nature, but instead gradually controls, holds power, and eventually replaces humanity. When digital systems take over judgment, aesthetics become algorithmically defined, and the body is transformed into a tool that prioritizes efficiency, emotions and individual consciousness begin to be seen as redundant residues. This project want to use visual language to present a imaginary future worldview: redesigned organisms, individuality erased, and a void beneath the human shell. Is Dehumanized a dystopian fantasy world, or is it a mirror held up to our present? In the wave of rapid innovation, what may ultimately be sacrificed is the very essence of what makes us human."
      },
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //on the wall in to the dining room
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/Pseudosynthesis_LeonLin/Vertical_comp-1.png.avif`,
      width: 5,
      height: 2.25,
      position: [-26.0, 0.8, -23.0],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      location: 'WestPavillion',
      artworkInfo: {
        title: "Pseudosynthesis",
        artist: "Leon Lin",
        description: "This project investigates whether AI-generated performers can authentically replicate human emotional expression in dance and performance. Through interviews with dancers and motion-capture experiments, it identifies three stages of human emotion (raw, mechanical, controlled) and argues that AI is limited to mimicry due to its lack of consciousness, embodiment, and lived experience. Drawing on Judith Butler’s theories, it contrasts human performativity (fluid, culturally embedded) with AI’s programmed rigidity. The work also explores queering digital avatars, critiques the commodification of bodies, and uses a 3D fashion film to visualize the human-machine divide."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //window corner
    /*
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/EmbodiedMemories_YoonJuChung/B0009341-1-1.webp`,
      width: 3.0,
      height: 1.4,
      position: [-40.8, 1.0, -25.2],
      rotation: [0, 45, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'WestPavillion',
      artworkInfo: {
        title: "Embodied Memories",
        artist: "Yoon Ju Chung",
        description: "Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist’s hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul’s geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered. "
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));*/
        const c=import.meta.env.BASE_URL + "/art/EmbodiedMemories_YoonJuChung/JU-CHUNG.glb";

  this.screenManager.addModel({
    url: c,
    //position: [-40.8, 1.0, -25.2],
    position: [-4, 1.0, -4],
      rotation: [0, 45, 0],
    rotationOffset: 180,
    normalizeTo: 0.5,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "",
    textOffset: [0, -0.7, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'lobby',
    playAnimation:"all",
    artworkInfo: {
        title: "Embodied Memories",
        artist: "Yoon Ju Chung",
        description: "Embodied Memories explores Hangul, the Korean alphabet, as an embodied and relational language through modular wearable artefacts. Originating from experiences of non-verbal communication with the artist’s hearing-impaired aunt, the project approaches gesture and movement as fundamental forms of language. Drawing on Hangul’s geometric structure, linguistic principles are translated into a modular system that functions as words, sculptural forms, or wearable objects. Grounded in Korean emotional philosophies—Jeong (connection), Han (endurance), and Heung (vitality)—the work informs processes of alignment, tension, play, and repair. Rather than treating language as a fixed visual system, meaning emerges through bodily movement, touch, and reconfiguration. The final artefacts are constructed using Korean textiles such as Mosi (ramie) and Oksa (silk), combined with transparent acrylic structures, magnetic connections, and traditional techniques including Gamchimgil hand-stitching and Pusae (rice starch stiffening).  Language is not only spoken or written; it is sensed, worn, and remembered. "
      }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);

    //wall in the window corner
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/SynestheticSkin_JianingDing/Screenshot 2026-03-22 at 17.33.20.png`,
      width: 3,
      height: 1.5,
      position: [-39, 1.0, -20.4],
      rotation: [0, 180, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      location: 'WestPavillion',
      artworkInfo: {
        title: "Synesthetic Skin：A Posthuman Visual Narrative",
        artist: "Jianing Ding",
        description: "A conceptual and experimental platform—an art-philosophy construct designed to utilize digital space as a medium for examining the interplay between reality and virtuality, embodied and digital identities"
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
      position: [-7.6, 22.6, 7.0],
      rotation: [0, 90, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Nailed",
        artist: "Genevieve Carr",
        description: "\"Nailed\" transforms nail salon waste into a 3D printing filament, used to create sculptural nails inspired by botanical drawings. The project explores beauty, waste, and material reuse—reimagining synthetic leftovers as future design materials."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //right side outside
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/FauxFlora_JustinaAlexandrof/Justina_Alexandroff_2-2.jpg`,
      width: 1.5,
      height: 2.0,
      position: [4.5, 23, 15.5],
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Faux Flora",
        artist: "Justina Alexandroff",
        description: "\"Faux Flora\" is a collection of 3D printed plant forms that explore the relationship between natural and artificial environments. The project questions the boundaries between real and simulated ecosystems."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //right side of bar
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/LustFeelsLikeBadLuck-JuliaPytko/Backwards-Artwork-1_1.jpg`,
      width: 1.5,
      height: 1.5,
      position: [7.8, 23, 7.0],
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Lust Feels Like Bad Luck",
        artist: "Julia Pytko",
        description: "\"Lust Feels Like Bad Luck\" is a multimedia installation that explores the intersection of desire and consequence in the digital age."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));

    //left side of bar
     this.screenManager.addModel({
    url: `${baseURL}art/BeNotAfraid-RysiaAnnaKaczmar/BeNotAfraid_Artwork3D.glb`,
    position: [-3.0, 22.6, 12.0],
    rotation: [0, 90, 0],
    normalizeTo: 0.8,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.5, 0.9],
    hitboxSize: [0.6, 1.4, 0.6],
    offsetClick: -0.0,
    plinthVisible: false,
    playAnimation: "first",
    location: 'EagleBar',
    artworkInfo: {
      title: "Be Not Afraid",
      artist: "Rysia Anna Kaczmar",
      description: "A 3D sculptural work rendered in real-time. Rotate and explore the form from any angle."
    }
  }).then((modelRoot) => {
    this.statue = modelRoot;
    this._registerArtwork(modelRoot);
  }).catch(console.error);

  //on the bar
    this._registerArtwork(this.screenManager.addScreen({
      url: `${baseURL}art/MaterialPlace_NeveBeill/ual-showcase-2-1.jpg`,
      width: 1.4,
      height: 0.7,
      position: [1.9, 22.7, 5.2],
      rotation: [0, -10, 0],
      clickable: true,
      offsetClick: 0.0,
      clickableSize: [2.2, 1.0],
      text: "Image Screen",
      plinthVisible: false,
      location: 'EagleBar',
      artworkInfo: {
        title: "Material Place",
        artist: "Neve Beill",
        description: "\"Material Place\" explores the intersection of natural and synthetic materials, questioning the boundaries between real and simulated environments."
      },
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    }));



  }

  

  update(dt) {
    //test rotation
    this.ball.rotation.y += dt * 0.6;

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

    // mouse-trail temporary reveal — one raycast per frame at most
    this._tryMouseTrailReveal();

    // sample camera position into environment proximity reveal trail
    this.proximityReveal.update(this.camera.position);
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
    this._lastRevealedScreen = revealTarget;

    // Permanently reveal colour around this artwork in the environment
    const artworkWorldPos = new Vector3();
    target.getWorldPosition(artworkWorldPos);
    this.proximityReveal.addPermanentReveal(artworkWorldPos);

    if (this._focusedScreen !== this._lastfocusedScreen) {
      this._animateReveal(target, 1.0, 0.0, 0.4);
      this._animateReveal(revealTarget, 1.0, 0.0, 0.4);
      this._lastfocusedScreen = this._focusedScreen;
    }

    // Animate grayscale → colour — only if not already colourised
    const revealMat = revealTarget?.userData?.revealMaterial;
    const currentColor = revealMat?.uniforms?.uColorReveal?.value ?? 0;
    if (currentColor < 1.0) {
      this._animateColorReveal(revealTarget, currentColor, 1.0, 1.5);
    }

    this.focus.focusOn({ targetObject: target, distance: "fit", heightOffset: 0.0, duration: 0.7, padding: 1 });

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
    this.infoPanel.setRegistry(this._artworkRegistry);
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
        this._focusedScreen = null;
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
      this._focusedScreen = null;
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

