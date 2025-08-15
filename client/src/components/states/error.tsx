import React from 'react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  title: string;
  message: string;
  code?: string | number;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while processing your request. Please try again later.',
  code,
  icon,
  action,
  className = '',
  size = 'medium',
  onRetry,
}) => {
  // Size classes mapping
  const sizeClasses = {
    small: {
      container: 'py-6 px-4',
      icon: 'text-4xl mb-2',
      title: 'text-lg mb-1',
      message: 'text-sm',
      code: 'text-xs',
    },
    medium: {
      container: 'py-12 px-6',
      icon: 'text-6xl mb-4',
      title: 'text-2xl mb-2',
      message: 'text-base',
      code: 'text-sm',
    },
    large: {
      container: 'py-20 px-8',
      icon: 'text-8xl mb-6',
      title: 'text-4xl mb-4',
      message: 'text-xl',
      code: 'text-base',
    },
  };

  // Default icon if none provided
  const defaultIcon = (
    <svg 
      className={`mx-auto ${sizeClasses[size].icon} text-red-500`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
      />
    </svg>
  );

  // Default retry button if onRetry provided but no custom action
  const retryButton = onRetry && !action ? (
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-white/5 border border-gray-800 rounded-[20px] text-white hover:bg-white/10 transition-all duration-300"
    >
      Try Again
    </button>
  ) : null;

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
      
      {code && (
        <div className={`mt-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-full ${sizeClasses[size].code}`}>
          Error Code: {code}
        </div>
      )}
      
      {(action || retryButton) && (
        <div className="mt-6">
          {action || retryButton}
        </div>
      )}
    </motion.div>
  );
};

export default ErrorState;
