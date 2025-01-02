import type { ThemeOptions } from "@mui/material/styles"
import { User } from "firebase/auth"
import { PaletteMode, SelectChangeEvent } from "@mui/material"
import { Database } from "firebase/database"

export type AppThemeProps = {
  children: React.ReactNode
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions["components"]
  themeMode?: PaletteMode
}

export type DashboardProps = {
  user: User | null
}

export type AuthContextProps = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

export type DatabaseContextProps = {
  db: Database
}

export type StyledIconProps = {
  icon: string
}

export type IconSelectProps = {
  label: string
  icon: string
  handleIconChange: (event: SelectChangeEvent) => void
  icons: string[]
}
