import * as THREE from "three";

export class ControlsFPS {
  constructor({
    camera,
    domElement,
    autoRotate = false,
    autoRotateSpeed = 0.25, // radians/sec (feel free to tweak)
    dragToLook = true,      // we’ll use click+drag, no pointer lock
    autoRotateResumeDelay = 1.0, // ✅ seconds
  }) {
    if (!domElement) {
      throw new Error("ControlsFPS: domElement is missing. Pass renderer.domElement.");
    }

    this.camera = camera;
    this.domElement = domElement;

    // options
    this.autoRotate = autoRotate;
    this.autoRotateSpeed = autoRotateSpeed;
    this.autoRotateResumeDelay = autoRotateResumeDelay;

    this.dragToLook = dragToLook;

    // state
    this.yawTotal = 0;
    this.pitch = -0.05;
    this.yawNudgeVel = 0;

    this.SENS_YAW = 0.0023;
    this.SENS_PITCH = 0.0019;
    this.PITCH_LIMIT = Math.PI / 2 - 0.05;

    this._isDown = false;
    this._activePointerId = null;
    this._lastX = 0;
    this._lastY = 0;

    this._autoRotatePauseTimer = 0; // ✅ countdown timer

    this._tmpForward = new THREE.Vector3();

    this._bind();
  }

  setAutoRotate(enabled, speed = this.autoRotateSpeed) {
    this.autoRotate = !!enabled;
    this.autoRotateSpeed = speed;
  }

  _pauseAutoRotateForDelay() {
    this._autoRotatePauseTimer = this.autoRotateResumeDelay;
    console.log("Auto-rotate paused for", this.autoRotateResumeDelay, "seconds");
  }

  _bind() {
    const canvas = this.domElement;

    // Prevent browser gestures fighting drag (scroll/back)
    canvas.style.touchAction = "none";

    // Drag look (click + drag)
    canvas.addEventListener(
      "pointerdown",
      (e) => {
        if (!this.dragToLook) return;
        this._isDown = true;
        this._activePointerId = e.pointerId;
        this._lastX = e.clientX;
        this._lastY = e.clientY;
        canvas.setPointerCapture?.(e.pointerId);

        // ✅ pause as soon as user starts interacting
        this._pauseAutoRotateForDelay();
      },
      { passive: true }
    );

    canvas.addEventListener(
      "pointermove",
      (e) => {
        if (!this.dragToLook) return;
        if (!this._isDown) return;
        if (this._activePointerId !== e.pointerId) return;

        const dx = e.clientX - this._lastX;
        const dy = e.clientY - this._lastY;
        this._lastX = e.clientX;
        this._lastY = e.clientY;

        this.yawTotal += dx * (this.SENS_YAW * 1.4);
        this.pitch = THREE.MathUtils.clamp(
          this.pitch - dy * (this.SENS_PITCH * 1.2),
          -this.PITCH_LIMIT,
          this.PITCH_LIMIT
        );

        // ✅ keep delaying autorotate while actively dragging
      this._pauseAutoRotateForDelay();
      },
      { passive: true }
    );

    const endDrag = (e) => {
      if (!this.dragToLook) return;
      if (this._activePointerId !== e.pointerId) return;
      this._isDown = false;
      this._activePointerId = null;
      canvas.releasePointerCapture?.(e.pointerId);
      // ✅ give them a moment after releasing
      this._pauseAutoRotateForDelay();
    };

    canvas.addEventListener("pointerup", endDrag, { passive: true });
    canvas.addEventListener("pointercancel", endDrag, { passive: true });
    canvas.addEventListener("pointerleave", () => {
      // if mouse leaves while dragging, stop smoothly
      this._isDown = false;
      this._activePointerId = null;
    }, { passive: true });

    // Wheel nudge (optional)
    canvas.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this.yawNudgeVel += e.deltaY * 0.00065;
      },
      { passive: false }
    );
  }

  update(dt) {

    // ✅ count down pause timer
    this._autoRotatePauseTimer = Math.max(0, this._autoRotatePauseTimer - dt);

    // auto-rotate when not actively dragging (common UX)
    if (this.autoRotate && !this._isDown && this._autoRotatePauseTimer <= 0) {
      this.yawTotal += this.autoRotateSpeed * dt;
    }

    //return camera pitch to middle over time
    if (this.pitch !== 0 && this._autoRotatePauseTimer <= 0) {
      this.pitch *= 0.99;
    }

    // wheel inertia
    if (Math.abs(this.yawNudgeVel) > 1e-6) {
      this.yawTotal += this.yawNudgeVel;
      this.yawNudgeVel *= 0.88;
    }

    const TAU = Math.PI * 2;
    const yaw = ((this.yawTotal % TAU) + TAU) % TAU;

    this.camera.rotation.order = "YXZ";
    this.camera.rotation.y = yaw;
    this.camera.rotation.x = this.pitch;
    this.camera.rotation.z = 0;
  }

  forward() {
    this._tmpForward.set(0, 0, -1).applyEuler(this.camera.rotation).normalize();
    return this._tmpForward;
  }

  resetDrag() {
    this._isDown = false;

    if (this._activePointerId !== null) {
      try {
        this.domElement.releasePointerCapture?.(this._activePointerId);
      } catch {}
    }
    this._autoRotatePauseTimer = 0.0;

    this._activePointerId = null;
    this._lastX = 0;
    this._lastY = 0;
  }

}
