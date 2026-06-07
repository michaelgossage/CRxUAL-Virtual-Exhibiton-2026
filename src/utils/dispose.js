export function disposeObject3D(root) {
  root.traverse?.((obj) => {
    if (obj.geometry) obj.geometry.dispose?.();

    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (!m) continue;
        for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap',
                           'emissiveMap', 'aoMap', 'lightMap', 'alphaMap', 'envMap']) {
          if (m[key]) m[key].dispose?.();
        }
        m.dispose?.();
      }
    }
  });
}
