import WebGlManager from "./webgl.js";

const webgl = new WebGlManager(document.querySelector('#webgl'));
let mouse = 'up';

window.addEventListener('resize', () => webgl.resize())
window.addEventListener('mousemove', (e) => {
  if(mouse === 'down') webgl.updateMouse(e)
})
window.addEventListener('mouseup', () => {
  mouse = 'up'
})
window.addEventListener('mousedown', () => {
  webgl.resetMouse()
  mouse = 'down'
})

const tick = () =>
{
  if (webgl.ready) webgl.tick()

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()