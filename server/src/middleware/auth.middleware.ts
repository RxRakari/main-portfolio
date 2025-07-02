import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error.middleware';
import Admin from '../schema/admin.schema';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(new AppError('No token, authorization denied', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    
    // Check if admin exists
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return next(new AppError('Admin not found', 401));
    }
    
    // Add admin from payload
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    next(new AppError('Server error during authentication', 500));
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new AppError('Access denied: Admin role required', 403));
  }
}; 