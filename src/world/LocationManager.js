import * as THREE from "three";

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeInOut = (t) => t * t * (3 - 2 * t);

export class LocationManager {
  constructor({ camera }) {
    this.camera = camera;
    this.locations = {};
    this.activeId = null;

    this.isMoving = false;
    this.t = 1;
    this.duration = 0.8;

    this.fromPos = new THREE.Vector3();
    this.toPos = new THREE.Vector3();

    this.fromQuat = new THREE.Quaternion();
    this.toQuat = new THREE.Quaternion();

    this._tmpMat = new THREE.Matrix4();
    this._tmpTarget = new THREE.Vector3();
    this._tmpUp = new THREE.Vector3(0, 1, 0);
  }

  setLocations(locations) {
    this.locations = locations || {};
  }

  goTo(id, { duration = 0.8 } = {}) {
    const loc = this.locations[id];
    if (!loc) return;

    if (this.activeId && this.activeId !== id) {
      this.locations[this.activeId]?.onExit?.();
    }
    loc.onEnter?.();

    this.activeId = id;
    this.duration = Math.max(0.05, duration);

    // from
    this.fromPos.copy(this.camera.position);
    this.fromQuat.copy(this.camera.quaternion);

    // to pos
    this.toPos.set(...loc.camera.pos);

    // to quat from lookAt
    this._tmpTarget.set(...loc.camera.lookAt);
    this._tmpMat.lookAt(this.toPos, this._tmpTarget, this._tmpUp);
    this.toQuat.setFromRotationMatrix(this._tmpMat);

    this.t = 0;
    this.isMoving = true;
  }

  update(dt) {
    if (!this.isMoving) return;

    this.t += dt / this.duration;
    const a = easeInOut(clamp01(this.t));

    this.camera.position.lerpVectors(this.fromPos, this.toPos, a);
    //this.camera.quaternion.slerpQuaternions(this.fromQuat, this.toQuat, a);

    if (this.t >= 1) this.isMoving = false;
  }
}
