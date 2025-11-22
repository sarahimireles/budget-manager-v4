import React from "react"

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  helperText?: string
  variant?: "outlined" | "filled" | "standard"
  fullWidth?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error = false,
  helperText,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseInputClasses =
    "px-3 py-2 rounded border transition-colors bg-background-paper text-gray-100 focus:outline-none focus:ring-2"
  const errorClasses = error
    ? "border-error focus:border-error focus:ring-error"
    : "border-gray-600 focus:border-primary focus:ring-primary"
  const widthClass = fullWidth ? "w-full" : ""

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        className={`${baseInputClasses} ${errorClasses} ${widthClass}`}
        {...props}
      />
      {helperText && (
        <span className={`text-xs ${error ? "text-error" : "text-gray-400"}`}>
          {helperText}
        </span>
      )}
    </div>
  )
}

export default TextField
