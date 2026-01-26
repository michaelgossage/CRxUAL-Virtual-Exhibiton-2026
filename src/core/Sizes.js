import { EventBus } from "./EventBus.js";

export class Sizes extends EventBus {
  constructor() {
    super();
    this._onResize = this._onResize.bind(this);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    window.addEventListener("resize", this._onResize, { passive: true });
  }

  _onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.emit("resize", this);
  }

  destroy() {
    window.removeEventListener("resize", this._onResize);
  }
}
