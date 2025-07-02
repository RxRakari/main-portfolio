import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechCorp",
    company: "TechCorp",
    avatar: "👩‍💼",
    rating: 5,
    text: "Working with John was an absolute pleasure. His attention to detail and technical expertise helped us launch our product ahead of schedule. The quality of work exceeded our expectations."
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Lead Designer",
    company: "DesignStudio",
    avatar: "👨‍🎨",
    rating: 5,
    text: "John's ability to translate design concepts into functional, beautiful interfaces is remarkable. He's not just a developer, but a true collaborator who brings ideas to life."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Startup Founder",
    company: "InnovateLab",
    avatar: "👩‍🚀",
    rating: 5,
    text: "The best investment we made for our startup was hiring John. His full-stack expertise and problem-solving skills were crucial in building our MVP. Highly recommended!"
  },
  {
    id: 4,
    name: "David Park",
    position: "CTO",
    company: "DataFlow",
    avatar: "👨‍💻",
    rating: 5,
    text: "John delivered exceptional results on a complex project. His code quality, communication, and ability to meet tight deadlines made all the difference. A true professional."
  }
];

const galleryItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "🛒",
    description: "Modern e-commerce platform with React & Node.js",
    tech: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile Development",
    image: "💳",
    description: "Secure banking application with biometric authentication",
    tech: ["React Native", "Firebase", "TypeScript"],
    link: "#"
  },
  {
    id: 3,
    title: "AI Dashboard",
    category: "Data Visualization",
    image: "📊",
    description: "Analytics dashboard with real-time data visualization",
    tech: ["Vue.js", "D3.js", "Python"],
    link: "#"
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Web Design",
    image: "🎨",
    description: "Creative portfolio with smooth animations",
    tech: ["Next.js", "GSAP", "Tailwind"],
    link: "#"
  },
  {
    id: 5,
    title: "Task Management",
    category: "Productivity",
    image: "✅",
    description: "Collaborative task management platform",
    tech: ["React", "Express", "PostgreSQL"],
    link: "#"
  },
  {
    id: 6,
    title: "Learning Platform",
    category: "EdTech",
    image: "📚",
    description: "Online learning platform with video streaming",
    tech: ["Angular", "AWS", "Docker"],
    link: "#"
  }
];

export const TestimonialsAndGallery = () => {
  const testimonialsRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web Development", "Mobile Development", "Data Visualization", "Web Design", "Productivity", "EdTech"];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Testimonials animation
      gsap.fromTo(".testimonial-card", 
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Gallery animation
      gsap.fromTo(".gallery-item", 
        { opacity: 0, y: 30, rotateY: 15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Section titles animation
      gsap.fromTo(".section-title", 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, [testimonialsRef, galleryRef]);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen py-20 px-4 md:px-10">
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="mb-32">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-4xl md:text-6xl font-bold text-white text-center mb-4">
            What Clients Say
          </h2>
          <p className="section-title text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what some of my clients have to say about working with me.
          </p>

          {/* Featured Testimonial */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-6 left-8 text-4xl text-blue-400/30">
                <FaQuoteLeft />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl mr-1" />
                  ))}
                </div>
                
                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full backdrop-blur-[10px] border border-[#fafafa0d] flex items-center justify-center text-2xl mr-4">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonials[currentTestimonial].position}, {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={prevTestimonial}
                      className="w-10 h-10 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] flex items-center justify-center text-white hover:border-[#fafafa1a] transition-all duration-300"
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="w-10 h-10 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] flex items-center justify-center text-white hover:border-[#fafafa1a] transition-all duration-300"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-blue-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef}>
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-4xl md:text-6xl font-bold text-white text-center mb-4">
            Featured Work
          </h2>
          <p className="section-title text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A showcase of my recent projects and creative solutions.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-[33px] transition-all duration-300 ${
                  selectedCategory === category
                    ? 'backdrop-blur-[10px] border border-blue-400/50 text-blue-400'
                    : 'backdrop-blur-[10px] border border-[#fafafa0d] text-gray-400 hover:border-[#fafafa1a] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item group cursor-pointer"
              >
                <div className="backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] p-6 h-full hover:border-[#fafafa1a] transition-all duration-500 hover:scale-105">
                  {/* Project Image/Icon */}
                  <div className="w-full h-48 rounded-[24px] bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.image}
                  </div>
                  
                  {/* Project Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-400/20 text-blue-400 border border-blue-400/30">
                        {item.category}
                      </span>
                      <HiOutlineExternalLink className="text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};