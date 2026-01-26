import { EventBus } from "./EventBus.js";

export class Time extends EventBus {
  constructor() {
    super();
    this._raf = null;
    this._last = performance.now();
    this._tick = this._tick.bind(this);
  }

  start() {
    if (this._raf) return;
    this._last = performance.now();
    this._raf = requestAnimationFrame(this._tick);
  }

  stop() {
    if (!this._raf) return;
    cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  _tick(now) {
    const dt = Math.min((now - this._last) / 1000, 0.05);
    this._last = now;

    this.emit("tick", dt);
    this._raf = requestAnimationFrame(this._tick);
  }
}
