import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiFileText, FiPlus, FiTrash2 } from 'react-icons/fi';
import SectionHeader from '../../../components/ui/dashboard/section-header';
import { 
  TextInput, 
  TextArea, 
  Select, 
  Checkbox, 
  FormSection,
  FormActions
} from '../../../components/ui/dashboard/form-elements';
import ImageUpload from '../../../components/ui/dashboard/image-upload';
import { uploadImage } from '../../../services/upload-service';

// Mock blog data for editing
const mockBlogs = [
  {
    id: '1',
    title: 'Character Prefix Conditioning',
    subtitle: 'A clever algorithm for more accurate code completion sampling.',
    slug: 'character-prefix-conditioning',
    excerpt: 'The first in a series of problems that give a glimpse into the work we do at Cursor.',
    content: 'When using a language model for code completion, we typically want the model to produce a completion that begins with what the user has typed.',
    category: 'Technology',
    tags: 'AI, language models, coding',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'published',
    featured: true,
    author: 'Jacob',
    readTime: '2 minutes read',
    date: '2023-09-15',
    views: 1245,
    intro: 'The first in a series of problems that give a glimpse into the work we do at Cursor.',
    sections: [
      {
        id: 'Setup',
        heading: 'Setup',
        content: 'When using a language model for code completion, we typically want the model to produce a completion that begins with what the user has typed.'
      },
      {
        id: 'Problem',
        heading: 'Problem',
        content: 'Can you construct an efficient algorithm for sampling from q(tₖ |t₁, ... ,tₖ₋₁), that minimizes calls to the original language model? A description of the algorithm is great. An actual implementation is excellent.',
        additionalContent: true
      }
    ],
    seo: {
      metaTitle: 'Character Prefix Conditioning - Advanced AI Techniques',
      metaDescription: 'Learn about character prefix conditioning, a clever algorithm for more accurate code completion sampling.',
      keywords: 'AI, machine learning, code completion, language models',
    }
  },
  {
    id: '2',
    title: 'Building a Modern Portfolio Website',
    subtitle: 'A comprehensive guide to creating stunning portfolio sites',
    slug: 'building-modern-portfolio-website',
    excerpt: 'A comprehensive guide to building a portfolio website using modern web technologies.',
    content: 'In this article, we will explore how to build a modern portfolio website using React, Tailwind CSS, and Framer Motion.',
    category: 'Web Development',
    tags: 'React, Tailwind CSS, Framer Motion, Portfolio',
    coverImage: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    status: 'published',
    featured: false,
    author: 'Jacob',
    readTime: '5 minutes read',
    date: '2023-08-22',
    views: 982,
    intro: 'Creating a portfolio website is essential for showcasing your work and skills to potential clients or employers.',
    sections: [
      {
        id: 'Introduction',
        heading: 'Introduction',
        content: 'In this article, we will explore how to build a modern portfolio website using React, Tailwind CSS, and Framer Motion.'
      },
      {
        id: 'Technologies',
        heading: 'Technologies Used',
        content: 'We will be using React for the frontend, Tailwind CSS for styling, and Framer Motion for animations.'
      }
    ],
    seo: {
      metaTitle: 'Building a Modern Portfolio Website with React and Tailwind',
      metaDescription: 'Learn how to build a modern portfolio website using React, Tailwind CSS, and Framer Motion.',
      keywords: 'React, Tailwind CSS, Portfolio, Web Development',
    }
  }
];

interface BlogSection {
  id: string;
  heading: string;
  content: string;
  additionalContent?: boolean;
}

interface BlogFormData {
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  coverImage: string;
  status: string;
  featured: boolean;
  author: string;
  readTime: string;
  intro: string;
  sections: BlogSection[];
  newSectionHeading: string;
  newSectionContent: string;
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
    subtitle: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    coverImage: '',
    status: 'draft',
    featured: false,
    author: '',
    readTime: '',
    intro: '',
    sections: [],
    newSectionHeading: '',
    newSectionContent: '',
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
            subtitle: blog.subtitle || '',
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            tags: blog.tags,
            coverImage: blog.coverImage,
            status: blog.status,
            featured: blog.featured,
            author: blog.author,
            readTime: blog.readTime || '',
            intro: blog.intro || '',
            sections: blog.sections || [],
            newSectionHeading: '',
            newSectionContent: '',
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
    
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
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

  // Handle image upload
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle cover image change
  const handleCoverImageChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      coverImage: url
    }));
  };

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  // Add a new section
  const addSection = () => {
    if (!formData.newSectionHeading.trim()) {
      setErrors(prev => ({
        ...prev,
        newSectionHeading: 'Section heading is required'
      }));
      return;
    }

    if (!formData.newSectionContent.trim()) {
      setErrors(prev => ({
        ...prev,
        newSectionContent: 'Section content is required'
      }));
      return;
    }

    const newSection: BlogSection = {
      id: formData.newSectionHeading.replace(/\s+/g, ''),
      heading: formData.newSectionHeading,
      content: formData.newSectionContent
    };

    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
      newSectionHeading: '',
      newSectionContent: ''
    }));

    setErrors(prev => ({
      ...prev,
      newSectionHeading: '',
      newSectionContent: ''
    }));
  };

  // Remove a section
  const removeSection = (id: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== id)
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
    
    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.intro.trim()) {
      newErrors.intro = 'Introduction is required';
    }

    if (formData.sections.length === 0) {
      newErrors.sections = 'At least one section is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to save the blog
      console.log('Form data to be submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to blogs list
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
        description={isEditMode ? "Update an existing blog post" : "Create a new blog post for your website"}
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
            />
            
            <div className="flex items-end gap-2">
              <TextInput
                id="slug"
                name="slug"
                label="Slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="enter-blog-slug"
                required
                error={errors.slug}
                className="flex-1"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 mb-0.5"
              >
                Generate
              </button>
            </div>
          </div>

          <TextInput
            id="subtitle"
            name="subtitle"
            label="Subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter blog subtitle"
          />
          
          <TextArea
            id="excerpt"
            name="excerpt"
            label="Excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Enter a brief excerpt or summary"
            rows={2}
            required
            error={errors.excerpt}
          />
          
          <TextArea
            id="intro"
            name="intro"
            label="Introduction"
            value={formData.intro}
            onChange={handleChange}
            placeholder="Enter the blog introduction"
            rows={3}
            required
            error={errors.intro}
          />
        </FormSection>

        <FormSection title="Content">
          <TextArea
            id="content"
            name="content"
            label="Main Content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter the main content of your blog"
            rows={10}
            required
            error={errors.content}
          />
        </FormSection>

        <FormSection title="Blog Sections">
          {formData.sections.length > 0 ? (
            <div className="mb-6 space-y-4">
              {formData.sections.map((section, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-lg bg-black/30">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{section.heading}</h4>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{section.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-4 p-4 border border-white/10 rounded-lg bg-black/30 text-center">
              <p className="text-gray-400">No sections added yet. Add sections below.</p>
            </div>
          )}

          {errors.sections && (
            <div className="text-red-500 text-sm mb-4">{errors.sections}</div>
          )}

          <div className="border border-white/10 rounded-lg p-4 bg-black/20">
            <h4 className="text-white font-medium mb-4">Add New Section</h4>
            
            <TextInput
              id="newSectionHeading"
              name="newSectionHeading"
              label="Section Heading"
              value={formData.newSectionHeading}
              onChange={handleChange}
              placeholder="Enter section heading"
              error={errors.newSectionHeading}
            />
            
            <TextArea
              id="newSectionContent"
              name="newSectionContent"
              label="Section Content"
              value={formData.newSectionContent}
              onChange={handleChange}
              placeholder="Enter section content"
              rows={4}
              error={errors.newSectionContent}
            />
            
            <button
              type="button"
              onClick={addSection}
              className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 flex items-center"
            >
              <FiPlus className="mr-2" /> Add Section
            </button>
          </div>
        </FormSection>

        <FormSection title="Featured Image">
          <ImageUpload
            id="coverImage"
            label="Cover Image"
            value={formData.coverImage}
            onChange={handleCoverImageChange}
            onUpload={handleImageUpload}
            helperText="Upload a featured image for this blog post"
            required
            error={errors.coverImage}
            maxSizeMB={10}
          />
        </FormSection>

        <FormSection title="Metadata">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                { value: 'Design', label: 'Design' },
                { value: 'Business', label: 'Business' },
                { value: 'Marketing', label: 'Marketing' },
              ]}
              required
              error={errors.category}
            />
            
            <TextInput
              id="tags"
              name="tags"
              label="Tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas"
              helperText="E.g., React, JavaScript, Web Development"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="author"
              name="author"
              label="Author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
              error={errors.author}
            />
            
            <TextInput
              id="readTime"
              name="readTime"
              label="Read Time"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="E.g., 5 minutes read"
            />
          </div>

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

        <FormSection title="SEO">
          <TextInput
            id="seo.metaTitle"
            name="seo.metaTitle"
            label="Meta Title"
            value={formData.seo.metaTitle}
            onChange={handleChange}
            placeholder="Enter SEO meta title"
            helperText="Recommended length: 50-60 characters"
          />
          
          <TextArea
            id="seo.metaDescription"
            name="seo.metaDescription"
            label="Meta Description"
            value={formData.seo.metaDescription}
            onChange={handleChange}
            placeholder="Enter SEO meta description"
            rows={2}
            helperText="Recommended length: 150-160 characters"
          />
          
          <TextInput
            id="seo.keywords"
            name="seo.keywords"
            label="Keywords"
            value={formData.seo.keywords}
            onChange={handleChange}
            placeholder="Enter SEO keywords separated by commas"
          />
        </FormSection>

        <FormActions
          primaryLabel="Save Blog"
          secondaryLabel="Cancel"
          onPrimaryClick={handleSubmit}
          onSecondaryClick={handleCancel}
          isLoading={isSubmitting}
        />
      </form>
    </div>
  );
};

export default BlogForm; 