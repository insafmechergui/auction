import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LogIn from "./components/User/LogIn.js";
import SignUp from "./components/User/signup";
import Product from "./components/Product/Product";
import AddProduct from "./components/Product/addProduct";
import checkToken from "./services/checkToken";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = { userName: null };
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
  render() {
    //merge this part
    return (
      <Router>


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
                      <Link to="/Login">LogIn</Link>
                    </li>
                    <li>
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

          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
