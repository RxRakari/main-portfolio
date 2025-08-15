import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiEdit, FiTrash2, FiStar } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import DataTable from '../../../components/ui/dashboard/data-table';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { TableSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

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

const TestimonialsManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { fetchTestimonials, deleteTestimonial, toggleTestimonialPublished } = useAdmin();

  // Fetch testimonials
  useEffect(() => {
    const getTestimonials = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchTestimonials();
        if (response?.data?.testimonials) {
          setTestimonials(response.data?.testimonials);
        } else {
          setError('No testimonials found');
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setIsLoading(false);
      }
    };
    
    getTestimonials();
  }, [fetchTestimonials]);

  // Filter testimonials based on search query and filters
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch = 
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.testimonial.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFeatured = featuredFilter === '' ? true : 
      featuredFilter === 'featured' ? testimonial.featured : !testimonial.featured;
    
    return matchesSearch && matchesFeatured;
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
            <div className="font-medium text-white flex items-center">
              {value}
              <div className="ml-2">
                <FeaturedBadge featured={row.featured} />
              </div>
            </div>
            <div className="text-sm text-gray-400">{row.position} at {row.company}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'testimonial',
      header: 'Testimonial',
      width: '40%',
      render: (value: string) => (
        <p className="text-sm text-gray-300 truncate max-w-xs">{value}</p>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (value: number) => <StarRating rating={value} />,
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
            to={`/dashboard/testimonials/form/${row._id}`}
            className="p-1 text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            <FiEdit size={18} />
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

  // Handle testimonial deletion
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        setIsLoading(true);
        await deleteTestimonial(id);
        setTestimonials(prevTestimonials => prevTestimonials.filter(item => item._id !== id));
        toast.success('Testimonial deleted successfully');
      } catch (error) {
        console.error('Failed to delete testimonial:', error);
        toast.error('Failed to delete testimonial');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleTestimonialPublished(id);
      
      // Update local state
      setTestimonials(prevTestimonials => 
        prevTestimonials.map(item => 
          item._id === id ? { ...item, featured: !item.featured } : item
        )
      );
      
      toast.success('Testimonial featured status updated');
    } catch (error) {
      console.error('Failed to update featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && testimonials.length === 0) {
    return (
      <div className="py-6">
        <SectionHeader
          title="Testimonials Management"
          description="Manage client testimonials and reviews"
          icon={<FiUsers size={24} />}
        />
        <TableSkeleton rows={5} columns={4} />
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            id="search"
            label="Search Testimonials"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company or testimonial..."
            type="text"
          />
          <Select
            id="featured"
            label="Filter"
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            options={[
              { value: '', label: 'All Testimonials' },
              { value: 'featured', label: 'Featured Only' },
              { value: 'not-featured', label: 'Not Featured' },
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
        onRowClick={() => {}}
        rowKey="_id"
      />

      {error && !isLoading && (
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-900/30 rounded-xl shadow-lg p-6 text-center mt-4">
          <h3 className="text-lg font-medium text-red-400">Error</h3>
          <p className="mt-1 text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
