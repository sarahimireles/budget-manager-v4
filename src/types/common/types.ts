import type { ThemeOptions } from "@mui/material/styles"
import { User } from "firebase/auth"
import { PaletteMode } from "@mui/material"
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

export const AccountIcons: string[] = [
  "dollar-sign",
  "file-invoice-dollar",
  "euro-sign",
  "hand-holding-usd",
  "university",
  "piggy-bank",
  "money-check-alt",
  "money-check",
  "money-bill",
  "money-bill-alt",
  "money-bill-wave",
  "money-bill-wave-alt",
  "money-check",
  "money-check-alt",
  "wallet",
]
