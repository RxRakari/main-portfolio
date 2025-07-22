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
  const bgColor = `bg-${color}-50`;
  const textColor = `text-${color}-600`;
  const borderColor = `border-${color}-100`;

  return (
    <div className={`relative overflow-hidden rounded-lg border ${borderColor} ${bgColor} p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold mt-1 ${textColor}`}>{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              {trend === 'up' && <FiTrendingUp className="text-green-500 mr-1" />}
              {trend === 'down' && <FiTrendingUp className="text-red-500 mr-1 transform rotate-180" />}
              <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}>
                {change}
              </span>
            </div>
          )}
        </div>
        
        <div className={`rounded-full p-3 ${bgColor} ${textColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Recent activity item component
interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, icon, iconBg }) => {
  return (
    <div className="flex items-start space-x-4 py-3">
      <div className={`rounded-full p-2 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 truncate">{description}</p>
      </div>
      <div className="flex items-center text-xs text-gray-500">
        <FiClock className="mr-1" />
        {time}
      </div>
    </div>
  );
};

// Quick action button component
interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, to, color }) => {
  const bgColor = `bg-${color}-50`;
  const textColor = `text-${color}-600`;
  const hoverBg = `hover:bg-${color}-100`;

  return (
    <Link 
      to={to} 
      className={`flex items-center p-4 rounded-lg ${bgColor} ${hoverBg} transition-colors duration-200`}
    >
      <div className={`rounded-full p-3 ${bgColor} ${textColor} mr-4`}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const stats = [
    { title: 'Total Blogs', value: 24, icon: <FiFileText size={20} />, change: '+12% from last month', trend: 'up' as const, color: 'purple' },
    { title: 'Total Projects', value: 18, icon: <FiFolder size={20} />, change: '+5% from last month', trend: 'up' as const, color: 'blue' },
    { title: 'Gallery Items', value: 143, icon: <FiImage size={20} />, change: 'Same as last month', trend: 'neutral' as const, color: 'green' },
    { title: 'Contact Messages', value: 7, icon: <FiMessageSquare size={20} />, change: '-2 from last month', trend: 'down' as const, color: 'orange' },
  ];

  const recentActivity = [
    { 
      title: 'New Blog Post Published', 
      description: 'Character Prefix Conditioning', 
      time: '2 hours ago',
      icon: <FiFileText className="text-purple-500" />,
      iconBg: 'bg-purple-100'
    },
    { 
      title: 'New Project Added', 
      description: 'E-Commerce Platform', 
      time: '1 day ago',
      icon: <FiFolder className="text-blue-500" />,
      iconBg: 'bg-blue-100'
    },
    { 
      title: 'New Images Uploaded', 
      description: '5 new images added to gallery', 
      time: '2 days ago',
      icon: <FiImage className="text-green-500" />,
      iconBg: 'bg-green-100'
    },
    { 
      title: 'New Contact Message', 
      description: 'From: john@example.com', 
      time: '3 days ago',
      icon: <FiMessageSquare className="text-orange-500" />,
      iconBg: 'bg-orange-100'
    },
  ];

  const quickActions = [
    { 
      title: 'New Blog Post', 
      description: 'Create a new blog article', 
      icon: <FiEdit size={20} />, 
      to: '/dashboard/blogs/new',
      color: 'purple'
    },
    { 
      title: 'New Project', 
      description: 'Add a new project to showcase', 
      icon: <FiPlus size={20} />, 
      to: '/dashboard/projects/new',
      color: 'blue'
    },
    { 
      title: 'Upload Images', 
      description: 'Add new images to your gallery', 
      icon: <FiImage size={20} />, 
      to: '/dashboard/gallery/new',
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
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
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <QuickAction key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Link to="/dashboard/activity" className="text-sm text-purple-600 hover:text-purple-800">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </div>
        </div>

        {/* Popular Content */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Popular Content</h2>
            <Link to="/dashboard/analytics" className="text-sm text-purple-600 hover:text-purple-800">
              View Analytics
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {popularContent.map((content, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {content.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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