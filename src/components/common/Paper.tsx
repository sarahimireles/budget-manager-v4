import React from "react"

interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: number
  variant?: "elevation" | "outlined"
}

const Paper: React.FC<PaperProps> = ({
  elevation = 1,
  variant = "elevation",
  className = "",
  children,
  ...props
}) => {
  const elevationClass =
    variant === "elevation" && elevation > 0
      ? "shadow-card dark:shadow-card-dark"
      : ""
  const outlinedClass = variant === "outlined" ? "border border-gray-600" : ""

  return (
    <div
      className={`bg-background-paper rounded-lg ${elevationClass} ${outlinedClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Paper
