import Image from "next/image";
import { title as titleStyle, subtitle as subtitleStyle } from "@/components/primitives";
import logo from "@/components/images/logo.png";

interface HeadingProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle, 
  showLogo = true, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col text-center mb-16 mt-16 sm:mb-20 ${className}`}>
      {showLogo && (
        <Image 
          src={logo} 
          alt="Thunderclap Logo" 
          className="glow mx-auto mb-4 h-12 w-12" 
          data-aos="zoom-in" 
        />
      )}
      <h1 
        className={titleStyle({ class: "mb-4 text-4xl sm:text-5xl lg:text-6xl"})} 
        data-aos="fade-up"
      >
        {title}
      </h1>
      <p 
        className={subtitleStyle({ class: "max-w-2xl mx-auto text-lg sm:text-xl" })} 
        data-aos="fade-up" 
        data-aos-delay="100"
      >
        {subtitle}
      </p>
    </div>
  );
};
