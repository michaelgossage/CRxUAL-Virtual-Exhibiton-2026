export class InfoPanel {
  constructor({ onClose, onNav, onJumpTo } = {}) {
    this.el = document.getElementById("info-panel");
    this.titleEl = this.el.querySelector(".info-panel__title");
    this.artistEl = this.el.querySelector(".info-panel__artist");
    this.descEl = this.el.querySelector(".info-panel__description");
    this.closeBtn = this.el.querySelector(".info-panel__close");

    const menu = document.getElementById("menu");
    this.prevBtn = menu.querySelector(".artwork-nav__prev");
    this.nextBtn = menu.querySelector(".artwork-nav__next");
    this.listBtn = menu.querySelector(".artwork-nav__list-btn");

    this.listEl = document.getElementById("artwork-list");
    this.listItemsEl = this.listEl.querySelector(".artwork-list__items");
    this.listCloseBtn = this.listEl.querySelector(".artwork-list__close");

    this._onJumpTo = onJumpTo;
    this._registry = [];

    this.descEl.addEventListener("scroll", () => this._updateMask(), { passive: true });

    this.closeBtn.addEventListener("click", () => {
      this.hide();
      if (typeof onClose === "function") onClose();
    });

    this.prevBtn.addEventListener("click", () => {
      if (typeof onNav === "function") onNav(-1);
    });

    this.nextBtn.addEventListener("click", () => {
      if (typeof onNav === "function") onNav(1);
    });

    this.listBtn.addEventListener("click", () => this._toggleList());
    this.listCloseBtn.addEventListener("click", () => this._closeList());
  }

  show({ title = "", artist = "", description = "" } = {}) {
    this.titleEl.textContent = title;
    this.artistEl.textContent = artist;
    this.descEl.textContent = description;

    this.artistEl.style.display = artist ? "" : "none";

    this.el.classList.add("info-panel--visible");

    this.descEl.scrollTop = 0;
    requestAnimationFrame(() => this._updateMask());
  }

  hide() {
    this.el.classList.remove("info-panel--visible");
    this._closeList();
  }

  setRegistry(registry) {
    this._registry = registry;
    this._buildList();
  }

  setActiveIndex(idx, total) {
    const items = this.listItemsEl.querySelectorAll(".artwork-list__item");
    items.forEach((el, i) => el.classList.toggle("artwork-list__item--active", i === idx));
  }

  _buildList() {
    this.listItemsEl.innerHTML = "";
    this._registry.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.className = "artwork-list__item";
      btn.textContent = item.info.title || `Artwork ${i + 1}`;
      if (item.info.artist) {
        const sub = document.createElement("span");
        sub.className = "artwork-list__item-artist";
        sub.textContent = item.info.artist;
        btn.appendChild(sub);
      }
      btn.addEventListener("click", () => {
        this._closeList();
        if (typeof this._onJumpTo === "function") this._onJumpTo(i);
      });
      this.listItemsEl.appendChild(btn);
    });
  }

  _toggleList() {
    this.listEl.classList.toggle("artwork-list--visible");
  }

  _closeList() {
    this.listEl.classList.remove("artwork-list--visible");
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
