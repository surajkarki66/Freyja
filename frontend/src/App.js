import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./containers/Nav/Nav";
import Home from "./containers/page/Home";
import Signup from "./containers/page/Signup";
import Login from "./containers/page/Login";
import CreateQuestions from "./containers/page/CreateQuestions";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const onLoginResponse = (tk) => {
    setAuthenticated(true);
  };

  useEffect(() => {
    const tk = localStorage.getItem("token");
    setToken(tk);
    if (tk) {
      setAuthenticated(true);
    }
  }, []);
  let route;
  if (authenticated) {
    route = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create-questions" exact component={CreateQuestions} />
      </Switch>
    );
  } else {
    route = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route
          path="/login"
          exact
          render={() => <Login onSuccess={onLoginResponse} />}
        />
      </Switch>
    );
  }
  return (
    <div className="container">
      <BrowserRouter>
        <Nav auth={authenticated} />
        {route}
      </BrowserRouter>
    </div>
  );
};

export default App;
