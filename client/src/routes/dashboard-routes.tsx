import { Route } from "react-router-dom"
import DashboardLayout from "../layout/dashboard-layout"
import { Dashboard } from "../pages/dashboard"
import BlogsManagement from "../pages/dashboard/blogs"
import BlogForm from "../pages/dashboard/blogs/form"
import ContactsManagement from "../pages/dashboard/contacts"
import ExperienceManagement from "../pages/dashboard/experience"
import ExperienceForm from "../pages/dashboard/experience/form"
import GalleryManagement from "../pages/dashboard/gallery"
import GalleryForm from "../pages/dashboard/gallery/form"
import NewsletterManagement from "../pages/dashboard/newsletter/form"
import ProjectsManagement from "../pages/dashboard/projects"
import ProjectForm from "../pages/dashboard/projects/form"
import SettingsPage from "../pages/dashboard/settings"
import TestimonialsManagement from "../pages/dashboard/testimonials"
import TestimonialForm from "../pages/dashboard/testimonials/form"
import ProtectedRoute from "./protected"

export const DashboardRoutes = () => {
    return(
        <>
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
                      <Route path="newsletter/form" element={<TestimonialForm />} />
                      <Route path="newsletter/form/:id" element={<TestimonialForm />} />
                      
                      {/* Contact Messages Routes */}
                      <Route path="contacts" element={<ContactsManagement />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
        </>
    )
}