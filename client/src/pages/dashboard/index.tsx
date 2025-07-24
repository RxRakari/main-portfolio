import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiFileText, 
  FiFolder, 
  FiImage, 
  FiMessageSquare, 
  FiEye, 
  FiTrendingUp,
  FiCalendar,
  FiClock,
  FiEdit,
  FiPlus
} from 'react-icons/fi';

// Dashboard stat card component
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend, color }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <FiTrendingUp className="text-green-400" />;
    if (trend === 'down') return <FiTrendingUp className="text-red-400 transform rotate-180" />;
    return null;
  };

  const getColorClasses = () => {
    switch(color) {
      case 'purple': return 'from-purple-500/20 to-purple-600/10 border-purple-500/30';
      case 'blue': return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
      case 'green': return 'from-green-500/20 to-green-600/10 border-green-500/30';
      case 'orange': return 'from-orange-500/20 to-orange-600/10 border-orange-500/30';
      default: return 'from-gray-500/20 to-gray-600/10 border-gray-500/30';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getColorClasses()} backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-semibold text-white">{value}</p>
          </div>
          {change && (
            <div className="mt-2 flex items-center text-xs">
              {getTrendIcon()}
              <span className={`ml-1 ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-white/10`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Activity item component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, icon, iconBg }) => {
  return (
    <div className="py-4 px-1">
      <div className="flex items-start">
        <div className={`${iconBg.replace('bg-', 'bg-').replace('-100', '-900/30')} p-2 rounded-full mr-4`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{title}</p>
          <p className="text-sm text-gray-400 truncate">{description}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <p className="text-xs text-gray-500 flex items-center">
            <FiClock className="mr-1" /> {time}
          </p>
        </div>
      </div>
    </div>
  );
};

// Quick action component
interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, to, color }) => {
  const getColorClasses = () => {
    switch(color) {
      case 'purple': return 'from-purple-500/20 to-purple-600/10 border-purple-500/30';
      case 'blue': return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
      case 'green': return 'from-green-500/20 to-green-600/10 border-green-500/30';
      default: return 'from-gray-500/20 to-gray-600/10 border-gray-500/30';
    }
  };

  return (
    <Link to={to} className={`block bg-gradient-to-br ${getColorClasses()} backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg`}>
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-white/10 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const stats = [
    { title: 'Total Blogs', value: 24, icon: <FiFileText size={20} className="text-purple-400" />, change: '+12% from last month', trend: 'up' as const, color: 'purple' },
    { title: 'Total Projects', value: 18, icon: <FiFolder size={20} className="text-blue-400" />, change: '+5% from last month', trend: 'up' as const, color: 'blue' },
    { title: 'Gallery Items', value: 143, icon: <FiImage size={20} className="text-green-400" />, change: 'Same as last month', trend: 'neutral' as const, color: 'green' },
    { title: 'Contact Messages', value: 7, icon: <FiMessageSquare size={20} className="text-orange-400" />, change: '-2 from last month', trend: 'down' as const, color: 'orange' },
  ];

  const recentActivity = [
    { 
      title: 'New Blog Post Published', 
      description: 'Character Prefix Conditioning', 
      time: '2 hours ago',
      icon: <FiFileText className="text-purple-400" />,
      iconBg: 'bg-purple-100'
    },
    { 
      title: 'New Project Added', 
      description: 'E-Commerce Platform', 
      time: '1 day ago',
      icon: <FiFolder className="text-blue-400" />,
      iconBg: 'bg-blue-100'
    },
    { 
      title: 'New Images Uploaded', 
      description: '5 new images added to gallery', 
      time: '2 days ago',
      icon: <FiImage className="text-green-400" />,
      iconBg: 'bg-green-100'
    },
    { 
      title: 'New Contact Message', 
      description: 'From: john@example.com', 
      time: '3 days ago',
      icon: <FiMessageSquare className="text-orange-400" />,
      iconBg: 'bg-orange-100'
    },
  ];

  const quickActions = [
    { 
      title: 'New Blog Post', 
      description: 'Create a new blog article', 
      icon: <FiEdit size={20} className="text-purple-400" />, 
      to: '/dashboard/blogs/form',
      color: 'purple'
    },
    { 
      title: 'New Project', 
      description: 'Add a new project to showcase', 
      icon: <FiPlus size={20} className="text-blue-400" />, 
      to: '/dashboard/projects/form',
      color: 'blue'
    },
    { 
      title: 'Upload Images', 
      description: 'Add new images to your gallery', 
      icon: <FiImage size={20} className="text-green-400" />, 
      to: '/dashboard/gallery/form',
      color: 'green'
    },
  ];

  const popularContent = [
    { title: 'Character Prefix Conditioning', type: 'Blog', views: 1245 },
    { title: 'E-Commerce Platform', type: 'Project', views: 932 },
    { title: 'AI Chat Application', type: 'Project', views: 821 },
    { title: 'Portfolio Dashboard', type: 'Project', views: 654 },
    { title: 'Task Management App', type: 'Project', views: 543 },
  ];

  return (
    <div className="py-6">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FiCalendar />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 lg:col-span-1">
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Recent Activity</h2>
            <Link to="/dashboard/activity" className="text-sm text-purple-400 hover:text-purple-300">
              View All
            </Link>
          </div>
          <div className="divide-y divide-white/10">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Popular Content */}
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Popular Content</h2>
            <Link to="/dashboard/analytics" className="text-sm text-purple-400 hover:text-purple-300">
              View Analytics
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-black/60">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {popularContent.map((content, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 transition-colors duration-150`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {content.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {content.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <div className="flex items-center">
                        <FiEye className="mr-1 text-gray-400" />
                        {content.views.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};