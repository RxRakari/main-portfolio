import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

// Text Input Component
interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  helperText?: string;
  min?: string | number;
  max?: string | number;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  name,
  placeholder = '',
  type = 'text',
  error,
  disabled = false,
  required = false,
  className = '',
  helperText,
  min,
  max
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        className={`block w-full px-4 py-3 rounded-md shadow-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
        } placeholder:text-gray-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-base`}
      />
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Textarea Component
interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  helperText?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  name,
  placeholder = '',
  error,
  disabled = false,
  required = false,
  rows = 4,
  className = '',
  helperText,
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`block w-full px-4 py-3 rounded-md shadow-sm ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
        } placeholder:text-gray-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-base`}
      />
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Select Component
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
  name?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  helperText?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  name,
  error,
  disabled = false,
  required = false,
  className = '',
  helperText,
  placeholder,
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`block w-full px-4 py-3 rounded-md shadow-sm ${
          error
            ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 text-gray-900 focus:border-purple-500 focus:ring-purple-500'
        } ${value ? 'text-gray-900' : 'text-gray-500'} disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed text-base`}
      >
        {placeholder && (
          <option value="" disabled className="text-gray-500">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Checkbox Component
interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  helperText?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  name,
  disabled = false,
  className = '',
  helperText,
}) => {
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
          className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label htmlFor={id} className="ml-3 block text-base text-gray-700">
          {label}
        </label>
      </div>
      {helperText && (
        <p className="mt-2 text-sm text-gray-500 ml-8">{helperText}</p>
      )}
    </div>
  );
};

// Radio Group Component
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
  name?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  helperText?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  name,
  error,
  disabled = false,
  required = false,
  className = '',
  helperText,
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
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
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <label htmlFor={`${id}-${option.value}`} className="ml-3 block text-base text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <FiAlertCircle className="mr-1" /> {error}
        </p>
      )}
    </div>
  );
};

// Form Section Component
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
  return (
    <div className={`mb-10 ${className}`}>
      {title && (
        <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      <div className="bg-white shadow rounded-lg p-8">
        {children}
      </div>
    </div>
  );
};

// Form Actions Component
interface FormActionsProps {
  onSubmit?: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  isSubmitting?: boolean;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  onCancel,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-end space-x-4 mt-8 ${className}`}>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          {cancelLabel}
        </button>
      )}
      {onSubmit && (
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            submitLabel
          )}
        </button>
      )}
    </div>
  );
}; 