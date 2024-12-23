import * as React from "react"
import { useColorScheme } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectProps } from "@mui/material/Select"
import { COLOR_MODE_SELECT } from "../../types/common"

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <Select
      value={mode}
      onChange={(event) =>
        setMode(event.target.value as "system" | "light" | "dark")
      }
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode",
      }}
      {...props}
    >
      <MenuItem value="system">{COLOR_MODE_SELECT.SYSTEM}</MenuItem>
      <MenuItem value="light">{COLOR_MODE_SELECT.LIGHT}</MenuItem>
      <MenuItem value="dark">{COLOR_MODE_SELECT.DARK}</MenuItem>
    </Select>
  )
}
