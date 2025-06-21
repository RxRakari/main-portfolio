import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex">
      <aside className="w-64 bg-gray-100 border-r border-gray-200 p-4">
        <div className="text-xl font-bold mb-6">Admin Dashboard</div>
        <nav>
          <ul className="space-y-2">
            <li><Link to="/dashboard" className="block hover:bg-gray-200 p-2 rounded">Overview</Link></li>
            <li><Link to="/dashboard/blogs" className="block hover:bg-gray-200 p-2 rounded">Blogs</Link></li>
            <li><Link to="/dashboard/projects" className="block hover:bg-gray-200 p-2 rounded">Projects</Link></li>
            <li><Link to="/dashboard/testimonials" className="block hover:bg-gray-200 p-2 rounded">Testimonials</Link></li>
            <li><Link to="/dashboard/gallery" className="block hover:bg-gray-200 p-2 rounded">Gallery</Link></li>
            <li><Link to="/dashboard/contacts" className="block hover:bg-gray-200 p-2 rounded">Contact Submissions</Link></li>
            <li><Link to="/" className="block hover:bg-gray-200 p-2 rounded">Back to Site</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
