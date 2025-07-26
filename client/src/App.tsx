import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ui/scroll-to-top';
import { useState, useEffect } from 'react';
import LoadingWrapper from './components/states/loading-wrapper';
import { ToastProvider } from './context/toast-context';
import { AdminProvider } from './context/admin-context';
import { AuthProvider } from './context/auth-context';
import { AppProvider } from './context/app-context';
import { ThemeProvider } from './context/theme-context';

// Layouts
import { LandingLayout } from './layout/landing-layout';
import DashboardLayout from './layout/dashboard-layout';

// Landing pages
import { Home } from './pages/landing/home';
import { Blogs } from './pages/landing/blogs/blogs';
import { Gallery } from './pages/landing/gallery';

// Auth pages
import Login from './pages/auth/login';
import Logout from './pages/dashboard/logout';

// Dashboard pages
import { Dashboard } from './pages/dashboard/index';
import BlogsManagement from './pages/dashboard/blogs/index';
import BlogForm from './pages/dashboard/blogs/form';
import ProjectsManagement from './pages/dashboard/projects/index';
import ProjectForm from './pages/dashboard/projects/form';
import ExperienceManagement from './pages/dashboard/experience/index';
import ExperienceForm from './pages/dashboard/experience/form';
import GalleryManagement from './pages/dashboard/gallery/index';
import GalleryForm from './pages/dashboard/gallery/form';
import TestimonialsManagement from './pages/dashboard/testimonials/index';
import TestimonialForm from './pages/dashboard/testimonials/form';
import ContactsManagement from './pages/dashboard/contacts/index';

// Protected Route
import ProtectedRoute from './routes/protected';
import NotFound from './routes/404';
import Projects  from './pages/landing/projects/projects';
import BlogDetails from './pages/landing/blogs/blog-details';
import ProjectDetails from './pages/landing/projects/project-details';
import SettingsPage from './pages/dashboard/settings';

// Custom logo for loading screen
const AppLogo = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className="w-12 h-12 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial app loading
  useEffect(() => {
    // You would typically fetch initial data here
    const loadAppData = async () => {
      try {
        // Simulate API calls or resource loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading app data:', error);
        setIsLoading(false);
      }
    };
    
    loadAppData();
  }, []);

  return (
    <LoadingWrapper 
      isLoading={isLoading} 
      logo={<AppLogo />} 
      minLoadingTime={2500}
      loadingText="Loading Portfolio..."
    >
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <AdminProvider>
              <AppProvider>
                <ThemeProvider>
                  <ScrollToTop />
                  <Routes>
                    {/* Auth routes without layout */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    
                    {/* Public routes with landing layout */}
                    <Route element={<LandingLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<ProjectDetails />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/blogs/:id" element={<BlogDetails />} />
                      <Route path="/gallery" element={<Gallery />} />
                    </Route>
                    
                    {/* Protected dashboard routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Dashboard />} />
                      
                      {/* Blog Management Routes */}
                      <Route path="blogs" element={<BlogsManagement />} />
                      <Route path="blogs/form" element={<BlogForm />} />
                      <Route path="blogs/form/:id" element={<BlogForm />} />
                      
                      {/* Project Management Routes */}
                      <Route path="projects" element={<ProjectsManagement />} />
                      <Route path="projects/form" element={<ProjectForm />} />
                      <Route path="projects/form/:id" element={<ProjectForm />} />
                      
                      {/* Experience Management Routes */}
                      <Route path="experience" element={<ExperienceManagement />} />
                      <Route path="experience/form" element={<ExperienceForm />} />
                      <Route path="experience/form/:id" element={<ExperienceForm />} />
                      
                      {/* Gallery Management Routes */}
                      <Route path="gallery" element={<GalleryManagement />} />
                      <Route path="gallery/form" element={<GalleryForm />} />
                      <Route path="gallery/form/:id" element={<GalleryForm />} />
                      
                      {/* Testimonials Management Routes */}
                      <Route path="testimonials" element={<TestimonialsManagement />} />
                      <Route path="testimonials/form" element={<TestimonialForm />} />
                      <Route path="testimonials/form/:id" element={<TestimonialForm />} />
                      
                      {/* Contact Messages Routes */}
                      <Route path="contacts" element={<ContactsManagement />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                    
                    {/* 404 route */}
                    <Route path='/not-found' element={<NotFound /> } />
                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                  </Routes>
                </ThemeProvider>
              </AppProvider>
            </AdminProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </LoadingWrapper>
  );
};

export default App;