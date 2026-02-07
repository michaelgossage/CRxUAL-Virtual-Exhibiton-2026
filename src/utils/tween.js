const clamp01 = (x) => Math.max(0, Math.min(1, x));
const easeInOut = (t) => t * t * (3 - 2 * t);

export function makeTween01({ from, to, duration = 0.35, onUpdate, onDone }) {
  let t = 0;
  let done = false;

  return {
    update(dt) {
      if (done) return;
      t += dt / Math.max(0.0001, duration);
      const a = easeInOut(clamp01(t));
      const v = from + (to - from) * a;
      onUpdate?.(v);

      if (t >= 1) {
        done = true;
        onDone?.();
      }
    },
    get done() { return done; }
  };
}
