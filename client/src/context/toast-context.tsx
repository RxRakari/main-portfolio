import React, { createContext, useContext, ReactNode } from 'react';
import { toast, Toaster } from 'sonner';

interface ToastContextProps {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
  showLoadingToast: (message: string, promise: Promise<any>, options: { loading: string; success: string; error: string }) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
      default:
        toast.info(message);
        break;
    }
  };

  const showSuccessToast = (message: string) => toast.success(message);
  const showErrorToast = (message: string) => toast.error(message);
  const showInfoToast = (message: string) => toast.info(message);
  const showWarningToast = (message: string) => toast.warning(message);
  
  const showLoadingToast = (
    _message: string, 
    promise: Promise<any>, 
    options: { loading: string; success: string; error: string }
  ) => {
    toast.promise(promise, {
      loading: options.loading || 'Loading...',
      success: options.success || 'Success!',
      error: options.error || 'An error occurred',
    });
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast,
        showErrorToast,
        showInfoToast,
        showWarningToast,
        showLoadingToast,
      }}
    >
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        toastOptions={{
          style: { 
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          className: 'sonner-toast-monochrome'
        }}
      />
      {children}
    </ToastContext.Provider>
  );
}; 