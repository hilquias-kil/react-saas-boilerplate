import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import NoMatch from "../pages/NoMatch";

import Auth from "../auth/Auth";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const checkAuth = Comp => {
  return props => {
    console.log(auth.isAuthenticated())
    if (! auth.isAuthenticated()) {
      auth.login();
    } else {
      return <Comp auth={auth} {...props} />; 
    }
  };
};

const App = () => (
  <BrowserRouter>
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
  </BrowserRouter>
);

export default App;
