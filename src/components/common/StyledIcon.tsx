import React from "react"
import { StyledIconProps } from "../../types/common"

export const StyledIcon = (props: StyledIconProps) => {
  return (
    <span
      className={`fa-solid fa-${props.icon}`}
      style={{ marginRight: "10px" }}
    ></span>
  )
}
