import React, { Fragment, useMemo } from "react"
import {
  ThemeProvider,
  createTheme,
  getContrastRatio,
} from "@mui/material/styles"
import { colorSchemes, typography, shadows, shape } from "./themePrimitives"
import { AppThemeProps } from "../../types/common"

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props

  const theme = useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "bm",
          },
          palette: {
            mode: "dark",
            primary: {
              main: "#CDFB7C",
              light: "#d7fc96",
              dark: "#a4c963",
              contrastText:
                getContrastRatio("#CDFB7C", "#fff") > 4.5 ? "#fff" : "#111",
            },
            secondary: {
              main: "#B87EED",
              light: "#c698f1",
              dark: "#9365be",
              contrastText:
                getContrastRatio("#B87EED", "#fff") > 4.5 ? "#fff" : "#111",
            },
            background: {
              paper: "#161726",
              default: "#0b0d10",
            },
            info: {
              main: "#5E85ED",
              light: "#7e9df1",
              dark: "#4b6abe",
              contrastText:
                getContrastRatio("#5E85ED", "#fff") > 3.5 ? "#fff" : "#111",
            },
            warning: {
              main: "#F1642E",
              light: "#f48358",
              dark: "#c15025",
              contrastText:
                getContrastRatio("#F1642E", "#fff") > 3.5 ? "#fff" : "#111",
            },
            error: {
              main: "#E85234",
              light: "#ed755d",
              dark: "#ba422a",
              contrastText:
                getContrastRatio("#E85234", "#fff") > 3.5 ? "#fff" : "#111",
            },
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shadows,
          shape,
          components: {
            ...themeComponents,
          },
        })
  }, [disableCustomTheme, themeComponents])
  if (disableCustomTheme) {
    return <Fragment>{children}</Fragment>
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
