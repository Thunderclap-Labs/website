import Image from "next/image";

import {
  title as titleStyle,
  subtitle as subtitleStyle,
} from "@/components/primitives";
import logo from "@/components/images/logo.png";
import { StatsGrid } from "./stats-grid";

interface StatItem {
  value: string;
  title: string;
  description: string;
  delay?: number;
}

interface HeadingProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
  className?: string;
  statsData?: StatItem[];
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  showLogo = true,
  className = "",
  statsData,
}) => {
  return (
    <div
      className={`flex flex-col text-center mb-16 mt-16 sm:mb-20 ${className}`}
    >
      {showLogo && (
        <Image
          alt="Thunderclap Logo"
          className="glow mx-auto mb-4 h-12 w-12"
          data-aos="zoom-in"
          src={logo}
        />
      )}
      <h1
        className={titleStyle({
          class: "mb-4 text-4xl sm:text-5xl lg:text-6xl",
        })}
        data-aos="fade-up"
      >
        {title}
      </h1>
      <p
        className={subtitleStyle({
          class: "max-w-2xl mx-auto text-lg sm:text-xl",
        })}
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {subtitle}
      </p>
      {statsData && (
        <div className="mt-16">
          <StatsGrid stats={statsData} />
        </div>
      )}
    </div>
  );
};
