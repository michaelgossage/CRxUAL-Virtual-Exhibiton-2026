import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { addDefaultLights } from "./lights.js";
import { BoxGeometry } from "three";
import { ScreenManager } from "./ScreenManager.js";
import { makeTextPlane } from "./makeTextPlane.js";
import { ControlsFPS } from "./ControlsFPS.js";
import { CameraFocus } from "./CameraFocus.js";

export class World {
  constructor({ scene, camera, renderer, sizes }) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.sizes = sizes;
    this.controls = new ControlsFPS({ camera: this.camera, domElement: this.renderer.domElement, autoRotate: true, autoRotateSpeed: -0.05 });
    this.focus = new CameraFocus({ camera: this.camera });

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

      // if already focused, clicking another screen just refocuses
      this._enterFocusMode();
      this.focus.focusOn({ targetObject: target, distance: 2.6, heightOffset: 0.0, duration: 0.7 });
    };

    this.screenManager.onMiss = () => {
      // click empty space to return
      if (this._isInFocusMode()) {
        this.focus.returnHome(0.7);
        this._exitFocusModeAfterMove = true;
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
    //this.controls.update(dt);
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

}
