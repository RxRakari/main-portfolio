import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/landing/footer';
import Navbar from '../components/layout/landing/navbar';
import NewsletterSection from '../components/sections/newsletter';

export const LandingLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-full">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
      <NewsletterSection />
      <Footer />
    </div>
  );
};
