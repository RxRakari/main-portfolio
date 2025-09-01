import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../../hooks/queries/use-portfolio-data';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { techIcons } from '../../../config/tech-icons';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: projectData, isLoading, error } = useProject(id!);
  const [project, setProject] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'approach', label: 'Approach & Challenges' },
    { id: 'technologies', label: 'Technologies' }
  ];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await projectData;
        const p = res?.data?.project;
        if (p) setProject(p);
      } finally {
      }
    };
    if (id) load();
  }, [id, projectData]);

  // Handle scroll to update active section
  useEffect(() => {
    if (!project) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better UX

      // Find the section that is currently in view
      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [project, sections]);

  // Scroll to section when clicking on sidebar
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for better positioning
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!project || error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="text-3xl mb-6">Project not found</div>
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          <FaArrowLeft /> Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar navigation */}
      <div className="fixed top-[100px] left-0 w-[200px] pt-24 pl-8 h-screen">
        {sections.map((section: any) => (
          <div 
            key={section.id}
            className={`mb-4 text-[1.5rem] cursor-pointer ${activeSection === section.id ? 'text-white' : 'text-gray-500'}`}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="ml-[200px] flex justify-center mt-[100px]">
        <div className="w-full max-w-[1200px] py-24 px-4">
          {/* Back button */}
          <button
            className="text-gray-400 text-[1.5rem] tracking-wider mb-16 hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate('/projects')}
          >
            <FaArrowLeft /> Back to Projects
          </button>
          
          {/* Project header */}
          <div className="mb-12">
            <div className="flex flex-col flex-wrap items-start gap-4 mb-6">
              {project?.featured && (
                <span className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-sm">
                  Featured Project
                </span>
              )}
              <h1 className="text-6xl font-medium">{project?.title}</h1>
            </div>
            <p className="text-2xl text-gray-300 mb-8">{project?.description}</p>
          </div>
          
          {/* Project image */}
          <div className="rounded-[25px] overflow-hidden mb-16 border border-gray-800">
            <img 
             src={project?.images?.[0]?.url || "https://via.placeholder.com/400x200/1a1a1a/ffffff?text=" + project?.title} 
              alt={project?.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Project Overview */}
          <div 
            id="overview" 
            ref={(el) => { sectionRefs.current['overview'] = el; }}
            className="mb-24"
          >
            <h2 className="text-4xl font-medium mb-8">Project Overview</h2>
            <p className="text-2xl text-gray-300 leading-relaxed font-light">
              {project?.description}
              {/* Extended description would go here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, 
              nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl. Nullam euismod, nisl eget aliquam ultricies,
              nunc nisl aliquet nunc, quis aliquam nisl nisl vitae nisl.
            </p>
          </div>
          
          {/* Key Features */}
          <div 
            id="features" 
            ref={(el) => { sectionRefs.current['features'] = el; }}
            className="mb-24"
          >
            <h2 className="text-4xl font-medium mb-8">Key Features</h2>
            <ul className="text-2xl text-gray-300 leading-relaxed font-light space-y-6">
              <li className="flex items-start gap-3">
                <span className="text-white text-3xl">•</span>
                <span>Feature one with detailed explanation of what it does and how it works</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white text-3xl">•</span>
                <span>Feature two with technical implementation details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white text-3xl">•</span>
                <span>Feature three highlighting user experience improvements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white text-3xl">•</span>
                <span>Feature four showcasing technical innovation</span>
              </li>
            </ul>
          </div>
          
          {/* Approach & Challenges */}
          <div 
            id="approach" 
            ref={(el) => { sectionRefs.current['approach'] = el; }}
            className="mb-24"
          >
            <h2 className="text-4xl font-medium mb-8">Approach & Challenges</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-medium mb-4">Development Approach</h3>
                <p className="text-2xl text-gray-300 leading-relaxed font-light mb-6">
                  My approach to this project began with extensive research and planning. I created detailed wireframes and user flows to ensure a seamless user experience before writing any code.
                </p>
                <p className="text-2xl text-gray-300 leading-relaxed font-light">
                  I adopted a component-based architecture using {project?.technologies?.includes("React") ? "React" : project?.technologies?.[0]} to ensure maintainability and scalability. This modular approach allowed for efficient development and easier testing throughout the project lifecycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-4">Challenges & Solutions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-purple-400">Performance Optimization</h4>
                    <p className="text-2xl text-gray-300 leading-relaxed font-light">
                      One significant challenge was optimizing performance with large datasets. I implemented virtualization and pagination techniques to reduce initial load time by 60% and improve overall responsiveness.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-2 text-purple-400">Cross-Browser Compatibility</h4>
                    <p className="text-2xl text-gray-300 leading-relaxed font-light">
                      Ensuring consistent behavior across different browsers required extensive testing and several CSS fallbacks. I created a comprehensive testing protocol that identified and resolved edge cases.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technologies */}
          <div 
            id="technologies" 
            ref={(el) => { sectionRefs.current['technologies'] = el; }}
            className="mb-24"
          >
            <h2 className="text-4xl font-medium mb-8">Technologies Used</h2>
            <div className="flex flex-wrap gap-4">
              {project?.technologies?.map((tech: string) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-800 rounded-[20px] text-gray-300 text-[1.2rem]"
                >
                  <span className="text-2xl">
                    {techIcons[tech] || <span className="text-gray-400">•</span>}
                  </span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Project links */}
          <div className="flex flex-wrap gap-6 pb-24">
            {project?.githubUrl && (
            <a
              href={project?.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:bg-white/5 text-xl"
            >
              <FaGithub className="text-2xl" />
              View Source Code
            </a>
            )}
            {project?.liveUrl && (
            <a
              href={project?.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-[33px] hover:bg-gray-200 transition-all duration-300 text-xl"
            >
              <FaExternalLinkAlt className="text-xl" />
              Visit Live Project
            </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
