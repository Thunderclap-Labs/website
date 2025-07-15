import * as THREE from 'three';
import { config, elements, groups } from './config';
import { Country } from './types';
import { toSphereCoordinates } from './utils';
import { Marker } from './Marker';

export class Markers {
  countries: Country[];
  radius: number;
  markerGeometry: THREE.SphereGeometry;
  markerMaterial: THREE.MeshBasicMaterial;

  constructor(countries: Country[]) {
    this.countries = countries;
    this.radius = config.sizes.globe + config.sizes.globe * config.scale.markers;

    groups.markers = new THREE.Group();
    groups.markers.name = 'GlobeMarkers';

    this.markerGeometry = new THREE.SphereGeometry(2, 15, 15);
    this.markerMaterial = new THREE.MeshBasicMaterial();
    this.markerMaterial.transparent = true;
    this.markerMaterial.opacity = 0.8;

    this.create();
  }

  create() {
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.latitude && country.longitude) {
        const lat = +country.latitude;
        const lng = +country.longitude;
        const cords = toSphereCoordinates(lat, lng, this.radius);
        const marker = new Marker(this.markerMaterial, this.markerGeometry, country.name, cords);
        elements.markers.push(marker);
      }
    }
  }
}
