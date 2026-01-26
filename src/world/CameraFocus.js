import * as THREE from "three";

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeInOut = (t) => t * t * (3 - 2 * t);

export class CameraFocus {
  constructor({ camera }) {
    this.camera = camera;

    this.isMoving = false;
    this.isFocused = false;

    this.t = 1;
    this.duration = 0.75; // seconds

    this.fromPos = new THREE.Vector3();
    this.toPos = new THREE.Vector3();

    this.fromQuat = new THREE.Quaternion();
    this.toQuat = new THREE.Quaternion();

    this._tmpMat = new THREE.Matrix4();
    this._tmpQuat = new THREE.Quaternion();
  }

  focusOn({ targetObject, distance = 2.4, heightOffset = 0.0, duration = 0.75 }) {
    // store "home" state
    if (!this.isFocused) {
      this.homePos = this.camera.position.clone();
      this.homeQuat = this.camera.quaternion.clone();
    }

    this.duration = Math.max(0.05, duration);

    // current -> from
    this.fromPos.copy(this.camera.position);
    this.fromQuat.copy(this.camera.quaternion);

    // compute destination pose:
    // move to a point in front of the object (along its forward normal)
    const targetPos = new THREE.Vector3();
    targetObject.getWorldPosition(targetPos);

    const targetQuat = new THREE.Quaternion();
    targetObject.getWorldQuaternion(targetQuat);

    // object's forward is -Z in its local space
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(targetQuat).normalize(); // +Z points "out" of screen
    const viewPos = targetPos.clone().add(forward.multiplyScalar(distance));
    viewPos.y += heightOffset;

    // look at the object from that view position
    this.toPos.copy(viewPos);

    const lookAtMat = this._tmpMat.lookAt(this.toPos, targetPos, new THREE.Vector3(0, 1, 0));
    this.toQuat.setFromRotationMatrix(lookAtMat);

    // start tween
    this.t = 0;
    this.isMoving = true;
    this.isFocused = true;
  }

  returnHome(duration = 0.75) {
    if (!this.isFocused) return;

    this.duration = Math.max(0.05, duration);

    this.fromPos.copy(this.camera.position);
    this.fromQuat.copy(this.camera.quaternion);

    this.toPos.copy(this.homePos);
    this.toQuat.copy(this.homeQuat);

    this.t = 0;
    this.isMoving = true;
    this.isFocused = false; // after move completes we’re “not focused”
  }

  update(dt) {
    if (!this.isMoving) return;

    this.t += dt / this.duration;
    const a = easeInOut(clamp01(this.t));

    this.camera.position.lerpVectors(this.fromPos, this.toPos, a);
    this.camera.quaternion.slerpQuaternions(this.fromQuat, this.toQuat, a);

    if (this.t >= 1) this.isMoving = false;
  }
}
