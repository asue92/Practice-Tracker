import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Timer from "./components/timer";

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#407899",
      dark: "#8AB5CE",
      contrastText: "#fff",
    },
    type: "dark",
  },
  typography: {
    align: "center",
    fontSize: 14,
  },
});

theme.typography.h4 = {
  fontSize: 20,
  fontWeight: "bold",
  margin: 10,
};

theme.typography.h2 = {
  fontSize: 30,
  marginTop: 10,
  marginBottom: 15,
  background: "#4785A9",
  color: "white",
  borderRadius: 10,
};
theme.typography.subtitle1 = {
  fontSize: 20,
  color: "white",
  padding: "8px",
  fontWeight: "bold",
  margin: 10,
  marginLeft: 50,
  marginRight: 50,
  background: "#4785A9",
  borderRadius: 10,
};
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/timer" component={Timer} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
export default App;
