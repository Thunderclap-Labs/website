import * as THREE from 'three';
import { config, elements, groups, animatedCountries, specialCountries } from './config';
import { Country } from './types';
import { toSphereCoordinates } from './utils';
import { Marker } from './Marker';

export class Markers {
  countries: Country[];
  radius: number;
  markerGeometry: THREE.SphereGeometry;
  markerSpecialGeometry: THREE.SphereGeometry;
  markerMaterial: THREE.MeshBasicMaterial;

  constructor(countries: Country[]) {
    this.countries = countries;
    this.radius = config.sizes.globe + config.sizes.globe * config.scale.markers;

    groups.markers = new THREE.Group();
    groups.markers.name = 'GlobeMarkers';

    this.markerGeometry = new THREE.SphereGeometry(config.sizes.globeMarkerSize, 12, 12);
    this.markerSpecialGeometry = new THREE.SphereGeometry(config.sizes.globeMarkerSpecialSize, 12, 12);
    this.markerMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.8
    });


    this.create();
  }

  create() {
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.latitude && country.longitude) {
        const lat = +country.latitude;
        const lng = +country.longitude;
        const cords = toSphereCoordinates(lat, lng, this.radius);
        const isAnimated = animatedCountries.includes(country.name);
        const isSpecial = specialCountries.includes(country.name);
        const marker = new Marker(this.markerMaterial, this.markerGeometry, this.markerSpecialGeometry, country.name, cords, isAnimated, isSpecial);
        elements.markers.push(marker);
      }
    }
  }
}
