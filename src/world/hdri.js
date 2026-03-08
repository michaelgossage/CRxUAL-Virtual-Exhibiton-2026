import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/*
export async function applyHDRI({
  renderer,
  scene,
  url,
  background = false,
  intensity = 1.0,
}){
  // output (recommended)
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const hdrTex = await new RGBELoader().loadAsync(url);
  const envMap = pmrem.fromEquirectangular(hdrTex).texture;

  scene.environment = envMap;
  scene.environmentIntensity = intensity; // r160 supports this

  if (background) scene.background = envMap;

  hdrTex.dispose();
  pmrem.dispose();

  return envMap;
}*/

export async function applyHDRI({ renderer, scene, url, background=false, envIntensity=1.0 }) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const hdr = await new RGBELoader().loadAsync(url);
  const envMap = pmrem.fromEquirectangular(hdr).texture;

  scene.environment = envMap;
  if (background) scene.background = envMap;

  hdr.dispose();
  pmrem.dispose();

  // r160-safe "intensity":
  scene.traverse((o) => {
    if (!o.isMesh) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      if (m && "envMapIntensity" in m) {
        m.envMapIntensity = envIntensity;
        m.needsUpdate = true;
      }
    }
  });

  return envMap;
}

