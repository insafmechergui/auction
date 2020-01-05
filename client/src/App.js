import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/about";
import Users from "./components/users";
import "./App.css";
import SignUp from "./components/signup";

import productService from "./services/productService";

function App() {
  // const getProducts = async () => { // exemple for using axios from servesie
  //   let res = await productService.getAll();
  //   console.log(res);
  //   setproducts(res);
  // };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>


  );
}

export default App;
