import axios from 'axios';

// Define the base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Experience API endpoints
export const experienceAPI = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/experience', { params });
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await apiClient.get('/experience', { params: { featured: true } });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/experience/${id}`);
    return response.data;
  },
  
  create: async (data: FormData) => {
    const response = await apiClient.post('/experience/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: FormData) => {
    const response = await apiClient.put(`/experience/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/experience/admin/${id}`);
    return response.data;
  },
  
  toggleFeatured: async (id: string) => {
    const response = await apiClient.patch(`/experience/admin/${id}/featured`);
    return response.data;
  },
};

// Blog API endpoints
export const blogAPI = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/blogs', { params });
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await apiClient.get('/blogs', { params: { featured: true } });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  },
  
  create: async (data: FormData) => {
    const response = await apiClient.post('/blogs/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: FormData) => {
    const response = await apiClient.put(`/blogs/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/blogs/admin/${id}`);
    return response.data;
  },
  
  toggleFeatured: async (id: string) => {
    const response = await apiClient.patch(`/blogs/admin/${id}/featured`);
    return response.data;
  },
  
  togglePublished: async (id: string) => {
    const response = await apiClient.patch(`/blogs/admin/${id}/published`);
    return response.data;
  },
};

// Project API endpoints
export const projectAPI = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/projects', { params });
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await apiClient.get('/projects', { params: { featured: true } });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (data: FormData) => {
    const response = await apiClient.post('/projects/admin', data);
    return response.data;
  },
  
  update: async (id: string, data: FormData) => {
    const response = await apiClient.put(`/projects/admin/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await apiClient.delete(`/projects/admin/${id}`);
    return response.data;
  },
  
  toggleFeatured: async (id: string) => {
    const response = await apiClient.patch(`/projects/admin/${id}/featured`);
    return response.data;
  },
};

// Auth API endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (data: any) => {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },
};

export default apiClient; 