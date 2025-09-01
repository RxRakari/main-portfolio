import { useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioQueryKeys } from '../queries/use-portfolio-data';
import { blogAPI, projectAPI, galleryAPI, testimonialAPI, experienceAPI, contactAPI, newsletterAPI } from '../../services/api-client';

// Blog mutations
export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => blogAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => blogAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blog(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blogs() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.blog(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleBlogFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogAPI.toggleFeatured(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blog(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleBlogPublished = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => blogAPI.togglePublished(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blogs() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.blog(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

// Project mutations
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => projectAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.projects() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => projectAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.projects() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.project(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.projects() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.project(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleProjectFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectAPI.toggleFeatured(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.projects() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.project(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleProjectPublished = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectAPI.togglePublished(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.projects() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.project(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

// Gallery mutations
export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => galleryAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.gallery() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => galleryAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.gallery() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.galleryItem(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => galleryAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.gallery() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.galleryItem(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleGalleryFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => galleryAPI.toggleFeatured(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.gallery() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.galleryItem(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

// Testimonial mutations
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => testimonialAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonials() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => testimonialAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonials() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonial(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => testimonialAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonials() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.testimonial(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleTestimonialPublished = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => testimonialAPI.togglePublished(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonials() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.testimonial(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

// Experience mutations
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: FormData) => experienceAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experiences() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => experienceAPI.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experiences() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experience(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => experienceAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experiences() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.experience(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

export const useToggleExperienceFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => experienceAPI.toggleFeatured(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experiences() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.experience(id) });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.landingPage() });
    },
  });
};

// Contact mutations
export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => contactAPI.submit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contacts() });
    },
  });
};

export const useMarkContactRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => contactAPI.markRead(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contacts() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contact(id) });
    },
  });
};

export const useArchiveContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => contactAPI.archive(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contacts() });
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contact(id) });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => contactAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.contacts() });
      queryClient.removeQueries({ queryKey: portfolioQueryKeys.contact(id) });
    },
  });
};

// Newsletter mutations
export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (email: string) => newsletterAPI.subscribe(email),
  });
};

export const useUnsubscribeNewsletter = () => {
  return useMutation({
    mutationFn: (token: string) => newsletterAPI.unsubscribe(token),
  });
};

export const useSendNewsletterUpdates = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ type, id }: { type: string; id: string }) => newsletterAPI.sendUpdates(type, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.newsletter() });
    },
  });
};

export const useSendNewsletterToAll = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ subject, content }: { subject: string; content: string }) => newsletterAPI.sendToAll(subject, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.newsletter() });
    },
  });
};

export const useDeleteNewsletterSubscriber = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => newsletterAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: portfolioQueryKeys.newsletter() });
    },
  });
};
