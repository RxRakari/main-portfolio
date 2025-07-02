import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { LandingLayout } from './layout/landing-layout';
import DashboardLayout from './layout/dashboard-layout';

// Landing pages
import { Home } from './pages/landing/home';
import { About } from './pages/landing/aboutme';
import { Blogs } from './pages/landing/blogs';
import { Contact } from './pages/landing/contact';

// Auth pages
import Login from './pages/auth/login';

// Dashboard pages
import { Dashboard } from './pages/dashboard/index';

// Protected Route
import ProtectedRoute from './routes/protected';
import NotFound from './routes/404';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Public routes with landing layout */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="blogs/*" element={<div>Blogs Management</div>} />
                <Route path="projects/*" element={<div>Projects Management</div>} />
                <Route path="testimonials/*" element={<div>Testimonials Management</div>} />
                <Route path="gallery/*" element={<div>Gallery Management</div>} />
                <Route path="contacts/*" element={<div>Contact Submissions</div>} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path='/not-found' element={<NotFound /> } />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;