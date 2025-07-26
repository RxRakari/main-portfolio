import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';
import {
  getAllSubscribers,
  subscribe,
  unsubscribe,
  deleteSubscriber,
  sendNewsletterToAll,
} from '../controllers/newsletter.controller';

const router = express.Router();

// Public routes
router.post('/subscribe', catchAsync(subscribe));
router.get('/unsubscribe/:token', catchAsync(unsubscribe));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllSubscribers));
router.delete('/admin/:id', catchAsync(deleteSubscriber));
router.post('/admin/send', catchAsync(sendNewsletterToAll));

export default router;
