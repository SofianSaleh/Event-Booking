
import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from ' ../actions/auth'
import PropTypes from 'prop-types'

class Navbar extends Component {
    static proptypes = {

    }


    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <NavLink className="navbar-brand" to="/" >EVENT BOOKING</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/events">Events <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/bookings">Bookings</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/auth/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/auth/signup">Sign Up</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout.bind(this)}>Logout</button>
                            </li>

                        </ul>
                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                    </div>
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, { logout })(Navbar);
