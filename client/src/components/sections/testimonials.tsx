import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Heading from "../ui/heading";
import { useApp } from "../../context/app-context";
import { useState, useEffect } from "react";


export function Testimonials() {
  const { fetchTestimonials } = useApp();
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const handleFetchTestimonials = async () => {
      const res = await fetchTestimonials()
      setTestimonials(res?.data?.testimonials)
    }
    handleFetchTestimonials()
  }, [fetchTestimonials])
  
  return (
    <section className="flex flex-col items-center justify-center">
      <Heading heading={"Feedbacks From Clients"} paragraph={"The scalability and performance have been game-changing for our organization. Highly recommend to any growing business."} />
      <AnimatedTestimonials testimonials={testimonials} />
  </section>
);
}
