import type { ThemeOptions } from "@mui/material/styles"
import { User } from "firebase/auth"
import { PaletteMode } from "@mui/material"

export type AppThemeProps = {
  children: React.ReactNode
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions["components"]
  themeMode?: PaletteMode
}

export type AuthContextProps = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

export type DashboardProps = {
  user: User | null
}
