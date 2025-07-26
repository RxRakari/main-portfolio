import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload, cloudinaryUpload } from '../middleware/upload.middleware';
import { catchAsync } from '../middleware/error.middleware';
import {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleFeatured,
} from '../controllers/testimonial.controller';

const router = express.Router();

// Public routes
router.get('/', catchAsync(getAllTestimonials));
router.get('/:id', catchAsync(getTestimonial));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllTestimonials));
router.get('/admin/:id', catchAsync(getTestimonial));
router.post('/admin', upload.single('avatar'), cloudinaryUpload, catchAsync(createTestimonial));
router.put('/admin/:id', upload.single('avatar'), cloudinaryUpload, catchAsync(updateTestimonial));
router.delete('/admin/:id', catchAsync(deleteTestimonial));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));

export default router; 