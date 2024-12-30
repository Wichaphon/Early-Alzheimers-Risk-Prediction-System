import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

interface BaseFieldProps {
  label: string;
  name: string;
  error?: string;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  type: 'number' | 'text';
}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string; }[];
}

export function InputField({ label, name, error, ...props }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          className="block w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 dark:text-white transition-colors duration-200 ease-in-out shadow-sm"
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function SelectField({ label, name, options, error, ...props }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="block w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500 dark:focus:border-purple-400 dark:focus:ring-purple-400 dark:text-white transition-colors duration-200 ease-in-out shadow-sm"
        {...props}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}