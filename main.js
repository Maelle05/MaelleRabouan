import WebGlManager from "./webgl.js";

const webgl = new WebGlManager(document.querySelector('#webgl'));
let mouse = 'up';

const cursor = document.querySelector('#cursor')

window.addEventListener('resize', () => webgl.resize())
window.addEventListener('pointermove', (e) => {
  cursor.style.top = `calc(${e.clientY}px - 10px)`
  cursor.style.left = `calc(${e.clientX}px - 10px)`
  if(mouse === 'down') webgl.updateMouse(e)
})
window.addEventListener('pointerup', () => {
  mouse = 'up'
})
window.addEventListener('pointerdown', () => {
  webgl.resetMouse()
  mouse = 'down'
})

document.querySelectorAll('a').forEach((link)=>{
  link.addEventListener('mouseover', ()=>{
    cursor.style.opacity = '0'
  })
  link.addEventListener('mouseout', ()=>{
    cursor.style.opacity = '1'
  })
})

const tick = () =>
{
  if (webgl.ready) webgl.tick()

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()