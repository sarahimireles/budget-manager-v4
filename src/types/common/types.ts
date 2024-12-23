import type { ThemeOptions } from "@mui/material/styles"

export type AppThemeProps = {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions["components"];
}
