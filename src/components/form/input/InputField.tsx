import type React from "react";
import type { FC } from "react";

interface InputProps {
  label: string;  // Add label prop
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "registration_date" | "last_login_timestamp" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  helperText?: string;
  TextField?:string;
  
}

const Input: FC<InputProps> = ({
  label,
  type = "string",
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  helperText,


}) => {
  let inputClasses = `h-11 w-full border-b bg-transparent px-0 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:bg-transparent dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-50 cursor-not-allowed dark:border-gray-700 dark:text-gray-400`;
  } else if (error) {
    inputClasses += ` border-error-500 focus:border-error-400 dark:border-error-500`;
  } else if (success) {
    inputClasses += ` border-success-500 focus:border-success-400 dark:border-success-500`;
  } else {
    inputClasses += ` border-gray-300 focus:border-brand-500 dark:border-gray-700 dark:focus:border-brand-400`;
  }

  return (
    <div className="relative">
      {/* Label Element */}
      <label htmlFor={id} className="text-sm text-gray-600 dark:text-white mb-1 block">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />
      {helperText && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
