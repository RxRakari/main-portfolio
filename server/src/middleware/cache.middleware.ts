import { Request, Response, NextFunction } from 'express';
import redisCache from '../config/redis';

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  keyGenerator?: (req: Request) => string;
  skipCache?: (req: Request) => boolean;
}

// Default cache TTL values (in seconds)
const DEFAULT_TTL = {
  blogs: 300, // 5 minutes
  projects: 300, // 5 minutes
  gallery: 300, // 5 minutes
  testimonials: 300, // 5 minutes
  experiences: 300, // 5 minutes
  contacts: 120, // 2 minutes (more dynamic)
  newsletter: 300, // 5 minutes
  landingPage: 600, // 10 minutes
  dashboardStats: 120, // 2 minutes
  popularContent: 300, // 5 minutes
};

export const cacheMiddleware = (options: CacheOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip cache if specified
    if (options.skipCache && options.skipCache(req)) {
      return next();
    }

    // Generate cache key
    const cacheKey = options.keyGenerator 
      ? options.keyGenerator(req)
      : generateDefaultCacheKey(req);

    try {
      // Try to get from cache
      const cachedData = await redisCache.get(cacheKey);
      
      if (cachedData) {
        console.log(`Cache HIT for key: ${cacheKey}`);
        return res.json(cachedData);
      }

      console.log(`Cache MISS for key: ${cacheKey}`);
      
      // Store original res.json method
      const originalJson = res.json.bind(res);
      
      // Override res.json to cache the response
      res.json = function(data: any) {
        // Cache the response
        const ttl = options.ttl || getDefaultTTL(req.path);
        redisCache.set(cacheKey, data, ttl).catch(err => {
          console.error('Failed to cache response:', err);
        });
        
        // Call original json method
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next(); // Continue without caching if Redis fails
    }
  };
};

// Generate cache key based on request
function generateDefaultCacheKey(req: Request): string {
  const { method, path, query } = req;
  
  // Only cache GET requests
  if (method !== 'GET') {
    return '';
  }

  // Create key from path and query parameters
  const queryString = Object.keys(query).length > 0 ? JSON.stringify(query) : '';
  return `${path}${queryString ? `:${queryString}` : ''}`;
}

// Get default TTL based on path
function getDefaultTTL(path: string): number {
  if (path.includes('/blogs')) return DEFAULT_TTL.blogs;
  if (path.includes('/projects')) return DEFAULT_TTL.projects;
  if (path.includes('/gallery')) return DEFAULT_TTL.gallery;
  if (path.includes('/testimonials')) return DEFAULT_TTL.testimonials;
  if (path.includes('/experience')) return DEFAULT_TTL.experiences;
  if (path.includes('/contact')) return DEFAULT_TTL.contacts;
  if (path.includes('/newsletter')) return DEFAULT_TTL.newsletter;
  if (path.includes('/dashboard/landing-page')) return DEFAULT_TTL.landingPage;
  if (path.includes('/dashboard/admin/stats')) return DEFAULT_TTL.dashboardStats;
  if (path.includes('/dashboard/admin/popular-content')) return DEFAULT_TTL.popularContent;
  
  return 300; // Default 5 minutes
}

// Invalidate cache for specific patterns
export const invalidateCache = async (patterns: string[]) => {
  try {
    for (const pattern of patterns) {
      await redisCache.delPattern(pattern);
      console.log(`Invalidated cache pattern: ${pattern}`);
    }
  } catch (error) {
    console.error('Failed to invalidate cache:', error);
  }
};

// Invalidate cache after mutations
export const invalidateRelatedCache = async (entityType: string, entityId?: string) => {
  const patterns = [];
  
  switch (entityType) {
    case 'blog':
      patterns.push('blogs:*', 'landing_page');
      if (entityId) patterns.push(`blog:${entityId}`);
      break;
    case 'project':
      patterns.push('projects:*', 'landing_page');
      if (entityId) patterns.push(`project:${entityId}`);
      break;
    case 'gallery':
      patterns.push('gallery:*', 'landing_page');
      if (entityId) patterns.push(`gallery_item:${entityId}`);
      break;
    case 'testimonial':
      patterns.push('testimonials:*', 'landing_page');
      if (entityId) patterns.push(`testimonial:${entityId}`);
      break;
    case 'experience':
      patterns.push('experiences:*', 'landing_page');
      if (entityId) patterns.push(`experience:${entityId}`);
      break;
    case 'contact':
      patterns.push('contacts:*');
      if (entityId) patterns.push(`contact:${entityId}`);
      break;
    case 'newsletter':
      patterns.push('newsletter:*');
      if (entityId) patterns.push(`newsletter:${entityId}`);
      break;
    default:
      patterns.push('landing_page', 'dashboard_stats', 'popular_content');
  }
  
  await invalidateCache(patterns);
};
