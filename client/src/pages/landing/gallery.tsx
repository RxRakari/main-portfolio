import React from 'react';
import { PageHeader } from '../../components/ui/page-header';

export const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <PageHeader
        heading="Gallery"
        paragraph="Some of the memories I've shared"
      />
      {/* Gallery content goes here */}
    </div>
  );
};