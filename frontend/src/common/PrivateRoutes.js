import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.loading) {
                return <h1>Loading ............</h1>
            } else if (!auth.isAuthenticated) {
                return <Redirect to="/events" />

            } else if (auth.isAuthenticated) {
                return <Component {...props} />
            }
        }}
    />
)

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoutes);