"use client";

import { useEffect } from "react";
import Image from "next/image";
import type Slide from "photoswipe/dist/types/slide/slide";
import Link from "next/link";
import PhotoSwipeLightbox from "photoswipe/lightbox";
//@ts-ignore
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe/style.css";

import { Heading } from "@/components/common/heading";
import { ShootingStars } from "@/components/ui/shooting-stars";

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

const galleryImages = [
  { src: insta4, alt: "Instagram post highlighting our achievements." },
  { src: setup1, alt: "Innovative lab setup for advanced material research." },
  { src: setupweb, alt: "Web-based control systems for remote operations." },
  { src: setuptechnorama, alt: "Technorama exhibition showcasing our latest projects." },
  { src: technorama, alt: "Technorama event highlighting our technological advancements." },
  { src: insta1, alt: "Instagram post showcasing our latest innovations." },
  { src: insta2, alt: "Instagram post featuring our team and projects." },
  { src: insta3, alt: "Instagram post highlighting our achievements." },
  { src: image1, alt: "Image showcasing our advanced technology." },
  { src: image2, alt: "Image of our latest project in action." },
  { src: igncode, alt: "IGN Code event participation." },
  { src: setup0, alt: "Initial setup for our latest project." },
  { src: eudiswin, alt: "EUDISWIN event showcasing our innovations." },
  { src: cansat, alt: "CanSat project showcasing satellite miniaturization." },
  { src: fridgesmall, alt: "Compact refrigeration technology for aerospace applications." },
];

export default function GalleryPage() {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      type: "right",
      captionContent: (slide: Slide) => {
        return slide.data.element?.querySelector('img')?.getAttribute('alt');
      }
    });

    lightbox.init();

    return () => {
      captionPlugin.destroy();
      lightbox.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start text-center min-h-screen">
      <ShootingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Heading
          title="Gallery"
          subtitle="A visual journey through our innovations, projects, and partnerships."
        />
        <div id="gallery" className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <Link
              key={index}
              href={image.src.src}
              data-pswp-width={image.src.width}
              data-pswp-height={image.src.height}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.src.width}
                height={image.src.height}
                className="w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
