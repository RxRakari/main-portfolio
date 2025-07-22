import { useState } from "react";
import { doodle } from "../../assets";
import { FaGithub, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

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

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: <FaPhoneAlt className="text-2xl" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: "Location",
      value: "San Francisco, CA",
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
    { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" }
  ];

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-20 px-4 md:px-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I'm always interested in exploring new opportunities, collaborating, or exchanging ideas with like-minded individuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-12">
              <h3 className="text-3xl font-medium mb-8">Get in touch</h3>
              <p className="text-lg text-gray-400 mb-8">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="p-3 bg-white/5 border border-gray-800 rounded-full text-purple-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-300">{item.label}</h4>
                      {item.link ? (
                        <a 
                          href={item.link} 
                          className="text-xl hover:text-purple-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-xl">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-medium mb-6">Connect with me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-white/5 border border-gray-800 rounded-full text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-gray-800 rounded-[25px] p-8"
          >
            <h3 className="text-3xl font-medium mb-8">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-gray-300 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can I help you?"
                  required
                  rows={5}
                  className="rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 px-6 py-4 w-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 backdrop-blur-md resize-none"
                />
              </motion.div>
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-2xl font-medium text-lg flex items-center justify-center transition-all duration-300 mt-4 relative overflow-hidden group"
                style={{
                  backgroundImage: `url(${doodle})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "rgba(0,0,0,0.88)", 
                  backgroundBlendMode: "darken",
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="flex items-center gap-2 z-10">
                  {status === "loading" ? (
                    <span className="animate-pulse flex items-center gap-2">
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                      Sending...
                    </span>
                  ) : status === "success" ? (
                    <span className="flex items-center gap-2 text-green-400">
                      <FaCheck />
                      Message Sent!
                    </span>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}