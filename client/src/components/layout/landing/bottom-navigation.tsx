import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiGrid, FiImage, FiFileText, FiMail } from 'react-icons/fi';

export const BottomNavigation = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Navigation items
    const navItems = [
        { path: '/', label: 'Home', icon: <FiHome className="w-5 h-5" /> },
        { path: '/projects', label: 'Projects', icon: <FiGrid className="w-5 h-5" /> },
        { path: '/gallery', label: 'Gallery', icon: <FiImage className="w-5 h-5" /> },
        { path: '/blogs', label: 'Blog', icon: <FiFileText className="w-5 h-5" /> },
        { path: '/contact', label: 'Contact', icon: <FiMail className="w-5 h-5" /> },
    ];

    // Hide navigation when scrolling down, show when scrolling up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Check if a navigation item is active
    const isActive = (path: string) => {
        if (path === '/' && location.pathname === '/') {
            return true;
        }
        return path !== '/' && location.pathname.startsWith(path);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="fixed bottom-6 left-0 right-0 z-50 md:hidden flex justify-center"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <nav className="mx-auto inline-flex items-center px-2 py-1 rounded-full bg-black/60 backdrop-blur-lg border border-white/10 shadow-2xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex flex-col items-center justify-center px-4 py-2 ${
                                    isActive(item.path) 
                                        ? 'text-white' 
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {isActive(item.path) && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/10 rounded-full"
                                        layoutId="bottomNavIndicator"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{item.icon}</span>
                                <span className="relative z-10 text-xs mt-1 font-medium">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};