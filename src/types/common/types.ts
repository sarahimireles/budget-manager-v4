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

export type Account = {
  name: string
  image: string
  color: string
  sumsToMonthlyBudget: boolean
  currentBalance: number
  key?: string
  accountType: AccountType
}

export type AccountType = {
  name: string
}

export type AccountGroup = {
  name: string
  items: Account[]
  totalBalance: number
}
