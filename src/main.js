import "./ui/overlay.css";
import { App } from "./core/App.js";

const mount = document.querySelector("#app");
const app = new App({ mount });

// Debug handle (optional)
window.__APP__ = app;
