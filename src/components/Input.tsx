import React from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

function Input({
  handleChange,
  name = "name",
  label,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 flex-grow">
      {label && (
        <label htmlFor={name} className="text-xs font-semibold text-slate-700">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type="text"
        onChange={handleChange}
        className="border border-slate-200 bg-slate-50 rounded-lg p-3 text-sm w-full outline-green-700"
        {...rest}
      />
      {errorMessage && (
        <span className="text-red-500 text-xs mt-0.5">{errorMessage}</span>
      )}
    </div>
  );
}

export default Input;
