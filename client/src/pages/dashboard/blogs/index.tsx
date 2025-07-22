import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';

// Mock data for blogs
const mockBlogs = [
  {
    id: '1',
    title: 'Character Prefix Conditioning',
    category: 'Technology',
    status: 'published',
    author: 'Jacob',
    date: '2023-09-15',
    views: 1245,
  },
  {
    id: '2',
    title: 'Building a Modern Portfolio Website',
    category: 'Web Development',
    status: 'published',
    author: 'Jacob',
    date: '2023-08-22',
    views: 982,
  },
  {
    id: '3',
    title: 'Introduction to React Hooks',
    category: 'React',
    status: 'draft',
    author: 'Jacob',
    date: '2023-09-01',
    views: 0,
  },
  {
    id: '4',
    title: 'Mastering CSS Grid Layout',
    category: 'CSS',
    status: 'published',
    author: 'Jacob',
    date: '2023-07-18',
    views: 756,
  },
  {
    id: '5',
    title: 'The Future of Web Development',
    category: 'Technology',
    status: 'draft',
    author: 'Jacob',
    date: '2023-09-10',
    views: 0,
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

const BlogsManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Filter blogs based on search query and filters
  const filteredBlogs = mockBlogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? blog.status === statusFilter : true;
    const matchesCategory = categoryFilter ? blog.category === categoryFilter : true;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(mockBlogs.map(blog => blog.category))).map(category => ({
    value: category,
    label: category,
  }));

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Title',
      width: '30%',
      render: (value: string) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (value: string) => <span>{value}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: 'date',
      header: 'Date',
      render: (value: string) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'views',
      header: 'Views',
      render: (value: number) => (
        <div className="flex items-center">
          <FiEye className="mr-1 text-gray-400" />
          {value.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/blogs/form/${row.id}`}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/blogs/details/${row.id}`}
            target="_blank"
            className="p-1 text-green-600 hover:text-green-800"
            title="View"
          >
            <FiEye size={18} />
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

  // Handle blog deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      // In a real app, you would call an API to delete the blog
      console.log(`Delete blog with ID: ${id}`);
    }
  };

  // Handle row click
  const handleRowClick = (blog: any) => {
    console.log('Clicked blog:', blog);
  };

  return (
    <div className="py-6">
      <SectionHeader
        title="Blog Management"
        description="Create, edit and manage your blog posts"
        icon={<FiFileText size={24} />}
        actionLabel="Add New Post"
        actionPath="/dashboard/blogs/form"
      />

      {/* Filters and Search */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextInput
            id="search"
            label="Search Blogs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            type="text"
          />
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
      </Card>

      {/* Blog Posts Table */}
      <DataTable
        columns={columns}
        data={filteredBlogs}
        isLoading={isLoading}
        emptyMessage="No blog posts found"
        pagination={{
          pageSize: 10,
          totalItems: filteredBlogs.length,
          currentPage: currentPage,
          onPageChange: setCurrentPage,
        }}
        onRowClick={handleRowClick}
        rowKey="id"
      />
    </div>
  );
};

export default BlogsManagement;
