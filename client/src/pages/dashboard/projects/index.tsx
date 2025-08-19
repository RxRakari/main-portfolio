import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiEye, FiEdit, FiTrash2, FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { TableSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';
import DeleteModal from '../../../components/modals/delete-modal';

// Status badge component
interface StatusBadgeProps {
  featured: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ featured }) => {
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
  if (!technologies || !technologies.length) return null;
  
  const displayTechnologies = technologies.slice(0, 3);
  const remaining = technologies.length - displayTechnologies.length;
  
  return (
    <div className="flex flex-wrap gap-1">
      {displayTechnologies.map((tech, index) => (
        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300 border border-white/20">
          +{remaining} more
        </span>
      )}
    </div>
  );
};

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<{value: string, label: string}[]>([
    { value: '', label: 'All Categories' }
  ]);
  
  const { fetchProjects, deleteProject, toggleProjectFeatured } = useAdmin();

  // Fetch projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchProjects();
        if (response?.data?.projects) {
          setProjects(response.data?.projects);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(response?.data.projects.map((project: any) => project.category))
          ).map(category => ({
            value: category as string,
            label: category as string,
          }));
          
          setCategories([
            { value: '', label: 'All Categories' },
            ...uniqueCategories
          ]);
        } else {
          setError('No projects found');
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };
    
    getProjects();
  }, [fetchProjects]);

  // Filter projects based on search query and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.technologies && project.technologies.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = categoryFilter ? project.category === categoryFilter : true;
    const matchesFeatured = featuredFilter === '' ? true : 
      featuredFilter === 'featured' ? project.featured : !project.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Project',
      width: '30%',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-white flex items-center">
            {value}
            <div className="ml-2">
              <StatusBadge featured={row.featured} />
            </div>
          </div>
          <div className="text-sm text-gray-400 truncate max-w-xs">{row.description}</div>
        </div>
      ),
    },
    {
      key: 'technologies',
      header: 'Technologies',
      render: (value: string[]) => <TechnologiesList technologies={value} />,
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-white border border-white/10">
          {value}
        </span>
      ),
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (value: boolean, row: any) => (
        <button
          onClick={() => handleToggleFeatured(row._id)}
          className={`${value ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-300`}
          disabled={isLoading}
        >
          {value ? 'Yes' : 'No'}
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/projects/form/${row._id}`}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/projects/${row.slug}`}
            target="_blank"
            className="p-1 text-green-400 hover:text-green-300"
            title="View"
          >
            <FiEye size={18} />
          </Link>
          {row.liveUrl && (
            <a
              href={row.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-purple-400 hover:text-purple-300"
              title="Live Demo"
            >
              <FiExternalLink size={18} />
            </a>
          )}
          {row.githubUrl && (
            <a
              href={row.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-gray-300"
              title="Repository"
            >
              <FiGithub size={18} />
            </a>
          )}
          <button
  onClick={() => setSelectedId(row._id)}
  className="p-1 text-red-400 hover:text-red-300"
  title="Delete"
  disabled={isLoading}
>
  <FiTrash2 size={18} />
</button>
        </div>
      ),
    },
  ];

  // Handle project deletion
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };
  

  // Handle toggle featured
  const handleToggleFeatured = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleProjectFeatured(id);
      
      // Update local state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project._id === id ? { ...project, featured: !project.featured } : project
        )
      );
      
      toast.success('Project featured status updated');
    } catch (error) {
      console.error('Failed to update featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && projects.length === 0) {
    return (
      <div className="py-6">
        <SectionHeader
          title="Project Management"
          description="Create, edit and manage your portfolio projects"
          icon={<FiFolder size={24} />}
        />
        <TableSkeleton rows={5} columns={5} />
      </div>
    );
  }

  return (
    <div className="py-6">
      <SectionHeader
        title="Project Management"
        description="Create, edit and manage your portfolio projects"
        icon={<FiFolder size={24} />}
        actionLabel="Add New Project"
        actionPath="/dashboard/projects/form"
      />

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <TextInput
              id="search"
              label="Search Projects"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description or technology..."
              type="text"
            />
          </div>
          <div>
            <Select
              id="category"
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={categories}
            />
          </div>
          <div>
            <Select
              id="featured"
              label="Featured"
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              options={[
                { value: '', label: 'All Projects' },
                { value: 'featured', label: 'Featured Only' },
                { value: 'not-featured', label: 'Not Featured' },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Projects Table */}
      <DataTable
        columns={columns}
        data={filteredProjects}
        isLoading={isLoading}
        emptyMessage="No projects found"
        pagination={{
          pageSize: 10,
          totalItems: filteredProjects.length,
          currentPage: currentPage,
          onPageChange: setCurrentPage,
        }}
        onRowClick={() => {}}
        rowKey="_id"
      />

      {error && !isLoading && projects.length === 0 && (
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-900/30 rounded-xl shadow-lg p-6 text-center mt-4">
          <h3 className="text-lg font-medium text-red-400">Error</h3>
          <p className="mt-1 text-sm text-red-300">{error}</p>
        </div>
      )}

<DeleteModal
  isOpen={!!selectedId}
  onClose={() => setSelectedId(null)}
  onConfirm={() => {
    if (selectedId) {
      handleDelete(selectedId);
    }
  }}
  title="Delete Project"
  message="Are you sure you want to delete this project? This action cannot be undone."
/>
    </div>
  );
};

export default ProjectsManagement;