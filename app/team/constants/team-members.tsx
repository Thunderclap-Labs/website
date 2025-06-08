import googleBadge from "../images/icons/google.png"
import teltonikaBadge from "../images/icons/Teltonika.png"
import ktuBadge from "../images/icons/ktu.png"
import ktuGiftedBadge from "../images/icons/ktugift.png"

export const teamMembers = [
    {
        name: 'Simonas Aukštuolis',
        role: 'Lead Electrical Engineer, Material Scientist, Chemistry & 3D Modeling Specialist',
        email: 'test@example.com',
        phone: '+1234567890',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', // Placeholder image
        social: {
            linkedin: 'https://www.linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe',
            website: 'https://johndoe.com',
        },
        badges: [],
        description: 'Simonas is the lead engineer with expertise in materials science, chemistry, and 3D modeling. He is passionate about developing innovative materials and solutions.',
        skills: ['Propulsion Systems', 'Aerodynamics', '3D Modeling (Fusion 360)', 'Chemistry', 'Electrical Engineering', 'Material Science'],
        projects: [
            "Project A",
            "Project B",
            "Project C"
        ]
    },
    {
        name: 'Ignas Mikolaitis',
        role: 'Software Engineer, Robotics & AI/ML Specialist',
        email: 'mikolaitis.ignas@gmail.com',
        phone: '+1987654321', // Kept existing as no new info provided
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', // Kept existing placeholder
        social: {
            linkedin: 'https://www.linkedin.com/in/ignas-mikolaitis-501782267/', // No specific LinkedIn provided in the new text
            github: 'https://github.com/ignuxas', // No specific GitHub profile provided
            website: 'https://ignuxas.com/', // No specific personal website provided
        },
        badges: [
            {
                label: "Google",
                image: googleBadge,
                link: "https://bughunters.google.com/leaderboard/honorable-mentions"
            },
            {
                label: "Teltonika Networks",
                image: teltonikaBadge,
                link: "https://teltonika-networks.com/"
            },
            {
                label: "KTU",
                image: ktuBadge,
                link: "https://admissions.ktu.edu/programme/b-informatics-engineering/"
            }
        ],
        description: "Ignas is a self-taught software engineer based in Kaunas, Lithuania, studying Computer Science & Cyber Security Engineering at KTU. Passionate about tech, coding, robotics, and innovative projects. Is an official Google Awardee Experienced in full-stack web development, cyber-security, AI and robotics.",
        skills: [
            'Python', 'JavaScript', 'React.js', 'Vue.js', 'Node.js', 'Next.js', 'PHP', 'SQL', 'noSQL', 
            'GraphQL', 'MongoDB', 'HTML', 'CSS', 'Tailwind CSS', 'C#', 'C++', 'Rust', 'Unity', 
            'PyTorch', 'Tensorflow', 'Blender', 'Fusion 360', 'Cyber Security', 'Robotics', 'AI/ML', 
            'Full-Stack Development', 'Git', 'Linux', 'AWS', 'Serverless', 'Prisma', 'SupaBase', 
            'Jira', 'PocketBase', 'Tauri', 'OpenCV', 'Arduino'
        ],
        projects: [
            "Thunderclap Cansat v1 (Satellite Project)",
            "Mini Smart Fridge (IoT Project)",
            "Edullectus (AI Education Platform)",
            "Armilla (E-commerce Prototype)",
            "Lawcare (AI Legal Assistant)",
            "Nukes n' shit (Urban Exploration Website)",
        ]
    },
    {
        name: 'Miglė Cirtautaitė',
        role: 'Atmospheric Scientist, Technical Writer',
        email: 'bob.johnson@example.com',
        phone: '+1122334455',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png', // Placeholder image
        social: {
            linkedin: 'https://www.linkedin.com/in/bobjohnson',
            github: 'https://github.com/bobjohnson',
            twitter: '', // No Twitter
            website: '', // No personal website
        },
        badges: [
            {
                label: "KTU GIFTed",
                image: ktuGiftedBadge,
                link: "https://students.ktu.edu/ed-programmes/gifted/"
            },
        ],
        description: 'MEKAS PEKAS MIAU',
        skills: ['Meteorology', 'Climate Modeling', 'Data Analysis', 'Python', 'GIS'],
        projects: [
            "Cloud Seeding Optimization",
            "Atmospheric Data Platform"
        ]
    },
];


