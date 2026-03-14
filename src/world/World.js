import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
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




export class World {
  constructor({ scene, camera, renderer, sizes }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this.controls = new ControlsFPS({ camera: this.camera, domElement: this.renderer.domElement, autoRotate: true, autoRotateSpeed: -0.05 });
    // focus helper for smoothly moving camera to screens
    this.focus = new CameraFocus({ camera: this.camera });
    this._controlsSaved = null;
    this._focusState = "idle"; // idle | focusing | focused | returning
    this._focusCooldown = 0;
    this._focusedScreen = null;
    this._lastfocusedScreen = null;
    this._lastRevealedScreen = null;

    //tween animations
    this._tweens = [];
    

    // initialise the screen manager for adding artworks
    this.screenManager = new ScreenManager({
      scene: this.scene,
      camera: this.camera,
      domElement: this.renderer.domElement,
      makeTextPlane,
      debugOn: false // set to true to show clickable podiums
    });

    this.screenManager.onHit = (obj, hit) => {
      if (this._focusCooldown > 0) return;
      if (this.focus.isMoving) return; // ignore double clicks mid-transition

      // easiest: store a reference when you add screens (see below), or:
      const target = obj.userData.focusTarget || obj;
      const revealTarget = obj.userData.revealTarget || obj;

     //console.log("Hit screen/podium", obj, "focusing", target);
     if (this._focusState === "idle") {
        this.focus.setHomeFromCurrent?.(); // if your CameraFocus has it
      }
      this._enterFocusMode();
      this._focusState = "focusing";
      this._focusCooldown = 0.2;

      // Hide previous focused screen
      if (this._focusedScreen && this._focusedScreen !== target) {
        this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.25);
        this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.25);
      }


      // Show new focused screen
      this._focusedScreen = target;
      this._lastRevealedScreen = revealTarget;

      if(this._focusedScreen!=this._lastfocusedScreen){
        // REVEAL animation
        this._animateReveal(target, 1.0, 0.0, 0.4);

        this._animateReveal(revealTarget, 1.0, 0.0, 0.4);
        this._lastfocusedScreen = this._focusedScreen;
      }



      // sets how the focus control works on all artworks/screens
      this.focus.focusOn({ targetObject: target, distance: "fit", heightOffset: 0.0, duration: 0.7 , padding: 1});
    };

    this.screenManager.onMiss = () => {
      // click empty space to return
      
      if (this._focusCooldown > 0) return;
      if (this.focus.isMoving) return;
      if (this._focusState === "idle") return;

      this._focusState = "returning";
      this._focusCooldown = 0.2;

      this.focus.returnHome(0.7);

      // 🔥 HIDE animation
      this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.3);
      this._animateReveal(this._lastRevealedScreen, 0.0, 1.0, 0.3);
      // clear focused screen immediately so you can click the same one again if you want
      this._focusedScreen = null;
      this._lastRevealedScreen = null;
      
    };

  


    this.locations = new LocationManager({ camera: this.camera });
    this.locations.setLocations({
      lobby:   { camera: { pos:[0,0.8,0], lookAt:[0,1.2,-1] } },
      galleryA:{ camera: { pos:[-29,0.8,-20], lookAt:[-14,1.2,-6] } },
      galleryB:{ camera: { pos:[ 1,21,16], lookAt:[ 14,1.2,-6] } },
      winners: { camera: { pos:[0, 12, 24], lookAt:[0, 0, -1] } }
    });

    // start location
    this.locations.goTo("lobby", { duration: 0.01 });

    
    

    // add lights
    addDefaultLights(this.scene);

    applyHDRI({
      renderer: this.renderer,
      scene: this.scene,
      url: import.meta.env.BASE_URL + "/art/hdri/qwantani_dusk_2_puresky_4k.hdr",
      background: true,   // keep your room/fog background
      envIntensity: 0.0
    });

    //add geometry
    const room = new Mesh(
      new BoxGeometry(30, 1, 30),
      new MeshStandardMaterial({ color: 0x108080, side: 2 })
    );
    room.position.set(0, -1.5, 0);
    room.receiveShadow = true;
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

    //import environment model
    const room01 = loadGLTFWithAnimations(import.meta.env.BASE_URL + "/art/test3d/Chancery Rosewood_V4.glb").then((gltf) => {
      const model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          //child.castShadow = true;
          child.receiveShadow = true;
          //set shader to double-sided with basic material for testing
          child.material = new MeshStandardMaterial({ color: 0x808080, side: 2 });
          //child.material = makeArchGridMaterial({ color: 0x808080, gridColor: 0x404040, gridScale: 0.5, gridThickness: 0.02, side: 2,baseOpacity: 1.0 });
        }
      });
      model.scale.set(1.0, 1.0, 1.0);
      model.position.set(0.0, -4.0, 16.0);
      this.scene.add(model);
    }).catch(console.error);


    //screens
    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 2,
      height: 1.25,
      position: [0.0, 1.4, -6.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: .6,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 2,
      height: 1.25,
      position: [5.0, 1.0, -10.0],   // e.g. on/near carousel A
      rotation: [0, 0, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 2,
      height: 1.25,
      position: [5.0, 1.0, -5.0],   // e.g. on/near carousel A
      rotation: [0, -45, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

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


    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 1.5,
      height: 1.5,
      position: [8.4, 0.8, -1.5],   // e.g. on/near carousel A
      rotation: [0, -90, 0],
      clickable: true,
      offsetClick: 0.5,
      clickableSize: [2.2, 2.5],
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 1.5,
      height: 2,
      position: [7.2, 0.5, 1.55],   // e.g. on/near carousel A
      rotation: [0, -135, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 3,
      height: 3,
      position: [-2.0, 0.5, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });
     this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 3,
      height: 3,
      position: [2.0, 0.5, 13.8],   // e.g. on/near carousel A
      rotation: [0, -180, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      plinthVisible: false,
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 3,
      height: 3,
      position: [-7.5, 4.5, -1.0],   // e.g. on/near carousel A
      rotation: [0, 90, 0],
      clickable: true,
      plinthVisible: false,
      offsetClick: 0.0,
      text: "Image Screen",
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

    this.screenManager.addContentScreen({
      content: {
        title: "Artist Name",
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
      offsetClick: .7,
      infoWidth: 1.6,
      infoHeight: 1.2,
      infoOffset: [0, -1.7, 0.55],
      clickableSize: [2.2, 3.75],
      clickable: true,
      plinthVisible: false,

      //transition
      transitionDuration: 0.35,
    });
    //test model url
    const a=import.meta.env.BASE_URL + "/art/test3d/8 Ultra High Quality Scan_low poly DRACO jpeg (1024).glb";
    //3d models
  this.screenManager.addModel({
    url: a,
    position: [-6.7, 0, -3],
    rotation: [0, 90, 0],
    normalizeTo: 1.4,
    clickable: true,
    onClick: (obj, hit) => console.log("Model clicked:", obj),
    text: "STATUE_01",
    textOffset: [0, -0.1, 0.9],
    hitboxSize: [1.0, 3.0, 1.0],
    plinthVisible: false,
    playAnimation: "first"
  }).then((modelRoot) => {
    // optional: store reference
    this.statue = modelRoot;
  }).catch(console.error);
  
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



  }

  

  update(dt) {
    //test rotation
    this.ball.rotation.y += dt * 0.6;

    // update focus cooldown
    this._focusCooldown = Math.max(0, this._focusCooldown - dt);

    this.locations.update(dt);


    // if notmoving between locations and in idle focus state, allow controls to update (e.g. for auto-rotate or user input)
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


  _setReveal(mesh, v) {
    const mat = mesh?.userData?.revealMaterial;
    if (!mat) return;
    mat.uniforms.uReveal.value = v;
     console.log("Set reveal", v, "on", mesh, "material", mat);
  }

  _animateReveal(mesh, from, to, duration = 0.35) {
    if (!mesh) return;
   
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


  

}

