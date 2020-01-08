// import React from "react";
// import axios from "axios";
// import { Button, Form } from "react-bootstrap";

// class SignUp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       password: ""
//     };
//     this.nameChange = this.nameChange.bind(this);
//     this.passwordChange = this.passwordChange.bind(this);
//     this.emailChange = this.emailChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleSubmit(event) {
//     event.prenventDefault();

//     axios
//       .post("/signupDb", this.state)
//       .then(function (response) {
//         console.log(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   nameChange(event) {
//     event.preventDefault();

//     this.setState({ name: event.target.value });
//     console.log(this.state);
//   }

//   emailChange(event) {
//     event.preventDefault();
//     this.setState({ email: event.target.value });
//     console.log('ok');
//   }

//   passwordChange(event) {
//     event.preventDefault();
//     this.setState({ password: event.target.value });
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <Form onSubmit={this.handleSubmit}>
//         <Form.Group controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             name="name"
//             value={this.state.value}
//             onChange={this.nameChange}
//             type="text"
//             placeholder="Enter name"
//           />
//         </Form.Group>

//         <Form.Group controlId="email">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             name="email"
//             value={this.state.value}
//             onChange={this.emailChange}
//             type="email"
//             placeholder="Enter email"
//           />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             name="password"
//             value={this.state.value}
//             onChange={this.passwordChange}
//             type="password"
//             placeholder="Password"
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     );
//   }
// }

// export default SignUp;
import React from "react";
import { Button, Form, Alert } from "react-bootstrap";
import signUpService from "../../services/signUpService.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      show: false,
      alert: 'success',
      message: 'Email already exist'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  hundleShowAlert() {

  }
  handleSubmit(event) {
    event.preventDefault();
    signUpService.getAll(this.state).then(res => {
      if (res.data === "user already exists") {

        this.setState({
          show: true,
          alert: 'danger',
          message: 'Email already exist',
        })
      }
      else {

        this.setState({
          show: true,
          alert: 'success',
          message: 'Sign up Successful'

        })
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      show: false
    });

  }

  render() {
    return (
      <div className='signup'>
      

        <Form onSubmit={this.handleSubmit}>
        <Alert variant={this.state.alert} show={this.state.show} dismissible>

{this.state.message}

</Alert>
          <div id="dataError"></div>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={this.state.value}
              onChange={this.handleChange}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={this.state.value}
              onChange={this.handleChange}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            SugnUp
        </Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
