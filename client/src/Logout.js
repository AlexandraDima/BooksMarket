import React, { Component } from "react";
import { Link } from "@reach/router";
import AuthService from "./AuthService";

class Logout extends Component {
  render() {
    return (
      <div>
        {this.props.getUsername() ? (
          <small className="text-light m-1">
            Logged in: {this.props.getUsername()}
            <button
              onClick={event => {
                this.props.logout();
              }}
            >
              Logout
            </button>
          </small>
        ) : (
          <Link className="nav-item nav-link" to="/login">
            Login
          </Link>
        )}
      </div>
    );
  }
}
export default Logout;
