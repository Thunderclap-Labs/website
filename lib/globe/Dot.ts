import * as THREE from "three";

import { config, countries } from "./config";

export class Dot {
  radius: number;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  _path: THREE.Vector3[] | null;
  _pathIndex: number;
  isStatic: boolean;

  constructor(isStatic = false) {
    this.radius = config.sizes.globeLineDotSize;
    this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    this.material = new THREE.MeshBasicMaterial({
      color: config.colors.globeLinesDots,
    });
    this.material.transparent = true;
    this.material.opacity = 0.65;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.visible = false;

    this._path = null;
    this._pathIndex = 0;
    this.isStatic = isStatic;
  }

  assignToLine() {
    if (countries.selected) {
      const lines = countries.selected.children;

      if (lines.length > 0) {
        const index = Math.floor(Math.random() * lines.length);
        const line = lines[index];

        this._path = (line as any)._path;

        if (this.isStatic && this._path) {
          const { x, y, z } = this._path[0];

          this.mesh.position.set(x, y, z);
          this.mesh.visible = true;
        }
      }
    }
  }

  animate() {
    if (this.isStatic) {
      return;
    }
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
