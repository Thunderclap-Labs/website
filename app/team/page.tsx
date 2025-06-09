"use client";

import { title, subtitle } from "@/components/primitives";
import logo from "@/components/images/logo.png";
import Image from "next/image";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faGlobe, faLink } from "@fortawesome/free-solid-svg-icons"; // Added faLink
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules'; // Import Autoplay module

import "swiper/css";

import "../globals.css"; // Ensure global styles are imported

import { teamMembers } from "./constants/team-members";
import { projects as definedProjectsList } from "../projects/constants/team-members"; // Import project definitions

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-start text-center min-h-[calc(100vh-200px)] py-10">
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="flex flex-col text-center mb-16 mt-16 sm:mb-20">
          <Image src={logo} alt="Thunderclap Logo" className="glow mx-auto mb-4 h-12 w-12" data-aos="zoom-in" />
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
                  <div className="relative min-w-28 min-h-28 mr-4 rounded-full overflow-hidden border-2 border-primary-500">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl md:text-2xl font-bold text-neutral-100">{member.name}</h2>
                    <p className="text-primary-400 text-sm md:text-md">{member.role}</p>
                    <div className="flex items-center justify-between space-x-2 mt-2 w-full"> {/* Changed items-between and added w-full */}
                      <div className="flex space-x-3"> {/* Kept class name for social icons */}
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
                        {member.social.facebook && (
                          <Link href={member.social.facebook} isExternal className="text-neutral-400 hover:text-primary-400">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                          </Link>
                        )}
                        {member.social.website && (
                          <Link href={member.social.website} isExternal className="text-neutral-400 hover:text-primary-400">
                            <FontAwesomeIcon icon={faGlobe} size="lg" />
                          </Link>
                        )}
                      </div>
                      <div className="badges flex space-x-2 items-center"> {/* Added flex, space-x-2, items-center */}
                        {member.badges && member.badges.map((badge, badgeIndex) => (
                          <Link key={badgeIndex} href={badge.link} isExternal title={badge.label}>
                            <Image
                              src={badge.image}
                              alt={badge.label}
                              height={24} // Adjust size as needed
                              className="rounded" // Optional: if badges need rounding
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-neutral-300 text-sm mb-4 flex-grow">{member.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-neutral-200 mb-2 text-sm">Skills: <span className="text-primary-400">{member.skills.length}</span></h3>
                  <Swiper
                    modules={[Autoplay]} // Add Autoplay module
                    spaceBetween={10}
                    slidesPerView={'auto'}
                    loop={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    className="h-full" 
                  >
                    {member.skills.map(skill => (
                      <SwiperSlide key={skill} style={{ width: 'auto' }}>
                        <span className="bg-primary-500/20 text-primary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                          {skill}
                        </span>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {member.tclProjects && member.tclProjects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-neutral-200 mb-2 text-sm">Thunderclap Labs Projects: <span className="text-accent-500">{member.tclProjects.length}</span></h3>
                    <Swiper
                      modules={[Autoplay]}
                      spaceBetween={10}
                      slidesPerView={'auto'}
                      loop={true}
                      autoplay={{
                        delay: 5000, 
                        disableOnInteraction: false,
                      }}
                      className="h-full"
                    >
                      {member.tclProjects.map(projectId => {
                        const projectDetail = definedProjectsList.find(p => p.id === projectId);
                        if (!projectDetail) {
                          return null; 
                        }
                        
                        const projectContent = (
                          <span className={`flex items-center bg-secondary-500/20 text-secondary-800 px-3 py-1.5 text-xs rounded-md whitespace-nowrap ${projectDetail.link ? 'hover:bg-accent-500/40 transition-colors' : ''}`}>
                            {projectDetail.active && (
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" title="Active"></span>
                            )}
                            {projectDetail.name}
                            {projectDetail.link && (
                              <FontAwesomeIcon icon={faLink} className="ml-2 text-xs" />
                            )}
                          </span>
                        );

                        return (
                          <SwiperSlide key={projectDetail.id} style={{ width: 'auto' }}>
                            {projectDetail.link ? (
                              <Link href={projectDetail.link} isExternal className="block">
                                {projectContent}
                              </Link>
                            ) : (
                              projectContent
                            )}
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                )}

                {member.personalProjects && member.personalProjects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-neutral-200 mb-2 text-sm">Personal Projects: <span className="text-secondary-400">{member.personalProjects.length}</span></h3>
                    <Swiper
                      modules={[Autoplay]}
                      spaceBetween={10}
                      slidesPerView={'auto'}
                      loop={true} 
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      className="h-full"
                    >
                      {member.personalProjects.map((project, i) => (
                        <SwiperSlide key={i} style={{ width: 'auto' }}>
                          {('link' in project && project.link) ? (
                            <Link href={project.link as string} isExternal className="block">
                              <span className="bg-secondary-500/20 text-secondary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap hover:bg-secondary-500/40 transition-colors">
                                {project.name}
                              </span>
                            </Link>
                          ) : (
                            <span className="bg-secondary-500/20 text-secondary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                              {project.name}
                            </span>
                          )}
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
                {(member as { phone?: string }).phone && (
                  <p className="text-xs text-neutral-400">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" /> {(member as { phone?: string }).phone}
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
