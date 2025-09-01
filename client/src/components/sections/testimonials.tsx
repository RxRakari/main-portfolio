import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Heading from "../ui/heading";
import { useTestimonials } from "../../hooks/queries/use-portfolio-data";
import { useState, useEffect } from "react";


export function Testimonials() {
  const { data: testimonialsData } = useTestimonials();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    if (testimonialsData?.data?.testimonials) {
      setTestimonials(testimonialsData.data.testimonials);
    }
  }, [testimonialsData])
  
  return (
    <section className="flex flex-col items-center justify-center">
      <Heading heading={"Feedbacks From Clients"} paragraph={"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business."} />
      <AnimatedTestimonials testimonials={testimonials} />
  </section>
);
}
