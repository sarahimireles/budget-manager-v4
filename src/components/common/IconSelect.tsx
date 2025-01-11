import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import React from "react"
import { StyledIcon } from "./StyledIcon"
import { IconSelectProps } from "../../types/common"

export const IconSelect = (props: IconSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={props.icon}
        label={props.label}
        onChange={props.handleIconChange}
      >
        {props.icons.map((icon) => (
          <MenuItem key={icon} value={icon}>
            <StyledIcon icon={icon} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
