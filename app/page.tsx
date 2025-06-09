"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { useEffect, useState } from 'react'; 
import * as THREE from 'three'; 
import Image from "next/image";

import AOS from 'aos';
import 'aos/dist/aos.css';

// Assuming these paths are correct for your project structure
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

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
  const [isClientMobile, setIsClientMobile] = useState<boolean | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, 
    });

    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const mobileCheck = window.innerWidth < 768;
        setIsClientMobile(mobileCheck);
      };
      
      handleResize(); // Initial check
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (isClientMobile === null) return; // Don't do anything until mobile status is known

    if (!isClientMobile) { // Desktop-only logic (Globe initialization)
      const globeVizElement = document.getElementById('globeViz');
      if (!globeVizElement) {
        // console.error("Globe container 'globeViz' not found for desktop.");
        return;
      }

      // Check if globe is already initialized to prevent re-initialization on resize
      if (globeVizElement.childElementCount > 0) { // Simple check, might need refinement
          // console.log("Globe already initialized or being initialized.");
          // Ensure pointer events are correct for desktop
          globeVizElement.style.pointerEvents = 'auto';
          return;
      }


      import('globe.gl').then(globeModule => {
        const GlobeGl = globeModule.default;
        const Globe = new GlobeGl(globeVizElement);

        Globe
          .globeImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/2560px-The_earth_at_night.jpg")
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png');

        Globe.pointOfView({ lat: 30, lng: 26, altitude: 2.3 }); 

        Globe.controls().autoRotate = true;
        Globe.controls().autoRotateSpeed = 0.2; 
        Globe.controls().enableZoom = false; 
        globeVizElement.style.pointerEvents = 'auto'; 

      }).catch(error => {
        console.error("Failed to load globe.gl module", error);
      });
    }
    // Refresh AOS when mobile status changes, to apply/remove anchors and delays
    AOS.refreshHard();
  }, [isClientMobile]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about-us-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDownScroll = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleScrollDown();
    }
  };

  return (
    <div className="relative">
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden bg-black">
        <div id="Hero" className="relative md:mx-6 h-[calc(100vh-170px)] w-full md:rounded-xl overflow-hidden">
          {isClientMobile === null ? (
            <div /> 
          ) : isClientMobile ? (
            <>
              <StarsBackground className="z-0" />
              <ShootingStars className="z-0" />
            </>
          ) : (
            <div id="globeViz" className="absolute -top-24 md:-left-10 z-0" />
          )}
          <div className="z-10 flex h-full items-center justify-center">
            <div id="Title" className="flex flex-col items-center justify-center drop-shadow-sm ">
              <span className='main md:text-4xl text-3xl'>THUNDERCLAP</span>
              <p className='sub md:text-md text-sm'>LABS</p>
            </div>
          </div>
        </div>
        <div 
          role="button"
          tabIndex={0}
          className="absolute bottom-28 cursor-pointer z-20 group opacity-0 animate-fade-in-delayed"
          onClick={handleScrollDown}
          onKeyDown={handleKeyDownScroll}
          title="Scroll to learn more"
        >
          <div className="w-[30px] h-[50px] border-2 border-neutral-400 group-hover:border-white rounded-full relative transition-colors duration-300">
            <div className="w-1.5 h-2 bg-neutral-400 group-hover:bg-white rounded-full absolute top-[8px] left-1/2 -translate-x-1/2 animate-mouse-wheel transition-colors duration-300"></div>
          </div>
        </div>
        <div className="absolute bottom-4 mx-6 left-0 right-0 flex justify-center items-center p-4">
          <div className="flex justify-evenly w-full gap-4 opacity-60 ">
            <div className="flex items-center justify-center max-w-48 w-full" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#Hero' } : {})}
              data-aos-delay={isClientMobile ? 0 : 1200}>
              <Image src={ktustartupspace} alt="KTU Startup Space" height={30}/>
            </div>
            <div className="flex items-center justify-center max-w-48 w-full" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#Hero' } : {})}
              data-aos-delay={isClientMobile ? 0 : 1400}>
              <Image src={ltarmedforces} alt="LT Armed Forces" height={30}/>
            </div>
            <div className="flex items-center justify-center max-w-48 w-full" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#Hero' } : {})}
              data-aos-delay={isClientMobile ? 0 : 1600}>
              <Image src={pcbway} alt="PCBWay" height={30}/>
            </div>
          </div>
        </div>
      </section>
      <section id="about-us-section" className="py-20 bg-neutral-900 text-neutral-100" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#about-us-section' } : {})}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#about-us-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "100"}>Engineering the Future of Atmospheric and Aerospace Systems</h2>
            <p className="text-lg md:text-xl text-neutral-300" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#about_us_section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "200"}>
              Thunderclap Labs is at the forefront of innovation, developing critical technologies to solve complex global challenges. We build the platforms and systems that will define the next era of atmospheric management, aerospace capability, and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div 
              data-aos="fade-right" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#about_us_section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <h3 className="text-2xl font-semibold mb-3 text-blue-400">Our Mission</h3>
              <p className="text-neutral-300 mb-4">
                We are committed to pioneering solutions that enhance global stability, environmental resilience, and technological advancement. From advanced satellite constellations and atmospheric modification techniques to cutting-edge aerospace components, our work is designed to provide actionable intelligence and impactful interventions.
              </p>
              <p className="text-neutral-300">
                Our interdisciplinary team of scientists and engineers thrives on tackling the hardest problems, transforming ambitious ideas into operational realities.
              </p>
            </div>
            <div 
              data-aos="fade-left" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#about_us_section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "400"}>
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
        </div>
      </section>
      <section id="propulsion-section" className="py-20 bg-black text-neutral-100" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "100"}>Next-Generation Propulsion & Launch Systems</h2>
            <p className="text-lg md:text-xl text-neutral-300" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "200"}>
              Thunderclap Labs is redefining access to the skies with our advanced rocket systems. We are developing breakthrough propulsion technologies and highly adaptable launch platforms designed for rapid deployment, increased payload capacity, and unprecedented mission flexibility. Our focus is on creating sustainable and cost-effective solutions for a new era of space exploration and utilization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div 
              data-aos="fade-right" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl aspect-video flex items-center justify-center">
                <Image src={fwd} alt="FWD" className="mx-auto rounded-xl overflow-hidden" 
                  data-aos="zoom-in" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}/>
              </div>
            </div>
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
              data-aos="fade-left" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Key Innovations:</h3>
              <ul className="list-disc list-inside space-y-3 text-neutral-300">
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "350"}>
                  <span className="font-semibold text-blue-300">Modular Rocket Architecture:</span> Easily configurable for diverse mission profiles.
                </li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}>
                  <span className="font-semibold text-blue-300">Advanced Propellant Technologies:</span> Researching high-performance, eco-friendly propellants for increased efficiency and reduced environmental impact.
                </li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "450"}>
                  <span className="font-semibold text-blue-300">AI-Driven Launch Operations:</span> Autonomous systems for pre-flight checks, trajectory optimization, and in-flight anomaly detection.
                </li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "500"}>
                  <span className="font-semibold text-blue-300">Rapid Reusability:</span> Designing for quick turnaround and refurbishment, significantly lowering launch costs.
                </li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "550"}>
                  <span className="font-semibold text-blue-300">On-Orbit Servicing & Manufacturing Capabilities:</span> Developing systems that can support future aerospace infrastructure.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 md:mt-20 text-center" 
            data-aos="zoom-in" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
            data-aos-delay={isClientMobile ? "0" : "600"}>
            <p className="text-xl text-neutral-300 mb-6">
              Powering the next leap in aerospace accessibility.
            </p>
          </div>
        </div>
        
      </section>
      <section id="cloud-seeding-section" className="py-20 bg-black text-neutral-100" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "100"}>Advanced Cloud Seeding: Drone/Rocket-Powered Weather Modification</h2>
            <p className="text-lg md:text-xl text-neutral-300" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "200"}>
              Thunderclap Labs is pioneering solutions to global water scarcity and weather-related agricultural damage through advanced atmospheric technology. We are developing a specialized rocket-based cloud seeding system for precise and effective delivery of silver iodide, a proven agent for enhancing precipitation and mitigating hail. Our core rocket engine is successfully developed, and our proprietary rocket fuel manufacturing system is significantly underway.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
              data-aos="fade-right" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Primary Applications</h3>
              <ul className="list-disc list-inside space-y-3 text-neutral-300">
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "350"}>
                  <span className="font-semibold text-blue-300">Enhanced Precipitation:</span> Augmenting rainfall in drought-prone areas.
                </li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}>
                  <span className="font-semibold text-blue-300">Hail Suppression:</span> Protecting crops and property from hail damage.
                </li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "450"}>
                  <span className="font-semibold text-blue-300">Fog Alleviation/Dispersal:</span> Improving visibility for transport and operations.
                </li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "500"}>
                  <span className="font-semibold text-blue-300">Pollution Reduction:</span> Aiding in the dispersal of atmospheric pollutants.
                </li>
                 <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "550"}>
                  <span className="font-semibold text-blue-300">Agricultural Support:</span> Optimizing water resources for farming.
                </li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "600"}>
                  <span className="font-semibold text-blue-300">Water Resource Management:</span> Enhancing water supply for various needs.
                </li>
              </ul>
              <p className="mt-4 text-neutral-400 text-sm" 
                data-aos="fade-up" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "650"}>
                Our IAV-based system offers a targeted and efficient solution for these critical environmental and economic challenges.
              </p>
            </div>
            <div 
              data-aos="fade-left" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl aspect-video flex items-center justify-center">
                <Image src={cloudseeding} alt="Cloud Seeding Rocket System" className="mx-auto rounded-xl overflow-hidden" 
                  data-aos="zoom-in" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}/>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-20 text-center" 
            data-aos="zoom-in" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
            data-aos-delay={isClientMobile ? "0" : "700"}>
            <p className="text-xl text-neutral-300 mb-6">
              Innovating for a sustainable atmospheric future.
            </p>
          </div>
        </div>
        
      </section>
      <section id="thunderbee-section" className="py-20 bg-neutral-900 text-neutral-100" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "100"}>ThunderBee: The Micro-Interceptor Drone</h2>
            <p className="text-lg md:text-xl text-neutral-300" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "200"}>
              An EUDIS hackathon winner and trusted by the Lithuanian Armed Forces, ThunderBee is a novel, cost-effective countermeasure responding to the challenge posed by jamming-resistant fiber-optic drones. This tiny (18cm x 18cm), high-acceleration interceptor drone is designed for rapid deployment to neutralize detected enemy drones, leveraging a global shutter high-FPS infrared (IR) camera and an efficient detection/guidance algorithm.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div 
              data-aos="fade-right" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <Image src={thunderbee} alt="ThunderBee Drone Concept" className="mx-auto rounded-xl shadow-xl w-full h-auto object-contain" 
                data-aos="zoom-in" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "400"}/>
              <p className="text-center mt-4 text-sm text-neutral-400" 
                data-aos="fade-up" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "450"}>Conceptual design of the ThunderBee micro-interceptor.</p>
              <div className="mt-8 bg-neutral-800 p-6 rounded-xl shadow-xl" 
                data-aos="fade-up" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "500"}>
                <h3 className="text-xl font-semibold mb-3 text-neutral-100 text-center">Development Progress & Recognition</h3>
                <p className="text-neutral-300 text-center md:text-base">
                  During intensive hackathon efforts, Team Thunderclap has conducted extensive research, identified optimal components, and designed an accurate 3D model of the ThunderBee. This project was recognized as an EUDIS hackathon winner, highlighting its innovative approach and potential, and has garnered trust from the <Link isExternal className="text-blue-400" href="https://kariuomene.lt/en">Lithuanian Armed Forces</Link>.
                </p>
              </div>
            </div>

            <div className="space-y-6" 
              data-aos="fade-left" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
                data-aos="fade-left" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "350"}>
                <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Key Features</h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-300">
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "400"}>
                    <span className="font-semibold text-blue-300">Jamming-Immune Countermeasure:</span> Physically intercepts and neutralizes targets, bypassing electronic warfare limitations.
                  </li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "450"}>
                    <span className="font-semibold text-blue-300">Simple, Effective Detection:</span> Utilizes an IR camera and a straightforward algorithm to reliably track enemy drones, even in challenging conditions like dusk or fog.
                  </li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "500"}>
                    <span className="font-semibold text-blue-300">Rapid Interception Capability:</span> Its compact design and exceptional acceleration allow for swift response and target engagement.
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
                data-aos="fade-left" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "550"}>
                <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Technical Capabilities</h3>
                <ul className="list-disc list-inside space-y-3 text-neutral-300">
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "600"}><span className="font-semibold">Rapid Acceleration:</span> Tuned for high-velocity bursts to enable fast-response target interception.</li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "650"}><span className="font-semibold">IR Detection:</span> Optimized for reliable drone tracking in low-light and nighttime conditions.</li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "700"}><span className="font-semibold">Compact & Agile:</span> Lightweight frame engineered for tight maneuvering and high-thrust performance.</li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "750"}><span className="font-semibold">Short-Burst Endurance:</span> Battery designed for high-current output to support brief, intensive intercept missions.</li>
                  <li 
                    data-aos="fade-left" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "800"}><span className="font-semibold">High Thrust-to-Weight Ratio:</span> Engineered for rapid acceleration and high-agility maneuvering during dynamic flight operations.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 text-center" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
            data-aos-delay={isClientMobile ? "0" : "850"}>
            <p className="text-xl text-neutral-300 mb-6">
              Neutralizing aerial threats with precision and speed.
            </p>
          </div>
        </div>
      </section>
      <section id="partner-section" className="py-20 bg-black text-neutral-100" data-aos="fade-up">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16" 
            data-aos="fade-up" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "100"}>Partner with Us: Investing in a High-Impact Future</h2>
            <p className="text-lg md:text-xl text-neutral-300" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "200"}>
              Thunderclap Labs is at a pivotal stage of growth, with groundbreaking projects like the ThunderBee interceptor and our advanced Cloud Seeding technology poised for significant advancement. We are seeking strategic investors to help us scale operations, finalize critical R&D, and bring these transformative solutions to the global market.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
              data-aos="fade-right" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-100">Why Invest in Thunderclap Labs?</h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "350"}>Best, most capable &lt;7 person team in the industry.</li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}>Trusted by the Lithuanian Armed Forces and recognized by the European Union.</li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "450"}>Proven innovation with recognized projects like the EUDIS award-winning ThunderBee.</li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "500"}>Pioneering technology in high-growth sectors (aerospace, weather modification, defense).</li>
                <li 
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "550"}>Clear pathways to commercialization and market entry.</li>
              </ul>
            </div>
            <div className="bg-neutral-800 p-6 rounded-xl shadow-xl" 
              data-aos="fade-left" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "300"}>
              <h3 className="text-2xl font-semibold mb-3 text-neutral-100">Use of Funds</h3>
               <p className="text-neutral-300 mb-3">We are seeking <span className="font-bold text-blue-300">8000 EUR</span> to achieve key milestones within 4-6 months:</p>
              <ul className="list-disc list-inside space-y-2 text-neutral-300">
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "350"}><span className="font-semibold">Complete Fuel Manufacturing System (20%):</span> Finalize proprietary rocket fuel production.</li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}><span className="font-semibold">Rocket Assembly & Testing (50%):</span> Assemble initial fleet, conduct rigorous testing, and obtain certifications.</li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "450"}><span className="font-semibold">Payload Integration (10%):</span> Refine and scale silver iodide dispersal systems.</li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "500"}><span className="font-semibold">Operational Infrastructure (10%):</span> Establish initial operational bases.</li>
                <li 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "550"}><span className="font-semibold">Pilot Programs & Market Development (5%):</span> Launch pilot programs and secure initial contracts.</li>
              </ul>
            </div>
          </div>

          <div className="text-center" 
            data-aos="zoom-in" 
            {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
            data-aos-delay={isClientMobile ? "0" : "600"}>
            <p className="text-xl text-neutral-300 mb-6">
              Join us in shaping the future of atmospheric and aerospace technology.
            </p>
            <Button
              as={Link}
              isExternal
              href="mailto:thunderclaplabs@gmail.com"
              className={`border-green-500 text-green-500 hover:bg-green-500 hover:text-white text-sm px-8 py-3`}
              data-aos="zoom-in"
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})}
              data-aos-delay={isClientMobile ? "0" : "650"}
            >
              Discuss Investment Opportunities
            </Button>
            <p className="text-sm text-neutral-400 mt-4" 
              data-aos="fade-up" 
              {...(isClientMobile === false ? { 'data-aos-anchor': '#partner-section' } : {})} 
              data-aos-delay={isClientMobile ? "0" : "700"}>
              For more information, please contact us at <Link isExternal className="text-blue-400 text-sm" href="mailto:thunderclaplabs@gmail.com">thunderclaplabs@gmail.com</Link>.
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
