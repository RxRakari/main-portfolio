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
import { useAdmin } from '../../../context/admin-context';
import { toast } from 'sonner';

interface BlogSection {
  id: string;
  title: string;
  content: string;
}

interface BlogFormData {
  title: string;
  subtitle: string;
  slug: string;
  coverImage: string;
  category: string;
  tags: string[];
  newTag: string;
  author: string;
  readTime: string;
  intro: string;
  content: string;
  sections: BlogSection[];
  newSectionTitle: string;
  newSectionContent: string;
  published: boolean;
  featured: boolean;
}

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { fetchBlog, createBlog, updateBlog } = useAdmin();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    subtitle: '',
    slug: '',
    coverImage: '',
    category: '',
    tags: [],
    newTag: '',
    author: '',
    readTime: '',
    intro: '',
    content: '',
    sections: [],
    newSectionTitle: '',
    newSectionContent: '',
    published: false,
    featured: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories] = useState([
    { value: '', label: 'Select a category' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Design', label: 'Design' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'AI', label: 'AI' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Other', label: 'Other' },
  ]);

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      setIsLoading(true);
      
      fetchBlog(id)
        .then(response => {
          const blog = response?.data?.blog;
          
          if (blog) {
            setFormData({
              title: blog.title || '',
              subtitle: blog.subtitle || '',
              slug: blog.slug || '',
              coverImage: blog.coverImage || '',
              category: blog.category || '',
              tags: blog.tags || [],
              newTag: '',
              author: blog.author || '',
              readTime: blog.readTime || '',
              intro: blog.intro || '',
              content: blog.content || '',
              sections: blog.sections || [],
              newSectionTitle: '',
              newSectionContent: '',
              published: blog.published || false,
              featured: blog.featured || false
            });
          } else {
            toast.error('Blog not found');
            navigate('/dashboard/blogs');
          }
        })
        .catch(error => {
          console.error('Error fetching blog:', error);
          toast.error('Failed to load blog');
          navigate('/dashboard/blogs');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isEditMode, navigate, fetchBlog]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
    
    setFormData(prev => ({
      ...prev,
      slug
    }));
  };

  // Handle image file selection
  const handleImageChange = (imageUrl: string, file?: File) => {
    if (imageUrl) {
      setFormData(prev => ({
        ...prev,
        coverImage: imageUrl
      }));
      if (file) {
        setImageFile(file);
      }
    }
  };

  // Add tag
  const addTag = () => {
    if (formData.newTag.trim() === '') return;
    
    if (formData.tags.includes(formData.newTag.trim())) {
      setErrors(prev => ({
        ...prev,
        newTag: 'Tag already added'
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, prev.newTag.trim()],
      newTag: ''
    }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.newTag;
      return newErrors;
    });
  };

  // Remove tag
  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // Add a new section
  const addSection = () => {
    if (!formData.newSectionTitle.trim()) {
      setErrors(prev => ({
        ...prev,
        newSectionTitle: 'Section title is required'
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

    // Generate a unique id
    const sectionId = formData.newSectionTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const newSection: BlogSection = {
      id: sectionId,
      title: formData.newSectionTitle.trim(),
      content: formData.newSectionContent.trim()
    };

    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection],
      newSectionTitle: '',
      newSectionContent: ''
    }));

    setErrors(prev => ({
      ...prev,
      newSectionTitle: '',
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
    
    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'Subtitle is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!isEditMode && !imageFile && !formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    if (!formData.intro.trim()) {
      newErrors.intro = 'Introduction is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0);
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      const blogData = new FormData();
      
      // Add text fields
      blogData.append('title', formData.title);
      blogData.append('subtitle', formData.subtitle);
      blogData.append('slug', formData.slug);
      blogData.append('category', formData.category);
      blogData.append('tags', JSON.stringify(formData.tags));
      blogData.append('author', formData.author);
      blogData.append('readTime', formData.readTime);
      blogData.append('intro', formData.intro);
      blogData.append('content', formData.content);
      blogData.append('sections', JSON.stringify(formData.sections));
      blogData.append('published', formData.published.toString());
      blogData.append('featured', formData.featured.toString());
      
      // Add image file if available
      if (imageFile) {
        blogData.append('coverImage', imageFile);
      } else if (formData.coverImage) {
        blogData.append('coverImage', formData.coverImage);
      }
      
      // Submit the form
      if (isEditMode && id) {
        await updateBlog(id, blogData);
        toast.success('Blog updated successfully');
      } else {
        await createBlog(blogData);
        toast.success('Blog created successfully');
      }
      
      // Redirect to blogs list
      navigate('/dashboard/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
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
        <SectionHeader
          title={isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
          description="Loading..."
          icon={<FiFileText size={24} />}
        />
        <div className="mt-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-white/5 rounded-md w-3/4"></div>
            <div className="h-64 bg-white/5 rounded-md"></div>
            <div className="h-32 bg-white/5 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 z-10">
      <SectionHeader
        title={isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
        description={isEditMode ? "Update an existing blog post" : "Create a new blog post for your website"}
        icon={<FiFileText size={24} />}
      />

      <form onSubmit={handleSubmit} className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 mt-6 z-10">
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
            required
            error={errors.subtitle}
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
                    <h4 className="text-white font-medium">{section.title}</h4>
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

          <div className="border border-white/10 rounded-lg p-4 bg-black/20">
            <h4 className="text-white font-medium mb-4">Add New Section</h4>
            
            <TextInput
              id="newSectionTitle"
              name="newSectionTitle"
              label="Section Title"
              value={formData.newSectionTitle}
              onChange={handleChange}
              placeholder="Enter section title"
              error={errors.newSectionTitle}
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
            onChange={handleImageChange}
            helperText="Upload a featured image for this blog post (up to 5MB)"
            required
            error={errors.coverImage}
            maxSizeMB={5}
          />
        </FormSection>

        <FormSection title="Tags">
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-black/30 text-white border border-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex items-end gap-2">
            <TextInput
              id="newTag"
              name="newTag"
              label="Add Tag"
              value={formData.newTag}
              onChange={handleChange}
              placeholder="Enter tag name"
              error={errors.newTag}
              className="flex-1"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 mb-0.5"
            >
              <FiPlus size={18} />
            </button>
          </div>
        </FormSection>

        <FormSection title="Metadata">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              id="category"
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
              options={categories}
              required
              error={errors.category}
            />
            
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
        </FormSection>

        <FormSection title="Publishing Options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Checkbox
                id="published"
                name="published"
                label="Publish Post"
                checked={formData.published}
                onChange={handleCheckboxChange}
                helperText="Make this post visible to the public"
              />
            </div>
            
            <div className="flex items-center">
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

        <FormActions
          primaryLabel={isEditMode ? "Update Blog" : "Create Blog"}
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