import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';

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
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
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
          className={`block w-full px-4 py-3 rounded-lg bg-black/30 border text-white placeholder:text-gray-500 text-base focus:ring-2 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
              : 'border-white/20 focus:border-white/30 focus:ring-white/20'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
          required={required}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
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
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`block w-full px-4 py-3 rounded-lg bg-black/30 border text-white placeholder:text-gray-500 text-base focus:ring-2 focus:outline-none ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
            : 'border-white/20 focus:border-white/30 focus:ring-white/20'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        required={required}
      />
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
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
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full px-4 py-3 rounded-lg bg-black/30 border text-white appearance-none focus:ring-2 focus:outline-none ${
          value ? 'text-white' : 'text-gray-500'
        } ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
            : 'border-white/20 focus:border-white/30 focus:ring-white/20'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-900 text-white">
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
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
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <input
          id={id}
          name={name || id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`h-5 w-5 rounded bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 ${
            error ? 'border-red-500' : ''
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        <label htmlFor={id} className="ml-3 block text-sm font-medium text-white">
          {label}
        </label>
      </div>
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
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
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="space-y-2">
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
              className={`h-5 w-5 bg-black/30 border-white/20 text-white focus:ring-2 focus:ring-white/20 ${
                error ? 'border-red-500' : ''
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-3 block text-sm font-medium text-white"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-400">{helperText}</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
};

// Form Section
interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="mb-8 p-8 bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 shadow-lg">
      {title && <h2 className="text-xl font-medium text-white mb-2">{title}</h2>}
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      {children}
    </div>
  );
};

// Form Actions
interface FormActionsProps {
  primaryLabel: string;
  onPrimaryClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      {secondaryLabel && (
        <button
          type="button"
          onClick={onSecondaryClick}
          disabled={isLoading || disabled}
          className="px-6 py-3 border border-white/20 rounded-lg text-white bg-black/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {secondaryLabel}
        </button>
      )}
      <button
        type="submit"
        onClick={onPrimaryClick}
        disabled={isLoading || disabled}
        className="px-6 py-3 border border-white/20 rounded-lg text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading && <FiLoader className="animate-spin mr-2" size={18} />}
        {primaryLabel}
      </button>
    </div>
  );
}; 