import React from 'react';
import { useTheme } from '../../../context/theme-context';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  isLoading?: boolean;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  actions,
  children,
  className = '',
  footer,
  isLoading = false,
  noPadding = false,
}) => {
  const { theme } = useTheme();

  // Classes that change with theme
  const baseClasses =
    theme === 'dark'
      ? 'bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden shadow-lg'
      : 'bg-white shadow rounded-lg overflow-hidden border border-gray-200';

  const headerClasses =
    theme === 'dark'
      ? 'border-b border-white/10'
      : 'border-b border-gray-200';

  const footerClasses =
    theme === 'dark'
      ? 'bg-black/60 border-t border-white/10'
      : 'bg-gray-50 border-t border-gray-200';

  const iconClasses =
    theme === 'dark'
      ? 'mr-3 text-white'
      : 'mr-3 text-purple-600';

  const titleClasses =
    theme === 'dark'
      ? 'text-lg font-medium text-white'
      : 'text-lg font-medium text-gray-900';

  const subtitleClasses =
    theme === 'dark'
      ? 'text-sm text-gray-400'
      : 'text-sm text-gray-500';

  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="animate-pulse">
          <div
            className={`h-16 px-6 flex items-center justify-between ${
              theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              {icon && (
                <div
                  className={`w-8 h-8 rounded-full mr-3 ${
                    theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                  }`}
                ></div>
              )}
              <div>
                <div
                  className={`h-4 rounded w-40 mb-2 ${
                    theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                  }`}
                ></div>
                {subtitle && (
                  <div
                    className={`h-3 rounded w-24 ${
                      theme === 'dark' ? 'bg-white/5' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </div>
            </div>
            {actions && (
              <div
                className={`h-8 rounded w-20 ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
          <div className={noPadding ? '' : 'p-6'}>
            <div
              className={`h-4 rounded w-3/4 mb-3 ${
                theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
              }`}
            ></div>
            <div
              className={`h-4 rounded w-full mb-3 ${
                theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
              }`}
            ></div>
            <div
              className={`h-4 rounded w-2/3 ${
                theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
              }`}
            ></div>
          </div>
          {footer && (
            <div
              className={`h-12 px-6 ${footerClasses}`}
            ></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {/* Card Header */}
      {(title || actions) && (
        <div className={`px-6 py-4 flex items-center justify-between ${headerClasses}`}>
          <div className="flex items-center">
            {icon && <div className={iconClasses}>{icon}</div>}
            <div>
              <h3 className={titleClasses}>{title}</h3>
              {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
            </div>
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}

      {/* Card Content */}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className={`px-6 py-3 ${footerClasses}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;