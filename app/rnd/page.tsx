"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Button } from "@heroui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Swirl } from "@/components/ui/swirl";
import { useFeaturedCardMouseEffect } from "@/lib/featured-card";

const CAPABILITIES = [
  {
    id: "01",
    title: "AUTONOMOUS SYSTEMS",
    description:
      "Architecting zero-trust decision engines and computer vision pipelines for uncrewed platforms. From edge inference to multi-agent swarm coordination.",
  },
  {
    id: "02",
    title: "DIGITAL TWIN SIMULATION",
    description:
      "High-fidelity synthetic environments. We train and validate mission-critical models in physics-accurate virtual arenas before real-world deployment.",
  },
  {
    id: "03",
    title: "AEROSPACE & ORBITAL",
    description:
      "Radiation-hardened compute, telemetry processing, and lightweight composite structures engineered for extreme altitude and orbital operations.",
  },
  {
    id: "04",
    title: "ADVANCED ROBOTICS",
    description:
      "Custom automated hardware, drone payloads, and kinetic platforms built for extreme environments and specialized industrial tasks.",
  },
  {
    id: "05",
    title: "EMBEDDED ENGINEERING",
    description:
      "Bare-metal programming, custom PCB design, and ultra-low-latency edge nodes designed for seamless, fail-safe hardware control.",
  },
  {
    id: "06",
    title: "SCALABLE INFRASTRUCTURE",
    description:
      "Distributed backends, secure cloud-native deployments, and high-throughput data pipelines built to process massive sensor telemetry.",
  },
];

export default function RndPage() {
  useFeaturedCardMouseEffect();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="relative bg-black min-h-screen text-white font-sans selection:bg-primary-500/30">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            preload="metadata"
          >
            <source src="/rnd-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Top Hero Meta */}
        <div
          className="relative z-10 container max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between tracking-widest text-[10px] md:text-xs text-neutral-400 font-mono uppercase"
          data-aos="fade-down"
        >
          <span>THUNDERCLAP LABS // R&D</span>
          <span>EST. 2025</span>
        </div>

        {/* Hero Title */}
        <div className="relative z-10 container max-w-screen-2xl mx-auto px-6 md:px-12 mb-10 md:mb-20">
          <h1
            className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter uppercase leading-[0.9] md:leading-[0.85] mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            TRANSFORMING
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">
              IDEAS INTO
            </span>
            <br />
            <span className="text-primary-400">REALITY.</span>
          </h1>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed border-l-2 border-primary-500/50 pl-6">
              Your external skunkworks. We empower businesses to rapidly design,
              prototype, and manufacture custom hardware and autonomous systems
              on demand.
            </p>
            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-neutral-500 uppercase tracking-wider">
              <ul className="space-y-2">
                <li>&rarr; Firmware</li>
                <li>&rarr; Autonomy</li>
                <li>&rarr; Avionics</li>
              </ul>
              <ul className="space-y-2">
                <li>&rarr; Robotics</li>
                <li>&rarr; AI & ML</li>
                <li>&rarr; Sensors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="relative py-32 z-10 border-t border-white/10 bg-black">
        <StarsBackground className="z-0 opacity-50" />
        <ShootingStars className="z-0" />

        <div className="relative z-10 container max-w-screen-2xl mx-auto px-6 md:px-12">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
            data-aos="fade-up"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                  Domains
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
                Engineering <br className="hidden md:block" />
                <span className="text-neutral-500">Excellence</span>
              </h2>
            </div>
            <p className="max-w-md text-neutral-400 text-sm md:text-base leading-relaxed">
              Commission our elite engineering teams to tackle your hardest
              technical challenges. We provide integrated B2B R&amp;D
              services—delivering proprietary, mission-ready solutions precisely
              engineered to your business needs.
            </p>
          </div>

          <div
            className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl overflow-hidden"
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 w-full h-full rounded-xl overflow-hidden">
              {CAPABILITIES.map((cap, index) => (
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
        </div>
      </section>

      {/* RAPID PIPELINE SECTION */}
      <section className="relative py-32 z-10 bg-neutral-950 border-t border-white/5 overflow-hidden">
        <div className="lg:opacity-100 opacity-0 absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Pipeline */}
            <div className="lg:col-span-5" data-aos="fade-right">
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

            {/* CTA card + Simulation Core Graphic */}
            <div
              className="lg:col-span-7"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl overflow-hidden h-full flex flex-col">
                <div className="bg-black/95 rounded-xl h-full flex flex-col overflow-hidden relative group">
                  {/* Top Graphic Section (Simulation Core) */}
                  <div className="relative h-48 md:h-64 border-b border-white/10 overflow-hidden flex flex-col group/sim">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay z-10 pointer-events-none" />

                    {/* Swirl Simulation Core */}
                    <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen scale-[1.3] group-hover/sim:scale-[1.5] group-hover/sim:opacity-100 transition-all duration-1000 ease-out flex items-center justify-center">
                      <Swirl />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black_85%)] pointer-events-none" />
                      {/* Vignette overlay to fade out edges clearly */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10 pointer-events-none" />
                    </div>

                    {/* UI Elements inside header */}
                    <div className="relative z-30 flex flex-col justify-between h-full w-full p-4 pointer-events-none">
                      {/* Top Bar */}
                      <div className="flex justify-between items-start w-full">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-primary-400 font-semibold tracking-widest bg-primary-950/60 px-2 py-1.5 rounded backdrop-blur-sm border border-primary-500/20">
                            SIMULATION_CORE
                          </span>
                          <span className="font-mono text-[9px] text-neutral-400 tracking-wider pl-1">
                            NODE // 0x4A9
                          </span>
                        </div>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                          <span className="block w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          LIVE
                        </span>
                      </div>

                      {/* Small inline data tracker bottom right */}
                      <div className="mt-auto self-end font-mono bg-black/40 p-3 rounded-lg backdrop-blur-md border border-white/5 w-48 sm:w-64 max-w-full">
                        <div className="flex justify-between items-end mb-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] text-neutral-400 uppercase tracking-widest">
                              Processing
                            </span>
                            <span className="text-[10px] sm:text-xs text-white flex items-center gap-2">
                              <span className="block w-1.5 h-3 sm:h-4 bg-primary-500" />
                              ACTIVE
                            </span>
                          </div>
                          <div className="text-right flex flex-col">
                            <span className="text-[10px] text-primary-400 font-semibold">
                              128.4 TB/s
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex items-end gap-[2px] h-4 sm:h-6 flex-1">
                          {[...Array(24)].map((_, i) => {
                            const heights = [
                              "h-[40%]",
                              "h-[85%]",
                              "h-[30%]",
                              "h-[90%]",
                              "h-[50%]",
                              "h-[100%]",
                              "h-[75%]",
                              "h-[20%]",
                              "h-[65%]",
                              "h-[45%]",
                              "h-[95%]",
                              "h-[35%]",
                              "h-[80%]",
                              "h-[55%]",
                              "h-[15%]",
                              "h-[60%]",
                              "h-[100%]",
                              "h-[70%]",
                              "h-[25%]",
                              "h-[95%]",
                              "h-[50%]",
                              "h-[85%]",
                              "h-[40%]",
                              "h-[75%]",
                            ];
                            const animations = [
                              "animate-pulse",
                              "",
                              "animate-pulse",
                              "",
                              "",
                              "animate-pulse",
                              "",
                              "animate-pulse",
                              "",
                              "",
                              "animate-pulse",
                              "",
                              "animate-pulse",
                              "",
                              "animate-pulse",
                              "",
                              "",
                              "animate-pulse",
                              "",
                              "",
                              "animate-pulse",
                              "",
                              "animate-pulse",
                              "",
                            ];

                            return (
                              <div
                                key={i}
                                className={`w-full bg-white/10 rounded-t-sm ${heights[i]} ${animations[i]}`}
                              >
                                <div className="w-full h-full bg-primary-500/50 group-hover:bg-primary-400/80 transition-colors" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Text/CTA Section */}
                  <div className="p-8 sm:p-10 flex flex-col gap-6 flex-1 justify-center relative">
                    {/* Faint subtle grid in background of CTA area */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none" />

                    <div className="relative z-10 flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <span className="block w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse" />
                        <span className="font-mono text-xs uppercase tracking-widest text-primary-400 font-semibold">
                          Secure Channel Open
                        </span>
                      </div>
                      <div>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[0.9] mb-4">
                          BUILD THE{" "}
                          <span className="text-neutral-600">IMPOSSIBLE.</span>
                        </h3>
                        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg">
                          Engage our engineering skunkworks. From theoretical
                          concept to field-ready hardware, we accelerate your
                          mission-critical timelines.
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2 items-stretch">
                        <div className="grid grid-cols-2 gap-3 font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest text-center shrink-0 w-full sm:w-auto h-full">
                          <div className="border border-white/5 p-3 rounded-lg bg-white/5 flex flex-col justify-center gap-1 w-full sm:w-32 h-full">
                            <span className="text-primary-500/50">
                              Response
                            </span>
                            <span className="text-white">&lt; 24 Hours</span>
                          </div>
                          <div className="border border-white/5 p-3 rounded-lg bg-white/5 flex flex-col justify-center gap-1 w-full sm:w-32 h-full">
                            <span className="text-primary-500/50">
                              Security
                            </span>
                            <span className="text-white">NDA Ready</span>
                          </div>
                        </div>

                        <Button
                          as={Link}
                          className="group bg-black/15 text-neutral-300 hover:text-white border border-white/10 hover:border-primary-500/50 rounded-lg font-mono text-xs uppercase tracking-wider flex-1 h-auto min-h-full py-4 mt-2 sm:mt-0 transition-all duration-300 relative overflow-hidden"
                          href="/contact"
                          variant="bordered"
                        >
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                          <span className="relative z-10">Partner With Us</span>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="relative z-10 group-hover:translate-x-1 transition-transform"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
