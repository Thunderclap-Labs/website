"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  isActive: boolean;
  delayUntilActive: number; // Time in ms
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number; // Delay before a star (re)appears, in ms
  maxDelay?: number; // Delay before a star (re)appears, in ms
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
  starDensity?: number; // Pixels of container height per star
}

const DEFAULT_STAR_DENSITY = 800; // e.g., 1 star per 150px of height

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 6,
  maxSpeed = 15,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#fff",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
  starDensity = DEFAULT_STAR_DENSITY,
}) => {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const getRandomStartPoint = useCallback(
    (containerWidth: number, containerHeight: number) => {
      if (containerWidth === 0 || containerHeight === 0) {
        return { x: 0, y: 0, angle: 45 };
      }
      const side = Math.floor(Math.random() * 4);
      const offsetRatio = Math.random(); // 0 to 1
      let x, y, angle;

      switch (side) {
        case 0: // Top edge, moving towards bottom-right
          x = offsetRatio * containerWidth;
          y = 0;
          angle = 45; 
          break;
        case 1: // Right edge, moving towards bottom-left
          x = containerWidth;
          y = offsetRatio * containerHeight;
          angle = 135; 
          break;
        case 2: // Bottom edge, moving towards top-left
          x = offsetRatio * containerWidth;
          y = containerHeight;
          angle = 225; 
          break;
        case 3: // Left edge, moving towards top-right
        default:
          x = 0;
          y = offsetRatio * containerHeight;
          angle = 315; 
          break;
      }
      return { x, y, angle };
    },
    []
  );

  useEffect(() => {
    const currentSvgRef = svgRef.current;
    if (!currentSvgRef) return;

    if (typeof window === 'undefined') { // Guard against SSR
        // Optionally set a default size or handle SSR case if needed
        setContainerSize({ width: 0, height: 0 }); // Or some default non-zero if it helps avoid other issues
        return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(currentSvgRef);
    // Initial size
    setContainerSize({
      width: currentSvgRef.clientWidth,
      height: currentSvgRef.clientHeight,
    });

    return () => {
      if (currentSvgRef) {
        resizeObserver.unobserve(currentSvgRef);
      }
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const numStarsToCreate = Math.max(
      1,
      Math.floor(containerSize.height / starDensity)
    );

    setStars((prevStars) => {
      const newStarsArray: ShootingStar[] = [];
      for (let i = 0; i < numStarsToCreate; i++) {
        const initialDelay =
          Math.random() * (maxDelay - minDelay) + minDelay;
        if (prevStars[i] && prevStars[i].id) {
          // Try to reuse existing star objects if array size changes
          const { x, y, angle } = getRandomStartPoint(
            containerSize.width,
            containerSize.height
          );
          newStarsArray.push({
            ...prevStars[i],
            x,
            y,
            angle, // Reset position and angle
            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            scale: 1,
            distance: 0,
            isActive: false, // Start inactive
            delayUntilActive: initialDelay,
          });
        } else {
          const { x, y, angle } = getRandomStartPoint(
            containerSize.width,
            containerSize.height
          );
          newStarsArray.push({
            id: Date.now() + i + Math.random(), // More unique ID
            x,
            y,
            angle,
            speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
            scale: 1,
            distance: 0,
            isActive: false,
            delayUntilActive: initialDelay,
          });
        }
      }
      return newStarsArray;
    });
  }, [
    containerSize,
    starDensity,
    minSpeed,
    maxSpeed,
    minDelay,
    maxDelay,
    getRandomStartPoint,
  ]);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    let animationFrameId: number;
    const lastFrameTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime; // Typically around 16.6ms for 60FPS

      setStars((prevStars) =>
        prevStars.map((star) => {
          if (!star.isActive) {
            const newDelay = star.delayUntilActive - deltaTime;
            if (newDelay <= 0) {
              const { x, y, angle } = getRandomStartPoint(
                containerSize.width,
                containerSize.height
              );
              return {
                ...star,
                x,
                y,
                angle,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                scale: 1,
                distance: 0,
                isActive: true,
                delayUntilActive: 0,
              };
            }
            return { ...star, delayUntilActive: newDelay };
          }

          const newX =
            star.x +
            star.speed *
              Math.cos((star.angle * Math.PI) / 180) *
              (deltaTime / 16.66); // Normalize speed to ~60fps
          const newY =
            star.y +
            star.speed *
              Math.sin((star.angle * Math.PI) / 180) *
              (deltaTime / 16.66);
          const newDistance = star.distance + star.speed * (deltaTime / 16.66);
          const newScale = 1 + newDistance / 200; // Adjust scaling factor as needed

          const buffer = starWidth * newScale * 1.5; // Buffer to ensure it's fully off-screen
          if (
            newX < -buffer ||
            newX > containerSize.width + buffer ||
            newY < -buffer ||
            newY > containerSize.height + buffer
          ) {
            return {
              ...star,
              isActive: false,
              delayUntilActive: Math.random() * (maxDelay - minDelay) + minDelay,
            };
          }
          return { ...star, x: newX, y: newY, scale: newScale, distance: newDistance };
        })
      );
      // lastFrameTime = currentTime; // This should be outside setStars to avoid stale closure
      animationFrameId = requestAnimationFrame(animate);
    };

    // Correct way to update lastFrameTime for requestAnimationFrame loop
    let frameTime = performance.now();
    const loop = (currentTime: number) => {
      const deltaTime = currentTime - frameTime;
      frameTime = currentTime;
      // Call the main animation logic with deltaTime
      setStars((prevStars) =>
        prevStars.map((star) => {
          if (!star.isActive) {
            const newDelay = star.delayUntilActive - deltaTime;
            if (newDelay <= 0) {
              const { x, y, angle } = getRandomStartPoint(
                containerSize.width,
                containerSize.height
              );
              return {
                ...star,
                x,
                y,
                angle,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                scale: 1,
                distance: 0,
                isActive: true,
                delayUntilActive: 0,
              };
            }
            return { ...star, delayUntilActive: newDelay };
          }

          const normalizedDeltaTimeFactor = deltaTime / (1000 / 60); // Factor relative to 60 FPS frame time
          const newX =
            star.x +
            star.speed * Math.cos((star.angle * Math.PI) / 180) *
              normalizedDeltaTimeFactor;
          const newY =
            star.y +
            star.speed * Math.sin((star.angle * Math.PI) / 180) *
              normalizedDeltaTimeFactor;
          const newDistance = star.distance + star.speed * normalizedDeltaTimeFactor;
          const newScale = 1 + newDistance / 200;

          const buffer = starWidth * newScale * 1.5;
          if (
            newX < -buffer ||
            newX > containerSize.width + buffer ||
            newY < -buffer ||
            newY > containerSize.height + buffer
          ) {
            return {
              ...star,
              isActive: false,
              delayUntilActive: Math.random() * (maxDelay - minDelay) + minDelay,
            };
          }
          return { ...star, x: newX, y: newY, scale: newScale, distance: newDistance };
        })
      );
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [
    containerSize,
    minSpeed,
    maxSpeed,
    minDelay,
    maxDelay,
    starWidth,
    getRandomStartPoint,
  ]);

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0 pointer-events-none", className)} // Added pointer-events-none
    >
      <defs>
        <linearGradient
          id="shooting-star-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          {" "}
          {/* Adjusted gradient for horizontal trail */}
          <stop
            offset="0%"
            style={{ stopColor: trailColor, stopOpacity: 0 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      {stars
        .filter((star) => star.isActive)
        .map((star) => (
          <rect
            key={star.id}
            x={star.x}
            y={star.y - starHeight / 2} // Center the trail vertically
            width={starWidth * star.scale} // This is the length of the trail
            height={starHeight} // This is the thickness of the trail
            fill="url(#shooting-star-gradient)"
            transform={`rotate(${star.angle}, ${star.x}, ${star.y})`} // Rotate around the star's actual point
          />
        ))}
    </svg>
  );
};
