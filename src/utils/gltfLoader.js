import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

// Set the path to the Draco decoder
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
gltfLoader.setDRACOLoader(dracoLoader);

const LOAD_TIMEOUT_MS = 8_000; // 8 s per attempt before retrying
const MAX_RETRIES     = 2;     // 3 total attempts

/**
 * Load a GLTF/GLB model with automatic timeout and retry on stalled connections.
 * @param {string} url - The URL or path to the GLTF/GLB file
 * @param {Function} onProgress - Optional progress callback (event) => {}
 * @returns {Promise<Object>} The loaded GLTF object { scene, scenes, animations, asset, parser, etc. }
 */
export function loadGLTF(url, onProgress = null) {
  const attempt = () => new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`[GLTFLoader] timeout: ${url}`)),
      LOAD_TIMEOUT_MS
    );
    gltfLoader.load(
      url,
      (gltf) => { clearTimeout(timer); resolve(gltf); },
      onProgress ? (e) => onProgress(e) : undefined,
      (err)  => { clearTimeout(timer); reject(err);  }
    );
  });

  let retriesLeft = MAX_RETRIES;
  const run = async () => {
    try {
      return await attempt();
    } catch (err) {
      if (retriesLeft-- > 0) {
        console.warn(`[GLTFLoader] retrying (${MAX_RETRIES - retriesLeft}/${MAX_RETRIES}): ${url}`, err.message);
        await new Promise(r => setTimeout(r, 2000));
        return run();
      }
      throw err;
    }
  };
  return run();
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
