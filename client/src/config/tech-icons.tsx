import { DiJava } from "react-icons/di";
import { FaReact, FaVuejs, FaAngular, FaJs, FaPython, FaPhp, FaHtml5, FaCss3Alt, FaBootstrap, FaSass, FaNodeJs, FaLaravel, FaDocker, FaAws, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiCplusplus, SiGo, SiRust, SiTailwindcss, SiStyledcomponents, SiChakraui, SiMui, SiAntdesign, SiExpress, SiNestjs, SiDjango, SiFlask, SiSpring, SiGraphql, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiRedux, SiReactquery, SiFramer, SiChartdotjs, SiD3Dotjs, SiJest, SiCypress, SiKubernetes, SiVercel, SiNetlify, SiHeroku, SiStripe, SiPaypal, SiSocketdotio, SiOpenai, SiVite, SiWebpack, SiEslint, SiPrettier, SiTensorflow, SiPytorch, SiJupyter } from "react-icons/si";

export const techIcons: { [key: string]: React.JSX.Element } = {
    // Frontend Frameworks & Libraries
    "React": <FaReact className="text-[#61DAFB]" />,
    "Next.js": <SiNextdotjs className="text-white" />,
    "Vue.js": <FaVuejs className="text-[#4FC08D]" />,
    "Angular": <FaAngular className="text-[#DD0031]" />,
    "Svelte": <SiNextdotjs className="text-[#FF3E00]" />,
    
    // Languages
    "JavaScript": <FaJs className="text-[#F7DF1E]" />,
    "TypeScript": <SiTypescript className="text-[#3178C6]" />,
    "Python": <FaPython className="text-[#3776AB]" />,
    "Java": <DiJava className="text-[#ED8B00]" />,
    "C++": <SiCplusplus className="text-[#00599C]" />,
    "Go": <SiGo className="text-[#00ADD8]" />,
    "Rust": <SiRust className="text-[#000000]" />,
    "PHP": <FaPhp className="text-[#777BB4]" />,
    
    // Styling & UI
    "HTML5": <FaHtml5 className="text-[#E34F26]" />,
    "CSS3": <FaCss3Alt className="text-[#1572B6]" />,
    "TailwindCSS": <SiTailwindcss className="text-[#06B6D4]" />,
    "Bootstrap": <FaBootstrap className="text-[#7952B3]" />,
    "Sass": <FaSass className="text-[#CC6699]" />,
    "Styled Components": <SiStyledcomponents className="text-[#DB7093]" />,
    "Chakra UI": <SiChakraui className="text-[#319795]" />,
    "Material-UI": <SiMui className="text-[#007FFF]" />,
    "Ant Design": <SiAntdesign className="text-[#0170FE]" />,
    "Vuetify": <SiMui className="text-[#1867C0]" />,
    
    // Backend & APIs
    "Node.js": <FaNodeJs className="text-[#339933]" />,
    "Express": <SiExpress className="text-white" />,
    "NestJS": <SiNestjs className="text-[#E0234E]" />,
    "Django": <SiDjango className="text-[#092E20]" />,
    "Flask": <SiFlask className="text-white" />,
    "Spring": <SiSpring className="text-[#6DB33F]" />,
    "Laravel": <FaLaravel className="text-[#FF2D20]" />,
    "GraphQL": <SiGraphql className="text-[#E10098]" />,
    
    // Databases
    "MongoDB": <SiMongodb className="text-[#47A248]" />,
    "PostgreSQL": <SiPostgresql className="text-[#336791]" />,
    "MySQL": <SiMysql className="text-[#4479A1]" />,
    "Redis": <SiRedis className="text-[#DC382D]" />,
    "Firebase": <SiFirebase className="text-[#FFCA28]" />,
    
    // State Management
    "Redux": <SiRedux className="text-[#764ABC]" />,
    "React Query": <SiReactquery className="text-[#FF4154]" />,
    
    // Animation & 3D
    "Framer Motion": <SiFramer className="text-[#0055FF]" />,
    "GSAP": <SiFramer className="text-[#88CE02]" />,
    
    // Data Visualization
    "Chart.js": <SiChartdotjs className="text-[#FF6384]" />,
    "D3.js": <SiD3Dotjs className="text-[#F9A03C]" />,
    
    // Testing
    "Jest": <SiJest className="text-[#C21325]" />,
    "Cypress": <SiCypress className="text-[#17202C]" />,
    
    // DevOps & Cloud
    "Docker": <FaDocker className="text-[#2496ED]" />,
    "Kubernetes": <SiKubernetes className="text-[#326CE5]" />,
    "AWS": <FaAws className="text-[#FF9900]" />,
    "Vercel": <SiVercel className="text-white" />,
    "Netlify": <SiNetlify className="text-[#00C7B7]" />,
    "Heroku": <SiHeroku className="text-[#430098]" />,
    
    // Payment & APIs
    "Stripe": <SiStripe className="text-[#008CDD]" />,
    "PayPal": <SiPaypal className="text-[#00457C]" />,
    "Socket.io": <SiSocketdotio className="text-white" />,
    "OpenAI": <SiOpenai className="text-[#412991]" />,
    
    // Tools & Build
    "Git": <FaGitAlt className="text-[#F05032]" />,
    "Vite": <SiVite className="text-[#646CFF]" />,
    "Webpack": <SiWebpack className="text-[#8DD6F9]" />,
    "ESLint": <SiEslint className="text-[#4B32C3]" />,
    "Prettier": <SiPrettier className="text-[#F7B93E]" />,
    
    // AI & ML
    "TensorFlow": <SiTensorflow className="text-[#FF6F00]" />,
    "PyTorch": <SiPytorch className="text-[#EE4C2C]" />,
    "Jupyter": <SiJupyter className="text-[#F37626]" />,
    
    // Generic fallbacks
    "PWA": <span className="text-purple-400">📱</span>,
    "JWT": <span className="text-orange-400">🔐</span>,
    "OpenWeatherAPI": <span className="text-blue-400">🌤️</span>,
    "Leaflet": <span className="text-green-400">🗺️</span>
  };