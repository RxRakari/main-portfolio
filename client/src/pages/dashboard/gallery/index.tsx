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
  const [isLoading] = useState(false);

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
      >
        {selectedItems.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <FiTrash2 className="mr-2" />
            Delete Selected ({selectedItems.length})
          </button>
        )}
      </SectionHeader>

      {/* Filters and View Toggle */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <TextInput
              id="search"
              label="Search Gallery"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description or tags..."
              type="text"
            />
          </div>
          <div className="w-full md:w-64">
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
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${
                viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Grid View"
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${
                viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="List View"
            >
              <FiList size={20} />
            </button>
          </div>
        </div>
      </Card>

      {/* Gallery Items */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg overflow-hidden shadow transition-all duration-200 ${
                selectedItems.includes(item.id) ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="relative group">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Link
                    to={`/dashboard/gallery/form/${item.id}`}
                    className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-100"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full bg-white text-red-600 hover:bg-red-100"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                {item.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-xs text-gray-800 px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{item.title}</h3>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                </div>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(filteredItems.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-purple-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                        }}
                      />
                      {item.featured && (
                        <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-gray-800 px-1 rounded-bl">
                          ★
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/dashboard/gallery/form/${item.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
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
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <FiImage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No images found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || categoryFilter
              ? "Try adjusting your search or filter to find what you're looking for."
              : 'Get started by adding a new image to your gallery.'}
          </p>
          <div className="mt-6">
            <Link
              to="/dashboard/gallery/form"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
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
