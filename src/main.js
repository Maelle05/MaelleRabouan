import { createApp } from "vue";
import App from "./App.vue";
import "./base.css"; // Tailwind
import router from "./router";
import Lenis from "lenis";
import WebGlManager from "./webgl/webgl";

const app = createApp(App);
app.use(router);
app.mount("#app");

const lenis = new Lenis({
  autoRaf: true,
});

const webgl = new WebGlManager(document.querySelector("#webgl"));
window.addEventListener("resize", () => {
  webgl.resize();
});
const tick = () => {
  webgl.tick();
  window.requestAnimationFrame(tick);
};
tick();
