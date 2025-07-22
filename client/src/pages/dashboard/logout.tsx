import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      navigate('/login');
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Logging out...</h2>
        <p className="mt-2 text-gray-500">Please wait while we securely log you out.</p>
      </div>
    </div>
  );
};

export default Logout; 