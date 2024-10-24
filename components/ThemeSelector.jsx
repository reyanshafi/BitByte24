const ThemeSelector = ({ register, errors, name, label, remove, isRemovable, eventOptions }) => (
  <div className="mt-4">
    <label className="block text-sm font-medium leading-6 text-gray-900">
      {label}
    </label>
    <select
      {...register(name, { required: true })}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm"
    >
      {eventOptions.map((event, index) => (
        <option value={event} key={index}>
          {event}
        </option>
      ))}
    </select>
    {errors[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
    {isRemovable && (
      <button
        type="button"
        onClick={remove}
        className="mt-2 text-red-500 text-sm"
      >
        Remove
      </button>
    )}
  </div>
);

export default ThemeSelector;
