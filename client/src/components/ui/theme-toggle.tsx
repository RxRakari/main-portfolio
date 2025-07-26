import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/theme-context';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-lg
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2
        dark:bg-white/10 dark:hover:bg-white/20 dark:focus:ring-white/50
        bg-gray-100 hover:bg-gray-200 focus:ring-gray-500
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <FiSun 
          size={iconSizes[size]} 
          className="text-yellow-400 transition-transform duration-200 hover:rotate-12" 
        />
      ) : (
        <FiMoon 
          size={iconSizes[size]} 
          className="text-gray-300 transition-transform duration-200 hover:rotate-12" 
        />
      )}
    </button>
  );
}; 