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

    // Video controls
    this.videoEl      = this.el.querySelector(".info-panel__video");
    this.playPauseBtn = this.videoEl.querySelector(".video-ctrl__playpause");
    this.timeEl       = this.videoEl.querySelector(".video-ctrl__time");
    this.scrubberEl   = this.videoEl.querySelector(".video-ctrl__scrubber");
    this.durationEl   = this.videoEl.querySelector(".video-ctrl__duration");
    this._activeVideo = null;
    this._rafId = null;
    this.videoEl.hidden = false; // let CSS class control visibility

    // Audio narration controls
    this.audioEl          = this.el.querySelector(".info-panel__audio");
    const audioControls   = this.audioEl.querySelector(".info-panel__audio-controls");
    this.audioPlayPauseBtn = audioControls.querySelector(".video-ctrl__playpause");
    this.audioTimeEl       = audioControls.querySelector(".video-ctrl__time");
    this.audioScrubberEl   = audioControls.querySelector(".video-ctrl__scrubber");
    this.audioDurationEl   = audioControls.querySelector(".video-ctrl__duration");
    this._activeAudio = null;
    this._audioRafId = null;
    this._activeCues = null;
    this._activeCueIdx = -1;

    this._onJumpTo = onJumpTo;
    this._registry = [];

    // Scrollable description mask
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

    // Video control events
    this.playPauseBtn.addEventListener("click", () => {
      const v = this._activeVideo;
      if (!v) return;
      if (v.paused) v.play().catch(() => {});
      else          v.pause();
    });

    this.scrubberEl.addEventListener("input", () => {
      const v = this._activeVideo;
      if (!v || isNaN(v.duration)) return;
      v.currentTime = parseFloat(this.scrubberEl.value) * v.duration;
    });

    // Keep scrubber from triggering 3D scene clicks
    this.scrubberEl.addEventListener("pointerdown", e => e.stopPropagation());

    // Audio narration control events
    this.audioPlayPauseBtn.addEventListener("click", () => {
      const a = this._activeAudio;
      if (!a) return;
      if (a.paused) a.play().catch(() => {});
      else          a.pause();
    });

    this.audioScrubberEl.addEventListener("input", () => {
      const a = this._activeAudio;
      if (!a || isNaN(a.duration)) return;
      a.currentTime = parseFloat(this.audioScrubberEl.value) * a.duration;
    });

    this.audioScrubberEl.addEventListener("pointerdown", e => e.stopPropagation());

    // Prevent description scroll from bubbling to 3D scene when showing transcript
    this.descEl.addEventListener("pointerdown", e => e.stopPropagation());
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

  showVideoControls(video) {
    this._activeVideo = video;
    this.videoEl.classList.add("info-panel__video--visible");

    // Update duration once metadata is ready
    const setDuration = () => {
      if (!isNaN(video.duration)) {
        this.durationEl.textContent = this._formatTime(video.duration);
      }
    };
    if (!isNaN(video.duration)) setDuration();
    else video.addEventListener("loadedmetadata", setDuration, { once: true });

    this._startVideoLoop();
  }

  hideVideoControls() {
    this._stopVideoLoop();
    this._activeVideo = null;
    this.videoEl.classList.remove("info-panel__video--visible");
    this.scrubberEl.value = 0;
    this.timeEl.textContent = "0:00";
    this.durationEl.textContent = "0:00";
  }

  showAudioControls(audio, segments = null) {
    this._activeCues = null;
    this._activeCueIdx = -1;
    this._activeAudio = audio;
    this.audioEl.classList.add("info-panel__audio--visible");
    if (segments) this.setCues(segments);

    const setDuration = () => {
      if (!isNaN(audio.duration)) {
        this.audioDurationEl.textContent = this._formatTime(audio.duration);
      }
    };
    if (!isNaN(audio.duration)) setDuration();
    else audio.addEventListener("loadedmetadata", setDuration, { once: true });

    this._startAudioLoop();
  }

  hideAudioControls() {
    this._stopAudioLoop();
    this._activeAudio = null;
    this._activeCues = null;
    this._activeCueIdx = -1;
    this.audioEl.classList.remove("info-panel__audio--visible");
    this.audioScrubberEl.value = 0;
    this.audioTimeEl.textContent = "0:00";
    this.audioDurationEl.textContent = "0:00";
  }

  setCues(segments) {
    this._activeCues = segments;
    this._activeCueIdx = -1;
    this.descEl.innerHTML = "";
    this.descEl.scrollTop = 0;
    segments.forEach(seg => {
      const span = document.createElement("span");
      span.className = "info-panel__transcript-seg";
      span.textContent = seg.text;
      this.descEl.appendChild(span);
    });
  }

  setRegistry(registry) {
    this._registry = registry;
    this._buildList();
  }

  setActiveIndex(idx) {
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

  // ── Video loop ────────────────────────────────────────────

  _startVideoLoop() {
    this._stopVideoLoop();
    const tick = () => {
      this._tickVideo();
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  _stopVideoLoop() {
    if (this._rafId !== null) cancelAnimationFrame(this._rafId);
    this._rafId = null;
  }

  // ── Audio loop ────────────────────────────────────────────

  _startAudioLoop() {
    this._stopAudioLoop();
    const tick = () => {
      this._tickAudio();
      this._audioRafId = requestAnimationFrame(tick);
    };
    this._audioRafId = requestAnimationFrame(tick);
  }

  _stopAudioLoop() {
    if (this._audioRafId !== null) cancelAnimationFrame(this._audioRafId);
    this._audioRafId = null;
  }

  _tickAudio() {
    const a = this._activeAudio;
    if (!a || isNaN(a.duration)) return;

    this.audioScrubberEl.value = a.currentTime / a.duration;
    this.audioTimeEl.textContent = this._formatTime(a.currentTime);
    this.audioPlayPauseBtn.innerHTML = a.paused ? "&#9654;" : "&#9646;&#9646;";

    if (this._activeCues) {
      const t = a.currentTime;
      const idx = this._activeCues.findIndex(s => t >= s.start_time && t <= s.end_time);
      if (idx !== this._activeCueIdx) {
        const items = this.descEl.querySelectorAll(".info-panel__transcript-seg");
        if (this._activeCueIdx >= 0 && items[this._activeCueIdx])
          items[this._activeCueIdx].classList.remove("info-panel__transcript-seg--active");
        if (idx >= 0 && items[idx]) {
          items[idx].classList.add("info-panel__transcript-seg--active");
          items[idx].scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
        this._activeCueIdx = idx;
      }
    }
  }

  _tickVideo() {
    const v = this._activeVideo;
    if (!v || isNaN(v.duration)) return;

    this.scrubberEl.value = v.currentTime / v.duration;
    this.timeEl.textContent = this._formatTime(v.currentTime);
    this.playPauseBtn.innerHTML = v.paused ? "&#9654;" : "&#9646;&#9646;";
  }

  _formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  // ── Scroll mask ───────────────────────────────────────────

  _updateMask() {
    const el = this.descEl;
    const atTop    = el.scrollTop <= 2;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    const overflows = el.scrollHeight > el.clientHeight + 4;

    let mask = "none";
    if (overflows) {
      if (atTop)         mask = "linear-gradient(to bottom, black 70%, transparent 100%)";
      else if (atBottom) mask = "linear-gradient(to bottom, transparent 0%, black 30%)";
      else               mask = "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)";
    }

    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;
  }
}
