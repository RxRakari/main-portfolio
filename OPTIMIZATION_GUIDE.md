# Portfolio Optimization Guide

## Overview
This document outlines the comprehensive caching and performance optimizations implemented for the portfolio application.

## Frontend Optimizations

### React Query Implementation
- **Library**: `@tanstack/react-query` with devtools
- **Configuration**: 
  - Stale time: 5 minutes
  - Cache time: 10 minutes
  - Automatic background refetching disabled
  - Retry: 3 attempts

### Query Hooks
All data fetching is now handled through custom React Query hooks:

#### Landing Page Data
- `useLandingPageData()` - Fetches all landing page data
- `useAllLandingData()` - Combines all data queries for global loading

#### Individual Data Hooks
- `useBlogs()`, `useBlog(id)`, `useFeaturedBlogs()`
- `useProjects()`, `useProject(id)`, `useFeaturedProjects()`
- `useGalleryItems()`, `useGalleryItem(id)`
- `useTestimonials()`, `useTestimonial(id)`
- `useExperiences()`, `useExperience(id)`, `useFeaturedExperiences()`
- `useContacts()`, `useContact(id)`
- `useNewsletterSubscribers()`
- `useDashboardStats()`, `usePopularContent()`

### Mutation Hooks
All data mutations include automatic cache invalidation:

#### Blog Mutations
- `useCreateBlog()`, `useUpdateBlog()`, `useDeleteBlog()`
- `useToggleBlogFeatured()`, `useToggleBlogPublished()`

#### Project Mutations
- `useCreateProject()`, `useUpdateProject()`, `useDeleteProject()`
- `useToggleProjectFeatured()`, `useToggleProjectPublished()`

#### Gallery Mutations
- `useCreateGalleryItem()`, `useUpdateGalleryItem()`, `useDeleteGalleryItem()`
- `useToggleGalleryFeatured()`

#### Other Mutations
- `useSubmitContact()`, `useSubscribeNewsletter()`
- And more for testimonials, experiences, etc.

### Global Loading Strategy
- The app waits for ALL data to load before showing content
- Uses `useAllLandingData()` to coordinate multiple queries
- Loading screen displays until all essential data is cached

## Backend Optimizations

### Redis Caching
- **Library**: `redis` with TypeScript support
- **Configuration**: Automatic reconnection with exponential backoff
- **Fallback**: Graceful degradation if Redis is unavailable

### Cache Middleware
- **TTL Configuration**:
  - Landing page data: 10 minutes
  - Individual items: 10 minutes
  - Lists: 5 minutes
  - Stats: 2 minutes
  - Contacts: 2 minutes (more dynamic)

### Cache Invalidation
- Automatic cache invalidation on mutations
- Pattern-based cache clearing
- Related data invalidation (e.g., updating a blog invalidates landing page cache)

### Route-Level Caching
All public GET routes now include caching:
- `/api/blogs` - 5 minutes
- `/api/blogs/:id` - 10 minutes
- `/api/projects` - 5 minutes
- `/api/projects/:id` - 10 minutes
- `/api/gallery` - 5 minutes
- `/api/gallery/:id` - 10 minutes
- `/api/testimonials` - 5 minutes
- `/api/experience` - 5 minutes
- `/api/dashboard/landing-page` - 10 minutes
- `/api/dashboard/admin/stats` - 2 minutes

## Performance Benefits

### Frontend
1. **Instant Navigation**: Cached data loads immediately
2. **Reduced API Calls**: Data persists across page navigation
3. **Background Updates**: Stale data is refreshed in background
4. **Optimistic Updates**: UI updates immediately on mutations
5. **Error Recovery**: Automatic retry with exponential backoff

### Backend
1. **Reduced Database Load**: Cached responses serve most requests
2. **Faster Response Times**: Redis is much faster than database queries
3. **Scalability**: Can handle more concurrent users
4. **Resource Efficiency**: Less CPU and memory usage

## Cache Strategy

### Frontend Caching
- **Query Keys**: Hierarchical structure for easy invalidation
- **Stale-While-Revalidate**: Show cached data while fetching fresh data
- **Background Refetch**: Update cache without blocking UI
- **Selective Invalidation**: Only invalidate related cache entries

### Backend Caching
- **Write-Through**: Cache is updated on mutations
- **TTL-Based Expiration**: Automatic cache expiration
- **Pattern Invalidation**: Clear related cache entries
- **Graceful Degradation**: App works without Redis

## Monitoring and Debugging

### React Query DevTools
- Available in development mode
- Shows cache status, query states, and performance metrics
- Access via browser extension or built-in devtools

### Cache Testing
Use the provided test utilities:
```typescript
import { testCachePerformance, testReactQueryCache } from './utils/cache-test';

// Test backend cache performance
await testCachePerformance();

// Test React Query cache
testReactQueryCache();
```

### Redis Monitoring
- Check Redis connection status in server logs
- Monitor cache hit/miss ratios
- Use Redis CLI for manual cache inspection

## Environment Setup

### Required Environment Variables
```env
# Redis Configuration
REDIS_URL=redis://localhost:6379

# Existing variables...
MONGODB_URI=your_mongodb_uri
```

### Redis Installation
```bash
# macOS
brew install redis
brew services start redis

# Ubuntu/Debian
sudo apt-get install redis-server
sudo systemctl start redis

# Docker
docker run -d -p 6379:6379 redis:alpine
```

## Best Practices

### Frontend
1. Use appropriate query keys for easy invalidation
2. Set reasonable stale times based on data freshness requirements
3. Handle loading and error states gracefully
4. Use mutations for data modifications
5. Implement optimistic updates where appropriate

### Backend
1. Set appropriate TTL values for different data types
2. Invalidate cache on mutations
3. Use pattern-based invalidation for related data
4. Monitor cache hit rates
5. Implement fallback mechanisms

## Troubleshooting

### Common Issues
1. **Cache not working**: Check Redis connection and middleware setup
2. **Stale data**: Verify cache invalidation on mutations
3. **Memory issues**: Monitor Redis memory usage and set appropriate limits
4. **Performance issues**: Check cache hit rates and TTL settings

### Debug Commands
```bash
# Check Redis status
redis-cli ping

# Monitor Redis commands
redis-cli monitor

# Check cache keys
redis-cli keys "*"

# Clear all cache
redis-cli flushall
```

## Future Enhancements
1. **CDN Integration**: Add CDN for static assets
2. **Service Worker**: Implement offline caching
3. **Image Optimization**: Add image compression and lazy loading
4. **Database Indexing**: Optimize database queries
5. **Load Balancing**: Add multiple Redis instances
6. **Cache Warming**: Pre-populate cache on startup
