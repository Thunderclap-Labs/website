"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 p-[1px] rounded-xl overflow-hidden">
            {CAPABILITIES.map((cap, index) => (
              <div
                key={cap.id}
                className="bg-black/95 p-10 hover:bg-neutral-900/50 transition-colors duration-500 group flex flex-col h-full"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="font-mono text-sm text-neutral-600 mb-8 border-b border-white/5 pb-4 group-hover:text-primary-500 transition-colors duration-500">
                  {"// "}
                  {cap.id}
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-4 text-neutral-100 group-hover:text-white">
                  {cap.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mt-auto">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RAPID PIPELINE SECTION */}
      <section className="relative py-32 z-10 bg-neutral-950 border-t border-white/5 overflow-hidden">
        <div className="lg:opacity-100 opacity-0 absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="container max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2" data-aos="fade-right">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                  Methodology
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none mb-8">
                RAPID.
                <br />
                <span className="text-neutral-600">ITERATIVE.</span>
                <br />
                LETHAL.
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-10">
                Time to market is critical. Our B2B pipeline is built for
                maximum speed and adaptability. We help you bypass traditional,
                bureaucratic development cycles to move from theoretical design
                to functional prototypes in weeks, not years.
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    name: "Conceptualization & Physics Simulation",
                  },
                  { step: "02", name: "Hardware & Software Co-design" },
                  { step: "03", name: "Rapid Machining & PCB Fab" },
                  { step: "04", name: "Field Testing & Hardening" },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-center gap-6 group cursor-default"
                  >
                    <span className="font-mono text-sm text-neutral-600 group-hover:text-primary-500 transition-colors">
                      [{item.step}]
                    </span>
                    <span className="text-neutral-300 uppercase tracking-wider text-sm md:text-base font-semibold group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 w-full" data-aos="fade-left">
              <div className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl w-full mx-auto max-w-[calc(100vw-3rem)] md:max-w-[500px] lg:max-w-none">
                <div className="relative aspect-square md:aspect-[4/3] w-full rounded-xl overflow-hidden bg-black/95">
                  {/* Abstract tech wireframe / data vis representation */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 text-center mt-6 md:mt-0">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-primary-500/30 flex items-center justify-center relative mb-6 md:mb-8 mx-auto">
                      <div className="absolute inset-0 rounded-full border border-primary-500/10 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-4 rounded-full border-t border-l border-primary-500/40 animate-[spin_7s_linear_infinite_reverse]" />
                      <div className="text-primary-500 font-mono text-xs flex flex-col items-center gap-2">
                        <span className="block w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        <span>SYS.ONLINE</span>
                      </div>
                    </div>
                    <div className="font-mono text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest leading-loose max-w-sm mx-auto">
                      Awaiting target architecture.
                      <br />
                      Telemetry stream localized.
                      <br />
                      <span className="text-primary-500/50">
                        Processing sequence complete.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="relative py-32 z-10 bg-neutral-950 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-900/10 via-black to-black" />
        </div>

        <div className="relative z-10 container max-w-screen-2xl mx-auto px-6 md:px-12">
          <div
            className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-xl overflow-hidden"
            data-aos="fade-up"
          >
            <div className="bg-black/95 relative overflow-hidden rounded-xl p-10 md:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-24">
              <div className="max-w-2xl relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="block w-2.5 h-2.5 bg-primary-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primary-400">
                    Secure Channel Open
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight uppercase leading-[0.9] mb-8">
                  BUILD THE <br />
                  <span className="text-neutral-600">IMPOSSIBLE.</span>
                </h2>
                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                  Engage our engineering skunkworks. From theoretical concept to
                  field-ready hardware, we accelerate your mission-critical
                  timelines. Let&apos;s talk capabilities.
                </p>
              </div>

              <div className="relative z-10 w-full lg:w-auto flex flex-col gap-6 shrink-0">
                <Link
                  className="group relative inline-flex items-center justify-between gap-8 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 text-white px-8 py-6 font-mono text-sm md:text-base uppercase tracking-wider transition-all duration-300 overflow-hidden rounded-lg shadow-2xl"
                  href="/contact"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span>Initiate Project</span>
                  <svg
                    className="w-5 h-5 text-primary-400 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>

                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest text-center mt-2">
                  <div className="border border-white/5 p-4 rounded-lg bg-white/5 flex flex-col gap-2">
                    <span className="text-primary-500/50">Response</span>
                    <span className="text-white">&lt; 24 Hours</span>
                  </div>
                  <div className="border border-white/5 p-4 rounded-lg bg-white/5 flex flex-col gap-2">
                    <span className="text-primary-500/50">Security</span>
                    <span className="text-white">NDA Ready</span>
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
