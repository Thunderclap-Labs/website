"use client";

import Image from "next/image";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faGlobe,
  faLink,
} from "@fortawesome/free-solid-svg-icons"; // Added faLink
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Import Autoplay module

import { projects as definedProjectsList } from "../projects/constants/projects"; // Import project definitions

import { teamMembers } from "./constants/team-members";

import { Heading } from "@/components/common/heading";

import "swiper/css";

import { ShootingStars } from "@/components/ui/shooting-stars";

export default function DocsPage() {
  // Function to create anchor ID from member name
  const createAnchorId = (memberName: string) => {
    return memberName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  // Function to get team member's projects from projects.tsx
  const getTeamMemberProjects = (memberName: string) => {
    return definedProjectsList.filter((project) =>
      project.teamMembers.includes(memberName),
    );
  };

  return (
    <div className="flex flex-col items-center justify-start text-center min-h-screen">
      <ShootingStars className="absolute z-0" />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Heading
          subtitle="A collective of passionate engineers, developers, and creators dedicated to building innovative solutions and pushing the boundaries of technology - Best of the best."
          title="Meet The Thunderclap Group"
        />

        {/* Team Members Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => {
            const memberProjects = getTeamMemberProjects(member.name);

            return (
              <div
                key={member.name}
                className="featured-card white-feature bg-transparent p-[1px] rounded-xl text-left"
                data-aos="fade-up"
                id={createAnchorId(member.name)} // Add anchor ID
              >
                <div className="bg-neutral-800 backdrop-blur-sm p-6 rounded-xl shadow-xl h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="relative min-w-28 min-h-28 mr-4 rounded-full overflow-hidden border-2 border-primary-500">
                      <Image
                        alt={member.name}
                        className="rounded-full"
                        layout="fill"
                        objectFit="cover"
                        src={member.image}
                      />
                    </div>
                    <div className="w-full">
                      <h2 className="text-xl md:text-2xl font-bold text-neutral-100">
                        {member.name}
                      </h2>
                      <p className="text-primary-400 text-sm md:text-md">
                        {member.role}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 w-full">
                        {" "}
                        {/* Changed items-between and added w-full */}
                        <div className="flex space-x-3">
                          {" "}
                          {/* Kept class name for social icons */}
                          {member.social.linkedin && (
                            <Link
                              isExternal
                              className="text-neutral-400 hover:text-primary-400"
                              href={member.social.linkedin}
                            >
                              <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </Link>
                          )}
                          {member.social.github && (
                            <Link
                              isExternal
                              className="text-neutral-400 hover:text-primary-400"
                              href={member.social.github}
                            >
                              <FontAwesomeIcon icon={faGithub} size="lg" />
                            </Link>
                          )}
                          {member.social.facebook && (
                            <Link
                              isExternal
                              className="text-neutral-400 hover:text-primary-400"
                              href={member.social.facebook}
                            >
                              <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </Link>
                          )}
                          {member.social.website && (
                            <Link
                              isExternal
                              className="text-neutral-400 hover:text-primary-400"
                              href={member.social.website}
                            >
                              <FontAwesomeIcon icon={faGlobe} size="lg" />
                            </Link>
                          )}
                        </div>
                        <div className="badges flex space-x-2 items-center">
                          {" "}
                          {/* Added flex, space-x-2, items-center */}
                          {member.badges &&
                            member.badges.map((badge, badgeIndex) => (
                              <Link
                                key={badgeIndex}
                                isExternal
                                href={badge.link}
                                title={badge.label}
                              >
                                <Image
                                  alt={badge.label}
                                  className="rounded" // Optional: if badges need rounding
                                  height={24} // Adjust size as needed
                                  src={badge.image}
                                />
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-300 text-sm mb-4 flex-grow">
                    {member.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                      Skills:{" "}
                      <span className="text-primary-400">
                        {member.skills.length}
                      </span>
                    </h3>
                    <Swiper
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      className="h-full"
                      loop={true}
                      modules={[Autoplay]} // Add Autoplay module
                      slidesPerView={"auto"}
                      spaceBetween={10}
                    >
                      {member.skills.map((skill) => (
                        <SwiperSlide key={skill} style={{ width: "auto" }}>
                          <span className="bg-primary-500/20 text-primary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                            {skill}
                          </span>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {memberProjects.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                        Thunderclap Labs Projects:{" "}
                        <span className="text-accent-500">
                          {memberProjects.length}
                        </span>
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
                        {memberProjects.map((project) => {
                          const projectContent = (
                            <span
                              className={`flex items-center bg-secondary-500/20 text-secondary-800 px-3 py-1.5 text-xs rounded-md whitespace-nowrap ${project.link ? "hover:bg-accent-500/40 transition-colors" : ""}`}
                            >
                              {project.active && (
                                <span
                                  className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
                                  title="Active"
                                />
                              )}
                              {project.name}
                              {project.link && (
                                <FontAwesomeIcon
                                  className="ml-2 text-xs"
                                  icon={faLink}
                                />
                              )}
                            </span>
                          );

                          return (
                            <SwiperSlide
                              key={project.id}
                              style={{ width: "auto" }}
                            >
                              {project.link ? (
                                <Link
                                  isExternal
                                  className="block"
                                  href={project.link}
                                >
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

                  {member.personalProjects &&
                    member.personalProjects.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                          Personal Projects:{" "}
                          <span className="text-secondary-400">
                            {member.personalProjects.length}
                          </span>
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
                          {member.personalProjects.map((project, i) => (
                            <SwiperSlide key={i} style={{ width: "auto" }}>
                              {"link" in project && project.link ? (
                                <Link
                                  isExternal
                                  className="block"
                                  href={project.link as string}
                                >
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
                      <FontAwesomeIcon className="mr-2" icon={faEnvelope} />{" "}
                      {member.email}
                    </p>
                  )}
                  {(member as { phone?: string }).phone && (
                    <p className="text-xs text-neutral-400">
                      <FontAwesomeIcon className="mr-2" icon={faPhone} />{" "}
                      {(member as { phone?: string }).phone}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
