import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import PrivateRoutes from '../../common/PrivateRoutes'
import PropTypes from 'prop-types'

class Navbar extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        logout: PropTypes.func.isRequired
    }


    render() {
        const { isAuthenticated } = this.props
        const authLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/events">Events <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/bookings">Bookings</NavLink>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.props.logout}>Logout</a>
                </li>
            </ul>
        )
        const notAuthLinks = (
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/auth/signup">Sign Up</NavLink>
                </li>
            </ul >
        )
        return (
            <Fragment>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="/events" >EVENT BOOKING</NavLink>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                        {isAuthenticated ? authLinks : notAuthLinks}
                    </div>
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})



export default connect(mapStateToProps, { logout })(Navbar);
