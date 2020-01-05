import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
        this.nameChange = this.nameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.prenventDefault();
        axios.post('/signupDb', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    nameChange(event) {
        event.preventDefault();

        this.setState({ name: event.target.value });
        console.log(this.state);
    }

    emailChange(event) {
        event.preventDefault();
        this.setState({ email: event.target.value });
        console.log(this.state);
    }

    passwordChange(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label form="name">name:*</label>
                        <input id="name" type="text" value={this.state.value} onChange={this.nameChange}></input>
                    </div>
                    <div>
                        <label form="email">email:*</label>
                        <input id="email" type="text" value={this.state.value} onChange={this.emailChange}></input>
                    </div>
                    <div>
                        <label form="password">password:*</label>
                        <input id="password" type="text" value={this.state.value} onChange={this.passwordChange}></input>
                    </div>

                    <button type="submit">SignUp</button>
                </form>
            </div>
        )
    }
}

export default SignUp;