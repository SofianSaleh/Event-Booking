import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import { connect } from "react-redux"
import { signUp } from "../../actions/auth"

import PropTypes from 'prop-types'


export class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onSubmit(e) {
        e.preventDefault();
        const { username, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            // this.props.createMessage({ passwordNotMatch: "Passwords Didn't match" });
            alert(`passwords doesn't match`)
        } else {
            const newUser = {
                username,
                password,
                email
            };
            this.props.signUp(newUser);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        // Todo: when signing up redirect to sign in with the email
        if (this.props.isAuthenticated) {
            return <Redirect from="/auth/signup" to='/events' exact />
        }
        const { username, confirmPassword, email, password } = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange.bind(this)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange.bind(this)}
                                value={email}
                                required
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                onChange={this.onChange.bind(this)}
                                value={confirmPassword}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
              </button>
                        </div>
                        <p>
                            Already have an account? <NavLink to="/auth/login">Login</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signUp })(SignUp);
