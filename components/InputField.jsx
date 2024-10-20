import React from "react";

const InputField = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  register,
  validation,
  errors,
  accept,
  className = "",
}) => {
  return (
    <div className={`sm:col-span-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>

      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
        <input
          {...register(name, validation)}
          type={type}
          name={name}
          id={id}
          accept={accept || null}
          className="block placeholder:pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 w-full sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1">
          {errors[name].message || (errors[name] && errors[name].message)}
        </p>
      )}
    </div>
  );
};

export default InputField;
