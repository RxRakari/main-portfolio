// Cache performance test utility
export const testCachePerformance = async () => {
  const startTime = performance.now();
  
  // Test multiple rapid requests to the same endpoint
  const promises = Array.from({ length: 10 }, () => 
    fetch('/api/blogs').then(res => res.json())
  );
  
  await Promise.all(promises);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  console.log(`Cache test completed in ${duration.toFixed(2)}ms`);
  console.log('If caching is working, subsequent requests should be much faster');
  
  return duration;
};

// Test React Query cache
export const testReactQueryCache = () => {
  console.log('React Query DevTools should show cached queries');
  console.log('Check the React Query DevTools panel for cache status');
};
