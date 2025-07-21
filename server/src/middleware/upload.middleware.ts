import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { AppError } from './error.middleware';

const storage = multer.memoryStorage();
export const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(null, false);
    }
    cb(null, true);
  }
});

export const cloudinaryUpload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    const fileStr = `data:${req.file.mimetype};base64,${Buffer.from(req.file.buffer).toString('base64')}`;
    
    const uploadResult = await cloudinary.uploader.upload(fileStr, {
      folder: 'monochrome-portfolio',
      resource_type: 'auto',
    });
    
    req.body.imageUrl = uploadResult.secure_url;
    req.body.cloudinaryId = uploadResult.public_id;
    
    next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    next(new AppError('Error uploading image', 500));
  }
}; 