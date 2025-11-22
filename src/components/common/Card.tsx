import React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevation" | "outlined"
}

interface CardHeaderProps {
  title?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({
  variant = "elevation",
  className = "",
  children,
  ...props
}) => {
  const variantClass =
    variant === "outlined"
      ? "border border-gray-600"
      : "shadow-card dark:shadow-card-dark"

  return (
    <div
      className={`bg-background-paper rounded-lg ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  action,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-between p-4 ${className}`}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {action && <div>{action}</div>}
    </div>
  )
}

export const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
