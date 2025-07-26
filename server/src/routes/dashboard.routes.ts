import express from 'express';
import { getDashboardStats, getLandingPageData } from '../controllers/dashboard.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';

const router = express.Router();

// Admin routes (protected)
router.get(
  '/admin/stats',
  authMiddleware,
  adminMiddleware,
  catchAsync(getDashboardStats)
);

// Public routes
router.get(
  '/landing-page',
  catchAsync(getLandingPageData)
);

export default router; 