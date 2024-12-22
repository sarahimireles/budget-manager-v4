import * as React from "react"
import { useColorScheme } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectProps } from "@mui/material/Select"
import { TEXTS } from "../../types/common"

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
      <MenuItem value="system">{TEXTS.THEME.SYSTEM}</MenuItem>
      <MenuItem value="light">{TEXTS.THEME.LIGHT}</MenuItem>
      <MenuItem value="dark">{TEXTS.THEME.DARK}</MenuItem>
    </Select>
  )
}
