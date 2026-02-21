// src/world/CameraFocus.js
import * as THREE from "three";

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeInOut = (t) => t * t * (3 - 2 * t);

export class CameraFocus {
  constructor({ camera }) {
    this.camera = camera;

    // state
    this.isMoving = false;
    this.isFocused = false;

    // tween
    this.t = 1;
    this.duration = 0.75;

    this.fromPos = new THREE.Vector3();
    this.toPos = new THREE.Vector3();

    this.fromQuat = new THREE.Quaternion();
    this.toQuat = new THREE.Quaternion();

    // "home" (where we return)
    this.homePos = new THREE.Vector3();
    this.homeQuat = new THREE.Quaternion();
    this._hasHome = false;

    // temps
    this._tmpMat = new THREE.Matrix4();
    this._tmpPos = new THREE.Vector3();
    this._tmpQuat = new THREE.Quaternion();
    this._tmpForward = new THREE.Vector3();
    this._tmpUp = new THREE.Vector3(0, 1, 0);

    // cached bounds
    this._box = new THREE.Box3();
    this._size = new THREE.Vector3();
    this._sphere = new THREE.Sphere();
  }

  /**
   * Save the current camera pose as "home" (return target).
   * Call once before focusing if you want explicit control,
   * otherwise focusOn() will save automatically the first time.
   */
  setHomeFromCurrent() {
    this.homePos.copy(this.camera.position);
    this.homeQuat.copy(this.camera.quaternion);
    this._hasHome = true;
  }

  /**
   * Focus the camera on a target object without cropping it.
   *
   * distance:
   *  - "fit" => compute distance so object fits in view (recommended)
   *  - number => fixed distance in world units
   */
  focusOn({
    targetObject,
    distance = "fit",
    padding = 1.05,       // >1 backs camera up to avoid cropping
    minDistance = 0.3,
    maxDistance = 100,
    heightOffset = 0.2,   // extra Y offset of the camera viewpoint
    duration = 0.75,
    useObjectNormal = true, // if true: approach from object's +Z direction
    fallbackDirection = new THREE.Vector3(0, 0, 1), // used if normal is degenerate
    keepHomeWhileFocused = true, // true: don't overwrite home if already focused
  }) {
    if (!targetObject) return;

    // Save home pose
    if (!this._hasHome || (!keepHomeWhileFocused && this.isFocused)) {
      this.setHomeFromCurrent();
    }

    this.duration = Math.max(0.05, duration);

    // from = current camera pose
    this.fromPos.copy(this.camera.position);
    this.fromQuat.copy(this.camera.quaternion);

    // target world position & rotation
    const targetPos = this._tmpPos;
    targetObject.getWorldPosition(targetPos);

    const targetQuat = this._tmpQuat;
    targetObject.getWorldQuaternion(targetQuat);

    // compute direction to approach from
    let forward = this._tmpForward;
    if (useObjectNormal) {
      // For a PlaneGeometry facing camera via lookAt(center), +Z points "out" of the plane
      forward.set(0, 0, 1).applyQuaternion(targetQuat).normalize();
      if (!isFinite(forward.x) || forward.lengthSq() < 1e-8) {
        forward.copy(fallbackDirection).normalize();
      }
    } else {
      // approach from current camera->target direction (keeps current vibe)
      forward.copy(this.camera.position).sub(targetPos).normalize();
      if (!isFinite(forward.x) || forward.lengthSq() < 1e-8) {
        forward.copy(fallbackDirection).normalize();
      }
    }

    // choose distance
    let d;
    if (distance === "fit") {
      d = this._computeFitDistance(targetObject, padding);
    } else {
      d = Number(distance);
    }

    // safety clamps
    d = THREE.MathUtils.clamp(d, minDistance, maxDistance);
    d = Math.max(d, this.camera.near * 4); // reduce near-plane clipping risk

    // destination position: target + forward * d
    this.toPos.copy(targetPos).addScaledVector(forward, d);
    this.toPos.y += heightOffset;

    // destination orientation: look at target
    this._tmpMat.lookAt(this.toPos, targetPos, this._tmpUp);
    this.toQuat.setFromRotationMatrix(this._tmpMat);

    // start tween
    this.t = 0;
    this.isMoving = true;
    this.isFocused = true;
  }

  /**
   * Return to the stored "home" pose.
   */
  returnHome(duration = 0.75) {
    if (!this._hasHome) return;

    this.duration = Math.max(0.05, duration);

    this.fromPos.copy(this.camera.position);
    this.fromQuat.copy(this.camera.quaternion);

    this.toPos.copy(this.homePos);
    this.toQuat.copy(this.homeQuat);

    this.t = 0;
    this.isMoving = true;
    this.isFocused = false; // we are leaving focus
  }

  /**
   * Update tween.
   */
  update(dt) {
    if (!this.isMoving) return;

    this.t += dt / this.duration;
    const a = easeInOut(clamp01(this.t));

    this.camera.position.lerpVectors(this.fromPos, this.toPos, a);
    this.camera.quaternion.slerpQuaternions(this.fromQuat, this.toQuat, a);

    if (this.t >= 1) {
      this.isMoving = false;
    }
  }

  /**
   * Compute a conservative distance so the object fits in view.
   * Uses a bounding sphere (works for any mesh, not just planes).
   */
  _computeFitDistance(object3D, padding = 1.15) {
    // Get world-space bounding sphere
    this._box.setFromObject(object3D);
    this._box.getBoundingSphere(this._sphere);

    const radius = Math.max(1e-6, this._sphere.radius) * padding;

    // Camera fov/aspect
    const vFov = THREE.MathUtils.degToRad(this.camera.fov);
    const aspect = this.camera.aspect;

    // horizontal fov derived from vertical fov + aspect
    const hFov = 2 * Math.atan(Math.tan(vFov * 0.5) * aspect);

    // Distance required so sphere fits vertically & horizontally
    // For a sphere, half-angle to top edge is asin(r/d) ≈ atan(r/d) for small angles,
    // conservative: use tan-based fit.
    const distV = radius / Math.tan(vFov * 0.5);
    const distH = radius / Math.tan(hFov * 0.5);

    return Math.max(distV, distH);
  }
}
