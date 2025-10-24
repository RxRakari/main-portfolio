import { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaAward, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFeaturedExperiences } from '../../hooks/queries/use-portfolio-data';
import Heading from '../ui/heading';
interface ExperienceData {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  featured: boolean;
}

export const ExperienceSection = () => {
  const mockExperiences: ExperienceData[] = [
    {
      id: '1',
      title: "Senior Software Engineer",
      company: "Cursor",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description: "Led the development of AI-powered code completion tools, improving developer productivity by 35%. Architected and implemented real-time collaboration features used by over 50,000 developers.",
      achievements: [
        "Reduced system latency by 45% through optimized algorithms and caching strategies",
        "Led a team of 5 engineers to deliver a major feature update ahead of schedule",
        "Implemented an advanced machine learning pipeline that improved code suggestions by 28%",
        "Presented technical architecture at 3 industry conferences"
      ],
      technologies: ["TypeScript", "React", "Node.js", "Python", "TensorFlow"],
      featured: true
    },
    {
      id: '2',
      title: "Software Engineer",
      company: "Google",
      period: "2019 - 2022",
      location: "Mountain View, CA",
      description: "Developed scalable backend services handling millions of requests daily. Contributed to the redesign of core APIs, reducing latency by 40% and improving overall system reliability.",
      achievements: [
        "Designed and implemented a distributed caching system that reduced database load by 60%",
        "Optimized data processing pipelines, reducing batch processing time from hours to minutes",
        "Contributed to open-source projects with over 10k stars on GitHub",
        "Mentored 4 junior engineers who were later promoted to mid-level positions"
      ],
      technologies: ["Go", "Kubernetes", "gRPC", "Cloud Pub/Sub", "BigQuery"],
      featured: true
    },
    {
      id: '3',
      title: "Frontend Engineer",
      company: "Stripe",
      period: "2017 - 2019",
      location: "Remote",
      description: "Built responsive, high-performance UI components for the Stripe Dashboard. Implemented data visualization tools that helped merchants better understand transaction patterns.",
      achievements: [
        "Rebuilt the analytics dashboard, increasing user engagement by 40%",
        "Reduced bundle size by 35% through code splitting and lazy loading strategies",
        "Created a reusable component library that accelerated feature development by 25%",
        "Implemented accessibility improvements that achieved WCAG AA compliance"
      ],
      technologies: ["JavaScript", "React", "Redux", "GraphQL", "D3.js"],
      featured: true
    }
  ];

  const [activeExperience, setActiveExperience] = useState(0);
  const [experiences, setExperiences] = useState<ExperienceData[]>(mockExperiences);
  const { data: experiencesData, isLoading, error } = useFeaturedExperiences();
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (experiencesData?.data?.experiences && experiencesData.data.experiences.length > 0) {
      setExperiences(experiencesData.data.experiences);
      setActiveExperience(0);
    } else if (!isLoading && !error) {
      // ensure we have fallback mock data when API returns empty
      setExperiences(mockExperiences);
      setActiveExperience(0);
    } else if (error) {
      // keep showing mock data on error but log for debug
      console.warn('Failed to load experiences, using mock data', error);
      if (experiences.length === 0) setExperiences(mockExperiences);
    }
  }, [experiencesData, isLoading, error]);

  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        if (!isHovering && experiences.length > 0) {
          setActiveExperience(prev => (prev + 1) % experiences.length);
        }
      }, 5000); // Change tab every 5 seconds
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    // Start autoplay if experiences are loaded
    if (!isLoading && experiences.length > 0) {
      startAutoplay();
    }

    // Clean up on unmount
    return () => stopAutoplay();
  }, [experiences.length, isHovering, isLoading]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Always render the section shell — show subtle status banners when loading or on error
  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Small status banners so content doesn't vanish */}
      <div className="max-w-[1200px] mx-auto px-4">
        {isLoading && (
          <div className="mb-4">
            <p className="text-sm text-gray-400">Loading latest experiences — showing sample content.</p>
          </div>
        )}
        {error && (
          <div className="mb-4">
            <p className="text-sm text-yellow-400">Unable to load live experiences — showing sample content.</p>
          </div>
        )}
      </div>

      {/* Background elements */}
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] -z-10"></div>
      
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='md:flex flex-col hidden'
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Experience</h2>
          <p className="md:text-lg text-base text-gray-400 mb-24 max-w-2xl">
            My professional journey through tech, with a focus on building innovative and scalable solutions.
          </p>
        </motion.div>
        
        <Heading
        className="md:hidden flex flex-col"
        heading={"Experience"}
        paragraph={"My professional journey through tech, with a focus on building innovative and scalable solutions."}
         />
        
        <div className="flex flex-col md:flex-row gap-20">
          {/* Company tabs */}
          <div className="w-full md:w-1/3">
            <div className="space-y-2 sticky top-24">
              {experiences.map((exp, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  key={index}
                  onClick={() => setActiveExperience(index)}
                  className={`w-full text-left py-5 px-8 text-[0.9rem] md:text-[1.2rem] transition-all duration-300 rounded-r-lg relative overflow-hidden ${
                    activeExperience === index 
                      ? "bg-white/5 text-white border-l-4 border-purple-500" 
                      : "text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:bg-white/5 hover:pl-10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{exp.company}</span>
                    {activeExperience === index && (
                      <FaArrowRight className="text-purple-400" />
                    )}
                  </div>
                  
                  {/* Progress indicator for active tab */}
                  {activeExperience === index && !isHovering && (
                    <div className="absolute bottom-0 left-0 h-1 bg-purple-500 animate-progress"></div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Experience details */}
          <motion.div 
            className="w-full md:w-2/3"
            key={activeExperience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 text-purple-400 mb-3">
                <FaAward />
                <span className="text-[1rem] font-medium uppercase tracking-wider">Position</span>
              </div>
              <h3 className="text-[1.5rem] font-medium mb-2">{experiences[activeExperience]?.title}</h3>
              <div className="flex flex-wrap gap-6 mt-4 text-[1rem] text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500" />
                  {experiences[activeExperience]?.period}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-500" />
                    {experiences[activeExperience]?.location}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-gray-800 rounded-[25px] md:p-8 p-4 mb-12">
              <p className="text-[1.2rem] text-gray-300 leading-relaxed font-light">
                {experiences[activeExperience]?.description}
              </p>
            </div>
            
            <div className="mb-12">
              <h4 className="text-[1.2rem] font-medium mb-6 flex items-center gap-3">
                <span className="text-purple-400">✦</span> Key Achievements
              </h4>
              <motion.ul 
                className="space-y-4 pl-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                  {experiences[activeExperience]?.achievements.map((achievement, index) => (
                  <motion.li 
                    key={index} 
                    className="text-[1rem] text-gray-300 leading-relaxed font-light list-disc pl-2"
                    variants={itemVariants}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            
            <div>
              <h4 className="text-[1.2rem] font-medium mb-6 flex items-center gap-3">
                <span className="text-purple-400">⚙</span> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-4">
                {experiences[activeExperience]?.technologies.map((tech, index) => (
                  <motion.span 
                    key={index} 
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};