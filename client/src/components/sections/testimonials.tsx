import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Heading from "../ui/heading";
import { useTestimonials } from "../../hooks/queries/use-portfolio-data";
import { useState, useEffect } from "react";

interface Testimonial {
  testimonial: string;
  name: string;
  position: string;
  company?: string;
  avatar: string;
}

const mockTestimonials: Testimonial[] = [
  {
    testimonial:
      "Working with the team was a delight — they delivered a performant app with clear communication throughout. Our conversion rate improved significantly.",
    name: "Alex Morgan",
    position: "Head of Product",
    company: "Brightside Co.",
    avatar: "https://i.pravatar.cc/500?img=12",
  },
  {
    testimonial:
      "Their attention to detail and focus on scalable architecture saved us both time and money. The final product exceeded expectations.",
    name: "Sofia Reyes",
    position: "CTO",
    company: "Nimbus Labs",
    avatar: "https://i.pravatar.cc/500?img=47",
  },
  {
    testimonial:
      "Fast, reliable and delightful to work with. Supportive throughout the project and delivered polished UI/UX that our users love.",
    name: "Daniel Kim",
    position: "Co-founder",
    company: "Arcadia",
    avatar: "https://i.pravatar.cc/500?img=33",
  },
];

export function Testimonials() {
  const { data: testimonialsData, isLoading, error } = useTestimonials();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);

  useEffect(() => {
    if (testimonialsData?.data?.testimonials && testimonialsData.data.testimonials.length > 0) {
      setTestimonials(testimonialsData.data.testimonials);
    } else if (error) {
      console.warn('Failed to load testimonials, using mock data', error);
      if (testimonials.length === 0) setTestimonials(mockTestimonials);
    }
  }, [testimonialsData, error, testimonials.length]);
  
  return (
    <section className="flex flex-col items-center justify-center relative">
      {/* Status banners */}
      <div className="w-full max-w-[1200px] mx-auto px-4 mb-4">
        {isLoading && (
          <p className="text-sm text-gray-400 text-center">Loading latest testimonials — showing sample content</p>
        )}
        {error && (
          <p className="text-sm text-yellow-400 text-center">Unable to load testimonials — showing sample content</p>
        )}
      </div>

      <Heading 
        heading={"Feedbacks From Clients"} 
        paragraph={"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business."} 
      />
      <AnimatedTestimonials testimonials={testimonials} />
    </section>
  );
}