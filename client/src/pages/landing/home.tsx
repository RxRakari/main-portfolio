import React from 'react';
import ProjectsSection from '../../components/sections/projects';
import { HeroSection } from '../../components/sections/hero';
import { Testimonials } from '../../components/sections/testimonials';
import { ExperienceSection } from '../../components/sections/experience';
import AboutSection  from '../../components/sections/about';
import ContactSection from '../../components/sections/contact';
import LenisReact from "lenis/react";

export const Home: React.FC = () => {
  return (
    <LenisReact root>
    <main className='bg-black text-white flex flex-col items-center justify-center md:gap-[200px] gap-[100px]'>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <Testimonials />
    <ContactSection />
    </main>
    </LenisReact>
  );
};