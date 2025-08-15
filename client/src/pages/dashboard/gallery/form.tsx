import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiImage } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection, 
  FormActions 
} from '../../../components/ui/dashboard/form-elements';
import ImageUpload from '../../../components/ui/dashboard/image-upload';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

const GalleryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { fetchGalleryItem, createGalleryItem, updateGalleryItem } = useAdmin();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    featured: false,
    order: 0,
  });
  // Fixed: Now properly managing the imageFile state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories] = useState<{value: string, label: string}[]>([
    { value: '', label: 'Select a category' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Nature', label: 'Nature' },
    { value: 'Urban', label: 'Urban' },
    { value: 'Art', label: 'Art' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Food', label: 'Food' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Portrait', label: 'Portrait' },
    { value: 'Design', label: 'Design' },
    { value: 'Other', label: 'Other' },
  ]);

  // Fetch gallery item data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      
      fetchGalleryItem(id)
        .then(response => {
          const item = response.gallery;
          
          if (item) {
            setFormData({
              title: item.title || '',
              description: item.description || '',
              imageUrl: item.imageUrl || '',
              category: item.category || '',
              featured: item.featured || false,
              order: item.order || 0,
            });
          } else {
            toast.error('Gallery item not found');
            navigate('/dashboard/gallery');
          }
        })
        .catch(error => {
          console.error('Error fetching gallery item:', error);
          toast.error('Failed to load gallery item');
          navigate('/dashboard/gallery');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isEditMode, navigate, fetchGalleryItem]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'order') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseInt(value, 10)
      }));
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

  // Fixed: Handle both file and URL from ImageUpload component
  const handleFileChange = (url: string, file?: File) => {
    if (file) {
      // New file selected
      setImageFile(file);
      setFormData(prev => ({
        ...prev,
        imageUrl: url // This will be a preview URL
      }));
    } else if (url === '') {
      // File removed
      setImageFile(null);
      setFormData(prev => ({
        ...prev,
        imageUrl: ''
      }));
    } else {
      // URL provided (for edit mode)
      setFormData(prev => ({
        ...prev,
        imageUrl: url
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!isEditMode && !imageFile && !formData.imageUrl) {
      newErrors.imageFile = 'Image is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for API
      const galleryData = new FormData();
      galleryData.append('title', formData.title);
      galleryData.append('description', formData.description);
      galleryData.append('category', formData.category);
      galleryData.append('order', formData.order.toString());
      galleryData.append('featured', formData.featured.toString());
      
      // Fixed: Properly handle file upload
      if (imageFile) {
        // New file to upload
        galleryData.append('imageFile', imageFile);
      } else if (isEditMode && formData.imageUrl && !imageFile) {
        // Existing image URL (no new file selected)
        galleryData.append('imageUrl', formData.imageUrl);
      }
      
      // Submit the form data
      if (isEditMode && id) {
        await updateGalleryItem(id, galleryData);
        toast.success('Gallery item updated successfully');
      } else {
        await createGalleryItem(galleryData);
        toast.success('Gallery item created successfully');
      }
      
      // Redirect to gallery list
      navigate('/dashboard/gallery');
      
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Failed to save gallery item');
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
        <SectionHeader
          title={isEditMode ? "Edit Gallery Image" : "Add New Gallery Image"}
          description="Loading..."
          icon={<FiImage size={24} />}
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
        title={isEditMode ? "Edit Gallery Image" : "Add New Gallery Image"}
        description={isEditMode ? "Update an existing gallery image" : "Add a new image to your gallery"}
        icon={<FiImage size={24} />}
      />

      <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 mt-6">
        <FormSection title="Image Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter image title"
              required
              error={errors.title}
            />
            
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
            label="Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description for this image"
            rows={3}
          />
        </FormSection>

        <FormSection title="Image">
          <ImageUpload
            id="imageFile"
            label="Gallery Image"
            value={formData.imageUrl}
            onChange={handleFileChange}
            helperText="Upload a high-quality image (up to 10MB)"
            required={!isEditMode} // Only required for new items
            error={errors.imageFile}
            maxSizeMB={10}
          />
        </FormSection>

        <FormSection title="Display Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="order"
              name="order"
              label="Display Order"
              value={formData.order.toString()}
              onChange={handleChange}
              type="number"
              helperText="Lower numbers appear first (0 = use default ordering)"
            />
            
            <div className="flex items-center h-full pt-6">
              <Checkbox
                id="featured"
                name="featured"
                label="Featured Image"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                helperText="Display this image in featured sections"
              />
            </div>
          </div>
        </FormSection>

        <FormActions
          primaryLabel={isEditMode ? "Update Image" : "Save Image"}
          secondaryLabel="Cancel"
          onPrimaryClick={handleSubmit}
          onSecondaryClick={handleCancel}
          isLoading={isSubmitting}
        />
      </form>
    </div>
  );
};

export default GalleryForm;