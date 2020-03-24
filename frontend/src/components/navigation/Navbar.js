import React from 'react'
import { NavLink } from 'react-router-dom'
function Navbar() {
    return (
        <header>

            <div className="main-navigation_logo">
                <h1>Event Booker</h1>
            </div>
            <nav className="main-navigation_logo">
                <ul>
                    <li><NavLink to='/events'>Events</NavLink></li>
                    <li><NavLink to='/bookings'>Bookings</NavLink></li>
                </ul>

            </nav>
        </header>
    )
}

export default Navbar
