import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiImage, FiSave, FiX, FiUpload } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection, 
  FormActions 
} from '../../../components/ui/dashboard/form-elements';

// Mock gallery data for editing
const mockGalleryItems = [
  {
    id: '1',
    title: 'Modern Architecture',
    description: 'Contemporary building design with clean lines and geometric shapes.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Architecture',
    tags: ['modern', 'building', 'design'],
    featured: true,
    date: '2023-08-15',
    altText: 'Modern glass and steel building with geometric design',
    order: 1,
  },
  {
    id: '2',
    title: 'Nature Landscape',
    description: 'Beautiful mountain landscape with reflective lake.',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Nature',
    tags: ['mountains', 'lake', 'landscape'],
    featured: true,
    date: '2023-07-22',
    altText: 'Mountain range reflected in a calm lake',
    order: 2,
  }
];

const GalleryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    tags: '',
    featured: false,
    altText: '',
    order: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch gallery item data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to fetch gallery item data
      setTimeout(() => {
        const item = mockGalleryItems.find(item => item.id === id);
        if (item) {
          setFormData({
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            category: item.category,
            tags: item.tags.join(', '),
            featured: item.featured,
            altText: item.altText,
            order: item.order,
          });
        } else {
          // Gallery item not found, redirect to gallery list
          navigate('/dashboard/gallery');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode, navigate]);

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

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
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
      // In a real app, you would call an API to save the gallery item
      console.log('Form data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to gallery list
      navigate('/dashboard/gallery');
    } catch (error) {
      console.error('Error saving gallery item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/dashboard/gallery');
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
        title={isEditMode ? "Edit Gallery Image" : "Add New Gallery Image"}
        description={isEditMode ? "Update an existing gallery image" : "Add a new image to your gallery"}
        icon={<FiImage size={24} />}
      />

      <form onSubmit={handleSubmit}>
        <FormSection title="Image Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter image title"
              required
              error={errors.title}
            />
            
            <Select
              id="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a category' },
                { value: 'Architecture', label: 'Architecture' },
                { value: 'Nature', label: 'Nature' },
                { value: 'Urban', label: 'Urban' },
                { value: 'Art', label: 'Art' },
                { value: 'Technology', label: 'Technology' },
                { value: 'Food', label: 'Food' },
              ]}
              required
              error={errors.category}
            />
          </div>
          
          <TextArea
            id="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description for this image"
            rows={3}
          />
          
          <TextInput
            id="tags"
            label="Tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
            helperText="E.g., nature, landscape, mountains"
          />
        </FormSection>

        <FormSection title="Image">
          <TextInput
            id="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            type="url"
            required
            error={errors.imageUrl}
          />
          
          <TextInput
            id="altText"
            label="Alt Text"
            value={formData.altText}
            onChange={handleChange}
            placeholder="Descriptive text for accessibility"
            helperText="Describe the image for screen readers and SEO"
          />
          
          {formData.imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-md">
                <img 
                  src={formData.imageUrl} 
                  alt={formData.altText || "Preview"} 
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                  }}
                />
              </div>
            </div>
          )}
        </FormSection>

        <FormSection title="Display Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="order"
              label="Display Order"
              value={formData.order.toString()}
              onChange={handleChange}
              type="number"
              min="0"
              helperText="Lower numbers appear first (0 = use default ordering)"
            />
            
            <div className="flex items-center h-full pt-6">
              <Checkbox
                id="featured"
                label="Featured Image"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                helperText="Display this image in featured sections"
              />
            </div>
          </div>
        </FormSection>

        <FormActions
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel={
            <>
              <FiSave className="mr-2" />
              {isEditMode ? 'Update Image' : 'Save Image'}
            </>
          }
          cancelLabel={
            <>
              <FiX className="mr-2" />
              Cancel
            </>
          }
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default GalleryForm;
