import React from "react";

const themes = [
  "Keyboard Jumble",
  "Find the Keyword",
  "Mini Hackathon",
  "IoT Challenge",
  "Debate",
  "Quiz (Buzzer Round)",
  "Problem Solving",
  "Typing Competition",
];

const ThemeSelector = ({
  register,
  errors,
  setValue,
  name,
  label,
  remove,
  isRemovable,
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
          <option value="">Select a theme</option>
          {themes.map((theme, themeIndex) => (
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
