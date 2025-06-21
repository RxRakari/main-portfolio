import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/layout/landing/footer';
import { Navbar } from '../components/layout/landing/navbar';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="py-4 px-6 border-b border-gray-200">
        <Navbar />
      </header>
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
