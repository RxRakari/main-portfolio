import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '../../../context/theme-context';

// Text Input
interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  className?: string;
  min?: string | number;
  max?: string | number;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  disabled = false,
  error,
  helperText,
  required = false,
  name,
  className = '',
  min,
  max,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const isDark = theme === 'dark';

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${
        isDark ? 'text-white' : 'text-gray-700'
      }`}>
        {label} {required && <span className={isDark ? 'text-red-400' : 'text-red-500'}>*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name || id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          className={`block w-full px-4 py-3 rounded-lg border text-base focus:ring-2 focus:outline-none ${
            isDark 
              ? `bg-black/30 text-white placeholder:text-gray-500 ${
                  error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                    : 'border-white/20 focus:border-white/30 focus:ring-white/20'
                }`
              : `bg-white text-gray-900 placeholder:text-gray-500 shadow-sm ${
                  error
                    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
                }`
          } ${disabled ? (isDark ? 'opacity-60 cursor-not-allowed' : 'bg-gray-100 text-gray-500 cursor-not-allowed') : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {helperText && !error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{helperText}</p>
      )}
      {error && (
        <p className={`mt-2 text-sm flex items-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Text Area
interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  helperText,
  required = false,
  name,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${
        isDark ? 'text-white' : 'text-gray-700'
      }`}>
        {label} {required && <span className={isDark ? 'text-red-400' : 'text-red-500'}>*</span>}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`block w-full px-4 py-3 rounded-lg border text-base focus:ring-2 focus:outline-none ${
          isDark 
            ? `bg-black/30 text-white placeholder:text-gray-500 ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-white/30 focus:ring-white/20'
              }`
            : `bg-white text-gray-900 placeholder:text-gray-500 shadow-sm ${
                error
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-purple-500 focus:ring-purple-500'
              }`
        } ${disabled ? (isDark ? 'opacity-60 cursor-not-allowed' : 'bg-gray-100 text-gray-500 cursor-not-allowed') : ''}`}
      />
      {helperText && !error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{helperText}</p>
      )}
      {error && (
        <p className={`mt-2 text-sm flex items-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Select
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  error,
  helperText,
  required = false,
  name,
  className = '',
  placeholder,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${
        isDark ? 'text-white' : 'text-gray-700'
      }`}>
        {label} {required && <span className={isDark ? 'text-red-400' : 'text-red-500'}>*</span>}
      </label>
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`block w-full px-4 py-3 rounded-lg border text-base focus:ring-2 focus:outline-none ${
          isDark
            ? `bg-black/30 text-white appearance-none ${
                value ? 'text-white' : 'text-gray-500'
              } ${
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : 'border-white/20 focus:border-white/30 focus:ring-white/20'
              }`
            : `bg-white shadow-sm ${
                value ? 'text-gray-900' : 'text-gray-500'
              } ${
                error
                  ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
              }`
        } ${disabled ? (isDark ? 'opacity-60 cursor-not-allowed' : 'bg-gray-100 text-gray-500 cursor-not-allowed') : ''}`}
      >
        {placeholder && (
          <option value="" disabled className={isDark ? 'bg-gray-900 text-gray-500' : 'text-gray-500'}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            className={isDark ? 'bg-gray-900 text-white' : 'text-gray-900'}
          >
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{helperText}</p>
      )}
      {error && (
        <p className={`mt-2 text-sm flex items-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Checkbox
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  name?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  error,
  helperText,
  name,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          name={name || id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`h-5 w-5 rounded focus:ring-2 ${
            isDark
              ? `bg-black/30 border-white/20 text-white focus:ring-white/20 ${
                  error ? 'border-red-500' : ''
                }`
              : `text-purple-600 focus:ring-purple-500 border-gray-300 ${
                  error ? 'border-red-300' : ''
                }`
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <label htmlFor={id} className={`ml-3 block text-base ${
          isDark ? 'text-white' : 'text-gray-700'
        }`}>
          {label}
        </label>
      </div>
      {helperText && !error && (
        <p className={`mt-2 text-sm ml-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{helperText}</p>
      )}
      {error && (
        <p className={`mt-2 text-sm flex items-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Radio Group
interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  error,
  helperText,
  required = false,
  name,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`mb-6 ${className}`}>
      <label className={`block mb-2 text-sm font-medium ${
        isDark ? 'text-white' : 'text-gray-700'
      }`}>
        {label} {required && <span className={isDark ? 'text-red-400' : 'text-red-500'}>*</span>}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id}-${option.value}`}
              name={name || id}
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`h-5 w-5 focus:ring-2 ${
                isDark
                  ? `bg-black/30 border-white/20 text-white focus:ring-white/20 ${
                      error ? 'border-red-500' : ''
                    }`
                  : `text-purple-600 focus:ring-purple-500 border-gray-300 ${
                      error ? 'border-red-300' : ''
                    }`
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className={`ml-3 block text-base ${isDark ? 'text-white' : 'text-gray-700'}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && !error && (
        <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{helperText}</p>
      )}
      {error && (
        <p className={`mt-2 text-sm flex items-center ${isDark ? 'text-red-400' : 'text-red-600'}`}>
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Form Section
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`mb-10 ${className}`}>
      {title && (
        <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      )}
      {description && (
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
      <div className={`p-8 rounded-lg shadow ${
        isDark 
          ? 'bg-black/30 backdrop-blur-lg border border-white/10 shadow-lg' 
          : 'bg-white shadow-sm'
      }`}>
        {children}
      </div>
    </div>
  );
};

// Form Actions
interface FormActionsProps {
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  isSubmitting?: boolean;
  className?: string;
  primaryLabel?: string;
  onPrimaryClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  className = '',
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  isLoading = false,
  disabled = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Support both API patterns
  const finalPrimaryLabel = primaryLabel || submitLabel;
  const finalSecondaryLabel = secondaryLabel || (onCancel ? cancelLabel : undefined);
  const finalOnPrimaryClick = onPrimaryClick || onSubmit;
  const finalOnSecondaryClick = onSecondaryClick || onCancel;
  const finalIsLoading = isLoading || isSubmitting;

  return (
    <div className={`flex items-center justify-end space-x-4 mt-8 ${className}`}>
      {finalSecondaryLabel && (
        <button
          type="button"
          onClick={finalOnSecondaryClick}
          disabled={finalIsLoading || disabled}
          className={`px-6 py-3 border rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
            isDark
              ? 'border-white/20 text-white bg-black/40 hover:bg-white/10 focus:ring-white/20'
              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-purple-500 shadow-sm'
          }`}
        >
          {finalSecondaryLabel}
        </button>
      )}
      {finalOnPrimaryClick && (
        <button
          type="submit"
          onClick={finalOnPrimaryClick}
          disabled={finalIsLoading || disabled}
          className={`inline-flex items-center px-6 py-3 border rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
            isDark
              ? 'border-white/20 text-white bg-white/10 hover:bg-white/20 focus:ring-white/30'
              : 'border-transparent text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 shadow-sm'
          }`}
        >
          {finalIsLoading && (
            isDark ? (
              <FiLoader className="animate-spin mr-2" size={18} />
            ) : (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )
          )}
          {finalIsLoading ? 'Processing...' : finalPrimaryLabel}
        </button>
      )}
    </div>
  );
};