import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/error.middleware';
import Admin from '../schema/admin.schema';

/**
 * Register a new admin (only for development purposes)
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      throw new AppError('Please provide username, email and password', 400);
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (adminExists) {
      throw new AppError('Admin already exists', 400);
    }

    // Create new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password // Password will be hashed by the pre-save hook
    });

    // Create JWT token
    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );

    // Return admin data (without password) and token
    res.status(201).json({
      status: 'success',
      token,
      data: {
        admin: {
          id: newAdmin._id,
          username: newAdmin.username,
          email: newAdmin.email,
          role: newAdmin.role
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Registration failed: ${(error as Error).message}`, 500);
  }
};

/**
 * Login as admin
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check if password is correct
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );

    // Return admin data (without password) and token
    res.status(200).json({
      status: 'success',
      token,
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Login failed: ${(error as Error).message}`, 500);
  }
};

/**
 * Get admin profile
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findById(req.user.id);
    
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to get profile: ${(error as Error).message}`, 500);
  }
};

/**
 * Update admin profile
 */
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user.id).select('+password');
    
    if (!admin) {
      throw new AppError('Admin not found', 404);
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword) {
        throw new AppError('Current password is required to set a new password', 400);
      }
      
      const isPasswordValid = await admin.comparePassword(currentPassword);
      if (!isPasswordValid) {
        throw new AppError('Current password is incorrect', 401);
      }
      
      admin.password = newPassword;
    }

    // Update admin data
    if (username) admin.username = username;
    if (email) admin.email = email;

    await admin.save();

    res.status(200).json({
      status: 'success',
      data: {
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(`Failed to update profile: ${(error as Error).message}`, 500);
  }
}; 