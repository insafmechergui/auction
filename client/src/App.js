import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogIn from "./components/LogIn.js";
import "./App.css";

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
              <Link to="/LogIn">LogIn</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/LogIn">
            <LogIn />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
