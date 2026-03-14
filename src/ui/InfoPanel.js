export class InfoPanel {
  constructor({ onClose } = {}) {
    this.el = document.getElementById("info-panel");
    this.titleEl = this.el.querySelector(".info-panel__title");
    this.artistEl = this.el.querySelector(".info-panel__artist");
    this.descEl = this.el.querySelector(".info-panel__description");
    this.closeBtn = this.el.querySelector(".info-panel__close");

    this.descEl.addEventListener("scroll", () => this._updateMask(), { passive: true });
    this.closeBtn.addEventListener("click", () => {
      this.hide();
      if (typeof onClose === "function") onClose();
    });
  }

  show({ title = "", artist = "", description = "" } = {}) {
    this.titleEl.textContent = title;
    this.artistEl.textContent = artist;
    this.descEl.textContent = description;

    this.artistEl.style.display = artist ? "" : "none";

    this.el.classList.add("info-panel--visible");

    // Reset scroll and recalculate mask after content renders
    this.descEl.scrollTop = 0;
    requestAnimationFrame(() => this._updateMask());
  }

  hide() {
    this.el.classList.remove("info-panel--visible");
  }

  _updateMask() {
    const el = this.descEl;
    const atTop = el.scrollTop <= 2;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    const overflows = el.scrollHeight > el.clientHeight + 4;

    let mask = "none";
    if (overflows) {
      if (atTop) {
        mask = "linear-gradient(to bottom, black 70%, transparent 100%)";
      } else if (atBottom) {
        mask = "linear-gradient(to bottom, transparent 0%, black 30%)";
      } else {
        mask = "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)";
      }
    }

    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;
  }
}
