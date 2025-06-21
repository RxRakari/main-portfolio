import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/auth-context';

interface NavbarProps {
  userName?: string;
  toggleSidebar?: () => void;
  isMobile?: boolean;
  sidebarOpen?: boolean;
}

const Navbar = ({ userName, toggleSidebar, isMobile, sidebarOpen }: NavbarProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Use admin name from auth context if available, otherwise use prop
  const displayName = admin?.username || userName || 'User';

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
    <div className={`flex items-center justify-between px-4 md:px-6 ${isMobile ? 'h-16 bg-white mt-0 shadow-sm transition-all duration-300' : 'h-16 bg-transparent mt-4 md:my-[30px]'}`}>
      {/* Sidebar toggle and search bar for mobile, search bar only for desktop */}
      <div className="flex-1 flex items-center">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        )}
        <form onSubmit={handleSearch} className="relative w-full max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-sm"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Search"
          >
            <svg
              className={`h-5 w-5 ${searchQuery.trim() ? 'text-blue-500' : 'text-gray-400'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>

      {/* Right-side profile and notifications */}
      <div className={`flex-1 flex ${isMobile ? 'justify-end' : 'justify-end'}`}>
        <div className={`flex items-center space-x-4 ${isMobile ? 'bg-white rounded-md p-1.5 shadow-sm transition-all duration-200' : 'bg-white rounded-md p-2 border border-gray-200'}`}>
          {/* Notifications */}
          <div ref={notificationsRef} className={`relative ${isMobile ? 'bg-gray-50 rounded-full p-1' : 'bg-gray-100 rounded-full p-1'}`}>
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none transition-colors duration-200"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                7
              </span>
            </button>
            
            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-[280px] md:w-80 bg-white rounded-md shadow-lg overflow-hidden z-20" onClick={toggleNotifications}>
                <div className="py-2">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto scrollbar-thin">
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="w-full">
                        <p className="text-sm font-medium text-gray-900">New quote request submitted</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </a>
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="w-full">
                        <p className="text-sm font-medium text-gray-900">New job application received</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </a>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button 
                      onClick={handleViewAllNotifications}
                      className="text-xs text-blue-600 hover:text-blue-500"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div ref={profileRef} className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-2 focus:outline-none transition-colors duration-200"
              aria-label="User profile"
            >
              <div className={`${isMobile ? 'bg-gray-50 p-1 rounded-full' : ''}`}>
                <img
                  src={""}
                  alt="Admin"
                  className="h-8 w-8 rounded-full object-cover border-2 border-blue-100"
                />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">{displayName}</span>
            </button>
            
            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-1">
                  <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </Link>
                  <Link to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;