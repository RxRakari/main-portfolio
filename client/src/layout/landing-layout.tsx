import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="py-4 px-6 border-b border-gray-200">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">Monochrome Portfolio</div>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
      <footer className="py-4 px-6 border-t border-gray-200 text-center">
        <p>© {new Date().getFullYear()} Monochrome Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};
