import { StaticImageData } from "next/image";

import cloudseeding from "../images/cloudseeding.png";
import fwd from "../images/fwd.png";
import cansat from "../images/cansat.png";
import fuel from "../images/fuel.png";
import lanedetection from "../images/lanedetection.png";
import dronedetection from "../images/dronedetection.png";

import dronewireframe from "@/components/images/dronewireframe.png";
import conveyorwireframe from "@/components/images/conveyorwireframe.png";

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
  active: boolean;
  tags: string[];
  teamMembers: string[];
  startDate?: string;
  status: "Active" | "Completed" | "On Hold";
  categories: (
    | "Aerospace"
    | "Software"
    | "Hardware"
    | "Research"
    | "Chemistry"
    | "AI"
  )[];
  image?: StaticImageData; // Add image field
  featured?: boolean; // Add featured flag
}

export const projects: Project[] = [
  {
    id: "rocketfuelautomation",
    name: "Rocket Fuel Automation",
    description:
      "Development of automated systems for rocket fuel production and testing, including quality control and safety monitoring.",
    link: "",
    active: true,
    tags: [
      "Automation",
      "Industrial IoT",
      "Safety Systems",
      "Quality Control",
      "Electronics",
    ],
    teamMembers: [
      "Simonas Aukštuolis",
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika",
      "Dominykas Leknickas",
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Hardware", "Software", "Research"],
    image: conveyorwireframe,
  },
  {
    id: "rocket",
    name: "Rocket Development",
    description:
      "Design and development of advanced rocket systems, including propulsion, avionics, and structural components.",
    link: "",
    active: true,
    tags: [
      "Aerospace Engineering",
      "Rocket Tech",
      "Propulsion Systems",
      "Avionics",
      "Structural Design",
    ],
    teamMembers: [
      "Simonas Aukštuolis",
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika"
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Aerospace", "Research"],
    image: fwd,
    featured: true, // <-- Mark as featured
  },
  {
    id: "rocketfuel",
    name: "Rocket Fuel Development",
    description:
      "Research and development of advanced rocket fuel technologies to enhance propulsion systems with focus on eco-friendly and high-performance compounds.",
    link: "",
    active: true,
    tags: [
      "Aerospace Engineering",
      "Chemistry",
      "Materials Science",
      "Propulsion",
    ],
    teamMembers: ["Simonas Aukštuolis"],
    startDate: "2024-12",
    status: "Active",
    image: fuel,
    categories: ["Aerospace", "Research", "Chemistry"],
  },
  {
    id: "thunderbee",
    name: "Thunderbee Drone Interceptor",
    description:
      "EUDIS hackathon winner - A drone project focused on developing advanced UAV interception technologies for defense applications.",
    link: "https://www.facebook.com/StartupSpace/posts/pfbid02mLauF3Y4Hw9NvUvJfX7XYknY64QBvZZXeirur3b2MbcnL2nDdnpww7FwD7yrvq5Vl?rdid=39SG0WNmrs4JbR1J#",
    active: true,
    tags: [
      "Drone Technology",
      "3D Modeling",
      "Defense Systems",
      "AI",
      "Electronics",
      "Rapid Prototyping",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Miglė Cirtautaitė",
    ],
    startDate: "2025-05",
    status: "Active",
    image: dronewireframe,
    categories: ["Aerospace", "Hardware", "Software"],
    featured: true, // <-- Mark as featured
  },
  {
    id: "cloudseeding",
    name: "Cloud Seeding",
    description:
      "Research and development of cloud seeding technologies to enhance precipitation using drone and rocket-based delivery systems.",
    link: "",
    active: true,
    tags: [
      "Aerospace Engineering",
      "Weather Modification",
      "Atmospheric Science",
      "Drone Technology",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Miglė Cirtautaitė",
      "Julius Barauskas",
      "Dominykas Remeika",
    ],
    startDate: "2025-05",
    status: "Active",
    image: cloudseeding,
    categories: ["Research", "Aerospace"],
        featured: true,
  },
  {
    id: "cansat1",
    name: "Thunderclap Cansat v1 (Satellite Project)",
    description:
      "A miniature satellite project designed to demonstrate the principles of space technology and engineering with telemetry systems.",
    link: "https://www.youtube.com/watch?v=AwtJzvZ51m0",
    active: false,
    tags: [
      "Aerospace Engineering",
      "Satellite Technology",
      "Telemetry",
      "Electronics",
      "3D Modeling",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Dominykas Mačiulaitis",
      "Dominykas Leknickas",
    ],
    startDate: "2023-03",
    image: cansat,
    status: "Completed",
    categories: ["Aerospace", "Hardware", "Software"],
  },
  {
    id: "dronedetection",
    name: "Drone Detection System",
    description:
      "Creation of a sophisticated drone detection system using advanced sensors, radar technology, and AI-powered recognition algorithms.",
    link: "",
    active: true,
    tags: [
      "AI",
      "Computer Vision",
      "Radar Technology",
      "Defense Systems",
      "Electronics",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Simonas Aukštuolis",
      "Miglė Cirtautaitė",
    ],
    startDate: "2025-05",
    status: "Active",
    image: dronedetection,
    categories: ["AI", "Software"],
  },
  {
    id: "fullselfdriving",
    name: "Full Self-Driving Algorithm",
    description:
      "Development of advanced algorithms for autonomous driving systems using computer vision and machine learning.",
    link: "",
    active: true,
    tags: [
      "AI",
      "Machine Learning",
      "Computer Vision",
      "Autonomous Systems",
      "Software Development",
    ],
    teamMembers: [
      "Ignas Mikolaitis",
      "Miglė Cirtautaitė",
      "Dominykas Mačiulaitis",
    ],
    startDate: "2025-06",
    status: "Active",
    categories: ["AI", "Software", "Research"],
    image: lanedetection,
  },
];
