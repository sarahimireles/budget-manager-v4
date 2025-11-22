import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text"
  color?: "primary" | "secondary" | "info" | "success" | "error" | "warning"
  size?: "small" | "medium" | "large"
  fullWidth?: boolean
  startIcon?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "rounded font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2"

  const variantClasses = {
    contained: {
      primary: "bg-primary text-gray-900 hover:bg-primary-light",
      secondary: "bg-secondary text-white hover:bg-secondary-light",
      info: "bg-info text-white hover:bg-info-light",
      success: "bg-success text-gray-900 hover:bg-success-light",
      error: "bg-error text-white hover:bg-error-light",
      warning: "bg-warning text-white hover:bg-warning-light",
    },
    outlined: {
      primary: "border-2 border-primary text-primary hover:bg-primary/10",
      secondary:
        "border-2 border-secondary text-secondary hover:bg-secondary/10",
      info: "border-2 border-info text-info hover:bg-info/10",
      success: "border-2 border-success text-success hover:bg-success/10",
      error: "border-2 border-error text-error hover:bg-error/10",
      warning: "border-2 border-warning text-warning hover:bg-warning/10",
    },
    text: {
      primary: "text-primary hover:bg-primary/10",
      secondary: "text-secondary hover:bg-secondary/10",
      info: "text-info hover:bg-info/10",
      success: "text-success hover:bg-success/10",
      error: "text-error hover:bg-error/10",
      warning: "text-warning hover:bg-warning/10",
    },
  }

  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  }

  const widthClass = fullWidth ? "w-full" : ""
  const disabledClass = props.disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant][color]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {startIcon && <span>{startIcon}</span>}
      {children}
    </button>
  )
}

export default Button
