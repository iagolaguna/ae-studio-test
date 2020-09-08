import "leaflet/dist/leaflet.css";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { Home } from "./pages/Home/Home";
import { theme } from "./theme";

const uri = process.env.REACT_APP_BASE_URL;
const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
