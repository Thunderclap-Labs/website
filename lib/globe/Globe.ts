import * as THREE from "three";

import { config, elements, groups } from "./config";
import { shaders } from "./shaders";

export class Globe {
  radius: number;
  geometry: THREE.SphereGeometry;
  globeMaterial!: THREE.Material;
  globe!: THREE.Mesh;
  loader: THREE.TextureLoader;

  constructor() {
    this.radius = config.sizes.globe;
    this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
    this.loader = new THREE.TextureLoader();

    groups.globe = new THREE.Group();
    groups.globe.name = "Globe";

    this.initGlobe();
  }

  initGlobe() {
    const scale = config.scale.globeScale;

    this.globeMaterial = this.createGlobeMaterial();
    this.globe = new THREE.Mesh(this.geometry, this.globeMaterial);
    this.globe.scale.set(scale, scale, scale);

    // Set initial opacity to 0 for fade-in effect
    if (this.globeMaterial instanceof THREE.ShaderMaterial) {
      this.globeMaterial.transparent = true;
      this.globeMaterial.uniforms.opacity = { value: 0 };
    }

    elements.globe = this.globe;

    groups.map = new THREE.Group();
    groups.map.name = "Map";

    groups.map.add(this.globe);
    groups.globe!.add(groups.map);

    const atmosphere = this.createAtmosphere();

    elements.atmosphere = atmosphere; // Store reference to atmosphere
    groups.globe!.add(atmosphere);
  }

  createAtmosphere() {
    const atmosphereGeometry = new THREE.SphereGeometry(this.radius, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: shaders.atmosphere.vertexShader,
      fragmentShader: shaders.atmosphere.fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      side: THREE.BackSide,
      uniforms: {
        opacity: { value: 0 },
      },
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

    atmosphere.scale.set(1.1, 1.1, 1.1);

    return atmosphere;
  }

  createGlobeMaterial() {
    // Create a simple texture for the globe
    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;

    // Create a gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

    gradient.addColorStop(0, "#001122");
    gradient.addColorStop(0.5, "#003366");
    gradient.addColorStop(1, "#001122");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.ShaderMaterial({
      uniforms: {
        globeTexture: { value: texture },
        opacity: { value: 0 },
      },
      vertexShader: shaders.globe.vertexShader,
      fragmentShader: shaders.globe.fragmentShader,
      transparent: true,
    });
  }
}
