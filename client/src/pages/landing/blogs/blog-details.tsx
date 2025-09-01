import { useNavigate, useParams } from 'react-router-dom';
import { doodle } from '../../../assets';
import { useState, useEffect, useRef } from 'react';
import { useBlog } from '../../../hooks/queries/use-portfolio-data';

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: blogData, isLoading, error } = useBlog(id!);
  const [activeSection, setActiveSection] = useState('');
  const [blog, setBlog] = useState<any | null>(null);
  const sectionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Fetch blog
  useEffect(() => {
    const load = async () => {
      try {
        const res = await blogData;
        const b = res?.data?.blog;
        if (b) {
          setBlog(b);
        }
      } finally {
      }
    };
    if (id) load();
  }, [id, blogData]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better UX

      // Find the section that is currently in view
      for (const section of (blog?.sections || [])) {
        const element = sectionRefs.current[section.id || section.title];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id || section.title);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blog]);

  // Scroll to section when clicking on sidebar
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for better positioning
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blog || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar navigation */}
      <div className="fixed top-[100px] left-0 w-[200px] pt-24 pl-8 h-screen">
        {(blog?.sections || []).map((section: any) => (
          <div 
            key={section.id || section.title}
            className={`mb-4 text-[1.5rem] cursor-pointer ${activeSection === (section.id || section.title) ? 'text-white' : 'text-gray-500'}`}
            onClick={() => scrollToSection(section.id || section.title)}
          >
            {section.title || section.heading}
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="ml-[200px] flex justify-center mt-[100px]">
        <div className="w-full py-24 px-4 max-w-[1200px]">
          <button
            className="text-gray-400 text-[1.2rem] tracking-wider mb-16 hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate('/blogs')}
          >
            <span>←</span> BACK TO THE MAIN BLOG
          </button>
          
          <div className="mb-6 text-gray-400 text-[1.5rem] tracking-wider">{new Date(blog?.createdAt).toDateString().toUpperCase()}</div>
          
          <h1 className="text-7xl font-medium mb-6">{blog?.title}</h1>
          <div className="text-2xl text-gray-300 mb-12">{blog?.subtitle}</div>
          
          <div className="flex items-center gap-4 mb-10">
            <img src={blog?.coverImage || doodle} alt="avatar" className="rounded-full w-14 h-14 object-cover" />
            <div>
              <div className="text-gray-200">Posted By {blog?.author}</div>
              <div className="text-gray-400">{blog?.readTime}</div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-800 mb-12"></div>
          
          {/* Intro text */}
          <p className="text-xl text-gray-300 mb-24">{blog.intro}</p>
          
          {/* Blog content sections */}
          <div className="space-y-24">
            {(blog.sections || []).map((section: any) => (
              <div 
                key={section.id || section.title} 
                id={section.id || section.title}
                ref={(el) => { sectionRefs.current[section.id || section.title] = el; }}
                className="pb-8"
              >
                <h2 className="text-5xl font-semibold mb-12">{section.title || section.heading}</h2>
                <div className="max-w-[900px]">
                  <p className="text-2xl text-gray-300 leading-relaxed mb-6 font-light">{section.content}</p>
                  {section.additionalContent && (
                    <p className="text-2xl text-gray-300 leading-relaxed font-light">
                      Feel free to email me your solutions at <a href="mailto:problems@cursor.com" className="underline">problems@cursor.com</a>.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;