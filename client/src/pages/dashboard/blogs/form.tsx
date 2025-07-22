import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFileText, FiSave, FiX } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection
} from '../../../components/ui/dashboard/form-elements';

// Mock blog data for editing
const mockBlogs = [
  {
    id: '1',
    title: 'Character Prefix Conditioning',
    slug: 'character-prefix-conditioning',
    excerpt: 'The first in a series of problems that give a glimpse into the work we do at Cursor.',
    content: 'When using a language model for code completion, we typically want the model to produce a completion that begins with what the user has typed.',
    category: 'Technology',
    tags: 'AI, language models, coding',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'published',
    featured: true,
    author: 'Jacob',
    date: '2023-09-15',
    views: 1245,
    seo: {
      metaTitle: 'Character Prefix Conditioning - Advanced AI Techniques',
      metaDescription: 'Learn about character prefix conditioning, a clever algorithm for more accurate code completion sampling.',
      keywords: 'AI, machine learning, code completion, language models',
    }
  },
  {
    id: '2',
    title: 'Building a Modern Portfolio Website',
    slug: 'building-modern-portfolio-website',
    excerpt: 'A comprehensive guide to building a portfolio website using modern web technologies.',
    content: 'In this article, we will explore how to build a modern portfolio website using React, Tailwind CSS, and Framer Motion.',
    category: 'Web Development',
    tags: 'React, Tailwind CSS, Framer Motion, Portfolio',
    coverImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'published',
    featured: false,
    author: 'Jacob',
    date: '2023-08-22',
    views: 982,
    seo: {
      metaTitle: 'Building a Modern Portfolio Website with React and Tailwind',
      metaDescription: 'Learn how to build a modern portfolio website using React, Tailwind CSS, and Framer Motion.',
      keywords: 'React, Tailwind CSS, Portfolio, Web Development',
    }
  }
];

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  status: string;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
}

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    coverImage: '',
    status: 'draft',
    featured: false,
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: '',
    }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true);
      // Simulate API call to fetch blog data
      setTimeout(() => {
        const blog = mockBlogs.find(blog => blog.id === id);
        if (blog) {
          setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            tags: blog.tags,
            coverImage: blog.coverImage,
            status: blog.status,
            featured: blog.featured,
            seo: {
              metaTitle: blog.seo.metaTitle,
              metaDescription: blog.seo.metaDescription,
              keywords: blog.seo.keywords,
            }
          });
        } else {
          // Blog not found, redirect to blogs list
          navigate('/dashboard/blogs');
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode, navigate]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'seo') {
        setFormData(prev => ({
          ...prev,
          seo: {
            ...prev.seo,
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to save the blog
      console.log('Form data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to blog list
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      navigate('/dashboard/blogs');
    }
  };

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md mb-6 w-3/4"></div>
          <div className="h-64 bg-gray-100 rounded-md mb-6"></div>
          <div className="h-32 bg-gray-100 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <SectionHeader
        title={isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
        description={isEditMode ? "Update an existing blog post" : "Create a new blog post for your portfolio"}
        icon={<FiFileText size={24} />}
      />

      <form onSubmit={handleSubmit}>
        <FormSection title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="title"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              error={errors.title}
              className="md:col-span-2"
            />
            
            <div className="flex items-end gap-4">
              <TextInput
                id="slug"
                name="slug"
                label="Slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="enter-blog-slug"
                required
                error={errors.slug}
                helperText="URL-friendly version of the title"
                className="flex-1"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Generate
              </button>
            </div>
            
            <Select
              id="category"
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a category' },
                { value: 'Technology', label: 'Technology' },
                { value: 'Web Development', label: 'Web Development' },
                { value: 'React', label: 'React' },
                { value: 'CSS', label: 'CSS' },
              ]}
              required
              error={errors.category}
            />
          </div>
          
          <TextInput
            id="tags"
            name="tags"
            label="Tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Enter tags separated by commas"
            helperText="E.g., react, javascript, web development"
          />
          
          <TextArea
            id="excerpt"
            name="excerpt"
            label="Excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a brief summary of your blog post"
            rows={3}
            helperText="A short summary that appears in blog listings"
          />
        </FormSection>

        <FormSection title="Content">
          <TextArea
            id="content"
            name="content"
            label="Content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here..."
            rows={15}
            required
            error={errors.content}
          />
        </FormSection>

        <FormSection title="Featured Image">
          <TextInput
            id="coverImage"
            name="coverImage"
            label="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Enter image URL"
            type="url"
            helperText="URL to the featured image for this blog post"
          />
          
          {formData.coverImage && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <img 
                src={formData.coverImage} 
                alt="Cover preview" 
                className="max-h-48 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                }}
              />
            </div>
          )}
        </FormSection>

        <FormSection title="Publishing Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="status"
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'published', label: 'Published' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            
            <div className="flex items-center h-full pt-6">
              <Checkbox
                id="featured"
                name="featured"
                label="Featured Post"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                helperText="Display this post in featured sections"
              />
            </div>
          </div>
        </FormSection>

        <FormSection title="SEO Settings">
          <TextInput
            id="seo.metaTitle"
            name="seo.metaTitle"
            label="Meta Title"
            value={formData.seo.metaTitle}
            onChange={handleChange}
            placeholder="Enter meta title"
            helperText="Leave blank to use the post title"
          />
          
          <TextArea
            id="seo.metaDescription"
            name="seo.metaDescription"
            label="Meta Description"
            value={formData.seo.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description"
            rows={3}
            helperText="Brief description for search engines"
          />
          
          <TextInput
            id="seo.keywords"
            name="seo.keywords"
            label="Keywords"
            value={formData.seo.keywords}
            onChange={handleChange}
            placeholder="Enter keywords separated by commas"
            helperText="Keywords for search engines"
          />
        </FormSection>

        <div className="flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="flex items-center">
              <FiX className="mr-2" />
              Cancel
            </span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                {isEditMode ? 'Update Blog Post' : 'Save Blog Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm; 