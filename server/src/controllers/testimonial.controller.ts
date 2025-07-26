import { Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import Testimonial from '../schema/testimonial.schema';
import cloudinary from '../config/cloudinary';

/**
 * Get all testimonials
 */
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const { featured, limit = 10, page = 1 } = req.query;
    
    // Build query
    const query: any = {};
    
    if (featured) {
      query.featured = featured === 'true';
    }
    
    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    
    // Execute query
    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count
    const total = await Testimonial.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: testimonials.length,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      data: {
        testimonials,
      },
    });
  } catch (error) {
    throw new AppError(`Failed to get testimonials: ${(error as Error).message}`, 500);
  }
};

/**
 * Get a single testimonial
 */
export const getTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        testimonial,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to get testimonial: ${(error as Error).message}`, 500);
  }
};

/**
 * Create a new testimonial
 */
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const {
      name,
      position,
      company,
      testimonial,
      rating,
      avatar,
      cloudinaryId,
      featured,
    } = req.body;
    
    // Create new testimonial
    const newTestimonial = await Testimonial.create({
      name,
      position,
      company,
      testimonial,
      rating: Number(rating),
      avatar,
      cloudinaryId,
      featured: featured === 'true',
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        testimonial: newTestimonial,
      },
    });
  } catch (error) {
    throw new AppError(`Failed to create testimonial: ${(error as Error).message}`, 500);
  }
};

/**
 * Update a testimonial
 */
export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      company,
      testimonial,
      rating,
      avatar,
      cloudinaryId,
      featured,
    } = req.body;
    
    // Find testimonial
    const existingTestimonial = await Testimonial.findById(id);
    
    if (!existingTestimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    
    // Update testimonial
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        name,
        position,
        company,
        testimonial,
        rating: Number(rating),
        avatar,
        cloudinaryId,
        featured: featured === 'true',
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        testimonial: updatedTestimonial,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to update testimonial: ${(error as Error).message}`, 500);
  }
};

/**
 * Delete a testimonial
 */
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    
    // Delete avatar from Cloudinary if it exists
    if (testimonial.cloudinaryId) {
      await cloudinary.uploader.destroy(testimonial.cloudinaryId);
    }
    
    await Testimonial.findByIdAndDelete(id);
    
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to delete testimonial: ${(error as Error).message}`, 500);
  }
};

/**
 * Toggle testimonial featured status
 */
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const testimonial = await Testimonial.findById(id);
    
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    
    testimonial.featured = !testimonial.featured;
    await testimonial.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        testimonial,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to toggle featured status: ${(error as Error).message}`, 500);
  }
}; 