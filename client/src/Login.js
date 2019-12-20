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
