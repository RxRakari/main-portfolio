import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { API_URL } from '../helpers/api_url';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  validateToken: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate token expiration
  const validateToken = (): boolean => {
    const storedToken = localStorage.getItem('auth_token');
    if (!storedToken) return false;

    try {
      const decoded: any = jwtDecode(storedToken);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        // Token is expired
        logout();
        return false;
      }
      
      return true;
    } catch (error) {
      // Invalid token
      logout();
      return false;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedAdmin = localStorage.getItem('admin');
    
    if (storedToken && storedAdmin && validateToken()) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    } else {
      // Clear invalid data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('admin');
    }
    
    setIsLoading(false);
  }, []);

  // Periodic token validation
  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        if (!validateToken()) {
          toast.error('Session expired. Please login again.');
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Show loading toast
      toast.loading('Logging in...');
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.dismiss();
        toast.error(errorData.message || 'Login failed');
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      setToken(data.token);
      setAdmin(data.data.admin);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.data.admin));
      
      // Dismiss loading toast and show success
      toast.dismiss();
      toast.success('Login successful');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('admin');
    toast.info('Logged out successfully');
  };

  const value = {
    admin,
    token,
    isAuthenticated: !!admin && !!token && validateToken(),
    isLoading,
    login,
    logout,
    validateToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}