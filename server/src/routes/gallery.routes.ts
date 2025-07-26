import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload, cloudinaryUpload } from '../middleware/upload.middleware';
import { catchAsync } from '../middleware/error.middleware';
import {
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  toggleFeatured,
} from '../controllers/gallery.controller';

const router = express.Router();

// Public routes
router.get('/', catchAsync(getAllGalleryItems));
router.get('/:id', catchAsync(getGalleryItem));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllGalleryItems));
router.get('/admin/:id', catchAsync(getGalleryItem));
router.post('/admin', upload.single('imageFile'), cloudinaryUpload, catchAsync(createGalleryItem));
router.put('/admin/:id', upload.single('imageFile'), cloudinaryUpload, catchAsync(updateGalleryItem));
router.delete('/admin/:id', catchAsync(deleteGalleryItem));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));

export default router; 