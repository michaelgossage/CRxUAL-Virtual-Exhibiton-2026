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

    // Path state
    this._paths = new Map();
    this._pathActive = false;
    this._pathPoints = [];
    this._pathQuats = [];
    this._pathSegFracs = [];
    this._pathSegStarts = [];
    this._pathSegCount = 0;
  }

  setLocations(locations) {
    this.locations = locations || {};
  }

  /**
   * Register a one-directional waypoint path from `fromId` to `toId`.
   * waypoints: Array of { pos: [x,y,z], lookAt: [x,y,z] }
   * options: { distanceWeighted: false }
   */
  setPath(fromId, toId, waypoints, options = {}) {
    const key = `${fromId}→${toId}`;
    this._paths.set(key, { waypoints, options });
  }

  /**
   * Register a bidirectional path. The return path reverses waypoint positions
   * and repoints each lookAt toward the next point along the return direction.
   */
  setPathBidirectional(a, b, waypoints, options = {}) {
    this.setPath(a, b, waypoints, options);

    // Build reverse waypoints
    const reversed = waypoints.slice().reverse();
    const locA = this.locations[a];

    const reverseWaypoints = reversed.map((wp, i) => {
      // For lookAt on return: point toward the next waypoint in the reversed list,
      // or toward locA (destination) if this is the last one.
      let lookAt;
      if (i < reversed.length - 1) {
        lookAt = reversed[i + 1].pos;
      } else if (locA) {
        lookAt = locA.camera.pos;
      } else {
        lookAt = wp.pos; // fallback: keep same (will be overridden by destination quat)
      }
      return { pos: wp.pos, lookAt };
    });

    this.setPath(b, a, reverseWaypoints, options);
  }

  /**
   * Batch path registration.
   * defs: Array of { from, to, waypoints, bidirectional, options }
   */
  setPaths(defs) {
    for (const def of defs) {
      if (def.bidirectional) {
        this.setPathBidirectional(def.from, def.to, def.waypoints, def.options);
      } else {
        this.setPath(def.from, def.to, def.waypoints, def.options);
      }
    }
  }

  goTo(id, { duration = 0.8 } = {}) {
    const loc = this.locations[id];
    if (!loc) return;

    if (this.activeId && this.activeId !== id) {
      this.locations[this.activeId]?.onExit?.();
    }
    loc.onEnter?.();

    const prevId = this.activeId;
    this.activeId = id;
    this.duration = Math.max(0.05, duration);

    // Check for a registered waypoint path
    const pathKey = `${prevId}→${id}`;
    const registered = prevId && this._paths.get(pathKey);

    if (registered) {
      this._startPath(id, registered, this.duration);
    } else {
      // Direct straight-line transition
      this._pathActive = false;

      this.fromPos.copy(this.camera.position);
      this.fromQuat.copy(this.camera.quaternion);

      this.toPos.set(...loc.camera.pos);

      this._tmpTarget.set(...loc.camera.lookAt);
      this._tmpMat.lookAt(this.toPos, this._tmpTarget, this._tmpUp);
      this.toQuat.setFromRotationMatrix(this._tmpMat);

      // Shortest-arc fix
      if (this.fromQuat.dot(this.toQuat) < 0) {
        this.toQuat.set(
          -this.toQuat.x, -this.toQuat.y, -this.toQuat.z, -this.toQuat.w
        );
      }

      this.t = 0;
      this.isMoving = true;
    }
  }

  _startPath(toId, { waypoints, options }) {
    const loc = this.locations[toId];
    const distanceWeighted = options?.distanceWeighted ?? false;

    // Build full point list: [current, ...intermediates, destination]
    const allWaypoints = [
      { pos: this.camera.position.toArray(), _useCurrentQuat: true },
      ...waypoints,
      { pos: loc.camera.pos, lookAt: loc.camera.lookAt },
    ];

    const n = allWaypoints.length;
    this._pathPoints = allWaypoints.map((wp) => new THREE.Vector3(...wp.pos));

    // Build quaternions for each waypoint
    this._pathQuats = allWaypoints.map((wp, i) => {
      if (wp._useCurrentQuat) return this.camera.quaternion.clone();

      const pos = this._pathPoints[i];
      let lookAt;
      if (wp.lookAt) {
        lookAt = new THREE.Vector3(...wp.lookAt);
      } else if (i < n - 1) {
        lookAt = this._pathPoints[i + 1];
      } else {
        lookAt = this._pathPoints[i].clone().add(new THREE.Vector3(0, 0, -1));
      }

      const mat = new THREE.Matrix4();
      mat.lookAt(pos, lookAt, this._tmpUp);
      return new THREE.Quaternion().setFromRotationMatrix(mat);
    });

    // Shortest-arc fix between consecutive quats
    for (let i = 1; i < this._pathQuats.length; i++) {
      if (this._pathQuats[i - 1].dot(this._pathQuats[i]) < 0) {
        const q = this._pathQuats[i];
        q.set(-q.x, -q.y, -q.z, -q.w);
      }
    }

    // Compute per-segment fractions
    const segCount = n - 1;
    this._pathSegCount = segCount;

    const distances = [];
    let totalDist = 0;
    for (let i = 0; i < segCount; i++) {
      const d = this._pathPoints[i].distanceTo(this._pathPoints[i + 1]);
      distances.push(d);
      totalDist += d;
    }

    if (distanceWeighted && totalDist > 0) {
      this._pathSegFracs = distances.map((d) => d / totalDist);
    } else {
      const equalFrac = 1 / segCount;
      this._pathSegFracs = distances.map(() => equalFrac);
    }

    // Build cumulative starts: [0, f0, f0+f1, ..., 1.0]
    this._pathSegStarts = [0];
    let cumulative = 0;
    for (let i = 0; i < segCount; i++) {
      cumulative += this._pathSegFracs[i];
      this._pathSegStarts.push(cumulative);
    }
    // Clamp last entry to exactly 1.0
    this._pathSegStarts[segCount] = 1.0;

    this.t = 0;
    this.isMoving = true;
    this._pathActive = true;
  }

  _updatePath(easedT) {
    // Find which segment we're in
    let seg = this._pathSegCount - 1;
    for (let i = 0; i < this._pathSegCount; i++) {
      if (easedT < this._pathSegStarts[i + 1]) {
        seg = i;
        break;
      }
    }

    const segFrac = this._pathSegFracs[seg];
    const tLocal =
      segFrac > 0
        ? clamp01((easedT - this._pathSegStarts[seg]) / segFrac)
        : 1;

    this.camera.position.lerpVectors(
      this._pathPoints[seg],
      this._pathPoints[seg + 1],
      tLocal
    );
    this.camera.quaternion.slerpQuaternions(
      this._pathQuats[seg],
      this._pathQuats[seg + 1],
      tLocal
    );
  }

  update(dt) {
    if (!this.isMoving) return;

    this.t += dt / this.duration;
    const easedT = easeInOut(clamp01(this.t));

    if (this._pathActive) {
      this._updatePath(easedT);
    } else {
      this.camera.position.lerpVectors(this.fromPos, this.toPos, easedT);
      this.camera.quaternion.slerpQuaternions(this.fromQuat, this.toQuat, easedT);
    }

    if (this.t >= 1) {
      this.isMoving = false;
      this._pathActive = false;
    }
  }
}
