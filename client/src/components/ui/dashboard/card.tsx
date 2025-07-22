import React from 'react';

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
  // Loading skeleton
  if (isLoading) {
    return (
      <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center">
              {icon && <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>}
              <div>
                <div className="h-4 bg-gray-300 rounded w-40 mb-2"></div>
                {subtitle && <div className="h-3 bg-gray-200 rounded w-24"></div>}
              </div>
            </div>
            {actions && <div className="h-8 bg-gray-300 rounded w-20"></div>}
          </div>
          <div className={noPadding ? '' : 'p-6'}>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          {footer && (
            <div className="h-12 bg-gray-50 px-6 border-t border-gray-200"></div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      {/* Card Header */}
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-purple-600">{icon}</div>}
            <div>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
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
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
