
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiImage, FiPlus, FiTrash2, FiEdit, FiGrid, FiList } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { TableSkeleton } from '../../../components/ui/dashboard/skeleton';
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

const GalleryManagement: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{value: string, label: string}[]>([]);

  const { fetchGalleryItems, deleteGalleryItem, toggleGalleryItemFeatured } = useAdmin();

  // Fetch gallery items
  useEffect(() => {
    const getGalleryItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetchGalleryItems();
        if (response?.data?.gallery) {
          setGalleryItems(response?.data?.gallery);
          
          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(response?.data?.gallery.map((item: any) => item.category))
          ).map(category => ({
            value: category as string,
            label: category as string,
          }));
          
          setCategories(uniqueCategories);
        } else {
          setError('No gallery items found');
        }
      } catch (err) {
        console.error('Failed to fetch gallery items:', err);
        setError('Failed to load gallery items');
      } finally {
        setIsLoading(false);
      }
    };
    
    getGalleryItems();
  }, [fetchGalleryItems]);

  // Filter gallery items based on search query and filters
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  // Handle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected item(s)?`)) {
      try {
        setIsLoading(true);
        
        // Delete each selected item
        for (const id of selectedItems) {
          await deleteGalleryItem(id);
        }
        
        // Update local state
        setGalleryItems(prevItems => 
          prevItems.filter(item => !selectedItems.includes(item._id))
        );
        
        setSelectedItems([]);
        toast.success(`Deleted ${selectedItems.length} gallery items successfully`);
      } catch (error) {
        console.error('Failed to delete gallery items:', error);
        toast.error('Failed to delete some gallery items');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle single item delete
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setIsLoading(true);
        await deleteGalleryItem(id);
        setGalleryItems(prevItems => prevItems.filter(item => item._id !== id));
        toast.success('Gallery item deleted successfully');
      } catch (error) {
        console.error('Failed to delete gallery item:', error);
        toast.error('Failed to delete gallery item');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = async (id: string) => {
    try {
      setIsLoading(true);
      await toggleGalleryItemFeatured(id);
      
      // Update local state
      setGalleryItems(prevItems => 
        prevItems.map(item => 
          item._id === id ? { ...item, featured: !item.featured } : item
        )
      );
      
      toast.success('Gallery item featured status updated');
    } catch (error) {
      console.error('Failed to update featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && galleryItems.length === 0) {
    return (
      <div className="py-6">
        <SectionHeader
          title="Gallery Management"
          description="Upload, organize and manage your gallery images"
          icon={<FiImage size={24} />}
        />
        <TableSkeleton rows={5} columns={4} />
      </div>
    );
  }

  return (
    <div className="py-6">
      <SectionHeader
        title="Gallery Management"
        description="Upload, organize and manage your gallery images"
        icon={<FiImage size={24} />}
        actionLabel="Add New Image"
        actionPath="/dashboard/gallery/form"
      />

      {/* Filters and View Toggle */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              id="search"
              label="Search Images"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or description"
            />
            
            <Select
              id="category"
              label="Filter by Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: '', label: 'All Categories' },
                ...categories,
              ]}
            />
          </div>
          
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-medium text-white mb-2">View Mode</label>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  viewMode === 'grid'
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-black/20 text-gray-400 border-white/10 hover:bg-white/5'
                }`}
                aria-label="Grid View"
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  viewMode === 'list'
                    ? 'bg-white/10 text-white border-white/20'
                    : 'bg-black/20 text-gray-400 border-white/10 hover:bg-white/5'
                }`}
                aria-label="List View"
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="mb-4 p-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-between">
          <span className="text-sm text-white">
            {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'} selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1 bg-red-500/80 hover:bg-red-600/80 text-white text-sm rounded-md flex items-center"
            disabled={isLoading}
          >
            <FiTrash2 className="mr-1" /> Delete Selected
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems?.map((item) => (
            <Card key={item._id} className={selectedItems.includes(item._id) ? 'ring-2 ring-white/30' : ''}>
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/dashboard/gallery/form/${item._id}`}
                      className="p-1.5 bg-black/50 rounded-full text-blue-400 hover:text-blue-300"
                    >
                      <FiEdit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 bg-black/50 rounded-full text-red-400 hover:text-red-300"
                      disabled={isLoading}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  {item.featured && (
                    <span className="bg-white/80 text-black text-xs px-1.5 py-0.5 rounded-md font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => toggleItemSelection(item._id)}
                    className="h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                  />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-black/30 text-white border border-white/10">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleToggleFeatured(item._id)}
                  className="mt-2 w-full px-2 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded"
                  disabled={isLoading}
                >
                  {item.featured ? 'Remove from Featured' : 'Mark as Featured'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="overflow-x-auto bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-black/40">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    onChange={() => {
                      if (selectedItems.length === filteredItems.length) {
                        setSelectedItems([]);
                      } else {
                        setSelectedItems(filteredItems.map(item => item._id));
                      }
                    }}
                    className="h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-black/20 divide-y divide-white/10">
              {filteredItems.map((item) => (
                <tr key={item._id} className={selectedItems.includes(item._id) ? 'bg-white/5' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleItemSelection(item._id)}
                      className="h-4 w-4 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-16 rounded overflow-hidden border border-white/10">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                      {item.featured && (
                        <div className="absolute top-0 right-0 bg-white/80 text-xs text-black px-1 rounded-bl">
                          ★
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{item.title}</div>
                    <div className="text-sm text-gray-400 truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-black/30 text-white border border-white/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/dashboard/gallery/form/${item._id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleToggleFeatured(item._id)}
                        className="text-yellow-400 hover:text-yellow-300"
                        disabled={isLoading}
                      >
                        ★
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 hover:text-red-300"
                        disabled={isLoading}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredItems?.length === 0 && !isLoading && (
        <div className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 text-center">
          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-white">No images found</h3>
          <p className="mt-1 text-sm text-gray-400">
            {searchQuery || categoryFilter
              ? "Try adjusting your search or filter to find what you're looking for."
              : 'Get started by adding a new image to your gallery.'}
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard/gallery/form"
              className="inline-flex items-center px-4 py-2 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-150"
            >
              <FiPlus className="mr-2" />
              Add New Image
            </Link>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="bg-red-900/20 backdrop-blur-lg border border-red-900/30 rounded-xl shadow-lg p-6 text-center mt-4">
          <h3 className="text-lg font-medium text-red-400">Error</h3>
          <p className="mt-1 text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
