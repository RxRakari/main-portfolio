import React, { useState } from 'react';
import { FiImage, FiPlus, FiTrash2, FiEdit, FiGrid, FiList } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import Card from '../../../components/ui/dashboard/card';
import { TextInput, Select } from '../../../components/ui/dashboard/form-elements';
import { Link } from 'react-router-dom';

// Mock data for gallery
const mockGalleryItems = [
  {
    id: '1',
    title: 'Modern Architecture',
    description: 'Contemporary building design with clean lines and geometric shapes.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Architecture',
    tags: ['modern', 'building', 'design'],
    featured: true,
    date: '2023-08-15',
  },
  {
    id: '2',
    title: 'Nature Landscape',
    description: 'Beautiful mountain landscape with reflective lake.',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Nature',
    tags: ['mountains', 'lake', 'landscape'],
    featured: true,
    date: '2023-07-22',
  },
  {
    id: '3',
    title: 'Urban Street',
    description: 'Busy city street with vibrant storefronts and pedestrians.',
    imageUrl: 'https://images.unsplash.com/photo-1519475889208-0968e5438f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    category: 'Urban',
    tags: ['city', 'street', 'people'],
    featured: false,
    date: '2023-09-05',
  },
  {
    id: '4',
    title: 'Abstract Art',
    description: 'Colorful abstract painting with geometric patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80',
    category: 'Art',
    tags: ['abstract', 'colorful', 'painting'],
    featured: false,
    date: '2023-06-30',
  },
  {
    id: '5',
    title: 'Tech Workspace',
    description: 'Modern office workspace with computer setup and plants.',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Technology',
    tags: ['workspace', 'office', 'computer'],
    featured: true,
    date: '2023-08-05',
  },
  {
    id: '6',
    title: 'Food Photography',
    description: 'Delicious meal presentation with vibrant colors and textures.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Food',
    tags: ['cuisine', 'meal', 'restaurant'],
    featured: false,
    date: '2023-07-12',
  },
];

const GalleryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Filter gallery items based on search query and filters
  const filteredItems = mockGalleryItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(mockGalleryItems.map(item => item.category))).map(category => ({
    value: category,
    label: category,
  }));

  // Handle item selection
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected item(s)?`)) {
      // In a real app, you would call an API to delete the items
      console.log(`Delete items with IDs: ${selectedItems.join(', ')}`);
      setSelectedItems([]);
    }
  };

  // Handle single item delete
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      // In a real app, you would call an API to delete the item
      console.log(`Delete item with ID: ${id}`);
    }
  };

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
              placeholder="Search by title, description, or tags"
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
          >
            <FiTrash2 className="mr-1" /> Delete Selected
          </button>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className={selectedItems.includes(item.id) ? 'ring-2 ring-white/30' : ''}>
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
                      to={`/dashboard/gallery/form/${item.id}`}
                      className="p-1.5 bg-black/50 rounded-full text-blue-400 hover:text-blue-300"
                    >
                      <FiEdit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 bg-black/50 rounded-full text-red-400 hover:text-red-300"
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
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
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
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
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
                        setSelectedItems(filteredItems.map(item => item.id));
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
                <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-white/5' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
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
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/dashboard/gallery/form/${item.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-300"
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
      {filteredItems.length === 0 && (
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
    </div>
  );
};

export default GalleryManagement;
