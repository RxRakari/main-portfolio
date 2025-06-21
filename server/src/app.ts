import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Import routes
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import projectRoutes from './routes/project.routes';
import testimonialRoutes from './routes/testimonial.routes';
import galleryRoutes from './routes/gallery.routes';
import contactRoutes from './routes/contact.routes';

// Import error middleware
import { errorHandler } from './middleware/error.middleware';

// Create Express app
const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
