import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
export const theme = responsiveFontSizes(createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontFamily: "Roboto",
          fontWeight: 300
        },

      }
    }
  },
  palette: {
    primary: {
      main: "#fd7e14",
      contrastText: "#fff",
    },
    secondary: {
      main: "#fd7e14",
      contrastText: "#fff",
    },
  },
}));
