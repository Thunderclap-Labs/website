import { StaticImageData } from "next/image";

import dronewireframe from "@/components/images/dronewireframe.png";
import rockettop from "@/components/images/rockettop.png";
import conveyorwireframe from "@/components/images/conveyorwireframe.png";
import cansatwireframe from "@/components/images/cansatwireframe.png";
import dryerwireframe from "@/components/images/dryerwireframe.png";
import ballmill from "@/components/images/ballmill.png";

export interface FocusArea {
  title: string;
  description: string;
  image: StaticImageData;
}

export interface TimelineItem {
  title: string;
  description: string;
}

export interface StatData {
  value: string;
  title: string;
  description: string;
}

export interface ManufacturingFeature {
  image: StaticImageData;
  title: string;
  description: string;
}

export const focusAreas: FocusArea[] = [
  {
    title: "Advanced Atmospheric Technologies",
    description:
      "Innovating atmospheric modification techniques to enhance weather predictability and management.",
    image: dronewireframe,
  },
  {
    title: "Aerospace Systems & Propulsion",
    description:
      "Creating cutting-edge propulsion systems for efficient and sustainable space travel.",
    image: rockettop,
  },
  {
    title: "Proprietary Rocket Fuel & Chemical Synthesis",
    description:
      "Developing and manufacturing our own advanced rocket fuels and conducting novel chemistry experiments for aerospace applications.",
    image: conveyorwireframe,
  },
  {
    title: "Next-Generation Satellite Systems",
    description:
      "Developing advanced satellite constellations for global coverage and real-time data analytics.",
    image: cansatwireframe,
  },
];

export const propulsionTimelineItems: TimelineItem[] = [
  {
    title: "Advanced Propellant Technologies",
    description:
      "Researching high-performance, eco-friendly propellants for increased efficiency and reduced environmental impact.",
  },
  {
    title: "Sustainable Manufacturing",
    description:
      "Developing eco-conscious manufacturing processes and minimizing environmental impact of launch activities.",
  },
  {
    title: "AI-Driven Launch Operations",
    description:
      "Autonomous systems for pre-flight checks, trajectory optimization, and in-flight anomaly detection.",
  },
  {
    title: "Rapid Reusability",
    description:
      "Designing for quick turnaround and refurbishment, significantly lowering launch costs.",
  },
  {
    title: "Next-Gen Avionics & Control",
    description:
      "Developing sophisticated, fault-tolerant avionics for precise control and real-time data telemetry.",
  },
];

export const statsData: StatData[] = [
  {
    value: "5+",
    title: "Valued Partners",
    description: "Trusted by industry leaders and government bodies.",
  },
  {
    value: "7",
    title: "Industry Experts",
    description: "A dedicated team of the best and brightest minds.",
  },
  {
    value: "∞",
    title: "Infinite Passion",
    description: "Fueled by a relentless drive for innovation.",
  },
];

export const manufacturingFeatures: ManufacturingFeature[] = [
  {
    image: dryerwireframe,
    title: "Material Dryer",
    description:
      "Efficiently dries a wide range of materials, ensuring optimal moisture content for further processing, currently being used for our propellant production.",
  },
  {
    image: conveyorwireframe,
    title: "Precision Screw Conveyor",
    description:
      "A robust, zero-tolerance screw conveyor engineered from standard components for reliable, high-quality material transport.",
  },
  {
    image: ballmill,
    title: "Planetary Ball Mill",
    description:
      "Ultra-fine milling system capable of reducing materials to particle sizes as small as 50μm for advanced applications.",
  },
];
