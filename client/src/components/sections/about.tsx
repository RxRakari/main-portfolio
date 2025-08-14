import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiGit, SiTypescript, SiSolidity, SiTailwindcss } from "react-icons/si";
import Heading from "../ui/heading";
import { skills } from "../../config/about/skills";
import { socialLinks } from "../../config/about/social-links";
import { IconBrandNextjs } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .fromTo(
          ".about-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(
          ".about-intro",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".skill-card",
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .fromTo(
          ".professional-focus, .technical-skills, .community-contribution, .online-presence",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black text-white py-20 px-4 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <Heading heading={"About Me"} paragraph={"Caleb Kalejaiye is a skilled full-stack developer from Lagos, Nigeria, with a passion for building scalable websites and applications. With over three years of experience in the tech ecosystem, he has honed his expertise in crafting innovative solutions that address real-world problems."} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card group relative p-6 bg-white/5 border border-white/10 rounded-2xl shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-400 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="professional-focus">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Professional Focus</h3>
              <p className="text-gray-400">
                Caleb specializes in both front-end and back-end development. He has worked with several technologies and tools, focusing on building responsive, scalable, and high-performance applications.
              </p>
            </div>

            <div className="technical-skills">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Technical Skills</h3>
              <ul className="grid grid-cols-2 gap-4 text-gray-300">
                <li className="flex items-center gap-2"><SiJavascript className="text-yellow-400" /> JavaScript</li>
                <li className="flex items-center gap-2"><SiTypescript className="text-blue-400" /> Typescript</li>
                <li className="flex items-center gap-2"><IconBrandNextjs className="text-white" /> NextJS</li>
                <li className="flex items-center gap-2"><SiTailwindcss className="text-blue-500" /> TailwindCSS</li>
                <li className="flex items-center gap-2"><FaReact className="text-cyan-400" /> ReactJS / React Native</li>
                <li className="flex items-center gap-2"><FaNodeJs className="text-green-500" /> NodeJS/Express</li>
                <li className="flex items-center gap-2"><SiSolidity className="text-purple-600" /> Solidity</li>
                <li className="flex items-center gap-2"><SiGit className="text-orange-600" /> Git & GitHub</li>
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="community-contribution">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Community & Open Source</h3>
              <p className="text-gray-400">
                Caleb is committed to contributing to the tech community. His projects, such as the open-source Bannerly, highlight his dedication to sharing knowledge and resources with other developers.
              </p>
            </div>

            <div className="online-presence">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Online Presence</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}