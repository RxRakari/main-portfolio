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

// Mock data for experiences (same as in index.tsx)
const mockExperiences = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    startDate: '2021-06-01',
    endDate: 'Present',
    isCurrent: true,
    description: 'Leading the frontend development team in creating responsive web applications using React, TypeScript, and Tailwind CSS.',
    achievements: [
      'Improved application performance by 40% through code optimization',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Mentored 5 junior developers'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    featured: true,
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'Digital Solutions Ltd.',
    location: 'New York, NY',
    startDate: '2019-03-15',
    endDate: '2021-05-30',
    isCurrent: false,
    description: 'Developed and maintained multiple client-facing web applications focusing on performance and accessibility.',
    achievements: [
      'Built responsive UI components used across 12 different projects',
      'Reduced bundle size by 35% through code splitting and lazy loading',
      'Implemented automated testing increasing code coverage to 85%'
    ],
    technologies: ['React', 'JavaScript', 'SCSS', 'Jest'],
    featured: true,
  },
  {
    id: '3',
    title: 'Web Developer Intern',
    company: 'StartUp Vision',
    location: 'Remote',
    startDate: '2018-06-01',
    endDate: '2019-02-28',
    isCurrent: false,
    description: 'Assisted in developing and maintaining company website and client projects.',
    achievements: [
      'Developed responsive landing pages for 5 client projects',
      'Implemented analytics tracking improving conversion insights',
      'Collaborated with design team to improve UI/UX'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    featured: false,
  },
];

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
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  featured: boolean;
}

// Empty form data for new experiences
const emptyFormData: ExperienceFormData = {
  title: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
  achievements: [''],
  technologies: [],
  featured: false,
};

const ExperienceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ExperienceFormData>(emptyFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [newTechnology, setNewTechnology] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = Boolean(id);

  // Fetch experience data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch from an API
      const experience = mockExperiences.find(exp => exp.id === id);
      if (experience) {
        setFormData({
          id: experience.id,
          title: experience.title,
          company: experience.company,
          location: experience.location,
          startDate: experience.startDate,
          endDate: experience.isCurrent ? '' : experience.endDate,
          isCurrent: experience.isCurrent,
          description: experience.description,
          achievements: experience.achievements,
          technologies: experience.technologies,
          featured: experience.featured,
        });
      } else {
        // Experience not found
        navigate('/dashboard/experience');
      }
    }
  }, [id, isEditMode, navigate]);

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
    if (!formData.isCurrent && !formData.endDate) {
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // In a real app, you would submit to an API
    setTimeout(() => {
      console.log('Submitting experience:', formData);
      setIsLoading(false);
      navigate('/dashboard/experience');
    }, 1000);
  };

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
                disabled={formData.isCurrent}
                required={!formData.isCurrent}
                error={errors.endDate}
              />
              <Checkbox
                id="isCurrent"
                name="isCurrent"
                label="This is my current position"
                checked={formData.isCurrent}
                onChange={handleCheckboxChange}
              />
            </div>
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

        <FormActions
          primaryLabel={isEditMode ? 'Update Experience' : 'Save Experience'}
          secondaryLabel="Cancel"
          onSecondaryClick={() => navigate('/dashboard/experience')}
          isLoading={isLoading}
        />
      </form>
    </div>
  );
};

export default ExperienceForm;

