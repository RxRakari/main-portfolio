import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionPath?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionPath,
  icon,
  children
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
      <div className="flex items-center">
        {icon && (
          <div className="mr-3 text-purple-600">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {children}
        {actionLabel && actionPath && (
          <Link
            to={actionPath}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {actionLabel}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
