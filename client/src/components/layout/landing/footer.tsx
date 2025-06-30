import { staggerContainer, textVariant2 } from "../../../lib/motion";
import { motion } from "framer-motion";
import { Icons } from "../../ui/icons";
import { Link } from "react-router-dom";
import { bio } from "../../../static/constants";

const navLinks = [
  { name: "Projects", href: "#features" },
  { name: "Blog", href: "#faqs" },
  { name: "Contact", href: "#roadmap" },
];

const Footer = () => {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      id="contact-us"
      className="text-white w-full bg-black relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto custom-padding-x">
        {/* Large Whisper Text - Main Visual Element */}
        <div className="text-center py-16">
          <motion.p
            className="lg:text-[277px] text-6xl sm:text-[80px] text-[#e5e5e580] font-bold leading-none tracking-tight select-none"
            variants={textVariant2}
          >
            {bio.FirstName}
          </motion.p>
        </div>

        {/* Content Container */}
        <div className="max-w-[1140px] w-full mx-auto pb-20">
          {/* Navigation Links */}
          <div className="py-[62px] border-b border-white/20 flex lg:flex-row flex-col justify-between items-center">
            <nav className="flex flex-wrap justify-center sm:gap-14 gap-10 items-center uppercase text-xs tracking-[2.4px]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-[#d4d4d4] md:text-[18px] text-[14px] hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex gap-[30px] items-center lg:mt-0 mt-5">
              <Link
                to="#"
                target="_blank"
                className="text-[#d4d4d4] hover:text-white transition-colors duration-300"
              >
                <Icons.twitter className="size-5" />
              </Link>
              <Link
                to="#"
                target="_blank"
                className="text-[#d4d4d4] hover:text-white transition-colors duration-300"
              >
                <Icons.telegram className="size-5" />
              </Link>
              <Link
                to="https://whisper-3.gitbook.io/whisper"
                target="_blank"
                className="text-[#d4d4d4] hover:text-white transition-colors duration-300"
              >
                <Icons.gitbook className="size-5" />
              </Link>
            </div>
          </div>

          {/* Legal Links Section */}
          <div className="flex justify-between items-center mt-[30px]">
            <Link
              to="#"
              className="text-[#d4d4d4] md:text-[18px] text-[14px] hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-[#d4d4d4] md:text-[18px] text-[14px] hover:text-white transition-colors duration-300"
            >
              Terms of Use
            </Link>
          </div>

          {/* Copyright */}
          <h5 className="text-[#a3a3a3] md:text-[18px] text-[14px] text-center md:mt-0 mt-6">
            © 2025 {bio.FirstName}. All rights reserved.
          </h5>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e5e5e510] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-32 bg-gradient-to-tr from-[#e5e5e505] to-transparent rounded-full blur-2xl"></div>
      </div>
    </motion.div>
  );
};

export default Footer;