import React from "react";
import Image, { StaticImageData } from "next/image";

interface ManufacturingFeatureCardProps {
  image: StaticImageData;
  title: string;
  description: string;
}

export const ManufacturingFeatureCard: React.FC<ManufacturingFeatureCardProps> = ({
  image,
  title,
  description,
}) => (
  <div className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-lg h-full" data-aos="fade-up">
    <div className="flex flex-col bg-black bg-opacity-95 p-6 rounded-lg h-full">
      <div className="flex items-center justify-center mb-4 h-full">
        <Image
          alt={title}
          src={image}
          className="w-full mb-4 mx-auto max-h-56 object-contain rounded-lg"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold my-2">{title}</h3>
        <p className="text-sm text-neutral-300">{description}</p>
      </div>
    </div>
  </div>
);
