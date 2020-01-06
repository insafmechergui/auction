import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogIn from "./components/LogIn.js";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { logedIn: false };
  }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/LogIn">LogIn</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path="/Login">
            <LogIn />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
