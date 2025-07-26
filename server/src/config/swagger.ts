import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import dotenv from 'dotenv';

dotenv.config();

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Monochrome Portfolio API',
      version,
      description: 'API documentation for the Monochrome Portfolio application',
      license: {
        name: 'ISC',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Admin: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the admin',
            },
            username: {
              type: 'string',
              description: 'Admin username',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Admin password',
            },
            role: {
              type: 'string',
              enum: ['admin'],
              description: 'Admin role',
            },
          },
        },
        Blog: {
          type: 'object',
          required: ['title', 'subtitle', 'coverImage', 'category', 'author', 'readTime', 'intro', 'content'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the blog',
            },
            title: {
              type: 'string',
              description: 'Blog title',
            },
            subtitle: {
              type: 'string',
              description: 'Blog subtitle',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly version of the title',
            },
            coverImage: {
              type: 'string',
              description: 'URL of the blog cover image',
            },
            cloudinaryId: {
              type: 'string',
              description: 'Cloudinary ID of the cover image',
            },
            category: {
              type: 'string',
              description: 'Blog category',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Blog tags',
            },
            author: {
              type: 'string',
              description: 'Blog author',
            },
            readTime: {
              type: 'string',
              description: 'Estimated read time',
            },
            intro: {
              type: 'string',
              description: 'Blog introduction',
            },
            content: {
              type: 'string',
              description: 'Blog content',
            },
            sections: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'Section ID',
                  },
                  title: {
                    type: 'string',
                    description: 'Section title',
                  },
                  content: {
                    type: 'string',
                    description: 'Section content',
                  },
                },
              },
              description: 'Blog sections',
            },
            published: {
              type: 'boolean',
              description: 'Whether the blog is published',
            },
            featured: {
              type: 'boolean',
              description: 'Whether the blog is featured',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Project: {
          type: 'object',
          required: ['title', 'description', 'category', 'images', 'approach', 'challenges'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the project',
            },
            title: {
              type: 'string',
              description: 'Project title',
            },
            slug: {
              type: 'string',
              description: 'URL-friendly version of the title',
            },
            description: {
              type: 'string',
              description: 'Project description',
            },
            category: {
              type: 'string',
              description: 'Project category',
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Technologies used in the project',
            },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    description: 'Image URL',
                  },
                  cloudinaryId: {
                    type: 'string',
                    description: 'Cloudinary ID of the image',
                  },
                },
              },
              description: 'Project images',
            },
            githubUrl: {
              type: 'string',
              description: 'GitHub repository URL',
            },
            liveUrl: {
              type: 'string',
              description: 'Live project URL',
            },
            featured: {
              type: 'boolean',
              description: 'Whether the project is featured',
            },
            approach: {
              type: 'string',
              description: 'Project approach description',
            },
            challenges: {
              type: 'string',
              description: 'Project challenges description',
            },
            features: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Project features',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Experience: {
          type: 'object',
          required: ['title', 'company', 'location', 'startDate', 'description'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the experience',
            },
            title: {
              type: 'string',
              description: 'Job title',
            },
            company: {
              type: 'string',
              description: 'Company name',
            },
            location: {
              type: 'string',
              description: 'Job location',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Start date',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'End date',
            },
            current: {
              type: 'boolean',
              description: 'Whether this is the current job',
            },
            description: {
              type: 'string',
              description: 'Job description',
            },
            achievements: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Key achievements',
            },
            technologies: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Technologies used',
            },
            order: {
              type: 'number',
              description: 'Display order',
            },
            featured: {
              type: 'boolean',
              description: 'Whether the experience is featured',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Testimonial: {
          type: 'object',
          required: ['name', 'position', 'company', 'testimonial', 'rating', 'avatar'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the testimonial',
            },
            name: {
              type: 'string',
              description: 'Person name',
            },
            position: {
              type: 'string',
              description: 'Person position/title',
            },
            company: {
              type: 'string',
              description: 'Company name',
            },
            testimonial: {
              type: 'string',
              description: 'Testimonial content',
            },
            rating: {
              type: 'number',
              minimum: 1,
              maximum: 5,
              description: 'Rating (1-5)',
            },
            avatar: {
              type: 'string',
              description: 'Avatar image URL',
            },
            cloudinaryId: {
              type: 'string',
              description: 'Cloudinary ID of the avatar',
            },
            featured: {
              type: 'boolean',
              description: 'Whether the testimonial is featured',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Gallery: {
          type: 'object',
          required: ['title', 'description', 'category', 'imageUrl'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the gallery item',
            },
            title: {
              type: 'string',
              description: 'Image title',
            },
            description: {
              type: 'string',
              description: 'Image description',
            },
            category: {
              type: 'string',
              description: 'Image category',
            },
            imageUrl: {
              type: 'string',
              description: 'Image URL',
            },
            cloudinaryId: {
              type: 'string',
              description: 'Cloudinary ID of the image',
            },
            order: {
              type: 'number',
              description: 'Display order',
            },
            featured: {
              type: 'boolean',
              description: 'Whether the gallery item is featured',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Contact: {
          type: 'object',
          required: ['name', 'email', 'subject', 'message'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the contact message',
            },
            name: {
              type: 'string',
              description: 'Sender name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Sender email',
            },
            subject: {
              type: 'string',
              description: 'Message subject',
            },
            message: {
              type: 'string',
              description: 'Message content',
            },
            read: {
              type: 'boolean',
              description: 'Whether the message has been read',
            },
            archived: {
              type: 'boolean',
              description: 'Whether the message has been archived',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        NewsletterSubscriber: {
          type: 'object',
          required: ['email'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated ID of the subscriber',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Subscriber email',
            },
            name: {
              type: 'string',
              description: 'Subscriber name',
            },
            active: {
              type: 'boolean',
              description: 'Whether the subscription is active',
            },
            unsubscribeToken: {
              type: 'string',
              description: 'Token for unsubscribing',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 