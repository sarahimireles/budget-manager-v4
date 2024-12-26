import * as React from "react"
import { useColorScheme } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectProps } from "@mui/material/Select"
import { COLOR_MODE_SELECT, ColorMode } from "../../types/common"

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(
          event.target.value as
            | ColorMode.System
            | ColorMode.Light
            | ColorMode.Dark
        )
      }
      SelectDisplayProps={{
        // @ts-expect-error we dont know this code
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value={ColorMode.System}>{COLOR_MODE_SELECT.SYSTEM}</MenuItem>
      <MenuItem value={ColorMode.Light}>{COLOR_MODE_SELECT.LIGHT}</MenuItem>
      <MenuItem value={ColorMode.Dark}>{COLOR_MODE_SELECT.DARK}</MenuItem>
    </Select>
  )
}
