import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiEye, FiEdit, FiTrash2, FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    status: 'completed',
    featured: true,
    date: '2023-08-15',
    client: 'Self',
    liveUrl: 'https://example.com/ecommerce',
    repoUrl: 'https://github.com/example/ecommerce',
  },
  {
    id: '2',
    title: 'AI Chat Application',
    description: 'An AI-powered chat application that uses natural language processing to provide intelligent responses.',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'WebSockets'],
    status: 'completed',
    featured: true,
    date: '2023-07-22',
    client: 'Tech Startup',
    liveUrl: 'https://example.com/ai-chat',
    repoUrl: 'https://github.com/example/ai-chat',
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A productivity application for task management with drag-and-drop functionality and team collaboration features.',
    category: 'Web Development',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    status: 'in-progress',
    featured: false,
    date: '2023-09-05',
    client: 'Marketing Agency',
    liveUrl: 'https://example.com/task-app',
    repoUrl: 'https://github.com/example/task-app',
  },
  {
    id: '4',
    title: 'Portfolio Dashboard',
    description: 'A customizable portfolio dashboard for creative professionals to showcase their work and manage content.',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'completed',
    featured: true,
    date: '2023-06-30',
    client: 'Self',
    liveUrl: 'https://example.com/portfolio',
    repoUrl: 'https://github.com/example/portfolio',
  },
  {
    id: '5',
    title: 'Mobile Fitness App',
    description: 'A mobile application for tracking workouts, nutrition, and fitness goals with social features.',
    category: 'Mobile Development',
    technologies: ['React Native', 'Firebase', 'Redux'],
    status: 'planning',
    featured: false,
    date: '2023-10-01',
    client: 'Fitness Studio',
    liveUrl: '',
    repoUrl: 'https://github.com/example/fitness-app',
  },
];

// Status badge component
interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`}>
      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  );
};

// Technologies list component
interface TechnologiesListProps {
  technologies: string[];
}

const TechnologiesList: React.FC<TechnologiesListProps> = ({ technologies }) => {
  const displayTechnologies = technologies.slice(0, 3);
  const remaining = technologies.length - displayTechnologies.length;
  
  return (
    <div className="flex flex-wrap gap-1">
      {displayTechnologies.map((tech, index) => (
        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
          {tech}
        </span>
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          +{remaining} more
        </span>
      )}
    </div>
  );
};

const ProjectsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Filter projects based on search query and filters
  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter ? project.category === categoryFilter : true;
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(mockProjects.map(project => project.category))).map(category => ({
    value: category,
    label: category,
  }));

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Project',
      width: '30%',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">{row.description}</div>
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
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          {value}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'featured',
      header: 'Featured',
      render: (value: boolean) => (
        <span className={`${value ? 'text-yellow-500' : 'text-gray-400'}`}>
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/projects/form/${row.id}`}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/projects/${row.id}`}
            target="_blank"
            className="p-1 text-green-600 hover:text-green-800"
            title="View"
          >
            <FiEye size={18} />
          </Link>
          {row.liveUrl && (
            <a
              href={row.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-purple-600 hover:text-purple-800"
              title="Live Demo"
            >
              <FiExternalLink size={18} />
            </a>
          )}
          {row.repoUrl && (
            <a
              href={row.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-600 hover:text-gray-800"
              title="Repository"
            >
              <FiGithub size={18} />
            </a>
          )}
          <button
            onClick={() => handleDelete(row.id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Handle project deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      // In a real app, you would call an API to delete the project
      console.log(`Delete project with ID: ${id}`);
    }
  };

  // Handle row click
  const handleRowClick = (project: any) => {
    console.log('Clicked project:', project);
  };

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
              options={[
                { value: '', label: 'All Categories' },
                ...categories,
              ]}
            />
          </div>
          <div>
            <Select
              id="status"
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'completed', label: 'Completed' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'planning', label: 'Planning' },
                { value: 'archived', label: 'Archived' },
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
        onRowClick={handleRowClick}
        rowKey="id"
      />
    </div>
  );
};

export default ProjectsManagement;
