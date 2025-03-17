import * as React from "react";

interface ISelector {
  value: string;
  id: string;
  placeholder: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Selector({ value, id, placeholder, options, onChange }: ISelector) {
  return (
    <div>
      <label htmlFor={ id } className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Expense type
      </label>
      <select
        id={ id }
        value={ value }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={ onChange }
      >
        <option value="" disabled hidden>{ placeholder }</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
