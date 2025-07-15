import * as THREE from 'three';
import { config, elements, groups } from './config';
import { shaders } from './shaders';

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
    groups.globe.name = 'Globe';

    this.initGlobe();
    return groups.globe as any;
  }

  initGlobe() {
    const scale = config.scale.globeScale;
    this.globeMaterial = this.createGlobeMaterial();
    this.globe = new THREE.Mesh(this.geometry, this.globeMaterial);
    this.globe.scale.set(scale, scale, scale);
    elements.globe = this.globe;
    
    groups.map = new THREE.Group();
    groups.map.name = 'Map';

    groups.map.add(this.globe);
    groups.globe!.add(groups.map);
  }

  createGlobeMaterial() {
    // Create a simple texture for the globe
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Create a gradient
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(0.5, '#003366');
    gradient.addColorStop(1, '#001122');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise for texture
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 50;
      data[i] += noise;     // Red
      data[i + 1] += noise; // Green
      data[i + 2] += noise; // Blue
    }
    context.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);

    return new THREE.ShaderMaterial({
      uniforms: { texture: { value: texture } },
      vertexShader: shaders.globe.vertexShader,
      fragmentShader: shaders.globe.fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });
  }
}
