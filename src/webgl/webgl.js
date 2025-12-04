import * as THREE from "three";
import {
  renderFragmentShader,
  renderVertexShader,
  simulationFragmentShader,
  simulationVertexShader,
} from "./shaders";

export default class WebGlManager {
  constructor(canvas) {
    this.canvas = canvas;

    // STATES ------------------------------------------------------
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    // mouse smoothing
    this.mouse = { x: 0.5, y: 0.5 }; // cible
    this.mouseLerp = { x: 0.5, y: 0.5 }; // lissé
    this.frame = 0;
    this.clock = new THREE.Clock();

    // RENDERER ------------------------------------------------------
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    this.updateRendererSize();

    this.sceneReady = false;
    this.scene = new THREE.Scene();
    this.simScene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near
      1 // far
    );
    this.scene.add(this.camera);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(this.sizes.width, this.sizes.height);

    this.options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    this.rtA = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,
      this.options
    );
    this.rtB = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,
      this.options
    );

    this.init();
    this.addEventListeners();
    this.tick();
  }

  init() {
    // Full screen plane
    const geometry = new THREE.PlaneGeometry(2, 2); // couvre l'écran

    this.uniforms = {
      textureA: { value: null },
      mouse: { value: this.mouse },
      resolution: {
        value: new THREE.Vector2(this.sizes.width, this.sizes.height),
      },
      time: { value: 0 },
      frame: { value: 0 },
    };

    this.simMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    this.renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    this.simPlane = new THREE.Mesh(geometry, this.simMaterial);
    this.renderPlane = new THREE.Mesh(geometry, this.renderMaterial);

    this.simScene.add(this.simPlane);
    this.scene.add(this.renderPlane);

    this.drawCanvas = document.createElement("canvas");
    this.drawCanvas.width = this.sizes.width;
    this.drawCanvas.height = this.sizes.height;
    this.ctx = this.drawCanvas.getContext("2d", { alpha: true });
    this.ctx.fillStyle = "#f5F5F5";
    this.ctx.fillRect(0, 0, this.sizes.width, this.sizes.height);

    this.canvasTexture = new THREE.CanvasTexture(this.drawCanvas);
    this.canvasTexture.minFilter = THREE.LinearFilter;
    this.canvasTexture.magFilter = THREE.LinearFilter;
    this.canvasTexture.format = THREE.RGBAFormat;

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

  // --------------------------------------------------------------
  // RESIZE

  updateRendererSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
  }

  resize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.rtA.setSize(this.sizes.width, this.sizes.height);
    this.rtB.setSize(this.sizes.width, this.sizes.height);
    this.drawCanvas.width = this.sizes.width;
    this.drawCanvas.height = this.sizes.height;
    this.ctx.fillStyle = "#f5F5F5";
    this.ctx.fillRect(0, 0, this.sizes.width, this.sizes.height);
    this.canvasTexture.needsUpdate = true;

    this.uniforms.resolution.value.set(this.sizes.width, this.sizes.height);
  }

  // simple lerp helper
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  tick() {
    const elapsed = this.clock.getElapsedTime();

    const smoothing = 0.16;
    this.mouseLerp.x = this.lerp(this.mouseLerp.x, this.mouse.x, smoothing);
    this.mouseLerp.y = this.lerp(this.mouseLerp.y, this.mouse.y, smoothing);

    // UPDATE UNIFORMS
    this.uniforms.frame.value = this.frame++;
    this.uniforms.time.value = elapsed;

    this.uniforms.mouse.value.x = this.mouseLerp.x;
    this.uniforms.mouse.value.y = this.mouseLerp.y;

    this.uniforms.textureA.value = this.rtA.texture;

    if (this.sceneReady) {
      // PING PONG
      this.renderer.setRenderTarget(this.rtB);
      this.renderer.render(this.simScene, this.camera);

      this.renderMaterial.uniforms.textureA.value = this.rtB.texture;
      this.renderMaterial.uniforms.textureB.value = this.canvasTexture;
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, this.camera);

      const temp = this.rtA;
      this.rtA = this.rtB;
      this.rtB = temp;
    }
  }
}
