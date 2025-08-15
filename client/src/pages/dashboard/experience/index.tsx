import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiEye, FiEdit, FiTrash2, FiCalendar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { TableSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';

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
  const [experiences, setExperiences] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(error)
  
  const { fetchExperiences, deleteExperience } = useAdmin();

  // Fetch experiences
  useEffect(() => {
    const getExperiences = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchExperiences();
        if (response?.data.experiences) {
          setExperiences(response?.data.experiences);
        } else {
          setError('No experiences found');
        }
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
        setError('Failed to load experiences');
      } finally {
        setIsLoading(false);
      }
    };
    
    getExperiences();
  }, [fetchExperiences]);

  // Filter experiences based on search query and filters
  const filteredExperiences = experiences.filter((experience) => {
    const matchesSearch = 
      experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      experience.technologies.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
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
      key: 'period',
      header: 'Duration',
      render: (value: string) => (
        <div className="flex items-center text-gray-300">
          <FiCalendar className="mr-1 text-gray-400" />
          <span>{value}</span>
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
            to={`/dashboard/experience/form/${row._id}`}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/experience/${row._id}`}
            target="_blank"
            className="p-1 text-green-400 hover:text-green-300"
            title="View"
          >
            <FiEye size={18} />
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
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
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        setIsLoading(true);
        await deleteExperience(id);
        setExperiences(prevExperiences => prevExperiences.filter(exp => exp.id !== id));
      } catch (error) {
        console.error('Failed to delete experience:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle toggle featured
  // const handleToggleFeatured = async (id: string) => {
  //   try {
  //     setIsLoading(true);
  //     await toggleExperienceFeatured(id);
      
  //     // Update local state
  //     setExperiences(prevExperiences => 
  //       prevExperiences.map(exp => 
  //         exp.id === id ? { ...exp, featured: !exp.featured } : exp
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Failed to update featured status:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="py-6">
        <SectionHeader
          title="Experience Management"
          description="Create, edit and manage your professional experience"
          icon={<FiBriefcase size={24} />}
        />
        <TableSkeleton rows={5} columns={4} />
      </div>
    );
  }

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
            name="search"
            label="Search Experiences"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or technology..."
            type="text"
          />
          <Select
            id="featured"
            name="featured"
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
        onRowClick={() => {}}
        rowKey="id"
      />
    </div>
  );
};

export default ExperienceManagement;
