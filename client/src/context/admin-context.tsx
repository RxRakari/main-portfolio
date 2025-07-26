import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import apiClient, { 
  blogAPI, 
  projectAPI, 
  experienceAPI,
  galleryAPI,
  testimonialAPI,
  contactAPI,
  newsletterAPI,
  dashboardAPI
} from '../services/api-client';
import { useAuth } from './auth-context';

interface AdminContextProps {
  // Blog operations
  fetchBlogs: (params?: any) => Promise<any>;
  fetchBlog: (id: string) => Promise<any>;
  createBlog: (data: FormData) => Promise<any>;
  updateBlog: (id: string, data: FormData) => Promise<any>;
  deleteBlog: (id: string) => Promise<any>;
  toggleBlogFeatured: (id: string) => Promise<any>;
  toggleBlogPublished: (id: string) => Promise<any>;
  
  // Project operations
  fetchProjects: (params?: any) => Promise<any>;
  fetchProject: (id: string) => Promise<any>;
  createProject: (data: FormData) => Promise<any>;
  updateProject: (id: string, data: FormData) => Promise<any>;
  deleteProject: (id: string) => Promise<any>;
  toggleProjectFeatured: (id: string) => Promise<any>;
  toggleProjectPublished: (id: string) => Promise<any>;
  
  // Experience operations
  fetchExperiences: (params?: any) => Promise<any>;
  fetchExperience: (id: string) => Promise<any>;
  createExperience: (data: any) => Promise<any>;
  updateExperience: (id: string, data: any) => Promise<any>;
  deleteExperience: (id: string) => Promise<any>;
  toggleExperienceFeatured: (id: string) => Promise<any>;
  
  // Gallery operations
  fetchGalleryItems: (params?: any) => Promise<any>;
  fetchGalleryItem: (id: string) => Promise<any>;
  createGalleryItem: (data: FormData) => Promise<any>;
  updateGalleryItem: (id: string, data: FormData) => Promise<any>;
  deleteGalleryItem: (id: string) => Promise<any>;
  toggleGalleryItemFeatured: (id: string) => Promise<any>;
  
  // Testimonial operations
  fetchTestimonials: (params?: any) => Promise<any>;
  fetchTestimonial: (id: string) => Promise<any>;
  createTestimonial: (data: FormData) => Promise<any>;
  updateTestimonial: (id: string, data: FormData) => Promise<any>;
  deleteTestimonial: (id: string) => Promise<any>;
  toggleTestimonialPublished: (id: string) => Promise<any>;
  
  // Contact operations
  fetchContacts: (params?: any) => Promise<any>;
  fetchContact: (id: string) => Promise<any>;
  markContactRead: (id: string) => Promise<any>;
  archiveContact: (id: string) => Promise<any>;
  deleteContact: (id: string) => Promise<any>;
  
  // Newsletter operations
  sendNewsletterUpdate: (type: string, id: string) => Promise<any>;
  // Dashboard operations
  fetchDashboardStats: () => Promise<any>;
  fetchPopularContent: () => Promise<any>;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { token } = useAuth();

  // Set up axios interceptor for auth token
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Blog operations
  const fetchBlogs = async (params?: any) => {
    try {
      return await blogAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
      throw error;
    }
  };

  const fetchBlog = async (id: string) => {
    try {
      return await blogAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      toast.error('Failed to fetch blog');
      throw error;
    }
  };

  const createBlog = async (data: FormData) => {
    try {
      toast.loading('Creating blog post...');
      const response = await blogAPI.create(data);
      toast.dismiss();
      toast.success('Blog post created successfully');
      return response;
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.dismiss();
      toast.error('Failed to create blog post');
      throw error;
    }
  };

  const updateBlog = async (id: string, data: FormData) => {
    try {
      toast.loading('Updating blog post...');
      const response = await blogAPI.update(id, data);
      toast.dismiss();
      toast.success('Blog post updated successfully');
      return response;
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to update blog post');
      throw error;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      toast.loading('Deleting blog post...');
      const response = await blogAPI.delete(id);
      toast.dismiss();
      toast.success('Blog post deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete blog post');
      throw error;
    }
  };

  const toggleBlogFeatured = async (id: string) => {
    try {
      const response = await blogAPI.toggleFeatured(id);
      toast.success('Blog featured status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling blog featured ${id}:`, error);
      toast.error('Failed to update featured status');
      throw error;
    }
  };

  const toggleBlogPublished = async (id: string) => {
    try {
      const response = await blogAPI.togglePublished(id);
      toast.success('Blog published status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling blog published ${id}:`, error);
      toast.error('Failed to update published status');
      throw error;
    }
  };

  // Project operations
  const fetchProjects = async (params?: any) => {
    try {
      return await projectAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
      throw error;
    }
  };

  const fetchProject = async (id: string) => {
    try {
      return await projectAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      toast.error('Failed to fetch project');
      throw error;
    }
  };

  const createProject = async (data: FormData) => {
    try {
      toast.loading('Creating project...');
      const response = await projectAPI.create(data);
      toast.dismiss();
      toast.success('Project created successfully');
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      toast.dismiss();
      toast.error('Failed to create project');
      throw error;
    }
  };

  const updateProject = async (id: string, data: FormData) => {
    try {
      toast.loading('Updating project...');
      const response = await projectAPI.update(id, data);
      toast.dismiss();
      toast.success('Project updated successfully');
      return response;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to update project');
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      toast.loading('Deleting project...');
      const response = await projectAPI.delete(id);
      toast.dismiss();
      toast.success('Project deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete project');
      throw error;
    }
  };

  const toggleProjectFeatured = async (id: string) => {
    try {
      const response = await projectAPI.toggleFeatured(id);
      toast.success('Project featured status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling project featured ${id}:`, error);
      toast.error('Failed to update featured status');
      throw error;
    }
  };

  const toggleProjectPublished = async (id: string) => {
    try {
      const response = await projectAPI.togglePublished(id);
      toast.success('Project published status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling project published ${id}:`, error);
      toast.error('Failed to update published status');
      throw error;
    }
  };

  // Experience operations
  const fetchExperiences = async (params?: any) => {
    try {
      return await experienceAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to fetch experiences');
      throw error;
    }
  };

  const fetchExperience = async (id: string) => {
    try {
      return await experienceAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      toast.error('Failed to fetch experience');
      throw error;
    }
  };

  const createExperience = async (data: any) => {
    try {
      toast.loading('Creating experience...');
      const response = await experienceAPI.create(data);
      toast.dismiss();
      toast.success('Experience created successfully');
      return response;
    } catch (error) {
      console.error('Error creating experience:', error);
      toast.dismiss();
      toast.error('Failed to create experience');
      throw error;
    }
  };

  const updateExperience = async (id: string, data: any) => {
    try {
      toast.loading('Updating experience...');
      const response = await experienceAPI.update(id, data);
      toast.dismiss();
      toast.success('Experience updated successfully');
      return response;
    } catch (error) {
      console.error(`Error updating experience ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to update experience');
      throw error;
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      toast.loading('Deleting experience...');
      const response = await experienceAPI.delete(id);
      toast.dismiss();
      toast.success('Experience deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting experience ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete experience');
      throw error;
    }
  };

  const toggleExperienceFeatured = async (id: string) => {
    try {
      const response = await experienceAPI.toggleFeatured(id);
      toast.success('Experience featured status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling experience featured ${id}:`, error);
      toast.error('Failed to update featured status');
      throw error;
    }
  };

  // Gallery operations
  const fetchGalleryItems = async (params?: any) => {
    try {
      return await galleryAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast.error('Failed to fetch gallery items');
      throw error;
    }
  };

  const fetchGalleryItem = async (id: string) => {
    try {
      return await galleryAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching gallery item ${id}:`, error);
      toast.error('Failed to fetch gallery item');
      throw error;
    }
  };

  const createGalleryItem = async (data: FormData) => {
    try {
      toast.loading('Creating gallery item...');
      const response = await galleryAPI.create(data);
      toast.dismiss();
      toast.success('Gallery item created successfully');
      return response;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      toast.dismiss();
      toast.error('Failed to create gallery item');
      throw error;
    }
  };

  const updateGalleryItem = async (id: string, data: FormData) => {
    try {
      toast.loading('Updating gallery item...');
      const response = await galleryAPI.update(id, data);
      toast.dismiss();
      toast.success('Gallery item updated successfully');
      return response;
    } catch (error) {
      console.error(`Error updating gallery item ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to update gallery item');
      throw error;
    }
  };

  const deleteGalleryItem = async (id: string) => {
    try {
      toast.loading('Deleting gallery item...');
      const response = await galleryAPI.delete(id);
      toast.dismiss();
      toast.success('Gallery item deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting gallery item ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete gallery item');
      throw error;
    }
  };

  const toggleGalleryItemFeatured = async (id: string) => {
    try {
      const response = await galleryAPI.toggleFeatured(id);
      toast.success('Gallery item featured status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling gallery item featured ${id}:`, error);
      toast.error('Failed to update featured status');
      throw error;
    }
  };

  // Testimonial operations
  const fetchTestimonials = async (params?: any) => {
    try {
      return await testimonialAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
      throw error;
    }
  };

  const fetchTestimonial = async (id: string) => {
    try {
      return await testimonialAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching testimonial ${id}:`, error);
      toast.error('Failed to fetch testimonial');
      throw error;
    }
  };

  const createTestimonial = async (data: FormData) => {
    try {
      toast.loading('Creating testimonial...');
      const response = await testimonialAPI.create(data);
      toast.dismiss();
      toast.success('Testimonial created successfully');
      return response;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      toast.dismiss();
      toast.error('Failed to create testimonial');
      throw error;
    }
  };

  const updateTestimonial = async (id: string, data: FormData) => {
    try {
      toast.loading('Updating testimonial...');
      const response = await testimonialAPI.update(id, data);
      toast.dismiss();
      toast.success('Testimonial updated successfully');
      return response;
    } catch (error) {
      console.error(`Error updating testimonial ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to update testimonial');
      throw error;
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      toast.loading('Deleting testimonial...');
      const response = await testimonialAPI.delete(id);
      toast.dismiss();
      toast.success('Testimonial deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting testimonial ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete testimonial');
      throw error;
    }
  };

  const toggleTestimonialPublished = async (id: string) => {
    try {
      const response = await testimonialAPI.togglePublished(id);
      toast.success('Testimonial published status updated');
      return response;
    } catch (error) {
      console.error(`Error toggling testimonial published ${id}:`, error);
      toast.error('Failed to update published status');
      throw error;
    }
  };

  // Contact operations
  const fetchContacts = async (params?: any) => {
    try {
      return await contactAPI.getAll(params);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
      throw error;
    }
  };

  const fetchContact = async (id: string) => {
    try {
      return await contactAPI.getById(id);
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      toast.error('Failed to fetch contact');
      throw error;
    }
  };

  const markContactRead = async (id: string) => {
    try {
      const response = await contactAPI.markRead(id);
      toast.success('Contact marked as read');
      return response;
    } catch (error) {
      console.error(`Error marking contact read ${id}:`, error);
      toast.error('Failed to mark contact as read');
      throw error;
    }
  };

  const archiveContact = async (id: string) => {
    try {
      const response = await contactAPI.archive(id);
      toast.success('Contact archived');
      return response;
    } catch (error) {
      console.error(`Error archiving contact ${id}:`, error);
      toast.error('Failed to archive contact');
      throw error;
    }
  };

  const deleteContact = async (id: string) => {
    try {
      toast.loading('Deleting contact...');
      const response = await contactAPI.delete(id);
      toast.dismiss();
      toast.success('Contact deleted successfully');
      return response;
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      toast.dismiss();
      toast.error('Failed to delete contact');
      throw error;
    }
  };

  // Newsletter operations
  const sendNewsletterUpdate = async (type: string, id: string) => {
    try {
      toast.loading('Sending newsletter update...');
      const response = await newsletterAPI.sendUpdates(type, id);
      toast.dismiss();
      toast.success('Newsletter update sent successfully');
      return response;
    } catch (error) {
      console.error('Error sending newsletter update:', error);
      toast.dismiss();
      toast.error('Failed to send newsletter update');
      throw error;
    }
  };

  // Dashboard operations
  const fetchDashboardStats = async () => {
    try {
      return await dashboardAPI.getStats();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to fetch dashboard stats');
      throw error;
    }
  };

  const fetchPopularContent = async () => {
    try {
      return await dashboardAPI.getPopularContent();
    } catch (error) {
      console.error('Error fetching popular content:', error);
      toast.error('Failed to fetch popular content');
      throw error;
    }
  };

  const value = {
    // Blog operations
    fetchBlogs,
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    toggleBlogFeatured,
    toggleBlogPublished,
    
    // Project operations
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectFeatured,
    toggleProjectPublished,
    
    // Experience operations
    fetchExperiences,
    fetchExperience,
    createExperience,
    updateExperience,
    deleteExperience,
    toggleExperienceFeatured,
    
    // Gallery operations
    fetchGalleryItems,
    fetchGalleryItem,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    toggleGalleryItemFeatured,
    
    // Testimonial operations
    fetchTestimonials,
    fetchTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialPublished,
    
    // Contact operations
    fetchContacts,
    fetchContact,
    markContactRead,
    archiveContact,
    deleteContact,
    
    // Newsletter operations
    sendNewsletterUpdate,
    // Dashboard operations
    fetchDashboardStats,
    fetchPopularContent,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
