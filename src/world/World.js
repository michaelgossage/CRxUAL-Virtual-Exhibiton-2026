import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { addDefaultLights } from "./lights.js";
import { BoxGeometry } from "three";
import { ScreenManager } from "./ScreenManager.js";
import { makeTextPlane } from "./makeTextPlane.js";
import { ControlsFPS } from "./ControlsFPS.js";
import { CameraFocus } from "./CameraFocus.js";
import { makeTween01 } from "../utils/tween.js";

export class World {
  constructor({ scene, camera, renderer, sizes }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this.controls = new ControlsFPS({ camera: this.camera, domElement: this.renderer.domElement, autoRotate: true, autoRotateSpeed: -0.05 });
    // focus helper for smoothly moving camera to screens
    this.focus = new CameraFocus({ camera: this.camera });

    //tween animations
    this._tweens = [];
    this._focusedScreen = null;
    this._lastfocusedScreen = null;

    // initialise the screen manager for adding artworks
    this.screenManager = new ScreenManager({
      scene: this.scene,
      camera: this.camera,
      domElement: this.renderer.domElement,
      makeTextPlane
    });

    this.screenManager.onHit = (obj, hit) => {
      // decide what object to focus: screen mesh if you clicked podium, or itself
      // easiest: store a reference when you add screens (see below), or:
      const target = obj.userData.focusTarget || obj;

     //console.log("Hit screen/podium", obj, "focusing", target);

      // Hide previous focused screen
      if (this._focusedScreen && this._focusedScreen !== target) {
        this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.25);
      }

      this._focusedScreen = target;

      if(this._focusedScreen!=this._lastfocusedScreen){
      // REVEAL animation
      this._animateReveal(target, 1.0, 0.0, 0.4);
      this._lastfocusedScreen = this._focusedScreen;
      }

      // if already focused, clicking another screen just refocuses
      this._enterFocusMode();
      this.focus.focusOn({ targetObject: target, distance: 2.6, heightOffset: 0.0, duration: 0.7 });
    };

    this.screenManager.onMiss = () => {
      // click empty space to return
      if (this._isInFocusMode()) {
        
        this.focus.returnHome(0.7);
        this._exitFocusModeAfterMove = true;

        // 🔥 HIDE animation
        this._animateReveal(this._focusedScreen, 0.0, 1.0, 0.3);
        // clear focused screen immediately so you can click the same one again if you want
        this._focusedScreen = null;
        this._lastfocusedScreen = null;
      }
    };

    
    


    addDefaultLights(this.scene);

    const room = new Mesh(
      new BoxGeometry(20, 1, 20),
      new MeshStandardMaterial({ color: 0x108080, side: 2 })
    );
    room.position.set(0, -1.5, 0);
    room.receiveShadow = true;
    this.scene.add(room);


    //Test box
    const ball = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ roughness: 0.4, metalness: 0.1 })
    );
    ball.position.set(0, 0, -3);
    ball.castShadow = true;
    this.scene.add(ball);

    this.ball = ball;

    //screens
    this.screenManager.addScreen({
      url: "https://picsum.photos/id/1011/900/900",
      width: 4,
      height: 2.25,
      position: [0.0, 2.0, -10.0],   // e.g. on/near carousel A
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
      width: 4,
      height: 2.25,
      position: [7.0, 2.0, -7.0],   // e.g. on/near carousel A
      rotation: [0, -45, 0],
      clickable: true,
      offsetClick: 0.0,
      text: "Image Screen",
      onClick: (obj) => {
        console.log("Clicked screen/podium", obj);
      }
    });

  }

  update(dt) {
    //test rotation
    this.ball.rotation.y += dt * 0.6;

    // update controls only if not currently overriding rotation with focus
    if (!this._isInFocusMode()) {
      this.controls.update(dt);
    } else {
      // optionally still allow wheel nudge etc; usually better off
    }

    this.focus.update(dt);

    // when return-home finishes, restore controls
    if (this._exitFocusModeAfterMove && !this.focus.isMoving) {
      this._exitFocusMode();
       // ✅ important: clear any stuck drag state
      this.controls.resetDrag();
      this._exitFocusModeAfterMove = false;
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
    // disable drag so the camera stays locked to the screen while moving/reading
    this.controls.dragToLook = false;

    // pause autorotate while focused
    this._controlsWasAutoRotate = this.controls.autoRotate;
    this.controls.autoRotate = false;
  }

  _exitFocusMode() {
    this.controls.dragToLook = true;
    this.controls.autoRotate = this._controlsWasAutoRotate;
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

