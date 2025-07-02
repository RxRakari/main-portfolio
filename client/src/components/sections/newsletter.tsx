import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaPaperPlane, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaCode,
  FaRocket,
  FaBrain,
  FaLightbulb
} from "react-icons/fa";
import { 
  SiReact, 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs,
  SiPython,
  SiNextdotjs
} from "react-icons/si";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: <FaCode className="text-blue-400" />,
    title: "Latest Development Tips",
    description: "Get cutting-edge coding techniques and best practices delivered weekly"
  },
  {
    icon: <FaRocket className="text-purple-400" />,
    title: "Project Updates",
    description: "Be the first to know about new projects and behind-the-scenes insights"
  },
  {
    icon: <FaBrain className="text-green-400" />,
    title: "Tech Insights",
    description: "Deep dives into emerging technologies and industry trends"
  },
  {
    icon: <FaLightbulb className="text-yellow-400" />,
    title: "Exclusive Content",
    description: "Access to tutorials, resources, and content not available anywhere else"
  }
];

const techStack = [
  { icon: <SiReact className="text-[#61DAFB]" />, name: "React" },
  { icon: <SiJavascript className="text-[#F7DF1E]" />, name: "JavaScript" },
  { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript" },
  { icon: <SiNodedotjs className="text-[#339933]" />, name: "Node.js" },
  { icon: <SiPython className="text-[#3776AB]" />, name: "Python" },
  { icon: <SiNextdotjs className="text-white" />, name: "Next.js" }
];

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [message, setMessage] = useState("");
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Benefits staggered animation
      gsap.fromTo(benefitsRef.current,
        { 
          opacity: 0, 
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: benefitsRef.current[0],
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Tech stack floating animation
      gsap.fromTo(techStackRef.current,
        { 
          opacity: 0, 
          y: 50,
          rotation: -10
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: techStackRef.current[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous floating animation for tech icons
      techStackRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            y: -10,
            rotation: 5,
            duration: 2 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Stats animation
      gsap.fromTo(statsRef.current,
        { 
          opacity: 0, 
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setMessage("🎉 Welcome aboard! Check your email for confirmation.");
      setEmail("");
      
      // Animate success state
      gsap.to(formRef.current, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }, 2000);
  };

  const handleInputChange = (e: any) => {
    setEmail(e.target.value);
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gray-900 text-white py-20 px-4 md:px-10 relative overflow-hidden w-full"
    >
      {/* Background Tech Icons */}
      <div className="absolute inset-0 opacity-5">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="absolute text-6xl"
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            {tech.icon}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of developers who get the latest insights, tutorials, and project updates 
            delivered straight to their inbox every week.
          </p>
          
          {/* Stats */}
          {/* <div ref={statsRef} className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">5K+</div>
              <div className="text-sm text-gray-500">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">Weekly</div>
              <div className="text-sm text-gray-500">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-500">Free</div>
            </div>
          </div> */}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              ref={(el) => { benefitsRef.current[index] = el; }}
              className="group p-6 backdrop-blur-[10px] rounded-[20px] border border-[#fafafa0d] hover:border-[#fafafa15] transition-all duration-300 hover:bg-white/5"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Newsletter Form */}
        <div 
          ref={formRef}
          className="max-w-2xl mx-auto p-8 backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] relative"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-gray-400">No spam, unsubscribe at any time.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-[10px] rounded-[25px] border border-[#fafafa0d] focus:border-[#fafafa20] focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
                disabled={status === "loading"}
              />
              {status === "error" && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-red-400 text-sm">
                  <FaExclamationTriangle />
                  {message}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-[25px] font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {status === "loading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : status === "success" ? (
                <>
                  <FaCheckCircle />
                  Subscribed Successfully!
                </>
              ) : (
                <>
                  <FaPaperPlane className="group-hover:translate-x-1 transition-transform duration-300" />
                  Subscribe to Newsletter
                </>
              )}
            </button>

            {status === "success" && (
              <div className="text-center text-green-400 text-sm flex items-center justify-center gap-2">
                <FaCheckCircle />
                {message}
              </div>
            )}
          </form>

          {/* Floating Tech Icons */}
          <div className="absolute -top-4 -right-4 flex gap-2">
            {techStack.slice(0, 3).map((tech, index) => (
              <div
                key={tech.name}
                ref={(el) => { techStackRef.current[index] = el; }}
                className="p-3 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] text-xl"
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>

          <div className="absolute -bottom-4 -left-4 flex gap-2">
            {techStack.slice(3).map((tech, index) => (
              <div
                key={tech.name}
                ref={(el) => { techStackRef.current[index + 3] = el; }}
                className="p-3 backdrop-blur-[10px] rounded-full border border-[#fafafa0d] text-xl"
                title={tech.name}
              >
                {tech.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Trusted by developers at companies like Google, Microsoft, and Meta</p>
          <div className="flex justify-center items-center gap-4 mt-4 opacity-50">
            <span className="text-2xl">🔒</span>
            <span>Your email is safe with us</span>
            <span className="text-2xl">🚫</span>
            <span>No spam, ever</span>
            <span className="text-2xl">✉️</span>
            <span>Weekly digest</span>
          </div>
        </div>
      </div>
    </section>
  );
}