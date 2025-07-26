import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useToast } from '../context/toast-context';
import { DashboardSkeleton } from '../components/ui/dashboard/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { showErrorToast } = useToast();

  // DEVELOPMENT MODE: Skip authentication check
  const isDevelopment = true; // Set to false in production

  // Show notification when redirected due to authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isDevelopment) {
      showErrorToast('Please login to access this page');
    }
  }, [isLoading, isAuthenticated, isDevelopment, showErrorToast]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  // Redirect to login if not authenticated (skip in development mode)
  if (!isAuthenticated && !isDevelopment) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated or in development mode
  return <>{children}</>;
};

export default ProtectedRoute; 