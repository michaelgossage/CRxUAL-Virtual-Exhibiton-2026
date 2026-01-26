import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

// Set the path to the Draco decoder
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Load a GLTF/GLB model
 * @param {string} url - The URL or path to the GLTF/GLB file
 * @param {Function} onProgress - Optional progress callback (event) => {}
 * @returns {Promise<Object>} The loaded GLTF object { scene, scenes, animations, asset, parser, etc. }
 */
export function loadGLTF(url, onProgress = null) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => resolve(gltf),
      (event) => {
        if (onProgress) onProgress(event);
      },
      (error) => reject(error)
    );
  });
}

/**
 * Load a GLTF/GLB model and get just the scene
 * @param {string} url - The URL or path to the GLTF/GLB file
 * @param {Function} onProgress - Optional progress callback (event) => {}
 * @returns {Promise<THREE.Group>} The scene object ready to add to your Three.js scene
 */
export async function loadGLTFScene(url, onProgress = null) {
  const gltf = await loadGLTF(url, onProgress);
  return gltf.scene;
}

/**
 * Load a GLTF/GLB model and get animations
 * @param {string} url - The URL or path to the GLTF/GLB file
 * @param {Function} onProgress - Optional progress callback (event) => {}
 * @returns {Promise<Object>} Object with { scene, animations }
 */
export async function loadGLTFWithAnimations(url, onProgress = null) {
  const gltf = await loadGLTF(url, onProgress);
  return {
    scene: gltf.scene,
    animations: gltf.animations
  };
}

export default loadGLTF;
