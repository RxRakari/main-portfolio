import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload, cloudinaryUpload } from '../middleware/upload.middleware';
import { catchAsync } from '../middleware/error.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';
import {
  getAllGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  toggleFeatured,
} from '../controllers/gallery.controller';

const router = express.Router();

// Public routes with caching
router.get('/', cacheMiddleware({ ttl: 300 }), catchAsync(getAllGalleryItems));
router.get('/:id', cacheMiddleware({ ttl: 600 }), catchAsync(getGalleryItem));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllGalleryItems));
router.get('/admin/:id', catchAsync(getGalleryItem));
router.post('/admin', upload.single('imageFile'), cloudinaryUpload, catchAsync(createGalleryItem));
router.put('/admin/:id', upload.single('imageFile'), cloudinaryUpload, catchAsync(updateGalleryItem));
router.delete('/admin/:id', catchAsync(deleteGalleryItem));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));

export default router; 