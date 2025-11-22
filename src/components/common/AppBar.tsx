import React from "react"
import { useTheme } from "../../contexts/ThemeContext"

interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative"
}

const AppBar: React.FC<AppBarProps> = ({
  position = "static",
  children,
  className = "",
  ...props
}) => {
  const { mode } = useTheme()

  const positionClasses = {
    fixed: "fixed top-0 left-0 right-0",
    absolute: "absolute top-0 left-0 right-0",
    sticky: "sticky top-0",
    static: "static",
    relative: "relative",
  }

  const bgClass =
    mode === "dark"
      ? "bg-gradient-to-b from-info-dark to-background"
      : "bg-background-paper-light"

  return (
    <header
      className={`${positionClasses[position]} ${bgClass} text-gray-100 shadow-md z-10 ${className}`}
      {...props}
    >
      {children}
    </header>
  )
}

export default AppBar
