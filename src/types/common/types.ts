import type { ThemeOptions } from "@mui/material/styles"
import { User } from "firebase/auth"

export type AppThemeProps = {
  children: React.ReactNode
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions["components"]
}

export type DashboardProps = {
  user: User | null
}
