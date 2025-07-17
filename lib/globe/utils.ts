import * as THREE from 'three';

export function toSphereCoordinates(lat: number, lng: number, scale: number) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (180 - lng) * Math.PI / 180;
  const x = scale * Math.sin(phi) * Math.cos(theta);
  const y = scale * Math.cos(phi);
  const z = scale * Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
}

export function coordinateToPosition(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (180 - lng) * Math.PI / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.sin(theta)
  );
}

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : (num >= max ? max : num);
}

export function getSplineFromCoords(latitudeA: number, longitudeA: number, latitudeB: number, longitudeB: number, size: number) {
  const start = coordinateToPosition(latitudeA, longitudeA, size);
  const end = coordinateToPosition(latitudeB, longitudeB, size);
  
  const CURVE_MIN_ALTITUDE = 20;
  const CURVE_MAX_ALTITUDE = 200;
  const altitude = clamp(start.distanceTo(end) * 0.45, CURVE_MIN_ALTITUDE, CURVE_MAX_ALTITUDE);
  
  // Simple interpolation for mid points
  const midLat = (latitudeA + latitudeB) / 2;
  const midLon = (longitudeA + longitudeB) / 2;
  
  const mid1 = coordinateToPosition(midLat, midLon, size + altitude * 0.5);
  const mid2 = coordinateToPosition(midLat, midLon, size + altitude);

  return { start, end, mid1, mid2 };
}
