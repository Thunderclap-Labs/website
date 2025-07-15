import * as THREE from 'three';
import { Country } from './types';
import { Marker } from './Marker';
import { Dot } from './Dot';

// Configuration
export const config = {
  urls: {
    globeTexture: '/assets/textures/earth_dark.jpg',
    pointTexture: '/assets/imgs/disc.png'
  },
  sizes: {
    globe: 200,
    globeDotSize: 2
  },
  scale: {
    points: 0.025,
    markers: 0.025,
    globeScale: 1
  },
  rotation: {
    globe: 0.001
  },
  colors: {
    globeDotColor: 'rgb(203, 168, 0)',
    globeMarkerColor: 'rgb(143, 216, 216)',
    globeMarkerGlow: 'rgb(255, 255, 255)',
    globeLines: 'rgb(255, 255, 255)',
    globeLinesDots: 'rgb(255, 255, 255)'
  },
  display: {
    points: true,
    map: true,
    lines: true,
    markers: true,
    markerLabel: true,
    markerPoint: true
  },
  dots: {
    total: 30
  }
};

// Global state
export const elements = {
  globe: null as THREE.Mesh | null,
  atmosphere: null as THREE.Mesh | null,
  globePoints: null as THREE.Points | null,
  lineDots: [] as Dot[],
  markers: [] as Marker[],
  markerLabel: [] as THREE.Sprite[],
  markerPoint: [] as THREE.Mesh[],
  lines: [] as THREE.Line[]
};

export const groups = {
  map: null as THREE.Group | null,
  main: null as THREE.Group | null,
  globe: null as THREE.Group | null,
  lines: null as THREE.Group | null,
  points: null as THREE.Group | null,
  markers: null as THREE.Group | null,
  atmosphere: null as THREE.Group | null,
  lineDots: null as THREE.Group | null,
};

export const countries = {
  interval: 5000,
  selected: null as THREE.Group | null,
  index: 0
};

export const animations = {
  rotateGlobe: true
};

// Sample data
export const sampleCountries: Country[] = [
  { name: 'New York', latitude: '40.7128', longitude: '-74.0060' },
  { name: 'London', latitude: '51.5074', longitude: '-0.1278' },
  { name: 'Tokyo', latitude: '35.6762', longitude: '139.6503' },
  { name: 'Sydney', latitude: '-33.8688', longitude: '151.2093' },
  { name: 'Moscow', latitude: '55.7558', longitude: '37.6176' },
];

export const sampleConnections = {
  'New York': [
    { name: 'London', latitude: '51.5074', longitude: '-0.1278' },
    { name: 'Tokyo', latitude: '35.6762', longitude: '139.6503' },
  ],
  'London': [
    { name: 'Moscow', latitude: '55.7558', longitude: '37.6176' },
    { name: 'Sydney', latitude: '-33.8688', longitude: '151.2093' },
  ],
  'Tokyo': [
    { name: 'Sydney', latitude: '-33.8688', longitude: '151.2093' },
    { name: 'New York', latitude: '40.7128', longitude: '-74.0060' },
  ]
};