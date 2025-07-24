import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiEye, FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';

// Mock data for experiences
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

// Format date helper
const formatDate = (dateString: string): string => {
  if (dateString === 'Present') return 'Present';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Status badge component
interface FeaturedBadgeProps {
  featured: boolean;
}

const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({ featured }) => {
  if (!featured) return null;
  
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white">
      Featured
    </span>
  );
};

// Technologies list component
interface TechnologiesListProps {
  technologies: string[];
}

const TechnologiesList: React.FC<TechnologiesListProps> = ({ technologies }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {technologies.map((tech, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

const ExperienceManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Filter experiences based on search query and filters
  const filteredExperiences = mockExperiences.filter((experience) => {
    const matchesSearch = 
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFeatured = featuredFilter === '' ? true : 
      featuredFilter === 'featured' ? experience.featured : !experience.featured;
    
    return matchesSearch && matchesFeatured;
  });

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Position',
      width: '30%',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-white flex items-center">
            {value} 
            <div className="ml-2">
              <FeaturedBadge featured={row.featured} />
            </div>
          </div>
          <div className="text-sm text-gray-400">{row.company} • {row.location}</div>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (_: any, row: any) => (
        <div className="flex items-center text-gray-300">
          <FiCalendar className="mr-1 text-gray-400" />
          <span>
            {formatDate(row.startDate)} - {row.isCurrent ? 'Present' : formatDate(row.endDate)}
          </span>
        </div>
      ),
    },
    {
      key: 'technologies',
      header: 'Technologies',
      render: (value: string[]) => <TechnologiesList technologies={value} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/experience/form/${row.id}`}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/experience/${row.id}`}
            target="_blank"
            className="p-1 text-green-400 hover:text-green-300"
            title="View"
          >
            <FiEye size={18} />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 text-red-400 hover:text-red-300"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Handle experience deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      // In a real app, you would call an API to delete the experience
      console.log(`Delete experience with ID: ${id}`);
    }
  };

  // Handle row click
  const handleRowClick = (experience: any) => {
    console.log('Clicked experience:', experience);
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Experience Management"
        description="Create, edit and manage your professional experience"
        icon={<FiBriefcase size={24} />}
        actionLabel="Add New Experience"
        actionPath="/dashboard/experience/form"
      />

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            id="search"
            label="Search Experiences"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or technology..."
            type="text"
          />
          <Select
            id="featured"
            label="Filter"
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            options={[
              { value: '', label: 'All Experiences' },
              { value: 'featured', label: 'Featured Only' },
              { value: 'not-featured', label: 'Not Featured' },
            ]}
          />
        </div>
      </Card>

      {/* Experiences Table */}
      <DataTable
        columns={columns}
        data={filteredExperiences}
        isLoading={isLoading}
        emptyMessage="No experiences found"
        pagination={{
          pageSize: 10,
          totalItems: filteredExperiences.length,
          currentPage: currentPage,
          onPageChange: setCurrentPage,
        }}
        onRowClick={handleRowClick}
        rowKey="id"
      />
    </div>
  );
};

export default ExperienceManagement;
