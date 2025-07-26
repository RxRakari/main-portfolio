import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { catchAsync } from '../middleware/error.middleware';
import {
  getAllContactMessages,
  getContactMessage,
  submitContactMessage,
  toggleReadStatus,
  toggleArchivedStatus,
  deleteContactMessage,
} from '../controllers/contact.controller';

const router = express.Router();

// Public routes
router.post('/', catchAsync(submitContactMessage));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllContactMessages));
router.get('/admin/:id', catchAsync(getContactMessage));
router.patch('/admin/:id/read', catchAsync(toggleReadStatus));
router.patch('/admin/:id/archive', catchAsync(toggleArchivedStatus));
router.delete('/admin/:id', catchAsync(deleteContactMessage));

export default router; 