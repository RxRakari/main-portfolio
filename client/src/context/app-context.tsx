import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient, { 
  blogAPI, 
  projectAPI, 
  experienceAPI,
  galleryAPI,
  testimonialAPI,
  contactAPI,
  newsletterAPI
} from '../services/api-client';

interface LandingPageData {
  blogs: any[];
  projects: any[];
  gallery: any[];
  testimonials: any[];
  experiences: any[];
}

interface AppContextProps {
  // Landing page data
  landingPageData: LandingPageData;
  isLoading: boolean;
  error: string | null;
  refreshLandingPageData: () => Promise<void>;
  
  // Blog operations
  fetchBlogs: (params?: any) => Promise<any>;
  fetchBlog: (id: string) => Promise<any>;
  
  // Project operations
  fetchProjects: (params?: any) => Promise<any>;
  fetchProject: (id: string) => Promise<any>;
  
  // Experience operations
  fetchExperiences: (params?: any) => Promise<any>;
  
  // Gallery operations
  fetchGalleryItems: (params?: any) => Promise<any>;
  
  // Testimonial operations
  fetchTestimonials: (params?: any) => Promise<any>;
  
  // Contact operations
  submitContactForm: (data: any) => Promise<any>;

  // SUBSCRIBE TO NEWSLETTER
  subscribeToNewsletter: (data: any) => Promise<any>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [landingPageData, setLandingPageData] = useState<LandingPageData>({
    blogs: [],
    projects: [],
    gallery: [],
    testimonials: [],
    experiences: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch landing page data
  const fetchLandingPageData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiClient.get('/dashboard/landing-page');
      setLandingPageData(response.data.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching landing page data:', error);
      setError('Failed to load landing page data');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh landing page data
  const refreshLandingPageData = async () => {
    await fetchLandingPageData();
  };

  // Load landing page data on mount
  useEffect(() => {
    fetchLandingPageData();
  }, []);

  // Blog operations
  const fetchBlogs = async (params?: any) => {
    try {
      return await blogAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  };

  const fetchBlog = async (id: string) => {
    try {
      return await blogAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  };

  // Project operations
  const fetchProjects = async (params?: any) => {
    try {
      return await projectAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  const fetchProject = async (id: string) => {
    try {
      return await projectAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  };

  // Experience operations
  const fetchExperiences = async (params?: any) => {
    try {
      return await experienceAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  };

  // Gallery operations
  const fetchGalleryItems = async (params?: any) => {
    try {
      return await galleryAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  };

  // Testimonial operations
  const fetchTestimonials = async (params?: any) => {
    try {
      return await testimonialAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  };

  // Contact operations
  const submitContactForm = async (data: any) => {
    try {
      return await contactAPI.submit(data);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  const subscribeToNewsletter = async (data: any) => {
    try {
      return await newsletterAPI.subscribe(data);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  const value = {
    landingPageData,
    isLoading,
    error,
    refreshLandingPageData,
    fetchBlogs,
    fetchBlog,
    fetchProjects,
    fetchProject,
    fetchExperiences,
    fetchGalleryItems,
    fetchTestimonials,
    submitContactForm,
    subscribeToNewsletter
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
