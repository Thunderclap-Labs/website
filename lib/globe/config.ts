import * as THREE from 'three';
import { Country } from './types';
import { Marker } from './Marker';
import { Dot } from './Dot';

// Configuration
export const config = {
  sizes: {
    globe: 200,
    globeDotSize: 2,
    globeLineDotSize: 1,
    globeMarkerSize: 1.6,
    globeMarkerSpecialSize: 2.4
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
    globeDotColor: 'rgb(255, 255, 255)',
    globeMarkerColor: 'rgb(255, 255, 255)',
    globeMarkerAnimatedColor: 'rgb(0, 255, 0)',
    globeMarkerSpecialColor: 'rgb(0, 255, 0)',
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
    total: 30,
    animate: false
  }
};

// Global state
export const elements = {
  globe: null as THREE.Mesh | null,
  innerGlow: null as THREE.Mesh | null,
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

export const animatedCountries: string[] = [];

export const specialCountries: string[] = [
  'Lithuania'
];

// Sample data
export const sampleCountries: Country[] = [
  { name: 'Lithuania', latitude: '54.69', longitude: '25.32' },
  { name: 'Albania', latitude: '41.32', longitude: '19.81' },
  { name: 'Belgium', latitude: '50.85', longitude: '4.35' },
  { name: 'Bulgaria', latitude: '42.69', longitude: '23.32' },
  { name: 'Canada', latitude: '45.42', longitude: '-75.69' },
  { name: 'Croatia', latitude: '45.81', longitude: '15.98' },
  { name: 'Czech Republic', latitude: '50.07', longitude: '14.43' },
  { name: 'Denmark', latitude: '55.67', longitude: '12.56' },
  { name: 'Estonia', latitude: '59.43', longitude: '24.75' },
  { name: 'Finland', latitude: '60.16', longitude: '24.93' },
  { name: 'France', latitude: '48.85', longitude: '2.35' },
  { name: 'Germany', latitude: '52.52', longitude: '13.40' },
  { name: 'Greece', latitude: '37.98', longitude: '23.72' },
  { name: 'Hungary', latitude: '47.49', longitude: '19.04' },
  { name: 'Iceland', latitude: '64.14', longitude: '-21.94' },
  { name: 'Italy', latitude: '41.90', longitude: '12.49' },
  { name: 'Latvia', latitude: '56.94', longitude: '24.10' },
  { name: 'Luxembourg', latitude: '49.61', longitude: '6.13' },
  { name: 'Montenegro', latitude: '42.43', longitude: '19.25' },
  { name: 'Netherlands', latitude: '52.36', longitude: '4.89' },
  { name: 'North Macedonia', latitude: '41.99', longitude: '21.42' },
  { name: 'Norway', latitude: '59.91', longitude: '10.75' },
  { name: 'Poland', latitude: '52.22', longitude: '21.01' },
  { name: 'Portugal', latitude: '38.72', longitude: '-9.13' },
  { name: 'Romania', latitude: '44.42', longitude: '26.10' },
  { name: 'Slovakia', latitude: '48.14', longitude: '17.10' },
  { name: 'Slovenia', latitude: '46.05', longitude: '14.50' },
  { name: 'Spain', latitude: '40.41', longitude: '-3.70' },
  { name: 'Sweden', latitude: '59.32', longitude: '18.06' },
  { name: 'Turkey', latitude: '39.93', longitude: '32.85' },
  { name: 'United Kingdom', latitude: '51.50', longitude: '-0.12' },
  { name: 'United States', latitude: '38.90', longitude: '-77.03' },
];

export const sampleConnections = {
  'Lithuania': [
    { name: 'Albania', latitude: '41.32', longitude: '19.81' },
    { name: 'Belgium', latitude: '50.85', longitude: '4.35' },
    { name: 'Bulgaria', latitude: '42.69', longitude: '23.32' },
    { name: 'Canada', latitude: '45.42', longitude: '-75.69' },
    { name: 'Croatia', latitude: '45.81', longitude: '15.98' },
    { name: 'Czech Republic', latitude: '50.07', longitude: '14.43' },
    { name: 'Denmark', latitude: '55.67', longitude: '12.56' },
    { name: 'Estonia', latitude: '59.43', longitude: '24.75' },
    { name: 'Finland', latitude: '60.16', longitude: '24.93' },
    { name: 'France', latitude: '48.85', longitude: '2.35' },
    { name: 'Germany', latitude: '52.52', longitude: '13.40' },
    { name: 'Greece', latitude: '37.98', longitude: '23.72' },
    { name: 'Hungary', latitude: '47.49', longitude: '19.04' },
    { name: 'Iceland', latitude: '64.14', longitude: '-21.94' },
    { name: 'Italy', latitude: '41.90', longitude: '12.49' },
    { name: 'Latvia', latitude: '56.94', longitude: '24.10' },
    { name: 'Luxembourg', latitude: '49.61', longitude: '6.13' },
    { name: 'Montenegro', latitude: '42.43', longitude: '19.25' },
    { name: 'Netherlands', latitude: '52.36', longitude: '4.89' },
    { name: 'North Macedonia', latitude: '41.99', longitude: '21.42' },
    { name: 'Norway', latitude: '59.91', longitude: '10.75' },
    { name: 'Poland', latitude: '52.22', longitude: '21.01' },
    { name: 'Portugal', latitude: '38.72', longitude: '-9.13' },
    { name: 'Romania', latitude: '44.42', longitude: '26.10' },
    { name: 'Slovakia', latitude: '48.14', longitude: '17.10' },
    { name: 'Slovenia', latitude: '46.05', longitude: '14.50' },
    { name: 'Spain', latitude: '40.41', longitude: '-3.70' },
    { name: 'Sweden', latitude: '59.32', longitude: '18.06' },
    { name: 'Turkey', latitude: '39.93', longitude: '32.85' },
    { name: 'United Kingdom', latitude: '51.50', longitude: '-0.12' },
    { name: 'United States', latitude: '38.90', longitude: '-77.03' },
  ],
};