import googleBadge from "../images/icons/google.png";
import teltonikaBadge from "../images/icons/Teltonika.png";
import ktuBadge from "../images/icons/ktu.png";
import ktuGiftedBadge from "../images/icons/ktugift.png";
import fidiBadge from "../images/icons/Fidi.png";
import ORBadge from "../images/icons/OR.png";
import VUBadge from "../images/icons/VU.png";
import makerspaceBadge from "../images/icons/makerspace.png";
import ignasImage from "../images/members/ignas.png";
import simonasImage from "../images/members/simonas.png";
import migleImage from "../images/members/migle.png";
import dominykasImage from "../images/members/dominykas.jpg";
import dominykaslImage from "../images/members/dominykasl.png";
import juliusImage from "../images/members/julius.png";

export const teamMembers = [
  {
    name: "Simonas Aukštuolis",
    role: "Electrical Engineer, Material Scientist, Chemistry & 3D Modeling Specialist",
    email: "simonas.aukstuolis@gmail.com",
    image: simonasImage,
    social: {
      facebook: "https://www.facebook.com/simonas.aukstuolis",
      linkedin:
        "https://www.linkedin.com/in/simonas-auk%C5%A1tuolis-13768a283/",
    },
    badges: [
      {
        label: "Kaunas Makerspace",
        image: makerspaceBadge,
        link: "https://makerspace.lt/",
      },
      {
        label: "KTU - Automation and Control Engineering",
        image: ktuBadge,
        link: "https://stojantiesiems.ktu.edu/programme/b-automatika-ir-valdymas/",
      },
    ],
    description:
      "Simonas is a versatile and highly skilled engineer with a deep, practical understanding of multiple scientific and technical disciplines. Simonas expertise spans the complex realms of chemistry, electricity, and mechanics, which he masterfully apply to create impressive and diverse inventions.",
    skills: [
      "CNC machining",
      "Propulsion Systems",
      "Aerodynamics",
      "3D Modeling (Fusion 360, AutoCAD)",
      "Chemistry",
      "Electrical Engineering",
      "Material Science",
    ],
    personalProjects: [
      {
        name: "10 kW Tesla Coil",
      },
      {
        name: "X-Ray Imaging Machine",
      },
      {
        name: "11 kW Two Stroke Bicycle",
      },
      {
        name: "e-Bike",
      },
      {
        name: "Self-made 3D Printer",
      },
      {
        name: "Smart Fridge",
        link: "https://drive.google.com/drive/folders/1Rx6soLrsUmhCqM45BhdIxT6KlD43HZLu",
      },
    ],
  },
  {
    name: "Ignas Mikolaitis",
    role: "Software Engineer, Mechatronics, Robotics & AI/ML Specialist",
    email: "mikolaitis.ignas@gmail.com",
    image: ignasImage,
    social: {
      website: "https://ignuxas.com/",
      linkedin: "https://www.linkedin.com/in/ignas-mikolaitis-501782267/",
      github: "https://github.com/ignuxas",
      facebook: "https://www.facebook.com/ignuxas/",
    },
    badges: [
      {
        label: "Google",
        image: googleBadge,
        link: "https://bughunters.google.com/leaderboard/honorable-mentions",
      },
      {
        label: "Teltonika Networks",
        image: teltonikaBadge,
        link: "https://teltonika-networks.com/",
      },
      {
        label: "Kaunas Makerspace",
        image: makerspaceBadge,
        link: "https://makerspace.lt/",
      },
      {
        label: "KTU - Informatics Engineering",
        image: ktuBadge,
        link: "https://admissions.ktu.edu/programme/b-informatics-engineering/",
      },
    ],
    description:
      "Ignas is a self-taught software engineer based in Kaunas, Lithuania, studying Computer Science & Cyber Security Engineering at KTU. Passionate about tech, coding, robotics, and innovative projects. Is an official Google Awardee Experienced in full-stack web development, cyber-security, AI and robotics.",
    skills: [
      "Software Engineering",
      "Full-Stack Development",
      "Robotics",
      "IoT",
      "Embedded Systems",
      "Cyber Security",
      "AI/ML",
      "Databases",
    ],
    personalProjects: [
      {
        name: "Mini Smart Fridge (IoT Project)",
      },
      {
        name: "Edullectus (AI Education Platform)",
        link: "https://edullectus.com/",
      },
      {
        name: "Armilla (E-commerce Prototype)",
        link: "https://armilla.ignuxas.com/",
      },
      {
        name: "Lawcare (AI Legal Assistant)",
        link: "https://lawcare.lt/",
      },
      {
        name: "Nukes n' shit (Urban Exploration Website)",
        link: "https://nukestore.vercel.app/",
      },
    ],
  },
  {
    name: "Miglė Cirtautaitė",
    role: "Atmospheric Scientist, Technical Writer",
    email: "migle.cirtautaite@gmail.com",
    image: migleImage,
    social: {
      linkedin: "https://www.linkedin.com/in/migle-cirtautaite/",
      github: "https://github.com/cmigle",
    },
    badges: [
      {
        label: "Kaunas Makerspace",
        image: makerspaceBadge,
        link: "https://makerspace.lt/",
      },
      {
        label: "KTU GIFTed",
        image: ktuGiftedBadge,
        link: "https://students.ktu.edu/ed-programmes/gifted/",
      },
    ],
    description:
      "Miglė is a technical writer, programmer, and a gifted KTU student. Her programming skills (scripting, code structures) provide a practical edge, enabling her to bridge technical concepts and contribute to innovative projects.",
    skills: [
      "Technical Writing & Documentation",
      "Programming",
      "Client Communication",
      "Research",
      "Data Analysis",
    ],
    personalProjects: [],
  },
  {
    name: "Dominykas Mačiulaitis",
    role: "Physicist, Programmer, Electronics Engineer",
    email: "dominykas.maciulaitis1@gmail.com",
    image: dominykasImage,
    social: {
      linkedin:
        "https://www.linkedin.com/in/dominykas-ma%C4%8Diulaitis-651a18263/",
      github: "https://github.com/Persejas",
      twitter: "", // No Twitter
      website: "", // No personal website
    },
    badges: [
      {
        label: "FIDI - Fiziko diena",
        image: fidiBadge,
        link: "https://fidi.lt/",
      },
      {
        label: "Open readings",
        image: ORBadge,
        link: "https://openreadings.eu/",
      },
      {
        label: "Kaunas Makerspace",
        image: makerspaceBadge,
        link: "https://makerspace.lt/",
      },
      {
        label: "Vilnius University",
        image: VUBadge,
        link: "https://www.vu.lt/en/",
      },
    ],

    description:
      "Dominykas is a bright physicist whose technical foundation was solidified by graduating from the Junior Computer Science School. Dominykas is a skillful engineer, possessing a notable talent for hands-on projects involving electricity.",
    skills: [
      "Electrical Engineering",
      "C++",
      "Data Analysis",
      "Python",
      "SOLIDWORKS",
      "robotics",
      "3D modeling",
    ],
    personalProjects: [],
  },
  {
    name: "Julius Barauskas",
    role: "Manufacturing, IT & Robotics Specialist",
    email: "jbarauskas0@gmail.com",
    image: juliusImage,
    social: {
      facebook: "https://www.facebook.com/julius.hg.9",
    },
    badges: [
      {
        label: "Kaunas Makerspace",
        image: makerspaceBadge,
        link: "https://makerspace.lt/",
      },
      {
        label: "KTU - Software Engineering",
        image: ktuBadge,
        link: "https://admissions.ktu.edu/programme/b-software-engineering/",
      },
    ],
    description:
      "Julius Barauskas is a dynamic and multifaceted specialist with expertise spanning Manufacturing, IT, and Robotics. His diverse skill set and hands-on experience make him a valuable asset in any technical environment.",
    skills: [
      "CNC machining",
      "3D Modeling (Fusion 360)",
      "Electrical Engineering",
      "Software Engineering",
      "Robotics",
      "IoT",
      "Embedded Systems",
    ],
  },
  {
    name: "Dominykas Leknickas",
    role: "3D Modeling & Mechanics Specialist",
    email: "dominykasleknickas@gmail.com",
    image: dominykaslImage,
    social: {
      facebook: "https://www.facebook.com/dominykas.leknickas",
    },
    badges: [
      {
        label: "KTU",
        image: ktuBadge,
        link: "https://admissions.ktu.edu/programme/b-software-engineering/",
      },
    ],
    description:
      "Dominykas Leknickas is a talented 3D modeling and mechanics specialist with a strong background in engineering. His hands-on experience and creative approach make him a valuable asset to any project.",
    skills: [
      "3D Modeling (Fusion 360, AutoCad)",
      "Mechanics",
      "Material Science",
      "3D Printing",
    ],
  },
];
