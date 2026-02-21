import { AmbientLight, DirectionalLight, PointLight } from "three";

export function addDefaultLights(scene) {
  scene.add(new AmbientLight(0xffffff, 0.3));

  const sun = new DirectionalLight(0xffffff, 1.5);
  sun.position.set(1, 10, 1);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 512;
  sun.shadow.mapSize.height = 512;
  //scene.add(sun);

  const light = new PointLight( 0xffffff, 1000, 100 );
  light.position.set( 10, 10, 10 );
  light.castShadow = true;
  light.shadow.mapSize.width = 1024; // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 500; // default 
  //scene.add( light );


  const pointLight = new PointLight(0xffffff, 100.3);
  pointLight.position.set(3, 5, -1);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const pointLight2 = new PointLight(0xffffff, 100.3);
  pointLight2.position.set(-3, 5, -1);
  pointLight2.castShadow = true;
  scene.add(pointLight2);


}
