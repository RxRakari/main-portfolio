import { useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for toast notifications
 * This provides a simple interface for showing toast messages
 */
export const useToastMessage = () => {
  /**
   * Show a success toast message
   */
  const showSuccess = useCallback((message: string) => {
    toast.success(message);
  }, []);

  /**
   * Show an error toast message
   */
  const showError = useCallback((message: string) => {
    toast.error(message);
  }, []);

  /**
   * Show an info toast message
   */
  const showInfo = useCallback((message: string) => {
    toast.info(message);
  }, []);

  /**
   * Show a warning toast message
   */
  const showWarning = useCallback((message: string) => {
    toast.warning(message);
  }, []);

  /**
   * Show a loading toast that updates with promise resolution
   */
  const showPromise = useCallback(
    <T>(
      promise: Promise<T>,
      options: {
        loading: string;
        success: string;
        error: string;
      }
    ) => {
      return toast.promise(promise, {
        loading: options.loading,
        success: options.success,
        error: options.error,
      });
    },
    []
  );

  /**
   * Show a loading toast
   * @returns A function to dismiss the toast
   */
  const showLoading = useCallback((message: string) => {
    const toastId = toast.loading(message);
    return () => toast.dismiss(toastId);
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showPromise,
    showLoading,
    dismiss: toast.dismiss,
  };
}; 