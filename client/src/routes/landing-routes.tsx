import { Route } from "react-router-dom"
import Projects from "../components/sections/projects"
import { LandingLayout } from "../layout/landing-layout"
import Blogs from "../pages/dashboard/blogs"
import BlogDetails from "../pages/landing/blogs/blog-details"
import { Gallery } from "../pages/landing/gallery"
import { Home } from "../pages/landing/home"
import ProjectDetails from "../pages/landing/projects/project-details"

export const LandingRoutes = () => {
    return (
        <>
            {/* Public routes with landing layout */}
            <Route element={<LandingLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
                <Route path="/gallery" element={<Gallery />} />
            </Route>
        </>
    )
}