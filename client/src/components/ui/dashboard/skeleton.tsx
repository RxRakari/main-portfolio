import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table-row';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-white/5 rounded';
  const animationClasses = animation === 'pulse' 
    ? 'animate-pulse' 
    : animation === 'wave' 
    ? 'skeleton-wave' 
    : '';
  
  let variantClasses = '';
  let defaultWidth = '';
  let defaultHeight = '';
  
  switch (variant) {
    case 'text':
      variantClasses = 'rounded-md';
      defaultWidth = '100%';
      defaultHeight = '1rem';
      break;
    case 'circular':
      variantClasses = 'rounded-full';
      defaultWidth = '40px';
      defaultHeight = '40px';
      break;
    case 'rectangular':
      variantClasses = 'rounded-md';
      defaultWidth = '100%';
      defaultHeight = '100px';
      break;
    case 'card':
      variantClasses = 'rounded-xl';
      defaultWidth = '100%';
      defaultHeight = '200px';
      break;
    case 'table-row':
      variantClasses = 'rounded-md';
      defaultWidth = '100%';
      defaultHeight = '50px';
      break;
    default:
      variantClasses = 'rounded-md';
      defaultWidth = '100%';
      defaultHeight = '1rem';
  }
  
  const styles = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  };
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${animationClasses} ${className}`}
      style={styles}
    />
  );
};

export const TableRowSkeleton: React.FC<{ columns: number }> = ({ columns }) => {
  return (
    <div className="flex items-center space-x-4 py-4">
      {Array(columns).fill(0).map((_, index) => (
        <Skeleton 
          key={index} 
          variant="text" 
          width={index === 0 ? '40%' : '15%'} 
          height="1rem" 
        />
      ))}
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number, columns?: number }> = ({ 
  rows = 5, 
  columns = 5 
}) => {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-black/60">
        <div className="flex justify-between items-center">
          <Skeleton width={150} height="1.5rem" />
          <Skeleton width={100} height="2rem" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        {Array(rows).fill(0).map((_, index) => (
          <TableRowSkeleton key={index} columns={columns} />
        ))}
      </div>
      <div className="p-4 border-t border-white/10 bg-black/40">
        <div className="flex justify-between items-center">
          <Skeleton width={100} height="1rem" />
          <div className="flex space-x-2">
            <Skeleton width={30} height="1.5rem" />
            <Skeleton width={30} height="1.5rem" />
            <Skeleton width={30} height="1.5rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton variant="circular" width={50} height={50} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="70%" height="1.25rem" />
          <Skeleton variant="text" width="40%" height="0.875rem" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton variant="text" width="100%" height="1rem" />
        <Skeleton variant="text" width="90%" height="1rem" />
        <Skeleton variant="text" width="95%" height="1rem" />
      </div>
      <div className="mt-4 flex justify-end">
        <Skeleton width={100} height="2rem" />
      </div>
    </div>
  );
};

export const FormSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg overflow-hidden p-6">
        <Skeleton variant="text" width="30%" height="1.5rem" className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Skeleton variant="rectangular" height="60px" />
          <Skeleton variant="rectangular" height="60px" />
        </div>
        
        <Skeleton variant="rectangular" height="60px" className="mb-6" />
        
        <Skeleton variant="rectangular" height="120px" className="mb-6" />
        
        <div className="flex justify-end space-x-4">
          <Skeleton width={100} height="2.5rem" />
          <Skeleton width={100} height="2.5rem" />
        </div>
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-black/30 border border-white/10 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton variant="text" width={80} height="0.875rem" />
                  <Skeleton variant="text" width={60} height="1.5rem" />
                </div>
                <Skeleton variant="circular" width={40} height={40} />
              </div>
              <Skeleton variant="text" width="50%" height="0.75rem" className="mt-4" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6">
          <Skeleton variant="text" width={150} height="1.5rem" className="mb-4" />
          <Skeleton variant="rectangular" height={200} />
        </div>
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6">
          <Skeleton variant="text" width={150} height="1.5rem" className="mb-4" />
          <Skeleton variant="rectangular" height={200} />
        </div>
      </div>
      
      {/* Table section */}
      <TableSkeleton rows={3} columns={4} />
    </div>
  );
};

export const GridSkeleton: React.FC<{ items?: number }> = ({ items = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(items).fill(0).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}; 