import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUsers, FiSave, FiX, FiStar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection, 
  FormActions 
} from '../../../components/ui/dashboard/form-elements';

// Mock testimonial data for editing
const mockTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp Inc.',
    content: 'Working with this team was an absolute pleasure. They delivered our project on time and exceeded our expectations. The attention to detail and creativity they brought to the table was impressive.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    featured: true,
    date: '2023-08-15',
    status: 'published',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'Startup Ventures',
    content: 'I was blown away by the quality of work and professionalism. Our website redesign project was handled with care and the results have significantly improved our conversion rates.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    featured: true,
    date: '2023-07-22',
    status: 'published',
  }
];

const TestimonialForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
    featured: false,
    status: 'draft',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch testimonial data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to fetch testimonial data
      setTimeout(() => {
        const testimonial = mockTestimonials.find(testimonial => testimonial.id === id);
        if (testimonial) {
          setFormData({
            name: testimonial.name,
            role: testimonial.role,
            company: testimonial.company,
            content: testimonial.content,
            rating: testimonial.rating,
            avatar: testimonial.avatar,
            featured: testimonial.featured,
            status: testimonial.status,
          });
        } else {
          // Testimonial not found, redirect to testimonials list
          navigate('/dashboard/testimonials');
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

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Testimonial content is required';
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
      // In a real app, you would call an API to save the testimonial
      console.log('Form data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to testimonials list
      navigate('/dashboard/testimonials');
    } catch (error) {
      console.error('Error saving testimonial:', error);
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
                star <= formData.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-500">{formData.rating} of 5</span>
      </div>
    );
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
        title={isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
        description={isEditMode ? "Update an existing testimonial" : "Add a new client testimonial"}
        icon={<FiUsers size={24} />}
      />

      <form onSubmit={handleSubmit}>
        <FormSection title="Client Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="name"
              label="Client Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client name"
              required
              error={errors.name}
            />
            
            <TextInput
              id="avatar"
              label="Avatar URL"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              type="url"
              helperText="URL to client's profile picture"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="role"
              label="Role/Position"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., Marketing Director"
            />
            
            <TextInput
              id="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., TechCorp Inc."
            />
          </div>
        </FormSection>

        <FormSection title="Testimonial Content">
          <TextArea
            id="content"
            label="Testimonial"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter the client's testimonial here..."
            rows={6}
            required
            error={errors.content}
          />
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <StarRatingInput />
          </div>
        </FormSection>

        <FormSection title="Display Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            
            <div className="flex items-center h-full pt-6">
              <Checkbox
                id="featured"
                label="Featured Testimonial"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                helperText="Display this testimonial in featured sections"
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
              {isEditMode ? 'Update Testimonial' : 'Save Testimonial'}
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

export default TestimonialForm;
