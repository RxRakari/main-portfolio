import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiSend } from "react-icons/fi";
import { doodle } from "../../assets";
import Heading from "../ui/heading";
import { useSubscribeNewsletter } from "../../hooks/mutations/use-portfolio-mutations";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const subscribeNewsletterMutation = useSubscribeNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await subscribeNewsletterMutation.mutateAsync(email);
      
      if (response.status === "success") {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        throw new Error("Please enter a valid email.");
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="newsletter"
      className="bg-black text-white py-20 px-4 md:px-10 relative"
      style={{
        backgroundImage: `url(${doodle})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/95 z-0" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <Heading heading={"Stay Updated"} paragraph={"Subscribe to my newsletter to get the latest updates on my projects, articles, and more."} />
        {/* <h2 className="newsletter-title text-4xl md:text-5xl font-bold mb-6 text-purple-500">
          Stay Updated
        </h2>
        <p className="newsletter-description text-lg text-gray-400 mb-12">
          Subscribe to my newsletter to get the latest updates on my projects, articles, and more.
        </p> */}

        <form
          onSubmit={handleSubmit}
          className="newsletter-form relative max-w-lg mx-auto"
        >
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-6 pr-32 py-4 text-base bg-white/5 border border-white/10 rounded-full backdrop-blur-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <FiSend />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>
          {message && (
            <p
              className={`mt-4 text-sm ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}