import conveyorwireframe from "@/components/images/conveyorwireframe.png";
import dronewireframe from "@/components/images/dronewireframe.png";
import cloudseeding from "../images/cloudseeding.png"
import fridge from "../images/fridge.jpg";
import cansat from "../images/cansat.png";
import fuel from "../images/fuel.png";
import lanedetection from "../images/lanedetection.png";

import { StaticImageData } from "next/image";

export interface Project {
    id: string;
    name: string;
    description: string;
    link?: string;
    active: boolean;
    tags: string[];
    teamMembers: string[];
    startDate?: string;
    status: 'Active' | 'Completed' | 'On Hold';
    categories: ('Aerospace' | 'Drone Technology' | 'Software' | 'Hardware' | 'Research' | 'AI' | 'Rocket Technology')[];
    image?: StaticImageData; // Add image field
}

export const projects: Project[] = [
    {
        id:'rocketfuel',
        name: 'Rocket Fuel Development',
        description: 'Research and development of advanced rocket fuel technologies to enhance propulsion systems with focus on eco-friendly and high-performance compounds.',
        link: '',
        active: true,
        tags: ['Aerospace Engineering', 'Chemistry', 'Materials Science', 'Propulsion'],
        teamMembers: ['Simonas Aukštuolis'],
        startDate: '2024-01',
        status: 'Active',
        image: fuel,
        categories: ['Aerospace', 'Research'],
    },
    {
        id: 'rocketfuelautomation',
        name: 'Rocket Fuel Automation',
        description: 'Development of automated systems for rocket fuel production and testing, including quality control and safety monitoring.',
        link: '',
        active: true,
        tags: ['Automation', 'Industrial IoT', 'Safety Systems', 'Quality Control', 'Electronics'],
        teamMembers: ['Simonas Aukštuolis', 'Ignas Mikolaitis', 'Miglė Cirtautaitė'],
        startDate: '2024-02',
        status: 'Active',
        categories: ['Hardware', 'Software', 'Research'],
        image: conveyorwireframe
    },
    {
        id: 'fullselfdriving',
        name: 'Full Self-Driving Algorithm',
        description: 'Development of advanced algorithms for autonomous driving systems using computer vision and machine learning.',
        link: '',
        active: true,
        tags: ['AI', 'Machine Learning', 'Computer Vision', 'Autonomous Systems', 'Software Development'],
        teamMembers: ['Ignas Mikolaitis', 'Miglė Cirtautaitė'],
        startDate: '2024-01',
        status: 'Active',
        categories: ['Software', 'Research'],
        image: lanedetection
    },
    {
        id: 'dronedetection',
        name: 'Drone Detection System',
        description: 'Creation of a sophisticated drone detection system using advanced sensors, radar technology, and AI-powered recognition algorithms.',
        link: '',
        active: true,
        tags: ['AI', 'Computer Vision', 'Radar Technology', 'Defense Systems', 'Electronics'],
        teamMembers: ['Ignas Mikolaitis', 'Simonas Aukštuolis', 'Miglė Cirtautaitė'],
        startDate: '2023-11',
        status: 'Active',
        categories: ['Drone Technology', 'Software', 'Hardware'],
    },
    {
        id: 'thunderbee',
        name: 'Thunderbee Drone Interceptor',
        description: 'EUDIS hackathon winner - A drone project focused on developing advanced UAV interception technologies for defense applications.',
        link: 'https://www.facebook.com/StartupSpace/posts/pfbid02mLauF3Y4Hw9NvUvJfX7XYknY64QBvZZXeirur3b2MbcnL2nDdnpww7FwD7yrvq5Vl?rdid=39SG0WNmrs4JbR1J#',
        active: true,
        tags: ['Drone Technology', '3D Modeling', 'Defense Systems', 'AI', 'Electronics', 'Rapid Prototyping'],
        teamMembers: ['Ignas Mikolaitis', 'Simonas Aukštuolis'],
        startDate: '2023-10',
        status: 'Active',
        image: dronewireframe,
        categories: ['Drone Technology', 'Hardware', 'Software'],
    },
    {
        id: 'cloudseeding',
        name: 'Cloud Seeding',
        description: 'Research and development of cloud seeding technologies to enhance precipitation using drone and rocket-based delivery systems.',
        link: '',
        active: true,
        tags: ['Aerospace Engineering', 'Weather Modification', 'Atmospheric Science', 'Drone Technology'],
        teamMembers: ['Ignas Mikolaitis', 'Simonas Aukštuolis'],
        startDate: '2024-01',
        status: 'Active',
        image: cloudseeding,
        categories: ['Research', 'Aerospace', 'Drone Technology'],
    },
    {
        id: 'website',
        name: 'Website',
        description: 'A comprehensive responsive website for Thunderclap Labs featuring modern design, interactive elements, and project showcases.',
        link: 'https://thunderclaplabs.com/',
        active: true,
        tags: ['Web Development', 'React', 'TypeScript', 'UI/UX Design', 'Next.js'],
        teamMembers: ['Ignas Mikolaitis'],
        startDate: '2024-01',
        status: 'Active',
        categories: ['Software']
    },
    {
        id: 'cansat1',
        name: 'Thunderclap Cansat v1 (Satellite Project)',
        description: 'A miniature satellite project designed to demonstrate the principles of space technology and engineering with telemetry systems.',
        link: 'https://www.youtube.com/watch?v=AwtJzvZ51m0',
        active: false,
        tags: ['Aerospace Engineering', 'Satellite Technology', 'Telemetry', 'Electronics', '3D Modeling'],
        teamMembers: ['Ignas Mikolaitis', 'Simonas Aukštuolis', 'Dominykas Mačiulaitis'],
        startDate: '2023-06',
        image: cansat,
        status: 'Completed',
        categories: ['Aerospace', 'Hardware', 'Software']
    }
];


