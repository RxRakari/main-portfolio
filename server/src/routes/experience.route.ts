import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';
import {
  getAllExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  toggleFeatured,
} from '../controllers/experience.controller';

const router = express.Router();

// Public routes
router.get('/', cacheMiddleware({ ttl: 300 }), catchAsync(getAllExperiences));
router.get('/:id', cacheMiddleware({ ttl: 600 }), catchAsync(getExperience));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllExperiences));
router.get('/admin/:id', catchAsync(getExperience));
router.post('/admin', catchAsync(createExperience));
router.put('/admin/:id', catchAsync(updateExperience));
router.delete('/admin/:id', catchAsync(deleteExperience));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));

export default router;
