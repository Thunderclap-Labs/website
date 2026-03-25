"use client";

import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import * as THREE from "three";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faLayerGroup,
  faRocket,
  faArrowRight,
  faSatelliteDish,
} from "@fortawesome/free-solid-svg-icons";

import { useFeaturedCardMouseEffect } from "@/lib/featured-card";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { StatsGrid } from "@/components/common/stats-grid";
import { ManufacturingFeatureCard } from "@/components/common/manufacturing-feature-card";
import { TeamSwiper } from "@/components/common/team-swiper";
import { FeaturedProjectsShowcase } from "@/components/common/featured-projects-showcase";
import { SatelliteInfoOverlay } from "@/components/common/satellite-info-overlay";
import { SectionLayout } from "@/components/common/section-layout";
import { SponsorsSwiper } from "@/components/common/sponsors-swiper";
import { App } from "@/lib/globe/App";
import { Globe } from "@/lib/globe/Globe";
import { Points } from "@/lib/globe/Points";
import { Markers } from "@/lib/globe/Markers";
import { Lines } from "@/lib/globe/Lines";
import {
  config,
  elements,
  groups,
  animations,
  sampleCountries,
} from "@/lib/globe/config";
import grid from "@/components/globe/data/grid.json";
import {
  focusAreas,
  propulsionTimelineItems,
  statsData,
  manufacturingFeatures,
} from "@/constants/home-page";
import { sponsors } from "@/constants/sponsors";

import "./styles/hero.css";

export default function Home() {
  const cardGridRef = useRef<HTMLDivElement>(null); // Ref for the card grid
  const [isClientMobile, setIsClientMobile] = useState<boolean | null>(null);
  const [shouldShowOverlays, setShouldShowOverlays] = useState(true);

  // Globe state
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<App | null>(null);
  const [isGlobeVisible, setIsGlobeVisible] = useState(false);

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

        // Hide overlays if height is less than 800px to prevent overlapping
        const heightCheck = window.innerHeight >= 800;

        setShouldShowOverlays(heightCheck);
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
      groups.main.name = "Main";

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
        // eslint-disable-next-line no-console
        console.error("Failed to load country data for points:", error);
      }

      new Markers(sampleCountries);

      groups.globe!.add(groups.markers!);

      const lines = new Lines();

      app.lines = lines;
      groups.globe!.add(groups.lines!);

      app.scene.add(groups.main);

      // Start fade-in animation after a short delay
      setTimeout(() => {
        setIsGlobeVisible(true);
      }, 100);
    };

    const animate = (_app: App) => {
      // Animate globe fade-in
      if (isGlobeVisible && elements.globeOpacity < 1) {
        elements.globeOpacity = Math.min(elements.globeOpacity + 0.02, 1);

        // Update globe opacity
        if (
          elements.globe &&
          elements.globe.material instanceof THREE.ShaderMaterial
        ) {
          elements.globe.material.uniforms.opacity.value =
            elements.globeOpacity;
        }

        // Update atmosphere opacity with debugging
        if (elements.atmosphere) {
          if (elements.atmosphere.material instanceof THREE.ShaderMaterial) {
            elements.atmosphere.material.uniforms.opacity.value =
              elements.globeOpacity * 0.6;
          }
        } else {
          // eslint-disable-next-line no-console
          console.log("Atmosphere not found in elements:", elements.atmosphere);
        }

        // Update points opacity
        if (elements.globePoints) {
          (elements.globePoints.material as THREE.PointsMaterial).opacity =
            elements.globeOpacity * 0.8;
        }

        // Update markers opacity
        elements.markerLabel.forEach((label) => {
          if (label.material instanceof THREE.SpriteMaterial) {
            label.material.opacity = elements.globeOpacity;
          }
        });

        elements.markerPoint.forEach((point) => {
          if (point.material instanceof THREE.MeshBasicMaterial) {
            point.material.opacity = elements.globeOpacity * 0.8;
          }
        });

        // Update lines opacity
        elements.lines.forEach((line) => {
          if (line.material instanceof THREE.LineBasicMaterial) {
            line.material.opacity = elements.globeOpacity * 0.45;
          }
        });
      }

      // Update points
      if (elements.globePoints) {
        (elements.globePoints.material as THREE.PointsMaterial).size =
          config.sizes.globeDotSize;
        (elements.globePoints.material as THREE.PointsMaterial).color.set(
          config.colors.globeDotColor,
        );
      }

      // Update globe scale
      if (elements.globe) {
        elements.globe.scale.set(
          config.scale.globeScale,
          config.scale.globeScale,
          config.scale.globeScale,
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

          (line.material as THREE.LineBasicMaterial).color.set(
            config.colors.globeLines,
          );
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

    const lithuania = sampleCountries.find((c) => c.name === "Lithuania");
    const initialRotationX = lithuania
      ? (+lithuania.latitude * Math.PI) / 180 - 0.4
      : 0;
    const initialRotationY = lithuania
      ? (-lithuania.longitude * Math.PI) / 180 - 0.6
      : 0;

    const app = new App({ setup, animate, initialRotationX, initialRotationY });

    appRef.current = app;

    app.init(globeContainerRef.current);

    const handleResize = () => {
      app.handleResize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
              <div
                className={`absolute -top-24 md:-left-10 z-0 w-[1200px] h-[1200px] ${isGlobeVisible ? "globe-container" : "opacity-0"}`}
              >
                <div ref={globeContainerRef} />
              </div>
              {/* Satellite Info Overlay - Only show if height is sufficient */}
              {shouldShowOverlays && (
                <>
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
                    icon={faSatelliteDish}
                    isVisible={isGlobeVisible}
                    subtitle="2025"
                    title="Drone Detection"
                  />
                </>
              )}
            </>
          )}
          <div className="z-10 flex h-full items-center justify-center">
            <div
              className="flex flex-col items-center justify-center drop-shadow-sm"
              data-aos="fade-down"
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
        <SponsorsSwiper isClientMobile={isClientMobile} sponsors={sponsors} />
      </section>

      <div className="relative">
        <StarsBackground className="z-0" />
        <ShootingStars className="z-0" />

        {/* About section - keep as is, has custom layout */}
        <section
          className="py-32 text-neutral-100 relative"
          id="about-us-section"
        >
          <div className="container max-w-7xl mx-auto px-4 relative z-[1]">
            <div>
              <h1
                className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center lg:text-left"
                data-aos="fade-up"
              >
                Engineering the Future of Atmospheric and Aerospace Systems
              </h1>
            </div>
            <div className="flex justify-end w-full text-lg my-8 mb-16">
              <div
                className="max-w-3xl text-lg md:text-3xl font-normal leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <span className="font-semibold text-accent-600">
                  Thunderclap Labs
                </span>{" "}
                is at the forefront of{" "}
                <span className="font-semibold text-primary-600">
                  innovation
                </span>
                , developing critical{" "}
                <span className="font-semibold text-primary-600">
                  technologies
                </span>{" "}
                to solve complex global challenges. We build the{" "}
                <span className="font-semibold text-primary-600">
                  platforms
                </span>{" "}
                and systems that will define the next era of{" "}
                <span className="font-semibold text-primary-600">
                  atmospheric management
                </span>
                ,{" "}
                <span className="font-semibold text-primary-600">
                  aerospace capability
                </span>
                , and beyond.
              </div>
            </div>
            <div
              ref={cardGridRef}
              className={`grid grid-cols-1 md:grid-cols-4 mt-8 rounded-lg bg-neutral-600 ${isClientMobile ? "bg-opacity-0" : "bg-opacity-55 featured-card white-feature gap-[1px]"} p-[1px]`}
              data-aos="fade-up"
              data-aos-delay="500"
              id="focus-areas"
            >
              {focusAreas.map((area, i) => (
                <div
                  key={area.title}
                  className={`flex p-4 flex-col h-full bg-black bg-opacity-95 ${isClientMobile ? "border border-neutral-700" : "rounded-lg"}`}
                  data-aos="fade-up"
                  data-aos-anchor={
                    isClientMobile === false ? "#focus-areas" : undefined
                  }
                  data-aos-delay={i * 100}
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
                        sizes="(max-width: 768px) 100vw, 25vw"
                        src={area.image}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12" data-aos="fade-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-neutral-100">
                <StatsGrid stats={statsData} />
              </div>
            </div>
          </div>
        </section>

        {/* Propulsion section - convert to SectionLayout */}
        <SectionLayout
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
          descriptionAlignment="right"
          descriptionAlignmentMobile="left"
          id="propulsion-section-new"
          title="Next-Generation Propulsion Systems"
          titleAlignment="left"
        >
          {/* Timeline Start */}
          <div className="mt-16">
            <div className="timeline-container flex flex-col md:flex-row items-start justify-between">
              {propulsionTimelineItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`timeline-item flex flex-col items-center ${index === 0 ? "active" : ""} flex-1`}
                >
                  <div className="flex items-center w-full">
                    <div
                      className={`timeline-dot ${index === 0 ? "active" : ""}`}
                    />
                    {index < propulsionTimelineItems.length - 1 && (
                      <div className="timeline-line flex-grow" />
                    )}
                  </div>
                  <div
                    className={`timeline-content mt-3 px-2 ${index === 0 ? "active" : ""}`}
                  >
                    <p className="text-xs md:text-sm font-medium timeline-title">
                      {item.title}
                    </p>
                    <p className="text-xs mt-1 timeline-description">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Timeline End */}
        </SectionLayout>

        {/* Manufacturing section - convert to SectionLayout */}
        <SectionLayout
          description={
            <>
              We are pioneering manufacturing by developing our own{" "}
              <span className="font-semibold text-primary-600">
                production systems
              </span>
            </>
          }
          descriptionAlignment="center"
          descriptionAlignmentMobile="center"
          id="manufacturing-section"
          title="Manufacturing Excellence"
          titleAlignment="center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 overflow-visible">
            {manufacturingFeatures.map((feature, i) => (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <ManufacturingFeatureCard
                  description={feature.description}
                  image={feature.image}
                  title={feature.title}
                />
              </div>
            ))}
          </div>
        </SectionLayout>

        {/* Projects section - convert to SectionLayout */}
        <SectionLayout
          description={
            <>
              Explore our groundbreaking projects that are shaping the future of{" "}
              <span className="font-semibold text-primary-600">
                aerospace technology
              </span>
              .
            </>
          }
          descriptionAlignment="center"
          descriptionAlignmentMobile="center"
          id="projects-section"
          title="Projects and Innovations"
          titleAlignment="center"
        >
          <FeaturedProjectsShowcase />
          <div
            className="flex pb-8 md:pb-12 justify-center items-center relative w-full mt-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
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
          description={
            <>
              <span className="font-semibold text-accent-600">
                Thunderclap Labs
              </span>{" "}
              is fueled by{" "}
              <span className="font-semibold text-primary-600">passion</span>,{" "}
              <span className="font-semibold text-primary-600">curiosity</span>,
              and a relentless drive to innovate. Our team brings together the
              brightest minds in engineering, science, and technology to build
              the future—one breakthrough at a time.
            </>
          }
          descriptionAlignment="right"
          id="team-section"
          isColumnLayout={false}
          title="The Greatest Team Ever Assembled"
          titleAlignment="center"
        >
          <TeamSwiper />
          <div
            className="flex pb-8 md:pb-12 justify-center items-center relative w-full mt-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
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

        {/* R&D Partner section - redesigned */}
        <section
          className="relative py-32 z-10 border-t border-white/10 overflow-hidden"
          id="rnd-partner-section"
        >
          {/* Subtle radial accent */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_60%,_rgba(121,68,154,0.07),transparent_55%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_80%_30%,_rgba(41,196,255,0.04),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 container max-w-7xl mx-auto px-4">
            {/* Section header */}
            <div
              className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8"
              data-aos="fade-up"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-12 bg-primary-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                    B2B R&amp;D Services
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-[0.9]">
                  Research &amp; Development
                  <br />
                  <span className="text-neutral-500">For Our Partners</span>
                </h2>
              </div>
              <p className="max-w-md text-neutral-400 text-sm md:text-base leading-relaxed">
                We leverage our cutting-edge technology and world-class
                engineering team to conduct specialized R&amp;D for our
                partners. From conceptualization to prototyping and testing, we
                turn complex challenges into innovative solutions.
              </p>
            </div>

            {/* Capability cards */}
            <div
              className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl overflow-hidden mb-20"
              data-aos="fade-up"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/10 w-full h-full rounded-xl overflow-hidden">
                {[
                  {
                    id: "01",
                    title: "RAPID PROTOTYPING",
                    description:
                      "Accelerate your innovation cycle with our advanced manufacturing and testing facilities. From concept to working prototype in weeks, not months.",
                  },
                  {
                    id: "02",
                    title: "SYSTEMS ENGINEERING",
                    description:
                      "Comprehensive design and full-stack integration of complex aerospace and atmospheric systems. Hardware-software co-design from day one.",
                  },
                  {
                    id: "03",
                    title: "TESTING & VALIDATION",
                    description:
                      "Rigorous testing protocols to ensure reliability and performance in extreme environments. Digital twin simulation before real-world deployment.",
                  },
                ].map((cap) => (
                  <div
                    key={cap.id}
                    className="bg-black/95 p-10 group flex flex-col h-full w-full"
                  >
                    <div className="font-mono text-sm text-neutral-600 mb-8 border-b border-white/5 pb-4 group-hover:text-primary-500 transition-colors duration-500">
                      {"// "}
                      {cap.id}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4 text-neutral-100 group-hover:text-white transition-colors duration-500">
                      {cap.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mt-auto">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline steps + CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              {/* Pipeline */}
              <div className="lg:col-span-3" data-aos="fade-right">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-primary-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                    Our Pipeline
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none mb-10">
                  RAPID.
                  <br />
                  <span className="text-neutral-600">ITERATIVE.</span>
                  <br />
                  LETHAL.
                </h3>
                <div className="space-y-0">
                  {[
                    {
                      step: "01",
                      name: "Conceptualization & Physics Simulation",
                    },
                    { step: "02", name: "Hardware & Software Co-design" },
                    { step: "03", name: "Rapid Machining & PCB Fabrication" },
                    { step: "04", name: "Field Testing & System Hardening" },
                  ].map((item, i) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-6 group cursor-default border-b border-white/5 py-5 first:border-t first:border-white/5"
                      data-aos="fade-up"
                      data-aos-delay={i * 75}
                    >
                      <span className="font-mono text-sm text-neutral-600 group-hover:text-primary-500 transition-colors shrink-0">
                        [{item.step}]
                      </span>
                      <span className="text-neutral-300 uppercase tracking-wider text-sm font-semibold group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="lg:col-span-2" data-aos="fade-left">
                <div className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl overflow-hidden">
                  <div className="bg-black/95 p-8 rounded-xl flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="block w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                        Secure Channel Open
                      </span>
                    </div>
                    <div>
                      <p className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-none mb-4">
                        BUILD THE{" "}
                        <span className="text-neutral-600">IMPOSSIBLE.</span>
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        Engage our engineering skunkworks. From theoretical
                        concept to field-ready hardware, we accelerate your
                        mission-critical timelines.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-center">
                      <div className="border border-white/5 p-3 rounded-lg bg-white/5 flex flex-col gap-1">
                        <span className="text-primary-500/50">Response</span>
                        <span className="text-white">&lt; 24 Hours</span>
                      </div>
                      <div className="border border-white/5 p-3 rounded-lg bg-white/5 flex flex-col gap-1">
                        <span className="text-primary-500/50">Security</span>
                        <span className="text-white">NDA Ready</span>
                      </div>
                    </div>
                    <Button
                      as={Link}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 text-white font-mono text-xs uppercase tracking-wider rounded-lg justify-between"
                      href="/rnd"
                      variant="bordered"
                    >
                      Explore Capabilities{" "}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                    <Button
                      as={Link}
                      className="bg-black/15 text-neutral-400 rounded-lg font-mono text-xs uppercase tracking-wider"
                      href="/contact"
                      variant="bordered"
                    >
                      Partner With Us <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
