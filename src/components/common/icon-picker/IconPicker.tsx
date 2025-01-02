import { Box, FormControl, FormHelperText, InputLabel } from "@mui/material"
import React from "react"
import { StyledIcon } from "../StyledIcon"
import { IconPickerProps } from "../../../types/common"
import "./IconPicker.scss"

export const IconPicker = (props: IconPickerProps) => {
  return (
    <FormControl error={!!props.error} fullWidth>
      {/* Use Typography or custom styles for the label */}
      <InputLabel
        shrink
        sx={{
          position: "relative",
          marginBottom: "2px",
        }}
      >
        {props.label}
      </InputLabel>
      <FormHelperText>{props.error}</FormHelperText>
      <Box className="icon-container">
        {props.icons.map((icon) => (
          <div
            key={icon}
            style={
              props.selectedIcon == icon
                ? { backgroundColor: props.selectedColor }
                : {}
            }
            className="icon-button"
            onClick={() => props.handleIconChange(icon)}
          >
            <StyledIcon icon={icon} />
          </div>
        ))}
      </Box>
    </FormControl>
  )
}
