import React, { useState } from "react"

interface AccordionProps {
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

interface AccordionSummaryProps {
  children: React.ReactNode
  "aria-controls"?: string
  id?: string
  className?: string
  expanded?: boolean
  setExpanded?: (val: boolean) => void
}

interface AccordionDetailsProps {
  children: React.ReactNode
  expanded?: boolean
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultExpanded = false,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div
      className={`overflow-hidden rounded-lg ${expanded ? "my-2" : ""} ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            expanded,
            setExpanded,
          } as Partial<AccordionSummaryProps>)
        }
        return child
      })}
    </div>
  )
}

export const AccordionSummary: React.FC<AccordionSummaryProps> = ({
  children,
  expanded,
  setExpanded,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`cursor-pointer p-4 transition-colors ${
        expanded ? "bg-secondary-dark" : "bg-background-paper"
      } ${className}`}
      onClick={() => setExpanded?.(!expanded)}
      {...props}
    >
      {children}
    </div>
  )
}

export const AccordionDetails: React.FC<AccordionDetailsProps> = ({
  children,
  expanded,
  className = "",
}) => {
  if (!expanded) return null

  return (
    <div className={`p-4 bg-background-paper ${className}`}>{children}</div>
  )
}
