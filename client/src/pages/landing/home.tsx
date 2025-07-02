import React from 'react';
import ProjectsSection from '../../components/sections/projects';
// import NewsletterSection from '../../components/sections/newsletter';
import { HeroSection } from '../../components/sections/hero';
import { Testimonials } from '../../components/sections/testimonials';
import { ExperienceSection } from '../../components/sections/experience';
export const Home: React.FC = () => {
  return (
    <main className='bg-black text-white flex flex-col items-center justify-center'>
    <HeroSection />
    <ProjectsSection />
    <ExperienceSection />
    <Testimonials />
    {/* <NewsletterSection /> */}
    </main>
  );
};