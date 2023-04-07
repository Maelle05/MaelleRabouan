import WebGlManager from "./webgl.js";
import LocomotiveScroll from "https://cdn.skypack.dev/locomotive-scroll";

const webgl = new WebGlManager(document.querySelector('#webgl'));

const cursor = document.querySelector('#cursor')

window.addEventListener('resize', () => webgl.resize())
window.addEventListener('pointermove', (e) => {
  cursor.style.top = `calc(${e.clientY + document.documentElement.scrollTop}px - 10px)`
  cursor.style.left = `calc(${e.clientX}px - 10px)`
  webgl.updateMouse(e)
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

// Smooth scroll

new LocomotiveScroll({
  el: document.querySelector(".container"),
  smooth: true
}); 