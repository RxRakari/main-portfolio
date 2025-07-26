import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiImage, 
  FiMessageSquare, 
  FiEye, 
  FiTrendingUp,
  FiCalendar,
  FiClock,
  FiEdit,
  FiPlus
} from 'react-icons/fi';
import { useAdmin } from '../../context/admin-context';

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
  const { fetchDashboardStats, fetchPopularContent } = useAdmin();
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [popularContent, setPopularContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchDashboardStats();
        const counts = response.data.counts;
        const recent = response.data.recent;
        
        // Format stats
        const formattedStats = [
          {
            title: 'Total Blogs',
            value: counts.blogs,
            icon: <FiEdit size={20} />,
            color: 'purple',
            change: `${counts.featuredBlogs} featured`
          },
          {
            title: 'Total Projects',
            value: counts.projects,
            icon: <FiPlus size={20} />,
            color: 'blue',
            change: `${counts.featuredProjects} featured`
          },
          {
            title: 'Gallery Items',
            value: counts.gallery,
            icon: <FiImage size={20} />,
            color: 'green',
            change: `${counts.featuredGallery} featured`
          },
          {
            title: 'Contact Messages',
            value: counts.contacts,
            icon: <FiMessageSquare size={20} />,
            color: 'orange',
            change: `${counts.unreadContacts} unread`
          }
        ];
        
        setStats(formattedStats);
        
        // Format recent activity
        const allRecent = [
          ...recent.blogs.map((blog: any) => ({
            title: blog.title,
            description: `New blog post published`,
            time: new Date(blog.createdAt).toLocaleDateString(),
            icon: <FiEdit size={16} />,
            iconBg: 'bg-purple-500/20'
          })),
          ...recent.projects.map((project: any) => ({
            title: project.title,
            description: `New project added`,
            time: new Date(project.createdAt).toLocaleDateString(),
            icon: <FiPlus size={16} />,
            iconBg: 'bg-blue-500/20'
          })),
          ...recent.contacts.map((contact: any) => ({
            title: contact.subject || 'New Contact',
            description: `Message from ${contact.name}`,
            time: new Date(contact.createdAt).toLocaleDateString(),
            icon: <FiMessageSquare size={16} />,
            iconBg: 'bg-orange-500/20'
          }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);
        
        setRecentActivity(allRecent);
        
        // Fetch popular content
        const popularResponse = await fetchPopularContent();
        setPopularContent(popularResponse.data.popularContent);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    
    getStats();
  }, [fetchDashboardStats, fetchPopularContent]);

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

  if (isLoading) {
    return (
      <div className="py-6">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-400">Loading your portfolio overview...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1,2,3,4].map((i) => <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <div className="text-red-400 text-center font-medium">{error}</div>
      </div>
    );
  }

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
            {recentActivity.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No recent activity found.</div>
            ) : (
              recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))
            )}
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
                {popularContent.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">
                      No popular content available yet. Create some blogs and projects to see analytics here.
                    </td>
                  </tr>
                ) : (
                  popularContent.map((content, index) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};