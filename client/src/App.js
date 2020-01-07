import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/about";
import Users from "./components/users";
import "./App.css";
import SignUp from "./components/signup";
import { Container } from 'react-bootstrap';
import productService from "./services/productService";
import { Layout } from "./components/layout";

function App() {
  // const getProducts = async () => { // exemple for using axios from servesie
  //   let res = await productService.getAll();
  //   console.log(res);
  //   setproducts(res);
  // };

  return (
    <React.Fragment>
      <Layout>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/signup">signup</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </div>
        </Router>
      </Layout>
    </React.Fragment>


  );
}

export default App;
