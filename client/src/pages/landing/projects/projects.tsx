import React from 'react';
import { PageHeader } from '../../../components/ui/page-header';

const Projects: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <PageHeader
        heading="Projects"
        paragraph="Explore some of my best work, from web apps to open-source contributions."
      />
      {/* Project cards or content goes here */}
    </div>
  );
};

export default Projects; 