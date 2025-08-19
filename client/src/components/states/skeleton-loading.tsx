import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar' | 'button' | 'image';
  width?: string | number;
  height?: string | number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
  repeat?: number;
  gap?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  animation = 'pulse',
  repeat = 1,
  gap = 8,
}) => {
  // Base classes for all skeleton types
  const baseClasses = 'bg-white/5 relative overflow-hidden';
  
  // Animation classes
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  // Variant specific classes and dimensions
  const variantClasses = {
    text: 'rounded-md h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    card: 'rounded-[25px] h-[200px]',
    avatar: 'rounded-full h-12 w-12',
    button: 'rounded-full h-10',
    image: 'rounded-[20px] h-40',
  };

  // Get the appropriate classes based on the variant and animation
  const skeletonClasses = `${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`;

  // Handle dimensions
  const style: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  // Create multiple skeletons if repeat > 1
  if (repeat > 1) {
    return (
      <div className="flex flex-col" style={{ gap: `${gap}px` }}>
        {Array.from({ length: repeat }).map((_, index) => (
          <div key={index} className={skeletonClasses} style={style} />
        ))}
      </div>
    );
  }

  // Single skeleton
  return <div className={skeletonClasses} style={style} />;
};

// Predefined skeleton layouts
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white/5 border border-gray-800 rounded-[25px] p-6 ${className}`}>
    <Skeleton variant="rectangular" height={150} className="mb-4" />
    <Skeleton variant="text" width="70%" className="mb-2" />
    <Skeleton variant="text" width="90%" className="mb-4" />
    <Skeleton variant="text" width="60%" repeat={2} className="mb-2" />
    <div className="flex gap-2 mt-4">
      <Skeleton variant="button" width={80} />
      <Skeleton variant="button" width={100} />
    </div>
  </div>
);

export const ProfileSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <Skeleton variant="avatar" width={50} height={50} />
    <div className="flex-1">
      <Skeleton variant="text" width="40%" className="mb-2" />
      <Skeleton variant="text" width="60%" height={10} />
    </div>
  </div>
);

export const BlogSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-transparent border border-gray-800 rounded-[25px] p-6 ${className}`}>
    <Skeleton variant="text" width="60%" height={30} className="mb-4" />
    <Skeleton variant="text" width="40%" height={20} className="mb-6" />
    <Skeleton variant="rectangular" height={200} className="mb-6" />
    <Skeleton variant="text" width="100%" repeat={4} className="mb-2" />
    <div className="mt-6">
      <ProfileSkeleton />
    </div>
  </div>
);

export const ProjectSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-transparent border border-gray-800 rounded-[25px] overflow-hidden ${className}`}>
    <Skeleton variant="image" height={200} width="100%" />
    <div className="p-6">
      <Skeleton variant="text" width="70%" height={24} className="mb-2" />
      <Skeleton variant="text" width="50%" height={16} className="mb-4" />
      <Skeleton variant="text" width="100%" repeat={2} className="mb-2" />
      <div className="flex flex-wrap gap-2 mt-4">
        <Skeleton variant="button" width={80} height={30} />
        <Skeleton variant="button" width={90} height={30} />
        <Skeleton variant="button" width={70} height={30} />
      </div>
    </div>
  </div>
);

// Grid of skeletons
export const SkeletonGrid: React.FC<{ 
  count: number;
  columns?: number;
  type?: 'card' | 'blog' | 'project' | 'profile';
  className?: string;
}> = ({ 
  count, 
  columns = 3,
  type = 'card',
  className = '' 
}) => {
  const SkeletonComponent = {
    card: CardSkeleton,
    blog: BlogSkeleton,
    project: ProjectSkeleton,
    profile: ProfileSkeleton,
  }[type];

  return (
    <div 
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
};

export default Skeleton;
