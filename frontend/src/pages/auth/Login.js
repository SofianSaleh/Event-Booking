import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { email, password } = this.state
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange.bind(this)}
                                value={email}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange.bind(this)}
                                value={password}
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Login
                  </button>
                        </div>
                        <p>
                            Don't have an account? <NavLink to="/auth/signup">Register</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
