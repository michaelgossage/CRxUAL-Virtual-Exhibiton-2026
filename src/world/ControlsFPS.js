import * as THREE from "three";

export class ControlsFPS {
  constructor({
    camera,
    domElement,
    autoRotate = false,
    autoRotateSpeed = 0.25,
    dragToLook = true,
    autoRotateResumeDelay = 1.0,
  }) {
    if (!domElement) {
      throw new Error("ControlsFPS: domElement is missing. Pass renderer.domElement.");
    }

    this.camera = camera;
    this.domElement = domElement;

    this.autoRotate = autoRotate;
    this.autoRotateSpeed = autoRotateSpeed;
    this.autoRotateResumeDelay = autoRotateResumeDelay;
    this.dragToLook = dragToLook;

    // Current orientation
    this.yawTotal = 0;
    this.pitch = -0.05;

    // Inertia velocities (radians/sec)
    this.yawVel = 0;
    this.pitchVel = 0;

    // Wheel inertia (kept separate, radians/frame – existing behaviour)
    this.yawNudgeVel = 0;

    this.SENS_YAW   = 0.0023;
    this.SENS_PITCH = 0.0019;
    this.PITCH_LIMIT = Math.PI / 2 - 0.05;

    // How quickly drag inertia decays: higher = snappier stop
    // ~4 → half-life ≈ 0.17 s; ~2 → half-life ≈ 0.35 s
    this.INERTIA_DECAY = 3.5;

    this._isDown = false;
    this._activePointerId = null;
    this._lastX = 0;
    this._lastY = 0;

    // Accumulated raw pixel deltas since last update()
    this._accumDx = 0;
    this._accumDy = 0;

    this._autoRotatePauseTimer = 0;
    this._tmpForward = new THREE.Vector3();

    this._bind();
  }

  setAutoRotate(enabled, speed = this.autoRotateSpeed) {
    this.autoRotate = !!enabled;
    this.autoRotateSpeed = speed;
  }

  _pauseAutoRotateForDelay() {
    this._autoRotatePauseTimer = this.autoRotateResumeDelay;
  }

  _bind() {
    const canvas = this.domElement;
    canvas.style.touchAction = "none";

    canvas.addEventListener("pointerdown", (e) => {
      if (!this.dragToLook) return;
      this._isDown = true;
      this._activePointerId = e.pointerId;
      this._lastX = e.clientX;
      this._lastY = e.clientY;
      // Kill existing inertia on new grab so it doesn't fight
      this.yawVel = 0;
      this.pitchVel = 0;
      this._accumDx = 0;
      this._accumDy = 0;
      canvas.setPointerCapture?.(e.pointerId);
      this._pauseAutoRotateForDelay();
    }, { passive: true });

    canvas.addEventListener("pointermove", (e) => {
      if (!this.dragToLook) return;
      if (!this._isDown) return;
      if (this._activePointerId !== e.pointerId) return;

      // Accumulate raw deltas; update() converts to angular velocity
      this._accumDx += e.clientX - this._lastX;
      this._accumDy += e.clientY - this._lastY;
      this._lastX = e.clientX;
      this._lastY = e.clientY;

      this._pauseAutoRotateForDelay();
    }, { passive: true });

    const endDrag = (e) => {
      if (!this.dragToLook) return;
      if (this._activePointerId !== e.pointerId) return;
      this._isDown = false;
      this._activePointerId = null;
      canvas.releasePointerCapture?.(e.pointerId);
      this._pauseAutoRotateForDelay();
      // Velocity was being computed in update() – it will now coast
    };

    canvas.addEventListener("pointerup",     endDrag, { passive: true });
    canvas.addEventListener("pointercancel", endDrag, { passive: true });
    canvas.addEventListener("pointerleave", () => {
      this._isDown = false;
      this._activePointerId = null;
    }, { passive: true });

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.yawNudgeVel += e.deltaY * 0.00065;
    }, { passive: false });
  }

  update(dt) {
    this._autoRotatePauseTimer = Math.max(0, this._autoRotatePauseTimer - dt);

    // ── Drag (direct + inertia) ─────────────────────────────
    if (this._isDown && (this._accumDx !== 0 || this._accumDy !== 0)) {
      const dyaw   = this._accumDx * this.SENS_YAW   * 1.4;
      const dpitch = this._accumDy * this.SENS_PITCH  * 1.2;

      this.yawTotal += dyaw;
      this.pitch = THREE.MathUtils.clamp(
        this.pitch - dpitch,
        -this.PITCH_LIMIT, this.PITCH_LIMIT
      );

      // Estimate velocity (rad/s) for inertia after release
      if (dt > 0) {
        this.yawVel   = dyaw   / dt;
        this.pitchVel = -dpitch / dt;
      }

      this._accumDx = 0;
      this._accumDy = 0;

    } else if (!this._isDown) {
      // Coast: apply remaining velocity then decay it
      if (Math.abs(this.yawVel) > 1e-5 || Math.abs(this.pitchVel) > 1e-5) {
        this.yawTotal += this.yawVel * dt;
        this.pitch = THREE.MathUtils.clamp(
          this.pitch + this.pitchVel * dt,
          -this.PITCH_LIMIT, this.PITCH_LIMIT
        );

        const decay = Math.exp(-this.INERTIA_DECAY * dt);
        this.yawVel   *= decay;
        this.pitchVel *= decay;
      }
    }

    // ── Auto-rotate ─────────────────────────────────────────
    if (this.autoRotate && !this._isDown && this._autoRotatePauseTimer <= 0) {
      this.yawTotal += this.autoRotateSpeed * dt;
    }

    // ── Pitch drift back to horizon ─────────────────────────
    if (!this._isDown && this._autoRotatePauseTimer <= 0 && Math.abs(this.pitchVel) < 1e-4) {
      this.pitch *= 0.99;
    }

    // ── Wheel inertia ───────────────────────────────────────
    if (Math.abs(this.yawNudgeVel) > 1e-6) {
      this.yawTotal  += this.yawNudgeVel;
      this.yawNudgeVel *= 0.88;
    }

    // ── Apply to camera ─────────────────────────────────────
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
    this._accumDx = 0;
    this._accumDy = 0;
    this.yawVel   = 0;
    this.pitchVel = 0;

    if (this._activePointerId !== null) {
      try { this.domElement.releasePointerCapture?.(this._activePointerId); } catch {}
    }
    this._autoRotatePauseTimer = 0;
    this._activePointerId = null;
    this._lastX = 0;
    this._lastY = 0;
  }
}
