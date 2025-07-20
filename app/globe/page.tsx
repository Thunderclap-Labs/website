'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { App } from '@/lib/globe/App';
import { Globe } from '@/lib/globe/Globe';
import { Points } from '@/lib/globe/Points';
import { Markers } from '@/lib/globe/Markers';
import { Lines } from '@/lib/globe/Lines';
import { config, elements, groups, animations, sampleCountries } from '@/lib/globe/config';
import grid from '@/components/globe/data/grid.json';

// Main component
export default function GlobePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(animations.rotateGlobe);
  const [display, setDisplay] = useState(config.display);

  useEffect(() => {
    if (!containerRef.current) return;

    const setup = async (app: App) => {
      app.camera.position.z = config.sizes.globe * 2.85;
      app.camera.position.y = config.sizes.globe * 0;
      app.camera.updateProjectionMatrix();

      groups.main = new THREE.Group();
      groups.main.name = 'Main';

      const globe = new Globe();
      groups.main.add(globe as any);

      // Fetch country data and create points
      try {
        const countriesData = grid;
        new Points(countriesData);
        if (groups.points) {
          groups.globe!.add(groups.points);
        }
      } catch (error) {
        console.error("Failed to load country data for points:", error);
      }

      const markers = new Markers(sampleCountries);
      groups.globe!.add(groups.markers!);

      const lines = new Lines();
      app.lines = lines;
      groups.globe!.add(groups.lines!);

      app.scene.add(groups.main);
      setIsLoading(false);
    };

    const animate = (app: App) => {
      // Update points
      if (elements.globePoints) {
        (elements.globePoints.material as THREE.PointsMaterial).size = config.sizes.globeDotSize;
        (elements.globePoints.material as THREE.PointsMaterial).color.set(config.colors.globeDotColor);
      }

      // Update globe scale
      if (elements.globe) {
        elements.globe.scale.set(
          config.scale.globeScale,
          config.scale.globeScale,
          config.scale.globeScale
        );
      }

      // Update line dots
      if (elements.lineDots) {
        for (let i = 0; i < elements.lineDots.length; i++) {
          const dot = elements.lineDots[i];
          dot.material.color.set(config.colors.globeLinesDots);
          dot.animate();
        }
      }

      // Update markers
      /*if (elements.markers) {
        for (let i = 0; i < elements.markers.length; i++) {
          const marker = elements.markers[i];
          marker.animateGlow();
        }
      }*/

      // Update lines
      if (elements.lines) {
        for (let i = 0; i < elements.lines.length; i++) {
          const line = elements.lines[i];
          (line.material as THREE.LineBasicMaterial).color.set(config.colors.globeLines);
        }
      }

      // Auto-rotate globe
      if (animations.rotateGlobe && groups.globe) {
        groups.globe.rotation.y -= config.rotation.globe;
      }

      // Update visibility
      if (groups.map) groups.map.visible = config.display.map;
      if (groups.markers) groups.markers.visible = config.display.markers;
      if (groups.points) groups.points.visible = config.display.points;
      if (groups.lines) groups.lines.visible = config.display.lines;

      // Update marker labels and points
      for (let i = 0; i < elements.markerLabel.length; i++) {
        const label = elements.markerLabel[i];
        label.visible = config.display.markerLabel;
      }

      for (let i = 0; i < elements.markerPoint.length; i++) {
        const point = elements.markerPoint[i];
        point.visible = config.display.markerPoint;
      }
    };

    const lithuania = sampleCountries.find(c => c.name === 'Lithuania');
    const initialRotationX = lithuania ? (+lithuania.latitude * Math.PI / 180) - 0.4 : 0;
    const initialRotationY = lithuania ? (-lithuania.longitude * Math.PI / 180) - 0.6: 0;

    const app = new App({ setup, animate, initialRotationX, initialRotationY });
    appRef.current = app;
    
    app.init(containerRef.current);

    const handleResize = () => {
      app.handleResize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (appRef.current) {
        appRef.current.destroy();
        if (appRef.current.renderer) {
          appRef.current.renderer.dispose();
          appRef.current.renderer.forceContextLoss();
        }
        if (containerRef.current && appRef.current.renderer) {
          containerRef.current.removeChild(appRef.current.renderer.domElement);
        }
        appRef.current = null;
      }
    };
  }, []);

  const toggleRotation = () => {
    animations.rotateGlobe = !animations.rotateGlobe;
    setRotation(animations.rotateGlobe);
  };

  const toggleDisplay = (key: keyof typeof config.display) => {
    config.display[key] = !config.display[key];
    setDisplay({ ...config.display });
  };

  return (
    <div ref={containerRef} />
  );
}