import { Mona_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { Colors } from "./colors";

const inter = Mona_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      purple: Colors.background.purple,
      default: Colors.light[200],
      paper: Colors.light[100],
    },
    light: {
      100: Colors.light[100],
      200: Colors.light[200],
      300: Colors.light[300],
    },
    grey: {
      100: Colors.grey[100],
      200: Colors.grey[200],
    },
    dark: {
      100: Colors.dark[100],
      200: Colors.dark[200],
      300: Colors.dark[300],
    },
    primary: {
      main: Colors.primary.main,
      light: Colors.primary.light,
      dark: Colors.primary.dark,
      contrastText: Colors.primary.contrastText,
    },
    secondary: {
      main: Colors.secondary.main,
      light: Colors.secondary.light,
      dark: Colors.secondary.dark,
      contrastText: Colors.secondary.contrastText,
    },
    default: {
      main: Colors.default.main,
      light: Colors.default.light,
      dark: Colors.default.dark,
      contrastText: Colors.default.contrastText,
    },
    error: {
      main: Colors.error.main,
      light: Colors.error.light,
      dark: Colors.error.dark,
      contrastText: Colors.error.contrastText,
    },
    warning: {
      main: Colors.warning.main,
      light: Colors.warning.light,
      dark: Colors.warning.dark,
      contrastText: Colors.warning.contrastText,
    },
    info: {
      main: Colors.info.main,
      light: Colors.info.light,
      dark: Colors.info.dark,
      contrastText: Colors.info.contrastText,
    },
    success: {
      main: Colors.success.main,
      light: Colors.success.light,
      dark: Colors.success.dark,
      contrastText: Colors.success.contrastText,
    },
    text: {
      primary: Colors.dark[200],
      secondary: Colors.grey[200],
      disabled: Colors.grey[100],
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
