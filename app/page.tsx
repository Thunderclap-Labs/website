"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { useEffect } from 'react'; 
import * as THREE from 'three'; 
import Image from "next/image";

import ltarmedforces from "../components/images/ltarmedforces.png";
import ktustartupspace from "../components/images/ktustartupspace.png";
import pcbway from "../components/images/pcbway.png";
import fwd from "../components/images/fwd.png";
import thunderbee from "../components/images/thunderbee.png";
import cloudseeding from "../components/images/cloudseeding.png";

import "./styles/hero.css"

// Constants for globe and satellites
const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 100; // km (visual size)

export default function Home() {
  useEffect(() => {
    const globeVizElement = document.getElementById('globeViz');

    if (!globeVizElement) {
      console.error("Globe container 'globeViz' not found.");
      return;
    }

    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;

      import('globe.gl').then(globeModule => {
        const GlobeGl = globeModule.default; 
        // It seems GlobeGl might be a factory or class.
        // Assuming `new GlobeGl()` and then `instance(element)` or `new GlobeGl({ domElement: element })`
        // or if GlobeGl is the globe function itself: `GlobeGl()(globeVizElement)`
        // The original code `const Globe = new GlobeGl(globeVizElement);` is kept if it works.
        // For safety, let's try the common pattern:
        const Globe = GlobeGl(); // Get the factory/constructor
        Globe(globeVizElement) // Initialize with the element
          .globeImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/2560px-The_earth_at_night.jpg")
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');

        Globe.pointOfView({ lat: 30, lng: 26, altitude: 2.3 }); 

        Globe.controls().autoRotate = true;
        Globe.controls().autoRotateSpeed = 0.2; 
        Globe.controls().enableZoom = false; 

        if (isMobile) {
          //make it so only half of the globe is visible on mobile
          Globe.scene().position.x = 125; // Adjust position to show only half the globe
          Globe.scene().position.y = 25;


          Globe.controls().enableRotate = false; // Disable manual rotation on mobile
          Globe.controls().enablePan = false;    // Disable panning on mobile
        } else {}

      }).catch(error => {
        console.error("Failed to load globe.gl module", error);
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about-us-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative -top-16">
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden bg-black">
        <div className="relative mx-6 h-[calc(100vh-170px)] w-full rounded-xl overflow-hidden">
          <div id="globeViz" className="absolute -top-20 -left-10 z-0" />
          {/* Globe container */}
          <div className="z-10 flex h-full items-center justify-center"> {/* Added flex items-center justify-center */}
            <div id="Title" className="flex flex-col items-center justify-center drop-shadow-sm ">
              <span className='main text-4xl'>THUNDERCLAP</span>
              <p className='sub text-md'>LABS</p>
            </div>
          </div>
        </div>
        <div className="absolute top-[50%] left-0">
          <div className="bg-white h-1/2 w-6"></div>
        </div>
        {/* Scroll Down Mouse Icon */}
        <div 
          className="absolute bottom-28 left-1/2 -translate-x-1/2 cursor-pointer z-20 group opacity-0 animate-fade-in-delayed" // Added opacity-0 and animate-fade-in-delayed
          onClick={handleScrollDown}
          title="Scroll to learn more"
        >
          <div className="w-[30px] h-[50px] border-2 border-neutral-400 group-hover:border-white rounded-full relative transition-colors duration-300">
            <div className="w-1.5 h-1.5 bg-neutral-400 group-hover:bg-white rounded-full absolute top-[8px] left-1/2 -translate-x-1/2 animate-mouse-wheel transition-colors duration-300"></div>
          </div>
        </div>
        <div className="absolute bottom-4 mx-6 left-0 right-0 flex justify-center items-center p-4">
          <div className="flex justify-evenly w-full gap-4 opacity-40">
            <div className="flex items-center justify-center max-w-48">
              <Image src={ktustartupspace} alt="KTU Startup Space" height={30}/>
            </div>
            <div className="flex items-center justify-center max-w-48">
              <Image src={ltarmedforces} alt="LT Armed Forces" height={30}/>
            </div>
            <div className="flex items-center justify-center max-w-48">
              <Image src={pcbway} alt="PCBWay" height={30}/>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us-section" className="py-20 bg-neutral-900 text-neutral-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Engineering the Future of Atmospheric and Aerospace Systems</h2>
            <p className="text-lg md:text-xl text-neutral-300">
              Thunderclap Labs is at the forefront of innovation, developing critical technologies to solve complex global challenges. We build the platforms and systems that will define the next era of atmospheric management, aerospace capability, and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-400">Our Mission</h3>
              <p className="text-neutral-300 mb-4">
                We are committed to pioneering solutions that enhance global stability, environmental resilience, and technological advancement. From advanced satellite constellations and atmospheric modification techniques to cutting-edge aerospace components, our work is designed to provide actionable intelligence and impactful interventions.
              </p>
              <p className="text-neutral-300">
                Our interdisciplinary team of scientists and engineers thrives on tackling the hardest problems, transforming ambitious ideas into operational realities.
              </p>
            </div>
            <div>
              {/* You could add an image or a more specific graphic here if desired */}
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
                <h4 className="text-xl font-semibold mb-3 text-neutral-100">Core Focus Areas:</h4>
                <ul className="list-disc list-inside space-y-2 text-neutral-300">
                  <li>Next-Generation Satellite Systems</li>
                  <li>Advanced Atmospheric Technologies</li>
                  <li>Aerospace Systems & Propulsion</li>
                  <li>Atmospheric Data Analytics & Prediction</li>
                  <li>Rapid Aerospace Prototyping</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 text-center">
            <p className="text-xl text-neutral-300 mb-6">
              Discover the technologies shaping tomorrow.
            </p>
            <Button
              as={Link}
              href="/projects"
              className={`border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg px-8 py-3`}
            >
              Explore Our Projects
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-black text-neutral-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400">Next-Generation Propulsion & Launch Systems</h2>
            <p className="text-lg md:text-xl text-neutral-300">
              Thunderclap Labs is redefining access to the skies with our advanced rocket systems. We are developing breakthrough propulsion technologies and highly adaptable launch platforms designed for rapid deployment, increased payload capacity, and unprecedented mission flexibility. Our focus is on creating sustainable and cost-effective solutions for a new era of space exploration and utilization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              {/* Placeholder for an image of a futuristic rocket or launch system */}
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl aspect-video flex items-center justify-center">
                <Image src={fwd} alt="FWD" className="mx-auto rounded-xl overflow-hidden" />
              </div>
            </div>
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Key Innovations:</h3>
              <ul className="list-disc list-inside space-y-3 text-neutral-300">
                <li>
                  <span className="font-semibold text-blue-300">Modular Rocket Architecture:</span> Easily configurable for diverse mission profiles.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Advanced Propellant Technologies:</span> Researching high-performance, eco-friendly propellants for increased efficiency and reduced environmental impact.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">AI-Driven Launch Operations:</span> Autonomous systems for pre-flight checks, trajectory optimization, and in-flight anomaly detection.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Rapid Reusability:</span> Designing for quick turnaround and refurbishment, significantly lowering launch costs.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">On-Orbit Servicing & Manufacturing Capabilities:</span> Developing systems that can support future aerospace infrastructure.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-xl text-neutral-300 mb-6">
              Powering the next leap in aerospace accessibility.
            </p>
            <Button
              as={Link}
              href="/technology/propulsion" // Example link, adjust as needed
              className={`border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg px-8 py-3`}
            >
              Learn More About Our Propulsion Tech
            </Button>
          </div>
        </div>
        
      </section>
      <section className="py-20 bg-black text-neutral-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400">Advanced Cloud Seeding: Drone/Rocket-Powered Weather Modification</h2>
            <p className="text-lg md:text-xl text-neutral-300">
              Thunderclap Labs is pioneering solutions to global water scarcity and weather-related agricultural damage through advanced atmospheric technology. We are developing a specialized rocket-based cloud seeding system for precise and effective delivery of silver iodide, a proven agent for enhancing precipitation and mitigating hail. Our core rocket engine is successfully developed, and our proprietary rocket fuel manufacturing system is significantly underway.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
              <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Primary Applications</h3>
              <ul className="list-disc list-inside space-y-3 text-neutral-300">
                <li>
                  <span className="font-semibold text-blue-300">Enhanced Precipitation:</span> Augmenting rainfall in drought-prone areas.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Hail Suppression:</span> Protecting crops and property from hail damage.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Fog Alleviation/Dispersal:</span> Improving visibility for transport and operations.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Pollution Reduction:</span> Aiding in the dispersal of atmospheric pollutants.
                </li>
                 <li>
                  <span className="font-semibold text-blue-300">Agricultural Support:</span> Optimizing water resources for farming.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Water Resource Management:</span> Enhancing water supply for various needs.
                </li>
              </ul>
              <p className="mt-4 text-neutral-400 text-sm">
                Our drone / rocket-based system offers a targeted and efficient solution for these critical environmental and economic challenges.
              </p>
            </div>
            <div>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl aspect-video flex items-center justify-center">
                <Image src={cloudseeding} alt="Cloud Seeding Rocket System" className="mx-auto rounded-xl overflow-hidden" />
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-20 text-center">
            <p className="text-xl text-neutral-300 mb-6">
              Innovating for a sustainable atmospheric future.
            </p>
            <Button
              as={Link}
              href="/technology/cloud-seeding" // Example link, adjust as needed
              className={`border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-lg px-8 py-3`}
            >
              Explore Our Seeding Technology
            </Button>
          </div>
        </div>
        
      </section>
      <section className="py-20 bg-neutral-900 text-neutral-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400">ThunderBee: The Micro-Interceptor Drone</h2>
            <p className="text-lg md:text-xl text-neutral-300">
              An EUDIS hackathon winner and trusted by the Lithuanian Armed Forces, ThunderBee is a novel, cost-effective countermeasure responding to the challenge posed by jamming-resistant fiber-optic drones. This tiny (18cm x 18cm), high-acceleration interceptor drone is designed for rapid deployment to neutralize detected enemy drones, leveraging a global shutter high-FPS infrared (IR) camera and an efficient detection/guidance algorithm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <Image src={thunderbee} alt="ThunderBee Drone Concept" className="mx-auto rounded-xl shadow-xl w-full h-auto object-contain" />
              <p className="text-center mt-4 text-sm text-neutral-400">Conceptual design of the ThunderBee micro-interceptor.</p>
              <div className="mt-8 bg-neutral-800 p-6 rounded-xl shadow-xl">
                <h3 className="text-xl font-semibold mb-3 text-neutral-100 text-center">Development Progress & Recognition</h3>
                <p className="text-neutral-300 text-center md:text-base">
                  During intensive hackathon efforts, Team Thunderclap has conducted extensive research, identified optimal components, and designed an accurate 3D model of the ThunderBee. This project was recognized as an EUDIS hackathon winner, highlighting its innovative approach and potential, and has garnered trust from the <Link isExternal className="text-blue-400" href="https://kariuomene.lt/en">Lithuanian Armed Forces</Link>.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Key Features</h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-300">
                  <li>
                    <span className="font-semibold text-blue-300">Jamming-Immune Countermeasure:</span> Physically intercepts and neutralizes targets, bypassing electronic warfare limitations.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-300">Simple, Effective Detection:</span> Utilizes an IR camera and a straightforward algorithm to reliably track enemy drones, even in challenging conditions like dusk or fog.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-300">Rapid Interception Capability:</span> Its compact design and exceptional acceleration allow for swift response and target engagement.
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Technical Capabilities</h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-300">
                  <li><span className="font-semibold">Extreme Acceleration:</span> Capable of very high acceleration for rapid target interception.</li>
                  <li><span className="font-semibold">IR Detection:</span> Reliable enemy drone detection, effective in low light or at night.</li>
                  <li><span className="font-semibold">Compact & Agile:</span> Highly compact and maneuverable design, with a low overall weight and significant thrust.</li>
                  <li><span className="font-semibold">Short-Burst Endurance:</span> Battery optimized for high-current discharge for focused, short-duration intercept missions.</li>
                  <li><span className="font-semibold">High Thrust-to-Weight Ratio:</span> Enables rapid acceleration and agile flight dynamics.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 text-center">
            <p className="text-xl text-neutral-300 mb-6">
              Neutralizing aerial threats with precision and speed.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-black text-neutral-100">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400">Partner with Us: Investing in a High-Impact Future</h2>
            <p className="text-lg md:text-xl text-neutral-300">
              Thunderclap Labs is at a pivotal stage of growth, with groundbreaking projects like the ThunderBee interceptor and our advanced Cloud Seeding technology poised for significant advancement. We are seeking strategic investors to help us scale operations, finalize critical R&D, and bring these transformative solutions to the global market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16"> {/* Changed items-center to items-start */}
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
              <h3 className="text-2xl font-semibold mb-3 text-neutral-100">Why Invest in Thunderclap Labs?</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li>Best, most capable &lt;7 person team in the industry.</li>
                <li>Trusted by the Lithuanian Armed Forces and recognized by the European Union.</li>
                <li>Proven innovation with recognized projects like the EUDIS award-winning ThunderBee.</li>
                <li>Pioneering technology in high-growth sectors (aerospace, weather modification, defense).</li>
                <li>Clear pathways to commercialization and market entry.</li>
              </ul>
            </div>
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl">
              <h3 className="text-2xl font-semibold mb-3 text-neutral-100">Use of Funds</h3>
               <p className="text-neutral-300 mb-3">We are seeking <span className="font-bold text-blue-300">8000 EUR</span> to achieve key milestones within 4-6 months:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li><span className="font-semibold">Complete Fuel Manufacturing System (20%):</span> Finalize proprietary rocket fuel production.</li>
                <li><span className="font-semibold">Rocket Assembly & Testing (50%):</span> Assemble initial fleet, conduct rigorous testing, and obtain certifications.</li>
                <li><span className="font-semibold">Payload Integration (10%):</span> Refine and scale silver iodide dispersal systems.</li>
                <li><span className="font-semibold">Operational Infrastructure (10%):</span> Establish initial operational bases.</li>
                <li><span className="font-semibold">Pilot Programs & Market Development (5%):</span> Launch pilot programs and secure initial contracts.</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-neutral-300 mb-6">
              Join us in shaping the future of atmospheric and aerospace technology.
            </p>
            <Button
              as={Link}
              isExternal
              href="mailto:thunderclaplabs@gmail.com" // Adjust link to a contact page or investor relations page
              className={`border-green-500 text-green-500 hover:bg-green-500 hover:text-white text-lg px-8 py-3`}
            >
              Discuss Investment Opportunities
            </Button>
            <p className="text-sm text-neutral-400 mt-4">
              For more information, please contact us at <Link isExternal className="text-blue-400 text-sm" href="mailto:thunderclaplabs@gmail.com">thunderclaplabs@gmail.com</Link>.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
