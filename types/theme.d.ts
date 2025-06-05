import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    light: {
      100: string;
      200: string;
      300: string;
    };
    dark: {
      100: string;
      200: string;
      300: string;
    };
    grey: {
      100: string;
      200: string;
    };
    default: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    light?: {
      100: string;
      200: string;
      300: string;
    };
    dark?: {
      100: string;
      200: string;
      300: string;
    };
    grey?: {
      100: string;
      200: string;
    };
    default?: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface TypeBackground {
    purple: string;
  }

  interface TypeBackgroundOptions {
    purple?: string;
  }
}
