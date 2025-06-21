# Monochrome Portfolio

A sleek, minimalist portfolio website with a black and white theme, featuring an admin dashboard for content management.

## Features

- Admin dashboard to manage content
- Blog management
- Project showcase
- Testimonials
- Gallery with image uploads via Cloudinary
- Contact form with email notifications
- Responsive monochrome design
- API documentation with Swagger

## Tech Stack

### Frontend
- React 19
- React Router DOM
- TailwindCSS
- TypeScript

### Backend
- Express.js
- MongoDB
- Cloudinary for image storage
- Nodemailer for email functionality
- JWT for authentication
- Swagger for API documentation

## Setup Instructions

### Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Backend

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment variables file:
   ```
   npm run setup
   ```

4. Edit the `.env` file with your actual credentials:
   - MongoDB connection string
   - JWT secret
   - Cloudinary credentials
   - Email service credentials

5. Create the initial admin user:
   ```
   npm run create-admin
   ```
   This will create an admin user with:
   - Email: admin@example.com
   - Password: admin123

6. Start the development server:
   ```
   npm run dev
   ```

7. Access the API documentation:
   ```
   http://localhost:5000/api-docs
   ```

## Admin Dashboard Access

After setting up the backend, you can log in to the admin dashboard with:
- Email: admin@example.com
- Password: admin123

It's recommended to change the default password after your first login.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin (development only)
- `POST /api/auth/login` - Login as admin
- `GET /api/auth/profile` - Get admin profile (protected)
- `PUT /api/auth/profile` - Update admin profile (protected)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get a specific blog
- `POST /api/blogs` - Create a new blog (protected)
- `PUT /api/blogs/:id` - Update a blog (protected)
- `DELETE /api/blogs/:id` - Delete a blog (protected)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project (protected)
- `PUT /api/projects/:id` - Update a project (protected)
- `DELETE /api/projects/:id` - Delete a project (protected)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/:id` - Get a specific testimonial
- `POST /api/testimonials` - Create a new testimonial (protected)
- `PUT /api/testimonials/:id` - Update a testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete a testimonial (protected)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Upload a new image (protected)
- `DELETE /api/gallery/:id` - Delete an image (protected)

### Contact
- `POST /api/contact` - Submit a contact form
- `GET /api/contact` - Get all contact submissions (protected)
- `DELETE /api/contact/:id` - Delete a contact submission (protected)

## License

ISC 