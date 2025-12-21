import { createTheme } from "@vanilla-extract/css";
import { colors } from "./token/colors";

export const light = createTheme({
  "@layer": "theme",
  colors: {
    text: {
      primary: colors.black,
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
    },
    background: {
      primary: colors.paper,
      secondary: colors.neutral[50],
    },
    ui: {
      primary: colors.neutral[200],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
    },
    accent: {
      red: colors.red[600],
      orange: colors.orange[600],
      yellow: colors.yellow[600],
      green: colors.green[600],
      cyan: colors.cyan[600],
      blue: colors.blue[600],
      purple: colors.purple[600],
      magenta: colors.magenta[600],
    },
  },
});
