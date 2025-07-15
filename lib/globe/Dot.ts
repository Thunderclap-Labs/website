import * as THREE from 'three';
import { config, countries } from './config';

export class Dot {
  radius: number;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  _path: THREE.Vector3[] | null;
  _pathIndex: number;

  constructor() {
    this.radius = 2;
    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial({ color: config.colors.globeLinesDots });
    this.material.transparent = true;
    this.material.opacity = 0.65;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.visible = false;

    this._path = null;
    this._pathIndex = 0;
  }

  assignToLine() {
    if (countries.selected) {
      const lines = countries.selected.children;
      if (lines.length > 0) {
        const index = Math.floor(Math.random() * lines.length);
        const line = lines[index];
        this._path = (line as any)._path;
      }
    }
  }

  animate() {
    if (!this._path) {
      if (Math.random() > 0.99) {
        this.assignToLine();
        this._pathIndex = 0;
      }
    } else if (this._path && this._pathIndex < this._path.length - 1) {
      if (!this.mesh.visible) {
        this.mesh.visible = true;
      }

      const { x, y, z } = this._path[this._pathIndex];
      this.mesh.position.set(x, y, z);
      this._pathIndex++;
    } else {
      this.mesh.visible = false;
      this._path = null;
    }
  }
}
