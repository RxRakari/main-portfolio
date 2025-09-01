import express from 'express';
import { getDashboardStats, getLandingPageData, getPopularContent } from '../controllers/dashboard.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';
import { cacheMiddleware } from '../middleware/cache.middleware';

const router = express.Router();

// Admin routes (protected) with caching
router.get(
  '/admin/stats',
  authMiddleware,
  adminMiddleware,
  cacheMiddleware({ ttl: 120 }), // 2 minutes for stats
  catchAsync(getDashboardStats)
);

router.get(
  '/admin/popular-content',
  authMiddleware,
  adminMiddleware,
  cacheMiddleware({ ttl: 300 }), // 5 minutes for popular content
  catchAsync(getPopularContent)
);

// Public routes with caching
router.get(
  '/landing-page',
  cacheMiddleware({ ttl: 600 }), // 10 minutes for landing page data
  catchAsync(getLandingPageData)
);

export default router; 