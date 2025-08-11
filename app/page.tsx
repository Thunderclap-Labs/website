"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import * as THREE from 'three';

// Assuming these paths are correct for your project structure

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faLayerGroup, faCloudRain, faRocket, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ltarmedforces from "../components/images/ltarmedforces.png";
import ktustartupspace from "../components/images/ktustartupspace.png";
import jlcpcb from "../components/images/jlc.png";
import rockettop from "../components/images/rockettop.png";
import dronewireframe from "../components/images/dronewireframe.png";
import conveyorwireframe from "../components/images/conveyorwireframe.png";
import cansatwireframe from "../components/images/cansatwireframe.png";
import makerspace from "../components/images/makerspace.png";
import dryerwireframe from "../components/images/dryerwireframe.png";
import ballmill from "../components/images/ballmill.png";

import { useFeaturedCardMouseEffect } from "@/lib/featured-card"; // Import the new hook
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "./styles/hero.css";
import { StatsGrid } from "@/components/common/stats-grid";
import { ManufacturingFeatureCard } from "@/components/common/manufacturing-feature-card";
import { TeamSwiper } from "@/components/common/team-swiper";
import { FeaturedProjectsShowcase } from "@/components/common/featured-projects-showcase";

import FundingChartSection from "@/components/FundingChartSection";
import { SatelliteInfoOverlay } from "@/components/common/satellite-info-overlay";

// Globe imports
import { App } from '@/lib/globe/App';
import { Globe } from '@/lib/globe/Globe';
import { Points } from '@/lib/globe/Points';
import { Markers } from '@/lib/globe/Markers';
import { Lines } from '@/lib/globe/Lines';
import { config, elements, groups, animations, sampleCountries } from '@/lib/globe/config';
import grid from '@/components/globe/data/grid.json';

// Constants for globe and satellites
const EARTH_RADIUS_KM = 6371; // km
const SAT_SIZE = 100; // km (visual size)

const focus_areas = [
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

const propulsionTimelineItems = [
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

const statsData = [
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

// Add this array for manufacturing features
const manufacturingFeatures = [
  {
    image: dryerwireframe,
    title: "Material Dryer",
    description: "Efficiently dries a wide range of materials, ensuring optimal moisture content for further processing, currently being used for our propellant production.",
  },
  {
    image: conveyorwireframe,
    title: "Precision Screw Conveyor",
    description: "A robust, zero-tolerance screw conveyor engineered from standard components for reliable, high-quality material transport.",
  },
  {
    image: ballmill,
    title: "Planetary Ball Mill",
    description: "Ultra-fine milling system capable of reducing materials to particle sizes as small as 50μm for advanced applications.",
  },
];

import { SectionLayout } from "@/components/common/section-layout";

export default function Home() {
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isClientMobile, setIsClientMobile] = useState<boolean | null>(null);
  
  // Globe state
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const [isGlobeLoading, setIsGlobeLoading] = useState(true);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);
  const [rotation, setRotation] = useState(animations.rotateGlobe);
  const [display, setDisplay] = useState(config.display);

  useFeaturedCardMouseEffect(); // Call the custom hook

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 800,
        once: true,
      });

      const handleResize = () => {
        const mobileCheck = window.innerWidth < 768;
        setIsClientMobile(mobileCheck);
      };

      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Globe setup effect
  useEffect(() => {
    if (!globeContainerRef.current || isClientMobile) return;

    const setup = async (app: App) => {
      app.camera.position.z = config.sizes.globe * 2.85;
      app.camera.position.y = config.sizes.globe * 0;
      app.camera.updateProjectionMatrix();

      groups.main = new THREE.Group();
      groups.main.name = 'Main';

      new Globe();
      groups.main.add(groups.globe!);

      // Fetch country data and create points
      try {
        const countriesData = grid;
        new Points(countriesData);
        if (groups.points) {
          groups.globe!.add(groups.points);
        }
      } catch (error) {
        console.error("Failed to load country data for points:", error);
      }

      const markers = new Markers(sampleCountries);
      groups.globe!.add(groups.markers!);

      const lines = new Lines();
      app.lines = lines;
      groups.globe!.add(groups.lines!);

      app.scene.add(groups.main);
      setIsGlobeLoading(false);
      
      // Start fade-in animation after a short delay
      setTimeout(() => {
        setIsGlobeVisible(true);
      }, 100);
    };

    const animate = (app: App) => {
      // Animate globe fade-in
      if (isGlobeVisible && elements.globeOpacity < 1) {
        elements.globeOpacity = Math.min(elements.globeOpacity + 0.02, 1);
        
        // Update globe opacity
        if (elements.globe && elements.globe.material instanceof THREE.ShaderMaterial) {
          elements.globe.material.uniforms.opacity.value = elements.globeOpacity;
        }
        
        // Update atmosphere opacity with debugging
        if (elements.atmosphere) {
          if (elements.atmosphere.material instanceof THREE.ShaderMaterial) {
            elements.atmosphere.material.uniforms.opacity.value = elements.globeOpacity * 0.6;
          }
        } else {
          console.log('Atmosphere not found in elements:', elements.atmosphere);
        }
        
        // Update points opacity
        if (elements.globePoints) {
          (elements.globePoints.material as THREE.PointsMaterial).opacity = elements.globeOpacity * 0.8;
        }
        
        // Update markers opacity
        elements.markerLabel.forEach(label => {
          if (label.material instanceof THREE.SpriteMaterial) {
            label.material.opacity = elements.globeOpacity;
          }
        });
        
        elements.markerPoint.forEach(point => {
          if (point.material instanceof THREE.MeshBasicMaterial) {
            point.material.opacity = elements.globeOpacity * 0.8;
          }
        });
        
        // Update lines opacity
        elements.lines.forEach(line => {
          if (line.material instanceof THREE.LineBasicMaterial) {
            line.material.opacity = elements.globeOpacity * 0.45;
          }
        });
      }

      // Update points
      if (elements.globePoints) {
        (elements.globePoints.material as THREE.PointsMaterial).size = config.sizes.globeDotSize;
        (elements.globePoints.material as THREE.PointsMaterial).color.set(config.colors.globeDotColor);
      }

      // Update globe scale
      if (elements.globe) {
        elements.globe.scale.set(
          config.scale.globeScale,
          config.scale.globeScale,
          config.scale.globeScale
        );
      }

      // Update line dots
      if (elements.lineDots) {
        for (let i = 0; i < elements.lineDots.length; i++) {
          const dot = elements.lineDots[i];
          dot.material.color.set(config.colors.globeLinesDots);
          dot.animate();
        }
      }

      // Update lines
      if (elements.lines) {
        for (let i = 0; i < elements.lines.length; i++) {
          const line = elements.lines[i];
          (line.material as THREE.LineBasicMaterial).color.set(config.colors.globeLines);
        }
      }

      // Auto-rotate globe
      if (animations.rotateGlobe && groups.globe) {
        groups.globe.rotation.y -= config.rotation.globe;
      }

      // Update visibility
      if (groups.map) groups.map.visible = config.display.map;
      if (groups.markers) groups.markers.visible = config.display.markers;
      if (groups.points) groups.points.visible = config.display.points;
      if (groups.lines) groups.lines.visible = config.display.lines;

      // Update marker labels and points
      for (let i = 0; i < elements.markerLabel.length; i++) {
        const label = elements.markerLabel[i];
        label.visible = config.display.markerLabel;
      }

      for (let i = 0; i < elements.markerPoint.length; i++) {
        const point = elements.markerPoint[i];
        point.visible = config.display.markerPoint;
      }
    };

    const lithuania = sampleCountries.find(c => c.name === 'Lithuania');
    const initialRotationX = lithuania ? (+lithuania.latitude * Math.PI / 180) - 0.4 : 0;
    const initialRotationY = lithuania ? (-lithuania.longitude * Math.PI / 180) - 0.6: 0;

    const app = new App({ setup, animate, initialRotationX, initialRotationY });
    appRef.current = app;
    
    app.init(globeContainerRef.current);

    const handleResize = () => {
      app.handleResize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      app.destroy();
      if (globeContainerRef.current && app.renderer) {
        globeContainerRef.current.removeChild(app.renderer.domElement);
      }
    };
  }, [isClientMobile]);

  useEffect(() => {
    // Refresh AOS when mobile status changes, to apply/remove anchors and delays
    if (typeof window !== "undefined") {
      AOS.refreshHard();
    }
  }, [isClientMobile]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about-us-section");

    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDownScroll = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleScrollDown();
    }
  };

  return (
    <div className="relative">
      {/* Hero section - keep as is, too unique */}
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden bg-black">
        <div
          className="relative md:mx-6 h-[calc(100vh-170px)] w-full md:rounded-lg overflow-hidden"
          id="Hero"
        >
          {isClientMobile === null ? (
            <div />
          ) : isClientMobile ? (
            <>
              <StarsBackground className="z-0" />
              <ShootingStars className="z-0" />
            </>
          ) : (
            <>
              <div className={`absolute -top-24 md:-left-10 z-0 w-[1200px] h-[1200px] ${isGlobeVisible ? 'globe-container' : 'opacity-0'}`}>
                <div ref={globeContainerRef} />
              </div>
              {/* Satellite Info Overlay */}
              <SatelliteInfoOverlay
                corner="bottom-right"
                icon={faShield}
                isVisible={isGlobeVisible}
                subtitle="2025"
                title="Defence Systems"
              />
              <SatelliteInfoOverlay
                corner="top-left"
                icon={faRocket}
                isVisible={isGlobeVisible}
                subtitle="2025"
                title="Propulsion"
              />
              <SatelliteInfoOverlay
                corner="top-right"
                icon={faLayerGroup}
                isVisible={isGlobeVisible}
                subtitle="2026"
                title="Digital Twin Technology"
              />
              <SatelliteInfoOverlay
                corner="bottom-left"
                icon={faCloudRain}
                isVisible={isGlobeVisible}
                subtitle="2025"
                title="Cloud Seeding"
              />
            </>
          )}
          <div className="z-10 flex h-full items-center justify-center">
            <div
              className="flex flex-col items-center justify-center drop-shadow-sm"
              id="Title"
              data-aos="fade-down"
            >
              <span className="main md:text-4xl text-3xl">THUNDERCLAP</span>
              <p className="sub md:text-md text-sm">LABS</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-28 cursor-pointer z-20 group opacity-0 animate-fade-in-delayed"
          role="button"
          tabIndex={0}
          title="Scroll to learn more"
          onClick={handleScrollDown}
          onKeyDown={handleKeyDownScroll}
        >
          <div className="w-[30px] h-[50px] border-2 border-neutral-400 group-hover:border-white rounded-full relative transition-colors duration-300">
            <div className="w-1.5 h-2 bg-neutral-400 group-hover:bg-white rounded-full absolute top-[8px] left-1/2 -translate-x-1/2 animate-mouse-wheel transition-colors duration-300" />
          </div>
        </div>
        <div className="absolute bottom-0 mx-6 left-0 right-0 flex justify-center items-center p-4">
          <div className="w-full max-w-7xl opacity-60 relative">
            <div className="relative overflow-hidden">
              {/* Fade overlay masks - adjusted for mobile peeking */}
              <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <Swiper
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  768: { 
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 32,
                  },
                }}
                centeredSlides={true}
                className="sponsors-swiper"
                loop={true}
                modules={[Autoplay]}
                slidesPerView={1.2} 
                spaceBetween={10}
              >
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2" // Added rounded-lg and bg-black/60 for consistency
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image
                      alt="KTU Startup Space"
                      height={30}
                      src={ktustartupspace}
                      className="object-contain" // Ensures image scales nicely
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1400}
                  >
                    <Image alt="LT Armed Forces" height={30} src={ltarmedforces} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image alt="Makerspace" height={30} src={makerspace} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1000}
                  >
                    <Image alt="JLCPCB" height={30} src={jlcpcb} className="object-contain" />
                  </div>
                </SwiperSlide>
                {/* Duplicate slides for better loop effect */}
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image
                      alt="KTU Startup Space"
                      height={30}
                      src={ktustartupspace}
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1400}
                  >
                    <Image alt="LT Armed Forces" height={30} src={ltarmedforces} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image alt="Kaunas Makerspace" height={30} src={makerspace} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1000}
                  >
                    <Image alt="JLCPCB" height={30} src={jlcpcb} className="object-contain" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      
      <div className="relative">
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />
        
        {/* About section - keep as is, has custom layout */}
        <section className="py-32 text-neutral-100 relative" id="about-us-section">
          <div className="container max-w-7xl mx-auto px-4 relative z-[1]">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center lg:text-left" data-aos="fade-up">Engineering the Future of Atmospheric and Aerospace Systems</h1>
            </div>
            <div className="flex justify-end w-full text-lg my-8 mb-16">
              <div className="max-w-3xl text-lg md:text-3xl font-normal leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                <span className="font-semibold text-accent-600">Thunderclap Labs</span> is at the forefront of{" "}
                <span className="font-semibold text-primary-600">innovation</span>, developing critical{" "}
                <span className="font-semibold text-primary-600">technologies</span> to solve complex global challenges. We build the{" "}
                <span className="font-semibold text-primary-600">platforms</span> and systems that will define the next era of{" "}
                <span className="font-semibold text-primary-600">atmospheric management</span>,{" "}
                <span className="font-semibold text-primary-600">aerospace capability</span>, and beyond.
              </div>
          </div>
            <div
              ref={cardGridRef}
              className={`grid grid-cols-1 md:grid-cols-4 mt-8 rounded-lg bg-neutral-600 ${isClientMobile ? "bg-opacity-0" : "bg-opacity-55 featured-card white-feature gap-[1px]"} p-[1px]`}
              data-aos="fade-up"
              data-aos-delay="500"
              id="focus-areas"
            >
              {focus_areas.map((area, i) => (
                <div
                  key={area.title}
                  className={`flex p-4 flex-col h-full bg-black bg-opacity-95 ${isClientMobile ? "border border-neutral-700" : "rounded-lg"}`}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  data-aos-anchor={
                    isClientMobile === false ? "#focus-areas" : undefined
                  }
                >
                  <h5 className="text-lg font-semibold text-neutral-100 mb-4">
                    {area.title}
                  </h5>
                  <p className="text-sm text-neutral-300">{area.description}</p>
                  <div className="flex h-full justify-center items-center">
                    {area.image && (
                      <Image
                        alt={area.title}
                        className="mt-4 rounded-lg"
                        height={200}
                        src={area.image}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
            className="mt-12"
            data-aos="fade-up"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-neutral-100">
                <StatsGrid stats={statsData} />
              </div>
            </div>
        </div>
      </section>

        {/* Propulsion section - convert to SectionLayout */}
        <SectionLayout
          id="propulsion-section-new"
          title="Next-Generation Propulsion Systems"
          description={
            <>
              Pioneering the next era of aerospace with a focus on{" "}
              <span className="font-semibold text-primary-600">
                rocket propulsion technologies
              </span>
              ,{" "}
              <span className="font-semibold text-primary-600">
                advanced launch systems
              </span>
              , and sustainable{" "}
              <span className="font-semibold text-primary-600">
                aerospace solutions
              </span>
              .
            </>
          }
          titleAlignment="left"
          descriptionAlignment="right"
          descriptionAlignmentMobile="left"
        >
          {/* Timeline Start */}
          <div className="mt-16">
            <div className="timeline-container flex flex-col md:flex-row items-start justify-between">
              {propulsionTimelineItems.map((item, index) => (
                <div key={item.title} className={`timeline-item flex flex-col items-center ${index === 0 ? 'active' : ''} flex-1`}>
                  <div className="flex items-center w-full">
                    <div className={`timeline-dot ${index === 0 ? 'active' : ''}`}></div>
                    {index < propulsionTimelineItems.length - 1 && (
                      <div className="timeline-line flex-grow"></div>
                    )}
                  </div>
                  <div className={`timeline-content mt-3 px-2 ${index === 0 ? 'active' : ''}`}>
                    <p className="text-xs md:text-sm font-medium timeline-title">{item.title}</p>
                    <p className="text-xs mt-1 timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Timeline End */}
        </SectionLayout>

        {/* Manufacturing section - convert to SectionLayout */}
        <SectionLayout
          id="manufacturing-section"
          title="Manufacturing Excellence"
          description={
            <>
              We are pioneering manufacturing by developing our own{" "}
              <span className="font-semibold text-primary-600">
                production systems
              </span>
            </>
          }
          titleAlignment="center"
          descriptionAlignment="center"
          descriptionAlignmentMobile="center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 overflow-visible">
            {manufacturingFeatures.map((feature, i) => (
              <div data-aos="fade-up" data-aos-delay={i * 100} key={feature.title}>
                <ManufacturingFeatureCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </div>
            ))}
          </div>
        </SectionLayout>

        {/* Projects section - convert to SectionLayout */}
        <SectionLayout
          id="projects-section"
          title="Projects and Innovations"
          description={
            <>
              Explore our groundbreaking projects that are shaping the future of{" "}
              <span className="font-semibold text-primary-600">aerospace technology</span>.
            </>
          }
          titleAlignment="center"
          descriptionAlignment="center"
          descriptionAlignmentMobile="center"
        >
          <FeaturedProjectsShowcase />
          <div className="flex pb-8 md:pb-12 justify-center items-center relative w-full mt-8" data-aos="fade-up" data-aos-delay="300">
            <Button
              as={Link}
              className="bg-black/15 text-white shadow-xl rounded-lg"
              href="/projects"
              variant="bordered"
            >
              See All Projects <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </SectionLayout>

        {/* Team section - convert to SectionLayout */}
        <SectionLayout
          id="team-section"
          title="The Greatest Team Ever Assembled"
          description={
            <>
              <span className="font-semibold text-accent-600">Thunderclap Labs</span> is fueled by{" "}
              <span className="font-semibold text-primary-600">passion</span>,{" "}
              <span className="font-semibold text-primary-600">curiosity</span>, and a relentless drive to innovate. Our team brings together the brightest minds in engineering, science, and technology to build the future—one breakthrough at a time.
            </>
          }
          titleAlignment="center"
          descriptionAlignment="right"
          isColumnLayout={false}
        >
          <TeamSwiper />
          <div className="flex pb-8 md:pb-12 justify-center items-center relative w-full mt-8" data-aos="fade-up" data-aos-delay="300">
            <Button
              as={Link}
              className="bg-black/15 text-white shadow-xl rounded-lg"
              href="/team"
              variant="bordered"
            >
              More About The Team <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </SectionLayout>

        {/* Partner section - keep as is, has unique layout */}
        <section
          className="pt-20 pb-6 text-neutral-100"
          id="partner-section"
          data-aos="fade-up"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div
              className="mx-auto text-center"
              data-aos-anchor="#partner-section"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center lg:text-left pb-4">
                Partner with Us:<br/>
                Investing in a High-Impact Future
              </h2>
            </div>
          </div>
          <div className="px-4 mt-12">
            <FundingChartSection />
          </div>
          <div className="flex pt-8 md:pt-12 justify-center items-center relative w-full" data-aos="fade-up" data-aos-delay="300">
            <Button
              as={Link}
              className="bg-black/15 text-white shadow-xl rounded-lg"
              href="/contact"
              variant="bordered"
            >
              Contact Us <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
        </section>
      </div> 
    </div>
  );
}