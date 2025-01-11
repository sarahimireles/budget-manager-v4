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

export type AppRoutesType = {
  path: string
  element: React.ReactNode
  itemTxt: string
  icon: string
}

export type NavbarProps = {
  toggleDrawerDispatch: () => void
}

export type AppDrawerProps = {
  showDrawer: boolean
  toggleDrawerDispatch: () => void
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

export type IconPickerProps = {
  label: string
  icons: string[]
  handleIconChange: (selectedIcon: string) => void
  selectedColor: string
  selectedIcon: string
  error: string | undefined
}
