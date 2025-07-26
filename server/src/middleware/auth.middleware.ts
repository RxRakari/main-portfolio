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
    
    if (!authHeader) {
      console.log('Auth middleware: No authorization header');
      return next(new AppError('No authorization header', 401));
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Auth middleware: No token in authorization header');
      return next(new AppError('No token, authorization denied', 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      
      // Check if admin exists
      const admin = await Admin.findById(decoded.id);
      if (!admin) {
        console.log(`Auth middleware: Admin not found for ID ${decoded.id}`);
        return next(new AppError('Admin not found', 401));
      }
      
      // Add admin from payload
      req.user = {
        id: decoded.id,
        role: decoded.role
      };
      
      next();
    } catch (jwtError) {
      console.log('Auth middleware: JWT verification failed:', jwtError);
      if (jwtError instanceof jwt.JsonWebTokenError) {
        return next(new AppError('Invalid token', 401));
      }
      if (jwtError instanceof jwt.TokenExpiredError) {
        return next(new AppError('Token expired', 401));
      }
      return next(new AppError('Token verification failed', 401));
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
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