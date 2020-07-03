import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "../src/components/Main";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route exact path="/main">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
