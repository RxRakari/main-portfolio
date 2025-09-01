import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload, cloudinaryUpload } from '../middleware/upload.middleware';
import { catchAsync } from '../middleware/error.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleFeatured,
  togglePublished,
} from '../controllers/blog.controller';

const router = express.Router();

// Public routes with caching
router.get('/', cacheMiddleware({ ttl: 300 }), catchAsync(getAllBlogs));
router.get('/:id', cacheMiddleware({ ttl: 600 }), catchAsync(getBlog));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllBlogs));
router.get('/admin/:id', catchAsync(getBlog));
router.post('/admin', upload.single('coverImage'), cloudinaryUpload, catchAsync(createBlog));
router.put('/admin/:id', upload.single('coverImage'), cloudinaryUpload, catchAsync(updateBlog));
router.delete('/admin/:id', catchAsync(deleteBlog));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));
router.patch('/admin/:id/published', catchAsync(togglePublished));

export default router; 