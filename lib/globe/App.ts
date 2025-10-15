import * as THREE from "three";

import { groups } from "./config";
import { Lines } from "./Lines";

export class App {
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  controls: any;
  animate: (app: App) => void;
  setup: (app: App) => void;
  container!: HTMLElement;
  lines: Lines | null = null;
  targetRotationX = 0;
  targetRotationY = 0;
  dampingFactor = 0.05;
  animationFrameId: number | null = null; // Add animation frame ID property

  constructor({
    animate,
    setup,
    initialRotationX = 0,
    initialRotationY = 0,
  }: {
    animate: (app: App) => void;
    setup: (app: App) => void;
    initialRotationX?: number;
    initialRotationY?: number;
  }) {
    this.animate = animate;
    this.setup = setup;
    this.targetRotationX = initialRotationX;
    this.targetRotationY = initialRotationY;
  }

  async init(container: HTMLElement) {
    this.container = container;
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initControls();

    this.render();
    this.setup(this); // Call setup after render to ensure groups.main exists
    if (groups.main) {
      groups.main.rotation.y = this.targetRotationY;
      groups.main.rotation.x = this.targetRotationX;
    }
    this.update();
  }

  initScene() {
    this.scene = new THREE.Scene();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    this.renderer.shadowMap.enabled = true;
  }

  initCamera() {
    const ratio = window.innerWidth / window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, ratio, 0.1, 10000);
    this.camera.lookAt(this.scene.position);
    this.camera.position.set(0, 15, 30);
  }

  initControls() {
    // Simple orbit controls implementation
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseDown = (event: MouseEvent) => {
      isMouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      if (groups.main) {
        this.targetRotationY += deltaX * 0.005;
        this.targetRotationX += deltaY * 0.005;
      }

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    this.container.addEventListener("mousedown", onMouseDown);
    this.container.addEventListener("mouseup", onMouseUp);
    this.container.addEventListener("mousemove", onMouseMove);
    // Removed wheel event listener to disable zoom
  }

  render() {
    this.container.appendChild(this.renderer.domElement);
  }

  update = () => {
    if (groups.main) {
      groups.main.rotation.y +=
        (this.targetRotationY - groups.main.rotation.y) * this.dampingFactor;
      groups.main.rotation.x +=
        (this.targetRotationX - groups.main.rotation.x) * this.dampingFactor;
    }
    this.animate(this);
    this.renderer.render(this.scene, this.camera);
    // Store the animation frame ID so it can be cancelled
    this.animationFrameId = requestAnimationFrame(this.update);
  };

  handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  destroy() {
    // Cancel animation frame first
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.lines) {
      this.lines.destroy();
    }
  }
}
