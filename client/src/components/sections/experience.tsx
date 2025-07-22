import { useState } from 'react';

export const ExperienceSection = () => {
  const [activeExperience, setActiveExperience] = useState(0);
  
  const experiences = [
    {
      company: "Cursor",
      position: "Senior Software Engineer",
      period: "2022 - Present",
      description: "Led the development of AI-powered code completion tools, improving developer productivity by 35%. Architected and implemented real-time collaboration features used by over 50,000 developers.",
      technologies: ["TypeScript", "React", "Node.js", "Python", "TensorFlow"]
    },
    {
      company: "Google",
      position: "Software Engineer",
      period: "2019 - 2022",
      description: "Developed scalable backend services handling millions of requests daily. Contributed to the redesign of core APIs, reducing latency by 40% and improving overall system reliability.",
      technologies: ["Go", "Kubernetes", "gRPC", "Cloud Pub/Sub", "BigQuery"]
    },
    {
      company: "Stripe",
      position: "Frontend Engineer",
      period: "2017 - 2019",
      description: "Built responsive, high-performance UI components for the Stripe Dashboard. Implemented data visualization tools that helped merchants better understand transaction patterns.",
      technologies: ["JavaScript", "React", "Redux", "GraphQL", "D3.js"]
    }
  ];

  return (
    <section id="experience" className="py-36">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-6xl font-medium mb-24">Experience</h2>
        
        <div className="flex flex-col md:flex-row gap-20">
          {/* Company tabs */}
          <div className="w-full md:w-1/3">
            <div className="space-y-2">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExperience(index)}
                  className={`w-full text-left py-5 px-8 text-[1.5rem] transition-all duration-300 ${
                    activeExperience === index 
                      ? "bg-white/5 text-white border-l-4 border-white" 
                      : "text-gray-400 hover:text-gray-200 border-l-4 border-transparent hover:bg-white/5 hover:pl-10"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>
          
          {/* Experience details */}
          <div className="w-full md:w-2/3">
            <div className="mb-8">
              <h3 className="text-3xl font-medium mb-2">{experiences[activeExperience].position}</h3>
              <p className="text-[1.5rem] text-gray-400">
                {experiences[activeExperience].company} · {experiences[activeExperience].period}
              </p>
            </div>
            
            <p className="text-2xl text-gray-300 mb-12 leading-relaxed font-light">
              {experiences[activeExperience].description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {experiences[activeExperience].technologies.map((tech, index) => (
                <span 
                  key={index} 
                  className="px-6 py-3 bg-white/5 border border-gray-800 rounded-[20px] text-gray-300 text-[1.2rem] transition-all hover:bg-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};