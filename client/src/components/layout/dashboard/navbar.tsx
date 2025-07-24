import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/auth-context';
import { FiMenu, FiBell, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';

interface NavbarProps {
  userName?: string;
  toggleSidebar?: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

const Navbar = ({ userName, toggleSidebar, isMobile }: NavbarProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Use admin name from auth context if available, otherwise use prop
  const displayName = admin?.username || userName || 'Admin';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const handleViewAllNotifications = () => {
    navigate('/dashboard/notifications');
    setIsNotificationsOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex items-center justify-between h-16 px-4 md:px-8 bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-lg ${isMobile ? 'shadow-sm' : ''}`}>
      {/* Left side - Sidebar toggle and search */}
      <div className="flex items-center flex-1">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 mr-3 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Toggle sidebar"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        )}
        <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 text-base"
          />
        </form>
      </div>

      {/* Right side - Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Mobile Search Button */}
        <button
          className="md:hidden p-2 rounded-full bg-black/30 text-gray-300 hover:bg-white/10"
          onClick={() => navigate('/dashboard/search')}
        >
          <FiSearch className="h-5 w-5" />
        </button>
        
        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-full bg-black/30 text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </button>
          
          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-black/80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden z-20 border border-white/10">
              <div className="px-4 py-3 border-b border-white/10 bg-black/40">
                <h3 className="text-sm font-medium text-white">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <a href="#" className="block px-4 py-3 hover:bg-white/10 border-b border-white/5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-900/30 rounded-full p-2">
                      <FiBell className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-white">New quote request submitted</p>
                      <p className="mt-1 text-sm text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="block px-4 py-3 hover:bg-white/10 border-b border-white/5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-900/30 rounded-full p-2">
                      <FiUser className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-white">New job application received</p>
                      <p className="mt-1 text-sm text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                </a>
                <a href="#" className="block px-4 py-3 hover:bg-white/10">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-900/30 rounded-full p-2">
                      <FiUser className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-white">New contact message</p>
                      <p className="mt-1 text-sm text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="px-4 py-2 border-t border-white/10 bg-black/40">
                <button 
                  onClick={handleViewAllNotifications}
                  className="w-full text-center text-xs text-gray-300 hover:text-white font-medium"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center space-x-2 focus:outline-none"
            aria-label="User profile"
          >
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:flex items-center">
              <span className="text-sm font-medium text-white mr-1">{displayName}</span>
              <FiChevronDown className="h-4 w-4 text-gray-400" />
            </span>
          </button>
          
          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden z-20 border border-white/10">
              <div className="px-4 py-3 border-b border-white/10 bg-black/40">
                <p className="text-sm font-medium text-white">{displayName}</p>
                <p className="text-xs text-gray-400 truncate">admin@example.com</p>
              </div>
              <div className="py-1">
                <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                  Your Profile
                </Link>
                <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                  Settings
                </Link>
                <div className="border-t border-white/5"></div>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 hover:text-red-300"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;