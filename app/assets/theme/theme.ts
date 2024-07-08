import { createTheme } from '@mui/material/styles';

export const getMuiTheme = () => {
  return createTheme({
    typography: {
      fontFamily:
        "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
      fontSize: 13,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";
            font-style: normal;
             font-weight: 500;
           }
        `,
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            fontFamily:
              "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily:
              "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
          },
        },
      },
    },
  });
};
