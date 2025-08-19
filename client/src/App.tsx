import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ui/scroll-to-top';
import LoadingWrapper from './components/states/loading-wrapper';
import { ToastProvider } from './context/toast-context';
import { AdminProvider } from './context/admin-context';
import { AuthProvider } from './context/auth-context';
import { AppProvider, useApp } from './context/app-context';
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
import Projects from './pages/landing/projects/projects';
import BlogDetails from './pages/landing/blogs/blog-details';
import ProjectDetails from './pages/landing/projects/project-details';
import SettingsPage from './pages/dashboard/settings';
import NewsletterManagement from './pages/dashboard/newsletter/index';
import NewsletterForm from './pages/dashboard/newsletter/form';

const AppLogo = () => (
  <div className="flex items-center justify-center h-20 w-20">
    <div className="relative w-12 h-12">
      <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full animate-spin-slow origin-[0_-16px]" />
      <div className="absolute top-0 left-1/2 w-3 h-3 bg-white/70 rounded-full animate-spin-slow origin-[0_-16px] delay-150" />
      <div className="absolute top-0 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-spin-slow origin-[0_-16px] delay-300" />
    </div>
  </div>
);

const AppContent = () => {
  const { isLoading, error } = useApp();

  return (
    <LoadingWrapper
      isLoading={isLoading}
      logo={<AppLogo />}
      minLoadingTime={2500}
      loadingText={error ? `Error: ${error}` : 'Loading Portfolio...'}
    >
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <AdminProvider>
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

                    {/* Newsletter Management Routes */}
                    <Route path="newsletter" element={<NewsletterManagement />} />
                    <Route path="newsletter/form" element={<NewsletterForm />} />

                    {/* Contact Messages Routes */}
                    <Route path="contacts" element={<ContactsManagement />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>

                  {/* 404 route */}
                  <Route path='/not-found' element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/not-found" replace />} />
                </Routes>
              </ThemeProvider>
            </AdminProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </LoadingWrapper>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;