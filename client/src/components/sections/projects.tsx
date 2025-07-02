import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaVuejs,
  FaAngular,
  FaPhp,
  FaLaravel,
  FaBootstrap,
  FaSass,
  FaGitAlt,
  FaDocker,
  FaAws
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiMongodb, 
  SiFirebase, 
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiGraphql,
  SiExpress,
  SiNestjs,
  SiDjango,
  SiFlask,
  SiSpring,
  SiCplusplus,
  SiGo,
  SiRust,
  SiKubernetes,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiStripe,
  SiPaypal,
  SiSocketdotio,
  SiRedux,
  SiReactquery,
  SiStyledcomponents,
  SiChakraui,
  SiMui,
  SiAntdesign,
  SiFramer,
  SiD3Dotjs,
  SiChartdotjs,
  SiJest,
  SiCypress,
  SiVite,
  SiWebpack,
  SiEslint,
  SiPrettier,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiJupyter,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock project data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe", "TailwindCSS", "Redux"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "Real-time chat application with AI-powered responses, message encryption, and multimedia support.",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=400&fit=crop",
    technologies: ["Next.js", "TypeScript", "Firebase", "OpenAI", "Socket.io", "TailwindCSS", "Zustand"],
    github: "https://github.com",
    live: "https://example.com",
    featured: true
  },
  {
    id: 3,
    title: "Portfolio Dashboard",
    description: "Interactive dashboard for tracking investment portfolios with real-time data visualization and analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["React", "Python", "Django", "PostgreSQL", "Chart.js", "D3.js", "TailwindCSS"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop functionality, team collaboration, and progress tracking.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    technologies: ["Vue.js", "Node.js", "NestJS", "MongoDB", "Socket.io", "Vuetify", "JWT"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  },
  {
    id: 5,
    title: "Weather Analytics",
    description: "Weather forecasting application with historical data analysis, interactive maps, and detailed climate insights.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    technologies: ["JavaScript", "HTML5", "CSS3", "Chart.js", "OpenWeatherAPI", "Leaflet", "Bootstrap"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Mobile-responsive fitness tracking app with workout plans, progress monitoring, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    technologies: ["React", "Firebase", "TailwindCSS", "PWA", "Framer Motion", "React Query"],
    github: "https://github.com",
    live: "https://example.com",
    featured: false
  }
];

// Real tech icons mapping
const techIcons: { [key: string]: React.JSX.Element } = {
  // Frontend Frameworks & Libraries
  "React": <FaReact className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "Vue.js": <FaVuejs className="text-[#4FC08D]" />,
  "Angular": <FaAngular className="text-[#DD0031]" />,
  "Svelte": <SiNextdotjs className="text-[#FF3E00]" />,
  
  // Languages
  "JavaScript": <FaJs className="text-[#F7DF1E]" />,
  "TypeScript": <SiTypescript className="text-[#3178C6]" />,
  "Python": <FaPython className="text-[#3776AB]" />,
  "Java": <DiJava className="text-[#ED8B00]" />,
  "C++": <SiCplusplus className="text-[#00599C]" />,
  "Go": <SiGo className="text-[#00ADD8]" />,
  "Rust": <SiRust className="text-[#000000]" />,
  "PHP": <FaPhp className="text-[#777BB4]" />,
  
  // Styling & UI
  "HTML5": <FaHtml5 className="text-[#E34F26]" />,
  "CSS3": <FaCss3Alt className="text-[#1572B6]" />,
  "TailwindCSS": <SiTailwindcss className="text-[#06B6D4]" />,
  "Bootstrap": <FaBootstrap className="text-[#7952B3]" />,
  "Sass": <FaSass className="text-[#CC6699]" />,
  "Styled Components": <SiStyledcomponents className="text-[#DB7093]" />,
  "Chakra UI": <SiChakraui className="text-[#319795]" />,
  "Material-UI": <SiMui className="text-[#007FFF]" />,
  "Ant Design": <SiAntdesign className="text-[#0170FE]" />,
  "Vuetify": <SiMui className="text-[#1867C0]" />,
  
  // Backend & APIs
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  "Express": <SiExpress className="text-white" />,
  "NestJS": <SiNestjs className="text-[#E0234E]" />,
  "Django": <SiDjango className="text-[#092E20]" />,
  "Flask": <SiFlask className="text-white" />,
  "Spring": <SiSpring className="text-[#6DB33F]" />,
  "Laravel": <FaLaravel className="text-[#FF2D20]" />,
  "GraphQL": <SiGraphql className="text-[#E10098]" />,
  
  // Databases
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "PostgreSQL": <SiPostgresql className="text-[#336791]" />,
  "MySQL": <SiMysql className="text-[#4479A1]" />,
  "Redis": <SiRedis className="text-[#DC382D]" />,
  "Firebase": <SiFirebase className="text-[#FFCA28]" />,
  
  // State Management
  "Redux": <SiRedux className="text-[#764ABC]" />,
  "React Query": <SiReactquery className="text-[#FF4154]" />,
  
  // Animation & 3D
  "Framer Motion": <SiFramer className="text-[#0055FF]" />,
  "GSAP": <SiFramer className="text-[#88CE02]" />,
  
  // Data Visualization
  "Chart.js": <SiChartdotjs className="text-[#FF6384]" />,
  "D3.js": <SiD3Dotjs className="text-[#F9A03C]" />,
  
  // Testing
  "Jest": <SiJest className="text-[#C21325]" />,
  "Cypress": <SiCypress className="text-[#17202C]" />,
  
  // DevOps & Cloud
  "Docker": <FaDocker className="text-[#2496ED]" />,
  "Kubernetes": <SiKubernetes className="text-[#326CE5]" />,
  "AWS": <FaAws className="text-[#FF9900]" />,
  "Vercel": <SiVercel className="text-white" />,
  "Netlify": <SiNetlify className="text-[#00C7B7]" />,
  "Heroku": <SiHeroku className="text-[#430098]" />,
  
  // Payment & APIs
  "Stripe": <SiStripe className="text-[#008CDD]" />,
  "PayPal": <SiPaypal className="text-[#00457C]" />,
  "Socket.io": <SiSocketdotio className="text-white" />,
  "OpenAI": <SiOpenai className="text-[#412991]" />,
  
  // Tools & Build
  "Git": <FaGitAlt className="text-[#F05032]" />,
  "Vite": <SiVite className="text-[#646CFF]" />,
  "Webpack": <SiWebpack className="text-[#8DD6F9]" />,
  "ESLint": <SiEslint className="text-[#4B32C3]" />,
  "Prettier": <SiPrettier className="text-[#F7B93E]" />,
  
  // AI & ML
  "TensorFlow": <SiTensorflow className="text-[#FF6F00]" />,
  "PyTorch": <SiPytorch className="text-[#EE4C2C]" />,
  "Jupyter": <SiJupyter className="text-[#F37626]" />,
  
  // Generic fallbacks
  "PWA": <span className="text-purple-400">📱</span>,
  "JWT": <span className="text-orange-400">🔐</span>,
  "OpenWeatherAPI": <span className="text-blue-400">🌤️</span>,
  "Leaflet": <span className="text-green-400">🗺️</span>
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { 
          opacity: 0, 
          y: 100 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Filter buttons animation
      gsap.fromTo(filterRef.current,
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects staggered animation
      gsap.fromTo(projectsRef.current,
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: projectsRef.current[0],
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Load more button animation
      gsap.fromTo(loadMoreRef.current,
        { 
          opacity: 0, 
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: loadMoreRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  useEffect(() => {
    if (projectsRef.current.length > 0) {
      gsap.fromTo(projectsRef.current,
        { 
          opacity: 0, 
          scale: 0.8,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    }
  }, [filter]);

  const filteredProjects = filter === "all" 
    ? projects 
    : filter === "featured" 
    ? projects.filter(p => p.featured)
    : projects.filter(p => !p.featured);

  const handleProjectHover = (projectId: number, isEntering: boolean) => {
    if (isEntering) {
      setHoveredProject(projectId);
      const projectCard = projectsRef.current.find(ref => 
        ref && ref.getAttribute('data-project-id') === projectId.toString()
      );
      if (projectCard) {
        gsap.to(projectCard, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    } else {
      setHoveredProject(null);
      const projectCard = projectsRef.current.find(ref => 
        ref && ref.getAttribute('data-project-id') === projectId.toString()
      );
      if (projectCard) {
        gsap.to(projectCard, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects-section" 
      className="min-h-screen bg-black text-white py-20 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in modern web development, 
            from concept to deployment.
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex justify-center mb-12">
          <div className="flex gap-2 p-2 backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]">
            {["all", "featured", "other"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-2 rounded-[25px] text-sm font-medium transition-all duration-300 capitalize ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectsRef.current[index] = el; }}
              data-project-id={project.id}
              className="group relative backdrop-blur-[10px] rounded-[20px] border border-[#fafafa0d] overflow-hidden transition-all duration-300 hover:border-[#fafafa15] cursor-pointer"
              onMouseEnter={() => handleProjectHover(project.id, true)}
              onMouseLeave={() => handleProjectHover(project.id, false)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Hover Overlay */}
                <div 
                  className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="text-white text-lg" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="text-white text-lg" />
                  </a>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1 text-xs backdrop-blur-[10px] rounded-full border border-[#fafafa0d] text-gray-300 hover:border-[#fafafa15] transition-all duration-200"
                      title={tech}
                    >
                      <span className="text-sm">
                        {techIcons[tech] || <span className="text-gray-400">•</span>}
                      </span>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm backdrop-blur-[10px] rounded-full border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:bg-white/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div ref={loadMoreRef} className="text-center mt-16">
          <button className="px-8 py-4 backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] hover:border-[#fafafa20] transition-all duration-300 hover:bg-white/5 text-gray-300 hover:text-white">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}