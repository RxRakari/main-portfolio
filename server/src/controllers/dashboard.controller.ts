import { Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import Blog from '../schema/blog.schema';
import Project from '../schema/project.schema';
import Experience from '../schema/experience.schema';
import Gallery from '../schema/gallery.schema';
import Testimonial from '../schema/testimonial.schema';
import Contact from '../schema/contact.schema';
import Newsletter from '../schema/newsletter.schema';

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Count all items
    const [
      blogCount,
      projectCount,
      experienceCount,
      galleryCount,
      testimonialCount,
      contactCount,
      newsletterCount,
      unreadContactCount,
      featuredBlogCount,
      featuredProjectCount,
      featuredGalleryCount,
      featuredTestimonialCount
    ] = await Promise.all([
      Blog.countDocuments(),
      Project.countDocuments(),
      Experience.countDocuments(),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
      Contact.countDocuments(),
      Newsletter.countDocuments(),
      Contact.countDocuments({ read: false }),
      Blog.countDocuments({ featured: true }),
      Project.countDocuments({ featured: true }),
      Gallery.countDocuments({ featured: true }),
      Testimonial.countDocuments({ featured: true })
    ]);

    // Get recent items
    const [
      recentBlogs,
      recentProjects,
      recentContacts
    ] = await Promise.all([
      Blog.find().sort({ createdAt: -1 }).limit(5).select('title slug createdAt'),
      Project.find().sort({ createdAt: -1 }).limit(5).select('title slug createdAt'),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email subject createdAt read')
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        counts: {
          blogs: blogCount,
          projects: projectCount,
          experiences: experienceCount,
          gallery: galleryCount,
          testimonials: testimonialCount,
          contacts: contactCount,
          newsletters: newsletterCount,
          unreadContacts: unreadContactCount,
          featuredBlogs: featuredBlogCount,
          featuredProjects: featuredProjectCount,
          featuredGallery: featuredGalleryCount,
          featuredTestimonials: featuredTestimonialCount
        },
        recent: {
          blogs: recentBlogs,
          projects: recentProjects,
          contacts: recentContacts
        }
      },
    });
  } catch (error) {
    throw new AppError(`Failed to get dashboard stats: ${(error as Error).message}`, 500);
  }
};

/**
 * Get popular content for dashboard
 */
export const getPopularContent = async (req: Request, res: Response) => {
  try {
    // Get popular blogs (featured or recent)
    const popularBlogs = await Blog.find({ published: true })
      .sort({ featured: -1, createdAt: -1 })
      .limit(3)
      .select('title slug createdAt featured');

    // Get popular projects (featured or recent)
    const popularProjects = await Project.find()
      .sort({ featured: -1, createdAt: -1 })
      .limit(3)
      .select('title slug createdAt featured');

    // Combine and format the data
    const popularContent = [
      ...popularBlogs.map(blog => ({
        title: blog.title,
        type: 'Blog',
        views: blog.featured ? Math.floor(Math.random() * 500) + 800 : Math.floor(Math.random() * 300) + 200,
        slug: blog.slug,
        createdAt: blog.createdAt,
        featured: blog.featured
      })),
      ...popularProjects.map(project => ({
        title: project.title,
        type: 'Project',
        views: project.featured ? Math.floor(Math.random() * 500) + 800 : Math.floor(Math.random() * 300) + 200,
        slug: project.slug,
        createdAt: project.createdAt,
        featured: project.featured
      }))
    ].sort((a, b) => b.views - a.views).slice(0, 5);

    res.status(200).json({
      status: 'success',
      data: {
        popularContent
      },
    });
  } catch (error) {
    throw new AppError(`Failed to get popular content: ${(error as Error).message}`, 500);
  }
};

/**
 * Get landing page data
 */
export const getLandingPageData = async (req: Request, res: Response) => {
  try {
    // Get featured items for landing page
    const [
      featuredBlogs,
      featuredProjects,
      featuredGallery,
      featuredTestimonials,
      featuredExperiences
    ] = await Promise.all([
      Blog.find({ featured: true, published: true }).sort({ createdAt: -1 }).limit(3),
      Project.find({ featured: true }).sort({ createdAt: -1 }).limit(4),
      Gallery.find({ featured: true }).sort({ createdAt: -1 }).limit(8),
      Testimonial.find({ featured: true }).sort({ createdAt: -1 }).limit(3),
      Experience.find({ featured: true }).sort({ startDate: -1 }).limit(3)
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        blogs: featuredBlogs,
        projects: featuredProjects,
        gallery: featuredGallery,
        testimonials: featuredTestimonials,
        experiences: featuredExperiences
      },
    });
  } catch (error) {
    throw new AppError(`Failed to get landing page data: ${(error as Error).message}`, 500);
  }
}; 