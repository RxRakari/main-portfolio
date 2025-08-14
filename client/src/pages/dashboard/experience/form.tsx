import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiBriefcase, FiPlus, FiTrash2 } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Checkbox,
  FormSection,
  FormActions
} from '../../../components/ui/dashboard/form-elements';
import { FormSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';

// List of common technologies for suggestions
const commonTechnologies = [
  'React', 'Angular', 'Vue', 'JavaScript', 'TypeScript', 
  'HTML', 'CSS', 'SCSS', 'Tailwind CSS', 'Bootstrap',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL',
  'GraphQL', 'REST API', 'Redux', 'MobX', 'React Query',
  'Jest', 'Cypress', 'Webpack', 'Vite', 'Docker',
  'AWS', 'Firebase', 'Git', 'GitHub', 'CI/CD'
];

// Interface for form data
interface ExperienceFormData {
  id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  period?: string; // Calculated field for landing page
  description: string;
  achievements: string[];
  technologies: string[];
  order: number;
  featured: boolean;
}

// Empty form data for new experiences
const emptyFormData: ExperienceFormData = {
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  achievements: [''],
  technologies: [],
  order: 0,
  featured: false,
};

// Function to format date to YYYY
const formatYearFromDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

// Function to generate period string from dates
const generatePeriod = (startDate: string, endDate: string, current: boolean): string => {
  const startYear = formatYearFromDate(startDate);
  const endYear = current ? 'Present' : formatYearFromDate(endDate);
  return startYear && (endYear || current) ? `${startYear} - ${endYear}` : '';
};

const ExperienceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ExperienceFormData>(emptyFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [newTechnology, setNewTechnology] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { fetchExperience, createExperience, updateExperience } = useAdmin();

  const isEditMode = Boolean(id);

  // Fetch experience data if in edit mode
  useEffect(() => {
    const getExperience = async () => {
      if (isEditMode) {
        try {
          setIsFetching(true);
          
          const response = await fetchExperience(id as string);
          const experience = response.experience;
          
          if (experience) {
            setFormData({
              id: experience.id,
              title: experience.title,
              company: experience.company,
              location: experience.location,
              startDate: experience.startDate,
              endDate: experience.current ? '' : experience.endDate || '',
              current: experience.current,
              period: experience.period,
              description: experience.description,
              achievements: experience.achievements,
              technologies: experience.technologies,
              order: experience.order || 0,
              featured: experience.featured,
            });
          } else {
            // Experience not found
            navigate('/dashboard/experience');
          }
        } catch (error) {
          console.error('Failed to fetch experience:', error);
          navigate('/dashboard/experience');
        } finally {
          setIsFetching(false);
        }
      } else {
        // For new experience, just set loading to false
        setIsFetching(false);
      }
    };
    
    getExperience();
  }, [id, isEditMode, navigate, fetchExperience]);

  // Update period whenever dates or current status changes
  useEffect(() => {
    const period = generatePeriod(formData.startDate, formData.endDate, formData.current);
    setFormData(prev => ({ ...prev, period }));
  }, [formData.startDate, formData.endDate, formData.current]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle order change
  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFormData(prev => ({ ...prev, order: value }));
  };

  // Handle achievements changes
  const handleAchievementChange = (index: number, value: string) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = value;
    setFormData(prev => ({ ...prev, achievements: updatedAchievements }));
  };

  // Add new achievement
  const addAchievement = () => {
    setFormData(prev => ({ ...prev, achievements: [...prev.achievements, ''] }));
  };

  // Remove achievement
  const removeAchievement = (index: number) => {
    const updatedAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, achievements: updatedAchievements }));
  };

  // Add technology
  const addTechnology = () => {
    if (newTechnology && !formData.technologies.includes(newTechnology)) {
      setFormData(prev => ({ 
        ...prev, 
        technologies: [...prev.technologies, newTechnology] 
      }));
      setNewTechnology('');
    }
  };

  // Remove technology
  const removeTechnology = (tech: string) => {
    const updatedTechnologies = formData.technologies.filter(t => t !== tech);
    setFormData(prev => ({ ...prev, technologies: updatedTechnologies }));
  };

  // Select from common technologies
  const selectTechnology = (tech: string) => {
    if (!formData.technologies.includes(tech)) {
      setFormData(prev => ({ 
        ...prev, 
        technologies: [...prev.technologies, tech] 
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.current && !formData.endDate) {
      newErrors.endDate = 'End date is required if not current position';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.achievements.some(a => !a.trim())) {
      newErrors.achievements = 'All achievements must have content';
    }
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Prepare data for API submission
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('company', formData.company);
    formDataObj.append('location', formData.location);
    formDataObj.append('startDate', formData.startDate);
    formDataObj.append('endDate', formData.endDate);
    formDataObj.append('current', String(formData.current));
    formDataObj.append('period', formData.period || generatePeriod(formData.startDate, formData.endDate, formData.current));
    formDataObj.append('description', formData.description);
    formDataObj.append('achievements', JSON.stringify(formData.achievements));
    formDataObj.append('technologies', JSON.stringify(formData.technologies));
    formDataObj.append('order', String(formData.order));
    formDataObj.append('featured', String(formData.featured));
    
    try {
      if (isEditMode) {
        await updateExperience(id as string, formDataObj);
      } else {
        await createExperience(formDataObj);
      }
      
      navigate('/dashboard/experience');
    } catch (error) {
      console.error('Failed to save experience:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate('/dashboard/experience');
  };

  if (isFetching) {
    return (
      <div className="py-6">
        <SectionHeader
          title={isEditMode ? 'Edit Experience' : 'Add New Experience'}
          description={isEditMode ? 'Update your professional experience details' : 'Add a new professional experience to your portfolio'}
          icon={<FiBriefcase size={24} />}
        />
        <FormSkeleton />
      </div>
    );
  }

  return (
    <div className="py-6">
      <SectionHeader
        title={isEditMode ? 'Edit Experience' : 'Add New Experience'}
        description={isEditMode ? 'Update your professional experience details' : 'Add a new professional experience to your portfolio'}
        icon={<FiBriefcase size={24} />}
      />

      <form onSubmit={handleSubmit}>
        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="title"
              name="title"
              label="Position Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Frontend Developer"
              required
              error={errors.title}
            />
            <TextInput
              id="company"
              name="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Tech Innovations Inc."
              required
              error={errors.company}
            />
          </div>
          <TextInput
            id="location"
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA or Remote"
            required
            error={errors.location}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextInput
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                error={errors.startDate}
              />
            </div>
            <div>
              <TextInput
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.current}
                required={!formData.current}
                error={errors.endDate}
              />
              <Checkbox
                id="current"
                name="current"
                label="This is my current position"
                checked={formData.current}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          
          {/* Display the generated period string */}
          <div className="mt-4">
            <TextInput
              id="period"
              name="period"
              label="Display Period (auto-generated)"
              value={formData.period || ''}
              onChange={() => {}} // Read-only
              disabled
              helperText="This is how the period will appear on your portfolio"
            />
          </div>
          
          <div className="mt-4">
            <TextInput
              id="order"
              name="order"
              label="Display Order"
              type="number"
              value={formData.order.toString()}
              onChange={handleOrderChange}
              helperText="Lower numbers appear first (0 is highest priority)"
            />
          </div>
        </FormSection>

        <FormSection title="Description & Achievements">
          <TextArea
            id="description"
            name="description"
            label="Job Description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your role, responsibilities, and the scope of your work..."
            rows={4}
            required
            error={errors.description}
          />

          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-white">
              Key Achievements
              {errors.achievements && (
                <span className="ml-2 text-red-400">{errors.achievements}</span>
              )}
            </label>
            
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-3">
                <TextInput
                  id={`achievement-${index}`}
                  name={`achievement-${index}`}
                  label=""
                  value={achievement}
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  placeholder="e.g. Increased site performance by 40%"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="ml-2 p-2 text-red-400 hover:text-red-300"
                  disabled={formData.achievements.length <= 1}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addAchievement}
              className="flex items-center mt-2 text-sm text-gray-300 hover:text-white"
            >
              <FiPlus className="mr-1" /> Add Another Achievement
            </button>
          </div>
        </FormSection>

        <FormSection title="Technologies & Visibility">
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Technologies Used
              {errors.technologies && (
                <span className="ml-2 text-red-400">{errors.technologies}</span>
              )}
            </label>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.technologies.map((tech) => (
                <div 
                  key={tech} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 text-white"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(tech)}
                    className="ml-2 text-gray-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex mb-4">
              <TextInput
                id="newTechnology"
                name="newTechnology"
                label=""
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a technology..."
              />
              <button
                type="button"
                onClick={addTechnology}
                className="ml-2 px-4 py-3 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 mt-0"
              >
                Add
              </button>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Common technologies:</p>
              <div className="flex flex-wrap gap-2">
                {commonTechnologies.slice(0, 10).map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => selectTechnology(tech)}
                    className={`px-2 py-1 text-xs rounded-full border ${
                      formData.technologies.includes(tech)
                        ? 'border-white/30 bg-white/20 text-white'
                        : 'border-white/10 bg-black/30 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Checkbox
              id="featured"
              name="featured"
              label="Feature this experience on your portfolio"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              helperText="Featured experiences will be highlighted and shown prominently on your portfolio."
            />
          </div>
        </FormSection>

        {/* FIXED: Using onSubmit instead of onPrimaryClick for the primary button */}
        <FormActions
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitLabel={isEditMode ? 'Update Experience' : 'Save Experience'}
          cancelLabel="Cancel"
          isSubmitting={isLoading}
        />
      </form>
    </div>
  );
};

export default ExperienceForm;