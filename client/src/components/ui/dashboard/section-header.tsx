import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { useTheme } from '../../../context/theme-context';

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
  const { theme } = useTheme();

  const containerClasses =
    theme === 'dark'
      ? 'bg-black/40 backdrop-blur-lg border border-white/10 shadow-lg'
      : 'bg-white border border-gray-200 shadow-sm';

  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const descColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const iconColor = theme === 'dark' ? 'text-white' : 'text-purple-600';

  const actionBtnClasses =
    theme === 'dark'
      ? 'border border-white/20 text-white bg-white/10 hover:bg-white/20 focus:ring-white/30'
      : 'border border-transparent text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500';

  return (
    <div className={`mb-6 rounded-xl p-6 z-10 ${containerClasses}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          {icon && <div className={`mr-3 ${iconColor}`}>{icon}</div>}
          <div>
            <h1 className={`text-2xl font-bold ${titleColor}`}>{title}</h1>
            {description && <p className={`mt-1 text-sm ${descColor}`}>{description}</p>}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {children}
          {actionLabel && actionPath && (
            <Link
              to={actionPath}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ${actionBtnClasses}`}
            >
              <span className="mr-2">{actionIcon}</span>
              {actionLabel}
            </Link>
          )}
          {actionLabel && onActionClick && (
            <button
              onClick={onActionClick}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ${actionBtnClasses}`}
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
