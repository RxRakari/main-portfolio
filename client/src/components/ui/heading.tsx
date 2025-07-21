import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Heading ({ heading, paragraph }: any) {
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
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {heading}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            {paragraph}
          </p>
        </div>
    )
}