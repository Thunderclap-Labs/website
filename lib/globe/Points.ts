import * as THREE from 'three';
import { config, elements, groups } from './config';
import { GridPoint } from './types';
import { toSphereCoordinates } from './utils';

export class Points {
  grid: GridPoint[];
  total: number;
  radius: number;
  sizeArray: number[];
  positionArray: number[];
  colorsArray: number[];
  points!: THREE.Points;
  geometry!: THREE.BufferGeometry;
  material!: THREE.PointsMaterial;

  constructor(grid: GridPoint[]) {
    this.grid = grid || [];
    this.total = grid?.length || 0;
    this.radius = config.sizes.globe + config.sizes.globe * config.scale.points;
    
    this.sizeArray = [];
    this.positionArray = [];
    this.colorsArray = [];

    groups.points = new THREE.Group();
    groups.points.name = 'Points';

    this.create();
    elements.globePoints = this.points;
    groups.points.add(this.points);
  }

  create() {
    const color = new THREE.Color();

    for (let i = 0; i < this.grid.length; i++) {
      const { lat, lon } = this.grid[i];
      const { x, y, z } = toSphereCoordinates(lat, lon, this.radius);
      
      this.positionArray.push(-x, -y, -z);
      this.sizeArray.push(2);

      color.set(config.colors.globeDotColor);
      color.toArray(this.colorsArray, i * 3);
    }

    const positions = new Float32Array(this.positionArray);
    const colors = new Float32Array(this.colorsArray);
    const sizes = new Float32Array(this.sizeArray);

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      color: config.colors.globeDotColor,
      size: config.sizes.globeDotSize
    });

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
    this.points = new THREE.Points(this.geometry, this.material);
  }
}
