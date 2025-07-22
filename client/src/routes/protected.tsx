import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // DEVELOPMENT MODE: Skip authentication check
  const isDevelopment = true; // Set to false in production

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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