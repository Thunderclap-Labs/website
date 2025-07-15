import * as THREE from 'three';
import { config } from './config';
import { Country } from './types';
import { getSplineFromCoords } from './utils';

export class Line {
  start: Country;
  end: Country;
  radius: number;
  curve!: THREE.CubicBezierCurve3;
  geometry!: THREE.BufferGeometry;
  material!: THREE.LineBasicMaterial;
  mesh!: THREE.Line;

  constructor(start: Country, end: Country) {
    this.start = start;
    this.end = end;
    this.radius = config.sizes.globe + config.sizes.globe * config.scale.markers;
    
    this.curve = this.createCurve();
    this.geometry = new THREE.BufferGeometry();
    const points = this.curve.getPoints(50);
    this.geometry.setFromPoints(points);
    
    this.material = new THREE.LineBasicMaterial({
      color: config.colors.globeLines,
      transparent: true,
      opacity: 0.45
    });

    this.mesh = new THREE.Line(this.geometry, this.material);
    (this.mesh as any)._path = points;
  }

  createCurve() {
    const { start, end, mid1, mid2 } = getSplineFromCoords(
      +this.start.latitude,
      +this.start.longitude,
      +this.end.latitude,
      +this.end.longitude,
      this.radius
    );

    return new THREE.CubicBezierCurve3(start, mid1, mid2, end);
  }
}
