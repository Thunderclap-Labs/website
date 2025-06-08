"use client";

import { title, subtitle } from "@/components/primitives";
import { Logo } from "@/components/icons";
import Image from "next/image";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter, faInternetExplorer } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from 'swiper/modules'; // Import Scrollbar module

import "swiper/css";
import "swiper/css/scrollbar";

import "../globals.css"; // Ensure global styles are imported

import { teamMembers } from "./constants/team-members";

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-start text-center min-h-[calc(100vh-200px)] py-10">
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="flex flex-col text-center mb-16 mt-16 sm:mb-20">
          <Logo className="glow mx-auto mb-4 h-12 w-12" data-aos="zoom-in" /> 
          <h1 className={title({ class: "mb-4 text-4xl sm:text-5xl lg:text-6xl"})} data-aos="fade-up">
            Meet The Thunderclap Group
          </h1>
          <p className={subtitle({ class: "max-w-2xl mx-auto text-lg sm:text-xl" })} data-aos="fade-up" data-aos-delay="100">
            A collective of passionate engineers, developers, and creators dedicated to building innovative solutions and pushing the boundaries of technology - Best of the best.
          </p>
        </div>

        {/* Team Members Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 xl:gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="featured-card white-feature bg-neutral-900/50 p-[2px] rounded-xl text-left"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="bg-neutral-800/70 backdrop-blur-sm p-6 rounded-xl shadow-xl h-full flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 mr-4 rounded-full overflow-hidden border-2 border-primary-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-neutral-100">{member.name}</h2>
                    <p className="text-primary-400 text-sm md:text-md">{member.role}</p>
                    <div className="mt-2 flex space-x-3">
                      {member.social.linkedin && (
                        <Link href={member.social.linkedin} isExternal className="text-neutral-400 hover:text-primary-400">
                          <FontAwesomeIcon icon={faLinkedin} size="lg" />
                        </Link>
                      )}
                      {member.social.github && (
                        <Link href={member.social.github} isExternal className="text-neutral-400 hover:text-primary-400">
                          <FontAwesomeIcon icon={faGithub} size="lg" />
                        </Link>
                      )}
                      {member.social.twitter && (
                        <Link href={member.social.twitter} isExternal className="text-neutral-400 hover:text-primary-400">
                          <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </Link>
                      )}
                      {member.social.website && (
                        <Link href={member.social.website} isExternal className="text-neutral-400 hover:text-primary-400">
                          <FontAwesomeIcon icon={faInternetExplorer} size="lg" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm mb-4 flex-grow">{member.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-neutral-200 mb-2 text-sm">Skills: <span className="text-primary-400">{member.skills.length}</span></h3>
                  <Swiper
                    modules={[Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    scrollbar={{ draggable: true, hide: true }}
                    className="h-full" // Add a class for potential custom styling
                  >
                    {member.skills.map(skill => (
                      <SwiperSlide key={skill} style={{ width: 'auto' }}>
                        <span className="bg-primary-500/20 text-primary-300 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                          {skill}
                        </span>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {member.projects && member.projects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-neutral-200 mb-2 text-sm">Projects: <span className="text-secondary-400">{member.projects.length}</span></h3>
                    <Swiper
                      modules={[Scrollbar]}
                      spaceBetween={10}
                      slidesPerView={'auto'}
                      scrollbar={{ draggable: true, hide: true }}
                      className="h-full" // Add a class for potential custom styling
                    >
                      {member.projects.map(project => (
                        <SwiperSlide key={project} style={{ width: 'auto' }}>
                          <span className="bg-secondary-500/20 text-secondary-300 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                            {project}
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}

                {member.email && (
                  <p className="text-xs text-neutral-400 mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {member.email}
                  </p>
                )}
                {member.phone && (
                  <p className="text-xs text-neutral-400">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" /> {member.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
