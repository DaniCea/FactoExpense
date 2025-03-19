import { SelectHTMLAttributes } from "react";

interface ISelectorWithLabel extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: string[];
  label?: string;
  placeholder?: string;
  displayOptions?: string[];
}

export default function Selector({ id, options, label, placeholder, displayOptions, ...props }: ISelectorWithLabel) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option} value={option}>
            {displayOptions ? displayOptions[options.indexOf(option)] : option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}