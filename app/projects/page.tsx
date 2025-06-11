"use client";

import { Link } from "@heroui/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faUsers, faCalendar, faCheckCircle, faClock, faSearch, faFilter, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { Heading } from "@/components/common/heading";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { projects } from "./constants/projects";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Input, Select, SelectItem, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

import "swiper/css";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-green-400';
    case 'Completed':
      return 'text-blue-400';
    case 'On Hold':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Aerospace':
      return 'bg-blue-500/20 text-blue-400';
    case 'Drone Technology':
      return 'bg-purple-500/20 text-purple-400';
    case 'Software':
      return 'bg-green-500/20 text-green-400';
    case 'Hardware':
      return 'bg-orange-500/20 text-orange-400';
    case 'Research':
      return 'bg-cyan-500/20 text-cyan-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

// Function to create team member link with anchor
const createTeamMemberLink = (memberName: string) => {
  // Convert name to a URL-friendly anchor (lowercase, replace spaces with hyphens)
  const anchor = memberName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  return `/team#${anchor}`;
};

// Get unique values for filters
const getUniqueCategories = () => {
  const categories = new Set();
  projects.forEach(project => {
    project.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories) as string[];
};

const getUniqueTags = () => {
  const tags = new Set();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags) as string[];
};

const getUniqueMembers = () => {
  const members = new Set();
  projects.forEach(project => {
    project.teamMembers.forEach(member => members.add(member));
  });
  return Array.from(members) as string[];
};

const sortOptions = [
  { key: 'name', label: 'Name (A-Z)' },
  { key: 'nameDesc', label: 'Name (Z-A)' },
  { key: 'dateNew', label: 'Newest First' },
  { key: 'dateOld', label: 'Oldest First' },
  { key: 'status', label: 'Status (Active First)' },
  { key: 'teamSize', label: 'Team Size' },
  { key: 'techCount', label: 'Technology Count' }
];

export default function ProjectsPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('dateNew');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Search filter
      const matchesSearch = !searchQuery || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.some(cat => project.categories.includes(cat as any));

      // Status filter
      const matchesStatus = !selectedStatus || project.status === selectedStatus;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag));

      // Members filter
      const matchesMembers = selectedMembers.length === 0 || 
        selectedMembers.some(member => project.teamMembers.includes(member));

      // Active only filter
      const matchesActive = !showActiveOnly || project.active;

      return matchesSearch && matchesCategory && matchesStatus && matchesTags && matchesMembers && matchesActive;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateNew':
          return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime();
        case 'dateOld':
          return new Date(a.startDate || '').getTime() - new Date(b.startDate || '').getTime();
        case 'status':
          if (a.status === 'Active' && b.status !== 'Active') return -1;
          if (b.status === 'Active' && a.status !== 'Active') return 1;
          return a.status.localeCompare(b.status);
        case 'teamSize':
          return b.teamMembers.length - a.teamMembers.length;
        case 'techCount':
          return b.tags.length - a.tags.length;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, searchQuery, selectedCategories, selectedStatus, selectedTags, selectedMembers, sortBy, showActiveOnly]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStatus('');
    setSelectedTags([]);
    setSelectedMembers([]);
    setShowActiveOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedStatus || 
    selectedTags.length > 0 || selectedMembers.length > 0 || showActiveOnly;

  return (
    <div className="flex flex-col items-center justify-start text-center min-h-screen">
        <ShootingStars />
      <div className="relative z-10 max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 h-full flex flex-col">
        <Heading
          title="Our Projects"
          subtitle="Discover the innovative solutions and cutting-edge technologies we're developing to shape the future of aerospace, defense, and atmospheric sciences."
        />

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4 flex-shrink-0">
          {/* Main Controls Row - Full width layout */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center w-full">
            {/* Search Bar - Full width on mobile, flex-1 on desktop */}
            <div className="flex-1 w-full">
              <Input
                placeholder="Search projects, descriptions, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<FontAwesomeIcon icon={faSearch} className="text-neutral-400" />}
                classNames={{
                  input: "bg-neutral-800 border-neutral-700",
                  inputWrapper: "bg-neutral-800 border-neutral-700 w-full",
                }}
              />
            </div>
            
            {/* All controls in one line - take remaining space */}
            <div className="flex gap-2 items-center flex-wrap lg:flex-nowrap flex-shrink-0">
              {/* Active Only Button */}
              <Button
                size="sm"
                variant={showActiveOnly ? "solid" : "bordered"}
                onPress={() => setShowActiveOnly(!showActiveOnly)}
                className={showActiveOnly ? "bg-green-600 text-white" : "bg-neutral-800 border-neutral-700 text-neutral-200"}
              >
                Active Only
              </Button>

              {/* Filters Button */}
              <Button
                onPress={onOpen}
                variant="bordered"
                className="bg-neutral-800 border-neutral-700 text-neutral-200"
                startContent={<FontAwesomeIcon icon={faFilter} />}
              >
                Filters {hasActiveFilters && `(${[selectedCategories.length, selectedTags.length, selectedMembers.length, selectedStatus ? 1 : 0, showActiveOnly ? 1 : 0].reduce((a, b) => a + b, 0)})`}
              </Button>
              
              {/* Sort Dropdown */}
              <Select
                placeholder="Sort by"
                selectedKeys={[sortBy]}
                onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                className="w-48 flex-shrink-0"
                classNames={{
                  trigger: "bg-neutral-800 border-neutral-700",
                  value: "text-neutral-200"
                }}
                startContent={<FontAwesomeIcon icon={faSort} />}
              >
                {sortOptions.map((option) => (
                  <SelectItem key={option.key}>
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Clear All and Results Count */}
              {hasActiveFilters && (
                <Button
                  size="sm"
                  variant="light"
                  onPress={clearFilters}
                  className="text-red-400 hover:bg-red-400/10"
                  startContent={<FontAwesomeIcon icon={faTimes} />}
                >
                  Clear All
                </Button>
              )}

              <div className="text-sm text-neutral-400 whitespace-nowrap">
                {filteredAndSortedProjects.length} of {projects.length} projects
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 w-full">
              {selectedCategories.map(category => (
                <Chip
                  key={category}
                  onClose={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
                  variant="flat"
                  color="primary"
                  size="sm"
                >
                  Category: {category}
                </Chip>
              ))}
              {selectedTags.map(tag => (
                <Chip
                  key={tag}
                  onClose={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                  variant="flat"
                  color="secondary"
                  size="sm"
                >
                  Tech: {tag}
                </Chip>
              ))}
              {selectedMembers.map(member => (
                <Chip
                  key={member}
                  onClose={() => setSelectedMembers(prev => prev.filter(m => m !== member))}
                  variant="flat"
                  color="warning"
                  size="sm"
                >
                  Member: {member}
                </Chip>
              ))}
              {selectedStatus && (
                <Chip
                  onClose={() => setSelectedStatus('')}
                  variant="flat"
                  color="success"
                  size="sm"
                >
                  Status: {selectedStatus}
                </Chip>
              )}
            </div>
          )}
        </div>

        {/* Projects Section - Take up remaining space */}
        <div className="flex-grow flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 h-full">
            {filteredAndSortedProjects.length === 0 ? (
              <div className="col-span-full flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-neutral-300 mb-2">No projects found</h3>
                  <p className="text-neutral-500">Try adjusting your filters or search terms</p>
                  {hasActiveFilters && (
                    <Button
                      onPress={clearFilters}
                      variant="bordered"
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              filteredAndSortedProjects.map((project) => (
                <div
                  key={project.id}
                  className={`featured-card white-feature bg-transparent p-[2px] rounded-xl text-left transition-all duration-300 ease-in-out h-full ${
                    hoveredProject === project.id ? 'scale-105 z-10' : 'hover:scale-102'
                  }`}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="bg-neutral-800 backdrop-blur-sm rounded-xl shadow-xl h-full flex flex-col overflow-hidden">
                    {/* Project Image */}
                    {project.image && (
                      <div className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                        hoveredProject === project.id ? 'h-80' : 'h-48'
                      }`}>
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 to-transparent opacity-60" />
                        {project.active && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                              Active
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-xl md:text-2xl font-bold text-neutral-100">{project.name}</h2>
                            {project.active && !project.image && (
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full" title="Active Project"></span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            {/* Multiple Categories */}
                            {project.categories.map((category, index) => (
                              <span key={index} className={`px-2 py-1 text-xs rounded-md ${getCategoryColor(category)}`}>
                                {category}
                              </span>
                            ))}
                            <div className="flex items-center gap-1 text-sm text-neutral-400">
                              <FontAwesomeIcon icon={project.status === 'Active' ? faCheckCircle : faClock} className="w-3 h-3" />
                              <span className={getStatusColor(project.status)}>{project.status}</span>
                            </div>
                          </div>
                          {project.startDate && (
                            <p className="text-xs text-neutral-400 mb-2">
                              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                              Started: {new Date(project.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                            </p>
                          )}
                        </div>
                        {project.link && (
                          <Link href={project.link} isExternal className="text-neutral-400 hover:text-primary-400 ml-4">
                            <FontAwesomeIcon icon={faLink} size="lg" />
                          </Link>
                        )}
                      </div>

                      <p className="text-neutral-300 text-sm mb-4 flex-grow">{project.description}</p>

                      {/* Standard content container - fixed overflow issues */}
                      <div>
                        {/* Technology Tags - fixed cutoff */}
                        <div className="mb-4">
                          <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                            Technologies: <span className="text-primary-400">{project.tags.length}</span>
                          </h3>
                          <div className="overflow-visible">
                            <Swiper
                              modules={[Autoplay]}
                              spaceBetween={10}
                              slidesPerView={'auto'}
                              loop={project.tags.length > 3}
                              autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                              }}
                              className="h-7"
                            >
                              {project.tags.map(tag => (
                                <SwiperSlide key={tag} style={{ width: 'auto' }}>
                                  <span className="bg-primary-500/20 text-primary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap">
                                    {tag}
                                  </span>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>

                        {/* Team Members - fixed cutoff */}
                        {project.teamMembers.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-neutral-200 mb-2 text-sm">
                              <FontAwesomeIcon icon={faUsers} className="mr-2" />
                              Team: <span className="text-secondary-400">{project.teamMembers.length}</span>
                            </h3>
                            <div className="overflow-visible">
                              <Swiper
                                modules={[Autoplay]}
                                spaceBetween={10}
                                slidesPerView={'auto'}
                                loop={project.teamMembers.length > 2}
                                autoplay={{
                                  delay: 5000,
                                  disableOnInteraction: false,
                                }}
                                className="h-7"
                              >
                                {project.teamMembers.map((member, i) => (
                                  <SwiperSlide key={i} style={{ width: 'auto' }}>
                                    <Link href={createTeamMemberLink(member)} className="block">
                                      <span className="bg-secondary-500/20 text-secondary-500 px-3 py-1.5 text-xs rounded-md whitespace-nowrap hover:bg-secondary-500/40 transition-colors cursor-pointer">
                                        {member}
                                      </span>
                                    </Link>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                          </div>
                        )}

                        {/* Commented out additional details section that appeared on hover */}
                        {/* 
                        <div className={`border-t border-neutral-700 pt-4 mt-4 space-y-2 transition-all duration-500 ease-in-out ${
                          hoveredProject === project.id 
                            ? 'opacity-100 translate-y-0 max-h-32' 
                            : 'opacity-0 translate-y-2 max-h-0 overflow-hidden'
                        }`}>
                          <div className="flex justify-between items-center text-xs text-neutral-400">
                            <span>Project Duration</span>
                            <span>
                              {project.startDate ? `${new Date(project.startDate).getFullYear()} - ${project.status === 'Active' ? 'Present' : 'Completed'}` : 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-neutral-400">
                            <span>Team Size</span>
                            <span>{project.teamMembers.length} member{project.teamMembers.length !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-neutral-400">
                            <span>Tech Stack</span>
                            <span>{project.tags.length} technologies</span>
                          </div>
                        </div>
                        */}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Advanced Filters Modal */}
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">Advanced Filters</h3>
                  <p className="text-sm text-neutral-500">Filter projects by categories, technologies, team members, and more</p>
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-6">
                    {/* Categories Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Categories</label>
                      <div className="flex flex-wrap gap-2">
                        {getUniqueCategories().map(category => (
                          <Button
                            key={category}
                            size="sm"
                            variant={selectedCategories.includes(category) ? "solid" : "bordered"}
                            onPress={() => {
                              setSelectedCategories(prev => 
                                prev.includes(category) 
                                  ? prev.filter(c => c !== category)
                                  : [...prev, category]
                              );
                            }}
                            className={getCategoryColor(category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <Select
                        placeholder="Select status"
                        selectedKeys={selectedStatus ? [selectedStatus] : []}
                        onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] as string || '')}
                      >
                        <SelectItem key="Active">Active</SelectItem>
                        <SelectItem key="Completed">Completed</SelectItem>
                        <SelectItem key="On Hold">On Hold</SelectItem>
                      </Select>
                    </div>

                    {/* Technologies Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Technologies ({selectedTags.length} selected)</label>
                      <div className="max-h-40 overflow-y-auto">
                        <div className="flex flex-wrap gap-2">
                          {getUniqueTags().map(tag => (
                            <Button
                              key={tag}
                              size="sm"
                              variant={selectedTags.includes(tag) ? "solid" : "bordered"}
                              onPress={() => {
                                setSelectedTags(prev => 
                                  prev.includes(tag) 
                                    ? prev.filter(t => t !== tag)
                                    : [...prev, tag]
                                );
                              }}
                              className="text-xs"
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Team Members Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Members ({selectedMembers.length} selected)</label>
                      <div className="flex flex-wrap gap-2">
                        {getUniqueMembers().map(member => (
                          <Button
                            key={member}
                            size="sm"
                            variant={selectedMembers.includes(member) ? "solid" : "bordered"}
                            onPress={() => {
                              setSelectedMembers(prev => 
                                prev.includes(member) 
                                  ? prev.filter(m => m !== member)
                                  : [...prev, member]
                              );
                            }}
                          >
                            {member}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={clearFilters}>
                    Clear All
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Apply Filters
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
