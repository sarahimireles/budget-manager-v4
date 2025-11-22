import { User } from "@auth0/auth0-react"
import { Database } from "firebase/database"

// Removed MUI imports

export type AppThemeProps = {
  children: React.ReactNode
  disableCustomTheme?: boolean
  themeComponents?: Record<string, unknown> // Was ThemeOptions["components"]
  themeMode?: "light" | "dark" // Was PaletteMode
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

// Custom event type to replace SelectChangeEvent
export type SelectChangeEvent = {
  target: {
    value: string
  }
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

export type StyledColorPickerProps = {
  label: string
  color: string
  handleColorChange: (color: string) => void
  error: string | undefined
}
