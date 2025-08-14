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
  FiLogOut,
  FiBriefcase
} from 'react-icons/fi';
import { useAuth } from '../../../context/auth-context';
import { useTheme } from '../../../context/theme-context';
import { FaNewspaper } from 'react-icons/fa';

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
  const { theme } = useTheme()
  const { admin } = useAuth();
  const email = admin?.email;
  const username = admin?.username;

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
      title: 'Experience',
      path: '/dashboard/experience',
      icon: <FiBriefcase className="w-5 h-5" />,
      subMenuItems: [
        { title: 'All Experience', path: '/dashboard/experience' },
        { title: 'Add New', path: '/dashboard/experience/form' }
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
      title: 'Newsletter',
      path: '/dashboard/newsletter',
      icon: <FaNewspaper className="w-5 h-5" />
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
    <div
      className={`h-full w-64 flex flex-col border-r transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-black/60 backdrop-blur-lg border-white/10 shadow-xl'
          : 'bg-white border-gray-200'
      }`}
    >

      {/* Logo */}
      <div
        className={`flex flex-col items-center justify-center py-8 border-b ${
          theme === 'dark'
            ? 'border-white/10 bg-black/40'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <Link
          to="/"
          className={`text-2xl font-bold mb-1 tracking-wide ${
            theme === 'dark' ? 'text-white' : 'text-purple-600'
          }`}
        >
          Caleb Kalejaiye
        </Link>
        <span
          className={`text-xs font-medium tracking-widest ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
          }`}
        >
          Portfolio Dashboard
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.title}>
              {item.subMenuItems ? (
                <div className="mb-2">
                  <button
                    onClick={() => toggleSubMenu(item.title)}
                    className={`flex items-center w-full px-4 py-2.5 text-left transition-colors duration-200 rounded-lg ${
                      isSubMenuActive(item) || isActive(item.path)
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-purple-50 text-purple-600'
                        : theme === 'dark'
                        ? 'text-gray-300 hover:bg-white/5'
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
                      {item.subMenuItems.map(subItem => (
                        <li key={subItem.title}>
                          <Link
                            to={subItem.path}
                            className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 rounded-lg ${
                              isActive(subItem.path)
                                ? theme === 'dark'
                                  ? 'bg-white/10 text-white'
                                  : 'bg-purple-50 text-purple-600'
                                : theme === 'dark'
                                ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <span
                              className={`w-2 h-2 mr-3 rounded-full ${
                                theme === 'dark' ? 'bg-gray-500' : 'bg-gray-300'
                              }`}
                            ></span>
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
                      ? theme === 'dark'
                        ? 'bg-white/10 text-white'
                        : 'bg-purple-50 text-purple-600'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
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
      <div
        className={`p-4 border-t ${
          theme === 'dark'
            ? 'border-white/10 bg-black/40'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold capitalize ${
              theme === 'dark'
                ? 'bg-white/10 text-white'
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            {username?.[0]}
          </div>
          <div className="ml-3">
            <p
              className={`text-sm font-medium ${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              }`}
            >
              {username}
            </p>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};