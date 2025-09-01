import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api-client';

// Query keys for consistent caching
export const portfolioQueryKeys = {
  all: ['portfolio'] as const,
  landingPage: () => [...portfolioQueryKeys.all, 'landing-page'] as const,
  blogs: () => [...portfolioQueryKeys.all, 'blogs'] as const,
  blog: (id: string) => [...portfolioQueryKeys.blogs(), id] as const,
  featuredBlogs: () => [...portfolioQueryKeys.blogs(), 'featured'] as const,
  projects: () => [...portfolioQueryKeys.all, 'projects'] as const,
  project: (id: string) => [...portfolioQueryKeys.projects(), id] as const,
  featuredProjects: () => [...portfolioQueryKeys.projects(), 'featured'] as const,
  gallery: () => [...portfolioQueryKeys.all, 'gallery'] as const,
  galleryItem: (id: string) => [...portfolioQueryKeys.gallery(), id] as const,
  testimonials: () => [...portfolioQueryKeys.all, 'testimonials'] as const,
  testimonial: (id: string) => [...portfolioQueryKeys.testimonials(), id] as const,
  experiences: () => [...portfolioQueryKeys.all, 'experiences'] as const,
  experience: (id: string) => [...portfolioQueryKeys.experiences(), id] as const,
  featuredExperiences: () => [...portfolioQueryKeys.experiences(), 'featured'] as const,
  contacts: () => [...portfolioQueryKeys.all, 'contacts'] as const,
  contact: (id: string) => [...portfolioQueryKeys.contacts(), id] as const,
  newsletter: () => [...portfolioQueryKeys.all, 'newsletter'] as const,
  dashboard: () => [...portfolioQueryKeys.all, 'dashboard'] as const,
  stats: () => [...portfolioQueryKeys.dashboard(), 'stats'] as const,
  popularContent: () => [...portfolioQueryKeys.dashboard(), 'popular-content'] as const,
};

// Landing page data hook - fetches all data needed for the landing page
export const useLandingPageData = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.landingPage(),
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/landing-page');
      return response.data.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes for landing page data
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
  });
};

// Blog hooks
export const useBlogs = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.blogs(), params],
    queryFn: async () => {
      const response = await apiClient.get('/blogs', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.blog(id),
    queryFn: async () => {
      const response = await apiClient.get(`/blogs/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useFeaturedBlogs = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.featuredBlogs(),
    queryFn: async () => {
      const response = await apiClient.get('/blogs', { params: { featured: true } });
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Project hooks
export const useProjects = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.projects(), params],
    queryFn: async () => {
      const response = await apiClient.get('/projects', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.project(id),
    queryFn: async () => {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.featuredProjects(),
    queryFn: async () => {
      const response = await apiClient.get('/projects', { params: { featured: true } });
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Gallery hooks
export const useGalleryItems = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.gallery(), params],
    queryFn: async () => {
      const response = await apiClient.get('/gallery', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useGalleryItem = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.galleryItem(id),
    queryFn: async () => {
      const response = await apiClient.get(`/gallery/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Testimonial hooks
export const useTestimonials = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.testimonials(), params],
    queryFn: async () => {
      const response = await apiClient.get('/testimonials', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.testimonial(id),
    queryFn: async () => {
      const response = await apiClient.get(`/testimonials/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

// Experience hooks
export const useExperiences = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.experiences(), params],
    queryFn: async () => {
      const response = await apiClient.get('/experience', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.experience(id),
    queryFn: async () => {
      const response = await apiClient.get(`/experience/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useFeaturedExperiences = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.featuredExperiences(),
    queryFn: async () => {
      const response = await apiClient.get('/experience', { params: { featured: true } });
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Contact hooks
export const useContacts = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.contacts(), params],
    queryFn: async () => {
      const response = await apiClient.get('/contact', { params });
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for contacts (more dynamic)
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: portfolioQueryKeys.contact(id),
    queryFn: async () => {
      const response = await apiClient.get(`/contact/${id}`);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Newsletter hooks
export const useNewsletterSubscribers = (params?: any) => {
  return useQuery({
    queryKey: [...portfolioQueryKeys.newsletter(), params],
    queryFn: async () => {
      const response = await apiClient.get('/newsletter/admin', { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Dashboard hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.stats(),
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/admin/stats');
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for stats
  });
};

export const usePopularContent = () => {
  return useQuery({
    queryKey: portfolioQueryKeys.popularContent(),
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/admin/popular-content');
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Combined hook for all landing page data
export const useAllLandingData = () => {
  const landingPageQuery = useLandingPageData();
  const blogsQuery = useBlogs();
  const projectsQuery = useProjects();
  const galleryQuery = useGalleryItems();
  const testimonialsQuery = useTestimonials();
  const experiencesQuery = useExperiences();

  return {
    landingPage: landingPageQuery,
    blogs: blogsQuery,
    projects: projectsQuery,
    gallery: galleryQuery,
    testimonials: testimonialsQuery,
    experiences: experiencesQuery,
    isLoading: landingPageQuery.isLoading || blogsQuery.isLoading || projectsQuery.isLoading || galleryQuery.isLoading || testimonialsQuery.isLoading || experiencesQuery.isLoading,
    isError: landingPageQuery.isError || blogsQuery.isError || projectsQuery.isError || galleryQuery.isError || testimonialsQuery.isError || experiencesQuery.isError,
    error: landingPageQuery.error || blogsQuery.error || projectsQuery.error || galleryQuery.error || testimonialsQuery.error || experiencesQuery.error,
  };
};
