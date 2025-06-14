"use client";

import React, { useEffect, useRef } from "react";

const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

interface Star {
  x: number;
  y: number;
  z: number;
}

interface Velocity {
  x: number;
  y: number;
  tx: number;
  ty: number;
  z: number;
}

const MovingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const pointerXRef = useRef<number | null>(null);
  const pointerYRef = useRef<number | null>(null);
  const velocityRef = useRef<Velocity>({ x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 });
  const touchInputRef = useRef<boolean>(false);

  const scaleRef = useRef<number>(1);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);
  const STAR_COUNT = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const context = canvas.getContext("2d");

    if (!context) return;

    const generate = () => {
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT.current; i++) {
        starsRef.current.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    };

    const placeStar = (star: Star) => {
      star.x = Math.random() * widthRef.current;
      star.y = Math.random() * heightRef.current;
    };

    const recycleStar = (star: Star) => {
      let direction = "z";
      const vx = Math.abs(velocityRef.current.x);
      const vy = Math.abs(velocityRef.current.y);

      if (vx > 1 || vy > 1) {
        let axis;

        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }
        if (axis === "h") {
          direction = velocityRef.current.x > 0 ? "l" : "r";
        } else {
          direction = velocityRef.current.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * widthRef.current;
        star.y = Math.random() * heightRef.current;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === "r") {
        star.x = widthRef.current + OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === "t") {
        star.x = widthRef.current * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = widthRef.current * Math.random();
        star.y = heightRef.current + OVERFLOW_THRESHOLD;
      }
    };

    const resize = () => {
      scaleRef.current = window.devicePixelRatio || 1;
      widthRef.current = window.innerWidth * scaleRef.current;
      heightRef.current = window.innerHeight * scaleRef.current;

      if (canvas) {
        canvas.width = widthRef.current;
        canvas.height = heightRef.current;
      }

      STAR_COUNT.current = (window.innerWidth + window.innerHeight) / 8;
      generate(); // Regenerate stars if count changes significantly or on first load
      starsRef.current.forEach(placeStar);
    };

    const update = () => {
      velocityRef.current.tx *= 0.96;
      velocityRef.current.ty *= 0.96;
      velocityRef.current.x +=
        (velocityRef.current.tx - velocityRef.current.x) * 0.8;
      velocityRef.current.y +=
        (velocityRef.current.ty - velocityRef.current.y) * 0.8;

      starsRef.current.forEach((star) => {
        star.x += velocityRef.current.x * star.z;
        star.y += velocityRef.current.y * star.z;
        star.x +=
          (star.x - widthRef.current / 2) * velocityRef.current.z * star.z;
        star.y +=
          (star.y - heightRef.current / 2) * velocityRef.current.z * star.z;
        star.z += velocityRef.current.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > widthRef.current + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > heightRef.current + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    };

    const render = () => {
      if (!context) return;
      context.clearRect(0, 0, widthRef.current, heightRef.current);
      starsRef.current.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scaleRef.current;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;
        context.beginPath();
        context.moveTo(star.x, star.y);
        let tailX = velocityRef.current.x * 2;
        let tailY = velocityRef.current.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    };

    const step = () => {
      update();
      render();
      animationFrameIdRef.current = requestAnimationFrame(step);
    };

    const movePointer = (x: number, y: number) => {
      if (
        typeof pointerXRef.current === "number" &&
        typeof pointerYRef.current === "number"
      ) {
        const ox = x - pointerXRef.current;
        const oy = y - pointerYRef.current;

        velocityRef.current.tx +=
          (ox / 200) * scaleRef.current * (touchInputRef.current ? 1 : -1);
        velocityRef.current.ty +=
          (oy / 200) * scaleRef.current * (touchInputRef.current ? 1 : -1);
      }
      pointerXRef.current = x;
      pointerYRef.current = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      touchInputRef.current = false;
      movePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      touchInputRef.current = true;
      movePointer(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    };

    const onMouseLeave = () => {
      pointerXRef.current = null;
      pointerYRef.current = null;
    };

    resize(); // Initial setup
    step(); // Start animation

    window.addEventListener("resize", resize);
    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("touchmove", onTouchMove, { passive: false });
      canvas.addEventListener("touchend", onMouseLeave); // Also reset on touchend
    }
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      // Cleanup
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("touchmove", onTouchMove);
        canvas.removeEventListener("touchend", onMouseLeave);
      }
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default MovingStars;
