import React, { useState, useRef, useCallback } from 'react';
import { FiUpload, FiX, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  id: string;
  label: string;
  value?: string | null;
  onChange: (url: string, file?: File) => void; // Updated to pass both URL and file
  onUpload?: (file: File) => Promise<string>;
  error?: string;
  helperText?: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  value,
  onChange,
  onUpload,
  error,
  helperText,
  required = false,
  accept = 'image/*',
  maxSizeMB = 5,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert MB to bytes
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Process the file
  const processFile = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed');
      return;
    }

    // Validate file size
    if (file.size > maxSizeBytes) {
      setUploadError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // If onUpload is provided, use it to upload the file
      if (onUpload) {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev + Math.random() * 10;
            return newProgress >= 90 ? 90 : newProgress;
          });
        }, 200);

        // Upload the file
        const url = await onUpload(file);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        setPreviewUrl(url);
        onChange(url, file); // Pass both URL and file
        
        // Reset progress after a delay
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      } else {
        // Create a local preview and pass the file to parent
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreviewUrl(result);
          onChange(result, file); // Pass both preview URL and file
          setIsUploading(false);
          setUploadProgress(100);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Failed to upload image. Please try again.');
      setIsUploading(false);
    }
  }, [maxSizeBytes, maxSizeMB, onChange, onUpload]);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  // Handle file input change
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  // Handle click on the upload area
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle removing the image
  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(''); // Pass empty string to indicate removal
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
          isDragging 
            ? 'border-white/50 bg-white/5' 
            : 'border-white/20 bg-black/30'
        } ${error || uploadError ? 'border-red-500' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />
        
        {!previewUrl ? (
          <div 
            onClick={handleClick}
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
          >
            <FiUpload className="w-12 h-12 text-white/50 mb-4" />
            <p className="text-sm text-white mb-2">
              Drag and drop an image here, or click to select
            </p>
            <p className="text-xs text-gray-400">
              {accept === 'image/*' ? 'JPG, PNG, GIF up to ' : 'Files up to '}
              {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto max-h-64 object-contain rounded-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80"
              title="Remove image"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
            <div className="w-16 h-16 mb-4 relative">
              <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  strokeWidth="8" 
                  stroke="rgba(255,255,255,0.1)" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  strokeWidth="8" 
                  stroke="white" 
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 * (1 - uploadProgress / 100)}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                {Math.round(uploadProgress)}%
              </div>
            </div>
            <p className="text-sm text-white">Uploading...</p>
          </div>
        )}
        
        {uploadProgress === 100 && !isUploading && (
          <motion.div 
            className="absolute top-2 left-2 bg-green-500/80 text-white px-2 py-1 rounded-md flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FiCheck className="mr-1" /> Uploaded
          </motion.div>
        )}
      </div>
      
      {(helperText && !error && !uploadError) && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      
      {(error || uploadError) && (
        <p className="mt-2 text-xs text-red-400">{error || uploadError}</p>
      )}
    </div>
  );
};

export default ImageUpload;