import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import LogIn from "./components/User/LogIn.js";
import SignUp from "./components/User/signup";
import Product from "./components/Product/Product";
import AddProduct from "./components/Product/addProduct";
import AddCategory from "./components/category/AddCategory";
import checkToken from "./services/checkToken";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: null,
      showModalSignUp: false,
      showModalLogin: false

    };
    this.changeUserName = this.changeUserName.bind(this);
  }

  changeUserName(userName) {
    //updates the page with the user
    this.setState({ userName });
  }

  componentDidMount() {
    //checks if the token is valid
    checkToken.checkAuth(window.localStorage.getItem("token")).then(res => {
      if (res) {
        this.changeUserName(res.data.name);
      }
    });
  }

  hundleShowSignUp() {
    this.setState({
      showModalSignUp: true
    })
  }
  hundleCloseSignUp() {
    this.setState({
      showModalSignUp: false
    })
  }
  hundleCloseLogin() {
    this.setState({
      showModalLogin: false
    })
  }
  hundleShowLogin() {
    this.setState({
      showModalLogin: true
    })
  }
  render() {

    return (
      <Router>
        <SignUp showModal={this.state.showModalSignUp} onHide={() => { this.hundleCloseSignUp() }} changeUserName={this.changeUserName} />
        <LogIn showModal={this.state.showModalLogin} onHide={() => { this.hundleCloseLogin() }} changeUserName={this.changeUserName} />
        <AddCategory></AddCategory>
        <Switch>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {!this.state.userName ? (
                  <Route exact path="/">
                    <li>
                      <Button onClick={() => { this.hundleShowLogin() }} >Login</Button>
                      <Link to="/Login">LogIn</Link>
                    </li>
                    <li>
                      <Button onClick={() => { this.hundleShowSignUp() }} >signUp</Button>
                      <Link to="/SignUp">signUp</Link>
                    </li>
                    <div>not logged in</div>
                  </Route>
                ) : (
                    <div> {this.state.userName} </div>
                  )}
              </ul>
            </nav>


            <Route path="/SignUp" exact> <SignUp changeUserName={this.changeUserName} />  </Route>
            <Route path="/Login" exact> <LogIn changeUserName={this.changeUserName} />  </Route>
            <Route path="/addproduct" exact component={AddProduct}/>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;