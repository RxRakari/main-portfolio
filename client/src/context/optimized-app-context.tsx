import React, { createContext, useContext, ReactNode } from 'react';
import { useAllLandingData } from '../hooks/queries/use-portfolio-data';

interface OptimizedAppContextProps {
  // Landing page data
  landingPageData: any;
  isLoading: boolean;
  error: any;
  refetch: () => void;
  
  // Individual data queries for direct access
  blogsQuery: any;
  projectsQuery: any;
  galleryQuery: any;
  testimonialsQuery: any;
  experiencesQuery: any;
}

const OptimizedAppContext = createContext<OptimizedAppContextProps | undefined>(undefined);

export const useOptimizedApp = () => {
  const context = useContext(OptimizedAppContext);
  if (!context) {
    throw new Error('useOptimizedApp must be used within an OptimizedAppProvider');
  }
  return context;
};

interface OptimizedAppProviderProps {
  children: ReactNode;
}

export const OptimizedAppProvider: React.FC<OptimizedAppProviderProps> = ({ children }) => {
  const {
    landingPage,
    blogs: blogsQuery,
    projects: projectsQuery,
    gallery: galleryQuery,
    testimonials: testimonialsQuery,
    experiences: experiencesQuery,
    isLoading,
    isError,
    error,
  } = useAllLandingData();

  const refetch = () => {
    landingPage.refetch();
    blogsQuery.refetch();
    projectsQuery.refetch();
    galleryQuery.refetch();
    testimonialsQuery.refetch();
    experiencesQuery.refetch();
  };

  const value = {
    landingPageData: landingPage.data || {
      blogs: blogsQuery.data?.data || [],
      projects: projectsQuery.data?.data || [],
      gallery: galleryQuery.data?.data || [],
      testimonials: testimonialsQuery.data?.data || [],
      experiences: experiencesQuery.data?.data || [],
    },
    isLoading,
    error: isError ? error : null,
    refetch,
    blogsQuery,
    projectsQuery,
    galleryQuery,
    testimonialsQuery,
    experiencesQuery,
  };

  return (
    <OptimizedAppContext.Provider value={value}>
      {children}
    </OptimizedAppContext.Provider>
  );
};
