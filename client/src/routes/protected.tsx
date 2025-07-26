import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useToast } from '../context/toast-context';
import { DashboardSkeleton } from '../components/ui/dashboard/skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, token } = useAuth();
  const location = useLocation();
  const { showErrorToast } = useToast();

  // Show notification when redirected due to authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      showErrorToast('Please login to access this page');
    }
  }, [isLoading, isAuthenticated, showErrorToast]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6">
        <DashboardSkeleton />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 