import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { specs } from './config/swagger';

import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import projectRoutes from './routes/project.routes';
import testimonialRoutes from './routes/testimonial.routes';
import galleryRoutes from './routes/gallery.routes';
import contactRoutes from './routes/contact.routes';
import experienceRoutes from './routes/experience.route';
import newsletterRoutes from './routes/newsletter.route';
import dashboardRoutes from './routes/dashboard.routes';

import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

const allowedOrigins = [
  "https://raptomx.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use(errorHandler);

export default app;
