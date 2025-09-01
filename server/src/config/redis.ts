import { createClient, RedisClientType } from 'redis';

class RedisCache {
  private client: RedisClientType;
  private isConnected: boolean = false;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            console.error('Redis connection failed after 10 retries');
            return new Error('Redis connection failed');
          }
          return Math.min(retries * 100, 3000);
        },
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      console.log('Redis Client Connected');
      this.isConnected = true;
    });

    this.client.on('disconnect', () => {
      console.log('Redis Client Disconnected');
      this.isConnected = false;
    });
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
      } catch (error) {
        console.error('Failed to connect to Redis:', error);
        // Continue without Redis if connection fails
      }
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
    }
  }

  async get(key: string): Promise<any> {
    if (!this.isConnected) return null;
    
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    if (!this.isConnected) return;
    
    try {
      await this.client.setEx(key, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      console.error('Redis SET error:', error);
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) return;
    
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Redis DEL error:', error);
    }
  }

  async delPattern(pattern: string): Promise<void> {
    if (!this.isConnected) return;
    
    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Redis DEL pattern error:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) return false;
    
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  }

  // Cache key generators
  static generateKey(prefix: string, ...parts: (string | number)[]): string {
    return `${prefix}:${parts.join(':')}`;
  }

  // Common cache keys
  static keys = {
    blogs: (params?: any) => RedisCache.generateKey('blogs', params ? JSON.stringify(params) : 'all'),
    blog: (id: string) => RedisCache.generateKey('blog', id),
    projects: (params?: any) => RedisCache.generateKey('projects', params ? JSON.stringify(params) : 'all'),
    project: (id: string) => RedisCache.generateKey('project', id),
    gallery: (params?: any) => RedisCache.generateKey('gallery', params ? JSON.stringify(params) : 'all'),
    galleryItem: (id: string) => RedisCache.generateKey('gallery_item', id),
    testimonials: (params?: any) => RedisCache.generateKey('testimonials', params ? JSON.stringify(params) : 'all'),
    testimonial: (id: string) => RedisCache.generateKey('testimonial', id),
    experiences: (params?: any) => RedisCache.generateKey('experiences', params ? JSON.stringify(params) : 'all'),
    experience: (id: string) => RedisCache.generateKey('experience', id),
    contacts: (params?: any) => RedisCache.generateKey('contacts', params ? JSON.stringify(params) : 'all'),
    contact: (id: string) => RedisCache.generateKey('contact', id),
    newsletter: (params?: any) => RedisCache.generateKey('newsletter', params ? JSON.stringify(params) : 'all'),
    landingPage: () => RedisCache.generateKey('landing_page'),
    dashboardStats: () => RedisCache.generateKey('dashboard_stats'),
    popularContent: () => RedisCache.generateKey('popular_content'),
  };
}

// Create singleton instance
const redisCache = new RedisCache();

export default redisCache;
