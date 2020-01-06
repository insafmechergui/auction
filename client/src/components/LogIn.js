import React from "react";
import logInServices from "../services/logInservice.js";
import { Redirect, Route } from "react-router-dom";
import App from "../App.js";
class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      logedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  logIn() {
    logInServices.checkForLogIn(this.state).then(res => {
      if (res.data === "match") this.setState({ logedIn: true });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    this.state.email === "" || this.state.password === ""
      ? alert("fill them bitch")
      : this.logIn();
    e.preventDefault();
  }

  render() {
    return (
      <Route exact path="/Login">
        {this.state.logedIn ? (
          <Redirect to="/" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label for="email">
              email
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label for="password">
              password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        )}
      </Route>
    );
  }
}
export default LogIn;
