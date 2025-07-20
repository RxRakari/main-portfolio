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
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import Heading from "../ui/heading";
import { projects } from "../../static/projects";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const techIcons: { [key: string]: React.JSX.Element } = {
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

  console.log(handleProjectHover)

  return (
    <section 
      ref={sectionRef}
      id="projects-section" 
      className="min-h-screen bg-black text-white py-20 px-4 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Heading heading={"Featured Projects"} paragraph={"A collection of projects that showcase my skills in modern web development, from concept to deployment."} />

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
        <div className="my-12">
          <InfiniteMovingCards
            items={filteredProjects}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className=""
            renderItem={(project) => (
              <div className="group relative backdrop-blur-[10px] rounded-[20px] overflow-hidden transition-all duration-300 hover:border-[#fafafa15] cursor-pointer flex flex-col h-full text-white bg-white/5 border border-white/10 shadow-xl">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
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
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: any) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs backdrop-blur-[10px] rounded-full border border-gray-600 text-gray-300 hover:border-[#fafafa15] transition-all duration-200"
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
                  <div className="flex gap-3 mt-auto">
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
            )}
          />
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