import * as THREE from 'three';

const vertexShader = `
precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
   vUv = uv;
   
   vec4 pos = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
   gl_Position = pos;
}
`

const fragmentShader = `

precision highp float;

uniform sampler2D uMask;
uniform sampler2D uPaint;
uniform vec2 uMouse;
uniform float uLastsMouse[300];
uniform vec2 uRes;

varying vec2 vUv;

void main() {
  vec4 color = vec4(0.95, 0.95, 0.95, 1.);
  vec4 paint = texture2D(uPaint, vUv);

	// We manage the device ratio by passing PR constant
	vec2 res = uRes * PR;
	vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
	// Use the following formula to keep the good ratio of your coordinates
	st.y *= uRes.y / uRes.x;

	// We readjust the mouse coordinates
	vec2 mouse = uMouse * -0.5;
	mouse.y *= uRes.y / uRes.x;

	vec2 maskPos = st + mouse + 0.5;

  // Mask
  vec4 _Mask = texture2D(uMask, maskPos);

  for(int i=0;i< 300; i += 2)
  {
    vec2 newPos = vec2(uLastsMouse[i] * -0.5, uLastsMouse[i+1] * -0.5);
    newPos.y *= uRes.y / uRes.x;
    vec2 newMaskPos = st + newPos + 0.5;
    vec4 new_Mask = texture2D(uMask, newMaskPos);

    _Mask = clamp(_Mask + new_Mask, 0.0, 1.0);
  }

  vec4 finalImage = mix(color, paint, _Mask);

	// Add Paper effect
	gl_FragColor = finalImage;
}
`


export default class WebGlManager {
  constructor(canvas) {
    this.size = { width: window.innerWidth, height: window.innerHeight}
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor( 0xf5f5f5, 1 );
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5,-0.5,-1000, 1000)
    this.camera.position.set(0, 0, 1)
    this.mouse = new THREE.Vector2(15, 15)
    this.lastPosMouse = []
    for (let i = 0; i < 300; i++) {
      this.lastPosMouse.push(15)
    }

    this.scene.add(this.camera)
    this.ready = false
    this.initScene()


    setInterval(()=>{
      this.lastPosMouse = this.lastPosMouse.slice(2)
      this.lastPosMouse.push(15, 15)
      this.uniforms.uLastsMouse.value = this.lastPosMouse
    }, 5) 
  }

  updateMouse(e){
    this.mouse = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    }
    this.lastPosMouse = this.lastPosMouse.slice(2)
    this.lastPosMouse.push(this.mouse.x, this.mouse.y)
    this.uniforms.uLastsMouse.value = this.lastPosMouse
  }

  resetMouse(){
    this.lastPosMouse = []
    for (let i = 0; i < 300; i++) {
      this.lastPosMouse.push(15)
    }
    this.uniforms.uLastsMouse.value = this.lastPosMouse
  }

  clickedMouse(e){
    this.lastPosMouse = this.lastPosMouse.slice(2)
    this.lastPosMouse.push((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
    this.uniforms.uLastsMouse.value = this.lastPosMouse
  }

  resize(){
    this.size = { width: window.innerWidth, height: window.innerHeight}
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  initScene(){
    const textureMask = new THREE.TextureLoader().load( './assets/brush.png' );
    const textureBrush = new THREE.TextureLoader().load( './assets/brush_texture.jpg' );
    /**
     * Plane
     */
    // Geometry
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

    // Uniforms
    this.uniforms = {
      uMask: { type: 't', value: textureMask },
      uPaint: { type: 't', value: textureBrush },
      uMouse: { value: this.mouse },
      uLastsMouse: { value: this.lastPosMouse },
      uRes: { value: new THREE.Vector2(this.size.width, this.size.height) }
    }

    // Material
    // const material = new THREE.MeshBasicMaterial({ color: '#F5F5F5' })
    const material =  new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
      wireframe: false,
      defines: {
          PR: window.devicePixelRatio.toFixed(1)
      }
    })


    // Mesh
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.scale.set(2, 2, 1)

    this.scene.add(this.mesh)
    this.ready = true
  }

  tick(){
    // console.log('tick')

    // Render
    this.renderer.render(this.scene, this.camera)
  }
}