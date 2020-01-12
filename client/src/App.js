import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {
  Button,
  Form,
  Alert,
  Modal,
  Navbar,
  Nav,
  NavDropdown,
  FormControl
} from "react-bootstrap";

import LogIn from "./components/User/LogIn.js";
import SignUp from "./components/User/signup";

import signOutService from "./services/signOutServices";

import Home from "./components/home";

import AddProduct from "./components/Product/addProduct";
import AddCategory from "./components/category/AddCategory";
import NavCategory from "./components/category/NavCategory";
import checkToken from "./services/checkToken";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Product from "./components/Product/Product.js";
import Admin from "./components/admin/Admin.js";

// han
import productService from "./services/productService";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        id: null,
        name: null
      },
      showModalSignUp: false,
      showModalLogin: false,

      products: [],
      description: null
    };
    this.changeUserName = this.changeUserName.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  hundleSignOut() {
    signOutService
      .signOut(this.state.userInfo.name)
      .then(res => {
        if (res.data.deleted === "success") {
          localStorage.removeItem("token");
          this.setState({
            userInfo: {
              id: null,
              name: null
            }
          });
        } else {
          console.log("not deleted");
        }
      })
      .catch(err => console.log(err));
  }

  changeUserName(id, name) {
    //updates the page with the user
    this.setState({
      userInfo: {
        id,
        name
      }
    });
  }

  componentDidMount() {
    //checks if the token is valid
    checkToken.checkAuth(window.localStorage.getItem("token")).then(res => {
      if (res) {
        this.changeUserName(res.data._id, res.data.name);
      }
    });
  }

  handleShow(target) {
    this.setState({
      [`showModal${target}`]: !this.state[`showModal${target}`]
    });
  }

  // hold chage on the input
  onChange(e) {
    this.setState({ description: e.target.value });
  }

  // send a get request to ..../search
  filterProduct(e) {
    e.preventDefault();

    productService
      .search(this.state.description)
      .then(res => {
        console.log("resssssssss", res);
        var result = res.data;
        console.log("rrrrrrrrrrrr", result);
        for (var i = 0; i < result.length; i++) {
          this.state.products.push(result[i]);
        }

        console.log("productssssss", this.state.products);
      })
      .catch(err => {
        console.log("myyyyyyyyyyysearch", err);
      });
  }

  handleClickCategory(data) {
    this.setState({
      products: data[0].products
    });
  }

  render() {
    return (
      <div>
        <Router>
          <SignUp
            showModal={this.state.showModalSignUp}
            onHide={() => {
              this.handleShow("SignUp");
            }}
            handleShow={this.handleShow}
            changeUserName={this.changeUserName}
          />
          <LogIn
            handleShow={this.handleShow}
            showModal={this.state.showModalLogin}
            onHide={() => {
              this.handleShow("Login");
            }}
            changeUserName={this.changeUserName}
          />
          <Switch>
            <Navbar bg="light" expand="lg">
              <Link to="/">
                <Navbar.Brand>RBK Auction</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {!this.state.userInfo.name ? (
                  <Nav className="mr-auto">
                    <Nav.Link
                      onClick={() => {
                        this.handleShow("SignUp");
                      }}
                    >
                      SignUp
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        this.handleShow("Login");
                      }}
                    >
                      Login
                    </Nav.Link>
                  </Nav>
                ) : (
                  <Nav className="mr-auto">
                    <Nav.Link>{this.state.userInfo.name}</Nav.Link>
                    <Nav.Link
                      onClick={() => {
                        this.hundleSignOut();
                      }}
                    >
                      SignOut
                    </Nav.Link>
                  </Nav>
                )}
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={e => {
                      this.onChange(e);
                    }}
                  />
                  <Button
                    variant="outline-success"
                    onClick={e => this.filterProduct(e)}
                  >
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
          </Switch>
          <NavCategory
            onClick={data => {
              this.handleClickCategory(data);
            }}
          />

          <Route exact path="/" component={() => <Home />} />
          <Route
            exact
            path="/product"
            component={() => (
              <Product
                userInfo={this.state.userInfo}
                handleShow={this.handleShow}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            component={() => <Admin userInfo={this.state.userInfo} />}
          />
        </Router>
      </div>
    );
  }
}

export default App;
