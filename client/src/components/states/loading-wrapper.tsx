import React, { useState, useEffect } from 'react';
import { FullscreenLoader } from './spinner';

interface LoadingWrapperProps {
  children: React.ReactNode;
  isLoading?: boolean;
  logo?: React.ReactNode;
  minLoadingTime?: number;
  loadingText?: string;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  children,
  isLoading: externalLoading,
  logo,
  minLoadingTime = 1500, // Minimum loading time in ms
  loadingText = 'Loading...',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
    
    // If external loading state is provided, use it
    const shouldLoad = externalLoading !== undefined ? externalLoading : true;
    
    if (shouldLoad) {
      // Reset loading state
      setIsLoading(true);
      setLoadingPercentage(0);
      
      // Simulate progress
      interval = setInterval(() => {
        setLoadingPercentage(prev => {
          // Slow down as we approach 90%
          const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 2 : 1;
          const next = Math.min(prev + increment, 90);
          return next;
        });
      }, 150);
      
      // Set minimum loading time
      timeout = setTimeout(() => {
        clearInterval(interval);
        setLoadingPercentage(100);
        
        // Small delay to show 100% before hiding
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }, minLoadingTime);
    } else {
      setIsLoading(false);
    }
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [externalLoading, minLoadingTime]);

  // If we're still loading, show the loader
  if (isLoading) {
    return <FullscreenLoader percentage={loadingPercentage} text={loadingText} logo={logo} />;
  }

  // Otherwise, show the children
  return <>{children}</>;
};

export default LoadingWrapper; 