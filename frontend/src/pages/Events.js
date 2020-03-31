import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import CreateEvent from "../modals/CreateEvent";

export class Events extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>This Is The Events Page</h1>
        <CreateEvent />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Events);
