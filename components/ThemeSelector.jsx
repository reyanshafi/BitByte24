import React from "react";

// Remove the static themes list and pass it as a prop instead
const ThemeSelector = ({
  register,
  errors,
  setValue,
  name,
  label,
  remove,
  isRemovable,
  options = [], // Dynamic event options based on registration type
}) => {
  return (
    <div className="sm:col-span-4 mt-1 flex items-center">
      <div className="flex-grow">
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <select
          {...register(name, {
            required: "Please select a theme",
          })}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select an Event</option>
          {/* Render dynamic event options */}
          {options.map((theme, themeIndex) => (
            <option key={themeIndex} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        {errors[name] && (
          <p className="text-red-600 text-sm mt-1">{errors[name].message}</p>
        )}
      </div>
      {isRemovable && (
        <button
          type="button"
          onClick={remove}
          className="ml-1 mt-5 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default ThemeSelector;
