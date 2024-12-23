import type { ThemeOptions } from "@mui/material/styles"

export type AppThemeProps = {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}
