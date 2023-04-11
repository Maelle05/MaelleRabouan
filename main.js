import WebGlManager from "./webgl.js";

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

document.querySelectorAll('#scroll').forEach((link)=>{
  link.addEventListener('mouseover', ()=>{
    cursor.style.opacity = '0'
  })
  link.addEventListener('mouseout', ()=>{
    cursor.style.opacity = '1'
  })
})

const projects = document.querySelectorAll('#second a')

projects.forEach((project)=>{
  project.addEventListener('mouseover', ()=>{
    projects.forEach((e)=>{
      e.style.opacity = '0.60'
      e.querySelector('video').currentTime = 0
      e.querySelector('video').pause()
    })
    project.style.opacity = '1'
    project.querySelector('video').play()
  })
  project.addEventListener('mouseout', ()=>{
    projects.forEach((e)=>{
      e.style.opacity = '1'
    })
    project.querySelector('video').currentTime = 0
    project.querySelector('video').pause()
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

const lenis = new Lenis()

document.querySelector('#scroll').addEventListener('click', () => {
  lenis.scrollTo(document.querySelector('#second'), { offset: -100})
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)