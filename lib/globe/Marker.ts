import * as THREE from 'three';
import { config, elements, groups } from './config';

export class Marker {
  material: THREE.MeshBasicMaterial;
  geometry: THREE.SphereGeometry;
  labelText: string;
  cords: { x: number; y: number; z: number };
  isAnimating: boolean;
  isAnimated: boolean;
  isSpecial: boolean;
  pointColor: THREE.Color;
  glowColor: THREE.Color;
  group: THREE.Group;
  label!: THREE.Sprite;
  point!: THREE.Mesh;
  glow!: THREE.Mesh;

  constructor(material: THREE.MeshBasicMaterial, geometry: THREE.SphereGeometry, specialGeometry: THREE.SphereGeometry, label: string, cords: { x: number; y: number; z: number }, isAnimated = false, isSpecial = false) {
    this.material = material;
    this.geometry = isSpecial ? specialGeometry : geometry;
    this.labelText = label;
    this.cords = cords;
    this.isAnimating = false;
    this.isAnimated = isAnimated;
    this.isSpecial = isSpecial;
    this.pointColor = new THREE.Color(isSpecial ? config.colors.globeMarkerSpecialColor : config.colors.globeMarkerColor);
    this.glowColor = new THREE.Color(config.colors.globeMarkerGlow);
    

    this.group = new THREE.Group();
    this.group.name = 'Marker';

    this.createLabel();
    this.createPoint();
    this.createGlow();
    this.setPosition();

    groups.markers!.add(this.group);
  }

  createLabel() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 128;
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(this.labelText, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;

    const material = new THREE.SpriteMaterial({ map: texture });
    this.label = new THREE.Sprite(material);
    this.label.renderOrder = 1;
    this.label.scale.set(40, 20, 1);
    this.label.center.set(0.25, 0.5);
    this.label.translateY(2);

    this.group.add(this.label);
    elements.markerLabel.push(this.label);
  }

  createPoint() {
    this.point = new THREE.Mesh(this.geometry, this.material.clone());
    (this.point.material as THREE.MeshBasicMaterial).color.set(this.pointColor);
    this.group.add(this.point);
    elements.markerPoint.push(this.point);
  }

  createGlow() {
    this.glow = new THREE.Mesh(this.geometry, this.material.clone());
    //(this.glow.material as THREE.MeshBasicMaterial).color.set(this.glowColor);
    //(this.glow.material as THREE.MeshBasicMaterial).opacity = 0; 
    //this.group.add(this.glow);
    //elements.markerPoint.push(this.glow);
  }

  animateGlow() {
    return;
    if (!this.isAnimated) {
      return;
    }
    if (!this.isAnimating) {
      if (Math.random() > 0.99) {
        this.isAnimating = true;
      }
    } else {
      this.glow.scale.x += 0.025;
      this.glow.scale.y += 0.025;
      this.glow.scale.z += 0.025;
      (this.glow.material as THREE.MeshBasicMaterial).opacity -= 0.005;

      if (this.glow.scale.x >= 4) {
        this.glow.scale.set(1, 1, 1);
        (this.glow.material as THREE.MeshBasicMaterial).opacity = 0.6;
        this.isAnimating = false;
      }
    }
  }

  setPosition() {
    const { x, y, z } = this.cords;
    this.group.position.set(-x, y, -z);
  }
}
