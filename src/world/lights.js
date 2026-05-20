import { AmbientLight, PointLight } from "three";

export function addDefaultLights(scene) {
  scene.add(new AmbientLight(0xffffff, 0.3));

  const pointLight4 = new PointLight(0xffffff, 10.0);
  pointLight4.position.set(-30, 3.0, -20);
  pointLight4.castShadow = true;
  scene.add(pointLight4);
}
