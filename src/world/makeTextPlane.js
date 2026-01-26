import * as THREE from "three";

export function makeTextPlane(text, {
  fontsize = 30,
  textColor = { r: 255, g: 255, b: 255 },
  canvasWidth = 512,
  canvasHeight = 128,
  padding = 20
} = {}) {
  const c = document.createElement("canvas");
  c.width = canvasWidth;
  c.height = canvasHeight;
  const ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);

  // subtle backing
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`;
  ctx.font = `700 ${fontsize}px system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.textBaseline = "middle";
  ctx.fillText(text, padding, c.height / 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;

  const aspect = c.width / c.height;
  const h = 0.35;
  const w = h * aspect;

  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
  const geo = new THREE.PlaneGeometry(w, h);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData._textTexture = tex; // for disposal if needed
  return mesh;
}
