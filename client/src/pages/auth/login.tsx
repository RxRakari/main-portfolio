import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 pt-16 md:py-28 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-10 pointer-events-none">
        {Array.from({ length: 144 }).map((_, i) => (
          <div key={i} className="border border-white/10"></div>
        ))}
      </div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 border border-white/10"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
          />
        ))}
      </div>
      
      <div className="max-w-md w-full mx-auto z-10 bg-black/50 p-8 rounded-xl backdrop-blur-sm border border-white/10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          {/* <motion.div
            className="text-4xl font-bold text-white tracking-widest"
            animate={{ 
              textShadow: ['0 0 5px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 5px rgba(255,255,255,0.5)'] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PORTFOLIO
          </motion.div> */}
        </div>
        
        {/* Login Form */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2 text-white">Log in to Dashboard</h1>
          <p className="text-gray-400 text-sm">Access your admin portal</p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>
          
          {/* Password Field */}
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder:text-gray-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {showPassword ? (
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  ) : (
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z M10 3C5.522 3 1.732 5.943.458 10c1.274 4.057 5.064 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7zm0 12c-2.485 0-4.5-2.015-4.5-4.5S7.515 6 10 6s4.5 2.015 4.5 4.5S12.485 15 10 15z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Stay Signed In Checkbox */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 bg-black/50 border-white/20 rounded text-white focus:ring-white/50"
                checked={staySignedIn}
                onChange={() => setStaySignedIn(!staySignedIn)}
              />
              <span className="ml-2 text-sm text-gray-300">Stay signed in</span>
            </label>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-white hover:bg-gray-200 text-black font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-200 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-white hover:underline">
            Contact Admin
          </Link>
        </div>
      </div>
      
      {/* Terminal-like footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-white/10 p-3 font-mono text-xs text-gray-500">
        <div className="flex justify-between">
          <div>System: Auth_Interface</div>
          <div>Status: Secure</div>
          <div>Build: {new Date().getFullYear()}.{new Date().getMonth() + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;