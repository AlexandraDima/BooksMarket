import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props); // This line is calling the constructor in the super className.

    this.state = {
      // When initializing the state in the constructor, we just create it as an object.
      username: "", // input username is initialized to the empty string.
      password: "" //empty password is initialized
    };
  }

  ///Methods used for the username and password inputs
  handleChange(event) {
    // We can only change state using this.setState() and replace the current state with something new.
    this.setState({
      //why event.target.name???
      [event.target.name]: event.target.value // Set the value in this.state to the current value of the input DOM element
      // The above event.target.value is vanilla JavaScript to get value from event DOM target
    });
  }

  handleLogin(event) {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      /*
      <div className="card col-lg-8 align-center m-5">
        <div className="card-body">
          <form className="form-signin">
            <div className="form-label-group">
              <input
                onChange={event => this.handleChange(event)}
                className="form-control"
                placeholder="Username"
              ></input>
              <label>Username</label>
            </div>

            <div className="form-label-group">
              <input
                onChange={event => this.handleChange(event)}
                className="form-control"
                placeholder="Password"
              ></input>
              <label>Password</label>
            </div>

            <div className="custom-control custom-checkbox mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              ></input>
              <label className="custom-control-label">Remember password</label>
            </div>
            <button
              onClick={event => this.handleLogin(event)}
              className="btn btn-lg btn-primary btn-block text-uppercase"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      */
      <div>
        <input
          className="m-1"
          onChange={event => this.handleChange(event)}
          type="text"
          name="username"
        />
        <input
          className="m-1"
          onChange={event => this.handleChange(event)}
          type="text"
          name="password"
        />
        <button className="btn btn-info mb-1" onClick={_ => this.handleLogin()}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
