import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/landing/footer';
import Navbar from '../components/layout/landing/navbar';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="w-full px-[80px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
