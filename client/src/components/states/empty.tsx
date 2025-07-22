import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Found',
  message = 'There is nothing to display at the moment.',
  icon,
  action,
  className = '',
  size = 'medium',
}) => {
  // Size classes mapping
  const sizeClasses = {
    small: {
      container: 'py-6 px-4',
      icon: 'text-4xl mb-2',
      title: 'text-lg mb-1',
      message: 'text-sm',
    },
    medium: {
      container: 'py-12 px-6',
      icon: 'text-6xl mb-4',
      title: 'text-2xl mb-2',
      message: 'text-base',
    },
    large: {
      container: 'py-20 px-8',
      icon: 'text-8xl mb-6',
      title: 'text-4xl mb-4',
      message: 'text-xl',
    },
  };

  // Default icon if none provided
  const defaultIcon = (
    <svg 
      className={`mx-auto ${sizeClasses[size].icon} text-gray-400`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
      />
    </svg>
  );

  return (
    <motion.div 
      className={`w-full bg-white/5 border border-gray-800 rounded-[25px] flex flex-col items-center justify-center text-center ${sizeClasses[size].container} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={sizeClasses[size].icon}>
        {icon || defaultIcon}
      </div>
      
      <h3 className={`font-medium text-white ${sizeClasses[size].title}`}>
        {title}
      </h3>
      
      <p className={`text-gray-400 max-w-md mx-auto ${sizeClasses[size].message}`}>
        {message}
      </p>
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
