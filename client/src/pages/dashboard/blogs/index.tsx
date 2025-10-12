import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiEye, FiEdit, FiTrash2, FiStar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { TableSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

// Status badge component
interface StatusBadgeProps {
  status: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status ? 'Published' : 'Draft'}
    </span>
  );
};

// Featured badge component
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

const BlogsManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [publishedFilter, setPublishedFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{value: string, label: string}[]>([
    { value: '', label: 'All Categories' }
  ]);
  
  const { fetchBlogs, deleteBlog, toggleBlogPublished, toggleBlogFeatured } = useAdmin();

  // Fetch blogs
  useEffect(() => {
    const getBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchBlogs();
        if (response?.data?.blogs) {
          setBlogs(response.data?.blogs);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(response?.blogs?.map((blog: any) => blog.category))
          ).map(category => ({
            value: category as string,
            label: category as string,
          }));
          
          setCategories([
            { value: '', label: 'All Categories' },
            ...uniqueCategories
          ]);
        } else {
          setError('No blogs found');
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setIsLoading(false);
      }
    };
    
    getBlogs();
  }, [fetchBlogs]);

  // Filter blogs based on search query and filters
  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.subtitle && blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPublished = publishedFilter === '' ? true : 
      publishedFilter === 'published' ? blog.published : !blog.published;
    
    const matchesFeatured = featuredFilter === '' ? true : 
      featuredFilter === 'featured' ? blog.featured : !blog.featured;
    
    const matchesCategory = categoryFilter ? blog.category === categoryFilter : true;
    
    return matchesSearch && matchesPublished && matchesFeatured && matchesCategory;
  });

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Title',
      width: '30%',
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium text-white flex items-center">
            {value} 
            <div className="ml-2">
              <FeaturedBadge featured={row.featured} />
            </div>
          </div>
          <div className="text-sm text-gray-400 truncate max-w-xs">{row.subtitle}</div>
        </div>
      ),
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
      key: 'published',
      header: 'Status',
      render: (value: boolean, row: any) => (
        <button
          onClick={() => handleTogglePublished(row._id)}
          className="flex items-center"
          title={value ? "Published (click to unpublish)" : "Draft (click to publish)"}
          disabled={isLoading}
        >
          <StatusBadge status={value} />
        </button>
      ),
    },
    {
      key: 'author',
      header: 'Author',
      render: (value: string) => <span className="text-gray-300">{value}</span>,
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (value: string) => (
        <span className="text-gray-300">{new Date(value).toLocaleDateString()}</span>
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
          {value ? <FiStar className="fill-current" /> : <FiStar />}
        </button>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Link
            to={`/dashboard/blogs/form/${row._id}`}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FiEdit size={18} />
          </Link>
          <Link
            to={`/blogs/${row.slug}`}
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
            disabled={isLoading}
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Handle blog deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        setIsLoading(true);
        await deleteBlog(id);
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
        toast.success('Blog deleted successfully');
      } catch (error) {
        console.error('Failed to delete blog:', error);
        toast.error('Failed to delete blog');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle toggle published
  const handleTogglePublished = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleBlogPublished(id);
      
      // Update local state
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog._id === id ? { ...blog, published: !blog.published } : blog
        )
      );
      
      toast.success('Blog published status updated');
    } catch (error) {
      console.error('Failed to update published status:', error);
      toast.error('Failed to update published status');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleBlogFeatured(id);
      
      // Update local state
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog._id === id ? { ...blog, featured: !blog.featured } : blog
        )
      );
      
      toast.success('Blog featured status updated');
    } catch (error) {
      console.error('Failed to update featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className="py-6">
        <SectionHeader
          title="Blog Management"
          description="Create, edit and manage your blog posts"
          icon={<FiFileText size={24} />}
        />
        <TableSkeleton rows={5} columns={6} />
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TextInput
            id="search"
            label="Search Blogs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or subtitle..."
            type="text"
          />
          <Select
            id="published"
            label="Status"
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'published', label: 'Published' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
          <Select
            id="featured"
            label="Featured"
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            options={[
              { value: '', label: 'All Posts' },
              { value: 'featured', label: 'Featured' },
              { value: 'not-featured', label: 'Not Featured' },
            ]}
          />
          <Select
            id="category"
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categories}
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
        onRowClick={() => {}}
        rowKey="_id"
      />
    </div>
  );
};

export default BlogsManagement;
