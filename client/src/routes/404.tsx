import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    
    // Redirect when count reaches 0
    if (count === 0) {
      navigate('/');
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timer) clearInterval(timer);
    };
  }, [count, navigate]);
  
  const calculateRotate = (x: number, y: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const rotateX = (y - windowHeight / 2) / 50;
    const rotateY = -(x - windowWidth / 2) / 50;
    
    return { rotateX, rotateY };
  };
  
  const { rotateX, rotateY } = calculateRotate(mousePosition.x, mousePosition.y);
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white/20"></div>
        ))}
      </div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      {/* Glitch effect lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/30"
            style={{ top: `${Math.random() * 100}%`, width: '100%' }}
            animate={{
              scaleY: [1, Math.random() * 5 + 1, 1],
              opacity: [0, 0.5, 0],
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          className="perspective-1000"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1 
            className="text-[12rem] md:text-[20rem] font-bold text-white leading-none tracking-tighter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>
        </motion.div>
        
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              }
            }
          }}
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-light text-white tracking-wider"
            variants={variants}
          >
            <span className="text-gray-400">ERROR:</span> PAGE_NOT_FOUND
          </motion.h2>
          
          <motion.p 
            className="text-gray-400 max-w-md mx-auto"
            variants={variants}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
          
          <motion.div variants={variants}>
            <Link 
              to="/" 
              className="inline-block px-8 py-3 mt-6 text-sm text-black font-medium bg-white rounded-full hover:bg-gray-200 transition-colors duration-300"
            >
              Return to Homepage
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Auto-redirect in <span className="text-white font-mono">{count}</span> seconds...
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Terminal-like footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/20 p-4 font-mono text-xs text-gray-500">
        <div className="flex justify-between">
          <div>System: User_Session_Terminated</div>
          <div>Code: 0x00000194</div>
          <div>Path: {window.location.pathname}</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;