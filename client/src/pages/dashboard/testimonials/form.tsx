import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUsers, FiStar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Checkbox, 
  FormSection, 
  FormActions 
} from '../../../components/ui/dashboard/form-elements';
import ImageUpload from '../../../components/ui/dashboard/image-upload';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

const TestimonialForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { fetchTestimonial, createTestimonial, updateTestimonial } = useAdmin();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    testimonial: '',
    rating: 5,
    avatar: '',
    featured: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch testimonial data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      
      fetchTestimonial(id)
        .then(response => {
          const item = response.testimonial;
          
          if (item) {
            setFormData({
              name: item.name || '',
              position: item.position || '',
              company: item.company || '',
              testimonial: item.testimonial || '',
              rating: item.rating || 5,
              avatar: item.avatar || '',
              featured: item.featured || false,
            });
          } else {
            toast.error('Testimonial not found');
            navigate('/dashboard/testimonials');
          }
        })
        .catch(error => {
          console.error('Error fetching testimonial:', error);
          toast.error('Failed to load testimonial');
          navigate('/dashboard/testimonials');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isEditMode, navigate, fetchTestimonial]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
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

  // Handle image file selection
  const handleFileChange = (imageUrl: string) => {
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        avatar: imageUrl
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.testimonial.trim()) {
      newErrors.testimonial = 'Testimonial content is required';
    }
    
    if (!isEditMode && !formData.avatar) {
      newErrors.avatar = 'Avatar image is required';
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
      const testimonialData = new FormData();
      testimonialData.append('name', formData.name);
      testimonialData.append('position', formData.position);
      testimonialData.append('company', formData.company);
      testimonialData.append('testimonial', formData.testimonial);
      testimonialData.append('rating', formData.rating.toString());
      testimonialData.append('featured', formData.featured.toString());
      
      if (isEditMode && formData.avatar) {
        testimonialData.append('avatar', formData.avatar);
      }
      
      // Submit the form data
      if (isEditMode && id) {
        await updateTestimonial(id, testimonialData);
        toast.success('Testimonial updated successfully');
      } else {
        await createTestimonial(testimonialData);
        toast.success('Testimonial created successfully');
      }
      
      // Redirect to testimonials list
      navigate('/dashboard/testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Failed to save testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/dashboard/testimonials');
    }
  };

  // Star rating component
  const StarRatingInput: React.FC = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            className="focus:outline-none p-1"
          >
            <FiStar
              className={`w-6 h-6 ${
                star <= formData.rating ? 'text-white fill-current' : 'text-gray-500'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-300">{formData.rating} of 5</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <SectionHeader
          title={isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
          description="Loading..."
          icon={<FiUsers size={24} />}
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
        title={isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
        description={isEditMode ? "Update an existing testimonial" : "Add a new client testimonial"}
        icon={<FiUsers size={24} />}
      />

      <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 mt-6">
        <FormSection title="Client Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="name"
              name="name"
              label="Client Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client name"
              required
              error={errors.name}
            />
            
            <ImageUpload
              id="imageFile"
              label="Client Avatar"
              value={formData.avatar}
              onChange={handleFileChange}
              helperText="Upload a profile picture (square image recommended)"
              maxSizeMB={2}
              error={errors.avatar}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="position"
              name="position"
              label="Role/Position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Marketing Director"
              required
              error={errors.position}
            />
            
            <TextInput
              id="company"
              name="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., TechCorp Inc."
              required
              error={errors.company}
            />
          </div>
        </FormSection>

        <FormSection title="Testimonial Content">
          <TextArea
            id="testimonial"
            name="testimonial"
            label="Testimonial"
            value={formData.testimonial}
            onChange={handleChange}
            placeholder="Enter the client's testimonial here..."
            rows={6}
            required
            error={errors.testimonial}
          />
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-white mb-1">
              Rating
            </label>
            <StarRatingInput />
          </div>
        </FormSection>

        <FormSection title="Display Options">
          <div className="flex items-center">
            <Checkbox
              id="featured"
              name="featured"
              label="Featured Testimonial"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              helperText="Display this testimonial in featured sections"
            />
          </div>
        </FormSection>

        <FormActions
          primaryLabel={isEditMode ? 'Update Testimonial' : 'Save Testimonial'}
          onPrimaryClick={handleSubmit}
          secondaryLabel="Cancel"
          onSecondaryClick={handleCancel}
          isLoading={isSubmitting}
        />
      </form>
    </div>
  );
};

export default TestimonialForm;
