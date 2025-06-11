"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { useEffect, useState, useRef } from 'react'; 
import * as THREE from 'three'; 
import Image from "next/image";

import AOS from 'aos';
import 'aos/dist/aos.css';

// Assuming these paths are correct for your project structure
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

import { useFeaturedCardMouseEffect } from "@/lib/featured-card"; // Import the new hook

import ltarmedforces from "../components/images/ltarmedforces.png";
import ktustartupspace from "../components/images/ktustartupspace.png";
import pcbway from "../components/images/pcbway.png";
import fwd from "../components/images/fwd.png";
import cloudseeding from "../components/images/cloudseeding.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import rockettop from "../components/images/rockettop.png";
import dronewireframe from "../components/images/dronewireframe.png";
import conveyorwireframe from "../components/images/conveyorwireframe.png";
import cansatwireframe from "../components/images/cansatwireframe.png";

import "./styles/hero.css"

// Constants for globe and satellites
const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 100; // km (visual size)

const focus_areas = [
  {
    title: "Advanced Atmospheric Technologies",
    description: "Innovating atmospheric modification techniques to enhance weather predictability and management.",
    image: dronewireframe,
  },
  {
    title: "Aerospace Systems & Propulsion",
    description: "Creating cutting-edge propulsion systems for efficient and sustainable space travel.",
    image: rockettop,
  },
  {
    title: "Proprietary Rocket Fuel & Chemical Synthesis",
    description: "Developing and manufacturing our own advanced rocket fuels and conducting novel chemistry experiments for aerospace applications.",
    image: conveyorwireframe,
  },
    {
    title: "Next-Generation Satellite Systems",
    description: "Developing advanced satellite constellations for global coverage and real-time data analytics.",
    image: cansatwireframe,
  },
];

export default function Home() {
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isClientMobile, setIsClientMobile] = useState<boolean | null>(null);

  useFeaturedCardMouseEffect(); // Call the custom hook

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true, 
      });

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
    if (typeof window !== 'undefined') {
      AOS.refreshHard();
    }
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
              data-aos-delay={isClientMobile ? "0" : "300"}
              >
              <h3 className="text-2xl font-semibold mb-3 text-primary-600">Our Mission</h3>
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
              <div className="featured-card white-feature bg-neutral-900 p-[1px] rounded-xl">
                <div className="bg-neutral-800 p-6 shadow-xl rounded-xl">
                  <h4 className="text-xl font-semibold mb-3 text-neutral-100">Core Focus Areas:</h4>
                  <ul className="list-disc list-inside space-y-2 text-neutral-300">
                    <li>Next-Generation Satellite Systems</li>
                    <li>Advanced Atmospheric Technologies</li>
                    <li>Aerospace Systems & Propulsion</li>
                    <li>Proprietary Rocket Fuel & Chemical Synthesis</li>
                    <li>Rapid Aerospace Prototyping</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="focus-areas" className="grid grid-cols-1 md:grid-cols-4 mt-8 featured-card white-feature gap-[2px] bg-neutral-800 p-[1px]" ref={cardGridRef} data-aos="fade-up">
            {focus_areas.map((area, i) => (
              <div key={area.title} className="flex p-4 flex-col h-full bg-neutral-900 hover:bg-primary-100 !transition-all duration-300" data-aos="fade-up" data-aos-anchor={isClientMobile === false ? '#focus-areas' : undefined}>
                <h5 className="text-lg font-semibold text-neutral-100 mb-4">{area.title}</h5>
                <p className="text-sm text-neutral-300">{area.description}</p>
                <div className="flex h-full justify-center items-center">
                  {area.image && (
                    <Image src={area.image} alt={area.title} className="mt-4 rounded-lg" height={200} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="relative">
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />
        <section id="propulsion-section" className="relative py-20 bg-transparent text-neutral-100 overflow-hidden" data-aos="fade-up">
          <div className="relative z-10 container max-w-7xl mx-auto px-4"> {/* Ensure content is above swirl */}
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
                Redefining access to the skies with advanced rocket and propulsion systems.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-start">
              <div className="flex flex-col h-full justify-between rounded">
                <div
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "300"}
                  className="featured-card white-feature bg-neutral-800 p-[2px] rounded-lg"
                  >
                  <div className="p-6 shadow-xl bg-black rounded-lg">
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
                    </ul>
                  </div>
                </div>
                <div className="xl:block hidden text-center" 
                  data-aos="zoom-in" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "600"}>
                  <p className="text-xl text-neutral-300">
                    Powering the next leap in aerospace accessibility.
                  </p>
                </div>
              </div>
              <div
                data-aos="fade-right" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "300"}
                className="featured-card w-fit h-min white-feature bg-neutral-800 p-[2px] rounded-lg"
                >
                <div className="shadow-xl rounded-lg overflow-hidden">
                  <Image src={fwd} alt="FWD"
                    data-aos="zoom-in" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#propulsion-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "400"}/>
                </div>
              </div>
            </div>
          </div>
          
        </section>
        <section id="cloud-seeding-section" className="py-20 bg-transparent text-neutral-100" data-aos="fade-up">
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
                Pioneering solutions to global water scarcity and weather-related agricultural damage through advanced atmospheric technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="featured-card white-feature p-[2px] bg-neutral-800 rounded-lg"
                  data-aos="fade-right" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "300"}>
                <div className="bg-black p-6 rounded-lg">
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
                </div>
                </div>
              <div 
                data-aos="fade-left" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#cloud-seeding-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "300"}>
                <div className="p-6 flex items-center justify-center">
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
        <section id="thunderbee-section" className="py-20 text-neutral-100" data-aos="fade-up">
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
                An EUDIS hackathon winner - trusted by the Lithuanian Armed Forces, ThunderBee is a novel, cost-effective countermeasure responding to the challenge posed by jamming-resistant fiber-optic drones.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-start">
              <div 
                data-aos="fade-right" 
                {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                data-aos-delay={isClientMobile ? "0" : "300"}>
                <Image src={dronewireframe} alt="ThunderBee Drone Concept" className="mx-auto w-full h-auto object-contain" 
                  data-aos="zoom-in" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "400"}/>
                <p className="text-center mt-4 text-sm text-neutral-400" 
                  data-aos="fade-up" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "450"}>Conceptual design of the ThunderBee micro-interceptor.</p>
                <div className="featured-card white-feature bg-neutral-800 p-[2px] mt-8 rounded-lg"
                    data-aos="fade-up" 
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                    data-aos-delay={isClientMobile ? "0" : "500"}>
                  <div className="bg-black p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-neutral-100 text-center">Development Progress & Recognition</h3>
                    <p className="text-neutral-300 text-center md:text-base">
                      During intensive hackathon efforts, Team Thunderclap has conducted extensive research, identified optimal components, and designed an accurate 3D model of the ThunderBee. This project was recognized as an EUDIS hackathon winner, highlighting its innovative approach and potential, and has garnered trust from the <Link isExternal className="text-blue-400" href="https://kariuomene.lt/en">Lithuanian Armed Forces</Link>.
                    </p>
                  </div>
                </div>
              </div>

                <div className="space-y-6" 
                  data-aos="fade-left" 
                  {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                  data-aos-delay={isClientMobile ? "0" : "300"}>
                  <div className="featured-card bg-neutral-800 white-feature p-[2px] rounded-lg"
                      data-aos="fade-left" 
                      {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                      data-aos-delay={isClientMobile ? "0" : "350"}>
                    <div className="bg-black p-6 rounded-lg">
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
                  </div>
                <div className="featured-card bg-neutral-800 white-feature p-[2px] rounded-lg"
                    data-aos="fade-left"
                    {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})}
                    data-aos-delay={isClientMobile ? "0" : "550"}>
                  <div className="bg-black p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-100">Technical Capabilities</h3>
                    <ul className="list-disc list-inside space-y-3 text-neutral-300">
                      <li 
                        data-aos="fade-left" 
                        {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                        data-aos-delay={isClientMobile ? "0" : "600"}><span className="font-semibold">Extreme Acceleration:</span> Capable of very high acceleration for rapid target interception.</li>
                      <li 
                        data-aos="fade-left" 
                        {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                        data-aos-delay={isClientMobile ? "0" : "650"}><span className="font-semibold">IR Detection:</span> Reliable enemy drone detection, effective in low light or at night.</li>
                      <li 
                        data-aos="fade-left" 
                        {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                        data-aos-delay={isClientMobile ? "0" : "700"}><span className="font-semibold">Compact & Agile:</span> Highly compact and maneuverable design, with a low overall weight and significant thrust.</li>
                      <li 
                        data-aos="fade-left" 
                        {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                        data-aos-delay={isClientMobile ? "0" : "750"}><span className="font-semibold">Short-Burst Endurance:</span> Battery optimized for high-current discharge for focused, short-duration intercept missions.</li>
                      <li 
                        data-aos="fade-left" 
                        {...(isClientMobile === false ? { 'data-aos-anchor': '#thunderbee-section' } : {})} 
                        data-aos-delay={isClientMobile ? "0" : "800"}><span className="font-semibold">High Thrust-to-Weight Ratio:</span> Enables rapid acceleration and agile flight dynamics.</li>
                    </ul>
                  </div>
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
      </div>
      <section id="partner-section" className="py-20 bg-neutral-800 text-neutral-100" data-aos="fade-up">
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
          <div className="flex gap-4 justify-center" data-aos="fade-up">
            <Button as={Link} variant="bordered" className=" bg-secondary/5 text-secondary hover:bg-secondary/10 border-gray-800 shadow-xl" href="/contact">
              <FontAwesomeIcon icon={faPaperPlane} />
              Contact Us
            </Button>
            <Button as={Link} variant="bordered" className=" bg-secondary/50 text-white border-gray-800 shadow-xl" href="/team">
              Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
