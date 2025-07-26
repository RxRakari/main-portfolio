import { Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import Experience from '../schema/experience.schema';

/**
 * Generate period string from dates
 */
const generatePeriod = (startDate: Date, endDate: Date | null, current: boolean): string => {
  const startYear = startDate ? startDate.getFullYear().toString() : '';
  const endYear = current ? 'Present' : (endDate ? endDate.getFullYear().toString() : '');
  return `${startYear} - ${endYear}`;
};

/**
 * Get all experience items
 */
export const getAllExperiences = async (req: Request, res: Response) => {
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
    const experiences = await Experience.find(query)
      .sort({ order: 1, startDate: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    // Get total count
    const total = await Experience.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: experiences.length,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
      data: {
        experiences,
      },
    });
  } catch (error) {
    throw new AppError(`Failed to get experiences: ${(error as Error).message}`, 500);
  }
};

/**
 * Get a single experience item
 */
export const getExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        experience,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to get experience: ${(error as Error).message}`, 500);
  }
};

/**
 * Create a new experience item
 */
export const createExperience = async (req: Request, res: Response) => {
  try {
    const {
      title,
      company,
      location,
      startDate,
      endDate,
      current,
      description,
      achievements,
      technologies,
      order,
      featured,
      period,
    } = req.body;
    
    // Parse boolean values from string
    const isCurrent = current === true || current === 'true';
    
    // Parse dates
    const startDateObj = new Date(startDate);
    const endDateObj = isCurrent ? null : endDate ? new Date(endDate) : null;
    
    // Generate period if not provided
    const periodString = period || generatePeriod(startDateObj, endDateObj, isCurrent);

    // Create new experience
    const newExperience = await Experience.create({
      title,
      company,
      location,
      startDate: startDateObj,
      endDate: endDateObj,
      current: isCurrent,
      period: periodString,
      description,
      achievements: achievements ? (typeof achievements === 'string' ? JSON.parse(achievements) : achievements) : [],
      technologies: technologies ? (typeof technologies === 'string' ? JSON.parse(technologies) : technologies) : [],
      order: Number(order) || 0,
      featured: featured === true || featured === 'true',
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        experience: newExperience,
      },
    });
  } catch (error) {
    throw new AppError(`Failed to create experience: ${(error as Error).message}`, 500);
  }
};

/**
 * Update an experience item
 */
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      company,
      location,
      startDate,
      endDate,
      current,
      description,
      achievements,
      technologies,
      order,
      featured,
      period,
    } = req.body;
    
    // Find experience
    const experience = await Experience.findById(id);
    
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    
    // Parse boolean values from string
    const isCurrent = current === true || current === 'true';
    
    // Parse dates
    const startDateObj = startDate ? new Date(startDate) : experience.startDate;
    const endDateObj = isCurrent ? null : endDate ? new Date(endDate) : experience.endDate as any;
    
    // Generate period if not provided or dates changed
    const periodString = period || generatePeriod(startDateObj, endDateObj, isCurrent);

    // Update experience
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      {
        title,
        company,
        location,
        startDate: startDateObj,
        endDate: endDateObj,
        current: isCurrent,
        period: periodString,
        description,
        achievements: achievements ? (typeof achievements === 'string' ? JSON.parse(achievements) : achievements) : experience.achievements,
        technologies: technologies ? (typeof technologies === 'string' ? JSON.parse(technologies) : technologies) : experience.technologies,
        order: Number(order) || experience.order,
        featured: featured === true || featured === 'true',
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        experience: updatedExperience,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to update experience: ${(error as Error).message}`, 500);
  }
};

/**
 * Delete an experience item
 */
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findByIdAndDelete(id);
    
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to delete experience: ${(error as Error).message}`, 500);
  }
};

/**
 * Toggle experience featured status
 */
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const experience = await Experience.findById(id);
    
    if (!experience) {
      throw new AppError('Experience not found', 404);
    }
    
    experience.featured = !experience.featured;
    await experience.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        experience,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to toggle featured status: ${(error as Error).message}`, 500);
  }
}; 