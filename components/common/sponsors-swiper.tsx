import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface SponsorsSwiperProps {
  sponsors: Array<{
    name: string;
    image: StaticImageData;
    delay?: number;
  }>;
  isClientMobile: boolean | null;
  heroAnchor?: string;
}

export const SponsorsSwiper = ({
  sponsors,
  isClientMobile,
  heroAnchor = "#Hero",
}: SponsorsSwiperProps) => {
  // Duplicate sponsors for better loop effect
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="absolute bottom-0 mx-6 left-0 right-0 flex justify-center items-center p-4">
      <div className="w-full max-w-7xl opacity-60 relative">
        <div className="relative overflow-hidden">
          {/* Fade overlay masks - adjusted for mobile peeking */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            centeredSlides={true}
            className="sponsors-swiper"
            loop={true}
            modules={[Autoplay]}
            slidesPerView={1.2}
            spaceBetween={10}
          >
            {duplicatedSponsors.map((sponsor, index) => (
              <SwiperSlide key={`${sponsor.name}-${index}`}>
                <div
                  className="flex items-center justify-center h-16 max-w-48 mx-auto rounded-lg bg-black/60 p-2"
                  data-aos="fade-up"
                  {...(isClientMobile === false
                    ? { "data-aos-anchor": heroAnchor }
                    : {})}
                  data-aos-delay={isClientMobile ? 0 : sponsor.delay || 1000}
                >
                  <Image
                    alt={sponsor.name}
                    className="object-contain"
                    height={30}
                    src={sponsor.image}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
