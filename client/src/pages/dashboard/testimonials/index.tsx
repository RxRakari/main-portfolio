import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiPlus, FiEdit, FiTrash2, FiStar, FiSearch } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';

// Mock data for testimonials
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
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'InnovateTech',
    content: 'The team was responsive, creative, and delivered exactly what we needed. They took the time to understand our requirements and translated them into an amazing product.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    featured: false,
    date: '2023-09-05',
    status: 'published',
  },
  {
    id: '4',
    name: 'David Wilson',
    role: 'CTO',
    company: 'DataSystems',
    content: 'Exceptional work on our complex data visualization project. The team showed great technical expertise and problem-solving abilities throughout the development process.',
    rating: 5,
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    featured: false,
    date: '2023-06-30',
    status: 'draft',
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Creative Director',
    company: 'DesignHub',
    content: 'As someone with high standards for design, I was thoroughly impressed with the creativity and execution. The collaboration was smooth, and they were receptive to feedback.',
    rating: 4,
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    featured: true,
    date: '2023-08-05',
    status: 'published',
  },
];

// Status badge component
interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Star rating component
interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <FiStar
          key={index}
          className={`${
            index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
          } w-4 h-4`}
        />
      ))}
    </div>
  );
};

const TestimonialsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter testimonials based on search query and filters
  const filteredTestimonials = mockTestimonials.filter((testimonial) => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? testimonial.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Table columns configuration
  const columns = [
    {
      key: 'name',
      header: 'Client',
      width: '25%',
      render: (value: string, row: any) => (
        <div className="flex items-center">
          <img
            src={row.avatar}
            alt={value}
            className="h-10 w-10 rounded-full mr-3 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=?';
            }}
          />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.role} at {row.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'content',
      header: 'Testimonial',
      width: '40%',
      render: (value: string) => (
        <p className="text-sm text-gray-600 truncate max-w-xs">{value}</p>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (value: number) => <StarRating rating={value} />,
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
            to={`/dashboard/testimonials/form/${row.id}`}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
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

  // Handle testimonial deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      // In a real app, you would call an API to delete the testimonial
      console.log(`Delete testimonial with ID: ${id}`);
    }
  };

  // Handle row click
  const handleRowClick = (testimonial: any) => {
    console.log('Clicked testimonial:', testimonial);
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Testimonials Management"
        description="Manage client testimonials and reviews"
        icon={<FiUsers size={24} />}
        actionLabel="Add New Testimonial"
        actionPath="/dashboard/testimonials/form"
      />

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TextInput
              id="search"
              label="Search Testimonials"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company or content..."
              type="text"
            />
          </div>
          <Select
            id="status"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
              { value: 'archived', label: 'Archived' },
            ]}
          />
        </div>
      </Card>

      {/* Testimonials Table */}
      <DataTable
        columns={columns}
        data={filteredTestimonials}
        isLoading={isLoading}
        emptyMessage="No testimonials found"
        pagination={{
          pageSize: 10,
          totalItems: filteredTestimonials.length,
          currentPage: currentPage,
          onPageChange: setCurrentPage,
        }}
        onRowClick={handleRowClick}
        rowKey="id"
      />
    </div>
  );
};

export default TestimonialsManagement;
