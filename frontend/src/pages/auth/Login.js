import React, { Component } from 'react'

export class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Login
