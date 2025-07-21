import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { teamMembers } from "@/app/team/constants/team-members";

export const TeamSwiper: React.FC = () => (
  <div className="relative">
    {/* Fade overlays for left/right */}
    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10" />
    <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      slidesPerView={1.6}
      breakpoints={{
        640: { slidesPerView: 2.2, spaceBetween: 16 },
        1024: { slidesPerView: 3.2, spaceBetween: 24 },
        1280: { slidesPerView: 4.2, spaceBetween: 32 },
      }}
      spaceBetween={12}
      className="py-8"
      centeredSlides={true}
      style={{ minHeight: 0 }}
    >
      {teamMembers.map((member, i) => (
        <SwiperSlide key={member.name} style={{ width: "auto", height: "100%" }}>
          <div
            className="flex flex-col items-center bg-black bg-opacity-95 border border-neutral-900 rounded-lg p-6 shadow-lg min-h-[340px] h-full max-w-xs mx-auto"
            style={{ height: "340px" }}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="relative w-24 min-h-24 mb-3 rounded-full overflow-hidden border-2 border-primary-500">
              <Image
                alt={member.name}
                src={member.image}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-neutral-100 text-center">{member.name}</h3>
            <p className="text-primary-400 text-xs text-center mb-2">{member.role}</p>
            <p className="text-neutral-300 text-xs text-center line-clamp-3 mb-2">{member.description}</p>
            <div className="flex flex-wrap gap-1 justify-center mt-auto">
              {member.skills?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="bg-primary-500/20 text-primary-400 px-2 py-0.5 text-[11px] rounded"
                >
                  {skill}
                </span>
              ))}
              {member.skills && member.skills.length > 3 && (
                <span className="text-xs text-neutral-400">+{member.skills.length - 3} more</span>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
