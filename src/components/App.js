import React from "react";
import history from "../history";
import { Router, Switch, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import NoMatch from "../pages/NoMatch";

import auth from "../auth/Auth";

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const checkAuth = Comp => {
  return props => {
    if (!auth.isAuthenticated()) {
      auth.signIn();
      return ""
    } else {
      return <Comp auth={auth} {...props} />;
    }
  };
};

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={checkAuth(Home)} />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default App;
