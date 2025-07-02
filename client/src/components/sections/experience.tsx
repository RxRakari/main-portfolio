import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaAward, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Define types for better type safety
type ExperienceType = "work" | "education" | "certification";

interface Experience {
  id: number;
  type: ExperienceType;
  title: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
  icon: string;
}

// Mock experience data
const experiences: Experience[] = [
  {
    id: 1,
    type: "work",
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2023 - Present",
    duration: "1+ years",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices.",
    achievements: [
      "Reduced application load time by 40% through optimization",
      "Led a team of 5 developers on critical projects",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Architected microservices handling 1M+ requests daily"
    ],
    technologies: ["React", "Node.js", "AWS", "Docker", "TypeScript", "PostgreSQL"],
    link: "https://techcorp.com",
    icon: "💼"
  },
  {
    id: 2,
    type: "work",
    title: "Full Stack Developer",
    company: "StartupLab Inc",
    location: "Remote",
    period: "2021 - 2023",
    duration: "2 years",
    description: "Developed and maintained multiple client projects from concept to deployment. Collaborated with design and product teams to deliver user-centric solutions.",
    achievements: [
      "Built 15+ responsive web applications",
      "Increased client satisfaction rate to 98%",
      "Reduced bug reports by 35% through testing automation",
      "Mentored 3 junior developers"
    ],
    technologies: ["Vue.js", "Express.js", "MongoDB", "Firebase", "SASS", "Jest"],
    link: "https://startuplab.com",
    icon: "🚀"
  },
  {
    id: 3,
    type: "education",
    title: "Bachelor of Computer Science",
    company: "University of Technology",
    location: "New York, NY",
    period: "2017 - 2021",
    duration: "4 years",
    description: "Graduated Magna Cum Laude with a focus on software engineering and web technologies. Active member of the Computer Science Society.",
    achievements: [
      "GPA: 3.8/4.0 - Magna Cum Laude",
      "President of Computer Science Society",
      "Dean's List for 6 consecutive semesters",
      "Winner of Annual Hackathon 2020"
    ],
    technologies: ["Java", "Python", "C++", "SQL", "Data Structures", "Algorithms"],
    link: "https://university.edu",
    icon: "🎓"
  },
  {
    id: 4,
    type: "work",
    title: "Frontend Developer Intern",
    company: "Digital Agency Pro",
    location: "Boston, MA",
    period: "Summer 2020",
    duration: "3 months",
    description: "Contributed to client projects focusing on responsive design and user experience. Gained hands-on experience with modern frontend frameworks.",
    achievements: [
      "Developed 5 responsive landing pages",
      "Improved website accessibility scores by 25%",
      "Collaborated with senior developers on React projects",
      "Received outstanding intern performance review"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap", "Git"],
    link: "https://digitalagency.com",
    icon: "💻"
  },
  {
    id: 5,
    type: "certification",
    title: "AWS Certified Solutions Architect",
    company: "Amazon Web Services",
    location: "Online",
    period: "2022",
    duration: "Valid until 2025",
    description: "Comprehensive certification covering AWS cloud architecture, security, and deployment best practices.",
    achievements: [
      "Scored 890/1000 on certification exam",
      "Specialized in serverless architectures",
      "Expert in AWS security and compliance",
      "Certified for enterprise-level solutions"
    ],
    technologies: ["AWS", "Lambda", "S3", "EC2", "RDS", "CloudFormation"],
    link: "https://aws.amazon.com/certification/",
    icon: "🏆"
  }
];

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { key: "all", label: "All Experience", icon: "📋" },
    { key: "work", label: "Work", icon: "💼" },
    { key: "education", label: "Education", icon: "🎓" },
    { key: "certification", label: "Certifications", icon: "🏆" }
  ];

  const filteredExperiences = activeFilter === "all" 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(".section-title", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(".timeline-line", 
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Experience cards animation
      gsap.fromTo(".experience-card", 
        { opacity: 0, x: -50, rotateY: 15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline dots animation
      gsap.fromTo(".timeline-dot", 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [filteredExperiences]);

  const getTypeColor = (type: ExperienceType) => {
    switch (type) {
      case "work": return "from-blue-500/20 to-cyan-500/20 border-blue-400/30";
      case "education": return "from-purple-500/20 to-pink-500/20 border-purple-400/30";
      case "certification": return "from-yellow-500/20 to-orange-500/20 border-yellow-400/30";
      default: return "from-gray-500/20 to-gray-600/20 border-gray-400/30";
    }
  };

  const getTypeIconColor = (type: ExperienceType) => {
    switch (type) {
      case "work": return "text-blue-400";
      case "education": return "text-purple-400";
      case "certification": return "text-yellow-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl md:text-6xl font-bold text-white mb-4">
            My Journey
          </h2>
          <p className="section-title text-gray-400 max-w-2xl mx-auto mb-12">
            A timeline of my professional experience, education, and achievements that have shaped my career in technology.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-[33px] transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === filter.key
                    ? 'backdrop-blur-[10px] border border-blue-400/50 text-blue-400'
                    : 'backdrop-blur-[10px] border border-[#fafafa0d] text-gray-400 hover:border-[#fafafa1a] hover:text-white'
                }`}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 timeline-line transform md:-translate-x-1/2"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {filteredExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} border-2 timeline-dot transform md:-translate-x-1/2 z-10`}>
                </div>

                {/* Experience Card */}
                <div className={`experience-card w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}>
                  <div className="backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] p-8 hover:border-[#fafafa1a] transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} flex items-center justify-center text-2xl`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <FaBriefcase className={getTypeIconColor(exp.type)} />
                            <span>{exp.company}</span>
                            {exp.link && (
                              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-white transition-colors">
                                <HiOutlineExternalLink />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className={getTypeIconColor(exp.type)} />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className={getTypeIconColor(exp.type)} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50">
                        {exp.duration}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Expandable Content */}
                    <div className="space-y-4">
                      <button
                        onClick={() => toggleExpanded(exp.id)}
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                      >
                        {expandedItems.has(exp.id) ? "Show Less" : "Show More"}
                        {expandedItems.has(exp.id) ? <FaChevronUp /> : <FaChevronDown />}
                      </button>

                      {expandedItems.has(exp.id) && (
                        <div className="space-y-4 animate-fadeIn">
                          {/* Achievements */}
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <FaAward className={getTypeIconColor(exp.type)} />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                                  <span className="text-blue-400 mt-1">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};