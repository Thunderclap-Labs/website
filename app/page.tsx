"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

// Assuming these paths are correct for your project structure

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCogs, faFlask, faRobot, faRecycle, faCloudRain, faShieldAlt, faEye, faSeedling, faTint, faSmog, faBullseye, faBolt, faBatteryHalf, faRocket, faSatelliteDish, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import ltarmedforces from "../components/images/ltarmedforces.png";
import ktustartupspace from "../components/images/ktustartupspace.png";
import pcbway from "../components/images/pcbway.png";
import fwd from "../components/images/fwd.png";
import cloudseeding from "../components/images/cloudseeding.png";
import rockettop from "../components/images/rockettop.png";
import dronewireframe from "../components/images/dronewireframe.png";
import conveyorwireframe from "../components/images/conveyorwireframe.png";
import cansatwireframe from "../components/images/cansatwireframe.png";
import makerspace from "../components/images/makerspace.png";
import logo from "../components/images/logo.png";

import { useFeaturedCardMouseEffect } from "@/lib/featured-card"; // Import the new hook
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "./styles/hero.css";
import { StatsGrid } from "@/components/common/stats-grid";

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
    value: "9",
    title: "Industry Experts", 
    description: "A dedicated team of the best and brightest minds.",
  },
  {
    value: "∞",
    title: "Infinite Passion",
    description: "Fueled by a relentless drive for innovation.",
  },
];

export default function Home() {
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isClientMobile, setIsClientMobile] = useState<boolean | null>(null);

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

  useEffect(() => {
    if (isClientMobile === null) return; // Don't do anything until mobile status is known

    if (!isClientMobile) {
      // Desktop-only logic (Globe initialization)
      const globeVizElement = document.getElementById("globeViz");

      if (!globeVizElement) {
        // console.error("Globe container 'globeViz' not found for desktop.");
        return;
      }

      // Check if globe is already initialized to prevent re-initialization on resize
      if (globeVizElement.childElementCount > 0) {
        // Simple check, might need refinement
        // console.log("Globe already initialized or being initialized.");
        // Ensure pointer events are correct for desktop
        globeVizElement.style.pointerEvents = "auto";

        return;
      }

      import("globe.gl")
        .then((globeModule) => {
          const GlobeGl = globeModule.default;
          const Globe = new GlobeGl(globeVizElement);

          Globe.globeImageUrl(
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/The_earth_at_night.jpg/2560px-The_earth_at_night.jpg",
          )
            .bumpImageUrl(
              "//unpkg.com/three-globe/example/img/earth-topology.png",
            )
            .backgroundImageUrl(
              "//unpkg.com/three-globe/example/img/night-sky.png",
            );

          Globe.pointOfView({ lat: 30, lng: 26, altitude: 2.3 });

          Globe.controls().autoRotate = true;
          Globe.controls().autoRotateSpeed = 0.2;
          Globe.controls().enableZoom = false;
          globeVizElement.style.pointerEvents = "auto";
        })
        .catch((error) => {
          console.error("Failed to load globe.gl module", error);
        });
    }
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
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden bg-black">
        <div
          className="relative md:mx-6 h-[calc(100vh-170px)] w-full md:rounded-xl overflow-hidden"
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
            <div className="absolute -top-24 md:-left-10 z-0" id="globeViz" />
          )}
          <div className="z-10 flex h-full items-center justify-center">
            <div
              className="flex flex-col items-center justify-center drop-shadow-sm "
              id="Title"
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
                  // Mobile: show 1 slide, centered, with peeking neighbors
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  // Tablet: show 1 slide, centered (or adjust as needed)
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                  },
                  // Desktop: show 4 slides
                  768: { 
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                }}
                centeredSlides={true}
                className="sponsors-swiper"
                loop={true}
                modules={[Autoplay]}
                // Default slidesPerView for smallest screens, will be overridden by breakpoints
                slidesPerView={1.2} 
                spaceBetween={10} // Default spaceBetween for smallest screens
              >
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
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
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
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
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1600}
                  >
                    <Image alt="PCBWay" height={30} src={pcbway} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image alt="Makerspace" height={30} src={makerspace} className="object-contain" />
                  </div>
                </SwiperSlide>
                {/* Duplicate slides for better loop effect */}
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
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
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
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
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1600}
                  >
                    <Image alt="PCBWay" height={30} src={pcbway} className="object-contain" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    className="flex items-center justify-center h-16 max-w-48 mx-auto" // Added h-16 for vertical centering
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#Hero" }
                      : {})}
                    data-aos-delay={isClientMobile ? 0 : 1200}
                  >
                    <Image alt="Kaunas Makerspace" height={30} src={makerspace} className="object-contain" />
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
         <section
        className="py-32 text-neutral-100 relative"
        data-aos="fade-up"
        id="about-us-section"
      >
        <div className="container max-w-7xl mx-auto px-4 relative z-[1]">
          <div>
            <h1 className="text-7xl font-semibold">Engineering the Future of Atmospheric and Aerospace Systems</h1>
          </div>
          <div className="flex justify-end w-full text-lg my-8 mb-16">
            <div className="max-w-3xl text-2xl md:text-3xl font-normal leading-relaxed">
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
            className="grid grid-cols-1 md:grid-cols-4 mt-8 featured-card bg-neutral-600 bg-opacity-55 white-feature gap-[1px] p-[1px]"
            data-aos="fade-up"
            id="focus-areas"
          >
            {focus_areas.map((area, i) => (
              <div
                key={area.title}
                className="flex p-4 flex-col h-full bg-black bg-opacity-95 !transition-all duration-300"
                data-aos="fade-up"
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
            <StatsGrid stats={statsData} />
            </div>
        </div>
      </section>
        <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          data-aos="fade-up"
          id="propulsion-section-new"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12">
              <h1 className="text-7xl font-semibold">Next-Generation Propulsion Systems</h1>
            </div>
            <div className="flex justify-end w-full text-lg my-4 ">
                <div className="max-w-3xl text-2xl md:text-3xl leading-relaxed">
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
                </div>
            </div>
            {/* Timeline Start */}
            <div className="mt-28 mb-8">
              <div className="timeline-container flex items-start justify-between">
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
          </div>
        </section>

                <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          data-aos="fade-up"
          id="propulsion-section-new"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12 text-center">
              <h1 className="text-7xl font-semibold">Manufacturing Excellence</h1>
            </div>
            <div className="flex justify-center text-center w-full text-lg my-4 ">
              <div className="max-w-3xl text-2xl md:text-3xl leading-relaxed">
              We are pioneering manufacturing by developing our own{" "}
              <span className="font-semibold text-primary-600">
                production systems
              </span>
              </div>
            </div>
          </div>
        </section>
        <section
          className="relative py-20 bg-transparent text-neutral-100 overflow-hidden"
          data-aos="fade-up"
          id="propulsion-section"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
              <div
                data-aos="fade-right"
                {...(isClientMobile === false
                  ? { "data-aos-anchor": "#propulsion-section" }
                  : {})}
                className="featured-card w-fit h-min white-feature bg-neutral-800 p-[1px]"
                data-aos-delay={isClientMobile ? "0" : "300"}
              >
                <div className="shadow-xl overflow-hidden">
                  <Image
                    alt="FWD"
                    data-aos="zoom-in"
                    src={fwd}
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#propulsion-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "400"}
                  />
                </div>
              </div>
              <div>
                <div
                  data-aos="fade-up"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#propulsion-section" }
                    : {})}
                >
                  <h3
                    className="text-3xl font-bold tracking-tight text-primary-600"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#propulsion-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "100"}
                  >
                    Next-Generation Propulsion Systems
                  </h3>
                  <p
                    className="text-lg my-4 text-neutral-300"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#propulsion-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "200"}
                  >
                    Redefining access to the skies with advanced rocket and
                    propulsion systems.
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#propulsion-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "300"}
                >
                  <ul className="space-y-4 text-neutral-300">
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "350"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0 mb-1">
                        <FontAwesomeIcon 
                          icon={faCogs} 
                          className="text-lg flex-shrink-0 text-primary-600" 
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600">
                          Modular Rocket Architecture<br/>
                        </span>{" "}
                        Easily configurable for diverse mission profiles.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "400"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faFlask}
                          className="text-lg flex-shrink-0 text-primary-600"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Advanced Propellant Technologies<br/>
                        </span>{" "}
                        Researching high-performance, eco-friendly propellants
                        for increased efficiency and reduced environmental
                        impact.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "450"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faRobot}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1" >
                          AI-Driven Launch Operations<br/>
                        </span>{" "}
                        Autonomous systems for pre-flight checks, trajectory
                        optimization, and in-flight anomaly detection.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "500"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faRecycle}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Rapid Reusability<br/>
                        </span>{" "}
                        Designing for quick turnaround and refurbishment,
                        significantly lowering launch costs.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "600"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faSatelliteDish}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Next-Gen Avionics & Control<br/>
                        </span>{" "}
                        Developing sophisticated, fault-tolerant avionics for precise control and real-time data telemetry.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#propulsion-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "700"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faBatteryHalf}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Sustainable Manufacturing & Launch<br/>
                        </span>{" "}
                        Implementing eco-conscious manufacturing processes and minimizing environmental impact of launch activities.
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="xl:block hidden text-center mt-6"
                  data-aos="zoom-in"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#propulsion-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "600"}
                >
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="py-20 bg-transparent text-neutral-100"
          data-aos="fade-up"
          id="cloud-seeding-section"
        >
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
              <div>
                <div
                  data-aos="fade-up"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#cloud-seeding-section" }
                    : {})}
                >
                  <h3
                    className="text-3xl font-bold tracking-tight text-primary-600"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#cloud-seeding-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "100"}
                  >
                    Advanced Cloud Seeding: Drone/Rocket-Powered Weather Modification
                  </h3>
                  <p
                    className="text-lg mt-4 mb-6 text-white"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#cloud-seeding-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "200"}
                  >
                    Pioneering solutions to global water scarcity and weather-related agricultural damage through advanced atmospheric technology.
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#cloud-seeding-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "300"}
                >
                  <ul className="space-y-4 text-neutral-300">
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#cloud-seeding-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "350"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0 mb-1">
                        <FontAwesomeIcon 
                          icon={faCloudRain} 
                          className="text-lg flex-shrink-0 text-primary-600" 
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600">
                          Enhanced Precipitation<br/>
                        </span>{" "}
                        Augmenting rainfall in drought-prone areas for improved water resources.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#cloud-seeding-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "400"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faShieldAlt}
                          className="text-lg flex-shrink-0 text-primary-600"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Hail Suppression<br/>
                        </span>{" "}
                        Protecting crops and property from hail damage through targeted atmospheric intervention.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#cloud-seeding-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "450"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1" >
                          Fog Alleviation/Dispersal<br/>
                        </span>{" "}
                        Improving visibility for transport and operations through precision atmospheric control.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#cloud-seeding-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "550"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faSeedling}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Agricultural Support<br/>
                        </span>{" "}
                        Optimizing water resources for farming and crop yield enhancement.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#cloud-seeding-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "600"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faTint}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Water Resource Management<br/>
                        </span>{" "}
                        Enhancing water supply for various industrial and municipal needs.
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="xl:block hidden text-center mt-6"
                  data-aos="zoom-in"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#cloud-seeding-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "700"}
                >
                </div>
              </div>
              <div className="overflow-hidden">
                <Image
                  alt="Cloud Seeding Rocket System"
                  data-aos="zoom-in"
                  src={cloudseeding}
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#cloud-seeding-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "400"}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className="py-20 text-neutral-100"
          data-aos="fade-up"
          id="thunderbee-section"
        >
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
              <Image
                alt="ThunderBee Drone Concept"
                data-aos="zoom-in"
                src={dronewireframe}
                {...(isClientMobile === false
                  ? { "data-aos-anchor": "#thunderbee-section" }
                  : {})}
                data-aos-delay={isClientMobile ? "0" : "400"}
              />
              <div>
                <div
                  data-aos="fade-up"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#thunderbee-section" }
                    : {})}
                >
                  <h3
                    className="text-3xl font-bold tracking-tight text-primary-600"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#thunderbee-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "100"}
                  >
                    ThunderBee: The Micro-Interceptor Drone
                  </h3>
                  <p
                    className="text-lg my-4 text-neutral-300"
                    data-aos="fade-up"
                    {...(isClientMobile === false
                      ? { "data-aos-anchor": "#thunderbee-section" }
                      : {})}
                    data-aos-delay={isClientMobile ? "0" : "200"}
                  >
                    European Union Defence Innovation Scheme (EUDIS) hackathon winner - trusted by the Lithuanian Armed Forces, ThunderBee is a novel, cost-effective countermeasure responding to the challenge posed by jamming-resistant fiber-optic drones.
                  </p>
                </div>
                <div
                  data-aos="fade-left"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": "#thunderbee-section" }
                    : {})}
                  data-aos-delay={isClientMobile ? "0" : "300"}
                >
                  <ul className="space-y-4 text-neutral-300">
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#thunderbee-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "350"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0 mb-1">
                        <FontAwesomeIcon 
                          icon={faBullseye} 
                          className="text-lg flex-shrink-0 text-primary-600" 
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600">
                          Jamming-Immune Countermeasure<br/>
                        </span>{" "}
                        Physically intercepts and neutralizes targets, bypassing electronic warfare limitations.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#thunderbee-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "400"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faSatelliteDish}
                          className="text-lg flex-shrink-0 text-primary-600"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          IR Detection System<br/>
                        </span>{" "}
                        Utilizes an IR camera and straightforward algorithm to reliably track enemy drones, effective in low light conditions.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#thunderbee-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "450"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faBolt}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1" >
                          Extreme Acceleration<br/>
                        </span>{" "}
                        Capable of very high acceleration for rapid target interception with exceptional thrust-to-weight ratio.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#thunderbee-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "500"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faRocket}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Compact & Agile Design<br/>
                        </span>{" "}
                        Highly compact and maneuverable design with low overall weight for swift response capability.
                      </div>
                    </li>
                    <li
                      className="flex items-start gap-3"
                      data-aos="fade-left"
                      {...(isClientMobile === false
                        ? { "data-aos-anchor": "#thunderbee-section" }
                        : {})}
                      data-aos-delay={isClientMobile ? "0" : "550"}
                    >
                      <div className="flex items-center justify-center bg-neutral-800 w-10 h-10 rounded-md flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faBatteryHalf}
                          className="text-primary-600 text-lg flex-shrink-0"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-primary-600 mb-1">
                          Short-Burst Endurance<br/>
                        </span>{" "}
                        Battery optimized for high-current discharge for focused, short-duration intercept missions.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex pb-8 md:pb-12 justify-center items-center relative w-full">
          <Button
            as={Link}
            className="bg-black/15 text-white shadow-xl"
            href="/projects"
            variant="bordered"
            data-aos="fade-up"
            {...(isClientMobile === false
              ? { "data-aos-anchor": "#partner-section" }
              : {})}
          >
            See All Projects <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>
      <section
        className="py-20 bg-neutral-800 text-neutral-100"
        data-aos="fade-up"
        id="partner-section"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
            data-aos="fade-up"
            {...(isClientMobile === false
              ? { "data-aos-anchor": "#partner-section" }
              : {})}
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-blue-400"
              data-aos="fade-up"
              {...(isClientMobile === false
                ? { "data-aos-anchor": "#partner-section" }
                : {})}
              data-aos-delay={isClientMobile ? "0" : "100"}
            >
              Partner with Us: Investing in a High-Impact Future
            </h2>
            <p
              className="text-lg md:text-xl text-neutral-300"
              data-aos="fade-up"
              {...(isClientMobile === false
                ? { "data-aos-anchor": "#partner-section" }
                : {})}
              data-aos-delay={isClientMobile ? "0" : "200"}
            >
              Thunderclap Labs is at a pivotal stage of growth, with
              groundbreaking projects like the ThunderBee interceptor and our
              advanced Cloud Seeding technology poised for significant
              advancement. We are seeking strategic investors to help us scale
              operations, finalize critical R&D, and bring these transformative
              solutions to the global market.
            </p>
          </div>
          <div className="flex gap-4 justify-center" data-aos="fade-up">
            <Button
              as={Link}
              className=" bg-secondary/5 text-secondary hover:bg-secondary/10 border-gray-800 shadow-xl"
              href="/contact"
              variant="bordered"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Contact Us
            </Button>
            <Button
              as={Link}
              className=" bg-secondary/50 text-white border-gray-800 shadow-xl"
              href="/team"
              variant="bordered"
            >
              Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}