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
router.get('/', catchAsync(getAllContactMessages));
router.get('/:id', catchAsync(getContactMessage));
router.patch('/:id/read', catchAsync(toggleReadStatus));
router.patch('/:id/archive', catchAsync(toggleArchivedStatus));
router.delete('/:id', catchAsync(deleteContactMessage));

export default router; 