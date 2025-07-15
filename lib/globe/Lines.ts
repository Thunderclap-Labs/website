import * as THREE from 'three';
import { config, countries, elements, groups, sampleConnections, sampleCountries } from './config';
import { Dot } from './Dot';
import { Line } from './Line';

export class Lines {
  countryNames: string[];
  total: number;
  group: THREE.Group;
  interval: NodeJS.Timeout | null;

  constructor() {
    this.countryNames = Object.keys(sampleConnections);
    this.total = this.countryNames.length;
    this.interval = null;

    this.group = groups.lines = new THREE.Group();
    this.group.name = 'Lines';

    this.create();
    this.animate();
    this.createDots();
  }

  changeCountry() {
    countries.index++;
    if (countries.index >= this.total) {
      countries.index = 0;
    }

    if (countries.selected) {
      countries.selected.visible = false;
    }

    this.select();
    this.createDots();
  }

  createDots() {
    // Clear existing dots
    if (groups.lineDots) {
      groups.lineDots.clear();
      elements.lineDots = [];
    }

    groups.lineDots = new THREE.Group();
    groups.lineDots.name = 'LineDots';

    for (let i = 0; i < config.dots.total; i++) {
      const dot = new Dot();
      groups.lineDots.add(dot.mesh);
      elements.lineDots.push(dot);
    }

    if (groups.globe) {
      groups.globe.add(groups.lineDots);
    }
  }

  animate() {
    if (!countries.selected) {
      this.select();
    }

    this.interval = setInterval(() => this.changeCountry(), countries.interval);
  }

  select() {
    const next = this.countryNames[countries.index];
    const selected = groups.lines!.getObjectByName(next);
    countries.selected = selected as THREE.Group;
    if (countries.selected) {
      countries.selected.visible = true;
    }
  }

  create() {
    for (const countryName in sampleConnections) {
      const start = sampleCountries.find(c => c.name === countryName);
      if (!start) continue;

      const group = new THREE.Group();
      group.name = countryName;

      const connections = sampleConnections[countryName as keyof typeof sampleConnections];
      for (const end of connections) {
        const line = new Line(start, end);
        elements.lines.push(line.mesh);
        group.add(line.mesh);
      }

      group.visible = false;
      groups.lines!.add(group);
    }
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
