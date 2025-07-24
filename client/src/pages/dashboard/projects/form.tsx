import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFolder, FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection
} from '../../../components/ui/dashboard/form-elements';
import ImageUpload from '../../../components/ui/dashboard/image-upload';
import { uploadImage } from '../../../services/upload-service';

// Mock project data for editing
const mockProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
    content: 'This project is a comprehensive e-commerce solution built with React, Node.js, and MongoDB. It includes features such as product listings, search, filtering, cart management, and secure checkout with Stripe integration.',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    images: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    status: 'completed',
    featured: true,
    liveUrl: 'https://example.com/ecommerce',
    repoUrl: 'https://github.com/example/ecommerce',
    date: '2023-08-15',
    client: 'Self',
    duration: '3 months',
    approach: 'We used a modern full-stack architecture with React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. We implemented secure authentication, product management, and payment processing with Stripe integration.',
    challenges: 'Scaling the application, handling large amounts of data, and ensuring high availability during peak traffic.',
    features: ['Product listings with images and descriptions', 'Search and filtering functionality', 'Shopping cart and checkout', 'User authentication and authorization', 'Secure payment processing with Stripe'],
    seo: {
      metaTitle: 'E-Commerce Platform - Full-Stack Web Development Project',
      metaDescription: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB.',
      keywords: 'e-commerce, React, Node.js, MongoDB, web development',
    }
  },
  {
    id: '2',
    title: 'AI Chat Application',
    slug: 'ai-chat-application',
    description: 'An AI-powered chat application that uses natural language processing to provide intelligent responses.',
    content: 'This project is an AI chat application that leverages TensorFlow and natural language processing to provide intelligent responses to user queries. It includes features such as conversation history, user authentication, and customizable chat interfaces.',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'WebSockets'],
    images: [
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1506&q=80',
    status: 'completed',
    featured: true,
    liveUrl: 'https://example.com/ai-chat',
    repoUrl: 'https://github.com/example/ai-chat',
    date: '2023-07-22',
    client: 'Tech Startup',
    duration: '4 months',
    approach: 'We developed a scalable chat application using React for the frontend, Flask for the backend, and TensorFlow for natural language processing. We implemented real-time communication using WebSockets and secured user data with authentication.',
    challenges: 'Ensuring accurate and contextually relevant responses, managing large volumes of user messages, and maintaining high availability.',
    features: ['Real-time chat interface', 'Conversation history', 'User authentication', 'Contextual responses', 'Scalable architecture'],
    seo: {
      metaTitle: 'AI Chat Application - Machine Learning Project',
      metaDescription: 'An AI-powered chat application built with TensorFlow and React.',
      keywords: 'AI, machine learning, chat, TensorFlow, React',
    }
  }
];

// Add new fields to the interface
interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  technologies: string[];
  newTechnology: string;
  images: string[];
  newImage: string;
  featuredImage: string;
  status: string;
  featured: boolean;
  liveUrl: string;
  repoUrl: string;
  client: string;
  duration: string;
  approach: string;
  challenges: string;
  features: string[];
  newFeature: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    category: '',
    technologies: [],
    newTechnology: '',
    images: [],
    newImage: '',
    featuredImage: '',
    status: 'planning',
    featured: false,
    liveUrl: '',
    repoUrl: '',
    client: '',
    duration: '',
    approach: '',
    challenges: '',
    features: [],
    newFeature: '',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch project data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to fetch project data
      setTimeout(() => {
        const project = mockProjects.find(project => project.id === id);
        if (project) {
          setFormData({
            title: project.title,
            slug: project.slug,
            description: project.description,
            content: project.content,
            category: project.category,
            technologies: project.technologies,
            newTechnology: '',
            images: project.images,
            newImage: '',
            featuredImage: project.featuredImage,
            status: project.status,
            featured: project.featured,
            liveUrl: project.liveUrl,
            repoUrl: project.repoUrl,
            client: project.client,
            duration: project.duration,
            approach: project.approach,
            challenges: project.challenges,
            features: project.features,
            newFeature: '',
            seo: {
              metaTitle: project.seo.metaTitle,
              metaDescription: project.seo.metaDescription,
              keywords: project.seo.keywords,
            }
          });
        } else {
          // Project not found, redirect to projects list
          navigate('/dashboard/projects');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode, navigate]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'seo') {
        setFormData(prev => ({
          ...prev,
          seo: {
            ...prev.seo,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  // Add technology
  const addTechnology = () => {
    if (formData.newTechnology.trim() === '') return;
    
    if (formData.technologies.includes(formData.newTechnology.trim())) {
      setErrors(prev => ({
        ...prev,
        newTechnology: 'Technology already added'
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, prev.newTechnology.trim()],
      newTechnology: ''
    }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newTechnology;
      return newErrors;
    });
  };

  // Remove technology
  const removeTechnology = (technology: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== technology)
    }));
  };

  // Handle single image upload and add to images array
  const handleSingleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await uploadImage(file);
      
      // Add the new image to the images array
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl],
        // If no featured image is set, use this as the featured image
        featuredImage: prev.featuredImage || imageUrl
      }));
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Remove image
  const removeImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== image),
      featuredImage: prev.featuredImage === image ? (prev.images.length > 1 ? prev.images.filter(img => img !== image)[0] : '') : prev.featuredImage
    }));
  };

  // Set featured image
  const setAsFeaturedImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: image
    }));
  };

  // Add this new function for adding features
  const addFeature = () => {
    if (!formData.newFeature.trim()) {
      setErrors(prev => ({
        ...prev,
        newFeature: 'Feature cannot be empty'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      features: [...prev.features, formData.newFeature.trim()],
      newFeature: ''
    }));

    setErrors(prev => ({
      ...prev,
      newFeature: ''
    }));
  };

  // Add this new function for removing features
  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    if (!formData.featuredImage && formData.images.length > 0) {
      // Auto-select the first image as featured if none is selected
      setFormData(prev => ({
        ...prev,
        featuredImage: prev.images[0]
      }));
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to save the project
      console.log('Form data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to project list
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/dashboard/projects');
    }
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md mb-6 w-3/4"></div>
          <div className="h-64 bg-gray-100 rounded-md mb-6"></div>
          <div className="h-32 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <SectionHeader
        title={isEditMode ? "Edit Project" : "Create New Project"}
        description={isEditMode ? "Update an existing project" : "Create a new project for your portfolio"}
        icon={<FiFolder size={24} />}
      />

      <form onSubmit={handleSubmit}>
        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
              required
              error={errors.title}
              className="md:col-span-2"
            />
            
            <div className="flex items-end gap-4">
              <TextInput
                id="slug"
                name="slug"
                label="Slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="enter-project-slug"
                required
                error={errors.slug}
                helperText="URL-friendly version of the title"
                className="flex-1"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="mb-4 px-4 py-2 border border-white/20 rounded-lg text-white bg-black/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
              >
                Generate
              </button>
            </div>
            
            <Select
              id="category"
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a category' },
                { value: 'Web Development', label: 'Web Development' },
                { value: 'Mobile Development', label: 'Mobile Development' },
                { value: 'AI/ML', label: 'AI/ML' },
                { value: 'Blockchain', label: 'Blockchain' },
                { value: 'UI/UX Design', label: 'UI/UX Design' },
              ]}
              required
              error={errors.category}
            />
          </div>
          
          <TextArea
            id="description"
            name="description"
            label="Short Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a brief description of your project"
            rows={2}
            required
            error={errors.description}
            helperText="A short summary that appears in project listings (max 200 characters)"
          />
        </FormSection>

        <FormSection title="Project Details">
          <TextArea
            id="content"
            name="content"
            label="Overview"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter a detailed overview of the project"
            rows={6}
            required
            error={errors.content}
          />

          <TextArea
            id="approach"
            name="approach"
            label="Approach"
            value={formData.approach}
            onChange={handleChange}
            placeholder="Describe your approach to this project"
            rows={4}
          />

          <TextArea
            id="challenges"
            name="challenges"
            label="Challenges"
            value={formData.challenges}
            onChange={handleChange}
            placeholder="Describe challenges faced and how you overcame them"
            rows={4}
          />
        </FormSection>

        <FormSection title="Key Features">
          {formData.features.length > 0 ? (
            <div className="mb-6 space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 border border-white/10 rounded-lg">
                  <span className="text-white">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-4 p-4 border border-white/10 rounded-lg bg-black/30 text-center">
              <p className="text-gray-400">No features added yet. Add features below.</p>
            </div>
          )}

          <div className="flex items-end gap-2 mb-4">
            <TextInput
              id="newFeature"
              name="newFeature"
              label="Add Feature"
              value={formData.newFeature}
              onChange={handleChange}
              placeholder="Enter a key feature"
              error={errors.newFeature}
              className="flex-1"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 mb-0.5"
            >
              <FiPlus size={18} />
            </button>
          </div>
        </FormSection>

        <FormSection title="Technologies">
          {errors.technologies && (
            <p className="mb-4 text-sm text-red-600 flex items-center">
              <FiX className="mr-1" /> {errors.technologies}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center bg-black/30 text-white border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <TextInput
              id="newTechnology"
              name="newTechnology"
              label="Add Technology"
              value={formData.newTechnology}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              error={errors.newTechnology}
            />
            <button
              type="button"
              onClick={addTechnology}
              className="mt-7 px-4 py-3 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 flex items-center transition-colors"
            >
              <FiPlus className="mr-1" /> Add
            </button>
          </div>
        </FormSection>

        <FormSection title="Project Images">
          {errors.images && (
            <p className="mb-4 text-sm text-red-600 flex items-center">
              <FiX className="mr-1" /> {errors.images}
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/30">
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAsFeaturedImage(image)}
                    className={`p-2 rounded-full ${
                      formData.featuredImage === image ? 'bg-white/80' : 'bg-black/50'
                    } ${formData.featuredImage === image ? 'text-black' : 'text-white'} hover:bg-white/60 hover:text-black`}
                    title={formData.featuredImage === image ? 'Featured Image' : 'Set as Featured Image'}
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80"
                    title="Remove Image"
                  >
                    <FiTrash2 />
                  </button>
                </div>
                {formData.featuredImage === image && (
                  <div className="absolute top-2 right-2 bg-white/80 text-xs text-black px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <ImageUpload
            id="projectImage"
            label="Add Project Image"
            onChange={() => {}} // This is handled in onUpload
            onUpload={handleSingleImageUpload}
            helperText="Upload images for your project (up to 10MB each)"
            error={errors.images}
            maxSizeMB={10}
          />
        </FormSection>

        <FormSection title="Publishing Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="status"
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'planning', label: 'Planning' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            
            <div className="flex items-center h-full pt-6">
              <Checkbox
                id="featured"
                name="featured"
                label="Featured Project"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                helperText="Display this project in featured sections"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="SEO Settings">
          <TextInput
            id="seo.metaTitle"
            name="seo.metaTitle"
            label="Meta Title"
            value={formData.seo.metaTitle}
            onChange={handleChange}
            placeholder="Enter meta title"
            helperText="Leave blank to use the project title"
          />
          
          <TextArea
            id="seo.metaDescription"
            name="seo.metaDescription"
            label="Meta Description"
            value={formData.seo.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description"
            rows={2}
            helperText="Brief description for search engines"
          />
          
          <TextInput
            id="seo.keywords"
            name="seo.keywords"
            label="Keywords"
            value={formData.seo.keywords}
            onChange={handleChange}
            placeholder="Enter keywords separated by commas"
            helperText="Keywords for search engines"
          />
        </FormSection>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-white/20 rounded-lg text-white bg-black/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors duration-150 flex items-center"
          >
            <span className="flex items-center">
              <FiX className="mr-2" />
              Cancel
            </span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                {isEditMode ? 'Update Project' : 'Save Project'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 