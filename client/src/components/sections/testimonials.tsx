import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Heading from "../ui/heading";
import { useTestimonials } from "../../hooks/queries/use-portfolio-data";
import { useState, useEffect } from "react";


export function Testimonials() {
  const { data: testimonialsData, isLoading, error } = useTestimonials();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (testimonialsData?.data?.testimonials) {
      setTestimonials(testimonialsData.data.testimonials);
    } else if (!isLoading && !error) {
      setTestimonials(mockTestimonials);
    }
  }, [testimonialsData, isLoading, error]);

  const mockTestimonials = [
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

  if (isLoading) {
    return (
      <section className="relative overflow-hidden">
        <Heading
        className="md:hidden flex flex-col"
        heading={"Testimonials"}
        paragraph={"Loading testimonials data..."}
         />
      </section>
    );
  }
  
  return (
    <section className="flex flex-col items-center justify-center">
      <Heading heading={"Feedbacks From Clients"} paragraph={"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business."} />
      <AnimatedTestimonials testimonials={testimonials} />
  </section>
);
}
