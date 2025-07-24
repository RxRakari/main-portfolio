import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/dashboard/sidebar';
import Navbar from '../components/layout/dashboard/navbar';
import { BottomNavigation } from '../components/layout/dashboard/bottom-navigation';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-30 transition-transform duration-300 transform ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'relative'
        }`}
      >
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className={isMobile ? "sticky top-0 z-10" : ""}>
          <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile} sidebarOpen={sidebarOpen} />
        </div>
        
        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-4 md:p-8 ${isMobile ? 'pb-24' : ''}`}>
          <div className="container mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
        
        {/* Bottom Navigation for Mobile */}
        {isMobile && <BottomNavigation />}
      </div>
    </div>
  );
};

export default DashboardLayout;