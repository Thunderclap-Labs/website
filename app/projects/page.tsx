"use client";

import type Slide from "photoswipe/dist/types/slide/slide";

import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCalendar,
  faCheckCircle,
  faClock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
//@ts-ignore
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";

import { projects } from "./constants/projects";

import { ShootingStars } from "@/components/ui/shooting-stars";
import { Heading } from "@/components/common/heading";

import "swiper/css";
import "swiper/css/navigation";
import "photoswipe/style.css";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "text-green-400";
    case "Completed":
      return "text-blue-400";
    case "On Hold":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Aerospace":
      return "bg-blue-500/20 text-blue-400";
    case "Chemistry":
      return "bg-purple-500/20 text-purple-400";
    case "Software":
      return "bg-green-500/20 text-green-400";
    case "Hardware":
      return "bg-orange-500/20 text-orange-400";
    case "Research":
      return "bg-cyan-500/20 text-cyan-400";
    case "AI":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

const createTeamMemberLink = (memberName: string) => {
  const anchor = memberName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `/team#${anchor}`;
};

export default function ProjectsPage() {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#projects-gallery",
      children: "a.pswp-gallery-item",
      pswpModule: () => import("photoswipe"),
    });
    const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
      type: "caption",
      captionContent: (slide: Slide) => {
        return (
          slide.data.element?.querySelector("img")?.getAttribute("alt") || ""
        );
      },
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox.pswp?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start text-center min-h-screen">
      <ShootingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 h-full flex flex-col">
        <Heading
          subtitle="Discover the innovative solutions and cutting-edge technologies we're developing to shape the future of aerospace, defense, and atmospheric sciences."
          title="Our Projects"
        />

        <div className="space-y-24 mt-16" id="projects-gallery">
          {projects.map((project, index) => (
            <section
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index > 0 ? "pt-24 border-t border-neutral-800" : ""
              }`}
            >
              {/* Left Column */}
              <div className="text-left flex flex-col h-full">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
                  {project.name}
                </h2>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                  className="text-neutral-300 text-lg mb-6 flex-grow"
                />

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category) => (
                      <span
                        key={category}
                        className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(
                          category,
                        )}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-neutral-400">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        className="w-4 h-4"
                        icon={
                          project.status === "Active" ? faCheckCircle : faClock
                        }
                      />
                      <span className={getStatusColor(project.status)}>
                        {project.status}
                      </span>
                    </div>
                    {project.startDate && (
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          className="w-4 h-4"
                          icon={faCalendar}
                        />
                        <span>
                          {new Date(project.startDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short" },
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-xl p-4 space-y-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                      Technologies ({project.tags.length})
                    </h3>
                    <Swiper
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      className="h-full"
                      loop={true}
                      modules={[Autoplay]}
                      slidesPerView={"auto"}
                      spaceBetween={10}
                    >
                      {project.tags.map((tag) => (
                        <SwiperSlide key={tag} style={{ width: "auto" }}>
                          <span className="bg-primary-500/20 text-primary-400 px-2 py-1 text-xs rounded-md whitespace-nowrap">
                            {tag}
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {project.teamMembers.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                        <FontAwesomeIcon className="mr-2" icon={faUsers} />
                        Team ({project.teamMembers.length})
                      </h3>
                      <Swiper
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false,
                        }}
                        className="h-full"
                        loop={true}
                        modules={[Autoplay]}
                        slidesPerView={"auto"}
                        spaceBetween={10}
                      >
                        {project.teamMembers.map((member) => (
                          <SwiperSlide key={member} style={{ width: "auto" }}>
                            <Link
                              className="bg-secondary-500/20 text-secondary-400 px-2 py-1 text-xs rounded-md hover:bg-secondary-500/40 transition-colors whitespace-nowrap"
                              href={createTeamMemberLink(member)}
                            >
                              {member}
                            </Link>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  )}
                </div>

                {project.link && (
                  <Button
                    data-pswp-ignore
                    isExternal
                    as={Link}
                    className="self-start bg-black/15 text-white shadow-xl rounded-lg"
                    href={project.link}
                    variant="bordered"
                  >
                    Read More <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                )}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {project.image && (
                  <a
                    aria-label={`View full size image of ${project.name}`}
                    className="pswp-gallery-item block rounded-xl overflow-hidden group"
                    data-pswp-height={project.image.height}
                    data-pswp-width={project.image.width}
                    href={project.image.src}
                    rel="noreferrer"
                    target="_blank"
                    title={`View ${project.name} image`}
                  >
                    <Image
                      alt={project.name}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index < 2}
                      src={project.image}
                    />
                  </a>
                )}

                {project.galleryImages && project.galleryImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {project.galleryImages.map((img, i) => (
                      <Link
                        key={i}
                        className="pswp-gallery-item block overflow-hidden group rounded-lg"
                        data-pswp-height={img.src.height}
                        data-pswp-width={img.src.width}
                        href={img.src.src}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <Image
                          alt={img.alt}
                          className="object-cover transition-transform duration-300  rounded-lg group-hover:scale-105"
                          height={320}
                          src={img.src}
                        />
                      </Link>
                    ))}
                  </div>
                )}
                {project.partners && project.partners.length > 0 && (
                  <div className="mb-6">
                    <p className="text-white text-sm">
                      Partners: {project.partners.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
