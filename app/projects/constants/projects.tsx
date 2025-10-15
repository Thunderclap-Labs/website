import { StaticImageData } from "next/image";

import cloudseeding from "../images/cloudseeding.png";
import fwd from "../images/fwd.png";
import cansat from "../images/cansat.png";
import dronedetection from "../images/dronedetection.png";
import cansatinz from "../images/cansatinz.jpg";
import cansatwireframe from "../images/cansatwireframe.png";
import cansatweb from "../images/cansatweb.png";
import dryer1 from "../images/dryer1.jpg";
import dryer2 from "../images/dryer2.jpg";
import dryer3 from "../images/dryer3.jpg";
import rocket1 from "../images/rocket1.jpg";
import rocket2 from "../images/rocket2.jpg";
import rocket3 from "../images/rocket3.jpg";
import cloudseeding2 from "../images/cloudseeding2.png";
import cloudseeding3 from "../images/cloudseeding3.png";
import cloudseeding4 from "../images/cloudseeding4.png";
import drone1 from "../images/drone1.png";
import drone2 from "../images/drone2.png";
import drone3 from "../images/drone3.jpg";

import conveyorwireframe from "@/components/images/conveyorwireframe.png";
import dronewireframe from "@/components/images/dronewireframe.png";

export interface Partner {
  name: string;
  link?: string;
}

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
  image?: StaticImageData;
  featured?: boolean;
  galleryImages?: { src: StaticImageData; alt: string }[];
  partners?: string[];
}

const availablePartners: Partner[] = [
  { name: "KTU Startup Space", link: "https://startupspace.lt" },
  { name: "Lithuanian Armed Forces" },
  { name: "Kaunas Makerspace" },
  { name: "Defense Innovation Unit" },
  { name: "ESA BIC Lithuania" },
  { name: "Vilnius Tech Park" },
  { name: "Baltic Aerospace" },
  { name: "NATO Innovation Hub" },
  { name: "European Space Agency" },
  { name: "Lithuanian Space Association" },
];

export const projects: Project[] = [
  {
    id: "cloudseeding",
    name: "Cloud Seeding",
    description:
      "This project explores <strong>innovative weather modification techniques</strong> through advanced cloud seeding. We are developing and testing:<br/><br/>• <em>Drone-based systems</em> for precise delivery of seeding agents<br/>• <em>Rocket-based systems</em> for atmospheric layer targeting<br/>• <em>Atmospheric science applications</em><br/><br/>Our aim is to create effective solutions for <strong>enhancing precipitation, combating drought, and managing water resources</strong>.",
    link: undefined,
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
      "Dovydas Jusevičius",
    ],
    startDate: "2025-05",
    status: "Active",
    image: cloudseeding,
    categories: ["Hardware", "Aerospace", "Chemistry", "Software"],
    featured: true,
    galleryImages: [
      { src: cloudseeding2, alt: "Cloud Seeding 2" },
      { src: cloudseeding3, alt: "Cloud Seeding 3" },
      { src: cloudseeding4, alt: "Cloud Seeding 4" },
    ],
    partners: ["JLCPCB", "Kaunas Makerspace", "KTU Startup Space"],
  },
  {
    id: "rocketfuelautomation",
    name: "Rocket Fuel Automation",
    description:
      "This project focuses on the <strong>complete automation of rocket fuel production</strong>. We are engineering a sophisticated system that integrates:<br/><br/>• <em>Industrial IoT sensors</em> for real-time monitoring<br/>• <em>Automated quality control checkpoints</em> to ensure fuel consistency<br/>• <em>Redundant safety systems</em> to manage hazardous materials<br/><br/>The goal is to create a scalable, efficient, and safe manufacturing process for next-generation propellants.",
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
      "Dovydas Jusevičius",
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Hardware", "Software", "Research"],
    image: dryer1,
    galleryImages: [
      { src: dryer2, alt: "Rocket Fuel Dryer" },
      { src: conveyorwireframe, alt: "Conveyor" },
      { src: dryer3, alt: "Rocket Fuel Dryer" },
    ],
    partners: ["JLCPCB", "Kaunas Makerspace"],
  },
  {
    id: "rocket",
    name: "Propulsion & Rocket Fuel Development",
    description:
      "Our <strong>flagship rocket development program</strong> involves the end-to-end design, simulation, and manufacturing of advanced, reusable rocket systems. We are pushing the boundaries of aerospace engineering with:<br/><br/>• <em>Innovative propulsion technologies</em><br/>• <em>Lightweight and durable structural components</em><br/>• <em>Sophisticated avionics</em> for precise control and telemetry<br/><br/>This project aims to make space access more <strong>affordable and sustainable</strong>.",
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
      "Dominykas Remeika",
      "Dovydas Jusevičius",
    ],
    startDate: "2024-12",
    status: "Active",
    categories: ["Aerospace", "Research"],
    image: fwd,
    featured: true, // <-- Mark as featured
    galleryImages: [
      { src: rocket1, alt: "Rocket" },
      { src: rocket3, alt: "Rocket" },
      { src: rocket2, alt: "Rocket" },
    ],
  },
  {
    id: "thunderbee",
    name: "Thunderbee Drone Interceptor",
    description:
      "<strong>Winner of the EUDIS hackathon</strong>, the Thunderbee is a state-of-the-art drone interceptor designed for defense and security applications. It combines:<br/><br/>• <em>Rapid prototyping</em> with advanced AI-driven target recognition<br/>• <em>Autonomous flight capabilities</em><br/>• <em>Hardware, software, and AI integration</em><br/><br/>The system is engineered to neutralize aerial threats <strong>swiftly and effectively</strong>.",
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
    image: drone2,
    categories: ["Aerospace", "Hardware", "Software"],
    featured: true, // <-- Mark as featured
    galleryImages: [
      { src: drone3, alt: "Thunderbee Drone" },
      { src: dronewireframe, alt: "Thunderbee" },
      { src: drone1, alt: "Thunderbee Drone" },
    ],
    partners: ["Lithuanian Armed Forces"],
  },
  {
    id: "cansat1",
    name: "Thunderclap Cansat v1 (Satellite Project)",
    description:
      "Our <strong>first foray into satellite technology</strong>, the Cansat v1 was a miniature satellite built to fit inside a standard soda can. This project featured:<br/><br/>• <em>Electronic systems and telemetry</em><br/>• <em>3D-modeled structural design</em><br/>• <em>Successful data transmission</em> during mission<br/><br/>Providing invaluable experience for our <strong>future satellite endeavors</strong>.",
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
    ],
    startDate: "2023-03",
    image: cansat,
    status: "Completed",
    categories: ["Aerospace", "Hardware", "Software"],
    galleryImages: [
      { src: cansatweb, alt: "Cansat Web" },
      { src: cansatwireframe, alt: "Cansat Wireframe" },
      { src: cansatinz, alt: "Cansat v1" },
    ],
  },
  {
    id: "dronedetection",
    name: "Drone Detection",
    description:
      "To counter the growing challenge of <strong>unauthorized drone activity</strong>, we are creating a multi-layered detection system. This project integrates:<br/><br/>• <em>Advanced radar and acoustic sensors</em><br/>• <em>High-resolution optical cameras</em><br/>• <em>AI-powered recognition engine</em><br/><br/>The system identifies, classifies, and tracks multiple drones in <strong>real-time</strong>, providing comprehensive aerial security.",
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
    partners: ["Lithuanian Armed Forces"],
  },
];
