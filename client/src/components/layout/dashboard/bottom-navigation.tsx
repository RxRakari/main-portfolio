import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiFolder, FiImage, FiMessageSquare } from 'react-icons/fi';

export const BottomNavigation = () => {
    const location = useLocation();
    
    const navItems = [
        { path: '/dashboard', icon: <FiHome size={20} />, label: 'Home' },
        { path: '/dashboard/blogs', icon: <FiFileText size={20} />, label: 'Blogs' },
        { path: '/dashboard/projects', icon: <FiFolder size={20} />, label: 'Projects' },
        { path: '/dashboard/gallery', icon: <FiImage size={20} />, label: 'Gallery' },
        { path: '/dashboard/contacts', icon: <FiMessageSquare size={20} />, label: 'Messages' },
    ];
    
    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden z-10">
            <div className="flex justify-between items-center">
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex flex-col items-center px-3 py-2 rounded-md ${
                            isActive(item.path)
                                ? 'text-purple-600 bg-purple-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <span className="inline-block">{item.icon}</span>
                        <span className="text-xs mt-1">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};