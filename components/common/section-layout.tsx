import React, { ReactNode } from "react";

interface SectionLayoutProps {
  id: string;
  title: string;
  description?: ReactNode;
  titleAlignment?: "left" | "center" | "right";
  descriptionAlignment?: "left" | "center" | "right";
  contentAlignment?: "left" | "center" | "right";
  descriptionMaxWidth?: string;
  children: ReactNode;
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
  contentAlignment = "center",
  descriptionMaxWidth = "max-w-3xl",
  children,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  contentClassName = "",
  showBackground = true,
}) => {
  const getAlignmentClass = (
    alignment: "left" | "center" | "right" | undefined,
  ) => {
    switch (alignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getContentAlignmentClass = (
    alignment: "left" | "center" | "right" | undefined,
  ) => {
    switch (alignment) {
      case "left":
        return "items-start";
      case "center":
        return "items-center";
      case "right":
        return "items-end";
      default:
        return "items-center";
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
            className={`text-4xl sm:text-5xl md:text-7xl font-semibold ${getAlignmentClass(titleAlignment)} ${titleClassName}`} 
            data-aos="fade-up"
          >
            {title}
          </h1>
        </div>
        {description && (
          <div className={`flex w-full text-lg my-4 ${descriptionAlignment === "right" ? "justify-end" : descriptionAlignment === "center" ? "justify-center" : "justify-start"}`}>
            <div
              className={`max-w-3xl text-lg md:text-3xl font-normal leading-relaxed ${getAlignmentClass(descriptionAlignment)} ${descriptionClassName}`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {description}
            </div>
          </div>
        )}
        <div
          className={`flex flex-col w-full ${getContentAlignmentClass(contentAlignment)}`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {children}
        </div>
      </div>
    </section>
  );
};
