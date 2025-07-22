import React, { useState } from 'react';
import { PageHeader } from '../../../components/ui/page-header';
import { projects } from '../../../static/projects';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { techIcons } from '../../../components/sections/projects';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured" 
    ? projects.filter(p => p.featured)
    : projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen text-white flex flex-col">
      <PageHeader
        heading="Projects"
        paragraph="Explore some of my best work, from web apps to open-source contributions."
      />
      
      {/* Filter Buttons */}
      <div className="flex justify-center mb-16">
        <div className="flex gap-2 p-2 backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]">
          {["all", "featured", "other"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-6 py-2 rounded-[25px] text-[1.2rem] font-medium transition-all duration-300 capitalize ${
                filter === filterType
                  ? "bg-white text-black"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="max-w-[1200px] mx-auto px-4 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="group relative backdrop-blur-[10px] rounded-[20px] overflow-hidden transition-all duration-300 hover:border-[#fafafa15] cursor-pointer flex flex-col h-full text-white bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl hover:transform hover:scale-[1.02]"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "https://via.placeholder.com/400x200/1a1a1a/ffffff?text=" + project.title}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              
              {/* Project Content */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech: any) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1 text-sm backdrop-blur-[10px] rounded-full border border-gray-600 text-gray-300 hover:border-[#fafafa15] transition-all duration-200"
                      title={tech}
                    >
                      <span className="text-base">
                        {techIcons[tech] || <span className="text-gray-400">•</span>}
                      </span>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="flex items-center gap-1.5 px-3 py-1 text-sm backdrop-blur-[10px] rounded-full border border-gray-600 text-gray-300">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                {/* Links */}
                <div className="flex gap-3 mt-auto" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-[10px] rounded-full border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:bg-white/5"
                  >
                    <FaGithub />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 