"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';
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
import dryerwireframe from "../components/images/dryerwireframe.png";
import ballmill from "../components/images/ballmill.png";
import logo from "../components/images/logo.png";

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
            <div className="absolute -top-24 md:-left-10 z-0" id="globeViz" />
          )}
          <div className="z-10 flex h-full items-center justify-center">
            <div
              className="flex flex-col items-center justify-center drop-shadow-sm "
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
                    data-aos-delay={isClientMobile ? 0 : 1600}
                  >
                    <Image alt="PCBWay" height={30} src={pcbway} className="object-contain" />
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
                    data-aos-delay={isClientMobile ? 0 : 1600}
                  >
                    <Image alt="PCBWay" height={30} src={pcbway} className="object-contain" />
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
        id="about-us-section"
      >
        <div className="container max-w-7xl mx-auto px-4 relative z-[1]">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold" data-aos="fade-up">Engineering the Future of Atmospheric and Aerospace Systems</h1>
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
            className="grid grid-cols-1 md:grid-cols-4 mt-8 featured-card rounded-lg bg-neutral-600 bg-opacity-55 white-feature gap-[1px] p-[1px]"
            data-aos="fade-up"
            id="focus-areas"
          >
            {focus_areas.map((area, i) => (
              <div
                key={area.title}
                className="flex p-4 flex-col h-full bg-black bg-opacity-95 rounded-lg"
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
        <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          id="propulsion-section-new"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold" data-aos="fade-up">Next-Generation Propulsion Systems</h1>
            </div>
            <div className="flex justify-end w-full text-lg my-4 ">
                <div className="max-w-3xl text-lg md:text-3xl leading-relaxed" data-aos="fade-up" data-aos-delay="100">
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
            <div className="mt-28 mb-8" data-aos="fade-up" data-aos-delay="200">
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
          </div>
        </section>

        <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          id="manufacturing-section"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12 text-center">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold" data-aos="fade-up">Manufacturing Excellence</h1>
            </div>
            <div className="flex justify-center text-center w-full text-lg my-4 bg-transparent">
              <div
                className="max-w-3xl text-lg md:text-3xl leading-relaxed bg-transparent"
                data-aos="fade-up"
                data-aos-delay="100"
              >
              We are pioneering manufacturing by developing our own{" "}
              <span className="font-semibold text-primary-600">
                production systems
              </span>
              </div>
            </div>
          </div>
          <div className="container max-w-7xl mx-auto px-4 mt-12 overflow-visible">
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
          </div>
        </section>
        <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          id="projects-section"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center" data-aos="fade-up">Projects and Innovations</h1>
            </div>
            <div className="flex justify-center w-full text-lg my-4 ">
                <div className="max-w-3xl text-lg md:text-3xl leading-relaxed text-center " data-aos="fade-up" data-aos-delay="100">
                  Explore our groundbreaking projects that are shaping the future of <span className="font-semibold text-primary-600">aerospace technology</span>.
                </div>
            </div>
            <div className="my-12" data-aos="fade-up" data-aos-delay="200">
              <FeaturedProjectsShowcase />
            </div>
            <div className="flex pb-8 md:pb-12 justify-center items-center relative w-full" data-aos="fade-up" data-aos-delay="300">
              <Button
                as={Link}
                className="bg-black/15 text-white shadow-xl rounded-lg"
                href="/projects"
                variant="bordered"
              >
                See All Projects <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </section>
        <section
          className="relative py-20 bg-transparent text-white overflow-hidden"
          id="team-section"
        >
          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            <div className="pb-12">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center" data-aos="fade-up">The Greatest Team Ever Assembled</h1>
            </div>
            <div className="flex justify-end w-full text-lg my-4 ">
                <div className="max-w-3xl text-lg md:text-3xl leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                  <span className="font-semibold text-accent-600">Thunderclap Labs</span> is fueled by <span className="font-semibold text-primary-600">passion</span>, <span className="font-semibold text-primary-600">curiosity</span>, and a relentless drive to innovate. Our team brings together the brightest minds in engineering, science, and technology to build the future—one breakthrough at a time.
                </div>
            </div>
            <div className="my-12" data-aos="fade-up" data-aos-delay="200">
              <TeamSwiper />
            </div>
            <div className="flex pb-8 md:pb-12 justify-center items-center relative w-full" data-aos="fade-up" data-aos-delay="300">
              <Button
                as={Link}
                className="bg-black/15 text-white shadow-xl rounded-lg"
                href="/team"
                variant="bordered"
              >
                More About The Team <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
          <section
        className="py-20 text-neutral-100"
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
              className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white-400"
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
        </div>
      </section>
      <FundingChartSection />
        </section>
      </div> 
    </div>
  );
}