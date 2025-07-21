import { useState } from "react";
import { doodle } from "../../assets";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate async send
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-20 px-4 md:px-10 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in touch</h2>
        <p className="text-lg text-gray-400 mb-10">
          I'm always interested in exploring new opportunities, collaborating, or exchanging ideas with like-minded individuals. Feel free to book a call or email me if you'd like to see my portfolio deck or to discuss a potential project.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md"
            />
          </div>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your Message"
            required
            rows={5}
            className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md resize-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-4 rounded-2xl font-semibold text-lg flex items-center justify-center transition-all duration-300 mt-2"
            style={{
              backgroundImage: `url(${doodle})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(0,0,0,0.6)", // dark overlay
              backgroundBlendMode: "darken",      // blend the overlay with the doodle
              color: "white",
              border: "none",
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.15)",
            }}
          >
            {status === "loading" ? (
              <span className="animate-pulse">Sending...</span>
            ) : status === "success" ? (
              <span className="text-green-400">Message Sent!</span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}