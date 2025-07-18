import React from "react";

interface SectionLayoutProps {
  id: string;
  title: string;
  description?: React.ReactNode;
  titleAlignment?: "left" | "center" | "right";
  descriptionAlignment?: "left" | "center" | "right";
  descriptionMaxWidth?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  showBackground?: boolean;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  id,
  title,
  description,
  titleAlignment = "center",
  descriptionAlignment = "center",
  descriptionMaxWidth = "max-w-3xl",
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  showBackground = true,
}) => {
  const getTitleAlignmentClass = () => {
    switch (titleAlignment) {
      case "left":
        return "text-left";
      case "right":
        return "text-right";
      default:
        return "text-center";
    }
  };

  const getDescriptionAlignmentClass = () => {
    switch (descriptionAlignment) {
      case "left":
        return "justify-start text-left";
      case "right":
        return "justify-end text-right";
      default:
        return "justify-center text-center";
    }
  };

  return (
    <section
      className={`relative py-20 ${showBackground ? 'bg-transparent text-white' : ''} overflow-hidden ${className}`}
      id={id}
    >
      <div className="relative z-10 container max-w-7xl mx-auto px-4">
        <div className="pb-12">
          <h1 
            className={`text-4xl sm:text-5xl md:text-7xl font-semibold ${getTitleAlignmentClass()} ${titleClassName}`} 
            data-aos="fade-up"
          >
            {title}
          </h1>
        </div>
        {description && (
          <div className={`flex w-full text-lg my-4 ${getDescriptionAlignmentClass()}`}>
            <div
              className={`${descriptionMaxWidth} text-lg md:text-3xl leading-relaxed ${descriptionClassName}`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {description}
            </div>
          </div>
        )}
        <div className={`mt-12 ${contentClassName}`} data-aos="fade-up" data-aos-delay="200">
          {children}
        </div>
      </div>
    </section>
  );
};
