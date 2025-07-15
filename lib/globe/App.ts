import * as THREE from 'three';
import { groups } from './config';
import { Lines } from './Lines';

export class App {
  scene!: THREE.Scene;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  controls: any;
  animate: (app: App) => void;
  setup: (app: App) => void;
  container!: HTMLElement;
  lines: Lines | null = null;

  constructor({ animate, setup }: { animate: (app: App) => void; setup: (app: App) => void }) {
    this.animate = animate;
    this.setup = setup;
  }

  async init(container: HTMLElement) {
    this.container = container;
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initControls();

    this.render();
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
        groups.main.rotation.y += deltaX * 0.01;
        groups.main.rotation.x += deltaY * 0.01;
      }

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onWheel = (event: WheelEvent) => {
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      this.camera.position.multiplyScalar(scale);
    };

    this.container.addEventListener('mousedown', onMouseDown);
    this.container.addEventListener('mouseup', onMouseUp);
    this.container.addEventListener('mousemove', onMouseMove);
    this.container.addEventListener('wheel', onWheel);
  }

  render() {
    this.setup(this);
    this.container.appendChild(this.renderer.domElement);
  }

  update = () => {
    this.animate(this);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update);
  }

  handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  destroy() {
    if (this.lines) {
      this.lines.destroy();
    }
  }
}
