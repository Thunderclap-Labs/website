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
      <ShootingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 h-full flex flex-col">
        <Heading
          subtitle="A collective of passionate engineers, developers, and creators dedicated to building innovative solutions and pushing the boundaries of technology - Best of the best."
          title="Meet The Thunderclap Group"
        />

        {/* Team Members Section */}
        <div className="space-y-24 mt-16">
          {teamMembers.map((member, index) => {
            const memberProjects = getTeamMemberProjects(member.name);

            return (
              <section
                key={member.name}
                className={`${
                  index > 0 ? "pt-24 border-t border-neutral-800/50" : ""
                }`}
                id={createAnchorId(member.name)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                  {/* Profile Image and Contact */}
                  <div className="lg:col-span-1 flex flex-col gap-6 lg:max-w-xs">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-primary-500/20 shadow-xl group">
                      <Image
                        alt={member.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        priority={index < 2}
                        src={member.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {member.social.linkedin && (
                        <Link
                          isExternal
                          className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-400/50 transition-all duration-300"
                          href={member.social.linkedin}
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                        </Link>
                      )}
                      {member.social.github && (
                        <Link
                          isExternal
                          className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-400/50 transition-all duration-300"
                          href={member.social.github}
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </Link>
                      )}
                      {member.social.facebook && (
                        <Link
                          isExternal
                          className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-400/50 transition-all duration-300"
                          href={member.social.facebook}
                        >
                          <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                      )}
                      {member.social.website && (
                        <Link
                          isExternal
                          className="w-10 h-10 rounded-lg bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-400/50 transition-all duration-300"
                          href={member.social.website}
                        >
                          <FontAwesomeIcon icon={faGlobe} />
                        </Link>
                      )}
                    </div>

                    {member.badges && member.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {member.badges.map((badge, badgeIndex) => (
                          <Link
                            key={badgeIndex}
                            isExternal
                            className="hover:opacity-80 transition-opacity"
                            href={badge.link}
                            title={badge.label}
                          >
                            <Image
                              alt={badge.label}
                              className="rounded"
                              height={28}
                              src={badge.image}
                            />
                          </Link>
                        ))}
                      </div>
                    )}

                    {(member.email || (member as { phone?: string }).phone) && (
                      <div className="space-y-2 bg-neutral-800/30 rounded-xl p-4 border border-neutral-700/30">
                        {member.email && (
                          <p className="text-xs text-neutral-400 flex items-center gap-2">
                            <FontAwesomeIcon className="w-4" icon={faEnvelope} />
                            <span className="break-all">{member.email}</span>
                          </p>
                        )}
                        {(member as { phone?: string }).phone && (
                          <p className="text-xs text-neutral-400 flex items-center gap-2">
                            <FontAwesomeIcon className="w-4" icon={faPhone} />
                            {(member as { phone?: string }).phone}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="lg:col-span-3 flex flex-col text-left">
                    <div className="mb-6">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-100 mb-3 bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                        {member.name}
                      </h2>
                      <p className="text-primary-400 text-lg md:text-xl font-medium">
                        {member.role}
                      </p>
                    </div>

                    <p className="text-neutral-300 text-base md:text-lg mb-8 leading-relaxed">
                      {member.description}
                    </p>

                    <div className="grid gap-6">
                      {/* Skills */}
                      <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="font-semibold text-neutral-100 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                          Skills ({member.skills.length})
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {member.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-primary-500/10 border border-primary-500/20 text-primary-400 px-3 py-1.5 text-xs rounded-lg hover:bg-primary-500/20 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Thunderclap Labs Projects */}
                      {memberProjects.length > 0 && (
                        <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 backdrop-blur-sm">
                          <h3 className="font-semibold text-neutral-100 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-secondary-500 rounded-full"></span>
                            Thunderclap Labs Projects ({memberProjects.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {memberProjects.map((project) => (
                              <Link
                                key={project.id}
                                isExternal={!!project.link}
                                className={`flex items-center gap-2 bg-secondary-500/10 border border-secondary-500/20 text-secondary-400 px-3 py-1.5 text-xs rounded-lg ${project.link ? "hover:bg-secondary-500/20 transition-colors cursor-pointer" : ""}`}
                                href={project.link || "#"}
                              >
                                {project.active && (
                                  <span
                                    className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                                    title="Active"
                                  />
                                )}
                                <span>{project.name}</span>
                                {project.link && (
                                  <FontAwesomeIcon
                                    className="text-xs opacity-60"
                                    icon={faLink}
                                  />
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Personal Projects */}
                      {member.personalProjects &&
                        member.personalProjects.length > 0 && (
                          <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700/50 rounded-xl p-6 backdrop-blur-sm">
                            <h3 className="font-semibold text-neutral-100 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                              <span className="w-1 h-4 bg-accent-500 rounded-full"></span>
                              Personal Projects ({member.personalProjects.length})
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {member.personalProjects.map((project, i) => (
                                <Link
                                  key={i}
                                  isExternal={"link" in project && !!project.link}
                                  className={`bg-accent-500/10 border border-accent-500/20 text-accent-400 px-3 py-1.5 text-xs rounded-lg ${"link" in project && project.link ? "hover:bg-accent-500/20 transition-colors cursor-pointer" : ""}`}
                                  href={("link" in project && project.link) ? (project.link as string) : "#"}
                                >
                                  {project.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
