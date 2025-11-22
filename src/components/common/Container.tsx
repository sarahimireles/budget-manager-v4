import React from "react"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false
}

const Container: React.FC<ContainerProps> = ({
  maxWidth = "lg",
  className = "",
  children,
  ...props
}) => {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-7xl",
    xl: "max-w-screen-2xl",
    false: "",
  }

  const maxWidthClass = maxWidth ? maxWidthClasses[maxWidth] : ""

  return (
    <div
      className={`container mx-auto px-4 ${maxWidthClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
