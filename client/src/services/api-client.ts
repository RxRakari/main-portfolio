import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_URL } from '../helpers/api_url';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired, logout user
      localStorage.removeItem('auth_token');
      localStorage.removeItem('admin');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Experience API endpoints
export const experienceAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/experience', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await apiClient.get('/experience', { params: { featured: true } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured experiences:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/experience/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching experience ${id}:`, error);
      throw error;
    }
  },
  
  create: async (data: FormData) => {
    try {
      const response = await apiClient.post('/experience/admin', data);
      return response.data;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: FormData) => {
    try {
      const response = await apiClient.put(`/experience/admin/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating experience ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/experience/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting experience ${id}:`, error);
      throw error;
    }
  },
  
  toggleFeatured: async (id: string) => {
    try {
      const response = await apiClient.patch(`/experience/admin/${id}/featured`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling experience featured ${id}:`, error);
      throw error;
    }
  },
};

// Blog API endpoints
export const blogAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/blogs', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await apiClient.get('/blogs', { params: { featured: true } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  },
  
  create: async (data: FormData) => {
    try {
      const response = await apiClient.post('/blogs/admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: FormData) => {
    try {
      const response = await apiClient.put(`/blogs/admin/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating blog ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/blogs/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting blog ${id}:`, error);
      throw error;
    }
  },
  
  toggleFeatured: async (id: string) => {
    try {
      const response = await apiClient.patch(`/blogs/admin/${id}/featured`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling blog featured ${id}:`, error);
      throw error;
    }
  },
  
  togglePublished: async (id: string) => {
    try {
      const response = await apiClient.patch(`/blogs/admin/${id}/published`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling blog published ${id}:`, error);
      throw error;
    }
  },
};

// Project API endpoints
export const projectAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/projects', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await apiClient.get('/projects', { params: { featured: true } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },
  
  create: async (data: FormData) => {
    try {
      const response = await apiClient.post('/projects/admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: FormData) => {
    try {
      const response = await apiClient.put(`/projects/admin/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/projects/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },
  
  toggleFeatured: async (id: string) => {
    try {
      const response = await apiClient.patch(`/projects/admin/${id}/featured`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling project featured ${id}:`, error);
      throw error;
    }
  },
  
  togglePublished: async (id: string) => {
    try {
      const response = await apiClient.patch(`/projects/admin/${id}/published`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling project published ${id}:`, error);
      throw error;
    }
  },
};

// Gallery API endpoints
export const galleryAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/gallery', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/gallery/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching gallery item ${id}:`, error);
      throw error;
    }
  },
  
  create: async (data: FormData) => {
    try {
      const response = await apiClient.post('/gallery/admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating gallery item:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: FormData) => {
    try {
      const response = await apiClient.put(`/gallery/admin/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating gallery item ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/gallery/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting gallery item ${id}:`, error);
      throw error;
    }
  },
  
  toggleFeatured: async (id: string) => {
    try {
      const response = await apiClient.patch(`/gallery/admin/${id}/featured`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling gallery item featured ${id}:`, error);
      throw error;
    }
  },
};

// Testimonial API endpoints
export const testimonialAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/testimonials', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/testimonials/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching testimonial ${id}:`, error);
      throw error;
    }
  },
  
  create: async (data: FormData) => {
    try {
      const response = await apiClient.post('/testimonials/admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating testimonial:', error);
      throw error;
    }
  },
  
  update: async (id: string, data: FormData) => {
    try {
      const response = await apiClient.put(`/testimonials/admin/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating testimonial ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/testimonials/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting testimonial ${id}:`, error);
      throw error;
    }
  },
  
  togglePublished: async (id: string) => {
    try {
      const response = await apiClient.patch(`/testimonials/admin/${id}/published`);
      return response.data;
    } catch (error) {
      console.error(`Error toggling testimonial published ${id}:`, error);
      throw error;
    }
  },
};

// Contact API endpoints
export const contactAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/contact', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await apiClient.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  },
  
  submit: async (data: any) => {
    try {
      const response = await apiClient.post('/contact', data);
      return response.data;
    } catch (error) {
      console.error('Error submitting contact:', error);
      throw error;
    }
  },
  
  markRead: async (id: string) => {
    try {
      const response = await apiClient.patch(`/contact/admin/${id}/read`);
      return response.data;
    } catch (error) {
      console.error(`Error marking contact read ${id}:`, error);
      throw error;
    }
  },
  
  archive: async (id: string) => {
    try {
      const response = await apiClient.patch(`/contact/admin/${id}/archive`);
      return response.data;
    } catch (error) {
      console.error(`Error archiving contact ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/contact/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  },
};

// Newsletter API endpoints
export const newsletterAPI = {
  getAll: async (params?: any) => {
    try {
      const response = await apiClient.get('/newsletter/admin', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      throw error;
    }
  },
  subscribe: async (email: string) => {
    try {
      const response = await apiClient.post('/newsletter/subscribe', { email });
      return response.data;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },
  
  unsubscribe: async (token: string) => {
    try {
      const response = await apiClient.post('/newsletter/unsubscribe', { token });
      return response.data;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  },
  
  sendUpdates: async (type: string, id: string) => {
    try {
      const response = await apiClient.post('/newsletter/send-updates', { type, id });
      return response.data;
    } catch (error) {
      console.error('Error sending newsletter updates:', error);
      throw error;
    }
  },
  
  sendToAll: async (subject: string, content: string) => {
    try {
      const response = await apiClient.post('/newsletter/admin/send', { subject, content });
      return response.data;
    } catch (error) {
      console.error('Error sending newsletter:', error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      const response = await apiClient.delete(`/newsletter/admin/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting subscriber:', error);
      throw error;
    }
  },
};

// Auth API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  getProfile: async () => {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },
  
  updateProfile: async (data: any) => {
    try {
      const response = await apiClient.put('/auth/profile', data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

// Dashboard API endpoints
export const dashboardAPI = {
  getStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/admin/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
  
  getPopularContent: async () => {
    try {
      const response = await apiClient.get('/dashboard/admin/popular-content');
      return response.data;
    } catch (error) {
      console.error('Error fetching popular content:', error);
      throw error;
    }
  },
};

export default apiClient; 