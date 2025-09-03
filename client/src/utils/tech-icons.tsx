import { techIcons } from "../config/tech-icons"; 

/**
 * Get tech icon with case-insensitive matching
 * @param techName - The technology name
 * @returns React element or fallback
 */
export const getTechIcon = (techName: string): React.JSX.Element => {
  if (!techName) return <span className="text-gray-400">•</span>;
  
  // Try exact match first
  if (techIcons[techName]) {
    return techIcons[techName];
  }
  
  // Try case-insensitive match
  const lowerTechName = techName.toLowerCase().trim();
  const foundKey = Object.keys(techIcons).find(key => 
    key.toLowerCase() === lowerTechName
  );
  
  if (foundKey) {
    return techIcons[foundKey];
  }
  
  // Common mappings for variations
  const mappings: { [key: string]: string } = {
    'js': 'JavaScript',
    'ts': 'TypeScript', 
    'html': 'HTML5',
    'css': 'CSS3',
    'reactjs': 'React',
    'nextjs': 'Next.js',
    'vuejs': 'Vue.js',
    'nodejs': 'Node.js',
    'tailwind': 'TailwindCSS',
    'mongodb': 'MongoDB',
    'postgres': 'PostgreSQL'
  };
  
  const mapped = mappings[lowerTechName];
  if (mapped && techIcons[mapped]) {
    return techIcons[mapped];
  }
  
  // Fallback
  return <span className="text-gray-400">•</span>;
};
