import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiFileText, 
  FiFolder, 
  FiImage, 
  FiMessageSquare, 
  FiUsers, 
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiLogOut
} from 'react-icons/fi';

interface SubMenuItemProps {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface MenuItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  subMenuItems?: SubMenuItemProps[];
  onClick?: () => void;
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  
  // Auto-expand menu based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    menuItems.forEach(item => {
      if (item.subMenuItems && item.subMenuItems.some(subItem => currentPath.startsWith(subItem.path))) {
        setExpandedMenu(item.title);
      }
    });
  }, [location.pathname]);
  
  const menuItems: MenuItemProps[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <FiHome className="w-5 h-5" />
    },
    {
      title: 'Blogs',
      path: '/dashboard/blogs',
      icon: <FiFileText className="w-5 h-5" />,
      subMenuItems: [
        { title: 'All Blogs', path: '/dashboard/blogs' },
        { title: 'Add New', path: '/dashboard/blogs/form' }
      ]
    },
    {
      title: 'Projects',
      path: '/dashboard/projects',
      icon: <FiFolder className="w-5 h-5" />,
      subMenuItems: [
        { title: 'All Projects', path: '/dashboard/projects' },
        { title: 'Add New', path: '/dashboard/projects/form' }
      ]
    },
    {
      title: 'Gallery',
      path: '/dashboard/gallery',
      icon: <FiImage className="w-5 h-5" />,
      subMenuItems: [
        { title: 'All Images', path: '/dashboard/gallery' },
        { title: 'Add New', path: '/dashboard/gallery/form' }
      ]
    },
    {
      title: 'Testimonials',
      path: '/dashboard/testimonials',
      icon: <FiUsers className="w-5 h-5" />,
      subMenuItems: [
        { title: 'All Testimonials', path: '/dashboard/testimonials' },
        { title: 'Add New', path: '/dashboard/testimonials/form' }
      ]
    },
    {
      title: 'Contact Messages',
      path: '/dashboard/contacts',
      icon: <FiMessageSquare className="w-5 h-5" />
    },
    {
      title: 'Settings',
      path: '/dashboard/settings',
      icon: <FiSettings className="w-5 h-5" />
    },
    {
      title: 'Logout',
      path: '/logout',
      icon: <FiLogOut className="w-5 h-5" />,
      onClick: () => {
        navigate('/logout');
      }
    }
  ];

  const toggleSubMenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') {
      return true;
    }
    return location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  const isSubMenuActive = (item: MenuItemProps) => {
    if (!item.subMenuItems) return false;
    return item.subMenuItems.some(subItem => isActive(subItem.path));
  };

  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Caleb Kalejaiye
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.subMenuItems ? (
                <div className="mb-2">
                  <button
                    onClick={() => toggleSubMenu(item.title)}
                    className={`flex items-center w-full px-4 py-2.5 text-left transition-colors duration-200 rounded-lg ${
                      isSubMenuActive(item) || isActive(item.path)
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="flex-1 font-medium text-sm">{item.title}</span>
                    {expandedMenu === item.title ? (
                      <FiChevronDown className="w-4 h-4" />
                    ) : (
                      <FiChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {expandedMenu === item.title && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-10 mt-1 space-y-1"
                    >
                      {item.subMenuItems.map((subItem) => (
                        <li key={subItem.title}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 rounded-lg ${
                              isActive(subItem.path)
                                ? 'bg-purple-50 text-purple-600'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <span className="w-2 h-2 mr-3 bg-gray-300 rounded-full"></span>
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={item.onClick}
                  className={`flex items-center px-4 py-2.5 mb-2 transition-colors duration-200 rounded-lg ${
                    isActive(item.path)
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};