import React from "react"
import { StyledIcon } from "./StyledIcon"
import { IconSelectProps } from "../../types/common"
import Select from "./Select"

export const IconSelect = (props: IconSelectProps) => {
  const options = props.icons.map((icon) => ({
    label: icon,
    value: icon,
  }))

  return (
    <Select
      label={props.label}
      value={props.icon}
      onChange={(value) =>
        props.handleIconChange({ target: { value: value as string } })
      }
      options={options}
      renderOption={(option) => (
        <div className="flex items-center gap-2">
          <StyledIcon icon={option.value as string} />
          <span>{option.label}</span>
        </div>
      )}
    />
  )
}
