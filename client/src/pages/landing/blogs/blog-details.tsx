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
  const [showSidebar, setShowSidebar] = useState(false);
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
    // Close mobile sidebar after selection
    setShowSidebar(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl md:text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blog || error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl md:text-2xl">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile sidebar toggle button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          className="bg-gray-800 text-white p-3 rounded-lg shadow-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      {/* Sidebar navigation */}
      <div className={`
        fixed top-0 left-0 w-64 h-screen bg-gray-900 pt-16 pl-6 pr-4 z-40 transform transition-transform duration-300 ease-in-out
        lg:transform-none lg:bg-transparent lg:w-[200px] lg:top-[100px] lg:pt-24 lg:pl-8
        ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="max-h-screen overflow-y-auto">
          {(blog?.sections || []).map((section: any) => (
            <div 
              key={section.id || section.title}
              className={`mb-3 lg:mb-4 text-lg lg:text-[1.5rem] cursor-pointer transition-colors ${
                activeSection === (section.id || section.title) 
                  ? 'text-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              onClick={() => scrollToSection(section.id || section.title)}
            >
              {section.title || section.heading}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:ml-[200px] flex justify-center mt-16 lg:mt-[100px]">
        <div className="w-full py-8 lg:py-24 px-4 lg:px-4 max-w-[1200px]">
          <button
            className="text-gray-400 text-base lg:text-[1.2rem] tracking-wider mb-8 lg:mb-16 hover:text-gray-300 flex items-center gap-2"
            onClick={() => navigate('/blogs')}
          >
            <span>←</span> Back to Blogs
          </button>
          
          <div className="mb-4 lg:mb-6 text-gray-400 text-sm lg:text-[1.5rem] tracking-wider">
            {new Date(blog?.createdAt).toDateString().toUpperCase()}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium mb-4 lg:mb-6 leading-tight">
            {blog?.title}
          </h1>
          
          <div className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 lg:mb-12 leading-relaxed">
            {blog?.subtitle}
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4 mb-8 lg:mb-10">
            <img 
              src={blog?.coverImage || doodle} 
              alt="avatar" 
              className="rounded-full w-10 h-10 lg:w-14 lg:h-14 object-cover" 
            />
            <div>
              <div className="text-gray-200 text-sm lg:text-base">Posted By {blog?.author}</div>
              <div className="text-gray-400 text-sm lg:text-base">{blog?.readTime}</div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-800 mb-8 lg:mb-12"></div>
          
          {/* Intro text */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-12 lg:mb-24 leading-relaxed">
            {blog.intro}
          </p>
          
          {/* Blog content sections */}
          <div className="space-y-12 lg:space-y-24">
            {(blog.sections || []).map((section: any) => (
              <div 
                key={section.id || section.title} 
                id={section.id || section.title}
                ref={(el) => { sectionRefs.current[section.id || section.title] = el; }}
                className="pb-6 lg:pb-8"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 lg:mb-12 leading-tight">
                  {section.title || section.heading}
                </h2>
                
                <div className="max-w-full lg:max-w-[900px]">
                  <p className="text-base sm:text-lg lg:text-2xl text-gray-300 leading-relaxed mb-4 lg:mb-6 font-light">
                    {section.content}
                  </p>
                  
                  {section.additionalContent && (
                    <p className="text-base sm:text-lg lg:text-2xl text-gray-300 leading-relaxed font-light">
                      Feel free to email me your solutions at{' '}
                      <a 
                        href="mailto:problems@cursor.com" 
                        className="underline hover:text-white transition-colors"
                      >
                        problems@cursor.com
                      </a>.
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