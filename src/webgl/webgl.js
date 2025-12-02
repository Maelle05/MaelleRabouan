import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_speed;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_pixelRatio;

  void main() {
    vec2 st = vUv;
    vec3 baseColor = vec3(0.96); //#F5F5F5
    vec3 rippleColor = vec3(0.8);

    // Correction du ratio écran
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);

    vec2 pos = (st - u_mouse) * aspect;

    float dist = length(pos);

    // Création d'une onde sinusoïdale qui se propage depuis le point touché
    float ripple = 0.03 * sin(30.0 * dist - 3.0 * u_time) / (dist + 0.01);
    ripple *= u_speed;

    // Couleurs
    vec3 color = mix(baseColor, rippleColor, ripple * 2.0);

    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
  }
`;

export default class WebGlManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.sceneReady = false;
    this.scene = new THREE.Scene();
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.camera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near
      1 // far
    );
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.sizes.width, this.sizes.height);

    this.clock = new THREE.Clock();

    // mouse smoothing
    this.mouse = { x: 0.5, y: 0.5 }; // cible
    this.mouseLerp = { x: 0.5, y: 0.5 }; // lissé

    this.init();
    this.addEventListeners();
    this.tick();
  }

  init() {
    // Full screen plane
    const geometry = new THREE.PlaneGeometry(2, 2); // couvre l'écran (avec perspective OK)
    this.uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_speed: { value: 1 },
      u_resolution: {
        value: new THREE.Vector2(this.sizes.width, this.sizes.height),
      },
      u_pixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      depthTest: false,
      depthWrite: false,
    });

    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);

    this.sceneReady = true;
  }

  addEventListeners() {
    // pointer for mouse + touch unified
    this.onPointerMove = (e) => {
      const x =
        e.clientX !== undefined
          ? e.clientX
          : (e.touches && e.touches[0].clientX) || 0;
      const y =
        e.clientY !== undefined
          ? e.clientY
          : (e.touches && e.touches[0].clientY) || 0;
      this.mouse.x = x / this.sizes.width;
      this.mouse.y = 1.0 - y / this.sizes.height; // vUv has origin bottom-left? We used 0..1 top->bottom; invert for nicer mapping
    };
    window.addEventListener("pointermove", this.onPointerMove, {
      passive: true,
    });

    this.onResize = () => this.resize();
    window.addEventListener("resize", this.onResize);
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.sizes.width, this.sizes.height);

    this.uniforms.u_resolution.value.set(this.sizes.width, this.sizes.height);
    this.uniforms.u_pixelRatio.value = dpr;
  }

  // simple lerp helper
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  tick() {
    // update time
    const elapsed = this.clock.getElapsedTime();

    // smooth mouse: lerp toward target
    const smoothing = 0.12; // plus petit = plus lent
    this.mouseLerp.x = this.lerp(this.mouseLerp.x, this.mouse.x, smoothing);
    this.mouseLerp.y = this.lerp(this.mouseLerp.y, this.mouse.y, smoothing);

    // Distance entre la souris réelle et la souris lissée
    const dx = this.mouse.x - this.mouseLerp.x;
    const dy = this.mouse.y - this.mouseLerp.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Clamp / normalisation entre 0 et 1
    const maxSpeed = 0.005;
    // const speed = Math.min(dist / maxSpeed, 1.0);
    const speed = 0;

    // update uniforms
    this.uniforms.u_time.value = elapsed;
    this.uniforms.u_speed.value = speed;
    this.uniforms.u_mouse.value.set(this.mouseLerp.x, this.mouseLerp.y);

    if (this.sceneReady) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
