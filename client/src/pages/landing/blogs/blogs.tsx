import React from 'react';
import { PageHeader } from '../../../components/ui/page-header';

export const Blogs: React.FC = () => {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <PageHeader
        heading="Blog Posts"
        paragraph="Read my latest articles and thoughts"
      />
      {/* Blog list or content goes here */}
    </div>
  );
};
