import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'dots' | 'bars' | 'pulse' | 'logo';
  color?: string;
  text?: string;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  fullScreen?: boolean;
  className?: string;
  showPercentage?: boolean;
  percentage?: number;
  logo?: React.ReactNode;
  withOverlay?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'circle',
  color = 'purple',
  text,
  textPosition = 'bottom',
  fullScreen = false,
  className = '',
  showPercentage = false,
  percentage = 0,
  logo,
  withOverlay = false,
}) => {
  // Size mapping
  const sizeMap = {
    xs: { spinner: 'h-4 w-4', text: 'text-xs', container: 'gap-1' },
    sm: { spinner: 'h-6 w-6', text: 'text-sm', container: 'gap-2' },
    md: { spinner: 'h-10 w-10', text: 'text-base', container: 'gap-3' },
    lg: { spinner: 'h-16 w-16', text: 'text-lg', container: 'gap-4' },
    xl: { spinner: 'h-24 w-24', text: 'text-xl', container: 'gap-4' },
  };

  // Color mapping
  const colorMap = {
    purple: 'text-purple-500',
    white: 'text-white',
    gray: 'text-gray-400',
    blue: 'text-blue-500',
    green: 'text-green-500',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500',
  };

  // Container direction based on text position
  const containerDirection = {
    top: 'flex-col-reverse',
    bottom: 'flex-col',
    left: 'flex-row-reverse',
    right: 'flex-row',
  };

  // Wrapper classes
  const wrapperClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center z-50 bg-black/80'
    : 'flex items-center justify-center';

  // Render the spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'circle':
        return (
          <div className={`relative ${sizeMap[size].spinner}`}>
            <motion.div
              className={`absolute inset-0 rounded-full border-t-2 border-r-2 border-b-2 border-transparent ${colorMap[color as keyof typeof colorMap]}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            {showPercentage && (
              <div className={`absolute inset-0 flex items-center justify-center ${sizeMap[size].text}`}>
                {percentage}%
              </div>
            )}
          </div>
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`rounded-full ${colorMap[color as keyof typeof colorMap]} ${sizeMap[size].spinner.split(' ')[0].replace('h-', 'h-').replace('w-', 'w-')}`}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`w-2 bg-current ${colorMap[color as keyof typeof colorMap]}`}
                initial={{ height: 10 }}
                animate={{ height: [10, 30, 10] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`relative ${sizeMap[size].spinner}`}>
            <motion.div
              className={`absolute inset-0 rounded-full ${colorMap[color as keyof typeof colorMap]}`}
              initial={{ opacity: 0.2, scale: 0.8 }}
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {logo && (
              <div className="absolute inset-0 flex items-center justify-center">
                {logo}
              </div>
            )}
          </div>
        );

      case 'logo':
        return (
          <div className={`relative ${sizeMap[size].spinner}`}>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 1, rotate: 0 }}
              animate={{ opacity: [1, 0.8, 1], rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {logo || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`w-full h-full ${colorMap[color as keyof typeof colorMap]}`}
                >
                  <path
                    fill="currentColor"
                    d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83c-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25l6 2.25v4.7z"
                  />
                </svg>
              )}
            </motion.div>
            <motion.div
              className={`absolute inset-0 rounded-full border-2 border-transparent ${colorMap[color as keyof typeof colorMap]}`}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ borderTopColor: 'currentColor', borderRightColor: 'currentColor' }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Main component
  const spinnerComponent = (
    <div
      className={`flex items-center justify-center ${
        containerDirection[textPosition]
      } ${sizeMap[size].container} ${className}`}
    >
      {renderSpinner()}
      {text && <div className={`${sizeMap[size].text} ${colorMap[color as keyof typeof colorMap]}`}>{text}</div>}
    </div>
  );

  // Render with or without fullscreen
  if (fullScreen) {
    return (
      <div className={wrapperClasses}>
        {withOverlay && <div className="absolute inset-0 bg-black/50" />}
        <div className="relative z-10">{spinnerComponent}</div>
      </div>
    );
  }

  return spinnerComponent;
};

// Fullscreen loading component with percentage
export const FullscreenLoader: React.FC<{
  percentage?: number;
  text?: string;
  logo?: React.ReactNode;
}> = ({ percentage, text = 'Loading...', logo }) => {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {/* Grid background */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
        
        {/* Animated circles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
        
        {/* Glitch effect lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/30"
            style={{ top: `${Math.random() * 100}%`, width: '100%' }}
            animate={{
              scaleY: [1, Math.random() * 3 + 1, 1],
              opacity: [0, 0.5, 0],
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center z-10"
      >
        {logo ? (
          <div className="mb-8">{logo}</div>
        ) : (
          <motion.div
            className="text-5xl font-bold text-white mb-8 tracking-widest"
            animate={{ 
              textShadow: ['0 0 5px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 5px rgba(255,255,255,0.5)'] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            MONOCHROME
          </motion.div>
        )}
        
        <div className="mt-4 w-80">
          <div className="relative">
            <div className="h-[2px] w-full bg-gray-800 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${percentage || 0}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Glitch effects on progress bar */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white/80"
              style={{ width: `${percentage || 0}%` }}
              animate={{ 
                opacity: [1, 0, 1],
                x: [0, 5, 0],
              }}
              transition={{ 
                duration: 0.2, 
                repeat: Infinity, 
                repeatDelay: 3,
              }}
            />
          </div>
          
          <div className="flex justify-between mt-3 text-white font-mono">
            <motion.span 
              className="text-xs tracking-wider"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {text}
            </motion.span>
            <motion.div 
              className="text-xs"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span className="text-gray-400">{percentage || 0}</span>
              <span className="text-white">%</span>
            </motion.div>
          </div>
        </div>
        
        {/* Status text */}
        <motion.div 
          className="mt-8 text-xs text-gray-500 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 bg-white mr-2 animate-pulse"></span>
            <span>INITIALIZING SYSTEM</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Terminal-like footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/10 p-3 font-mono text-xs text-gray-500">
        <div className="flex justify-between">
          <div>System: Portfolio_Interface</div>
          <div>Status: Loading</div>
          <div>Build: {new Date().getFullYear()}.{new Date().getMonth() + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
