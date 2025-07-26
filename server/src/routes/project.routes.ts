import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload, cloudinaryUpload } from '../middleware/upload.middleware';
import { catchAsync } from '../middleware/error.middleware';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured,
} from '../controllers/project.controller';

const router = express.Router();

// Public routes
router.get('/', catchAsync(getAllProjects));
router.get('/:id', catchAsync(getProject));

// Admin routes
router.use('/admin', authMiddleware, adminMiddleware);
router.get('/admin', catchAsync(getAllProjects));
router.get('/admin/:id', catchAsync(getProject));
router.post('/admin', upload.array('images', 10), cloudinaryUpload, catchAsync(createProject));
router.put('/admin/:id', upload.array('images', 10), cloudinaryUpload, catchAsync(updateProject));
router.delete('/admin/:id', catchAsync(deleteProject));
router.patch('/admin/:id/featured', catchAsync(toggleFeatured));

export default router; 