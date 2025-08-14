import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  actionPath?: string;
  actionIcon?: React.ReactNode;
  onActionClick?: () => void;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon,
  actionLabel,
  actionPath,
  actionIcon = <FiPlus />,
  onActionClick,
  children,
}) => {
  return (
    <div className="mb-6 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 z-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {icon && <div className="mr-3 text-white">{icon}</div>}
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {children}
          {(actionLabel && actionPath) && (
            <Link
              to={actionPath}
              className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md shadow-sm text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-150"
            >
              <span className="mr-2">{actionIcon}</span>
              {actionLabel}
            </Link>
          )}
          {(actionLabel && onActionClick) && (
            <button
              onClick={onActionClick}
              className="inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-md shadow-sm text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-150"
            >
              <span className="mr-2">{actionIcon}</span>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
