"use client";

import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

// Helper Functions (commonly used in canvas animations)
const TAU = Math.PI * 2;
const rand = (max: number) => Math.random() * max;
const randRange = (range: number) => (Math.random() - 0.5) * range * 2; // Returns a value between -range and +range
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m;

  return Math.abs(((t + hm) % m) - hm) / hm;
};

const particleCount = 300;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 100; // Initial Y range for particles around center - will be changed in initParticle
const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 0.001; // Slower base speed
const rangeSpeed = 0.6; // Reduced range for speed variation
const baseRadius = 1;
const rangeRadius = 4;
const baseHue = 220; // Blue
const rangeHue = 100; // Spread towards magenta/purple
const noiseSteps = 6; // Smoother, more flowing paths
const xOff = 0.001; // Larger noise features for broader paths
const yOff = 0.001; // Larger noise features for broader paths
const zOff = 0.0005;
const backgroundColor = "rgba(0, 0, 0, 1)"; // Opaque black background

interface CanvasState {
  a: HTMLCanvasElement | null; // Drawing canvas
  b: HTMLCanvasElement | null; // Display canvas
}

interface CanvasContextState {
  a: CanvasRenderingContext2D | null;
  b: CanvasRenderingContext2D | null;
}

export const Swirl: React.FC<{ className?: string }> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasState>({ a: null, b: null });
  const ctxRef = useRef<CanvasContextState>({ a: null, b: null });
  const centerRef = useRef<[number, number]>([0, 0]);
  const particlePropsRef = useRef<Float32Array | null>(null);
  const simplexRef = useRef<ReturnType<typeof createNoise3D> | null>(null);
  const tickRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const initParticle = (
    i: number,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    if (!particlePropsRef.current || !centerRef.current) return;

    let x, y, vx, vy, life, ttl, speed, radius, hue;

    x = rand(canvasWidth);
    y = rand(canvasHeight); // Particles distributed over full height
    vx = 0;
    vy = 0;
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    speed = baseSpeed + rand(rangeSpeed);
    radius = baseRadius + rand(rangeRadius);
    hue = baseHue + rand(rangeHue);

    particlePropsRef.current.set(
      [x, y, vx, vy, life, ttl, speed, radius, hue],
      i,
    );
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number, // Changed: start and end points for line
    life: number,
    ttl: number,
    radius: number,
    hue: number,
  ) => {
    if (!ctxRef.current.a) return;
    const ctxA = ctxRef.current.a;

    ctxA.save();
    ctxA.lineCap = "round";
    ctxA.lineWidth = radius;
    ctxA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctxA.beginPath();
    ctxA.moveTo(x, y);
    ctxA.lineTo(x2, y2);
    ctxA.stroke();
    ctxA.closePath();
    ctxA.restore();
  };

  const checkBounds = (x: number, y: number, width: number, height: number) => {
    return x > width || x < 0 || y > height || y < 0;
  };

  const updateParticle = (
    i: number,
    canvasWidth: number,
    canvasHeight: number,
  ) => {
    if (!particlePropsRef.current || !simplexRef.current || !ctxRef.current.a)
      return;

    const props = particlePropsRef.current;
    const simplex = simplexRef.current;

    const i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i,
      i9 = 8 + i;
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

    x = props[i];
    y = props[i2];
    n = simplex(x * xOff, y * yOff, tickRef.current * zOff) * noiseSteps * TAU;
    vx = lerp(props[i3], Math.cos(n), 0.5);
    vy = lerp(props[i4], Math.sin(n), 0.5);
    life = props[i5];
    ttl = props[i6];
    speed = props[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = props[i8];
    hue = props[i9];

    // Draw particle as a line from its old position (x,y) to new position (x2, y2)
    drawParticle(x, y, x2, y2, life, ttl, radius, hue);

    life++;

    props[i] = x2;
    props[i2] = y2;
    props[i3] = vx;
    props[i4] = vy;
    props[i5] = life;

    if (checkBounds(x, y, canvasWidth, canvasHeight) || life > ttl) {
      initParticle(i, canvasWidth, canvasHeight);
    }
  };

  const drawParticles = (canvasWidth: number, canvasHeight: number) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, canvasWidth, canvasHeight);
    }
  };

  const renderGlow = () => {
    if (!ctxRef.current.b || !canvasRef.current.a) return;
    const ctxB = ctxRef.current.b;
    const canvasA = canvasRef.current.a;

    ctxB.save();
    ctxB.filter = "blur(8px) brightness(200%)"; // Updated blur and brightness
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();

    ctxB.save();
    ctxB.filter = "blur(4px) brightness(200%)"; // Updated blur and brightness
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();
  };

  const renderToScreen = () => {
    if (!ctxRef.current.b || !canvasRef.current.a) return;
    const ctxB = ctxRef.current.b;
    const canvasA = canvasRef.current.a;

    ctxB.save();
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();
  };

  const draw = () => {
    if (
      !canvasRef.current.a ||
      !canvasRef.current.b ||
      !ctxRef.current.a ||
      !ctxRef.current.b
    ) {
      animationFrameIdRef.current = requestAnimationFrame(draw);

      return;
    }

    tickRef.current++;
    const canvasA = canvasRef.current.a;
    const canvasB = canvasRef.current.b;
    const ctxA = ctxRef.current.a;
    const ctxB = ctxRef.current.b;

    // Clear ctxA completely in each frame
    ctxA.clearRect(0, 0, canvasA.width, canvasA.height);

    // Clear ctxB with its background color (now opaque)
    ctxB.fillStyle = backgroundColor;
    ctxB.fillRect(0, 0, canvasB.width, canvasB.height);

    drawParticles(canvasA.width, canvasA.height);
    renderGlow();
    renderToScreen();

    animationFrameIdRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    simplexRef.current = createNoise3D();
    particlePropsRef.current = new Float32Array(particlePropsLength);

    canvasRef.current.a = document.createElement("canvas");
    canvasRef.current.b = document.createElement("canvas");

    const canvasA = canvasRef.current.a;
    const canvasB = canvasRef.current.b;

    canvasB.style.position = "absolute";
    canvasB.style.top = "0";
    canvasB.style.left = "0";
    canvasB.style.width = "100%";
    canvasB.style.height = "100%";
    container.appendChild(canvasB);

    ctxRef.current.a = canvasA.getContext("2d");
    ctxRef.current.b = canvasB.getContext("2d");

    const resizeHandler = () => {
      if (
        !container ||
        !canvasRef.current.a ||
        !canvasRef.current.b ||
        !ctxRef.current.a ||
        !ctxRef.current.b
      )
        return;

      const { clientWidth: width, clientHeight: height } = container;

      canvasRef.current.a.width = width;
      canvasRef.current.a.height = height;
      ctxRef.current.a.drawImage(canvasRef.current.b, 0, 0);

      canvasRef.current.b.width = width;
      canvasRef.current.b.height = height;
      ctxRef.current.b.drawImage(canvasRef.current.a, 0, 0);

      centerRef.current = [0.5 * width, 0.5 * height];

      if (particlePropsRef.current) {
        for (let i = 0; i < particlePropsLength; i += particlePropCount) {
          initParticle(i, width, height);
        }
      }
    };

    resizeHandler(); // Initial size and particle init

    window.addEventListener("resize", resizeHandler);
    animationFrameIdRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (
        canvasRef.current.b &&
        containerRef.current &&
        containerRef.current.contains(canvasRef.current.b)
      ) {
        containerRef.current.removeChild(canvasRef.current.b);
      }
      canvasRef.current = { a: null, b: null };
      ctxRef.current = { a: null, b: null };
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};
