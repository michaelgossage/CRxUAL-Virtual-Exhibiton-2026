export function disposeObject3D(root) {
  root.traverse?.((obj) => {
    if (obj.geometry) obj.geometry.dispose?.();

    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (!m) continue;
        if (m.map) m.map.dispose?.();
        if (m.normalMap) m.normalMap.dispose?.();
        if (m.roughnessMap) m.roughnessMap.dispose?.();
        if (m.metalnessMap) m.metalnessMap.dispose?.();
        m.dispose?.();
      }
    }
  });
}
