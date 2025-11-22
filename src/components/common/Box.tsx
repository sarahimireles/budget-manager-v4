import React from "react"

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  component?: React.ElementType
}

const Box: React.FC<BoxProps> = ({
  component: Component = "div",
  className = "",
  children,
  ...props
}) => {
  // Tailwind classes should be used via className instead
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}

export default Box
