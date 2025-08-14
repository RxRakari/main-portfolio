import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Heading ({ heading, paragraph, className }: any) {
    const headerRef = useRef<HTMLDivElement>(null);

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
    
    });
    
        return () => ctx.revert();
      }, []);
    return(
        <div ref={headerRef} className={`text-center mb-16 ${className}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="md:text-lg text-base text-gray-400 md:max-w-3xl max-w-2xl mx-auto">
            {paragraph}
          </p>
        </div>
    )
}