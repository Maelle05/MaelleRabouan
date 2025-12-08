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
    this.mouse = { x: 0, y: 0 };
    this.frame = 0;
    this.clock = new THREE.Clock();
    this.sceneReady = false;

    // RENDERER ------------------------------------------------------
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    this.updateRendererSize();

    // SCENES ------------------------------------------------------
    this.scene = new THREE.Scene();
    this.simScene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);

    // RENDERER Target ----------------------------------------------
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
    // Init Sheader
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

    // Init Canvat tex

    this.drawCanvas = document.createElement("canvas");
    this.drawCanvas.width = this.sizes.width;
    this.drawCanvas.height = this.sizes.height;
    this.ctx = this.drawCanvas.getContext("2d", { alpha: true });

    this.drawCanvasfunc();

    this.canvasTexture = new THREE.CanvasTexture(this.drawCanvas);
    this.canvasTexture.minFilter = THREE.LinearFilter;
    this.canvasTexture.magFilter = THREE.LinearFilter;
    this.canvasTexture.format = THREE.RGBAFormat;

    this.sceneReady = true;
  }

  drawCanvasfunc() {
    this.ctx.fillStyle = "#f5F5F5";
    this.ctx.fillRect(0, 0, this.sizes.width, this.sizes.height);
  }

  addEventListeners() {
    let inactivityTimer;
    const idleDelay = 300; // ms avant reset (change si besoin)

    // Reset si inactif
    const resetMouse = () => {
      this.mouse.x = 0;
      this.mouse.y = 0;
    };

    const restartInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(resetMouse, idleDelay);
    };

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

      const newX = x / this.sizes.width;
      const newY = 1.0 - y / this.sizes.height;

      const threshold = 0.0005; // Ajuste la sensibilité
      let updated = false;

      if (Math.abs(newX - this.mouse.x) > threshold) {
        this.mouse.x = newX;
        updated = true;
      }

      if (Math.abs(newY - this.mouse.y) > threshold) {
        this.mouse.y = newY;
        updated = true;
      }

      if (updated) {
        restartInactivityTimer();
      }
    };

    window.addEventListener("pointermove", this.onPointerMove, {
      passive: true,
    });
    window.addEventListener("click", this.onPointerMove, {
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

    this.updateRendererSize();

    this.rtA.setSize(this.sizes.width, this.sizes.height);
    this.rtB.setSize(this.sizes.width, this.sizes.height);

    this.drawCanvas.width = this.sizes.width;
    this.drawCanvas.height = this.sizes.height;

    this.drawCanvasfunc();

    this.canvasTexture.needsUpdate = true;

    this.uniforms.resolution.value.set(this.sizes.width, this.sizes.height);
  }

  tick() {
    const elapsed = this.clock.getElapsedTime();

    // UPDATE UNIFORMS
    this.uniforms.frame.value = this.frame++;
    this.uniforms.time.value = elapsed;

    this.uniforms.mouse.value.x = this.mouse.x;
    this.uniforms.mouse.value.y = this.mouse.y;

    this.uniforms.textureA.value = this.rtA.texture;

    if (this.sceneReady) {
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
