import { useEffect, useRef } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { gsap } from "gsap";
import { bio } from "../../static/bio";
import { HeroHighlight } from "../ui/hero-highlight";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([titleRef.current, nameRef.current, bioRef.current, buttonRef.current, imageRef.current], {
        opacity: 0,
        y: 50
      });

      // Create main timeline
      const tl = gsap.timeline();

      // Animate elements in sequence
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.7")
      .to(bioRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

      // Floating animation for background elements
      floatingElementsRef.current.forEach((el, index) => {
        if (el) {
          gsap.to(el, {
            y: "-=20",
            duration: 2 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Continuous gradient animation
      gsap.to(".text-gradient", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      // Button hover animation setup
      const button = buttonRef.current;
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
          const arrowIcon = button.querySelector('.arrow-icon') as HTMLElement;
          if (arrowIcon) {
            gsap.to(arrowIcon, {
              x: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          const arrowIcon = button.querySelector('.arrow-icon') as HTMLElement;
          if (arrowIcon) {
            gsap.to(arrowIcon, {
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Floating background elements */}
      <div 
        ref={(el) => { floatingElementsRef.current[0] = el; }}
        className="absolute top-20 left-20 w-32 h-32 rounded-full backdrop-blur-[10px] border border-[#fafafa0d] opacity-10"
      />
      <div 
        ref={(el) => { floatingElementsRef.current[1] = el; }}
        className="absolute top-40 right-32 w-24 h-24 rounded-full backdrop-blur-[10px] border border-[#fafafa0d] opacity-10"
      />
      <div 
        ref={(el) => { floatingElementsRef.current[2] = el; }}
        className="absolute bottom-32 left-40 w-20 h-20 rounded-full backdrop-blur-[10px] border border-[#fafafa0d] opacity-10"
      />

<HeroHighlight containerClassName="bg-gray-50 dark:bg-black">
      <div className="flex items-center justify-between w-full max-w-7xl px-4 md:px-0">
        {/* Content Section */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white leading-tight"
          >
            Hey there!
            <span className="inline-block ml-4 animate-wave">👋🏼</span>
          </h1>
          
          <p 
            ref={nameRef}
            className="text-4xl md:text-5xl font-semibold text-purple-500"
            style={{
              backgroundSize: "200% 100%",
              backgroundPosition: "0% center"
            }}
          >
            I'm {bio.FirstName} {bio.LastName}
          </p>
          
          <span 
            ref={bioRef}
            className="text-base md:text-[1.4rem] text-gray-300 max-w-[650px] leading-relaxed"
          >
            {bio.ShortBio}
          </span>

          <div 
            ref={buttonRef}
            className="flex items-center gap-3 w-fit rounded-[33px] p-4 px-6 mt-8 backdrop-blur-[10px] border border-[#fafafa0d] hover:border-[#fafafa1a] transition-all duration-300 cursor-pointer group"
          >
            <a href="#about" className="text-sm md:text-base text-white font-medium">
              More About Me
            </a>
            <BsArrowRightCircle className="text-white text-lg arrow-icon transition-transform duration-300" />
          </div>
        </div>

        {/* Image Section */}
        <div 
          ref={imageRef}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            {/* Glass effect frame */}
            <div className="w-[400px] h-[400px] rounded-full backdrop-blur-[10px] border-4 border-purple-500 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder for image */}
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-[33px] flex items-center justify-center">
                <div className="text-6xl">👨‍💻</div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-[33px] blur-xl opacity-50 -z-10" />
            </div>
          </div>
        </div>
        
      </div>
      </HeroHighlight>

      {/* Custom styles */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: 70% 70%;
        }
        
        .text-gradient {
          animation: gradient-shift 3s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};