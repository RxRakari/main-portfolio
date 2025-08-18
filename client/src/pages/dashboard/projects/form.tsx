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
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

// Project form data interface
interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  technologies: string[];
  newTechnology: string;
  images: {
    url: string;
    cloudinaryId?: string;
    isLocal?: boolean;
    file?: File; // Add file reference for new uploads
  }[];
  featuredImageUrl: string;
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  approach: string;
  challenges: string;
  features: string[];
  newFeature: string;
}

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { fetchProject, createProject, updateProject } = useAdmin();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    category: '',
    technologies: [],
    newTechnology: '',
    images: [],
    featuredImageUrl: '',
    featured: false,
    githubUrl: '',
    liveUrl: '',
    approach: '',
    challenges: '',
    features: [],
    newFeature: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories] = useState([
    { value: '', label: 'Select a category' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'AI/ML', label: 'AI/ML' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Other', label: 'Other' },
  ]);

  // Fetch project data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      
      fetchProject(id)
        .then(response => {
          const project = response?.data?.project;
          
          if (project) {
            setFormData({
              title: project.title || '',
              slug: project.slug || '',
              description: project.description || '',
              category: project.category || '',
              technologies: project.technologies || [],
              newTechnology: '',
              images: project.images ? project.images.map((img: any) => ({
                url: img.url,
                cloudinaryId: img.cloudinaryId,
                isLocal: false
              })) : [],
              featuredImageUrl: project.images && project.images.length > 0 ? project.images[0].url : '',
              featured: project.featured || false,
              githubUrl: project.githubUrl || '',
              liveUrl: project.liveUrl || '',
              approach: project.approach || '',
              challenges: project.challenges || '',
              features: project.features || [],
              newFeature: '',
            });
          } else {
            toast.error('Project not found');
            navigate('/dashboard/projects');
          }
        })
        .catch(error => {
          console.error('Error fetching project:', error);
          toast.error('Failed to load project');
          navigate('/dashboard/projects');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isEditMode, navigate, fetchProject]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  // Fixed: Handle image file selection - now properly handles File objects
  const handleImageChange = (imageUrl: string, file?: File) => {
    if (imageUrl && file) {
      // New file uploaded
      const newImage = {
        url: imageUrl, // This will be a blob URL for preview
        isLocal: true,
        file: file // Store the actual file for upload
      };
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage],
        // If no featured image is set, use this as the featured image
        featuredImageUrl: prev.featuredImageUrl || imageUrl
      }));
    } else if (imageUrl === '') {
      // File was removed (handled by removeImage function)
      return;
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      const removedImage = newImages.splice(index, 1)[0];
      
      // If we're removing the featured image, set a new one if available
      let newFeaturedImageUrl = prev.featuredImageUrl;
      if (removedImage.url === prev.featuredImageUrl) {
        newFeaturedImageUrl = newImages.length > 0 ? newImages[0].url : '';
      }
      
      // Revoke blob URL to prevent memory leaks
      if (removedImage.isLocal && removedImage.url.startsWith('blob:')) {
        URL.revokeObjectURL(removedImage.url);
      }
      
      return {
        ...prev,
        images: newImages,
        featuredImageUrl: newFeaturedImageUrl
      };
    });
  };

  // Set featured image
  const setAsFeaturedImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      featuredImageUrl: imageUrl
    }));
  };

  // Add feature
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

  // Remove feature
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
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    if (!formData.featuredImageUrl && formData.images.length > 0) {
      // Auto-select the first image as featured if none is selected
      setFormData(prev => ({
        ...prev,
        featuredImageUrl: prev.images[0].url
      }));
    }
    
    if (!formData.approach.trim()) {
      newErrors.approach = 'Approach is required';
    }
    
    if (!formData.challenges.trim()) {
      newErrors.challenges = 'Challenges is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0);
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const projectData = new FormData();
      
      // Add basic fields
      projectData.append('title', formData.title);
      projectData.append('slug', formData.slug);
      projectData.append('description', formData.description);
      projectData.append('category', formData.category);
      projectData.append('technologies', JSON.stringify(formData.technologies));
      projectData.append('featured', formData.featured.toString());
      projectData.append('githubUrl', formData.githubUrl);
      projectData.append('liveUrl', formData.liveUrl);
      projectData.append('approach', formData.approach);
      projectData.append('challenges', formData.challenges);
      projectData.append('features', JSON.stringify(formData.features));
      
      // Handle existing images for edit mode
      if (isEditMode) {
        const existingImages = formData.images
          .filter(img => !img.isLocal && img.url && !img.url.startsWith('blob:'))
          .map(img => ({
            url: img.url,
            cloudinaryId: img.cloudinaryId
          }));
        projectData.append('existingImages', JSON.stringify(existingImages));
      }
      
      // Add new image files for upload
      const newImageFiles = formData.images
        .filter(img => img.isLocal && img.file)
        .map(img => img.file!);
      
      for (const file of newImageFiles) {
        // Server expects multer field name 'images' (upload.array('images', 10))
        projectData.append('images', file);
      }
      
      // Add featured image info
      const featuredImageIndex = formData.images.findIndex(img => img.url === formData.featuredImageUrl);
      if (featuredImageIndex !== -1) {
        projectData.append('featuredImageIndex', featuredImageIndex.toString());
      }
      
      // Submit the form
      if (isEditMode && id) {
        await updateProject(id, projectData);
        toast.success('Project updated successfully');
      } else {
        await createProject(projectData);
        toast.success('Project created successfully');
      }
      
      // Clean up blob URLs
      formData.images.forEach(img => {
        if (img.isLocal && img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });
      
      // Redirect to project list
      navigate('/dashboard/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      // Clean up blob URLs
      formData.images.forEach(img => {
        if (img.isLocal && img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });
      navigate('/dashboard/projects');
    }
  };

  // Clean up blob URLs on component unmount
  useEffect(() => {
    return () => {
      formData.images.forEach(img => {
        if (img.isLocal && img.url.startsWith('blob:')) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, []);

  if (isLoading) {
    return (
      <div className="py-6">
        <SectionHeader
          title={isEditMode ? "Edit Project" : "Create New Project"}
          description="Loading..."
          icon={<FiFolder size={24} />}
        />
        <div className="mt-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white/5 rounded-md w-3/4"></div>
            <div className="h-64 bg-white/5 rounded-md"></div>
            <div className="h-32 bg-white/5 rounded-md"></div>
          </div>
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

      <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 mt-6">
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
              options={categories}
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
            id="approach"
            name="approach"
            label="Approach"
            value={formData.approach}
            onChange={handleChange}
            placeholder="Describe your approach to this project"
            rows={4}
            required
            error={errors.approach}
          />

          <TextArea
            id="challenges"
            name="challenges"
            label="Challenges"
            value={formData.challenges}
            onChange={handleChange}
            placeholder="Describe challenges faced and how you overcame them"
            rows={4}
            required
            error={errors.challenges}
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
                  src={image.url}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAsFeaturedImage(image.url)}
                    className={`p-2 rounded-full ${
                      formData.featuredImageUrl === image.url ? 'bg-white/80' : 'bg-black/50'
                    } ${formData.featuredImageUrl === image.url ? 'text-black' : 'text-white'} hover:bg-white/60 hover:text-black`}
                    title={formData.featuredImageUrl === image.url ? 'Featured Image' : 'Set as Featured Image'}
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-red-500/80"
                    title="Remove Image"
                  >
                    <FiTrash2 />
                  </button>
                </div>
                {formData.featuredImageUrl === image.url && (
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
            onChange={handleImageChange}
            helperText="Upload images for your project (up to 10MB each)"
            maxSizeMB={10}
          />
        </FormSection>

        <FormSection title="Links">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="githubUrl"
              name="githubUrl"
              label="GitHub Repository URL"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
            />
            
            <TextInput
              id="liveUrl"
              name="liveUrl"
              label="Live Demo URL"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </FormSection>

        <FormSection title="Publishing Options">
          <div className="flex items-center">
            <Checkbox
              id="featured"
              name="featured"
              label="Featured Project"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              helperText="Display this project in featured sections"
            />
          </div>
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