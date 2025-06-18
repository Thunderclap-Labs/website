import { projects } from "@/app/projects/constants/projects";
import Image from "next/image";
import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Aerospace":
      return "bg-blue-500/20 text-blue-400";
    case "Chemistry":
      return "bg-purple-500/20 text-purple-400";
    case "Software":
      return "bg-green-500/20 text-green-400";
    case "Hardware":
      return "bg-orange-500/20 text-orange-400";
    case "Research":
      return "bg-cyan-500/20 text-cyan-400";
    case "AI":
      return "bg-yellow-500/20 text-yellow-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const FeaturedProjectsShowcase = () => {
  // Always show the first 3 featured projects in order
  const selected = useMemo(
    () => projects.filter((p) => p.featured).slice(0, 3),
    []
  );

  return (
    <section className="bg-transparent text-white overflow-hidden" id="featured-projects-showcase">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {selected.map((project) => (
            <div className="featured-card white-feature bg-neutral-600 bg-opacity-55 p-[1px] rounded-lg" key={project.id}>
              <div className={`flex flex-col bg-black bg-opacity-95 p-1 rounded-lg h-full`}>
                {project.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    {project.link && (
                      <Link
                        isExternal
                        className="absolute top-2 right-2 text-neutral-400 hover:text-primary-400"
                        href={project.link}
                      >
                        <FontAwesomeIcon icon={faLink} />
                      </Link>
                    )}
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center mb-2 gap-2">
                    <h2 className="text-xl font-bold text-neutral-100">{project.name}</h2>
                    {project.active && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30 ml-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-1" />
                        Active
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.categories.map((cat) => (
                      <span key={cat} className={`px-2 py-1 text-xs rounded-md font-semibold ${getCategoryColor(cat)}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <p className="text-neutral-200 text-sm mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags &&
                      project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary-500/20 text-primary-400 px-2 py-1 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    {project.tags && project.tags.length > 5 && (
                      <span className="text-xs text-neutral-400">+{project.tags.length - 5} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};