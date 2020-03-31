import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../actions/events";
import PropTypes from "prop-types";

export class CreateEvent extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired
  };

  state = {
    title: "",
    description: "",
    price: "",
    date: ""
  };

  onSubmit(e) {
    e.preventDefault();
    const { title, description, price, date } = this.state;

    let event = {
      title,
      description,
      price: parseFloat(price),
      date: new Date(date).toISOString()
    };

    this.props.createEvent(event);

    this.setState({ title: "", description: "", price: "", date: "" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { title, description, price, date } = this.state;
    return (
      <div>
        {/* <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
        aria-label="Plus"
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button> */}
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#staticBackdrop"
        >
          Launch static backdrop modal
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title" id="staticBackdropLabel">
                  Create an Event
                </h3>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Event title"
                      onChange={this.onChange.bind(this)}
                      value={title}
                      name="title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="Event description"
                      onChange={this.onChange.bind(this)}
                      name="description"
                      value={description}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        onChange={this.onChange.bind(this)}
                        value={price}
                        name="price"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        onChange={this.onChange.bind(this)}
                        value={date}
                        name="date"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmit.bind(this)}
                  data-dismiss="modal"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createEvent })(CreateEvent);
