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
    // Handle multiple files (e.g., projects images)
    const hasMultipleFiles = Array.isArray((req as any).files) && (req as any).files.length > 0;

    if (hasMultipleFiles) {
      const files = (req as any).files as Express.Multer.File[];

      const uploads: { url: string; cloudinaryId: string }[] = [];
      for (const file of files) {
        const fileStr = `data:${file.mimetype};base64,${Buffer.from(file.buffer).toString('base64')}`;
        const result = await cloudinary.uploader.upload(fileStr, {
          folder: 'monochrome-portfolio',
          resource_type: 'auto',
        });
        uploads.push({ url: result.secure_url, cloudinaryId: result.public_id });
      }

      // Merge with any existing images provided in body (for updates)
      let existingImages: { url: string; cloudinaryId?: string }[] = [];
      if (req.body.existingImages) {
        try {
          existingImages = JSON.parse(req.body.existingImages);
        } catch {
          existingImages = [];
        }
      }

      let combined = [...existingImages, ...uploads];

      // Reorder by featuredImageIndex if provided
      if (typeof req.body.featuredImageIndex !== 'undefined') {
        const idx = Number(req.body.featuredImageIndex);
        if (!Number.isNaN(idx) && idx >= 0 && idx < combined.length) {
          const [featured] = combined.splice(idx, 1);
          combined = [featured, ...combined];
        }
      }

      req.body.images = JSON.stringify(combined);
      return next();
    }

    // Handle single file (e.g., blog coverImage, testimonial avatar)
    if (req.file) {
      const fileStr = `data:${req.file.mimetype};base64,${Buffer.from(req.file.buffer).toString('base64')}`;
      const uploadResult = await cloudinary.uploader.upload(fileStr, {
        folder: 'monochrome-portfolio',
        resource_type: 'auto',
      });

      const fieldName = (req.file as Express.Multer.File).fieldname;
      if (fieldName === 'coverImage') {
        req.body.coverImage = uploadResult.secure_url;
      } else if (fieldName === 'avatar') {
        req.body.avatar = uploadResult.secure_url;
      } else {
        req.body.imageUrl = uploadResult.secure_url;
      }
      req.body.cloudinaryId = uploadResult.public_id;
      return next();
    }

    // No files provided (e.g., update without changing image) — allow through
    return next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    next(new AppError('Error uploading image', 500));
  }
};