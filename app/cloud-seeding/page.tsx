"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faLeaf,
  faSmog,
  faFireExtinguisher,
  faCloudShowersHeavy,
  faIndustry,
  faHandshake,
  faShieldHalved,
  faLightbulb,
  faSeedling,
  faChartLine,
  faBolt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

// import * as THREE from "three"; // Ensure three.js is imported
// //@ts-ignore
// import CLOUDS from "vanta/dist/vanta.clouds.min";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Heading } from "@/components/common/heading";
import { SectionLayout } from "@/components/common/section-layout";
import FundingChartSection from "@/components/FundingChartSection";
import { StatsGrid } from "@/components/common/stats-grid";

import "swiper/css";
import "swiper/css/pagination";

import cloudseeding from "@/components/images/cloudseeding.png"
import dronewireframe from "@/components/images/dronewireframe.png";
import fwd from "@/components/images/fwd.png";

const applications = [
  { icon: faTint, title: "Enhanced Precipitation" },
  { icon: faLeaf, title: "Agriculture" },
  { icon: faSmog, title: "Fog Alleviation / Dispersal" },
  { icon: faFireExtinguisher, title: "Suppressed Heatwaves and Wildfires" },
  { icon: faCloudShowersHeavy, title: "Hail Suppression" },
  { icon: faIndustry, title: "Water Resource Management" },
];

const marketTargets = [
  {
    title: "Agricultural Sector",
    description:
      "Large-scale farming operations, agricultural cooperatives, and insurance companies looking to mitigate crop losses due to drought and hail.",
  },
  {
    title: "Hydroelectric Power Companies",
    description:
      "Seeking to increase snowpack in mountainous regions to ensure consistent water flow for power generation.",
  },
  {
    title: "Emergency Management Agencies",
    description:
      "For potential mitigation of heatwaves or support in wildfire suppression in specific conditions.",
  },
];

const marketStats = [
  { value: "$684M", title: "Market by 2032", description: "Projected global cloud seeding market size." },
  { value: "6.7%", title: "CAGR", description: "Compound Annual Growth Rate during the forecast period." },
  { value: "78%", title: "Asia Pacific Share", description: "Market share dominated by the Asia Pacific region in 2023." },
];

const whyTrustUsItems = [
    { icon: faHandshake, title: "Strong Strategic Partnerships", description: "Collaborations with European defense agencies, research institutions, and recognized by the European Union." },
    { icon: faShieldHalved, title: "Dual-Use Applications", description: "Technology designed for both civilian and defense sectors, expanding market potential and long-term viability." },
    { icon: faLightbulb, title: "Demonstrated Innovation", description: "Acclaimed initiatives, including the EUDIS-awarded ThunderBee drone." },
    { icon: faSeedling, title: "Sustainable Technology Focus", description: "Emphasis on reusability, energy-efficient propulsion, and eco-compatible materials." },
    { icon: faChartLine, title: "Tangible Advancements", description: "Consistent technical progress towards a fully functional prototype." },
    { icon: faBolt, title: "Rapid Prototyping", description: "Agile development methodology ensures swift response to user needs and evolving demands." },
];

const crisisGalleryImages = [
  { src: cloudseeding, alt: "Drought Impact" },
  { src: fwd, alt: "Hail Damage" },
  { src: dronewireframe, alt: "Agricultural Losses" },
];

export default function CloudSeedingPage() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: any = null;
    if (typeof window !== "undefined" && vantaRef.current) {
      AOS.init({
        duration: 800,
        once: true,
      });

      vantaEffect = CLOUDS({
        el: vantaRef.current,
        THREE, // Pass the THREE instance to Vanta
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: 0xfcfcfc,
        skyColor: 0x0,
        cloudShadowColor: 0x7ff4,
        sunColor: 0x2318ff,
        sunGlareColor: 0x4630ff,
        sunlightColor: 0xfe32ff,
      });
    }
    // useEffect(() => {
    //   let vantaEffect: any = null;
    //   if (typeof window !== "undefined" && vantaRef.current) {
    //     AOS.init({
    //       duration: 800,
    //       once: true,
    //     });
    //
    //     vantaEffect = CLOUDS({
    //       el: vantaRef.current,
    //       THREE, /* Lines 104-105 omitted */
    //       mouseControls: true,
    //       touchControls: true,
    //       gyroControls: false,
    //       minHeight: 200.0,
    //       minWidth: 200.0,
    //       backgroundColor: 0xfcfcfc,
    //       skyColor: 0x0,
    //       cloudShadowColor: 0x7ff4,
    //       sunColor: 0x2318ff,
    //       sunGlareColor: 0x4630ff,
    //       sunlightColor: 0xfe32ff,
    //     });
    //   }
    //   return () => {
    //     if (vantaEffect) {/* Lines 120-121 omitted */}
    //   };
    // }, []);
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(0,0,0,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(0,0,0,0.5)"
              />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(0,0,0,0.3)"
                />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#000" />
          </g>
        </svg>
      </section>

      {/* The Crisis Section */}
      <SectionLayout
        id="crisis-section"
        title="A Growing Global Crisis"
        description="Water scarcity and destructive weather events pose significant threats to global food security and economic stability."
      >
        <div className="grid md:grid-cols-2 gap-8 text-lg text-neutral-300 mt-6">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">The Challenge</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>Severe droughts lead to massive economic losses in agriculture.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>Destructive hailstorms cause billions in damage to crops and property annually.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500/20 text-blue-400 rounded-full h-6 w-6 text-xs flex items-center justify-center mr-4 mt-1 flex-shrink-0">✓</span>
                <span>Current solutions are often costly, complex, or ineffective.</span>
              </li>
            </ul>
          </div>
          <div data-aos="fade-left">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Our Solution</h3>
            <p>
              We are developing a specialized Intelligent Aerial Vehicle (IAV) - Rocket and Drone based cloud seeding system for precise, efficient, and reliable delivery of silver iodide and potassium chloride to enhance precipitation and suppress hail.
            </p>
          </div>
        </div>
      </SectionLayout>

      {/* Applications Section */}
      <SectionLayout
        id="applications-section"
        title="Primary Applications"
        description="Our technology offers a wide range of applications to address various environmental and economic challenges."
        titleAlignment="center"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <div
              key={index}
              className="text-center p-6 bg-neutral-800/50 rounded-lg"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <FontAwesomeIcon
                icon={app.icon}
                className="text-4xl text-primary-400 mb-4"
              />
              <h3 className="text-lg font-semibold">{app.title}</h3>
            </div>
          ))}
        </div>
      </SectionLayout>
      
      {/* Market Section */}
      <SectionLayout
        id="market-section"
        title="Addressing a Multi-Billion Dollar Global Market"
        description="The demand for effective weather modification is rapidly expanding as climate change impacts water resources and agricultural stability."
      >
        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-4">
          {marketTargets.map((target, index) => (
            <div key={index} className="bg-neutral-800/50 p-6 rounded-lg flex flex-col" data-aos="fade-up" data-aos-delay={index * 100}>
              <h3 className="text-xl font-bold text-blue-400 mb-2">{target.title}</h3>
              <p className="text-neutral-400 flex-grow">{target.description}</p>
            </div>
          ))}
        </div>
        <div data-aos="fade-up" data-aos-delay="300" className="grid md:grid-cols-2 lg:grid-cols-3">
            <StatsGrid stats={marketStats} />
        </div>
        {/* Source link for market data */}
        <div className="mt-4 text-sm text-neutral-400 text-center" data-aos="fade-up" data-aos-delay="350">
          Source:&nbsp;
          <Link
            isExternal
            href="https://www.fortunebusinessinsights.com/cloud-seeding-market-104073"
            className="text-blue-400 hover:text-blue-300"
          >
            Fortune Business Insights: Cloud Seeding Market
          </Link>
        </div>
      </SectionLayout>

      {/* Use of Funds Section */}
      <section className="py-16 md:py-24">
        <FundingChartSection />
      </section>

      {/* Why Trust Us Section */}
      <SectionLayout
        id="why-trust-us"
        title="Why Trust Us"
        description="Our strength lies in our innovative approach, strategic partnerships, and a dedicated team committed to excellence."
        titleAlignment="center"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyTrustUsItems.map((item, index) => (
            <div key={index} className="bg-neutral-800/50 p-6 rounded-lg flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                <FontAwesomeIcon icon={item.icon} className="text-2xl text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-primary-400 mb-3">{item.title}</h3>
              <p className="text-neutral-300 flex-grow">{item.description}</p>
            </div>
          ))}
        </div>
        
        <Button
          as={Link}
          className="bg-black/15 text-white shadow-xl rounded-lg mt-8"
          href="/contact"
          variant="bordered"
        >
          Contact Us <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </SectionLayout>
    </div>
  );
}