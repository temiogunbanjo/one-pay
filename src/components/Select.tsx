import React from "react";

interface SelectProps {
  name: string;
  label?: string;
  value?: string;
  options: { value: string; label: string }[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
}

function Select({
  handleChange,
  name,
  label,
  errorMessage,
  options,
  ...rest
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1 flex-grow">
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        onChange={handleChange}
        className="border border-slate-200 bg-slate-50 rounded-lg p-3 text-sm w-full outline-green-700"
        {...rest}
      >
        <option value="" className="text-gray-400" disabled={true}>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <span className="text-red-500 text-xs mt-0.5">{errorMessage}</span>
      )}
    </div>
  );
}

export default Select;
