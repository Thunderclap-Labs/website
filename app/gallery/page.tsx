"use client";

import type Slide from "photoswipe/dist/types/slide/slide";

import Image from "next/image";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
//@ts-ignore
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe/style.css";

// Import images
import cansat from "./images/cansat.jpg";
import fridgesmall from "./images/FridgeSmall.jpg";
import setup1 from "./images/setup1.jpg";
import setupweb from "./images/setupweb.jpg";
import setuptechnorama from "./images/setuptechnorama.jpg";
import technorama from "./images/technorama.jpg";
import insta1 from "./images/thunderclap_labs_1739832978_3570300253555564544_72407593184.jpg";
import insta2 from "./images/thunderclap_labs_1739834094_3570309613975387807_72407593184.jpg";
import insta3 from "./images/thunderclap_labs_1739911060_3570955249976356059_72407593184.jpg";
import insta4 from "./images/thunderclap_labs_1748131213_3639910897141083997_72407593184.jpg";
import setup0 from "./images/setup0.jpg";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import igncode from "./images/igncode.jpg";
import eudiswin from "./images/eudiswin.jpg";
import cansatinz from "./images/cansatinz.jpg";
import thunderbeestart from "./images/thunderbeestart.jpg";
import explo0 from "./images/explo0.png";
import soldering0 from "./images/soldering0.png";
import coldcall from "./images/coldcall.png";
import actinspace from "./images/ActInSpace.jpg";
import dojus from "./images/Dojus.jpg";
import StartupAwards from "./images/StartupAwards.jpg";
import ProductDev from "./images/ProductDev.jpg";
import KSA from "./images/KSA.jpg";
import fiveK from "./images/5k.jpg";
import fiveKtwo from "./images/5k2.jpg";
import onekfall from "./images/1KRiseOrFall.jpg";
import sauliuSajungaHackathon from "./images/SauliuSajungaHackathon.jpg";
import NasaHackathon from "./images/NasaHackathon.png";
import NasaHackathon2 from "./images/NasaHackathon2.jpg";
import sauliusajungatesting from "./images/SauliuSajungaTesting.jpg";
import DominykasModeling from "./images/DominykasModeling.png";
import startupAwardsFilmingUs from "./images/StartupAwardsFilmingUs.jpg";
import LRTMeet from "./images/LRTMeet.jpg";
import ShowcaseKTU from "./images/ProjectShowcaseKTU.jpg";
import ugninisSkydasHackathon from "./images/UgninisSkydasHackathon.jpg";
import NasaHackathon3 from "./images/NasaHackathon3.jpg";
import Dojus2 from "./images/Dojus2.jpg";
import ElectroOctipus from "./images/ElectroOctipus.jpg";
import Drone1 from "./images/Drone1.jpg";
import RecycledDrone from "./images/RecycledDrone.jpg";
import phone from "./images/phone.png";
import thundereye1 from "./images/thundereye1.jpg";
import thundereye2 from "./images/thundereye2.jpg";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { Heading } from "@/components/common/heading";

const galleryImages = [
  {
    src: thundereye1,
    alt: "Thundereye Prototype",
    date: "2026-02-15",
    description:
      "Thundereye, our innovative drone detection system, designed to provide real-time monitoring and threat detection capabilities.",
  },
  {
    src: thundereye2,
    alt: "Thundereye Prototype",
    date: "2026-02-15",
    description:
      "Thundereye, our innovative drone detection system, designed to provide real-time monitoring and threat detection capabilities.",
  },
  {
    src: phone,
    alt: "Thinnest Phone ",
    date: "2025-09",
    description:
      "We Built one of the thinnest phones in the world for fun ¯\\_(ツ)_/¯",
  },
  {
    src: RecycledDrone,
    alt: "Recycled Drone",
    date: "2025-08",
    description: "A drone we built using recycled electronics",
  },
  {
    src: Drone1,
    alt: "Drone",
    date: "2025-07",
    description: "Our very first self-built hobbyist drone",
  },
  {
    src: ElectroOctipus,
    alt: "Motor Controller Contraption",
    date: "2025-09",
    description: "I don't even know ¯\\_(ツ)_/¯",
  },
  {
    src: Dojus2,
    alt: "Dojus Innovation Day 2",
    date: "2026-02-15",
    description:
      "Dojus Innovation Day, where we showcased our latest projects and innovations to industry leaders and potential partners.",
  },
  {
    src: NasaHackathon3,
    alt: "NASA Space Apps Challenge 3",
    date: "2025-10",
    description: "Our team at the NASA Space Apps Challenge",
  },
  {
    src: ugninisSkydasHackathon,
    alt: "Ugninis Skydas Hackathon",
    date: "2025-10",
    description:
      "Our team at the Ugninis Skydas Hackathon, where we showcased our innovative solutions and competed against top talent in the industry.",
  },
  {
    src: ShowcaseKTU,
    alt: "Showcase at KTU",
    date: "2025-07",
    description:
      "Showcasing our innovative solutions at KTU, engaging with students and faculty to inspire the next generation of aerospace innovators.",
  },
  {
    src: LRTMeet,
    alt: "Meeting with LRT",
    date: "2025-11",
    description:
      "A memorable meeting with LRT, where we discussed our journey and our future plans.",
  },
  {
    src: startupAwardsFilmingUs,
    alt: "Startup Awards filming us",
    date: "2025-11",
    description:
      "Behind the scenes of the Startup Awards filming us, capturing our journey.",
  },
  {
    src: DominykasModeling,
    alt: "Dominykas modeling our prototype drone detection system",
    date: "2025-08",
    description:
      "Dominykas modeling our prototype drone detection system, a crucial component of our aerospace defense solutions. This system is designed to provide real-time monitoring and threat detection capabilities, ensuring the safety and security of our airspace.",
  },
  {
    src: sauliusajungatesting,
    alt: "Šauliu Sąjunga - Testing",
    date: "2025-08",
    description:
      "Testing our innovative solutions with Šauliu Sąjunga, a key partner in our aerospace defense projects. This collaboration allows us to refine our technologies and ensure they meet the highest standards of performance and reliability.",
  },
  {
    src: NasaHackathon,
    alt: "NASA Space Apps Challenge",
    date: "2025-10",
    description:
      "Our team at the NASA Space Apps Challenge, where we were officially selected to compete against top talent from around the world (Official NASA Space APPS Global Nominees).",
  },
  {
    src: NasaHackathon2,
    alt: "NASA Space Apps Challenge 2",
    date: "2025-10",
    description:
      "Our team at the NASA Space Apps Challenge, showcasing our second image of the event.",
  },
  {
    src: sauliuSajungaHackathon,
    alt: "Ugninis Skydas Hackathon",
    date: "2025-10",
    description:
      "Our team at the Ugninis Skydas Hackathon, where we showcased our innovative solutions and competed against top talent in the industry.",
  },
  {
    src: onekfall,
    alt: "Rise or Fall Victory",
    date: "2025-11",
    description:
      "Our team at the 1K Rise or Fall competition, showcasing our innovative solutions and competing against the best in the industry.",
  },
  {
    src: fiveKtwo,
    alt: "Kickstart Lab 5K Win - Team Celebration",
    date: "2025-11",
    description:
      "Our team celebrating the incredible victory at the Kickstart Lab 5K competition! This moment captures the joy, camaraderie, and hard work that went into achieving this milestone. We are grateful for the support of our community and excited for what the future holds!",
  },
  {
    src: fiveK,
    alt: "Kickstart Lab 5K Win",
    date: "2025-11",
    description:
      "Thunderclap Labs has won the prestigious 5K prize at the Kickstart Lab competition! This victory is a testament to our team's dedication, innovation, and hard work in pushing the boundaries of aerospace technology. We are excited to continue our journey and make even greater strides in the future!",
  },
  {
    src: KSA,
    alt: "Kaunas Startup Awards Interview",
    date: "2025-11",
    description:
      "An interview with Kaunas Startup Awards, where we shared our journey, challenges, and vision for the future of aerospace innovation.",
  },
  {
    src: ProductDev,
    alt: "Product Development",
    date: "2025-12",
    description:
      "Our team engaged in intensive product development sessions, refining our prototypes and preparing for upcoming launches.",
  },
  {
    src: StartupAwards,
    alt: "Startup Awards 2025",
    date: "2025-12",
    description:
      "Wow! What a night at the Kaunas Startup Awards 2025! 🏆 We are incredibly honored and humbled to bring home two awards: Newcomer of the Year and Public's Favourite! This event attracted up to 240 participants and gathered more than 18,000 views of the Delfi.lt live broadcast. Wow. ",
  },
  {
    src: dojus,
    alt: "Dojus Innovation Day",
    date: "2026-02-16",
    description:
      "Dojus Innovation Day, where we showcased our latest projects and innovations to industry leaders and potential partners.",
  },
  {
    src: actinspace,
    alt: "Act in Space Hackathon",
    date: "2026-02",
    description:
      "Our Project was: By leveraging existing GNSS infrastructure, Thunder Wave explores how centimeter-level changes in water levels can help detect non-recurring eddy currents. These short-lived ocean dynamics are often missed, yet they significantly impact ship routing, fuel efficiency, and operational decision-making.",
  },
  {
    src: insta4,
    alt: "Rocket fuel dryer",
    date: "2025-05",
    description:
      "Rocket fuel dryer, a crucial component in our aerospace projects, ensuring optimal performance and reliability.",
  },
  {
    src: setup1,
    alt: "Workspace progress #2",
    date: "2025-06",
    description:
      "Our workspace setup, designed for rapid prototyping and development.",
  },
  {
    src: setupweb,
    alt: "Website development progress",
    date: "2025-07",
    description:
      "Progress of our website development, showcasing our latest projects and updates.",
  },
  {
    src: setuptechnorama,
    alt: "Getting ready for Technorama 2025",
    date: "2025-06-27",
    description:
      "Us getting ready for Technorama 2025, showcasing our latest innovations and projects.",
  },
  {
    src: technorama,
    alt: "Pitching @ Technorama 2025",
    date: "2025-06-28",
    description:
      "Engaging with visitors at Technorama and sharing our passion for technology.",
  },
  {
    src: insta1,
    alt: "Simon making a resistor out of water",
    date: "2023-06-25",
    description: "Us participating in a goldberg-machiene competition",
  },
  {
    src: insta2,
    alt: "Ignas, Dominykas & Simon developing an antenna",
    date: "2024-03-20",
    description:
      "A behind-the-scenes look at our team and the collaborative spirit that drives our projects.",
  },
  {
    src: insta3,
    alt: "Simon working on CanSat",
    date: "2024-03-17",
    description:
      "A snapshot of our team in action, working on the CanSat project, a testament to our engineering skills.",
  },
  {
    src: image1,
    alt: "Us practicing plasma-cutting by making a drift cart.",
    date: "2025-02-30",
    description:
      "Us practicing plasma-cutting by making a drift cart, showcasing our hands-on approach to innovation.",
  },
  {
    src: image2,
    alt: "Simon building a battery pack",
    date: "2025-05-25",
    description:
      "Simon building a battery pack, a crucial component for our projects.",
  },
  {
    src: igncode,
    alt: "Ignas working on our website",
    date: "2025-07-10",
    description:
      "Ignas working on our website, ensuring a seamless user experience and showcasing our latest innovations.",
  },
  {
    src: setup0,
    alt: "Our very first workspace",
    date: "2025-06-15",
    description:
      "Our very first workspace, where it all began. A small but significant step in our journey.",
  },
  {
    src: eudiswin,
    alt: "EUDIS Hackathon Victory",
    date: "2025-06-20",
    description:
      "Presenting our innovative solutions at the EUDIS Hackathon, a premier defense innovation showcase. We emerged victorious!",
  },
  {
    src: cansat,
    alt: "Our CanSat",
    date: "2024-04-21",
    description:
      "Our CanSat project, a testament to our capabilities in satellite miniaturization and aerospace engineering.",
  },
  {
    src: fridgesmall,
    alt: "Our very first project - The Mini Fridge",
    date: "2023-04-01",
    description:
      "The Fridge, our very first project, marking the beginning of our journey in innovation and technology.",
  },
  {
    src: cansatinz,
    alt: "Our team at the CanSat competition",
    date: "2024-04-15",
    description:
      "Our team at the CanSat competition, showcasing our engineering skills and teamwork.",
  },
  {
    src: thunderbeestart,
    alt: "Our concept of ThunderBee",
    date: "2025-06-19",
    description:
      "Our concept of ThunderBee, a revolutionary drone that aims to redefine aerospace defence.",
  },
  {
    src: explo0,
    alt: "Our team brainstorming rocket-fuel manufacturing",
    date: "2025-06-30",
    description:
      "Our team brainstorming rocket-fuel manufacturing, a crucial step in our aerospace projects.",
  },
  {
    src: soldering0,
    alt: "Simon soldering a top-secret project ;)",
    date: "2024-12-16",
    description:
      "Simon soldering a top-secret project ;), showcasing our hands-on approach to innovation.",
  },
  {
    src: coldcall,
    alt: "Dominykas cold-calling industry partners",
    date: "2025-06-26",
    description:
      "Dominykas cold-calling industry partners, a crucial part of our outreach and partnership efforts.",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function GalleryPage() {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });

    new PhotoSwipeDynamicCaption(lightbox, {
      type: "caption",
      captionContent: (slide: Slide) => {
        const date = slide.data.element?.getAttribute("data-pswp-date");
        const title =
          slide.data.element?.querySelector("img")?.getAttribute("alt") || "";
        const description = slide.data.element?.getAttribute(
          "data-pswp-description",
        );

        if (!description) {
          return title;
        }

        return `<div class="caption-title">${title}</div><div class="caption-description">${description}</div><div class="caption-date">${date}</div>`;
      },
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start text-center min-h-screen">
      <ShootingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Heading
          subtitle="A visual journey through our innovations, projects, and partnerships."
          title="Gallery"
        />
        <div
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          id="gallery"
        >
          {galleryImages.map((image, index) => (
            <a
              key={index}
              className="group relative block overflow-hidden"
              data-pswp-date={image.date}
              data-pswp-description={image.description}
              data-pswp-height={image.src.height}
              data-pswp-width={image.src.width}
              href={image.src.src}
              rel="noreferrer"
              target="_blank"
            >
              <Image
                alt={image.alt}
                className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                height={image.src.height}
                placeholder="blur"
                priority={index < 4}
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                src={image.src}
                width={image.src.width}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
