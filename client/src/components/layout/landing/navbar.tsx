import { useEffect, useState } from "react";
import logo from "../../../../public/vite.svg";
import { Link } from "react-router-dom";
import { Icons } from "../../ui/icons";
import { FaGithub } from "react-icons/fa";
import { bio } from "../../../static/bio";

const navLinks = [
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blogs" },
];

export default function Navbar() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="md:px-10 px-4">
      <div
        className={`md:flex hidden fixed w-full right-0 top-[3px] mt-8 px-10 transition-all duration-500 ease-spring z-[100000000] ${
          isScrollingDown ? "justify-between" : "justify-center gap-4"
        }`}
        style={{
          transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        }}
      >
        <Link to={"/"} className="p-3.5 flex h-full gap-[9px] items-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]">
          <img src={logo} alt="logo" width={24} />
          <h4 className="text-[#e5e5e5] text-[20px] leading-[16px]">{bio.FirstName}</h4>
        </Link>

        <nav
          className="p-4 px-[20px] backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] h-full flex items-center transition-all duration-500"
          style={{
            opacity: isScrollingDown ? 0 : 1,
            transform: isScrollingDown ? "translateY(-20px)" : "translateY(0)",
            maxHeight: isScrollingDown ? "0" : "100px",
            overflow: "hidden",
            transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
          }}
        >
          <ul className="flex items-center gap-6 text-[#d4d4d4]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-3 items-center">
          <Link
            to={"/"}
            target="_blank"
            className="size-14 flex items-center justify-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]"
          >
            <Icons.twitter className="size-6 text-white" />
          </Link>
          <Link
            to={"/"}
            target="_blank"
            className="size-14 flex items-center justify-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]"
          >
            <Icons.telegram className="size-6 text-white" />
          </Link>

          <Link
            to={"https://whisper-3.gitbook.io/whisper"}
            target="_blank"
            className="p-[14px] flex h-full gap-[9px] items-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]"
          >
            <FaGithub />
            <h4 className="text-[#e5e5e5]">Github</h4>
          </Link>
        </div>
      </div>
      <div className="md:hidden flex fixed w-full right-0 top-[3px] mt-8 px-4 transition-all duration-500 ease-spring z-[100000000] justify-between items-center">
        <button className="p-[12px] flex h-full gap-[9px] items-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d]">
          <img src={logo} alt="logo" width={24} />
          <h4 className="text-[#e5e5e5] text-[14px] leading-[16px]">Github</h4>
        </button>

        <button className="p-[12px] flex h-full text-sm items-center backdrop-blur-[10px] rounded-[33px] border border-[#fafafa0d] text-white">
          Github
        </button>
      </div>
    </div>
  );
}
